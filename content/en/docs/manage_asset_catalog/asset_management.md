---
title: Asset management
linkTitle: Asset management
weight: 20
---

Use the Asset Catalog WebUI to manage your assets, including: view, create, activate, deprecate and archive assets.

## Before you start

You must have credentials or a user account from your org administrator to use the Asset Catalog WebUI.  Please follow the steps [here](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).

## Objectives

Learn how to use the Asset Catalog WebUI to create and manage assets, including:

* Create an asset
* Link an existing API to the created asset
* Activate the asset to make it available to the Product Foundry
* Organize your assets
* Archive and delete an asset

## View assets

To view assets:

1. Navigate to *Asset Catalog*.
2. Select **Catalog > Asset Catalog > All Assets**.

View the following information for all assets in any state (Draft, Active, Deprecated, Active):

* Asset Name - The display name for the asset in the UI
* Logical Name - Uniquely identifies the asset
* Tags - Categories to help find APIs in the catalog
* State - Current state of an asset - Draft, Active, Deprecated, Active. See [Asset management](/docs/manage_asset_catalog/asset_lifecycle/) for additional information
* Type - API Service or other resource types (e.g., PDF and video files). Functionality coming soon

You can also filter the assets by the current category / stage / state, and type using the **Filter By** controls.

## View asset details

To view asset details:

1. Navigate to *Asset Catalog*.
2. Select **Catalog > Asset Catalog > All Assets**.
3. From the list view, select an asset.

View the following detailed information for a specific asset in any state (Draft, Active, Deprecated, Active):

* Asset Name - The display name for the asset in the WebUI
* Logical Name - Uniquely identifies the asset
* Asset Type - API Service or other resource types (e.g. PDF and video files). Functionality coming soon
* Asset State - Draft, Active, Deprecated, Archived. See [Asset management](/docs/manage_asset_catalog/asset_lifecycle/) for additional information
* Modified On - Date, Time, and Username of who last modified this asset
* Modified By - The user who last modified the asset
* Created On - Date, Time, and Username of who created this asset
* Description - A short description of the asset
* Resources - API Services or other resource types that are linked to this asset
* Version State - Draft, Active, Deprecated, Archived. See [Asset management](/docs/manage_asset_catalog/asset_lifecycle/) for additional information
* Category - Categories to help classify assets into groups and find the asset by filtering on the Category
* Tags - Labels to help find assets in the catalog
* Attributes - Key and value pair to allow customers to attach/query for custom information

{{< alert title="Note" color="primary" >}}Tags, Attributes, and Categories can be added or removed in the asset details view.{{< /alert >}}

## Create an asset

To create an asset:

1. Navigate to *Asset Catalog*.
2. Select **Catalog > Asset Catalog > All Assets**.
3. Click **+ Add New Asset** to add a new asset.
4. Add the following and then click **Next**:

    * Asset Name - The display name for the asset in the WebUI
    * Description - A short description of the asset
    * Image - An icon or image to be associated with the asset

5. At the Group Resources stop, select the API resources, and click on the Link icon that will be part of this asset. For each resource, select the appropriate version. Default is **Latest**.
6. Provide the Category, Tags, and Attribute details for the asset.
7. Add the Access Rights for the asset.
8. Click **Save Draft * Exit**.

The asset is created in **Draft** state. To use this asset in a product definition, you must move the asset to an **Active** state by activating the asset.

## Activate an asset

The asset can be in **Draft** or **Deprecated** state.

1. Navigate to *Asset Catalog*.
2. Select **Catalog > Asset Catalog > All Assets**.
3. From the list view, select the asset to activate.
4. Select an asset version in a **Draft** or **Deprecated** state.
5. Click **Activate**.
6. Select a Release Type of either **Major**, **Minor**, or **Patch**.
7. Click **Update**.

## Edit an asset

The asset can be in **Draft**, **Active**, or **Deprecated** state.

1. Navigate to Asset Catalog.
2. Select **Catalog > Asset Catalog > All Assets**.
3. From the list view, select the asset to edit.
4. Select an asset version in a **Draft**, **Active** or **Deprecated** state.
5. Click **Edit Asset** or **Create Draft**.
6. The Edit Asset wizard is displayed. You can edit the Asset Name, Description, Image, Access Rights, Categories, Tags and Attributes.
7. Click **Save Draft * Exit**.

The asset is created in **Draft** state.

## Delete an asset

The asset (all versions) must be in **Draft**  or **Archived** state.

1. Navigate to *Asset Catalog*.
2. Select **Catalog > Asset Catalog > All Assets**.
3. From the list view, use the checkboxes to select the asset(s) to delete.
4. Click **Delete Asset**.
5. Type "Delete" and click to confirm that you understand this is a permanent and irreversible action.

{{< alert title="Note" color="primary" >}}Assets that are part of an active product definition cannot be deleted.{{< /alert >}}

## Deprecate an asset

The asset must be in **Active** state.

1. Navigate to *Asset Catalog*.
2. Select **Catalog > Asset Catalog > All Assets**.
3. From the list view, select the Active asset to deprecate.
4. Click **Deprecate**.
5. Confirm that the selected asset is the one you want to deprecate.
6. Click **Update**.

## Archive an asset

The asset must be in **Deprecated** state.

1. Navigate to *Asset Catalog*.
2. Select **Catalog > Asset Catalog > All Assets**.
3. From the list view, select the Deprecated asset to archive.
4. Click **Archive**.
5. Confirm that the selected asset is the one you want to Archive.
6. Click **Update**.
