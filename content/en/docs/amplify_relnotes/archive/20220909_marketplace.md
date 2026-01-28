---
title: Amplify September 9 2022
linkTitle: Amplify September 9 2022
weight: 85
draft: true
date: 2022-09-1
---
We work hard to improve the Amplify experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in the latest release.

## Provider experience

### Agents

Current agent versions are based on Amplify Agents SDK v1.1.33. To display version information in the agents, use command `agentName --version`.

Agents' version and Gateway compatibility:

| API Gateway version                        | Agent version|
|--------------------------------------------|--------------|
| Axway API Management 7.6.2 SPx and 7.7 SPx | 1.1.27       |
| AWS Gateway using SDK 2.0                  | 1.1.25       |
| Azure latest release                       | 1.1.27       |
| Istio 1.9.5                                | 2.0.38       |
| Apigee Edge                                | 0.0.9        |
| Mulesoft Anypoint platform v3              | 1.1.8        |

#### All Gateway agents

There are no enhancements and bug fixes in this release.

#### Azure Gateway

The following enhancements and bug fixes are available in this release.

##### Feature updates for Azure Gateway

* **API discovery** - The Azure Discovery Agent v1.1.27 has been enhanced to use Azure products to group APIs, provision API access and credentials.

##### Bug fixes for Azure Gateway

There are no bug fixes available in this release.

##### Known issues for Azure Gateway

There are no known limitations in this release.

### Service Registry

There are no enhancements and bug fixes in this release.

### Asset Catalog

The following enhancements and bug fixes are available in this release.

#### Feature updates for Asset Catalog

* **Asset sharing** - The Catalog Manager and Developer can share assets with read-only access to any team or all teams in the organization.

#### Bug fixes for Asset Catalog

* **Team selector** - The team selector on the UI can now switch teams. The scroll bar or a search bar can find all the teams that you are a member of.

#### Known issues for Asset Catalog

There are no known limitations in this release.

### Product Foundry

The following enhancements and bug fixes are available in this release.

#### Feature updates for Product Foundry

* **Category management** - Categories can now be edited, deleted and previewed from a dedicated screen that can be accessed from **Product Foundry > Categories**. This gives Central Administrators full management capabilities over categories from the WebUI.
* **Product sharing** - The Catalog Manager can share products with read-only access to any team or all teams in the organization.

#### Bug fixes for Product Foundry

* **Assigning a product to a category changed the product state** - Previously, when creating a category from the category management screen, and assigning product(s) to it, the assigned product(s) changed to Draft status. Now, the category assignment does not create a product Draft release.
* **Marketplace active subscription list is empty** - Previously, it was possible to create/activate a plan with a quota having no resource assigned. Now, the quota cannot be created/updated if it has no resource assigned and a plan cannot be activated if it has no quota.

#### Known issues for Product Foundry

There are no known limitations in this release.

### Business insights

The following enhancements and bug fixes are available in this release.

#### Feature updates for Business insights

* **Subscriptions** - API Providers can now see the usage and quota compliance of subscriptions to their APIs by different consuming teams.

#### Bug fixes for Business insights

There are no bug fixes available in this release.

#### Known issues for Business insights

There are no known limitations in this release.

## Consumer experience

### Marketplace

The following enhancements and bug fixes are available in this release.

#### Feature updates for Marketplace

* **View products in a featured category** - Consumers can now see the products included in the featured categories displayed on the home page by clicking on the "View products" link shown for each category.
* **Filter products by categories** - The browse products page has been enhanced with a category filter to allow users to filter the catalog of products by categories. A breadcrumb is added to the result page once the filter is applied that enables users to unselect a selected category and reset the filter.

#### Bug fixes for Marketplace

* **Paid plan base price with large number crashes the backend** - Previously when using a big number in a paid plan, the backend API crashed. Now, the UI does not allow a number having more than 10 digits.

#### Known issues for Marketplace

There are no known limitations in this release.

### Consumer insights

There are no enhancements and bug fixes in this release.
