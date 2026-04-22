---
title: Amplify Engage April 2026
linkTitle: Amplify Engage April
weight: 10
date: 2026-3-31
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents). To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).{{< /alert >}}

---

## April 20, 2026

New enhancements and bug fixes for the April 20 update.

### Agent updates for April 20, 2026

* **API filtering for SAP Integration Suite - API Management / API Portal**

  (DISCOVERY AGENT, ENHANCEMENT)</br>
  The SAP Discovery Agent has been enhanced to support the automatic filtering of discovered APIs by tags.

* **Mulesoft agent rate limiting**

  (DISCOVERY AGENT, ENHANCEMENT)</br>
  As part of recent enhancements to Business Unit (BU) discovery, a rate‑limiting strategy has been introduced to control the volume of MuleSoft API executions and prevent throttling issues under high load.

* **Weaker cipher suites removed from all Traceability Agents**

  (TRACEABILITY AGENTS, ENHANCEMENT)</br>
  To enhance the security of Traceability Agent communications with the platform, the following weak CBC-mode cipher suites are no longer supported. These cipher suites should not be used in an agent environment variable named <CENTRAL_SSL_CIPHERSUITES> or <*_SSL_CIPHERSUITES>:
    * TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256
    * TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA
    * TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA

{{< alert title="Note" color="primary" >}}If agents are explicitly referencing one of the unsupported CBC-mode cipher suites listed above, the agent environment variable must be updated to one or more of the supported cipher suites.

See [Information Security](/docs/connect_manage_environ/connected_agent_common_reference/agent_security) for instructions.

If the agents are not explicitly referencing a cipher suite (i.e., using default values), then no configuration changes are required.
{{< /alert >}}

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

### Agent bug fixes for April 20, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-31809 | **Issue**: The minimum, average and maximum API response times had equal values. <br/>**Resolution**: A fix was made to the agent SDK to include the correct values in the metrics events. |
| 01819611 | APIGOV-32273 | **Issue**: The Azure SaaS service was unable to discover APIs if their names contained parentheses, for example, api(name). <br/>**Resolution**: The Azure SaaS service can now successfully discover APIs that include parentheses in their names. |

### Marketplace updates for April 20, 2026

* **Request credential: existing credentials detection**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  When a consumer requests credentials for a resource with an application that already has credentials, a helpful message will now be displayed informing the consumer that existing credentials are available for the application. This message indicates that it may not be necessary to request new credentials and suggests reusing an existing one. Additionally, the consumer can click on a "View existing credentials" link in the side panel to view a list of existing credentials for the selected application.  

* **Standardize Provider screen "+Add" buttons**
  
  (PROVIDER EXPERIENCE, ENHANCEMENT, SUPPORT CONTACTS)</br>
  Upgraded Provider **+ Add** button and header UIs for Add/Edit Product > Support Contacts > Add Support Contact button, boosting consistency across pages.

* **Marketplace landing page: Document ID in the URL**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  When the Marketplace is configured in Marketplace settings to use a document from the Document Library as the default landing page, the URL for the landing page displays the document's ID. To mitigate any risk if a user modifies the characters of the Document ID in the URL, the user will now be redirected to the landing page instead of the "Document not found" page.

* **Extended administrative controls of Consumer Organizations**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  **Organization Administrator and Marketplace Manager** roles now have enhanced permissions to manage **consumer organization metadata, teams, users, and role assignments**.  
  In addition, Organization Administrator role assignees can now **remove consumer organizations** when needed.  
These updates provide greater flexibility and control for administrators managing consumer organizations within the Marketplace.

