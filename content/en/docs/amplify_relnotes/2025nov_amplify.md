---
title: Amplify Engage November 2025
linkTitle: Amplify Engage November
weight: 4
date: 2025-11-5
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## November 24, 2025

New enhancements for the November 24 update.

### Marketplace updates for November 24, 2025

* **MCP server registration and discovery**

  (PROVIDER EXPERIENCE, CONSUMER EXPERIENCE, MARKETPLACE, NEW FEATURE)</br>
  We've extended the Engage capabilities with a new feature - you can now **register and publish MCP servers** just like any other assets. This new feature allows you to:

    * Manually add MCP servers to your Service Registry
    * View key MCP server metadata and definitions
    * Include MCP servers in your products
    * Make MCP capabilities discoverable to your consumers

## November 18, 2025

New enhancement and bug fixes for the November 18 update.

### Marketplace update for November 18, 2025

* **Subscription Marketplace origin**

  (CONSUMER EXPERIENCE, MARKETPLACE, ENHANCEMENT)</br>
  Subscription details are enhanced to show a new **Marketplace URL** field.

### Marketplace bug fixes for November 18, 2025

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01757618 | APIGOV-31229 | **Issue**: Application requester information changed after plan migration <br/>**Resolution**: The original user who requested now remains as the requester after migration. |
|          | APIGOV-30386 | **Issue**: Tooltip on the Applications selector for Application Registration is not correct <br/>**Resolution**: Tooltips updated as appropriate to remove confusing wording. |
|          | APIGOV-31543 | **Issue**: Auditor role does not follow pattern for IDP and Compliance details to hide actions <br/>**Resolution**: IDP and Compliance details pages updated to hide actions as appropriate. |

## November 14, 2025

New enhancements and bug fixes for the November 14 update.

### Agent updates for November 14, 2025

* **Akamai Compliance Agent**

  (AKAMAI API SECURITY AGENT)</br>
  The Akamai on-premise API Security Agent v1.0.0 has been released. It sends Managed API specifications from Engage to Akamai to execute Akamai Conformance Analysis. This improves the combined value of Engage and Akamai to more accurately identify endpoints with risks and shadow endpoints. The Conformance Analysis results are displayed on the *Engage Environment details* page.

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Agent bug fixes for November 14, 2025

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01770957 | APIGOV-31432 <br/>APIGOV-31546 | **Issue**: Agents deployed via a helm chart do not support password protected private keys. <br/>**Resolution**: The APIM helm chart has been enhanced to support password protected private keys. |
| 01769698 | APIGOV-31462 | **Issue**: The APIM agent could not create managed applications across two APIM gateways. <br/>**Resolution**: An APIM agent retry enhancement improves managed application creation. |

### Axway CLI updates for November 14, 2025

* **Updates to install agents command**

  (PROVIDER EXPERIENCE, AXWAY ENGAGE CLI, ENHANCEMENT)</br>
  The Axway Engage CLI (formerly Axway Central CLI) [**v4.8.0**](https://www.npmjs.com/package/@axway/axway-central-cli/v/4.8.0) has been updated to install the Akamai agents.

### Marketplace bug fixes for November 14, 2025

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01758442 | APIGOV-31234 | **Issue**: The Marketplace "Try-it-out" with mTLS was not enabled for two APIs in the same environment. <br/>**Resolution**: The mTLS setting on the credential request has been synchronized with the Marketplace. |

## November 7, 2025

New enhancements and bug fixes for the November 7 update.

### Agent updates for November 7, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Agent bug fixes for November 7, 2025

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01776739 | APIGOV-31513 | **Issue**: Traceability Agents using SDK version 1.1.127 or later were under reporting platform usage <br/>**Resolution**: A fix has been made in SKD version 1.1.131 and new agents have been released to repository.axway.com. |

### Marketplace updates for November 7, 2025

* **Credential visibility time**

  (CONSUMER EXPERIENCE, MARKETPLACE, ENHANCEMENT)</br>
  When a credential is still visible from the Marketplace, the remaining time is now clearly displayed and the  expiration time is also available. When the credential is not visible from the Marketplace, a message is displayed.

* **Auditor role**

  (PROVIDER EXPERIENCE, MARKETPLACE, ENHANCEMENT)</br>
  A new platform role **Auditor** is available. This role has read-only permissions and can view any screen in the Engage UI. This user does not need to be part of any team.

* **Product Terms and Conditions**

  (PROVIDER EXPERIENCE, CONSUMER EXPERIENCE, MARKETPLACE, ENHANCEMENT)</br>
  A Catalog Manager can now add Terms and Conditions to their product. Once the Terms and Conditions is added and the product is published to a Marketplace, any consumer subscribing to the product must accept the product Terms and Conditions.

### Marketplace bug fixes for November 7, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01774432 | APIGOV-31503 | **Issue**: Create button remained enabled after switching conditional fields in the Marketplace CRD form <br/>**Resolution**: The validation of conditional schemas (ARD, CRD, Subscription additional information) has been fixed. |
| 01764879 | APIGOV-31371 | **Issue**: Markdown article: table is overlapping with TOC (Table of Contents) <br/>**Resolution**: A collapsible Table of Contents has been added to markdown articles. |
