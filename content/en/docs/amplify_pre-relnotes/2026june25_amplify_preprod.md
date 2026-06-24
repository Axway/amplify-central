---
title: Amplify Engage June 25 2026
linkTitle: Amplify Engage June 25 2026
weight: 15
date: 2026-6-23
---

**Feedback Window**: June 11 2026 → July 1 2026 <br />
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

* **Title**

  (AWS AGENT, ENHANCEMENT)</br>
  Description.

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-xxxxx | **Issue**: Description. <br/>**Resolution**: Description. |

## Marketplace updates

* **Marketplace as a curated AI registry supporting human and agent-based discovery**

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Amplify Marketplace now serves as a curated AI registry aligned with the A2A protocol's curated discovery pattern. AI agents, LLMs, and developer tools (IDEs, coding agents) can programmatically discover and interact with marketplace content via a new Model Context Protocol (MCP) Server endpoint. The advanced search has been enhanced with specification type filtering and resource lifecycle metadata.

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  A new Model Context Protocol (MCP) Server endpoint is available at `/api/v1/mcp`, enabling AI agents and LLMs to discover marketplace resources using the standard MCP protocol (version 2025-11-25). The endpoint supports JSON-RPC 2.0 messaging, protocol version negotiation, tool discovery, and MCP authorization with Protected Resource Metadata (RFC 9728).

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  The MCP Server exposes a Resource Search Tool that allows AI agents to search marketplace resources by keywords and specification type. The response mapping is optimized for AI agent consumption, distinct from the human-oriented advanced search API format.

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  The Marketplace search backend now supports a `resource.type` query parameter on the `GET /resources` endpoint, enabling filtering by specification type (oas3, oas2, wsdl, protobuf, asyncapi, graphql, raml, mcp, a2a). Unrecognized types return empty results without errors, allowing new types to be introduced without a service release.

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  A new filter control on the advanced search results Resources tab allows users to select one or more specification types to narrow search results. The filter supports multi-select with OR semantics, deep linking via URL query parameters, and pagination reset on selection change.

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  A new filter control on the advanced search results Products tab allows users to filter products by type (API, MCP, A2A), consistent with the existing basic search product type filter.

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Central Auth has been migrated from the deprecated Platform `/findSession` API to the org-scoped `org_userFindOne` and `team_find` Platform APIs. This change improves security, enables the MCP authentication flow, and switches token revocation to tenant-ID-based logic.

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  The Marketplace Web UI has been updated to use the new Platform `/session` API, removing the dependency on the deprecated `/findSession` endpoint and ensuring consistent session handling.

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  All Central UI modules have been migrated to the new Platform `/session` API. The `usePlatform` hook is now used consistently across all modules, eliminating duplicate session declarations.

* **Replaced spring-retry with lightweight retry library**

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  The spring-retry dependency has been removed from API Server and Central Auth, eliminating the spring-core transitive dependency that was frequently flagged by security scanners. Retry logic now uses a lightweight alternative with a smaller security footprint.

* **Reduced dependency on axway-react-ui**

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  The dependency on `axway-react-ui` has been reduced across products-web, assets-web, and catalog-web. This reduces the effort required for a future full removal of the legacy UI library.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01838430 | APIGOV-32719 | **Issue**: Blank page in Marketplace for some resources. <br/>**Resolution**: When a specification is not available on the resource, a message that no spec is available for this service is displayed in the resource documentation tab in Marketplace . |
| 01847761 | APIGOV-32950 | **Issue**: Custom subscriptionrequestdef. date field causing UI issues. <br/>**Resolution**: Date is now addable and other fields are not affected. |
|          | APIGOV-32972 | **Issue**: Marketplace UI: Plan tile subscribe button state does not update correctly. <br/>**Resolution**: When a user cancels their subscription, the Plan tile 'Subscribe' button updates to represent the new subscription state. |
|          | APIGOV-32959| **Issue**: Marketplace UI: Plan limit type label not displayed <br/>**Resolution**: Limit Type on the Plan details page displays the proper types without blanks. |
|          | APIGOV-32866| **Issue**: UI: Primary credentials should not display expiry tooltip. <br/>**Resolution**: Primary credential details side-blade updates to no longer display expiration tooltips for the Expiry. |
|          | APIGOV-32772 | **Issue**: [Marketplace] Renew not renewing credentials. <br/>**Resolution**: Marketplace DB/backend fixed to propagate new client secret but keep the client id the same on renewal. |
