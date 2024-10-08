---
title: Migrate Unified Catalog to Amplify Marketplace
linkTitle: Migrate Unified Catalog to Amplify Marketplace
draft: true
weight: 145
---

Use the Axway migration tool to help migrate your Unified Catalog assets and items via the provider/consumer model to Asset Catalog, Product Catalog and Marketplace. For information and instructions, see the [unified-catalog-migration README](https://github.com/Axway/unified-catalog-migration).

## Prepare to migrate Unified Catalog

* Determine if you are eligible/already using Amplify API Management Platform V2 offering.

    {{< alert title="Note" color="primary" >}}This migration process is specifically for customers who have purchased the Unified Catalog subscription via the Amplify API Management Platform offering.{{< /alert >}}

* Ensure that migration is appropriate for your environment and your product needs.
* Review the latest [Amplify Release Notes](/docs/amplify_relnotes/).
* Visit Axway University to learn about the [Amplify Enterprise Marketplace features](https://university.axway.com/learn/courses/11665/introduction-to-amplify-enterprise-marketplace).
* Check the [migration tool's prerequisites](https://github.com/Axway/unified-catalog-migration#pre-requisites).
* Evaluate the effort required for the migration:
    * Length and impact of product down time. The migration tool is designed to transition your assets smoothly with minimal down-time, but it may be necessary to inform users.
    * Basic migration effort.
    * Specific actions might be required due to incompatibilities or limitations.
    * Initial validation and non-regression testing.
    * Consider migrating during a low-volume period.
    * It is recommended to migrate one environment at a time to avoid any conflicts.

## Migrate Unified Catalog

Go [here](https://github.com/Axway/unified-catalog-migration) to download the tool. Follow the instructions in the migration tool's README.

## Post Migration

Verify all functionality is working as expected in Amplify Marketplace. Axway has ensured feature parity between Unified Catalog and Marketplace so that your business needs are satisfied.

{{< alert title="Note" color="primary" >}}You can also work with an Axway pre-sales specialist to double-check the success of the migration.{{< /alert >}}