### Marketplace bug fixes for April 20, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32308 | **Issue**: The table display for the group resources step of the asset wizard is not fully visible due to the screen width. <br/>**Resolution**: Horizontal scroll bars are now displayed if needed due to the screen width. |
| 01816942 <br/>01822911 | APIGOV-32207 | **Issue**: The "Create Mock Endpoint" action from the service details page would not allow the user to save the mock endpoint. <br/>**Resolution**: A fix was made to the title of the side panel to display "Create Mock Endpoint" and to allow the save action if all the necessary data was entered. |
|          | APIGOV-32353 | **Issue**: When viewing the Compliance Profiles side panel, API calls would be continuously made until the side panel was closed. <br/>**Resolution**: A fix was made to reduce the number of API calls generated. |
| 01800612 | APIGOV-32179| **Issue**: In Engage, while viewing Tools for a Service, when the sections were expanded the table header overlapped with the title. <br/>**Resolution**: Fixed display issue to remove the overlap for Tools. |
|          | APIGOV-32259| **Issue**: Publishing or unpublishing a product should be prevented on the UI if a non-admin user is not the owner. <br/>**Resolution**: The Publish and Unpublish buttons in the UI now prevent the negative path for non-admin users. |
|          | APIGOV-30385| **Issue**: 80% CPU spikes in prod US triggered alert - marketplace db query. <br/>**Resolution**: Corrected a missing index on publish_stages / marketplace field. |
| 01803047 | APIGOV-31895| **Issue**: Unable to Remove Category from Featured Marketplace<br/>**Resolution**: Fixed the save state for Featured Categories to allow removing a category from being featured in the Marketplace. |
|          | APIGOV-32354| **Issue**: RDS CPU spike caused by Marketplace queries. <br/>**Resolution**: Added an index on asset_resource_cred_defs / credential_def_id to reduce the cost to around 25. |
|          | APIGOV-32468| **Issue**: Production APIs not listed in Request Credential screen. <br/>**Resolution**: Code fix put in place to prevent future occurrence of this edge case from happening again where certain Credential Request Definitions (CRDs) did not have a defined type |

## April 7, 2026

New enhancement for the April 7 update.

### CLI updates for April 7, 2026

