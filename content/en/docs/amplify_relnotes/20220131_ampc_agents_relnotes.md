---
title: Amplify agents January 2022 Release Notes
linkTitle: Amplify agents January 2022
weight: 90
date: 2022-01-14
description: Traceability and Discovery agents for Amplify Gateway / AWS / Azure
  / Istio provide better visibility into your multi-type gateway eco system.
  These agents collect data from the Gateway (API / traffic) and expose it in
  Amplify Central, providing you with a global vision of your eco system from a
  single interface.
---

## Versioning

Currently, version 1.1.10 is available. It is based on Amplify Agents SDK v1.1.14.
To display version information in the agents, use command `agentName --version`.

This version is compatible with:

* Axway API Management 7.6.2 SPx and 7.7 SPx
* AWS Gateway using SDK 2.0
* Azure latest release

## New features and enhancements

The following new features and enhancements are available in this update.

All traceability agents are now reporting 3 different data to the platform:

* **Transaction data**:  represent the number and details of transactions processed by the Gateway during a period of time (timestamp / header / return code / origin and destination urls / service name / method name). These transaction data are sampled (10% by default) and redacted. Refer to [sampling page](/docs/connect_manage_environ/connected_agent_common_reference/trace_sampling) and [redaction page](/docs/connect_manage_environ/connected_agent_common_reference/trace_redaction).
* **Usage data**: represent the total number of APIs called during a certain period of time.
* (NEW) **Metrics data**: represent an aggregation of the transaction data happening in the Gateway. Previously, this aggregation was done using the transaction data after being pushed to Amplify. Now it is directly computed by the agent and send to the platform on regular interval. The API Observer leverage this new information in API Usage screen.

### Amplify Gateway agents enhancements

* API can be shared across teams in the same environment: the discovery agent associates the team ownership of an API based on the organization the API belongs to. If a team name in AMplify matches an organization name in API Manager, then this API will be owned by this team, otherwise no team will own the API and only a Central administrator user will be able to see it. Refer to [Upgrade and agent - TODO LINK](/docs/connect_manage_environ/connected_agent_common_reference/upgrade_agent#) for more information about the agent setup for this feature.

### Amplify AWS Gateway agents enhancements

* Technical information for consumer subscription (AWS usage plan ID) are now stored with the subscription object on Amplify.

### Amplify Azure agents enhancements

* Technical information for consumer subscription (Azure subscription ID) are now stored with the subscription object on Amplify.

### Amplify Istio agents enhancements

* None.

### Amplify Apigee agents

A new release (0.0.4) of the Amplify Apigee agent has been promoted. This release enable you to:

* Discover portal and products exposed in Apigee Edge. Optionally you can apply filters to discover only a subset of products.
* Manage your consumer subscription from Amplify platform
* report the API Usage to Amplify Analytics.

Known limitations:

* No traffic is reported as other agents to Amplify Analytics. A third party library such as Loggly is required for that.
* The API Usage will appear with the proxy name and not with the product name in Amplify analytics.

More information are available on [Axway github](https://github.com/Axway/agents-apigee) repository.

## Fixed issues

The following agent issues are fixed in this update:

* **Custom webhook for subscription is override by the agent**. Previously, when changing manually the webhook to be call for the subscription approval process, the agent keeps on overriding it. Now, the agent manage only the subscription definition and let the webhook as is when updating the subscription schema definition.
* **Traceability agent fails to connect to transaction service via proxy**. Previously, when using a proxy via the `TRACEABILITY_PROXYURL` variable, the traceability agent cannot connect correctly to the `TRACEABILITY_HOST` url dur to a paring issue of the variable value. Now, the parsing is corrected and the agent can connect correcly using a proxy.
* **Changing discovery filter does not always update the discovered APIs**. Previously, after updating the discovery filter (`APIMANAGER_FILTER`), the discovery agent did applied correctly the new filter value. Now the filter is always read at agent startup and correctly applied.

## Known limitations

The following limitations exist in this update.

### Amplify Gateway agents

* When an API is renamed in API Manager, Discovery Agent cannot recognize the API name change. This results in the API displaying in Amplify Central with dual entries of both the originally discovered name and the newly changed name.

### Amplify AWS Gateway agents

* Discovery Agent is working with only one AWS Region (the one used when installing the agent).
* Discovery Agent can discover APIs having ANY method only, but consumers will not be able to subscribe to it from Unified Catalog.
* Discovery Agent does not associate the usage plan and API when a subscriber chooses a usage plan that is not already linked to the chosen API.
* The Usage report is not scalable, as the agent relies on AWS Simple Queue Service and cannot have more than 10 consumers per queue. It is possible to increase the number of workers on the agent side.

### Amplify Azure agents

* Discovery Agent does not manage revision and version.
* Discovery Agent does not remove API Service and Catalog item when Azure API is removed.

### Amplify Istio agents

* Discovery Agent requires manual setup to report APIs correctly.
