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

* **Enhancement**

  (AGENT, ENHANCEMENT)</br>
  Description.

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  See the table above for the latest versions of all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| xxxxxxxx | APIGOV-xxxx7 | **Issue**: Description. <br/>**Resolution**: Description. |

## Marketplace updates

* **Enhancement**

  (CONSUMER EXPERIENCE, NEW FEATURE)</br>
  Description.
  
## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-xxxx | **Issue**: Description. <br/>**Resolution**: Description. |
