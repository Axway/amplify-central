---
title: Marketplace billing
linkTitle: Marketplace billing
weight: 45
---

Setup the billing integration to enable consumers from consumer organization to pay for their product consumption.

## Before you start

You must have a platform administrator credentials or a Marketplace Manager credential to enable the Stripe integration.
You must have a Stripe account to manage all the invoices for your customer.

## Objectives

Learn how to setup the billing integration to generate invoices for **consumer organization subscription**.

## Overview

The billing integration is helping to manage the invoices for consumer organization only and collect money from the product monetization.

When the billing integration is enable for a specific marketplace, each subscription originated from a consumer organization of this marketplace will produce invoices:

* one at subscription time to start the trusted period with the customer and pay the base price plan cost
* one at the end of each plan metering period to pay for the base plan price + the metering period consumption
* a final one when the subscription is cancelled to pay the remaining consumption (from last metering period until the cancellation time)

Those invoices must be paid using a third party payment tool. The first implementation is using [Stripe](https://stripe.com) for the invoice payment.

{{< alert title="Note" color="primary" >}}
Until the first invoice is fully paid, customer can request access to the resources but the access itself will not be granted until the payment is collected by the provider.
{{< /alert >}}

## Stripe account configuration

The communication between Stripe and the Marketplace is bi-directional:

* from Marketplace to Stripe to create invoices. This is done using Stripe APIs and a dedicated restricted API Key.
* from Stripe to Marketplace to get the invoice status. This is done using a webhook that post event into the Marketplace.

All customer payments are done using the Stripe billing portal.

### Accessing Stripe using Stripe API and API Key

You need first to check that Stripe is set to use the 2022-11-15 API version Refer to [this page](https://stripe.com/docs/libraries/set-version).

For Marketplace to be able to access Stripe account, an API key is required. For security constraints we will use a restricted API Key with the minimum access possible: Customer:Write and Invoices:Write rights.

1. log into Stripe
2. Search for API key and navigate to the link **Developers > API Keys**
3. Create a new restricted key
   1. name it Amplify Marketplace Integration
   2. add the following permissions: Core resource: **Customers -Write-** / All billing resources: **Invoices -Write-**
4. Click the Create key button. The key is created and visible under the Restricted key list
5. Use the **Reveal test key** button to get the key value. We will need it later on the Marketplace side.

### Sending Stripe events to Marketplace

The invoice source of record is located in Stripe but the Marketplace needs to know the invoice status and their changes to present them to the consumer. For that we will use a webhook to communicate from Stripe to the Marketplace.

1. log into Stripe
2. Search for webhook and navigate to the link **Developers > API Keys**
3. Click **Add an endpoint**
4. Enter the endpoint url: `https://apicentral.axway.com/integrations/stripe` or `https://central.ap-sg.axway.com/integrations/stripe` or `https://central.eu-fr.axway.com/integrations/stripe` based on your Amplify organization location.
5. Add a description to enable recognize this webhook (Amplify Marketplace feeding invoice status for instance)
6. Add the events to listen to:
   1. invoice.finalized
   2. invoice.marked_uncollectible
   3. invoice.paid
   4. invoice.voided
7. Click Add endpoint to save your endpoint.

### Enable the Billing Customer portal to your Stripe account

1. log into Stripe
2. Search for portal and navigate to the link **Settings > Billing > Customer portal**
3. Enable the billing portal and key the url. We will need it later on the Marketplace side.

## Enable the Stripe integration in the Marketplace

To enable the Stripe integration, either an Administrator or a Marketplace Manager can update the settings.

1. Navigate to *Organization > Marketplaces*.
2. Select **Billing** tab.
3. Enable the billing integration
4. Select the Vendor Stripe from the dropdown
5. Enter the Restricted Key. This is the Stripe API Key generated earlier
6. Enter the webhook Signature - this will be added be Stripe each time the webhook is called.
7. Enter the Customer portal url. This is the Stripe Billing Portal url
8. Click Save

Now each time a consumer from the consumer organization of the marketplace subscribe to a product, a first invoice with the base price plan will be generated. Consumer will not be able to request access to product resources until this first invoice is paid within Stripe portal.

On a monthly basis or annual basis depending on the plan metering period, a new invoice will be generated based on the consumer consumption. The invoice will be added to the subscription invoices list with the link to pay it.

Once the consumer terminate his subscription, a final invoice is generated with the usage consumed between the last invoice and now.