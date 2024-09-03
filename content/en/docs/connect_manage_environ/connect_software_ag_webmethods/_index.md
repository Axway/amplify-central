---
title: Connect SoftwareAG WebMethods
linkTitle: Connect SoftwareAG WebMethods
weight: 120
---
Connect SoftwareAG WebMethods and Amplify so you can govern and monitor the creation / deployment / publishing and subscriptions of the SoftwareAG WebMethods APIs in one central location.

## Why do you want to connect SoftwareAG WebMethods and Amplify?

Connecting SoftwareAG WebMethods to Amplify will provide you with a global centralized view of your APIs and their related traffic.

The SoftwareAG WebMethods gateway can be represented by an Amplify environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents (Discovery and Traceability) interact with SoftwareAG WebMethods and Amplify to:

* Detect changes to SoftwareAG WebMethods APIs using the Discovery Agent. The Discovery Agent pushes the service configuration as an API service for the environment, which can then be published and used by consumers to subscribe to the service.
* Track API metrics and transactions related to discovered APIs, their consumers, and subscriptions.

### Discovery

The Discovery Agent is used to discover new published APIs for a specific SoftwareAG WebMethods catalog. The Discovery Agent pushes REST, SOAP, and GraphQL API definitions to Amplify.

The related APIs are published to Amplify as an API service in the selected environment and then can be published to Marketplace within a product.

#### Application

While handling a new application event the following steps are taken:

* Create a new application

For deprovisioning the created application will be removed.

#### Access Request

When handling a new access request event, for a given application, the following steps are taken:

* Assign API with the created application
* Create a quota plan and assign it to the API policy
* Add/update application's identifiers

For deprovisioning:

* Remove API from the application
* If previously created, remove plan from API's policy
* Remove/update application identifiers

#### Credential

For the credential to work, a credential policy action needs to be configured first. These are the steps:

* Identify the API you want to secure
* Go to the `Policies` tab
* Enter edit mode by pressing `Edit` button in the right corner
* Select `Identify & Access` category from the left list
* Create a `Identify & Authorize` policy action by pressing the `+` next to it
* Select the condition type: `AND` or `OR` and select the wanted authorization method(s)
* Save the configuration by pressing the `Save` button in the right corner

When handling a new credential event, for a given application, the following steps are taken:

* For API key:
    * Provision:
        * the API key present on the application is used
    * Deprovision:
        * application's API key is renewed but not updated in API Central
    * Renew:
        * application's API key is renewed and updated in API Central
* For OAuth2:
    * Provision:
        * a OAuth2 strategy is created and assigned to the application
    * Deprovision:
        * the OAuth2 strategy is deleted and removed from application
    * Renew:
        * new Client ID and Secret are created and updated in API Central
* For Basic Auth:
    * Provision:
        * the Username identifier from the application is created/updated
    * Deprovision:
        * application's Username identifier is deleted/updated

### Traceability

The Traceability Agent collects metric information and sampled transactions from SoftwareAG WebMethods and publishes that data to Amplify.

The metric data collected includes call count, the number of transactions for a specific API or API/Application combination, and latency details.

The transaction data collected will only be a sample of the overall number of transactions that were seen in SoftwareAG WebMethods.

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

## Connect to SoftwareAG WebMethods gateway

Both agents will use the credentials used to login in the SoftwareAG WebMethods gateway, the email address and password