---
title: Amplify Engage July 2026
linkTitle: Amplify Engage July
weight: 7
date: 2026-7-7
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents). To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).{{< /alert >}}

---

## July 27, 2026

New enhancements and bug fixes for the July 27 update.

### Agent updates for July 27, 2026

* **APIM enhancement: OKTA IDP support**

  (EDGEGATEWAYDISCOVERYAGENT, ENHANCEMENT)</br>
  The APIM Discovery Agent can now provision Okta OAuth credentials, setting the application name and Okta group assignment and restricting each client to specific scopes via an Okta access policy and rule. The agent does **not** create the scopes themselves. If a requested scope doesn't already exist on the Okta Authorization Server, it must be added by your Okta administrator before the credential can be provisioned successfully.

* **MCP provisioning for AWS Bedrock AgentCore**

  (AWS DISCOVERY AGENT, AGENT SDK, ENHANCEMENT)</br>
  The AWS SaaS and on-premise agents can provision the Amazon Bedrock AgentCore Gateway data plane with Model Context Protocol (MCP) service access when requested from the Engage Marketplace for consumption. The provisioning is limited to one MCP target.

* **New Agent GRPC event logs**

  (AGENT SDK, ENHANCEMENT)</br>
  All Discovery Agents log when GRPC events are received from Amplify Engage and when the events have been handled.

### Agent bug fixes for July 27, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01850119 | APIGOV-33103 | **Issue**: The Mulesoft Traceability Agent was not reporting usage for Business Insights. <br/>**Resolution**: The Mulesoft Traceability Agent now sends the usage reports. |

### Marketplace updates for July 27, 2026

* **Application API field selection**

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  The Marketplace API now supports a `fields` query parameter on the `/api/v1/applications/{id}/accessRequests` and `/api/v1/applications/{id}/assetResources` endpoints. Consumers and integrations can specify which properties to include in API responses, reducing payload sizes and improving performance for clients that only need a subset of application data.

* **Long name display handling**

  (PROVIDER EXPERIENCE, ENHANCEMENT, ASSET CATALOG, SERVICE REGISTRY)</br>
  The Asset Catalog and Service Registry UI tables have been improved for the handling of long names. Here is a list of the improvements:

    * A hover tooltip is visible to display the full long name.
    * Long names are truncated in the middle of the name with a three dot ellipsis.
    * A "copy to clipboard" icon is available for logical names/IDs or URLs.

