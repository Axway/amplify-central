---
title: Administer AWS Gateway cloud
linkTitle: Administer AWS Gateway cloud
draft: false
weight: 25
---

As a Cloud Administrator / Operator, you are responsible for configuring and managing your organization’s AWS infrastructure. This topic contains setup and test details for the additional AWS services that are required for Axway’s agents to govern your AWS API Gateway service. The additional service which will be configured is AWS CloudWatch.

## Connected AWS API Gateway overview

Connecting AWS API Gateway to Amplify will provide you with a connected/managed environment, and a global centralized view of your APIs and their related traffic, allowing users to have a centralized governance (creation/deployment/publish/subscription) and monitoring of the traffic for AWS API Gateway hosted APIs.

Each AWS Gateway is represented by an Amplify environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents, Discovery and Traceability, interact with AWS API Gateway and Amplify.

### Minimum requirements

* [Amplify Platform Service Account](/docs/integrate_with_central/cli_central/cli_install/#option-2---authenticate-and-authorize-your-service-account)
* [API Key credentials on AWS](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html). Allowing for CLI access.
* [Amazon CloudWatch Service](https://aws.amazon.com/cloudwatch/)
* CloudFormation template. Download the latest "Amplify AWS Agents CloudFormation" install zip file from [https://repository.axway.com/catalog?q=aws](https://repository.axway.com/catalog?q=aws).

### CloudFormation templates

The CloudFormation templates (`amplify-agents-deploy-all.yaml amplify-agents-setup.yaml amplify-agents-ec2.yaml amplify-agents-ecs-fargate.yaml`) configure the additional AWS services `CloudWatch` that the agents require to function normally as well as optionally deploy the agents to `EC2` or `ECS`.

Upload all of these resources to an S3 Bucket, within the target region. Take note of the bucket name and URL to the `amplify-agents-deploy-all.yaml`.

If deploying the EC2 instance within these templates, additionally create the following file structure that the instance will retrieve for the agents:

```json
[my-bucket-name]
    amplify-agents-deploy-all.yaml
    amplify-agents-ec2.yaml
    amplify-agents-ecs-fargate.yaml
    amplify-agents-setup.yaml
    resources
    |    da_env_vars.env
    |    ta_env_vars.env
```

For the values in these **\*_env_var.env** files, see [Reference - Agent configuration](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-1).

For the list of minimum access rights for these CloudFormation templates, see [Minimum rights for CloudFormation deployment](#minimum-rights-for-cloudformation-deployment).

#### CloudFormation deployments and options

The Cloud formation templates are designed to be as flexible as possible. They provide different options to customize the installation the way that suits your company standard.

* IAM Resources options:
    * Manually create the IAM resources [CloudFormation (without IAM)](#cloudformation-without-iam)
    * Allow the CloudFormation the ability to create the resources on your behalf. The resources created vary depending on the agent deployment type. [Resources (IAM and Resources)](#resources-iam-and-resources)
* Agents deployment options:
    * **EC2** - optionally creates the entire infrastructure around the EC2 instance or specify the VPC, Subnet, and Security Group for the instance
    * **ECS Fargate** - requires an ECS Fargate cluster and EC2 Subnet and Security Group for deployment. [ECS Fargate Cluster](https://docs.aws.amazon.com/AmazonECS/latest/userguide/create_cluster.html)
    * **Other** - creates an IAM Group and User, access and secret keys must be generated, for the agents to run with. The agent must be installed manually in a Docker container.

#### Parameters (IAM and Resources)

The inputs to the IAM Setup CloudFormation Template (`amplify-agents-deploy-all.yaml`):

| Parameter Name                  | Description                                                                                                    | Default Value                   |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| AgentResourcesBucket            | The S3 Bucket that has the resources needed for deploying this stack and nested stack templates                |                                 |
| APIGWCWRoleSetup                | If set to true, the IAM Role for the API Gateway Service to write logs to CloudWatch will be created           | true                            |
| APIGWTrafficLogGroupName        | The name of the CloudWatch Log Group to be created, for AWS API Gateway to log traffic to                      | aws-apigw-traffic-logs          |
| DeploymentType                  | How the agents will be deployed for this installation. (EC2, ECS Fargate, Other)                               | EC2                             |
| EC2InstanceType                 | The instance type to use for this EC2 instance                                                                 | t3.micro                        |
| EC2KeyName                      | The SSH Key to deploy inside the EC2 instance                                                                  |                                 |
| EC2VPCID                        | The VPC to deploy the EC2 instance to. Leave blank to deploy all infrastructure                                |                                 |
| EC2PublicIPAddress              | Assign a Public IP address. The agents needs internet access for Amplify communication                         | true                            |
| EC2SSHLocation                  | The CIDR range that is allowed to SSH to the instance                                                          | 0.0.0.0/0                       |
| ECSClusterName                  | The name of the ECS Fargate Cluster for the ECS tasks to be deployed to                                        |                                 |
| ECSCentralOrganizationID        | The Amplify Organization ID to add to the ECS tasks                                                            |                                 |
| ECSCentralEnvironmentName       | The Amplify Environment that the agents will be associated with                                                |                                 |
| ECSCentralDiscoveryAgentName    | The Amplify Discovery Agent name                                                                               |                                 |
| ECSCentralTraceabilityAgentName | The Amplify Traceability Agent name                                                                            |                                 |
| ECSCentralRegion                | The Amplify Region to connect to (`US`, `EU`,`AP`)                                                             |                                 |
| ECSCentralClientID              | The Amplify Client ID that the agents will use to communicate to Amplify                                       |                                 |
| DiscoveryAgentLogGroupName      | The name that the Discovery Agent running on EC2 will log to                                                   | amplify-discovery-agent-logs    |
| TraceabilityAgentLogGroupName   | The name that the Traceability Agent running on EC2 will log to                                                | amplify-traceability-agent-logs |
| SSMPrivateKeyParameter          | The key name in SSM Parameter Store holding the Amplify Private Key                                            | AmplifyPrivateKey               |
| SSMPublicKeyParameter           | The key name in SSM Parameter Store holding the Amplify Public Key                                             | AmplifyPublicKey                |
| SecurityGroup                   | The Security Group ID to associate with the ECS task or EC2 instance, if not deploying complete infrastructure |                                 |
| Subnet                          | The Subnet to associate with the ECS task or EC2 instance, if not deploying complete infrastructure            |                                 |

#### Resources (IAM and Resources)

The resources created by the CloudFormation template:

| Resource Type                         | Resource Name                     | Condition                            | Description                                                                 |
| ------------------------------------- | --------------------------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| AWS::IAM::Role                        | TraceabilityAPIGWCWIAMRole        | APIGWCWRoleSetup = true              | Creates the IAM Role for API Gateway to write logs to CloudWatch            |
| AWS::IAM::ManagedPolicy               | APICAgentsPolicy                  |                                      | Creates the IAM Policy that the agents will utilize                         |
| AWS::IAM::Role                        | AgentsInstanceRole                | DeploymentType = EC2                 | Creates the IAM Instance Role to assign to the IAM instance role            |
| AWS::IAM::Role                        | AgentsTaskExecutionRole           | DeploymentType = ECS Fargate         | Creates the IAM Role that is assigned to the ECS tasks for execution rights |
| AWS::IAM::InstanceProfile             | AgentsInstanceProfile             | DeploymentType = EC2                 | Creates the IAM Instance Profile to assign to the EC2 instance              |
| AWS::IAM::Group                       | APICAgentsGroup                   | DeploymentType = Other               | Creates the IAM Group which has the APICAgentsPolicy                        |
| AWS::IAM::User                        | APICAgentsUser                    | DeploymentType = Other               | Creates the IAM User to generate keys for to supply to the agents           |
| AWS::CloudFormation::Stack            | ResourcesStack                    |                                      | Creates the Resources Stack for the APIC Agents                             |
| AWS::CloudFormation::Stack            | EC2Stack                          | DeploymentType = EC2                 | Creates the EC2 Stack for the APIC Agents                                   |
| AWS::CloudFormation::Stack            | ECSStack                          | DeploymentType = ECS Fargate         | Creates the ECS Stack for the APIC Agents                                   |
| **Nested Stack Resources**            |                                   |                                      |                                                                             |
| amplify-agents-setup.yaml             |                                   |                                      |                                                                             |
| AWS::Logs::LogGroup                   | TraceabilityAccessLogGroup        |                                      | Creates the Log Group to track access of APIC tracked API Gateway endpoints |
| AWS::ApiGateway::Account              | TraceabilityAPIGWCWRole           | TraceabilityAPIGWCWRoleArn not blank | Sets the CloudWatch Role ARN in the API Gateway Settings                    |
| amplify-agents-ec2.yaml               |                                   |                                      |                                                                             |
| AWS::EC2::VPC                         | AgentsVPC                         | VpcID not blank                      | The VPC the instance will be deployed to                                    |
| AWS::EC2::Subnet                      | AgentsSubnet                      | VpcID not blank                      | The Subnet to deploy the EC2 instance in                                    |
| AWS::EC2::RouteTable                  | AgentsRouteTable                  | VpcID not blank                      | The route table for defining routes for the VPC                             |
| AWS::EC2::SubnetRouteTableAssociation | AgentsRouteTableSubnetAssociation | VpcID not blank                      | Associates the Subnet with the VPC and Route Table                          |
| AWS::EC2::Route                       | AllowInternetTraffic              | VpcID not blank                      | The route to direct all traffic in the VPC to the internet                  |
| AWS::EC2::SecurityGroup               | AgentsSecurityGroup               | VpcID not blank                      | The Security Group assigned to the VPC, allowing SSH only to the host       |
| AWS::EC2::InternetGateway             | InternetGW                        | VpcID not blank                      | The Internet Gateway so the agents can talk to Amplify                      |
| AWS::EC2::VPCGatewayAttachment        | GatewayAttachment                 | VpcID not blank                      | Attaches the Internet Gateway to the VPC                                    |
| AWS::EC2::Instance                    | AgentsHost                        |                                      | The EC2 instance that the agents wil run in                                 |
| amplify-agents-ecs-fargate.yaml       |                                   |                                      |                                                                             |
| AWS::ECS::TaskDefinition              | AmplifyAgentsTask                 |                                      | The ECS task that defines both of the agents                                |
| AWS::ECS::Service                     | AmplifyAgentsService              |                                      | The ECS service that runs the agents ECS task                               |

#### Access Credentials (optional)

If not deploying within an EC2 instance, an Access and Secret Key for the user should be created and given to the person deploying the agent. Please follow your organizations key rotation policies. See [Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

### CloudFormation (without IAM)

Before deploying the resources template, the following IAM resources should be created and ARN given to the user deploying the CloudFormation template.

For the list of minimum access rights for these CloudFormation templates, see [Minimum rights for CloudFormation deployment](#minimum-rights-for-cloudformation-deployment).

#### Required IAM Resources

If you prefer to create IAM Resources outside of the CloudFormation script, the following must be created:

##### TraceabilityAPIGWCWIAMRole

This role is used by AWS APIGW to save its usage events to an AWS CloudWatch log.

Assume Role Policies

| Service                  | Description                                                        |
| ------------------------ | ------------------------------------------------------------------ |
| apigateway.amazonaws.com | This assume role policy lets the API Gateway service use this role |

Managed Policies

| Managed Policy ARN                                                        | Description                                                                   |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs | This policy is needed so the API Gateway service can write to CloudWatch logs |

##### APICAgentsPolicy

The policy has all of the access required by the APICAgentsUser
.

Policies

| Effect | Action                  | Resource                                                           | Description                                                                                                     |
| ------ | ----------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Allow  | logs:DescribeLogGroups  | All log groups in AWS account and Region                           | Used to validate the connection to AWS CloudWatch on Agent Startup                                              |
| Allow  | logs:DescribeLogStreams | API-Gateway-Execution-Logs_* log groups in account and region      | Allows the agent to get the streams for API Gateway Execution Logs                                              |
| Allow  | logs:GetLogEvents       | API-Gateway-Execution-Logs_* log groups in account and region      | Allows the agent to get log events for API Gateway Execution Logs                                               |
| Allow  | logs:FilterLogEvents    | API-Gateway-Execution-Logs_* log groups in account and region      | Allows the agent to get log events for specific transactions in API Gateway                                     |
| Allow  | logs:PutLogEvents       | Log streams for the Discovery and Traceability agents log group    | Allows the agent, via docker on the EC2 instance, to log to CloudWatch                                          |
| Allow  | logs:CreateLogGroup     | Log streams for the Discovery and Traceability agents log group    | Allows the agent, via docker on the EC2 instance, to create its log group in CloudWatch                         |
| Allow  | logs:CreateLogStream    | Log streams for the Discovery and Traceability agents log group    | Allows the agent, via docker on the EC2 instance, to create a log stream in CloudWatch                          |
| Allow  | logs:DescribeLogStreams | The Discovery and Traceability agents log group                    | Allows the agent, via docker on the EC2 instance, to determine if it needs to create a log group on CloudWatch  |
| Allow  | apigateway:PUT          | All API Gateway Resources in region                                | Allows the Discovery Agent to make updates to the API Endpoints                                                 |
| Allow  | apigateway:PATCH        | All API Gateway Resources in region                                | Allows the Discovery Agent to make updates to the API Endpoints                                                 |
| Allow  | apigateway:GET          | All API Gateway Resources in region                                | Allows the Discovery Agent to get the configuration of the API Endpoints                                        |
| Allow  | apigateway:DELETE       | All API Gateway Resources in region                                | Allows the Discovery Agent to remove tags for Unsubscribe events                                                |
| Allow  | s3:ListBucket           | The bucket set as the AgentsResourceBucket when creating the stack | Used by the EC2 instance to list all files in the resources directory of the bucket, for the agent execution    |
| Allow  | s3:GetObjectAcl         | The bucket set as the AgentsResourceBucket when creating the stack | Used by the EC2 instance to get all the files in the resources directory of the bucket, for the agent execution |
| Allow  | s3:GetObject            | The bucket set as the AgentsResourceBucket when creating the stack | Used by the EC2 instance to get all the files in the resources directory of the bucket, for the agent execution |
| Allow  | ssm:GetParameter        | The Parameters for the Amplify keys in the region                  | Used by the EC2 instance or ECS task to get the keys needed to access Amplify resources                         |
| Allow  | ssm:GetParameters       | The Parameters for the Amplify keys in the region                  | Used by the EC2 instance or ECS task to get the keys needed to access Amplify resources                         |

##### AgentsInstanceRole

The role that is assigned to the EC2 instance profile so the agents may access the APICAgentsPolicy.

Assume Role Policies

| Service           | Description                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| ec2.amazonaws.com | Allows the EC2 instance that will run the agents the ability to access the services the agents need to execute |

Managed Policy

| Managed Policy     | Description              |
| ------------------ | ------------------------ |
| AgentsInstanceRole | The role described above |

##### AgentsInstanceProfile

The instance profile that will be assigned to the EC2 instance
.

Role

| Role               | Description              |
| ------------------ | ------------------------ |
| AgentsInstanceRole | The role described above |

##### AgentsTaskExecutionRole

The role that is assigned to the ECS task so the agents may access the APICAgentsPolicy
.

Assume Role Policies

| Service                 | Description                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| ecs-tasks.amazonaws.com | Allows the ECS task that will run the agents the ability to access the services the agents need to execute |

Managed Policy

| Managed Policy     | Description              |
| ------------------ | ------------------------ |
| AgentsInstanceRole | The role described above |

##### APICAgentsGroup

The group that is assigned the APICAgentsPolicy.

##### APICAgentsUser

The user that the APIC Agents will log in as, added to the APICAgentsGroup.

An access and secret key for the user should be created and given to the person deploying the agent, please follow your organizations key rotation policies. See [Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

##### Parameters (Setup only)

The inputs to the IAM Setup CloudFormation Template (`amplify-agents-setup.yaml`):

| Parameter Name           | Description                                                                                          | Default Value          |
| ------------------------ | ---------------------------------------------------------------------------------------------------- | ---------------------- |
| APIGWCWRoleSetup         | If set to true, the IAM role for the API Gateway Service to write logs to CloudWatch will be created | true                   |
| APIGWTrafficLogGroupName | The name of the CloudWatch Log Group to be created, for AWS API Gateway to log traffic to            | aws-apigw-traffic-logs |

#### Resources (Setup only)

The services that are configured with this CloudFormation template:

### Testing the setup for the AWS Traceability Agent

{{< alert title="Note" color="primary" >}}To test the AWS Traceability Agent setup, the AWS Discovery Agent should be running and have discovered an API. This is required as the Stage config is updated to log transactional data.{{< /alert >}}

* Send traffic through an API that the DA has discovered
* Validate logging in CloudWatch under the Log group named after the REST API ID/Stage

### Connecting AWS API Gateway to Amplify

* [Deploy agents](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-1/)

### Agents AWS Cost

The AWS cost of the agent will depend on your traffic usage. The more traffic you have the more it will cost.
You can follow your cost using the AWS [Cost management service](https://console.aws.amazon.com/cost-management/home#/dashboard).
The following are the costs of the AWS services the Agents rely on:

* AWS [Cloud formation pricing](https://aws.amazon.com/cloudformation/pricing/)</br>
  The two CloudFormation templates do not add additional charges, as they are used only once and create only AWS:: resources.
* AWS [CloudWatch pricing](https://aws.amazon.com/cloudwatch/pricing/)</br>
  You should be able to operate with the free tier, as the agent requires only one monitoring metrics (APIGW_Traceability_Logs).
* AWS [API Gateway pricing](https://aws.amazon.com/api-gateway/pricing/)</br>
  The Amazon API Gateway free tier includes one million API calls received for REST APIs, one million API calls received for HTTP APIs, and one million messages and 750,000 connection minutes for WebSocket APIs per month for up to 12 months. If you exceed this number of calls per month, you will be charged the API Gateway usage rates. There are different rates based on the API type (HTTP / REST / Websocket).

Summary:

| AWS Service     | Cost in USD per month                                                                   |
| --------------- | --------------------------------------------------------------------------------------- |
| Cloud Formation | 0                                                                                       |
| S3 bucket       | 0                                                                                       |
| CloudWatch      | 0                                                                                       |
| API Gateway     | refer to [API Gateway pricing](https://aws.amazon.com/api-gateway/pricing/) for details |

### Minimum rights for CloudFormation deployment

The required privileges to deploy the CloudFormation templates to the AWS platform are listed below.

Note that these privileges do not include those necessary for rollback, if the stack fails, or removing the stack if needed.

| Action                                | Resources                                                                           | Template                   | Condition                    |
| ------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------- | ---------------------------- |
| cloudformation:ListStackResources     | The stacks being created                                                            | all                        |                              |
| cloudformation:ListStacks             | The stacks being created                                                            | all                        |                              |
| cloudformation:DescribeStackResource  | The stacks being created                                                            | all                        |                              |
| cloudformation:DescribeStackResources | The stacks being created                                                            | all                        |                              |
| cloudformation:GetTemplateSummary     | The stacks being created                                                            | all                        |                              |
| cloudformation:CreateStack            | The stacks being created                                                            | all                        |                              |
| s3:ListBuckets                        | AgentResourcesBucket                                                                | all                        |                              |
| s3:GetObject                          | CloudFormation templates                                                            | amplify-agents-setup       |                              |
| apigateway:PATCH                      | /account                                                                            | amplify-agents-setup       | APIGWCWRoleSetup = true      |
| logs:DescribeLogGroups                | DiscoveryAgentLogGroupName, TraceabilityAgentLogGroupName, TraceabilityLogGroupName | amplify-agents-deploy-all  |                              |
| logs:CreateLogGroup                   | DiscoveryAgentLogGroupName, TraceabilityAgentLogGroupName, TraceabilityLogGroupName | amplify-agents-setup       |                              |
| logs:PutSubscriptionFilter            | TraceabilityLogGroupName                                                            | amplify-agents-setup       |                              |
| ec2:DescribeInstances                 | AgentsHost                                                                          | amplify-agents-ec2         |                              |
| ec2:RunInstances                      | AgentsHost                                                                          | amplify-agents-ec2         |                              |
| ec2:AssociateIamInstanceProfile       | AgentsHost                                                                          | amplify-agents-ec2         |                              |
| ec2:DescribeKeyPairs                  | Keys that can be added to the Instance                                              | amplify-agents-ec2         |                              |
| ec2:DescribeVpcs                      | AgentsVPC or parameter VpcId (EC2StackVPCID)                                        | amplify-agents-ec2         | VpcId = ""                   |
| ec2:CreateVpc                         | AgentsVPC                                                                           | amplify-agents-ec2         | VpcId = ""                   |
| ec2:ModifyVpcAttribute                | AgentsVPC                                                                           | amplify-agents-ec2         | VpcId = ""                   |
| ec2:AssociateRouteTable               | AgentsVPC                                                                           | amplify-agents-ec2         | VpcId = ""                   |
| ec2:AttachInternetGateway             | AgentsVPC                                                                           | amplify-agents-ec2         | VpcId = ""                   |
| ec2:CreateSecurityGroups              | AgentsSecurityGroup                                                                 | amplify-agents-ec2         | VpcId = ""                   |
| ec2:AuthorizeSecurityGroupIngress     | AgentsSecurityGroup                                                                 | amplify-agents-ec2         | VpcId = ""                   |
| ec2:DescribeSecurityGroups            | AgentsSecurityGroup or parameter SecurityGroup (EC2StackSecurityGroup)              | amplify-agents-ec2         |                              |
| ec2:CreateSubnet                      | AgentsSubnet                                                                        | amplify-agents-ec2         | VpcId = ""                   |
| ec2:DescribeSubnets                   | AgentsSubnet or parameter Subnet (EC2StackSubnet)                                   | amplify-agents-ec2         |                              |
| ec2:CreateInternetGateway             | AgentsInternetGW                                                                    | amplify-agents-ec2         | VpcId = ""                   |
| ec2:DescribeInternetGateways          | AgentsInternetGW                                                                    | amplify-agents-ec2         | VpcId = ""                   |
| ec2:DescribeAvailabilityZones         | Availability Zones in Region                                                        | amplify-agents-ec2         | VpcId = ""                   |
| ec2:DescribeRouteTables               | AgentsRouteTable                                                                    | amplify-agents-ec2         | VpcId = ""                   |
| ec2:CreateRouteTable                  | AgentsRouteTable                                                                    | amplify-agents-ec2         | VpcId = ""                   |
| ec2:CreateRoute                       | AgentAllowInternetTraffic                                                           | amplify-agents-ec2         | VpcId = ""                   |
| ec2:DescribeAccountAttributes         | AWS Account                                                                         | amplify-agents-ec2         | VpcId = ""                   |
| ecs:CreateService                     | AmplifyAgentsService                                                                | amplify-agents-ecs-fargate | DeploymentType = ECS Fargate |
| ecs:DescribeServices                  | AmplifyAgentsService                                                                | amplify-agents-ecs-fargate | DeploymentType = ECS Fargate |
| ecs:RegisterTaskDefinition            | \*                                                                                  | amplify-agents-ecs-fargate | DeploymentType = ECS Fargate |
| ecs:DescribeTaskDefinition            | \*                                                                                  | amplify-agents-ecs-fargate | DeploymentType = ECS Fargate |
| iam:ListRoles                         | TraceabilityAPIGWCWIAMRole, AgentsInstanceRole                                      | amplify-agents-deploy-all  |                              |
| iam:GetRole                           | TraceabilityAPIGWCWIAMRole, AgentsInstanceRole                                      | amplify-agents-deploy-all  |                              |
| iam:CreateRole                        | TraceabilityAPIGWCWIAMRole, AgentsInstanceRole                                      | amplify-agents-deploy-all  |                              |
| iam:PassRole                          | TraceabilityAPIGWCWIAMRole, AgentsInstanceRole                                      | amplify-agents-deploy-all  |                              |
| iam:GetRolePolicy                     | APICAgentsPolicy                                                                    | amplify-agents-deploy-all  |                              |
| iam:GetUserPolicy                     | APICAgentsPolicy                                                                    | amplify-agents-deploy-all  | DeploymentType = Other       |
| iam:CreatePolicy                      | APICAgentsPolicy                                                                    | amplify-agents-deploy-all  |                              |
| iam:PutRolePolicy                     | APICAgentsPolicy                                                                    | amplify-agents-deploy-all  |                              |
| iam:GetUser                           | APICAgentsUser                                                                      | amplify-agents-deploy-all  | DeploymentType = Other       |
| iam:CreateUser                        | APICAgentsUser                                                                      | amplify-agents-deploy-all  | DeploymentType = Other       |
| iam:AttachUserPolicy                  | APICAgentsUser                                                                      | amplify-agents-deploy-all  | DeploymentType = Other       |
| iam:CreateInstanceProfile             | AgentsInstanceProfile                                                               | amplify-agents-deploy-all  | DeploymentType = EC2         |
| iam:AddRoleToInstanceProfile          | AgentsInstanceRole                                                                  | amplify-agents-deploy-all  | DeploymentType = EC2         |
| iam:AttachRolePolicy                  | AgentsInstanceRole                                                                  | amplify-agents-deploy-all  | DeploymentType = EC2         |

### Troubleshooting

| Question                                              | Answer                                                                                                                                                                                                                |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Why isn’t my API discovered?                          | Check that the tag set on the stage has a correct name and value based on the AWS_FILTER variable. See [Discover APIs](/docs/connect_manage_environ/connect_aws_gateway/filtering-apis-to-be-discovered-1/).          |
| Why can’t my agents connect to AWS API Gateway?       | Go to AWS console / IAM service and make sure that `AWS_REGION`, `AWS_AUTH_ACCESSKEY` and `AWS_AUTH_SECRETKEY` are valid and not inactivated.                                                                         |
| Why can’t my agents connect to Amplify?               | Go to **Amplify Enterprise Marketplace WebUI > Access > Service Accounts** and make sure that the Service Account is correctly named and valid. Make sure that the organizationID and team configuration are correct. |
| Why don’t I see traffic in Amplify Business Insights? | Make sure that the Condor URL is accessible from the machine where Traceability Agent is installed.                                                                                                                   |
| How do I verify that the Agent is running?            | `docker inspect --format='{{json .State.Health}}' <container>`                                                                                                                                                        |
