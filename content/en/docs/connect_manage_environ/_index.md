---
title: Connect and manage your environment
linkTitle: Connect and manage your environment
weight: 350
date: 2020-11-18
description: Understand environments in a topology, what they are, and what can
  you do with them.
---

Within topology, environments represent a group of assets discovered from a gateway, a repository, or anything manually added to the environment. These grouped assets (API services, webhooks, secrets) are displayed in Amplify Central. Environments are at the highest hierarchical level, and all assets are scoped within.

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

Using agents is the recommended way to add API services to your environment. When a Discovery Agent is installed on your gateway, the agent will automatically discover API service assets and add them to your environment in Amplify Central. The Traceability Agent will send API traffic logs from your gateway to Amplify Central, where you can then view and analyze the logs.

{{< alert title="Note" color="primary" >}}You will be notified at the startup of the agent if your agent is outdated: New version available. Please consider upgrading from version *(running version)* to version *(latest version)*.{{< /alert >}}

For more information about the agents, see:

* [Discovery and Traceability Agents for Axway API Manager](/docs/connect_manage_environ/connect_api_manager/).
* [Discovery and Traceability Agents for AWS API Gateway](/docs/connect_aws_gateway/).
* [Discovery and Traceability Agents for Azure API Management Services](/docs/connect_azure_gateway/).
* [Discovery and Traceability Agents for Istio Gateway](/docs/mesh_management/).

To manually synchronize your environment, you can use the [Axway Central CLI](/docs/integrate_with_central/cli_central/cli_apiservices) or the [Amplify Central APIs](https://apicentral.axway.com/apis/docs). Note that changes in your deployment will not be automatically synchronized with Amplify Central.

## Asset definitions

This section describes the assets that are represented in your environment.

### API Services

An API service represents a physical deployment of a resource in an environment. Examples of API services include API, MFT, Protobuf, documentation, and so on. You can manually add API services to your environment or they can be discovered and auto-added by Axway agents. Later, these API services can be combined and packaged together to create catalog items for your consumers to access.

#### Versions

API Services have a specification based on type (OAS2, OAS3, WSDL, Protobuf, etc). Whenever this specification changes a new version must be created. This helps account for different stages in the lifecycle of the API service. Each version has a direct dependency on its associated API services and can be individually configured for differing consumer access needs.

#### Endpoints

An endpoint is a URL that represents the deployment of an API service. There can be one or many endpoints to access a deployed API service version. An endpoint includes a name and description to make it easier for others to consume later. They also contain the host and port information used to access the API service and have a hard dependency on the API service version it is associated with.

### Webhooks

Webhook assets are used for enabling subscription flows when a catalog user wants to subscribe to your API service. Webhooks are scoped to the environment level, which makes them reusable with other assets within the environment.

### Secrets

Secrets are a special kind of asset used with webhooks for securing subscription flows.
