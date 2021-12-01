---
title: Amplify agents October 2021 Release Notes
linkTitle: Amplify agents October 2021
weight: 90
date: 2021-10-13
description: Traceability and Discovery agents for Amplify Gateway / AWS / Azure
  / Istio provide better visibility into your multi-type gateway eco system.
  These agents collect data from the Gateway (API / traffic) and expose it in
  Amplify Central, providing you with a global vision of your eco system from a
  single interface.
---

## Versioning

Currently, version 1.1.5 is available. It is based on Amplify Agents SDK v1.1.8.
To display version information in the agents, use command `agentName --version`.

This version is compatible with:

* Axway API Management 7.6.2 SPx and 7.7 SPx
* AWS Gateway using SDK 2.0
* Azure latest release

## New features and enhancements

The following new features and enhancements are available in this update.

* Agent resource status contains the previous and current status. Refer to `axway central get da,ta -o yaml`.

### Amplify Gateway agents enhancements

* Amplify Central CLI has been updated to configure the agent with the proper "latest release." The Docker command no longer refers to the "latest" tag. Instead, it now refers to the latest official release tag.

### Amplify AWS Gateway agents enhancements

* Amplify Central CLI has been updated to configure the agent with the proper "latest release." The Docker command, as well as the EC2 instance start script, no longer refer to "latest" tag. Instead, they refer to the latest official release tag.

### Amplify Azure agents enhancements

* Amplify Central CLI has been updated to configure the agent with the proper "latest release." The Docker command no longer refers to "latest" tag. Instead, it refers to the latest official release tag.

### Amplify Istio agents enhancements

* None

## Fixed issues

The following agent issues are fixed in this update:

* **Traceability connectivity connection failed, too many colons in address**. Previously, when using a proxy to send a transaction to the platform, the agent was not able to parse the proxy url (`TRACEABILITY_PROXYURL`) properly. Now, the Traceability Agent can correctly connect to the Amplify platform using a proxy.
* **Discovery Agent fails when using an environment owned by a team**. Previously, when an environment associated to Discovery Agent is owned by a team, the agent was not able to unmarshall it. Now, the Discovery Agent can use both an owned environment and a not owned environment.
* **Amplify Gateway helm installation Private key and Public key transposed in amplify-agents-keys secret**. Previously, when installing the Amplify Gateway agents with the helm charts, public and private keys were intervened. Now public and private key are correctly stored in the secret storage.

## Known limitations

The following limitations exist in this update.

### Amplify Gateway agents

* Discovery Agent cannot expose discovered APIs in multiple teams, so the organization structure on API Manager is lost in Amplify Central. As a result, the API provider must create the team in Amplify platform and share the API within the appropriate teams.
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

* Discovery Agent cannot display its status in Central topology since is it not integrated with Amplify Agents SDK.
* Discovery Agent requires manual set up to report APIs correctly.
* Traceability Agent cannot leverage Amplify agents SDK sampling feature.
