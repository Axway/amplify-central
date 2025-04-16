---
title: Amplify Engage April 2025
linkTitle: Amplify Engage April
weight: 9
date: 2025-3-31
---
We work hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## April 16, 2025

New enhancement for the April 16 update.

### Marketplace updates for April 16 2025

* **Download resource in JSON or YAML format**

  (CONSUMER EXPERIENCE, ENHANCEMENT)</br>
  It is now possible to download a product resource Open API specification in its original format or in a converted format. Supported formats are JSON or YAML. If the resource is not an Open API specification, then only its original format can be downloaded.

## April 9, 2025

New features, enhancements, and bug fixes for the April 9 update.

### Agents updates for April 9, 2025

* **On-demand transaction sampling**
  
  (TRACEABILITY AGENTS, ENHANCEMENT)</br>
  As of April 9, 2025, all new versions of on-premise and SaaS Traceability Agents support on-demand transaction sampling initiated directly from Engage (*Topology > Environments > Agents*). This enhancement replaces the previous percentage-based sampling approach for all agents released after this date. When activated, on-demand sampling captures all transactions, including API errors, for a period of up to five minutes. While full transaction details are collected during this period, high-level metrics, such as success and error counts, continue to be displayed on the *API Health* page. For deeper analysis, we recommend using your API Gateway’s native tools. Refer to refer to [April 9 2025 Release Notes](/docs/amplify_relnotes) to find the agent versions that support on-demand transaction sampling.

* **Traceable API Security - Conformance Analysis support**
  
  (TRACEABLE API SECURITY AGENT, ENHANCEMENT)</br>
  The Traceable on-premise API Security Agent sends Managed API specifications from Engage to Traceable in order to execute Traceable Conformance Analysis. This improves the combined value of Engage and Traceable to more accurately identify endpoints with risks, shadow endpoints, and orphan endpoints. The Conformance Analysis results are displayed on the *Engage Environment details* page. The update is included in Traceable API Security Agent version **2.0.0 and later**.

* **Kong Enterprise - Workspace support**
  
  (KONG DISCOVERY AGENT, ENHANCEMENT)</br>
  The Kong Discovery Agent can now disover API services from one or more Kong Enterprise workspaces. The update is included in Kong Discovery Agent version **1.1.17 and later**.

* **External handling of Access Request Definition**
  
  (APIM DISCOVERY AGENT, ENHANCEMENT)</br>
  The Axway API Manager Discovery Agent now allows the enabling/disabling of Access Request Definition provisioning.  When disabled, this allows a customer to customize the handling of an Access Request Definition flow. The update is included in APIM Discovery Agent version **1.2.21 and later**.

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Agents bug fixes for April 9, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01622539 | APIGOV-28510 | **Issue**: The APIM Discovery Agent does not rediscover SOAP APIs with missing Credential Request Defintions at startup. <br/>**Resolution**: The APIM Discovery Agent now automatically discovers the Credential Request Definitions that were missing from SOAP APIs at startup. This fix is available in APIM Discovery Agent version **v1.2.21.**|
| | APIGOV-30134 | **Issue**: The Apigee X Traceability Agent has a possible run-time error. <br/>**Resolution**: The possible run-time error was fixed in the Apigee X Traceability Agent. The fix is available in Apigee X Traceability Agent version **v1.4.5.**|
| 01701325 | APIGOV-30080 | **Issue**: The APIM Discovery and Traceability agents do not display their statuses correctly on the Engage WebUI when the agent name contains a period (e.g., agent.name.x ). <br/>**Resolution**: The agent now reports statuses correctly. This fix is available in APIM Discovery Agent version **v1.2.21** and Traceability Agent **v1.2.18.**|
| 01658556 | APIGOV-29326 | **Issue**: The APIM Discovery Agent method of handling quota enforcement during a plan migration would result in downtime. <br/>**Resolution**: The APIM Discovery Agent can now handle a plan migration with zero downtime. The fix is available in APIM Discovery Agent version **v1.2.21**|
| | APIGOV-30186 | **Issue**: The APIM Discovery Agent handling of GraphQL APIs with inbound security would not link to the correct Credential Request Definition. <br/>**Resolution**: The APIM Discovery Agent can now link GraphQL APIs with the correct Credential Request Definition. The fix is available in APIM Discovery Agent version **v1.2.21**|

## April 4, 2025

New enhancement and bug fixes for the April 4 update.

### Marketplace updates for April 4, 2025

* **Stage name displayed alongside a resource in the Marketplace**

  (CONSUMER EXPERIENCE, ENHANCEMENT)</br>
  The stage name is now displayed alongside the resource name on the *Application* page, *Credential details* page, and others. This allows users to identify the environments they are working with.

### Marketplace bug fixes for April 4, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01702862, 01702555 | APIGOV-30111 | **Issue**: Engage login redirect is not working properly <br/>**Resolution**:  The *Marketplace Home* page now loads after the user logs in. |
| | APIGOV-29992 | **Issue**: Subscription and Application registration filtering by product is lost when viewing details <br/>**Resolution**: When using the **Register** or **Subscribe** button from the *Product* page, the product filter is automatically applied and visible when viewing Subscription and Application registration details. |
| 01647567 | APIGOV-29079 | **Issue**: Provider can delete a credential that is used with more than one API that they do not have access rights on <br/>**Resolution**: Upon deletion, the user is informed when the API is used with multiple APIs to determine the impact of their action. |
| 01635852 | APIGOV-28795 | **Issue**: Plan details - Full resource name not visible in the Resources table <br/>**Resolution**: The table now shows the full resource name. |
| | APIGOV-27810 | **Issue**: [Marketplace Web] Marketplace search does not have a max limit on the keyword size <br/>**Resolution**: The search keyword size is now limited to a maximum of 1000 characters.|

## April 3, 2025

New enhancement for the April 3 update.

### Axway Central CLI updates for April 3, 2025

* **Introducing Axway Central CLI version 3.13.0**

  The latest version **3.13.0** of the Axway Central CLI is now available on NPM. This update includes:
  
    * **Support for the installation of the Traceable API Security Agent in the supported regions**
