---
title: Subscription management
linkTitle: Subscription management
weight: 10
---

Create new subscriptions and manage existing subscriptions from the Marketplace.

## What is a subscription

Subscriptions are free or paid consumption options to access certain APIs from resources in products to help provide business case solutions. Consumers browse products, but must subscribe, request access, and be approved before products can be consumed with an application.

## Before you start

Browse the product offerings in the Marketplace.

## Objectives

As a consumer, learn how to create a free or paid subscription and manage existing subscriptions in the Marketplace.

## Create a new subscription

Anyone who is authenticated in the Marketplace can subscribe to a product with the following role restrictions:

| Persona               | Subscribe to a paid plan | subscribe to a free plan |
|-----------------------|--------------------------|--------------------------|
| Subscription Manager  | Authorized               | Authorized               |
| Central Administrator | Authorized               | Authorized               |
| Developer/Consumer    | Forbidden                | Authorized               |

Each subscription is owned by a team and shared with each member of the team. If you are part of multiple teams, you will be asked to select the team owner. If your team has the attribute **x-private**, the subscription will be owned by your user and not shared inside your team.

Only one subscription per team/product/plan type combination is allowed.

1. Navigate to the *Marketplace*.
2. Select the product you would like to subscribe to.
3. Click **Subscribe**. *The Subscription Request form is displayed*.
4. Complete the form. Note that the Subscription Name is automatically populated.

    * Select the Usage Plan
    * Select the Owner
    * Click **Save**

5. Track the status of your subscription from the *Subscription overview* page. For additional information on states, see [Subscription approval states](#subscription-approval-states).
6. Once the subscription request is approved, navigate to the subscription and request access to the underlying resources:

    * Click **Request access from the subscription**. A wizard is displayed.
    * Either pick an existing application or create a new application. For information, see [Create a new application](/docs/manage_marketplace/consumer_experience/application_management#create-a-new-application) for more details.

### Subscription approval states

Once submitted, a subscription request goes through an approval process:

| State         | Characteristics                                                             |
|---------------|-----------------------------------------------------------------------------|
| **Pending**   | The subscription request has been submitted and sent to the provider for approval |
| **Approved**  | The subscription has been approved and products can now be consumed with an application |
| **Declined**  | The subscription request has been declined by the provider for several reasons (compliance, payment issues, etc.). Applications cannot use the product |
| **Error**     | There is an error in processing the subscription request. Typically, a system error |

### Subscription status

Once the subscription is approved, the state of the subscription indicates whether it is usable or not. The state is not set until the subscription is approved.

| State                   | Characteristics                                                                                             |
|-------------------------|-------------------------------------------------------------------------------------------------------------|
| **Active**              | The subscription is ready to be used to get access to product resources                                      |
| **Migration scheduled** | The subscription is planned to be migrated to another plan                                                  |
| **Migrating**           | The subscription migration to a new plan is in progress                                                     |
| **Migrated**            | The subscription has been migrated to a new plan. It can no longer be used to get access to product resources |
| **Archival scheduled**  | The subscription has an ending date. Once reached, the subscription will be automatically archived       |
| **Archived**            | The subscription has been terminated. It can no longer be used to get access to product resources          |

## Manage existing subscriptions

Use the *Account settings* page to manage existing subscriptions:

1. Navigate to the *Marketplace*.
2. Select **Subscriptions**. *A list of Marketplace subscriptions is displayed*

View the following information for all subscriptions assigned to the product:

* Subscription name - the name of the subscription
* Owning Team - the team that owns and can use the subscription to get access to the product resources
* Plan - the plan name used by the subscription
* Approval State - the approval given by the provider of the product - Refer to [Subscription approval states](#subscription-approval-states)
* State - the status of the subscription - Refer to [Subscription status](#subscription-status)
* Expires - if the plan has a specific number of billing terms, indicates when the subscription is planned to expire
* Applications - the number of applications that can use the subscription
* Invoices - if the billing feature is activated, indicates the number of invoices associated with the subscription

Click on the subscription name to display the subscription details information.

The *subscription details* page provides:

* Links to the product, the plan, and the application(s) associated with the subscription. Each application link redirects you to the *application details* page.
* Subscription usage breakdown per subscription plan quota. This breakdown allows to see how much has been consumed for the current billing period.
* Subscription history (requested time / last approval / rejection time).

### Terminate a subscription

When a subscription is no longer needed, it should be terminated to prevent access to the resources that are using that subscription.

1. Navigate to the *Marketplace*.
2. Select **Subscriptions**. *A list of Marketplace products that have subscriptions owned by your team(s) is displayed*.
3. Search for a specific product and open it. *The subscription list is displayed*.
4. Find the subscription to terminate and click **Unsubscribe** from the ellipsis menu to trigger the subscription termination.
5. The state of the subscription is updated to **Cancelled**. The subscription can no longer be used from the Application Registrations screen.

A cancelled subscription remains in the system and is visible in the Consumer Insights screens. Only the provider can completely remove the subscription from the system. Once removed, the subscription will no long be visible in the Consumer Insights screens.