* **Amplify Engage V1 API support**

  (PROVIDER EXPERIENCE, APIS, INTEGRATION)</br>
  [Version v1 APIs](https://apidocs.axway.com/swagger-ui-NEW/index.html?productname=APIServer&productversion=1.0.0&filename=swagger.json) are now available for Amplify Engage API Server and are recommended for all new integrations and development efforts. The v1 APIs provide a stable, supported interface and establish the foundation for future enhancements. The existing v1alpha1 APIs remain available for backward compatibility but are now **deprecated**. The new v1 APIs introduce a breaking change compared to v1alpha1, primarily to improve performance and reduce payload sizes. As part of these changes, **metadata ACLs are no longer included by default in responses for any resource type**. Applications that currently rely on metadata ACLs being returned in v1alpha1 responses must be updated when migrating to v1.
  While existing integrations will continue to function, customers are encouraged to migrate to the v1 APIs to take advantage of ongoing improvements and ensure long-term compatibility.

### Marketplace bug fixes for July 27, 2026

| Case ID | Internal ID | Description |
| ------- | ----------- | ----------- |
| 01848405 | APIGOV-32961 | **Issue**: Engage UI: The Expiry filter on the Credentials page did not filter results. Radio button filters in Marketplace lost their visual selection state when interacting with other filter groups. <br/>**Resolution**: The Expiry filter now correctly filters credentials by expiration status in both Engage and Marketplace. Radio button filters include a reset option and maintain consistent visual state across filter groups. |
| 01842124 | APIGOV-32811 | **Issue**: Marketplace Backend: Filtering products by a default stage in the Marketplace returned products containing services assigned to a different stage. The stage filter produced incorrect results when the environment had both default and assigned stages configured. <br/>**Resolution**: Product version stages now stay synchronized with asset resource stage changes. The stage filter correctly returns only products whose services match the selected stage. |
| 01854853 | APIGOV-33166 | **Issue**: Marketplace UI: The Suspend action button was unavailable for credentials without an expiration date, even when the credential request definition had `suspendable: true` configured. As a result, consumers could not temporarily disable non-expiring credentials. <br/>**Resolution**: Credentials without an expiration date can now be suspended and re-enabled as expected when the provisioning policy allows suspension. |
| | APIGOV-33027 | **Issue**: Marketplace UI: Resource Documentation tab does not display correctly for unauthenticated users.  <br/>**Resolution**: The Documentation tab now displays for all resource types and correctly renders documents for users who are not logged in. |
| | APIGOV-33051 | **Issue**: Marketplace UI: MCP resource details screens had pagination and layout issues. Search results retained incorrect page counts. <br/>**Resolution**: Pagination now correctly reflects filtered result counts, and the tooltip no longer causes layout shifts in the MCP resource details view. |
| | APIGOV-31207 | **Issue**: Marketplace Backend: Intermittent LazyInitializationException on plan localizations during event processing. <br/>**Resolution**: Plan and quota localization collections are now initialized during event handling, preventing session detachment errors under concurrent domain event processing. |
| | APIGOV-33062 | **Issue**: Marketplace Backend: Consumer organization service accounts received forbidden errors when calling Marketplace APIs via the proxy Keycloak token endpoint. Permissions were resolved based on admin roles instead of consumer org roles. <br/>**Resolution**: The authentication layer now correctly resolves consumer organization roles for service accounts, enabling proper API access scoped to the consumer org's Marketplace. |
| | APIGOV-33105 | **Issue**: Marketplace UI: A2A resource details did not display the endpoint URL in the Marketplace. <br/>**Resolution**: A2A resource endpoint URLs now display correctly in the Marketplace resource details view. |
| | APIGOV-33111 | **Issue**: Service Registry UI: Display text of the "schema" was shown. <br/>**Resolution**: The display text is no longer displayed in the Service Registry details view. |
| | APIGOV-32926 | **Issue**: Service Registry UI: Display of the API specification for an MCP service was shown in the tabs for Server Overview, Tools, Resources, Prompts, and MCP Clients. <br/>**Resolution**: The display of the API specification is no longer displayed in the Service Registry details view for an MCP service. |
| 01837418 | APIGOV-32922 | **Issue**: MCP UI Import: When importing an MCP service using an Endpoint URL, the latest protocol version was not requested. <br/>**Resolution**: The MCP wizard import action now negotiates and fetches the latest supported MCP protocol version. |
| 01849791 | APIGOV-33025 | **Issue**: Service Registry UI: When an API specification was manually uploaded and selected as unstructured, it was incorrectly set to 'OAS'. <br/>**Resolution**: The manual import action of an API specification now honors the selected 'unstructured' type. |

## July 9, 2026

New enhancements and bug fixes for the July 9 update.

### Agent updates for July 9, 2026

* **Cache handling improvement**

  (DISCOVERY AGENT, AGENT SDK, ENHANCEMENT)</br>
  All Discovery Agents have improved cache handling to better manage agent connection issues with Amplify Engage.

* **Business Insights  - additional fields in the metric events**

  (TRACEABILITY AGENT, ENHANCEMENT)</br>
  All Traceability Agents now include additional fields in events that are sent to Business Insights. This improves query performance.

### Marketplace updates for July 9, 2026

* **Marketplace as a curated AI registry supporting human and agent-based discovery**

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Amplify Marketplace now serves as a curated AI registry aligned with the A2A protocol's curated discovery pattern. AI agents, LLMs, and developer tools (IDEs, coding agents) can programmatically discover and interact with Marketplace content via a new Model Context Protocol (MCP) Server endpoint. The advanced search has been enhanced with specification type filtering and resource lifecycle metadata.  

  This new feature includes:
  
    * A new MCP Server endpoint is available at `/api/v1/mcp`, enabling AI agents and LLMs to discover Marketplace resources using the standard MCP protocol (version 2025-11-25). The endpoint supports JSON-RPC 2.0 messaging, protocol version negotiation, tools discovery, and MCP authorization with Protected Resource Metadata (RFC 9728).
    * The MCP Server exposes a Resource Search Tool that allows AI agents to search Marketplace resources by keywords and specification type. The response mapping is optimized for AI agent consumption, distinct from the human-oriented advanced search API format.
    * The Marketplace search backend now supports a `resource.type` query parameter on the `GET /resources` endpoint, enabling filtering by specification type (oas3, oas2, wsdl, protobuf, asyncapi, graphql, raml, mcp, a2a). Unrecognized types return empty results without errors, allowing new types to be introduced without a service release.
    * A new filter control on the Advanced search results Resources tab allows users to select one or more specification types to narrow search results. The filter supports multi-select with OR semantics, deep linking via URL query parameters, and pagination reset on selection change.
    * A new filter control on the Advanced search results Products tab allows users to filter products by type (API, MCP, A2A), consistent with the existing basic search product type filter.

* **Session handling and auth API**

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Central Auth service has been migrated from the deprecated platform `/findSession` API to the org-scoped `org_userFindOne` and `team_find` platform APIs. This change improves security, enables the MCP authentication flow, and switches token revocation to tenant-ID-based logic. In parallel, the Marketplace WebUI and all UI modules have been updated to use the new platform `/session` API, removing the dependency on the deprecated `/findSession` endpoint and ensuring consistent session handling.

* **Replaced spring-retry with lightweight retry library**

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  The spring-retry dependency has been removed from API Server and Central Auth service, eliminating the spring-core transitive dependency that was frequently flagged by security scanners. Retry logic now uses a lightweight alternative with a smaller security footprint.

* **Asset Archive and Delete actions**

  (PROVIDER EXPERIENCE, ENHANCEMENT, ASSET CATALOG)</br>
  Assets can now be archived or deleted directly from the asset details screen using dedicated action icons, eliminating the need to return to the listing page.

* **Asset creation wizard with enhanced resource filtering**

  (PROVIDER EXPERIENCE, ENHANCEMENT, ASSET CATALOG)</br>
  The asset creation wizard has been enhanced with improved usability, including the addition of an A2A resource filter and a new Type column to help clearly identify resource types.

### Marketplace bug fixes for July 9, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01857228 | APIGOV-33185 | **Issue**: Marketplace Backend: Custom credential public key values lost the embedded filename from the data URI. The `publicKey` field changed, breaking downstream integrations that rely on the filename component. <br/>**Resolution**: Custom credential public key values now preserve the original data URI format including the embedded filename, maintaining backward compatibility with consumer integrations. |
|          | APIGOV-32972 | **Issue**: Plan tile subscribe button state does not update correctly. <br/>**Resolution**: When a user cancels their subscription, the Plan tile 'Subscribe' button updates to represent the new subscription state. |
|          | APIGOV-32959| **Issue**: Plan limit type label not displayed <br/>**Resolution**: Limit Type on the Plan details page displays the proper types without blanks. |
| 01847761 | APIGOV-32950 | **Issue**: Custom subscriptionrequestdef.date field causing UI issues. <br/>**Resolution**: Date validation has been corrected across subscription, application registration, and credential definition flows. |
|          | APIGOV-32866| **Issue**: Primary credentials should not display expiry tooltip. <br/>**Resolution**: Primary credential details side panel no longer displays expiration tooltips for the expiry. |
|          | APIGOV-32772 | **Issue**: Marketplace Renew not renewing credentials. <br/>**Resolution**: Marketplace DB/backend fixed to propagate new client secret but keep the client id the same on renewal. |
| 01838430 | APIGOV-32719 | **Issue**: Blank page in Marketplace for some resources. <br/>**Resolution**: When a specification is not available on the resource, a message that no spec is available for this service is displayed in the resource documentation tab in Marketplace. A similar message is displayed on the Service details page.|
