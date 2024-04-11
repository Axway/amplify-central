---
title: Connect and manage your environment
linkTitle: Connect and manage your environment
weight: 350
date: 2020-11-18
---
Within topology, environments represent a group of assets discovered from a gateway, a repository, or anything manually added to the environment. These grouped assets (API services, webhooks, secrets) are displayed in Amplify. Environments are at the highest hierarchical level, and all assets are scoped within.

The following is an example of a simple environment with an API service asset:

```txt
* Environment
    * API service
        * Versions
            * Endpoints
    * Webhooks
    * Secrets
```

The API services, webhooks, and secrets in the example all have a hard dependency to the environment. If the environment is deleted all assets within the environment will also be deleted. The same hard dependency applies to all child assets.

Another example is, if a version within the API service is deleted, its endpoint will also be deleted, but not the API service.

The relationship between API service assets, webhooks, and secrets is a soft dependency. If a webhook is deleted, neither of the other two will be affected. However, this may break integrations where the webhook was being used, for example, in a catalog item.

You can combine assets within an environment to create catalog items that consumers can then subscribe to and use.

## Synchronize your environment with a gateway

Using agents is the recommended way to add API services to your environment. When a Discovery Agent is installed on your gateway, the agent will automatically discover API service assets and add them to your environment in Amplify. The Traceability Agent will send API traffic logs from your gateway to Amplify, where you can then view and analyze the logs.

{{< alert title="Note" color="primary" >}}You will be notified at the startup of the agent if your agent is outdated: New version available. Please consider upgrading from version *(running version)* to version *(latest version)*.{{< /alert >}}

### On-premise Agent Features

| Description |  Axway API Gateway | AWS | Azure | Istio | Apigee Edge |
|-------------|--------------------|-----|-------|-------|-------------|
| **Discovery** | Published Frontend Proxies | Rest APIs in API Gateway | APIs | Virtual Services | API Products / Proxies |
| **Application** | Client App | Usage plan | Product | N/A | Application |
| **Access Request** | Associated Frontend Proxy with Application | Associated API Stage with Usage plan | Associated API with Product | N/A | Products associated to Application |
| **Credential Type** | APIKey / OAuth / BasicAuth / IDP | APIKey | APIKey | IDP | APIKey / OAuth |
| **Credential Actions** | APIKey - Suspend/Enable <br />OAuth - Suspend/Enable/Rotate <br />IDP - Suspend/Enable <br />BasicAuth - Suspend/Enable | Suspend/Enable | Suspend/Enable | Not implemented yet | Suspend/Enable |
| **Quota Enforcement** | Quota per Frontend Proxy set in Client App | Quotas are attached to a Usage plan | Quota Policy associated to Product | Envoy Filters | Quota added to a Product, underlying proxy must enforce Quota |
| **Traceability** | Transactions with application content associated to Managed Applications | Transactions with API Key associated with Usage plan | Transactions with Azure Product subscriptions associated to Credential | Not Implemented | API Usage Statistics |
| **Platform Usage** | Yes | Yes | Yes | Yes | Yes |
| **Transaction Metrics** | Yes | Yes | Yes | No | Yes |
| **Transaction Event Sampling** | Yes | Yes | Yes | No | No |
| **Limitations** |  |  |  |  |  |

| Description |  Mulesoft* | Software AG webMethods* | Kong Gateway* | Gitlab | Kafka Cluster |
|-------------|-----------|------------------------|--------------|--------|---------------|
| **Discovery** | Rest APIs (+RAML) | Published Frontend Proxies | Services and attached Routes | Pulib/Private Rest APIs | Topics |
| **Application** | Associated Client App with Contract | Not Implemented | Consumer | N/A | Create Product |
| **Access Request** | Associated Frontend Proxy with Application | Not Implemented | If ACL plugin is required to give consumer access to Route | N/A | TBD |
| **Credential Type** | OAuth Client ID and Secret |  Not Implemented yet | APIKey, Basic Auth, OAuth added to Consumer | N/A | APIKey |
| **Credential Actions** |  Suspend/Enable |  Not Implemented yet| Suspend/Enable | N/A |Suspend/Enable |
| **Quota Enforcement** | TBD | Not Implemented yet | Rate limiting plubin added to Consumer | N/A | Quota Policy associated to Product |
| **Traceability** | Not implemented yet | Not Implmented yet | Using the Kong HTTP log plugin | N/A | TBD |
| **Platform Usage** | Yes  | Not Implemented yet | Yes |  N/A | Yes |
| **Transaction Metrics** | No  | Not Implmented yet | Yes | N/A | Yes |
| **Transaction Event Sampling** | No | Not Implemented yet | Yes | N/A | N/A |
| **Limitations** |  |  |  |  |  |

