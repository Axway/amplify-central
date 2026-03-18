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

| Environment type                           | Latest on-premise agent version <br />(based on Amplify Agents SDK 1.1.135 <br />unless otherwise noted) |
|--------------------------------------------|--------------------------|
| Axway API Management 7.7                   | DA=1.2.50 / TA=1.2.41    |
| AWS Gateway using SDK 2.0                  | DA=1.2.39 / TA=1.2.39    |
| Azure latest release                       | DA=1.3.37 / TA=1.3.37    |
| Istio 1.9.5                                | DA=1.1.38 / TA=2.1.35    |
| Apigee Edge                                | 1.0.33                   |
| Apigee X                                   | 1.4.23                   |
| Mulesoft Anypoint platform v3              | 1.2.39                   |
| Software AG webMethods                     | 1.0.30                   |
| Kong Gateway                               | 1.1.36                   |
| GitLab                                     | 1.1.31                   |
| Kafka Cluster                              | 1.1.29 (SDK v1.1.131)    |
| IBM API Connect Gateway                    | 1.1.30                   |
| Backstage                                  | 1.0.32                   |
| SAP Integration Suite - API Management / API Portal | 1.0.18          |
| WSO2 API Manager 4.5.0                     | 1.0.18                  |
| Sensedia                                   | 1.0.8                   |

| Supported SaaS (embedded) agents           |
|--------------------------------------------|
| AWS Embedded Service                       |
| Apigee X Embedded Service                  |
| GitHub Embedded Service                    |
| Azure Embedded Service                     |
| SwaggerHub Embedded Service                |
| Traceable Embedded API Security Service    |
| Akamai Embedded API Security Service       |

| Runtime Compliance agents                  | Latest on-premise agent version <br />(based on Amplify Agents SDK 1.1.135 unless otherwise noted)  |
|--------------------------------------------|--------------------------|
| Graylog API Security                       | 1.1.29                   |
| Traceable API Security                     | 2.0.15                   |
| Akamai API Security                        | 1.1.2                    |

## Agent updates

* **Axway API Management agent Out of Sync marking**

  (AXWAY API MANAGEMENT DISCOVERY AGENT, ENHANCEMENT)</br>
  The Axway API Management discovery agent has been enhanced to mark an API service as "Out of Sync" if the API has been detected as removed from the dataplane. Agents will no longer remove an API service from the Engage Service Registry automatically. The provider should confirm that the API service has been removed from the dataplane before performing the delete action on the API service.
The Axway API Management discovery agent will change the mark from "Out of Sync" to "In Sync" if the API service is detected on the dataplane.

* **Agent Transaction Sampling per API/Environment**

  (ALL AGENTS, ENHANCEMENT)</br>
  All agents which support on-demand transaction sampling have been enhanced to allow the provider to select all endpoints in API service or all API services in an environment. 

* **Axway API Management agent OKTA support**

  (AXWAY API MANAGEMENT DISCOVERY AGENT, ENHANCEMENT)</br>
  The Axway API Management discovery agent has been enhanced to populate the existing group and policy created on an OKTA identity provider with information. The group and policy name are set by the agent environment variables so the registered OAuth client can be assigned to the correct group/policy.

* **Sensidia 4.x support**

  (SENSEDIA AGENT, ENHANCEMENT)</br>
  The Sensedia discovery agent has been enhanced to handle the use case of the same API service deployed across multiple Sensedia environments. An improvement to the handling of rate limiting settings for a subscription with multiple quota entries.

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  See the table above for the latest versions of all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01818551 <br/>01818601 | APIGOV-32247 | **Issue**: The Agent status was displayed as **stopped** when the agents were **running**. <br/>**Resolution**: A fix was made on the platfrom to handle status update change. |
| xxxx | APIGOV-32247 | **Issue**: The Agent status was not being updated. <br/>**Resolution**: A fix was made on the platfrom to handle status update. |


## Marketplace updates

* **Enhancement**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Description.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32185 | **Issue**: The API version creation wizard opened in the same browser service details tab. <br/>**Resolution**: UX patern change made to openthe wizard in a new browser tab. |
| 01812272 | APIGOV-32146 | **Issue**: The entire display text is not visible for some fields in the Service Registry table. <br/>**Resolution**: The entire text is display on hover for the fields in the Service Name, Environment, and Owner columns. |
|          | APIGOV-32111 | **Issue**: A user was unable to delete of an MCP Client while editing the MCP service. <br/>**Resolution**: A fix was made to enable the deletion of an MCP Client from Edit screen with the ellipsis action button. |
