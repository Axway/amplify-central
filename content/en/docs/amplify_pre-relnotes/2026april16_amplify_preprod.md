---
title: Amplify Engage April 16 2026
linkTitle: Amplify Engage April 16 2026
weight: 20
date: 2026-4-8
---

**Feedback Window**: April 16 2026 → April 24 2026 <br />
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
| Axway API Management 7.7                   | DA=1.2.53 / TA=1.2.44  TBD  |
| AWS Gateway using SDK 2.0                  | DA=1.2.42 / TA=1.2.42    |
| Azure latest release                       | DA=1.3.42 / TA=1.3.42  TBD  |
| Istio 1.9.5                                | DA=1.1.41 / TA=2.1.38    |
| Apigee Edge                                | 1.0.36                   |
| Apigee X                                   | 1.4.27                 TBD  |
| Mulesoft Anypoint platform v3              | 1.2.42                 TBD  |
| IBM webMethods                             | 1.0.33                 TBD  |
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

* **Apigee X Endpoint Discovery**

  (APIGEE X AGENT, ENHANCEMENT)</br>
  The Apigee X discovery agent has been enhanced to discover the Endpoint URL from the server field in associated API specification file.  If no server field is found in the API Specification file, an endpoint constructed from the Proxy details will be used.

* **Anypoint Agent: Discovery with business unit and enviroment filters**

  (MULESOFT ANYPOINT AGENT, ENHANCEMENT)</br>
  The Mulesoft Anypoint discovery Agent has been enhanced with the ability to define business units and environment filters to the discovery API services. Only the API services which pass the filters will be included for display on the Engage Environment details page.

* **Azure Agent: Entra ID URI format update**

  (AZURE AGENT, ENHANCEMENT)</br>
  The Azure agent has been enhanced to support the new Entra ID URI format.  The Microsoft Entra ID URI restriction policy format rules have been updated to state that it **must contain the app's client ID, a verified domain, or the tenant IDs**.  Refer to [Entra ID format](https://learn.microsoft.com/en-us/entra/identity-platform/reference-app-manifest#identifieruris-attribute).

* **Azure Agent: permissions update**

  (AZURE AGENT, ENHANCEMENT)</br>
  The Azure agent now supports **Application.ReadWrite.OwnedBy** and **ServicePrincipal.ReadWrite.OwnedBy** Microsoft Graph permissions, reducing the required scope to only manage resources the agent creates. Customers with existing **.All** permissions are unaffected and no configuration changes are required.

* **IBM webMethods: rate limiting**

  (WEBMETHODS AGENT, ENHANCEMENT)</br>
  The IBM (formerly Software AG) webMethods agents, discovery and traceability, have been enhanced to support rate limitng of the API requests to the webMethods platform with a WEBMETHODS_RATELIMIT environment variable setting. 

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  See the table above for the latest versions of all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32406 | **Issue**: The Azure on-premise traceability agent was not reporting information to Consumer Insights and Business Insights -> Application screens. <br/>**Resolution**: A fix was made to display the information on both Consumer Insighnts and Business Insights. |
|          | APIGOV-32441 | **Issue**: The APIM Discovery agent would not detect the first deleted API Proxy as "Out of Sync". <br/>**Resolution**: A fix was made to detect the "Out of Sync" status of the first detleted API. |

## Marketplace updates

* **Marketplace Sign In Button Customization**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
     Marketplace owners can now fully manage and style the Sign In button as a standard navigation bar item. The Sign In control follows the same configuration model as other built‑in navigation items, including consistent visibility and labeling management. In addition, marketplaces can present distinct Sign In actions with different emphasis (for example, primary versus secondary), enabling clearer authentication entry points and more intentional user journeys.
  
## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|            | APIGOV-32414| **Issue**: Tooltip on Marketplace Product Warning Icon is not visible <br/>**Resolution**: Fixed display issue to show the warning icon.
|           | APIGOV-32294| **Issue**: Consumer Org User with Consumer role on x-private team cannot subscribe to free plans <br/>**Resolution**: Consumer role for x-private team fixed to allow subscription to free plans.
|           | APIGOV-32300| **Issue**: Featured Categories limit reached panel is not visible<br/>**Resolution**: Fixed the UI so that the limit reached panel is now visible.
