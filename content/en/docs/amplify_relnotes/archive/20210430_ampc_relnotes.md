---
title: Amplify Central April 2021 Release Notes
linkTitle: Amplify Central April 2021
weight: 90
date: 2021-04-23
description: Amplify Central enables the user to manage their provider /
  consumer view. For more information, see the Amplify Central documentation.
---
## New features and enhancements

The following new features and enhancements are available in this update.

### Axway Central CLI

The Axway Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

Axway Central CLI version 1.9.0 is now available on NPM (<https://www.npmjs.com/package/@axway/axway-central-cli/v/1.9.0>).

The CLI extension is compatible with the Axway CLI **version 2.0** (<https://www.npmjs.com/package/axway/v/2.0.0>).

**This is also backward compatible with the Amplify CLI 1.4**.

The Axway Central CLI includes the following enhancements:

* When installing the agents, you can now select the name of your agent you want to appear in the Topology view.
* Environment and API Services can now be segmented by team. As soon as ownership is assigned to a team, only members of the team can manage the environment and the API Service attached to it. Refer to [Assign an environment owner](/docs/connect_manage_environ//manage_environments_ownership).

### Amplify Central WebUI

The Amplify Central WebUI is used by both the API providers and consumers to manage and consume APIs.

The Amplify Central WebUI includes the following enhancements:  

* Environment Status is now based on the Discovery Agent and Traceability Agent statuses of Connected, Not Connected and Partially Connected. Refer to [Agent status environment](/docs/connect_manage_environ//view_environments#agent-environment-status).
* Environment details page now displays the date and time activity that was last reported between the Discovery and Traceability agents and Amplify Central under Service synchronization.
* Refresh buttons have been added to both the Environment details and the Service details pages.
* The tags and attributes from the service and version levels have been added to the Service details page.
* The option to use markdown formatting for Environment and API Service descriptions is now available. This also includes the ability to show performance metrics and linter results badges by using shield.io badges.

### Axway APIM Gateway / AWS / Azure agents

To provide better visibility into your multi-type gateway eco system, two sets of agents are provided. These agents collect data from the Gateway (API / traffic) and expose it in Amplify Central, providing you with a global vision of your eco system from a single interface.

The agents include the following enhancements:

* Traceability Agent redaction. The redaction feature can be applied at the agent level. By default, the redaction feature is on. This means that no path/headers or query parameters are sent to Amplify Central, and only the transaction summary information is sent. For more information, refer to [Trace redaction](/docs/connect_manage_environ/connected_agent_common_reference/trace_redaction).
* v7 Discovery Agent can now publish Catalog items even if their inbound security is not managed in Amplify. The status badge of the Catalog item will contain an **Unidentified inbound policy** that will be highlighted in orange.
* API Manager CLI integration (aka Swagger-Promote): in order to work in a CI/CD process, the v7 Discovery Agent is now relying on the vhost / path and routing key to uniquely identify an API.
* Azure Discovery Agent can now read the tags associated to an Azure API and then add those tags to the published API Service and Catalog item.
* AWS agents now use the AWS SDK 2.0 to communicate with AWS services.

### Mesh Governance / Istio agent

Amplify Central mesh governance enables you to govern and manage your APIs, public and private services, along with the hybrid environments where they are located.

Mesh Governance includes the following enhancements:

* none

## Fixed issues

The following issues are fixed in this version of Amplify Central:

* **Unsubscribing to an API does not remove the corresponding credentials on the data plane**. Previously, when a consumer unsubscribed to an API, his associated credentials (API Key / OAuth client) where not removed from the corresponding dataplane. Now, every Discovery Agent (v7 / AWS / Azure) can remove the credentials associated with the subscription.
* **As a consumer, I want to see the friendly name for my AWS Usage plan**. Previously, when subscribing to an API, the AWS Usage plan name used the subscription technical identifier. Now, the AWS Usage plan name is based on the subscription name provided by the user.
* **Azure agents are not able to reconnect after Amplify token expiration**. Previously, when the token expired, Azure agents could not request a new token to continue their duty. Now, the token expiration is managed correctly and the agent stays up and running.
* **Base path is not displayed in service endpoint**. Previously, when displaying the service endpoint in the Service details page, only the service url was visible. Now, the full endpoint ("protocol://host:port/basepath") is visible.
* **API Observer is not always showing the correct number of spans**. Previously, when multiple spans coming from various services were involved in the transaction, some of them were duplicated. Now, the API Observer displays the correct number of spans associated to the transaction.

## Known limitations

This version of Amplify Central has the following limitations:

* API Observer:

    * Users that are assigned the Consumer role cannot see their subscription usage on the API Observer screen.

* Axway APIM Gateway agents:

    * When starting the agent, if the API Gateway and/or API Manager is not ready, the Discovery and Traceability agents will stop. When using Linux service mode, it is possible that the agent fails to start because API Manager/Gateway are not started yet. This can lead to a bad status display in the corresponding environment in Central UI > Topology.
    * Discovery Agent cannot expose discovered APIs in multiple teams, so the organization structure on API Manager is lost in Amplify Central. As a result, the API provider must create the team in Amplify platform and share the API within the appropriate teams.
    * When an API is renamed on the API Manager, the Discovery Agent is not able to recognize the API name change. This results in the API displaying in Amplify Central with dual entries of both the originally discovered name and the newly changed name.
    * Traceability Agent is working in an externally managed topology deployment only if you deactivate the headers details (`APIGATEWAY_GETHEADERS=false`).

* AWS Gateway agents:

    * Discovery Agent is working with only one AWS Region (the one used when installing the agent).
    * Discovery Agent can discover APIs having ANY method only, but consumers will not be able to subscribe to it from Unified Catalog.
    * Discovery Agent does not associate the usage plan and API when a subscriber chooses a usage plan that is not already linked to the chosen API.

* Azure agents:

    * Discovery Agent does not manage revision and version.
    * Discovery agent does not remove API Service and Catalog item when Azure API is removed.
