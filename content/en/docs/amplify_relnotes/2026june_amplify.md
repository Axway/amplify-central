---
title: Amplify Engage June 2026
linkTitle: Amplify Engage June
weight: 8
date: 2026-6-10
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents). To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).{{< /alert >}}

---

## June 25, 2026

New enhancements and bug fixes for the June 25 update.

### Agent updates for June 25, 2026

* **MCP discovery from AWS Bedrock AgentCore**

  (AWS AGENT, ENHANCEMENT)</br>
  The AWS SaaS and on-premise agents can discover Model Context Protocol (MCP) services from an Amazon Bedrock AgentCore Gateway. The discovered MCP services are registered in Amplify Engage Service Registry. The MCP services can be published in the Engage Marketplace for consumption.

* **Automatic credential/application sync for APIM updates via CLI**

  (AXWAY API MANAGEMENT  DISCOVERY AGENT, ENHANCEMENT)</br>
  The Axway API Management Discovery Agent will maintain synchronization between the API Manager and existing Marketplace application/credentials if an API is updated with the APIM CLI.

### Marketplace updates for June 25, 2026

* **Custom plan type**

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Providers can now create plans with the new Custom plan type for offerings where pricing is negotiated externally. Custom plans disable all pricing fields (base price, setup price, currency) in the plan configuration and display "Custom" — rather than "Free" or a dollar amount — on all Marketplace surfaces including plan cards, detail pages, and subscription flows. Consumers can subscribe to Custom plans through the standard subscription and approval workflow without pricing-related blocks. Quotas on Custom plans are limited to Standard Quota, and billing integration is not triggered.

* **Expanded mTLS support**

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Marketplace now natively supports mTLS certificate-based credentials. Consumers upload a public certificate during credential creation, and the process validates format, expiration, and signing chain in real time with localized error messages. Parsed metadata (Subject DN, expiration, SHA-256 fingerprint) is displayed at upload and persisted in the credential detail view. Providers control whether self-signed certificates are accepted per environment. Certificate expiration automatically applies to the credential and integrates with the existing notification framework.

* **A2A service documentation support**

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  The Marketplace now displays service-level documentation for A2A (Agent-to-Agent) API services. Documentation attached to A2A resources appears on both the Resources tab of a Marketplace Product page consistent with existing documentation support for other service types.

  (PROVIDER EXPERIENCE, ENHANCEMENT, SERVICE REGISTRY)</br>
  The API Service wizard now includes a step to add service-level documentation for A2A (Agent-to-Agent) API services. Documentation attached to A2A resources will appear on API service documentation tab.

* **Resource State and Stage in Advanced Search**

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  The Marketplace Advanced Search Resources tab now displays State and Stage columns for each resource. These values are populated from the resource data and respect stage-level access controls — users only see stages they are authorized to view. Stage titles honor the Marketplace's selected language for internationalization.

* **Marketplace token endpoint for service account authentication**

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Marketplace now exposes a token endpoint (POST /api/v1/auth/token) that proxies client credential requests to the platform identity provider. Service accounts in consumer organizations can obtain access tokens using their Marketplace vanity URL rather than calling the identity provider directly. The endpoint accepts standard client_credentials grant requests, validates that the requesting service account belongs to a consumer org associated with that Marketplace (or the owning provider org), and returns a 403 if the credential does not match.

* **Endpoint URL copy-to-clipboard**

  (PROVIDER EXPERIENCE, ENHANCEMENT, SERVICE REGISTRY)</br>
  The endpoint URL on the Service Registry details page has a **Copy endpoint URL**  icon to  make it easier for a user to make a copy of the full endpoint URL.

### Marketplace bug fixes for June 25, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|             | APIGOV-32804 | **Issue**: Clicking on 'Sign out' does not revoke bearer token. <br/>**Resolution**: Revoke API is now invoked and not stalled, returning 204 (as expected). |
|             | APIGOV-32798 | **Issue**: Products filtering by type not available. <br/>**Resolution**: Updated the Type filter condition to show filter values based on resource types available in the Product list. |

## June 11, 2026

New enhancements and bug fixes for the June 11 update.

### Agent updates for June 11, 2026

