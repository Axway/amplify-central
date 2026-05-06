---
title: Amplify Engage May 5 2026
linkTitle: Amplify Engage May 5 2026
weight: 19
date: 2026-4-29
---

**Feedback Window**: May 5 2026 → May 12 2026 <br />
**Planned Production Date**: May 14 <br />
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

* **IBM webMethods API discovery**

  (WEBMETHODS DISCOVERY AGENT, ENHANCEMENT)</br>
  The IBM webMethods Discovery Agent has been enhanced to use webMethods /search API to improve the performance of the API discovery process.

* **Mulesoft Agent: business unit and environment filters**

  (MULESOFT ANYPOINT AGENT, ENHANCEMENT)</br>
  The Mulesoft Anypoint Discovery Agent now supports business unit and environment filtering for discovery of API services. Only APIs that match the configured filters are discovered and displayed on the Engage *Environment Details* page, improving relevance and reducing unnecessary API processing.

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01827634 | APIGOV-32445 | **Issue**: When an API is added to a product and viewed in the Marketplace, the protection lock icon may not appear, which prevents credential requests and application registration.. <br/>**Resolution**: The APIM agent's credential request definition synchronization was fixed. |
|          | APIGOV-32465 | **Issue**: Even while the agent was running, its status could show as Unhealthy or Stopped. <br/>**Resolution**: The Engage platform's handling of the connection status was improved. |

## Marketplace updates

* **Credential reuse visibility during Credential Request submission**

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  When a consumer submits a new credential request for an application, the Credential Request Submitted side panel displays a list of existing resources associated with the same application that can reuse the newly requested credentials, helping consumers understand reuse opportunities. If no other resources exist, the section is hidden. Note that the View credentials action continues to provide access to the newly created credential’s metadata.

* **Asset archiving safeguards for product dependencies**

  (PROVIDER EXPERIENCE, RESOLUTION, ASSET CATALOG)</br>
  The archiving behavior has been updated to prevent assets that are actively referenced by products or product releases from entering an unrecoverable state or inform when an asset has already been archived. Assets used in product plans are now clearly identified as Non-Archivable, and archiving is blocked to avoid breaking plan configurations and updates. The archive confirmation dialog has been improved for clarity and consistency, with a unified experience for single and multi-select actions, including pagination and clear visibility into referenced products and versions. This ensures product plans remain manageable and prevents UI dead-ends caused by archived dependencies.

* **Partial API exposure**

  (PROVIDER EXPERIENCE, ENHANCEMENT, ASSET CATALOG, MARKETPLACE)</br>
  The Asset create/edit experience has been enhanced to allow the provider the option of partial exposure of the API service. This allows the provider to expose a selected subset of the full API specification in the asset promoted to a product in the Marketplace.

  The asset create/edit wizard has a new **Configure Specification** step where the provider can select the option to **Manage Specification** for OAS2, OAS3, or Unstructured APIs. This displays a side panel with two options:

    * **Upload New specification file** - This allows a new OAS2 or OAS3 specification file where a subset of API methods or endpoint URLs can be defined for exposure in the asset/product published to the Marketplace.  

    * **Select Existing Operations** - This allows the search by Operation or Path within the full API specification and the selection of a subset of methods for exposure in the asset/product published to the Marketplace.

  Note that the exposure of a partial API specification does NOT alter the full API specification in the Engage Service Registry.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01826485 | APIGOV-32437| **Issue**: Issue with the screen that shows list of accessible APIs. <br/>**Resolution**: A Status column has been added to the grid to note status of the resources based on application status. |
| 01784733 | APIGOV-31611| **Issue**: Conflict between asset-level and product-level categories. <br/>**Resolution**: The asset and product category conflict has been resolved. |
|          | APIGOV-32371| **Issue**: On small screens, the credentials date tooltip appears beneath "State." <br/>**Resolution**: A horizontal scrollbar has been added to ensure proper tooltip display. |
|           | APIGOV-32434| **Issue**: A release cannot be created on a small screen because the product's side panel does not allow scrolling. <br/>**Resolution**: Added scrollbar for improved side panel visibility. |
|           | APIGOV-32530| **Issue**: Marketplace UI: Improve Keycloak login handler. <br/>**Resolution**: Now, if main authentication fails to grant an auth token, users are redirected to the login page. |
