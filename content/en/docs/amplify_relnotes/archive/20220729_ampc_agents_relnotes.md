---
title: Amplify agents July 2022 Release Notes
linkTitle: Amplify agents July 2022
weight: 90
draft: true
date: 2022-07-11
---

Traceability and Discovery agents for Amplify Gateway / AWS / Azure / Istio provide better visibility into your multi-type gateway eco system. These agents collect data from the Gateway (API / traffic) and expose it in Amplify Central, providing you with a global vision of your eco system from a single interface.

## Versioning

Current agent versions are based on Amplify Agents SDK v1.1.30.
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

* **Consumer insights metrics**: the Traceability Agent enriches the metrics data with information related to the Marketplace (product / resource / subscription / quota / application) to help the consumer filter data in the Consumer Insights screens.

### Amplify Gateway agents enhancements

* Agent version: 1.1.24
* See Common enhancements and features.
* **Quota enforcement**: the subscription quota plan is enforced on the data plane.

### Amplify AWS Gateway agents enhancements

* Agent version: 1.1.22
* See Common enhancements and features.

### Amplify Azure agents enhancements

* Agent version: 1.1.22
* See Common enhancements and features.

### Amplify Istio agents enhancements

* Latest helm chart version: 0.71.0
* Latest agent version: 2.0.33
* See Common enhancements and features.

### Amplify Apigee agents

Current release (0.0.8) of the Amplify Apigee agent is available on [Axway GitHub](https://github.com/Axway/agents-apigee) repository.

* See Common enhancements and features.

Known limitations:

* No traffic is reported as other agents to Amplify Analytics. A third-party library, such as Loggly, is required to do this.
* The API Usage will appear with the proxy name, not with the product name, in Amplify Analytics.

For more information, see the [Axway GitHub](https://github.com/Axway/agents-apigee) repository.

### Amplify Mulesoft agents

Current release (1.1.5) of the Amplify Mulesoft agent is available on [Axway GitHub](https://github.com/Axway/agents-mulesoft) repository.

* None.

### Other available community agents

The following agents are open source and everybody can contribute:

* Mulesoft : <https://github.com/Axway/agents-mulesoft>
* WSO2: <https://github.com/Axway/agents-wso2>
* Kong: <https://github.com/Axway/agents-kong>

## Fixed issues

The following agent issue is fixed in this update:

* **API service revision updates**: agents detect when an API specification changes without deployment changes and updates the service instance with a new revision.

## Known limitations

The following limitations exist in this update.

### Amplify Gateway agents

* When an API is renamed in API Manager, Discovery Agent cannot recognize the API name change. This results in the API displaying in Amplify Central with dual entries of both the originally discovered name and the newly changed name.

### Amplify AWS Gateway agents

* Discovery Agent is working with only one AWS Region (the one used when installing the agent).
* Discovery Agent can discover APIs having ANY method only, but consumers cannot subscribe to it from Unified Catalog.
* Discovery Agent does not associate the usage plan and API when a subscriber chooses a usage plan that is not already linked to the chosen API.
* The Usage report is not scalable, as the agent relies on AWS Simple Queue Service and cannot have more than 10 consumers per queue. It is possible to increase the number of workers on the agent side.

### Amplify Azure agents

* Discovery Agent does not manage revision and version.
* Discovery Agent does not remove the API service and the Catalog item when the Azure API is removed.

### Amplify Istio agents

* Discovery Agent requires manual setup to report APIs correctly.
