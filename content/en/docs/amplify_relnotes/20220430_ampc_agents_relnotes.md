---
title: Amplify agents April 2022 Release Notes
linkTitle: Amplify agents April 2022
weight: 90
date: 2022-04-29
---

Traceability and Discovery agents for Amplify Gateway / AWS / Azure / Istio provide better visibility into your multi-type gateway eco system. These agents collect data from the Gateway (API / traffic) and expose it in Amplify Central, providing you with a global vision of your eco system from a single interface.

## Versioning

Currently, version 1.1.16 is available. It is based on Amplify Agents SDK v1.1.20.
To display version information in the agents, use command `agentName --version`.

This version is compatible with:

* Axway API Management 7.6.2 SPx and 7.7 SPx
* AWS Gateway using SDK 2.0
* Azure latest release
* ISTIO 1.9.5
* Apigee Edge
* Mulesoft Anypoint platform v3.0

## New features and enhancements

The following new features and enhancements are available in this update:

* Managing marketplace subscription provisioning on the dataplane. When consumer subscribe and request access to an API using the Marketplace, the agent is able to handle the request and provision the appropriate application (Axway / Apigee), Usage plan (AWS), subscription (Azure) and create corresponding credentials (apiKey / oauth clientID,clientSecret).

* Managing marketplace subscription deprovisioning on the dataplane. When consumer remove a marketplace application, the agent will remove the corresponding object (application, Usage plan or subscription) and the associated credentials from the dataplane.

To activate the marketplace provisioning/deprovisioning, the following variables need to be added to the discovery agent configuration:

* `CENTRAL_GRPC_ENABLED=true` : allow the agent to communicate to the platform over http/2 protocol
* `AGENTFEATURES_MARKETPLACEPROVISIONING=true` : inform the agent to manage the marketplace subscription
* `AGENTFEATURES_PERSISTCACHE=true` : inform the agent to use the filesystem to persist the cache. This will help the agent to process any missed request while the agent is down.

* Docker volume is added to the discovery agent to store persisted data.

### Amplify Gateway agents enhancements

* See the common enhancement section.

### Amplify AWS Gateway agents enhancements

* See the common enhancement section

### Amplify Azure agents enhancements

* See the common enhancement section

### Amplify Istio agents enhancements

Latest helm chart version: 0.69.0

Latest agent version: 2.0.28

* multiple istio namespace support.

### Amplify Apigee agents

Current release (0.0.6) of the Amplify Apigee agent is available on [Axway GitHub](https://github.com/Axway/agents-apigee) repository.

* Marketplace provisioning / deprovisioning (refer to the common enhancement section)

Known limitations:

* No traffic is reported as other agents to Amplify Analytics. A third-party library, such as Loggly, is required to do this.
* The API Usage will appear with the proxy name, not with the product name, in Amplify Analytics.

For more information, see the [Axway GitHub](https://github.com/Axway/agents-apigee) repository.

### Amplify Mulesoft agents

Current release (1.1.5) of the Amplify Mulesoft agent is available on [Axway GitHub](https://github.com/Axway/agents-mulesoft) repository.

* Marketplace provisioning / deprovisioning (refer to the common enhancement section)

For more information, see the [Axway GitHub](https://github.com/Axway/agents-mulesoft) repository.

## Fixed issues

The following agent issues are fixed in this update:

* **ISTIO agents: unable to update**. Previously when updating ISTIO agents using helm update command, the procedure failed because existing pod was not terminated prior to start the new pods. Now, the existing pods is terminated before starting the new one and the agents can be updated using `helm upgrade --install --namespace amplify-agents ampc-hybrid axway/ampc-hybrid -f hybrid-override.yaml` command.

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