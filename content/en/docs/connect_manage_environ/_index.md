---
title: Connect and manage an environment
linkTitle: Connect and manage an environment
weight: 350
date: 2025-02-05
---

Connecting your environments to Amplify Engage is essential for unified management, visibility, and control over your digital assets, enabling you to streamline operations, enhance security, and accelerate innovation.

## Why connecting your environments matters

* **Automated API Discovery**: Instantly detect new APIs and services, reducing manual effort and ensuring your catalog is always up to date.
* **Centralized Management**: Manage all discovered services from a single pane of glass, regardless of where they are hosted.
* **Governance & Compliance**: Enforce design and security policies, validate compliance, and manage credentials centrally.
* **Operational Insights**: Monitor API health, usage metrics, and traffic across all environments for better decision-making.

## How to connect your Environment

### Using Agents

The recommended way to connect and manage environments is by installing **Discovery Agents** and **Traceability Agents** on your gateways. These agents connect your existing API data planes back to the Amplify Platform's management plane, while providing native API discovery, subscription, and observability for each different vendor platform in your environment.

When administrators make changes to the underlying data planes, or when consumers subscribe to the services, the changes are synchronized between Amplify platform and the data planes.​  
From a user perspective, all data planes in Amplify platform look the same. This makes it very easy for administrators to work with different environments.

The **Data Planes** are your API gateways and runtime environments (e.g., Axway, AWS API Gateway, Azure API Management, Istio, Apigee, Kong, MuleSoft, WSO2, Kafka, SAP, Software AG, IBM API Connect, and more).
Each data plane is represented as an **environment** in Amplify Engage.

Agents can be deployed on-premises or as a service in cloud-native environments. They are easy to install, secure, and extensible via SDKs.

### Manual syncronization

You can also manually synchronize your environment using the [Axway Central CLI](/docs/integrate_with_central/cli_central/cli_environments) or the [Amplify APIs](https://apicentral.axway.com/apis/docs). Note that manual changes in your deployment will not be automatically synchronized with Amplify, unless you automate this process.

## Discovery Agent

Discovery Agents are lightweight software components that run on your data plane hosts or are hosted in Amplify. They automatically discover APIs and services, sending metadata to the Amplify platform for inclusion in the Service Registry.

### Discovery Agent Key Features

* **Automated Discovery**: Detects new services and versions as they are deployed.
* **Configurable Filtering**: Administrators can set rules to control which APIs are discovered and sent to Amplify.
* **Provisioning Support**: Handles subscription requests and quota provisioning.
* **Credential Management**: Integrates with identity providers and manages credentials for API consumers.

> [!IMPORTANT]
> You will be notified at the startup of the agent if your agent is outdated: New version available. Please consider upgrading from version (running version) to version (latest version).

## Traceability Agent

The Traceability Agent is a lightweight software application that runs on your data plane host or can be hosted in Amplify. Its primary function is to report usage metrics, events, and log data from a given data plane to the Amplify platform.

### Traceability Agent Key Features

* **Non-obtrusive metrics collection**: Gathers metrics and traffic data from distributed data planes without disruption​.
* **API Transaction Details**: Includes request/response headers, performance data, and other metadata​.
* **Data redaction and sanitization**: Apply flexible selection, redaction, and sanitization rules to maintain data privacy​.
* **Transaction Sampling Controls**: Captures all transactions, including errors, for a period of 5 minutes, with a blocked off period of 30 minutes.​

> [!IMPORTANT]
> You will be notified at the startup of the agent if your agent is outdated: New version available. Please consider upgrading from version (running version) to version (latest version).

## Environment definition

In Amplify Engage, an **environment** represents the connection point to a specific data plane, such as an API Gateway or runtime infrastructure where your APIs are hosted and managed. It defines the context in which discovery, subscription, and observability operations take place, ensuring that Amplify can interact consistently with the underlying gateway or service.

Creating an environment is a prerequisite for connecting an agent. Agents use the environment definition to establish communication with the correct data plane, enabling automated API discovery, traffic collection, and lifecycle management. Without an environment, an agent cannot be registered or synchronized with Amplify Engage.

From the [Environments](https://apicentral.axway.com/topology/environments) view you can see the status of all connected dataplanes and make adjustments as needed. Each Environment can be edited to:

* Enable linting rules to validate APIs against compliance requirements
* Automate credential management by setting certificate or key expiration policies handled directly by the agent
* Assign stages (such as production, test, or development) to distinguish life cycle stages
* Customize tags, attributes, and access rights to align with organizational standards and governance policies

Creating and configuring an Environment is therefore a foundational step before connecting agents, as it defines how each data plane is represented and governed within the Amplify Platform.

For Details, see [Add Environments](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/add_environments/index.html).

### Stages

Stages in Amplify Engage represent the different phases of the API lifecycle and are a key mechanism for organizing the API landscape. Common examples include development, testing, and production.

Within an Environment, stages act as logical groupings for API services, regardless of how they are introduced—whether discovered from a gateway, pulled from a repository, or manually created. When APIs are discovered automatically, they are also automatically assigned to a stage.

Stages provide additional governance by letting you control their visibility across different Marketplace instances and teams, ensuring that only the right audiences see APIs at the appropriate lifecycle phase.

## Service Registry

The Service Registry is the centralized catalog of all services within Amplify Engage, forming what can be thought of as your company’s API Universe. It consolidates services reported by agents as well as those added manually, giving you a single, authoritative view of your API landscape.

The Service Registry is the primary place to discover APIs across the entire enterprise, regardless of the gateway, environment, or source they originate from.

Access to the Service Registry follows strict enterprise security rules:

* The full catalog is visible only to Engage Administrator.
* In practice, each team or business unit typically sees only a subset of services—specifically those that are associated with their scope of ownership or responsibility.

## API services

An **API service** represents a physical deployment of a resource in an environment. Examples of API services include REST APIs, ASYCN APIs, and so on. Later, these API services can be combined and packaged together to create curate assets that you can productizen and make available for consumption in the Marketplace.

### API Service Versions

Each API Service in Amplify Engage is defined by a **specification**, which can follow multiple formats such as OAS2, OAS3, WSDL, or Protobuf. When the underlying specification changes, a new version is created. Versioning is essential for managing the different phases of an API service’s lifecycle, allowing providers to evolve APIs while maintaining stability for existing consumers.

### API Service Endpoints

An endpoint is a URL that represents the deployment of an API service. There can be one or many endpoints to access a deployed API service version. An endpoint includes a name and description to make it easier for others to consume later. They also contain the host and port information used to access the API service and have a hard dependency on the API service version it is associated with.

## Supported Gateways and Features

Amplify Engage supports a wide range of gateways and platforms, including Axway API Gateway, AWS API Gateway, Azure API Management, Istio, Apigee, IBM API Connect, MuleSoft, Software AG webMethods, Kong, Kafka, Backstage, GitHub, GitLab, SAP Integration Suite, GCP Apigee X, SwaggerHub, and WSO2 API Manager.

Each gateway supports different features, such as:

* Discovery of APIs and applications
* Access request management
* Credential types and actions (APIKey, OAuth, BasicAuth, etc.)
* Quota enforcement
* Traceability and transaction metrics
  
For a detailed list of supported gateways and features, refer to the [Supported Gateways and Platforms](supported_gateways.md).

## Related topics

See the following topics for related information.

* [Manage Environments](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/edit_environment/index.html)
* [Monitor Agent status](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/agents_management/index.html)
* [Connect Axway API Manager](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/connect_api_manager/index.html)
