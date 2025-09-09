---
title: Amplify Engage overview
linkTitle: Amplify Engage overview
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
  
Amplify Engage solves this by providing a federated approach to API management, helping you manage diverse APIs across multiple platforms and environments. Instead of requiring you to replace existing API solutions, Amplify Engage seamlessly integrates with your internal system and connects them into a single unified management plane for governance, discovery, and consumption. Amplify Engage provides enterprise-wide **Universal API Management** so you can: 

* Manage and govern APIs and assets across all environments, clouds, and API gateways (Axway and non-Axway).
* Discover existing APIs, curate them, and make them available to consumers.
* Onboard developers and partners, who can search, learn about, subscribe to, and consume your APIs.
* Gain insights into how APIs are being used and whether they comply with your corporate standards.

![Universal API Management ](/Images/Overview/universal_api_management.png)

## Key benefits of Amplify Engage

* **Autonomy with governance**</br>  
Business units can choose their own stacks while still integrating, sharing, and reusing APIs enterprise-wide. A central governance layer ensures compliance and security.

* **API discovery and security**</br>  
Automatically find both managed and unmanaged APIs. Unmanaged APIs represent risk (security breaches, duplication, shadow IT). Discovery shows your full inventory and highlights compliance.

* **Reuse across the enterprise**</br>  
Providers can quickly find existing services across multiple API types (REST, gRPC, GraphQL, SOAP, etc.) in the Service Registry, reducing duplication and speeding delivery.

* **Boosted consumption**</br>  
APIs deliver value only when used. Amplify provides a consistent consumer experience: search, discover, try, subscribe, and consume APIs in one place.

* **Actionable insights**</br>
Track which APIs succeed, overlap, need enhancement or retirement. Identify adoption trends and inform your next API strategy evolution.

* **Unified experience**</br>  
Consumers, internal or external, get a seamless onboarding and subscription journey regardless of the underlying data plane.

## Components and capabilities

![Universal API Management ](/Images/Overview/amplify_platform_overview.png)

* **Management plane**</br>
The management plane allows Platform Administrators and API providers to administer users, teams, agents, and other related entities in support of managing your distributed environments and organizations.

* **Agents**</br>
Amplify agents are lightweight software applications that either run on your data plane host or are hosted / embedded with the Amplify platform for certain SaaS native environments. These agents are responsible for gathering information that is happening in your data plane and sending it to Amplify Engage:
  
    * **Discovery Agents** automate the process of finding resources deployed in an environment (for example, OAS 3.0, WSDL, etc.) and sending them to the Amplify platform where they will automatically service in the Service Registry. After they have been published, consumers can subscribe to use the discovered assets, at which point the agent helps to natively provision this subscription in the Gateway, as well as to manage credentials and quota enforcement.
    * **Traceability Agents** collect usage, metrics, and data plane transaction metadata and send them to the Amplify platform for additional insights. In the platform, API consumers and API providers gain visibility into the performance and behavior of the assets discovered in the data plane.

* **Federated data planes**</br>  
The data planes are the environments that are processing runtime transactions. These are your enforcement points that provide security and access control for your traffic. Besides runtime environments, they could be code repositories that hold your API definitions. The **Agents** connect them to the Amplify management plane while allowing each environment to remain independent. The integration of data planes is also available through **API or CLI**. Besides a series of prebuilt agents, Axway offers an **Amplify Agent SDK** for creating agents for platforms not yet supported.

* **Environments**</br>  
An environment represents the connection point to a specific data plane, such as an API Gateway or runtime infrastructure where your APIs are hosted and managed. It defines the context in which discovery, subscription, and observability operations take place, ensuring that Amplify can interact consistently with the underlying gateway or service:

    * Enables linting rules to validate the API from a compliance perspective.
    * Sets the credential expiration date to be automatically handled by the agent.
    * Assigns stages such as production, test, dev.
    * Customizes tags, attributes, and access rights.

* **Service Registry**</br>  
All services discovered by agents or manually registered are stored in the Service Registry. The registry can include:

    * Design APIs – APIs identified from source code repositories.
    * Runtime Managed APIs – APIs discovered by agents or registered manually.
    * Runtime Unmanaged APIs – Shadow or zombie APIs detected through supported runtime security agents.​

* **API services**</br>  
An API service represents a physical deployment of a resource in an environment. Examples of API services include REST APIs, ASYCN APIs, etc. Later, these API services can be combined and packaged together to create curated assets that you can productize and make available for consumption in the Marketplace.

* **API service versions**</br>  
Each API service in Amplify Engage is defined by a specification, which can follow multiple formats such as OAS2, OAS3, WSDL, or Protobuf. When the underlying specification changes, a new version is created. Versioning is essential for managing the different phases of an API service’s lifecycle, allowing providers to evolve APIs while maintaining stability for existing consumers.

* **API service endpoints**</br>  
An endpoint is a URL that represents the deployment of an API service. There can be omultiple endpoints to access a deployed API service version. An endpoint includes a name and description to make it easier for others to consume later. It also contains the host and port information used to access the API service and have a hard dependency on the API service version it is associated with.

* **Assets Catalog**</br>  
  The catalog is curated list of resources grouped into logical, consumable capabilities. Any API intended for consumption must first pass through the asset stage, ensuring that only APIs meeting internal security standards and compliance requirements are published for use.

* **Assets**</br>
  Assets are resources that are aggregated into logical, consumable capabilities. The assets then get built into a product to address a business capability for a particular domain, geography, line of business, or an external partner.
  
* **Product Foundry**</br>
In Product Foundry, you can create and manage products with subscription plans, then publish them to the Marketplace for consumer access. Products can be built by grouping multiple assets based on domain or target audience, and you can enrich them with documentation that highlights their value and provides engagement instructions.
  
* **Marketplace**</br>  
Products have value only if consumers adopt them. So, you need an efficient way to take your products on the market and engage with your consumers. To achieve that, you need a Marketplace that will let consumers explore your products catalog and subscribe to the products they need. Amplify Engage allows you to set up multiple branded Marketplace instances, each tailored to specific audiences or use cases. For example, you might create one Marketplace tailored for internal teams and another for external partners, each with its own branding, navigation, and catalog of APIs and assets. This flexibility allows you to deliver personalized experiences while maintaining centralized governance.
  
* **Insights**</br>  
Amplify Engage offers a centralized view of API usage and consumption patterns across the enterprise. This enables producers to track adoption, performance, and compliance of their APIs, while giving consumers insight into available assets and their utilization.

## Supported data planes

The list of supported environments is growing. For a full list of supported environments, navigate to  [Connect and manage and environment]([https:/platform.axway.com/](/docs/connect_manage_environ)) or software downloads at <https://repository.axway.com>.

## Related topics

See the following topics for related information.
