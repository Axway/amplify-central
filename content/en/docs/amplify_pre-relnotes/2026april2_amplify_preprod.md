---
title: Amplify Engage April 2 2026
linkTitle: Amplify Engage April 2 2026
weight: 21
date: 2026-3-31
---

**Feedback Window**: April 2 2026 → April ? 2026 <br />
**Planned Production Date**: April ? <br />
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

* **API Filtering for SAP Integration Suite - API Management / API Portal**

  (DISCOVERY AGENT, ENHANCEMENT)</br>
  The SAP Discovery agent has been enhanced to support the automatic filtering of discovered APIs by tags.

* **SaaS Azure API Filtering for SAP Integration Suite - API Management / API Portal**

  (DISCOVERY AGENT, ENHANCEMENT)</br>
  The SAP Discovery agent has been enhanced to support the automatic filtering of discovered APIs by tags.

* **Mulesoft Agent rate limiting**

  (DISCOVERY AGENT, ENHANCEMENT)</br>
  The Mulesoft agent has been enhanced to limit the frequency of calls to Mulesoft APIs.

* **Weaker Cipher Suties removed from all Traceability agents **

  (TRACEABILITY AGENTS, ENHANCEMENT)</br>
  To increase the security of the traceability agent communications to the platform, the following weak CBC-mode cipher suites are no longer supported and should not be used in an agent environment varible named <CENTRAL_SSL_CIPHERSUITES> or <*_SSL_CIPHERSUITES>:
  - TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256
  - TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA
  - TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA

**Note: If agents are explicitly referencing one of the unsupported CBC-mode cipher suites listed above, the agent environment variable must be updated to one or more of the supported cipher suites.**
See [Information Security](/docs/connect_manage_environ/connected_agent_common_reference/agent_security/index.html) for instructions

If the agents are not explicitly referencing a cipher suite (i.e. using default values), then no configuration changes are required.

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  See the table above for the latest versions of all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-31809 | **Issue**: The minimum, average and maximum API response times had equal values. <br/>**Resolution**: A fix was made to the agent SDK to include the correct values in the metrics events. |
| 01819611 | APIGOV-32273 | **Issue**: The Azure SaaS service was not discovering APIs with a parantheses in their name e.g. api(name). <br/>**Resolution**: A fix was made to Azure SaaS service to discovery APIs with a parantheses in the name. |

## Marketplace updates

* **Application Existing Credentials**
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  When a consumer is requesting credentials for a resource with an application that already has credential, the consumer will now be provided with a helpful message that there are existing credentials for the application and the consumer may not need to request a new credential and instead reused an existing one. Additionally the consumer can clicks on a "View existing credentials" link in sideblade and be presented with a list of existing credentials for the selected application.  

* **Standardize Provider Screen "+Add" Buttons**
  (PROVIDER EXPERIENCE, ENHANCEMENT, SUPPORT CONTACTS)</br>
  Upgraded Provider "+ Add" button and header UIs for Add/Edit Product>Support Contacts>Add Support Contact button, boosting consistency across pages

* **Marketplace Landing Page Document ID in URL**
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  When the Marketplace is configured in Marketplace settings to use a Document from the Document Library as the Default Landing page, the URL for the Landing page displays the Document's ID.  To mitigate any risk if a user modifies the characters of the Document ID in the URL, the user will now be redirected to the Landing page instead of the "Document not found" page.  
  
## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32308 | **Issue**: The table display for the group resources step of the asset wizard is not fully visible due to the screen width. <br/>**Resolution**: A fix was made to display horizontal scroll bars if needed due to the screen width. |
| 01816942 <br/>01822911 | APIGOV-32207 | **Issue**: The "Create Mock Endpoint" action from the service details page would not allow the user to save the mock endpoint. <br/>**Resolution**: A fix was made to the title of the sideblade to display "Create Mock Endpoint" and to allow the save action if all the necessary data was inputed. |
|          | APIGOV-32353 | **Issue**: When viewing the Compliance Profiles sideblade, API calls would be coninuously made until the sideblade was closed. <br/>**Resolution**: A fix was made to reduct the number of API calls generated
| 01800612 | APIGOV-32179| **Issue**: In Engage, while viewing Tools for a Service, when the sections are expanded the table header overlaps with the title <br/>**Resolution**: Fixed display issue to remove the overlap for Tools
|           | APIGOV-32259| **Issue**: Publishing/Unpublishing a product should be prevented on the UI if non-admin user is not the owner <br/>**Resolution**: Publish and unpublish buttons in UI updated to prevent negative path for non admin user
|           | APIGOV-30385| **Issue**: 80% CPU spikes in prod US triggered alert - marketplace db query <br/>**Resolution**: Corrected a missing index on publish_stages / marketplace field
| 01803047 | APIGOV-31895| **Issue**: Unable to Remove Category from Featured Marketplace<br/>**Resolution**: Save state for Featured Categories fixed to allow for removing as featured the marketplace
|           | APIGOV-32354| **Issue**: RDS CPU spike caused by Marketplace queries <br/>**Resolution**: Added an index on asset_resource_cred_defs / credential_def_id to reduce the cost to around 25
