---
title: Amplify agents July 2021 Release Notes
linkTitle: Amplify agents July 2021
weight: 90
date: 2021-07-26
description: Traceability and Discovery agents for Amplify Gateway / AWS / Azure
  / Istio provide better visibility into your multi-type gateway eco system.
  These agents collect data from the Gateway (API / traffic) and expose it in
  Amplify Central, providing you with a global vision of your eco system from a
  single interface.
---

## Versioning

Currently, version 1.1.0 is available. It is based on Amplify Agents SDK v1.1.0.
To display version information in the agents, use command `agentName --version`.

## New features and enhancements

The following new features and enhancements are available in this update.

### Amplify Gateway agents enhancements

* Traceability Agent now reports Gateway traffic even when Amplify Gateway is used without API Manager. Since there is no service name in this situation, all API usage is visible in API Observer under the `APIGatewayOnly-noServiceName` API. The transaction details are visible in the API traffic section of API Observer.
* The Traceability redaction feature is now available for JMS properties:
    * `TRACEABILITY_REDACTION_JMSPROPERTIES_SHOW`
    * `TRACEABILITY_REDACTION_JMSPROPERTIES_SANITIZE`

    Refer to [JMS Trace redaction](/docs/connect_manage_environ/connected_agent_common_reference/trace_redaction/#jms-properties-show-rules) and [JMS property sanitization](/docs/connect_manage_environ/connected_agent_common_reference/trace_redaction/#jms-properties-value-sanitization-rules) topics.
* Last activity time is now reported to the platform each time an agent sends data to the Platform and each time an agent health check is triggered.

### Amplify AWS Gateway agents enhancements

* Encrypted queues (default configuration) are now used instead of standard queues.

### Amplify Azure agents enhancements

* None

### Amplify Istio agent enhancements

* Alignment with the latest Amplify Agents SDK offers transaction redaction and Usage report capabilities.

## Fixed issues

The following agent issues are fixed in this update:

* **Catalog item's categories are lost when a consumer instance is updated**. Previously, when updating a consumer instance after a discovery process, the categories associated with the corresponding catalog item were lost. Now, before updating a consumer instance, the agent retrieves the most recent information from Amplify to keep existing categories.

## Known limitations

The following limitations exist in this update:

* Amplify Gateway agents:

    * Discovery Agent cannot expose discovered APIs in multiple teams, so the organization structure on API Manager is lost in Amplify Central. As a result, the API provider must create the team in Amplify Platform and share the API within the appropriate teams.
    * When an API is renamed in API Manager, Discovery Agent cannot recognize the API name change. This results in the API displaying in Amplify Central with dual entries of both the originally discovered name and the newly changed name.
    * When using the Gateway only capability without API Manager, Traceability Agent does not report the traffic.

* Amplify AWS Gateway agents:

    * Discovery Agent is working with only one AWS Region (the one used when installing the agent).
    * Discovery Agent can discover APIs having ANY method only, but consumers will not be able to subscribe to it from Unified Catalog.
    * Discovery Agent does not associate the usage plan and API when a subscriber chooses a usage plan that is not already linked to the chosen API.
    * The Usage report is not scalable, as the agent relies on AWS Simple Queue Service and cannot have more than 10 consumers per queue. It is possible to increase the number of workers on the agent side.

* Amplify Azure agents:

    * Discovery Agent does not manage revision and version.
    * Discovery Agent does not remove API Service and Catalog item when Azure API is removed.

* Amplify Istio agents:

    * Discovery Agent cannot display its status in Central topology since is it not integrated with Amplify Agents SDK.
    * Discovery Agent requires manual set up to report APIs correctly.
    * Traceability Agent cannot leverage Amplify agents SDK sampling feature.
