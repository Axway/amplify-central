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

You must request access to the API before you can use an API resource in a product that you have an approved subscription on. Access requests are approved by the provider. Note that an API can not be used if it is not included in a usage plan associated with an active subscription.

To request access to an API:

1. From the Marketplace *Home* screen, open a product and select the **Resources** tab.
2. Click the **Key** icon that is displayed next to the resource.
3. Complete the Request access form. Note that **Request access name** is auto-populated.

    * Select a subscription.
    * Select an application. If you are a member in multiple teams, the subscriptions and the application must be owned by the same team.
    * Fill out any other fields that are displayed on the form.
    * Click **Request Access**.

Once access is approved, you will be directed to the *Create Credential* screen.

## Track access requests to an API

View and track the status of the access requests:

* From the application: *Marketplace* > Application > navigate to the appropriate resource.
* From the product: *Marketplace* > Product > Resource > Access > navigate to the appropriate application.

## Create credentials

The credential request can be done from several places in the Marketplace:

* From the application: *Marketplace* > Application > navigate to the appropriate resource > **Create Credential** button
* From the resource: *Marketplace* > Product > Resource > Credentials > navigate to the appropriate application > **Create Credential** button
* While requesting access to the product resource: if access is auto approved, then the Create Credential screen is displayed

To create a credential, select the credential type and enter the required information.

Once the credential is provisioned by the provider of the resource, you can view the value of a credential only once inside the marketplace, but it will remain on the data plane. Be sure to store it in a secure place to use every time you call a product resource. If the credential value is lost, click **Create Credential** to create a new one.

To delete the existing credential, click the trash bin icon.

## View credential value

Once the credential is provisoned by the provider (either manually or using Discovery Agent), you can view your credential secret. These secret are encrypted and available only for 3 days. After this period, the credentials encrypted value is remove from Amplify but still provisoned on the dataplane.

Viewing credential clear value can be done from several places in the Marketplace:

* From the application: *Marketplace* > Application > navigate to the appropriate resource > **View Credential** button
* From the resource: *Marketplace* > Product > Resource > Credentials > navigate to the appropriate application > **View Credential** button

Once the side blade is opened, you can see the credentials details. For viewing the credential clear value, consumer has to click the **View credential** button. The panel is enlarged to show the remaining time to view the decrpted value and an eye icon to access it. After confirming your need to view the clear value of credentials, the credentials is decrypted and displayed on the scren. A copy button help the consumer to copy the value. Be sure to store this clear value in a safe place as it will no more ba availble after closing the side blade or your session expiration.

## Suspending / Enabling credential

Credential can de suspended / enabled from several place in the Marketplace:

* From the application: *Marketplace* > Application > navigate to the appropriate resource
* From the resource: *Marketplace* > Product > Resource > Credentials > navigate to the appropriate application

Clicking on credential name opens the side blade with the credential detail information and the user can:

* suspend an active credential using the **Suspend credential** button. The credential status will become Inactive.
* enable a suspended credential using the **Enable credential** button. The credentail status will become Active.

Each action needs to be confirmed by the user.

## Renewing credential

This action is not supported by all dataplane and may not be avialble for the consumer.

When viewing the credential list from application or from product resources detail, a **Renew credential** menu can be used if enabled by the underline dataplane.

## deleting credential

Credential can de deleted from several place in the Marketplace:

* From the application: *Marketplace* > Application > navigate to the appropriate resource
* From the resource: *Marketplace* > Product > Resource > Credentials > navigate to the appropriate application

Clicking on credential name opens the side blade with the credential detail information and the user can delete the credential using the **Delete credential** button. This action needs to be confirmed by the user as it is irreversible.
