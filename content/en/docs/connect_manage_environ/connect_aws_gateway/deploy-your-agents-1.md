---
title: Reference - Agent configuration
linkTitle: Reference - Agent configuration
draft: false
weight: 50
---
Deploy your Discovery Agent and Traceability Agent using Docker containers so that you can manage your AWS API Gateway environment within Amplify.

Once agents are correctly deployed, they can collect the data from the AWS API Gateway and send it securely to Amplify.

## Before you start

* Read [Amplify AWS API Gateway connected overview](/docs/connect_manage_environ/connect_aws_gateway/)
* [Prepare Amplify](/docs/integrate_with_central/cli_central/cli_install/)
* [Prepare AWS API Gateway](/docs/connect_manage_environ/connect_aws_gateway/cloud-administration-operation/)
* Docker must be installed and you will need a basic understanding of Docker commands

## Objectives

Learn how to create your Discovery Agent and Traceability Agent configuration files, then install and run your agents.

## Discovery Agent

The Discovery Agent is used to discover new deployments and stage updates to existing deployments. Once they are discovered, the related APIs are published to Amplify so that they become available for any consumer.

The Discovery Agent only discovers published APIs where the stage has tags defined in the agent configuration file. See AWS_DISCOVERYTAGS.

### Create your Discovery Agent configuration

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

| Variable name                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AWS_ALLOWUSAGEPLANAUTOCREATION       | When creating a subscription on Amplify, setting this value to true will enable a selection in the App name drop-down for 'Create a usage plan.' This allows the user to either select from an existing AWS Gateway Usage Plan, or to create a new Usage Plan in AWS Gateway. The new Usage Plan in AWS Gateway will be given the name of the subscription ID from Amplify. A value of false will cause 'Create an application' to not be shown in the drop-down. Default is true. |
| AWS_APIPOLLINTERVAL                  | The interval at which to poll AWS for changes to things like UsagePlans (ns - default, us, ms, s, m, h). Set to 60s.                                                                                                                                                                                                                                                                                                                                                               |
| AWS_AUTH_ACCESSKEY                   | If not deploying in an EC2 instance, the access key of the AWS account where APIs are stored. Generated when the apigw_cloudformation script is run or you can use your own.                                                                                                                                                                                                                                                                                                       |
| AWS_AUTH_SECRETKEY                   | If not deploying in an EC2 instance, the secret access key of the AWS account where APIs are stored. Generated when the apigw_cloudformation script is run or you can use your own.                                                                                                                                                                                                                                                                                                |
| AWS_CLIENTTIMEOUT                    | The amount of time a single AWS transaction may wait to process (default value: `30s`).                                                                                                                                                                                                                                                                                                                                                                                            |
| AWS_FILTER                           | Filter conditions for discovery based on AWS Stage tags to determine adding the API to API Service Registry. [See Discover APIs for conditional expression samples](/docs/connect_manage_environ/connect_aws_gateway/filtering-apis-to-be-discovered-1/).                                                                                                                                                                                                                          |
| AWS_LOGGROUP                         | The log group name where API Gateway will send Execution events (output of Step 5). See [Prepare AWS Gateway to deploy the Discovery Agent AWS config setup](/docs/connect_manage_environ/connect_aws_gateway/cloud-administration-operation/).                                                                                                                                                                                                                                    |
| AWS_PUSHTAGS                         | Determines whether the AWS Stage tags should be pushed to Amplify along with the API definition. Value must be true or false. Default is false.                                                                                                                                                                                                                                                                                                                                    |
| AWS_REGION                           | The region where AWS APIs are stored.                                                                                                                                                                                                                                                                                                                                                                                                                                              |

### AgentCore mode configuration

The following variables are specific to `agentcore-gateway` mode. Set `AWS_GATEWAYMODE` to enable AgentCore mode; the remaining variables are only relevant when AgentCore mode is active.

| Variable name | Description |
| --- | --- |
| AWS_GATEWAYMODE | The AWS backend the agent connects to. Set to `agentcore-gateway` to enable Bedrock AgentCore mode. Default is `api-gateway`. |
| AWS_AGENTCORE_PAGESIZE | Page size for `ListGateways` and `ListGatewayTargets` API requests (on-premises Discovery Agent only). Default is `25`. |
| AWS_AGENTCORE_IAMAUTHENABLED | When set to `true`, gateways using `AWS_IAM` authorization are discovered and associated with the `aws-iam` credential request definition. The gateway is still discovered and published without a credential request definition when this flag is `false`. Default is `false`. |
| AWS_COGNITO_USERPOOLID_N | Cognito User Pool ID for the Nth pool, where N starts at 1 (for example, `AWS_COGNITO_USERPOOLID_1=eu-west-1_abc123`). Used to match CUSTOM_JWT gateway issuers to a specific Cognito pool for credential provisioning. |
| AWS_COGNITO_REGION_N | AWS region for the Nth Cognito pool (for example, `AWS_COGNITO_REGION_1=eu-west-1`). Optional; falls back to `AWS_REGION` if not set. |

