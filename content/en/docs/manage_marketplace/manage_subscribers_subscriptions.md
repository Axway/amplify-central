---
title: Manage your subscribers and subscriptions
linkTitle: Manage your subscribers and subscriptions
draft: no
weight: 30
---
Validate the subscription information and manage the access to your resources.

## Before you start

You must have a published product in the Marketplace. See [Publish to Marketplace](/docs/manage_marketplace/publish_to_marketplace/).

## Objectives

Learn how to manage Marketplace subscriptions, request access and credentials to resources, including:

* Approving / rejecting subscription
* Approving / rejecting Application Registration
* Provisioning / deleting / renewing credentials

## Concepts

Three personas are identified:

* Subscription Approver: responsible for approving / rejecting the subscriptions and resources access
* Catalog Manager: responsible for approving / rejecting the subscriptions and resources access. He is also responsible for managing the credentials
* Consumer: responsible for designing application(s) that use subscriptions and access services that belongs to a product

### Terminology

**Product**: group of linked assets that create a business capability.

**Plan**: billing and quota information attached to a product. Each plan has a subscription approval: automatic (default) or manual.

**Subscription**: authorization to manipulate a product under a plan condition. Based on the subscription plan, fees might apply, which are required to be paid by the Subscription Manager.

**Application**: represents one (or multiple) business facet of a product that a consumer will use.

**Application Registration**: represents an authorization to use certain services for an application under the constraint of a subscription plan. Application Registration can be automatically (default) or manually approved.

**Credentials**: API Key or Oauth client credential / secret to allow access to a service.

## Get access to a product service

To consume APIs from the Marketplace, the consumer must:

* Step 1: subscribe to a product and wait for the provider approval
* Step 2: create an application
* Step 3: request access to a resource
* Step 4: request credentials that will allow an application to consume a resource
* Step 5: wait for the provider to provision the credentials
* Step 6: use the provided credentials to consume the product resources

## View subscriptions

1. navigate to *Amplify Central > Marketplace > Subscriptions*
2. View the following information for all subscriptions:

    * Subscription Name
    * Product
    * Organization
    * Consumer
    * Approval State
    * State
    * Owning Team
    * Expires/Migrates

Using the **Filter By** controls to filter subscriptions by the current state / approval state / consumer.
Search by the Subscription Name with the search bar.

Click the **Customize table** icon in the top-right corner of the table to customize the table layout. A modal opens that allows you to tailor the layout to your needs, including:

* Show columns
* Hide columns
* Reorder columns via drag-and-drop
* Restore to default layout

Layout preferences are automatically saved and persist across browser sessions.

## Manage consumer subscriptions

Persona: **Subscription Approver** team role or **Catalog Manager** team role

{{< alert title="Note" color="primary" >}}Engage Admin role can be used. This user can see all subscriptions without team constraint.{{< /alert >}}

Subscriptions are attached to a product. Consequently, the subscription approver can see only the subscriptions associated to a product owned by the team(s) he is part of.

Subscriptions have three approval states:

* Pending: subscription has been initiated by a consumer. Subscription approver can approve/reject a pending subscription.
* Approved: subscription has been approved by a provider. Subscription approver can reject an approved subscription.
* Rejected: subscription has been rejected by a provider. Subscription approver can approve a rejected subscription.

Only an approved subscription will allow the consumer to continue to request access to a product resource.

### Approving a subscription

1. As the subscription approver, navigate to *Amplify Central > Marketplace > Subscriptions* to view  all subscriptions belonging to a product owned by your team.
2. Filter the subscription list by subscription status (Pending / Approved / Rejected) and/or team. Each subscription displays its name, the associated product, the organization and team that own the subscription, the approval status and the subscription state.
3. Click on the subscription name to open the subscription details. From this page, once the consumer meets all the requirements that are needed for billing, click **Approve** to approve the subscription.

### Rejecting a subscription

