---
title: Connect API Manager
linkTitle: Connect API Manager
weight: 100
date: 2020-15-15
description: Understand why you would connect Axway API Manager to Amplify
  Central. Learn how you can publish to the Amplify Catalog from your API
  Management System in order to obtain a global view of your APIs and present
  this Catalog to your consumers. Learn how you can collect the traffic of all
  your gateways and see it in a single place in Amplify Central Observability.
---

## What is Axway API Manager connected?

Connect your API Management system (v7.6.2 or above) to Amplify Central by using two agents: Discovery and Traceability.

{{< alert title="Note" color="primary" >}}You will be notified at the startup of the agent if your agent is outdated: New version available. Please consider upgrading from version *(running version)* to version *(latest version)*.{{< /alert >}}

These two agents will help you to represent and expose your API Management eco-system in Amplify Central:

* Create an API Gateway environment in Amplify Central that represent your actual API Management eco-system.
* Detect a published API using the Discovery Agent. The Discovery Agent discovers the API from API Manager and makes it available in Amplify Central. An API Service in Central is created to reference the API from API Manager and then you can optionally tell the agent to publish it to the Amplify Catalog to allow your consumer to discover it.
* Manage consumer subscription using the Discovery Agent. When a consumer subscribes / unsubscribes to a Catalog asset, the Discovery Agent keeps track of the changes and maintains the API Management system accordingly.
* Filter the Axway API Gateway logs using the Traceability Agent. The Traceability Agent uses the discovered API to filter API Gateway events to extract the transaction information and send it to the Amplify platform Observability module.

### Discovery Agent

The Discovery Agent is used to discover new published APIs. The Discovery Agent pushes both REST and SOAP API definitions to Amplify Central.

If the Discovery Agent discovers an API where the inbound security is not set to PassThrough / API Key / OAuth, the correlating catalog asset will not be created. Discovered APIs that do not have the correct inbound security will only be available in the environment.

The related APIs are published to Amplify Central either as an API Service in environment or an API Service in environment and optionally as Catalog item (default behavior).

If the default owner of the discovered APIs is not set in the agent configuration, the ownership is assigned to the team whose name matches the Organization name that the APIs belong to.

![Service Discovery](/Images/central/connect-api-manager/servicediscoveryapim.png)

### Traceability Agent

The Traceability Agent sends log information about APIs in API Gateway and publishes the events to Amplify Central.

## Prerequisites

* An Axway Amplify Central subscription in the Amplify platform
* (Optional) A platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts).
* (Optional) An Amplify Central environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments)
* An API Manager user having the role of API Manager administrator for the Discovery / Traceability agent to connect to API Manager
* An API Gateway user having the role of API Gateway operator for Traceability Agent to connect to API Gateway

## System requirements

* Axway API Manager / Axway API Gateway versions 7.6.2 SPx and 7.7 SPx up and running using a Linux installation (CentOS 6.x, 7.x, 8.x,  Oracle Linux 6.x, 7.x, Red Hat Enterprise Linux 6.x, 7.x, 8.x, SUSE Linux Enterprise Server 11.x, 12.x)
* The Linux machine where API Manager and API Gateway are running must be accessible and have `sudo` rights to run the Agents
* The agents must be installed on the same machine that API Manager and/or API Gateway is running

## Region support

Amplify Central supports two regions, US (default) and EU. The data (APIs, traffic) that the agents send to Amplify Central is stored in one of those regions based on the agent configuration.

Use one of the following URLs to access the Amplify Central UI:

* US: [https://apicentral.axway.com](https://apicentral.axway.com)
* EU: [https://central.eu-fr.axway.com](https://central.eu-fr.axway.com)

Update the following variables to move data to the EU region:

* `CENTRAL_DEPLOYMENT`= **prod-eu**
* `CENTRAL_URL`= **<https://central.eu-fr.axway.com>**
* `TRACEABILITY_HOST`= **ingestion.visibility.eu-fr.axway.com:5044**

## Connect Axway API Manager to Amplify Central using Axway Central CLI

The following is a high-level overview of the required steps to connect an API Manager V7 environment to Amplify Central:

* Create a service account for the agent to communicate with Amplify platform
* Create an environment to group the APIs
* Deploy the agent to the gateway: one Discovery Agent per Node Manager and one Traceability Agent per gateway

You will be guided through this procedure using Axway Central CLI. See [Deploy your agent with Axway CLI](/docs/connect_manage_environ/connect_api_manager/deploy-your-agents-with-amplify-cli/).

## Connect Axway API Manager to Amplify Central manually

The following demonstrates how to connect an Axway API-Gateway V7 to Amplify-Central without using the Axway CLI.

{{< youtube kugRyYVw5nI >}}

## Role-based documentation

Some of the content in the Connect API Manager documentation is of interest to a wide range of development and administrator professions. The following topics are organized by professional role and common task scenarios:

* [Administer API Manager Gateway](/docs/connect_manage_environ/connect_api_manager/gateway-administation/)

* [Administer agent security](/docs/connect_manage_environ/connected_agent_common_reference/agent_security/)

* [Administer API Manager network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/)
