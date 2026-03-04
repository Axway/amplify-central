---
title: Amplify Engage March 5 2026
linkTitle: Amplify Engage March 5 2026
weight: 24
date: 2026-3-3
---

**Feedback Window**: March ? 2026 → March ? 2026 <br />
**Planned Production Date**: March ? 2026 <br />
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

## Agent updates

* **Agent**

  (AKAMAI API SECURITY AGENT, ENHANCEMENT)</br>
  Description.

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  See the table above for the latest versions of all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| xxxxxxxx | APIGOV-xxxxx | **Issue**: Description. <br/>**Resolution**: Description. |

## Marketplace updates

* **Subscriptions Sideblade Tabs Enhancement**
   (PROVIDER EXPERIENCE, SUBSCRIPTIONS, ENHANCEMENT)</br>
  We have enhanced the Subscriptions side blade on the Subscriptions page by moving “Tags & Attributes” and “Usage” from expandable sections into separate tabs, reducing vertical scrolling and improving information accessibility.

* **As a consumer I want to see rich detailed information about a Marketplace Product**
  (CONSUMER EXPERIENCE, PRODUCTS, ENHANCEMENT)</br>
  We added a new **Overview** field in Product Details that allows Providers to select and preview a Markdown document from the Document Library within the Product Wizard (Profile tab), enabling rich, detailed product information to be displayed in Marketplace. The Marketplace Product now features an **Overview** tab that renders the linked document (auto-updating with library changes) and retains the existing Description below the product name.

* **Publish `api_central.deprovisioned` pubsub event when processing deprovision events**
  (PLATFORM, ENHANCEMENT)</br>
  We now publish an api_central.deprovisioned event after processing an api_central.deprovision event to signal that an org is no longer provisioned in the region’s services. The event includes the required org_id in the payload to notify Platform of the completed deprovisioning state.

* **Product Name provided for Direct links to Generate Credentials and Register Application screens**
  (CONSUMER EXPERIENCE, APPROVALS, ENHANCEMENT)</br>
  We updated the apicentral.subscription.approval.update event to include the PublishedProduct.metadata.id, along with Product ID and Subscription ID, enabling approval notification emails to provide direct links that take users straight to the Generate Credentials and Register Application screens with pre-filled values.

* **UX Audit Updates for Consistency Across UI - Marketplace**
  (CONSUMER EXPERIENCE, MARKETPLACE, ENHANCEMENT)</br>
  We improved Marketplace product card responsiveness so that at 834px page width, cards automatically adjust to display a left-aligned image layout for a more consistent viewing experience. We also standardized the placement of error status icons on Product cards, ensuring they now appear in the upper-right corner alongside other status indicators for improved visual consistency.

* **Replace markdown component with markdown-it**
  (TECHNICAL BACKEND, ENHANCEMENT)</br>
  We replaced the existing react-markdown implementation with a more performant combination of markdown-it, unified, and rehype-react to better support large markdown documents with complex tables, significantly improving rendering performance. As part of this enhancement, we upgraded GraphiQL, aligned related dependencies (including GraphQL and Shiki), and updated styling and configurations to ensure compatibility with the latest versions.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|  01811246 | APIGOV-31896| **Issue**: MCP Transports Supported UI Issue Marketplace <br/>**Resolution**: Transports Supported field now populated in Marketplace for those which existed before the previous fix.
|          | APIGOV-32065 | **Issue**: The preview of specific MD is not working in Engage. <br/>**Resolution**: Product documentation now renders correctly throughout Engage
|          | APIGOV-32022 | **Issue**: Localize API Service - shows fields for MCP service. <br/>**Resolution**: Localization function hidden as does not apply for API Service
