---
title: Amplify Engage March 2026
linkTitle: Amplify Engage March
weight: 11
date: 2026-3-4
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents). To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).{{< /alert >}}

---

## March 5, 2026

New enhancements and bug fixes for the March 5 update.

## Agent updates

* **Akamai SaaS Agent**

  (AKAMAI API SECURITY AGENT, ENHANCEMENT)</br>
  The Akamai API Security Agent has been released as a SaaS service. It sends Managed API specifications from Engage to Akamai to execute Akamai Conformance Analysis. This improves the combined value of Engage and Akamai to more accurately identify endpoints with risks and shadow endpoints. The Conformance Analysis results are displayed on the Engage *Environment details* page.

* **Mulesoft Anypoint Agent: Discovery from multiple business units**

  (MULESOFT ANYPOINT AGENT, ENHANCEMENT)</br>
  The Mulesoft Anypoint Discovery Agent has been enhance with the ability to discover API services from multiple business units containing multiple environments. The API services will all be included for display on the Engage *Environment details* page.

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01804721 | APIGOV-31959 | **Issue**: Agent that detected an API service that was no longer on the dataplane would remove the API service from the Engage Service Registry. <br/>**Resolution**: Agent will no longer remove an API service, which may have been removed from the dataplane, from the Engage Service Registry. |
| 01802192 | APIGOV-31904 | **Issue**: An agent restarted with gRPC mode enabled would display as **stopped** even though the agent was running and connected. <br/>**Resolution**: A fix to the helm chart was made to use a recreate deployment strategy. |
|          | APIGOV-32006 | **Issue**: If a slow internet connection existed between the agent and the Amplify platform, the agent may have timed out and retried with an invalid request. <br/>**Resolution**: Valid request are now sent with a minimum pageSize value. |
|          | APIGOV-31075 | **Issue**: An environment and the API service in the environment may not have displayed the same connect or manual sync status based on the Agent Access Control List setting. <br/>**Resolution**: The Agent Access Control List setting has been fixed. |

## Marketplace updates

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

## Marketplace bug fixes

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

## CLI updates

* **Support for preproduction environments**

  (PROVIDER EXPERIENCE, AXWAY CLI, ENHANCEMENT)</br>
  The Axway Engage CLI *[v4.1.0](https://www.npmjs.com/package/axway/v/4.1.0)* has been updated to support the preproduction environments in the US and EU regions.

  (PROVIDER EXPERIENCE, AXWAY ENGAGE CLI, ENHANCEMENT)</br>
  The Axway Engage CLI *[v4.10.0](https://www.npmjs.com/package/@axway/axway-central-cli/v/4.10.0)* has been updated to support the preproduction environment in the US and EU regions.

### Pre-prod Axway CLI configuration commands

```$ axway config set env preprod```

```$ axway config set region {value} (US or EU)```

### Production Axway CLI configuration commands

```$ axway config set env prod```

```$ axway config set region {value} (US or EU or APAC)```

### Pre-prod Axway Engage CLI configuration commands

```$ axway engage config set --base-url=https://engage.eu-fr.axwaypreprod.net (For EU Orgs)```

```$ axway engage config set --base-url=https://engage.na-us.axwaypreprod.net (For US Orgs)```

### Production Axway Engage CLI configuration commands

```$ axway engage config set --base-url=https://central.eu-fr.axway.com (For EU Orgs)```

```$ axway engage config set --base-url=https://apicentral.axway.com (For US Orgs)```

```$ axway engage config set --base-url=https://central.ap-sg.axway.com (For APAC Orgs)```
