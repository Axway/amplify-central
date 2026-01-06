---
title: Support Policy for Amplify agents and Amplify Agent SDK
linkTitle: Support Policy for Amplify agents and Amplify Agent SDK
weight: 200
date: 2021-08-23
description: Support policies for Amplify agents and the Amplify Agent SDK;
  which include versioning, release cycles and distribution
---
## Amplify agents

The Amplify agents are software applications that run on your host. The agents are responsible for gathering information that is happening in your data plane and sending it to the Amplify platform. The three types of agents that are supported are Discovery, Traceability, and Runtime Compliance Agents.

### Discovery Agents

Discovery Agents automate the process of finding assets that are deployed in a gateway, for example, OAS 3.0, WSDL, etc., and send them to the Amplify platform, where they are made available in the Catalog for people to find and use. Consumers can subscribe to use the discovered assets, and the agent helps to provision this subscription in the Gateway.

### Traceability Agents

Traceability Agents collect usage, metrics, and data plane traffic details and send them to the Amplify platform. On the platform, API consumers and API providers can view the performance and behavior of the assets discovered in the data plane.

### Runtime Compliance Agents

Runtime Compliance Agents collect data from a third party that captures and scans real-time API traffic to assess security threats. The APIs are represented as Runtime Unmanaged APIs with a Runtime Compliance score based on the security risk assessment.

### Supported agent list

