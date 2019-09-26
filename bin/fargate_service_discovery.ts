#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { FargateServiceDiscoveryStack } from '../lib/fargate_service_discovery-stack';

const app = new cdk.App();
new FargateServiceDiscoveryStack(app, 'FargateServiceDiscoveryStack');
