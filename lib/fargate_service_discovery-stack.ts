import { VPCResources } from "./vpc_resources";
import { FargateResources } from "./fargate_resources";
import { ALBResources } from "./alb_resources";

import cdk = require("@aws-cdk/core");

export class FargateServiceDiscoveryStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const vpcResources = new VPCResources(this, "VPCResources");
    const fargateResources = new FargateResources(this, "FargateResources", {
      vpc: vpcResources.vpc
    });

    new ALBResources(this, "ALBResources", {
      vpc: vpcResources.vpc,
      fargateService: fargateResources.fargateService
    });
  }
}
