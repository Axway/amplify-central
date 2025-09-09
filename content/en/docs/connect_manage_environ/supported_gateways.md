---
title: Supported gateways and platforms
linkTitle: Supported gateways and platforms
weight: 350
date: 2025-09-09
---

Amplify Engage supports a variety of **gateways and external systems**, either natively or through embedded agents. Agents can be deployed on-premise within your infrastructure, or alternatively hosted directly within Amplify.

## Supported Gateways

### Axway API Gateway

* **On-premise** Discovery and Traceability Agents
* Discover published proxies and APIs.
* Marketplace consumer applications provisioned as **client apps** in V7 Manager
* Application registration requests result linking the Frontend Proxy linked the client application
* Quota enforcement per frontend proxy set in the client application
* Credentials: API Key, OAuth, Basic Auth, IDP.
* Credential management:
    * API Key: Suspend / Enable
    * OAuth: Suspend / Enable / Rotate
    * IDP - Suspend / Enable
    * Basic Auth - Suspend / Enable
* Full traceability and metrics:
    * Transactions with application context are associated with a managed application in Engage
    * Platform Usage reporting
    * Transaction metrics reporting
    * Transaction event sampling

### AWS API Gateway

Supports both **on-premise** and **embedded (SaaS)** agents. Both on-premise and SaaS agents offer the same core capabilities (discovery, usage plan mapping, credential management, quotas, and traceability).

* Discovery and Traceability Agents
* Supports discovery of REST APIs
* Marketplace application mapped to usage plans
* Application Registration requests result in linking the usage plan with the API stage in AWS
* Credentials: API Key
* Credential Management:
    * API Key: Suspend / Enable
* Quotas tied to usage plans
* Traceability:
    * Collects transaction data via CloudWatch.
    * Platform Usage reporting
    * Transaction metrics reporting
    * Transaction event sampling

### Azure API Management

Supports both **on-premise** and **embedded(SaaS)** agents.

* Discovery and Traceability Agents
* Discovery of APIs
* Marketplace application provisioned as a Product
* Application registration requests result in adding the API to the Product
* Credentials: API Key and EntraID (for on-premise agents only)
* Credential Management:
    * API Key: Suspend / Enable
* Quotas tied to products.
* Traceability:
    * Collects transactions with product subscriptions associated to the credential
    * Platform Usage reporting
    * Transaction metrics reporting
    * Transaction event sampling

### Apigee Edge

* **On premise** Discovery and Traceability Agents
* Discovery of API products and Proxies
* Marketplace application mapped to an Apigee application
* Application Registration results in the product being attached to the application
* Credentials: API Key and OAuth
* Credential Management:
    * API Key: Suspend / Enable
* Quotas attached to products (the underlying proxy must enforce the Quota)
* Traceability:
    * API usage statistics and metrics
    * Platform Usage reporting
    * Transaction metrics reporting
    * 🚫 No Transaction event sampling

### GCP Apigee X

* **On premise** Discovery and Traceability Agents
* Discover API Proxies
* Application Registration: Links API with the Product
* API Key / OAuth credentials
* Quota policy tied to products
* Traceability:
    * API usage statistics and metrics
    * Platform Usage reporting
    * Transaction metrics reporting
    * 🚫No Transaction event sampling
  
### IBM API Connect

* **On premise** Discovery and Traceability Agents
* Discover Catalog APIs
* Marketplace application mapped to Catalog application
* Application registration results in product access in Catalog application
* Credentials: API Key / OAuth
* Quotas enforcement by adding usage plan to product
* Traceability:
    * Transaction counts and metrics
    * Platform Usage reporting
    * Transaction metrics reporting
    * 🚫 Does not support Transaction event sampling

### Istio

* **On premise** Discovery Agent only
* Discover virtual services
* Credentials: IDP
* Quota enforcement through Envoy Filters
* 🚫 No application or subscription model
* 🚫 No traceability
* Platform usage only

### Mulesoft

* **On premise** Discovery and Traceability Agents
* Discover RAML and REST APIs
* Applications Support
* Application Registration results in the front end proxy being associated to the application
* Credentials: Basic Auth and OAuth
* Credential Management: Suspend / Enable
* 🚫 No quota enforcement
* 🚫 No traceability
* Platform usage only

### Software AG webMethods

* **On premise** Discovery and Traceability Agents
* Discover proxies
* 🚫 No application/subscription support
* 🚫 No credential support
* Traceability:
    * Transaction counts and metrics
    * Platform Usage reporting
    * Transaction metrics reporting
    * Transaction event sampling

### Kong Gateway

* **On premise** Discovery and Traceability Agents
* Discover services and routes
* Application mapped to Consumer
* Application regitration: If ACL plugin is required to give consumer access to Route
* Credentials: API Key / Basic Auth / OAuth
* Credential Management: Suspend / Enable
* Quotas enforcement: rate limiting Plugin added to Consumer
* Traceability:
    * Traceability via HTTP log plugin
    * Platform Usage reporting
    * Transaction metrics reporting
    * Transaction event sampling

### Kafka

* **On premise** Discovery and Traceability Agents
* Discover Kafka Topics
* Application mapped to Product
* Credentials: SASL / API Key
* Credential Management: Suspend / Enable
* 🚫 No quota enforcement
* Transaction Metrics Reporting only
* Platform Usage reporting

### WSO2 API Manager

* **On premise** Discovery and Traceability Agents
* Discover REST, SOAP, GraphQL APIs
* Applications and application registration support
* Credentials: API Key / OAuth
* Credential Management: Suspend / Enable
* Quotas Enforcement support
* Platform Usage reporting
* Transaction Metrics reporting
* Transaction Event Sampling

### SAP Integration Suite

* **On premise** Discovery and Traceability Agents
* Discover REST, SOAP, GraphQL APIs
* Application registration support
* API Key / OAuth credentials
* Credential Management: Suspend / Enable / Renew
* Quota enforcement
* Traceability:
    * Platform Usage reporting
    * Transaction Metrics reporting
    * 🚫 Transaction Event Sampling
 
## Other platforms and repositories

### GitHub

* **Embedded (SaaS)** Discovery Agent
* Discover API definitions from public and private repos

### SwaggerHub

* **Embedded (SaaS)** Discovery Agent
* Discover API specifications

### GitLab

* **On-premise** Discovery Agent
* Discover APIs in public and private repos

### Backstage

* **On-premise** Discovery Agent
* Discover all API types in catalog
