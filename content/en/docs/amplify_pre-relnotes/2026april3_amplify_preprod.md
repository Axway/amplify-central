---
title: Amplify Engage April 3 2026
linkTitle: Amplify Engage April 3 2026
weight: 21
date: 2026-3-31
---

**Feedback Window**: April 3 2026 → April 10 2026 <br />
**Planned Production Date**: April 16 <br />
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

| Environment type                           | Latest on-premise agent version <br />(based on Amplify Agents SDK 1.1.137 <br />unless otherwise noted) |
|--------------------------------------------|--------------------------|
| Axway API Management 7.7                   | DA=1.2.53 / TA=1.2.44    |
| AWS Gateway using SDK 2.0                  | DA=1.2.42 / TA=1.2.42    |
| Azure latest release                       | DA=1.3.42 / TA=1.3.42    |
| Istio 1.9.5                                | DA=1.1.41 / TA=2.1.38    |
| Apigee Edge                                | 1.0.36                   |
| Apigee X                                   | 1.4.27                   |
| Mulesoft Anypoint platform v3              | 1.2.42                   |
| Software AG webMethods                     | 1.0.33                   |
| Kong Gateway                               | 1.1.39                   |
| GitLab                                     | 1.1.39                   |
| Kafka Cluster                              | 1.1.32                   |
| IBM API Connect Gateway                    | 1.1.33                   |
| Backstage                                  | 1.0.35                   |
| SAP Integration Suite - API Management / API Portal | 1.0.21          |
| WSO2 API Manager 4.5.0                     | 1.0.21                   |
| Sensedia                                   | 1.0.11                   |

| Supported SaaS (embedded) agents           |
|--------------------------------------------|
| AWS Embedded Service                       |
| Apigee X Embedded Service                  |
| GitHub Embedded Service                    |
| Azure Embedded Service                     |
| SwaggerHub Embedded Service                |
| Traceable Embedded API Security Service    |
| Akamai Embedded API Security Service       |

| Runtime Compliance agents                  | Latest on-premise agent version <br />(based on Amplify Agents SDK 1.1.137 unless otherwise noted)  |
|--------------------------------------------|--------------------------|
| Graylog API Security                       | 1.1.32                   |
| Traceable API Security                     | 2.0.18                   |
| Akamai API Security                        | 1.1.6                    |

## Agent updates

* **API filtering for SAP Integration Suite - API Management / API Portal**

  (DISCOVERY AGENT, ENHANCEMENT)</br>
  The SAP Discovery Agent has been enhanced to support the automatic filtering of discovered APIs by tags.

* **Mulesoft agent rate limiting**

  (DISCOVERY AGENT, ENHANCEMENT)</br>
  The Mulesoft agent has been enhanced to limit the frequency of calls to Mulesoft APIs.

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
  See the table above for the latest versions of all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-31809 | **Issue**: The minimum, average and maximum API response times had equal values. <br/>**Resolution**: A fix was made to the agent SDK to include the correct values in the metrics events. |
| 01819611 | APIGOV-32273 | **Issue**: The Azure SaaS service was unable to discover APIs if their names contained parentheses, for example, api(name). <br/>**Resolution**: The Azure SaaS service can now successfully discover APIs that include parentheses in their names. |

## Marketplace updates

* **Request credential: existing credentials detection**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  When a consumer requests credentials for a resource with an application that already has credentials, a helpful message will now be displayed informing the consumer that existing credentials are available for the application. This message indicates that it may not be necessary to request new credentials and suggests reusing an existing credential. Additionally, the consumer can click on a "View existing credentials" link in the side panel to view a list of existing credentials for the selected application.  

* **Standardize Provider screen "+Add" buttons**
  
  (PROVIDER EXPERIENCE, ENHANCEMENT, SUPPORT CONTACTS)</br>
  Upgraded Provider **+ Add** button and header UIs for Add/Edit Product > Support Contacts > Add Support Contact button, boosting consistency across pages.

* **Marketplace landing page: Document ID in the URL**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  When the Marketplace is configured in Marketplace settings to use a document from the Document Library as the default landing page, the URL for the landing page displays the document's ID. To mitigate any risk if a user modifies the characters of the Document ID in the URL, the user will now be redirected to the landing page instead of the "Document not found" page.  
  
## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32308 | **Issue**: The table display for the group resources step of the asset wizard is not fully visible due to the screen width. <br/>**Resolution**: Horizontal scroll bars are now displayed if needed due to the screen width. |
| 01816942 <br/>01822911 | APIGOV-32207 | **Issue**: The "Create Mock Endpoint" action from the service details page would not allow the user to save the mock endpoint. <br/>**Resolution**: A fix was made to the title of the side panel to display "Create Mock Endpoint" and to allow the save action if all the necessary data was inputted. |
|          | APIGOV-32353 | **Issue**: When viewing the Compliance Profiles side panel, API calls would be continuously made until the side panel was closed. <br/>**Resolution**: A fix was made to reduce the number of API calls generated. |
| 01800612 | APIGOV-32179| **Issue**: In Engage, while viewing Tools for a Service, when the sections were expanded the table header overlapped with the title. <br/>**Resolution**: Fixed display issue to remove the overlap for Tools. |
|          | APIGOV-32259| **Issue**: Publishing or unpublishing a product should be prevented on the UI if a non-admin user is not the owner. <br/>**Resolution**: The Publish and Unpublish buttons in the UI now prevent the negative path for non-admin users. |
|          | APIGOV-30385| **Issue**: 80% CPU spikes in prod US triggered alert - marketplace db query. <br/>**Resolution**: Corrected a missing index on publish_stages / marketplace field. |
| 01803047 | APIGOV-31895| **Issue**: Unable to Remove Category from Featured Marketplace<br/>**Resolution**: Fixed the save state for Featured Categories to allow removing a category from being featured in the Marketplace. |
|          | APIGOV-32354| **Issue**: RDS CPU spike caused by Marketplace queries. <br/>**Resolution**: Added an index on asset_resource_cred_defs / credential_def_id to reduce the cost to around 25. |
