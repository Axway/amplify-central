---
title: Product management
linkTitle: Product management
weight: 20
---

Use the Product Foundry UI to manage your products, including create, activate a release, edit, delete, monetize, deprecate, and archive products.

## Before you start

You must have credentials or a user account from your org administrator to use the Product Catalog WebUI. Please follow the steps [here](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).

## Objectives

Learn how to use the Product Catalog WebUI to create and manage products, including:

* Create a product
* Link an existing asset to the created product
* Activate the product to make it available to the Product Foundry
* Organize your products and releases
* Archive and delete a product release
* Archive and delete a product

## View products

To view products:

1. Navigate to *Product Foundry Catalog*.
2. Select **Catalog > Product Foundry > All Products**.

View the following information for all products in any state (Draft, Active, Deprecated, Active):

* Product icon - The icon / image representing the product, if any
* Product Name - The display name for the product in the WebUI
* Marketplace status - PUBLISHED if the product is available in the Marketplace or UNPUBLISHED if the product is not yet available in the Marketplace
* State - Current state of a product - Draft, Active, Deprecated, Active. See [Product lifecycle](/docs/manage_product_foundry/foundry_product_lifecycle/) for additional information
* Current version - The most recent version number. Can be `---` if the product is not released
* Asset Name - The asset(s) linked to the product
* Trash icon - Activated only when the product can be deleted
* Marketplace icon - Enable to publish the product to the Marketplace. Disable to not publish

You can also filter the products by the name and title using the **Filter By** controls.

## View product details

To view product details:

1. Navigate to *Product Foundry*.
2. Select **Catalog > Product Foundry > All Products**.
3. From the list view, select a product.

View the following detailed information for a specific product in any state (Draft, Active, Deprecated, Active):

* Product Name - The display name for the product in the WebUI
* Product state of the selected version
* Product version - The most recent version available. Coan be empty if product is not released
* Product icon - The icon / image representing the product, if any
* Logical Name - Uniquely identifies the product
* Owner - The team owner of the product
* Modified On - Date, Time, and Username of who last modified this product
* Modified By - The user who last modified the product
* Created On - Date, Time, and Username of who created this product
* Created By - The user who last modified the product
* Description - A short description of the product
* Resources - List of assets linked to the product
* Plans - Plan list associated to the product
* Documentation - Documentation associated with the product
* Version State - Draft, Active, Deprecated, Archived. See [Product lifecycle](/docs/manage_product_foundry/foundry_product_lifecycle/) for additional information
* Category - Categories to help classify product into groups and find the asset by filtering on the Category
* Tags - Labels to help find product in the catalog
* Attributes - Key and value pair to allow customers to attach / query for custom information

{{< alert title="Note" color="primary" >}}Tags, Attributes, Categories, and plans can be added or removed in the product details view without impacting the product lifecycle.{{< /alert >}}

## Create a product

1. Navigate to the *Product Foundry*.
2. Select **Products > All Products**.
3. Click **+ Add New Product** to add a new product.
4. Add the following and then click **Next**:

    * Product Name - The display name for the product in the WebUI
    * Logical Name - Uniquely identifies the product. If no value is entered, then a name will be automatically generated based on the product name
    * Description - A short description of the asset
    * Image - An icon or image to be associated with the product

5. Select the Asset(s) that will be part of this product. Selected assets will be added to the Linked Assets section. You can choose to link the product to the latest release of the asset or select the release you want. Click **Next**.
6. Select a Usage Plan. One free plan will be automatically added to the product. Click **Next**.
7. Add the quota to the plan. By default, one quota is added. You can assign multiple resource to the quota, but each resource can be part of only one quota. To add a quota, click **+ Add Quota** and select the resources and the limit for the quota. Click **Next**.
8. Add documentation elements (sections and articles). By default, an empty document is created.

    * Update the document name and description.
    * Click the folder icon to add a new section at the end of the document.
    * Click the file icon to add an article to the current section (if one is selected); otherwise, it will be added in the last section of the selected document. Note that each section has a name and a description.
    * Use the markdown editor to format and preview your article to validate the final rendering. The text is automatically saved.
    * Repeat these steps for all sections and articles you are adding to the product. Once your documentation is ready, click **Next**.

