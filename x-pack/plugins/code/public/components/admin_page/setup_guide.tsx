/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import {
  EuiButton,
  EuiCallOut,
  EuiGlobalToastList,
  EuiPanel,
  EuiSpacer,
  EuiSteps,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import theme from '@elastic/eui/dist/eui_theme_light.json';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../reducers';

const Root = styled.div`
  padding: ${theme.euiSizeXXL} 0;
  margin: 0 auto;
  & > div {
    margin-top: ${theme.euiSizeL};
    width: 56rem;
  }
`;

const steps = [
  {
    title: 'Configure Kibana Code Instance',
    children: (
      <EuiText>
        <p>
          You need to configure 1 Kibana instance as Code instance to continue. Please add the
          following lines of code into your kibana.yml file for the instance that you want to use as
          your Code instance:
        </p>
        <pre>
          <code>xpack.code.codeNode: true</code>
        </pre>
        <p>Then, restart that Kibana instance.</p>
      </EuiText>
    ),
  },
  {
    title: 'Download and install language servers',
    children: (
      <EuiText>
        <p>
          If you need code intelligence support for your repos, you need to install the language
          server for the programming languages.
        </p>
        <p />
        <h5>PRE-INSTALLED LANGUAGE SERVERS:</h5>
        <p />
        Typescript
        <p />
        <h5>AVAILABLE LANGUAGE SERVERS:</h5>
        <p />
        Java
        <p />
        <Link to="/admin?tab=LanguageServers">Manage language server installation</Link>
      </EuiText>
    ),
  },
  {
    title: 'Import a repository from a git address',
    children: (
      <EuiText>
        <p>
          You can add a repo to Code by simply putting in the git address of the repo. Usually this
          is the same git address you use to run the git clone command, you can find more details
          about the formats of git addresses that Code accepts&nbsp;
          <Link to="">here</Link>.
        </p>
      </EuiText>
    ),
  },
  {
    title: 'Verify that your repo has been successfully imported',
    children: (
      <EuiText>
        <p>
          Once the repo is added and indexed successfully, you can verify that the repo is
          searchable and the code intelligence is available. You can find more details of how the
          search and code intelligence work in <Link to="">our docs</Link>.
        </p>
      </EuiText>
    ),
  },
];

// TODO add link to learn more button
const toastMessage = (
  <div>
    <p>
      We’ve made some changes to roles and permissions in Kibana. Read more about what these changes
      mean for you below.{' '}
    </p>
    <EuiButton size="s" href="">Learn More</EuiButton>
  </div>
);

class SetupGuidePage extends React.PureComponent<{ setupOk?: boolean }, { hideToast: boolean }> {
  constructor(props: { setupOk?: boolean }) {
    super(props);

    this.state = {
      hideToast: false,
    };
  }

  public render() {
    let setup = null;
    if (this.props.setupOk !== undefined) {
      setup = (
        <div>
          {!this.state.hideToast && (
            <EuiGlobalToastList
              toasts={[
                {
                  title: 'Permission Changes',
                  color: 'primary',
                  iconType: 'iInCircle',
                  text: toastMessage,
                  id: '',
                },
              ]}
              dismissToast={() => {
                this.setState({ hideToast: true });
              }}
              toastLifeTimeMs={10000}
            />
          )}
          <React.Fragment>
            {this.props.setupOk === false && (
              <EuiCallOut title="Code instance not found." color="danger" iconType="cross">
                <p>
                  Please follow the guide below to configure your Kibana instance and then refresh
                  this page.
                </p>
              </EuiCallOut>
            )}
            {this.props.setupOk === true && (
              <React.Fragment>
                <EuiSpacer size="xs" />
                <EuiButton iconType="sortLeft">
                  <Link to="/admin">Back To Project Dashboard</Link>
                </EuiButton>
              </React.Fragment>
            )}
            <EuiPanel>
              <EuiTitle>
                <h3>Getting started in Elastic Code</h3>
              </EuiTitle>
              <EuiSpacer />
              <EuiSteps steps={steps} />
            </EuiPanel>
          </React.Fragment>
        </div>
      );
    }
    return <Root>{setup}</Root>;
  }
}

const mapStateToProps = (state: RootState) => ({
  setupOk: state.setup.ok,
});

export const SetupGuide = connect(mapStateToProps)(SetupGuidePage);
