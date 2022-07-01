---
title: Unified Catalog March 2021 Release Notes
linkTitle: Unified Catalog March 2021
weight: 90
date: 2021-03-30
description: The Unified Catalog is the Marketplace of all integration assets in
  the enterprise, that can range from APIs to Managed File Transfer Flows, and
  caters to both providers and consumers.
---
## New features and enhancements

There are no new features and enhancements in this release.

## Fixed issues

The following issues were fixed in this release:

**Removing an environment with duplicate attributes could get stuck in deleting state:** Having duplicate attributes on a resource in an environment would prevent the providers from successfully deleting the environment from the system. After the fix, providers can remove the environments without getting stuck in delete state.

**The Unified Catalog could not display the full schema definition in the embedded Swagger UI**: Before the fix, when users tried to read the API Swagger documentation, the schema definition would get truncated and prevented them from reading all supported properties. After the fix, all supported properties are visible in the API Swagger documentation.

## Known limitations

There are no known limitations in this release.
