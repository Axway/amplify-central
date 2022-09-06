---
title: Marketplace September 9th 2022
linkTitle: Marketplace September 9th 2022
weight: 90
date: 2022-09-1
---
We work hard to improve the Marketplace experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in the latest release.

## Provider experience

### Agents

Current agent versions are based on Amplify Agents SDK v1.1.32. To display version information in the agents, use command `agentName --version`.

Agents' version and Gateway compatibility:

| API Gateway version                        | Agent version|
|--------------------------------------------|--------------|
| Axway API Management 7.6.2 SPx and 7.7 SPx | 1.1.26       |
| AWS Gateway using SDK 2.0                  | 1.1.24       |
| Azure latest release                       | 1.1.26       |
| Istio 1.9.5                                | 2.0.38       |
| Apigee Edge                                | 0.0.9        |
| Mulesoft Anypoint platform v3              | 1.1.8        |

#### All Gateway agents

The following enhancements and bug fixes are available in this release.

##### Feature updates for all Gateway agents

There are no enhancements available in this release.

##### Bug fixes for all Gateway agents

* **Issue** - text.

##### Known issues for all Gateway agents

There are no known limitations in this release.

#### Azure Gateway

The following enhancements and bug fixes are available in this release.

##### Feature updates for Azure Gateway

* **Feature** - Text.

##### Bug fixes for Azure Gateway

There are no enhancements available in this release.

##### Known issues for Azure Gateway

There are no known limitations in this release.

#### Edge Gateway

The following enhancements and bug fixes are available in this release.

##### Feature updates for Edge Gateway

There are no enhancements available in this release.

##### Bug fixes for Edge Gateway

There are no bug fixes available in this release.

##### Known issues for Edge Gateway

* **Issue** - text.

### Service Registry

The following enhancements and bug fixes are available in this release.

#### Feature updates for Service Registry or Topology

There are no enhancements available in this release.

#### Bug fixes for Service Registry or Topology

There are no bug fixes available in this release.

#### Known issues for Service Registry or Topology

There are no known limitations in this release.

### Asset Catalog

The following enhancements and bug fixes are available in this release.

#### Feature updates for Asset Catalog

* **Feature** - Text.

#### Bug fixes for Asset Catalog

* **Issue** - Text.

### Product Foundry

The following enhancements and bug fixes are available in this release.

#### Feature updates for Product Foundry

* **Category management** - Categories can now be edited, deleted and previewed from a dedicated screen at **Product Foundry > Categories**.
The preview helps admnistrator to change that category visibility as well as if a cateory is featured or not.

#### Bug fixes for Product Foundry

* **Assigning category to product removes many product details** - Previously when creating a category and assigning product(s) to it, the assigned product(s) changed to Draft status. Now, the category assignment does not create a product Draft release anymore.
* **Marketplace active subscription list is empty** - Previously, it was possible to create/activate a plan with a quota having no resource assigned. Now, the quota cannot be created/updated if they have no resource assigned and a plan cannot be activated if it has no quota.

#### Known issues for Product Foundry

There are no known limitations in this release.

### Business insights

There are no enhancements and bug fixes in this release.

## Consumer experience

### Marketplace

The following enhancements and bug fixes are available in this release.

#### Feature updates for Marketplace

* **Marketplace home page - filter per featured category** - The featured categories displayed in the home page allows the user to see all related product when using the "View products" link on a category.
* **Markeplace browse product - filter per category** - the browse home page is enriched with the category filter and allow user to see all product for a selected category. A breadcrumb is added as soon as a category is selected in the result page. This breadcrumb allows the user to unselect a previously selected category.

#### Bug fixes for Marketplace

* **Paid plan base price with large number crash the backend** - Previously when using a big number in paid plan, the backend api return a 500 error. Now, the UI does not allow to enter a number having more than 10 digits.

#### Known issues for Marketplace

There are no known limitations in this release.

### Consumer insights

There are no enhancements and bug fixes in this release.