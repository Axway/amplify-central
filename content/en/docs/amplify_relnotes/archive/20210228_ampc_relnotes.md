---
title: Amplify Central February 2021 Release Notes
linkTitle: Amplify Central February 2021
weight: 90
date: 2021-02-28
description: Amplify Central enables the user to manage their provider /
  consumer view. For more information, see the Amplify Central documentation.
---
## New features and enhancements

The following new features and enhancements are available in this update.

### Amplify Central CLI

The Amplify Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

Amplify Central CLI version 0.12.0 is now available on NPM (<https://www.npmjs.com/package/@axway/amplify-central-cli/v/0.12.0>).

The CLI extension is compatible **only** with the Amplify CLI **version 1.4** (<https://www.npmjs.com/package/@axway/amplify-cli/v/1.4.0>).

**This is not yet compatible with the Axway CLI**.

The Amplify Central CLI includes the following enhancements:

* Download the Azure agents from the public artifactory.

### Amplify Central WebUI

The Amplify Central WebUI is used by both the API providers and consumers to manage and consume APIs.

The Amplify Central WebUI includes the following enhancements:  

* Providers can publish an API Service to the Unified Catalog after API Service registration.
* Providers can register an AsyncAPI under an environment in Amplify Central and publish it up to the Unified Catalog for consumption.
* Amplify Central WebUI can now be accessed using static IP address:
    * apicentral.axway.com (US region): 3.94.245.118 / 54.208.199.251 / 3.212.78.217 / 52.202.95.208 / 107.23.176.64 / 3.225.16.120.
    * central.eu-fr.axway.com (EU region): 52.47.84.198 / 13.36.25.69 / 35.181.21.87 / 13.36.2.143 / 13.36.52.216 / 15.236.7.112.

### Axway Edge Gateway / AWS / Azure agents

To provide better visibility into your multi-type gateway eco system, two sets of agents are provided. These agents collect data from the Gateway (API / traffic) and expose it in Amplify Central, providing you with a global vision of your eco system from a single interface.

The agents include the following enhancements:

* Azure Traceability Agent reports subscription usage (Refer to API Observer / App usage).
* Azure Traceability Agent reports APIs usage for only discovered APIs.
* Azure Agent is publicly available.
* New "try it" gateways connectivity: Apigee (<https://github.com/Axway/agents-apigee>), Kong (<https://github.com/Axway/agents-kong>), Mulesoft (<https://github.com/Axway/agents-mulesoft>) and WSO2 (<https://github.com/Axway/agents-wso2>).

### Mesh governance

Amplify Central mesh governance enables you to govern and manage your APIs, public and private services, along with the hybrid environments where they are located.

Mesh governance includes the following enhancements:

* Amplify CLI updates (version 0.10 and later) now provision the CLI resources needed for Istio agent Kubernetes discovery and promotion to a selected environment in Amplify Central.
* The alpha Istio Discovery Agent usage and configuration changes to associate target promotion **Environment** with a **K8SCluster** and with a new **Mesh** scoped resource. They are documented here: [Discover APIs and services](/docs/connect_manage_environ/mesh_management/discover-apis-and-services/).
* The Istio Traceability Agent has been updated to provide two HTTP request/response header logging verbosity modes. The logging mode may be set via the Amplify CLI or by changing the generated Istio and apicHybrid override files used to update Istio and install the Istio agents, respectively.
    * Default - only the HTTP headers needed for minimal transaction details of the source, destination and transaction span linkage are published.
    * Verbose - all HTTP request/response headers are published.
* Note: The Istio Traceability Agent header sanitization rules for filtering and redaction may still be applied to further limit the headers that appear in the API Observer.
* The alpha Istio Discovery and Traceability Agent installation changes are documented here: [Deploy your agents with Amplify CLI](/docs/connect_manage_environ/mesh_management/deploy-your-agents-with-the-axway-cli/).

## Fixed issues

The following issues were fixed in this version of Amplify Central:

* **The image import/crop feature for environments, API services, and catalog items is not a blocking action**. Previously, when editing an image, it was possible to click the action button even if your edition was not complete. Now, the editing action disables the action button until a selection is made.
* **API Service creator detail link is broken for service account**. Previously, it was impossible to see the information of who created/updated an API Service details when a service account was used. Now, the service details page hyperlink navigates to the list of Service Accounts for the Central Admin only.
* **The Central CLI instructions after an agent installation are not clear**. Previously, the instructions informed user to copy public and private keys even when reusing an existing service account. Now, the instructions are clearer and inform the user to not forget to copy existing keys along with the generated files.
* **Consumer is unable to consume v7 discovered APIs from Amplify Central WebUI**. Previously, V7 Discovery Agent created an application without cors enabled. Now, the Discovery Agent creates the application with '*' in javascript origin which allows the API to be consumed from any location.
* **V7 Traceability Agent Linux service mode broken**. Previously, the traceability service mode was broken. The service mode has been restored and the Traceability Agent service can now be installed, started and stopped.
* **Fixed IP addresses**. Previously, to access Amplify platform or Central, IP addresses were dynamic. Static IP addresses have been assigned to now help with setting up the firewall rules. More information can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/index.html#communication-ports).

## Known limitations

This version of Amplify Central has the following limitations:

* API Observer:

    * Users that are assigned the Consumer role cannot see their subscription usage on the API Observer screen.  

* Axway Edge Gateway agents:

    * Discovery Agent only discovers APIs having PassThrough, API Key and Oauth security.
    * Discovery Agent cannot expose discovered APIs in multiple teams, so the organization structure on API Manager is lost in Amplify Central. As a result, the API provider must create the team in Amplify platform and share the API within appropriate teams.
    * When an API is renamed on the API Manager, the Discovery Agent is not able to recognize the API name change. This results in the API displaying in Amplify Central with dual entries of both the originally discovered name and the newly changed name.
    * Traceability Agent is not working in an externally managed topology deployment.

* AWS Gateway agents:

    * Discovery Agent is working with only one AWS Region (the one used when installing the agent).
    * Discovery Agent can discover APIs having ANY method only, but consumer will not be able to subscribe to it from Unified Catalog.
    * Discovery Agent does not associate the usage plan and API when a subscriber chooses a usage plan that is not already linked to the chosen API.

* Azure agents:

    * Discovery Agent does not manage revision and version.
