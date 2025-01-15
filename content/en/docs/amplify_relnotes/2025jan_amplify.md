---
title: Amplify Enterprise Marketplace January 2025
linkTitle: Amplify Enterprise Marketplace January
weight: 12
date: 2025-1-7
---
We work hard to improve the Amplify Enterprise Marketplace experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## January 13, 2025

New features, enhancements, and bug fixes for the January 13 update.

### Marketplace updates for January 13, 2025

* **Unified Dataplane type management across API, SDK, CLI, UI**

  (ENHANCEMENT, DISCOVERY AGENT)<br />
  We are now synchronizing the dataplane names (e.g "GitHub", "AWS", "APIM") across our API Server, SDK, CLI and UI. The API Server now acts as the single source of truth for defining the dataplane types. This improvement eliminates discrepancies between components, providing a unified and reliable dataplane type configuration across the ecosystem. Key updates include:
    * API Server: Introduced `dataplaneType` as an enum with predefined allowed values.
    * SDK: Uses the dataplane types defined in the API Server.
    * UI: Dataplane types are now synced directly from the API Server for consistency.
    * CLI: Updated to synchronize dataplane types from the API Server.
  
* **Protected mocked API endpoints**

  (API MOCKING, ENHANCEMENT, PROVIDER EXPERIENCE)<br />
  The API Mocking feature has been enhanced to improve security when working with sensitive data in API specifications. API providers can now configure mock endpoints to require platform-level authorization. When enabled, mock-server endpoints will require an Axway/Platform login authentication token to be included in request headers. Unauthorized requests without a valid token will receive an error response. This enhancement ensures sensitive example data remains protected. We strongly recommend following security best practices by avoiding the inclusion of sensitive data in API specification examples.

* **Detect failure to delete environments and subscriptions**

  (ENHANCEMENT, PROVIDER EXPERIENCE, CONSUMER EXPERIENCE, CORE CAPABILITY)<br />
  We have added a new state to the environments and subscriptions to show when they are in a **Deleting** state. This addresses the situation when these resources appear to be stuck in a deleted loop in the UI. Environments or subscriptions can go in a **Deleting** state when the Discovery Agent sets up "finalizers" on these resources so they don't get removed before the corresponding configuration is cleaned up from the dataplane. If the agent is down or in an unhealthy state, the removal of those resources is blocked, which will cause them to stay in a **deleting** state. Once the agent is restarted and the finalizers are removed, the resource are deleted from the Marketplace.

* **Responsive Product Foundry page**

  (PRODUCT FOUNDRY, ENHANCEMENT, PROVIDER EXPERIENCE)<br />
  The Product Foundry has been enhanced to allow the page to adapt to different screen sizes.
  
## January 10, 2025

New features, enhancements, and bug fixes for the January 10 update.

### Agent updates for January 10, 2025

* **New Agents Versions Available**

  (AGENT SDK UPDATE, DISCOVERY AGENT, TRACEABILITY AGENT)<br />
  New versions are available for our on-prem agents. Refer to [Release Notes](https://docs.axway.com/bundle/amplify-central/page/docs/amplify_relnotes/index.html) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.
  
* **Kafka Discovery Agent - Topics filtering**

  (ENHANCEMENT, DISCOVERY AGENT)<br />
  We’ve introduced a new feature to the Kafka Discovery Agent, providing more control over topic discovery. Providers can now configure the Kafka Discovery Agent to filter and exclude specific Kafka topics from being discovered and registered in the Service Registry. This enhancement is included in agent version **1.1.9**.
  
* **Webmethods Discovery Agent - API filtering by tags and maturity state**

  (ENHANCEMENT, DISCOVERY AGENT)<br />
  We’ve introduced a new feature to the Software AG Webmethods Discovery Agent, providing more control over API discovery. Providers can now configure the Discovery Agent to filter and exclude specific APIs from being discovered and registered in the Service Registry by tags and / or maturity state. This enhancement is included in agent version **1.0.9**.

### Axway Central CLI updates for January 10, 2024

* **Introducing Axway Central CLI version 3.9.1**
  
  The latest version of the [Axway Central CLI](https://www.npmjs.com/package/@axway/axway-central-cli/v/3.8.0) is v3.9.1 on NPM. For details on Central CLI commands, see [Axway Central CLI Command reference](/docs/integrate_with_central/cli_central/cli_command_reference/). This release includes:
    * The Central CLI can now support both **API Server v1** and **v1alpha1**.
    * A fix for returning empty columns when running the `get` command on the following resources: APISpecLintingRuleset, Application, Resource.

### Marketplace updates for January 10, 2025

* **Delete / Archive buttons in the product details screen**

  (PRODUCT FOUNDRY, ENHANCEMENT, PROVIDER EXPERIENCE)<br />
  You can now **Archive** or **Delete** a product from the *product details* screen. The **Delete** button is available only for products that are in "Archived" state. This allows users to remove or archive a product without having to return to the *product list* page.

* **Try It Out Enhancement**

  (ENHANCEMENT, CONSUMER EXPERIENCE)<br />
  The **Try-it-out** experience has been improved to show all available credentials for a selected application. Credentials that can no longer be used for authentication can not be selected, and a text is displayed on hover over that describes the reason.

### Marketplace bug fixes for January 10, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01671534 | APIGOV-29446 | **Issue**: Error 404 on Marketplace URL after any change <br/>**Resolution**: No code fix was done to resolve the issue. One envoy pod was in a bad state and it was restarted. E2E tests will be added to regularly check for such an issue. |
| | APIGOV-29413 | **Issue**: Product PDF documentation view is not at a good height <br/>**Resolution**: The component handling of the PDF content now fits the entire space available. |
| 01663550 | APIGOV-29333 | **Issue**: Rate and invoice configuration error <br/>**Resolution**: The query to get the insights information now use a correct timestamp format to retrieve the information. |
| | APIGOV-29288 | **Issue**: "Created" filter hiding Draft or pending invoices <br/>**Resolution**: Instead of using the billing timestamp, we will use the create timestamp of the invoice. |
