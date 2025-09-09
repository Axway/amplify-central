---
title: Amplify Engage
linkTitle: Amplify Engage
weight: 150
date: 2019-07-30
hide_readingtime: true
---

As the number of APIs in your enterprise grows, so does the complexity of managing them. Research shows that most organizations already operate with **two or more API management platforms** (data planes), and this number continues to increase with the adoption of **multi-cloud and hybrid strategies**.
Each of these platforms comes with its own tools, portals, and gateways—leading to fragmentation and challenges such as:

* No single place to discover all APIs.
* Duplicated or shadow APIs across teams.
* Inconsistent governance and security enforcement.
* Limited visibility into usage, compliance, and value.
  
Amplify Engage solves this by providing a federated approach to API management, helping you manage diverse APIs across multiple platforms and environments. Instead of requiring you to replace existing API solutions, Amplify Engage seamlessly integrates with your internal system and connects them into a unified experience for governance, discovery, and consumption.

***

## What Amplify Engage Enables

Amplify provides **Universal API Management** across your enterprise. With a single management plane, you can:

* Manage and govern APIs and assets across all environments, clouds, and API gateways (Axway and non-Axway).
* Discover existing APIs, curate them, and make them available to consumers.
* Onboard developers and partners, who can search, learn about, subscribe to, and consume your APIs.
* Gain insights into how APIs are being used and whether they comply with your corporate standards.

![Universal API Management ](/Images/Overview/universal_api_management.png)

## Key benefits

* **Autonomy with governance**  
  Business units can choose their own stacks while still integrating, sharing, and reusing APIs enterprise-wide. A central governance layer ensures compliance and security.

* **API discovery and security**  
  Automatically find both managed and unmanaged APIs. Unmanaged APIs represent risk (security breaches, duplication, shadow IT). Discovery shows your full inventory and highlights compliance.

* **Reuse across the enterprise**  
  Providers can quickly find existing services across multiple API types (REST, gRPC, GraphQL, SOAP, etc.) in the Service Registry, reducing duplication and speeding delivery.

* **Boosted consumption**  
  APIs deliver value only when used. Amplify provides a consistent consumer experience—search, discover, try, subscribe, and consume APIs in one place.

* **Actionable insights**  
  Track which APIs succeed, which overlap, and which need enhancement or retirement. Identify adoption trends and inform your next API strategy evolution.

* **Unified experience**  
  Consumers—internal or external—get a seamless onboarding and subscription journey regardless of the underlying data plane.

***

## Amplify Components, Capabilities and Concepts

![Universal API Management ](/Images/Overview/amplify_platform_overview.png)

* **Management Plane**  
  The management plane allows Platform Administrators and API providers to administer users, teams, agents, and other related entities in support of managing your distributed environments and organizations.

* **Agents**  
  Amplify agents are lightweight software applications that either run on your data plane host, or are hosted / embedded with the Amplify platform for certain SaaS native environments. These agents are responsible for gathering information that is happening in your data plane and sending it to Amplify Engage:
  
    * **Discovery Agents** automate the process of finding resources deployed in an environment (for example, OAS 3.0, WSDL, etc.), and sending them to the Amplify platform where they will automatically service in the Service Registry. After they have been published, consumers can subscribe to use the discovered assets, at which point the agent helps to natively provision this subscription in the Gateway, as well as to manage credentials and quota enforcement.
    * **Traceability Agents** collect usage, metrics, and data plane transaction metadata and send them to the Amplify platform for additional insights. In the platform, API consumers and API providers gain visibility into the performance and behavior of the assets discovered in the data plane.

* **Federated Data planes**  
  The data planes are the environments that are processing runtime transactions; these are your enforcement points that are providing security and access control for your traffic. Besides runtime environments, they could be code repositories that hold your API definitions. The **Agents** connect them to the Amplify Managegement Plane while allowing each environment to remain independent. The integration of data planes is also available through **API or CLI**. Besides a series of prebuilt agents, Axway offers an **Amplify Agent SDK** for creating agents for platforms not yet supported.

* **Environments**  
  An environment represents the connection point to a specific data plane, such as an API Gateway or runtime infrastructure where your APIs are hosted and managed. It defines the context in which discovery, subscription, and observability operations take place, ensuring that Amplify can interact consistently with the underlying gateway or service.

    * Enable linting rules to validate the API from a compliance perspective
    * Set the credential expiration date to be automatically handled by the agent
    * Assign stages such as production, test, dev
    * And customize tags, attributes and access rights

* **Service Registry**  
  All services discovered by agents or manually registered are stored in the Service Registry. The registry can include:

    * Design APIs – APIs identified from source code repositories.
    * Runtime Managed APIs – APIs discovered by agents or registered manually.
    * Runtime Unmanaged APIs – Shadow or zombie APIs detected through supported runtime security agents.​

* **API Services**  
An API service represents a physical deployment of a resource in an environment. Examples of API services include REST APIs, ASYCN APIs, and so on. Later, these API services can be combined and packaged together to create curate assets that you can productizen and make available for consumption in the Marketplace.

* **API Service Versions**  
Each API Service in Amplify Engage is defined by a specification, which can follow multiple formats such as OAS2, OAS3, WSDL, or Protobuf. When the underlying specification changes, a new version is created. Versioning is essential for managing the different phases of an API service’s lifecycle, allowing providers to evolve APIs while maintaining stability for existing consumers.

* **API Service Endpoints**  
An endpoint is a URL that represents the deployment of an API service. There can be one or many endpoints to access a deployed API service version. An endpoint includes a name and description to make it easier for others to consume later. They also contain the host and port information used to access the API service and have a hard dependency on the API service version it is associated with.

* **Assets Catalog**  
  A curated list of resources grouped into logical, consumable capabilities. Any API intended for consumption must first pass through the asset stage, ensuring that only APIs meeting internal security standards and compliance requirements are published for use.

* **Assets**
  Resources aggregated into logical, consumable capabilities. Those assets then get built into a product to address a business capability for a a particular domain, or geography, a line of business, or an external partner.
  
* **Product Foundry**  
  In Product Foundry, you can create and manage products with subscription plans, then publish them to the Marketplace for consumer access. Products can be built by grouping multiple assets based on domain or target audience, and you can enrich them with documentation that highlights their value and provides engagement instructions.
  
* **Marketplace**  
  Products have value only if consumers adopt them. So, you need an efficient way to take your products on the market and engage with your consumers. To achieve that, you need a Marketplace that will let consumers explore your products catalog and subscribe to the products they need. Amplify Engage allows you to set up multiple branded Marketplace instances, each tailored to specific audiences or use cases. For example, you might create one Marketplace tailored for internal teams and another for external partners, each with its own branding, navigation, and catalog of APIs and assets. This flexibility allows you to deliver personalized experiences while maintaining centralized governance.
  
* **Insights**  
  Amplify Engage offers a centralized view of API usage and consumption patterns across the enterprise. This enables producers to track adoption, performance, and compliance of their APIs, while giving consumers insight into available assets and their utilization.

## Supported Data Planes

The list of supported environments is growing. For a full list of supported environments, navigate to  [Connect and manage and environment]([https:/platform.axway.com/](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/index.html)) or software downloads at <https://repository.axway.com>.

## See Also

* [Provider Journey](https://docs.axway.com/bundle/amplify-central/page/docs/overview/provider_journey/index.html)
* [Consumer Journey](https://docs.axway.com/bundle/amplify-central/page/docs/overview/consumer_journey/index.html)
