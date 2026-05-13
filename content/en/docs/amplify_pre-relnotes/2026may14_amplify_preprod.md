---
title: Amplify Engage May 14 2026
linkTitle: Amplify Engage May 14 2026
weight: 18
date: 2026-5-12
---

**Feedback Window**: May 14 2026 → May 21 2026 <br />
**Planned Production Date**: May 28 <br />
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

Search for the latest preproduction agent builds at <https://repository.axway.com/>. If you don't see a **PVW** version for a particular agent, it means that agent hasn't been updated for this preproduction release.  

## Agent updates

* **Title**

  (NAME OF AGENT, ENHANCEMENT)</br>
  Description.

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| xxxxxxxx | APIGOV-xxxxx | **Issue**: Description. <br/>**Resolution**: Description. |

## Marketplace updates

* **Unified Oauth Credential Provisioning for MCP Server + Backlog API (v7 Gateway)**
  
  (PROVIDER AND CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE CREDENTIALS)</br>
     Generate and manage a single OAuth credential that seamlessly grants access to both MCP servers and their underlying APIs, simplifying onboarding and reducing configuration effort, reducing setup time for developers and eliminating duplicate credential management. A unified credential model also helps organizations lower operational risk and avoid access gaps across interconnected services.

* **Agent to Agent**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
     Easily discover AI Agents (A2A) in the Marketplace with a dedicated, user-friendly details view that highlights capabilities, skills, and key metadata helping consumers quickly evaluate and adopt the right agent. Enhanced filtering by AI Agent (A2A) type in Marketplace Products further improves discoverability, reducing time spent searching and accelerating integration.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01827557 | APIGOV-32559| **Issue**: 503 Admission error when linking/unlinking asset in draft product <br/>**Resolution**: Fixed by increasing timeout during asset linking/unlinking |
| 01835429 | APIGOV-32649| **Issue**: Adding/Editing a plan in Engage doesn't fetch all resources <br/>**Resolution**: Fixed by updating to show the resources of more than 20 Assets in the quota resource selector |
|          | APIGOV-32589| **Issue**: API Server failed to process ResourceEntryDeleted event for a CRD that had 42k soft references <br/>**Resolution**: Increased the memory to 1.5GBs and set the relay notifier timeout to 5 minutes |
|          | APIGOV-32437| **Issue**: Product documentation does not render if the spec.sections.articles do not have a title set <br/>**Resolution**: Fixed by maintaining Title as a mandatory field for documents. |
