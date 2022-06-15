---
title: Credential management
linkTitle: Credential management
weight: 35
---

Consumers can manage their subscriptions credentials from the Marketplace.

## What are credentials

When a product resource is protected by an API Key or an OAuth credential, you must create your Marketplace credential once the product resource access is granted. Your credential is needed every time you call a product resource. It is the key that provides you access to resources.

## Before you start

Browse and find a product in the Marketplace, subscribe to the product.

## Objectives

As a consumer, learn how to request access to an API to be issued credential, and manage those credentials.

## Request access to an API

Before you can use an API resource in a product to which you have an approved subscription on, you need to request access to the API. Access requests can be approved by the provider. Please note that an API can not be used if it is not included in an usage plan associated with an active subscription.

To request access to an API:
* From the Marketplace *Home* screen, open a product and navigate to the *Resources* tab.
* Locate the *Key* icon that is displayed next to each resource. Click this button.
* Complete the Request access form. Note that the *Request access name* is auto-populated.
  * Select a subscription.
  * Select an application. Note that if you are a member in multiple teams, the subscriptions and the application must be owned by the same team.
  * Fill out any other fields that are displayed on the form.
  * Click **Request Access**.
* When access is automatically approved, you will be directed to the **Create Credential** screen.

## Track access requests to an API
View and track the status of the access requests:
* From the application: *Marketplace* > Application > navigate to the appropriate resource.
* From the product: *Marketplace* > Product > Resource > Access > navigate to the appropriate application.


## Create credentials

The credential request can be done from several places in the Marketplace:

* From the application: *Marketplace* > Application > navigate to the appropriate resource > **Create Credential** button
* From the resource: *Marketplace* > Product > Resource > Access > navigate to the appropriate application > **Create Credential** button
* While requesting access to the product resource: if access is auto approved, then the Create Credential screen is displayed

To create a credential, select the credential type and enter the required information.

Once the credential is provisioned by the provider of the resource, you can view the value of a credential only once inside the marketplace, but it will remain on the data plane. Be sure to store it in a secure place to use every time you call a product resource. If the credential value is lost, click **Create Credential** to create a new one.

To delete the existing credential, click the trash bin icon.
