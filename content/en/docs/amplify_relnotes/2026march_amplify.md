---
title: Amplify Engage March 2026
linkTitle: Amplify Engage March
weight: 11
date: 2026-3-4
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents). To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).{{< /alert >}}

---

## March 19, 2026

New enhancements and bug fixes for the March 19 update.

### Marketplace updates for March 19, 2026

* **Subscriptions side panel tabs enhancement**

  (PROVIDER EXPERIENCE, SUBSCRIPTIONS, ENHANCEMENT)</br>
  The Subscriptions side panel on the *Subscriptions* page has been enhanced by moving "Tags & Attributes" and "Usage" from expandable sections into separate tabs, reducing vertical scrolling and improving information accessibility.

* **Publish `api_central.deprovisioned` pubsub event when processing deprovision events**

  (PLATFORM, ENHANCEMENT)</br>
  An api_central.deprovisioned event is now published after processing an `api_central.deprovision` event to signal that an org is no longer provisioned in the region's services. The event includes the required **org_id** in the payload to notify platform of the completed deprovisioning state.

* **Direct links to *Generate Credentials* and *Register Application* in the approval notification emails**

  (CONSUMER EXPERIENCE, APPROVALS, ENHANCEMENT)</br>
  The subscription approval notifications have been improved to make it easier for users to complete the next steps after their subscription or application registration request is approved. Approval emails now include direct links that take users straight to the relevant setup screens, such as *Register Application* and *Generate Credentials*, with the necessary information already pre-filled.

* **Product card: styling and responsiveness improvements**

  (CONSUMER EXPERIENCE, MARKETPLACE, ENHANCEMENT)</br>
  The Marketplace product card responsiveness has been improved so that at 834px page width, cards automatically adjust to display a left-aligned image layout for a more consistent viewing experience. The placement of error status icons on Product cards has also been standardized, ensuring they now appear in the upper-right corner alongside other status indicators for improved visual consistency.

