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

* **Title**

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Description.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01838430 | APIGOV-32719 | **Issue**: Blank page in Marketplace for some resources. <br/>**Resolution**: When a specification is not available on the resource, a message that no spec is available for this service is displayed in the resource documentation tab in Marketplace . |
| 01847761 | APIGOV-32950 | **Issue**: Custom subscriptionrequestdef. date field causing UI issues. <br/>**Resolution**: Date is now addable and other fields are not affected. |
|          | APIGOV-32972 | **Issue**: Marketplace UI: Plan tile subscribe button state does not update correctly. <br/>**Resolution**: When a user cancels their subscription, the Plan tile 'Subscribe' button updates to represent the new subscription state. |
|          | APIGOV-32959| **Issue**: Marketplace UI: Plan limit type label not displayed <br/>**Resolution**: Limit Type on the Plan details page displays the proper types without blanks. |
|          | APIGOV-32866| **Issue**: UI: Primary credentials should not display expiry tooltip. <br/>**Resolution**: Primary credential details side-blade updates to no longer display expiration tooltips for the Expiry. |
|          | APIGOV-xxxxx | **Issue**: [Marketplace] Renew not renewing credentials. <br/>**Resolution**: Marketplace DB/backend fixed to propagate new client secret but keep the client id the same on renewal. |
