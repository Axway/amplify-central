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

* **MCP discovery from AWS Bedrock AgentCore**

  (AWS AGENT, ENHANCEMENT)</br>
  The AWS SaaS and on-premise agents can discover Model Context Protocol (MCP) services from an Amazon Bedrock AgentCore Gateway. The discovered MCP services are registered in Amplify Engage Service Registry. The MCP services can be published in the Engage Marketplace for consumption.

* **Automatic credential/application sync for APIM updates via CLI**

  (AXWAY API MANAGEMENT  DISCOVERY AGENT, ENHANCEMENT)</br>
  The Axway API Management Discovery Agent will maintain synchronization between the API Manager and existing Marketplace application/credentials if an API is updated with the APIM CLI.

## Marketplace updates

* **Custom plan type**

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Providers can now create plans with the new Custom plan type for offerings where pricing is negotiated externally. Custom plans disable all pricing fields (base price, setup price, currency) in the plan configuration and display "Custom" — rather than "Free" or a dollar amount — on all Marketplace surfaces including plan cards, detail pages, and subscription flows. Consumers can subscribe to Custom plans through the standard subscription and approval workflow without pricing-related blocks. Quotas on Custom plans are limited to Standard Quota, and billing integration is not triggered.

* **Expanded mTLS support**

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Marketplace now natively supports mTLS certificate-based credentials. Consumers upload a public certificate during credential creation, and the process validates format, expiration, and signing chain in real time with localized error messages. Parsed metadata (Subject DN, expiration, SHA-256 fingerprint) is displayed at upload and persisted in the credential detail view. Providers control whether self-signed certificates are accepted per environment. Certificate expiration automatically applies to the credential and integrates with the existing notification framework.

* **A2A service documentation support**

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  The Marketplace now displays service-level documentation for A2A (Agent-to-Agent) API services. Documentation attached to A2A resources appears on both the Resources tab of a Marketplace Product page consistent with existing documentation support for other service types.

  (PROVIDER EXPERIENCE, ENHANCEMENT, SERVICE REGISTRY)</br>
  The API Service wizard now includes a step to add service-level documentation for A2A (Agent-to-Agent) API services. Documentation attached to A2A resources will appear on API service documentation tab.

* **Resource State and Stage in Advanced Search**

  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  The Marketplace Advanced Search Resources tab now displays State and Stage columns for each resource. These values are populated from the resource data and respect stage-level access controls — users only see stages they are authorized to view. Stage titles honor the Marketplace's selected language for internationalization.

* **Marketplace token endpoint for service account authentication**

  (PROVIDER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Marketplace now exposes a token endpoint (POST /api/v1/auth/token) that proxies client credential requests to the platform identity provider. Service accounts in consumer organizations can obtain access tokens using their Marketplace vanity URL rather than calling the identity provider directly. The endpoint accepts standard client_credentials grant requests, validates that the requesting service account belongs to a consumer org associated with that Marketplace (or the owning provider org), and returns a 403 if the credential does not match.

* **Endpoint URL copy-to-clipboard**

  (PROVIDER EXPERIENCE, ENHANCEMENT, SERVICE REGISTRY)</br>
  The endpoint URL on the Service Registry details page has a **Copy endpoint URL**  icon to  make it easier for a user to make a copy of the full endpoint URL.

## Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|             | APIGOV-32804 | **Issue**: Clicking on 'Sign out' does not revoke bearer token. <br/>**Resolution**: Revoke API is now invoked and not stalled, returning 204 (as expected). |
|             | APIGOV-32798 | **Issue**: Products filtering by type not available. <br/>**Resolution**: Updated the Type filter condition to show filter values based on resource types available in the Product list. |
