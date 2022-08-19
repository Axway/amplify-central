---
title: Asset Catalog April 2022 Release Notes
linkTitle: Asset Catalog April 2022
weight: 90
date: 2022-04-29
---

The Asset Catalog is used to organize your APIs, group them together, and make them ready to productize.

## New features and enhancements

The following new features and enhancements are available in this update:

* When editing an asset with the WebUI Group Resources step, it is now possible to link / unlink the API Services.
* The Access Rights to an asset/product reflect the limitations of your Amplify Central role.
* The Tags for an asset now support all special characters (e.g. & @ $ ).
* The Asset details page lists products that are consuming/using the currently displayed asset version. With this information, an API Provider make an informed decision before taking action to Deprecate or Archive an asset version.
* When creating or editing an asset, it is now possible to assign one owning team of the asset and share it with other teams. The owning team and roles determine who can edit/updated/delete the asset. The shared with team will at a minimum have read access to the asset.

## Fixed issues

The following issues have been fixed in this update:

* An asset with multiple asset versions can now be deleted.
* The Product (Catalog) Manager role can now manage assets. This includes the setting of team ownership/sharing and the management of the lifecycle of an asset.
* The team developer role is now limited to read only permissions in the access rights step of the asset wizard.

## Known limitations

The following limitations exist in this update:

* Viewing of the Access Rights to an asset/product is only possible when editing.
