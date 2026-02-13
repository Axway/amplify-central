---
title: Amplify Engage February 12 2026
linkTitle: Amplify Engage February 12 2026
weight: 24
date: 2026-2-12
---

**Feedback Window**: Start Date → End Date <br />
**Planned Production Date**: Date <br />
**Environment**: Non-production

---

This preview (preprod) environment allows you to test and validate upcoming features, enhancements, and bug fixes before they are promoted to production.

Feedback collected during preview testing may result in changes, deferrals, or removals of the previewed features, enhancements, and bug fixes in the upcoming production release.

See [Provide testing feedback](/docs/amplify_pre-relnotes/#provide-testing-feedback) for instructions on submitting preprod testing feedback.

---

## Marketplace updates

* **Advanced Marketplace Homepage Customization**
  
   (CONSUMER EXPERIENCE, MARKETPLACE HOMEPAGE, ENHANCEMENT)</br>
  Marketplace Administrators are now able to control the layout and customization of the Marketplace homepage. They can rearrange sections, include or exclude certain elements or even add custom articles (as formatted text) to the Homepage. This flexibility grants them the ability to create a tailored experience that aligns with their branding requirements, often driven by their UX or Marketplace teams. 

* **Clicking the subscription name on the product details screen opens a sideblade instead of navigating away**

  (PROVIDER EXPERIENCE, PRODUCT FOUNDRY, RESOLUTION)</br>
  Resolved an issue within *Product Details > Subscriptions* tab where when a user clicked a subscription to open the sideblade, the main page would navigate to the *Subscriptions* page.  Now the main Product details page focus persists.

* **UX Audit Updates for Consistency Across UI - Product Foundry & Document Library**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Updated the *Product Foundry* and *Document Library* (documents and templates) for UI consistency based on UX audit


## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-31938 | **Issue**: Can not edit Product Plans that contain over 150 resources. <br/>**Resolution**: Plan updated to switched to graphQL request to grab >150 asset resources.
|          | APIGOV-31937 | **Issue**: Product Plans can not be edited if there are assets with no active releases attached to the product. <br/>**Resolution**: Fixed the failing request for asset releases.
