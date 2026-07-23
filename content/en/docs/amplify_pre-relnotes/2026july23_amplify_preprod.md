---
title: Amplify Engage July 23 2026
linkTitle: Amplify Engage July 23 2026
weight: 13
date: 2026-7-7
---

**Feedback Window**: July 23 2026 → July 30 2026 <br />
**Planned Production Date**: August 6 <br />
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

* **AWS Bedrock AgentCore - MCP Traceability**

  (AWS TRACEABILITY AGENT, AGENT SDK, ENHANCEMENT)</br>
AWS AgentCore Traceability Agent support is now available, enabling the collection and visualization of MCP server transaction counts in Business Insights -> API Health.

* **Amplify Engage V1 API support**

  (ALL AGENTS, AGENT SDK, ENHANCEMENT)</br>
All agents have been updated to use v1 Amplify Engage APIs instead of v1alpha1 APIs to access API Server resources.
  
## Marketplace updates

* **Amplify Engage v1 APIs**

  (PROVIDER EXPERIENCE, APIS, INTEGRATION)</br>
  [Version v1 APIs](https://apidocs.axway.com/swagger-ui-NEW/index.html?productname=APIServer&productversion=1.0.0&filename=swagger.json) are now available for Amplify Enagage API Server and are recommended for all new integrations and development efforts. The v1 APIs provide a stable, supported interface and establish the foundation for future enhancements. The existing v1alpha1 APIs remain available for backward compatibility but are now **deprecated**. While existing integrations will continue to function, customers are encouraged to migrate to the v1 APIs to take advantage of ongoing improvements and ensure long-term compatibility.

* **Transfer ownership of subscriptions and applications on x-private team user removal**

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Team Managers and Organization Administrators can now transfer ownership of a removed user's subscriptions and applications to another member of the same x-private team. This preserves existing API credentials (API keys and OAuth client ID/secret) without requiring recreation, ensuring downstream consumer integrations remain functional. Transfer is optional and triggered during the user deletion or removal from a team.

* **Long name display handling**

(PROVIDER EXPERIENCE, ENHANCEMENT, ENVIRONMENTS, COMPLIANCE PROFILES)</br>
The Toplogy -> Environments and Topology -> Compliance Profiles UI tables have been improved for the handling of long names. Here is a list of the improvements:

    * A hover tooltip is visible to display the full long name.
    * Long names are truncated in the middle of the name with a three dot ellipsis.
    * A "copy to clipboard" icon is available for logical names/IDs or URLs.

**Asset details display**

(PROVIDER EXPERIENCE, ENHANCEMENT, ASSET CATALOG, ASSET DETAILS)</br>
The **Resources table** on the Asset Details page now includes a **Type** column, making it easier to identify the API service type at a glance. Additionally, the **View Specification** option in the resource actions menu (⋮) now supports additional API specification formats, including A2A.  

## Marketplace bug fixes

| Case ID  | Internal ID  | Description   |
| -------- | ------------ | ------------- |
|             | APIGOV-32811 | **Issue**: Filtering products by the default stage in Marketplace returned products containing services with non-default (assigned) stages. <br/>**Resolution**: Product versions are now kept in sync with asset resource stage changes. The stage filter works as expected for newly assigned stages. |
|             | APIGOV-33254 | **Issue**: Users with the Auditor role were unable to view the Subscriptions page in Business Insights. <br/>**Resolution**: Permission checks for the Business Insights Subscriptions view have been corrected to properly grant read access to users with the Auditor role. |
|             | APIGOV-33153 | **Issue**: Marketplace pages (Subscriptions, Application Registrations, Credentials) were requesting the full platform user payload, causing slow page loads for organizations with many users. <br/>**Resolution**: User data requests now fetch only the specific users needed by GUID, reducing response size and improving page load performance. |
|             | APIGOV-31827 | **Issue**: A duplicate SideBlade component in the Marketplace UI was always rendered, causing unnecessary API requests on pages where the side panel was not opened. <br/>**Resolution**: The duplicate component has been replaced with a lazy-loaded implementation that only makes API requests when the panel is opened. |
|             | APIGOV-33186 | **Issue**: The create document wizard was not assigning the Access Control List (ACL) values. <br/>**Resolution**: The create wizard fixed to assign the ACLs. |
|             | APIGOV-33260 | **Issue**: The display of a **draft** asset was not showing **Out of Sync** APIs on the Linked Resources tab. <br/>**Resolution**: The Linked Resrouces tab shows the **Out of Sync** APIs so they can be removed from the draft asset. |
