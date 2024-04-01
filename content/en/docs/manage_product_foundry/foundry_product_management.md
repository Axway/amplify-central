---
title: Product management
linkTitle: Product management
weight: 20
---

Manage your products, including: create, activate a release, edit, delete, monetize, deprecate, and archive, with the Product Foundry UI.

## Before you start

You must have Catalog Manager team role, assigned by your org administrator, to use the Product Foundry WebUI. For information, see [Managing users](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).

## Objectives

Learn how to use the Product Foundry WebUI to create and manage products, including:

* Create a product
* Link an existing asset to the created product
* Activate the product to make it available to the Product Foundry
* Organize your products and releases
* Edit the product with or without creating a new release
* Archive and delete a product release
* Archive and delete a product

## View products

To view products:

1. Navigate to *Catalog > Product Foundry*.
2. Select **All Products**.

View the following information for all products in any state (Draft, Active, Deprecated, Active):

* Product icon - The icon / image representing the product, if any
* Product Name - The display name for the product in the WebUI
* Marketplace status - PUBLISHED if the product is available in the Marketplace or UNPUBLISHED if the product is not yet available in the Marketplace
* State - Current state of a product - Draft, Active, Deprecated, Active. See [Product lifecycle](/docs/manage_product_foundry/foundry_product_lifecycle/) for additional information
* Current version - The most recent version number. Can be `---` if the product is not released
* Asset Name and Type - The asset(s) linked to the product
* Trash icon - Activated only when the product can be deleted
* Marketplace icon - Enable to publish the product to the Marketplace. Disable to not publish

You can also filter the products by categories, state and owning team using the **Filter By** controls. Search by name, title and tag with the search bar.

## View product details

To view product details:

1. Navigate to *Catalog > Product Foundry*.
2. Select **All Products**.
3. From the list view, select a product.

View the following detailed information for a specific product in any state (Draft, Active, Deprecated, Active):

* Product Name - The display name for the product in the WebUI
* Product state of the selected version
* Product version - The most recent version available. Can be empty if product is not released
* Product icon - The icon / image representing the product, if any
* Logical Name - Uniquely identifies the product
* Owning Team - The team owner of the product
* Release Management - The Product is set for either **Automatic** or **Manual release** of new versions. The setting **Automatic (On hold)** is possible if the product is in a draft state with auto-release set to **Automatic**. The product draft must be manually "activated" to resume auto-release handling.
* Publication button - Publish / Unpublish the product to a specific Marketplace
* Description - A short description of the product
* Version panel - Shows all the existings product releases
    * Version name / Custom version name (if any) / release type as a tooltip
    * Version state - Draft, Active, Deprecated, Archived. See [Product lifecycle](/docs/manage_product_foundry/foundry_product_lifecycle/) for additional information.
    * Version created date
    * Version updated date
    * Ellipsis menu to manage the version (Edit / Activate / Deprecate / Archived) and editing version specific documentation.
    * Additional information for each version:
        * Version description, if any
        * Modified On - Date, Time of the last version modification
        * Modified By - The user who last modified the product version
        * Resources list (i.e., asset link to the product)
        * Documentation - The product documentation
* Visibility - All Marketplaces where the product is published to, and the associated visibility restriction (for everyone / specific teams / specific team with a specific tag / Nobody)
* Plans - Plan list associated to the product
* Support Contact - The contact information the consumer uses to reach the provider
* Subscriptions - All subscriptions attached to the product
* Access Rights - Team(s) the product is shared with that can have a different type of access to this product
* Category - Categories to help classify product into groups and find the asset by filtering on the Category
* Tags - Labels to help find product in the catalog
* Attributes - Key and value pair to allow customers to attach / query for custom information

{{< alert title="Note" color="primary" >}}Tags, Attributes, Categories, and plans can be added or removed in the product details view without impacting the product lifecycle.{{< /alert >}}

## Create a product

1. Navigate to *Catalog > Product Foundry*.
2. Select **All Products**.
3. Click **+ Add New Product** to add a new product.
4. Add the following and then click **Next**:

    * Product Name - The display name for the product in the WebUI
    * Logical Name - Uniquely identifies the product. If no value is entered, then a name will be automatically generated based on the product name
    * Description - A short description of the asset
    * Image - An icon or image to be associated with the product

