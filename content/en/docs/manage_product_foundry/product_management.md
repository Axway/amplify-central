---
title: Product management
linkTitle: Product management
weight: 20
---

Use the Product Foundry UI to manage your products, including: create, activate, edit, delete, monetize, deprecate and archive products.

## Create a product

To view assets:

1. Navigate to the *Product Foundry*.
2. Select **Products > All Products**.
3. Click **+ Add New Product** to add a new product.
4. Add the following and then click **Next**:

    * Product Name - Add text
    * Description - Add text
    * Image - Description

5. Select the Assets that will be part of this product. Click **Next**.
6. Select a Usage Plan. Click **Next**.
7. Add documentation elements. Click **Next**.
8. Provide the Tags, Attribute and Category details for the product.
7. Click **Save**.

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

The product must be in **Draft** state.

Add instructions

## Delete a product

The product must be in **Draft** state.

1. Navigate to *Product Foundry*.
2. Select **Products > All Products**.
3. From the list view, select the product to delete.
4. Click **Delete Product**.
5. Confirm that the selected product is the one you want to delete.
6. Click **Update**.

{{< alert title="Note" color="primary" >}}Products that are part of an active subscription and are not in an **Archive** state cannot be deleted.{{< /alert >}}

## Create a plan

The product must be in **Active** state.

You can offer multiple free and paid consumption options for your product. As a provider, you can define one or more subscription plans free of charge or paid, with optional quota limits.

1. Navigate to *Product Foundry*.
2. Select **Products > All Products**.
3. From the list view, select the product to monetize.
4. Click on the **Plans** tab.
5. Click **Add product plan +**.
6. Add the following and then click **Next**:

    * Plan Name - Display name of the plan.
    * Logical Name - A unique name for the plan. If no value is entered, a logical name will be generated.
    * Description - Short description of the plan.

7. Select a Plan Type of either **Free** or **Paid** and click **Next**.
8. Configure a Quota group and then click **Next**. Note that you can define a quota per group of resources in the product.

    * Select the Unit. The default is **Transactions**. In the first release stage, only Transactions can be selected custom billable units cannot be defined.
    * Limit - Enter a quantity. For example, 1000, 15.
    * Quota type - **Daily**, **Weekly**, **Monthly** or **Annually**.
    * Limit Type:

        * **Strict** - The gateway enforces a hard stop when the quota limit is exceeded.
        * **Loose** - The quota can be exceeded.

    * Assign Resources - From the asset resources included in the product, select the resources this quota will apply to:

        * Select a resource from **Available** and move it to **Assigned**.

9. Configure the Access Type and then click **Next**:

    * Select the **Request Approval** type:

        * **Manual** - Subscription request are manually approved by the product owner.
        * **Automatic** - Subscription requests are automatically approved by the system. 

6. Click **Save Draft and Exit** to save the plan in **Draft** status. The plan is now visible in the Product Foundry, but not in the Marketplace.

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