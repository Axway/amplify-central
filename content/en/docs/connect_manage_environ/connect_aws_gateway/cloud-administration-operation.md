---
title: Administer AWS Gateway cloud
linkTitle: Administer AWS Gateway cloud
draft: false
weight: 25
description: As a Cloud Administrator / Operator, you are responsible for
  configuring and managing your organization’s AWS infrastructure. This topic
  contains setup and test details for the additional AWS services that are
  required for Axway’s agents to govern your AWS API Gateway service. The
  additional services which will be configured are AWS CloudWatch, AWS SQS, AWS
  Config, AWS KMS, and AWS Lambda.
---
## Overview

Connecting AWS API Gateway to Amplify Central will provide you with a connected/managed environment, and a global centralized view of your APIs and their related traffic, allowing users to have a centralized governance (creation/deployment/publish/subscription) and monitoring of the traffic for AWS API Gateway hosted APIs.

Each AWS Gateway is represented by an Amplify Central environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents, Discovery and Traceability, interact with AWS API Gateway and Amplify Central.

### Discovery Agent

The Discovery Agent has two operating modes, continuous discovery and synchronous discovery. It is important to know which mode will be used prior to deploying the CloudFormation stack. The same procedure is used in both modes, however inputs, outputs, and services used will differ slightly.

#### Continuous Discovery Overview

To deploy an API In the AWS API Gateway, you create an API deployment and associate it with a stage. The Axway Discovery Agent listens for new deployments and for stage updates to existing deployments. When the agent receives an event, it will publish or update Amplify Central with the API details. It is possible for the agent to publish the API information directly into the Unified Catalog, or it can be added to the environment associated with the agent in Amplify Central.

In order for the Discovery Agent to receive the API details, the following AWS services are used:

| AWS Service    | Purpose                                                                                                                                                                                                                                                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AWS Config     | Set up to monitor any configuration changes on API Gateway resources, specifically REST APIs and stages. When those changes are detected, they are sent to CloudWatch logs, and then they are sent to SQS.                                                                                                                                |
| AWS SQS        | The queue receives messages available to the Discovery Agent to find and determine what kind of resource that message is, what type of changes were made (update, delete, create). If needed, it will query against API Gateway to get additional information about those changes. Finally, the information is sent to the Amplify Platform. |
| AWS CloudWatch | Monitors resources and changes that the Discovery Agent made to the logging.                                                                                                                                                                                                                                                              |
| AWS KMS        | Used for encrypting and decrypting Discovery Agent SQS queue messages.                                                                                                                                                                                                                                                                    |

![Service Discovery](/Images/central/connect-aws-gateway/aws-discovery-agent_v2.png)

The AWS Discovery Agent discovers newly created, previously undiscovered REST APIs, as well as changes to the API's stages, which then updates the logging that enables the Traceability Agent (see below).

The agent only publishes APIs that pass the tagging criteria that is configured in the agent configuration file, see [Discover APIs](/docs/connect_manage_environ/connect_aws_gateway/filtering-apis-to-be-discovered-1/). The agent will use the tags which are associated with the stage that is associated with the API.

#### Synchronous Discovery Overview

To deploy an API in the AWS API Gateway, you create an API deployment and associate it with a stage. The Axway Discovery Agent, when executed, will find all APIs and stages in AWS API Gateway and send them to Amplify Central. Once synchronizing all resources, the agent will stop and no changes will be sent to Amplify Central until it is started again.

This operating mode does not utilize the AWS Config, SQS, or CloudWatch services as the continuous mode does.

### Traceability Agent

The Traceability Agent sends summaries to Amplify Central of the API traffic that has passed through the AWS API Gateway. The agent only sends a traffic summary for APIs that have been discovered.

The Traceability Agent is used to filter the AWS CloudWatch logs that are related to discovered APIs and prepare the transaction events that are sent to Amplify Platform. Each time an API is called by a consumer it will result in an event (summary + detail) being sent to Amplify Central. Business Insights provides a view of the traffic and API usage of APIs deployed to the Gateway.

In order for the Traceability Agent to monitor API traffic, the following AWS services are used:

| AWS Service    | Purpose                                                                                                                                                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AWS Lambda     | Runs code in response to events and automatically manages the computing resources required by that code. CloudWatch will write whenever a usage of an API is invoked. It is sent to the Lambda function, which parses out some pertinent information in order to track that usage and send it to SQS. |
| AWS SQS        | SQS messages are read by the Traceability Agent. The REST API ID and the stage ID are then queried back to CloudWatch for the additional transaction details (i.e. headers), in order to fully create a transaction object, which is then sent to the Amplify platform.                                  |
| AWS CloudWatch | Monitors when an API is consumed, and if the Discovery Agent made changes to the logging. Those events are logged to CloudWatch.                                                                                                                                                                         |
| AWS KMS        | Used for encrypting and decrypting Traceability Agent SQS queue messages.                                                                                                                                                                                                                                |

The Traceability Agent requires read write access to SQS and read only access to CloudWatch.

![Service Discovery](/Images/central/connect-aws-gateway/aws-traceability-agent_v2.png)

The AWS service usage cost for the agents is explain below.

### Minimum requirements

