---
title: Custom billing integration
linkTitle: Custom billing integration
weight: 310
---

Learn how to implement a billing integration system to manage your consumer subscription invoices created from the Amplify Enterprise Marketplace.

## Overview

Use billing integration to help manage the invoices for consumer organization subscriptions and collect money from the product monetization.

When billing integration is enabled for a specific Marketplace, each subscription originating from a consumer organization of this Marketplace will produce invoices:

* One after the subscription approval time to start the trusted period with the customer and pay the base price plan cost
* One at the end of each plan metering period to pay for the base plan price + the metering period consumption
* A final one when the subscription is cancelled to pay the remaining consumption (from last metering period until the cancellation time)

Until the payment of the first invoice, consumer cannot request access to any product resources. The invoice has to be paid first to start the trusted period.

For this custom billing integration to work, 3 steps are required:

Step 1: [Activate the custom billing integration](#activate-the-custom-billing-integration)

Step 2: [Listen to invoices event](#listen-to-invoices-event)

Step 3 [Managing the flows between the Marketplace and the payment Gateway](#managing-the-flows-between-the-marketplace-and-the-payment-gateway):

* Invoice creation flow in the billing Gateway
* Invoice paid flow
* Invoice past due flow
* Invoice void flow

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
Save your changes

Now that the billing integration is activated, you can start listening for invoices generation

## Listen to invoices event

Every time an invoice object is changed on Amplify Enterprise Marketplace for any reason, an event is triggered. That event will contain the invoice information (amount / currency / state and status)

```json
{
  "id": "d2744f2b-6d0d-4fa8-87f6-05fa26a7d6f5",
  "time": "2024-04-05T15:30:50.200+0000",
  "version": "v1",
  "product": "AmplifyCentral",
  "correlationId": "c6b7067a-2e82-45f7-972f-420fe6f105d4",
  "organization": {
    "id": "8243xxxxx"
  },
  "type": "SubResourceUpdated",
  "payload": {
    "finalizers": [],
    "metadata": {
      "id": "8ac98ee28ea29652018eaee2253601ac",
      "audit": {
        "createTimestamp": "2024-04-05T15:30:40.054+0000",
        "createUserId": "69a10405-6fd2-4dd1-8df5-c444934166ec",
        "modifyTimestamp": "2024-04-05T15:30:40.054+0000",
        "modifyUserId": "69a10405-6fd2-4dd1-8df5-c444934166ec"
      },
      "scope": {
        "id": "8ac98ee28ea29652018eaee223810197",
        "kind": "Subscription",
        "name": "demo-custom-flow",
        "title": "demo custom flow",
        "selfLink": "/catalog/v1alpha1/subscriptions/demo-custom-flow"
      },
      "acl": [],
      "resourceVersion": "0",
      "references": [
        {
          "id": "8ac9853a8e9a7b5b018e9a9695a90119",
          "kind": "ProductPlan",
          "name": "with-setup-cost",
          "type": "hard",
          "selfLink": "/catalog/v1alpha1/productplans/with-setup-cost",
          "group": "catalog"
        },
        {
          "id": "8ac992a58b976549018b97a29ce102c3",
          "kind": "Marketplace",
          "name": "8275212a-fb48-4b55-9305-473fbd507817",
          "type": "hard",
          "selfLink": "/catalog/v1/marketplaces/8275212a-fb48-4b55-9305-473fbd507817",
          "group": "catalog"
        }
      ],
      "selfLink": "/catalog/v1alpha1/subscriptions/demo-custom-flow/subscriptioninvoices/8ac98ee28ea29652018eaee223810197"
    },
    "marketplace": {
      "name": "8275212a-fb48-4b55-9305-473fbd507817",
      "resource": {
        "owner": {
          "id": "cd824ab7-af8d-4933-83f8-450662cca4d4",
          "type": "team",
          "organization": {
            "id": "419190740785802"
          }
        }
      }
    },
    "kind": "SubscriptionInvoice",
    "title": "Initial Payment",
    "spec": {
      "cost": {
        "plan": {
          "cost": 20,
          "name": "with-setup-cost",
          "setup": {
            "cost": 100
          }
        },
        "total": 120
      }
    },
    "tags": [],
    "billing": {
      "payment": {
        "type": "custom"
      }
    },
    "apiVersion": "v1alpha1",
    "name": "8ac98ee28ea29652018eaee223810197",
    "attributes": {},
    "state": {
      "name": "draft"
    },
    "group": "catalog",
    "status": {
      "level": "Pending"
    }
  },
  "metadata": {
    "subresource": "status"
  }
}
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

* **Pending**: action is in progress
* **Success**: action is successful
* **Error**: action in unsuccessful

For Success and Error, an additional message is available to help understand the status.

For listening to the invoices event, there are 2 possibilities:

1. use the webhook mechanism
2. use a gRPC client

### webhooks

The webhook method is simple but there is no retry mechanism which mean if you failed to receive and event, there is no way to retrieve it later.

You can use either the Amplify central CLI or Amplify central API to manage the webhook.

More information regarding webhooks and their security can be found [here](/docs/integrate_with_central/integrate_with_webhooks)

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

{{< alert title="Note" color="primary" >}}
A secret can be used and attached to the webhook specification so that each time en event is received you know it is coming from this specific webhook. Refer to [webhook advanced setup](/docs/integrate_with_central/webhook#using-a-secret)
{{< /alert >}}

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

In order to receive the event via a gRPC connection, you will need to create a **WatchTopic** . This WatchTopic (works similarly to the resourceHook) will receive all the invoice event and this is the place a gRPC client will listen to.

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

Event in the WatchTopic are sequential. They remain in the WatchTopic for 7 days. You can ask for all the events (no filter in the query) or events after a specific sequence number (`?query=sequence>=xxx`).

```json
curl --location 'https://apicentral.axway.com/events/management/v1alpha1/watchtopics/track-subscriptions-invoices?sort=sequenceID%2CDESC' \
--data ''
```

Then you need to build a specific client based on our [Agent SDK](https://github.com/Axway/agent-sdk) to listen to the WatchTopic.

Sample of gRPC client source code: <https://github.com/Axway/agent-sdk/tree/main/samples/watchclient>

You must compile this source code with go compiler to get the executable: `go make`

For this client to run you will need an Amplify Service Account with Central Admin rights. The service account key pair needs to be in the same directory than the gRPC client.

Starting the gRPC client

```cmd
./watchclient --auth.client_id=<sa_client_id> --tenant_id=<organization_id> --host=apicentral.axway.com --port=443 --topic_self_link=/management/v1alpha1/watchtopics/track-subscriptions-invoices --log_level=debug --auth.url="
https://login.axway.com/auth"
```

Using the above queries, the gRPC client can process any event and manage some failover by keeping track of the event sequence number. Like this, you can for instance save locally the latest processed sequence and, on client restart, process the event that may have been missed while the client was down.

Now that you can receive the invoice events, it is time to manage them and create the corresponding flows on the payment Gateway

## Managing the flows between the Marketplace and the payment Gateway

### Invoice creation flow in the billing Gateway

When receiving a new invoices via webhook or watchTopic, it is the responsibility of the implementation to correctly create the invoice on the billing Gateway with the supplied information (currency / amount / details) and then report back to Amplify Enterprise Marketplace the billing link and the invoice state/status.

First check that the received event has an invoice with `state=draft` and `metadata.subresource.status=pending`.

Then the flow needs to create the corresponding invoice in the Billing Gateway. This step depends on the billing Gateway capabilities.

Lastly, the flow needs to update the invoice on the Amplify Enterprise Marketplace to reflect the information.

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
                "due": {AMOUNT DUE COMING FROM BILLING GATEWAY}
                "currency": "{CURRENCY}",
                "total": {TOTAL AMOUNT DUE COMING FROM MARKETPLACE}
            }
        }
    }
}'
```

{{< alert title="What is the difference between `due` and `total`?" color="primary" >}}
The **total** property is the current invoice amount originated from Marketplace invoicing system.  

The **due** is total amount plus any extra amount (taxes / past due invoices...) that needs to be billed to the consumer.
{{< /alert >}}

And updating the invoice state:

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

Once the invoice due date is reached, Amplify Enterprise Marketplace will raise a new invoice event: `state=pastDue` / `metadata.subresource.status=pending`.

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

When receiving such event: `state=void` / `metadata.subresource.status=pending`, you can decide what to do on the billing Gateway. For instance, set the invoice as not collectible or completely delete it from the billing Gateway.

Once done on the Billing Gateway, the corresponding invoice in Amplify Entreprise Marketplace needs to be updated to whichever status make sense `Success` or `Error` as follows:

```json
curl --location --request PUT 'https://apicentral.axway.com/apis/catalog/v1alpha1/subscriptions/{SUBSCRIPTION_ID}/subscriptioninvoices/{SUBSCRIPTION_INVOICE_ID}/status' \
--data '{   
     "status": {
        "level": "Success",
        "reasons": [
            {
                "type": "Success",
                "detail": "Action taken to clarify the situation with the consumer",
                "timestamp": "2024-04-04T22:29:46.256+0000"
            }
        ]
    }
}'
```

### Troubleshooting and error management

In case the invoice status is set to `Error` and you want to process it again, simply change the status back to `Pending` so that an event will be trigger again and caught by the webhook/WatchTopic.

If you need to reprocess pending invoice, you can still call this API: `AMPLIFY_CENTRAL_URL/apis/catalog/v1alpha1/subscriptioninvoices?query=billing.payment.type==custom;state.name==draft;status.level==Pending`
