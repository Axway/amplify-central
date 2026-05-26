---
title: Amplify Engage May 28 2026
linkTitle: Amplify Engage May 28 2026
weight: 17
date: 2026-5-26
---

**Feedback Window**: May 28 2026 → June 4 2026 <br />
**Planned Production Date**: June 11 <br />
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

* **Feature**

  (EDGEGATEWAYDISCOVERYAGENT, ENHANCEMENT)</br>
  Description.

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| 01834250   | APIGOV-32644 | **Issue**: The IBM (formerly Software AG) Webmethods agent created multiple Asset resource versions. <br/>**Resolution**: A new WebMethods configuration parameter (WEBMETHODS_GATEWAYHOST) was added to define the correct asset resource endpoint when the Webmethods gateway was behind a load balancer.  |
| 01824682   | APIGOV-32421 | **Issue**: The IBM Webmethods agent was setting the **tags** used by the Webmethods gateway to retriedve APIs. <br/>**Resolution**: A new Webmethods configuration paramater (CENTRAL_ROOTTAGSTOSTRIP) was added to removed the tag value.  |
| 01837772   | APIGOV-32679 | **Issue**: The IBM Webmethods agent did not set the application level authentication scopes. <br/>**Resolution**: A new Webmethods configuration paramater (WEBMETHODS_ADDOAUTHSCOPES=true) was added to enable the valid setting of the authentication scope names.  |
| 01837253   | APIGOV-32664 | **Issue**: The APIM discovery agent created multiple Asset versions. <br/>**Resolution**: A fix was made to the APIM discover agent.  |
| 01836131   | APIGOV-32682 | **Issue**: The Engage Service Registry **save** button prevented the user from saving edits to endpoint for an API. <br/>**Resolution**: A fix was made to the Engage UI.  |
|            | APIGOV-32627 | **Issue**: A document template could not be used with an API Service. <br/>**Resolution**: A fix was made to allow the use of a document template that was made availble to API Services.  |

## Marketplace updates

* **Enhancement**

  (PROVIDER EXPERIENCE, CONSUMER EXPERIENCE, NEW FEATURE)</br>
  Description.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| xxxxxxxx | APIGOV-xxxxx | **Issue**: Description. <br/>**Resolution**: Description. |
