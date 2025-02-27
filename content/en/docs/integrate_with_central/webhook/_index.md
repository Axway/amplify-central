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
* Manage validation on changes to discovered API services in an environment to ensure they comply with corporate standards

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
    "product": "EnterpriseMarketplace",
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
* **correlationId:** each API request is tagged with an id once it is received by Amplify. The correlationId is the id of the originating request which updated the system. Note that an API call into Amplify may result in a number of changes to resources in Amplify. For example, consider the result of deleting an environment request which will result in a cascade delete of all the resources and subresources of that environment.
* **organization:** indicates the organization id that the resource belongs to.
* **type:** indicates if this is a create, update or delete event. Supported types: ResourceCreated/ResourceUpdated/ResourceDeleted/SubResourceUpdated.
* **payload:** contains the contents of the resource that changed and resulted in the webhook being triggered.

## Setting up a webhook

To receive webhook event notifications from the API Server, you must complete the following steps:

1. Create an integration which will act as the scope of the webhook.
2. Create a webhook which will be called on a particular event.
3. Create the trigger which will invoke the webhook URL that was defined in the previous step.

### Create the integration

The integration is a simple name to group webhooks together. For instance, you can have an integration for managing the subscription notification where several webhooks are involved.

```yaml
group: management
apiVersion: v1alpha1
kind: Integration
name: monitor-resources
title: Monitor any resources
attributes: {}
finalizers: []
tags:
  - integration
spec:
  description: >-
    Monitors any objects across all Environments.
```

You can create the integration resource using the CLI:

```shell
axway central apply -f integration.yaml
✔ "Integration/monitor-resources" has successfully been created.
```

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
    kind: Integration
    name: monitor-resources
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
* **$metadata.scope.name**: webhook integration scope name.
* **$spec.url**: URL of the server that will receive the webhook `POST`requests.
* **$spec.enabled**: when enabled will invoke the webhook.

You can create the webhook resource using the CLI:

```shell
axway central apply -f webhook.yaml
✔ "Webhook/invoke-jira-webhook" in the scope "Integration/monitor-resources" has successfully been created.
```

{{< alert title="Caution" color="danger" >}}
For an HTTPS webhook endpoint, you must have a certificate issued by a valid certificate authority, not a self-signed certificate. Otherwise, no events will be received by the webhook endpoint.
{{< /alert >}}

### Create the trigger

After the webhook has been created, you must specify when the webhook will be invoked. You can set up a webhook on any resource in Amplify by configuring a **Resource hook**. An event will be published on any CRUD operation. When the resource hook trigger conditions match, the resource hook referenced webhooks will be invoked, and an HTTP `POST` payload will be sent to the webhook's URL. For example, the webhook can be invoked when a new API asset is created.

The following are examples of the **Resource Hook** payload.

Monitor all API service revisions from *invoke-jira-webhook*:

```yaml
group: management
apiVersion: v1alpha1
kind: ResourceHook
name: apiservicerevisions-hook
title: Monitor API Service Revision changes from 'azure-apiman-service' Environment
metadata:
  scope:
    kind: Integration
    name: monitor-resources
attributes: {}
finalizers: []
tags: []
spec:
  triggers:
    - kind: APIServiceRevision
      group: management
      name: '*'
      type:
        - created
        - updated
        - deleted
      scope:
        kind: Environment
        name: 'azure-apiman-service'
  webhooks:
    - invoke-jira-webhook
```

Monitor changes on all environment resources:

```yaml
group: management
apiVersion: v1alpha1
kind: ResourceHook
name: environments-hook
title: Monitor all Environment resources
metadata:
  scope:
    kind: Integration
    name: monitor-resources
attributes: {}
finalizers: []
tags: []
spec:
  triggers:
    - kind: Environment
      group: management
      name: '*'
      type:
        - created
        - updated
        - deleted
      scope:
        kind: Environment
        name: 'azure-apiman-service'
  webhooks:
    - invoke-jira-webhook
```

Monitor changes in a specific environment "azure-apiman-service" and on all its resources:

```yaml
group: management
apiVersion: v1alpha1
kind: ResourceHook
name: environments-hook
title: Monitor Environment azure-apiman-service and all its resources
metadata:
  scope:
    kind: Integration
    name: monitor-resources
attributes: {}
finalizers: []
tags: []
spec:
  triggers:
    - kind: Environment
      group: management
      name: 'azure-apiman-service'
      type:
        - created
        - updated
        - deleted
    - kind: '*'
      group: management
      name: '*'
      type:
        - created
        - updated
        - deleted
      scope:
        kind: Environment
        name: 'azure-apiman-service'
  webhooks:
    - invoke-jira-webhook
```

