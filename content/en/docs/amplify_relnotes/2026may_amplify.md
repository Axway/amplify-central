---
title: Amplify Engage May 2026
linkTitle: Amplify Engage May
weight: 9
date: 2026-4-30
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents). To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).{{< /alert >}}

---

## May 28, 2026

New enhancements and bug fixes for the May 28 update.

### Agent updates for May 28, 2026

* **APIM enhancement: Improved API instance validation handling**

  (EDGEGATEWAYDISCOVERYAGENT, ENHANCEMENT)</br>
  Enhanced the instance validation logic to prevent incorrect sync statuses in Amplify Engage when Axway API Manager is temporarily unreachable (e.g., due to invalid credentials or network issues).

* **Software AG webMethods enhancement: Optimized Traceability Agent API request efficiency**

  (SOFTWAREAG WEBMETHODS, ENHANCEMENT)</br>
  Improved the performance and stability of the WebMethods Traceability Agent by optimizing API request patterns and reducing the volume of data retrieved from the webMethods platform. These enhancements help prevent potential crashes and have been validated to ensure no increase in 429 errors.

### Agent bug fixes for May 28, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01824665 | APIGOV-32378 | **Issue**: Logical name when deleting a service from the Environment page. <br/>**Resolution**: Delete pop-up modal now display the Service Name Friendly Title, instead of the logical name. |
| 01833661 | APIGOV-32578 | **Issue**: Mulesoft v1.2.43 keeps restarting. <br/>**Resolution**: Standardized rate limiting configuration in MuleSoft by implementing a single, consistent rate limiter across all business unit clients. |
| 01836077 | APIGOV-32650 | **Issue**: Environment name not fully displayed when adding a resource during asset creation. <br/>**Resolution**: Display full name in a hover text tooltip. |
|          | APIGOV-32658 | **Issue**: API Traceability transactions are not being given application context. <br/>**Resolution**:  Consumer Insights dashboards are now showing data.|
|          | APIGOV-32655 | **Issue**: Agents Controller - handling of retracted versions when it is also latest. <br/>**Resolution**: A fix was introduced to properly handle latest retracted version. |
|          | APIGOV-32438 | **Issue**: UI - block ability to add a manual API/MCP service to all agent-managed environments. <br/>**Resolution**: UI now enforces validation in the Manually Add wizard, allowing users to proceed only when the selected environment is configured for "Manual Sync." |
|          | APIGOV-32628 | **Issue**: Asset wizard - Configure specification stage column is empty. <br/>**Resolution**: The endpoint stage is correctly displayed on the Configure Specification page of the Asset wizard.  |

### Marketplace updates for May 28, 2026

* **AI Agent registration and discovery**

  (PROVIDER EXPERIENCE, CONSUMER EXPERIENCE, NEW FEATURE)</br>
  Amplify Engage now supports the registration and discovery of AI Agents, alongside other API and MCP resource types. Providers can now easily register AI Agents in the Service Registry by importing an **Agent Card**. A guided wizard automatically extracts and populates key service metadata, significantly reducing manual data entry.

  Once registered, the AI Agent can be seamlessly published to the Marketplace using the standard **Asset > Product** publication flow. Enhanced filtering by AI Agent (A2A) type in Marketplace products further improves discoverability, reducing time spent searching and accelerating integration.

* **Enhanced analytics context for Access Requests**

  (ANALYTICS, ENHANCEMENT, ENGAGE)</br>
  To improve analytics accuracy and reduce the dependency on additional API Server calls, ownership information is now included in Marketplace references within Access Requests. This enhancement enables agents to automatically enrich metric and transaction events with the appropriate context, resulting in more efficient and meaningful analytics reporting.

* **Unified Oauth credential provisioning for MCP server + Backlog API (v7 Gateway)**

  (PROVIDER AND CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE CREDENTIALS)</br>
  You can now generate a single OAuth credential that grants access to both an MCP server and its underlying API on the v7 Gateway. Engage provisions one client_id / client_secret pair recognized by Fusion and the v7 Gateway, and revoking it removes access to both services at once. Providers see a new Type column distinguishing Primary credentials from Clones, with read-only clone entries and expiration-source details in the credential panel. On the Marketplace side, clones are hidden from consumers; if clone provisioning is pending or errored, the primary credential displays a status indicator and affected resources are marked until provisioning completes.

### Marketplace bug fixes for May 28, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01827557 | APIGOV-32559| **Issue**: 503 Admission error when linking/unlinking asset in draft product. <br/>**Resolution**: Increased timeout during asset linking/unlinking. |
| 01835429 | APIGOV-32649| **Issue**: Adding/Editing a plan in Engage doesn't fetch all resources. <br/>**Resolution**: Updated to show the resources of more than 20 assets in the quota resource selector. |
|          | APIGOV-32589| **Issue**: API Server fails to process ResourceEntryDeleted event for a CRD that had 42k soft references. <br/>**Resolution**: Increased the memory to 1.5GBs and set the relay notifier timeout to 5 minutes. |
|          | APIGOV-32471| **Issue**: Product documentation does not render if the spec.sections.articles do not have a title set. <br/>**Resolution**: The logical name (which is always mandatory) is now taken into account when the title is missing on a document. |

