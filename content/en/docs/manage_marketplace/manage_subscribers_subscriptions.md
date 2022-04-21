---
title: Manage your subscribers and subscriptions
linkTitle: Manage your subscribers and subscriptions
weight: 20
---

## Before you start

You must have a published product in the Marketplace. Refer to [Publish to Marketplace](/docs/manage_marketplace/publish_to_marketplace/).

## Objectives

Learn how to create a Marketplace subscription and request access / credentials to resources, including:

* Subscribe to a product
* Request access to a product resource
* Request product resource credentials

## Concepts

Two personas are identified:

* Subscription manager: responsible for creating /updating the subscription
* Developer: responsible for designing application(s) that use subscriptions and access services that belongs to a product

### Terminology

**Product**: group of linked assets that create a business capability.

**Subscription**: authorization to manipulate a product under a plan condition. Based on the subscription plan, fees might apply, which are required to be paid by the subscription manager.

**Application**: represents one (or multiple) business facet of a product that a consumer will use.

**Access request**: represents an authorization to use certain services for an application under the constraint of a subscription plan.

**Credentials**: API Key or Oauth client credential / secret to allow access to a service.

## Get access to a product service

To consume APIs from the Marketplace, you must:

* Step 1: subscribe to a product
* Step 2: create an application
* Step 2: request access to a resource
* Step 4: request credentials that will allow an application to consume a resource

### Step 1: Subscribe to a product

Anyone can subscribe to a product with the following role restrictions:

| Persona               | Subscribe to a paid plan | subscribe to a free plan |
|-----------------------|--------------------------|--------------------------|
| Subscription manager  | Authorized               | Authorized               |
| Central administrator | Authorized               | Authorized               |
| Developer             | Forbidden                | Authorized               |

#### Subscribe from the UI

1. Log into the Marketplace WebUI.
2. Browse for the product you want to subscribe to, and click on the product name. The product details page is displayed.
3. Click **Subscribe** to start the subscription process. A side panel is displayed asking you to:

    * enter a subscription name
    * select a subscription plan
    * select the owning team of the subscription

4. Click **Save** to create the subscription.

The subscription is auto approved and a green subscribed ribbon is displayed across the product image.

You can view your subscription by navigating to the **Subscription** menu.

### Step 2: Create an application

1. Navigate to the **Application** menu.
2. Click **Create application** to start creating an application. A side panel is displayed asking you to:

    * enter the application name
    * optionally, enter a short description that can help to retrieve the application
    * select the owning team of this application
    * optionally, select an icon

3. Click **Create** to create the application.

The newly created application is visible on the page. You can view its details by clicking on the application name.

### Step 3: Request access to a resource

1. Open a subscribed product and navigate to the **product resources** section.
2. Click the key icon related to the resource you want to access. A side panel is displayed, asking you to:

    * enter the access name
    * select the subscription (only subscriptions associated to the product are visible)
    * select the application

3. Click **Request Access** to validate your choice.

The access request is auto approved by the provider.

### Step 4: Request credentials

There are two options for requesting credentials:

* Option 1: just after requesting access. See [Request access to a resource](#request-access-to-a-resource)
* Option 2: by navigating to the application details page, finding the correct access request, and requesting new credentials.

#### Option 1: just after requesting access

A **Create credentials** side panel is displayed, which allows you to request credentials. After you name your credentials and click **Save**, an event is triggered for the provider.

The credentials are issued on the dataplane by the provider, encrypted with the public key associated to the Marketplace organization, sent back and attached to the application.

All sensitive data (API Key or Oauth client secret) coming from the dataplane are encrypted using the public key assigned to the consumer organization. The encrypted data is store in the Marketplace database for three days, after which the encrypted data is deleted and no longer available.

#### Option 2: browsing the application details

Navigate to the application details, open the corresponding subscription to see all plans you subscribe to. Once you find the appropriate plan, you will be able to see any existing credentials. Click **Create Credential** to request new credentials.

### View credentials

1. Navigate to the application details
2. Open the corresponding subscription to see all plans you subscribe to. Once you find the appropriate plan, you will be able to see any existing credentials.
3. Click the eye icon to see the clear value of the credentials. Be aware that this value is displayed only once and a warning message informs you about it.

After viewing your credentials, the Marketplace deletes them from its internal database. However, the credentials are still available on the dataplane side.

You can request new credentials by clicking the **Create Credentials** button.

## Delete an application

1. Navigate to the *Application* page.
2. Click the bin icon associated with the application you want to delete.

An event is triggered for the provider (or the Discovery Agent if provider is using Amplify agents), who processes the event and deletes the corresponding application on the dataplane. All associated credentials on the Marketplace are removed.

## Unsubscribe to a product

1. Navigate to the *Subscription* page.
2. Select the product you want to unsubscribe to. The details page is displayed, listing all the plans you subscribe to.
3. Click the icon on the right side of the plan to trigger the unsubscribing process.

The triggered event is processed by the provider.
