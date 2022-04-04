---
title: Service lifecycle
linkTitle: Service lifecycle
weight: 10
---

The lifecycle of a service is (add text). The states of the service determine where it is in its lifecycle.

## Asset states

| State          | Description                                                                |
|----------------|----------------------------------------------------------------------------|
| **Draft**      | The service cannot be released and is not available in the Product Foundry.|
| **Active**     | The service is available in the (add text).|
| **Deprecated** | The service version is marked with a future date for an **Archived** state.|
| **Archived**   | The service version is archived / inactive and no longer available in the Product Foundry.|

## Version management

Version management tracks all historical changes and controls what will be bundled into a product.

Asset versions are immutable, so direct changes are not allowed. All changes, such as adding / removing a resource, require that the asset be in Draft state. To make changes in an existing asset definition that is not in Draft state, a new version must be created.