* **Cross environment credential provisioning**

  (EDGEGATEWAYDISCOVERYAGENT, ENHANCEMENT)</br>
  The Agent SDK has been enhanced to support cross-environment Identity Provider (IDP) and credential management, enabling consistent handling of authentication across multiple dataplanes. This allows a single IDP to be reused across environments and gateways, improving interoperability and simplifying configuration.

### Agent bug fixes for June 11, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01834250 | APIGOV-32644 | **Issue**: The IBM (formerly Software AG) webMethods agent creates multiple asset resource versions. <br/>**Resolution**: A new webMethods configuration parameter (WEBMETHODS_GATEWAYHOST) was added to define the correct asset resource endpoint when the webMethods gateway is behind a load balancer.  |
| 01824682 | APIGOV-32421 | **Issue**: The IBM webMethods agent sets the tags used by the Webmethods gateway to retrieve APIs. <br/>**Resolution**: A new webMethods configuration parameter (CENTRAL_ROOTTAGSTOSTRIP) was added to removed the tag value.  |
| 01837772 | APIGOV-32679 | **Issue**: The IBM webMethods agent does not set the application-level authentication scopes. <br/>**Resolution**: A new webMethods configuration parameter (WEBMETHODS_ADDOAUTHSCOPES=true) was added to enable the valid setting of the authentication scope names.  |
| 01837253 | APIGOV-32664 | **Issue**: The APIM Discovery Agent creates multiple asset versions. <br/>**Resolution**: A fix was made to the APIM Discovery Agent.  |
| 01836131 | APIGOV-32682 | **Issue**: The Engage Service Registry **save** button prevents the user from saving edits to the endpoint for an API. <br/>**Resolution**: A fix was made to the Engage UI. |
|          | APIGOV-32627 | **Issue**: A document template cannot be used with an API service. <br/>**Resolution**: A fix was made to allow the use of a document template with an API service.  |

### Marketplace updates for June 11, 2026

* **Provider management of consumer organization resources**

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Engage Administrators in a provider organization can now create, update, and manage applications, subscriptions, and credentials within consumer organizations directly without requiring Platform Admin privileges. This enables migration workflows where existing v7 applications and credentials can be onboarded into consumer orgs so partners can continue using their existing access from Engage. Automation scripts running under a provider org account can also target consumer org contexts, supporting bulk migration and onboarding scenarios managed by the provider.

* **Service-level documentation**

  (PROVIDER EXPERIENCE, CONSUMER EXPERIENCE, ENHANCEMENT)</br>
  You can now add and manage documentation directly at the service level within Engage. This capability improves discoverability and understanding for users browsing resource definitions by providing clear context, guidance, and supporting information.

  Service-level documentation complements product-level documentation by focusing on the technical and resource-specific details, while product documentation continues to address the overall offering, business context, and consumption experience. Together, they provide a complete view.

* **Configurable credential expiry for Identity Providers (IdP)**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  You can now define a credential expiry time when creating a new Identity Provider (IdP) within Engage. This enhancement provides fine-grained control over credential expiration policies at the IdP level.

  **Key Capabilities**

    * **Configurable expiry at IdP level**
      When creating an IdP from the Topology → Identity Provider screen, users can now set a credential expiry time directly within the creation workflow.
  
    * **Override of environment-level settings**
      If a credential expiry time is defined at the IdP level, it will override any expiry configuration set at the environment level for credentials associated with that IdP.

### Marketplace bug fixes for June 11, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01832312 | APIGOV-32538| **Issue**: Product Status remains "PUBLISHED" after unpublishing a product from Marketplace. <br/>**Resolution**: Fixed by modifying product published status badge to determine publication to any Marketplace. |
| 01827893 | APIGOV-32444| **Issue**: Engage product changes not reflected in the Marketplace. <br/>**Resolution**: Instructions given to re-establish the link between provider-side product title/description and Marketplace product caused by no default language chosen for the Product. |
| 01757899 | APIGOV-31251| **Issue**: Marketplace - Resource Name not entirely displayed. <br/>**Resolution**: Fixed by adding a hover-over tooltip for resource title on the Marketplace Product > Product Details > Resources tab once the title is auto-truncated due to screen resolution/zoom. |
|          | APIGOV-32730| **Issue**: Customized homepage - Exposed configuration on consumer homepage for "Filtered by tag." <br/>**Resolution**: Fixed by hiding subtitle for product elements with Display Products set with "Products with specific tag" property. |
