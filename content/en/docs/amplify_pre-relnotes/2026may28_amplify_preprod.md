---
title: Amplify Engage May 28 2026
linkTitle: Amplify Engage May 28 2026
weight: 17
date: 2026-5-26
---

**Feedback Window**: May 28 2026 → June 4 2026 <br />
**Planned Production Date**: June 11 <br />
**Environment**: Pre-production

---

This preproduction environment allows you to test and validate upcoming features, enhancements, and bug fixes before they are promoted to production.

Please note that, depending on the nature of the feedback and the timing of its submission, it may not be incorporated into the upcoming production release.

See [Provide testing feedback](/docs/amplify_pre-relnotes/#provide-testing-feedback) for instructions on submitting preprod testing feedback.

---

## Supported agents

To access the **pre‑prod environment**, you must set the following **Agent environment variables**, depending on the region you are connecting to. Preview agents must only be used with the Amplify Engage pre-prod environment.

### Pre-prod US Region

CENTRAL_AUTH_URL=<https://login.na-us.axwaypreprod.net/auth></br>
CENTRAL_PLATFORMURL=<https://platform.na-us.axwaypreprod.net></br>
CENTRAL_URL=<https://engage.na-us.axwaypreprod.net></br>
CENTRAL_DEPLOYMENT=preprod (# TA only)</br>
TRACEABILITY_HOST=phoenix.na-us.axwaypreprod.net:443 (# TA only)</br>
TRACEABILITY_PROTOCOL=https (# TA only)

### Pre-prod EU Region

CENTRAL_AUTH_URL=<https://login.na-us.axwaypreprod.net/auth></br>
CENTRAL_PLATFORMURL=<https://platform.na-us.axwaypreprod.net></br>
CENTRAL_URL=<https://engage.eu-fr.axwaypreprod.net></br>
CENTRAL_DEPLOYMENT=preprod (# TA only)</br>
TRACEABILITY_HOST=phoenix.eu-fr.axwaypreprod.net:443 (# TA only)</br>
TRACEABILITY_PROTOCOL=https (# TA only)

### Supported agent versions

Search for the latest preproduction agent builds at <https://repository.axway.com/>. If you don't see a **PVW** version for a particular agent, it means that agent hasn't been updated for this preproduction release.  

## Agent updates

* **Cross environment credential provisioning**

  (EDGEGATEWAYDISCOVERYAGENT, ENHANCEMENT)</br>
  The Agent SDK has been enhanced to support cross-environment Identity Provider (IDP) and credential management, enabling consistent handling of authentication across multiple dataplanes. This allows a single IDP to be reused across environments and gateways, improving interoperability and simplifying configuration.

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01834250 | APIGOV-32644 | **Issue**: The IBM (formerly Software AG) webMethods agent creates multiple asset resource versions. <br/>**Resolution**: A new webMethods configuration parameter (WEBMETHODS_GATEWAYHOST) was added to define the correct asset resource endpoint when the webMethods gateway is behind a load balancer.  |
| 01824682 | APIGOV-32421 | **Issue**: The IBM webMethods agent sets the tags used by the Webmethods gateway to retrieve APIs. <br/>**Resolution**: A new webMethods configuration parameter (CENTRAL_ROOTTAGSTOSTRIP) was added to removed the tag value.  |
| 01837772 | APIGOV-32679 | **Issue**: The IBM webMethods agent does not set the application-level authentication scopes. <br/>**Resolution**: A new webMethods configuration parameter (WEBMETHODS_ADDOAUTHSCOPES=true) was added to enable the valid setting of the authentication scope names.  |
| 01837253 | APIGOV-32664 | **Issue**: The APIM Discovery Agent creates multiple asset versions. <br/>**Resolution**: A fix was made to the APIM Discovery Agent.  |
| 01836131 | APIGOV-32682 | **Issue**: The Engage Service Registry **save** button prevents the user from saving edits to the endpoint for an API. <br/>**Resolution**: A fix was made to the Engage UI. |
|          | APIGOV-32627 | **Issue**: A document template cannot be used with an API service. <br/>**Resolution**: A fix was made to allow the use of a document template with an API service.  |

## Marketplace updates

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

### Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01832312 | APIGOV-32538| **Issue**: Product Status remains "PUBLISHED" after unpublishing a product from Marketplace. <br/>**Resolution**: Fixed by modifying product published status badge to determine publication to any Marketplace. |
| 01827893 | APIGOV-32444| **Issue**: Engage product changes not reflected in the Marketplace. <br/>**Resolution**: Instructions given to re-establish the link between provider-side product title/description and Marketplace product caused by no default language chosen for the Product. |
| 01757899 | APIGOV-31251| **Issue**: Marketplace - Resource Name not entirely displayed. <br/>**Resolution**: Fixed by adding a hover-over tooltip for resource title on the Marketplace Product > Product Details > Resources tab once the title is auto-truncated due to screen resolution/zoom. |
|          | APIGOV-32730| **Issue**: Customized homepage - Exposed configuration on consumer homepage for "Filtered by tag." <br/>**Resolution**: Fixed by hiding subtitle for product elements with Display Products set with "Products with specific tag" property. |
