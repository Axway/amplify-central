---
title: Manage your subscribers and subscriptions
linkTitle: Manage your subscribers and subscriptions
draft: no
weight: 20
---
Validate the subscription information and manage the access to your resources.

## Before you start

You must have a published product in the Marketplace. Refer to [Publish to Marketplace](/docs/manage_marketplace/publish_to_marketplace/).

## Objectives

Learn how to manage Marketplace subscriptions, request access and credentials to resources, including:

* Approving / rejecting subscription
* Approving / rejecting Request access
* Provisioning / deleting / renewing credentials

## Concepts

Three personas are identified:

* Subscription manager: responsible for approving / rejecting the subscriptions
* Catalog Manager: responsible for approving / rejecting resources access and for managing the credentials
* Consumer: responsible for designing application(s) that use subscriptions and access services that belongs to a product

### Terminology

**Product**: group of linked assets that create a business capability.

**Plan**: billing and quotas information attached to a prodcut. Each plan has a subscription approval: automatic (default) or manual.

**Subscription**: authorization to manipulate a product under a plan condition. Based on the subscription plan, fees might apply, which are required to be paid by the subscription manager.

**Application**: represents one (or multiple) business facet of a product that a consumer will use.

**Access request**: represents an authorization to use certain services for an application under the constraint of a subscription plan. Access request can be automatically (default) or manually approved.

**Credentials**: API Key or Oauth client credential / secret to allow access to a service.

## Get access to a product service

To consume APIs from the Marketplace, consumer must:

* Step 1: subscribe to a product and wait for the provider approval
* Step 2: create an application
* Step 2: request access to a resource
* Step 4: request credentials that will allow an application to consume a resource
* Step 5: wait for the provider to provision the credentials
* Step 6: use the provided credentials to consume the product resources

## Manage consumer subscriptions

Persona: **Subscription Approver** team role.

{{< alert title="Note" color="primary" >}}Central Admin role can be used to. This user will be able to see all subscriptions without team constraint.{{< /alert >}}

Subscriptions are attached to a product. Consequently, subscription approver can see only the subscriptions associated to a product owned by the team(s) he is part of.

Subscription has 3 approval states:

* Pending: subscription have been initiated by a consumer. Subscription approver can approve/reject a pending subscription.
* Approved: subscription has been approved by a provider. Subscription approver can reject an approved subscription.
* Rejected: subscription has been rejected by a provider. Subscription approver can approve a rejected subsription.

Only approved subscription will let the consumer continue his journey to request access to a product resource.

### Approving a subscription

Subscription approver needs to navigate to Amplify Central > Marketplace > Subscriptions to view all subscriptions he can manage.

The subscription list can be filter per subscription status (Pending / Approved / Rejected) and/or per team.

Each subscription displays its name, the associated product, the organization and team that owned the subscription and the approval status.

Clicking on subscription name opens the side blade with the subscription detail information. From this screen, once his consumer met all the requirements that are needed to bill him, subscrition approver can approve the subscription using the **Approve** button.

### Rejecting a subscription

Subscription approver needs to navigate to Amplify Central > Marketplace > Subscriptions to view all subscriptions he can manage.

The subscription list can be filter per subscription status (Pending / Approved / Rejected) and/or per team.

Each subscription displays its name, the associated product, the organization and team that owned the subscription and the approval status.

Clicking on subscription name opens the side blade with the subscription detail information. From this screen, subscrition approver can reject the subscription using the **Revoke** button in case the subscription was approved previously or the **Decline** button in case the subscription is pending.

### Contacting the subscribers

There are 2 places from where Provider can access their consumer email:

* Product Foundry > Product details > Subscriptions: select the consumer you need and click the **Copy Email** button or use directly the copy button besides the consumer email address.
* Marketplace > Credentials list > Credential details: use the **Copy** icon besides the consumer email address.

With these emails, you can reach out to the consumer using your regular messaging system.

## Manage access request

Persona: **Catalog Manager** team role

{{< alert title="Note" color="primary" >}}Central Admin role can be used to. This user will be able to see all access requests without team constraint.{{< /alert >}}

Access request are attached to an application under the constraint of a subscription. Since subscription is linked to a product, catalog manager can see only the access request associated to a product owned by the team(s) he is part of.

Access request has 3 approval states:

* Pending: subscription has been initiated by a consumer. Subscription approver can approve/reject a pending subscription.
* Approved: subscription has been approved by a provider. Subscription approver can reject an approved subscription.
* Rejected: subscription has been rejected by a provider. Subscription approver can approve a rejected subsription.

