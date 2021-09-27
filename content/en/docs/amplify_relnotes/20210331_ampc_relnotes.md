---
title: Amplify Central March 2021 Release Notes
linkTitle: Amplify Central March 2021
weight: 90
date: 2021-03-31
description: Amplify Central enables the user to manage their provider /
  consumer view. For more information, see the Amplify Central documentation.
---
## New features and enhancements

The following new features and enhancements are available in this update.

### Axway Central CLI

The Axway Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

Axway Central CLI version 1.0.0 is now available on NPM (<https://www.npmjs.com/package/@axway/axway-central-cli/v/1.0.0>).

The CLI extension is compatible with the Axway CLI **version 2.0** (<https://www.npmjs.com/package/axway/v/2.0.0>).

**This is also backward compatible with the Amplify CLI 1.4**.

The Amplify Central CLI includes the following enhancements:

* None

### Amplify Central WebUI

The Amplify Central WebUI is used by both the API providers and consumers to manage and consume APIs.

The Amplify Central WebUI includes the following enhancements:  

* JSON or YAML format for all APIs type (Open API / Async APIs) can be used to create API service / Catalog item.

### Axway APIM Gateway / AWS / Azure agents

To provide better visibility into your multi-type gateway eco system, two sets of agents are provided. These agents collect data from the Gateway (API / traffic) and expose it in Amplify Central, providing you with a global vision of your eco system from a single interface.

The agents include the following enhancements:

* The agents are now able to report their last activity time. Refer to lastActivityTime value when running `axway central get da {discoveryAgentName} -s {environmentName} -o yaml` or `axway central get ta {traceabilityAgentName} -s {environmentName} -o yaml`.

### Amplify Central API

A new Amplify Central Traceability API for dynamically querying traffic metrics directly is available. This API is based on the Lexus query API used in mobile analytics and can be used to retrieve raw metrics for API usage, return codes, and call graph details. It provides filtering and aggregation on any transaction attribute.

* The API requires the Central Admin role to access and is a POST at <https://{{amplify_central_url}}/api/traceability/v1/traceability/search>.
* API usage details and request examples are in a Postman collection at: <https://documenter.getpostman.com/view/2125605/TWDanGAu>.
* Transaction event details are in the Agent SDK at:
    * <https://github.com/Axway/agent-sdk/blob/main/docs/traceability/index.md#transaction-event-processing-and-event-generation>
    * Lexus query details are at: <https://github.com/appcelerator/lexus/blob/master/docs/getting-started.md>

### Mesh governance

Amplify Central mesh governance enables you to govern and manage your APIs, public and private services, along with the hybrid environments where they are located.

Mesh Governance includes the following enhancements:

* The preview Istio agents now support Istio 1.8.2 when using Kubernetes 1.18-1.20.
* The preview Istio agents now support Red Hat OpenShift 4.7 managed clusters.
* The preview Istio agent CLI installation options now provides a “Use existing Istio” option for a customer to use an existing Istio control plane already in place on their target Kubernetes environment.
* Details for these changes are documented in [Mesh management](/docs/connect_manage_environ/mesh_management/) pages.

## Fixed issues

The following issues were fixed in this version of Amplify Central:

* **As a consumer, I want to see the friendly name for my v7 application**. Previously, when subscribing to an API, the application name used the subscription technical identifier. Now, the application name is based on the subscription name provided by the user.
* **As a consumer, I want to see the friendly name for my Azure subscription**. Previously, when subscribing to an API, the Azure subscription name used the subscription technical identifier. Now, the Azure subscription name is based on the subscription name provided by the user
* **Traceability Agent logs are not stored to a log file**. Previously, when the Traceability Agent was configured to log the output to a log file, the log file was not created. Now, the Traceability Agent configuration is correctly read and produces the log file.
* **API Service is duplicated**, Previously, when running multiple Discovery Agents at the same time, it was possible that the API Service was duplicated due to issue in the agent cache management. Now, the agent cache management has been improved and no duplicates occur.
* **V7 agent fails to start if APIMANAGER_HOST is not set**. Previously, when we moved the agent type resource to generic agent resource, the APIMANAGER_HOST variable did not support localhost value. Now, localhost is accepted as any other fully qualified name.
* **Incorrect URL for Traceability Agent running in EU organization**. Previously, the Istio agent override file was not correct for an EU organization. Now, the Istio agent CLI hybrid agent override file correctly generates the Visibility URLs used by the Traceability Agent for an EU region organization.
* **Amplify Central WebUI Observer traffic display is incomplete**. Previously, API Observer would not display all transaction spans for certain multi-span transactions from connected gateway Traceability Agents. Now, the display logic decoding related spans is improved and a warning message is added when missing or incomplete transaction spans are detected.

## Known limitations

This version of Amplify Central has the following limitations:

* API Observer:

    * Users that are assigned the Consumer role cannot see their subscription usage on the API Observer screen.

* Axway APIM Gateway agents:

    * Discovery Agent only discovers APIs having PassThrough, API Key and Oauth security.
    * Discovery Agent cannot expose discovered APIs in multiple teams, so the organization structure on API Manager is lost in Amplify Central. As a result, the API provider must create the team in Amplify platform and share the API within appropriate teams.
    * When an API is renamed on the API Manager, the Discovery Agent is not able to recognize the API name change. This results in the API displaying in Amplify Central with dual entries of both the originally discovered name and the newly changed name.
    * Traceability Agent is not working in an externally managed topology deployment.

* AWS Gateway agents:

    * Discovery Agent is working with only one AWS Region (the one used when installing the agent).
    * Discovery Agent can discover APIs having ANY method only, but consumers will not be able to subscribe to it from Unified Catalog.
    * Discovery Agent does not associate the usage plan and API when a subscriber chooses a usage plan that is not already linked to the chosen API.

* Azure agents:

    * Discovery Agent does not manage revision and version.
