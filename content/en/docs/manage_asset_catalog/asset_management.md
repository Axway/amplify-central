---
title: Asset management
linkTitle: Asset management
weight: 20
---

Use the Asset Catalog UI to manage your assets, including: view, create, edit, activate, deprecate and archive assets.

## View assets

To view assets:

1. Navigate to *Asset Catalog*.
2. Select **Assets > All Assets**.

View the following information for all assets in any state (Draft, Active, Deprecated, Active):

* Name - Uniquely identifies the asset
* Title - The display name for the asset in the UI
* Tags - Categories to help find APIs in the catalog
* Current state of an asset - Draft, Active, Deprecated, Active. See [Asset management](/docs/manage_asset_catalog/asset_lifecycle/) for additional information.
* Type of an asset - Add content
* Environments of asset resources - API Manager, AWS Gateway, Azure gateway, Istio Gateway

Or, filter the assets by the current state and type using the **Filter By** controls.

## View asset details

To view asset details:

1. Navigate to *Asset Catalog*.
2. Select **Assets > All Assets**.
3. From the list view, select an asset.

View the following detailed information for a specific asset in any state (Draft, Active, Deprecated, Active):

* Asset Name - Uniquely identifies the asset
* Asset Type - Add content
* Asset State - Draft, Active, Deprecated, Active. See [Asset management](/docs/manage_asset_catalog/asset_lifecycle/) for additional information.
* Logical Name - Add content
* Modified On - Add content
* Modified By - Add content
* Created By - Add content
* Description - Add content
* Resources - Add content
* Version State - Add content
* Category - Add content
* Tags - Add content
* Attributes - Add Content

{{< alert title="Note" color="primary" >}}Tags, Attributes, and Categories can be added or removed in the asset details view.{{< /alert >}}

## Create an asset

To create an asset:

1. Navigate to *Asset Catalog*.
2. Select **Assets > All Assets**.
3. Click **+ Add New User** to add a new user.
4. Add the following and then click **Next**:

    * Asset Name - Add text
    * Description - Add text
    * Image - Description

5. Select the API resources that will be part of this asset. For each resource, select the appropriate version. Default is **Latest**.
6. Provide the Tags, Attribute and Category details for the Asset.
7. Click **Save**.

The asset is created in **Draft** state. To use this asset in a product definition, you must move the asset to an **Active** state by activating the asset.

## Activate an asset

The asset must be in **Draft** state.

1. Navigate to *Asset Catalog*.
2. Select **Assets > All Assets**.
3. From the list view, select the asset to activate.
4. Click **Activate**.
5. Select a Release Type of either **Major**, **Minor**, or **Patch**.
6. Click **Update**.

## Edit an asset

The asset must be in **Draft** state.

Add instructions

## Delete an Asset

The asset must be in **Draft** state.

1. Navigate to *Asset Catalog*.
2. Select **Assets > All Assets**.
3. From the list view, select the asset to delete.
4. Click **Delete Asset**.
5. Confirm that the selected asset is the one you want to delete.
6. Click **Update**.

{{< alert title="Note" color="primary" >}}Assets that are part of an active product definition cannot be deleted.{{< /alert >}}

## Deprecate an asset

The asset must be in **Active** state.

1. Navigate to *Asset Catalog*.
2. Select **Assets > All Assets**.
3. From the list view, select the asset to deprecate.
4. Click **Deprecate Asset**.
5. Confirm that the selected asset is the one you want to deprecate.
6. Click **Update**.

## Archive an asset

The asset must be in **Deprecated** state.

1. Navigate to *Asset Catalog*.
2. Select **Assets > All Assets**.
3. From the list view, select the asset to Archive.
4. Click **Archive Asset**.
5. Confirm that the selected asset is the one you want to Archive.
6. Click **Update**.