---
title: Marketplace corruption detection
linkTitle: Marketplace corruption detection
weight: 55
---

Understand all mechanism highlighting issues with assets and products.

## Before you start

You need to understand what is an asset, a product and know how to navigate in the marketplace.

## Objectives

Learn how providers and consumers are impacted by corrupted assets and/or products

## What is a corrupted asset/product?

An asset or a product becomes corrupted when one of the API Service they are built on disappear from the system (intentionally or not).

The API Service deletion affects the asset as its resource references are no more available. The products linked to this corrupted asset becomes corrupted too as the plan and quotas cannot map the deleted API Service.

## How corrupted asset/product are displayed for provider?

A corrupted asset is highlighted as follows:

* asset list view: a warning icon is present on the resources from the Asset list view.
* asset details view: each version linked to a deleted API Service has the warning icon and an explanation. The details of the version shows the resource(s) in error when the API Service is missing.

A corrupted product is highlighted as follows in Amplify UI:

* product list view: a warning icon beside the corresponding corrupted asset.
* product detail view: the corrupted asset version has a warning icon. A warning icon is displayed on the plan and quotas having missing resource.
* plan details view: the corrupted quota are highlighted with the warning icon and explanation.

## How corrupted product are displayed in Marketplace?

A corrupted product is highlighted as follows in any marketplace the product is publish to:

* product list view: a red warning icon is added at the end of the product name.
* product detail / resource view: a red warning icon is added at the end of the corrupted resource
* Access request and Credentials request are not allowed for corrupted resources

### I already have a subscription to a corrupted product

When consumers already have a subscription to a product, they continue to view their product and subscription. But they will not be allowed to request new access nor  new credentials to the corrupted resources.

Consumers can still use their existing subscription or create a new one.

Access and credentials requests are only permitted to the non corrupted resource.

### I don't have a subscription to a corrupted product

Consumers who have not already a subscription to a corrupted product will not be able to see it when the product contains a single resource.

Consumers are able to see a corrupted product if it contains multiple resources. Consumers will be allowed to subscribe to the corrupted product. The access request to corrupted resources is blocked but you can request access to the non corrupted resources.