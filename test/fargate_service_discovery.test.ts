import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';
import { FargateServiceDiscoveryStack } from '../lib/fargate_service_discovery-stack';

const app = new App();
const stack = new FargateServiceDiscoveryStack(app, 'TestStack');

test('has VPC', () => {
  expectCDK(stack).to(haveResource('AWS::EC2::VPC', {
    CidrBlock: '10.0.0.0/16' // Default CidrBlock
  }));
});

test('has ALB', () => {
  expectCDK(stack).to(haveResource('AWS::ElasticLoadBalancingV2::LoadBalancer', {
    Scheme: 'internet-facing',
    Type: 'application'
  }));
});

test('has ALB Listener', () => {
  expectCDK(stack).to(haveResource('AWS::ElasticLoadBalancingV2::Listener', {
    Port: 80,
    Protocol: 'HTTP'
  }));
});

test('has FargateService', () => {
  expectCDK(stack).to(haveResource('AWS::ECS::Service', {
    LaunchType: 'FARGATE'
  }));
});

test('has Cluster', () => {
  expectCDK(stack).to(haveResource('AWS::ECS::Cluster'));
});
