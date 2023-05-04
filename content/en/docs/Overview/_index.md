---
title: Amplify overview
linkTitle: Amplify overview
weight: 150
date: 2019-07-30
hide_readingtime: true
---

Amplify enables you to provide universal API Management across your enterprise. It allows you to manage and govern APIs and integrate assets across all environments, clouds and API Gateways (Axway and non-Axway) through a [central management plane](#amplify-management-plane).

With Amplify, enterprise teams have a centralized hub for discovering existing APIs, curating and sharing their APIs, onboarding consumers, and subscribing to APIs for consumption. Amplify enables you to increase the visibility and consumption of your APIs by engaging across your internal and partner ecosystem. You will gain insights into your API ecosystem in how it’s being utilized and how it adheres to your corporate standards.

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

![Amplify functionality](/Images/Overview/amplify-platform-overview.png)

Amplify consists of a SaaS-based Amplify Management Plane (shown in the top of the diagram in blue), federated control & data planes (shown at the bottom) and Amplify agents (shown in the middle). The terms management plane and control / data plane are borrowed from computer networking, as the data plane carries the user’s runtime traffic while the management plane is responsible for administration, configuration, monitoring, and management across the network.

Mapping this analogy back to Amplify:

* The data planes are the environments that are processing runtime transactions; these are your enforcement points that are providing security and access control for your traffic. Besides runtime environments, they could be code repositories that hold your API definitions.
* The Amplify management plane is providing governance over the data planes. Data planes are connected to the Management plane via Amplify agents (see below for more information about the agents).

{{< alert title="Note" color="primary" >}}The integration of data planes is also available through API or CLI, for integration with existing CI/CD tooling and processes. Besides a series of prebuilt agents, Axway offers an Amplify Agent SDK for creating agents for platforms not yet supported.{{< /alert >}}

### Amplify Management Plane

The management plane allows platform admins and API providers to administer users, teams, agents, and other related entities in support of managing your distributed environments and organizations.

#### Marketplace

API providers have visibility over the environments that have been connected to the Amplify platform, including services within those environments. Discovery Agents automate the retrieval of information from these systems, but services can also be added manually or via API or CLI. APIs and other assets are curated and published to the Amplify Marketplace. The Enterprise Marketplace caters to both providers and consumers and enables enterprises to deliver digital experiences with great speed and control by offering a centralized location for discovery and collaboration around assets, maximizing reuse across the enterprise.

#### Administration

Manage users and teams, the onboarding of developers (consumers), assign permissions, and oversee the environments. As consumers create apps and subscribe to assets, API providers can grant access and manage those subscriptions.

#### Insights

Amplify provides you with a centralized view of the API usage and consumption across the enterprise, for both producers and consumers.

##### API Traffic

![API Traffic](/Images/central/oerview/api_traffic.png)

##### API trends

![API trends](/Images/central/oerview/api_trends.png)

##### API reports

![API reports](/Images/central/oerview/api_report.png)

### Amplify agents

Amplify agents are lightweight software applications that either run on your data plane host, or are hosted / embedded with the Amplify Platform for certain SaaS native environments. These agents are responsible for gathering information that is happening in your data plane and sending it to the Amplify platform:

* **Discovery Agents** automate the process of finding resources deployed in an environment (for example, OAS 3.0, WSDL, etc.), and sending them to the Amplify platform where they will automatically service in the Service Registry. After they have been published, consumers can subscribe to use the discovered assets, at which point the agent helps to natively provision this subscription in the Gateway, as well as to manage credentials and quota enforcement.
* **Traceability Agents** collect usage, metrics, and data plane transaction metadata and send them to the Amplify platform for additional insights. In the platform, API consumers and API providers gain visibility into the performance and behavior of the assets discovered in the data plane.

### Federated control & data planes

Federated control ans data planes are the environments that are connected to the Amplify platform, but work completely independent from each other. Axway offers integration with a variety of these data planes, both Axway and non-Axway. The agents facilitate a consistent and unified experience for both your producers and consumers, irrespective of the underlying vendor or deployment architecture. This includes but is not limited to:

* Service discovery
* Compliance validation
* Curation and productization
* Subscription provisioning management
* Credential management
* Quota enforcement

The list of supported environments is growing. For a full list of supported environments, navigate to our [platform](https:/platform.axway.com/) or software downloads at <https://repository.axway.com>.

More information on the Axway API Gateway Manager solution can be found [here](https://docs.axway.com/category/apim/).
