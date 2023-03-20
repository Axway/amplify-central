---
title: Webhooks
linkTitle: Webhooks
weight: 300
hide_readingtime: true
---

Amplify enables the user to augment the default functionality through the integration of third-party systems and functionality. One of the ways this can be accomplished is with inbuilt events in combination with webhook integration.

Amplify generates a wide array of events that can be used for integration purposes through webhooks, including but not limited to:

* Environments (CRUD, State changes)
* Services (CRUD, State changes)
* Assets (CRUD, State changes)
* Products (CRUD, State changes)

Common scenarios to integrate through events / webhooks are the following items:

* Manage manual subscription approvals for the Marketplace through a third-party system
* Manage validation on changes to discovered API Services in an environment to ensure they comply with corporate standards

## Before you start

* You understand the concepts involved in the [API Server](/docs/integrate_with_central/api_server/).

## Objectives

Learn how to create and configure webhooks in Amplify, as well as the event structure that corresponds to a set of actions, such as catalog asset updated and new subscription request submitted.

## Webhooks

A webhook is an HTTP callback: an HTTP POST that occurs when something happens. Webhooks are used to automatically receive notifications that something happened to any resources on the API Server. For example, when a new asset is discovered in a environment or when an item is subscribed to in the Marketplace. Webhooks allow you to configure integrations on resources in Amplify. When one of those events is triggered, Amplify sends an HTTP POST payload to the URL configured in the webhook. Once you receive an event on your server, you can process and act on it as needed.

You can use webhooks to define a custom approval flow, set up a policy to validate discovered APIs or deploy to your production server.

Each event payload that your webhook server receives is structured similar to the example below, which is for when a new API is discovered in an environment:

```json
{
    "id": "af7cd036-e57a-4275-9ab3-2bf1d04757ce",
    "time": "2020-09-04T22:41:31.608+0000",
    "version": "v1",
    "product": "AmplifyCentral",
    "correlationId": "b013871b-05ce-4ea2-b4c3-148b702b3e55",
    "organization": {
        "id": "916640157564164"
    },
    "type": "ResourceCreated",
    "payload": {
        "finalizers": [],
        "metadata": {
            "id": "e4fda79d744bc16001745b482d0c0496",
            "audit": {
                "createTimestamp": "2020-09-04T22:41:30.892+0000",
                "createUserId": "69f5faff-aad3-43ea-9665-da11bc7b0f06",
                "modifyTimestamp": "2020-09-04T22:41:30.892+0000",
                "modifyUserId": "69f5faff-aad3-43ea-9665-da11bc7b0f06"
            },
            "scope": {
                "id": "e4f37c79728174c9017294b9848e0677",
                "kind": "Environment",
                "name": "axway",
                "selfLink": "/management/v1alpha1/environments/axway"
            },
            "resourceVersion": "21852",
            "references": [],
            "selfLink": "/management/v1alpha1/environments/axway/apiservices/test"
        },
        "apiVersion": "v1alpha1",
        "kind": "APIService",
        "name": "test",
        "attributes": {
            "release": "2.0.4"
        },
        "title": "Musical instruments API",
        "spec": {
            "icon": {
                "data": "iVBORw0KGgoAAAANSUhEUgA=
                d0OHqAeDaUD8ziKUk0bmBogGfn16hUqwMUJMX1kxImNZ21AAkSWuyA
                .....................................................
                .....................................................
                9WAIm8jGWtoAAiS1yRH6wAEnkZy1pBAUSWuCI/+H/IOwKf+Y+BXwAAAABJRU5ErkJggg==",
                "contentType": "image/png"
            },
            "description": "This is a sample Musical Instruments API."
        },
        "group": "management",
        "tags": [
            "instruments",
            "musical"
        ]
    }
}
```

### Anatomy of a webhook event

Each event payload that your webhook server receives is structured similar to the example above which has the following format:

* **id**: a uid for the webhook event.
* **time**: indicates the time when the webhook was triggered by a change in resource.
* **correlationId:** each API request is tagged with an id once it received by Amplify. The correlationId is the id of the originating request which updated the system. Note that an API call into Amplify may result in a number of changes to resources in Amplify. For example, consider the result of deleting an environment request which will result in a cascade delete of all the resources and subresources of that environment.
* **organization:** indicates the organization id that the resource belongs to.
* **type:** indicates if this is a create, update or delete event. Supported types: ResourceCreated/ResourceUpdated/ResourceDeleted/SubResourceUpdated.
* **payload:** contains the contents of the resource that changed and resulted in the webhook being triggered.

## Setting up a webhook

To receive webhook event notifications from the API Server, you must complete the following steps:

1. Create a webhook which will be called on a particular event.
2. Create the trigger which will invoke the webhook URL that was defined in the previous step.

### Create a webhook

To receive notifications of events, you must create a webhook that details the server that will receive the notifications. Create the webhook resource in the API Server:

```yaml
group: management
apiVersion: v1alpha1
kind: Webhook
name: invoke-jira-webhook
title: JIRA approval webhook
metadata:
  scope:
    kind: Environment
    name: azure-apiman-service
spec:
  url: >-
    https://webhook.site/9cb87457-04ad-4db4-830f-2da5dc46e0bb
  enabled: true
  headers:
    Content-Type: application/json
```

Key fields in the Webhook resource:

* **$name**: webhook unique identifier.
* **$title**: webhook friendly name.
* **$spec.url**: URL of the server that will receive the webhook `POST`requests.
* **$spec.enabled**: when enabled will invoke the webhook.

