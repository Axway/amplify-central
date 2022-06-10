---
title: Consumer journey
linkTitle: Consumer journey
weight: 20
---

The consumer journey within the marketplace can be summarized through a number of steps:

* Browsing the marketplace
* Finding a product
* Subscribing to a product
* Requesting access to a product resource
* Requesting credentials for a product resources
* Getting insights of the consumption

## Browsing the marketplace

Consumers can navigate the marketplace anonymously by navigating to the configured Marketplace URL, e.g. <http://acme.marketplace.axway.com>, assuming the marketplace has been set to be publicly accessible in the Marketplace Settings.

As long as the user hasn’t logged in, they can freely explore the published products in the marketplace, but won’t have the ability to subscribe or any other actions until they have logged in.

When you are invited to a private marketplace, you will be required to login to the marketplace by providing your credentials.

## Finding a product

First things is to find the product you need by browsing the product catalog. This catalog is paginated. Using the marketplace filter, you can refine the search with product name and product description.

Each product can be opened to see their details:

* product documentation
* product resources
* product plans

## Subscribing to a product

Once you find the perfect product for your need, you must [subscribe to the product](/docs/manage_marketplace/consumer_experience/subscription_management/#create-a-new-subscription).

Depending on the plan approval (automatic VS manual), your subscription will be automatically approved or set to pending. For being able to continue your journey, you must have an approved subscription. The approval can take more time depending on the provider procedure.

You can [view your subscription status](/docs/manage_marketplace/consumer_experience/subscription_management/#manage-existing-subscriptions) anytime.

## Requesting access to a product resource

Once the subscription is approved, you can start requesting access to the product resource. Each access can be automatically approved or manually approved by the provider. Manual approval will be longer depending on the provider procedure.

For requesting access, you must provide an approved subscription, an application ([existing one](/docs/manage_marketplace/consumer_experience/application_management/#create-a-new-application) or created during the process) and the team who will owns the application.

## Requesting credentials for a product resources

In case the product resource is protected by an API Key or an OAuth credentials, it is required to create credentials once the product resource access is granted. The credential request can be done from several places:

* from the application - Marketplace > Application > navigate to the appropriate resource > Create credential
* from the resource - Marketplace > Product > Resource > Access > navigate to the appropriate application > Create credential
* immediately after the request access if auto approved

The create credential action ask you to select the credentials type you need and any required information to get those credentials provisioned.

Once the credential is provisioned, you will be able to see it, only once from the Marketplace UI. The credential are immediately deleted after the consumer view it for security purpose but it is still part of the Dataplane.

## Getting insights of the consumption

Now that you get a credential, you can consume the product resource.

In case a Traceability Agent monitor the Dataplane traffic, consumer will be able to see their traffic from the [Consumer insights](/docs/manage_marketplace/consumer_experience/consumer_insights) screen