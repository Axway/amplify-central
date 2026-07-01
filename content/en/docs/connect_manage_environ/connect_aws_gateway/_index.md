---
title: Connect AWS Gateways
linkTitle: Connect AWS Gateways
weight: 130
date: 2021-01-04
---
Connect AWS API Gateway / AWS Bedrock AgentCore and Amplify so you can govern and monitor the creation / deployment / publishing and subscriptions of your AWS hosted APIs in one central location.

{{< alert title="Note" color="primary" >}}Go [here](/docs/connect_manage_environ/connect_aws_gateway/deploy-embedded-agents/) for documentation on installing the AWS Embedded agents.{{< /alert >}}

## AWS API Gateway mode

Connecting AWS API Gateway to Amplify will provide you with a global centralized view of your APIs and their related traffic.

Each AWS Gateway can be represented by an Amplify environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents (Discovery and Traceability) interact with AWS API Gateway and Amplify to:

* Detect changes to AWS API Gateway stages and deployments using the Discovery Agent. The Discovery Agent pushes the service configuration as an API service for the environment, which can then be published as a catalog item to be used by consumers to subscribe to the service.
* Filter the AWS Cloudwatch logs that are related to discovered APIs and prepare the transaction events that are sent to Amplify Platform.

{{< alert title="Note" color="primary" >}}You will be notified at the startup of the agent if your agent is outdated: New version available. Please consider upgrading from version *(running version)* to version *(latest version)*.{{< /alert >}}

### Discovery Agent

The Discovery Agent is used to discover new deployments and stage updates to existing deployments for publishing related APIs in Amplify as an API service. It will regularly check AWS API Gateway for modifications on these resources to push updates to Amplify.

### Traceability Agent

The Traceability Agent is used to filter the AWS CloudWatch logs and prepare the metric, usage and transaction events that are sent to Amplify and made visible in Business Insights. Viewing your traffic helps you to identify possible bottlenecks and errors. The traffic can be filtered by environment in case multiples are involved in your topography. As part of the deployment package, you can use the cloud formation scripts to set up the following agent-dependent AWS Service:

* AWS CloudWatch - Monitors resources and AWS applications in real time. Receives and routes supported AWS Service events.

The types of logging you can do with API Gateway to CloudWatch:

* Execution logging - API Gateway manages the CloudWatch logs.
* Access logging - Developer managed custom logging.

For additional logging information, see <https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-logging.html>.

## AWS Bedrock AgentCore mode

Connecting AWS Bedrock AgentCore to Amplify allows you to discover and govern APIs hosted behind AgentCore gateways and manage consumer credentials through Cognito.

The Bedrock AgentCore control plane can be represented by an Amplify environment, and each AgentCore gateway discovered within it is published as an API service. The Discovery Agent interacts with the Bedrock AgentCore control plane and Amplify to:

* Detect AgentCore gateways in `READY` status and publish them to Amplify as API services with auto-generated OpenAPI 3.0 and MCP specifications. The gateway's authorizer type determines which Credential Request Definition (CRD) is assigned to the published service.
* Manage Cognito app clients on behalf of consumers when they subscribe to or unsubscribe from a discovered API service.

{{< alert title="Note" color="primary" >}}Traceability Agent is not yet available for AgentCore mode.{{< /alert >}}

### Discovery Agent (AgentCore)

The Discovery Agent polls the Bedrock AgentCore control plane for gateways and their authorizer configuration. It regularly checks for new or updated gateways and pushes the corresponding API service definitions to Amplify.

## Prerequisites

* An Axway Amplify subscription in the Amplify platform
* A Platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts)
* An Amplify environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments/)
* API Key credentials on AWS. Allow for CLI access
* Amazon CloudWatch Service
* CloudFormation template. Download the latest "Amplify AWS Agents CloudFormation" install zip file from [https://repository.axway.com/catalog?q=aws](https://repository.axway.com/catalog?q=aws).
* The [Traceability Agent](#traceability-agent) requires a connected and running [Discovery Agent](#discovery-agent)

For AgentCore mode, the following additional prerequisites apply:

* AWS Bedrock AgentCore gateway(s) deployed in your AWS account
* A Cognito User Pool configured as the JWT authorizer on the gateway (for gateways using CUSTOM_JWT authorization)
* An IAM policy with `bedrock-agentcore`, `cognito-idp`, and `iam:PassRole` permissions attached to the agent's IAM role or user. See [AWS IAM policy for AgentCore mode](/docs/connect_manage_environ/connect_aws_gateway/embedded-aws-agent-setup/#aws-iam-policy-for-agentcore-mode).

## Region support

Amplify supports three regions, US (default), EU and APAC. The data (APIs, traffic) that the agents send to Amplify are stored in one of those regions based on the agent configuration.

Use one of the following URLs to access the Amplify UI:

* US: [https://apicentral.axway.com](https://apicentral.axway.com)
* EU: [https://central.eu-fr.axway.com](https://central.eu-fr.axway.com)
* APAC: [https://central.ap-sg.axway.com](https://central.ap-sg.axway.com)
  
Use one of the following settings, for both agents, to set the region the agent will connect to:

* `CENTRAL_REGION`= **US**
* `CENTRAL_REGION`= **EU**
* `CENTRAL_REGION`= **AP**

{{< alert title="Note" color="primary" >}}`CENTRAL_REGION` is part of agents released after June 5 2024. See [CENTRAL_REGION setting](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic#central_region-setting) for the variables that `CENTRAL_REGION` sets.{{< /alert >}}

## Connect AWS API Gateway to Amplify using CLI

The following is a high-level overview of the required steps to connect an AWS API Gateway environment to Amplify:

* Create a service account for the agent to communicate with Amplify platform
* Create an environment to group the APIs
* Configure AWS services / roles (optional) / Infrastructure (optional)
* Deploy the agent in the chosen infrastructure (EC2 / ECS-fargate / Docker only)

You will be guided through this procedure using Axway Central CLI. See [Deploy your agents with Axway CLI](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-with-amplify-cli).

## Related topics

See the following topics for related information.
