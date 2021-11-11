---
title: Set up integrations through Webhooks
linkTitle: Set up integrations through Webhooks
weight: 100
date: 2019-07-30
description: Learn how you can configure webhooks to receive notifications from
  Amplify Central and Amplify Unified Catalog, and enable a seamless integration
  between Amplify Central, Amplify Unified Catalog, and your internal systems.
---
## Before you start

* You know how to [create a representation of an environment and API Service using the Axway Central CLI](/docs/integrate_with_central/cli_central/cli_apiservices/).
* You know how to [create and publish other resource types to the Amplify Unified Catalog](/docs/integrate_with_central/cli_central/cli_publish/).

## Objectives

Learn how to create and configure webhooks in Amplify Central, as well as the event structure that corresponds to a set of actions, such as catalog asset updated and new subscription request submitted.

## API Server

The core of the Amplify management plane is the API Server. The API Server exposes a HTTP API that allows you to configure different parts of management plane. The API Server's API lets you query and manipulate the state of resources in Amplify Central (for example: Environments, API Services, Secrets, Webhooks).


Most operations can be performed through the Axway Central command-line interface which in turn uses the API. However, you can also access the API directly using REST calls. The REST documentation is publically available [Axway API Server](https://apicentral.axway.com/apis/docs).

The [API](https://apicentral.axway.com/apis/docs) exposes a standard CRUD interface for all resources available in Amplify Central, these resources model the governance for different data planes which Amplify Central is managing. 

TODO describe the API style in terms of GET, PUT, POST etc. and the URL format to locate resources. 

All operations on the API Server can be performed via the Axway CLI and the Amplify Central command-line interface. For example if you want to view all resources types which are available in the system you would run the following 'get' command with providing an argument as to which type to get:
```sh
axway central get
.....
.....
The server supports the following resources:

RESOURCE                  SHORT NAMES          RESOURCE KIND                   SCOPED  SCOPE KIND         RESOURCE GROUP
accessrequestdefinitions  accreqdef            AccessRequestDefinition         true    Environment        management    
accessrequests            accreq               AccessRequest                   true    Environment        management    
.....................................................
.....................................................   
apiserviceinstances       apisi                APIServiceInstance              true    Environment        management    
apiservicerevisions       apisr                APIServiceRevision              true    Environment        management    
apiservices               apis                 APIService                      true    Environment        management    
apispecs                  apisp                APISpec                         true    K8SCluster         management    
.....................................................
.....................................................
consumerinstances         consumeri            ConsumerInstance                true    Environment        management    
consumersubscriptiondefs  consumersd           ConsumerSubscriptionDefinition  true    Environment        management    
.....................................................
.....................................................
environments              env                  Environment                     false                      management    
governanceagents          ga                   GovernanceAgent                 true    Environment        management    
.....................................................
.....................................................
webhooks                  webh                 Webhook                         true    Environment        management    
webhooks                  webh                 Webhook                         true    Integration        management    
```
Below is an explanation for some of the types in the system:
* **Environment**: A logical group of API assets within a user or customer defined context. For example, you can create an environment to represent your remote gateway environment, such as AWS or Amplify API Manager.
* **API Service**: An API asset, including all its revisions and deployed endpoints, and additional information to represent your API. For example, description, environment scope, image encoded in base64.
* **API Service Revision:** Indicates incremental changes to an API asset. It comprises of the interface (contract), implementation, and instance of the API. An API can have multiple revisions. A client can call different versions of an API to realize different behaviors.
* **API Service Instance:** Instance where an API revision (version) is deployed. This endpoint is consumable by clients and it is typically represented as a URL with a port number.
* **Consumer Subscription Definition**: A subscription definition contains the configuration of the data needed for a consumer to subscribe or register to an asset in the Amplify Unified Catalog. It has a reference to a webhook that will be invoked on a subscription or registration event. The subscription definition is referenced in the Consumer Instance resource.
* **Consumer Instance:** Contains all the configuration for publishing an asset in the Amplify Unified Catalog for consumption.
* **Webhook**: Defines the webhook URL that will be invoked on certain events.
* **Integrations:** Logical grouping of webhook integrations.
* **Resource Hook**: Allows you to configure webhooks for resources (environments, API Service) in Amplify 

## Anatomy of an resource in API Server
Each resource in your configuration has a 'name' field. The name is optional, if not provided, API Server will generate one. A value provided for a name must be unique with a scope of a resource. See below for explaination of scoped and unscoped resources. For example, Environment (unscoped resource) name is unique across all Environments. For APIService (scoped to the Environment) the name is unique inside that Environment.

group - resources are defined under a group, which is part of the API's endpoints path
apiVersion - Which version of the API Server API you're using to create this object
kind - What type of object this represents. Kinds are Camel case, for example: Environment, APIService, APIServiceRevision, Webhook 
metadata - ????
spec - What state you desire for the object

Here's an example .yaml file that shows the fields for defining a webhook in the system:

```yaml
group: management
apiVersion: v1alpha1
kind: Webhook
name: invoke-jira-webhook
title: JIRA approval webhook
spec:
  url: >-
    https://webhook.site/9cb87457-04ad-4db4-830f-2da5dc46e0bb
  enabled: true
  headers:
    Content-Type: application/json
```

### Scoped and unscoped resources

API Server supports **scoped** and **unscoped** types of resources. The resources are defined under a group, which is part of the API's endpoints path. Each endpoint is tagged with the resource group name.

* **Scoped**: A **scope** refers to the lifetime and accessibility of the resource. A scoped resource is a resource defined under another scope. For example, an **API Service** can only be defined under the **Environment** scope. In the example above the webhook 'JIRA approval webhook' is scoped under an environment whose name is 'azure-apiman-service' 
* **Unscoped**: Top level resources that can group a set of other resources. **Environments** and **Integrations** are unscoped resource types.

### Metadata
When you retrieve a resource from the API Server you will note that it has a 'metadata' field. Metadata are server side generated resource information. You can retrieve a resource using the 'get' CLI command. For example here is a definition of an environment showing it's metadata.
The command to run to get an environment named 'apigtw-v77' and out the result in yaml:
```sh
axway central get env apigtw-v77 -o yaml
```
Will result in the following output:
```yaml
group: management
apiVersion: v1alpha1
kind: Environment
name: apigtw-v77
title: Axway API Gateway v7.7
metadata:
  id: e4e0892e71a3f7b00171a4779f3501f0
  audit:
    createTimestamp: 2020-04-23T00:37:15.190+0000
    createUserId: DOSA_6c81495138a743d29e9b4ae6704c2d39
    modifyTimestamp: 2021-06-23T03:50:40.782+0000
    modifyUserId: 6563ef56-bbab-48a9-bc4a-e564cb3fa148
  resourceVersion: '4824'
  references: []
  selfLink: /management/v1alpha1/environments/apigtw-v77
attributes:
  x-axway-agent: 'true'
finalizers: []
tags:
  - v7.7
  - R&D
spec:
  icon:
    data: >-
      iVBORw0KGgoAAAAN5cs
      .....................................................
      .....................................................
      AAhDogAAC0oETKQIEIACBEgT+D7YJdhNs2CXhAAAAAElFTkSuQmCC
    contentType: image/png
  production: true
  description: >-
    This is R&D environment for representing the v7.7 Gateway on lpttntperf1 lab
    machine.
  axwayManaged: false
```
Metadata fields
* **id**: unique **id** for the resource in the entire system 
* **audit**: create/modify timestamp and user ids
* **references**: An API Server resource can **refer** other resource(s) withing their spec or sub resource (for example an APIServiceInstance refers an APIServiceRevision by it's name). The metadat.references provides more information about the reffered resource, like the resource id/name/kind/scopeName/scopeKind/selfLink/type. References can be of two types: soft and hard. (more info here: https://git.ecd.axway.org/apigov/api-server/#resource-references)
* **scope**: only present for the scoped resources. Provides information about the scope in which the resource is defined
* **resourceVersion**: indicates how many times a resource was updated. The metadata.resourceVersion can be used to detect if the resource has been changed on the server side. If sent in the put request and it's not the same value as what's on the server side, a 428 http error code is returned. If not sent in the request, the put request will override what's present on the server side no matter if the resource has been changed since it was read by the client doing the update.
* **selfLink**: The api path with which the current resource can be accessed. Resources can be accessed within their scopes or across scopes. The selfLink provides an easy way to get access to a specific resource and mutate the data. For example if you look at API Services under an environment you will note that the self link will contain the environment name and the name of the API Server.
To view the apis under an environment call 'apigtw-v77' run the following command:
```sh
axway central get apis -s apigtw-v77 -o yaml
```
You will note that the **selfLink** contains the environment name and the name of the API service:
```yaml
metadata:
  id: e4e8e508720d14080172381e0fa554a3
  audit:
    createTimestamp: 2020-05-21T16:43:13.703+0000
    createUserId: DOSA_6c81495138a743d29e9b4ae670422d39
    modifyTimestamp: 2020-05-21T16:43:13.703+0000
    modifyUserId: DOSA_6c81495138a743d29e9b4ae670422d39
  scope:
    id: e4e0892e71a3f7b00171a4779f3501f0
    kind: Environment
    name: apigtw-v77
    selfLink: /management/v1alpha1/environments/apigtw-v77
  resourceVersion: '12'
  references: []
  selfLink: /management/v1alpha1/environments/apigtw-v77/apiservices/ny-times-articles
attributes:
  createdBy: EnterpriseEdgeGatewayAgent
  externalAPIID: ace84b76-2207-4bd8-a78e-44d170302a77
finalizers: []

```

## Webhooks
Webhooks are used to automatically receive notifications of events that happen to resources in the API Server. For example, when an new asset is discovered in a environment or when an item is subcribed to in the marketplace. Webhooks allow you to configure integrations on resources in Amplify Central. When one of those event is triggered, Amplify Central sends an HTTP POST payload to the URL configured in the webhook. Once you receive an event on your server, you can process and act on it as you need.

You can use webhooks to define a custom approval flow, set up a policy to validate discovered APIs or deploy to your production server.

Each event payload that your webhook server will receive will be structured similar to the example below, which is for when a new API is discovered in an environment:
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
#### Anatomy of a webhook event:

Each event payload that your webhook server will receive will be structured similar to the example above which has the following format:
* **id**: A uid for the webhook event
* **time**: Indicates the time when the webhook was triggered by a change in resource
* **correlationId:** Each API request is tagged with an id once it recieved by Amplify Central. The correlationId is the id of the orginating request which updated the system. Please note, that an API call into Amplify Central may result in a number of changes to resources in Central. For example, consider the result of deleting an enviornment request which will result in cascade delete of all the resources and subresources of that environment.
* **organization:** Indicates the organization id which the resource belongs to
* **type:** Indicates if this is an create, update or delete event. Supported types: ResourceCreated/ResourceUpdated/ResourceDeleted/SubResourceUpdated
* **payload:** This contains the contents of the resource which changed and resulted in the webhook being triggered

## Setting up a webhook
If you wish to recieve Webhook event notifications from the API Server you need to complete the following steps:
1. Create a webhook which will be called on a particular event
2. Create the tigger which will invoke the webhook URL defined in step 1.

### 1. Create a webhook
To start receiving notifications of events, you'll need to create a webhook that details the server that will receive the notifications. This can be achieved by creating a Webhook resource in the API Server, here is an example of yaml for a webhook:
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
Some key fields in the Webhook resource:
* **$name**: Webhook unique identifier.
* **$title**: Webhook friendly name.
* **$spec.url**: URL of the server that will receive the webhook `POST`requests.
* **$spec.enabled**: When enabled will invoke the webhook.

You can create the webhook resource using the CLI:
```sh
axway central apply -f webhook.yaml
✔ "Webhook/invoke-jira-webhook" in the scope "Environment/azure-apiman-service" has successfully been updated.
```
### 2. Create the trigger
Now that the webhook has been created you need to say when the webhook will be invoked. You can setup a webhook on any resource in Amplify Central by configuring a **Resource hook**. An event will be published on any CRUD operation. When the resource hook trigger conditions match, the resource hook referenced webhooks will be invoked, and an HTTP `POST` payload will be sent to the webhook's URL. For example, the webhook can be invoked when a new API asset is created.

The following are examples of the **Resource Hook** payload.

Monitor all API service revisions changes in *invoke-jira-webhook* environment:

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

Monitor changes in a specific environment 'azure-apiman-service' and on all its resources:

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

## Advanced setup. 
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

## Configure webhooks on catalog asset subscriptions

Amplify Unified Catalog provides event-driven subscription management capabilities that enable you to create custom subscription flows for each registered environment in Amplify Central, enabling complex approval flows and integration with existing systems to streamline the experience and reduce the time for approval.

To publish an asset to the Amplify Unified Catalog with a custom subscription flow that will be triggered on any subscription events, you will need to:

* Create an environment in Amplify Central.
* Create an API service, API service instance, and API service revision.
* Create a webhook with a secret, if you want to secure the webhook.
* Create a custom subscription definition that references the webhook.
* Create a consumer instance that references the subscription definition for publishing the asset to the Amplify Unified Catalog.

To configure the resources listed above, see [Axway Central CLI](/docs/integrate_with_central/cli_central/cli_publish/). Alternatively, you can use the example provided in our [Postman Collection](https://documenter.getpostman.com/view/2125605/SzKbLaVV?version=latest#44df18e7-2802-4786-bd60-7efb7cf5e63a).

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

* **$spec.webhooks**: Array of references to webhook resources, which will be invoked when on subscriptions to a catalog asset that references this subscription definition.
* **$spec.schema**: Any valid JSON schema specifying the information required during subscription from the consumers. Amplify Unified Catalog currently only supports JSON schema `draft-04`, so the provided schema in the subscription definition must be [draft-04](http://json-schema.org/).

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

Click [subscriptionEventSchema.json](https://amplify-central.netlify.app/samples/central/subscriptionEventSchema.json) to download a sample of a subscription event schema.

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

Click [subscriptionEventPayload.json](https://amplify-central.netlify.app/samples/central/subscriptionEventPayload.json) to download a sample event payload that is sent to a webhook referenced in a subscription definition.

## Further information

* See the [Amplify Unified Catalog tutorials](https://github.com/Axway/unified-catalog-integrations) for setting up integrations with the Amplify Unified Catalog.
