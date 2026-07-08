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

* **Title**

  (DISCOVERY AGENT, AGENT SDK, ENHANCEMENT)</br>
  Description.

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| xxxxxxxx | APIGOV-xxxxx | **Issue**: Description. <br/>**Resolution**: Description. |

## Marketplace updates

* **Title**

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Description

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01848405 | APIGOV-32961 | **Issue**: Engage UI: The Expiry filter on the Credentials page did not filter results. Radio button filters in Marketplace lost their visual selection state when interacting with other filter groups. <br/>**Resolution**: The Expiry filter now correctly filters credentials by expiration status in both Engage and Marketplace. Radio button filters include a reset option and maintain consistent visual state across filter groups. |
| | APIGOV-33027 | **Issue**: Marketplace UI: Resource Documentation tab does not display correctly for unauthenticated users.  <br/>**Resolution**: The Documentation tab now displays for all resource types and correctly renders documents for users who are not logged in. |
| | APIGOV-33051 | **Issue**: Marketplace UI: MCP resource details screens had pagination and layout issues. Search results retained incorrect page counts. <br/>**Resolution**: Pagination now correctly reflects filtered result counts, and the tooltip no longer causes layout shifts in the MCP resource details view. |
| | APIGOV-31207 | **Issue**: Marketplace Backend: Intermittent LazyInitializationException on plan localizations during event processing. <br/>**Resolution**: Plan and quota localization collections are now initialized during event handling, preventing session detachment errors under concurrent domain event processing. |
| | APIGOV-33062 | **Issue**: Marketplace Backend: Consumer organization service accounts received forbidden errors when calling Marketplace APIs via the proxy Keycloak token endpoint. Permissions were resolved based on admin roles instead of consumer org roles. <br/>**Resolution**: The authentication layer now correctly resolves consumer organization roles for service accounts, enabling proper API access scoped to the consumer org's marketplace. |
| | APIGOV-33105 | **Issue**: Marketplace UI: A2A resource details did not display the endpoint URL in the Marketplace. <br/>**Resolution**: A2A resource endpoint URLs now display correctly in the Marketplace resource details view. |
