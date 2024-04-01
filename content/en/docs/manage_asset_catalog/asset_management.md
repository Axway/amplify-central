---
title: Asset management
linkTitle: Asset management
weight: 20
---

Manage your assets, including: view, create, activate, edit, delete, deprecate and archive, with the Asset Catalog WebUI.

## Before you start

You must have credentials or a user account from your org administrator to use the Asset Catalog WebUI. For information, see [Managing users](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).

## Objectives

Learn how to use the Asset Catalog WebUI to create and manage assets, including:

* Create an asset
* Link an existing API to the created asset
* Activate the asset to make it available to the Product Foundry
* Organize your assets
* Edit the asset with or without creating a new release
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
    * Asset Type - API service or other resource types (e.g., PDF and video files)
    * Asset State - Draft, Active, Deprecated, Archived. See [Asset management](/docs/manage_asset_catalog/asset_lifecycle/) for additional information
    * Logical Name - Uniquely identifies the asset
    * Owning Team - The development team that owns the asset
    * Modified On - Date, Time, and Username of who last modified this asset
    * Modified By - The user who last modified the asset
    * Created On - Date, Time, and Username of who created this asset
    * Description - A short description of the asset
    * Resources - Displays asset resources which are created from API service endpoints. Will also display any associated stages or states.
    * Products - Information on products that are linked to this asset
    * Access Rights - Shared teams can have different types of access to this asset
    * Version State - Draft, Active, Deprecated, Archived. See [Asset management](/docs/manage_asset_catalog/asset_lifecycle/) for additional information
    * Categories - Help classify assets into groups and find the asset by filtering on the Category
    * Tags - Labels to help find assets in the catalog
    * Attributes - Key and value pair to allow customers to attach/query for custom information
    * Release Management - The Asset details page has a badge below the title indicating the asset is set for **Automatic** or **Manual** release of new versions. The setting **Automatic (On hold)** is possible if the asset is in a draft state with auto-release set to **Automatic**. The asset draft must be manually "activated" to resume auto-release handling.

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

    * Auto-Release - Enable / disable the auto-release of new Asset versions. If auto-release is **enabled**, a new asset will be automatically released with each change to any one of the grouped resources (i.e., API services). For example, auto-release enabled will trigger an automatic asset release every time a new grouped API service revision is discovered or created. This enables a more automated and hands-off experience. If you want more control of the asset release process, set auto-release to **disabled**.
    * Auto-Release Type - The default is set to Patch release versions and you can select another type of asset release versioning (i.e., major or minor).

6. In Group Resources, find the available API resources you want to link, and click on the Link icon. For each resource, select the endpoints to link. Endpoints can be filtered by state and any associated stages. Each endpoint lists the API service version, url(s), stage, and state.

    * If the organization has the Compliance Validation entitlement, then the Security and Design compliance validation grading scores are displayed in the Available Resources table. See [Manage your compliance validation](/docs/manage_compliance/#default-grading-scores) for grading scores information.

7. Configure the Access Request handling for Manual or Automatic, and click **Next**. If Access Request Handling is set to **Manual**, a user must approve access to the API service(s) grouped in the asset. If Access Request Handling is set to **Automatic**, the access to the API service(s) grouped in the asset is granted automatically.
8. For Access Rights, select the team(s) the asset can be shared with. By default, an asset is not shared and only the **Central Admin** will have access to it. If you want your asset shared with a specific team, select a team owner, and then select all the teams you want to grant "Rights" to the selected asset. For each of the teams selected, you can choose either Edit or Read access "Rights". Each member of the shared team(s) selected will be able to access your asset with the chosen "Rights". This allows you to share/enable access to a specific asset without granting access to all the assets owned by your current team. Click **Next**.
9. Provide the Category, Tags, and Attribute details for the asset. Click **Next**.
10. Click **Preview Asset** to view the details prior to creation. At his point, you can click **Save** to create the asset in a draft state. Alternatively, you can click **Save & Activate** to create a new asset version release in an **Active** state for consumption in a product definition.

If the asset was created in a **Draft** state, you must move it to an **Active** state (by activating the asset) before you can use it in a product definition.

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
3. From the list view, click on the asset to edit. All edits will be based on the latest draft version or release version of the asset.

### Edit an asset without a draft or release

* The top right pencil icon handles editing the Asset Name, Description, Image, Release Management settings, Access Requests, Access Rights, Categories, Tags and Attributes, without creating a draft or releasing a new asset version. This will take effect immediately for the asset and any Marketplace products associated with this asset.
    * If the asset is in a draft state, setting auto-release to **Automatic** will result in release management being in an "on hold" setting. The asset draft must be manually "activated" to resume auto-release handling.

### Edit an asset with the option to create a draft or release a new version

* Depending on the state of the asset either **Edit Draft** or **Create New Version** allows editing the API services linked to this asset in the Group Resources step and releasing a new asset version to make it available for consumption by a product.
    * **Preview Asset** is available to view your asset changes prior to taking effect. If you have made edits that require a new asset release in the Group Resources step, click **Save** to update changes to the asset. The **Save** action will either update the latest draft if Auto-release is disabled or create a new release if Auto-release is enabled. Alternatively, if you made edits that require a new asset release in the Group Resources step with Auto-release disabled, you can click **Save & Activate** to update changes in an asset version release.
    * If the organization has the Compliance Validation entitlement, then the Security and Design compliance validation grading scores are displayed in the Available Resources table. See [Manage your compliance validation](/docs/manage_compliance/#default-grading-scores) for grading scores information.

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
