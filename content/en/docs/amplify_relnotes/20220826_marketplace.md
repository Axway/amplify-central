---
title: Marketplace August 26th 2022
linkTitle: Marketplace August 26th 2022
weight: 90
date: 2022-08-19
---
We work hard to improve the Marketplace experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in the latest release.

## Provider experience

### Agents

Current agent versions are based on Amplify Agents SDK v1.1.32. To display version information in the agents, use command `agentName --version`.

This version is compatible with:

* Axway API Management 7.6.2 SPx and 7.7 SPx
* AWS Gateway using SDK 2.0
* Azure latest release
* Istio 1.9.5
* Apigee Edge
* Mulesoft Anypoint platform v3

#### Azure Gateway

The following enhancements and bug fixes are available in this release.

##### Feature updates for Azure Gateway

**Consumer insights metrics** - The Traceability Agent enriches the metrics data with information related to the Marketplace (product / resource / subscription / quota / application) to help the consumer filter data in the Consumer insights UI pages.

##### Bug fixes for Azure Gateway

**API Service revision updates** - Agents detect when an API specification changes without deployment changes and updates the service instance with a new revision.

##### Known issues for Azure Gateway

**Renaming an API in API Manager is not synchronized by the Discovery Agent** - When an API is renamed in API Manager, Discovery Agent cannot recognize the API name change. This results in the API displaying in Amplify Central with dual entries of both the originally discovered name and the newly changed name.

### Service Registry

The following enhancements and bug fixes are available in this release.

#### Feature updates for Service Registry

There are no enhancements available in this release.

#### Bug fixes for Service Registry

There are no bug fixes available in this release.

#### Known issues for Service Registry

There are no known limitations in this release.

### Asset Catalog

The following enhancements and bug fixes are available in this release.

#### Feature updates for Asset Catalog

**Manual or automatic access request approvals**: Catalog Managers can now configure the access request approval for an asset to either manual or automatic. The access requests submitted by the consumers will appear on the Access Request management screen, where Catalog Managers can review, approve, or decline them. The approval process can be delegated to an external 3rd party system, such as ServiceNow by leveraging our webhook capabilities. Please refer to [Integrate with Amplify Central](/docs/integrate_with_central/) for more details.  
This new feature enables you, the provider, to take consumer’s access requests to APIs in your ecosystem through a review process that is compliant with your company’s regulations and procedures.

**Share assets with Read-Only permissions**: Catalog Managers can now choose to give read-only access permission to other teams in their organizations when sharing an asset. The teams the asset was shared with will only be able to view the asset and bundle into their own products, but they will not be able to edit or control any asset lifecycle aspects.  

**Filter assets by status**: The filter has been enhanced to allow filtering the asset catalog by the status. Now users can choose to filter the assets that have the 'Error' status.  

#### Bug fixes for Asset Catalog

**Slow rendering of the Asset Catalog screen** - We fixed an issue that was cause a slow loading in the Asset Catalog screen.

#### Known issues for Asset Catalog

**Team sharing** - Team sharing has been disabled from the Asset Catalog until *Shared with read-only* access is available.

### Product Foundry

The following enhancements and bug fixes are available in this release.

#### Feature updates for Product Foundry

**Tiered product plans**: Catalog Managers can now create product plans that will charge consumers for multiple unit limits based upon the corresponding tier price and model. The following models are supported:

* Tier - volume – consumers will be charged based on the volume corresponding to the tier quota + flat tier fee (if any).
* Tier – graduated – consumers will be charged on each unit based on the price of the corresponding tier + a flat fee (if any).

Please refer to [Manage product plans](/docs/manage_product_foundry/manage_product_plans/) for more details.

**Product visibility enhancements**: When setting the product visibility in the Marketplace, Catalog Managers can now choose to either show it to certain teams or hide it for selected teams. In addition, they can now select to make the product visible based on team tags. For instance, a product can be made visible in the Marketplace for teams that have the tag External.  

This will allow providers to always make the product discoverable without having to adjust the product visibility settings as they onboard new teams.

**Category management**: Catalog Managers can now create dedicated category for their product. The category could be either visible only on product foundry or also visible in the Marketplace. Up to 5 ctegories can be set as "Featured" to display them in the Marketplace home page. Refer to Product Foundry > Categories

#### Bug fixes for Product Foundry

There are no bug fixes available in this release.

#### Known issues for Product Foundry

There are no known limitations in this release.

### Business insights

The following enhancements and bug fixes are available in this release.

#### Feature updates for Business insights

There are no enhancements available in this release.

#### Bug fixes for Business insights

There are no bug fixes available in this release.

#### Known issues for Business insights

There are no known limitations in this release.

## Consumer experience

### Marketplace

The following enhancements and bug fixes are available in this release.

#### Feature updates for Marketplace

**Marketplace home page**: From the platfrom settings, it is now possible to activate the Marketplace home page. This page has 3 sections:

* the hero banner
* the list featured category
* the browse product with the eight most recent product

From the home page, consumer search for product by name and also navigate to the complete browse product page

**Plan details**: consumer can now naviagte from the product plan page to the plan details page. This page highlight the various quotas and resources attached to the plan.

#### Bug fixes for Marketplace

There are no bug fixes available in this release.

#### Known issues for Marketplace

There are no known limitations in this release.

### Consumer insights

The following enhancements and bug fixes are available in this release.

#### Feature updates for Consumer insights

There are no enhancements available in this release.

#### Bug fixes for Consumer insights

There are no bug fixes available in this release.

#### Known issues for Consumer insights

There are no known limitations in this release.
