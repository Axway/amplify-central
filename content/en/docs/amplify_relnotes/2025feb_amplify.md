---
title: Amplify Engage February 2025
linkTitle: Amplify Engage February
weight: 11
date: 2025-2-7
---
We work hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## February 21, 2025

New features, enhancements, and bug fixes for the February 21 update.

### Marketplace updates for February 21, 2025

* **New Revenue Dashboard in Business Insights**

  (PROVIDER EXPERIENCE, ENHANCEMENT, BUSINESS INSIGHTS)<br/>
  A new Revenue Dashboard has been added to Business Insights, providing providers with a comprehensive view of the products financial performance and their contribution to the overall business strategy.
  This dashboard contains key metrics such as:
    * **Total Charges**: View total charges for a selected time frame to track revenue trends.
    * **Invoice Statistics**: Invoice stats as of the current period for real-time financial insights.
    * **Charges Breakdown**: Allows users to analyze charges by **consumer** or **product** to better understand revenue distribution, and identify top performing products and consumer.

## February 19, 2025

New features, enhancements, and bug fixes for the February 19 update.

### Marketplace updates for February 19, 2025

* **Environment sharing enhancement**

  (PROVIDER EXPERIENCE, ENHANCEMENT)<br/>
  Users can now share an environment with additional teams after it has already been set up. This enhancement ensures that multiple teams can access and work with the APIs available within the shared environment.

## February 18, 2025

New features, enhancements, and bug fixes for the February 19 update.

### Marketplace updates for February 18, 2025

* **Default template enforcement**

  (PROVIDER EXPERIENCE, ENHANCEMENT)<br/>
  Users can now set a template to be the default template and additionally enforce it so that everyone creating a product will get the same documentation structure.

## February 13, 2025

New features, enhancements, and bug fixes for the February 19 update.

### Marketplace updates for February 13, 2025

* **Subscription usage split per API**

  (PROVIDER EXPERIENCE, ENHANCEMENT)<br/>
  Users can now see the subscription usage split per API so that it is easier to see the API calls individually inside a quota.

## February 7, 2025

New features, enhancements, and bug fixes for the February 7 update.

### Agents updates for February 7, 2025

* **New SAP Integration Suite - API Management / API Portal Discovery and Traceability agents**

  (DISCOVERY AGENT, TRACEABILITY AGENT)<br/>
  You can now use the new Discovery and Traceability agents to connect SAP Integration Suite - API Management to Amplify for automatic discovery of APIs and API metrics reporting. The agents are available as on-prem installations and can be found on [Axway Repository](https://repository.axway.com/catalog?q=agents). The key capabilities include:

    * Automated API Discovery: Automatic API Discovery from SAP API Management, ensuring comprehesive visibility of your API landscape and federated API governance.
    * Enhanced traceability: Insights into API usage, and performance by integrationg with Amplify for detailed reporting.
    * Improved governance and compliance: Apply linting rules to validated the API from an API compliance perspective.

* **Apigee X on-premise Discovery and Traceability agents**

  (APIGEE X AGENTS)<br/>
  The Apigee X agents are now available as on-prem installations. The agents can be found on [Axway Repository](https://repository.axway.com/catalog?q=agents).

* **New agent versions available**

  (NEW AGENT RELEASES)<br/>
  For all other latest agent versions, please refer to the [Release Notes Index](https://docs.axway.com/bundle/amplify-central/page/docs/amplify_relnotes/index.html) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents). These updates contain an enhancement to the SDK to improve the processing of IDP Secrets when using the indexed environment variables (i.e., the *_1  in IDP Auth environment variables).

### Agents bug fixes for February 7, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| N/A | APIGOV-29684 | **Issue**: Credential Request Definition (CRD) wrongly updated with custom-oauth-external <br/>**Resolution**: When the agent starts and the CRD for an Okta IDP already exists, the APIs are correctly linked to the OKTA CRD. |

### Axway Central CLI updates for February 7, 2025

* **Introducing Axway Central CLI version 3.10.0**

  The latest version **3.10.0** of the [Axway Central CLI](https://www.npmjs.com/package/@axway/axway-central-cli/v/3.10.0) is now avaiable on NPM. This update includes:
  
    * Support for installing the **Apigee X** and **SAP Integration - API Management / API Portal** agents.

### Marketplace bug fixes for February 7, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| N/A | APIGOV-29057 | **Issue**: The images part of description in OAS or ASYNC spec are not rendered <br/>**Resolution**: Images are now rendered in the Product Foundry and Marketplace. |
