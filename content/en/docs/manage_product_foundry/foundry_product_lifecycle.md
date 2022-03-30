---
title: Product lifecycle
linkTitle: Product lifecycle
weight: 10
---

The product lifecycle reflects the state of the product from conception to retirement.

Lifecycle management provides control of the product's states as it progresses through different lifecycle stages.

## Product states

| State          | Description                                                                |
|----------------|----------------------------------------------------------------------------|
| **Draft**      | The product cannot be released and is not available in the Marketplace for consumption. Changes can be made to the product.|
| **Active**     | The product changes have been released by creating a new version. The product can be published to the Marketplace in this state.|
| **Deprecated** | The product is deprecated, and consumers will not be able to create new subscriptions for this product. The product will continue to be shown in the Marketplace for new and existing users until it is transitioned to **Archived**. This state will have an effect on all product versions for the product.|
| **Archived**   | The product is no longer available in the Marketplace and can removed from the Product Foundry and DELETED from the catalog. All active subscriptions for this product are terminated. This state will have an effect on all product versions for the product.|

## Version management

Version management tracks all historical changes and controls what will be released in the Marketplace for consumption.

Product versions are immutable, so direct changes are not allowed. All changes, such as adding / removing an asset and documentation changes, require that the product be in Draft state. To expose the changes in the Marketplace, a new version must be created by releasing the changes.
