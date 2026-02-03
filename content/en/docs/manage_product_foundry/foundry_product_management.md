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

There are two different product views, List View and Card View. The List View is the default option when you visit the page.

In List View, the following product information is displayed:

* Product icon - The icon / image representing the product, if any
* Product Name - The display name for the product in the WebUI
* Product Description - A short description of the product
* Marketplace status - PUBLISHED if the product is available in the Marketplace or UNPUBLISHED if the product is not yet available in the Marketplace
* State - Current state of a product - Draft, Active, Deprecated. See [Product lifecycle](/docs/manage_product_foundry/foundry_product_lifecycle/) for additional information.
* Current version - The most recent version number. Can be `---` if the product is not released.
* Asset - The number of asset(s) linked to the product
* Subscriptions - Shows how many subscriptions there are for the product
* Owning Team - The team responsible for the product
* Modified - Date of the last modification
* Action menu - The ellipsis menu to manage the product
    * Publish - Publish the product to the Marketplace
    * Translate - Translate the product documentation
    * Create Plan - Create a plan for the product
    * Archive - Archive the product
    * Delete - Delete the product

In Card View, the following product information is displayed:

* Product icon - The icon / image representing the product, if any
* Product Name - The display name for the product in the WebUI
* Marketplace status - PUBLISHED if the product is available in the Marketplace or UNPUBLISHED if the product is not yet available in the Marketplace
* State - Current state of a product - Draft, Active, Deprecated. See [Product lifecycle](/docs/manage_product_foundry/foundry_product_lifecycle/) for additional information.
* Current version - The most recent version number. Can be `---` if the product is not released.
* Asset Name and Type - The asset(s) linked to the product
* Trash icon - Activated only when the product can be deleted
* Marketplace icon - Enable to publish the product to the Marketplace. Disable to not publish.

Click the view switch icon at the top-right to switch between the Card View and List View.

You can also filter the products by categories, state and owning team using the **Filter By** controls. Search by name, title and tag with the search bar.

Click the **Customize table** icon in the top-right of the table to customize the table layout. A modal opens that allows you to tailor the layout to your needs, including:

* Show columns
* Hide columns
* Reorder columns via drag-and-drop
* Restore to default layout

Layout preferences are automatically saved and persist across browser sessions.

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
* Version panel - Shows all the existing product releases
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
3. Click **+ Add Product** to add a new product.
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
7. Add documentation: select a document template or start from a blank document:

    * From a template: a page displays the available template list that is visible to your team(s). Click **Preview template** to view information about the selected template. After choosing a template, click the corresponding radio button on the template card and then click **Next**. The documentation structure is immediately created based on the template structure and can be updated as needed.
    * From a blank document: you must create the documentation structure manually.
    * If you change methods  part way through creating the document, then a warning is displayed informing you that the documentation elements that have already been created could be lost. If you wish to keep the existing elements, click **Next**. Otherwise, select the new method (either template or a blank document).
    * Edit documentation elements (topics, sections, and articles).
        * Click **+ Add topic** to add a new topic.
        * Click **+ Add section** to add a new section in a topic.
        * Once a section is available, click **+ Add article** to add a Markdown article using the [Markdown editor](/docs/manage_product_foundry/markdown_editor) or link an article from a document library document.
        * Each time you select a topic, section, article from the documentation structure, its content is visible at the right of the screen, where you can use the pencil icon to edit the content.
        * Topic, section, and article can be moved around using the drag icon (double horizontal bar with arrow). A topic can be reordered. A section can be moved inside a topic or to another topic. An article can be moved inside its section or to another section within the same topic or to another topic.
        * Topic, section, and article can be deleted using their corresponding **Delete** ellipsis menu. A confirmation is required for each deletion, as this action is irreversible.
        * Once your documentation is ready, click **Next**.

8. (Optional step) For Access Rights, select the team that owns the product. Select the team(s) the product can be shared with. By default, a product is not shared and only the **Engage Admin** or the owning team will have access to it. To share your product with specific teams, select a team owner and all teams you want to grant "Rights" to for the selected product. For each of the teams selected, you can choose either **Edit** or **Read** access rights. Each member of the shared team(s) selected will be able to access your product with the chosen rights. This allows you to share/enable access to a specific product without granting access to all the products owned by your current team. Click **Next**.
9. (Optional step) Provide one support contact so consumers can get product help, if needed. Click **+ Add new contact** and enter the contact information. Click **Next**.
10. (Optional step) Provide Terms & Conditions for your consumer to approve while subscribing. The list of existing documents from the Document Library that are visible from a Marketplace is displayed. Select the one corresponding to the product Terms & Conditions by clicking the corresponding radio button. If you made a mistake, use the **Reset** button to unselect a document and select another document. Click **Next**.
11. (Optional step) Provide the Tags, Attribute, and Category details for the product.
12. Click **Preview Product** to view the details prior to creation. Click **Save** to create the product in a draft state, or click **Save & Activate** to create a new product version release in an Active state for consumption in the Marketplace.

If the product is created in a **Draft** state, you must move it to an **Active** state (by activating the product) before it can be published to a Marketplace.

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

{{< alert title="Note" color="primary" >}}
The product documentation cannot be edited from here. You must select the ellipsis menu of the specific version to edit its corresponding documentation by using the **Edit Documents** option.
{{< /alert >}}

### Edit a product without a draft or release

Click **Edit** (pencil button) at top right to edit the following without creating a draft or releasing a new product version: Product Name, Description, Image, Release Management settings, documentation, Access Rights, Categories, Tags, Attributes, and Support Contacts. The edits will take effect immediately.

{{< alert title="Note" color="primary" >}}If the product is in a draft state, enabling auto-release will result in release management being in an "on hold" setting. The product draft must be manually "activated" to resume auto-release handling.{{< /alert >}}

### Edit a product with the option to create a draft or make a new release

1. Depending on the state of the product, click either **Edit Draft** or **Create New Version** to edit the assets linked to this product in the Link Asset step, editing documentation (using a documentation template or not), and release a new product version to make it available for consumption in the Marketplace.
2. Select a preview or save option:

    * **Preview Product** - view product changes prior to taking effect.
    * **Save as Draft** - update changes to a product when edits require a new product release (Link Asset edits). This action will either update the latest draft if Auto-release is disabled or create a new release if Auto-release is enabled.
    * **Save & Activate** - update changes in a product version release when edits require a new product release (Link Asset edits) and Auto-release is disabled.

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

{{< alert title="Note" color="primary" >}}
The product archival can also be done from *product details* screen by using the **Archive** icon located in the action bar on the top right.
{{< /alert >}}

## Delete a product

The product must be in **Archive** state, with no release published to a Marketplace and no remaining subscriptions. Once this action is confirmed, it cannot be undone.

{{< alert title="Caution" color="danger" >}}Once a product is deleted, you cannot filter Business Insights metrics (Subscriptions / Applications) with it.{{< /alert >}}

1. Navigate to *Catalog > Product Foundry*.
2. Select **All Products**.
3. From the list view, find the product to delete.
4. Click the **Bin icon**.
5. Confirm that the selected product is the one you want to delete.
6. Click **Update**.

{{< alert title="Note" color="primary" >}}
The product deletion can also be done from the *product details* screen by using the **Bin** icon located in the action bar on the top right. The bin icon is present only if the product is already Archived.
{{< /alert >}}
