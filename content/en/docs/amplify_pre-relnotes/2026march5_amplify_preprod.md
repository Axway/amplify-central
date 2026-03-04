---
title: Amplify Engage March 5 2026
linkTitle: Amplify Engage March 5 2026
weight: 24
date: 2026-3-3
---

**Feedback Window**: March 5 2026 → March 13 2026 <br />
**Planned Production Date**: March 19 2026 <br />
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

There are no new Agent Preview releases.
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
| Kafka Cluster                              | 1.1.29 (SDK v1.1.131)                  |
| IBM API Connect Gateway                    | 1.1.30                   |
| Backstage                                  | 1.0.32                   |
| SAP Integration Suite - API Management / API Portal | 1.0.18                  |
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

## Marketplace updates

* **Subscriptions sideblade tabs enhancement**

  (PROVIDER EXPERIENCE, SUBSCRIPTIONS, ENHANCEMENT)</br>
  We have enhanced the Subscriptions side blade on the Subscriptions page by moving “Tags & Attributes” and “Usage” from expandable sections into separate tabs, reducing vertical scrolling and improving information accessibility.

* **Product overview with markdown support**

  (CONSUMER EXPERIENCE, PRODUCTS, NEW FEATURE)</br>
  We added a new **Overview** field in the Product that makes it easier for providers to add richer prodcut information to the Marketplace product listing. When creating or editing a product, Providers can select and preview a **Markdown document** from the Document Library. On the Marketplace side, the product **Overview** tab renders the selected document. The content is rendered from the linked Markdown file and automatically updates whenever the document is updated in the Document Library, so you don’t need to manually update the product each time the documentation changes. The existing Description remains visible on the product cards and on the Product Details screen under the product name, giving consumers a quick summary while the Overview tab provides a more detailed explanation.

* **Publish `api_central.deprovisioned` pubsub event when processing deprovision events**

  (PLATFORM, ENHANCEMENT)</br>
  We now publish an api_central.deprovisioned event after processing an api_central.deprovision event to signal that an org is no longer provisioned in the region’s services. The event includes the required org_id in the payload to notify Platform of the completed deprovisioning state.

* **Direct links to Generate Credentials and Register Application in the approval notification emails**

  (CONSUMER EXPERIENCE, APPROVALS, ENHANCEMENT)</br>
  We improved the subscription approval notifications to make it easier for users to complete the next steps after their subscription or application registration request is approved. Approval emails now include direct links that take users straight to the relevant setup screens, such as **Register Application** and **Generate Credentials**, with the necessary information already pre-filled.

* **Product card: styling and reponsiveness improvements**

  (CONSUMER EXPERIENCE, MARKETPLACE, ENHANCEMENT)</br>
  We improved Marketplace product card responsiveness so that at 834px page width, cards automatically adjust to display a left-aligned image layout for a more consistent viewing experience. We also standardized the placement of error status icons on Product cards, ensuring they now appear in the upper-right corner alongside other status indicators for improved visual consistency.

* **Replace markdown component with markdown-it**

  (CONSUMER EXPERIENCE, PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  We replaced the existing react-markdown implementation with a more performant combination of markdown-it, unified, and rehype-react to better support large markdown documents with complex tables, significantly improving rendering performance. As part of this enhancement, we upgraded GraphiQL, aligned related dependencies (including GraphQL and Shiki), and updated styling and configurations to ensure compatibility with the latest versions.

* **Manual API/MCP Service Version Registration**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  The Engage Service Registry Details page supports the manual creation of API or MCP Service versions.  The Engage Admin, Catalog Manager, or Developer can create a new verion of an API or MCP Service.  

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|  01811246 | APIGOV-31896| **Issue**: MCP Transports Supported UI Issue Marketplace <br/>**Resolution**: Transports Supported field now populated in Marketplace for those which existed before the previous fix. |
|          | APIGOV-32065 | **Issue**: The preview of specific MD is not working in Engage. <br/>**Resolution**: Product documentation now renders correctly throughout Engage. |
|          | APIGOV-32022 | **Issue**: Localize API Service - shows fields for MCP service. <br/>**Resolution**: Localization function hidden as does not apply for API Service. |
|          | APIGOV-32080 | **Issue**: After logging in with Engage CLI, the first GET command returned about 5MB of data. <br/>**Resolution**: A fix was made to the API Server to reduce this to return about 500KB of data. |
