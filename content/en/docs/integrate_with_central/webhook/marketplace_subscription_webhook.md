---
title: Set a webhook call back to approve or reject API consumer subscriptions from the Marketplace
linkTitle: Webhooks in the Marketplace
weight: 40
---
Configure webhooks to receive notifications from the Marketplace so that you can implement customized onboarding of API consumers.

## Before you start

* You understand the concepts outlined in [Webhooks](/docs/integrate_with_central/webhook/).

## Objectives

Learn how to create and configure webhooks for the Marketplace so that you can implement customized approval workflows to approve or reject access to an API product that has been published to the Marketplace.

The Marketplace provides event-driven subscription management capabilities that enable you to create custom subscription flows for each registered API product in the Marketplace, enabling complex approval flows and integration with existing systems to streamline the experience and reduce the time for approval.

## Set the subscription to manual approval

Set the usage plan to `manual` approval to enable custom approval workflows for subscription to a usage plan.  This can be done in either the UI when the product is being created or with the API/CLI. Run the following command to check that your plan has been set to manual approval via the CLI:

```bash
axway central get productplans <PLAN NAME HERE> -s <PRODUCT NAME HERE> -o json | jq '.spec.subscription.approval'
```

## Create an Integration

Create an integration to help manage and keep related webhooks and triggers together. An integration keeps the same webhooks and triggers within the same scope. Run the following command to create an integration:

```bash
axway central create -f integration.json -o json -y > integration-details.json
```

Where `integration.json` contains the following content:

```json
{
    "group": "management",
    "apiVersion": "v1alpha1",
    "kind": "Integration",
    "title": "Integrations for Subscription Approvals",
    "spec": {
        "description": "This is a group of resources to be used for subscription approval workflows"
    }
}
```

The integration resource has been created and will be used to set the scope for the webhook and triggers in this tutorial. Run the following command to find out the name of the integration that was set:

```bash
jq '.[0].name' integration-details.json
```

The triggers and associated webhooks will use this name for their scope.

## Create the Webhook

Register the webhook that will receive the subscription approval notification. To do this, create a Webhook resource within the scope of the integration created above. For this tutorial, use a webhook listener at [https://webhook.site/](https://webhook.site/). Run the following command to create a webhook:

```bash
axway central create -f webhook.json -o json -y > webhook-details.json
```

Where `webhook.json` contains the following content:

```json
{
    "group": "management",
    "apiVersion": "v1alpha1",
    "kind": "Webhook",
    "title": "Webhook.site listener",
    "metadata": {
        "scope": {
            "kind": "Integration",
            "name": "integrations-for-subscription-approvals"
        }},
    "spec": {
        "url": "https://webhook.site/e83eced4-1fa8-4f3b-be85-2f9easfsgfg9b",
        "enabled": true,
        "headers": {
            "Content-Type": "application/json"
        }
    }
}
```

The webhook resource has been created and this will be used to create the triggers in this tutorial. Run the following command to find out the name of the webhook that was set:

```bash
jq '.[0].name' webhook-details.json
```

## Create the trigger

Create the ResourceHook that will call the webhook when a Subscription needs to be approved or rejected. Run the following command to create a ResourceHook:

```bash
axway central create -f trigger.json -o json -y > trigger-details.json
```

Where `trigger.json` contains the following content:

```json
{
    "group": "management",
    "apiVersion": "v1alpha1",
    "kind": "ResourceHook",
    "title": "Resource Hook to monitor subscriptions in marketplace for approval",
    "metadata": {
        "scope": {
            "kind": "Integration",
            "name": "integrations-for-subscription-approvals"
        }
    },
    "spec": {
        "triggers": [
            {
                "kind": "Subscription",
                "name": "*",
                "type": [
                    "updated"
                ],
                "group": "catalog"
            }
        ],
        "webhooks": [
            "webhook-site-listener"
        ]
    }
}
```

## Implementing the Webhook listener

The subscription webhook listener will receive the following JSON payload:

```json
{
  "id": "4d2bbd32-6f....37",
  "time": "2022-06-20T11:30:28.133+0000",
  "version": "v1",
  "product": "AmplifyCentral",
  "correlationId": "f0a1d4ef-d5a.......9",
  "organization": {
    "id": "org id number"
  },
  "type": "SubResourceUpdated",
  "payload": {
   "metadata": {
      ........
      ........
      ........
      "selfLink": "/catalog/v1alpha1/subscriptions/subscription-name-goes-here"
    },
    "marketplace": {
      "resource": {
        "owner": {
          "id": "e4e0.....8",
          "type": "team",
          "organization": {
            "id": "org id number"
          }
        }
      }
    },
    "kind": "Subscription",
    "approval": {
      "state": "pending"
    },
    "title": "*** DISPLAY NAME ***",
    "spec": {
      "plan": {
        "name": "*** PLAN NAME ***"
      },
      "product": "*** PRODUCT NAME ***"
    },
    "apiVersion": "v1alpha1",
    "name": "*** SUBSCRIPTION NAME ***",
    "group": "catalog",
    "status": {
      "level": "Success"
    }
  },
  "metadata": {
    "subresource": "approval"
  }
}
```

## Considerations when processing the event in your webhook

A Subscription has three subresources: marketplace, approval and status, which means you'll receive a number of webhook call backs as they are updating. You'll receive events for:

* subscription created
* status set to Pending
* Marketplace subresource set
* approval set to pending
* status set to success

To ensure you're processing the need to approve once, your webhook processor should check that the following are true:

* The `type` field is `SubResourceUpdated`
* The `metadata.subresource` is `approval`
* The `payload.approval.state` is `pending`

For example, if you have implemented your webhook listener in PowerAutomate, then the condition to validate the above will look as follows:

![Condition filter in Microsoft PowerAutomate](/Images/integration/power_automate_condition.png)

Once your webhook flow has determined whether the subscription has to be approved or rejected, an "approved" or "rejected" update should be sent to Central's API Service. The information on the resource that needs to be update is contained in the `selflink` of the webhook notification. The selfLink provides an easy way to get access to a specific resource and change the data. The URL that you send the HTTP PUT request to is a combination of the region that your Amplify service is available at (i.e., `<https://apicentral.axway.com/>` or `<https://central.eu-fr.axway.com/>`) and the `selflink`:

```bash
https://<YOUR AMPLIFY CENTRAL REGION>/apis/<SELFLINK from Webhook notification>/approval
```

The content of the HTTP PUT request should be of the following format, where the `state` field will have a value of `approved` or `rejected` depending on the outcome of the custom webhook flow. The reason field contains why the subscription has been set to this state. Here is an example of an approved HTTP PUT request:

```json
{
  "approval": {
    "state": "approved",
    "reason": "Contract finalized and with legal"
  }
}
```

Here is an example of an rejected HTTP PUT request:

```json
{
  "approval": {
    "state": "rejected",
    "reason": "Contract not yet agreed for this business unit"
  }
}
```
