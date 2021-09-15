---
title: Set up integrations through Webhooks
linkTitle: Set up integrations through Webhooks
weight: 25
date: 2019-07-30
description: Learn how you can configure webhooks to receive notifications from
  Amplify Central and Amplify Unified Catalog, and enable a seamless integration
  between Amplify Central, Amplify Unified Catalog, and your internal systems.
---
## Before you start

* You know how to [create a representation of an environment and API Service using the Axway Central CLI](/docs/central/cli_central/cli_apiservices/).
* You know how to [create and publish other resource types to the Amplify Unified Catalog](/docs/central/cli_central/cli_publish/).

## Objectives

Learn how to create and configure webhooks in Amplify Central, as well as the event structure that corresponds to a set of actions, such as catalog asset updated and new subscription request submitted.

## API Server

[Axway API Server](https://apicentral.axway.com/apis/docs) exposes a standard CRUD interface for all resources available in Amplify Central, and provides a way to model the governance for different data planes in the system.

The API Server leverages standard RESTful terminology to describe its concepts:

* **Resource type**: The name used in the URL. For example, `environments`, `webhooks`, `secrets`.
* **kind**: Represents resource types. For example, `environments`, `apiservice`, `webhook`.
* **collection**: List of instances of a resource type.
* **resource**: A single instance of the resource type.

### Supported resource types

API Server **management** group supports the following resources.

* **Environment**: A logical group of API assets within a user or customer defined context. For example, you can create an environment to represent your remote gateway environment, such as AWS or Amplify API Manager.
* **API Service**: An API asset, including all its revisions and deployed endpoints, and additional information to represent your API. For example, description, environment scope, image encoded in base64.
* **API Service Revision:** Indicates incremental changes to an API asset. It comprises of the interface (contract), implementation, and instance of the API. An API can have multiple revisions. A client can call different versions of an API to realize different behaviors.
* **API Service Instance:** Instance where an API revision (version) is deployed. This endpoint is consumable by clients and it is typically represented as a URL with a port number.
* **Consumer Subscription Definition**: A subscription definition contains the configuration of the data needed for a consumer to subscribe or register to an asset in the Amplify Unified Catalog. It has a reference to a webhook that will be invoked on a subscription or registration event. The subscription definition is referenced in the Consumer Instance resource.
* **Consumer Instance:** Contains all the configuration for publishing an asset in the Amplify Unified Catalog for consumption.
* **Webhook**: Defines the webhook URL that will be invoked on certain events.
* **Integrations:** Logical grouping of webhook integrations.
* **Resource Hook**: Allows you to configure webhooks for resources (environments, API Service) in Amplify Central.

All resources support CRUD operations.

### Scoped and unscoped resources

API Server supports **scoped** and **unscoped** types of resources. The resources are defined under a group, which is part of the API's endpoints path. Each endpoint is tagged with the resource group name.

* **Scoped**: A **scope** refers to the lifetime and accessibility of the resource. A scoped resource is a resource defined under another scope. For example, an **API Service** can only be defined under the **Environment** scope.
* **Unscoped**: Top level resources that can group a set of other resources. **Environments** and **Integrations** are unscoped resource types.

## Webhooks

Webhooks allow you to configure integrations on resources in Amplify Central or on subscriptions to assets in the Amplify Unified Catalog. When one of those events is triggered, Amplify Central sends an HTTP POST payload to the URL configured in the webhook.

You can use webhooks to define a custom approval flow, set up a policy, or deploy to your production server.

### Create a webhook

A webhook is a combination of a URL and any custom parameters (for example, a secret) needed to set up your integration.

To configure a webhook, see [Axway Central CLI](/docs/central/cli_central). Alternatively, you can use the example provided in our [Postman Collection](https://documenter.getpostman.com/view/2125605/SzKbLaVV?version=latest#44df18e7-2802-4786-bd60-7efb7cf5e63a), using our REST APIs.

### Secret

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

* **$name**: The secret unique name.
* **$title**: The secret friendly name.
* **$spec.data**: Key value pairs.

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

* **$name**: Webhook unique identifier.
* **$title**: Webhook friendly name.
* **$spec.url**: URL of the server that will receive the webhook `POST`requests.
* **$spec.auth.secret**: Use when the webhook is secured and needs a secret to invoke.
* **$spec.auth.secret.name**: Name of the secret, as defined in the payload.
* **$spec.auth.secret.key**: Key to the secret, which will be used to invoke the webhook.
* **$spec.enabled**: When enabled will invoke the webhook.

### Configure a webhook on resources

You can setup a webhook on any resource in Amplify Central by configuring a **Resource hook**. An event will be published on any CRUD operation. When the resource hook trigger conditions match, the resource hook referenced webhooks will be invoked, and an HTTP `POST` payload will be sent to the webhook's URL. For example, the webhook can be invoked when a new API asset is created.

The following are examples of the **Resource Hook** payload.

Monitor all API service revisions changes in *acme* environment:

```json
{
   "group": "management",
   "apiVersion": "v1alpha1",
   "kind": "ResourceHook",
   "name": "apiservicerevisions-hook",
   "title": "Monitor API Service Revision changes from 'acme' Environment",
   "metadata": {
      "scope": {
         "kind": "Integration",
         "name": "production"
      }
   },
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
               "name": "acme"
            }
         }
      ],
      "webhooks": [
         "triggered-webhook"
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
   "metadata": {
      "scope": {
         "kind": "Integration",
         "name": "production"
      }
   },
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
         "triggered-webhook"
      ]
   }
}
```

Monitor changes in a specific environment and on all its resources:

```json
{
   "group": "management",
   "apiVersion": "v1alpha1",
   "kind": "ResourceHook",
   "name": "environments-hook",
   "title": "Monitor Environment acme and all its resources",
   "metadata": {
      "scope": {
         "kind": "Integration",
         "name": "production"
      }
   },
   "spec": {
      "triggers": [
         {
            "group": "management",
            "kind": "Environment",
            "name": "acme",
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
               "name": "acme"
            }
         }
      ],
      "webhooks": [
         "triggered-webhook"
      ]
   }
}
```

* **$name**: Resource hook unique name.
* **$title**: Resource hook friendly name.
* **$spec.triggers.group**: Value for the group of the resource.
* **$spec.triggers.scope**: Resource scope trigger details.
* **$spec.triggers.scope.kind**: The type of the resource. For example, the wehbook will be invoked on any events on resources of type **Environment**.
* **$spec.triggers.scope.name**: The name of the resource of the type specified. "*" represents any. When you specify a name, the webhook will be invoked on any resource in the environment with that name.
* **$spec.triggers.kind**: The resource in the scope defined via `$spec.triggers.scope.kind`. "*" represents any. For example, APIService under the **Environment** type. Instead of a wildcard, you can provide specific names to set up a trigger to invoke the webhooks.
* **$spec.triggers.name**: The name of the trigger of the type specified. "*" represents any. When you specify a name, the webhook will be invoked on any resource in the environment with that name.
* **$spec.triggers.type**: The type of the event. Accept values: **created**, **updated**, **deleted**.
* **$spec.webhooks**: A list of webhook names that determine which webhooks will be invoked on matching triggers.

The following is an example which suggests "When resource type of kind `APIService` with any name is created, updated, or deleted in any group, with any scope kind and name", the webhooks defined in the resource hook will be invoked.

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

### Webhook Events

An event is triggered whenever an action is taken on the resources in Amplify Central and sent to the webhook.

The following is an example of an event payload sent to the webhook configured via a resource hook:

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
                "data": "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",
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

## Configure webhooks on catalog asset subscriptions

Amplify Unified Catalog provides event-driven subscription management capabilities that enable you to create custom subscription flows for each registered environment in Amplify Central, enabling complex approval flows and integration with existing systems to streamline the experience and reduce the time for approval.

To publish an asset to the Amplify Unified Catalog with a custom subscription flow that will be triggered on any subscription events, you will need to:

* Create an environment in Amplify Central.
* Create an API service, API service instance, and API service revision.
* Create a webhook with a secret, if you want to secure the webhook.
* Create a custom subscription definition that references the webhook.
* Create a consumer instance that references the subscription definition for publishing the asset to the Amplify Unified Catalog.

To configure the resources listed above, see [Axway Central CLI](/docs/central/cli_central/). Alternatively, you can use the example provided in our [Postman Collection](https://documenter.getpostman.com/view/2125605/SzKbLaVV?version=latest#44df18e7-2802-4786-bd60-7efb7cf5e63a).

The following is an example of a consumer instance with a custom subscription that will trigger a webhook on any subscription change.

```json
{
   "apiVersion":"v1alpha1",
   "kind":"ConsumerSubscriptionDefinition",
   "name":"my-custom-subscription",
   "title":"My custom subscription definition",
   "metadata":{
      "scope":{
         "kind":"Environment",
         "name":"georgiedemoenv"
      }
   },
   "attributes":{
      "createdBy":"json"
   },
   "tags":[
      "custom",
      "subscription"
   ],
   "spec":{
      "webhooks":[
         "my-webhook-name"
      ],
      "schema":{
         "properties":[
            {
               "key":"profile",
               "value":{
                  "$schema":"http://json-schema.org/draft-04/schema#",
                  "description":"A sample of a custom subscription payload.",
                  "type":"object",
                  "properties":{
                     "email address":{
                        "type":"string",
                        "description":"Your contact information"
                     }
                  }
               }
            }
         ]
      }
   }
}
```

* **$spec.webhooks**: Array of references to webhook resources, which will be invoked when on subscriptions to a catalog asset that references this subscription definition.
* **$spec.schema**: Any valid JSON schema specifying the information required during subscription from the consumers. Amplify Unified Catalog currently only supports JSON schema `draft-04`, so the provided schema in the subscription definition must be [draft-04](http://json-schema.org/draft-04/schema#).

The following is an example of a consumer instance payload referencing a subscription definition:

```json
{
   "apiVersion":"v1alpha1",
   "kind":"ConsumerInstance",
   "name":"my-catalog-asset",
   "title":"My Demo API v1.0.0",
   "metadata":{
      "scope":{
         "kind":"Environment",
         "name":"my-env-name"
      }
   },
   "attributes":{
      "createdBy":"json"
   },
   "tags":[
      "cli",
      "consumerinst"
   ],
   "spec":{
      "name":"My Demo API v1.0.0",
      "apiServiceInstance":"my-prod-instance",
      "description":"This is an awesome API",
      "visibility":"RESTRICTED",
      "version":"1.0",
      "state":"PUBLISHED",
      "status":"GA",
      "tags":[
         "api",
         "cli"
      ],
      "icon":{
         "contentType":"image/jpeg",
         "data":""
      },
      "documentation":"You can add any documentation in markdown format here",
      "subscription":{
         "enabled":true,
         "autoSubscribe":true,
         "subscriptionDefinition":"my-custom-subscription"
      }
   }
}
```

For the example provided, the following information will be required when a consumer subscribes to a catalog asset from the Amplify Unified Catalog.

![custom subscription definition](/Images/central/custom_subscription_definition.png "Custom Subscription Definition")

## Subscription events

A `SubscriptionUpdatedEvent` event is triggered when an action is taken on a subscription to a catalog asset in the Amplify Unified Catalog.

Click [subscriptionEventSchema.json](https://axway-open-docs.netlify.app/samples/central/subscriptionEventSchema.json) to download a sample of a subscription event schema.

* **type**: The type of the event, declared as a string. Accepts `SubscriptionUpdatedEvent` value.
* **consumerInstance**: The referenced consumer instance object created to publish the asset to the Amplify Unified Catalog.
* **subscription**: The payload contains the subscription object to a catalog asset.
* **$subscription.currentState**: The state of the subscription. Accepted values: REQUESTED, APPROVED, ACTIVE, REJECTED, UNSUBSCRIBED, UNSUBSCRIBE_INITIATED, FAILED_TO_SUBSCRIBE, FAILED_TO_UNSUBSCRIBE.
* **$subscription.currentStateDescription**: Description of the state. You can use it to provide a reason for rejection, a message to the provider when subscribing or unsubscribing, or a reason for a failure.
* **$subscription.nextPossibleStates**: Indicates the allowed states the subscription can transition to. Declared as an array.
* **$subscription.userId**: ID of the user that initiated the action. Declared as a string.
* **$subscription.owningTeamId**: ID of the team, which the user that initiated the action belongs to.
* **$subscription.properties**: The object contains the subscription request details.
* **$subscription.id**: ID of the subscription.
* **$subscription.name**: Friendly name of the subscription.
* **catalogItem**: Catalog asset object, which the user subscribed to.

Click [subscriptionEventPayload.json](https://axway-open-docs.netlify.app/samples/central/subscriptionEventPayload.json) to download a sample event payload that is sent to a webhook referenced in a subscription definition.

## Further information

* See the [Amplify Unified Catalog tutorials](https://github.com/Axway/unified-catalog-integrations) for setting up integrations with the Amplify Unified Catalog.
