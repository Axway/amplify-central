---
title: Amplify Engage June 11 2026
linkTitle: Amplify Engage June 11 2026
weight: 16
date: 2026-6-10
---

**Feedback Window**: June 11 2026 → June 18 2026 <br />
**Planned Production Date**: June 25 <br />
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

* **Feature**

  (AGENT, ENHANCEMENT)</br>
  Description.

## Agent bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
| xxxxxxxx | APIGOV-xxxxx | **Issue**: Description. <br/>**Resolution**: Description.  |

## Marketplace updates

* **Custom Plan Type**

     (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
     Providers can now create plans with the new Custom plan type for offerings where pricing is negotiated externally. Custom plans disable all pricing fields (base price, setup price, currency) in the plan configuration and display "Custom" — rather than "Free" or a dollar amount — on all Marketplace surfaces including plan cards, detail pages, and subscription flows. Consumers can subscribe to Custom plans through the standard subscription and approval workflow without pricing-related blocks. Quotas on Custom plans are limited to Standard Quota, and billing integration is not triggered.

* **Expanded mTLS Support**

     (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
     Marketplace now natively supports mTLS certificate-based credentials. Consumers upload a public certificate during credential creation, and the process validates format, expiration, and signing chain in real time with localized error messages. Parsed metadata (Subject DN, expiration, SHA-256 fingerprint) is displayed at upload and persisted in the credential detail view. Providers control whether self-signed certificates are accepted per environment. Certificate expiration automatically applies to the credential and integrates with the existing notification framework. 

* **A2A Service Documentation Support**

     (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
The Marketplace now displays service-level documentation for A2A (Agent-to-Agent) API Services. Documentation attached to A2A resources appears on both the Resources tab of a Marketplace Product page consistent with existing documentation support for other service types.

* **Resource State and Stage in Advanced Search**

     (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
     The Marketplace Advanced Search Resources tab now displays State and Stage columns for each resource. These values are populated from the resource data and respect stage-level access controls — users only see stages they are authorized to view. Stage titles honor the Marketplace's selected language for internationalization.

* **Marketplace Token Endpoint for Service Account Authentication**

     (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
     Marketplace now exposes a token endpoint (POST /api/v1/auth/token) that proxies client credential requests to the platform identity provider. Service accounts in Consumer Organizations can obtain access tokens using their Marketplace vanity URL rather than calling the identity provider directly. The endpoint accepts standard client_credentials grant requests, validates that the requesting service account belongs to a Consumer Org associated with that Marketplace (or the owning Provider Org), and returns a 403 if the credential does not match.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|             | APIGOV-32804 | **Issue**: Clicking on 'Sign out' does not revoke bearer token. <br/>**Resolution**: Revoke API is now invoked and not stalled, returning 204 (as expected). |
|             | APIGOV-32798 | **Issue**: Products filtering by type not available. <br/>**Resolution**: Updated the Type filter condition to show filter values based on resource types available in the Product list |
