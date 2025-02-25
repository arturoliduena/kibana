/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { schema } from '@kbn/config-schema';
import type { TagsPluginRouter } from '../../types';
import { TagValidationError } from '../../services/tags';

export const registerCreateTagRoute = (router: TagsPluginRouter) => {
  router.post(
    {
      path: '/api/saved_objects_tagging/tags/create',
      security: {
        authz: {
          enabled: false,
          reason:
            'This route is opted out from authorization because the tags client internals leverages the SO client',
        },
      },
      validate: {
        body: schema.object({
          name: schema.string(),
          description: schema.string(),
          color: schema.string(),
        }),
      },
    },
    router.handleLegacyErrors(async (ctx, req, res) => {
      try {
        const { tagsClient } = await ctx.tags;

        const existingTag = await tagsClient.findByName(req.body.name, { exact: true });
        if (existingTag) {
          return res.conflict({
            body: `A tag with the name "${req.body.name}" already exists.`,
          });
        }

        const tag = await tagsClient.create(req.body);
        return res.ok({
          body: {
            tag,
          },
        });
      } catch (e) {
        if (e instanceof TagValidationError) {
          return res.badRequest({
            body: {
              message: e.message,
              attributes: e.validation,
            },
          });
        }
        throw e;
      }
    })
  );
};
