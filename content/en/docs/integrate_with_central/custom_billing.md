---
title: Custom billing integration
linkTitle: Custom billing integration
weight: 110
---

Learn how to implement a billing integration system to manage your consumer subscription invoices created from the Amplify Enterprise Marketplace.

## Overview

Use billing integration to help manage the invoices for consumer organization subscriptions and collect money from the product monetization.

When billing integration is enabled for a specific Marketplace, each subscription originating from a consumer organization of this Marketplace will produce invoices:

* One at subscription time to start the trusted period with the customer and pay the base price plan cost
* One at the end of each plan metering period to pay for the base plan price + the metering period consumption
* A final one when the subscription is cancelled to pay the remaining consumption (from last metering period until the cancellation time)

Until the payment of the first invoice, consumer cannot request access to any product resources. The invoice has to be paid first to start the trusted period.

For this custom billing integration to work, 3 steps are required:

Step 1: [Activate the custom billing integration](#activate-the-custom-billing-integration)

Step 2: [Listen to invoices event](#listen-to-invoices-event)

Step 3 [Managing the flows between the Marketplace and the payment Gateway](#managing-the-flows-between-the-marketplace-and-the-payment-gateway)

{{< alert title="Note" color="primary" >}}
All the query sample in this section are based on the US region for Amplify. The URL needs to be changed to the following:

* EU region: <https://central.eu-fr.axway.com>
* APAC region: <https://central.ap-sg.axway.com>
{{< /alert >}}

## Activate the custom billing integration

To activate the billing integration, you need to change the Marketplace settings.

Navigate to Marketplace settings page.
Select the Billing tab
Enable the billing toggle
From the Vendor dropdown, select **Custom**
Name your vendor in the dedicated field
Save your changes

Now that the billing integration is activated, you can start listening for invoices generation

## Listen to invoices event

Every time an invoice object is changed on Amplify Enterprise Marketplace for any reason, an event is triggered. That event will contain the invoice information (amount / currency / state and status)

```json
TODO Add event sample here.
```

### Invoice state and status

Invoice can have the following state:

* **draft**: invoice has been created by Amplify Enterprise Marketplace system and is ready to be consumed by the billing Gateway flow.
* **open**: invoice has been created in the billing Gateway and is ready to be paid by the consumer.
* **paid**: invoice has been paid by the consumer.
* **incomplete**: status set by the Billing System in case of issues. No action will be taken by the Amplify Enterprise Marketplace.
* **pastDue**: the invoice has not been paid on time.
* **void**: the invoice will never be paid by the consumer. This happen when consumer cancel his subscription before paying his first invoice.

Each state can be associated to one of the following status:

* **pending**: action is in progress
* **success**: action is successful
* **error**: action in unsuccessful

For success and error, an additional message is available to help understand the status.

For listening to the invoices event, there are 2 possibilities:

1. use the webhook mechanism
2. use a gRPC client

### webhooks

The webhook method is simple but there is no retry mechanism which mean if you failed to receive and event, there is no way to retrieve it later.

You can use either the Amplify central CLI or Amplify central API to manage the webhook.

More information regarding webhooks can be found [here](/docs/integrate_with_central/integrate_with_webhooks)

curl command to create the Integration:

```json
curl --location 'https://apicentral.axway.com/apis/management/v1alpha1/integrations' \
--data '{
    "group": "management",
    "apiVersion": "v1alpha1",
    "kind": "Integration",
    "name": "monitor-subscription-invoices",
    "title": "Monitor Subscription Invoices",
    "spec": {
        "description": "Monitors Subscription invoices."
    }
}'
```

curl command to create the webhook:

```json
curl --location 'https://apicentral.axway.com/apis/management/v1alpha1/integrations/monitor-subscription-invoices/webhooks' \
--data '{
    "name": "webhook-site",
    "spec": {
        "url": "YOUR ENDPOINT TO RECEIVE INVOICE EVENTS",
        "enabled": true,
        "headers": {
            "Content-Type": "application/json"
        }
    }
}'
```

curl command to create the resource hook definition:

```json
curl --location 'https://apicentral.axway.com/apis/management/v1alpha1/integrations/monitor-subscription-invoices/resourcehooks' \
--data '{
    "group": "management",
    "apiVersion": "v1alpha1",
    "kind": "ResourceHook",
    "name": "monitor-subscription-invoices",
    "title": "Resource Hook to monitor SubscriptionInvoices",
    "spec": {
        "triggers": [
            {
                "kind": "SubscriptionInvoice",
                "name": "*",
                "type": [
                    "updated"
                ],
                "scope": {
                    "kind": "Subscription",
                    "name": "*"
                },
                "group": "catalog"
            }
        ],
        "webhooks": [
            "webhook-site"
        ]
    }
}'
```

### gRPC client

The gRPC connectivity is more complex than the webhook but more robust as you can keep track on the incoming events.

For that you need to build a specific client based on our [Agent SDK](https://github.com/Axway/agent-sdk).

Sample of gRPC client:

```go
TODO sample here
```

In order to receive the event, you will need to create a **WatchTopic**. This WatchTopic (works similarly to the resourceHook) will receive all the invoice event and this is the place the gRPC client will listen to.

```json
curl --location 'https://apicentral.axway.com/apis/management/v1alpha1/watchtopics' \
--data '{
    "group": "management",
    "apiVersion": "v1alpha1",
    "kind": "WatchTopic",
    "name": "track-subscriptions-invoices",
    "title": "Monitor subscription invoices",
    "spec": {
        "filters": [
            {
                "kind": "SubscriptionInvoice",
                "name": "*",
                "type": [
                    "updated"
                ],
                "scope": {
                    "kind": "Subscription",
                    "name": "*"
                },
                "group": "catalog"
            }
        ],
        "description": "Watch Topic for monitoring subscription invoices."
    }
}'
```

Reading event from WatchTopic:

Event in the WatchTopic are sequential. They remain in the WatchTopic for XX days. You can ask for all the events (no filter in the query) or events after a specific sequence number (`?query=sequence>=xxx`).

```json
curl --location 'https://apicentral.axway.com/events/management/v1alpha1/watchtopics/track-subscriptions-invoices?sort=sequenceID%2CDESC' \
--data ''
```

Using the above queries, the gRPC client can process any event and manage some failover by keeping track of the event sequence number. Like this, you can for instance save locally the latest processed sequence and, on client restart process the event that may have been missed while the client was down.

Now that you can receive the invoice events, it is time to manage them and create the corresponding flows on the payment Gateway

## Managing the flows between the Marketplace and the payment Gateway

### Invoice creation flow in the billing Gateway

When receiving a new invoices via webhook or watchTopic, it is the responsibility of the implementation to correctly create the invoice on the billing Gateway with the supplied information (currency / amount / details) and then report back to Amplify Enterprise Marketplace the billing link and the invoice state/status.

First check that the received event has an invoice with `state=draft` and `status=pending`.

Then the flow needs to create the corresponding invoice in the Billing Gateway. This step depends on the billing Gateway.

Lastly, the flow need to update the invoice on the Amplify Enterprise Marketplace to reflect the information.

Adding the invoice link payment so that the consumer will be able to navigate from the Marketplace to the billing Gateway payment screen.

```json
curl --location --request PUT 'https://apicentral.axway.com/apis/catalog/v1alpha1/subscriptions/{SUBSCRIPTION_ID}/subscriptioninvoices/{SUBSCRIPTION_INVOICE_ID}/billing' \
--data '{
    "billing": {
        "payment": {
            "type": "custom",
            "id": "{INVOICE ID IN THE BILLING GATEWAY}",
            "number": "{INVOICE ID DISPLAYED IN THE MARKETPLACE UI}",
            "issueDate": "2024-04-02T20:45:30.112+0000",
            "customer": {
                "id": "{CUSTOMER IDENTIFIER}"
            },
            "link": "{BILLING GATEWAY PAYMENT LINK}",
            "amount": {
                "due": {AMOUNT DUE FROM MARKETPLACE},
                "currency": "{CURRENCY}",
                "total": {TOTAL AMOUNT DUE}
            }
        }
    }
}'
```

And updating the invoice state/status

```json
curl --location --request PUT 'https://apicentral.axway.com/apis/catalog/v1alpha1/subscriptions/{SUBSCRIPTION_ID}/subscriptioninvoices/{SUBSCRIPTION_INVOICE_ID}/state' \
--data '{   
    "state": {
        "name": "open",
        "reason": "generated and ready in billing Gateway"
    }
}'
```

### Invoice paid flow

Once the payment is received on the billing Gateway, the corresponding invoice state needs to be updated to reflect that and allow consumer to start consuming associated API.

```json
curl --location --request PUT 'https://apicentral.axway.com/apis/catalog/v1alpha1/subscriptions/{SUBSCRIPTION_ID}/subscriptioninvoices/{SUBSCRIPTION_INVOICE_ID}/state' \
--data '{   
    "state": {
        "name": "paid",
        "reason": "invoice paid"
    }
}'
```

### Invoice past due flow

Once the invoice due date is reached, Amplify Enterprise Marketplace will raise a new invoice event: `state=pastDue` / `status=pending`.

it is possible to take action on the provider side to reach out the consumer to see why the invoice is not paid yet. Once the clarification has been made with the consumer, we recommend to change the status to Success as follows:

```json
curl --location --request PUT 'https://apicentral.axway.com/apis/catalog/v1alpha1/subscriptions/{SUBSCRIPTION_ID}/subscriptioninvoices/{SUBSCRIPTION_INVOICE_ID}/status' \
--data '{   
     "status": {
        "level": "Success",
        "reasons": [
            {
                "type": "Success",
                "detail": "Action taken to clarify the situation with the consumer (sent email to customer that invoice is due)",
                "timestamp": "2024-04-02T22:29:46.256+0000"
            }
        ]
    }
}'
```

### Invoice void flow

When the initial subscription invoice has never been paid and the consumer decided to terminate his subscription, the existing invoice is put in the **void** state.

When receiving such event: `state=void` / `status=pending`, you can decide what to do on the billing Gateway. For instance, set the invoice as not collectible or completely delete it from the billing Gateway.