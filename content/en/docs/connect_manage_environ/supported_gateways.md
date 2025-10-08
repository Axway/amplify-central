---
title: Supported gateways and platforms
linkTitle: Supported gateways and platforms
weight: 350
date: 2025-09-09
---

Amplify Engage supports a variety of **gateways and external systems**, either natively or through embedded agents. Agents can be deployed on-premise within your infrastructure, or alternatively hosted directly within Amplify.

## Supported gateways

### Axway API Gateway

* **On-premise** Discovery and Traceability agents
* Discover published proxies and APIs
* Marketplace consumer applications provisioned as **client apps** in V7 Manager
* Application registration requests result in linking the frontend proxy with the client application
* Quota enforcement per frontend proxy set in the client application
* Credentials: API Key, OAuth, Basic Auth, IDP
* Credential management:
    * API Key: Suspend / Enable
    * OAuth: Suspend / Enable / Rotate
    * IDP: Suspend / Enable
    * Basic Auth: Suspend / Enable
* Full traceability and metrics:
    * Transactions with application context are associated with a managed application in Engage
    * Platform usage reporting
    * Transaction metrics reporting
    * Transaction event sampling

### AWS API Gateway

Supports both **on-premise** and **embedded (SaaS)** agents. Both on-premise and SaaS agents offer the same core capabilities (discovery, usage plan mapping, credential management, quotas, and traceability).

* Discovery and Traceability agents
* Supports discovery of REST APIs
* Marketplace application mapped to usage plans
* Application registration requests result in linking the usage plan with the API stage in AWS
* Credentials: API Key
* Credential management:
    * API Key: Suspend / Enable
* Quotas tied to usage plans
* Traceability:
    * Collects transaction data via CloudWatch
    * Platform usage reporting
    * Transaction metrics reporting
    * Transaction event sampling

### Azure API Management

Supports both **on-premise** and **embedded(SaaS)** agents.

* Discovery and Traceability agents
* Discovery of APIs
* Marketplace application provisioned as a product
* Application registration requests result in adding the API to the product
* Credentials: API Key and EntraID (for on-premise agents only)
* Credential management:
    * API Key: Suspend / Enable
* Quotas tied to products
* Traceability:
    * Collects transactions with product subscriptions associated to the credential
    * Platform usage reporting
    * Transaction metrics reporting
    * Transaction event sampling

### Apigee Edge

* **On premise** Discovery and Traceability agents
* Discovery of API products and proxies
* Marketplace application mapped to an Apigee application
* Application registration results in the product being attached to the application
* Credentials: API Key and OAuth
* Credential management:
    * API Key: Suspend / Enable
* Quotas attached to products (the underlying proxy must enforce the Quota)
* Traceability:
    * API usage statistics and metrics
    * Platform usage reporting
    * Transaction metrics reporting
    * 🚫 No transaction event sampling

### GCP Apigee X

* **On premise** Discovery and Traceability agents
* Discover API proxies
* Application registration: Links API with the product
* API Key / OAuth credentials
* Quota policy tied to products
* Traceability:
    * API usage statistics and metrics
    * Platform usage reporting
    * Transaction metrics reporting
    * 🚫 No transaction event sampling
  
### IBM API Connect

* **On premise** Discovery and Traceability agents
* Discover catalog APIs
* Marketplace application mapped to catalog application
* Application registration results in product access in catalog application
* Credentials: API Key / OAuth
* Quotas enforcement by adding usage plan to product
* Traceability:
    * Transaction counts and metrics
    * Platform usage reporting
    * Transaction metrics reporting
    * 🚫 No transaction event sampling

### Istio

* **On premise** Discovery Agent only
* Discover virtual services
* Credentials: IDP
* Quota enforcement through Envoy filters
* 🚫 No application or subscription model
* 🚫 No traceability
* Platform usage only

### Mulesoft

* **On premise** Discovery and Traceability agents
* Discover RAML and REST APIs
* Applications support
* Application registration results in the front end proxy being associated to the application
* Credentials: Basic Auth and OAuth
* Credential management: Suspend / Enable
* 🚫 No quota enforcement
* 🚫 No traceability
* Platform usage only

### Software AG webMethods

* **On premise** Discovery and Traceability agents
* Discover proxies
* 🚫 No application/subscription support
* 🚫 No credential support
* Traceability:
    * Transaction counts and metrics
    * Platform usage reporting
    * Transaction metrics reporting
    * Transaction event sampling

### Sensedia API Gateway

* * **On premise** Discovery and Traceability agents

### Kong Gateway

* **On premise** Discovery and Traceability agents
* Discover services and routes
* Application mapped to consumer
* Application registration: If ACL plugin is required to give consumer access to route
* Credentials: API Key / Basic Auth / OAuth
* Credential management: Suspend / Enable
* Quotas enforcement: rate limiting Plugin added to Consumer
* Traceability:
    * Traceability via HTTP log plugin
    * Platform usage reporting
    * Transaction metrics reporting
    * Transaction event sampling

### Kafka

* **On premise** Discovery and Traceability agents
* Discover Kafka topics
* Application mapped to product
* Credentials: SASL / API Key
* Credential management: Suspend / Enable
* 🚫 No quota enforcement
* Transaction metrics reporting only
* Platform usage reporting

### WSO2 API Manager

* **On premise** Discovery and Traceability agents
* Discover REST, SOAP, GraphQL APIs
* Applications and application registration support
* Credentials: API Key / OAuth
* Credential management: Suspend / Enable
* Quotas enforcement support
* Platform usage reporting
* Transaction metrics reporting
* Transaction event sampling

### SAP Integration Suite

* **On premise** Discovery and Traceability agents
* Discover REST, SOAP, GraphQL APIs
* Application registration support
* API Key / OAuth credentials
* Credential management: Suspend / Enable / Renew
* Quota enforcement
* Traceability:
    * Platform usage reporting
    * Transaction metrics reporting
    * 🚫 No transaction event Sampling

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
