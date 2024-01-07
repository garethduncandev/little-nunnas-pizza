#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { ApplicationStack } from '../lib/application-stack';

const app = new cdk.App();

const environmentName = app.node.tryGetContext('ENVIRONMENT_NAME');

if (environmentName) {
  new ApplicationStack(app, `nunnaspizza-${environmentName}`, {
    domain: 'nunnas.pizza',
    subDomain: environmentName,
    robotsNoIndex: true,
    aspNetCoreEnvironment: 'Development',
  });
}

new ApplicationStack(app, 'nunnaspizza-dev', {
  domain: 'nunnas.pizza',
  subDomain: 'dev',
  robotsNoIndex: true,
  aspNetCoreEnvironment: 'Development',
});

new ApplicationStack(app, 'nunnaspizza-blue', {
  domain: 'nunnas.pizza',
  subDomain: 'blue',
  robotsNoIndex: true,
  aspNetCoreEnvironment: 'ProductionBlue',
});

new ApplicationStack(app, 'nunnaspizza-green', {
  domain: 'nunnas.pizza',
  subDomain: 'green',
  robotsNoIndex: true,
  aspNetCoreEnvironment: 'ProductionGreen',
});

new ApplicationStack(app, 'nunnaspizza-prod', {
  domain: 'nunnas.pizza',
  subDomain: undefined,
  robotsNoIndex: true,
  aspNetCoreEnvironment: 'Production',
});
