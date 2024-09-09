---
title: Connect IBM API Connect
linkTitle: Connect IBM API Connect
weight: 120
---
Connect IBM API Connect and Amplify so you can govern and monitor the creation / deployment / publishing and subscriptions of the IBM API Connect APIs in one central location.

## Why do you want to connect IBM API Connect and Amplify?

Connecting IBM API Connect to Amplify will provide you with a global centralized view of your APIs and their related traffic.

The IBM API Connect gateway can be represented by an Amplify environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents (Discovery and Traceability) interact with IBM API Connect and Amplify to:

* Detect changes to IBM API Connect APIs using the Discovery Agent. The Discovery Agent pushes the service configuration as an API service for the environment, which can then be published and used by consumers to subscribe to the service.
* Track API metrics and transactions related to discovered APIs, their consumers, and subscriptions.

### Discovery

The Discovery Agent is used to discover new published APIs for a specific IBM API Connect catalog. The Discovery Agent pushes REST, SOAP, and GraphQL API definitions to Amplify.

The related APIs are published to Amplify as an API service in the selected environment and then can be published to Marketplace within a product.

#### Application

While handling a new application event the following steps are taken:

* Create a new consumer org, if the consumer org has not already been created
* Create a new application assigned to that consumer org

For deprovisioning the created application will be removed.

#### Access Request

When handling a new access request event, for a given application, the following steps are taken.

* If not previously created, create a new Draft Product for the API within the request
* In the Draft Product create a new plan to match the Amplify Marketplace plan details
* Publish the Draft Product and Plan to the Catalog as a Product
* Create a subscription with the related Application for the newly published product

For deprovisioning the created subscription will be removed.

#### Credential

When handling a new credential event, for a given application, the following steps are taken

* Create a new Client ID for the related Application

For deprovisioning the created Client ID will be removed.

### Traceability

The Traceability Agent collects metric information and sampled transactions from IBM API connect and publishes that data to Amplify.

The metric data collected includes call count, the number of transactions for a specific API or API/Application combination, and latency details.

The transaction data collected will only be a sample of the overall number of transactions that were seen in IBM API Connect.

## Prerequisites

* An Axway Amplify subscription in the Amplify platform
* A Platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts)
* An Amplify environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments/)
* Access to IBM API Connect to retrieve details from the service and CLI Toolkit
* The [Traceability Agent](#traceability) requires a connected and running [Discovery Agent](#discovery)

## System requirements

* An environment to run the agent Docker containers.

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

{{< alert title="Note" color="primary" >}}`CENTRAL_REGION` is part of agents released after June 5 2024. See [CENTRAL_REGION setting](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic#central_region-setting) for the variables that `CENTRAL_REGION` sets{{< /alert >}}

## Gather the required values from IBM API connect

### Client ID and Secret

Both agents will use the credentials provided by the IBM API Connect CLI Toolkit to connect discover APIs and track transactions. Additionally, an API Key must be retrieved

Use this [Procedure](https://www.ibm.com/docs/en/api-connect/10.0.x?topic=toolkit-installing#tasktask_qsv_cgq_nt__steps__1) to retrieve the Client ID and Client Secret for the agent. The values under toolkit will be used for the agent.

### API Key

Use this [Procedure](https://www.ibm.com/docs/en/api-connect/saas?topic=applications-managing-platform-rest-api-keys#taskcapim_mng_apikeys__steps__1) to retrieve the API Key for the agent.

### Organization Name

Follow these steps to retrieve your IBM API Connect Organization Name:

1. Log in to IBM API Connect.
2. Click the Settings (gear) icon on the left navigation bar.
3. Save the Organization Name value to use when setting up your agents.

### Catalog Name

The IBM API Connect agents discover APIs and track transactions for APIs that are published to a specific catalog within IBM API Connect. The Catalog to use needs to be given as a setting to the agent.

Follow these steps to retrieve your IBM API Connect Catalog Name:

1. Log in to IBM API Connect.
2. Click the Manage (four squares) icon on the left navigation bar.
3. Select the Catalog that will be linked to the agents.
4. Select the `Catalog settings` link on the Catalog's page.
5. Save the Catalog Name value to use when setting up your agents.

### Consumer Organization Settings

To provision access in IBM API Connect, the agent needs to know the user that will own all the created consumer organizations.

Follow these steps to find the registry name:

1. Log in to IBM API Connect.
2. Click the Resources (file cabinet) icon on the left navigation bar.
3. Select `User registries`.
4. Click the user registry that will be used.
5. Find the registry name on the page.

Additionally, a username that will own all consumer organizations must also be determined.

### Analytics Server Name or ID

The IBM API Connect Traceability Agent can track transactions for APIs by querying a specific Analytics Server in your IBM API Connect installation.

Follow these steps to retrieve your IBM API Connect Analytics Server ID:

1. Log in to IBM API Connect.
2. Click the Analytics (graph) icon on the left navigation bar.
3. The Analytics ID can be retrieved within the URL bar of the browser. See the UUID value `1111111-1111-1111-1111-111111111111` after `analytics/` and before `/dashboards` below:

Ex: `https://apiconnect.host.com/manager/orgname/analytics/1111111-1111-1111-1111-111111111111/dashboards`

## Related topics

See the following topics for related information.