{{< alert title="Note" color="primary" >}}Multiple Cognito pools are supported by incrementing the index (`_1`, `_2`, and so on).{{< /alert >}}

### Create your Discovery Agent environment file

Create a configuration file using the above variables. See the variable descriptions for their values. Below is a sample of what the configuration file will look like.

For example:

```yaml
# AWS connectivity
AWS_REGION=us-east-2
AWS_AUTH_ACCESSKEY=<YOUR AWS ACCESS KEY HERE>
AWS_AUTH_SECRETKEY=<YOUR AWS SECRET KEY HERE>
AWS_LOGGROUP=<YOUR LOG GROUP NAME>
AWS_FILTER=tag.PushToAmplify == true
AWS_PUSHTAGS=true

# Amplify connectivity
# organization config:
CENTRAL_ORGANIZATIONID=<YOUR ORGANIZATION ID>
CENTRAL_TEAM=<THE TEAM NAME>
CENTRAL_ENVIRONMENT=<NAME OF THE CENTRAL TOPOLOGY ENVIRONMENT>
CENTRAL_AUTH_CLIENTID=<SERVICE ACCOUNT NAME>

#CENTRAL_SSL_MINVERSION=
#CENTRAL_SSL_MAXVERSION=
#CENTRAL_SSL_CIPHERSUITES=
#CENTRAL_SSL_NEXTPROTOS=
#CENTRAL_SSL_INSECURESKIPVERIFY=

LOG_LEVEL=info
LOG_OUTPUT=stdout
LOG_PATH=logs
```

For AgentCore mode:

```yaml
# AWS connectivity - AgentCore mode
AWS_REGION=eu-west-1
AWS_AUTH_ACCESSKEY=<YOUR AWS ACCESS KEY HERE>
AWS_AUTH_SECRETKEY=<YOUR AWS SECRET KEY HERE>
AWS_GATEWAYMODE=agentcore-gateway
AWS_AGENTCORE_PAGESIZE=25
AWS_COGNITO_USERPOOLID_1=<YOUR COGNITO USER POOL ID>
AWS_COGNITO_REGION_1=eu-west-1

# Amplify connectivity
# organization config:
CENTRAL_ORGANIZATIONID=<YOUR ORGANIZATION ID>
CENTRAL_TEAM=<THE TEAM NAME>
CENTRAL_ENVIRONMENT=<NAME OF THE CENTRAL TOPOLOGY ENVIRONMENT>
CENTRAL_AUTH_CLIENTID=<SERVICE ACCOUNT NAME>

#CENTRAL_SSL_MINVERSION=
#CENTRAL_SSL_MAXVERSION=
#CENTRAL_SSL_CIPHERSUITES=
#CENTRAL_SSL_NEXTPROTOS=
#CENTRAL_SSL_INSECURESKIPVERIFY=

LOG_LEVEL=info
LOG_OUTPUT=stdout
LOG_PATH=logs
```

{{< alert title="Note" color="primary" >}}Traceability Agent is not yet supported in AgentCore mode. No Traceability Agent configuration is required when using `agentcore-gateway`.{{< /alert >}}

### Install and run Discovery Agent

1. Copy the `private_key.pem` and `public_key.pem` files that were originally created when you set up your Service Account to a keys directory. Make sure the directory is located on the machine being used for deployment. Note that the `public_key.pem` comes from Steps 3 and 4 of [Prepare AWS Gateway to deploy the Discovery Agent AWS config setup](/docs/connect_manage_environ/connect_aws_gateway/cloud-administration-operation/).
2. Find the current agent release in the [agent release note](/docs/amplify_relnotes).
   Go to *Help menus > Downloads > Repository*
     -or-
   Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents)
   and search for the Docker image for the most recent agents to download as `{agentImage}`.
   Then replace `{agentImage}` with the current agent release in the following sections.
3. Create a data directory where the agent will store cache data to persist on restarts.
4. Start the Discovery Agent pointing to the `env_vars` file and the keys directory:

    ```bash
    docker run --env-file ./env_vars -v <pwd>/keys:/keys  -v <pwd>/data:data {age}
    ```

    `pwd` relates to the local directory where the docker command is run. For Windows, the absolute path is preferred.

5. Run the following health check command to ensure the agent is up and running (continuous mode):

   ```bash
   docker inspect --format='{{json .State.Health}}' <container>
   ```

## Traceability Agent

