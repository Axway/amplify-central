---
title: Amplify Engage July 9 2026
linkTitle: Amplify Engage July 9 2026
weight: 14
date: 2026-7-7
---

**Feedback Window**: June 9 2026 → July 16 2026 <br />
**Planned Production Date**: July 23 <br />
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

* **APIM enhancement: OKTA IDP support**

  (EDGEGATEWAYDISCOVERYAGENT, ENHANCEMENT)</br>
  The APIM Discovery agent can set the scopes, application name and tags within the associated OKTA Identify Provided when provisioning.
  
* **MCP provisioning for AWS Bedrock AgentCore**

  (AWS DISCOVERY AGENT, AGENT SDK, ENHANCEMENT)</br>
  The AWS SaaS and on-premise agents can provision the Amazon Bedrock AgentCore Gateway dataplane with Model Context Protocol (MCP) service access when requested from the Engage Marketplace for consumption.

* **New Agent GRPC event logs**

  (AGENT SDK, ENHANCEMENT)</br>
  All discovery agents are logging when a GRPC event has been received from Amplify Engege and when the event has been handled.

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01850119 | APIGOV-33103 | **Issue**: The Mulesoft traceability agent was not reporting usage for Business Insights. <br/>**Resolution**: A fix was made to the Mulesoft traceability agent to send the usage reports. |

## Marketplace updates

* **Application API Field Selection**

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  The Marketplace API now supports a `fields` query parameter on the `/api/v1/applications/{id}/accessRequests` and `/api/v1/applications/{id}/assetResources` endpoints. Consumers and integrations can specify which properties to include in API responses, reducing payload sizes and improving performance for clients that only need a subset of application data.

* **Long name display handling**

  (PROVIDER EXPERIENCE, ENHANCEMENT, ASSET CATALOG, SERVICE REGISTRY)</br>
  The Asset catalog and Service registry UI tables have been improved for the handling of long names. Here is alist of the improvements:

  - A hover tooltip is visible to display the full long name.
  - Long names are truncated in the middle of the name with a 3 dot ellipsis.
  - A copy to clipboard icon is available for logical names/IDs or URLs.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01848405 | APIGOV-32961 | **Issue**: Engage UI: The Expiry filter on the Credentials page did not filter results. Radio button filters in Marketplace lost their visual selection state when interacting with other filter groups. <br/>**Resolution**: The Expiry filter now correctly filters credentials by expiration status in both Engage and Marketplace. Radio button filters include a reset option and maintain consistent visual state across filter groups. |
| 01842124 | APIGOV-32811 | **Issue**: Marketplace Backend: Filtering products by a default stage in the Marketplace returned products containing services assigned to a different stage. The stage filter produced incorrect results when the environment had both default and assigned stages configured. <br/>**Resolution**: Product version stages now stay synchronized with asset resource stage changes. The stage filter correctly returns only products whose services match the selected stage. |
| 01854853 | APIGOV-33166 | **Issue**: Marketplace UI: The Suspend action button was greyed out for credentials that do not have an expiration date, even when the credential request definition had `suspendable: true` configured. Consumers could not temporarily disable non-expiring credentials. <br/>**Resolution**: Credentials without an expiration date can now be suspended and re-enabled as expected when the provisioning policy allows suspension. |
| | APIGOV-33027 | **Issue**: Marketplace UI: Resource Documentation tab does not display correctly for unauthenticated users.  <br/>**Resolution**: The Documentation tab now displays for all resource types and correctly renders documents for users who are not logged in. |
| | APIGOV-33051 | **Issue**: Marketplace UI: MCP resource details screens had pagination and layout issues. Search results retained incorrect page counts. <br/>**Resolution**: Pagination now correctly reflects filtered result counts, and the tooltip no longer causes layout shifts in the MCP resource details view. |
| | APIGOV-31207 | **Issue**: Marketplace Backend: Intermittent LazyInitializationException on plan localizations during event processing. <br/>**Resolution**: Plan and quota localization collections are now initialized during event handling, preventing session detachment errors under concurrent domain event processing. |
| | APIGOV-33062 | **Issue**: Marketplace Backend: Consumer organization service accounts received forbidden errors when calling Marketplace APIs via the proxy Keycloak token endpoint. Permissions were resolved based on admin roles instead of consumer org roles. <br/>**Resolution**: The authentication layer now correctly resolves consumer organization roles for service accounts, enabling proper API access scoped to the consumer org's marketplace. |
| | APIGOV-33105 | **Issue**: Marketplace UI: A2A resource details did not display the endpoint URL in the Marketplace. <br/>**Resolution**: A2A resource endpoint URLs now display correctly in the Marketplace resource details view. |
| | APIGOV-33111 | **Issue**: Service Registry UI: Display text of the "schema" was shown. <br/>**Resolution**: The display text is no longer displayed in the Service Registry details view. |
| | APIGOV-32926 | **Issue**: Service Registry UI: Display of the API specification for an MCP service was shown in the tabs for Server Overview, Tools, Resources, Prompts, MCP Clients. <br/>**Resolution**: The display of the API specification is no longer displayed in the Service Registry details view for an MCP service. |
| 01837418 | APIGOV-32922 | **Issue**: MCP UI Import: When importing the MCP service using Endpoint URL, the latest protocol version was not being requested. <br/>**Resolution**: The MCP wizard will import action negotiates and fetches the latest MCP protocol version supported. |
| 01849791 | APIGOV-33025 | **Issue**: Service Registry UI: The manual upload of an API specification which was selected as 'unstructured' was set to 'OAS'. <br/>**Resolution**: The manual import action of an API specification will honor the selected 'unstrutured' type. |
