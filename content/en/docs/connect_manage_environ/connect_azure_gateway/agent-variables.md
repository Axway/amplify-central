---
title: Reference - Agent configuration
linkTitle: Reference - Agent configuration
draft: false
weight: 30
---
Use the following environment variables to control your Discovery and Traceability agents.

As the Discovery and Traceability agents share many parameters, it is more efficient to use environment variables and reference these parameters, instead of declaring parameters twice.

To maintain a shareable collection of environment files, you can create a `da_env_vars.env` (Discovery Agent) and `ta_env_vars.env` (Traceability Agent) file per environment, which contains simple key value pairs.  By default, agent configuration files are looking for corresponding environment variables before looking on the configuration file property.

Note that the Docker image of the agent is expecting this `da_env_vars.env` or `ta_env_vars.env` as an argument of the Docker runner `docker run --env-file <PATH>/da_env_vars.env...`

If you are either struggling with a variable value or you want to benefit from the advanced agents features (API filtering / SSL security / proxy access / logging), the following section describe all the variables the agents (Discovery / Traceability) rely on.

## Complete variable list for advance features

You can extend the previous minimum variable list with the following variables. Some are common to all agents and some are specific to an agent.

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

### Common variables to both agents

| Variable name           | Description                              |
|-------------------------|------------------------------------------|
| AZURE_CLIENTID          | The appId of the service principal.      |
| AZURE_CLIENTSECRET      | The password of the service principal.   |
| AZURE_RESOURCEGROUPNAME | The container name that holds resources. |
| AZURE_SUBSCRIPTIONID    | The Azure subscription identifier.       |
| AZURE_TENANTID          | The tenantID of the service principal.   |

{{< alert title="Note" color="primary" >}}For logging, it is recommended to set it up in the agent configuration file to keep the log separated for each agent.{{< /alert >}}

### Specific variables for Discovery Agent

| Variable name           |                                                                                                                                                                                                                                                                        |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AZURE_APIMSERVICENAME   | The container that holds the API you want the agent to discover (needed only in default mode).                                                                                                                                                                         |
| AZURE_EVENTHUBNAMESPACE | The management container for event hub in Azure (needed only in EventHub mode).                                                                                                                                                                                        |
| AZURE_MODE              | The mode in which the Discovery Agent runs. Supported values: APIM - the agent will run in default mode, discovering APIs from API Manager (default). EventHub - the agent will discover APIs from the Azure Event Hub's Namespace and Event Hub's Schema Registry.    |
| AZURE_FILTER            | Filter condition expression for discovering APIs based on tags. The conditional expression must have \"tag\" as the prefix/selector. Azure Discovery Agent supports only Exists() call expression-based conditions. For example, `tag.some_tag_name.Exists() == true`. |
| AZURE_PUSHTAGS          | When set to TRUE, the Azure API tags will be pushed to Amplify API service.                                                                                                                                                                                            |

### Discovery Agent to manage OAuth External credentials

{{< alert title="Note" color="primary" >}}OAuth (External) inbound security was made available with v1.1.73 and later.{{< /alert >}}

When discovering and publishing the virtualized APIs with OAuth (External) inbound security, the Discovery Agent can associate the registered external OAuth identity providers to the published resources on Enterprise Marketplace that allows Marketplace consumers to provision credentials to the specified OAuth identity providers. For details on how to register external OAuth identity providers, see [Provisioning OAuth credential to an identity provider](/docs/connect_manage_environ/marketplace_provisioning/#provisioning-oauth-credential-to-an-identity-provider).

When the OAuth (External) inbound security configured on the virtualized REST API uses an identity provider that does not support OAuth 2.0 dynamic client registration, the Discovery Agent will link the resource published on Enterprise Marketplace to Credential Request Definition(CRD) that will allow Marketplace consumers to specify the identifier of the OAuth client provisioned in identity provider outside the context of Discovery Agent.

### Discovery Agent to manage Entra ID ClientID and CLientSecret credentials

{{< alert title="Note" color="primary" >}}Entra ID ClientID and CLientSecret credentials was made available with v1.3.6 and later.{{< /alert >}}

When discovering and publishing the virtualized APIs that are protected using Entra ID, the Discovery Agent can associate the registered ClientID and CLientSecret to the published resources on Enterprise Marketplace that allows Marketplace consumers to provision credentials to the specified application registrations.

For setting up APIs protected using Entra ID, please refer to [Protect an API in Azure API Management using OAuth 2.0 authorization with Microsoft Entra ID](https://learn.microsoft.com/en-us/azure/api-management/api-management-howto-protect-backend-with-aad).

### Specific variables for Traceability Agent

| Variable name               | Description                                                                                                                                                                                                                                                                                                                              |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AZURE_EVENTHUBNAME          | The management container for event hub in Azure.                                                                                                                                                                                                                                                                                         |
| AZURE_EVENTHUBNAMESPACE     | The entity that provides a unique scoping container in which you create one or more event hubs.                                                                                                                                                                                                                                          |
| AZURE_EVENTHUBCONSUMERGROUP | The logical grouping of consumers that read data from the event hub. It enables multiple consuming applications to read the same streaming data in an event hub independently at their own pace with their offsets. This configuration is optional. Default consumer group is set to `$Default` internally when an event hub is created. |
| AZURE_EVENTHUBTIMEOUT       | The timeout to wait for connection to the event hub. Set to 30s, minimum value of 30s, maximum value of 300s.                                                                                                                                                                                                                            |
| AZURE_SHAREDACCESSKEYNAME   | Name of the signature or token that is appended to the URI for an Azure storage resource.                                                                                                                                                                                                                                                |
| AZURE_SHAREDACCESSKEYVALUE  | The value of the shared access key.                                                                                                                                                                                                                                                                                                      |
