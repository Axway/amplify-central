---
title: Connect WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal
linkTitle: Connect WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal
weight: 120
---
Connect WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal and Amplify so you can govern and monitor the creation / deployment / publishing and subscriptions of the WSO2 API Manager APIs in one central location.

## Why do you want to connect Connect WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal and Amplify?

Connecting WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal to Amplify will provide you with a global centralized view of your APIs and their related traffic.

* Overview:[https://apim.docs.wso2.com/en/latest/get-started/overview](https://apim.docs.wso2.com/en/latest/get-started/overview)
* API Manager:[https://wso2.com/api-manager/](https://wso2.com/api-manager/)
* Publisher Portal:[https://apim.docs.wso2.com/en/latest/deploy-and-publish/publish-on-dev-portal/publish-an-api/](https://apim.docs.wso2.com/en/latest/deploy-and-publish/publish-on-dev-portal/publish-an-api/)
* Dev Portal:[https://apim.docs.wso2.com/en/3.0.0/develop/product-apis/getting-started/guide-devportal-v1/](https://apim.docs.wso2.com/en/3.0.0/develop/product-apis/getting-started/guide-devportal-v1/)
* Admin Portal:[https://apim.docs.wso2.com/en/latest/get-started/api-manager-quick-start-guide/](https://apim.docs.wso2.com/en/latest/get-started/api-manager-quick-start-guide/)

The WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal can be represented by an Amplify environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents (Discovery and Traceability) interact with WSO2 API Manager and Amplify to:

* Detect changes to WSO2 Publisher APIs using the Discovery Agent. The Discovery Agent pushes the service configuration as an API service for the environment, which can then be published and used by consumers to subscribe to the service.
* Create and update business plans through Admin to manage quota and subscriptions
* Create applications and credentials through the Dev Portal to execute WSO2 APIs
* Track API metrics and transactions related to discovered APIs, their consumers, and subscriptions.

### Discovery

The Discovery Agent is used to discover new published APIs for a specific WSO2 API Manager. The Discovery Agent pushes REST, SOAP, and GraphQL API definitions to Amplify.

The related APIs are published to Amplify as an API service in the selected environment and then can be published to Marketplace within a product.

#### Application and Access Request

When handling a new access request event, for an existing managed application, the following steps are taken:

* If not previously created, create a new Product based on the provided quota for the API within the request.
* New product creation is based on the API and Quota combination.
* Create an application and link it to the created/existing product from the previous step.
* The link between an application and a product is a subscription, which is created automatically after the application is linked.

For deprovisioning:

* Get the subscriptions for the previously created application.
* Delete the previously created subscription.
* If the application has a single subscription, the application is also deleted

#### Credential

When handling a new credential event, for a given application, the following steps are taken:

* Get the existing ClientID(for an API Key credential type) or ClientID and ClientSecret for an OAuth credential from the application.

For deprovisioning, the credentials will be rotated so no further access is available.

For update, the credentials will be rotated, and the new values will be provided.

### Traceability

The Traceability Agent collects metric information from WSO2 API Portal and publishes that data to Amplify.

The metric data collected includes call count, the number of transactions for a specific API or API/Application combination, and latency details.

The Traceability Agent is not able to sample the transaction data for Amplify Analytics

## Prerequisites

* An Axway Amplify subscription in the Amplify platform
* A Platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts)
* An Amplify environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments/)
* Access to Connect WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal to retrieve details from the services
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

{{< alert title="Note" color="primary" >}}`CENTRAL_REGION` is part of agents released after June 5, 2024. See [CENTRAL_REGION setting](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic#central_region-setting) for the variables that `CENTRAL_REGION` sets{{< /alert >}}

## Gather the required values from Connect WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal

### WSO2 API Manager - baseURL (will be used for Publisher Portal / Dev Portal / Admin Portal)

Values of the baseURL must be provided for the agent to be able to fulfill API Calls to WSO2.

### WSO2 API Manager -  API portal Client ID and Secret & Dev Portal ClientID and Secret

Both agents will use the credentials provided by the WSO2 API Manager  to connect discover APIs and track transactions. ClientID and ClientSecret from WSO2 API Manager will be required. Please contact your administrator if you need help gathering this information.

### Token URL

To use the ClientID and Secret, the agent must authenticate to an identity provider and retrieve a token. The full URL must be provided (Ex: <https://example.com/oauth/token>)
