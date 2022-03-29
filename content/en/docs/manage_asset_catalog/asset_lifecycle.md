---
title: Asset lifecycle
linkTitle: Asset lifecycle
weight: 10
---

The lifecycle of an asset is linked to the lifecycle of the API Services that an asset is made up of and the products that the asset is turned into. The states of the asset determine where it is in its lifecycle.

## Asset states

| State          | Description                                                                |
|----------------|----------------------------------------------------------------------------|
| **Draft**      | The asset cannot be released and is not available in the Product Foundry. The API Provider continues to work on the asset to reach a point where it is ready to be approved for release to the Product Foundry. The asset version can be edited or deleted. The asset version can be moved to the **Active** state.|
| **Active**     | The asset is available in the Product Foundry to create products from. The asset version cannot be edited or deleted. The asset version can be moved to the **Deprecated** or **Draft** states.|
| **Deprecated** | The asset version is marked with a future date for an **Archived** state. This allows time to adopt a newer version of the asset or to update the product with a new asset version. The asset version can be un-deprecated prior to the **Archived** date, moving the asset version back to an **Active** or **Draft** state. The asset version cannot be edited or deleted. The asset version is available in the Product Foundry (appearing as an **Active** state).|
| **Archived**   | The Asset version is archived / inactive and no longer available in the Product Foundry.|

## Version management

Version management tracks all historical changes and controls what will be bundled into a product.

Asset versions are immutable, so direct changes are not allowed. All changes, such as adding / removing a resource, require that the asset be in Draft state. To make changes in an existing asset definition that is not in Draft state, a new version must be created.
