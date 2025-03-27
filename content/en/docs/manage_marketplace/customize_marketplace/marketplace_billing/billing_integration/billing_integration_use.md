---
title: Use Billing integration
linkTitle: Use Billing integration
draft: False
weight: 30
---
Use the Enterprise Billing integration solution to monetize your API usage.

## Before you start

You must have an [installed and configured](docs/manage_marketplace/customize_marketplace/marketplace_billing/billing_integration/install_configure_billing_integration) Enterprise Billing integration solution.

## Usage

Once Billing integration is installed and configured, you are ready to monetize your API usage.

1. An Amplify product plan for a specific product is created by the API provider.

    ![Product plan](/Images/marketplace/billing_integration/usage1.png)

2. Once the plan is activated, the integration creates the corresponding plan in the billing platform. Note that the billing platform's Plan Code contains the Amplify Product Plan ID.

    ![Recurly plan](/Images/marketplace/billing_integration/usage3.png)

    ![Recurly pricing model](/Images/marketplace/billing_integration/usage4.png)

3. When an API consumer discovers the product in the Marketplace, they must subscribe to one of the plans in order to request access to an underlying API.

    ![Subscription request](/Images/marketplace/billing_integration/usage5.png)

4. The integration creates a corresponding subscription in the billing platform. Note that the billing platform's Add-on codes for the Billable Add-ons contain the Amplify Product Plan Quota IDs.

    ![Recurly subscription details](/Images/marketplace/billing_integration/usage6.png)

5. An account must be created in the billing platform, that corresponds to the API Consumers's User ID or Team ID or Organization ID in order for subscriptions to be created or linked. Use the following format:

    * amplify-user-{{user id}}
    * amplify-team-{{team id}}
    * amplify-org-{{org id}}

    ![Recurly accounts](/Images/marketplace/billing_integration/usage7.png)

    ![Recurly accounts details](/Images/marketplace/billing_integration/usage8.png)

6. Once the plan and subscription are linked between Amplify and the billing platform, the integration sends API traffic data periodically (nightly / hourly) to the subscription for proper billing.

    ![billing details](/Images/marketplace/billing_integration/usage9.png)

**Usage Notes**:

* To specify which product plans should be linked to the billing platform, the API provider must add a specific attribute `billingSystem=recurly` to those Products with either the API, CLI or the UI.
* [Webhook integrations](/docs/integrate_with_central/webhook) are configured to detect updates to product plans and subscriptions. For example, when a new product plan is created or deleted, or when a subscription is created or deleted. These trigger the integrations to process resources that are tagged appropriately.
* [Amplify product APIs](https://docs.axway.com/category/api) are used to retrieve and update product plans, quotas, subscriptions and other related resources.
* Billing platform APIs are used to create, retrieve and update accounts, billing plans, subscriptions and other related resources in the billing platform.
* The integrations create billing platform resources with codes that relate to the linked resources in Amplify. They also add attributes to the Amplify resources to link them to the corresponding billing platform resources.
* A traffic reporting integration, that runs on a configurable schedule, queries the [Amplify Traceability API](https://apidocs.axway.com/swagger-ui-NEW/index.html?productname=TraceabilityConnector&productversion=1.0.0&filename=swagger.json&disabletry=true) and reports corresponding API traffic to the billing platform.

    ![Product plan and subscription webhooks](/Images/marketplace/billing_integration/usagenotes1.png)
