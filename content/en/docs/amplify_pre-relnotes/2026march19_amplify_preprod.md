---
title: Amplify Engage March 5 2026
linkTitle: Amplify Engage March 5 2026
weight: 23
date: 2026-3-3
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

* **Update**

  (AGENT, ENHANCEMENT)</br>
  Description.

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  See the table above for the latest versions of all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| xxxxxxxx | APIGOV-xxxxx | **Issue**: Description. <br/>**Resolution**: Description. |

## Marketplace updates

* **Enhancement**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Description.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| xxxxxxxx | APIGOV-xxxxx | **Issue**: Description. <br/>**Resolution**: Description. |
