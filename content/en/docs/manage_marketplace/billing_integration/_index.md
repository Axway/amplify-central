---
title: Billing integration
linkTitle: Billing integration
weight: 50
hide_readingtime: true
---
The billing integration project can be downloaded, imported into Amplify and configured to link Amplify product plans, Marketplace subscriptions and API transactions to a billing platform, such as Recurly, to monetize API usage.

The Billing integration solution consists of [integration flows, connections and services](/docs/manage_marketplace/billing_integration/integration_components_flows) that link subscriptions to a billing platform:

* An API provider creates a product plan, which automatically triggers a *Provision Plan* integration flow to create a corresponding billing plan.
* An API consumer subscribes to the product plan and the *Provision Subscription* integration flow links the subscriber to a billing account.
* All API traffic related to the linked subscription is queried for and reported to the billing platform by the *Traffic Reporter* integration flow.

## Related topics

See the following topics for related information.
