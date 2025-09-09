---
title: Connect API Manager
linkTitle: Connect API Manager
weight: 100
date: 2020-15-15
---

## Connect API Manager to Amplify Engage

Amplify uses two lightweight agents to connect with API Manager:

1. [Discovery Agent](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/connect_api_manager/install_discovery_agent/index.html)    
   The Discovery Agent is used to discover published APIs and push them to Engage as API Services. If the default owner of the discovered APIs is not set in the agent configuration, the ownership is assigned to the team whose name matches the Organization name that the APIs belong to. 

2. [Traceability Agent](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/connect_api_manager/install_traceability_agent/index.html)  
   The Traceability Agent sends log information about APIs in API Gateway and publishes the events to Amplify. The Traceability Agent requires a connected and running Discovery Agent.

{{< alert title="Note" color="primary" >}}You will be notified at the startup of the agent if your agent is outdated: New version available. Please consider upgrading from version *(running version)* to version *(latest version)*.{{< /alert >}}

## Prerequisites

Before connection API Manager, make sure you have:

* An Amplify Organization with valid Engage entitlements.
* (Optional) A [**Service Account**](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts)
* (Optional) An [**Environment**](/docs/integrate_with_central/cli_central/cli_environments)
* An API Manager user having the role of **API Manager administrator** for the Discovery / Traceability agent to connect to API Manager
* An API Gateway user having the role of **API Gateway Operator** for Traceability Agent to connect to API Gateway.
* User with **Engage Admin** role in the selected Amplify Organization​.
* [Axway CLI](https://docs.axway.com/bundle/amplify-central/page/docs/integrate_with_central/cli_central/index.html) and Docker environment on the target VM/machine​

## System requirements

* Axway API Manager / Axway API Gateway 7.7 and running using a Linux installation (CentOS 6.x, 7.x, 8.x,  Oracle Linux 6.x, 7.x, Red Hat Enterprise Linux 6.x, 7.x, 8.x, SUSE Linux Enterprise Server 11.x, 12.x)
* The Linux machine where API Manager and API Gateway are running must be accessible and have `sudo` rights to run the Agents
* The agents must be installed on the same machine that API Manager and/or API Gateway is running

## Region support

Amplify supports three regions:

* US (default): [https://apicentral.axway.com](https://apicentral.axway.com)
* EU: [https://central.eu-fr.axway.com](https://central.eu-fr.axway.com)
* APAC: [https://central.ap-sg.axway.com](https://central.ap-sg.axway.com)

Set the region for both agents with the CENTRAL_REGION variable:

`CENTRAL_REGION=US   # or EU / AP`

{{< alert title="Note" color="primary" >}}`CENTRAL_REGION` is part of agents released after June 5 2024. See [CENTRAL_REGION setting](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic#central_region-setting) for details.{{< /alert >}}

## Related topics

See the following topics for related information.
