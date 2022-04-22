---
title: Manage product plans
linkTitle: Manage product plans
weight: 35
---

Product plans are used to monetize the product and define the usage terms.

## Objectives

Learn how to create and configure the product plan using the Product Foundry WebUI.

## Concepts

**Plan** - contains the details about how to charge consumers, how often and how much.

**Quotas** - describes the itemized units per resource or group of resources in product, and how much of those units they are entitled to use over a period.

**Units** - defines the billable units. For example: Transactions, Seats, Messages. Used with the quotas to describe the pricing and how many units a consumer is entitled to use.

## Product plan states

| State      | Description                                                                                                   |
|------------|---------------------------------------------------------------------------------------------------------------|
| Draft      | Indicates that the plan is not listed in the Marketplace. Changes can be made to the plan.                |
| Active     | Indicates that the plan is listed in the Marketplace. Allows new subscriptions.                               |
| Deprecated | Indicates that the plan is listed in the marketplace, but new subscriptions are not allowed. Plan is not visible on the plan page.                                                                                                            |
| Archived   | All associated subscriptions to this plan will be expired and the plan will be removed from the Marketplace.  |

## Create a free product plan

When you create a new product, you have the option to configure a **Free** product plan. If you skip this step, a default free plan will be auto generated, which you can edit / modify later.

To configure a free product plan:

1. Start by [creating a new product](/docs/manage_product_foundry/foundry_product_management/#create-a-product). *The Create product wizard is displayed*.
2. Enter the following properties in **Usage plan**:

    * **Plan title** - the display name of the plan that will be listed in the Marketplace to identify the plan.
    * **Logical name** - a logical name to uniquely identity the plan in the system. If no value is entered, one will be auto generate for you.
    * **Description** - describe the product plan in few words so the consumer will know what the offering is.

3. Select the **Free** plan type and proceed to the **Next** step to configure the plan quota.

## Configure a quota

A quota describes the itemized units per resource or group of resources in a product, and how much of those units they are entitled to use over a period.

To configure a quota, enter values for the following properties:

* **Unit** - the default is **Transactions**. This non-configurable field defines a quota for Transaction units only.
* **Limit** - a quantity. For example, 1000, 15.
* **Quota type** - select either **Daily**, **Weekly**, **Monthly**, or **Annually**.
* **Limit Type**:  
    * **Strict** - the gateway enforces a hard stop when the quota limit is exceeded
    * **Loose** - the quota can be exceeded
* **Assign Resources** - the list of resources the provider will charge for by a measured unit. Only the resources included in the plan can be selected.

{{< alert title="Note" color="primary" >}}When Limit Type is set to Strict, make sure the quota is enforced on the underlying gateway.{{< /alert >}}

When you are finished creating the product, click **Save Draft and Exit** to save the product and create the Free plan in **DRAFT** state.

## View product plans

1. Navigate to the *Product Foundry* and select a product.
2. Click on the **Plans** tab. All plans configured for this product are displayed.
3. Click on the plan title. The configuration of the plan is displayed in the side panel.

## Publish a product plan in the Marketplace

1. Navigate to the *Product Foundry* and select a product.
2. Click on the **Plans** tab. All plans configured for this product are displayed.
3. Click on the plan title. The configuration of the plan is displayed in the side panel.
4. Click **Activate** to publish.

{{< alert title="Note" color="primary" >}}A plan can only be listed in the Marketplace when the product the plan is associated to is ACTIVE and PUBLISHED in the Marketplace.{{< /alert >}}