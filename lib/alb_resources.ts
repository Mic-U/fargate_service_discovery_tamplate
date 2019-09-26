import { Construct, StackProps } from '@aws-cdk/core';
import { ApplicationLoadBalancer, ApplicationListener } from '@aws-cdk/aws-elasticloadbalancingv2';
import { Vpc, SubnetType } from '@aws-cdk/aws-ec2';
import { FargateService } from '@aws-cdk/aws-ecs';

interface ALBResourcesProp extends StackProps {
  vpc: Vpc;
  fargateService: FargateService;
}

export class ALBResources extends Construct {
  constructor(scope: Construct, id: string, prop: ALBResourcesProp) {
    super(scope, id);

    const alb = new ApplicationLoadBalancer(this, 'ALB', {
      vpc: prop.vpc,
      internetFacing: true,
      vpcSubnets: {
        subnetType: SubnetType.PUBLIC
      }
    });

    const listener = new ApplicationListener(this, 'ALBListener', {
      loadBalancer: alb,
      open: true,
      port: 80
    });

    listener.addTargets('Target', {
      port: 80,
      targets: [prop.fargateService]
    });

  }
}