The Traceability Agent is used to filter the AWS CloudWatch logs that are related to discovered APIs and prepare the transaction events that are sent to Amplify platform. Each time an API is called by a consumer, an event (summary + detail) is sent to Amplify and is visible in Business Insights.

### Create your Traceability Agent configuration

{{< alert title="Note" color="primary" >}}To exclude health checks from being counted towards the number of transactions for the purpose of entitlement, use the variable TRACEABILITY_EXCEPTION_LIST to identify the API path that the health check transactions use. The agent will then dismiss the transactions and not process them for usage in transaction reporting.{{< /alert >}}

<!-- HTML table removed here, it will need to be added back manually as a Markdown table -->

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

| Variable name                                  | Description                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AWS_AUTH_ACCESSKEY                             | If not deploying in an EC2 instance, the access key of the AWS account where APIs are stored.                                                                                                                                                                                                                                                 |
| AWS_AUTH_SECRETKEY                             | If not deploying in an EC2 instance, the secret access key of the AWS account where APIs are stored.                                                                                                                                                                                                                                          |
| AWS_CLIENTTIMEOUT                              | The amount of time a single AWS transaction may wait to process (default value: `30s`).                                                                                                                                                                                                                                                       |
| AWS_REGION                                     | The region where AWS APIs are stored.                                                                                                                                                                                                                                                                                                         |

### AgentCore mode configuration for Traceability

The following variables apply to the Traceability Agent in `agentcore-gateway` mode. Set `AWS_GATEWAYMODE=agentcore-gateway` to enable AgentCore mode (see [AgentCore mode configuration](#agentcore-mode-configuration)). For an overview of the traceability modes and the CloudTrail/S3 setup, see [Traceability for AgentCore gateways](/docs/connect_manage_environ/connect_aws_gateway/traceability-agentcore/).

| Variable name | Description |
| --- | --- |
| AWS_AGENTCORE_LOGGROUPPREFIX | CloudWatch log group prefix for AgentCore application logs. Default is `/aws/vendedlogs/bedrock-agentcore/gateway/APPLICATION_LOGS`. |
| AWS_AGENTCORE_CLOUDTRAILENABLED | When set to `true`, the agent uses CloudTrail data events to attribute Cognito gateway usage to the consuming application. Default is `false`. |
| AWS_AGENTCORE_CLOUDTRAILBUCKET | Name of the S3 bucket holding the CloudTrail data-event logs. Required when `AWS_AGENTCORE_CLOUDTRAILENABLED=true`. |

### Create your Traceability Agent environment file

Create a configuration file using the above variables. See the variable descriptions for their values. Below is a sample of what the configuration file will look like.

For example:

```yaml
# AWS connectivity
AWS_REGION=us-east-2
AWS_AUTH_ACCESSKEY=<YOUR AWS ACCESS KEY HERE>
AWS_AUTH_SECRETKEY=<YOUR AWS SECRET KEY HERE>

# Amplify connectivity
# organization config:
CENTRAL_ORGANIZATIONID=<YOUR ORGANIZATION ID>
CENTRAL_TEAM=<THE TEAM NAME>
CENTRAL_ENVIRONMENT=<NAME OF THE CENTRAL TOPOLOGY ENVIRONMENT>
CENTRAL_AUTH_CLIENTID=<SERVICE ACCOUNT NAME>

#CENTRAL_SSL_MINVERSION=
#CENTRAL_SSL_MAXVERSION=
#CENTRAL_SSL_CIPHERSUITES=
#CENTRAL_SSL_NEXTPROTOS=
#CENTRAL_SSL_INSECURESKIPVERIFY=

LOG_LEVEL=debug
LOG_OUTPUT=stdout
LOG_PATH=logs
```

### Install and run Traceability Agent

1. Copy the `private_key.pem` and `public_key.pem` files that were originally created when you set up your Service Account to a keys directory. Make sure the directory is located on the machine being used for deployment.
2. Find the current agent release in the [agent release note](/docs/amplify_relnotes).
   Go to *Help menus > Downloads > Repository*
     -or-
   Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents)
   and search for the Docker image for the most recent agents to download as `{agentImage}`
   Then replace `{agentImage}` with the current agent release in following sections.
3. Create a data directory where the agent will store cache data to persist on restarts.
4. Start the Traceability Agent pointing to the `env_vars` file and the `keys` directory. Note that `pwd` relates to the local directory where the docker command is run. For Windows, the absolute path is preferred.

   ```bash
   docker run --env-file ./env_vars -v <pwd>/keys:/keys -v <pwd>/data:/data {agentImage}
   ```

5. Run the following health check command to ensure the agent is up and running:

   ```bash
   docker inspect --format='{{json .State.Health}}' <container>
   ```
