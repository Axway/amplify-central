---
title: Amplify Engage February 24 2026
linkTitle: Amplify Engage February 24 2026
weight: 24
date: 2026-2-12
---

**Feedback Window**: Start Date → End Date <br />
**Planned Production Date**: Date <br />
**Environment**: Non-production

---

This preview (preprod) environment allows you to test and validate upcoming features, enhancements, and bug fixes before they are promoted to production.

Feedback collected during preview testing may result in changes, deferrals, or removals of the previewed features, enhancements, and bug fixes in the upcoming production release.

See [Provide testing feedback](/docs/amplify_pre-relnotes/#provide-testing-feedback) for instructions on submitting preprod testing feedback.

---

## Supported agents

| Environment type                           | Latest on-premise agent version <br />(based on Amplify Agents SDK 1.1.131 <br />unless otherwise noted) |
|--------------------------------------------|--------------------------|
| Axway API Management 7.7                   | DA=1.2.43 / TA=1.2.40 (SDK v1.1.134) |
| AWS Gateway using SDK 2.0                  | DA=1.2.38 / TA=1.2.38 (SDK v1.1.133) |
| Azure latest release                       | DA=1.3.36 / TA=1.3.36    |
| Istio 1.9.5                                | DA=1.1.37 / TA=2.1.34 (SDK v1.1.134)  |
| Apigee Edge                                | 1.0.32 (SDK v1.1.134)                 |
| Apigee X                                   | 1.4.22                   |
| Mulesoft Anypoint platform v3              | 1.2.38 (SDK v1.1.134)    |
| Software AG webMethods                     | 1.0.29                   |
| Kong Gateway                               | 1.1.35                   |
| GitLab                                     | 1.1.30                   |
| Kafka Cluster                              | 1.1.29                   |
| IBM API Connect Gateway                    | 1.1.29                   |
| Backstage                                  | 1.0.30                   |
| SAP Integration Suite - API Management / API Portal | 1.0.17                   |
| WSO2 API Manager 4.5.0                     | 1.0.17                   |
| Sensedia                                   | 1.0.7 (SDK v1.1.134)     |

| Supported SaaS (embedded) agents           |
|--------------------------------------------|
| AWS Embedded Service                       |
| Apigee X Embedded Service                  |
| GitHub Embedded Service                    |
| Azure Embedded Service                     |
| SwaggerHub Embedded Service                |
| Traceable Embedded API Security Service    |

| Runtime Compliance agents                  | Latest on-premise agent version <br />(based on Amplify Agents SDK 1.1.131 unless otherwise noted)  |
|--------------------------------------------|--------------------------|
| Graylog API Security                       | 1.1.28                   |
| Traceable API Security                     | 2.0.14                   |
| Akamai API Security                        | 1.0.0 (SDK v1.1.132)     |

## Agent updates

* **Akamai SaaS Agent**

(AKAMAI API SECURITY AGENT, ENhANCEMENT)</br>
  The Akamai API Security Agent has been released as a SaaS service. It sends Managed API specifications from Engage to Akamai to execute Akamai Conformance Analysis. This improves the combined value of Engage and Akamai to more accurately identify endpoints with risks and shadow endpoints. The Conformance Analysis results are displayed on the Engage Environment details page.   

(NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-xxxxx | **Issue**: Description. <br/>**Resolution**: Description. |

## Marketplace updates

* **Manual API/MCP Service Creaction**
  
   (PROVIDER EXPERIENCE, MANUAL ADDITION OF AN API/MCP SERVICE, ENHANCEMENT)</br>
  The Service Registry has been enhanced to all the Provider to manually add an API/MCP service with a UI wizard which allows the user to select from their accessible environment(s).

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32074 | **Issue**: An error occurs on the UI when viewing an Service details page if the service has no API compliance results. <br/>**Resolution**: A fix has been made to the Service details page. |
| 01809186 | APIGOV-32042 | **Issue**: The Next button remained disabled after manually uploading an Async API specification file. <br/>**Resolution**: The Next button has been fixed to be enabled after upload of an Async API Specification file. |
|          | APIGOV-31968 | **Issue**: The Asset details page does not refresh the product releases in the products tab. This was observed after the selection of an active asset release and then selecting a draft asset release to view the products tab. <br/>**Resolution**: The refresh of the product releases has been fixed. |
