---
title: Amplify Engage May 14 2026
linkTitle: Amplify Engage May 14 2026
weight: 18
date: 2026-5-12
---

**Feedback Window**: May 15 2026 → May 22 2026 <br />
**Planned Production Date**: May 28 <br />
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

Search for the latest preproduction agent builds at <https://repository.axway.com/>. If you don't see a **PVW** version for a particular agent, it means that agent hasn't been updated for this preproduction release.  

## Agent updates

* **APIM enhancement: Improved API Instance validation handling**

  (EdgeGatewayDiscoveryAgent, ENHANCEMENT)</br>
  Enhanced the instance validation logic to prevent incorrect sync statuses in Amplify Engage when Axway API Manager is temporarily unreachable (e.g. due to invalid credentials or network issues).

* **SoftwareAG webMethods enhancement: Optimized Traceability Agent API request efficiency**

  (SOFTWAREAG WEBMETHODS, ENHANCEMENT)</br>
  Improved the performance and stability of the WebMethods Traceability Agent by optimizing API request patterns and reducing the volume of data retrieved from the WebMethods platform. These enhancements help prevent potential crashes and have been validated to ensure no increase in 429 errors.

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01824665 | APIGOV-32378 | **Issue**: Logical name when deleting Service from Environment page. <br/>**Resolution**: Delete pop-up modal now display the Service Name Friendly Title, instead of the logical name. |
| 01833661 | APIGOV-32578 | **Issue**: Mulesoft v1.2.43 keeps restarting. <br/>**Resolution**: Standardized rate limiting configuration in MuleSoft by implementing a single, consistent rate limiter across all business unit clients. |
| 01836077 | APIGOV-32650 | **Issue**: Environment name not fully displayed when adding a resource during asset creation . <br/>**Resolution**: Display full name in a hoverover tooltip. |
|          | APIGOV-32658 | **Issue**: Sensedia - API Traceability transactions are not being given application context. <br/>**Resolution**:  Consumer Insights Dashboards are now showing data.|
|          | APIGOV-32655 | **Issue**: Agents Controller - handling of retracted versions when it is also latest. <br/>**Resolution**: A fix was introduced to properly handle latest retraced version. |
|          | APIGOV-32438 | **Issue**: UI - block ability to add a manual API/MCP service to all agent managed environments. <br/>**Resolution**: UI now enforces validation in the Manually Add wizard, allowing users to proceed only when the selected environment is configured for "Manual Sync."|
|          | APIGOV-32628 | **Issue**: Asset Wizard - Configure specification stage column is empty. <br/>**Resolution**: The endpoint stage is correctly displayed on the Configure Specification page of the asset wizard.  |

## Marketplace updates

* **AI Agent Registration and Discovery**

  (PROVIDER EXPERIENCE, CONSUMER EXPERIENCE, NEW FEATURE)</br>
  Amplify Engage now supports the registration and discovery of **AI Agents**, alongside other API and MCP resource types. Providers can now easily register AI Agents in the Service Registry by importing an **Agent Card**. A guided wizard automatically extracts and populates key service metadata, significantly reducing manual data entry.
Once registered, the AI Agent can be seamlessly published to the Marketplace using the standard **Asset → Product** publication flow. Enhanced filtering by AI Agent (A2A) type in Marketplace Products further improves discoverability, reducing time spent searching and accelerating integration.

* **Enhanced Analytics Context for Access Requests**

  (ANALYTICS, ENHANCEMENT, ENGAGE)</br>
  To improve analytics accuracy and reduce dependency on additional API Server calls, ownership information is now included in Marketplace references within Access Requests. This enhancement enables agents to automatically enrich metric and transaction events with the appropriate context, resulting in more efficient and meaningful analytics reporting.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01827557 | APIGOV-32559| **Issue**: 503 Admission error when linking/unlinking asset in draft product <br/>**Resolution**: Fixed by increasing timeout during asset linking/unlinking |
| 01835429 | APIGOV-32649| **Issue**: Adding/Editing a plan in Engage doesn't fetch all resources <br/>**Resolution**: Fixed by updating to show the resources of more than 20 Assets in the quota resource selector |
|          | APIGOV-32589| **Issue**: API Server failed to process ResourceEntryDeleted event for a CRD that had 42k soft references <br/>**Resolution**: Increased the memory to 1.5GBs and set the relay notifier timeout to 5 minutes |
|          | APIGOV-32471| **Issue**: Product documentation does not render if the spec.sections.articles do not have a title set <br/>**Resolution**: The fix was to take into account the logical name (which is always mandatory) in case the title is missing on a document |
