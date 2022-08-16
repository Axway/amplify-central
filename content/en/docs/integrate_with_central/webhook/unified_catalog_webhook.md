---
title: Set a webhook call back to approve or reject API consumer subscriptions from the Unified Catalog
linkTitle: Webhooks in the Unified Catalog
weight: 50
---
Configure webhooks to receive notifications from Amplify Unified Catalog so that you can implement customized onboarding of API consumers to the Unified Catalog.

## Before you start

* You understand the concepts outlined in [set up integrations through Webhooks](/docs/integrate_with_central/integrate_with_webhooks/).

## Objectives

Learn how to create and configure webhooks for the Amplify Unified Catalog so that you can implement customized approval workflows to approve or reject access to APIs that have been published to the Unified Catalog.

## Configure webhooks on catalog asset subscriptions

Amplify Unified Catalog provides event-driven subscription management capabilities that enable you to create custom subscription flows for each registered environment in Amplify Central, enabling complex approval flows and integration with existing systems to streamline the experience and reduce the time for approval.

To publish an asset to the Amplify Unified Catalog with a custom subscription flow that will be triggered on any subscription events, you must:

* Create an environment in Amplify Central.
* Create an API service, API service instance, and API service revision.
* Create a webhook with a secret, if you want to secure the webhook.
* Create a custom subscription definition that references the webhook.
* Create a consumer instance that references the subscription definition for publishing the asset to the Amplify Unified Catalog.

To configure the resources listed above, see [Axway Central CLI](/docs/integrate_with_central/cli_central/cli_publish/). Alternatively, you can use the example provided in our [Postman Collection](https://documenter.getpostman.com/view/2125605/SzKbLaVV?version=latest#44df18e7-2802-4786-bd60-7efb7cf5e63a).

The following is an example of a consumer instance with a custom subscription that will trigger a webhook on any subscription change:

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
                     "Job title":{
                        "type":"string",
                        "description":"Job title"
                     }
                  }
               }
            }
         ]
      }
   }
}
```

* **$spec.webhooks**: array of references to webhook resources, which will be invoked when on subscriptions to a catalog asset that references this subscription definition.
* **$spec.schema**: any valid JSON schema specifying the information required during subscription from the consumers. Amplify Unified Catalog currently only supports JSON schema `draft-04`, so the provided schema in the subscription definition must be [draft-04](http://json-schema.org/).

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

Click [subscriptionEventSchema.json](/samples/central/subscriptionEventSchema.json) to download a sample of a subscription event schema.

* **type**: the type of the event, declared as a string. Accepts `SubscriptionUpdatedEvent` value.
* **consumerInstance**: the referenced consumer instance object created to publish the asset to the Amplify Unified Catalog.
* **subscription**: the payload contains the subscription object to a catalog asset.
* **$subscription.currentState**: the state of the subscription. Accepted values: REQUESTED, APPROVED, ACTIVE, REJECTED, UNSUBSCRIBED, UNSUBSCRIBE_INITIATED, FAILED_TO_SUBSCRIBE, FAILED_TO_UNSUBSCRIBE.
* **$subscription.currentStateDescription**: description of the state. You can use it to provide a reason for rejection, a message to the provider when subscribing or unsubscribing, or a reason for a failure.
* **$subscription.nextPossibleStates**: indicates the allowed states the subscription can transition to. Declared as an array.
* **$subscription.userId**: ID of the user that initiated the action. Declared as a string.
* **$subscription.owningTeamId**: ID of the team, which the user that initiated the action belongs to.
* **$subscription.properties**: the object contains the subscription request details.
* **$subscription.id**: ID of the subscription.
* **$subscription.name**: friendly name of the subscription.
* **catalogItem**: Catalog asset object, which the user subscribed to.

Click [subscriptionEventPayload.json](/samples/central/subscriptionEventPayload.json) to download a sample event payload that is sent to a webhook referenced in a subscription definition.

## Additional information

See the [Amplify Unified Catalog tutorials](https://github.com/Axway/unified-catalog-integrations) for setting up integrations with the Amplify Unified Catalog.