* **Replace Markdown component with markdown-it**

  (CONSUMER EXPERIENCE, PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  The existing react-markdown implementation has been replaced with a more performant combination of markdown-it, unified, and rehype-react to better support large Markdown documents with complex tables, significantly improving rendering performance. As part of this enhancement, GraphiQL was upgraded, related dependencies were aligned (including GraphQL and Shiki), and styling and configurations were updated to ensure compatibility with the latest versions.

* **Manual API/MCP service Version Registration**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  The Engage *Service Registry Details* page supports the manual creation of API or MCP service versions. The Engage Admin, Catalog Manager, or Developer can create a new version of an API or MCP service.

### Marketplace bug fixes March 19, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|  01811246 | APIGOV-31896| **Issue**: MCP Transports supported UI issue in Marketplace <br/>**Resolution**: Transports Supported field now populated in Marketplace for those that existed before the previous fix. |
|          | APIGOV-32065 | **Issue**: The preview of specific MD is not working in Engage. <br/>**Resolution**: Product documentation now renders correctly throughout Engage. |
|          | APIGOV-32022 | **Issue**: Localize API service - shows fields for MCP service. <br/>**Resolution**: Localization function hidden, as it does not apply for API service. |
|          | APIGOV-32080 | **Issue**: After logging in with Engage CLI, the first GET command returned about 5MB of data. <br/>**Resolution**: A fix was made to the API server to reduce this and return about 500KB of data. |

## March 5, 2026

New enhancements and bug fixes for the March 5 update.

### Agent updates for March 5, 2026

* **Akamai SaaS Agent**

  (AKAMAI API SECURITY AGENT, ENHANCEMENT)</br>
  The Akamai API Security Agent has been released as a SaaS service. It sends Managed API specifications from Engage to Akamai to execute Akamai Conformance Analysis. This improves the combined value of Engage and Akamai to more accurately identify endpoints with risks and shadow endpoints. The Conformance Analysis results are displayed on the Engage *Environment details* page.

* **Mulesoft Anypoint Agent: Discovery from multiple business units**

  (MULESOFT ANYPOINT AGENT, ENHANCEMENT)</br>
  The Mulesoft Anypoint Discovery Agent has been enhance with the ability to discover API services from multiple business units containing multiple environments. The API services will all be included for display on the Engage *Environment details* page.

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

### Agent bug fixes for March 5, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01804721 | APIGOV-31959 | **Issue**: Agent that detected an API service that was no longer on the dataplane would remove the API service from the Engage Service Registry. <br/>**Resolution**: Agent will no longer remove an API service, which may have been removed from the dataplane, from the Engage Service Registry. |
| 01802192 | APIGOV-31904 | **Issue**: An agent restarted with gRPC mode enabled would display as **stopped** even though the agent was running and connected. <br/>**Resolution**: A fix to the helm chart was made to use a recreate deployment strategy. |
|          | APIGOV-32006 | **Issue**: If a slow internet connection existed between the agent and the Amplify platform, the agent may have timed out and retried with an invalid request. <br/>**Resolution**: Valid request are now sent with a minimum pageSize value. |
|          | APIGOV-31075 | **Issue**: An environment and the API service in the environment may not have displayed the same connect or manual sync status based on the Agent Access Control List setting. <br/>**Resolution**: The Agent Access Control List setting has been fixed. |

### Marketplace updates for March 5, 2026

* **Manual API/MCP service creation from Service Registry**
  
  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  The Service Registry now allows providers to manually add a new API or MCP service through a guided UI wizard. During the setup process, users can select from the environments they have access to. This enhancement enables providers to quickly register services without relying solely on automated discovery.

* **Application Registration: Ability to search in the Subscription dropdown**

  (CONSUMER EXPERIENCE, APPLICATION REGISTRATION, ENHANCEMENT)</br>
  Marketplace consumers can now search within the Subscriptions dropdown portion of the Select Application wizard step without having to manually scroll through a potentially long list.

* **UX audit updates for consistency across UI - Product details**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  The *Product Foundry|Product details* has been updated with several usability and styling fixes.

* **Expose user type owner for x-private teams in API Server**

  (ANALYTICS, ENHANCEMENT)</br>
  To allow agents (and Fusion) to include subscription owner details in Insights events, Analytics now gets API Server user-type owner information from the Marketplace backend.

* **Fusion requires that Marketplace supports authorization for credentials without a Client Secret**

  (AUTHORIZATION, FUSION, CONFIGURATION)</br>
  Fusion requires that the Marketplace supports OAuth2 authorization with credentials that do not require a Client Secret.

* **Enhanced filtering and display options in Subscriptions view**

  (PROVIDER, SUBSCRIPTIONS, ENHANCEMENT)</br>
  The Engage *Subscriptions* screen has been enhanced to make information easier to find and navigate by introducing an additional filtering option for Marketplace, adding Plan to the table display, and enhancing the search query to include Subscription ID, Plan, and Product.

* **Product overview with Markdown support**

  (CONSUMER EXPERIENCE, PRODUCTS, NEW FEATURE)</br>
  A new **Overview** field has been added in the product that makes it easier for providers to add richer product information to the Marketplace product listing. When creating or editing a product, Providers can select and preview a **Markdown document** from the Document Library. On the Marketplace side, the product *Overview* tab renders the selected document. The content is rendered from the linked Markdown file and automatically updates whenever the document is updated in the Document Library, so you don’t need to manually update the product each time the documentation changes. The existing description remains visible on the product cards and on the *Product Details* page under the product name, giving consumers a quick summary while the *Overview* tab provides a more detailed explanation.

### Marketplace bug fixes for March 5, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32074 | **Issue**: An error occurred on the UI when viewing a Service details page if the service had no API compliance results. <br/>**Resolution**: The Service details page now displays as expected. |
| 01809186 | APIGOV-32042 | **Issue**: The **Next** button remained disabled after manually uploading an Async API Specification file. <br/>**Resolution**: The **Next** button is now enabled after the upload of an Async API Specification file. |
|          | APIGOV-32019 | **Issue**: GraphQL query for asset resources requires quote escape for search term. <br/>**Resolution**: GraphQL query implemented for defect APIGOV-31938 required quote escapes for search term in the constructed query. |
|          | APIGOV-31970 | **Issue**: Validate enum parameters before opening a DB transaction - attacks on MP occurred when using different values for filter parameters <br/>**Resolution**: Moved validation to happen before a DB transaction is opened and before the request hits our backend logic. |
|          | APIGOV-31968 | **Issue**: The Asset details page did not refresh the product releases in the Products tab. This was observed after the selection of an active asset release when selecting a draft asset release to view the Products tab. <br/>**Resolution**: The refresh of the product releases has been fixed. |
|          | APIGOV-31838 | **Issue**: Stop publishing resource tags in internal events. <br/>**Resolution**: Updates made to stop sending tags in the events published by Analytics controller to platform. Verified that the activity view still works as expected, and minimized the duplication of tags & attributes in the API Server events to the best extent possible. |
|          | APIGOV-31540 | **Issue**: Visibility of Compliance Score Details for Developer role. <br/>**Resolution**: Developer role can now view the linting results. |
|          | APIGOV-31073 | **Issue**: [Central UI] Enable Marketplace visibility selection for document library. <br/>**Resolution**: Marketplace Manager, Catalog Manager, Developer, and Engage Admin roles updated as appropriate for Marketplace visibility. |
|          | APIGOV-30403 | **Issue**: Wrong subscriber information for user in a default team with x-private tag. <br/>**Resolution**: The new structure for Marketplace subresource now includes the addition of user information when the owner is a user belonging to a specific team. |

### CLI updates for March 5, 2026

* **Support for preproduction environments**

  (PROVIDER EXPERIENCE, AXWAY CLI, ENHANCEMENT)</br>
  The Axway Engage CLI *[v4.1.0](https://www.npmjs.com/package/axway/v/4.1.0)* has been updated to support the preproduction environments in the US and EU regions.

  (PROVIDER EXPERIENCE, AXWAY ENGAGE CLI, ENHANCEMENT)</br>
  The Axway Engage CLI *[v4.10.0](https://www.npmjs.com/package/@axway/axway-central-cli/v/4.10.0)* has been updated to support the preproduction environment in the US and EU regions.

#### Pre-prod Axway CLI configuration commands

```$ axway config set env preprod```

```$ axway config set region {value} (US or EU)```

#### Production Axway CLI configuration commands

```$ axway config set env prod```

```$ axway config set region {value} (US or EU or APAC)```

#### Pre-prod Axway Engage CLI configuration commands

```$ axway engage config set --base-url=https://engage.eu-fr.axwaypreprod.net (For EU Orgs)```

```$ axway engage config set --base-url=https://engage.na-us.axwaypreprod.net (For US Orgs)```

#### Production Axway Engage CLI configuration commands

```$ axway engage config set --base-url=https://central.eu-fr.axway.com (For EU Orgs)```

```$ axway engage config set --base-url=https://apicentral.axway.com (For US Orgs)```

```$ axway engage config set --base-url=https://central.ap-sg.axway.com (For APAC Orgs)```
