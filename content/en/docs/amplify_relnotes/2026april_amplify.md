---
title: Amplify Engage April 2026
linkTitle: Amplify Engage April
weight: 10
date: 2026-3-31
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents). To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).{{< /alert >}}

---

## April 2, 2026

New enhancements and bug fixes for the April 2 update.

<!--### Agent updates for April 2, 2026

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

### Agent bug fixes for April 2, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01806466 | APIGOV-32028 | **Issue**: The Axway APIM Discovery Agent timed out when requesting a large number of API proxies from the API Manager. <br/>**Resolution**: Added support for lightweight v1.4 of the /proxies/light endpoint if supported by the API Manager. Otherwise, the v1.3 endpoint will be used. | -->

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