5. Add the following Release Management information and then click **Next**:

    * Auto-Release - Enable / Disable the auto-release of new Product versions. If auto-release is **enabled**, a new product will be automatically released with each change to any one of the linked resources (i.e., Assets). For example, auto-release enabled will trigger an automatic product release every time a new grouped asset version is discovered or created. This enables a more automated and hands-off experience. If you want more control of the product release process, set auto-release to **disabled**.
    * Auto-Release Type - The default is set to Patch release versions, but you can select another type of product release versioning (i.e., major or minor). The system will automatically compute the next version name based on the semVer pattern.
    * (Optional) Custom release label - Free text (up to 50 characters) that can be displayed on the Marketplace. See [Marketplace Custom Version Display settings](/docs/manage_marketplace/customize_marketplace/marketplace_settings#configure-settings).
    * (Optional) Release description - Free text (up to 350 characters) that describes the release
    * (Optional) Archive previous version - Automatically archives the previous version when releasing a product. Disabled by default.

6. Select the Asset(s) that will be part of this product. Selected assets will be added to the Linked Assets section. You can choose to link the product to the latest release of the asset or select the release you want. Click **Next**.
7. Select a Usage Plan. One free plan will be automatically added to the product. Click **Next**.
8. Add the quota to the plan. By default, one quota is added. You can assign multiple resource to the quota, but each resource can be part of only one quota. To add a quota, click **+ Add Quota** and select the resources and the limit for the quota. Click **Next**.
9. Add documentation elements (sections and articles). By default, an empty document is created.

    * Update the document name and description.
    * Click the folder icon to add a new section at the end of the document.
    * Click the file icon to add an article to the current section (if one is selected); otherwise, it will be added in the last section of the selected document. Note that each section has a name and a description.
    * Use the markdown editor to format and preview your article to validate the final rendering. The text is automatically saved.
    * Repeat these steps for all sections and articles you are adding to the product. Once your documentation is ready, click **Next**.

10. For Access Rights, select the team(s) the product can be shared with. By default, a product is not shared and only the **Central Admin** will have access to it.
If you want your product shared with a specific team, select a team owner, and then select all the teams you want to grant "Rights" to the selected product. For each of the teams selected, you can choose either Edit or Read access "Rights". Each member of the shared team(s) selected will be able to access your product with the chosen "Rights". This allows you to share/enable access to a specific product without granting access to all the products owned by your current team. Click **Next**.
11. (Optional step) Provide one support contact so consumers can get product help, if needed. Click **+ Add new contact** and enter the contact information. Click **Next**.
12. Provide the Tags, Attribute, and Category details for the product.
13. Click **Preview Product** to view the details prior to creation. At his point, you can click **Save** to create the product in a draft state. Alternatively, you can click **Save & Activate** to create a new product version release in an Active state for consumption in the Marketplace.

If the product was created in a **Draft** state, you must move it to an **Active** state (by activating the product) before it can be published in the Marketplace.

## Create a product release

1. Navigate to *Catalog > Product Foundry*.
2. Select **All Products**.
3. Search for the product to edit and open it.
4. Click **Create New Version** on the Versions panel to start the product wizard. See [Create a product](#create-a-product) for details.
5. Save the product version. A Draft version will be created if product release management is manual, or an active release will be created if product release management is automatic.

{{< alert title="Note" color="primary" >}}A Draft version can be edited until it is activated. When releasing the product version, it is optional to enter the product custom version and description.{{< /alert >}}

## Activate a product release

The product release must be in **Draft** state.

1. Navigate to *Catalog > Product Foundry*.
2. Select **All Products**.
3. From the list view, select the product to activate and open it.
4. Select the **Version** tab and search for the Draft version to activate.
5. Click **Activate** from the version ellipsis menu.
6. Select a Release Type of either **Major**, **Minor**, or **Patch**.
7. Enter the custom version information, if needed.
8. Click **Update**.

Once your product is active, you can [publish it to any Marketplace](/docs/manage_marketplace/publish_to_marketplace) your user is [allowed to publish to](/docs/manage_marketplace/customize_marketplace/marketplace_settings#configure-settings).

## Edit a product

The product can be in **Draft**, **Active**, or **Deprecated** state.

1. Navigate to *Catalog > Product Foundry*.
2. Select **All Products**.
3. From the list view, select the product to edit. All edits will be based on the latest draft version or release version of the product.

### Edit a product without a draft or release

* The top right pencil icon handles editing the Product Name, Description, Image, Release Management settings, documentation, Access Rights, Categories, Tags, Attributes, and Support Contacts, without creating a draft or releasing a new product version. This takes effect immediately.
    * If the product is in a draft state, setting auto-release to **Automatic** will result in release management being in an "on hold" setting. The product draft must be manually "activated" to resume auto-release handling.

### Edit a product with the option to create a draft or make a new release

* Depending on the state of the product either **Edit Draft** or **Create New Version** allows editing the assets linked to this product in the Link Asset step, editing documentation, and releasing a new product version to make it available for consumption in the Marketplace.
    * **Preview Product** is available to view your product changes prior to taking effect. If you have made edits that require a new product release in the Group Resources step, click **Save** to update changes to the product in a new draft. The **Save** action will either update the latest draft if Auto-release is disabled or create a new release if Auto-release is enabled.
Alternatively, if you made edits that require a new product release in the Link Asset step with Auto-release disabled, you can click **Save & Activate** to update changes in a product version release.

## Create a plan

You can offer multiple free and paid consumption options for your product. As a provider, you can define one or more subscription plans free of charge, or paid, with optional quota limits.

1. Navigate to *Catalog > Product Foundry*.
2. Select **All Products**.
3. From the list view, select the product to monetize.
4. Click on the **Plans** tab.
5. Click **Add product plan +**.
6. Add the following and then click **Next**:

    * Plan title - Display name of the plan that will be listed in the Marketplace to identify the plan
    * Logical name - A unique name for the plan. If no value is entered, a logical name will be generated
    * Description - Short description of the plan.

7. Select a Plan Type of either **Free** or **Paid** and click **Next**.
8. Configure a Quota group and then click **Next**. Note that you can define a quota per group of resources in the product.

    * Select the Unit. The default is **Transactions**. In the first release stage, only Transactions can be selected. Custom billable units cannot be defined.
    * Limit - Enter a quantity. For example, 1000, 15.
    * Quota type - **Daily**, **Weekly**, **Monthly**, or **Annually**
    * Limit Type:

        * **Strict** - The gateway enforces a hard stop when the quota limit is exceeded
        * **Loose** - The quota can be exceeded

    * Assign Resources - From the asset resources included in the product, select the resources this quota will apply to:

        * Select a resource from **Available** and move it to **Assigned**.

9. Configure the Access Type and then click **Next**:

    * Select the **Request Approval** type:

        * **Manual** - Subscription requests are manually approved by the product owner
        * **Automatic** - Subscription requests are automatically approved by the system

10. Click **Save Draft and Exit** to save the plan in **Draft** status. The plan is now visible in the Product Foundry, but not in the Marketplace.

## Deprecate a product release

The product release must have at least one **Active** version.

1. Navigate to *Catalog > Product Foundry*.
2. Select **All Products**.
3. From the list view, select the product and open it.
4. Select the **Version** tab and search for the version to deprecate.
5. Click **Deprecate** from the version ellipsis menu.
6. Confirm that the selected product release is the one you want to deprecate.
7. Click **Update**.

## Archive a product release

The product release must be in **Deprecated** state.

1. Navigate to *Catalog > Product Foundry*.
2. Select **All Products**.
3. From the list view, select the product and open it.
4. Select the **Version** tab and search for the version to Archive.
5. Click **Archive** from the version ellipsis menu.
6. Confirm that the selected product release is the one you want to Archive.
7. Click **Update**.

## Archive a product

The product can be in any state. Once this action is confirmed, it cannot be undone. However, the product will still be accessible in view mode only in Product Foundry.

{{< alert title="Caution" color="danger" >}}Once a product is archived, the associated subscriptions are terminated. All access to the corresponding API service are deprovisioned and associated credentials are removed. The API consumers will not be able to consume the product.{{< /alert >}}

1. Navigate to *Catalog > Product Foundry*.
2. Select **All Products**.
3. From the list view, find the product to Archive.
4. Click **Archive** from the more options (ellipsis) menu.
5. Confirm that the selected product is the one you want to Archive.
6. Click **Update**.

## Delete a product

The product must be in **Archive** state, with no release published to a Marketplace and no remaining subscriptions. Once this action is confirmed, it cannot be undone.

{{< alert title="Caution" color="danger" >}}Once a product is deleted, you cannot filter Business Insights metrics (Subscriptions / Applications) with it.{{< /alert >}}

1. Navigate to *Catalog > Product Foundry*.
2. Select **All Products**.
3. From the list view, find the product to delete.
4. Click the **Bin icon**.
5. Confirm that the selected product is the one you want to delete.
6. Click **Update**.

{{< alert title="Note" color="primary" >}}Products that are in an **Archive** state but part of an active subscription cannot be deleted.{{< /alert >}}
