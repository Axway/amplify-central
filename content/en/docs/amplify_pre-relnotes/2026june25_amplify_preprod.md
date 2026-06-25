---
title: Amplify Engage June 25 2026
linkTitle: Amplify Engage June 25 2026
weight: 15
date: 2026-6-23
---

**Feedback Window**: June 25 2026 → July 1 2026 <br />
**Planned Production Date**: July 9 <br />
**Environment**: Pre-production

---

This preproduction environment allows you to test and validate upcoming features, enhancements, and bug fixes before they are promoted to production.

Please note that, depending on the nature of the feedback and the timing of its submission, it may not be incorporated into the upcoming production release.

See [Provide testing feedback](/docs/amplify_pre-relnotes/#provide-testing-feedback) for instructions on submitting preprod testing feedback.

---

## Supported agents

To access the **pre‑prod environment**, you must set the following **Agent environment variables**, depending on the region you are connecting to. Preview agents must only be used with the Amplify Engage pre-prod environment.

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

Search for the latest preproduction agent builds at <https://repository.axway.com/>. If you don't see a **PVW** version for a particular agent, it means that agent hasn't been updated for this preproduction release.  

## Agent updates

* **Cache handling improvement**

  (DISCOVERY AGENT, AGENT SDK, ENHANCEMENT)</br>
  Improved cache handling to better manage Discovery Agent connection issues with Amplify Engage.

* **Business Insights  - additional fields in the metric events**

  (TRACEABILITY AGENT, ENHANCEMENT)</br>
  Additional fields have been included in the events sent to Business Insights to improve the performance of queries.

## Marketplace updates

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

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01838430 | APIGOV-32719 | **Issue**: Blank page in Marketplace for some resources. <br/>**Resolution**: When a specification is not available on the resource, a message that no spec is available for this service is displayed in the resource documentation tab in Marketplace. A similar message is displayed on the Service details page.|
| 01847761 | APIGOV-32950 | **Issue**: Custom subscriptionrequestdef.date field causing UI issues. <br/>**Resolution**: Date validation has been corrected across subscription, application registration, and credential definition flows. |
|          | APIGOV-32972 | **Issue**: Plan tile subscribe button state does not update correctly. <br/>**Resolution**: When a user cancels their subscription, the Plan tile 'Subscribe' button updates to represent the new subscription state. |
|          | APIGOV-32959| **Issue**: Plan limit type label not displayed <br/>**Resolution**: Limit Type on the Plan details page displays the proper types without blanks. |
|          | APIGOV-32866| **Issue**: Primary credentials should not display expiry tooltip. <br/>**Resolution**: Primary credential details side panel no longer displays expiration tooltips for the expiry. |
|          | APIGOV-32772 | **Issue**: Marketplace Renew not renewing credentials. <br/>**Resolution**: Marketplace DB/backend fixed to propagate new client secret but keep the client id the same on renewal. |
