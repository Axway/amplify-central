---
title: Application management
linkTitle: Application management
weight: 30
---

Consumers can manage their applications from the Marketplace, including create, view and delete applications. Consumers can also view issued credentials that enable him to consume the product resources, request new credentials and delete existing credential.

## What is an application

An application is one (or multiple) business facet of a product that a consumer will use. An application can use one or more product under the constraint of subscription plan.

## Before you start

You must have a [Marketplace subscription](/docs/manage_marketplace/consumer_experience/subscription_management).

## Objectives

As a consumer, learn how to create and manage your applications from the Marketplace.

## Create a new application

1. Navigate to the *Marketplace*.
2. Select **Applications**.
3. Click **Create Application**. *The Create Applications side panel is displayed*.
4. Provide the following:

    * **Name** - the application name
    * **Description** - the application description
    * **Owner** - the team that owns this application. This dropdown is only available if you are part of multiple teams. In case you belong to one team only, the owner will be set automatically to the team you belong to. (**Cyrille**, this is not true. The dropdown is still available with only the "default team" option)
    * **icon** - The icon / image representing the application, if any

5. Click **Create**.

## View an application

1. Navigate to the *Marketplace*.
2. Select **Applications** and find the application you want to view.
3. Click the application tile to open the application details.

View the following product information associated with the application:

* The subscription and plan names
* For each subscription/plan, all resources that are accessible with the subscription
* For each resource, all credentials requested by the consumers along and the statuses (Pending / Approved / Error)

    * Open the resource details to see the detail of each credential. **Important**: The value of a credential can be viewed only once, so be sure to store it in a secure place. Once the credential has been viewed, it is no longer available for view. **Maybe we should explain why they need to store/know this value**
    * Click **Create Credential** to request new credentials. Once the credential (apiKey / oauth) is provisioned by the provider, you can view its value once. Be sure to store it in a secure place.
    * Click the bin icon to delete existing credentials.

## Delete an application

1. Navigate to the *Marketplace*.
2. Select **Applications** and find the application you need to delete.
3. Click the **bin icon** to trigger the application deletion. All associated access requests and credentials attached to the application are also deleted.