---
title: Amplify Central May 2021 Release Notes
linkTitle: Amplify Central May 2021
weight: 90
date: 2021-05-17
description: Amplify Central enables the user to manage their provider /
  consumer view. For more information, see the Amplify Central documentation.
---
## New features and enhancements

The following new features and enhancements are available in this update.

### Axway Central CLI

The Axway Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

Axway Central CLI version 1.10.0 is now available on NPM (<https://www.npmjs.com/package/@axway/axway-central-cli/v/1.10.0>).

The CLI extension is compatible with the Axway CLI **version 2.1** (<https://www.npmjs.com/package/axway/v/2.1.0>).

**This is also backward compatible with the Amplify CLI 1.4**.

The Axway Central CLI includes the following enhancements: None.

### Amplify Central WebUI

The Amplify Central WebUI is used by both the API providers and consumers to manage and consume APIs.

The Amplify Central WebUI includes the following enhancements:  

* The Developer role has access to the environment (read-only) and API services (create/read/update/delete), and can:
    * View environments that are owned by the teams of which they are a member.
    * View the services that are registered in the environment by their team members.
    * Register services in an environment that is owned by their team.
* The Central Administrator can edit the environment details and update the image, title, tags and attributes.

### Axway APIM Gateway / AWS / Azure agents

To provide better visibility into your multi-type gateway eco system, two sets of agents are provided. These agents collect data from the Gateway (API / traffic) and expose it in Amplify Central, providing you with a global vision of your eco system from a single interface.

The agents include the following enhancements:

* **Transaction sampling**: Traceability agent can now sample the transactions they are sending to Amplify platform. The sampling can be done globally across all APIs (`TRACEABILITY_SAMPLING_PER_API=false`) or per API (`TRACEABILITY_SAMPLING_PER_API=true`). The variable `TRACEABILITY_SAMPLING_PERCENTAGE` is used to select which transaction percentage should be sent. By default, all transactions are sent to Amplify platform. The transactions in error are always sent to the platform, but can can be deactivated by using `TRACEABILITY_REPORTALLERRORS=false` variable. If you deactivate the error reporting, then the transaction in error will be considered in the sampling mechanism. Refer to [Trace sampling](/docs/connect_manage_environ/connected_agent_common_reference/trace_sampling).
* **Usage report**: Traceability agent can now track the API usage and report it to Amplify platform. The usage is visible in **Platform UI > Organization > Usage**. Refer to [Traceability usage](/docs/connect_manage_environ/connected_agent_common_reference/traceability_usage).
* **Transaction redaction**: The masking characters can now be changed with the environment variable `TRACEABILITY_REDACTION_MASKING_CHARACTERS`. Acceptable characters are alphanumeric, between 1-5 characters, and can contain: '-' (hyphen), '*' (star), '#' (sharp), '^' (caret), '~' (tilde), '.' (dot), '{' (open curly bracket), and '}' (closing curly bracket). Default value is `{*}`.
* The subscription application drop-down list includes all Axway Gateway applications that have access to the API that matches the selected catalog asset.
* The Discovery and Traceability agents have a new property `CENTRAL_REPORTACTIVITYFREQUENCY` that is used to select the frequency to report their statuses to Amplify platform. Default value is `5min`.

### Mesh Governance / Istio agent

Amplify Central mesh governance enables you to govern and manage your APIs, public and private services, along with the hybrid environments where they are located.

Mesh Governance includes the following enhancements: None.

## Fixed issues

The following issues are fixed in this version of Amplify Central:

* **Could not import large API specification file (5000 Methods) when creating an API from the UI in the topology screen**. Previously, when trying to import large specification files, Central WebUI did not answer. Now, the API Service can be created correctly.
* **Azure Discovery Agent adds (Azure) to the service name**. Previously, when an API was discovered by Azure Discovery Agent, "(Azure)" was added to the Catalog item. Now, only the environment name is added to the Catalog item.
* **Agents terminate if API Manager system is unreachable on startup**. Previously, when starting the v7 agents in service mode, if the API Gateway and/or API Manager was not ready, the Discovery and Traceability agents stopped. Now, the service mode has a retry mechanism that tries the startup again as soon as the API Manager system is available. To activate, update the existing Linux service by running the following command: `sudo ./discovery_agent service update -u axway -g axway --envFile /path/to/da_env_file.env` or `sudo ./traceability_agent service update -u axway -g axway --envFile /path/to/ta_env_file.env`. This will remove the existing service and re-create the service with the appropriate parameters.
* **Discovery agent does not remove API Service when API is removed in Axway API Manager**. Previously, when an API was deleted in Axway API Manager, the Catalog item was removed but the API service was not. Now, both the Catalog item and API service are removed.
* **Azure trace is not pushed to Condor: "empty url"**. Previously, when an authentication error occurred on Azure Gateway (401 HTTP code), the Azure Traceability Agent failed to correctly catch the error and displayed "empty url" in logs. Now, the error is correctly handled and the transaction is visible in API Observer.
* **Prevent running multiple instances of an agent on the same machine**. Previously, it was possible to start a v7 binary agent several times on the same machine, which led to bad agent behavior. Now, using the agent healthcheck, only one instance of a v7 agent can be started on the same machine.
* **Installing Traceability Agent only for v7 asks you for disco agent name**. Previously, when installing v7 Traceability Agent alone, CLI prompted for a Discovery Agent name. Now, you are only prompted for the Traceability Agent name.

## Known limitations

This version of Amplify Central has the following limitations:

* API Observer:

    * Users that are assigned the Consumer role cannot see their subscription usage on the API Observer screen.

* Axway APIM Gateway agents:

    * Discovery Agent cannot expose discovered APIs in multiple teams, so the organization structure on API Manager is lost in Amplify Central. As a result, the API provider must create the team in Amplify platform and share the API within the appropriate teams.
    * When an API is renamed in API Manager, the Discovery Agent is not able to recognize the API name change. This results in the API displaying in Amplify Central with dual entries of both the originally discovered name and the newly changed name.
    * Traceability Agent is working in an Externally Managed Topology (EMT) deployment but it is not able to report the transaction request/response headers, as the APIs that collect them are not accessible in EMT mode.

* AWS Gateway agents:

    * Discovery Agent is working with only one AWS Region (the one used when installing the agent).
    * Discovery Agent can discover APIs having ANY method only, but consumers will not be able to subscribe to it from Unified Catalog.
    * Discovery Agent does not associate the usage plan and API when a subscriber chooses a usage plan that is not already linked to the chosen API.
    * The Usage report is not scalable, as the agent relies on AWS Simple Queue Service and cannot have more than 10 consumers per queue. It is possible to increase the number of workers on the agent side.

* Azure agents:

    * Discovery Agent does not manage revision and version.
    * Discovery agent does not remove API Service and Catalog item when Azure API is removed.
