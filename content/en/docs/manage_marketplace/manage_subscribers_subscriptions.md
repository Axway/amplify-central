---
title: Manage your subscribers and subscriptions
linkTitle: Manage your subscribers and subscriptions
weight: 20
---

## Before you start

You must have a published product to a marketplace. Refer to [Publish to marketplace](/docs/manage_marketplace/publish_to_marketplace/).

## Objectives

Learn how to create Marketplace subscription and request access/credentials to resources, including:

* Subscribing to a product
* Requesting access to a product resource
* Requesting product resource credentials

## Concepts

2 personas are identified:

* A subscription manager: this persona is responsible for creating/updating the subscription
* A developer: this persona is responsible for designing application(s) that are using subscription and accessing services that belongs to a product

**Product**: group of linked assets that create a business capability.

**Subscription**: authorization to manipulate a product under a plan condition. Based on the subscription plan, fees might apply and the subscription manager is required to pay these fees.

**Application**: represents one or multiple business facet of a products that a consumer will use.

**Access request**: represents an authorization to use certain services for an application under the constraint of a subscription plan.

**Credentials**: API Key or Oauth client credential/secret to allow the access to a service.

## Flow overview to get access to a product service

To be able to consume APIs from Marketplace, severals steps are needed:

* Step 1: subscribing to a product
* Step 2: creating an application
* Step 2: requesting access to a resource
* Step 4: requesting credentials that will allow an application to consume a resource

### Subscribing to a product

Anyone can subscribe to a product with the following role restrictions:

| Persona               | Subscribe to a paid plan | subscribe to a free plan |
|-----------------------|--------------------------|--------------------------|
| Subscription manager  | Authorized               | Authorized               |
| Central administrator | Authorized               | Authorized               |
| Developer             | Forbidden                | Authorized               |

#### Subscribing from UI

Log into the marketplace UI. Browse for the product you want to subscribe to. Open the product detail by clicking the product name. On the product details page clicks the Subscribe button to start the subscription process.

A side panel appears asking you to:

* enter a subscription name
* select a subscription plan
* select the owning team of this subscription

Then click save to create the subscription.

At the moment, the subscription is auto-approved and a green subscribed ribbon is displayed across the product image.

You can view your subscription by navigating to the subscription menu.

### Creating an application

Once a subscription is created, a developer will need an application to proceed to next step.

To create an application, navigate to the application menu.

Click "+ Create application" button to start creating an application.

A side panel appears asking you to:

* enter the application name
* optionally, enter a short description that can help to retrieve the application
* select the owning team of this application
* optionally, select an icon

Then click Create to create the application.

The newly created application is visible on the page. You can view its details by clicking on the application name.

### Requesting access to a resource

Now that a subscription and an application are ready to be used, you can request access to the product resources.

Open a subscribed product and navigate to the product resources section.

Click the key icon related to the resource you want to access.

A side panel appears, asking you to:

* enter the access name
* select the subscription. Only subscription associated to the product are visible in the combo box.
* select the application.

Click Request Access button to validate your choice.

At the moment, the access request is auto-approved by the provider.

### Requesting credentials

There are 2 ways of requesting credentials:

* option 1: just after requesting access (Refer to previous section)
* option 2: by navigating to the application details page, finding the correct access request and asking a new credentials there.

Option 1: just after requesting access:

A new side panel "Create credentials" is replacing the previous one and alow you to request credentials. You can named your credentials and click the "Save" button. This will trigger an event the provider will answer.

A new credentials will be issued on the dataplane by the provider, encrypted with the public key associated to the marketplace organization and sent back and attached to the application.

All sensitive data (APIKey or oauth client secret) coming from the dataplane are encrypted using the public key assigned to the consumer organization. The encrypted date is store in the marketplace database for 3 days. After those 3 days, the encrypted data is deleted and no more available.

Option 2: browsing the application details:

Navigate to the application details, open the corresponding subscription to see all plans you subscribe to. Once you find the appropriate plan, you will be able to see any existing credentials and use the "Create Credential" button to ask for new credentials

### Viewing credentials

Navigate to the application details, open the corresponding subscription to see all plans you subscribe to. Once you find the appropriate plan, you will be able to see any existing credentials

The eye icon allows you to see the clear value of the credentials. Be aware this value will be displayed only once and a warning message inform you about it. After viewing your credentials, the marketplace will delete it from its internal database. But the credentials are still available on the dataplane side.

You can request new credentials by clicking the "Create Credentials" button.

## Deleting an application

Navigate the the application page, and click the bin icon on he application you want to delete. An event will be triggered. The provider (or the discovery agent if provider is using Amplify agents) will process that event by deleting the corresponding application on the dataplane. All associated credentials on the marketplace will also be removed.

## Unsubscribing to a product

To unsubscribe to a product, navigate to the subscription page , select the product you want to unsubscribe to. On the details page, all the plan you subscribe to are displayed. The icon on the right side of the plan will trigger the unsubscribing process.

The triggered event will be handled by the provider.
