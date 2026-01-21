/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/* eslint-disable no-console */
import { readFileSync } from 'node:fs';
import { Client, HttpConnection } from '@elastic/elasticsearch';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { OpenAPIV3 } from 'openapi-types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Document {
  path: string;
  method: string;
  description: string | undefined;
  summary: string | undefined;
  parameters: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[] | undefined;
  response: OpenAPIV3.ReferenceObject | OpenAPIV3.ResponseObject;
  example: unknown;
  tags?: string[];
  externalDocs?: OpenAPIV3.ExternalDocumentationObject;
  operationId?: string;
  requestBody?: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject;
  responses?: OpenAPIV3.ResponsesObject;
  callbacks?: { [callback: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.CallbackObject };
  deprecated?: boolean;
  security?: OpenAPIV3.SecurityRequirementObject[];
  servers?: OpenAPIV3.ServerObject[];
}

function generateDocuments(): Document[] {
  const inputPath = resolve(__dirname, 'elasticsearch_openapi_source.json');

  const raw = readFileSync(inputPath, 'utf-8');
  const openApiDocument: OpenAPIV3.Document = JSON.parse(raw);
  const documents = Object.entries(openApiDocument.paths)
    .map(([path, methods]) => {
      if (!methods) {
        return [];
      }

      // ignore paths that contant _cat -> https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-cat
      if (path.includes('/_cat/')) {
        return [];
      }

      return Object.entries(methods).map(([method, operation]) => {
        if (!operation || typeof operation === 'string' || !('operationId' in operation)) {
          throw new Error(`Invalid operation for path ${path} and method ${method}`);
        }
        const parameters = operation.parameters?.map((param) => {
          if ('$ref' in param) {
            const ref = param.$ref as string;
            const refName = ref.replace('#/components/parameters/', '');
            const resolvedParam = openApiDocument.components?.parameters?.[refName];
            return resolvedParam || param;
          }
          if ('$ref' in param && (!('schema' in param) || !param.schema)) {
            return param;
          }

          const { schema } = param as { schema: OpenAPIV3.SchemaObject };

          if (schema && '$ref' in schema) {
            const ref = schema.$ref as string;
            const refName = ref.replace('#/components/schemas/', '');
            const resolvedSchema = openApiDocument.components?.schemas?.[refName];
            return { ...param, schema: resolvedSchema || schema };
          }

          return param;
        });

        let response = operation.responses?.['200'];

        if ('$ref' in response) {
          const ref = response.$ref as string;
          const refName = ref.replace('#/components/responses/', '');
          const resolvedResponse = openApiDocument.components?.responses?.[refName];
          response = resolvedResponse || response;
        }
        if (
          response &&
          typeof response === 'object' &&
          'content' in response &&
          response.content &&
          response.content['application/json']
        ) {
          const { schema } = response.content['application/json'] as {
            schema: OpenAPIV3.SchemaObject;
          };
          if (schema && '$ref' in schema) {
            const ref = schema.$ref as string;
            const refName = ref.replace('#/components/schemas/', '');
            const resolvedSchema = openApiDocument.components?.schemas?.[refName];
            response.content['application/json'].schema = resolvedSchema || schema;
          }
        }

        return {
          ...operation,
          path,
          method,
          description: operation.description,
          summary: operation.summary,
          parameters,
          response,
          example: (operation as Record<string, unknown>)['x-codeSamples'],
        };
      });
    })
    .flat();
  return documents;
}

async function ingestDoc(allDocuments: Document[]) {
  const indexName = 'kibana_ai_es_api_doc';

  // Filter to only GET and POST methods
  const documents = allDocuments.filter((doc) => {
    const method = doc.method?.toLowerCase();
    return method === 'get' || method === 'post';
  });

  console.log(`Total documents in file: ${allDocuments.length}`);
  console.log(`Documents after filtering (GET/POST only): ${documents.length}`);

  const esClient = new Client({
    node: 'http://elastic:changeme@127.0.0.1:9200/',
    Connection: HttpConnection,
    requestTimeout: 300_000,
  });

  const exists = await esClient.indices.exists({ index: indexName });
  if (exists) {
    console.log(`Index ${indexName} already exists. Deleting...`);
    await esClient.indices.delete({ index: indexName });
    console.log(`Index ${indexName} deleted.`);
  }

  console.log(`Creating index ${indexName}...`);
  await esClient.indices.create({
    index: indexName,
    settings: {
      'index.mapping.total_fields.limit': 2000,
    },
    mappings: {
      properties: {
        // Semantic text fields for semantic search
        description: {
          type: 'semantic_text',
          inference_id: '.multilingual-e5-small-elasticsearch',
        },
        endpoint: {
          type: 'semantic_text',
          inference_id: '.multilingual-e5-small-elasticsearch',
        },
        summary: {
          type: 'semantic_text',
          inference_id: '.multilingual-e5-small-elasticsearch',
        },
        // Text fields for lexical search
        description_text: { type: 'text' },
        summary_text: { type: 'text' },
        operationId: { type: 'text' },
        // Keyword fields for exact and prefix matching
        method: { type: 'keyword' },
        path: {
          type: 'text',
          fields: {
            keyword: { type: 'keyword' },
          },
        },
        tags: { type: 'keyword' },
        // Nested and other fields
        parameters: {
          type: 'object',
          enabled: false,
        },
        responses: {
          type: 'object',
          enabled: false,
        },
        example: {
          type: 'object',
          enabled: false,
        },
      },
    },
  });
  console.log(`Index ${indexName} created successfully.`);

  // Prepare bulk operations only with the needed fields
  console.log('Preparing bulk operations...');
  const operations = documents.flatMap((doc) => {
    const payload: Record<string, any> = {
      // Search fields
      description: doc.description ?? '',
      summary: doc.summary ?? '',
      operationId: doc.operationId ?? '',
      method: doc.method ?? '',
      path: doc.path ?? '',
      tags: doc.tags ?? [],
      // Text versions for lexical search
      description_text: doc.description ?? '',
      summary_text: doc.summary ?? '',
      // Store complete data for tool generation (but don't index deeply)
      parameters: doc.parameters ?? [],
      responses: doc.responses ?? {},
      example: doc.example ?? [],
    };
    if (doc.method && doc.path) {
      payload.endpoint = `${doc.method.toUpperCase()} ${doc.path}`;
    }

    return [{ index: { _index: indexName } }, payload];
  });

  console.log(`Bulk operations prepared: ${operations.length / 2} documents`);
  console.log('Starting bulk indexing...');

  const response = await esClient.bulk({
    refresh: true,
    operations: operations as any,
  });

  if (response.errors) {
    const errorItems = response.items.filter((item) => item.index?.error);
    console.error(`Bulk indexing had ${errorItems.length} errors:`);
    errorItems.slice(0, 5).forEach((item) => {
      console.error(JSON.stringify(item.index?.error, null, 2));
    });
    throw new Error(
      `Error indexing documents: ${errorItems.length} failed out of ${response.items.length}`
    );
  }

  console.log(`Successfully indexed ${response.items.length} documents!`);
  console.log(`Took: ${response.took}ms`);
}

async function run() {
  const documents = generateDocuments();
  await ingestDoc(documents);
}

run().catch((err) => {
  console.error('Error running ingestion:', err);
  process.exit(1);
});
