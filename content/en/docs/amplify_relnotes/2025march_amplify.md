---
title: Amplify Engage March 2025
linkTitle: Amplify Engage March
weight: 10
date: 2025-3-7
---
We work hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

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
