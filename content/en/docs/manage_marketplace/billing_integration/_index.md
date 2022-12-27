---
title: Billing integration
linkTitle: Billing integration
weight: 50
hide_readingtime: true
---

The Amplify Marketplace Billing integration consists of three integration flows for linking Amplify product plans, Marketplace subscriptions and API transactions to a billing platform, such as Recurly, to monetize API usage:

* Provision plan flow
* Provision subscription flow
* Traffic reporter flow

For detailed flow information, see [Integration components and flows](/docs/manage_marketplace/billing_integration/integration_components_flows)

## How Billing integration works

1. An Amplify product plan for a specific product is created by the API provider.
2. Once the plan is activated, the integration creates the corresponding plan in the billing platform. Note that the billing platform's Plan Code contains the Amplify Product Plan ID.
3. When an API consumer discovers the product in the Marketplace, they must subscribe to one of the plans in order to request access to an underlying API.
4. The integration creates a corresponding subscription in the billing platform. Note that the billing platform's Add-on codes for the Billable Add-ons contain the Amplify Product Plan Quota IDs.
5. An account must be created in the billing platform, that corresponds to the API Consumers's User ID or Team ID or Organization ID in order for subscriptions to be created or linked. Use the following format:

    * amplify-user-{{user id}}
    * amplify-team-{{team id}}
    * amplify-org-{{org id}}

6. Once the plan and subscription are linked between Amplify and the billing platform, the integration sends API traffic data periodically (nightly / hourly) to the subscription for proper billing.

**Usage Notes**:

* To specify which product plans should be linked to the billing platform, the API provider must add a specific attribute to those Products with either the API, CLI or the UI.
* [Webhook integrations](/docs/integrate_with_central/webhook) are configured to detect updates to product plans and subscriptions. For example, when a new product plan is created or deleted, or when a subscription is created or deleted. These trigger the integrations to process resources that are tagged appropriately.
* [Amplify product APIs](https://docs.axway.com/category/api) are used to retrieve and update product plans, quotas, subscriptions and other related resources.
* Billing platform APIs are used to create, retrieve and update accounts, billing plans, subscriptions and other related resources in the billing platform.
* The integrations create billing platform resources with codes that relate to the linked resources in Amplify. They also add attributes to the Amplify resources to link them to the corresponding billing platform resources.
* A traffic reporting integration, that runs on a configurable schedule, queries the [Amplify Traceability API](https://apidocs.axway.com/swagger-ui-NEW/index.html?productname=TraceabilityConnector&productversion=1.0.0&filename=swagger.json&disabletry=true) and reports corresponding API traffic to the billing platform.
