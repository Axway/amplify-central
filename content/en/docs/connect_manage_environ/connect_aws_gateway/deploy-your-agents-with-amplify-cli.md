---
title: Deploy your agents with Axway CLI
linkTitle: Deploy your agents with Axway CLI
draft: false
weight: 20
description: Learn how to deploy your agents using Axway CLI so that you can
  manage your AWS API Gateway environment within Amplify Central.
---
## Before you start

* Read [Amplify Central AWS API Gateway connected overview](/docs/connect_manage_environ/connect_aws_gateway/)
* You will need information on AWS

    * The region that the AWS API Gateway resources are hosted in
    * The bucket that the Resources will be uploaded to
    * The logging configuration setup on AWS API Gateway
    * The configuration of AWS Config Service
* It is recommended that you have access to the AWS CLI command line to run the necessary setup commands

## Objectives

Learn how to quickly install and run your Discovery and Traceability agents with basic configuration using Axway Central CLI.

## Axway Central CLI prerequisites

* [Node.js](https://nodejs.org/en/download/) version 10.13.0 or later
* Access to npm package (for installing Axway CLI)
* Access to login.axway.com on port 443
* Minimum Axway Central CLI version: 0.5.0 (check version using `axway central --version`)

For more information, see [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

## Installing the agents

### Step 1: Folder preparation

Create an empty directory where Axway CLI will generate files. Run all Axway Central CLI from this directory.

### Step 2: Identify yourself to Amplify Platform with Axway CLI

To use Central CLI to log in with your Amplify Platform credentials, run the following command:

```shell
axway auth login
```

A browser automatically opens.
Enter your valid credentials (email address and password). Once the “Authorization Successful” message is displayed, go back to Axway CLI. The browser may be closed at this point.

If you are a member of multiple Amplify organizations, you may have to choose an organization.

{{< alert title="Note" color="primary" >}}If you do not have a graphical environment, forward the display to an X11 server (Xming or similar tools) using the `export DISPLAY=myLaptop:0.0` command.{{< /alert >}}

### Step 3: Run the agents' install procedure

AWS agents are delivered in a Docker image provided by Axway. You can run them from any Docker container that can access the Amplify Platform and AWS API Gateway.
The Axway Central CLI will guide you through the configuration of the agents. Cloud formation templates are provided to help you setup either an EC2 architecture or an ECS-fargate architecture. You can also decide to not use any of them and deploy the Docker images in your own Docker container architecture.

To start the installation procedure, run the following command:

```shell
axway central install agents
```

If your Amplify subscription is hosted in the EU region, then the following installation command must be used to correctly configure the agents:

```shell
axway central install agents --region=EU
```

The installation procedure prompts for the following:

1. Select the type of gateway you want to connect to (AWS API Gateway in this scenario).
2. Platform connectivity:
   * **Environment**: can be an existing environment or a new one that will be created by the installation procedure
   * **Team**: can be an existing team or a new one that will be created by the installation procedure
   * **Service account**: can be an existing service account (from platform or Central). The installation procedure creates only a Central service account. If you choose an existing service account, be sure you have the appropriate public and private keys, as they will be required for the agent to connect to the Amplify Platform. If you choose to create a new one, the generated private and public keys will be provided.
3. AWS Configuration Setup options:
   * **Deployment Type** select between `EC2`, `ECS Fargate`, or `Docker Container Only`
   * **Region** of the AWS API Gateway resources
   * **S3 Bucket Name** within the same region as the AWS API Gateway resources
   * **API Gateway Cloud Watch Setup** defaulted to `Yes`, sets up the IAM role and configures API Gateway to log API Gateway transactions to CloudWatch
   * **APIGW Log Group** defaulted to `aws-apigw-traffic-logs`, where API Gateway transactions will be logged within CloudWatch
   * **Config Service Setup** defaulted to `Yes`, set to `No` if this is already in use
   * **Config Service Bucket** defaulted to **S3 bucket Name**, where Config Service stores its data
   * **Config Bucket Exists** defaulted to `Yes`, set to `No` to have the CloudFormation create the bucket
   * **Discovery Agent Queue** defaulted to `aws-apigw-discovery`, the SQS Queue where events for the Discovery Agent are sent
   * **Traceability Agent Queue** defaulted to `aws-apigw-traceability`, the SQS Queue where events for the Traceability Agent are sent

   * EC2 Deployment Prompts
     * **Instance Type** defaulted to `t3.micro`
     * **EC2 SSH Key Pair** the name of the EC2 Key Pair that will be installed on the instance
     * **VPC ID** the ID of the VPC (ex. vpc-xxxxxxx) to deploy the instance in, leave blank to have the CloudFormation deploy the entire EC2 Infrastructure
     * **Public IP Address** when using existing infrastructure, set to `No` if the VPC has an Internet Gateway, as the Instance needs internet Access to communicate with Amplify
     * **Security Group ID** when using existing infrastructure, the security group (ex. sg-xxxxxxx) to assign to the EC2 instance
     * **Subnet ID** when using existing infrastructure, the subnet (ex. subnet-xxxxxx) to deploy the EC2 instance to
     * **SSH IP Range** defaulted to 0.0.0.0/0, set to the IP range that is allowed to SSH to the EC2 instance

   * ECS Deployment Prompts
     * **ECS Cluster Name** the name of the Cluster the ECS tasks will be deployed to
     * **Security Group ID** the security group (ex. sg-xxxxxxx) to assign to the ECS tasks
     * **Subnet ID** the subnet (ex. subnet-xxxxxx) the ECS tasks will run in
   * **Discovery Agent Log Group** defaulted to `amplify-discovery-agent-logs`, the log group the Discovery Agent will use
   * **Traceability Agent Log Group** defaulted to `amplify-traceability-agent-logs`, the log group the Traceability Agent will use
   * **SSM Private Key Parameter** defaulted to `AmplifyPrivateKey`, the Parameter Name in AWS SSM where the Amplify Private key is stored
   * **SSM Public Key Parameter** defaulted to `AmplifyPublicKey`, the Parameter Name in AWS SSM where the Amplify Public key is stored
4. Traceability module connectivity:
   * Traceability Agent protocol (Lumberjack (tcp) by default recommended for production environment or HTTPs recommended for testing purpose), select between `Lumberjack`, or `HTTPS`

Once you have answered all questions, the cloud formation templates are downloaded and pre-configured, the agents' configuration files are updated, the Amplify Central resources are created and the key pair is generated (if you chose to create a new service account).

The current directory contains the following files:

```shell
da_env_vars.env                   *EC2 and Docker Container Deployments Only
ta_env_vars.env                   *EC2 and Docker Container Deployments Only
private_key.pem
public_key.pem
amplify-agents-deploy-all.yaml
amplify-agents-ec2.yaml           *EC2 Deployment Only
amplify-agents-ecs-fargate.yaml   *ECS Fargate Deployment Only
amplify-agents-resources.yaml
cloudformation_properties.json
traceability_lambda.zip
```

`da_env_vars.env` / `ta_env_vars.env` contains the specific configuration you entered during the installation procedure. These files are required to start the agents.

`private_key.pem` and `public_key.pem` are the generated key pair the agent will use to securely talk with the Amplify Platform (if you choose to let the installation generate them).

`amplify-agents-deploy-all.yaml` / `amplify-agents-ec2.yaml` / `amplify-agents-ecs-fargate.yaml` / `amplify-agents-resources.yaml` are the CloudFormation files to configure AWS services / infrastructure.

`cloudformation_properties.json` contains the parameter values required as input to the CloudFormation execution.

`traceability_lambda.zip` is referenced in the CloudFormation scripts to setup the AWS Lambda function required.

### Step 4a: Deploy the agent in EC2 or ECS Fargate infrastructure

The installation summary contains the AWS CLI commands needed to finish the installation.

{{< alert title="Warning for us-east-1 region" color="warning" >}}If you are installing the agents using the `us-east1-1` region, remove the region in the generated `--template-url` parameter as follows, `https://my-bucket-name.s3.amazonaws.com/amplify-agents-deploy-all.yaml`. For any other region, keep the file as prompted (i.e. `https://my-bucket-name.s3-<_RegionName_>.amazonaws.com/amplify-agents-deploy-all.yaml)`.{{< /alert >}}

Example:

```shell
To complete the install, run the following AWS CLI command:
  - Create, if necessary, and upload all files to your S3 bucket:
    aws s3api create-bucket --bucket my-bucket-name --create-bucket-configuration LocationConstraint=eu-west-1
    aws s3 sync --exclude "*" --include "traceability_lambda.zip" --include "amplify-agents-deploy-all.yaml" --include "amplify-agents-resources.yaml" --include "amplify-agents-ec2.yaml"  ./ s3://my-bucket-name
    aws s3 sync --exclude "*" --include "da_env_vars.env" --include "ta_env_vars.env"  ./ s3://my-bucket-name/resources
  - If necessary, create EC2 KeyPair, for EC2 login:
    aws ec2 create-key-pair --key-name keypair --query KeyMaterial --output text > MyKeyPair.pem
  - Create the SSM parameter:
    aws ssm put-parameter --type SecureString --name AmplifyPrivateKey --value "file://private_key.pem"
    aws ssm put-parameter --type SecureString --name AmplifyPublicKey --value "file://public_key.pem"
  - Deploy the CloudFormation Stack:
    aws cloudformation create-stack --stack-name AxwayAmplifyAgents \
        --template-url https://my-bucket-name.s3-eu-west-1.amazonaws.com/amplify-agents-deploy-all.yaml \
        --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM --parameters "file://cloudformation_properties.json"
  - Check the CloudFormation Stack:
    aws cloudformation describe-stacks --stack-name AxwayAmplifyAgents \
        --query "Stacks[].{\"Name\":StackName,\"Status\":StackStatus}"
```

* Create, if necessary, and upload all files to your S3 bucket:
    * These commands create the bucket, if needed, then uploads all resources to the bucket.
* If necessary, create EC2 KeyPair, for EC2 login:
    * This command creates the EC2 Key Pair, if necessary, and saves the private key to MyKeyPair.pem.
* Create the SSM parameter:
    * These commands save the Amplify Private and Public Keys to the AWS SSM Parameter Store.
* Deploy the CloudFormation Stack:
    * This command deploys the CloudFormation template using all the resources uploaded to S3. The end result will be a running EC2 instance with the agents installed and logging to CloudWatch.
* Check the CloudFormation Stack:
    * This command returns the stack name and its deployment status.

### Step 4b: Deploy the agent in Docker Container Only infrastructure

The installation summary contains the AWS CLI commands needed to finish the installation.

Example:

```shell
To complete the install, run the following AWS CLI command:
  - Create, if necessary, and upload all files to your S3 bucket:
    aws s3api create-bucket --bucket my-bucket-name --create-bucket-configuration LocationConstraint=eu-west-1
    aws s3 sync --exclude "*" --include "traceability_lambda.zip" --include "amplify-agents-deploy-all.yaml" --include "amplify-agents-resources.yaml" ./ s3://my-bucket-name
    
  - Deploy the CloudFormation Stack:
    aws cloudformation create-stack --stack-name AxwayAmplifyAgents \
        --template-url https://my-bucket-name.s3-eu-west-1.amazonaws.com/amplify-agents-deploy-all.yaml \
        --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM --parameters "file://cloudformation_properties.json"
  - Check the CloudFormation Stack:
    aws cloudformation describe-stacks --stack-name AxwayAmplifyAgents \
        --query "Stacks[].{\"Name\":StackName,\"Status\":StackStatus}"
  Wait for the CloudFormation Stack to complete.
  - Create AWS Access and Secret Keys and copy resulting "AccessKeyId" & "SecretAccessKey":
    aws iam create-access-key  --user-name AxwayAmplifyAgentsUser-eu-west-1 \
        --query "AccessKey.{"AccessKeyId":AccessKeyId,"SecretAccessKey":SecretAccessKey}"
  - Add "AccessKeyId" & "SecretAccessKey" variables to both agent .env files, da_env_vars.env & ta_env_vars.env:
    AWS_AUTH_ACCESSKEY=Your_AccessKeyId
    AWS_AUTH_SECRETKEY=Your_SecretAccessKey

  - Pull the latest image of the Discovery Agent:
    docker pull axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-discovery-agent:latest
  - Pull the latest image of the Traceability Agent:
    docker pull axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-traceability-agent:latest
  - Run the latest Discovery Agent:
    docker run --env-file "$(pwd)"/da_env_vars.env -v "$(pwd)":/keys \
        axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-discovery-agent:latest
  - Run the latest Traceability Agent:
    docker run --env-file "$(pwd)"/ta_env_vars.env -v "$(pwd)":/keys \
        axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-traceability-agent:latest
```

* Create, if necessary, and upload all files to your S3 bucket:
    * These commands create the bucket, if needed, then uploads all resources to the bucket.
* Create AWS Access and Secret Keys and copy results:
    * This command creates the Access and Secret Key Pair.
* Add the results from the Key Pair creation above into the environment files, da_env_vars.env & ta_env_vars.env, after the appropriate variables, `AWS_AUTH_ACCESSKEY=` and `AWS_AUTH_SECRETKEY=`.
* Pull the latest images of the Discovery/Traceability Agents:
    * These two commands pull the latest released agents from axway.jfrog.io/ampc-public-docker-release/agent.
* Run the latest images of the Discovery/Traceability Agents:
    * These two commands run the Docker Containers using the created environment files, and mounting the directory of the location of the appropriate keys, `public_key.pem` & `private_key.pem`, which were either generated during the installation, or available from an existing service account.

Once the Cloud formation template creation is completed, the agents should be running in the chosen infrastructure.

See [Administer AWS Gateway cloud](/docs/connect_manage_environ/connect_aws_gateway/cloud-administration-operation/) for additional information about agent features.
