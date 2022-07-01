---
title: Amplify agents November 2021 Release Notes
linkTitle: Amplify agents November 2021
weight: 90
date: 2021-11-30
description: Traceability and Discovery agents for Amplify Gateway / AWS / Azure
  / Istio provide better visibility into your multi-type gateway eco system.
  These agents collect data from the Gateway (API / traffic) and expose it in
  Amplify Central, providing you with a global vision of your eco system from a
  single interface.
---

## Versioning

Currently, version 1.1.7 is available. It is based on Amplify Agents SDK v1.2.0.
To display version information in the agents, use command `agentName --version`.

This version is compatible with:

* Axway API Management 7.6.2 SPx and 7.7 SPx
* AWS Gateway using SDK 2.0
* Azure latest release

## New features and enhancements

The following new features and enhancements are available in this update.

### Amplify Gateway agents enhancements

* A warning is raised when using @secret for password configuration in the Traceability Agent offline mode.

### Amplify AWS Gateway agents enhancements

* None.

### Amplify Azure agents enhancements

* None.

### Amplify Istio agents enhancements

* None.

## Fixed issues

The following agent issues are fixed in this update:

* **Error getting authentication token from AxwayId**. Previously, when the clock of the machine where the agent was running was out of sync, the following error was raised when the agent tried to issue a new token: "Amplify Central - FAIL ([Error Code 1130] - error getting authentication token. Check Amplify Central auth configuration (CENTRAL_AUTH_*) and network configuration for agent on docs.axway.com: **bad response from AxwayId: 400 Bad Request**". Now, this message is displayed: "_Amplify Central - FAIL (error creating request header. bad response from AxwayId: 400 Bad Request: Client authentication with signed JWT failed: Token is not active. Could not get platform token._" and a possible remediation is available in the [troubleshooting documentation](/docs/connect_manage_environ/connect_api_manager/tips-troubleshooting-and-limitations).
* **AWS Discovery Agent goes stale after a while**. Previously, a deadlock could occur if some of the agent jobs tried to stop after a connectivity issue and the agent could no longer process the information. Now, a new variable `CENTRAL_JOBTIMEOUT` helps to define the timeout of the job (default is 5 minutes).
* **Logger adds additional rotate file hooks on config change**. Previously, the logger could be initialized multiple times, resulting in duplicated logs. Now, the logger is initialized only once, and no log are duplicated.

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

* Discovery Agent requires manual setup to report APIs correctly.
