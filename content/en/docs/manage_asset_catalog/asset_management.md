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

Using the **Filter By** controls to filter assets by the current category / stage / type.
Search by the Asset Name with the search bar.

Click the **Customize table** icon in the top-right corner of the table to customize the table layout. A modal opens that allows you to tailor the layout to your needs, including:

* Show columns
* Hide columns
* Reorder columns via drag-and-drop
* Restore to default layout

Layout preferences are automatically saved and persist across browser sessions.

## View asset details

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
    * Release Management - The *Asset details* page displays a badge below the title indicating that the asset is set for **Automatic** or **Manual** release of new versions. The setting **Automatic (On hold)** only applies when the asset is in a draft state with auto-release set to **Automatic**. The asset draft must be manually "activated" to resume auto-release handling.

{{< alert title="Note" color="primary" >}}Tags, Attributes, and Categories can be added or removed in the asset details view.{{< /alert >}}

## Create an asset

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. Click **+ Add Asset**.
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
8. For Access Rights, select the team that owns the product. Select the team(s) the asset can be shared with. By default, an asset is not shared and only the **Engage Admin** or the owning team will have access to it. If you want your asset shared with a specific team, select a team owner, and then select all the teams you want to grant "Rights" to the selected asset. For each of the teams selected, you can choose either Edit or Read access "Rights". Each member of the shared team(s) selected will be able to access your asset with the chosen "Rights". This allows you to share/enable access to a specific asset without granting access to all the assets owned by your current team. Click **Next**.
9. Provide the Category, Tags, and Attribute details for the asset. Click **Next**.
10. Click **Preview Asset** to view the details prior to creation. At his point, you can click **Save** to create the asset in a draft state. Alternatively, you can click **Save & Activate** to create a new asset version release in an **Active** state for consumption in a product definition.

If the asset was created in a **Draft** state, you must move it to an **Active** state (by activating the asset) before you can use it in a product definition.

The **+ Add Asset** button is disabled once the total number of active and deprecated assets exceeds the asset entitlement quota. If no asset entitlement is defined, there is no asset quota enforcement.

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

Click **Edit** (pencil button) at top right to edit the following without creating a draft or releasing a new asset version: Asset Name, Description, Image, Release Management settings, Access Requests, Access Rights, Categories, Tags and Attributes. The edits will take effect immediately for the asset and any Marketplace products associated with this asset.
  
{{< alert title="Note" color="primary" >}}If the asset is in a draft state, enabling auto-release will result in release management being in an "on hold" setting. The asset draft must be manually "activated" to resume auto-release handling.{{< /alert >}}

### Edit an asset with the option to create a draft or release a new version

1. Depending on the state of the asset, click either **Edit Draft** or **Create New Version** to edit the API services linked to this asset in the Group Resources step and release a new asset version to make it available for consumption by a product.
2. Select a preview or save option:

    * **Preview Asset** - view your asset changes prior to taking effect.
    * **Save as Draft** - update changes to an asset when edits require a new asset release (Group Resources edits). This action will either update the latest draft if Auto-release is disabled or create a new release if Auto-release is enabled.
    * **Save & Activate** - update changes in an asset version release when edits require a new asset release (Group Resources edits) and Auto-release is disablesdisabled.

{{< alert title="Note" color="primary" >}}If the organization has the Compliance Validation entitlement, then the Security and Design compliance validation grading scores are displayed in the Available Resources table. See [Manage your compliance validation](/docs/manage_compliance/#default-grading-scores) for grading scores information.{{< /alert >}}

## Delete an asset

There are two ways to delete an asset, depending on your role.

* **Engage Admins** can delete assets that are in active state, which skips the need to manually deprecate and archive the assest. The system provides a guided workflow that automatically cleans up all related dependencies so you don’t need to manually track or remove them.
* **Catalog Managers** must manually deprecate, archive, and delete the asset.

### Delete an asset (for Engage Admins)

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. From the list view, click the ellipsis menu of the asset to be deleted.
4. Click **Delete**.
5. Confirm your intent.
6. Review the [Dependency Summary](#what-happens-during-automatic-asset-cleanup):

    * **Plans using this asset** - Lists plans with resources from this asset.
    * **Active subscriptions** - Lists subscriptions that are still active and tied to those plans.
    * **Linked products** - Lists products (draft or released) that include this asset.
    * *If no dependencies exist, this step is skipped*.

7. Choose an action for linked products:

    * **Release a new product version** - Creates a new version of the product without the asset.
    * **Create a draft product** -  Moves the product to draft without the asset so you can edit it before releasing.

8. Review the summary of planned actions.
9. Type *DELETE* in the confirmation box and click **Delete Asset**.

    * A modal will show deletion progress.
    * Once complete, you will return to the asset list with a confirmation message.

{{< alert title="Note" color="primary" >}}Cancelling subscriptions may take longer than expected in some cases. Please leave the tab open.{{< /alert >}}

#### What happens during automatic Asset cleanup

When you delete an asset, Amplify Engage scans for all dependencies and provides a summary before you confirm the action.

* **Plans**

    * Plans using the asset’s resources are checked.
    * If removing the asset leaves the plan with no resources:
        * Quotas that become empty are automatically removed.
        * The plan is automatically archived.
        * All subscriptions to that plan are cancelled as well.
    * If the plan still contains other assets:
        * The plan remains active, minus the deleted asset.

* **Products**

    * You can choose how the product should be updated:
        * **Release a new product version** – The system creates a new version of the product without the asset.
        * **Create a draft product** – The system moves the product to draft without the asset so you can edit it before releasing.

* **Subscriptions**

    * Subscriptions linked to archived plans are cancelled automatically.
    * Subscriptions linked to active plans remain intact.

### Delete an asset (for Catalog Managers)

1. Manually deprecate and archive the asset and each release.
2. Once archived, delete the asset directly from the Asset Catalog.

{{< alert title="Note" color="primary" >}}Assets that are part of an active product definition cannot be deleted.{{< /alert >}}

## Deprecate an asset

The asset must be in **Active** state. Each version of the asset must be deprecated individually. Once all versions are deprecated, the entire asset is marked as deprecated.

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. From the list view, select the active asset to deprecate.
4. Select the version you want to deprecate and click **Deprecate**.
5. Repeat for each active version.
6. When no active versions remain, the asset automatically moves to **Deprecated** state.

## Archive an asset

The asset must be in **Deprecated** state.

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. From the list view, select the Deprecated asset to archive.
4. Click **Archive**.
5. Type *ARCHIVE* in the confirmation box.
6. Confirm action.
