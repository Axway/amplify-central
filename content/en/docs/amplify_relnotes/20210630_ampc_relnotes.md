---
title: Amplify Central June 2021 Release Notes
linkTitle: Amplify Central June 2021
weight: 90
date: 2021-06-21
description: Amplify Central enables the user to manage their provider /
  consumer view. For more information, see the Amplify Central documentation.
---
## New features and enhancements

The following new features and enhancements are available in this update.

### Axway CLI / Axway Central CLI

The Axway Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

Axway Central CLI version 1.16.0 is now available on NPM (<https://www.npmjs.com/package/@axway/axway-central-cli/v/1.16.0>).

The CLI extension is compatible with the Axway CLI **version 2.1** (<https://www.npmjs.com/package/axway/v/2.1.0>).

The Axway CLI includes the following enhancements:

* New commands to manage organization, users and teams: `axway org <subCommand>`, `axway user <subCommand>` and `axway teams <subCommand>`. See [Axway CLI](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/organization__user_management_oum/index.html) for details.

The Axway Central CLI includes the following enhancements:

* New command `axway central create agent-resources` will help you to visualize the Agent Status in Central WebUI. See [Create agent resource](/docs/connect_manage_environ//environment_agent_resources#step-3-create-the-agent-resources) for details.

### Amplify Central WebUI

The Amplify Central WebUI is used by both the API providers and consumers to manage and consume APIs.

The Amplify Central WebUI includes the following enhancements:  

* **Dependency Analysis**: The Dependency Analysis view displays details about the relationships to the selected API Service version. The relationship details enable the API provider to make informed decisions and take actions on any of the dependencies. See [Dependency Analysis](/docs/connect_manage_environ//view-dependency-analysis) for details.

### Axway APIM Gateway / AWS / Azure agents

To provide better visibility into your multi-type gateway eco system, two sets of agents are provided. These agents collect data from the Gateway (API / traffic) and expose it in Amplify Central, providing you with a global vision of your eco system from a single interface.

The agents include the following enhancements:

* **Usage report**:
    * When Traceability Agent is stopping, the usage report that has not been sent is store on the file system. When the agent restarts, the stored report is processed and sent to Amplify Platform.
    * If the usage report cannot be sent to Amplify Platform, the data are kept until the next interval and then integrated into the next submission.
    * Reporting interval is now set to 15 minutes. This can be changes using `CENTRAL_EVENTAGGREGATIONINTERVAL` variables in ta_env_vars.env file.
    * For Azure Traceability Agent, the usage report is no longer based on Azure transactions but on Azure metrics to ensure better accuracy.
* **API Service revision title**: This new variable `CENTRAL_APISERVICEREVISIONPATTERN` is used to define the pattern for each time the Discovery Agent publishes a new revision of an API Service. By default, its value is `{{APIServiceName}} - {{date:YYYY/MM/DD}} - r {{revision}}`. APIServiceName, YYYY/MM/DD and revision will be set by the agent.
* **Unhealthy status**: A new status is available for the agent to report when a connectivity issue occurs while the agent is running. This unhealthy status does not prevent the agent from continuing to work. The agent will attempt to recover on regular intervals. The status is visible in the Central UI > Topology. If an unhealthy status is raised, the environment status linked to the agent will become "Partially connected."
* **Open traffic**: The v7 Traceability Agent can now source either the APIM event log or the APIM open logs. New variables have been introduced to select one input or the other: `EVENT_LOG_INPUT=true` (default) and `OPENTRAFFIC_LOG_INPUT=false` (default). `OPENTRAFFIC_LOG_PATHS` variable will contain the path and file name where the open traffic is written on the file system. See [Customizing beat input variables](/docs/connect-api-manager/gateway-administation/#customizing-traceability-agent-beat-input-variables) for details.

### Mesh governance / Istio agent

Amplify Central mesh governance enables you to govern and manage your APIs, public and private services, along with the hybrid environments where they are located.

Mesh governance includes the following enhancements: None

## Fixed issues

The following issues are fixed in this version of Amplify Central:

* **Wrong API Service count on the service page list**. Previously, API Service count per page was not correct. It now correctly displays 1-x of number of totals API Services.
* **A provider cannot remove tags from an API Service**. The developer / administrator can remove tags from the API Service in the WebUI.
* **A page error is displayed when adding the first API Service to an environment in the WebUI**. Previously, it was not possible to add an API Service when no service was present in the environment. Now, API Services can be added any time.
* **Traceability Agent working in an Externally Managed Topology (EMT) deployment cannot report the transaction request/response headers**. Previously, when Traceability Agent was connected to APIM in EMT mode, the agent could not populate request/response headers in the reported traffic. Now, Traceability Agent can connect to the open traffic logging and the request/response headers will be reported.

## Known limitations

This version of Amplify Central has the following limitations:

* API Observer:

    * Users that are assigned the Consumer role cannot see their subscription usage on the API Observer screen.

* Axway APIM Gateway agents:

    * Discovery Agent cannot expose discovered APIs in multiple teams, so the organization structure on API Manager is lost in Amplify Central. As a result, the API provider must create the team in Amplify Platform and share the API within the appropriate teams.
    * When an API is renamed in API Manager, Discovery Agent cannot recognize the API name change. This results in the API displaying in Amplify Central with dual entries of both the originally discovered name and the newly changed name.
    * When using the Gateway only capability without API Manager, Traceability Agent does not report the traffic.

* AWS Gateway agents:

    * Discovery Agent is working with only one AWS Region (the one used when installing the agent).
    * Discovery Agent can discover APIs having ANY method only, but consumers will not be able to subscribe to it from Unified Catalog.
    * Discovery Agent does not associate the usage plan and API when a subscriber chooses a usage plan that is not already linked to the chosen API.
    * The Usage report is not scalable, as the agent relies on AWS Simple Queue Service and cannot have more than 10 consumers per queue. It is possible to increase the number of workers on the agent side.

* Azure agents:

    * Discovery Agent does not manage revision and version.
    * Discovery Agent does not remove API Service and Catalog item when Azure API is removed.
