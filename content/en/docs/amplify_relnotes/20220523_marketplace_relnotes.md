---
title: Marketplace May 2022 Release Notes
linkTitle: Marketplace May 2022
weight: 90
date: 2022-05-23
---

The Marketplace is the storefront into all products exposed for discovery and consumption by internal and/or external consumers.

## New features and enhancements

The following new features and enhancements are available in this update:

* **Marketplace login**: when accessing a private Marketplace url directly, user is automatically redirected to a login screen when user can logged prior to see the marketplace content. This does not apply for public Marketplace where you can browse it anonymously.
* **Only one free subscription**: it no more possible to subscribe twice for a free plan with the same team and product.
* **Subscription automatic name**: it is no more require to name your subscription or your access request. A pattern is supplied: `{owner} - subscription for {product} - #` or `Access request for {application} - #`. {owner}, {product} and {application} will be replace when the api is called. An additional counter represented by the `#` could be added too.
* **Application page rebrand**: the consumer is now able to see the resource associated to a credential.
* **Consumer insights**: as soon as an API is called under the constraint of a marketplace subscription and application, the traceability agent is reporting the corresponding traffic to the Analytics service. Then the consumer is able to see his consumption from the Consumer Insights screen (Marketplace home > Consumer Insights). Consumer will be able to filter his API Health by Product, Subscription and Application.

## Fixed issues

The following issues have been fixed in this update:

* NoneAdd text.

## Known limitations

The following limitations exist in this update:

* Product details (overview / documentation) is hardcoded and does not reflect what has been done in Product Foundry.