{{< alert title="Note" color="primary" >}}See the [Amplify Enterprise Marketplace Release Notes](/docs/amplify_relnotes/#supported-agents) for the minimum and currently supported agent versions.{{< /alert >}}

Agents are classified into two categories, agents supported by Axway and agents supported by the community:

| Environment                | Support   | Agent type                                 | Deployment          |
| -------------------------- | --------- | ------------------------------------------ |---------------------|
| Apigee Edge API Management | Axway     | Discovery and Traceability                 | On-premise          |
| Apigee X API Management    | Axway     | Discovery and Traceability                 | SaaS                |
| AWS API Gateway            | Axway     | Discovery and Traceability                 | On-premise and SaaS |
| Axway API Management       | Axway     | Discovery and Traceability                 | On-premise          |
| Azure API Management       | Axway     | Discovery and Traceability                 | On-premise          |
| Github                     | Axway     | Discovery                                  | On-premise and SaaS |
| Gitlab                     | Axway     | Discovery                                  | On-premise          |
| Graylog API Security       | Axway     | Runtime Compliance                         | On-premise          |
| IBM API Connect            | Axway     | Discovery and Traceability                 | On-premise          |
| Istio                      | Axway     | Discovery and Traceability                 | On-premise          |
| Kafka Cluster              | Axway     | Discovery and Traceability                 | On-premise          |
| Kong Gateway               | Axway     | Discovery and Traceability                 | On-premise          |
| MuleSoft Anypoint platform | Axway     | Discovery and Traceability                 | On-premise          |
| SAP Integration Suite - API Management / API |Axway  | Discovery and Traceability   | On-premise          |
| Sensedia                   | Axway     | Discovery and Traceability                 | On-premise          |
| Software AG webMethods     | Axway     | Discovery                                  | On-premise          |
| SwaggerHub                 | Axway     | Discovery                                  | SaaS                |
| Traceable API Security     | Axway     | Runtime Compliance                         | On-premise and SaaS |
| WSO2 API Management        | Axway     | Discovery                                  | On-premise          |

All Amplify agents are built using the Amplify Agent SDK.

## Amplify Agent SDK

The Amplify Agent SDK is a software development kit that allows you to build custom agents for data planes where there is not already an existing Amplify agent. The SDK is implemented in Golang. The [Amplify Agent SDK](https://github.com/Axway/agent-sdk) is available publicly and can be found on GitHub.

For additional information on the SDK, please refer to the README.md in the GitHub repo.

## Amplify agent and SDK support

Support for the following components is addressed in this document:

* Amplify Agent SDK
* Amplify agents - delivered by Axway
* Amplify agents - delivered by the community

### Support for Axway delivered Amplify agents

As per the current (3.1) version of [Axway’s PLC](https://cdn.axway.com/u/Axway_Product_Lifecycle_3.1.pdf), Amplify agents are versioned based on a 2-digit release numbering scheme, complemented by an Update ID and a Patch:

![Axway's PLC numbering scheme](/Images/central/amplify_relnotes/release_matrix.png)

* **Major Release**: Updating the major release number will be rare and will only occur when changes made to the agent are not compatible with the previously released version. A new major release of an agent would be indicated by a change from **1**.8 to **2**.0.
* **Minor Release**: A minor release of an agent will be rare but more likely to happen than a major release; the minor number will be updated when the impact of the change is complex. A new minor release of an agent would be indicated by a change from 1.**0** to 1.**1**.
* **Update**: Axway will release an update to the Amplify agents each quarter. The Update will have new features, enhancements, and other fixes. As an example, an Update to an agent will be indicated by a change from 1.0.**1** to 1.0.**2**.
* **Patch**: Agents may have Patch releases every two weeks that will contain incremental changes. Patches will be included in the next available Update or Release, whichever is first. As an example, a Patch will be indicated by a change from 1.0.1.**1** to 1.0.1.**2**.

 Example: The first release of an agent version 1.0.0 occurs in Q1. Between Q1 and Q2, three Patches for the agent are released - 1.0.0.1, 1.0.0.2, 1.0.0.3. The next quarterly Update to the agent occurs in Q2, version 1.0.1.  This Update includes all the Patches between 1.0.0 and 1.0.1. The previous version 1.0.0 would now be under support and follow the lifecycle as described in [Axway’s PLC](https://cdn.axway.com/u/Axway_Product_Lifecycle_3.1.pdf).

{{< alert title="Note" color="primary" >}}The agent releases will be available on [support.axway.com](https://support.axway.com).{{< /alert >}}

### Support for community-delivered Amplify agents and Agent SDK

Community-delivered agents are open source and are built using the Amplify Agent SDK. For the specified agents, Axway or the community can provide the support. For community-only agents (e.g., WS02), the community can use and extend the functionality.

A completed agent could be visually represented as per figure 1 below. Items shown in red, namely the Amplify platform and the Agent SDK, are fully supported by Axway. The support of items in blue, namely the code written to connect to the 3rd-party Gateway / data plane and the 3rd-party Gateway, are addressed in this section.

![Axway supported and community supported parts of an open-source agent](/Images/central/community_agents_sdk.png)

If you discover an issue with the SDK, then please file a ticket against the agent repo following the [SDK’s contribution guide](https://github.com/Axway/agent-sdk/blob/main/CONTRIBUTING.md).

All community contributions are reviewed by the Axway project maintainer, and only upon their approval will the contribution be incorporated into the base code of the SDK and an updated version released.

If you discover an issue with an agent that you are unable to resolve yourself, then you should file an issue against the agent project. Make sure your problem does not already exist by looking through the known issues in the repository. Please refer to the contributing guide found in each 3rd-party agent repository, for example: <https://github.com/Axway/agents-mulesoft/blob/main/CONTRIBUTING.md>.

If you require an SDK enhancement to support your integration with a 3rd-party Gateway, community members can propose the changes to Axway by following the contribution guidelines in the repository. Axway will provide our best effort to approve and incorporate such SDK changes into the base SDK code; however, we are unable to make commitments as to when and if community-contributed code will be incorporated.

Customers requiring assistance with the Amplify third-party agents have the following options for support:

1. Call Axway Support and provide the requested debug logs. Axway will help determine if the issue is with gateway-specific code or connectivity to the Amplify platform. Axway will provide the next steps to help resolve the issue. If it is determined that the issue is with the SDK, Axway Support will open a GitHub issue on behalf of the customer. It will be appropriately prioritized to be fixed.
2. Community engagement via the [Axway Community portal](https://community.axway.com/s/).
3. Paid engagement with an SI partner.
4. Paid engagement with Axway Professional Services (PSO).

Agent references: [SDK documentation](https://github.com/Axway/agent-sdk), [SDK releases](https://github.com/Axway/agent-sdk/releases), [To report Amplify agent issues and questions](https://github.com/Axway/agent-sdk/issues)
