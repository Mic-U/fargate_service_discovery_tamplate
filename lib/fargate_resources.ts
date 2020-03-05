import { StackProps, Construct, CfnParameter, Duration } from "@aws-cdk/core";
import {
  Cluster,
  FargateTaskDefinition,
  RepositoryImage,
  Protocol,
  FargateService
} from "@aws-cdk/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "@aws-cdk/aws-ecs-patterns";
import { Role, ServicePrincipal, ManagedPolicy } from "@aws-cdk/aws-iam";
import { NamespaceType, DnsRecordType } from "@aws-cdk/aws-servicediscovery";
import { Vpc } from "@aws-cdk/aws-ec2";

interface FargateResourcesProp extends StackProps {
  vpc: Vpc;
}

export class FargateResources extends Construct {
  public readonly fargateService: FargateService;

  constructor(scope: Construct, id: string, prop: FargateResourcesProp) {
    super(scope, id);
    const namespaceParam = new CfnParameter(this, "Namespace", {
      type: "String",
      description: "The name of the namespace, such as example.com.",
      default: "example.com."
    });

    const cluster = new Cluster(this, "Cluster", {
      vpc: prop.vpc,
      defaultCloudMapNamespace: {
        name: namespaceParam.valueAsString,
        type: NamespaceType.DNS_PRIVATE,
        vpc: prop.vpc
      }
    });

    const taskRole = new Role(this, "TaskRole", {
      assumedBy: new ServicePrincipal("ecs-tasks.amazonaws.com")
    });
    taskRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AmazonECSTaskExecutionRolePolicy"
      )
    );

    const executionRole = new Role(this, "TaskExecutionRole", {
      assumedBy: new ServicePrincipal("ecs-tasks.amazonaws.com")
    });
    executionRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AmazonECSTaskExecutionRolePolicy"
      )
    );

    const taskDefinition = new FargateTaskDefinition(this, "TaskDefinition", {
      cpu: 256,
      memoryLimitMiB: 512,
      executionRole,
      taskRole
    });

    const webContainer = taskDefinition.addContainer("web", {
      image: new RepositoryImage("nginx")
    });

    webContainer.addPortMappings({
      containerPort: 80,
      protocol: Protocol.TCP
    });
    new ApplicationLoadBalancedFargateService(this, "FargateService", {
      cluster,
      taskDefinition,
      cloudMapOptions: {
        dnsRecordType: DnsRecordType.A,
        dnsTtl: Duration.seconds(60),
        failureThreshold: 3
      },
      desiredCount: 3
    });
  }
}
