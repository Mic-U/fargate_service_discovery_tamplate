import { Construct } from "@aws-cdk/core";
import { Vpc } from "@aws-cdk/aws-ec2";

export class VPCResources extends Construct {
  public readonly vpc: Vpc;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.vpc = new Vpc(this, "Vpc");
  }
}
