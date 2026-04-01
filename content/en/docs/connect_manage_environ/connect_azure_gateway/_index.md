---
title: Connect Azure Gateway
linkTitle: Connect Azure Gateway
weight: 140
date: 2021-01-07
---
Connect Azure API Management Services to Amplify so you can:

* Publish to the Amplify Catalog from your API Management Services in order to obtain a global view of your APIs and present this catalog to your consumers
* Collect the traffic of all your gateways and see it in a single place in Amplify Observability

## Why do you want to connect Azure API Management Service and Amplify?

Connect your Azure Management Services to Amplify by using two agents: Discovery and Traceability.

{{< alert title="Note" color="primary" >}}You will be notified at the startup of the agent if your agent is outdated: New version available. Please consider upgrading from version *(running version)* to version *(latest version)*.{{< /alert >}}

These two agents will help you to represent and expose your API Management eco-system in Amplify:

* Create an environment in Amplify that represent your actual API Management eco-system.
* Detect a published API using the Discovery Agent. The Discovery Agent discovers the API from API Manager and makes it available in Amplify. An API service is created to reference the API from API Management Service and then you can optionally tell the agent to publish it to the Amplify Catalog to allow your consumer to discover it.
* Manage consumer subscription using the Discovery Agent. When a consumer subscribes / unsubscribes to a Catalog asset, the Discovery Agent keeps track of the changes and maintains the API Management system accordingly.
* Filter the Azure Gateway logs using the Traceability Agent. The Traceability Agent uses the discovered API to filter Azure Gateway events to extract the transaction information and send it to the Amplify platform Observability module.

### Discovery Agent

The Discovery Agent can be used to discover new published APIs or Event Hub topics. The Discovery Agent functions in two modes, default mode where all APIs are discovered from the API Manager, and the EventHub mode where the Event Hub topics are discovered from the Event Hub and Schema Registry. After the discovery process, the agent pushes both REST and SOAP API definitions to Amplify.

The related APIs are published to Amplify as an API service in the selected environment and then can be published to Marketplace within a product.

![Service Discovery](/Images/central/connect-azure-gateway/discoveryagent.png)

### Traceability Agent

The Traceability Agent sends log information about APIs that have been discovered and published to Amplify.

![Service Traceability](/Images/central/connect-azure-gateway/traceabilityagent.png)

## Prerequisites

