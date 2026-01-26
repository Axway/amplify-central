---
title: Amplify Engage January 2026
linkTitle: Amplify Engage January
weight: 13
date: 2026-1-36
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## January 26, 2026

New bug fixes for the January 26 update.

### Marketplace bug fixes for January 26, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-31857 | **Issue**: The UI MCP Server Metadata version was too restrictive by supporting only the semantic version format. <br/>**Resolution**: The UI MCP Server Metadata version has been updated to accept any text value. |
| 01800615 | APIGOV-31863 | **Issue**: The UI MCP Tools output schema was a mandatory field. <br/>**Resolution**: The UI MCP Tools output schema has been updated to be an optional field. |
| 01800560 | APIGOV-31829 | **Issue**: The UI MCP Transports supported field was not being displayed after saving a selection. <br/>**Resolution**: The UI has been fixed to display the saved Transports Selected. |
| 01800613 | APIGOV-31831 | **Issue**: The UI MCP Clients display of the referenced document count was not increasing. <br/>**Resolution**: The UI has been fixed to accurately display the MCP Cliemt referenced document count. |

## January 23, 2026

New enhancements for the January 23 update.

### Marketplace updates for January 23, 2026

* **Improve Grid Pagination in Marketplace Product Screen**

  (CONSUMER EXPERIENCE, MARKETPLACE,ENHANCEMENT)</br>
  Enhanced Marketplace product grid, eliminating “fake endings” and improving visual clarity to help customers discover and evaluate products more easily

* **Standardize Provider Screen "+Add" Buttons**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
   Upgraded Provider "+ Add" button and header UIs per UX audit, boosting consistency across pages

* **Filter Subscriptions by Consumer Organization**

  (PROVIDER EXPERIENCE, MARKETPLACE, ENHANCEMENT)</br>
   Enhanced the Engage | Subscriptions screen with a new filter for consumer organizations to make information easier to find and navigate

* **Marketplace Navigation Language Change**

  (CONSUMER EXPERIENCE, MARKETPLACE,RESOLUTION)</br>
  Resolved navigation language change in Marketplace to function for all pages

* **API Key as a Query/Header in Marketplace**

  (PRODIVER EXPERIENCE, MARKETPLACE,ENHANCEMENT)</br>
  Updated credentials in the case where both the API Key as a header AND API Key as a query are present in the file to give the user the option to select which they want to test.

## January 16, 2026

New bug fixes for the January 16 update.

### Agent bug fix for January 16, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-31783 | **Issue**: The Mulesoft agent was not reporting minimum, maximum and average API response times to Businuess Insights. <br/>**Resolution**: All three API response times are now reported. |

### Marketplace bug fix for January 16, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-29432 | **Issue**: The **Next** button on the Engage UI was active after manually adding an API Service.  If there was an error in the API Specification, an error message was displayed but the active **Next** button allowed the user to continue. <br/>**Resolution**: The **Next** button is now disabled until the error in the API Specification is corrected. |

## January 12, 2026

New enhancements and bug fixes for the January 12 update.

### Agent update for January 12, 2026

* **Sensedia 4.x support**

  (NEW AGENT RELEASES)</br>
  The Sensedia agent discovery process has been improved for the Sensedia 4.x Static Token Authentication and data model support.

### Agent bug fix for January 12, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-31507 | **Issue**: The AWS on-premise and SaaS agents had a memory leak. <br/>**Resolution**: The memory leak has been fixed. |

### Marketplace updates for January 12, 2026

* **MCP Translated Service**

  (PROVIDER EXPERIENCE, MARKETPLACE,ENHANCEMENT)</br>
  The MCP service for Provider and Consumer shows in the language of the Marketplace.

* **Terms & Conditions translation warning**

  (PROVIDER EXPERIENCE, MARKETPLACE, ENHANCEMENT)</br>
   A check has been added for the product Terms & Conditions translation while publishing it to a Marketplace to inform the provider if it is missing.

### Marketplace bug fix for January 12, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 001771151 | APIGOV-31646 | **Issue**: In Product documents, topics are limited to 20. When more than 20 documents, some topics disappeared when displaying or editing. <br/>**Resolution**: A fix was implemented so more than 20 documents can be added without losing any. |
