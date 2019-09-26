import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import FargateServiceDiscovery = require('../lib/fargate_service_discovery-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new FargateServiceDiscovery.FargateServiceDiscoveryStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});