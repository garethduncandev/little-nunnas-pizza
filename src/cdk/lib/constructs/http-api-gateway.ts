import { HttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { Construct } from 'constructs/lib/construct';

export class HttpApiGateway extends Construct {
  public readonly httpApi: HttpApi;

  public constructor(scope: Construct, id: string) {
    super(scope, id);

    this.httpApi = new HttpApi(this, id);
  }
}
