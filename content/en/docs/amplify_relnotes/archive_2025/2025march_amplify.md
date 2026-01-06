---
title: Amplify Engage March 2025
linkTitle: Amplify Engage March
weight: 10
date: 2025-3-7
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## March 26, 2025

Bug fix for the March 21 update.

### Engage bug fix for March 26, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| | APIGOV-30066 | **Issue**: Service Registry fails to display when a service has no revisions <br/>**Resolution**: The service displays all services correctly when a service has no revisions. |

## March 21, 2025

New features, enhancements, and bug fixes for the March 21 update.

### Agents updates for March 21, 2025

* **External custom Credential Request Provisioning with standard OAuth**
  
  (APIM DISCOVERY AGENT, ENHANCEMENT)</br>
  The Axway API Manager Discovery Agent now allows overriding the standard OAuth Credential Request Type with a custom Credential Request Definition. The update is included in APIM Discovery Agent Agent version 1.2.18 and later. It includes:
    * **Override default CRD**: Users can define and implement their own custom CRD instead of relying on the default definition provided by the agent.
    * **Ignore automatic credential provisioning**: The agent will automatically bypass the default credential provisioning in the API Manager for standard OAuth security type. Users must manage the entire provisioning process externally.

* **WSO2 - API Key support**
  
  (WSO2 DISCOVERY AGENT, ENHANCEMENT)</br>
  The WSO2 Discovery Agent now supports API Key provisioning. This allows consumers to generate API Key credentials directly from the Marketplace for APIs managed in WSO2. The update is available in WSO2 Agent version **1.0.2** and later.
  
* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Agents bug fixes for March 21, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| |APIGOV-29940 | **Issue**: WSO2 Agent status not updated <br/>**Resolution**: The WSO2 agent status is now reported. The fix is available in Discovery Agent version **v1.0.2**. |
| | APIGOV-29951 | **Issue**: SaaS embedded agents could not update the Stage mapping <br/>**Resolution**: The latest release of the embedded agent allows updates to the Stage mappings. |
|01679002 | APIGOV-29600 | **Issue**: Stage visibility issue for public Marketplace <br/>**Resolution**: Only authenticated users are allowed to see a stage when the stage visibility is set to "Only authenticated users can see this stage" in a public Marketplace. |
| 01698345 |APIGOV-30015 <br/>APIGOV-30021 | **Issue**: When the APIM Traceability Agent is used to report metrics and usage without discovering APIs with the APIM Discovery Agent, the API Service name that is visible on the Business Insights is incorrect <br/>**Resolution**: The APIM Traceability Agent reports metrics and usage with the API service name from the APIM event log. The fix is available in Traceability Agent version **v1.2.17**.  APIM Traceabaility **v1.2.15** and **v1.2.16** have been redacted and removed from the [Axway Repository](https://repository.axway.com/catalog?q=agents).  |

## March 17, 2025

New features, enhancements, and bug fixes for the March 17 update.

### Marketplace updates for March 17, 2025

* **Enhanced timeframe filtering in Subscription Dashboard**

  (BUSINESS INSIGHTS, CONSUMER INSIGHTS, ENHANCEMENT)</br>
  The Subscription Dashboard now lets users refine their search by selecting a specific timeframe for querying subscription entries. Previously, subscription usage was only viewable in fixed 3-month increments. This update provides more flexibility in analyzing subscription trends, making it easier to review usage patterns over custom time periods.

* **New navigation from Product details to Subscription information**

  (PRODUCT FOUNDRY, PROVIDER EXPERIENCE)</br>
  The product details / subscription list enables the provider to view subscription details and plan details by clicking the associated links.

* **Alignment between ellipsis menus and side panel actions**

  (PRODUCT FOUNDRY, PROVIDER EXPERIENCE)</br>
  The *Marketplace > Subscriptions*, *Marketplace > Application Registrations* and *Marketplace > Credentials* lists have new ellipsis menus that correspond to the possible actions on each line of the lists. For instance, a cancelled subscription can no longer be approved or rejected; only view and delete actions are available. The same actions are available in the object details screen.

### Engage bug fixes for March 17, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| | APIGOV-29680 | **Issue**: Document structure drag and drop does not work correctly <br/>**Resolution**: Dropping a document is now set at the place of the cursor. |
| 01595905 | APIGOV-27978 | **Issue**: The product title remains unchanged in the product overview. <br/>**Resolution**: The product title is now updated on the product details page after an update. |
| | APIGOV-29927 | **Issue**: Plan not displayed due to a plan visibility set on another Marketplace <br/>**Resolution**: The plan visibility is now correctly filtered by the current Marketplace. |
  
## March 7, 2025

New features and enhancements for the March 7 update.

### Agents updates for March 7, 2025

* **New WSO2 Discovery and Traceability agents**

  (DISCOVERY AGENT, TRACEABILITY AGENT)</br>
  You can now use the new Discovery and Traceability agents to connect an **WSO2** environment to Amplify for automatic discovery of APIs and API metrics reporting. The agents are available as on-prem installations and can be found on [Axway Repository](https://repository.axway.com/catalog?q=agents). The key capabilities include:

    * **Automated API discovery**: Automatic API discovery from WSO2, ensuring comprehensive visibility of your API landscape and federated API governance.
    * **Enhanced traceability**: Insights into API usage and performance by integrating with Amplify for detailed reporting.
    * **Improved governance and compliance**: Apply linting rules to validate the API from an API compliance perspective.

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  In addition to releasing the WSO2 agents, all other agents have been updated to a new version. Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Axway Central CLI updates for March 7, 2025

* **Introducing Axway Central CLI version 3.12.0**
  
  The latest version **3.12.0** of the [Axway Central CLI](https://www.npmjs.com/package/@axway/axway-central-cli/v/3.12.0) is now avaiable on NPM. This update includes support for installing the **WSO2 Discovery and Traceability** agents.

## March 6, 2025

New features, enhancements, and bug fix for the March 6 update.

### Agents bug fix for March 6, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01678979, 01681411 | APIGOV-29658 | **Issue**: Issue with Credential Request <br/>**Resolution**: The Credential Request screen was not being displayed. Even when directly accessing the product resource, the **Credential Request** button was disabled. This issue was resolved by not requiring an agent restart to discover the Credential Request Definition and display it in the Marketplace. The fix is available in Discovery Agent version **v1.2.17**. |

### Engage update for March 6, 2025

* **Automatic free plan creation during product publishing**

  (PRODUCT FOUNDRY, PROVIDER EXPERIENCE)</br>
  If no plan is defined during product publishing, a **Free Plan** will be automatically created. This update elimintates unnecessary steps in the product publishing and provides Marketplace consumers with instant access to free-tier offerings.
  
## March 5, 2025

Bug fixes for the March 5 update.

### Engage bug fixes for March 5, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01685540 | APIGOV-29793 | **Issue**: Marketplace - ratings user information not loading <br/>**Resolution**: Due to a change in platform API, the user information could not be shown. After the fix, the user name is being displayed. "Verified User" is displayed when the user name cannot be resolved. |
|  N/A     | APIGOV-29872 | **Issue**: When an API with multiple endpoints is published to the Marketplace directly from the Service Registry, only the first end point is included in a plan quota. As a result, the consumers cannot consume the other API endpoints in the Marketplace.<br/>**Resolution**: A fix was released to include all endpoints in the plan / quota.|

## March 4, 2025

New enhancement for the March 4 update.

### Engage update for March 4, 2025

* **New Amplify Engage branding**

  (AMPLIFY ENGAGE)</br>
 The Web UI has been rebranded to Amplify Engage from Amplify Central.  The is reflected in the web page title and the web page breadcrumbs.
