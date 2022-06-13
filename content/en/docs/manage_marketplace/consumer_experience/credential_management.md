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

As a consumer, learn how to create / delete your Marketplace credential.

## Create credentials

The credential request can be done from several places in the Marketplace:

* From the application: *Marketplace* > Application > navigate to the appropriate resource > **Create Credential** button
* From the resource: *Marketplace* > Product > Resource > Access > navigate to the appropriate application > **Create Credential** button
* While requesting access to the product resource: If access is auto approved, then the Create Credential screen is displayed

To create a credential, select the credential type and enter the required information.

Once the credential is provisioned by the provider of the resource, you can view the value of a credential only once inside the marketplace, but it will remain on the data plane. Be sure to store it in a secure place to use every time you call a product resource. If the credential value is lost, click **Create Credential** to create a new one.

To delete the existing credential, click the trash bin icon.
