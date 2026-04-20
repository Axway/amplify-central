---
title: Amplify Engage April 20 2026
linkTitle: Amplify Engage April 20 2026
weight: 20
date: 2026-4-8
---

**Feedback Window**: April 20 2026 → April 27 2026 <br />
**Planned Production Date**: April 30 <br />
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

## Marketplace updates

* **Marketplace Sign-In button customization**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
     Marketplace owners can now fully **manage and style the Sign In** button as a standard navigation bar item. The Sign In control follows the same configuration model as other built‑in navigation items, including consistent visibility and labeling management. In addition, marketplaces can present distinct Sign In actions with different emphasis (for example, primary versus secondary), enabling clearer authentication entry points and more intentional user journeys.
  
## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32414| **Issue**: Tooltip on Marketplace Product Warning Icon is not visible <br/>**Resolution**: Fixed display issue to show the warning icon.|
|          | APIGOV-32294| **Issue**: Consumer Org User with Consumer role on x-private team cannot subscribe to free plans <br/>**Resolution**: Consumer role for x-private team fixed to allow subscription to free plans.|
|          | APIGOV-32300| **Issue**: Featured Categories limit reached panel is not visible<br/>**Resolution**: Fixed the UI so that the limit reached panel is now visible.|
|          | APIGOV-32355 | **Issue**: Users were not able to run a compliance linting job for a specific API in the Service Registry. <br/>**Resolution**: A fix was made to allow users with permissions (Engage Admin) to run a compliance linting job from the Service Registry. |
