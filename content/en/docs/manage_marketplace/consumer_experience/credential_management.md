---
title: Access and Credential management
linkTitle: Access and Credential management
weight: 35
---

Manage your subscriptions credentials from the Marketplace.

## What are credentials

When a product resource is protected by an API Key or an OAuth credential, you must create your Marketplace credential once the product resource access is granted. Your credential is needed every time you call a product resource. It is the key that provides you access to resources.

## Before you start

Browse and find a product in the Marketplace, subscribe to the product.

## Objectives

As a consumer, learn how to request access to an API to be issued credentials, and then manage those credentials.

## Request access to an API

You must request access to the API before you can use an API resource in a product that you have an approved subscription on. Access requests are approved by the provider. Note that an API cannot be used if it is not included in a usage plan associated with an active subscription.

To request access to an API:

1. From the Marketplace *Home* screen, open a product and select the **Resources** tab.
2. Click the **Key** icon that is displayed next to the resource.
3. Complete the Request access form. Note that **Request access name** is auto populated.

    * Select a subscription.
    * Select an application. If you are a member in multiple teams, the subscriptions and the application must be owned by the same team.
    * Fill out any other fields that are displayed on the form.
    * Click **Request Access**.

Once access is approved, you will be directed to the *Create Credential* screen.

## Track access requests to an API

View and track the status of the access requests:

* From the application: *Marketplace* > Application > navigate to the appropriate resource.
* From the product: *Marketplace* > Product > Resource > Access > navigate to the appropriate application.

## Credential lifecycle

| State          | Description                                                                                                                        |
|----------------|------------------------------------------------------------------------------------------------------------------------------------|
| **Pending**    | The credential creation has been initiated by the consumer and is waiting to be provisioned in the corresponding data plane.              |
| **Active**     | The credential is provisioned on the data plane and can be used to consume APIs.                                                   |
| **Inactive**   | The credential is provisioned on the data plane but cannot be used to consume APIs. This can be the result of a [Suspend action](/docs/manage_marketplace/consumer_experience/credential_management#suspend--enable-credential). |
| **Deleting**   | The credential deletion has been initiated and is waiting for the credentials to be deprovisioned in the data plane.                        |

## Create credentials

The credential request can be done from several places in the Marketplace:

* From the application: *Marketplace* > Application > navigate to the appropriate resource > **Create Credential** button
* From the resource: *Marketplace* > Product > Resource > Credentials > navigate to the appropriate application > **Create Credential** button
* While requesting access to the product resource: if access is auto approved, then the Create Credential screen is displayed

To create a credential, select the credential type and enter the required information.

Once the credential is generated, make sure to copy and paste it in a secure location, as you will not be able to see it again from the Marketplace. If you lose the credential secret, click **Create Credential** to create a new one.

To delete the existing credential, click the trash bin icon.

## View credential value

Once the credential is provisioned by the provider (either manually or using Discovery Agent), you can view your credential secret. The secret is encrypted and available for only three days to be viewed from inside the Marketplace. After this period, the credential secret will be removed from Amplify, but will remain on the data plane.

To view the clear value of the credential:

* From the application: *Marketplace* > Application > navigate to the appropriate resource > **View Credential** button
* From the resource: *Marketplace* > Product > Resource > Credentials > navigate to the appropriate application > **View Credential** button

The panel is enlarged to show the remaining time to view the decrypted value and an eye icon to access it. After confirming your need to view the clear value of credentials, the credentials are decrypted and displayed on the screen. After you retrieve the credential clear value, make sure to copy and paste it in a secure location as you will not be able to see it again once the side panel is closed or the session expires.

## Suspend / Enable credential

Credential can be suspended / enabled from several places in the Marketplace:

* From the application: *Marketplace* > Application > navigate to the appropriate resource
* From the resource: *Marketplace* > Product > Resource > Credentials > navigate to the appropriate application

Click on the credential name to display the credential information. From here, you can:

* **Suspend** an active credential using the **Suspend credential** button. The credential status will become Inactive.
* **Enable** a suspended credential using the **Enable credential** button. The credential status will become Active.

Each action must be confirmed by the user.

## Renew credential

This action is not supported by all data planes and may not be available for the consumer.

When viewing the credential list from the application or from the product resources details, a **Renew credential** menu can be used if enabled by the underlying data plane.

## delete credential

A credential can be deleted:

* From the application: *Marketplace* > Application > navigate to the appropriate resource
* From the resource: *Marketplace* > Product > Resource > Credentials > navigate to the appropriate application

Click on the credential name to display the credential information. Click **Delete credential** to delete the credential. This action must be confirmed by the user, as it is irreversible.
