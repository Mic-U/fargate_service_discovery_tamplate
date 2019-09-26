import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import {VPCResources} from '../lib/vpc_resources';

const app = new cdk.App();
const stack = new VPCResources(app, 'TestVPCResources');

test('VPCResources has "AWS::EC2::VPC"', () => {
  expectCDK(stack).to(haveResource('AWS::EC2::VPC'));
});

test('VPCResources has "AWS::EC2::Subnet"', () => {
  expectCDK(stack).to(haveResource('AWS::EC2::Subnet'));
});

test('VPCResources has "AWS::EC2::RouteTable"', () => {
  expectCDK(stack).to(haveResource('AWS::EC2::RouteTable'));
});

test('VPCResources has "AWS::EC2::Route"', () => {
  expectCDK(stack).to(haveResource('AWS::EC2::Route'));
});

test('VPCResources has "AWS::EC2::InternetGateway"', () => {
  expectCDK(stack).to(haveResource('AWS::EC2::InternetGateway'));
});

test('VPCResources has "AWS::EC2::EIP"', () => {
  expectCDK(stack).to(haveResource('AWS::EC2::EIP'));
});

test('VPCResources has "AWS::EC2::NatGateway"', () => {
  expectCDK(stack).to(haveResource('AWS::EC2::NatGateway'));
});