You can create the webhook resource using the CLI:

```shell
axway central apply -f webhook.yaml
✔ "Webhook/invoke-jira-webhook" in the scope "Environment/azure-apiman-service" has successfully been updated.
```

### Create the trigger

After the webhook has been created, you must specify when the webhook will be invoked. You can set up a webhook on any resource in Amplify by configuring a **Resource hook**. An event will be published on any CRUD operation. When the resource hook trigger conditions match, the resource hook referenced webhooks will be invoked, and an HTTP `POST` payload will be sent to the webhook's URL. For example, the webhook can be invoked when a new API asset is created.

The following are examples of the **Resource Hook** payload.

Monitor all API service revisions in *invoke-jira-webhook* environment:

```json
{
   "group": "management",
   "apiVersion": "v1alpha1",
   "kind": "ResourceHook",
   "name": "apiservicerevisions-hook",
   "title": "Monitor API Service Revision changes from 'azure-apiman-service' Environment",
   "spec": {
      "triggers": [
         {
            "group": "management",
            "kind": "APIServiceRevision",
            "name": "*",
            "type": [
               "updated",
               "created",
               "deleted"
            ],
            "scope": {
               "kind": "Environment",
               "name": "azure-apiman-service"
            }
         }
      ],
      "webhooks": [
         "invoke-jira-webhook"
      ]
   }
}
```

Monitor changes on all environment resources:

```json
{
   "group": "management",
   "apiVersion": "v1alpha1",
   "kind": "ResourceHook",
   "name": "environments-hook",
   "title": "Monitor all Environment resources",
   "spec": {
      "triggers": [
         {
            "group": "management",
            "kind": "Environment",
            "name": "*",
            "type": [
               "created",
               "updated",
               "deleted"
            ]
         }
      ],
      "webhooks": [
         "invoke-jira-webhook"
      ]
   }
}
```

Monitor changes in a specific environment "azure-apiman-service" and on all its resources:

```json
{
   "group": "management",
   "apiVersion": "v1alpha1",
   "kind": "ResourceHook",
   "name": "environments-hook",
   "title": "Monitor Environment azure-apiman-service and all its resources",
   "spec": {
      "triggers": [
         {
            "group": "management",
            "kind": "Environment",
            "name": "azure-apiman-service",
            "type": [
               "created",
               "updated",
               "deleted"
            ]
         },
         {
            "group": "management",
            "kind": "*",
            "name": "*",
            "type": [
               "created",
               "updated",
               "deleted"
            ],
            "scope": {
               "kind": "Environment",
               "name": "azure-apiman-service"
            }
         }
      ],
      "webhooks": [
         "invoke-jira-webhook"
      ]
   }
}
```

* **$name**: resource hook unique name.
* **$title**: resource hook friendly name.
* **$spec.triggers.group**: value for the group of the resource.
* **$spec.triggers.scope**: resource scope trigger details.
* **$spec.triggers.scope.kind**: the type of the resource. For example, the webhook will be invoked on any events on resources of type **Environment**.
* **$spec.triggers.scope.name**: the name of the resource of the type specified. "*" represents any. When you specify a name, the webhook will be invoked on any resource in the environment with that name.
* **$spec.triggers.kind**: the resource in the scope defined via `$spec.triggers.scope.kind`. "*" represents any. For example, APIService under the **Environment** type. Instead of a wildcard, you can provide specific names to set up a trigger to invoke the webhooks.
* **$spec.triggers.name**: the name of the trigger of the type specified. "*" represents any. When you specify a name, the webhook will be invoked on any resource in the environment with that name.
* **$spec.triggers.type**: the type of the event. Accepted values: **created**, **updated**, **deleted**
* **$spec.webhooks**: a list of webhook names that determine which webhooks will be invoked on matching triggers.

The following is an example of "When resource type of kind `APIService` with any name is created, updated, or deleted in any group, with any scope kind and name", the webhooks defined in the resource hook will be invoked:

```json
{
    "group": "*",
    "scope": {
        "kind": "*",
        "name": "*"
    },
    "kind": "APIService",
    "name": "*",
    "type": [
        "created",
        "updated",
        "deleted"
    ]
}
```

## Advanced setup

### Using a secret

A secret is a key-value pair associated with a webhook to secure it. By setting the secret, you ensure that the `POST` request sent to the payload URL is from Axway.

Example of a payload:

```json
{
    "name": "secrettest",
    "title": "Axway Environment Test",
    "spec": {
        "data": {
            "apikey": "secret"
        }
    }
}
```

* **$name**: the secret unique name.
* **$title**: the secret friendly name.
* **$spec.data**: key value pairs.

Example of a webhook payload referencing a secret:

```json
{
    "name": "webhook",
    "title": "Webhook to invoke requestbin.com",
    "spec": {
        "auth": {
            "secret": {
                "name": "webhooksecret",
                "key": "apikey"
            }
        },
        "enabled": true,
        "url": "https://enveb85y26nv.x.pipedream.net"
    }
}
```

* **$name**: webhook unique identifier.
* **$title**: webhook friendly name.
* **$spec.url**: URL of the server that will receive the webhook `POST`requests.
* **$spec.auth.secret**: use when the webhook is secured and needs a secret to invoke.
* **$spec.auth.secret.name**: name of the secret, as defined in the payload.
* **$spec.auth.secret.key**: key to the secret, which will be used to invoke the webhook.
* **$spec.enabled**: when enabled, will invoke the webhook.

The links below provide a step-by-step guide for common integrations through events / webhooks.
