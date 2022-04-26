---
title: Connect AWS Gateway
linkTitle: Connect AWS Gateway
weight: 110
date: 2021-01-04
description: Understand why you would want a connected / managed environment for
  AWS API Gateway within Amplify Central. Learn how you can govern and monitor
  the creation / deployment / publishing and subscriptions of the AWS API
  Gateway hosted APIs in one central location.
---

## Why do you want to connect AWS API Gateway and Amplify Central?

Connecting AWS API Gateway to Amplify Central will provide you with a global centralized view of your APIs and their related traffic.

Each AWS Gateway can be represented by an Amplify Central environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents (Discovery and Traceability) interact with AWS API Gateway and Amplify Central to:

* Detect changes to AWS API Gateway stages and deployments using the Discovery Agent. The Discovery Agent pushes the service configuration as an API service for the environment, which can then be published as a catalog item to be used by consumers to subscribe to the service.
* Filter the AWS Cloudwatch logs that are related to discovered APIs and prepare the transaction events that are sent to Amplify Platform.

{{< alert title="Note" color="primary" >}}You will be notified at the startup of the agent if your agent is outdated: New version available. Please consider upgrading from version *(running version)* to version *(latest version)*.{{< /alert >}}

### Discovery Agent

The Discovery Agent is used to discover new deployments and stage updates to existing deployments for publishing related APIs in Amplify Central (either as a catalog item or as an API service). As part of the deployment package, use the provided cloud formation scripts to set up the following agent-dependent AWS Services:

* AWS Config - Administers, audits and monitors resource configurations. Records and validates configuration changes.
* AWS CloudWatch - Monitors resources and AWS applications in real time. Receives and routes supported AWS Service events.
* AWS SQS - Decouples and scales microservices, distributed systems and serverless applications.

![Service Discovery](/Images/central/connect-aws-gateway/aws-discovery-agent_v2.png)

### Traceability Agent

The Traceability Agent is used to filter the AWS CloudWatch logs and prepare the transaction events that are sent to Amplify Central and visible in Business Insights. Viewing your traffic helps you to identify the bottleneck and errors. The traffic can be filtered by environment in case multiples are involved in your topography. As part of the deployment package, you can use cloud formation scripts to set up the following agent-dependent AWS Services:

* AWS CloudWatch - Monitors resources and AWS applications in real time. Receives and routes supported AWS Service events.
* AWS Lamda - Runs code in response to events and automatically manages the computing resources required by that code.
* AWS SQS - Decouples and scales microservices, distributed systems and serverless applications.

The types of logging you can do with API Gateway to CloudWatch:

* Execution logging - API Gateway manages the CloudWatch logs.
* Access logging - Developer managed custom logging.

For additional logging information, see <https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-logging.html>.

![Service Discovery](/Images/central/connect-aws-gateway/aws-traceability-agent_v2.png)

## Prerequisites

* An Axway Amplify Central subscription in the Amplify platform
* A Platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts).
* (Optional) An Amplify Central environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments/)
* API Key credentials on AWS. Allow for CLI access
* Amazon CloudWatch Service
* Amazon Simple Queue Service (AWS SQS)
* AWS Lambda
* CloudFormation template. Download from [https://axway.jfrog.io/ui/repos/tree/General/ampc-public-generic-release%2Faws-agents%2Faws_apigw_agent_config](<https://axway.jfrog.io/ui/repos/tree/General/ampc-public-generic-release%2Faws-agents%2Faws_apigw_agent_config>)

## Region support

Amplify Central supports two regions, US (default) and EU. The data (APIs, traffic) that the agents send to Amplify Central is stored in one of those regions based on the agent configuration.

Use one of the following URLs to access the Amplify Central UI:

* US: [https://apicentral.axway.com](https://apicentral.axway.com)
* EU: [https://central.eu-fr.axway.com](https://central.eu-fr.axway.com)

Update the following variables to move data to the EU region:

* `CENTRAL_DEPLOYMENT`= **prod-eu**
* `CENTRAL_URL`= **<https://central.eu-fr.axway.com>**
* `TRACEABILITY_HOST`= **ingestion.visibility.eu-fr.axway.com:5044**

## Connect AWS API Gateway to Amplify Central using CLI

The following is a high-level overview of the required steps to connect an AWS API Gateway environment to Amplify Central:

* Create a service account for the agent to communicate with Amplify platform
* Create an environment to group the APIs
* Configure AWS services / roles (optional) / Infrastructure (optional)
* Deploy the agent in the chosen infrastructure (EC2 / ECS-fargate / Docker only)

You will be guided through this procedure using Axway Central CLI. See [Deploy your agents with Axway CLI](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-with-amplify-cli).