* **$name**: resource hook unique name.
* **$title**: resource hook friendly name.
* **$metadata.scope.name**: resource hook integration scope name.
* **$spec.triggers.group**: value for the group of the resource.
* **$spec.triggers.scope**: resource scope trigger details.
* **$spec.triggers.scope.kind**: the type of the resource. For example, the webhook will be invoked on any events on resources of type **Environment**.
* **$spec.triggers.scope.name**: the name of the resource of the type specified. "*" represents any. When you specify a name, the webhook will be invoked on any resource in the environment with that name.
* **$spec.triggers.kind**: the resource in the scope defined via `$spec.triggers.scope.kind`. "*" represents any. For example, APIService under the **Environment** type. Instead of a wildcard, you can provide specific names to set up a trigger to invoke the webhooks.
* **$spec.triggers.name**: the name of the trigger of the type specified. "*" represents any. When you specify a name, the webhook will be invoked on any resource in the environment with that name.
* **$spec.triggers.type**: the type of the event. Accepted values: **created**, **updated**, **deleted**
* **$spec.webhooks**: a list of webhook names that determine which webhooks will be invoked on matching triggers.

The following is an example of "When resource type of kind `APIService` with any name is created, updated, or deleted in any group, with any scope kind and name", the webhooks defined in the resource hook will be invoked:

```yaml
    - kind: 'APIService'
      group: management
      name: '*'
      type:
        - created
        - updated
        - deleted
      scope:
        kind: '*'
        name: '*'
```

## Advanced setup for securing webhook

### Using a secret in the Authorization header

A secret is a key-value pair associated with a webhook to secure it. By setting the secret, you ensure that the `POST` request sent to the payload URL is from Axway.

The secret value will be used as an Authorization header.

Example of a secret payload:

```yaml
Kind: Secret
name: secret-for-webhook
title: Axway Environment Test
metadata:
  scope:
    kind: Integration
    name: monitor-resources
spec:
  data:
    apikey: secretValue
```

* **$name**: the secret unique name.
* **$title**: the secret friendly name.
* **$metadata.scope.name**: secret integration scope name.
* **$spec.data**: key value pairs.

Example of a webhook payload referencing a secret:

```yaml
group: management
apiVersion: v1alpha1
kind: Webhook
name: webhook
title: Webhook to invoke requestbin.com
metadata:
  scope:
    kind: Integration
    name: monitor-resources
spec:
  auth:
    secret:
      name: secret-for-webhook
      key: apikey
  enabled: true
  url: https://enveb85y26nv.x.pipedream.net
```

* **$name**: webhook unique identifier.
* **$title**: webhook friendly name.
* **$metadata.scope.name**: webhook integration scope name.
* **$spec.url**: URL of the server that will receive the webhook `POST`requests.
* **$spec.auth.secret**: use when the webhook is secured and needs a secret to invoke.
* **$spec.auth.secret.name**: name of the secret, as defined in the payload.
* **$spec.auth.secret.key**: key to the secret, which will be used to invoke the webhook.
* **$spec.enabled**: when enabled, will invoke the webhook.

When the webhook will be trigger, the receiver will have in the Authorization header the value of the secret.

### Using a secret in a specified header

In case you may not want to use the Authorization header (default) but a different header to send the secret value, you can specify an additional field in the webhook to tell where the secret value will be sent.

Example of a webhook payload referencing a secret and its destination header `x-api-key`:

```yaml
group: management
apiVersion: v1alpha1
kind: Webhook
name: webhook
title: Webhook to invoke requestbin.com
metadata:
  scope:
    kind: Integration
    name: monitor-resources
spec:
  auth:
    secret:
      name: secret-for-webhook
      key: apikey
    location: 
      in: header
      name: x-api-key
  enabled: true
  url: https://enveb85y26nv.x.pipedream.net
```

* **$spec.auth.secret**: use when the webhook is secured and needs a secret to invoke.
* **$spec.auth.secret.name**: name of the secret, as defined in the payload.
* **$spec.auth.secret.key**: key to the secret, which will be used to invoke the webhook.
* **$spec.auth.location.in**: place where the secret will be put in the payload `header` or `query`.
* **$spec.auth.location.name**: name of the header

### Add more headers to the webhook

It could be interesting to add additional headers to the webhook to help the receiver understand where it originated.

Example of webhook with an `x-origin` and `x-random-value` headers:

```yaml
group: management
apiVersion: v1alpha1
kind: Webhook
name: webhook
title: Webhook to invoke requestbin.com
metadata:
  scope:
    kind: Integration
    name: monitor-resources
spec:
  auth:
    secret:
      name: secret-for-webhook
      key: apikey
  enabled: true
  url: https://enveb85y26nv.x.pipedream.net
  headers:
    x-origin: Axway marketplace
    x-random-value: a-s39073
```

* **$spec.headers**: list of header name/value to send along with the webhook payload. Only string value are accepted.

## Related topics

The following links provide step-by-step instructions for common integrations through events / webhooks.