1. As the subscription approver, navigate to *Amplify Central > Marketplace > Subscriptions* to view all subscriptions belonging to a product owned by your team.
2. Filter the subscription list by subscription status (Pending / Approved / Rejected) and/or team. Each subscription displays its name, the associated product, the organization and team that owned the subscription, the approval status and the subscription state.
3. Click on the subscription name to open the subscription details. From this page, click either **Revoke** to reject the subscription that was previously approved, or **Decline** if the subscription is pending.
4. The subscription global state remains Active and can be [deleted](#deleting-a-subscription) from the system.

### Deleting a subscription

Only cancelled and rejected subscription can be deleted from the system.

{{< alert title="Caution" color="danger" >}}
Deleting a subscription is irrevocable. Once the subscription is deleted from the system, Business Insights and Consumer Insights screens will cease to show that subscription.
{{< /alert >}}

1. As a Catalog Manager or a subscription approver of a product, navigate to *Amplify Central > Marketplace > Subscriptions* to view all subscriptions belonging to a product owned by your team.
2. Filter the subscription list by subscription status (Pending / Approved / Rejected) and/or team. Each subscription displays its name, the associated product, the organization and team that own the subscription, the approval status and the subscription state.
3. Click **Delete** from the ellipsis menu to trigger the subscription deletion.
4. Confirm your choice and validate it.

### Contacting the subscribers

The Catalog Manager can access their consumer email from:

* Product Foundry > Product details > Subscriptions: select the consumer and click **Copy Email** or use the **Copy** icon located next to the consumer email address.

Both Subscription approver and Catalog Manager can access their consumer email from:

* Marketplace > Subscriptions list > subscription details: use the **Copy** icon located next to the consumer email address.
* Marketplace > Application Registrations list > Application Registrations details: use the **Copy** icon located next to the consumer email address.
* Marketplace > Credentials list > Credential details: use the **Copy** icon located next to the consumer email address.

With these emails, you can reach out to the consumer using your regular messaging system.

## Manage Application Registration

Persona: **Subscription Approver** team role or **Catalog Manager** team role

{{< alert title="Note" color="primary" >}}
The Engage Admin role can be used. This user can see all Application Registrations without team constraint.
{{< /alert >}}

Application Registrations are attached to an application under the constraint of a subscription. Since a subscription is linked to a product, the Catalog Manager can see only the application registrations associated to a product owned by the team(s) he is a part of.

Application Registrations have three approval states:

* Pending: subscription has been initiated by a consumer. Subscription approver can approve/reject a pending subscription.
* Approved: subscription has been approved by a provider. Subscription approver can reject an approved subscription.
* Rejected: subscription has been rejected by a provider. Subscription approver can approve a rejected subscription.

Application Registrations also contain a provisioning status:

* Pending: the access has not been provisioned yet.
* Success: the provisioning access has been successfully granted.
* Error: an error occurred during the provisioning process.

### Approving an Application Registration

1. As a subscription approver, navigate to *Amplify Central > Marketplace > Application Registrations* to view all Application Registrations associated to product(s) owned by your team.
2. Filter the Application Registrations by approval state (Pending / Approved / Rejected) and/or provisioning state (Pending / Success / Error) and/or team. Each Application Registration displays the name, the associated product, the organization of the team, the approval status and the provisioning status.
3. Click on the Application Registration name to open the request details. From this page, click **Approve** to approve the Application Registration.

This will trigger an event to inform of the Application Registration approval. Based on this event, the provisioning process can start. Once the provisioning process is completed, the Application Registration provisioning state can be enriched with the appropriate value. This provisioning can be manual or automated with the Discovery Agent associated to the environment data plane hosting the API that the consumer wants to use.

### Rejecting an Application Registration

1. As the Catalog Manager or subscription approver, navigate to *Amplify Central > Marketplace > Application Registrations* to view all Application Registrations associated to the product(s) owned by your team.
2. Filter the Application Registration list by approval state (Pending / Approved / Rejected) and/or provisioning state (Pending / Success / Error) and/or team. Each Application Registration displays its name, the associated asset, the organization of the team that owned the request, the approval status and the provisioning status.
3. Click on the Application Registration name to display the Application Registration details. From this page, click either **Revoke** to reject the Application Registration that was previously approved, or **Decline** if the Application Registration is pending.

## Manage credentials

Persona: **Catalog Manager** team role

{{< alert title="Note" color="primary" >}}The Engage Admin role can be used. This user will be able to see all credentials without team constraint.{{< /alert >}}

Credentials are attached to an application under the constraint of a subscription. Since a subscription is linked to a product, the Catalog Manager can see only the credentials associated to a product owned by the team(s) they are part of.

A credential has two states:

* Inactive: credential cannot be used to consume corresponding API.
* Active: credential can be used to consume corresponding API.

A credential also has a provisioning status:

* Pending: credential request has been initiated by a consumer. Subscription approver can approve/reject a pending subscription.
* Success: all provisioning access has been successfully granted.
* Error: an error occurred during the provisioning step.

A credential can have an expiration date. This expiration date is defined in the Discovery Agent configuration managing the data plane environment. See [Enforce credential expiration date](/docs/connect_manage_environ/marketplace_provisioning/#enforce-credential-expiration-date) for more information.

### Suspending / Enabling credentials

1. As a Catalog Manager, navigate to *Amplify Central > Marketplace > Credentials* to view all credentials associated to the product(s) owned by your team.
2. Filer the credential list by state (Active / Inactive) and/or provisioning state (Pending / Success / Error) and/or team. Each credential displays its name, state, expiration date if any, application name, owner name, the organization and team of the owner.
3. Click on the credential name to open the credential details.
4. Enter a reason.

Once the reason is entered, the Catalog Manager can:

* Click **Suspend** to suspend an active credential. The credential status will become Inactive.
* Click **Enable** to enable a suspended credential. The credential status will become Active and a new expiration date will be set if enforced by the Discovery Agent.

### Renewing credentials

This action is not supported by all data planes and may not be available for the provider.

1. As a Catalog Manager, navigate to *Amplify Central > Marketplace > Credentials* to view all credentials associated to the product(s) owned by your team.
2. Filter the credential list by state (Active / Inactive) and/or provisioning state (Pending / Success / Error) and/or team. Each credential displays its name, state, expiration date if any, application name, owner name, the organization and team of the owner.
3. Click on the credential name to open the credential details.
4. Enter a reason, then click **Renew**.

### Deleting credentials

1. As a catalog manager, navigate to *Amplify Central > Marketplace > Credentials* to view all credentials associated to the product(s) owned by your team.
2. Filter the credential list by state (Active / Inactive) and/or provisioning state (Pending / Success / Error) and/or team. Each credential displays its name, state, expiration date if any, application name, owner name, the organization and team of the owner.
3. Click on a credential name to open the credential details.
4. Enter a reason, then click **Delete**.
5. Confirm your choice. The credential will be completely removed from the system and deprovisioned on the data plane.