* **Engage CLI 4.11.0**

  (PROVIDER EXPERIENCE, AXWAY ENGAGE CLI, ENHANCEMENT)</br>
  The Axway Engage CLI *[v4.11.0](https://www.npmjs.com/package/@axway/axway-central-cli/v/4.11.0)* has been released to NPM registry with security updates.

## April 2, 2026

New enhancements and bug fixes for the April 2 update.

### Agent updates for April 2, 2026

* **Flagging of API services missing from the Axway V7 dataplane**

  (AXWAY API MANAGEMENT DISCOVERY AGENT, ENHANCEMENT)</br>
  The Axway API Management Discovery Agent now flags API services as "Out of Sync" when they are no longer detected on the dataplane. The Discovery Agent no longer automatically remove an API service from the Engage Service Registry. Instead, the provider must verify that the API has been removed from the dataplane before performing the delete action on the API service. Existing application registrations and credentials remain valid until the service is manually deleted, after which the standard corrupted-resource handling applies.

* **Agent transaction sampling per API/environment**

  (ALL AGENTS, ENHANCEMENT)</br>
  All agents supporting on-demand transaction sampling have been updated. Providers can now select all endpoints within an API service or all API services within a specific environment for sampling.

* **Axway API Management agent OKTA support**

  (AXWAY API MANAGEMENT DISCOVERY AGENT, ENHANCEMENT)</br>
  The Axway API Management Discovery Agent has been enhanced to populate the existing group and policy created on an OKTA identity provider with the pertinent application and client information. The group and policy names are set using agent environment variables to ensure that the registered OAuth client is assigned to the correct group or policy.

* **Sensedia 4.x support**

  (SENSEDIA AGENT, ENHANCEMENT)</br>
  The Sensedia Discovery Agent has been enhanced to handle the use case where the same API service is deployed across multiple Sensedia environments. Additionally, enhancements have been made to the handling of rate limiting settings for subscriptions with multiple quota entries.

* **New agent releases**

  (NEW AGENT RELEASES)</br>
   Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

### Agent bug fix for April 2, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01806466 | APIGOV-32028 | **Issue**: The Axway APIM Discovery Agent timed out when requesting a large number of API proxies from the API Manager. <br/>**Resolution**: Added support for lightweight v1.4 of the /proxies/light endpoint if supported by the API Manager. Otherwise, the v1.3 endpoint will be used. |

### Marketplace updates for April 2, 2026

* **Service Registry: New Sync Status**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  The Engage Service Registry and the Asset screens now display a "Sync Status" for API/MCP service(s) that may no longer exist on the associated dataplane. Three possible display badges have been added.
    * "Out of Sync" - Indicates the agent has detected the service as potentially removed or deleted from the dataplane. Services in this state cannot be linked or grouped in new asset releases via the UI.
    * "In Sync" -  Indicates the agent has detected the service on the dataplane.
    * "Manual" - Indicates the service was manually discovered. Application registrations and credential management must be handled manually outside the platform.

* **Filter environments by owner**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  A new filter has been added to the Environments screen to allow filtering by owner.

* **Access Rights - Alphabetize the 'Select Owning Team' dropdown**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  The **Select Owning Team** dropdown in Product Foundry, Assets and Categories now lists teams in a consistent alphabetical order.

* **Removed "fake endings" in Marketplace Categories and Applications screens**

  (CONSUMER EXPERIENCE, ENHANCEMENT)</br>
  The Marketplace Applications and Categories screens have been updated to remove "fake endings" and improve visual clarity.

* **Allow Google to crawl and index content in Marketplace**

  (ADMINISTRATION, NEW FEATURE)</br>
  Marketplace pages can now be crawled and indexed via Google Search Console. Administrators and Marketplace Managers can configure a single Google verification tag in **Marketplace Settings**. This option is available only when the Marketplace is set to Public. Additionally, you can disable search indexing per Marketplace.
  
### Marketplace bug fixes for April 2, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32185 | **Issue**: The API version creation wizard opened in the same browser as the service details tab. <br/>**Resolution**: UX pattern change made to open the wizard in a new browser tab. |
| 01812272 | APIGOV-32146 | **Issue**: Some fields in the Service Registry table did not display the entire text. <br/>**Resolution**: Full text is now shown on hover for Service Name, Environment, and Owner columns. |
|          | APIGOV-32111 | **Issue**: User unable to delete an MCP Client while editing the MCP service. <br/>**Resolution**: A fix enables the deletion of an MCP Client from the Edit screen using the ellipsis action button. |
| 01802658 | APIGOV-32060 | **Issue**: When the API resource linked to an asset is deleted and a new asset release is made, the new asset release Error status is not be set. This blocks the removal of a new asset release from the product plan quota. <br/>**Resolution**: The Asset release Error status now allows the removal of an asset release from a product quota plan. |
| 01806599 | APIGOV-31976 | **Issue**: The display of the number of services in the Environment details was confusing due to Access Control List settings. <br/>**Resolution**: A UX change now separates the display of the Team service count (limited by the Access Control List) and the Organization service count. |
| 01814472 | APIGOV-32149 | **Issue**: Subscription name replaced with Product name in Subscription details. <br/>**Resolution**: A UX change to correctly display the subscription name. |
| 01812281 | APIGOV-32145 | **Issue**: State was missing for mocked resources in Plan Preview to distinguish between regular and mocked resources. <br/>**Resolution**: State is now displayed for mocked resources in the Plan Preview. |
| 01812270 | APIGOV-32120 | **Issue**: Product description did not appear on hover-over in Product Foundry. <br/>**Resolution**: Description now appears on hover-over in Product Foundry. |
|          | APIGOV-32024 | **Issue**: User could delete documents in use within Document Library. <br/>**Resolution**: Logic change restricts deletion to only documents not in use. |
| 01809116 | APIGOV-32032 | **Issue**: Erroneous message appeared after trying out a resource on Marketplace. <br/>**Resolution**: The message has been removed. |
| 01897409 | APIGOV-31659 | **Issue**: Consumer users when part of a team with 'x-private' tag could subscribe to paid products. <br/>**Resolution**: Logic change ensures consumers can only subscribe to free plans. |
