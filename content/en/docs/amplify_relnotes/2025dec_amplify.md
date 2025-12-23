---
title: Amplify Engage December 2025
linkTitle: Amplify Engage December
weight: 3
date: 2025-12-3
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## December 12, 2025

New enhancements and bug fixes for the December 12 update.

### Agent updates for December 12, 2025

* **Mulesoft External IdP support**

  (NEW AGENT RELEASES)</br>
  The Mulesoft Discovery Agent has been enhanced to support OAuth with an external Identity Provider that supports OpenID Dynamic Client Registration protocol.

* **Sensedia Static Token Authentication support**

  (NEW AGENT RELEASES)</br>
  The Sensedia Discovery Agent has been enhanced to support a **Static Token Authentication** method.

* **APIM Error Transaction Sampling**

  (NEW AGENT RELEASES)</br>
  The APIM Traceability Agent has been enhanced to support Continuous Error Transaction Sampling.
  The Error Transaction Sampling must be enabled by setting the Traceability Agent environment variable (CENTRAL_ERRORSAMPLINGENABLED=true).
  Once enabled, this will automatically capture the **first observed error** for each API/Application pair within a 60-minute window.
  To learn how to enable the error sampling, see [Trace Sampling](/content/en/docs/connect_manage_environ/connected_agent_common_reference/trace_sampling.md).

* **Istio Agent**

  (NEW AGENT RELEASES)</br>
  The Istio Agent has been update to support either ambient of sidecar mode. The Istio API Gateway version supported is v1.27.3 and Kubernetes version 1.33.2.

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Agent bug fixes for December 12, 2025

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01764990 | APIGOV-31498 | **Issue**: An APIM Manager quota was not updated after a plan migration and the quota was changed. <br/>**Resolution**: A fix has been made to the APIM agent to update quota changes on the APIM Manager. |

### Axway CLI updates for December 12, 2025

* **Enhancement**

  (PROVIDER EXPERIENCE, AXWAY ENGAGE CLI, ENHANCEMENT)</br>
  The Axway Engage CLI (formerly Axway Central CLI) [**v4.9.0**](https://www.npmjs.com/package/@axway/axway-central-cli/v/4.9.0) has been updated to install the Istio and Sensedia agents with the latest supported features .

### Marketplace updates for December 12, 2025

* **MCP Server registration and discovery enhancement**

  (PROVIDER EXPERIENCE, MARKETPLACE,ENHANCEMENT)</br>
  The *Fetch from URL* experience now supports more flexible authentication methods when registering and publishing MCP servers, including **no auth** and configurable **API Keys** with a custom name and value, passed in the header or as a query parameter.

* **Console Screen selectable as landing page**

  (MARKETPLACE ADMINISTRATION, MARKETPLACE, ENHANCEMENT)</br>
  The Console page can be selected as the alternative home page when the landing page is disabled on Marketplace settings.

* **Display Terms and Conditions in Product details**

  (PROVIDER EXPERIENCE, MARKETPLACE, ENHANCEMENT)</br>
  The Product Terms and Conditions feature has been enhanced so providers can view them directly from Product Details. If no Terms and Conditions are set, a direct link is provided to add them from Edit Product.

* **Getting Started in Console Page**

   (MARKETPLACE MANAGER EXPERIENCE, MARKETPLACE, NEW FEATURE)</br>
  The Console page settings has been enhanced to include a **Getting Started** section.
    * Marketplace manager can enable/disable a "Getting Started" section to appear on the Console page
    * The "Getting Started" content is defined by selecting from the Document Library
    * "Getting Started" section appears at the bottom of the Console page

* **Filter products by MCP/API type in Marketplace**

   (CONSUMER EXPERIENCE, MARKETPLACE, NEW FEATURE)</br>
  A Product Type filter has been added to the Marketplace allowing consumers to filter products by API or MCP.
  
### Marketplace bug fixes for December 12, 2025

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01765710 | APIGOV-31332 | **Issue**: An error message was displayed after resolving a corrupted asset with a new asset version and attempting to view "Resources in Error". The error message could occur after a plan migration was performed on a corrupted resource <br/>**Resolution**: A fix to the Engage UI was made. |
| 01769559 | APIGOV-31474 | **Issue**: Consumer assigned to a consumer org but not assigned to a team could not connect to a public Marketplace (home page and product list) to see what is publicly visible <br/>**Resolution**: A fix was implemented to allow consumers with no team assignment to be able to view public Marketplace (home page and products). |
| 01784115 | APIGOV-31648 | **Issue**: Marketplace: Product resource details screen doesn't display mTLS warning message <br/>**Resolution**: A fix was implemented to show appropriate message for mTLS. |
| 01765710 | APIGOV-31469 | **Issue**: Resources in error during plan migration <br/>**Resolution**: A fix was implemented to allow migration to complete from a plan with errored resources to a plan without them. |
| 01771151 | APIGOV-31418 | **Issue**: Templates - topics limited to 20 <br/>**Resolution**: A fix was implemented so more than 20 topics can be added without losing any - can also shuffle topics around without issue. |
|01743271| APIGOV-30943 | **Issue**: User with team developer role had viewing issue in Service Registry <br/>**Resolution**: A fix was implemented for users with developer roles on teams who do not have access to products, they will be able to only see the number of products associated to Services. |

## December 11, 2025

New enhancement for the December 11 update.

### Axway CLI updates for December December 11, 2025

* **Updates to the install agents command**

  (PROVIDER EXPERIENCE, AXWAY ENGAGE CLI, ENHANCEMENT)</br>
  The Axway Engage CLI (formerly Axway Central CLI) **v4.9.0** has been updated to install Istio agents in ambient mode and Sensedia agents to use token authentication.

## December 3, 2025

New enhancements and bug fixes for the December 3 update.

### Marketplace update for December 3, 2025

* **Filter Marketplace products by type (API or MCP)**

  (CONSUMER EXPERIENCE, MARKETPLACE, NEW FEATURE)</br>
  You can now filter products specifically by API or MCP, helping you quickly narrow down the products and focus on the services most relevant to your workflow. Additionally, a new **Type** filter (i.e., ASYNCAPI, OAS2, MCP) was added to the *Resources* screen.

### Marketplace bug fixes for December 3, 2025

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01771151 | APIGOV-31418 | **Issue**:  In-template topics were limited to 20 <br/>**Resolution**: An unlimited number of in-template topics can now be added. Topics no longer disappear when displaying and edited. |
| 01743271 | APIGOV-30943 | **Issue**:  A user with a developer role in a team that owned 0 services could see services owned by other teams in Service Registry, but received a loading blank page when one of these services was selected <br/>**Resolution**: User with a developer role in a team that owns 0 services will not see any services. If the team owns any services, then the user will see services owned by that respective team. Users who do not have access to products can now see the number of products that are only associated to the service. |
| 01781534 | APIGOV-31584 | **Issue**:  A Developer or Catalog Manager user was not able to create a new asset version from the Engage UI <br/>**Resolution**: A fix has been made to enable the asset version creation for the Catalog Manager and Developer assignees. |

### Business Insights updates for December 3, 2025

* **Provider Engagement**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Significant internal performance improvements when viewing this screen.

    * *Admin only* team filter is only selectable for users with an Engage Admin role.

    * **Team Activity** - For date ranges starting from April 24, 2025:
        * Significant performance improvements.
        * Provider team association reflects the service, asset, or product owner at the time of the relevant activity. For previous time periods, the team association reflects the current owner instead.
