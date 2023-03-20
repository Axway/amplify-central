---
title: API Server overview
linkTitle: API Server overview
weight: 110
---
The core of the Amplify management plane is the API Server. The API Server exposes an HTTP API that allows you to configure different parts of the management plane. The API Server's API lets you query and manipulate the state of resources in Amplify. For example: Environments, API Services, Secrets, Webhooks.

Most operations can be performed through the Axway command-line interface, which in turn uses the API. However, you can also access the API directly using REST calls. The REST documentation is publicly available at [Axway API Server](https://apicentral.axway.com/apis/docs).

The [API](https://apicentral.axway.com/apis/docs) exposes a standard CRUD interface for all resources available in Amplify. These resources model the governance for different data planes that Amplify is managing.

## REST requests for resources

The following tables describe the API style in terms of GET, PUT, POST etc. and the URL format to locate resources.

### Unscoped resources

| Operation | URL                                                                       | Description                                                                                               |
|-----------|---------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| GET       | /apis/{group}/{apiVersion}/{resourceNamesPlural}                          | Lists all resources of the kind related to the resourceNamesPlural and the specified group and version.    |
| POST      | /apis/{group}/{apiVersion}/{resourceNamesPlural}                          | Creates a new resource of the kind related to the resourceNamesPlural and the specified group and version. |
| GET       | /apis/{group}/{apiVersion}/{resourceNamesPlural}/{name}                   | Retries a resource with a specific name.                                                                   |
| DELETE    | /apis/{group}/{apiVersion}/{resourceNamesPlural}/{name}                   | Removes a resource with a specific name.                                                                   |
| PUT       | /apis/{group}/{apiVersion}/{resourceNamesPlural}/{name}                   | Updates a resource with a specific name.                                                                   |
| GET       | /apis/{group}/{apiVersion}/{resourceNamesPlural}/{name}/{subResourceName} | Retrieves a subresource with the specified spec name.                                                     |
| PUT       | /apis/{group}/{apiVersion}/{resourceNamesPlural}/{name}/{subResourceName} | Updates a subresource with the specified spec name.                                                        |

### Scoped resources

| Operation | URL                                                                                                                        | Description                                                                                            |
|-----------|----------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| GET       | /apis/{group}/{apiVersion}/{resourceNamesPlural}                                                                           | Lists all resources of the kind related to the resourceNamesPlural and the specified group and version. |
| GET       | /apis/{group}/{apiVersion}/{scopedResourceNamesPlural}/{scopedResourceName}/{resourceNamesPlural}                          | Lists all the resources under their defined scope.                                                     |
| POST      | /apis/{group}/{apiVersion}/{scopedResourceNamesPlural}/{scopedResourceName}/{resourceNamesPlural}                          | Creates a new resources under its defined scope.                                                       |
| GET       | /apis/{group}/{apiVersion}/{scopedResourceNamesPlural}/{scopedResourceName}/{resourceNamesPlural}/{name}                   | Retries a resource with a specific name under the specified scope name.                                 |
| DELETE    | /apis/{group}/{apiVersion}/{scopedResourceNamesPlural}/{scopedResourceName}/{resourceNamesPlural}/{name}                   | Removes a resource with a specific name under the specified scope name.                                  |
| PUT       | /apis/{group}/{apiVersion}/{scopedResourceNamesPlural}/{scopedResourceName}/{resourceNamesPlural}/{name}                   | Updates a resource with a specific name under the specified scope name.                                  |
| GET       | /apis/{group}/{apiVersion}/{scopedResourceNamesPlural}/{scopedResourceName}/{resourceNamesPlural}/{name}/{subResourceName} | Retrieves a subresource with the specified spec name under the specified scope.                       |
| PUT       | /apis/{group}/{apiVersion}/{scopedResourceNamesPlural}/{scopedResourceName}/{resourceNamesPlural}/{name}/{subResourceName} | Updates a subresource with the specified spec name under the specified scope.                          |

All operations on the API Server can be performed via the Axway CLI and the Amplify Central CLI. For example, to view all resource types that are available in the system, run the following `get` command and provide an argument as to the type to get:

```shell
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

Types in the system:

* **Environment**: A logical group of API assets within a user or customer defined context. For example, you can create an environment to represent your remote gateway environment, such as AWS or Amplify API Manager.
* **API Service**: An API asset, including all its revisions and deployed endpoints, and additional information to represent your API. For example, description, environment scope, image encoded in base64.
* **API Service Revision:** Indicates incremental changes to an API asset. It comprises of the interface (contract), implementation, and instance of the API. An API can have multiple revisions. A client can call different versions of an API to realize different behaviors.
* **API Service Instance:** Instance where an API revision (version) is deployed. This endpoint is consumable by clients and it is typically represented as a URL with a port number.
* **Consumer Subscription Definition**: A subscription definition contains the configuration of the data needed for a consumer to subscribe or register to an asset in the Amplify Unified Catalog. It has a reference to a webhook that will be invoked on a subscription or registration event. The subscription definition is referenced in the Consumer Instance resource.
* **Consumer Instance:** Contains all the configuration for publishing an asset in the Amplify Unified Catalog for consumption.
* **Webhook**: Defines the webhook URL that will be invoked on certain events.
* **Integrations:** Logical grouping of webhook integrations.
* **Resource Hook**: Allows you to configure webhooks for resources (environments, API Service) in Amplify

## Anatomy of a resource in API Server

Each resource in your configuration has a **name** field; however, the name is optional. If not provided, API Server will generate one. A value provided for a name must be unique with a scope of a resource. For example, Environment (unscoped resource) name is unique across all Environments. For APIService (scoped to the Environment), the name is unique inside that Environment.

The following is an example of .yaml file that shows the fields for defining a webhook in the system:

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

* **group**: resources are defined under a group, which is part of the API's endpoints path.
* **apiVersion**: the version of the API Server API you're using to create this object.
* **kind**: the type of object this represents. Kinds are Camel case, for example: Environment, APIService, APIServiceRevision, Webhook.
* **name**: uniquely identifies this resource. Only one resource of a given kind in a given scope can have a given name at a time. A name is either client-provided or an auto-generate string that refers to an object in a resource URL. Example: /management/v1alpha1/environments/mesh where 'mesh' is the name of an environment resource.
* **title**: a display name for the resource when it is shown in the UI.
* **metadata**: resource information.
* **spec**: the state you desire for the object.

### Scoped and unscoped resources

API Server supports **scoped** and **unscoped** types of resources. The resources are defined under a group, which is part of the API's endpoints path. Each endpoint is tagged with the resource group name.

* **Scoped**: a **scope** refers to the lifetime and accessibility of the resource. A scoped resource is a resource defined under another scope. For example, an **API Service** can only be defined under the **Environment** scope. In the example above the webhook 'JIRA approval webhook' is scoped under an environment whose name is 'azure-apiman-service'.
* **Unscoped**: top-level resources that can group a set of other resources. **Environments** and **Integrations** are unscoped resource types.

### Metadata

When you retrieve a resource from the API Server, notice that it has a 'metadata' field. Metadata is server-side generated resource information. You can retrieve a resource using the 'get' CLI command. The following example is a definition of an environment showing its metadata.
The command to run to get an environment named `apigtw-v77` and output the result in yaml:

```shell
axway central get env apigtw-v77 -o yaml
```

Results in the following output:

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

Metadata fields:

* **id**: unique **id** for the resource in the entire system.
* **audit**: create/modify timestamp and user IDs.
* **references**: an API Server resource can **refer** other resource(s) withing their spec or subresource (for example, an APIServiceInstance refers an APIServiceRevision by its name). The metadata references provide additional information about the referred resource, like the resource id/name/kind/scopeName/scopeKind/selfLink/type. References can be of two types, soft and hard.
* **scope**: only present for the scoped resources. Provides information about the scope in which the resource is defined.
* **resourceVersion**: indicates how many times a resource was updated. The metadata.resourceVersion can be used to detect if the resource has been changed on the server side. If sent in the put request and it's not the same value as what's on the server side, a 428 HTTP error code is returned. If not sent in the request, the put request will override what's present on the server side no matter if the resource has been changed since it was read by the client doing the update.
* **selfLink**: the api path with which the current resource can be accessed. Resources can be accessed within their scopes or across scopes. The selfLink provides an easy way to get access to a specific resource and mutate the data. For example, if you look at API Services under an environment you will notice that the selfLink contains the environment name and the name of the API Server.

To view the APIs under an environment named `apigtw-v77`, run the following command:

```shell
axway central get apis -s apigtw-v77 -o yaml
```

Note that the **selfLink** contains the environment name and the name of the API service:

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