9. Select the team(s) the product can be shared with. By default, a product is not shared and only the Central Admin will have access to it. If you shared your product with a specific team, each member of the team will be able to see your product. Click **Next**.
10. Provide the Tags, Attribute, and Category details for the product.
11. Click **Save**.

The product is created in **Draft** state. To publish this product in the Marketplace, you must move the product to an **Active** state by activating the product.

## Activate a product

The product must be in **Draft** state.

1. Navigate to *Product Foundry*.
2. Select **Products > All Products**.
3. From the list view, select the product to activate.
4. Click **Activate**.
5. Select a Release Type of either **Major**, **Minor**, or **Patch**.
6. Click **Update**.

## Edit a product

The product can be in **Draft**, **Active**, or **Deprecated** state.

1. Navigate to Product Foundry.
2. Select **Catalog > Product Foundry > All Products**.
3. From the list view, select the product to edit.
4. Select a product version in a **Draft**, **Active** or **Deprecated** state.
5. Click **Edit Draft** or **Create Draft**.
6. The Edit Product wizard is displayed. You can edit the Product Name, Description, Image, Asset link, documentation, Categories, Tags, and Attributes.
7. Click **Save Draft * Exit**.

A new product release is created in **Draft** state.

## Create a plan

{{< alert title="Note" color="primary" >}}Functionality coming soon.{{< /alert >}}

The product can be in any state.

You can offer multiple free and paid consumption options for your product. As a provider, you can define one or more subscription plans free of charge, or paid, with optional quota limits.

1. Navigate to *Product Foundry*.
2. Select **Products > All Products**.
3. From the list view, select the product to monetize.
4. Click on the **Plans** tab.
5. Click **Add product plan +**.
6. Add the following and then click **Next**:

    * Plan title - Display name of the plan that will be listed in the Marketplace to identify the plan
    * Logical name - A unique name for the plan. If no value is entered, a logical name will be generated
    * Description - Short description of the plan.

7. Select a Plan Type of either **Free** or **Paid** and click **Next**.
8. Configure a Quota group and then click **Next**. Note that you can define a quota per group of resources in the product.

    * Select the Unit. The default is **Transactions**. In the first release stage, only Transactions can be selected. Custom billable units cannot be defined
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

The product must have at least one **Active** version.

1. Navigate to *Product Foundry*.
2. Select **Products > All Products**. And open the product details.
3. Click **Deprecate Product**.
4. Confirm that the selected product is the one you want to deprecate.
5. Click **Update**.

## Archive a product release

The product must be in **Deprecated** state.

1. Navigate to *Product Foundry*.
2. Select **Products > All Products**.
3. From the list view, select the asset to Archive.
4. Click **Archive Product**.
5. Confirm that the selected product is the one you want to Archive.
6. Click **Update**.

## Archive a product

The product can be in any state.

1. Navigate to *Product Foundry*.
2. Select **Products > All Products**.
3. From the list view, find the product to Archive.
4. Click **Archive** from the more options (ellipsis) menu.
5. Confirm that the selected product is the one you want to Archive.
6. Click **Update**.

## Delete a product

The product must be in **Archive** state and no release published to a marketplace

1. Navigate to *Product Foundry*.
2. Select **Products > All Products**.
3. From the list view, select the product to delete.
4. Click the **Bin icon**.
5. Confirm that the selected product is the one you want to delete.
6. Click **Update**.

{{< alert title="Note" color="primary" >}}Products that are part of an active subscription and are not in an **Archive** state cannot be deleted.{{< /alert >}}
