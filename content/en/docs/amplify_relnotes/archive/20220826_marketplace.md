---
title: Amplify August 26 2022
linkTitle: Amplify August 26 2022
weight: 90
draft: true
date: 2022-08-19
---
We work hard to improve the Amplify experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in the latest release.

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

* **API service revision updates** - Agents detect when an API specification changes without deployment changes and updates the service instance with a new revision.

##### Known issues for all Gateway agents

There are no known limitations in this release.

#### Azure Gateway

The following enhancements and bug fixes are available in this release.

##### Feature updates for Azure Gateway

* **Consumer insights metrics** - The Traceability Agent enriches the metrics data with information related to the Marketplace (product / resource / subscription / quota / application) to help the consumer filter data in the Consumer insights UI pages.

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

* **Renaming an API in API Manager is not synchronized by the Discovery Agent** - When an API is renamed in API Manager, Discovery Agent cannot recognize the API name change. This results in the API displaying in Amplify with dual entries of both the originally discovered name and the newly changed name.

### Service Registry

The following enhancements and bug fixes are available in this release.

#### Feature updates for Service Registry or Topology

The Central Admins, Catalog Managers and Developers can set the Team Ownership when creating Environments or API services with the UI.

#### Bug fixes for Service Registry or Topology

There are no bug fixes available in this release.

#### Known issues for Service Registry or Topology

There are no known limitations in this release.

### Asset Catalog

The following enhancements and bug fixes are available in this release.

#### Feature updates for Asset Catalog

* **Manual or automatic access request approvals** - Catalog Managers can now configure the access request approval for an asset to either manual or automatic. The access requests submitted by the consumers will appear on the Access Request management screen, where Catalog Managers can review, approve, or decline them. The approval process can be delegated to an external third-party system, such as ServiceNow, by leveraging our webhook capabilities. Please see [Integrate with Amplify](/docs/integrate_with_central/) for more details.  
This new feature enables you, the provider, to take consumers' access requests to APIs in your ecosystem through a review process that is compliant with your company's regulations and procedures.

* **Share assets with Read-Only permissions** - Catalog Managers can now choose to give read-only access permissions to other teams in their organization (which the Catalog Manager is a member of) when sharing an asset. The teams the asset was shared with can only view and bundle the asset into their own products, but they will not be able to edit or control any asset lifecycle aspects.  

* **Filter assets by status** - The filter has been enhanced to allow filtering the asset catalog by the status. Now users can choose to filter the assets that have the status 'Error.'

#### Bug fixes for Asset Catalog

* **Slow rendering of the Asset Catalog screen** - An issue has been fixed that was causing a slow loading of the Asset Catalog screen.

### Product Foundry

The following enhancements and bug fixes are available in this release.

#### Feature updates for Product Foundry

* **Tiered product plans** - Catalog Managers can now create product plans that will charge consumers for multiple unit limits based upon the corresponding tier price and model. The following models are supported:

    * Tier - volume: Consumers will be charged based on the volume corresponding to the tier quota + flat tier fee (if any).
    * Tier – graduated: Consumers will be charged on each unit based on the price of the corresponding tier + a flat fee (if any).

    Please see [Manage product plans](/docs/manage_product_foundry/manage_product_plans/) for more details.

* **Product visibility enhancements** - When setting the product visibility in the Marketplace, Catalog Managers can now choose to either show it to certain teams or hide it for selected teams. In addition, they can now make the product visible based on team tags. For instance, a product can be made visible in the Marketplace for teams that have the tag *External*.  
This will allow providers to make the product discoverable without having to adjust the product visibility settings as they onboard new teams.

* **Category management** - Categories can now be created and managed from a dedicated screen at **Product Foundry > Categories**.
A category can be configured to either be visible only in the Product Foundry or visible in both the Product Foundry and the Marketplace.
Categories can be flagged to show as featured on the Marketplace Homepage, with a maximum of five categories featured. This will enable Catalog Managers to highlight and advertise a group of products to their consumers.

* **Corrupted products notification** - A visual indicator has been added in the Product Foundry to indicate when an API service that is contained within a product has been removed, which is typically by being deleted from the underlying data plane. This will enable Catalog Managers to either take the appropriate actions to correct the product to make it usable again, or deprecate the product so it is no longer available for use in the Marketplace.

#### Bug fixes for Product Foundry

* **Corrupted assets could be added to a product** - An issue has been fixed that did not allow adding corrupted assets to a product.
* **Wrong product status in Product Foundry** - Prior to this fix, when all product versions were archived, the product status was still showing active. Now, the product becomes archived when all product versions are archived.

#### Known issues for Product Foundry

There are no known limitations in this release.

### Business insights

There are no enhancements and bug fixes in this release.

## Consumer experience

### Marketplace

The following enhancements and bug fixes are available in this release.

#### Feature updates for Marketplace

* **Marketplace home page** - A Homepage screen has been introduced in the Marketplace, which will enable the Platform Administrator to create a personalized look and feel by customizing the following sections:

    * Hero banner
    * Featured categories

    The page can be customized from the Marketplace home page settings, which can be accessed by navigating to your **Organization profile > Marketplace > Homepage**.
    On the home page, consumers can see a list of featured categories, view the most recent products published, and choose to browse all products available in the Marketplace.
    The search function can be used to search products based on title.
    Please see [Marketplace home page settings](/docs/manage_marketplace/marketplace_homepage) for more details.

* **Plan details** - Consumers can now drill down to view the details of a plan, which includes the various quota and resources attached to the plan, from a dedicated plan details page.

#### Bug fixes for Marketplace

There are no bug fixes available in this release.

#### Known issues for Marketplace

There are no known limitations in this release.

### Consumer insights

There are no enhancements and bug fixes in this release.
