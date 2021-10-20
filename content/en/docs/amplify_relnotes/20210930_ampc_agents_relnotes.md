---
title: Amplify agents September 2021 Release Notes
linkTitle: Amplify agents September 2021
weight: 90
date: 2021-09-30
description: Traceability and Discovery agents for Amplify Gateway / AWS / Azure
  / Istio provide better visibility into your multi-type gateway eco system.
  These agents collect data from the Gateway (API / traffic) and expose it in
  Amplify Central, providing you with a global vision of your eco system from a
  single interface.
---

## Versioning

Currently, version 1.1.4 is available. It is based on Amplify Agents SDK v1.1.7.
To display version information in the agents, use command `agentName --version`.

This version is compatible with:

* Axway API Management 7.6.2 SPx and 7.7 SPx
* AWS Gateway using SDK 2.0
* Azure latest release

## New features and enhancements

The following new features and enhancements are available in this update.

### Amplify Gateway agents enhancements

* **Categorization of your API**: To facilitate the API search in the Unified Catalog using the API grouping per category, the Discovery Agent has been enhanced to take advantage of the tagging done in the API Manager. The configuration of the agent allows mapping a tag from API Manager to one or multiple categories in Unified Catalog. If a category does not exist, the agent can be configured to automatically create it (by default, missing categories are not created). For more information, go to [Use Discovery Agent to categorize your APIs](/docs/connect_manage_environ/connected_agent_common_reference/category_mapping).
* **Exclude API path from traffic**. The Traceability Agent configuration allows you to disregard certain API paths from being reported to the Platform. This option is useful if you want to exclude health checker APIs. For more information, refer to `TRACEABILITY_EXCEPTION_LIST` [variable definition](/docs/connect_manage_environ/connect_api_manager/agent-variables).

### Amplify AWS Gateway agents enhancements

None.

### Amplify Azure agents enhancements

None.

### Amplify Istio agents enhancements

None.

## Fixed issues

The following agent issues are fixed in this update:

* **Agent cannot contact JFrog**. Previously, when the agent contacted the service to check for the latest available release, it did not take advantage of the proxy configuration. Now, all outside connectivity goes through the proxy, if configured.

## Known limitations

The following limitations exist in this update.

### Amplify Gateway agents

* Discovery Agent cannot expose discovered APIs in multiple teams, so the organization structure on API Manager is lost in Amplify Central. As a result, the API provider must create the team in Amplify platform and share the API within the appropriate teams.
* When an API is renamed in API Manager, Discovery Agent cannot recognize the API name change. This results in the API displaying in Amplify Central with dual entries of both the originally discovered name and the newly changed name.
* Traceability Agent cannot report the transaction headers when using the Gateway in EMT mode and Transaction Event logging turned on (default configuration). Switch to Open Traffic log if you want to report the transaction headers.

### Amplify AWS Gateway agents

* Discovery Agent is working with only one AWS Region (the one used when installing the agent).
* Discovery Agent can discover APIs having ANY method only, but consumers will not be able to subscribe to it from Unified Catalog.
* Discovery Agent does not associate the usage plan and API when a subscriber chooses a usage plan that is not already linked to the chosen API.
* The Usage report is not scalable, as the agent relies on AWS Simple Queue Service and cannot have more than 10 consumers per queue. It is possible to increase the number of workers on the agent side.

### Amplify Azure agents

* Discovery Agent does not manage revision and version.
* Discovery Agent does not remove API Service and Catalog item when Azure API is removed.

### Amplify Istio agents

* Discovery Agent cannot display its status in Central topology since is it not integrated with Amplify Agents SDK.
* Discovery Agent requires manual set up to report APIs correctly.
* Traceability Agent cannot leverage Amplify agents SDK sampling feature.
