/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { shallow } from 'enzyme';
import React from 'react';

import { removeExternalLinkText } from '@kbn/securitysolution-io-ts-utils';
import { TestProviders } from '../../../../common/mock/test_providers';
import { useMountAppended } from '../../../../common/utils/use_mount_appended';

import { Port } from '.';

jest.mock('../../../../common/lib/kibana');

jest.mock('@elastic/eui', () => {
  const original = jest.requireActual('@elastic/eui');
  return {
    ...original,
    EuiScreenReaderOnly: () => <></>,
  };
});

describe('Port', () => {
  const mount = useMountAppended();

  test('renders correctly against snapshot', () => {
    const wrapper = shallow(<Port value="443" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('it renders the port', () => {
    const wrapper = mount(
      <TestProviders>
        <Port value="443" />
      </TestProviders>
    );

    expect(
      removeExternalLinkText(
        wrapper.find('[data-test-subj="port-or-service-name-link"]').first().text()
      )
    ).toContain('443');
  });

  test('it hyperlinks links destination.port to an external service that describes the purpose of the port', () => {
    const wrapper = mount(
      <TestProviders>
        <Port value="443" />
      </TestProviders>
    );

    expect(
      wrapper.find('[data-test-subj="port-or-service-name-link"]').first().props().href
    ).toEqual(
      'https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=443'
    );
  });
});
