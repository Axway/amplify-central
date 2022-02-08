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

The Traceability Agents now report three types of data to the platform:

* **Transaction data**:  represent the number and details of transactions processed by the Gateway during a period (timestamp / header / return code / origin and destination urls / service name / method name). These transaction data are sampled (10% by default) and redacted. See [sampling page](/docs/connect_manage_environ/connected_agent_common_reference/trace_sampling) and [redaction page](/docs/connect_manage_environ/connected_agent_common_reference/trace_redaction).
* **Usage data**: represent the total number of APIs called during a certain period.
* (NEW) **Metrics data**: represent an aggregation of the transaction data in the Gateway. Previously, this aggregation was done using the transaction data after it was pushed to Amplify. Now, it is directly aggregated by the agent and sent to the platform on regular intervals (5 minutes by default). The Analytics screen leverages this new information in Analytics > API Usage screen. Since the information is sent on a regular basis, the information is not immediately visible in the Analytics screen.

### Amplify Gateway agents enhancements

* APIs can be spread across teams in the same Amplify environment: the Discovery Agent associates the team ownership of an API based on the organization the API belongs to. If a team name in Amplify matches an organization name in API Manager, then this API will be owned by this team; otherwise, no team will own the API and only a Central administrator user will be able to see it. The Discovery agent no longer requires the `CENTRAL_TEAM` variable unless all APIs are being managed by a single team.

See [Upgrade an agent](/docs/connect_manage_environ/connected_agent_common_reference/upgrade_agent#axway-gateway-agents-upgrade) for more information about the agent setup for this feature.

### Amplify AWS Gateway agents enhancements

* Technical information for consumer subscription (AWS usage plan ID) are now stored with the subscription object on Amplify.

### Amplify Azure agents enhancements

* Technical information for consumer subscription (Azure subscription ID) are now stored with the subscription object on Amplify.

### Amplify Istio agents enhancements

Latest helm chart version: 0.62.0

Latest agent version: 2.0.23

* The Traceability Agent inherits the sampling feature from Agents SDK. See [Agent sampling](/docs/connect_manage_environ/connected_agent_common_reference/trace_sampling).

    Sample configuration:

```yaml
# configures the ALS Traceability agent
als:
# sampling configuration
  sampling:
    percentage: 100
    per_api: true
    reportAllErrors: true
```

* The Traceability Agent can now track multiple ISTIO namespaces. The `envoyFilterNamespace` property in the hybrid-override.yaml file has been deprecated and replaced by `istioGatewayNamespaces`. This new variable accepts multiple namespaces values that the agent will monitor.

    Sample to monitor multiple namespaces:

```yaml
# configures the ALS Traceability agent
als:
  istioGatewayNamespaces: 
   - istio-system
   - namespace2
```

### Amplify Apigee agents

A new release (0.0.4) of the Amplify Apigee agent has been promoted. This release enables you to:

* Discover portal and products exposed in Apigee Edge. Optionally, you can apply filters to discover only a subset of products.
* Manage your consumer subscription from Amplify platform.
* Report the API Usage to Amplify Analytics.

Known limitations:

* No traffic is reported as other agents to Amplify Analytics. A third-party library, such as Loggly, is required to do this.
* The API Usage will appear with the proxy name, not with the product name, in Amplify Analytics.

For more information, see the [Axway GitHub](https://github.com/Axway/agents-apigee) repository.

## Fixed issues

The following agent issues are fixed in this update:

* **Custom webhook for subscription is overriden by the agent**. Previously, when manually changing the webhook to be called for the subscription approval process, the agent would override it. Now, the agent manages only the subscription definition and leaves the webhook as is when updating the subscription schema definition.
* **Traceability Agent fails to connect to transaction service via proxy**. Previously, when using a proxy via the `TRACEABILITY_PROXYURL` variable, the Traceability Agent could not correctly connect to the `TRACEABILITY_HOST` URL due to a paring issue of the variable value. Now, the parsing is corrected, and the agent can connect using a proxy.
* **Changing discovery filter does not always update the discovered APIs**. Previously, after updating the discovery filter (`APIMANAGER_FILTER`), the Discovery Agent didn't correctly apply the new filter value. Now, the filter is always read at agent startup and correctly applied.

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
