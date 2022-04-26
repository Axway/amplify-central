---
title: Connect Azure Gateway
linkTitle: Connect Azure Gateway
weight: 120
date: 2021-01-07
description: Understand why you would connect Azure API Management Services to
  Amplify Central. Learn how you can publish to the Amplify Catalog from your
  API Management Services in order to obtain a global view of your APIs and
  present this Catalog to your consumers. Learn how you can collect the traffic
  of all your gateways and see it in a single place in Amplify Central
  Observability.
---
## What is Azure API Management Service connected?

Connect your Azure Management Services to Amplify Central by using two agents: Discovery and Traceability.

{{< alert title="Note" color="primary" >}}You will be notified at the startup of the agent if your agent is outdated: New version available. Please consider upgrading from version *(running version)* to version *(latest version)*.{{< /alert >}}

These two agents will help you to represent and expose your API Management eco-system in Amplify Central:

* Create an environment in Amplify Central that represent your actual API Management eco-system.
* Detect a published API using the Discovery Agent. The Discovery Agent discovers the API from API Manager and makes it available in Amplify Central. An API Service in Central is created to reference the API from API Management Service and then you can optionally tell the agent to publish it to the Amplify Catalog to allow your consumer to discover it.
* Manage consumer subscription using the Discovery Agent. When a consumer subscribes / unsubscribes to a Catalog asset, the Discovery Agent keeps track of the changes and maintains the API Management system accordingly.
* Filter the Azure Gateway logs using the Traceability Agent. The Traceability Agent uses the discovered API to filter Azure Gateway events to extract the transaction information and send it to the Amplify platform Observability module.

### Discovery Agent

The Discovery Agent is used to discover new published APIs. The Discovery Agent pushes both REST and SOAP API definitions to Amplify Central.

The related APIs are published to Amplify Central either as an API Service in environment or an API Service in environment and optionally as Catalog item (default behavior).

![Service Discovery](/Images/central/connect-azure-gateway/discoveryagent.png)

### Traceability Agent

The Traceability Agent sends log information about APIs that have been discovered and published to Amplify Central.

![Service Traceability](/Images/central/connect-azure-gateway/traceabilityagent.png)

## Prerequisites

* An Axway Amplify Central subscription in the Amplify Platform
* (Optional) A Platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts).

{{< alert title="Note" color="primary" >}}Although both service account types are currently supported, the Amplify Central Service Account will soon be retired. For this reason, it is recommended that you use the Platform Service Account.{{< /alert >}}

* An Amplify Central environment
* An Azure Service principal for the Discovery Agent to use Azure APIs
* An Azure Event Hub for the Traceability Agent to report API traffic to Amplify Platform

## System requirements

* A Docker container where the agent images will run

## Region support

Amplify Central supports two regions, US (default) and EU. The data (APIs, traffic) that the agents send to Amplify Central is stored in one of those regions based on the agent configuration.

Use one of the following URLs to access the Amplify Central UI:

* US: <https://apicentral.axway.com>
* EU: <https://central.eu-fr.axway.com>

Update the following variables to move data to the EU region:

* `CENTRAL_DEPLOYMENT`= **prod-eu**
* `CENTRAL_URL`= **<https://central.eu-fr.axway.com>**
* `TRACEABILITY_HOST`= **ingestion.visibility.eu-fr.axway.com:5044**

## Creating an Azure service principal for Discovery Agent

The Discovery agent will use an Azure Service principal to consume Azure APIs for discovering APIs hosted in Azure in Azure API Management Service

Use the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) to create the Azure Service principal.

Once the Azure CLI is installed, run the following commands:

* Connect to Azure: `az login`. You will be redirected to the Azure login page where you enter your credentials to your Azure account. Once connected, the command line output displays all your associated Azure subscription.
* Create the Service principal: `az ad sp create-for-rbac -n "http://your service principal name"`.

Sample

```shell
c:\az ad sp create-for-rbac -n "http://ServicePrincipalForAmplifyAgent"
Creating a role assignment under the scope of "/subscriptions/0fb0f691-********************"
{
  "appId": "3175c9ac-********************",
  "displayName": "ServicePrincipalForAmplifyAgent",
  "name": "http://ServicePrincipalForAmplifyAgent",
  "password": "********************",
  "tenant": "300f59df-********************"
}
```

When you create the Azure principal, the return gives you information you need later to configure the agents. If you lose this information, you can retrieve it again with the following command: `az ad sp list --filter "displayname eq 'service-principal'`, where *service-principal* is the name of the principal you created. Be careful, as this command will not return the service principal password. It is preferable to store the information safely.

Notes:

* If you have more than one subscription within your Azure account, run the following command `az account set --subscription "subscription_name"` to select the appropriate subscription you want to work with.
* You must have at least Owner rights to create the Service principal account.

You can retrieve your subscription id with the command: `az account show --query id`

## Preparing Azure services for Traceability Agent

The following is a high-level overview of the required steps to connect Azure API Management services to Amplify Central:

* Create the Service principal
* Create an Azure Event Hubs Namespace and Event Hub
* Create an Azure diagnostic setting
* Configure Azure API's for Azure monitoring

### Creating an Azure service principal for the Traceability Agent

To install an Azure Traceability Agent only, you must create an Azure service principal. See [Creating an Azure service principal for Discovery Agent](#creating-an-azure-service-principal-for-discovery-agent).

### Creating Azure Event Hubs namespace and Event Hub

Azure Event Hubs is a big data streaming platform and event ingestion service. Refer to <https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about>.

To create an Azure Event Hub, it is first required to create an Event Hubs namespace. For that, go to Azure Portal and select the \[Event Hubs] service. Then create the Event Hubs namespace. Select the appropriate Azure subscription and resource group where this namespace will be available. Be sure to create the Event Hubs namespace in the same region as your API Management service. For the pricing, we recommend the Standard one. When creating the Event Hubs namespace, Azure will automatically attach to it an access policy. We recommend you keep the default values provided.

Once the namespace is created, you can add an Event Hub to this namespace.

Remember the following when creating the Azure Event Hub, as you'll need the information for the Traceability Agent configuration:

* **Event Hubs namespace name**
* **Event Hub name**
* **policy name** attached to the Event Hubs namespace (RootManageSharedAccessKey by default)
* **policy primary or second key**

### Creating Azure diagnostic settings

The Azure diagnostic settings will link the Resource group to the Event Hub.

To create a diagnostic setting:

1. Go to Azure portal, open your resource group and open the Monitoring / Diagnostic settings page.
2. Add a diagnostic setting and give it a name.
3. Select the **GatewayLogs** and **Stream to an event hub** options. The **Stream to event hub** option requires the previous information from Event Hubs namespace and Event Hub name.
4. Save your changes.

Azure is now ready to register your API traffic to the Event Hub.

### Configuring API Azure monitoring

By default, Azure does not monitor API traffic or their headers. You must explicitly ask for that. You can do it per API or for all APIs present in the API Management service.

To configure monitoring:

1. Open the settings of an API (or all APIs).
2. Select the Azure Monitor tab.
3. Select the check box to enable monitoring.
4. Select the Verbose mode and add all headers you want to track. These headers can belong to any request/response (frontend/backend) or you can choose different headers to log using the advanced options.

Now that Azure is all set, you can [Deploy the agents using Axway Central CLI](/docs/connect_manage_environ/connect_azure_gateway/deploy-your-agents-with-amplify-cli) to discover and monitor Azure APIs.
