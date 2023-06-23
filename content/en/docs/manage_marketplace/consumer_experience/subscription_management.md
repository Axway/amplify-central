---
title: Subscription management
linkTitle: Subscription management
weight: 10
---

Create new subscriptions and manage existing subscriptions from the Marketplace.

## What is a subscription

Subscriptions are free or paid consumption options to access certain API from resources in products to help provide business case solutions. Consumers browse products, but must subscribe, request access, and be approved before products can be consumed with an application.

## Before you start

Browse the product offerings in the Marketplace.

## Objectives

As a consumer, learn how to create a free or paid subscription and manage existing subscriptions in the Marketplace.

## Create a new subscription

Anyone who is authenticated in the Marketplace can subscribe to a product with the following role restrictions:

| Persona               | Subscribe to a paid plan | subscribe to a free plan |
|-----------------------|--------------------------|--------------------------|
| Subscription manager  | Authorized               | Authorized               |
| Central administrator | Authorized               | Authorized               |
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
| **Declined**  | The subscription request has been declined by the provider for several reasons (compliance, payment issues, etc.). Applications cannot use the product. |
| **Error**     | There is an error in processing the subscription request. Typically, a system error. |

## Manage existing subscriptions

Use the *Account settings* page to manage existing subscriptions:

1. Navigate to the *Marketplace*.
2. Select **Subscriptions**. A list of Marketplace subscriptions is displayed.

Click on the subscription name to display the subscription details information.

On the subscription details page, you have a link to the product, a link to the plan, and a link to the application(s) associated with this subscription. Each application is a link that redirects you to the application details page. The bottom of the page displays the subscription history (requested time / last approval/rejection time).

### Delete a subscription

1. Navigate to the *Marketplace*.
2. Select **Subscriptions**. A list of Marketplace subscriptions is displayed.
3. Click the bin icon next to the subscription to trigger the unsubscribing process.
