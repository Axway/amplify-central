---
title: Amplify Engage May 2025
linkTitle: Amplify Engage May
weight: 8
date: 2025-5-1
---
We work hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## May 2, 2025

New feature and enhancements for the May 2 update.

### Agents updates for May 2, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

* **APIM Discovery Agent: Credential Request Definitions for multiple Inbound Security Policies**
  
  (APIM DISCOVERY AGENT, ENHANCEMENT)</br>
  When an API is configured with multiple inbound security profiles in V7 API Management, the Discovery Agent will now automatically generate a distinct *Credential Request Definition* for each supported security profile. This enhanement ensures that all credential types associated with the API are exposed and selectable in the Marketplace.

### Agents bug fixes for May 2, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01713319 | APIGOV-30367 | **Issue**: All traceability agents were displayed with an unhealthy status while traffic metrics were not affected.   <br/>**Resolution**: A fix was made for handling an error while updating the traceability agent status. |
| 01702598 | APIGOV-30220 | **Issue**: The Kafka discovery agent encountered a 409 status error while updating an AccessRequestDefinition.   <br/>**Resolution**: Additional checks were made to only create/update the AccessRequestDefinition if changes are detected. |
|          | APIGOV-30267 | **Issue**: The Traceable agent conformance results were not reflected on the Engage WebUI.   <br/>**Resolution**: A fix was made to the handling of a null object returned from the Traceable conformance analysis API. |
|          | APIGOV-30293 | **Issue**: The discovery agent encountered a nil panic error when the agent discovers an OAS specification without a component property.   <br/>**Resolution**: A fix was made to the Agent SDK to prevent the nil panic error while processing the OAS specification. |
|          | APIGOV-30351 | **Issue**: The discovery agent may discover an API as a duplicate in some cases.   <br/>**Resolution**: A fix was made to the method of handling API duplicate detection. |
| 01691705 | APIGOV-29869 | **Issue**: The GitHub SaaS discovery agent was not able to discover API Services from a private repository.   <br/>**Resolution**: A fix was made to validate that the chosen repository is accessible and has the correct permissions during configuration. |

### Marketplace updates for May 2, 2025

* **Asset Request Definition Cleanup**
  
  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  An enhancement has been implemented to improve the configuration consistency in the Asset Catalog. When an *Access Request Definition* is deleted, the system will now automatically remove the corresponding *Asset Request Definition* - if one exists. This prevents orphaned configuration resources.

### Marketplace bug fixes for May 2, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01701322 | APIGOV-30079 | **Issue**: When user is not logged in to a public Marketplace, it is impossible to switch the language.<br/>**Resolution**: Now the language switcher works even when users are not logged in. |
