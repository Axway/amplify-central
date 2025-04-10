---
title: Amplify Engage April 2025
linkTitle: Amplify Engage April
weight: 9
date: 2025-3-31
---
We work hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## April 9, 2025

New features, enhancements, and bug fixes for the March 21 update.

### Agents updates for April 9, 2025

* **Traceable API Security - Conformance Analysis support**
  
  (TRACEABLE API SECURITY AGENT, ENHANCEMENT)</br>
  The Traceable on-premise API Seccurity Agent uploads Managed API specifications from Engage to Traceable in order to execute Traceable conformance analysis. This improves the combined value of Engage and Traceable to more accurately identify endpoints with risks, shadow endpoints, and orphan endpoints.  The conformance analysis results are displayed on the Engage Environment details. The update is included in Traceable API Security Agent version 2.0.0 and later. 

* **Kong Enterprise - Workspace support**
  (KONG DISCOVERY AGENT, ENHANCEMENT)</br>
  The Kong Discovery Agent can disover API Services from one or more Kong Enterprise workspaces. The update is included in Kong Discovery Agent version 1.1.17 and later.

* **External Handling of Access Request Definition**
  (APIM DISCOVERY AGENT, ENHANCEMENT)</br>
  The Axway API Manager Discovery Agent now allows the enabling/disabling of Access Request Definition provisioning.  When disabled, this allows a customer to customize the handling of an Access Request Definition flow. The update is included in APIM Discovery Agent version 1.2.21 and later.

* **All Traceability Agents - Transaction Sampling**
  (TRACEABILITY AGENTS, ENHANCEMENT)</br>
  All on-premise and SaaS Traceability Agents have been updated for on demand Transaction Sampling initiated from the Engage UI (Topology -> Environments -> Agents). Once initiated from the Engage UI, all trasactions including API errors will be sampled for up to five minutes. The count of API successes or error will still be registered on the API Health screen and we recommend the use of the API Gateway tools to further analyze the transactions. The update is included in all Traceability Agents released after April 7, 2025.
      
* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Agents bug fixes for Aprill 9, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| |APIGOV-xxxx | **Issue**: Description <br/>**Resolution**: Description. |

### Marketplace updates for April 4, 2025

* **Stage name visible everywhere a resource is visible**

  (CONSUMER EXPERIENCE, ENHANCEMENT)</br>
  All the screen presenting the product resource are now showing the Stage name if one is assigned to the resource.

### Marketplace bug fixes for April 4, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01702862, 01702555 | APIGOV-30111 | **Issue**: Engage Login redirect not working properly <br/>**Resolution**:  A previous fix prevented to load correctly the Marketplace home page. The fix has been reverted. |
| | APIGOV-29992 | **Issue**: Subscription and App registration filtering by product is lost when viewing details <br/>**Resolution**: When using the register or subscribed button from product page, automatically the product filter is applied and stays applied event when viewing subscription or application registration details. |
| 01647567 | APIGOV-29079 | **Issue**: Provider can delete credential used to consume multiple APIs <br/>**Resolution**: Now, provider is informed when some credentials are not visible to him so that he can decide to delete or not the credentials |
| 01635852 | APIGOV-28795 | **Issue**: Plan details - resources table cut of in case of long names <br/>**Resolution**: table size has been reworked to show the entire values. |
| | APIGOV-27810 | **Issue**: [Marketplace Web] The search input max characters should be limited <br/>**Resolution**: Add validation on search input field to prevent to enter more than 1000 characters. |

### Axway Central CLI updates for April 3, 2025

* **Introducing Axway Central CLI version 3.13.0**

  The latest version **3.13.0** of the Axway Central CLI is now available on NPM.  This update includes:
    * Support for the installation of the Traceable API Security Agent in the supported regions.
