/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import type { Story } from '@storybook/react';
import { FieldFinalReadOnly } from '../../field_final_readonly';
import type { DiffableRule } from '../../../../../../../../../common/api/detection_engine';
import { SeverityMappingReadOnly } from './severity_mapping';
import { mockCustomQueryRule } from '../../storybook/mocks';
import { ThreeWayDiffStorybookProviders } from '../../storybook/three_way_diff_storybook_providers';

export default {
  component: SeverityMappingReadOnly,
  title:
    'Rule Management/Prebuilt Rules/Upgrade Flyout/ThreeWayDiff/FieldReadOnly/severity_mapping',
};

interface TemplateProps {
  finalDiffableRule: DiffableRule;
}

const Template: Story<TemplateProps> = (args) => {
  return (
    <ThreeWayDiffStorybookProviders
      finalDiffableRule={args.finalDiffableRule}
      fieldName="severity_mapping"
    >
      <FieldFinalReadOnly />
    </ThreeWayDiffStorybookProviders>
  );
};

export const Default = Template.bind({});

Default.args = {
  finalDiffableRule: mockCustomQueryRule({
    severity_mapping: [
      {
        field: 'event.severity',
        operator: 'equals',
        severity: 'low',
        value: 'LOW',
      },
      {
        field: 'google_workspace.alert.metadata.severity',
        operator: 'equals',
        severity: 'high',
        value: 'VERY HIGH',
      },
    ],
  }),
};
