#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { ApplicationStack } from '../lib/application-stack';

const app = new cdk.App();

const prEnvironmentName = app.node.tryGetContext('PR_ENVIRONMENT_NAME');

if (prEnvironmentName) {
  new ApplicationStack(app, `nunnaspizza-${prEnvironmentName}`, {
    domain: 'littlenunnas.pizza',
    subDomain: prEnvironmentName,
    robotsNoIndex: true,
    aspNetCoreEnvironment: 'Development',
  });
}

new ApplicationStack(app, 'nunnaspizza-dev', {
  domain: 'littlenunnas.pizza',
  subDomain: 'dev',
  robotsNoIndex: true,
  aspNetCoreEnvironment: 'Development',
});

new ApplicationStack(app, 'nunnaspizza-blue', {
  domain: 'littlenunnas.pizza',
  subDomain: 'blue',
  robotsNoIndex: true,
  aspNetCoreEnvironment: 'ProductionBlue',
});

new ApplicationStack(app, 'nunnaspizza-green', {
  domain: 'littlenunnas.pizza',
  subDomain: 'green',
  robotsNoIndex: true,
  aspNetCoreEnvironment: 'ProductionGreen',
});

new ApplicationStack(app, 'nunnaspizza-prod', {
  domain: 'littlenunnas.pizza',
  subDomain: undefined,
  robotsNoIndex: false,
  aspNetCoreEnvironment: 'Production',
});
