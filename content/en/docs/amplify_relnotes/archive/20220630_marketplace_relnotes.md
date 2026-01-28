---
title: Marketplace June 2022 Release Notes
linkTitle: Marketplace June 2022
weight: 90
draft: true
date: 2022-06-30
---

The Marketplace is the storefront into all products exposed for discovery and consumption by internal and/or external consumers.

## New features and enhancements

The following new features and enhancements are available in this update:

* **Paid plan**: consumer can see the paid plan and their associated cost.
* **Application**: consumer can now edit the application (name / description / image).
* **Subscription**: by default, subscription is owned by a team. Adding `x-private` tag on a team allows the user to not share the subscription with their team. In this case, the subscription is private to the user and no other consumer can see/use it.
* **Product visibility**: based on what the provider has defined, a consumer only sees the product(s) that is visible to the team(s) he is part of.
* **Access request**: the consumer see the access request provisioned data that a provider wants him to see or use.
* **Error management**: when an error occurred during provisioning access or credentials from the provider side, the consumer can see the error.
* **Subscription approval**: provider can set the type of approval for subscription plans (Automatic - default / Manual). The list of subscriptions is available under the Amplify Central > Marketplace > Subscriptions menu. From this page, the provider can approve/decline/revoke the subscription. Similarly, the provider can see the the access request list and details from the Amplify Central > Marketplace > Access Requests menu.

## Fixed issues

The following issues have been fixed in this update:

* Security fixes have been applied to this release.
* Subscription buttons styling.

## Known limitations

The following limitation exists in this update:

* Highlighted documents displayed on the overview screen of the product details cannot be configured using the Product Foundry APIs. The CLI must be used to add star documents.
