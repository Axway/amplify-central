---
title: Asset Catalog April 2022 Release Notes
linkTitle: Asset Catalog April 2022
weight: 90
date: 2022-04-29
---

The Asset Catalog is used to organize your APIs, group them together, and make them ready to productize.

## New features and enhancements

The following new features and enhancements are available in this update:

* Editing of an asset with the WebUI Group Resources step supports the linking / unlinking for API Services to an asset.  
* The Access Rights to an asset/product reflect the limitiations of your Amplify Central role. 
* The Tags for an asset now support all special characters (e.g. & @ $ ).
* The asset details page has a table of products which are consuming/using the currently displayed asset version.  This information will help an API Provider make an informed decision before taking action to Deprecate or Archive an asset version. 
* Ownership and sharing. When creating or editing an asset, it is now possible to assign one owner team of the asset and share it with other teams. The owning team and your role determine if you can edit/updated/delete the asset. The shared with team will have read access to the asset at a minimum.

## Fixed issues

The following issues have been fixed in this release:

* An issue preventing the deletion of an asset with multiple asset versions has been fixed.
* The Product (Catalog) Manager role can manage assets and products.   This inlucdes the setting of team ownership/sharing and the management of the lifecycle of an asset/product.
* The team developer role is limited to read only permissions to the access rights step of the asset wizard.

## Known limitations

The following limitations exist in this update:

* Viewing of the Access Rights to an asset/product is only possible when editing.
