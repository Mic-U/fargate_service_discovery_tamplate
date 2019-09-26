import cdk = require('@aws-cdk/core');
import {VPCResources} from './vpc_resources';

export class FargateServiceDiscoveryStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const vpcResources = new VPCResources(this, 'VPCResources');
  }
}
