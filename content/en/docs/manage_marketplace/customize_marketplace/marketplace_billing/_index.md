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

* One after the subscription approval time to start the trusted period with the customer and pay the base price plan cost
* One at the end of each plan metering period to pay for the base plan price + the metering period consumption. This is automatically triggered at 2 am following the last day of the month to accommodate any end-of-day Traceability Agent usage reporting.
* A final one when the subscription is cancelled to pay the remaining consumption (from last metering period until the cancellation time)

The invoices must be paid using a third-party payment tool. The available implementations are [Stripe](#stripe-billing-integration), [MyFatoorah](#myfatoorah-billing-integration) or a [custom integration](/docs/integrate_with_central/custom_billing).

{{< alert title="Note" color="primary" >}}
Until the first invoice is fully paid, the customer can request access to the resources but the access itself will not be granted until the provider collects the payment.
{{< /alert >}}

Each invoice will follow this lifecycle status:

* **Draft**: the invoice has been generated on the Marketplace side but not submitted to the billing system
* **Open**: the invoice has been successfully submitted to the billing system
* **Paid**: the invoice has been paid in the billing system and its status is synchronized in the Marketplace

## Choosing your integration: natives or custom

Amplify Enterprise Marketplace natives billing integrations are based on [Stripe](#stripe-billing-integration) or [MyFatoorah](#myfatoorah-billing-integration). Follow the previous links to learn how to set up and use those billing systems.

If you are not working with Stripe or MyFatoorah, you can choose to implement your own integration based on the Amplify Enterprise Marketplace APIs and the 3rd party payment Gateway of your choice. This custom integration and the mandatory steps is described in [Custom billing integration](/docs/integrate_with_central/custom_billing).

## Stripe billing integration

The Stripe platform is available at [stripe.com](https://stripe.com).

### Stripe account configuration

The communication between Stripe and the Marketplace is bi-directional:

* From Marketplace to Stripe to create invoices. This is done using Stripe APIs and a dedicated restricted API Key.
* From Stripe to Marketplace to get the invoice status. This is done using a webhook that posts the event into the Marketplace.

All customer payments are done using the Stripe billing portal.

#### Accessing Stripe using Stripe API and API Key

Marketplace Stripe billing integration supports both 2024-06-20 and 2022-11-15 API versions, but we recommended that you use the latest 2024-06-20. Refer to [this page](https://stripe.com/docs/libraries/set-version).

If your Stripe account does not use either of these versions, you might need to use the Stripe API directly instead of the Stripe UI for certain actions explained in this documentation.

For Marketplace to access the Stripe account, an API Key is required. For security constraints a restricted API Key with minimum access is used: Customer:Write and Invoices:Write rights.

1. Log into Stripe.
2. Search for API Key and navigate to the link **Developers > API Keys**.
3. Create a new restricted key:
    * Name it *Amplify Marketplace Integration*
    * Add the following permissions: Core resource: **Customers -Write-** / All billing resources: **Invoices -Write-**

4. Click **Create key**. The key is created and visible under the Restricted key list.
5. Click **Reveal test key** to get the key value. You will need it later on the Marketplace side.

{{< alert title="Note" color="primary" >}}When the key is changed on the Stripe account, be sure to update it on the Marketplace > Billing > Restricted Key value.{{< /alert >}}

#### Sending Stripe events to Marketplace

The invoice source of record is in Stripe, so a webhook is used to communicate invoice status / changes from Stripe to the Marketplace.

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

Reveal the Signing secret, as you will need it later on the Marketplace side.

{{< alert title="Note" color="primary" >}}
Although both 2022-11-15 and 2024-06-20 API versions are supported, your Stripe account might not allow you to create a webhook with either of these versions.

Instead, use the [Postman Stripe API collection](https://www.postman.com/stripedev/workspace/stripe-developers/request/665823-60d86321-4c13-47be-a1f1-77f80443ab50?tab=body) to create the webhook and enter **2024-06-20** in the *api_version* field.
{{< /alert >}}

#### Enabling the Billing Customer portal to use with your Stripe account

This portal will help the Stripe customers to see their information: billing address / payment information and invoices.

1. Log into Stripe.
2. Search for portal and navigate to the link **Settings > Billing > Customer portal**.
3. Enable the billing portal and copy the URL. We will need it later on the Marketplace side.

### Enable the Stripe integration in Marketplace

You must be either an Administrator or a Marketplace Manager to update the settings to enable the stripe integration.

1. Navigate to *Organization > Marketplaces*
2. Select the **Billing** tab.
3. Enable the billing integration
4. Select the Vendor **Stripe** from the dropdown.
5. Enter the Restricted Key. This is the Stripe API Key you generated earlier.
6. Enter the webhook Signature. This is the Signing secret of the Stripe webhook. This will be added by Stripe, as the header, when posting the event to Marketplace. Marketplace can then validate the incoming event and reject it if the signature does not match.
7. Enter the Customer portal URL. This is the Stripe billing portal URL.
8. Click **Save**.

Each time a consumer from the consumer organization of the Marketplace subscribes to a product, a first invoice with the base price plan (setup cost and/or recurring fees) is generated. The consumer cannot request access to product resources until this first invoice is paid within the Stripe portal.

On a monthly or annual basis, depending on the plan metering period, a new invoice is generated that is based on the consumer consumption and the recurring plan base price (if any). The invoice is added to the subscription invoices list, along with the link to pay it. The invoice status is **Open** until the consumer pays the invoice. Once paid and the event from Stripe received, the invoice status changes to **Paid**.

Once the consumer terminates the subscription, a final invoice is generated based on the usage consumed between the last invoice and termination. The invoice status is **Open** until the consumer pays the invoice in the Stripe system.

{{< alert title="Note" color="primary" >}}If the first invoice is not paid before the consumer terminates their subscription, the invoice status will remain **Open**.{{< /alert >}}

### Troubleshooting the Stripe integration

It is recommended that you test the communication between Stripe and the Marketplace once the billing integration setup is done:

* Create a dummy consumer organization
* Create a dummy product with a paid plan
* Publish the product and make it visible to the consumer organization only
* Navigate to the Marketplace and connect with the user from the consumer organization
* Subscribe to the dummy product and pay for the generated invoice

A paid invoice associated to the subscription should be visible on the subscription details page.

If something went wrong, see the following:

| Question                                                                             | Answer                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What if the invoice is not generated?                                                | The Marketplace is not communicating properly with Stripe. Check the Stripe API Key value and validate that the corresponding key value is used under the Marketplace > Billing > Restricted key. See [Accessing Stripe using Stripe API and API Key](#accessing-stripe-using-stripe-api-and-api-key) to get the Stripe API Key.                                                         |
| Where are the invoices visible in Amplify platform?                                   | As a provider, you can view all invoices related to subscriptions using one of the products your team is managing by navigating to Amplify Central > Marketplace > Invoices. If there is an error, you will see it there. If there is no error, you will be able to access the invoice details. |
| Why is the invoice status in Stripe different from the one I see on the Marketplace? | Stripe cannot communicate back to the Marketplace using the Stripe Webhook. Either the webhook is disabled, the webhook URL is incorrect or the Signing signature is different. Check the parameters in Stripe (see [Sending Stripe events to Marketplace](#sending-stripe-events-to-marketplace)) and compare the Signing signature in the Marketplace > Billing > Webhook Signature.   |
| My provider user does not have access to the invoice checkout.                       | This is normal behavior. Only Consumer organization users will be billed for their subscription usage.                                                                                                                                                                                                                                                                                        |
| Why is my invoice automatically paid?                                                |  Depending on the plan currency, Stripe will automatically mark the invoice as paid if the invoice total in under the minimum charted. Refer to [Minimum and maximum charge amounts](https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts). |

## MyFatoorah billing integration

The MyFatoorah platform is available at [myfatoorah.com](https://portal.myfatoorah.com/En/All/Account/LogIn).

### MyFatoorah account configuration

The communication between MyFatoorah and the Marketplace is bi-directional:

* From Marketplace to MyFatoorah to create invoices. This is done using MyFatoorah APIs and a dedicated restricted API Key.
* From MyFatoorah to Marketplace to get the invoice status. This is done using a webhook that posts the event into the Marketplace.

All customer payments are done using the MyFatoorah billing portal.

{{< alert title="Note" color="primary" >}}
**Warning about currency conversion**

My Fatoorah uses currencies that could be converted by the system. If the MyFatoorah account is set up with a currency that is not the one defined in the product plan, the system will apply the current rating conversion between the plan currency and the account default currency to generate the invoice prices. This can lead to inaccuracies, as the rate conversion rounds the values after the third digit.

To avoid this, use the same currency from the product plan instead of the one configured in the account currency.
{{< /alert >}}

#### Accessing MyFatoorah using MyFatoorah API and API Key

Marketplace MyFatoorah billing integration is currently using MyFatoorah v2 API version. Refer to [this page](https://docs.myfatoorah.com/docs/overview).

For Marketplace to access the MyFatoorah account, an API Key is required. For security constraints a restricted API Key with minimum access is used: Customer:Write and Invoices:Write rights.

1. Log into MyFatoorah.
2. Navigate to the API Key menu **Home > Integration Settings > Api Key**.
3. Click **+ Create**. The key is created and available to copy its value.

{{< alert title="Note" color="primary" >}}When the key is changed on the MyFatoorah account, be sure to update it on the Marketplace > Billing > Restricted Key value.{{< /alert >}}

#### Sending MyFatoorah events to Marketplace

The invoice source of record is in MyFatoorah, so a webhook is used to communicate invoice status / changes from MyFatoorah to the Marketplace.

1. Log into MyFatoorah.
2. Navigate to the webhooks settings **Home > Integration settings > Webhook settings**.
3. Enable the webhook events.
4. Enter the endpoint URL: `https://apicentral.axway.com/integrations/myfatoorah` or `https://central.ap-sg.axway.com/integrations/myfatoorah` or `https://central.eu-fr.axway.com/integrations/myfatoorah`, based on your Amplify organization location.
5. Enable the Secret Key so that all events will be signed with that key and Marketplace can confirm the event origin.
6. Select the events to listen to:
    * Transaction Status Changed
7. Click **Save**.

{{< alert title="Note" color="primary" >}}When the Webhook Secret key is changed on the MyFatoorah account, be sure to update it on the Marketplace > Billing > Webhook Secret Key value.{{< /alert >}}

### Enable the MyFatoorah integration in Marketplace

You must be either an Administrator or a Marketplace Manager to update the settings to enable the MyFatoorah integration.

1. Navigate to *Organization > Marketplaces*
2. Select the **Billing** tab.
3. Enable the billing integration.
4. Select the Vendor **MyFatoorah** from the dropdown.
5. Select the URL endpoint you want to use based on your region of interest (Qatar / Saudi Arabia / Other regions)
6. Enter the API Key. This is the MyFatoorah token you created earlier.
7. Enter the Webhook Secret Key. This is the Signing Secret Key of MyFatoorah webhook. This will be added by MyFatoorah, as the header, when posting the event to Marketplace. Marketplace can then validate the incoming event and reject it if the signature does not match.
8. Click **Save**.

Each time a consumer from the consumer organization of the Marketplace subscribes to a product, a first invoice with the base price plan (setup cost and/or recurring fees) is generated. The consumer cannot request access to product resources until this first invoice is paid within MyFatoorah portal.

On a monthly or annual basis, depending on the plan metering period, a new invoice is generated that is based on the consumer consumption and the recurring plan base price (if any). The invoice is added to the subscription invoices list, along with the link to pay it. The invoice status is **Open** until the consumer pays the invoice. Once paid and the event from MyFatoorah received, the invoice status changes to **Paid**.

Once the consumer terminates the subscription, a final invoice is generated based on the usage consumed between the last invoice and termination. The invoice status is **Open** until the consumer pays the invoice in the MyFatoorah system.

{{< alert title="Note" color="primary" >}}If the first invoice is not paid before the consumer terminates their subscription, the invoice status will remain **Open**.{{< /alert >}}

### Troubleshooting MyFatoorah integration

It is recommended that you test the communication between MyFatoorah and the Marketplace once the billing integration setup is done:

* Create a dummy consumer organization
* Create a dummy product with a paid plan
* Publish the product and make it visible to the consumer organization only
* Navigate to the Marketplace and connect with the user from the consumer organization
* Subscribe to the dummy product and pay for the generated invoice

A paid invoice associated to the subscription should be visible on the subscription details page.

If something went wrong, see the following:

| Question                                                                                 | Answer                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What if the invoice is not generated?                                                    | The Marketplace is not communicating properly with MyFatoorah. Check MyFatoorah API Key value and validate that the corresponding key value is used under the Marketplace > Billing > API Key. See [Accessing MyFatoorah using MyFatoorah API and API Key](#accessing-myfatoorah-using-myfatoorah-api-and-api-key) to get the MyFatoorah API Key.                                                                         |
| Where are the invoices visible in Amplify Platform?                                   | As a provider, you can view all invoices related to subscriptions using one of the products your team is managing by navigating to Amplify Central > Marketplace > Invoices. If there is an error, you will see it there. If there is no error, you will be able to access the invoice details. |
| Why is the invoice status in MyFatoorah different from the one I see on the Marketplace? | MyFatoorah cannot communicate back to the Marketplace using the MyFatoorah Webhook. Either the webhook is disabled, the webhook URL is incorrect or the Signing signature is different. Check the parameters in MyFatoorah (see [Sending MyFatoorah events to Marketplace](#sending-myfatoorah-events-to-marketplace)) and compare the Signing signature in the Marketplace > Billing > Webhook Signature.            |
| My provider user does not have access to the invoice checkout.                           | This is normal behavior. Only Consumer organization users will be billed for their subscription usage.                                                                                                                                                                                                                                                                                                                     |

## Related topic

See the following topic for related information.
