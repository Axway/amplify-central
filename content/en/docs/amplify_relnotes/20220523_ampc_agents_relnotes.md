---
title: Amplify agents May 2022 Release Notes
linkTitle: Amplify agents May 2022
weight: 90
date: 2022-05-23
---

Traceability and Discovery agents for Amplify Gateway / AWS / Azure / Istio provide better visibility into your multi-type gateway eco system. These agents collect data from the Gateway (API / traffic) and expose it in Amplify Central, providing you with a global vision of your eco system from a single interface.

## Versioning

Current agent version are based on Amplify Agents SDK v1.1.24.
To display version information in the agents, use command `agentName --version`.

This version is compatible with:

* Axway API Management 7.6.2 SPx and 7.7 SPx
* AWS Gateway using SDK 2.0
* Azure latest release
* ISTIO 1.9.5
* Apigee Edge
* Mulesoft Anypoint platform v3.0

## Common enhancements and features

The following new features and enhancements are available in this update:

* **Single communication point for the agent**: `CENTRAL_SINGLEURL=https://ingestion-eu.platform.axway.com` (EU region) or `CENTRAL_SINGLEURL=https://ingestion.platform.axway.com` (US region) can be use to ensure the agent connectivity to the platform. From here the request will be forwarded to the appropriate services. From a customer perspective, using this url will ease their firewall configuration as only one url needs to be opened.
This new variable is enforced by Axway central CLI with version 2.10.3 or above.
* **Marketplace subscription**: Turning on the marketplace subscription provisioning `AGENTFEATURES_MARKETPLACEPROVISIONING=true` has 2 consequences to encourage everybody to move to the Marketplace:

    1- the discovery agent will no longer listen to unified catalog subscription.

    2- when discovery agent discover APIs, no catalog item will be created but only API Service.

    In a nutshell, either your agent manage the Unified Catalog subscription or the Marketplace subscription but not both at the same time.
* **Single polling entry point**: with the introduction of event based agent for managing the marketplace subscription, we also switch the existing various polling (API, Unified Catalog subscription...) to a single source of truth: harvester service where all events the agent is interested are available.

### Amplify Gateway agents enhancements

* Agent version: 1.1.18
* See Common enhancements and features.

### Amplify AWS Gateway agents enhancements

* Agent version: 1.1.18
* See Common enhancements and features.

### Amplify Azure agents enhancements

* Agent version: 1.1.16
* See Common enhancements and features.

### Amplify Istio agents enhancements

Latest helm chart version: 0.71.0

Latest agent version: 2.0.33

* Add text.

### Amplify Apigee agents

Current release (0.0.7) of the Amplify Apigee agent is available on [Axway GitHub](https://github.com/Axway/agents-apigee) repository.

* See Common enhancements and features.

Known limitations:

* No traffic is reported as other agents to Amplify Analytics. A third-party library, such as Loggly, is required to do this.
* The API Usage will appear with the proxy name, not with the product name, in Amplify Analytics.

For more information, see the [Axway GitHub](https://github.com/Axway/agents-apigee) repository.

### Amplify Mulesoft agents

Current release (1.1.5) of the Amplify Mulesoft agent is available on [Axway GitHub](https://github.com/Axway/agents-mulesoft) repository.

* No new updates

## Fixed issues

The following agent issues are fixed in this update:

* **Istio TA does not receive expected log entries from istio**. For the traceability agent to work properly, it requires that the envoy filters are deployed in each namespace that logs need to be gathered from.
* **Istio TA does not record all hops**.
* **OAS3 spec parser does not set the auth policies within the service body**. Previously, the agent was not able to parse correctly an OAS3 specification to discover the type of security. Now, agent discover correctly the type of security defined in the specification (swagger2 / OAS3).

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
