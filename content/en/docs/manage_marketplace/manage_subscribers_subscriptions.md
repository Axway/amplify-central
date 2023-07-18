---
title: Manage your subscribers and subscriptions
linkTitle: Manage your subscribers and subscriptions
draft: no
weight: 30
---
Validate the subscription information and manage the access to your resources.

## Before you start

You must have a published product in the Marketplace. Refer to [Publish to Marketplace](/docs/manage_marketplace/publish_to_marketplace/).

## Objectives

Learn how to manage Marketplace subscriptions, request access and credentials to resources, including:

* Approving / rejecting subscription
* Approving / rejecting access requests
* Provisioning / deleting / renewing credentials

## Concepts

Three personas are identified:

* Subscription manager: responsible for approving / rejecting the subscriptions
* Catalog Manager: responsible for approving / rejecting resources access and for managing the credentials
* Consumer: responsible for designing application(s) that use subscriptions and access services that belongs to a product

### Terminology

**Product**: group of linked assets that create a business capability.

**Plan**: billing and quota information attached to a product. Each plan has a subscription approval: automatic (default) or manual.

**Subscription**: authorization to manipulate a product under a plan condition. Based on the subscription plan, fees might apply, which are required to be paid by the subscription manager.

**Application**: represents one (or multiple) business facet of a product that a consumer will use.

**Access request**: represents an authorization to use certain services for an application under the constraint of a subscription plan. Access request can be automatically (default) or manually approved.

**Credentials**: API Key or Oauth client credential / secret to allow access to a service.

## Get access to a product service

To consume APIs from the Marketplace, the consumer must:

* Step 1: subscribe to a product and wait for the provider approval
* Step 2: create an application
* Step 3: request access to a resource
* Step 4: request credentials that will allow an application to consume a resource
* Step 5: wait for the provider to provision the credentials
* Step 6: use the provided credentials to consume the product resources

## Manage consumer subscriptions

Persona: **Subscription Approver** team role.

{{< alert title="Note" color="primary" >}}Central Admin role can be used. This user can see all subscriptions without team constraint.{{< /alert >}}

Subscriptions are attached to a product. Consequently, the subscription approver can see only the subscriptions associated to a product owned by the team(s) he is part of.

Subscription has three approval states:

* Pending: subscription has been initiated by a consumer. Subscription approver can approve/reject a pending subscription.
* Approved: subscription has been approved by a provider. Subscription approver can reject an approved subscription.
* Rejected: subscription has been rejected by a provider. Subscription approver can approve a rejected subscription.

Only approved subscription will allow the consumer to continue to request access to a product resource.

### Approving a subscription

1. As the subscription approver, navigate to *Amplify Central > Marketplace > Subscriptions* to view  all subscriptions belonging to a product owned by your team.
2. Filter the subscription list by subscription status (Pending / Approved / Rejected) and/or team. Each subscription displays its name, the associated product, the organization and team that own the subscription, the approval status and the subscription state.
3. Click on the subscription name to open the subscription details. From this page, once the consumer meets all the requirements that are needed for billing, click **Approve** to approve the subscription.

### Rejecting a subscription

