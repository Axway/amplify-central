---
title: Amplify Engage February 24 2026
linkTitle: Amplify Engage February 24 2026
weight: 24
date: 2026-2-12
---

**Feedback Window**: February 25 2026 → March 4 2026 <br />
**Planned Production Date**: March 5 2026 <br />
**Environment**: Non-production

---

This preproduction environment allows you to test and validate upcoming features, enhancements, and bug fixes before they are promoted to production.

Please note that, depending on the nature of the feedback and the timing of its submission, it may not be incorporated into the upcoming production release.

See [Provide testing feedback](/docs/amplify_pre-relnotes/#provide-testing-feedback) for instructions on submitting preprod testing feedback.

Please note the following Agent Environment variable settings must be set to access the preprod environment in the US region:

CENTRAL_URL=https://engage.na-us.axwaypreprod.net
TRACEABILITY_HOST=phoenix.na-us.axwaypreprod.net:443  #TA only

Please note the following Agent Environment variable settings must be set to access the preprod environment in the EU region:

CENTRAL_AUTH_URL=https://login.na-us.axwaypreprod.net/auth 
CENTRAL_PLATFORMURL=https://platform.na-us.axwaypreprod.net 
CENTRAL_URL=https://engage.eu-fr.axwaypreprod.net
CENTRAL_DEPLOYMENT=preprod                               # TA only
TRACEABILITY_HOST=phoenix.eu-fr.axwaypreprod.net:443     # TA only
TRACEABILITY_PROTOCOL=https                              # TA only

---

## Supported agents

| Environment type                           | Latest on-premise agent version <br />(based on Amplify Agents SDK 1.1.135 <br />unless otherwise noted) |
|--------------------------------------------|--------------------------|
| Axway API Management 7.7                   | DA=1.2.43 / TA=1.2.40 (SDK v1.1.134) |
| AWS Gateway using SDK 2.0                  | DA=1.2.38 / TA=1.2.38 (SDK v1.1.133) |
| Azure latest release                       | DA=1.3.36 / TA=1.3.36    |
| Istio 1.9.5                                | DA=1.1.37 / TA=2.1.34 (SDK v1.1.134)  |
| Apigee Edge                                | 1.0.32 (SDK v1.1.134)                 |
| Apigee X                                   | 1.4.22                   |
| Mulesoft Anypoint platform v3              | 1.2.39                  X |
| Software AG webMethods                     | 1.0.29                   |
| Kong Gateway                               | 1.1.36                  X |
| GitLab                                     | 1.1.31                  X |
| Kafka Cluster                              | 1.1.29                   |
| IBM API Connect Gateway                    | 1.1.29                   |
| Backstage                                  | 1.0.32                  X |
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
| Akamai Embedded API Security Service       |


| Runtime Compliance agents                  | Latest on-premise agent version <br />(based on Amplify Agents SDK 1.1.131 unless otherwise noted)  |
|--------------------------------------------|--------------------------|
| Graylog API Security                       | 1.1.29                 X  |
| Traceable API Security                     | 2.0.14                   |
| Akamai API Security                        | 1.0.0 (SDK v1.1.132)     |

## Agent updates

* **Akamai SaaS Agent**

  (AKAMAI API SECURITY AGENT, ENhANCEMENT)</br>
  The Akamai API Security Agent has been released as a SaaS service. It sends Managed API specifications from Engage to Akamai to execute Akamai Conformance Analysis. This improves the combined value of Engage and Akamai to more accurately identify endpoints with risks and shadow endpoints. The Conformance Analysis results are displayed on the Engage Environment details page.

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32074 | **Issue**: TBD. <br/>**Resolution**: TBD. |

## Marketplace updates

* **Manual API/MCP service creation**
  
  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  The Service Registry now allows providers to manually add a new API or MCP service through a guided UI wizard. During the setup process, users can select from the environments they have access to. This enhanecment enables providers to quickly register services without relying solely on automated discovery.

* **Application Registration: Ability to search in the Subscription dropdown**

  (CONSUMER EXPERIENCE, APPLICATION REGISTRATION, ENHANCEMENT)</br>
  Marketplace consumers can now search within the Subscriptions dropdown portion of the Select Application wizard step without having to manually scroll through a potentially long list.

* **UX audit updates for consistency across UI - Product details**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  The *Product Foundry|Product details* has been updated with several usability and styling fixes.

* **Expose user type owner for x-private teams in API Server**

  (ANALYTICS, ENHANCEMENT)</br>
  To allow agents (and Fusion) to include subscription owner details in Insights events, Analytics now gets API Server user-type owner information the Marketplace backend.

* **Fusion requires that Marketplace supports authorization for credentials without a Client Secret**

  (AUTHORIZATION, FUSION, CONFIGURATION)</br>
  Fusion requires that the Marketplace supports OAuth2 authorization with credentials that do not require a client secret.

* **Enhanced filtering and display options in Subscriptions view**

  (PROVIDER, SUBSCRIPTIONS, ENHANCEMENT)</br>
  The Engage Subscriptions screen has been enhanced to make information easier to find and navigate by introducing an additional filtering option for Marketplace, adding Plan to the table display, and enhancing the search query to include Subscription ID, Plan, and Product.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32074 | **Issue**: An error occurred on the UI when viewing a Service details page if the service had no API compliance results. <br/>**Resolution**: The Service details page now displays as expected. |
| 01809186 | APIGOV-32042 | **Issue**: The **Next** button remained disabled after manually uploading an Async API Specification file. <br/>**Resolution**: The Next button is now enabled after the upload of an Async API Specification file. |
|          | APIGOV-32019 | **Issue**: GraphQL query for asset resources requires quote escape for search term. <br/>**Resolution**: GraphQL query implemented for defect APIGOV-31938 required quote escapes for search term in the constructed query. |
|          | APIGOV-31970 | **Issue**: Validate enum parameters before opening a DB transaction - attacks on MP occurred when using different values for filter parameters <br/>**Resolution**: Moved validation to happen before a DB transaction is opened and before the request hits our backend logic. |
|          | APIGOV-31968 | **Issue**: The Asset details page did not refresh the product releases in the *Products* tab. This was observed after the selection of an active asset release when selecting a draft asset release to view the *Products* tab. <br/>**Resolution**: The refresh of the product releases has been fixed. |
|          | APIGOV-31838 | **Issue**: Stop publishing resource tags in internal events. <br/>**Resolution**: Updates made to stop sending tags in the events published by Analytics controller to Platform. Verified that the activity view still works as expected, and minimized the duplication of tags & attributes in the API Server events to the best extent possible. |
|          | APIGOV-31540 | **Issue**: Visibility of Compliance Score Details for Developer Role. <br/>**Resolution**: Developer role can now view the linting results. |
|          | APIGOV-31073 | **Issue**: [Central UI] Enable Marketplace visibility selection for document library. <br/>**Resolution**: Marketplace Manager, Catalog Manager, Developer, and Engage Admin roles updated as appropriate Marketplace visibility. |
|          | APIGOV-30403 | **Issue**: Wrong subscriber info for user in a default team with x-private tag. <br/>**Resolution**: The new structure for Marketplace subresource now includes an addition of user information when the owner is a user belonging to a specific team. |
