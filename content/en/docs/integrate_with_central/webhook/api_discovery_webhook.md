---
title: Set a webhook call back when there is a change to an API service in an environment
linkTitle: API Discovery webhooks
weight: 60
---
Configure webhooks to receive notifications when there are changes to discovered API services in an environment. When the notification is received, validation can be run on the API service to ensure that it complies with corporate standards.

## Before you start

* You understand the concepts outlined in [Webhooks](/docs/integrate_with_central/webhook/).

## Objectives

Learn how to create a webhook so that you can receive events when API services change in an environment.

## Create an integration

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
    "title": "Integrations for discovered API Services",
    "spec": {
        "description": "This is a group of resources to be used for API discovery and validation"
    }
}
```

The integration resource has been created and will be used to set the scope for the webhook and triggers in this tutorial. Run the following command to find out the name of the integration that was set:

```bash
jq '.[0].name' integration-details.json
```

The triggers and associated webhooks will use this name for their scope.

## Create the webhook

Register the webhook that will receive notifications for changes in discovered API service revisions. To do this, create a Webhook resource within the scope of the integration created above. For this tutorial, use a webhook listener at [https://webhook.site/](https://webhook.site/). Run the following command to create a webhook:

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
            "name": "integrations-for-discovered-api-services"
        }},
    "spec": {
        "url": "https://webhook.site/e83eded4-1fa8-4f3b-be95-2f9easfsgfg9b",
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

{{< alert title="Note" color="warning" >}}
For an HTTPS webhook endpoint, you must have a certificate issued by a valid certificate authority, not a self-signed certificate. Otherwise, no events will be received by the webhook endpoint.
{{< /alert >}}

## Create the trigger

Create the ResourceHook that will call the webhook when a API service revision has been changed in an environment. Run the following command to create a ResourceHook:

```bash
axway central create -f trigger.json -o json -y > trigger-details.json
```

Where `trigger.json` contains the following content, note that the field `webhooks` contains the name of the webhook created in the previous step:

```json
{
    "group": "management",
    "apiVersion": "v1alpha1",
    "kind": "ResourceHook",
    "title": "Resource Hook to monitor API Service changes in Azure environment",
    "metadata": {
        "scope": {
            "kind": "Integration",
            "name": "integrations-for-discovered-api-services"
        }
    },
    "spec": {
        "triggers": [
            {
                "kind": "APIServiceRevision",
                "name": "*",
                "type": [
                    "created",
                    "updated"
                ],
                "group": "management",
                "scope": {
                    "kind": "Environment",
                    "name": "*** LOGICAL NAME OF THE ENVIRONMENT TO MONITOR ***"
                }
            }
        ],
        "webhooks": [
            "webhook-site-listener"
        ]
    }
}
```

## Implement the webhook listener

The webhook listener will receive the following JSON payload:

```json

{
   "id": "9a4be695-f1a6......4b",
   "time": "2022-08-26T04:16:05.338+0000",
   "version": "v1",
   "product": "EnterpriseMarketplace",
   "correlationId": "fc0996fe-41ee......20",
   "organization": {
      "id": "org id number"
   },
   "type": "ResourceCreated",
   "payload": {
   "metadata": {
      ........
      ........
      ........
      "selfLink": "/management/v1alpha1/environments/*** ENVIRONMENT NAME ***/apiservicerevisions/*** API Service revision name ***"
   },
  "apiVersion": "v1alpha1",
  "kind": "APIServiceRevision",
  "name": "*** API Service revision name ***",
  "title": "*** API Service revision title ***",
  "spec": {
   "apiService": "*** API Service revision name ***",
   "definition": {
    "type": "oas3",
    "value": "*** Base64 encoded OAS specification ***"
            }
  },
  "group": "management",
 },
}

```

## Considerations when processing the event in your webhook

When you are processing the webhook in your system, consider the following:

* Validate that the webhook is processing a creation and update event by checking that the field `type` in the webhook payload has the value `ResourceCreated` or `ResourceUpdated`.

* Validate that the event is on a API service revision type that you are able to process. For example, your webhook listener implementation may only be able to process Open API standard updates, but not GraphQL. You can check the value of the field `payload.spec.definition.type` to see what type of specification update is being processed. The content of `payload.spec.definition.value` is the base64 encoded content of the specification for this API service revision (i.e. OAS, WSDL, AsynC API, or SDL for GraphQL).

{{< alert title="Note" color="primary" >}}If you need to store the result of your webhook, then you can store it as a custom sub resource (`x-resource`) with the API service revision. For example, if the webhook preforms linting validation of the API specification, then it is possible to store the results as a JSON payload in a sub resource of the API service revision by posting the results to `API Central URL/apis/'payload.metadata.selfLink'/x-lint-results`.
{{< /alert >}}

* If you are handling a `ResourceUpdated` and you update the resource back during the webhook event processing (for example, adding an attribute), then you need to guard against getting into a loop, as your change will generate another `ResourceUpdated` event. It is recommended that you attach a sub resource, as mentioned in the above note, and then add to your webhook the type that has been updated.
