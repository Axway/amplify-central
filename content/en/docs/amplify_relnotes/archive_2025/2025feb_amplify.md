---
title: Amplify Engage February 2025
linkTitle: Amplify Engage February
weight: 11
date: 2025-2-7
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## February 26, 2025

New features and enhancements for the February 26 update.

### Marketplace updates for February 26, 2025

* **Custom attributes for applications in Marketplace**

  (CONSUMER EXPERIENCE,INTEGRATION, ENHANCEMENT, APIM)<br/>
  This new feature allows providers to add custom fields to applications in Marketplace, ensuring a seamless integration with Axway's API Manager. For environments connected via APIM Discovery Agents, the agents will **automatically discover** custom attributes and make them visible in the Marketplace. Consumer will be prompted to provide required custom attributes when submitting an **Application Registration request** for the first time, but they can update them at any time after provisioning of said values was successful in API Manager. These updates are available in APIM Discovery Agent version **1.2.16**.

* **API service sharing enhancement**

  (PROVIDER EXPERIENCE, ENHANCEMENT)<br/>
  Users can now share an API service with additional teams after it has already been set up. This enhancement ensures that multiple teams can access and work with an API inside an environment.
  
## February 25, 2025

New features, enhancements, and bug fixes for the February 25 update.

### Agents updates for February 25, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)<br/>
  For all latest agent versions, please refer to the [Release Notes Index](https://docs.axway.com/bundle/amplify-central/page/docs/amplify_relnotes/index.html) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).
  
* **AWS Discovery and Traceability agents enhancements**

  (DISCOVERY AGENT,TREACEABILITY AGENT, ENHANCEMENT)<br/>
  Both the hosted and the on-prem AWS Discovery Agents have been enhanced with the following improvements:
    * **HTTP endpoint discovery** - The AWS Discovery Agent can now discover **HTTP endpoints** in addition to REST APIs, providing a more complete view of the API landscape. The HTTP APIs can be published in the Marketplace as any other type of supported runtime API. When enabled, consumers can request an OAuth / OIDC client and monitor usage in Consumer Insights.
    * **Custom domain mapping** - When a custom domain mapping is set up on an API, the discovered API in Engage now includes all custom domain mapped paths as API endpoints. Previously, only the base path was included.
    * **Improved environment representation** - The AWS Discovery Agent can now detect **AWS stages** by leveraging a **tag** assigned to an AWS stage. These stages can be visualized under *Topology > Stages** and attached to an API endpoint for better organization and representation of the AWS environments.<br/>
  
  The **AWS Traceability Agent** has been enhanced to report usage on published HTTP endpoints.
  These enhancements are included in on-prem AWS Discovery Agent and Traceability Agents version **1.2.14**.
  
### Axway Central CLI updates for February 25, 2025

* **Introducing Axway Central CLI version 3.11.0**

  The latest version **3.11.0** of the [Axway Central CLI](https://www.npmjs.com/package/@axway/axway-central-cli/v/3.11.0) is now available on NPM. This update includes:
  
    * Support for latest AWS Discovery and Traceability Agent improvements.

### Agents bug fixes for February 25, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01681619 | APIGOV-29730 | **Issue**: APIM Discovery Agent is causing critical CPU load on API Gateway <br/>**Resolution**: The APIM Discovery Agent now gathers the organizations from the API Manager less frequently to lower the CPU load. |

## February 24, 2025

Bug fixes for the February 24 update.

### Agents bug fixes for February 24, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| N/A | APIGOV-29690 | **Issue**: APIM Discovery Agent (1.2.14) reported as stopped in the UI even though the agent is running and in a healthy state <br/>**Resolution**: The agent status is now displayed correctly in the Agents page. |
| 01680913,01680338  | APIGOV-29691 | **Issue**: Azure API Management Discovery agent (1.0.6 and 1.3.13) reported as stopped in the UI even though the agent is running and in a healthy state <br/>**Resolution**: The agent status is now displayed correctly in the Agents page. |

## February 21, 2025

New features and enhancements for the February 21 update.

### Marketplace updates for February 21, 2025

* **New Revenue dashboard in Business Insights**

  (PROVIDER EXPERIENCE, ENHANCEMENT, BUSINESS INSIGHTS)<br/>
  A new Revenue dashboard has been added to Business Insights, providing providers with a comprehensive view of the products' financial performances and their contributions to the overall business strategy.
  This dashboard contains key metrics, such as:
    * **Total Charges**: View total charges for a selected time period to track revenue trends.
    * **Invoice Statistics**: View invoice stats as of the current period for real-time financial insights.
    * **Charges Breakdown**: Analyze charges by **consumer** or **product** to better understand revenue distribution and identify top performing products and consumer.

## February 19, 2025

New features and enhancements for the February 19 update.

### Marketplace updates for February 19, 2025

* **Environment sharing enhancement**

  (PROVIDER EXPERIENCE, ENHANCEMENT)<br/>
  A user can now share an environment with additional teams after it has already been set up. This enhancement ensures that multiple teams can access and work with the APIs available within the shared environments.

## February 18, 2025

New features and enhancements for the February 18 update.

### Marketplace updates for February 18, 2025

* **Default template enforcement**

  (PROVIDER EXPERIENCE, ENHANCEMENT)<br/>
  A user can now set a template to be the default template and additionally enforce it so that everyone creating a product will get the same documentation structure.

## February 13, 2025

New features and enhancements for the February 13 update.

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

    * Automated API discovery: Automatic API discovery from SAP API Management, ensuring comprehensive visibility of your API landscape and federated API governance.
    * Enhanced traceability: Insights into API usage, and performance by integrating with Amplify for detailed reporting.
    * Improved governance and compliance: Apply linting rules to validate the API from an API compliance perspective.

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
| N/A | APIGOV-29057 | **Issue**: The images part of the description in the OAS / ASYNC specs are not rendered <br/>**Resolution**: Images are now rendered in the Product Foundry and Marketplace. |
