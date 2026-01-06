---
title: Amplify Enterprise Marketplace January 2025
linkTitle: Amplify Enterprise Marketplace January
weight: 12
date: 2025-1-7
---
Axway works hard to improve the Amplify Enterprise Marketplace experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## January 29, 2025

New features, enhancements, and bug fixes for the January 29 update.

### Marketplace updates for January 29, 2025

* **Product plan visibility**

  (PRODUCT FOUNDRY, PLANS, PROVIDER EXPERIENCE, NEW FEATURE)<br />
  Providers can now restrict the visibility of specific product plans by Platform Teams and / or Consumer Organizations, enabling tailored pricing and subscription models for different partners. This allows for more control over who can access free or paid plans based on organization type. All newly created plans remain public unless explicitly restricted.

* **Documentation search bar in Marketplace**

  (MARKETPLACE, CONSUMER EXPERIENCE, ENHANCEMENT, DOCUMENTATION)<br />
  A search bar has been added to the Product Documentation navigation panel in the Marketplace, making it easier to quickly find content. You can search for topics, sections and articles by name in the documentation browse panel.

## January 24, 2025

New features, enhancements, and bug fixes for the January 15 update.

### Agent updates for January 24, 2025

* **New agents versions available**

  (AGENT SDK UPDATE, DISCOVERY AGENT, TRACEABILITY AGENT)<br />
  New versions are available for our on-prem agents. Refer to [Release Notes](https://docs.axway.com/bundle/amplify-central/page/docs/amplify_relnotes/index.html) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

* **Kafka agent enhancement: SASL/OAUTHBEARER Authentication support**

  (KAFKA, DISCOVERY AGENT, ENHANCEMENT)<br />
 The range of supported authentication types within the Kafka Agent have been extended. The agent can now communicate with the Confluent Platform using **SASL/OAUTHBEARER** authentication, enabling integration with Confluent Platform environments configured with Oauth-based security.This enhancement is available in Kafka Discovery Agent **v1.1.10.**. This update is supported in the Axway Central CLI **v3.9.2**.

* **APIM Traceability enhancement: Optimized event processing with sampling check**

  (APIM, TRACEABILITY AGENT, ENHANCEMENT)<br />
  The APIM agent's event processing logic has been optimized to improve efficiency and performance, particularly when sampling is enabled.Previously, the APIM Agent would process the entire summary and leg events for every event it encountered, regardless of whether the event would be sampled. This approach resulted in unnecessary processing overhead for events that were ultimately not sampled. With this enhancement, the agent now checks whether an event should be sampled before performing full summary and leg event processing.For events taht are not samples, the agent will simply update the relevant metric data, avoiding redundant processing. This update is available in APIM Traceability Agent **v1.2.13**.

### Agent bug fixes for January 24, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01676790 | APIGOV-29562 | **Issue**: Offline Traceability - panic: runtime error: invalid memory address or nul pointer dereference <br/>**Resolution**: Fixed to not use custom unit metric processing for offline mode |
| N/A | APIGOV-29557 | **Issue**: New event mapping does not include the mapping of the response metrics <br/>**Resolution**: The SDK mapping of the old metric event to the new metric event now includes the response metrics.|

### Axway CLI updates for January 24, 2024

* **Introducing Axway Central CLI version 3.9.2**
  
  The latest version of the [Axway Central CLI](https://www.npmjs.com/package/@axway/axway-central-cli/v/3.9.2) is v3.9.2 on NPM. For details on Central CLI commands, see [Axway Central CLI Command reference](/docs/integrate_with_central/cli_central/cli_command_reference/). This release includes:
    * Kafka install agent command with SASL/AUTHBEARER authentication support

### Marketplace updates for January 24, 2025

* **Hourly and Minute quota limits in product plans**

  (PRODUCT FOUNDRY, PLANS, ENHANCEMENT)<br />
  This enhancements allows users to enforce specific unit quantity limits per **hour** or **minute** in a product plan. These quota limits are currently processed and enforced only by the APIM Discovery Agent **v1.2.14.**.

## January 15, 2025

New features, enhancements, and bug fixes for the January 15 update.

### Axway CLI updates for January 15, 2024

* **Introducing Axway CLI version 3.2.16**
  
  The latest version of the [Axway CLI](https://www.npmjs.com/package/axway/v/3.2.16) is v3.2.16 on NPM. This release includes:
    * A fix for not allowing a "Service account" with Administrator privilege to manage a team. After the fix, you can now user service account with admin privilege to manage teams.

### Marketplace bug fixes for January 15, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01654349 | APIGOV-29200 | **Issue**: Cannot add more than 50 resources in Plan Creation <br/>**Resolution**: You can now add unlimited resources to a plan. |
| 01664984, 01670114 | APIGOV-29381 | **Issue**: Unable to save an active plan when user is Central Admin, but the product is owned by a team <br/> **Resolution**: The plan inherits the owner of the product, which no longer results in a failed action.|
|N/A | APIGOV-29490 | **Issue**: Big gap between the search bar and the table, when the table contains few entries <br/> **Resolution**: There is no longer a large gap between the search bar and the table.|
|N/A |APIGOV-28357 | **Issue**: The TAG field should allow up to 250 characters for tags <br/> **Resolution**: Now users can add tags up to 250 characters in total.|
|N/A |APIGOV-29453 | **Issue**:  Don't allow users to select in the asset wizard, api services that don't have any endpoints <br/> **Resolution**: After the fix, when creating an asset, users cannot link an api service that has no endpoints.|

## January 13, 2025

New features, enhancements, and bug fixes for the January 13 update.

### Marketplace updates for January 13, 2025

* **Unified Dataplane type management across API, SDK, CLI, UI**

  (ENHANCEMENT, DISCOVERY AGENT)<br />
  The dataplane names (e.g "GitHub", "AWS", "APIM") are now synchronized across our API Server, SDK, CLI and UI. The API Server now acts as the single source of truth for defining the dataplane types. This improvement eliminates discrepancies between components, providing a unified and reliable dataplane type configuration across the ecosystem. Key updates include:
    * API Server: Introduced `dataplaneType` as an enum with predefined allowed values.
    * SDK: Uses the dataplane types defined in the API Server.
    * UI: Dataplane types are now synced directly from the API Server for consistency.
    * CLI: Updated to synchronize dataplane types from the API Server.
  
* **Protected mocked API endpoints**

  (API MOCKING, ENHANCEMENT, PROVIDER EXPERIENCE)<br />
  The API Mocking feature has been enhanced to improve security when working with sensitive data in API specifications. API providers can now configure mock endpoints to require platform-level authorization. When enabled, mock-server endpoints will require an Axway/Platform login authentication token to be included in request headers. Unauthorized requests without a valid token will receive an error response. This enhancement ensures sensitive example data remains protected. It is strongly recommend that you follow security best practices by avoiding the inclusion of sensitive data in API specification examples.

* **Detect failure to delete environments and subscriptions**

  (ENHANCEMENT, PROVIDER EXPERIENCE, CONSUMER EXPERIENCE, CORE CAPABILITY)<br />
  A new state has been added to the environments and subscriptions to show when they are in a **Deleting** state. This addresses the situation when these resources appear to be stuck in a deleted loop in the UI. Environments or subscriptions can go in a **Deleting** state when the Discovery Agent sets up "finalizers" on these resources so they don't get removed before the corresponding configuration is cleaned up from the dataplane. If the agent is down or in an unhealthy state, the removal of those resources is blocked, which will cause them to stay in a **deleting** state. Once the agent is restarted and the finalizers are removed, the resource are deleted from the Marketplace.

* **Responsive Product Foundry page**

  (PRODUCT FOUNDRY, ENHANCEMENT, PROVIDER EXPERIENCE)<br />
  The Product Foundry has been enhanced to allow the page to adapt to different screen sizes.
  
## January 10, 2025

New features, enhancements, and bug fixes for the January 10 update.

### Agent updates for January 10, 2025

* **New agents versions available**

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

* **Try It Out enhancement**

  (ENHANCEMENT, CONSUMER EXPERIENCE)<br />
  The **Try-it-out** experience has been improved to show all available credentials for a selected application. Credentials that can no longer be used for authentication can not be selected, and a text is displayed on hover over that describes the reason.

### Marketplace bug fixes for January 10, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01671534 | APIGOV-29446 | **Issue**: Error 404 on Marketplace URL after any change <br/>**Resolution**: No code fix was done to resolve the issue. One envoy pod was in a bad state and it was restarted. E2E tests will be added to regularly check for such an issue. |
| | APIGOV-29413 | **Issue**: Product PDF documentation view is not at a good height <br/>**Resolution**: The component handling of the PDF content now fits the entire space available. |
| 01663550 | APIGOV-29333 | **Issue**: Rate and invoice configuration error <br/>**Resolution**: The query to get the insights information now use a correct timestamp format to retrieve the information. |
| | APIGOV-29288 | **Issue**: "Created" filter hiding Draft or pending invoices <br/>**Resolution**: Instead of using the billing timestamp, the create timestamp of the invoice is now used. |
