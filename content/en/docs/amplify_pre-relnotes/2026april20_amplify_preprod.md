---
title: Amplify Engage April 20 2026
linkTitle: Amplify Engage April 20 2026
weight: 20
date: 2026-4-8
---

**Feedback Window**: April 20 2026 → April 27 2026 <br />
**Planned Production Date**: April 30 <br />
**Environment**: Pre-production

---

This preproduction environment allows you to test and validate upcoming features, enhancements, and bug fixes before they are promoted to production.

Please note that, depending on the nature of the feedback and the timing of its submission, it may not be incorporated into the upcoming production release.

See [Provide testing feedback](/docs/amplify_pre-relnotes/#provide-testing-feedback) for instructions on submitting preprod testing feedback.

---

## Supported agents

To access the **pre‑prod environment**, you must set the following **Agent environment variables**, depending on the region you are connecting to.

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

| Environment type                           | Latest on-premise agent version <br />(based on Amplify Agents SDK 1.1.137 <br />unless otherwise noted) |
|--------------------------------------------|--------------------------|
| Axway API Management 7.7                   | DA=1.2.54 / TA=1.2.45    |
| AWS Gateway using SDK 2.0                  | DA=1.2.42 / TA=1.2.42    |
| Azure latest release                       | DA=1.3.43 / TA=1.3.43    |
| Istio 1.9.5                                | DA=1.1.41 / TA=2.1.38    |
| Apigee Edge                                | 1.0.36                   |
| Apigee X                                   | 1.4.29                   |
| Mulesoft Anypoint platform v3              | 1.2.43                   |
| IBM webMethods                             | 1.0.34                   |
| Kong Gateway                               | 1.1.39                   |
| GitLab                                     | 1.1.39                   |
| Kafka Cluster                              | 1.1.32                   |
| IBM API Connect Gateway                    | 1.1.33                   |
| Backstage                                  | 1.0.35                   |
| SAP Integration Suite - API Management / API Portal | 1.0.21          |
| WSO2 API Manager 4.5.0                     | 1.0.21                   |
| Sensedia                                   | 1.0.11                   |

| Supported SaaS (embedded) agents           |
|--------------------------------------------|
| AWS Embedded Service                       |
| Apigee X Embedded Service                  |
| GitHub Embedded Service                    |
| Azure Embedded Service                     |
| SwaggerHub Embedded Service                |
| Traceable Embedded API Security Service    |
| Akamai Embedded API Security Service       |

| Runtime Compliance agents                  | Latest on-premise agent version <br />(based on Amplify Agents SDK 1.1.137 unless otherwise noted)  |
|--------------------------------------------|--------------------------|
| Graylog API Security                       | 1.1.32                   |
| Traceable API Security                     | 2.0.18                   |
| Akamai API Security                        | 1.1.6                    |

## Agent updates

* **Apigee X: Endpoints discovered from the API spec file**

  (APIGEE X AGENT, ENHANCEMENT)</br>
  The Apigee X discovery agent has been enhanced to discover the Endpoint URL from the server field in associated API specification file.  If no server field is found in the API Specification file, an endpoint constructed from the Proxy details will be used.

* **Mulesoft Agent: business unit and environment filters**

  (MULESOFT ANYPOINT AGENT, ENHANCEMENT)</br>
  The Mulesoft Anypoint Discovery Agent now supports business unit and environment filtering for discovery of API services. Only APIs that match the configured filters are discovered and displayed on the Engage Environment Details page, improving relevance and reducing unnecessary API processing.

* **Azure Agent support for new Entra ID URI format**

  (AZURE AGENT, ENHANCEMENT)</br>
  The Azure agent has been enhanced to support the updated Microsoft Entra ID URI format. TURI validation now aligns with Entra ID restriction policy requirements, ensuring identifier URIs include the application’s client ID, a verified domain, or tenant ID(s). For details, see the Microsoft documentation on the [Entra ID format](https://learn.microsoft.com/en-us/entra/identity-platform/reference-app-manifest#identifieruris-attribute).

* **Azure Agent: permissions update**

  (AZURE AGENT, ENHANCEMENT)</br>
  The Azure agent now supports **Application.ReadWrite.OwnedBy** and **ServicePrincipal.ReadWrite.OwnedBy** Microsoft Graph permissions, reducing the required scope to only manage resources the agent creates. Customers with existing **.All** permissions are unaffected and no configuration changes are required.

* **IBM webMethods: rate limiting support**

  (WEBMETHODS AGENT, ENHANCEMENT)</br>
  The IBM (formerly Software AG) webMethods discovery and traceability agents have been enhanced to support rate limitng of API requests to the webMethods platform. Rate limiting can be configured using the **WEBMETHODS_RATELIMIT** environment variable to help manage request volume.

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  See the table above for the latest versions of all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32406 | **Issue**: The Azure on-premise traceability agent was not reporting information to Consumer Insights and Business Insights -> Application screens. <br/>**Resolution**: A fix was made to display the information on both Consumer Insighnts and Business Insights. |
|          | APIGOV-32441 | **Issue**: The APIM Discovery agent would not detect the first deleted API Proxy as "Out of Sync". <br/>**Resolution**: A fix was made to detect the "Out of Sync" status of the first deleted API. |

## Marketplace updates

* **Marketplace Sign-In button customization**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Marketplace owners can now fully **manage and style the Sign In** button as a standard navigation bar item. The Sign In control follows the same configuration model as other built‑in navigation items, including consistent visibility and labeling management. In addition, marketplaces can present distinct Sign In actions with different emphasis (for example, primary versus secondary), enabling clearer authentication entry points and more intentional user journeys.

* **Custom sender email address for Marketplace notifications**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Admins can now customize the “From” email address for Marketplace‑triggered emails such as subscription approvals, Consumer Org registrations, credential expiry notifications etc. This ensures a consistent, branded experience, improves partner trust, and reduces the risk of emails being flagged as spam.

  **How to configure**

    * Navigate to Marketplace -> Settings -> SMTP
    * Enable use of a custom SMTP service
    * In the **Sender** section, enter the email address that will be used as the sender using your organization’s domain and the display **name**
    * In the **Connection Settings** section, provide your SMTP server details
    * Save your changes
    * Once configured, all Marketplace‑triggered emails will use the updated sender address.
  
## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32414| **Issue**: Tooltip on Marketplace Product Warning Icon is not visible <br/>**Resolution**: Fixed display issue to show the warning icon.|
|          | APIGOV-32294| **Issue**: Consumer Org User with Consumer role on x-private team cannot subscribe to free plans <br/>**Resolution**: Consumer role for x-private team fixed to allow subscription to free plans.|
|          | APIGOV-32300| **Issue**: Featured Categories limit reached panel is not visible<br/>**Resolution**: Fixed the UI so that the limit reached panel is now visible.|
|          | APIGOV-32355 | **Issue**: Users were not able to run a compliance linting job for a specific API in the Service Registry. <br/>**Resolution**: A fix was made to allow users with permissions (Engage Admin) to run a compliance linting job from the Service Registry. |