## May 14, 2026

New enhancements and bug fixes for the May 14 update.

### Agent updates for May 14, 2026

* **IBM webMethods API discovery**

  (WEBMETHODS DISCOVERY AGENT, ENHANCEMENT)</br>
  The IBM webMethods Discovery Agent has been enhanced to use webMethods /search API to improve the performance of the API discovery process.

* **Mulesoft Agent: business unit and environment filters**

  (MULESOFT ANYPOINT AGENT, ENHANCEMENT)</br>
  The Mulesoft Anypoint Discovery Agent now supports business unit and environment filtering for discovery of API services. Only APIs that match the configured filters are discovered and displayed on the Engage *Environment Details* page, improving relevance and reducing unnecessary API processing.

### Agent bug fixes for May 14, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01827634 | APIGOV-32445 | **Issue**: When an API is added to a product and viewed in the Marketplace, the protection lock icon may not appear, which prevents credential requests and application registration. <br/>**Resolution**: The APIM agent's credential request definition synchronization was fixed. |
|          | APIGOV-32465 | **Issue**: Even while the agent was running, its status could show as Unhealthy or Stopped. <br/>**Resolution**: The Engage platform's handling of the connection status was improved. |

### Marketplace updates for May 14, 2026

* **Credential reuse visibility during Credential Request submission**

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  When a consumer submits a new credential request for an application, the Credential Request Submitted side panel displays a list of existing resources associated with the same application that can reuse the newly requested credentials, helping consumers understand reuse opportunities. If no other resources exist, the section is hidden. Note that the View credentials action continues to provide access to the newly created credential’s metadata.

* **Asset archiving safeguards for product dependencies**

  (PROVIDER EXPERIENCE, RESOLUTION, ASSET CATALOG)</br>
  The archiving behavior has been updated to prevent assets that are actively referenced by products or product releases from entering an unrecoverable state or inform when an asset has already been archived. Assets used in product plans are now clearly identified as Non-Archivable, and archiving is blocked to avoid breaking plan configurations and updates. The archive confirmation dialog has been improved for clarity and consistency, with a unified experience for single and multi-select actions, including pagination and clear visibility into referenced products and versions. This ensures product plans remain manageable and prevents UI dead-ends caused by archived dependencies.

* **Partial API exposure**

  (PROVIDER EXPERIENCE, ENHANCEMENT, ASSET CATALOG, MARKETPLACE)</br>
  The Asset create/edit experience has been enhanced to allow the provider the option of partial exposure of the API service. This allows the provider to expose a selected subset of the full API specification in the asset promoted to a product in the Marketplace.

  The asset create/edit wizard has a new **Configure Specification** step where the provider can select the option to **Manage Specification** for OAS2, OAS3, or Unstructured APIs. This displays a side panel with two options:

    * **Upload New specification file** - This allows a new OAS2 or OAS3 specification file where a subset of API methods or endpoint URLs can be defined for exposure in the asset/product published to the Marketplace.  

    * **Select Existing Operations** - This allows the search by Operation or Path within the full API specification and the selection of a subset of methods for exposure in the asset/product published to the Marketplace.

  {{< alert title="Note" color="primary" >}}The exposure of a partial API specification does NOT alter the full API specification in the Engage Service Registry.{{< /alert >}}

### Marketplace bug fixes for May 14, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32647| **Issue**: Marketplace AssetResourceUpdatedEventHandler taking more than 500s to process AssetResource/Asset update events. <br/>**Resolution**: Optimized Marketplace asset resource update events. |
| 01826485 | APIGOV-32437| **Issue**: Issue with the screen that shows list of accessible APIs. <br/>**Resolution**: A Status column has been added to the grid to note status of the resources based on application status. |
| 01784733 | APIGOV-31611| **Issue**: Conflict between asset-level and product-level categories. <br/>**Resolution**: The asset and product category conflict has been resolved. |
|          | APIGOV-32371| **Issue**: On small screens, the credentials date tooltip appears beneath "State." <br/>**Resolution**: A horizontal scrollbar has been added to ensure proper tooltip display. |
|           | APIGOV-32434| **Issue**: A release cannot be created on a small screen because the product's side panel does not allow scrolling. <br/>**Resolution**: Added scrollbar for improved side panel visibility. |
|           | APIGOV-32530| **Issue**: Marketplace UI: Improve Keycloak login handler. <br/>**Resolution**: Now, if main authentication fails to grant an auth token, users are redirected to the login page. |

## May 7, 2026

