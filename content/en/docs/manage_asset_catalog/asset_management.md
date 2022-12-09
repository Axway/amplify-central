---
title: Asset management
linkTitle: Asset management
weight: 20
---

Manage your assets, including: view, create, activate, edit, deprecate and archive, with the Asset Catalog WebUI.

## Before you start

You must have credentials or a user account from your org administrator to use the Asset Catalog WebUI.  Please follow the steps [here](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).

## Objectives

Learn how to use the Asset Catalog WebUI to create and manage assets, including:

* Create an asset
* Link an existing API to the created asset
* Activate the asset to make it available to the Product Foundry
* Organize your assets
* Edit the asset without creating a new release
* Archive and delete an asset

## View assets

To view assets:

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. View the following information for all assets in any state (Draft, Active, Deprecated, Active):

    * Asset Name
    * State
    * Logical Name
    * Tags
    * Type
    * Resources
    * Owning Team
    * Created/Updated

You can also filter the assets by the current category / stage / type using the **Filter By** controls. Search by the Asset Name with the search bar.

## View asset details

To view asset details:

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. From the list view, select an asset.
4. View the following detailed information for a specific asset in any state (Draft, Active, Deprecated, Active):

    * Asset Name - The display name for the asset in the WebUI
    * Asset Type - API Service or other resource types (e.g., PDF and video files)
    * Asset State - Draft, Active, Deprecated, Archived. See [Asset management](/docs/manage_asset_catalog/asset_lifecycle/) for additional information
    * Logical Name - Uniquely identifies the asset
    * Owning Team - The development team that owns the asset
    * Modified On - Date, Time, and Username of who last modified this asset
    * Modified By - The user who last modified the asset
    * Created On - Date, Time, and Username of who created this asset
    * Description - A short description of the asset
    * Resources - API Services or other resource types that are linked to this asset
    * Products - Information on products that are linked to this asset
    * Access Rights - Shared teams that have access to this asset
    * Version State - Draft, Active, Deprecated, Archived. See [Asset management](/docs/manage_asset_catalog/asset_lifecycle/) for additional information
    * Categories - Help classify assets into groups and find the asset by filtering on the Category
    * Tags - Labels to help find assets in the catalog
    * Attributes - Key and value pair to allow customers to attach/query for custom information

{{< alert title="Note" color="primary" >}}Tags, Attributes, and Categories can be added or removed in the asset details view.{{< /alert >}}

## Create an asset

To create an asset:

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. Click **+ Add New Asset**.
4. Add the following Asset Profile information and then click **Next**:

    * Asset Name - The display name for the asset in the WebUI
    * Logical Name - Uniquely identifies the asset
    * Description - A short description of the asset
    * Image - An icon or image to be associated with the asset

5. Add the following Release Management information and then click **Next**:

    * Auto-Release - Enabled/Disabled of the auto release of new Asset versions
    * Auto-Release Type - If auto-release is enabled, a new asset will be automatically released with each change to any one of the grouped resources. The default is set to a Patch release and you can select another type of asset release.

6. In Group Resources, find the available API resources you want to link, and click on the Link icon. For each resource, select the appropriate version. Default is **Latest**. Click **Link Versions**.
7. Configure the Access Request handling, Manual or Automatic, and click **Next**.
8. Add the Access Rights for the asset, and click **Next**.
9. Provide the Category, Tags, and Attribute details for the asset. Click **Next**.
10. At the **Preview Asset** step, you can view the Asset details prior to creation.  
At his point you can click on **Save** to create the asset in a draft state.  Alternatively, you can click on **Save & Activate** to create a new asset version release in an **Active** state for consumption in a product definition.

If the asset is created in **Draft** state. To use this asset in a product definition, you must move the asset to an **Active** state by activating the asset.

## Activate an asset

The asset can be in **Draft** or **Deprecated** state.

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. From the list view, select the asset to activate.
4. Select an asset version in a **Draft** or **Deprecated** state.
5. Click **Activate**.
6. Select a Release Type of either **Major**, **Minor**, or **Patch**.
7. Click **Update**.

## Edit an asset

The asset can be in **Draft**, **Active**, or **Deprecated** state.

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. From the list view, select the asset to edit.
4. Select an asset and click on **Edit Asset**.   version in a **Draft**, **Active** or **Deprecated** state.
5. The Edit Asset wizard is displayed and any edits will be based on the latest draft version or release verion of the asset.
6. You can edit the Asset Name, Description, Image, Release Management settings, Access Requests, Access Rights, Categories, Tags and Attributes without releasing a new asset version.
7. You can edit the API Services linked to this asset in the Group Resources step and release a new asset version so its availble for consumption by a Product.
8. You can click on the **Preview Asset** step to view your changes.  If you have made edits which do not require a new asset release, click on **Save** to update changes to the asset in a new draft.
If you have made edits which require a new asset release on the Group Resources step, you can click on **Save** to update changes to the asset.  The **Save** action will either update the latest draft when Auto-relase is disabled or create a new release when Auto-release is enabled.
Alternatively if you have made edits which require a new asset release on the Group Resources step with Auto-release disabled, you can click on **Save & Activate** to update changes in a asset version release.

## Delete an asset

The asset (all versions) must be in **Draft**  or **Archived** state.

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. From the list view, use the checkboxes to select the asset(s) to delete.
4. Click **Delete Asset**.
5. Type "Delete" and click to confirm that you understand this is a permanent and irreversible action.

{{< alert title="Note" color="primary" >}}Assets that are part of an active product definition cannot be deleted.{{< /alert >}}

## Deprecate an asset

The asset must be in **Active** state.

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. From the list view, select the Active asset to deprecate.
4. Click **Deprecate**.
5. Confirm that the selected asset is the one you want to deprecate.
6. Click **Update**.

## Archive an asset

The asset must be in **Deprecated** state.

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. From the list view, select the Deprecated asset to archive.
4. Click **Archive**.
5. Confirm that the selected asset is the one you want to Archive.
6. Click **Update**.