* [Amplify Platform Service Account](/docs/integrate_with_central/cli_central/cli_install/#option-2---authenticate-and-authorize-your-service-account)
* [API Key credentials on AWS](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html). Allowing for CLI access.
* [Amazon CloudWatch Service](https://aws.amazon.com/cloudwatch/)
* [Amazon Simple Queue Service](https://aws.amazon.com/sqs/)
* [AWS Lambda](https://aws.amazon.com/lambda/)
* [AWS Key Management Service (KMS)](https://aws.amazon.com/kms/)
* Agent Config Package [downloaded](<https://axway.jfrog.io/artifactory/ampc-public-generic-release/aws-agents/aws_apigw_agent_config/1.1.15/aws_apigw_agent_config-1.1.15.zip>)

### CloudFormation templates

The agent config package contains a Lambda function (`traceability_lambda.zip`) and CloudFormation templates.

Continuous discovery mode (`amplify-agents-deploy-all.yaml amplify-agents-resources.yaml amplify-agents-ec2.yaml`) which configure the additional AWS services (`CloudWatch, SQS, KMS, Lambda, and EC2`) that the agents require to function normally.

Synchronous discovery mode (`amplify-agents-deploy-all.yaml amplify-agents-resources.yaml`) which configure the additional AWS services (`AWS CloudWatch, AWS SQS, KMS, and AWS Lambda`) that the agents require to function normally.

Upload all of these resources to an S3 Bucket, within the target region. Take note of the bucket name and URL to the `amplify-agents-deploy-all.yaml`.

If deploying the EC2 instance within these templates, additionally create the following file structure that the instance will retrieve for the agents:

```json
[my-bucket-name]
    amplify-agents-deploy-all.yaml
    amplify-agents-ec2.yaml
    amplify-agents-ecs-fargate.yaml
    amplify-agents-resources.yaml
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

| Parameter Name                | Description                                                                                                                               | Default Value                   | Mode       |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| AgentResourcesBucket          | The S3 Bucket that has the resources needed for deploying this stack, lambda, and nested stack templates                                  |                                 | both       |
| APIGWCWRoleSetup              | If set to true, the IAM Role for the API Gateway Service to write logs to CloudWatch will be created                                      | true                            | both       |
| APIGWTrafficLogGroupName      | The name of the CloudWatch Log Group to be created, for AWS API Gateway to log traffic to                                                 | aws-apigw-traffic-logs          | both       |
| ConfigServiceSetup            | If set to true, the IAM Role for the Config Service will be created                                                                       | true                            | continuous |
| ConfigBucketName              | The name of the bucket the Config Service, if enabled, will store AWS Config Logs. The account number and region will be appended to this | apigw-config-discovery          | continuous |
| ConfigBucketExists            | If set to true, the Config Bucket will not be created                                                                                     | false                           | continuous |
| EncryptionKeyAlias            | The alias of the key used for encrypting the SQS queues                                                                                   | alias/sqs/encryptionKey         | both       |
| DiscoveryQueueName            | The name of the Queue that the Discovery Agent will read from                                                                             | aws-apigw-discovery             | continuous |
| TraceabilityQueueName         | The name of the Queue that the Traceability Lambda will be writing to and the Traceability Agent will read from                           | aws-apigw-traceability          | both       |
| DeploymentType                | How the agents will be deployed for this installation. (EC2, ECS Fargate, Other)                                                          | EC2                             | continuous |
| EC2InstanceType               | The instance type to use for this EC2 instance                                                                                            | t3.micro                        | continuous |
| EC2KeyName                    | The SSH Key to deploy inside the EC2 instance                                                                                             |                                 | continuous |
| EC2VPCID                      | The VPC to deploy the EC2 instance to. Leave blank to deploy all infrastructure                                                           |                                 | continuous |
| EC2PublicIPAddress            | Assign a Public IP address. The agents needs internet access for Amplify Central communication                                            | true                            | continuous |
| EC2SSHLocation                | The CIDR range that is allowed to SSH to the instance                                                                                     | 0.0.0.0/0                       | continuous |
| ECSClusterName                | The name of the ECS Fargate Cluster for the ECS tasks to be deployed to                                                                   |                                 | continuous |
| ECSCentralOrganizationID      | The Amplify Central Organization ID to add to the ECS tasks                                                                               |                                 | continuous |
| ECSCentralEnvironmentName     | The Amplify Central Environment that the agents will be associated with                                                                   |                                 | continuous |
| ECSCentralDiscoveryAgentName    | The Amplify Discovery Agent name                                                                                                        |                                 | continuous |
| ECSCentralTraceabilityAgentName | The Amplify Traceability Agent name                                                                                                     |                                 | continuous |
| ECSCentralURL                   | The Amplify Central URL to connect to, required for EU region                                                                           |                                 | continuous |
| ECSCentralDeployment            | The Amplify Central Deployment, required for EU region                                                                                  |                                 | continuous |
| ECSCentralTraceabilityHost      | The Amplify Central Traceability host, required for EU region                                                                           |                                 | continuous |
| ECSCentralClientID            | The Amplify Central Client ID (DOSA_xxxxxxx) that the agents will use to communicate to Amplify                                           |                                 | continuous |
| DiscoveryAgentLogGroupName    | The name that the Discovery Agent running on EC2 will log to                                                                              | amplify-discovery-agent-logs    | continuous |
| TraceabilityAgentLogGroupName | The name that the Traceability Agent running on EC2 will log to                                                                           | amplify-traceability-agent-logs | continuous |
| SSMPrivateKeyParameter        | The key name in SSM Parameter Store holding the Amplify Private Key                                                                       | AmplifyPrivateKey               | continuous |
| SSMPublicKeyParameter         | The key name in SSM Parameter Store holding the Amplify Public Key                                                                        | AmplifyPublicKey                | continuous |
| SecurityGroup                 | The Security Group ID to associate with the ECS task or EC2 instance, if not deploying complete infrastructure                            |                                 | continuous |
| Subnet                        | The Subnet to associate with the ECS task or EC2 instance, if not deploying complete infrastructure                                       |                                 | continuous |

#### Resources (IAM and Resources)

The resources created by the CloudFormation template:

| Resource Type                         | Resource Name                     | Condition                                                | Description                                                                                        | Operating Mode |
| ------------------------------------- | --------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------- |
| AWS::IAM::Role                        | ConfigServiceIAMRole              | ConfigServiceSetup = true                                | Creates the IAM Role for the Config Service                                                        | continuous     |
| AWS::IAM::Role                        | TraceabilityLambdaIAMRole         |                                                          | Creates the IAM Role for the Traceability Lambda Function                                          | both           |
| AWS::IAM::Role                        | TraceabilityAPIGWCWIAMRole        | APIGWCWRoleSetup = true                                  | Creates the IAM Role for API Gateway to write logs to CloudWatch                                   | both           |
| AWS::IAM::ManagedPolicy               | APICAgentsPolicy                  |                                                          | Creates the IAM Policy that the agents will utilize                                                | both           |
| AWS::IAM::Role                        | AgentsInstanceRole                | DeploymentType = EC2                                     | Creates the IAM Instance Role to assign to the IAM instance role                                   | continuous     |
| AWS::IAM::Role                        | AgentsTaskExecutionRole           | DeploymentType = ECS Fargate                             | Creates the IAM Role that is assigned to the ECS tasks for execution rights                        | continuous     |
| AWS::IAM::InstanceProfile             | AgentsInstanceProfile             | DeploymentType = EC2                                     | Creates the IAM Instance Profile to assign to the EC2 instance                                     | continuous     |
| AWS::IAM::Group                       | APICAgentsGroup                   | DeploymentType = Other                                   | Creates the IAM Group which has the APICAgentsPolicy                                               | both           |
| AWS::IAM::User                        | APICAgentsUser                    | DeploymentType = Other                                   | Creates the IAM User to generate keys for to supply to the agents                                  | both           |
| AWS::CloudFormation::Stack            | ResourcesStack                    |                                                          | Creates the Resources Stack for the APIC Agents                                                    | both           |
| AWS::CloudFormation::Stack            | EC2Stack                          | DeploymentType = EC2                                     | Creates the EC2 Stack for the APIC Agents                                                          | continuous     |
| AWS::CloudFormation::Stack            | ECSStack                          | DeploymentType = ECS Fargate                             | Creates the ECS Stack for the APIC Agents                                                          | continuous     |
| **Nested Stack Resources**            |                                   |                                                          |                                                                                                    |                |
| amplify-agents-resources.yaml         |                                   |                                                          |                                                                                                    | both           |
| AWS::Config::ConfigurationRecorder    | DiscoveryConfigRecorder           | ConfigServiceSetup = true                                | The setup needed to have Config start recording changes                                            | continuous     |
| AWS::Config::DeliveryChannel          | DiscoveryConfigDeliveryChannel    | ConfigServiceSetup = true                                | The delivery channel used by Config to send the configurations to ConfigBucket                     | continuous     |
| AWS::S3::Bucket                       | DiscoveryConfigBucket             | ConfigServiceSetup = true and ConfigBucketExists = false | The S3 bucket used to store all current configurations, required for Config                        | continuous     |
| AWS::Events::Rule                     | DiscoveryConfigCloudWatchRule     |                                                          | The rule used to only send API Gateway Config changes to the SqsQueue                              | continuous     |
| AWS::SQS::Queue                       | DiscoveryConfigSqsQueue           |                                                          | The Queue that all API Gateway configuration changes are pushed to                                 | continuous     |
| AWS::SQS::QueuePolicy                 | DiscoveryConfigSqsQueuePolicy     |                                                          | The policy that grants permission to push to the SqsQueue                                          | continuous     |
| AWS::Logs::LogGroup                   | TraceabilityAccessLogGroup        |                                                          | Creates the Log Group to track access of APIC tracked API Gateway endpoints                        | both           |
| AWS::ApiGateway::Account              | TraceabilityAPIGWCWRole           | TraceabilityAPIGWCWRoleArn not blank                     | Sets the CloudWatch Role ARN in the API Gateway Settings                                           | both           |
| AWS::Lambda::Function                 | TraceabilityLambda                |                                                          | The Lambda function that takes Cloud Watch events in the Log Group and sends them to the SQS Queue | both           |
| AWS::Lambda::Permission               | TraceabilityLambdaCWInvoke        |                                                          | Allows Cloud Watch events to trigger the Lambda Function                                           | both           |
| AWS::SQS::Queue                       | TraceabilitySqsQueue              |                                                          | The Queue that all API Gateway access logs are pushed to                                           | both           |
| AWS::Logs::SubscriptionFilter         | TraceabilityLogToLambdaFilter     |                                                          | Filter events from the Traceability Logs to the Lambda Function                                    | both           |
| amplify-agents-ec2.yaml               |                                   |                                                          |                                                                                                    | continuous     |
| AWS::EC2::VPC                         | AgentsVPC                         | VpcID not blank                                          | The VPC the instance will be deployed to                                                           | continuous     |
| AWS::EC2::Subnet                      | AgentsSubnet                      | VpcID not blank                                          | The Subnet to deploy the EC2 instance in                                                           | continuous     |
| AWS::EC2::RouteTable                  | AgentsRouteTable                  | VpcID not blank                                          | The route table for defining routes for the VPC                                                    | continuous     |
| AWS::EC2::SubnetRouteTableAssociation | AgentsRouteTableSubnetAssociation | VpcID not blank                                          | Associates the Subnet with the VPC and Route Table                                                 | continuous     |
| AWS::EC2::Route                       | AllowInternetTraffic              | VpcID not blank                                          | The route to direct all traffic in the VPC to the internet                                         | continuous     |
| AWS::EC2::SecurityGroup               | AgentsSecurityGroup               | VpcID not blank                                          | The Security Group assigned to the VPC, allowing SSH only to the host                              | continuous     |
| AWS::EC2::InternetGateway             | InternetGW                        | VpcID not blank                                          | The Internet Gateway so the agents can talk to Amplify Central                                     | continuous     |
| AWS::EC2::VPCGatewayAttachment        | GatewayAttachment                | VpcID not blank                                          | Attaches the Internet Gateway to the VPC                                                           | continuous     |
| AWS::EC2::Instance                    | AgentsHost                        |                                                          | The EC2 instance that the agents wil run in                                                        | continuous     |
| amplify-agents-ecs-fargate.yaml       |                                   |                                                          |                                                                                                    | continuous     |
| AWS::ECS::TaskDefinition              | AmplifyAgentsTask                 |                                                          | The ECS task that defines both of the agents                                                       | continuous     |
| AWS::ECS::Service                     | AmplifyAgentsService              |                                                          | The ECS service that runs the agents ECS task                                                      | continuous     |
| AWS::KMS::Key                         | sqs/encryptionKey                 |                                                          | The key used for Discovery and Traceability SQS queue encryption                                   | both           |

#### Outputs (IAM and Resources)

The outputs from the CloudFormation template:

| Output Name           | Description                                                   | Operating Mode |
| --------------------- | ------------------------------------------------------------- | -------------- |
| DiscoveryQueueName    | Amazon SQS Queue name containing the changes to API Gateway  | continuous     |
| TraceabilityQueueName | Amazon SQS Queue name containing the API Gateway Access Logs | both           |

These outputs are used as inputs for running both the Discovery and Traceability agents.

#### Access Credentials (optional)

If not deploying within an EC2 instance, an Access and Secret Key for the user should be created and given to the person deploying the agent. Please follow your organizations key rotation policies. See [Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

### CloudFormation (without IAM)

Before deploying the resources template, the following IAM resources should be created and ARN given to the user deploying the CloudFormation template.

For the list of minimum access rights for these CloudFormation templates, see [Minimum rights for CloudFormation deployment](#minimum-rights-for-cloudformation-deployment).

#### Required IAM Resources

If you prefer to create IAM Resources outside of the CloudFormation script, the following must be created:

##### ConfigServiceIAMRole (Continuous Discovery mode)

This role is used by the Config Service to monitor configuration changes to AWS API gateway Resources. It must have the following policies:

Assume Role Policies

| Service              | Description                                                   |
| -------------------- | ------------------------------------------------------------- |
| config.amazonaws.com | This assume role policy lets the config service use this role |

Managed Policies

| Managed Policy ARN                                 | Description                                                                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| arn:aws:iam::aws:policy/service-role/AWSConfigRole | This policy is needed for the Config Service to be able to read the various configurations to track for changes in API Gateway |

Policies

| Effect | Action          | Resource          | Description                                                                    |
| ------ | --------------- | ----------------- | ------------------------------------------------------------------------------ |
| Allow  | s3:GetBucketAcl | Config Bucket ARN | This allows the Config Service to get the access control list of the S3 Bucket |
| Allow  | s3:PutObject    | Config Bucket ARN | This allows the Config Service to save configurations to the S3 Bucket         |
| Allow  | config:Put*     | \*                | This allows access to all config put actions for tracking changes              |

##### TraceabilityLambdaIAMRole

This role is used by the Traceability Lambda so it may be triggered by CloudWatch and then write its output to the Traceability SQS queue

Assume Role Policies

| Service              | Description                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------- |
| lambda.amazonaws.com | This assume role policy lets the lambda service, for the Traceability Lambda, use this role |

Managed Policies

| Managed Policy ARN                                               | Description                                                                            |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole | This policy is needed so the Traceability Lambda can execute and write CloudWatch logs |

Policies

| Effect | Action                    | Resource               | Description                                                                                                                          |
| ------ | ------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Allow  | sqs:GetQueueUrl           | Traceability Queue ARN | This policy is needed so the Traceability Lambda can connect to an SQS Queue                                                         |
| Allow  | sqs:SendMessage           | Traceability Queue ARN | This policy is needed so the Traceability Lambda can write messages to an SQS Queue                                                  |
| Allow  | apigateway:GET/usageplans | All Usage Plans        | This policy is needed so the Traceability Lambda can find the Usage Plan used in the transaction to add to the message for the agent |

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
| Allow  | sqs:DeleteMessage       | Traceability and Discovery Queue ARNs                              | Allows the agent to read messages from the SQS Queues                                                           |
| Allow  | sqs:GetQueueUrl         | Traceability and Discovery Queue ARNs                              | Allows the agent to get the URL of the Queue in order to read messages                                          |
| Allow  | sqs:ReceiveMessage      | Traceability and Discovery Queue ARNs                              | Allows the agent to remove messages after processing them                                                       |
| Allow  | apigateway:PUT          | All API Gateway Resources in region                                | Allows the Discovery Agent to make updates to the API Endpoints                                                 |
| Allow  | apigateway:PATCH        | All API Gateway Resources in region                                | Allows the Discovery Agent to make updates to the API Endpoints                                                 |
| Allow  | apigateway:GET          | All API Gateway Resources in region                                | Allows the Discovery Agent to get the configuration of the API Endpoints                                        |
| Allow  | apigateway:DELETE       | All API Gateway Resources in region                                | Allows the Discovery Agent to remove tags for Unsubscribe events                                                |
| Allow  | s3:ListBucket           | The bucket set as the AgentsResourceBucket when creating the stack | Used by the EC2 instance to list all files in the resources directory of the bucket, for the agent execution    |
| Allow  | s3:GetObjectAcl         | The bucket set as the AgentsResourceBucket when creating the stack | Used by the EC2 instance to get all the files in the resources directory of the bucket, for the agent execution |
| Allow  | s3:GetObject            | The bucket set as the AgentsResourceBucket when creating the stack | Used by the EC2 instance to get all the files in the resources directory of the bucket, for the agent execution |
| Allow  | ssm:GetParameter        | The Parameters for the Amplify keys in the region                  | Used by the EC2 instance or ECS task to get the keys needed to access Amplify Central resources                 |
| Allow  | ssm:GetParameters       | The Parameters for the Amplify keys in the region                  | Used by the EC2 instance or ECS task to get the keys needed to access Amplify Central resources                 |
| Allow  | kms:*                   | Queue encryption key ARN                                           | Used by the agents for SQS encryption                                                                           |

##### AgentsInstanceRole

The role that is assigned to the EC2 instance profile so the agents may access the APICAgentsPolicy
.

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

The group that is assigned the APICAgentsPolicy
.

##### APICAgentsUser

The user that the APIC Agents will log in as, added to the APICAgentsGroup
.

An Access and Secret Key for the user should be created and given to the person deploying the agent, please follow your organizations key rotation policies. See [Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)
.

#### Parameters (Resources only)

The inputs to the Resource CloudFormation template (`amplify-agents-resources.yaml`):

| Parameter Name             | Description                                                                                                                                  | Default Value           | Operating Mode |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------------- |
| SetupConfigService         | This parameter is used to disable the configuration of AWS Config Service, and all of its dependencies, while building the stack             | true                    | continuous     |
| ConfigBucketName           | The name of the bucket the Config Service, if enabled, will store AWS Config Logs. The account number and region will be appended to this    | apigw-config-discovery  | continuous     |
| ConfigBucketExists         | If set to true, the Config Bucket will not be created                                                                                        | false                   | continuous     |
| ConfigServiceRoleArn       | The ARN for the Config Service IAM Role                                                                                                      |                         | continuous     |
| EncryptionKeyAlias         | The alias of the key used for encrypting the SQS queues                                                                                   | alias/sqs/encryptionKey         | both       |
| DiscoveryQueueName         | The name of the queue that will hold only changes made to API Gateway resources                                                              | aws-apigw-discovery     | continuous     |
| TraceabilityAPIGWCWRoleArn | The ARN for the IAM role that allows API Gateway the permission to write CloudWatch logs. Leave blank if this does not need to be configured |                         | both           |
| TraceabilityLambdaRoleArn  | The Log Group created to track access of APIC tracked API Gateway endpoints                                                                  |                         | both           |
| TraceabilityLogGroupName   | The CloudWatch Log Group that will store transaction details for AWS API Gateway usage events                                                | APIGW_Traceability_Logs | both           |
| TraceabilityFunctionBucket | The S3 Bucket that has the executable for the Traceability Lambda function                                                                   |                         | both           |
| TraceabilityFunctionKey    | The key of the Traceability Lambda function in the bucket                                                                                    |                         | both           |
| TraceabilityQueueName      | The name of the queue that will hold traceability logs of API Gateway resources                                                              | aws-apigw-traceability  | both           |

#### Resources (Resources only)

The services that are configured with this CloudFormation template:

| Resource Type                      | Resource Name                  | Condition                 | Description                                                                                         | Operating Mode |
| ---------------------------------- | ------------------------------ | ------------------------- | --------------------------------------------------------------------------------------------------- | -------------- |
| AWS::Config::ConfigurationRecorder | DiscoveryConfigRecorder        | ShouldSetupConfigService  | The setup needed to have Config start recording changes                                            | continuous     |
| AWS::Config::DeliveryChannel       | DiscoveryConfigDeliveryChannel | ShouldSetupConfigService  | The delivery channel used by Config to send the configurations to ConfigBucket                     | continuous     |
| AWS::S3::Bucket                    | DiscoveryConfigBucket          | ShouldCreateConfigBucket  | The S3 bucket used to store all current configurations, required for Config                        | continuous     |
| AWS::Events::Rule                  | DiscoveryConfigCloudWatchRule  |                           | DiscoveryConfigCloudWatchRule                                                                      | continuous     |
| AWS::SQS::Queue                    | DiscoveryConfigSqsQueue        |                           | The Queue that all API Gateway configuration changes are pushed to                                 | continuous     |
| AWS::SQS::QueuePolicy              | DiscoveryConfigSqsQueuePolicy  |                           | The policy that grants permission to push to the SqsQueue                                          | continuous     |
| AWS::Logs::LogGroup                | APIGWTrafficLogGroupName       |                           | Creates the Log Group to track access of APIC tracked API Gateway endpoints                        | both           |
| AWS::ApiGateway::Account           | TraceabilityAPIGWCWRole        | ShouldSetupAPIGWCWRoleArn | Sets the CloudWatch Role ARN in the API Gateway Settings                                           | both           |
| AWS::Lambda::Function              | TraceabilityLambda             |                           | The Lambda function that takes Cloud Watch events in the Log Group and sends them to the SQS Queue | both           |
| AWS::Lambda::Permission            | TraceabilityLambdaCWInvoke     |                           | Allows Cloud Watch events to trigger the Lambda Function                                           | both           |
| AWS::SQS::Queue                    | TraceabilitySqsQueue           |                           | The Queue that all API Gateway access logs are pushed to                                           | both           |
| AWS::Logs::SubscriptionFilter      | TraceabilityLogToLambdaFilter  |                           | Filter events from the Traceability Logs to the Lambda Function                                    | both           |
| AWS::KMS::Key                      | sqs/encryptionKey              |                           | The key used for Discovery and Traceability SQS queue encryption                                   | both           |

#### Outputs (Resources only)

The outputs from the Resource CloudFormation template:

| Output Name           | Description                                                   | Operating Mode |
| --------------------- | ------------------------------------------------------------- | -------------- |
| DiscoveryQueueName    | Amazon SQS Queue name containing the changes to API Gateway  | continuous     |
| TraceabilityQueueName | Amazon SQS Queue name containing the API Gateway Access Logs | both           |

These outputs will be used as inputs for running both the Discovery and Traceability agents.

### Testing the setup for the AWS Discovery Agent

* Make a change to an existing REST API/Stage OR create a new REST API/Stage
* Validate that the `<DiscoveryQueueName>` has messages waiting

### Testing the setup for the AWS Traceability Agent

{{< alert title="Note" color="primary" >}}To test the AWS Traceability Agent setup, the AWS Discovery Agent should be running and have discovered an API. This is required as the Stage config is updated to log transactional data.{{< /alert >}}

* Send traffic through an API that the DA has discovered
* Validate messages received in AWS SQS
* Validate logging in CloudWatch under the Log group named after the REST API ID/Stage

### Connecting AWS API Gateway to Amplify Central

* [Deploy agents](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-1/)

### Agents AWS Cost

The AWS cost of the agent will depend on your traffic usage. The more traffic you have the more it will cost.
You can follow your cost using the AWS [Cost management service](https://console.aws.amazon.com/cost-management/home#/dashboard).
The following are the costs of the AWS services the Agents rely on:

* AWS [Cloud formation pricing](https://aws.amazon.com/cloudformation/pricing/)</br>
  The two CloudFormation templates do not add additional charges, as they are used only once and create only AWS:: resources.
* AWS [S3 bucket pricing](https://aws.amazon.com/s3/pricing/)</br>
  One bucket is needed at installation time for storing a lambda. The file size is less than 4Mo. This bucket is accessed only once at the installation time.
  It has negligible cost.
* AWS [Config pricing](https://aws.amazon.com/config/pricing/)</br>
  You pay $0.003 per configuration item recorded in your AWS account per AWS Region. This is dependant on the number of changes in API / stage you will perform in a month. We don't set up rules or conformance pack. Here is the list of resources the agent needs to monitor: *ApiGateway:RestAPI*, *ApiGateway:Stage*, *ApiGatewayV2:RestAPI* and *ApiGateway:Stage*.
* AWS [Lambda pricing](https://aws.amazon.com/lambda/pricing/)</br>
  You are charged based on the number of requests for your functions and the duration (the time it takes for your code to execute). The AWS Lambda free usage tier includes 1M free requests per month and 400,000 GB-seconds of compute time per month. Our traceability lambda is called each time one of the discovered APIs is consumed. The amount of allocated memory for the lambda is set to 128Mo. The lambda runs on average within .5 second.</br>
  Lambda cost is based on following formulas:

    * Monthly cost charge: (# lambda call \* lambda execution time \* (lambda memory / 1024) - 400,000freeGB-s) * **0.0000166667**
    * Monthly request charge: ((# lambda call - 1M free request) * **0.0000002**)</br>
    * Samples:</br>
        * 2 million calls: monthly cost ($0) + monthly request charge ($0.20) = $0.20</br>
        * 10 million calls: monthly cost ($10.42) + monthly request charge ($1.80) = $12.22</br>
* AWS [CloudWatch pricing](https://aws.amazon.com/cloudwatch/pricing/)</br>
  You should be able to operate with the free tier, as the agent requires only one monitoring metrics (APIGW_Traceability_Logs).
* AWS [Simple Queue Service pricing](https://aws.amazon.com/sqs/pricing/)</br>
  Two standard queues are set up: one for Discovery Agent and one for Traceability Agent. The Discovery Agent queue will contain every stage deployment. The Traceability Agent queue will contain every call to discovered APIs. One million Amazon SQS requests for free each month. After free tier, it costs $0.40 per million requests.
* AWS [API Gateway pricing](https://aws.amazon.com/api-gateway/pricing/)</br>
  The Amazon API Gateway free tier includes one million API calls received for REST APIs, one million API calls received for HTTP APIs, and one million messages and 750,000 connection minutes for WebSocket APIs per month for up to 12 months. If you exceed this number of calls per month, you will be charged the API Gateway usage rates. There are different rates based on the API type (HTTP / REST / Websocket).
* AWS [Key Management pricing](https://aws.amazon.com/kms/pricing/)</br>
  The Amazon Key Management free tier includes 20,000 free AWS Key Management Service (KMS) requests per month. Each customer master key (CMK) that you create in KMS costs $1/month until you delete it. After free tier, each API request to KMS costs $0.03 per 10,000 requests.

Summary:

| AWS Service            | Cost in USD per month                                                                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloud Formation        | 0                                                                                                                                                                 |
| S3 bucket              | 0                                                                                                                                                                 |
| Config                 | 0.003 * (# config)                                                                                                                                                |
| Lambda execution       | ((# lambda call \* lambda execution time \* (lambda memory / 1024) - 400,000freeGB-s) \* **0.0000166667**) + ((# lambda call - 1M free request) \* **0.0000002**) |
| CloudWatch             | 0                                                                                                                                                                 |
| Simple Queue Service   | One million requests free or $0.40 per million requests thereafter                                                                                                |
| API Gateway            | refer to [API Gateway pricing](https://aws.amazon.com/api-gateway/pricing/) for details                                                                           |
| Key Management Service | refer to [Key Management pricing](https://aws.amazon.com/kms/pricing/) for details                                                                           |

### Minimum rights for CloudFormation deployment

The required privileges to deploy the CloudFormation templates to the AWS platform are listed below.

Note that these privileges do not include those necessary for rollback, if the stack fails, or removing the stack if needed.

| Action                                | Resources                                                                                       | Mode       | Template                   | Condition                    |
| ------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------- | -------------------------- | ---------------------------- |
| cloudformation:ListStackResources     | The stacks being created                                                                        | both       | all                        |                              |
| cloudformation:ListStacks             | The stacks being created                                                                        | both       | all                        |                              |
| cloudformation:DescribeStackResource  | The stacks being created                                                                        | both       | all                        |                              |
| cloudformation:DescribeStackResources | The stacks being created                                                                        | both       | all                        |                              |
| cloudformation:GetTemplateSummary     | The stacks being created                                                                        | both       | all                        |                              |
| cloudformation:CreateStack            | The stacks being created                                                                        | both       | all                        |                              |
| s3:ListBuckets                        | ConfigBucketName, AgentResourcesBucket                                                          | both       | all                        |                              |
| s3:GetObject                          | traceability_lambda.zip, CloudFormation templates                                               | both       | amplify-agents-resources   |                              |
| s3:CreateBucket                       | ConfigBucketName-`<AWS::AccountID>-<AWS::Region>`                                                 | continuous | amplify-agents-resources   | ConfigServiceSetup = true    |
| apigateway:PATCH                      | /account                                                                                        | both       | amplify-agents-resources   | APIGWCWRoleSetup = true      |
| lambda:GetFunction                    | TraceabilityLambda                                                                              | both       | amplify-agents-resources   |                              |
| lambda:GetFunctionConfiguration       | TraceabilityLambda                                                                              | both       | amplify-agents-resources   |                              |
| lambda:CreateFunction                 | TraceabilityLambda                                                                              | both       | amplify-agents-resources   |                              |
| lambda:AddPermission                  | TraceabilityLambda                                                                              | both       | amplify-agents-resources   |                              |
| sqs:GetQueueAttributes                | DiscoveryConfigSqsQueue, TraceabilitySqsQueue                                                   | both       | amplify-agents-resources   |                              |
| sqs:CreateQueue                       | DiscoveryConfigSqsQueue, TraceabilitySqsQueue                                                   | both       | amplify-agents-resources   |                              |
| sqs:SetQueueAttributes                | DiscoveryConfigSqsQueue, TraceabilitySqsQueue                                                   | both       | amplify-agents-resources   |                              |
| logs:DescribeLogGroups                | DiscoveryAgentLogGroupName, TraceabilityAgentLogGroupName, TraceabilityLogGroupName             | both       | amplify-agents-deploy-all  |                              |
| logs:CreateLogGroup                   | DiscoveryAgentLogGroupName, TraceabilityAgentLogGroupName, TraceabilityLogGroupName             | both       | amplify-agents-resources   |                              |
| logs:PutSubscriptionFilter            | TraceabilityLogGroupName                                                                        | both       | amplify-agents-resources   |                              |
| config:DescribeConfigurationRecorders | \*                                                                                              | continuous | amplify-agents-resources   | ConfigServiceSetup = true    |
| config:DescribeDeliveryChannels       | \*                                                                                              | continuous | amplify-agents-resources   | ConfigServiceSetup = true    |
| config:PutConfigurationRecorders      | \*                                                                                              | continuous | amplify-agents-resources   | ConfigServiceSetup = true    |
| config:PutDeliveryChannel             | \*                                                                                              | continuous | amplify-agents-resources   | ConfigServiceSetup = true    |
| config:StartConfigurationRecorder     | \*                                                                                              | continuous | amplify-agents-resources   | ConfigServiceSetup = true    |
| events:DescribeRule                   | \*                                                                                              | continuous | amplify-agents-resources   | ConfigServiceSetup = true    |
| events:PutRule                        | \*                                                                                              | continuous | amplify-agents-resources   | ConfigServiceSetup = true    |
| events:PutTargets                     | \*                                                                                              | continuous | amplify-agents-resources   | ConfigServiceSetup = true    |
| ec2:DescribeInstances                 | AgentsHost                                                                                      | continuous | amplify-agents-ec2         |                              |
| ec2:RunInstances                      | AgentsHost                                                                                      | continuous | amplify-agents-ec2         |                              |
| ec2:AssociateIamInstanceProfile       | AgentsHost                                                                                      | continuous | amplify-agents-ec2         |                              |
| ec2:DescribeKeyPairs                  | Keys that can be added to the Instance                                                        | continuous | amplify-agents-ec2         |                              |
| ec2:DescribeVpcs                      | AgentsVPC or parameter VpcId (EC2StackVPCID)                                                    | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:CreateVpc                         | AgentsVPC                                                                                       | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:ModifyVpcAttribute                | AgentsVPC                                                                                       | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:AssociateRouteTable               | AgentsVPC                                                                                       | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:AttachInternetGateway             | AgentsVPC                                                                                       | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:CreateSecurityGroups              | AgentsSecurityGroup                                                                             | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:AuthorizeSecurityGroupIngress     | AgentsSecurityGroup                                                                             | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:DescribeSecurityGroups            | AgentsSecurityGroup or parameter SecurityGroup (EC2StackSecurityGroup)                          | continuous | amplify-agents-ec2         |                              |
| ec2:CreateSubnet                      | AgentsSubnet                                                                                    | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:DescribeSubnets                   | AgentsSubnet or parameter Subnet (EC2StackSubnet)                                               | continuous | amplify-agents-ec2         |                              |
| ec2:CreateInternetGateway             | AgentsInternetGW                                                                                | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:DescribeInternetGateways          | AgentsInternetGW                                                                                | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:DescribeAvailabilityZones         | Availability Zones in Region                                                                    | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:DescribeRouteTables               | AgentsRouteTable                                                                                | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:CreateRouteTable                  | AgentsRouteTable                                                                                | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:CreateRoute                       | AgentAllowInternetTraffic                                                                       | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ec2:DescribeAccountAttributes         | AWS Account                                                                                     | continuous | amplify-agents-ec2         | VpcId = ""                   |
| ecs:CreateService                     | AmplifyAgentsService                                                                            | continuous | amplify-agents-ecs-fargate | DeploymentType = ECS Fargate |
| ecs:DescribeServices                  | AmplifyAgentsService                                                                            | continuous | amplify-agents-ecs-fargate | DeploymentType = ECS Fargate |
| ecs:RegisterTaskDefinition            | \*                                                                                              | continuous | amplify-agents-ecs-fargate | DeploymentType = ECS Fargate |
| ecs:DescribeTaskDefinition            | \*                                                                                              | continuous | amplify-agents-ecs-fargate | DeploymentType = ECS Fargate |
| iam:ListRoles                         | ConfigServiceIAMRole, TraceabilityLambdaIAMRole, TraceabilityAPIGWCWIAMRole, AgentsInstanceRole | both       | amplify-agents-deploy-all  |                              |
| iam:GetRole                           | ConfigServiceIAMRole, TraceabilityLambdaIAMRole, TraceabilityAPIGWCWIAMRole, AgentsInstanceRole | both       | amplify-agents-deploy-all  |                              |
| iam:CreateRole                        | ConfigServiceIAMRole, TraceabilityLambdaIAMRole, TraceabilityAPIGWCWIAMRole, AgentsInstanceRole | both       | amplify-agents-deploy-all  |                              |
| iam:PassRole                          | ConfigServiceIAMRole, TraceabilityLambdaIAMRole, TraceabilityAPIGWCWIAMRole, AgentsInstanceRole | both       | amplify-agents-deploy-all  |                              |
| iam:GetRolePolicy                     | APICAgentsPolicy                                                                                | both       | amplify-agents-deploy-all  |                              |
| iam:GetUserPolicy                     | APICAgentsPolicy                                                                                | both       | amplify-agents-deploy-all  | DeploymentType = Other       |
| iam:CreatePolicy                      | APICAgentsPolicy                                                                                | both       | amplify-agents-deploy-all  |                              |
| iam:PutRolePolicy                     | APICAgentsPolicy                                                                                | both       | amplify-agents-deploy-all  |                              |
| iam:GetUser                           | APICAgentsUser                                                                                  | both       | amplify-agents-deploy-all  | DeploymentType = Other       |
| iam:CreateUser                        | APICAgentsUser                                                                                  | both       | amplify-agents-deploy-all  | DeploymentType = Other       |
| iam:AttachUserPolicy                  | APICAgentsUser                                                                                  | both       | amplify-agents-deploy-all  | DeploymentType = Other       |
| iam:CreateInstanceProfile             | AgentsInstanceProfile                                                                           | continuous | amplify-agents-deploy-all  | DeploymentType = EC2         |
| iam:AddRoleToInstanceProfile          | AgentsInstanceRole                                                                              | continuous | amplify-agents-deploy-all  | DeploymentType = EC2         |
| iam:AttachRolePolicy                  | AgentsInstanceRole                                                                              | continuous | amplify-agents-deploy-all  | DeploymentType = EC2         |

### Troubleshooting

| Question                                        | Answer                                                                                                                                                                                              |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Why isn’t my API discovered?                    | Check that the tag set on the stage has a correct name and value based on the AWS_FILTER variable. See [Discover APIs](/docs/connect_manage_environ/connect_aws_gateway/filtering-apis-to-be-discovered-1/).       |
| Why can’t my agents connect to AWS API Gateway? | Go to AWS console / IAM service and make sure that `AWS_REGION`, `AWS_AUTH_ACCESSKEY` and `AWS_AUTH_SECRETKEY` are valid and not inactivated.                                                       |
| Why can’t my agents connect to Amplify Central? | Go to **Amplify Central UI > Access > Service Accounts** and make sure that the Service Account is correctly named and valid. Make sure that the organizationID and team configuration are correct. |
| Why don’t I see traffic in Amplify Central?     | Make sure that the Condor URL is accessible from the machine where Traceability Agent is installed.                                                                                                 |
| How do I verify that the Agent is running?        | `docker inspect --format='{{json .State.Health}}' <container>`                                                                                                                                      |
