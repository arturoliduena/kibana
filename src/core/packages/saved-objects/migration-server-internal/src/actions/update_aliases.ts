/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import * as Either from 'fp-ts/Either';
import * as TaskEither from 'fp-ts/TaskEither';
import { errors as EsErrors } from '@elastic/elasticsearch';
import type { ElasticsearchClient } from '@kbn/core-elasticsearch-server';
import {
  catchRetryableEsClientErrors,
  type RetryableEsClientError,
} from './catch_retryable_es_client_errors';
import { DEFAULT_TIMEOUT, IndexNotFound } from '.';

export interface AliasNotFound {
  type: 'alias_not_found_exception';
}

/** @internal */
export interface RemoveIndexNotAConcreteIndex {
  type: 'remove_index_not_a_concrete_index';
}

/** @internal */
export type AliasAction =
  | { remove_index: { index: string } }
  | { remove: { index: string; alias: string; must_exist: boolean } }
  | { add: { index: string; alias: string } };

/** @internal */
export interface UpdateAliasesParams {
  client: ElasticsearchClient;
  aliasActions: AliasAction[];
  timeout?: string;
}
/**
 * Calls the Update index alias API `_alias` with the provided alias actions.
 */
export const updateAliases =
  ({
    client,
    aliasActions,
    timeout = DEFAULT_TIMEOUT,
  }: UpdateAliasesParams): TaskEither.TaskEither<
    IndexNotFound | AliasNotFound | RemoveIndexNotAConcreteIndex | RetryableEsClientError,
    'update_aliases_succeeded'
  > =>
  () => {
    return client.indices
      .updateAliases({
        actions: aliasActions,
        timeout,
      })
      .then(() => {
        // Ignore `acknowledged: false`. When the coordinating node accepts
        // the new cluster state update but not all nodes have applied the
        // update within the timeout `acknowledged` will be false. However,
        // retrying this update will always immediately result in `acknowledged:
        // true` even if there are still nodes which are falling behind with
        // cluster state updates.
        // The only impact for using `updateAliases` to mark the version index
        // as ready is that it could take longer for other Kibana instances to
        // see that the version index is ready so they are more likely to
        // perform unnecessary duplicate work.
        return Either.right('update_aliases_succeeded' as const);
      })
      .catch((err: EsErrors.ElasticsearchClientError) => {
        if (err instanceof EsErrors.ResponseError) {
          if (err?.body?.error?.type === 'index_not_found_exception') {
            return Either.left({
              type: 'index_not_found_exception' as const,
              index: err.body.error.index,
            });
          } else if (
            err?.body?.error?.type === 'illegal_argument_exception' &&
            err?.body?.error?.reason?.match(
              /The provided expression \[.+\] matches an alias, specify the corresponding concrete indices instead./
            )
          ) {
            return Either.left({ type: 'remove_index_not_a_concrete_index' as const });
          } else if (
            err?.body?.error?.type === 'aliases_not_found_exception' ||
            (err?.body?.error?.type === 'resource_not_found_exception' &&
              err?.body?.error?.reason?.match(/required alias \[.+\] does not exist/))
          ) {
            return Either.left({
              type: 'alias_not_found_exception' as const,
            });
          }
        }
        throw err;
      })
      .catch(catchRetryableEsClientErrors);
  };
