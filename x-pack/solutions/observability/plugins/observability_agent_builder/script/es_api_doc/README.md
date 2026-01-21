## Elasticsearch API Documentation Generator and Ingest

This folder provides two scripts to:

1. **Generate** a JSON file (`documents.json`) from an Elasticsearch OpenAPI specification.
2. **Ingest** those generated documents into an Elasticsearch index for search or semantic use.

---

### Prerequisites

- **Elasticsearch** running and accessible  
   (default: `http://elastic:changeme@127.0.0.1:9200/`)
- An **OpenAPI JSON** file describing Elasticsearch endpoints  
   (default path:  
   `x-pack/solutions/observability/plugins/observability_agent_builder/script/es_api_doc/elasticsearch_openapi_source.json`)

---

### 1. Ingest Into Elasticsearch

Generate Documentation: The script reads the OpenAPI file and indexes the generated documents into Elasticsearch.

**Run:**

```bash
node --experimental-strip-types x-pack/solutions/observability/plugins/observability_agent_builder/script/es_api_doc/ingest_docs.ts
```

**What it does:**

- Parses `elasticsearch_openapi_source.json`
- Resolves parameter and response schema `$refs`
- Connects to Elasticsearch (`http://elastic:changeme@127.0.0.1:9200/`)
- Creates an index called `kibana_ai_es_api_doc`
- Performs a bulk ingest of all documents

**Check:**

```
GET kibana_ai_es_api_doc/_search
```
