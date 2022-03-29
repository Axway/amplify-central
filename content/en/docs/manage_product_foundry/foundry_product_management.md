---
title: Product management from WebUI
linkTitle: Product management from WebUI
weight: 20
---

Use the Product Foundry UI to manage your products, including: create, activate, edit, delete, monetize, deprecate and archive products.

## Before you start

You must have credentials or a user account from your org administrator to use the Product Catalog WebUI. Please follow the steps [here](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).

## Objectives

Learn how to use the Product Catalog WebUI to create and manage products, including:

* Create a product
* Link an existing asset to the created product
* Activate the product to make it available to the Product Foundry
* Organize your products
* Archive and delete a product

## View products

To view product:

1. Navigate to *Product Foundry Catalog*.
2. Select **Catalog > Product Foundry > All Products**.

View the following information for all products in any state (Draft, Active, Deprecated, Active):

* Product icon - the icon/image representing the product if any
* Product Name - The display name for the product in the UI
* Marketplace status - PUBLISHED if the product is available on the marketplace or UNPUBLISHED if the product is not yet available in the marketplace
* State - Current state of a product - Draft, Active, Deprecated, Active. See [Product lifecycle](/docs/manage_product_foundry/foundry_product_lifecycle/) for additional information
* Current version - the most recent version number. Could be `---` if the product has not been released yet.
* Asset Name - the asset(s) linked to the product
* trash icon - only activated when the product can be deleted
* Marketplace icon - enable to publish the product to the marketplace (icon enabled) or not (icon disabled)

You can also filter the products by the name and title using the **Filter By** controls.

## View product details

To view product details:

1. Navigate to *Product Foundry*.
2. Select **Catalog > Product Foundry > All Products**.
3. From the list view, select a product.

View the following detailed information for a specific product in any state (Draft, Active, Deprecated, Active):

* Product Name - The display name for the product in the WebUI
* Product state of the selected version
* Product version - the most recent version available. Could be empty if product has not been released yet.
* Product icon - the icon/image representing the product if any
* Logical Name - Uniquely identifies the product
* Owner - the team owner of the product
* Modified On - Date, Time, and Username of who last modified this product
* Modified By - The user who last modified the product
* Created On - Date, Time, and Username of who created this product
* Created By - The user who last modified the product
* Description - A short description of the product
* Resources - asset list that are linked to the product
* Plans - plan list associated to the product
* Documentation - documentation associated with the product
* Version State - Draft, Active, Deprecated, Archived. See [Product lifecycle](/docs/manage_product_foundry/foundry_product_lifecycle/) for additional information
* Category - Categories to help classify product into groups and find the asset by filtering on the Category
* Tags - Labels to help find product in the catalog
* Attributes - Key and value pair to allow customers to attach/query for custom information

{{< alert title="Note" color="primary" >}}Tags, Attributes, and Categories can be added or removed in the product details view.{{< /alert >}}

## Create a product

1. Navigate to the *Product Foundry*.
2. Select **Products > All Products**.
3. Click **+ Add New Product** to add a new product.
4. Add the following and then click **Next**:

    * Product Name - The display name for the product in the UI
    * Logical Name - Uniquely identifies the product. Leave it empty and a name will generated based on the product name.
    * Description - A short description of the asset
    * Image - An icon or image to be associated with the product

5. Select the Asset(s) that will be part of this product. Any selected asset will be added to the Linked Assets section. Click **Next**.
6. Select a Usage Plan. One free plan will be automatically added to the product. Click **Next**.
7. Add documentation elements. Add the document title and content and then click save. Repeat that procedure for all the documents you want to add to the product. Once the documents are all added, click **Next**.
8. Provide the Tags, Attribute and Category details for the product.
9. Click **Save**.

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
6. The Edit Product wizard is displayed. You can edit the Product Name, Description, Image, the Asset link, the documentation, Categories, Tags and Attributes.
7. Click **Save Draft * Exit**.

The asset is created in **Draft** state.

## Delete a product

The product must be in **Draft** state.

1. Navigate to *Product Foundry*.
2. Select **Products > All Products**.
3. From the list view, select the product to delete.
4. Click **Delete Product**.
5. Confirm that the selected product is the one you want to delete.
6. Click **Update**.

{{< alert title="Note" color="primary" >}}Products that are part of an active subscription and are not in an **Archive** state cannot be deleted.{{< /alert >}}

## Deprecate a product

The product must be in **Active** state.

1. Navigate to *Product Foundry*.
2. Select **Products > All Products**.
3. From the list view, select the product to deprecate.
4. Click **Deprecate Product**.
5. Confirm that the selected product is the one you want to deprecate.
6. Click **Update**.

## Archive a product

The product must be in **Deprecated** state.

1. Navigate to *Product Foundry*.
2. Select **Products > All Products**.
3. From the list view, select the asset to Archive.
4. Click **Archive Product**.
5. Confirm that the selected product is the one you want to Archive.
6. Click **Update**.