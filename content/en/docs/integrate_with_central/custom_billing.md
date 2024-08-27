---
title: Custom Marketplace billing integration
linkTitle: Custom Marketplace billing integration
weight: 310
---

Learn how to implement a billing integration system to manage your consumer subscription invoices created from the Amplify Enterprise Marketplace.

## Overview

Use billing integration to help manage the invoices for consumer organization subscriptions and collect money from the product monetization.

Once billing integration is enabled for a specific Marketplace, each subscription originating from a consumer organization of that Marketplace will produce invoices:

* After the subscription approval time (to pay the base price plan cost and start the trusted period with the customer)
* At the end of each plan metering period (to pay for the base plan price + the metering period consumption)
* When the subscription is cancelled (to pay the remaining consumption - from last metering period until the cancellation time)

Until the payment of the first invoice, the consumer cannot request access to any product resources. The trusted period begins only after the invoice is paid.

Complete following steps to activate custom billing integration:

Step 1: [Activate the custom billing integration](#step-1-activate-the-custom-billing-integration)

Step 2: [Listen to invoices event](#step-2-listen-to-invoices-event)

Step 3: [Manage the flows between the Marketplace and the payment Gateway](#step-3-manage-the-flows-between-the-marketplace-and-the-payment-gateway):

* Invoice creation flow in the billing Gateway
* Invoice paid flow
* Invoice past due flow
* Invoice void flow

{{< alert title="Note" color="primary" >}}
The query samples in this section are based on the US region for Amplify. For other regions, the URL must be changed:

* EU region: <https://central.eu-fr.axway.com>
* APAC region: <https://central.ap-sg.axway.com>
{{< /alert >}}

![Custom billing integration](/Images/central/integrate_with_central/custom_billing_integration.png)

## Step 1: Activate the custom billing integration

To activate the billing integration, change the Marketplace settings.

1. Navigate to Marketplace *Settings*.
2. Select the *Billing* tab.
3. Enable the billing toggle.
4. From the Vendor dropdown, select **Custom**.
5. Click **Save** to save your changes. Billing integration is now activated.

## Step 2: Listen to invoices event

If an invoice object is changed (for any reason) on Amplify Enterprise Marketplace, an event is triggered. The event will contain the invoice information (amount / currency / state and status / reference to the plan / Marketplace....):

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

You only need to be concerned with events having the following characteristic:

* `type` == "SubResourceUpdated"
* `metadata.subresource` == "status"

Look at the `state.name` and `status.level` to identify the flow to trigger.

### Invoice state and status

Invoice states:

* **Draft**: invoice has been created by Amplify Enterprise Marketplace system and is ready to be consumed by the billing Gateway flow.
* **Open**: invoice has been created in the billing Gateway and is ready to be paid by the consumer.
* **Paid**: invoice has been paid by the consumer.
* **Incomplete**: status set by the Billing System in case of issues. No action will be taken by the Amplify Enterprise Marketplace.
* **PastDue**: the invoice has not been paid on time.
* **Void**: the invoice will never be paid by the consumer. The consumer cancelled the subscription before paying the first invoice.

Invoice state statuses:

* **Pending**: action is in progress.
* **Success**: action is successful.
* **Error**: action in unsuccessful.

For Success and Error, an additional message is available to help understand the status.

To listening to the invoices event, use one of the following:

* The webhook mechanism
* A gRPC client

### Webhooks

The webhook method is simple, but there is no retry mechanism. Therefore, if you fail to receive and event, there is no way to retrieve it later.

You can use either the Amplify Central CLI or Amplify Central API to manage the webhook.

See [Webhooks](/docs/integrate_with_central/webhook) for more information regarding webhooks and their security.

Create the integration using API:

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

Or create the integration using the Axway CLI: add the following in a file and apply the file `axway central apply -f {filename.yaml}`

```yaml
group: management
apiVersion: v1alpha1
kind: Integration
name: monitor-subscription-invoices
title: Monitor Subscription Invoices
attributes: {}
finalizers: []
tags:
  - MKT
spec:
  description: Monitors Subscription invoices.
```

Create the webhook using API:

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

Or create the webhook using Axway CLI: add the following in a file and apply the file `axway central apply -f {filename.yaml}`

```yaml
group: management
apiVersion: v1alpha1
kind: Webhook
name: webhook-monitor-subscription-invoices
title: Webhook to monitor Subscription invoices
metadata:
  scope:
    kind: Integration
    name: monitor-subscription-invoices
attributes: {}
finalizers: []
tags:
  - Marketplace
spec:
  url: YOUR ENDPOINT TO RECEIVE INVOICE EVENTS
  enabled: true
  headers:
    Content-Type: application/json
```

{{< alert title="Note" color="primary" >}}
You can attach a secret to the webhook specification to indicate that the incoming events are from the specific webhook. See [webhook advanced setup](/docs/integrate_with_central/webhook#using-a-secret).
{{< /alert >}}

Create the resource hook definition using API:

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

Or create the resource hook definition using Axway CLI: add the following in a file and apply the file `axway central apply -f {filename.yaml}`

```yaml
group: management
apiVersion: v1alpha1
kind: ResourceHook
name: monitor-subscription-invoices
title: Resource Hook to monitor SubscriptionInvoices
metadata:
  scope:
    kind: Integration
    name: monitor-subscription-invoices
attributes: {}
finalizers: []
tags: []
spec:
  triggers:
    - kind: SubscriptionInvoice
      name: '*'
      type:
        - updated
      group: catalog
      scope:
        kind: Subscription
        name: '*'
  webhooks:
    - webhook-monitor-subscription-invoices
```

### gRPC client

The gRPC connectivity is more complex than the webhook, but more robust as you can keep track of the incoming events.

In order to receive the event via a gRPC connection, you must create a **WatchTopic** . This WatchTopic (works similarly to the resourceHook) will receive all invoice events, and this is the place a gRPC client will listen to.

Create a watchtopic using API:

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

Or create a watchtopic using the Axway CLI: Add the following in a file and apply the file `axway central apply -f {filename.yaml}`

```yaml
Create the integration using the Axway CLI:
```yaml
group: management
apiVersion: v1alpha1
kind: WatchTopic
name: track-subscriptions-invoices
title: Monitor subscription invoices
attributes: {}
tags: []
spec:
  filters:
    - kind: SubscriptionInvoice
      name: '*'
      type:
        - updated
      group: catalog
      scope:
        kind: Subscription
        name: '*'
```

Read events from WatchTopic:

Events in the WatchTopic are sequential. They remain in the WatchTopic for seven days.

1. You can ask for all the events (no filter in the query), or events after a specific sequence number (`?query=sequence>=xxx`):

    ```json
    curl --location 'https://apicentral.axway.com/events/management/v1alpha1/watchtopics/track-subscriptions-invoices?sort=sequenceID%2CDESC' \
    --data ''
    ```

2. You must now build a specific client based on our [Agent SDK](https://github.com/Axway/agent-sdk) to listen to the WatchTopic. See the [Sample of gRPC client source code](https://github.com/Axway/agent-sdk/tree/main/samples/watchclient).
3. You must compile this source code with go compiler to get the executable: `go make`
4. For this client to run, you must have an Amplify Service Account with Central Admin rights. The service account key pair must be in the same directory with the gRPC client.
5. Start the gRPC client:

    ```cmd
    ./watchclient --auth.client_id=<sa_client_id> --tenant_id=<organization_id> --host=apicentral.axway.com --port=443 --topic_self_link=/management/v1alpha1/watchtopics/track-subscriptions-invoices --log_level=debug --auth.url="
    https://login.axway.com/auth"
    ```

Using the above queries, the gRPC client can process all events, and manage some failover, by keeping track of the event sequence numbers. For instance, you can save locally the latest processed sequence and, on client restart, process the event that may have been missed while the client was down.

## Step 3: Manage the flows between the Marketplace and the payment Gateway

### Invoice creation flow in the billing Gateway

When receiving new invoices via webhook or watchTopic, it is the responsibility of the implementation to correctly create the invoice on the billing Gateway with the supplied information (currency / amount / details) and then report back to Amplify Enterprise Marketplace the billing link and the invoice state/status:

1. Check the event characteristics: `type=SubResourceUpdated` and `metadata.subsresource=status` and the specific for invoice: `state=draft` and `status=pending`.
2. Create the corresponding invoice in the Billing Gateway. This step depends on the billing Gateway capabilities.
3. Update the invoice on the Amplify Enterprise Marketplace to reflect the information.

Add the invoice link payment so that the consumer can navigate from the Marketplace to the billing Gateway payment screen:

```json
curl --location --request PUT 'https://apicentral.axway.com/apis/catalog/v1alpha1/subscriptions/{SUBSCRIPTION_NAME}/subscriptioninvoices/{SUBSCRIPTION_INVOICE_NAME}/billing' \
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

{{< alert title="What is the difference between 'due' and 'total'?" color="primary" >}}
The **total** property is the current invoice amount that is originated from Marketplace invoicing system.  

The **due** property is the total amount plus any extra amount (taxes / past due invoices...) that is billed to the consumer.
{{< /alert >}}

Update the invoice state:

```json
curl --location --request PUT 'https://apicentral.axway.com/apis/catalog/v1alpha1/subscriptions/{SUBSCRIPTION_NAME}/subscriptioninvoices/{SUBSCRIPTION_INVOICE_NAME}/state' \
--data '{   
    "state": {
        "name": "open",
        "reason": "generated and ready in billing Gateway"
    }
}'
```

### Invoice paid flow

Once the payment is received on the billing Gateway, the corresponding invoice state must be updated to reflect the payment and allow the consumer to start consuming the associated API.

To update the invoice:

```json
curl --location --request PUT 'https://apicentral.axway.com/apis/catalog/v1alpha1/subscriptions/{SUBSCRIPTION_NAME}/subscriptioninvoices/{SUBSCRIPTION_INVOICE_NAME}/state' \
--data '{   
    "state": {
        "name": "paid",
        "reason": "invoice paid"
    }
}'
```

### Invoice past due flow

Once the invoice due date is reached, Amplify Enterprise Marketplace will raise a new invoice event.

To check for event characteristics: `type=SubResourceUpdated` and `metadata.subsresource=status` and the specific for invoice: `state=pastDue` and `status=pending`

It is possible to take action on the provider side to reach out the consumer to see why the invoice has not been paid. Once the clarification has been made with the consumer, we recommend changing the status to Success:

```json
curl --location --request PUT 'https://apicentral.axway.com/apis/catalog/v1alpha1/subscriptions/{SUBSCRIPTION_NAME}/subscriptioninvoices/{SUBSCRIPTION_INVOICE_NAME}/status' \
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

If the initial subscription invoice was never paid and the consumer terminated his subscription, the existing invoice is put in the **void** state.

1. Check the event characteristics: `type=SubResourceUpdated` and `metadata.subsresource=status` and the specific for invoice: `state=void` and `status=pending`
2. Decide what to do on the billing Gateway. For instance, set the invoice as *not collectible* or completely delete it from the billing Gateway.
3. Once done on the Billing Gateway, the corresponding invoice in Amplify Enterprise Marketplace must be updated to whichever status make sense (`Success` or `Error`):

    ```json
    curl --location --request PUT 'https://apicentral.axway.com/apis/catalog/v1alpha1/subscriptions/{SUBSCRIPTION_NAME}/subscriptioninvoices/{SUBSCRIPTION_INVOICE_NAME}/status' \
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

If the invoice status is set to `Error` and you want to process it again, simply change the status back to `Pending` so that an event will be triggered again and caught by the webhook/WatchTopic.

* Use the subscriptioninvoices API to detect invoices that are pending actions or in specific state: `AMPLIFY_CENTRAL_URL/apis/catalog/v1alpha1/subscriptioninvoices?query=billing.payment.type==custom;state.name==draft;status.level==Pending`

See the API Specifications reference [SubscriptionInvoice](https://generator.swagger.io/?url=https://apicentral.axway.com/apis/docs#/catalog/list_catalog_v1alpha1_Subscription_SubscriptionInvoice).
