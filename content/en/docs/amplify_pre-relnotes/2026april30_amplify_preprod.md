---
title: Amplify Engage April 30 2026
linkTitle: Amplify Engage April 30 2026
weight: 19
date: 2026-4-29
---

**Feedback Window**: April 30 2026 → May 7 2026 <br />
**Planned Production Date**: May 10 <br />
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

* **Title**

  (APIGEE X AGENT, ENHANCEMENT)</br>
  Description.

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-xxxxx | **Issue**: Description. <br/>**Resolution**: Description. |

## Marketplace updates

* **Credential Request Sideblade Enhancement**

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
     When a consumer submits a new credential request for an application, the Credential Request Submitted sideblade displays a list of existing resources associated with the same application that can reuse the newly requested credentials, helping consumers understand reuse opportunities. If no other resources exist, the section is hidden. Note the View credentials action continues provide access to the newly created credential’s metadata.

* **Asset Archiving Safeguards for Product Dependencies**

  (PROVIDER EXPERIENCE, RESOLUTION, ASSET CATALOG)</br>
    Archiving behavior has been updated to prevent assets that are actively referenced by products or product releases from entering an unrecoverable state or inform when an asset has already been archived. Assets used in product plans are now clearly identified as Non-Archivable, and archiving is blocked to avoid breaking plan configuration and updates. The archive confirmation dialog has been improved for clarity and consistency, with a unified experience for single and multi-select actions, including pagination and clear visibility into referenced products and versions. This ensures product plans remain manageable and prevents UI dead-ends caused by archived dependencies.

* **Partial API Exposure**

  (PROVIDER EXPERIENCE, ENHANCEMENT, ASSET CATALOG, MARKETPLACE)</br>
    The Asset create/edit experience has been enhanced to allow the Provider the option of partial exposure of the API service. This will enable the provider to expose a selected subset of the full API specification in the asset promoted to a product in the Mareketplace.
The asset create/edit wizard has a new step to **Configure Specification** where the Provider can select the option to **Manage Specification** and use the ellipsis for OAS2, OAS3, or Unstructured APIs.
This will display a sideblade with two options,

  - Upload New specification file
      This allows a new OAS2 or OAS3 specification file where a subset of API Methods or Endpoint URLs can be defined for exposure in the Asset/Product published to the Marketplace.  
  - Select Existing Operations
      This allows the search by Operation or Path within the full API specification then selection of a subset of methods for exposure in the Asset/Product published to the Marketplace.

NOTE: The exposure of a partial API specification does NOT alter the full API specificaiton in the Engage Service Registry.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01826485 | APIGOV-32437| **Issue**: Issue with the screen which shows list of accessible APIs <br/>**Resolution**: Fixed by adding a Status column to the grid to note status of the resources based on application status
| 01784733 | APIGOV-31611| **Issue**: Conflict Between Asset-Level and Product-Level Categories <br/>**Resolution**: Fixed collision issue between Asset and Product categories.
|            | APIGOV-32371| **Issue**: Tooltip display issue in small screen for credentials, date tooltip displays under "State" <br/>**Resolution**: Fixed display with horizontal scrollbar to show the tooltip appropriately.
|            | APIGOV-32434| **Issue**: Unable to create a release on small screen - sideblade of product is not scrollable <br/>**Resolution**: Fixed display with proper scrollbar to enable visibility of sideblade content
|            | APIGOV-32530| **Issue**: Marketplace UI: Improve keycloak login handler <br/>**Resolution**: Fixed so that if main authentication to grant auth token fails, it redirect the user back to login page
