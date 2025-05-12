---
title: Amplify Engage May 2025
linkTitle: Amplify Engage May
weight: 8
date: 2025-5-1
---
We work hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## May 12, 2025

New enhancement for the May 12 update.

### Axway Engage CLI update for April 12, 2025

* **Introducing Axway Engage CLI**

  (NEW CLI RELEASES)</br>
  The latest version **[3.15.0](https://www.npmjs.com/package/@axway/axway-central-cli/v/3.14.0)** of the Axway Engage CLI is now available on NPM. This update includes:
    * The Axway Engage CLI now includes a new `productize` command, which automates the creation of an Asset and a Product for a given API Service. This allows you to use shell scripts to bulk-create assets and products for multiple API Services. A sample script demonstrating this process is available in the updated documentation here.  (Lisa to add link to the updated doc)
    * Starting with version 3.14.0, the Axway Central CLI supports commands for both 'Axway Central' and 'Axway Engage'.

* **Limit on API Services grouped under a single asset**

  (PROVIDER EXPERIENCE, ASSET CATALOG, ENHANCEMENT)</br>
  The Asset Catalog now enforces a maximum of **150 API Services** that can be grouped under a single asset. If your use case requires grouping more than 150 apis, consider creating multiple assets to organize them effectively.

## May 8, 2025

New enhancement for the May 8 update.

### Marketplace update for May 8, 2025

* **Improved Applications Details screen**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT)</br>
  The Application Details screen has been redesigned to display the information in a clearer, more organized way. The new layout contains two separate tabs: *Credentials* and *Resources*. The Request Credential experience has also been improved to better represent when a credential can be used with multiple resources. Refer to [View an application](/docs/manage_marketplace/consumer_experience/application_management#view-an-application)

## May 2, 2025

New features, enhancements, and bug fixes for the May 2 update.

### Agents updates for May 2, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

* **APIM Discovery Agent: Credential Request Definitions for multiple Inbound Security Policies**
  
  (APIM DISCOVERY AGENT, ENHANCEMENT)</br>
  When an API is configured with multiple inbound security profiles in v7 API Management, the Discovery Agent will now automatically generate a distinct *Credential Request Definition* for each supported security profile. This enhancement ensures that all credential types associated with the API are exposed and selectable in the Marketplace.

### Agents bug fixes for May 2, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01713319 | APIGOV-30367 | **Issue**: All Traceability Agents were displayed with an unhealthy status while traffic metrics were not affected. <br/>**Resolution**: Errors are now handled correctly while updating the Traceability Agent status. |
| 01702598 | APIGOV-30220 | **Issue**: The Kafka Discovery Agent encountered a 409 status error while updating an AccessRequestDefinition. <br/>**Resolution**: Additional checks now create/update the AccessRequestDefinition only when changes are detected. |
|          | APIGOV-30267 | **Issue**: The Traceable Agent conformance results were not reflected on the Engage WebUI. <br/>**Resolution**: Null objects returned from the Traceable conformance analysis API are now handled correctly. |
|          | APIGOV-30293 | **Issue**: The Discovery Agent encountered a nil panic error when the agent discovered an OAS specification without a component property. <br/>**Resolution**: The Agent SDK now prevents nil panic errors while processing the OAS specification. |
|          | APIGOV-30351 | **Issue**: The Discovery Agent may discover an API as a duplicate in some cases. <br/>**Resolution**: The method of handling API duplicate detection has been fixed. |
| 01691705 | APIGOV-29869 | **Issue**: The GitHub SaaS Discovery Agent was not able to discover API services from a private repository. <br/>**Resolution**: Repository accessibility and permissions are now validated during configuration. |

### Marketplace update for May 2, 2025

* **Asset Request Definition Cleanup**
  
  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  An enhancement has been implemented to improve the configuration consistency in the Asset Catalog. When an *Access Request Definition* is deleted, the system will now automatically remove the corresponding *Asset Request Definition*, if one exists. This prevents orphaned configuration resources.

### Marketplace bug fix for May 2, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01701322 | APIGOV-30079 | **Issue**: When a user is not logged in to a public Marketplace, the language cannot be switched.<br/>**Resolution**: Now, the language switcher works even when users are not logged in. |
