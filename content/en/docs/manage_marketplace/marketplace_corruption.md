---
title: Marketplace corruption detection
linkTitle: Marketplace corruption detection
weight: 40
---

Understand all mechanism highlighting issues with assets and products.

## Before you start

You need to understand what an asset and a product are and know how to navigate the Marketplace.

## Objectives

Learn how providers and consumers are impacted by corrupted assets and/or products

## What is a corrupted asset/product?

An asset or a product becomes corrupted when one of the API service they are built on disappear from the system (intentionally or not).

The API service deletion affects the asset as its resource references are no more available. The products linked to this corrupted asset becomes corrupted too as the plan and quotas cannot map the deleted API service. And consequently, the product resources cannot be consumed from the marketplace.

## How a corrupted asset/product is displayed for the provider?

A corrupted asset is highlighted as follows:

* Asset list view - a warning icon on the resources from the Asset list view.
* Asset details view - each version linked to a deleted API service has the warning icon and an explanation. The details of the version show the resource(s) in error when the API service is missing.

A corrupted product is highlighted as follows in Amplify UI:

* Product list view - a warning icon beside the corresponding corrupted asset.
* Product detail view - the corrupted asset version has a warning icon. A warning icon is displayed on the plan and quota having missing resources.
* Plan details view - the corrupted quota is highlighted with a warning icon and explanation.

## How a corrupted product is displayed in the Marketplace?

A corrupted product is highlighted as follows in any Marketplace the product is publish to:

* Product list view - a red warning icon at the end of the product name.
* Product detail / resource view - a red warning icon at the end of the corrupted resource.

{{< alert title="Note" color="primary" >}}Access and credential requests are not allowed for corrupted resources.
{{< /alert >}}

### I already have a subscription to a corrupted product

* When consumers have a subscription to a corrupted product, they can continue to view their product and subscription, but they will not be allowed to request new access or credentials to the corrupted resources.

{{< alert title="Note" color="primary" >}}Access and credential requests are only permitted for resource that are not corrupted.
{{< /alert >}}

* Consumers can still use their existing subscription or create a new one.

### I don't have a subscription to a corrupted product

* Consumers who do not already have a subscription to a corrupted product will not be able to see it when the product contains a single resource.
* Consumers are able to see a corrupted product if it contains multiple resources and some of the resources are not corrupted.
* Consumers are allowed to subscribe to a corrupted product. However, access requests to corrupted resources are blocked, but they can request access to the resources that are not corrupted.
