---
title: Connect and manage an environment
linkTitle: Connect and manage an environment
weight: 350
date: 2025-02-05
---
Connecting your environments to Amplify Engage is essential for unified management, visibility, and control over your digital assets, enabling you to streamline operations, enhance security, and accelerate innovation.

**Why connecting your environments matters**

* **Automated API Discovery**: Instantly detect new APIs and services, reducing manual effort and ensuring your catalog is always up to date.
* **Centralized Management**: Manage all discovered services from a single pane of glass, regardless of where they are hosted.
* **Governance & Compliance**: Enforce design and security policies, validate compliance, and manage credentials centrally.
* **Operational Insights**: Monitor API health, usage metrics, and traffic across all environments for better decision-making.

## How to connect your Environment

### Using Agents

The recommended way to connect and manage environments is by installing **Discovery Agents** and **Traceability Agents** on your gateways. These agents connect your existing API data planes back to the Amplify Platform's management plane, while providing native API discovery, subscription, and observability for each different vendor platform in your environment. It also automate the discovery of new APIs, and collection of logs or events from the target data planes.​  

When administrators make changes to the underlying data planes, or when consumers subscribe to the services, the changes are synchronized between Amplify platform and the data planes.​  
From a user perspective, all data planes in Amplify platform look the same. This makes it very easy for administrators to work with different environments.

The **Data Planes** are your API gateways and runtime environments (e.g., Axway, AWS API Gateway, Azure API Management, Istio, Apigee, Kong, MuleSoft, WSO2, Kafka, SAP, Software AG, IBM API Connect, and more).
Each data plane is represented as an **environment** in Amplify Engage.

Agents can be deployed on-premises or as a service in cloud-native environments. They are easy to install, secure, and extensible via SDKs.

### Manual syncronization

You can also manually synchronize your environment using the [Axway Central CLI](/docs/integrate_with_central/cli_central/cli_environments) or the [Amplify APIs](https://apicentral.axway.com/apis/docs). Note that manual changes in your deployment will not be automatically synchronized with Amplify, unless you automate this process.

## Discovery Agent
Discovery Agents are lightweight software components that run on your data plane hosts or are hosted in Amplify. They automatically discover APIs and services, sending metadata to the Amplify platform for inclusion in the Service Registry.

**Key Features**

* Automated Discovery: Detects new services and versions as they are deployed.
* Configurable Filtering: Administrators can set rules to control which APIs are discovered and sent to Amplify.
* Provisioning Support: Handles subscription requests and quota provisioning.
* Credential Management: Integrates with identity providers and manages credentials for API consumers.

## Traceability Agent

The Traceability Agent is a lightweight software application that runs on your data plane host or can be hosted in Amplify. Its primary function is to report usage metrics, events, and log data from a given data plane to the Amplify platform.

**Key Features**

* **Non-obtrusive metrics collection**: Gathers metrics and traffic data from distributed data planes without disruption​
* **API Transaction Details**: Includes request/response headers, performance data, and other metadata​
* **Data redaction and sanitization**: Apply flexible selection, redaction, and sanitization rules to maintain data privacy​
* **Transaction Sampling Controls**: Captures all transactions, including errors, for a period of 5 minutes, with a blocked off period of 30
minutes​

## Supported Gateways and Features

Amplify Engage supports a wide range of gateways and platforms, including Axway API Gateway, AWS API Gateway, Azure API Management, Istio, Apigee, IBM API Connect, MuleSoft, Software AG webMethods, Kong, Kafka, Backstage, GitHub, GitLab, SAP Integration Suite, GCP Apigee X, SwaggerHub, and WSO2 API Manager.

Each gateway supports different features, such as:

* Discovery of APIs and applications
* Access request management
* Credential types and actions (APIKey, OAuth, BasicAuth, etc.)
* Quota enforcement
* Traceability and transaction metrics
  
For a detailed feature matrix, refer to the [Supported Gateways]

* [Discovery and Traceability Agents for Axway API Manager](/docs/connect_manage_environ/connect_api_manager/)
* [Discovery and Traceability Agents for GCP Apigee X](/docs/connect_manage_environ/connect_apigee_x/)
* [Discovery and Traceability Agents for AWS API Gateway](/docs/connect_manage_environ/connect_aws_gateway/)
* [Discovery and Traceability Agents for Azure API Management](/docs/connect_manage_environ/connect_azure_gateway/)
* [Discovery and Traceability Agents for IBM API Connect](/docs/connect_manage_environ/connect_ibm_api_connect/)
* [Discovery and Traceability Agents for Istio Gateway](/docs/connect_manage_environ/mesh_management/)
* [Discovery and Traceability Agents for MuleSoft Gateway](https://github.com/Axway/agents-mulesoft)
* [Discovery and Traceability Agents for Software AG webMethods](https:///docs/connect_software_ag_webmethods/)
* [Discovery and Traceability Agents for Kong Gateway](https://github.com/Axway/agents-kong)
* [Discovery Agent for GitHub Repository](/docs/connect_manage_environ/connect_github_repository/)
* [Discovery Agent for GitLab Repository](/docs/connect_manage_environ/connect_gitlab_repository/)
* [Discovery Agent for Kafka Cluster](/docs/connect_manage_environ/connect_kafka_cluster/)
* [Discovery Agent for SwaggerHub](/docs/connect_manage_environ/connect_swaggerhub/)
* [Discovery Agent for Backstage](/docs/connect_manage_environ/connect_backstage/)
* [Discovery Agent for SAP Integration Suite - API Management / API Portal](/docs/connect_manage_environ/connect_sap_api_portal/)

To manually synchronize your environment, you can use the  Note that changes in your deployment will not be automatically synchronized with Amplify.

## Asset definitions

This section describes the assets that are represented in your environment.

### API services

An API service represents a physical deployment of a resource in an environment. Examples of API services include API, MFT, Protobuf, documentation, and so on. You can manually add API services to your environment or they can be discovered and auto-added by Axway agents. Later, these API services can be combined and packaged together to create catalog items for your consumers to access.

#### Versions

API services have a specification based on type (OAS2, OAS3, WSDL, Protobuf, etc). Whenever this specification changes, a version must be created. This helps account for different stages in the lifecycle of the API service. Each version has a direct dependency on its associated API services and can be individually configured for differing consumer access needs.

#### Endpoints

An endpoint is a URL that represents the deployment of an API service. There can be one or many endpoints to access a deployed API service version. An endpoint includes a name and description to make it easier for others to consume later. They also contain the host and port information used to access the API service and have a hard dependency on the API service version it is associated with.

### Webhooks

Webhook assets are used for enabling subscription flows when a catalog user wants to subscribe to your API service. Webhooks are scoped to the environment level, which makes them reusable with other assets within the environment.

### Secrets

Secrets are a special kind of asset used with webhooks for securing subscription flows.

## Related topics

See the following topics for related information.