1. As the subscription approver, navigate to *Amplify Central > Marketplace > Subscriptions* to view all subscriptions belonging to a product owned by your team.
2. Filter the subscription list by subscription status (Pending / Approved / Rejected) and/or team. Each subscription displays its name, the associated product, the organization and team that owned the subscription, the approval status and the subscription state.
3. Click on the subscription name to open the subscription details. From this screen, click either **Revoke** to reject the subscription that was previously approved, or **Decline** if the subscription is pending.
4. The subscription global state remains Active and can be [deleted](#deleting-a-subscription) from the system.

### Deleting a subscription

Only Cancelled subscription and rejected subscription can be deleted from the system.

{{< alert title="Warning" color="warning" >}}
Deleting a subscription is irrevocable: once the subscription is deleted from the system, Business Insights and Consumer Insights screen will cease to show that subscription.
{{< /alert >}}

1. As a Catalog Manager or a subscription approver of a product, navigate to *Amplify Central > Marketplace > Subscriptions* to view all subscriptions belonging to a product owned by your team.
2. Filter the subscription list by subscription status (Pending / Approved / Rejected) and/or team. Each subscription displays its name, the associated product, the organization and team that own the subscription, the approval status and the subscription state.
3. Use the **Delete** from the ellipsis menu to trigger the subscription deletion.
4. A confirmation popup will ask you to confirm your choice and validate it.

### Contacting the subscribers

The Provider can access their consumer email from:

* Product Foundry > Product details > Subscriptions: select the consumer and click **Copy Email** or use the **Copy** icon located next to the consumer email address.
* Marketplace > Credentials list > Credential details: use the **Copy** icon located next to the consumer email address.

With these emails, you can reach out to the consumer using your regular messaging system.

## Manage access request

Persona: **Catalog Manager** team role

{{< alert title="Note" color="primary" >}}The Central Admin role can be used. This user can see all access requests without team constraint.{{< /alert >}}

Access requests are attached to an application under the constraint of a subscription. Since a subscription is linked to a product, the catalog manager can see only the access requests associated to a product owned by the team(s) they are a part of.

Access request has three approval states:

* Pending: subscription has been initiated by a consumer. Subscription approver can approve/reject a pending subscription.
* Approved: subscription has been approved by a provider. Subscription approver can reject an approved subscription.
* Rejected: subscription has been rejected by a provider. Subscription approver can approve a rejected subscription.

Access request also contains a provisioning status:

* Pending: the access request has not been provisioned yet
* Success: the provisioning access has been successfully granted
* Error: an error occurred during the provisioning process

### Approving an access request

1. As a subscription approver, navigate to *Amplify Central > Marketplace > Access Requests* to view all access requests associated to  product owned by your team.
2. Filter the Access Requests by approval state (Pending / Approved / Rejected) and/or provisioning state (Pending / Success / Error) and/or team. Each access request displays the name, the associated product, the organization of the team, the approval status, and the provisioning status.
3. Click on the access request name to open the access request details. From this page, click **Approve** to approve the access request.

This will trigger an event to inform of the access request approval. Based on this event, the provisioning process can start. Once the provisioning process is completed, the access request provisioning state can be enriched with the appropriate value. This provisioning can be manual or automated with the Discovery Agent associated to the environment data plane hosting the API that the consumer wants to use.

### Rejecting an access request

1. As the catalog manager or subscription approver, navigate to *Amplify Central > Marketplace > Access Requests* to view all access request associated to  product owned by your team.
2. Filter the Access Request list by approval state (Pending / Approved / Rejected) and/or provisioning state (Pending / Success / Error) and/or team. Each access request displays its name, the associated asset, the organization of the team that owned the request, the approval status and the provisioning status.
3. Click on the access request name to display the access request detail. From this screen, click either **Revoke** to reject the access request that was previously approved, or **Decline** if the access request is pending.

## Manage credentials

Persona: **Catalog Manager** team role

{{< alert title="Note" color="primary" >}}The Central Admin role can be used. This user will be able to see all credentials without team constraint.{{< /alert >}}

Credentials are attached to an application under the constraint of a subscription. Since subscription is linked to a product, the catalog manager can see only the credentials associated to a product owned by the team(s) they are part of.

A credentials has two states:

* Inactive: credential cannot be used to consume corresponding API
* Active: credential can be used to consume corresponding API

A credential also has a provisioning status:

* Pending: credential request has been initiated by a consumer. Subscription approver can approve/reject a pending subscription.
* Success: all provisioning access have been successfully granted
* Error: an error occurred during the provisioning step

A credential can have an expiration date. This expiration date is defined in the Discovery Agent configuration managing the data plane environment. See [Enforce credential expiration date](/docs/connect_manage_environ/connected_agent_common_reference/marketplace_provisioning/#enforce-credential-expiration-date) for more information.

### Suspending / Enabling credential

1. As a catalog manager, navigate to *Amplify Central > Marketplace > Credentials* to view all credentials associated to  product owned by your team.
2. Filer the credential list by state (Active / Inactive) and/or provisioning state (Pending / Success / Error) and/or team. Each credential displays its name, state, expiration date if any, application name, owner name, the organization and team of the owner.
3. Click on the credential name to open the credential details.
4. Enter a reason.

Once the reason is entered, the catalog manager can:

* Suspend an active credential using the **Suspend** button. The credential status will become Inactive.
* Enable a suspended credential using the **Enable** button. The credential status will become Active and a new expiration date will be set if enforced by the Discovery Agent.

### Renewing credential

This action is not supported by all data planes and may not be available for the provider.

1. As a catalog manager, navigate to **Amplify Central > Marketplace > Credentials** to view all credentials associated to  product owned by your team.
2. Filter the credential list by state (Active / Inactive) and/or provisioning state (Pending / Success / Error) and/or team. Each credential displays its name, state, expiration date if any, application name, owner name, the organization and team of the owner.
3. Click on the credential name to open the credential details.
4. Enter a reason, then click **Renew**.

### Deleting credential

1. As a catalog manager, navigate to *Amplify Central > Marketplace > Credentials* to view all credentials associated to  product owned by your team.
2. Filter the credential list by state (Active / Inactive) and/or provisioning state (Pending / Success / Error) and/or team. Each credential displays its name, state, expiration date if any, application name, owner name, the organization and team of the owner.
3. Click on a credential name to open the credential details.
4. Enter a reason, then click **Delete**. A confirmation popup is displayed.
5. Confirm your choice. The credential will be completely removed from the system and deprovisioned on the data plane.
