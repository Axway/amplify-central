---
title: Amplify Central overview
linkTitle: Amplify Central overview
weight: 150
date: 2019-07-30
hide_readingtime: true
description: Amplify Central enables you to provide universal API Management
  across your enterprise. It allows you to manage and govern APIs and
  integration assets across all environments, clouds and API Gateways (Axway and
  non-Axway) through a [central management plane](#amplify-management-plane).
---
With Amplify, enterprise teams have a centralized hub for discovering existing APIs, curating and sharing their APIs, onboarding consumers, and subscribing to APIs for consumption. Amplify Central enables you to increase the visibility and consumption of your APIs by engaging across your internal and partner ecosystem. You will gain insights into your API ecosystem in how it’s being utilized and how it adheres to your corporate standards.

Amplify integrates seamlessly with your internal systems, with Amplify agents deployed across gateway and service platforms to help you manage data and application assets across multi-cloud and hybrid environments. It supports:

* API patterns: cloud edge, enterprise edge, internal, and mesh
* Service types: SOAP, REST, GraphQL, gRPC, and events
* Specifications: Swagger, OpenAPI, AsyncAPI, WSDL, Protobuf, and Avro

Amplify manages the complexity and sprawl of a diverse, distributed IT architecture, helping you create a successful API platform that can grow with your scale and use cases.

## Key benefits

* **Provide your API teams with autonomy**. Amplify lets your lines of business maintain their independence and choose their own technology stacks, knowing that you will be able to integrate and share what is built across your enterprise, whether your colleagues are in the next office or around the globe. A centralized management layer helps each line of business build data governance and start to standardize on common elements that everyone can use, while also maintaining the innovative capacity to build quickly and meet emerging customer needs.
* An organization can only govern and secure the APIs that it knows about. **API Discovery** can find your managed and unmanaged APIs in your ecosystem. Unmanaged APIs present a significant risk of security breach, denial-of-service attack, unexpected operational dependency, duplication, and productivity issues. API Discovery will show you the inventory of assets and if they are compliant to your corporate standard.
* **Reuse**. As companies grow, more APIs are created, making it harder for developers to find the service they need. Most organizations manage multiple API types (REST, gRPC, GraphQL, WSDL, etc.) across different business units and hosted on different systems. The Amplify Catalog helps accelerate software delivery by allowing developers to find existing services and to avoid duplication.
* Value is recognized when your APIs are consumed. Amplify will **help grow the consumption of your APIs** by enabling a consistent consumer experience allowing you to search, discover, learn about, try, subscribe to, and consume the appropriate digital assets.
* Gain **insights** into what will be the next evolution of your API strategy. You can view what APIs are conforming to your standard regardless of where that API is deployed. You can identify which APIs are successful and growing, which need modifications or additional enhancement, which have functional overlap, and which need to be retired.
* **Universal API Management**. Allow your consumers (internal or partners) to onboard and consume APIs with a unified experience regardless of what data plane is governing the API traffic

## Functional capability

![Amplify functionality](/Images/Overview/amplify-platform-overview.jpg)

Amplify consists of a SaaS-based Amplify Management Plane (shown in the top of the diagram in blue), data planes (shown at the bottom), and Amplify agents (shown in the middle). The terms management (or control) plane and data plane are borrowed from computer networking, as the data plane carries the user’s runtime traffic while the management plane is responsible for administration, configuration, monitoring, and management across the network.

Mapping this analogy back to Amplify:

* The data planes are the API Gateways that are processing runtime transactions; these are your enforcement points that are providing security and access control for your traffic.
* The Amplify management plane is providing governance over the data planes. Data planes are connected to the Management plane via Amplify agents (see below for intro to agents).

{{< alert title="Note" color="primary" >}}The integration of data planes is also available through API or CLI, for integration with existing CI/CD tooling and processes. Axway also offers an Amplify Agent SDK for creating agents for platforms not yet supported.{{< /alert >}}

### Amplify Management Plane

The management plane allows platform admins and API providers to administer users, teams, agents, and other related entities in support of managing your distributed environments and organizations.

#### Catalog

API providers have visibility over the environments that have been connected to the Amplify platform, including services within those environments. Discovery Agents automate the retrieval of information from these systems, but services can also be added manually or via API or CLI. APIs and other assets are curated and published to the Amplify Catalog, which becomes the marketplace for all integration assets in your enterprise, ranging from APIs to Managed File Transfer Flows to mobile SDKs. The Catalog caters to both providers and consumers, and enables enterprises to deliver digital experiences with great speed and control by offering a centralized location for discovery and collaboration around assets, maximizing reuse across the enterprise.

#### Administration

API providers can manage onboarding of developers, assign permissions, and oversee the environments. As consumers create apps and subscribe to assets, API providers can grant access and manage those subscriptions.

#### Analytics

Amplify provides you with a centralized view of the API usage and consumption across the enterprise:

![Amplify analytics](/Images/central/analytics.png)

### Data plane

#### Amplify agents

Amplify agents are lightweight software applications that run on your data plane host. These agents are responsible for gathering information that is happening in your data plane and sending it to the Amplify platform:

* **Discovery Agents** automate the process of finding assets deployed in a Gateway (for example, OAS 3.0, WSDL, etc.), and sending them to the Amplify platform where they are made available in the Catalog. Consumers can subscribe to use the discovered assets, at which point the agent helps to natively provision this subscription in the Gateway.
* **Traceability Agents** collect usage, metrics, and data plane transaction metadata and send them to the Amplify platform for additional insights. In the platform, API consumers and API providers gain visibility into the performance and behavior of the assets discovered in the data plane.

#### Federate data planes

Federated data planes are data planes that are connected to the Amplify platform, but work completely independent from each other. Axway offers the following federate data planes, with each offering specific capabilities:

* **[API Gateway](https://docs.axway.com/category/apim)** is a runtime gateway that proxies the REST APIs registered in API Manager and enforces configured policies on client requests and responses.
* **[Streams](https://docs.axway.com/bundle/streams-open-docs/page/docs/index.html)** is a publish/subscribe messaging service where the senders of messages are decoupled from the receivers of messages.
* **[API Builder](https://docs.axway.com/bundle/api-builder/page/docs/index.html)** is an integration orchestration layer between existing service providers and the API management system, or governance layer, that allows you to quickly implement integration use cases.
* **[Integration Builder](https://docs.axway.com/bundle/Amplify_Integration_Builder_allOS_en/page/amplify_integration_builder.html)** is an integration tool that allows you to easily build flows, mappings, and connectors between virtually any endpoint. Robust integrations can be built rapidly by using the prebuilt connectors.

## Try Amplify Central for free

To get full, free access to Amplify Central for a trial period, go to [Amplify platform](https://platform.axway.com/) and sign up for a free trial.
