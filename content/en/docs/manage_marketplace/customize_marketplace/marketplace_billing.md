---
title: Marketplace billing
linkTitle: Marketplace billing
weight: 45
---

Set up the billing integration to enable consumers from consumer organization to pay for their product consumption.

## Before you start

* You must have either a platform Administrator or a Marketplace Manager credential to enable the Stripe integration.
* You must have a Stripe account to manage all invoices for your customer.

## Objectives

Learn how to set up the billing integration to generate invoices for **consumer organization subscription**.

## Overview

Use billing integration to help manage the invoices for consumer organization subscriptions and collect money from the product monetization.

When billing integration is enabled for a specific Marketplace, each subscription originating from a consumer organization of this Marketplace will produce invoices:

* One at subscription time to start the trusted period with the customer and pay the base price plan cost
* One at the end of each plan metering period to pay for the base plan price + the metering period consumption
* A final one when the subscription is cancelled to pay the remaining consumption (from last metering period until the cancellation time)

The invoices must be paid using a third-party payment tool. The first implementation is using [Stripe](https://stripe.com) for the invoice payment.

{{< alert title="" color="primary" >}}
Until the first invoice is fully paid, the customer can request access to the resources but the access itself will not be granted until the provider collects the payment.
{{< /alert >}}

## Stripe account configuration

The communication between Stripe and the Marketplace is bi-directional:

* From Marketplace to Stripe to create invoices. This is done using Stripe APIs and a dedicated restricted API Key.
* From Stripe to Marketplace to get the invoice status. This is done using a webhook that posts the event into the Marketplace.

All customer payments are done using the Stripe billing portal.

### Accessing Stripe using Stripe API and API Key

You must first check that Stripe is set to use the 2022-11-15 API version. Refer to [this page](https://stripe.com/docs/libraries/set-version).

For Marketplace to access the Stripe account, an API key is required. For security constraints we use a restricted API Key with minimum access: Customer:Write and Invoices:Write rights.

1. Log into Stripe.
2. Search for API key and navigate to the link **Developers > API Keys**.
3. Create a new restricted key:
    * Name it *Amplify Marketplace Integration*
    * Add the following permissions: Core resource: **Customers -Write-** / All billing resources: **Invoices -Write-**

4. Click **Create key**. The key is created and visible under the Restricted key list.
5. Click **Reveal test key** to get the key value. You will need it later on the Marketplace side.

{{< alert title="Note" color="primary" >}}When the key is changed on Stripe account, be sure to update it on the Marketplace > Billing > Restricted Key value.{{< /alert >}}

### Sending Stripe events to Marketplace

The invoice source of record is located in Stripe, so a webhook is used to communicate invoice status / changes from Stripe to the Marketplace.

1. Log into Stripe.
2. Search for webhook and navigate to the link **Developers > Webhooks**.
3. Click **Add an endpoint**.
4. Enter the endpoint url: `https://apicentral.axway.com/integrations/stripe` or `https://central.ap-sg.axway.com/integrations/stripe` or `https://central.eu-fr.axway.com/integrations/stripe`, based on your Amplify organization location.
5. Add a description so you can recognize this webhook (e.g., Amplify Marketplace feeding invoice status).
6. Add the events to listen to:
    * invoice.finalized
    * invoice.marked_uncollectible
    * invoice.paid
    * invoice.voided

7. Click **Add events**.
8. Click **Add endpoint** to save your endpoint.

Reveal the Signing secret as you will need it later on the Marketplace side.

### Enable the Billing Customer portal to use with your Stripe account

This portal will help the Stripe customers to see their information: billing address / payment information and invoices.

1. Log into Stripe.
2. Search for portal and navigate to the link **Settings > Billing > Customer portal**.
3. Enable the billing portal and copy the URL. We will need it later on the Marketplace side.

## Enable the Stripe integration in Marketplace

You must be either an Administrator or a Marketplace Manager to update the settings to enable the stripe integration.

1. Navigate to *Organization > Marketplaces*
2. Select the **Billing** tab.
3. Enable the billing integration
4. Select the Vendor **Stripe** from the drop down.
5. Enter the Restricted Key. This is the Stripe API Key you generated earlier.
6. Enter the webhook Signature. This is the Signing secret of the Stripe webhook. This will be added by Stripe, as the header, when posting the event to Marketplace. Marketplace can then validate the incoming event and reject it if the signature does not match.
7. Enter the Customer portal URL. This is the Stripe billing portal URL.
8. Click **Save**.

Each time a consumer from the consumer organization of the Marketplace subscribe to a product, a first invoice with the base price plan is generated. The consumer cannot request access to product resources until this first invoice is paid within Stripe portal.

On a monthly or annual basis, depending on the plan metering period, a new invoice is generated that is based on the consumer consumption. The invoice is added to the subscription invoices list with the link to pay it.

Once the consumer terminates the subscription, a final invoice is generated based on the usage consumed between the last invoice and termination.

## Troubleshooting

Once all the settings are in place and to ensure the proper communication between Stripe and the Marketplace, we recommend to:

* Create a dummy consumer organization
* Create a dummy product with a paid plan
* Publish the product and make it visible to the consumer organization only
* Navigate to the marketplace and connect with the user from the consumer organization
* Subscribe to the dummy product and pay for the generated invoice

When everything works fine, the user should be able to see the paid invoice associated to his subscription from the subscription details page.

If something went wrong, one of the below question should be able to fix the issue.

| Question                                                                             | Answer                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What to do if the invoice is not generated?                                          | This means that the Marketplace is not able to communicate properly with Stripe. Please check that the Stripe API key and validate that the corresponding key is used under the Marketplace > Billing > Restricted key. Refer to [Accessing Stripe using Stripe API and API Key](#accessing-stripe-using-stripe-api-and-api-key) to get the Stripe API Key.                                                                |
| Why the invoice status in Stripe is different from the one I see on the Marketplace? | This mean that Stripe is not able to communicate back to the Marketplace using Stripe Webhook. Either the webhook is disabled, or the webhook url is incorrect or the Signing signature is different. Please check those parameters in Stripe (Refer to [Sending Stripe events to Marketplace](#sending-stripe-events-to-marketplace)) and compare the Signing signature in the Marketplace > Billing > Webhook Signature. |
| My provider user does not have access to the invoice checkout.                       | This is normal behavior. Only Consumer organization users will be billed for their subscription usage.                                                                                                                                                                                                                                                                                                                     |