### SaaS (Embedded) Agent Features

| Description |  AWS | Apigee X | Github |
|-------------|-----|-------|-------------------|
| **Discovery** | Rest APIs | Published Frontend Proxies | Public/Private Rest APIs |
| **Application** | Associated Client App with Contract | Client App | N/A |
| **Access Request** | Associated Frontend Proxy with Application | Associated API Stage with Usage plan | N/A |
| **Credential Type** | APIKey | APIKey / OAuth | N/A |
| **Credential Actions** | Suspend/Enable | Suspend/Enable | N/A |
| **Quota Enforcement** | Quotas are attached to a Usage plan | Quota Policy associated to Product | N/A |
| **Traceability** | Not implemented yet | Transactions with application content associated to Managed Applications | N/A |
| **Platform Usage** | No  | Yes | N/A |
| **Transaction Metrics** | No  | Yes | N/A |
| **Transaction Event Sampling** | No | No | N/A |
| **Limitations** |  | No Discovery of APIs via API Hub |  |

For more deatiled information about the agents configuration, features and limitations, see:

* [Discovery and Traceability Agents for Axway API Manager](/docs/connect_manage_environ/connect_api_manager/).
* [Discovery and Traceability Agents for GCP Apigee X](/docs/connect_manage_environ/connect_apigee_x/).
* [Discovery and Traceability Agents for AWS API Gateway](/docs/connect_manage_environ/connect_aws_gateway/).
* [Discovery and Traceability Agents for Azure API Management Services](/docs/connect_manage_environ/connect_azure_gateway/).
* [Discovery and Traceability Agents for Istio Gateway](/docs/connect_manage_environ/mesh_management/).
* [Discovery and Traceability Agents for Mulesoft Gateway](https://github.com/Axway/agents-mulesoft).
* [Discovery and Traceability Agents for Software AG Webmethods](https://github.com/Axway/agents-webmethods).
* [Discovery and Traceability Agents for Kong Gateway](https://github.com/Axway/agents-kong).
* [Discovery Agents for GitHub Repository](/docs/connect_manage_environ/connect_github_repository/).
* [Discovery Agents for GitLab Repository](/docs/connect_manage_environ/connect_gitlab_repository/).
* [Discovery Agents for Kafka Cluster](/docs/connect_manage_environ/connect_kafka_cluster/).

To manually synchronize your environment, you can use the [Axway Central CLI](/docs/integrate_with_central/cli_central/cli_environments) or the [Amplify APIs](https://apicentral.axway.com/apis/docs). Note that changes in your deployment will not be automatically synchronized with Amplify.

## Asset definitions

This section describes the assets that are represented in your environment.

### API services

An API service represents a physical deployment of a resource in an environment. Examples of API services include API, MFT, Protobuf, documentation, and so on. You can manually add API services to your environment or they can be discovered and auto-added by Axway agents. Later, these API services can be combined and packaged together to create catalog items for your consumers to access.

#### Versions

API Services have a specification based on type (OAS2, OAS3, WSDL, Protobuf, etc). Whenever this specification changes, a version must be created. This helps account for different stages in the lifecycle of the API service. Each version has a direct dependency on its associated API services and can be individually configured for differing consumer access needs.

#### Endpoints

An endpoint is a URL that represents the deployment of an API service. There can be one or many endpoints to access a deployed API service version. An endpoint includes a name and description to make it easier for others to consume later. They also contain the host and port information used to access the API service and have a hard dependency on the API service version it is associated with.

### Webhooks

Webhook assets are used for enabling subscription flows when a catalog user wants to subscribe to your API service. Webhooks are scoped to the environment level, which makes them reusable with other assets within the environment.

### Secrets

Secrets are a special kind of asset used with webhooks for securing subscription flows.

## Related topics

See the following topics for related information.
