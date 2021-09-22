---
title: Manage subscriptions
linkTitle: Manage subscriptions
weight: 130
date: 2019-12-16T00:00:00.000Z
description: Lear how to manage your Amplify Unified Catalog subscriptions.
---

## Objective

Learn how subscriptions work in Amplify Unified Catalog, and configure a custom subscription workflow.

## How subscriptions work

You can use subscriptions to secure access to an asset in the Amplify Unified Catalog. Consumers must subscribe to an asset before getting access to it.

As an asset provider, you can choose to disable subscriptions for your asset, for instance, if you want to publish an API that is not secured with an API key. In this case, consumers can use the asset without having to subscribe.

You can also configure the subscription metadata that is required from consumers at the time of subscription. You can configure this when publishing the asset to the Amplify Unified Catalog, or after the asset has been published.

{{< alert title="Note" color="primary" >}}Enabling or disabling subscriptions is currently available only by way of [Axway Central CLI](/docs/integrate_with_central/cli_central/) or Amplify API.{{< /alert >}}

## Subscription scope

A subscription is owned by a team. Meaning that only the members of the team, which owns the subscription, can see the subscription details and share its credentials. Subscriptions cannot be shared between different teams.

Asset providers can only see subscription requests to their catalog assets.

## Subscription lifecycle

The follow is an example of a typical successful subscription flow:

1. Subscription is created when a consumer subscribes to an asset.
2. Subscription state is set to **requested**.
3. Subscription request is approved either automatically or manually, by the asset provider.
4. Subscription state is set to **approved**.
5. Provision access to the asset is granted to the consumer. For API assets, this might mean generating an API Key.
6. Subscription state is set to **active** after the provisioning is complete. At this point, the consumer can successfully use the asset.

The following outlines all possible subscription states, their respective UI labels, and what they mean:

* **requested** (**Waiting for approval...**) - State in which the user has submitted a subscription request, and approval is required.
* **approved** (**Subscribing...**) - The subscription request was approved by the asset provider, and the access to the asset is being provisioned.
* **rejected** (**Rejected**) - The subscription request was rejected by the asset provider.
* **active** (**Active**) - The provisioning is complete, and the consumer can use the asset, that is, they can make an API call for API assets or exchange files with a partner for MFT assets.
* **failed_to_subscribe** (**Subscribe Failed**)- Indicates that there was an error during the provisioning.
* **unsubscribe_initiated** (**Unsubscribing...**) - The consumer has requested to unsubscribe from an asset, and the access to the asset is being removed. (Asset providers can also unsubscribed the consumer from their assets).
* **unsubscribed** (**Unsubscribed**) - Deprovisioning is complete.
* **failed_to_unsubscribe** (**Unsubscribe Failed**) - The request to unsubscribe failed because of an internal error.
* **change_requested** (**Change Requested**) - A change was submitted for a subscription. Asset providers can approve or reject change requests.

The following image shows the transition between different subscription states:

![Subscription state diagram](/Images/catalog/api-subscription-state-diagram.png)

## View Subscriptions

To view the historical transition of a subscription request:

1. In Amplify Central, select **Subscriptions** in the left navigation bar,
2. Use the top filter drop-down to filter the subscription by their status.
3. Click a subscription to select it. The subscription details screen is shown.
4. Click the **History** tab. The historical activity on a subscription request is shown

Watch a quick animation to view your subscription history.

![View subscriptions](/Images/catalog/view_subscriptions.gif)

## Enable manual approval

As an asset provider, you can configure how subscription requests will be approved. However, only users that are assigned to the Central Admin, API Developer roles, and Service accounts can change the subscription approval mode.

There are two possible options for subscription approval:

* **Automatic**: There is no manual intervention required from the asset provider, and the user is automatically granted access to consume the asset.
* **Manual**: The asset provider manually approves or rejects each request, either from Amplify Central or by delegating the approval mechanism through an external system, for example,  Microsoft Teams, Flow Manager.

Follow these steps to enable manual approvals:

1. Select **Catalog** in the left navigation bar. The **Explore Catalog** screen is shown. You can browse and discover the asset available for your team.
2. Select your asset.
3. From the **Ellipsis** button, select **Edit**.
4. Select **Manual** in the Subscription approval drop-down.
5. Click **Update** to save your changes.

{{< alert title="Note" color="primary" >}}If the catalog asset has been created manually, via CLI, or imported via agents, there is a risk of overriding changes via UI approvals.{{< /alert >}}

## Approve or reject a subscription

As an asset provider, you can approve or reject subscription requests to assets in the Amplify Unified Catalog. However, only users that are assigned to the Central Admin role and DevOps Service accounts can approve or reject subscriptions.

Follow the steps below to approve a subscription:

1. In Amplify Central, select **Subscriptions** in the left navigation bar.
2. Use the top filter drop-down to filter the subscription by their status.
3. Select a subscription that has the status set to **Awaiting Approval.**
4. Review the asset subscription request details.
5. Click **Approve** or **Reject**.
6. You can can choose to provide a message for the subscriber.

Watch a quick animation on how to approve a subscription:

![Approve subscription](/Images/catalog/approved_subscription.gif)

## Unsubscribe from an asset

To unsubscribe from an asset:

* In Amplify Central, select **Subscriptions** from the left navigation bar.
* Click **Unsubscribe** on the subscription of your choice. You can enter an optional text for unsubscribing from the asset.

You can also unsubscribe from the **Subscription** detail page as shown below.

![Unsubscribe from an asset](/Images/catalog/unsubscribe_asset.gif)

## Delete the subscription of an asset

Deleting a subscription will remove it from the system. You can only delete subscriptions which are in **Unsubscribed** or **Deleted** status.

Watch this quick animation to delete your subscription.

![delete subscription](/Images/catalog/delete_subscription.gif)

## Further information

* [Manage subscription workflow](/docs/connect_manage_environ/connected_agent_common_reference/manage_subscription_workflow/)
