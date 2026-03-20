---
title: Amplify Engage March 19 2026
linkTitle: Amplify Engage March 19 2026
weight: 22
date: 2026-3-11
---

**Feedback Window**: March 19 2026 → March 27 2026 <br />
**Planned Production Date**: April 2 <br />
**Environment**: Pre-production

---

This preproduction environment allows you to test and validate upcoming features, enhancements, and bug fixes before they are promoted to production.

Please note that, depending on the nature of the feedback and the timing of its submission, it may not be incorporated into the upcoming production release.

See [Provide testing feedback](/docs/amplify_pre-relnotes/#provide-testing-feedback) for instructions on submitting preprod testing feedback.

---

## Supported agents

To access the **pre‑prod environment**, you must set the following **Agent environment variables**, depending on the region you are connecting to.

### Pre-prod US Region

CENTRAL_AUTH_URL=<https://login.na-us.axwaypreprod.net/auth></br>
CENTRAL_PLATFORMURL=<https://platform.na-us.axwaypreprod.net></br>
CENTRAL_URL=<https://engage.na-us.axwaypreprod.net></br>
CENTRAL_DEPLOYMENT=preprod (# TA only)</br>
TRACEABILITY_HOST=phoenix.na-us.axwaypreprod.net:443 (# TA only)</br>
TRACEABILITY_PROTOCOL=https (# TA only)

### Pre-prod EU Region

CENTRAL_AUTH_URL=<https://login.na-us.axwaypreprod.net/auth></br>
CENTRAL_PLATFORMURL=<https://platform.na-us.axwaypreprod.net></br>
CENTRAL_URL=<https://engage.eu-fr.axwaypreprod.net></br>
CENTRAL_DEPLOYMENT=preprod (# TA only)</br>
TRACEABILITY_HOST=phoenix.eu-fr.axwaypreprod.net:443 (# TA only)</br>
TRACEABILITY_PROTOCOL=https (# TA only)

### Supported agent versions

| Environment type                           | Latest on-premise agent version <br />(based on Amplify Agents SDK 1.1.136 <br />unless otherwise noted) |
|--------------------------------------------|--------------------------|
| Axway API Management 7.7                   | DA=1.2.51 / TA=1.2.42    |
| AWS Gateway using SDK 2.0                  | DA=1.2.40 / TA=1.2.40    |
| Azure latest release                       | DA=1.3.38 / TA=1.3.38    |
| Istio 1.9.5                                | DA=1.1.39 / TA=2.1.36    |
| Apigee Edge                                | 1.0.34                   |
| Apigee X                                   | 1.4.24                   |
| Mulesoft Anypoint platform v3              | 1.2.40                   |
| Software AG webMethods                     | 1.0.31                   |
| Kong Gateway                               | 1.1.37                   |
| GitLab                                     | 1.1.37                   |
| Kafka Cluster                              | 1.1.30                   |
| IBM API Connect Gateway                    | 1.1.31                   |
| Backstage                                  | 1.0.33                   |
| SAP Integration Suite - API Management / API Portal | 1.0.19          |
| WSO2 API Manager 4.5.0                     | 1.0.19                   |
| Sensedia                                   | 1.0.9                    |

| Supported SaaS (embedded) agents           |
|--------------------------------------------|
| AWS Embedded Service                       |
| Apigee X Embedded Service                  |
| GitHub Embedded Service                    |
| Azure Embedded Service                     |
| SwaggerHub Embedded Service                |
| Traceable Embedded API Security Service    |
| Akamai Embedded API Security Service       |

| Runtime Compliance agents                  | Latest on-premise agent version <br />(based on Amplify Agents SDK 1.1.136 unless otherwise noted)  |
|--------------------------------------------|--------------------------|
| Graylog API Security                       | 1.1.30                   |
| Traceable API Security                     | 2.0.16                   |
| Akamai API Security                        | 1.1.3                    |

## Agent updates

* **Flagging of API services missing from the Axway V7 dataplane**

  (AXWAY API MANAGEMENT DISCOVERY AGENT, ENHANCEMENT)</br>
  The Axway API Management Discovery Agent now flags API services as "Out of Sync" when they are no longer detected on the dataplane. The Discovery Agent no longer automatically remove an API service from the Engage Service Registry. Instead, the provider must verify that the API has been removed from the dataplane before performing the delete action on the API service. Existing application registrations and credentials remain valid until the service is manually deleted, after which the standard corrupted-resource handling applies.

* **Agent transaction sampling per API/environment**

  (ALL AGENTS, ENHANCEMENT)</br>
  All agents supporting on-demand transaction sampling have been updated. Providers can now select all endpoints within an API service or all API services within a specific environment for sampling.

* **Axway API Management agent OKTA support**

  (AXWAY API MANAGEMENT DISCOVERY AGENT, ENHANCEMENT)</br>
  The Axway API Management Discovery Agent has been enhanced to populate the group and policy information for an OKTA identity provider. The group and policy names are set using agent environment variables to ensure that the registered OAuth client is assigned to the correct group or policy.

* **Sensedia 4.x support**

  (SENSEDIA AGENT, ENHANCEMENT)</br>
  The Sensedia Discovery Agent has been enhanced to handle the use case where the same API service is deployed across multiple Sensedia environments. Additionally, enhancements have been made to the handling of rate limiting settings for subscriptions with multiple quota entries.

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  See the table above for the latest versions of all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01818551 <br/>01818601 | APIGOV-32247 | **Issue**: The Agent status appeared as **stopped** when the agents were actually **running**. <br/>**Resolution**: Platform fix implemented to properly handle status update changes. |
| 01806466 | APIGOV-32028 | **Issue**: The Axway APIM Discovery Agent timed out when requesting a large number of API proxies from the API Manager. <br/>**Resolution**: Added support for lightweight v1.4 of the /proxies/light endpoint if supported by the API Manager. Otherwise, the v1.3 endpoint will be used. |

## Marketplace updates

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
  
## Marketplace bug fixes

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
