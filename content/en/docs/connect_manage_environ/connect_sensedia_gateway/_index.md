---
title: Connect Sensedia Gateway
linkTitle: Connect Sensedia Gateway
weight: 155
date: 2025-01-04
---
Connect Sensedia API Gateway and Amplify so you can govern and monitor the creation / deployment / publishing and subscriptions of the Sensedia API Gateway hosted APIs in one central location.

## Why do you want to connect Sensedia API Gateway and Amplify?

Connecting Sensedia API Gateway to Amplify will provide you with a global centralized view of your APIs and their related traffic.

Each Sensedia Gateway can be represented by an Amplify environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents (Discovery and Traceability) interact with Sensedia API Gateway and Amplify to:

* Detect changes to Sensedia API Gateway APIs and deployments using the Discovery Agent. The Discovery Agent pushes the service configuration as an API service for the environment, which can then be published as a catalog item to be used by consumers to subscribe to the service.
* Filter the Sensedia API Gateway logs that are related to discovered APIs and prepare the transaction events that are sent to Amplify platform.

{{< alert title="Note" color="primary" >}}You will be notified at the startup of the agent if your agent is outdated: New version available. Please consider upgrading from version *(running version)* to version *(latest version)*.{{< /alert >}}

### Discovery Agent

The Discovery Agent is used to discover APIs and their revisions deployed to configured environments for publishing related APIs in Amplify as an API service. It will regularly check Sensedia API Gateway for modifications on these resources to push updates to Amplify.

### Traceability Agent

The Traceability Agent is used to filter the Sensedia API Gateway call logs and prepare the metrics that are sent to and made visible to Amplify. Viewing your traffic helps you to identify possible bottlenecks and errors. The traffic can be filtered by environment in case multiples are involved in your topography.

The Traceability Agent gathers API metrics only and does not support transaction-level logging.

## Prerequisites

* An Axway Amplify subscription in the Amplify platform
* A platform service account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts)
* An Amplify environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments/)
* Sensedia API Gateway with API Manager access
* Sensedia authentication credentials
    * Client ID and Client Secret for OAuth
    * Static Token
* Docker environment for running the agents
* Network access from agent host to Sensedia API Gateway and Amplify platform

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

## Connect Sensedia API Gateway to Amplify using CLI

The following is a high-level overview of the required steps to connect a Sensedia API Gateway environment to Amplify:

* Create a service account for the agent to communicate with Amplify platform
* Create an environment to group the APIs
* Configure Sensedia authentication credentials
* Deploy the agent in Docker containers

You will be guided through this procedure using Axway Central CLI. See [Deploy your agents with Axway CLI](/docs/connect_manage_environ/connect_sensedia_gateway/deploy-your-agents-with-amplify-cli).

## Related topics

See the following topics for related information.