New enhancement for May 7 update.

### Agent update for May 7, 2026

* **IBM webMethods: hostname override**

  (WEBMETHODS AGENT, ENHANCEMENT)</br>
  The IBM (formerly Software AG) webMethods Discovery agent now lets you override the hostname for discovered API endpoints published to Amplify Central when the gateway is behind a load balancer or uses a custom domain. Configure the hostname override with the WEBMETHODS_GATEWAYHOST environment variable.

## May 4, 2026

New enhancements and bug fixes for the May 4 update.

### Agent updates for May 4, 2026

* **Apigee X: Endpoints discovered from the API spec file**

  (APIGEE X AGENT, ENHANCEMENT)</br>
  The Apigee X discovery agent has been enhanced to discover the Endpoint URL from the server field in associated API specification file.  If no server field is found in the API Specification file, an endpoint constructed from the Proxy details will be used.

* **Azure Agent support for new Entra ID URI format**

  (AZURE AGENT, ENHANCEMENT)</br>
  The Azure agent has been enhanced to support the updated Microsoft Entra ID URI format. TURI validation now aligns with Entra ID restriction policy requirements, ensuring identifier URIs include the application’s client ID, a verified domain, or tenant ID(s). For details, see the Microsoft documentation on the [Entra ID format](https://learn.microsoft.com/en-us/entra/identity-platform/reference-app-manifest#identifieruris-attribute).

* **Azure Agent: permissions update**

  (AZURE AGENT, ENHANCEMENT)</br>
  The Azure agent now supports **Application.ReadWrite.OwnedBy** and **ServicePrincipal.ReadWrite.OwnedBy** Microsoft Graph permissions, reducing the required scope to only manage resources the agent creates. Customers with existing **.All** permissions are unaffected and no configuration changes are required.

* **IBM webMethods: rate limiting support**

  (WEBMETHODS AGENT, ENHANCEMENT)</br>
  The IBM (formerly Software AG) webMethods Discovery and Traceability agents have been enhanced to support rate limiting of API requests to the webMethods platform. Rate limiting can be configured using the **WEBMETHODS_RATELIMIT** environment variable to help manage request volume.

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

### Agent bug fixes for May 4, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32406 | **Issue**: The Azure on-premise Traceability Agent was not reporting information to Consumer Insights and Business Insights > Application screens. <br/>**Resolution**: A fix was made to display the information on both Consumer Insights and Business Insights. |
|          | APIGOV-32441 | **Issue**: The APIM Discovery Agent would not detect the first deleted API Proxy as "Out of Sync." <br/>**Resolution**: A fix was made to detect the "Out of Sync" status of the first deleted API. |

### Marketplace updates for May 4, 2026

* **Marketplace Sign-In button customization**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Marketplace owners can now fully manage and style the **Sign In** button as a standard navigation bar item. The Sign In control follows the same configuration model as other built in navigation items, including consistent visibility and labeling management. In addition, Marketplaces can present distinct Sign In actions with different emphasis (for example, primary versus secondary), enabling clearer authentication entry points and more intentional user journeys.

* **Custom sender email address for Marketplace notifications**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Admins can now customize the "From" email address for Marketplace triggered emails, such as subscription approvals, Consumer Org registrations, credential expiry notifications, etc. This ensures a consistent, branded experience, improves partner trust, and reduces the risk of emails being flagged as spam.

  **How to configure**

    * Navigate to *Marketplace > Settings > SMTP*.
    * Enable use of a custom SMTP service.
    * In the **Sender** section, enter the email address that will be used as the sender using your organization’s domain and the display **name**.
    * In the **Connection Settings** section, provide your SMTP server details.
    * Save your changes.
    * Once configured, all Marketplace triggered emails will use the updated sender address.
  
## Marketplace bug fixes for May 4, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32414| **Issue**: Tooltip on Marketplace Product Warning Icon is not visible. <br/>**Resolution**: Fixed display issue to show the warning icon.|
|          | APIGOV-32294| **Issue**: Consumer Org User with Consumer role on x-private team cannot subscribe to free plans. <br/>**Resolution**: Consumer role for x-private team fixed to allow subscription to free plans. |
|          | APIGOV-32300| **Issue**: Featured Categories limit reached panel is not visible. <br/>**Resolution**: Fixed the UI so that the limit reached panel is now visible.|
|          | APIGOV-32355 | **Issue**: Users cannot run a compliance linting job for a specific API in the Service Registry. <br/>**Resolution**: A fix was made to allow users with permissions (Engage Admin) to run a compliance linting job from the Service Registry. |
|          | APIGOV-32541 | **Issue**: Subscription remains in pending to archive when the name is close to 100 characters. <br/>**Resolution**: The logical name for a subscription job that is generated when the consumer archives a subscription or plan is now generated based on the subscription ID, avoiding trimming or maxing out the resource logical name. |
