import { Duration } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs/lib/construct';
import path = require('path');

export class LambdaDockerImageFunctionProps {
  public constructor(public readonly aspNetCoreEnvironment: string) {}
}

export class LambdaDockerImageFunction extends Construct {
  public readonly dockerImageFunction: DockerImageFunction;

  public constructor(
    scope: Construct,
    id: string,
    props: LambdaDockerImageFunctionProps
  ) {
    super(scope, id);

    const code = DockerImageCode.fromImageAsset(
      path.join(
        __dirname,
        '../../../api/src/Web/bin/Release/net8.0/linux-x64/publish'
      )
    );

    this.dockerImageFunction = new DockerImageFunction(
      this,
      'docker-image-function',
      {
        code: code,
        memorySize: 128,
        timeout: Duration.seconds(30),
        environment: {
          ASPNETCORE_ENVIRONMENT: props.aspNetCoreEnvironment,
        },
      }
    );

    // Additional policy statements to allow the lambda to
    // send emails, read SSM parameters, and decrypt KMS keys
    this.dockerImageFunction.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          'ses:SendEmail',
          'ses:SendRawEmail',
          'ssm:GetParameter',
          'ssm:GetParameters',
          'ssm:GetParametersByPath',
          'kms:Decrypt',
        ],
        resources: ['*'],
      })
    );
  }
}