Access request also contain a provisioning status:

* Pending: the access request has not been provisioned yet
* Success: the provisioning access has been succesfully granted
* Error: an error occured during the provisioning process

### Approving an access request

Catalog manager needs to navigate to Amplify Central > Marketplace > Access Requests to view all access request he can manage.

The Access Request list can be filter per approval state (Pending / Approved / Rejected) and/or per provisioning state (Pending / Success / Error) and/or per team.

Each access request displays its name, the associated asset, the organization ot the team that owned the request, the approval status and the provisioning status.

Clicking on access request name opens the side blade with the access request detail information. From this screen, once his consumer met all the requirements that are needed, catalog manager can approve the access request using the **Approve** button.

This will trigger an event to infrom of the access request request approval. Based on this event, the provisioning process can start. Once the provisioning process is completed, the access request provisioning state can be enrich with the appropriate value. This provisioning can be manual or automated with the Discovery Agent associated to the environment dataplane hosting the API the cosnumer wants to use.

### Rejecting an access request

Catalog manager needs to navigate to Amplify Central > Marketplace > Access Requests to view all access request he can manage.

The Access Request list can be filter per approval state (Pending / Approved / Rejected) and/or per provisioning state (Pending / Success / Error) and/or per team.

Each access request displays its name, the associated asset, the organization ot the team that owned the request, the approval status and the provisioning status.

Clicking on access request name opens the side blade with the access request detail information. From this screen, catalog manager can reject the access request using the **Revoke** button in case the access request was approved previously or the **Decline** button in case the access request is pending.

## Manage credentials

Persona: **Catalog Manager** team role

{{< alert title="Note" color="primary" >}}Central Admin role can be used to. This user will be able to see all credentials without team constraint.{{< /alert >}}

Credentials are attached to a application under the constraint of a subscription. Since subscription is linked to a product, catalog manager can see only the credentials associated to a product owned by the team(s) he is part of.

Credentials has 2 states:

* Inactive: credential cannot be use to consume corresponding API
* Active: credential can be use to consume corresponding API

Credentials also has a provisioning status:

* Pending: credential request has been initiated by a consumer. Subscription approver can approve/reject a pending subscription.
* Success: all provisioning access have been succesfully granted
* Error: an error occured during the provisioning step

Credential can have an expiration date. This expiration date is defined in the Discovery Agent configuration managing the dataplane environment. Refer to [Enforce credential expiration date](/docs/connect_manage_environ/connected_agent_common_reference/marketplace_provisioning/#enforce-credential-expiration-date)

### Suspending / Enabling credential

Catalog manager needs to navigate to Amplify Central > Marketplace > Credentials to view all credentials he can manage.

The Credential list can be filter per state (Active / Inactive) and/or per provisioning state (Pending / Success / Error) and/or per team.

Each credential displays its name, state, epiration date if any, application name, owner name, the organization and team of the owner.

Clicking on credential name opens the side blade with the credential detail information. Catalog Manager has to enter a reason before being allowed to use any action.

Once the reason is entered, catalog manager can:

* suspend an active credential using the **Suspend** button. The credential status will become Inactive.
* enable a suspended credential using the **Enable** button. The credentail status will become Active and a new expiration date will be set if enforce by the Discovery Agent.

### Renewing credential

This action is not supported by all dataplane and may not be avialble for the provider.

Catalog manager needs to navigate to Amplify Central > Marketplace > Credentials to view all credentials he can manage.

The Credential list can be filter per state (Active / Inactive) and/or per provisioning state (Pending / Success / Error) and/or per team.

Each credential displays its name, state, epiration date if any, application name, owner name, the organization and team of the owner.

Clicking on credential name opens the side blade with the credential detail information. Catalog Manager has to enter a reason before being allowed to use the **Renew** button.

### Deleting credential

Catalog manager needs to navigate to Amplify Central > Marketplace > Credentials to view all credentials he can manage.

The Credential list can be filter per state (Active / Inactive) and/or per provisioning state (Pending / Success / Error) and/or per team.

Each credential displays its name, state, epiration date if any, application name, owner name, the organization and team of the owner.

Clicking on credential name opens the side blade with the credential detail information. Catalog Manager has to enter a reason before being allowed to use the **Delete** button. A confirmation popup is display and Catalog Manager has to confirm his choice. Credential  will be completely remove from the system and deprovisioned on the dataplane.
