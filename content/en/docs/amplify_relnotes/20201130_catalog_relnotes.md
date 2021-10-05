---
title: Unified Catalog November 2020 Release Notes
linkTitle: Unified Catalog November 2020
weight: 90
date: 2020-11-30
description: The Unified Catalog is the Marketplace of all integration assets in
  the enterprise, that can range from APIs to Managed File Transfer Flows, and
  caters to both providers and consumers.
---
## New features and enhancements

The following new features and enhancements are available in this update.

### Categories management through the Unified Catalog UI

Robust WebUI for Central Admin users to create and manage categories. Refer to [Manage catalog assets](/docs/catalog/manage-catalog-assets/) for more details.

### Filter Catalog assets updates

Improved searching and browsing in the Unified Catalog.

* The Filter capability has been enhanced to allow for multi-selection of type and categories.
* Pagination has been added to Filter by categories. By default, users can see the first 10 categories available in alphabetical order. A Show more button has been added to display the next 10 available categories.
* Select all has been added to allow filtering by all asset types or all categories with a click of a button.

### Bitbucket integration

Documented CLI extension to enable integration with Bitbucket for manual discovery and publishing of APIs to the Unified Catalog. The CLI extension can be integrated in your CI/CD pipeline to automate the discovery of APIs from your repository. For more information, refer to our public [Github repo](https://github.com/Axway/unified-catalog-integrations).

### CA Layer7 integration

Documented CLI extension to enable integration with Layer7 for manual discovery and publishing of APIs to the Unified Catalog. For more information, refer to our public [Github repo](https://github.com/Axway/unified-catalog-integrations).

## Fixed issues

* Previously, users assigned the Developer role could not push an API asset from the Unified Catalog to Integration Builder as a connector.
* Previously, when no app was required with a subscription, the Approve and Reject dialog screen would display "App has been deleted."
