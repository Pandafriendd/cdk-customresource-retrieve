import * as cdk from '@aws-cdk/core';

import { Code, Function as LambdaFunction, Runtime } from "@aws-cdk/aws-lambda";
import { CfnOutput, CustomResource, Duration } from '@aws-cdk/core';
import { Provider } from '@aws-cdk/custom-resources';

export class CdkCustomresourceRetrieveStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const lambdaCode = `
var response = require('cfn-response');
exports.onEvent = function(event, context) {
  var responseData = {"myatt": "test"};
  response.send(event, context, response.SUCCESS, responseData);
};
    `;

    const onEventFunction = new LambdaFunction(this, "OnEventLambda", {
      code: Code.fromInline(lambdaCode),
      handler: "index.onEvent",
      runtime: Runtime.NODEJS_12_X,
    });

    const provider = new Provider(this, "Provider", {
      onEventHandler: onEventFunction,
    });

    const customResource = new CustomResource(this, "CustomResource", {
      serviceToken: provider.serviceToken,
      resourceType: "Custom::Test",   // !!!!
    });
    
    const customResource2 = new CustomResource(this, "CustomResource2", {
      serviceToken: provider.serviceToken,
      //resourceType: "Custom::Test",   // worked
    });
    
    
    const output = customResource2.getAttString("myatt"); 
    
    const c = new CfnOutput(this, "OutputTest", {
      value: output,
    });
    
  }
}