* An Axway Amplify subscription in the Amplify platform
* A Platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts)
* An Amplify environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments/)
* An Azure Service principal for the Discovery Agent to use Azure APIs in default mode or to use an Event Hub for when the agent runs in EventHub mode
* An Azure Event Hub for the Traceability Agent to report API traffic to Amplify platform
* The [Traceability Agent](#traceability-agent) requires a connected and running [Discovery Agent](#discovery-agent)

## System requirements

* An environment to run the agent Docker containers

## Region support

Amplify supports three regions, US (default), EU and APAC. The data (APIs, traffic) that the agents send to Amplify is stored in one of those regions based on the agent configuration.

Use one of the following URLs to access the Amplify UI:

* US: [https://apicentral.axway.com](https://apicentral.axway.com)
* EU: [https://central.eu-fr.axway.com](https://central.eu-fr.axway.com)
* APAC: [https://central.ap-sg.axway.com](https://central.ap-sg.axway.com)

Use one of the following settings, for both agents, to set the region the agent will connect to:

* `CENTRAL_REGION`= **US**
* `CENTRAL_REGION`= **EU**
* `CENTRAL_REGION`= **AP**

{{< alert title="Note" color="primary" >}}`CENTRAL_REGION` is part of agents released after June 5 2024. See [CENTRAL_REGION setting](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic#central_region-setting) for the variables that `CENTRAL_REGION` sets.{{< /alert >}}

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

When you create the Azure principal, the return gives you information you need later to configure the agents. If you lose this information, you can retrieve it again with the following command: `az ad sp list --filter "displayname eq 'service-principal'"`, where *service-principal* is the name of the principal you created. Be careful, as this command will not return the service principal password. It is preferable to store the information safely.

Notes:

* If you have more than one subscription within your Azure account, run the following command `az account set --subscription "subscription_name"` to select the appropriate subscription you want to work with.
* You must have at least Owner rights to create the Service principal account.

You can retrieve your subscription id with the command: `az account show --query id`

### Granting Microsoft Graph API permissions for Entra ID credential provisioning

If you plan to use Entra ID credential provisioning, the service principal requires Microsoft Graph API permissions. Two permission sets are supported:

| Permission set                                                          | Scope                | Description                                                                                                            |
|-------------------------------------------------------------------------|----------------------|------------------------------------------------------------------------------------------------------------------------|
| `Application.ReadWrite.All` + `ServicePrincipal.ReadWrite.All`          | Tenant-wide          | The agent can manage all app registrations and service principals in the tenant.                                       |
| `Application.ReadWrite.OwnedBy` + `ServicePrincipal.ReadWrite.OwnedBy`  | Owned resources only | **Recommended (least-privilege)**. The agent can only manage app registrations and service principals that it created. |

Use the Azure CLI to grant the permissions. Replace `<APP_ID>` with the `appId` returned when you created the service principal:

```shell
# Grant Application.ReadWrite.OwnedBy (recommended)
az ad app permission add --id <APP_ID> --api 00000003-0000-0000-c000-000000000000 --api-permissions 18a4783c-866b-4cc7-a460-3d5e5662c884=Role

# Grant ServicePrincipal.ReadWrite.OwnedBy (recommended)
az ad app permission add --id <APP_ID> --api 00000003-0000-0000-c000-000000000000 --api-permissions 314ac21d-d7c0-49e0-89d0-0e29a3014e42=Role

# Grant admin consent for the tenant
az ad app permission admin-consent --id <APP_ID>
```

{{< alert title="Note" color="primary" >}}If your organization's security policy allows tenant-wide access, you can substitute `Application.ReadWrite.All` (`1bfefb4e-e0b5-418b-a88f-73c46d2cc8e9=Role`) and `ServicePrincipal.ReadWrite.All` (`89c8469c-83ad-45f7-8ff2-6e3d4285709e=Role`) instead. No additional agent configuration is required — the agent automatically detects which permission set is available.{{< /alert >}}

#### Verifying permissions are correctly configured

After granting permissions, use the Azure CLI to confirm the setup:

```shell
# List Graph API permissions granted to the agent's app registration
az ad app permission list --id <APP_ID>

# Verify admin consent was granted (look for entries with "resourceId" matching Microsoft Graph)
az ad sp show --id <APP_ID> --query "appRoleAssignments"

# Test outbound connectivity to Microsoft Graph API
# A "401" response confirms the host is reachable (authentication is expected to fail without a token)
curl -s -o /dev/null -w "%{http_code}" https://graph.microsoft.com/v1.0
```

{{< alert title="Note" color="primary" >}}The agent must be able to reach `graph.microsoft.com:443` over HTTPS. If your network restricts outbound traffic, add this host to your firewall allow list. See [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/#azure-gateway---entra-id-credential-provisioning).{{< /alert >}}

#### Migrating from Application.ReadWrite.All to OwnedBy permissions

If you are tightening permissions on an existing deployment, be aware of the following:

* App registrations created **before** the switch will not have the agent's service principal listed as an owner. The agent **cannot manage** these resources under `.OwnedBy` permissions.
* Only app registrations created **after** the permission change will be manageable by the agent.
* To allow the agent to manage previously created resources, manually add the agent's service principal as an owner:

```shell
# Get the agent's service principal object ID
SP_OBJECT_ID=$(az ad sp show --id <APP_ID> --query id -o tsv)

# Add the agent's SP as owner of an existing app registration
az ad app owner add --id <EXISTING_APP_REGISTRATION_ID> --owner-object-id $SP_OBJECT_ID
```

* Alternatively, you can keep `Application.ReadWrite.All` + `ServicePrincipal.ReadWrite.All` until all previously provisioned credentials have been rotated or deleted, then switch to `.OwnedBy`.

### How Entra ID credential provisioning works

When a Marketplace consumer requests Entra ID credentials for a discovered API, the Discovery Agent performs the following steps:

1. **Create an app registration** in Azure AD with a display name that identifies the consumer and API.
2. **Add the agent's service principal as owner** of the app registration. This step is non-fatal — if it fails (e.g., due to `.All` permissions where ownership is implicit), the agent logs a warning and continues.
3. **Create a service principal** for the app registration. The agent retries this step with exponential backoff (up to ~6 seconds total) to account for Azure AD directory propagation delays.
4. **Create a client secret** on the app registration. This step is also retried with exponential backoff.
5. **Return the `client_id` and `client_secret`** to the consumer via the Amplify Marketplace.

If service principal or client secret creation fails after exhausting all retries, the agent automatically **rolls back** by deleting the app registration that was created in step 1. This prevents orphaned app registrations from accumulating in Azure AD and blocking future provisioning attempts for the same API.

{{< alert title="Note" color="primary" >}}Azure AD's eventual consistency model means that newly created objects (such as app registrations) may not be immediately visible to all API endpoints. The retry mechanism with exponential backoff is designed to absorb these propagation delays, which typically resolve within a few seconds. For more details, see [404 Not Found error when managing objects through Microsoft Graph](https://learn.microsoft.com/en-us/troubleshoot/entra/entra-id/app-integration/404-not-found-error-manage-objects-microsoft-graph).{{< /alert >}}

When a credential is deleted, the agent removes the corresponding app registration and its associated service principal from Azure AD.

### Changes to the validate-jwt policy

When an Entra ID credential is provisioned, the Discovery Agent makes two modifications to the API's existing `validate-jwt` inbound policy in Azure API Management:

1. **A new `<audience>` entry** is added to the `<audiences>` list. This is the standard OAuth audience for the provisioned credential (e.g., `api://credential-name-id`). It is required for the `validate-jwt` policy to accept tokens issued for that credential.

2. **An `output-token-variable-name` attribute and a `<set-header>` element** are added to support consumer usage analytics in Amplify. The `output-token-variable-name="jwt"` attribute tells the `validate-jwt` policy to store the decoded JWT in a context variable. The `<set-header name="X-Amplify-Audience">` element then extracts the `aud` claim from the token and passes it as a header on the backend request:

    ```xml
    <validate-jwt header-name="Authorization" output-token-variable-name="jwt" ...>
      <audiences>
        <audience>https://management.azure.com/</audience>
        <audience>api://credential-name-id</audience>
      </audiences>
      ...
    </validate-jwt>
    <set-header name="X-Amplify-Audience" exists-action="override">
      <value>@(((Jwt)context.Variables["jwt"]).Claims["aud"]?.FirstOrDefault())</value>
    </set-header>
    ```

The Traceability Agent reads the `X-Amplify-Audience` header from Event Hub logs to attribute API traffic to the correct consumer application in Amplify usage reports and dashboards.

{{< alert title="Note" color="primary" >}}

* **No impact on authentication** — the agent does not change how the `validate-jwt` policy authenticates requests. Existing audiences, issuers, and OpenID configuration are not modified.
* **No impact on API consumers** — the `X-Amplify-Audience` header is only set on the internal backend request. It is not returned to API callers and is invisible to consumers.
* **Fully reversible** — when the Amplify credential is deprovisioned, the audience entry, the `set-header` element, and the `output-token-variable-name` attribute are automatically removed, restoring the policy to its original state.
* **No sensitive data** — the header passes along the audience claim that is already present in the validated JWT. No additional data is extracted or exposed.
* **Consumer insights require this instrumentation** — Azure Event Hub diagnostic logs do not include JWT claims or the `Authorization` header. The `set-header` policy is the only mechanism available to extract the audience from the validated token and make it available in the Event Hub logs for consumer attribution.
{{< /alert >}}

### Choosing a credential type: API Key vs. Entra ID

Azure API Management supports two credential types. The table below summarizes the differences to help you choose the right one for your use case:

|                                  | API Key                                                     | Entra ID (ClientID + ClientSecret)                                       |
|----------------------------------|-------------------------------------------------------------|--------------------------------------------------------------------------|
| **Authentication mechanism**     | APIM subscription key passed as a header or query parameter | OAuth 2.0 client-credentials flow using `client_id` and `client_secret`  |
| **What the agent provisions**    | An Azure APIM subscription                                  | An Azure AD app registration, service principal, and client secret       |
| **Best for**                     | Simple, key-based API access                                | APIs protected by Azure AD / OAuth 2.0                                   |
| **Azure AD permissions required**| None (APIM Contributor role only)                           | Microsoft Graph API permissions (see above)                              |
| **Credential rotation**          | Consumer regenerates the subscription key                   | Consumer requests a new credential; agent creates a new client secret    |

## Preparing Azure services for Traceability Agent

The following is a high-level overview of the required steps to connect Azure API Management services to Amplify:

* Create the Service principal
* Create an Azure Event Hubs Namespace and Event Hub
* Create an Azure diagnostic setting
* Configure Azure API's for Azure monitoring

### Creating an Azure service principal for the Traceability Agent

To install an Azure Traceability Agent only, you must create an Azure service principal. See [Creating an Azure service principal for Discovery Agent](#creating-an-azure-service-principal-for-discovery-agent).

### Creating Azure Event Hubs namespace and Event Hub

Azure Event Hubs is a big data streaming platform and event ingestion service. Refer to <https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about>.

To create an Azure Event Hub, it is first required to create an event hubs namespace. For that, go to Azure Portal and select the \[Event Hubs] service. Then create the event hubs namespace. Select the appropriate Azure subscription and resource group where this namespace will be available. Be sure to create the event hubs namespace in the same region as your API Management service. For the pricing, the Standard one is recommended. When creating the event hubs namespace, Azure will automatically attach to it an access policy. Keep the default values as provided.

Once the namespace is created, you can add an event hub to this namespace.  

Once the event hub is created, you can optionally create an additional consumer group alongside the `$Default` consumer group. Refer to <https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about> or <https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-features#consumer-groups> regarding explanation and configuration.

Remember the following when creating the Azure Event Hub, as you'll need the information for the Traceability Agent configuration:

* **Event Hubs namespace name**
* **Event Hub name**
* **policy name** attached to the event hubs namespace (RootManageSharedAccessKey by default)
* **policy primary or second key**

### Creating Azure diagnostic settings

The Azure diagnostic settings will link the resource group to the event hub.

To create a diagnostic setting:

1. Go to Azure portal, open your resource group and open the Monitoring / Diagnostic settings page.
2. Add a diagnostic setting and give it a name.
3. Select the **GatewayLogs** and **Stream to an event hub** options. The **Stream to event hub** option requires the previous information from event hubs namespace and event hub name.
4. Save your changes.

Azure is now ready to register your API traffic to the event hub.

### Configuring API Azure monitoring

By default, Azure does not monitor API traffic or their headers. You must explicitly ask for that. You can do it per API or for all APIs present in the API Management service.

To configure monitoring:

1. Open the settings of an API (or all APIs).
2. Select the Azure Monitor tab.
3. Select the check box to enable monitoring.
4. Select the Verbose mode and add all headers you want to track. These headers can belong to any request/response (frontend/backend) or you can choose different headers to log using the advanced options.

Now that Azure is all set, you can [Deploy the agents using Axway Central CLI](/docs/connect_manage_environ/connect_azure_gateway/deploy-your-agents-with-amplify-cli) to discover and monitor Azure APIs.

## Related topics

See the following topics for related information.
