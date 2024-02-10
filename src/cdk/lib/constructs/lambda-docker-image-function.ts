import { Duration } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs/lib/construct';
import path = require('path');
import {
  StringParameter,
  ParameterTier,
  ParameterDataType,
} from 'aws-cdk-lib/aws-ssm';

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

    // const smtpHostParam = new StringParameter(this, `ssm`, {
    //   parameterName: `/littlenunnaspizza/${props.aspNetCoreEnvironment}/Smtp/Host`,
    //   stringValue: 'email-smtp.eu-west-2.amazonaws.com',
    //   tier: ParameterTier.STANDARD,
    //   dataType: ParameterDataType.TEXT,
    // });

    // const smtpPortParam = new StringParameter(this, `ssm`, {
    //   parameterName: `/littlenunnaspizza/${props.aspNetCoreEnvironment}/Smtp/Port`,
    //   stringValue: '25',
    //   tier: ParameterTier.STANDARD,
    //   dataType: ParameterDataType.TEXT,
    // });

    // const smtpUsernamePortParam = new StringParameter(this, `ssm`, {
    //   parameterName: `/littlenunnaspizza/${props.aspNetCoreEnvironment}/Smtp/Username`,
    //   stringValue: '',
    //   dataType: ParameterDataType.TEXT,
    //   tier: ParameterTier.STANDARD,
    // });

    // const smtpPasswordParam = new StringParameter(this, `ssm`, {
    //   parameterName: `/littlenunnaspizza/${props.aspNetCoreEnvironment}/Smtp/Password`,
    //   stringValue: '',
    //   dataType: ParameterDataType.TEXT,
    //   tier: ParameterTier.STANDARD,
    // });

    // smtpHostParam.grantRead(this.dockerImageFunction);
    // smtpPortParam.grantRead(this.dockerImageFunction);
    // smtpUsernamePortParam.grantRead(this.dockerImageFunction);
    // smtpPasswordParam.grantRead(this.dockerImageFunction);
  }
}
