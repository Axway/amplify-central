---
title: API Server overview
linkTitle: API Server overview
weight: 110
---
The core of the Amplify management plane is the API Server. The API Server exposes an HTTP API that allows you to configure different parts of the management plane. The API Server's API lets you query and manipulate the state of resources in Amplify. For example: Environments, API services, Secrets, Webhooks.

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
apispecs                  apisp                APISpec                         true    Mesh                         management    
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
* **Webhook**: Defines the webhook URL that will be invoked on certain events.
* **Integrations:** Logical grouping of webhook integrations.
* **Resource Hook**: Allows you to configure webhooks for resources (environments, API service) in Amplify

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
* **selfLink**: the api path with which the current resource can be accessed. Resources can be accessed within their scopes or across scopes. The selfLink provides an easy way to get access to a specific resource and mutate the data. For example, if you look at API services under an environment you will notice that the selfLink contains the environment name and the name of the API Server.

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

### Ownership and sharing

Two kinds of users interact with API Server objects:

* **Engage Admin**: a powerful user that can do anything.
* **Regular team**: a user belongings to one or multiple teams with specific roles in each team. The roles limit the the user's interaction with the system.

For more information about roles, see [Role and Capabilities](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/organization_roles_and_features/index.html#roles-and-capabilities) / [Team roles](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/organization_roles_and_features/index.html#team-roles) documentation.

{{< alert title="Note" color="primary" >}}
A service account for CI/CD can have either a Engage Admin role or a team role based on the need of interaction.
{{< /alert >}}

The person (or service account) creating an object in the system automatically becomes the owner of the object through the team it was created with. Meaning all users of the same team can manage any object created by a team member. Users from a team cannot see objects created by another team unless the owning team decides to share the object with them. See [Access Control List](/docs/integrate_with_central/api_server/#access-contral-list) for sharing an object across teams.

The exception for this is related to the Engage Admin role. Since this role does not belongs to any team, all objects created by a Engage Admin user will only be visible by other Engage Admin users. A user that is part of a team will not be able to see objects created by the Engage Admin unless the Engage Admin shares the object with that team. See [Access Control List](/docs/integrate_with_central/api_server/#access-contral-list) for sharing an object across teams.

The object owner is located in the `owner` property of each object. This property is absent if the object is created by a Engage Admin user.

Sample of environment owned by the *API Development* team:

```yaml
group: management
apiVersion: v1alpha1
kind: Environment
name: doc-tutorial
title: Doc tutorial
owner:
  type: team
  id: d9120f39*****************
  teamName: API Development
...
```

#### Access Control List

An Access Control List or ACL allows an object owner to share the object with other teams. The sharing can be:

* read only: any member of the team the object is shared with can see it if its team role permits.
* edit: any member of the team the object is shared with can modify it if its team role permits.
* delete: any member of the team the object is shared with can modify it if its team role permits.

Anatomy of an ACL object:

```yaml
group: catalog
apiVersion: v1alpha1
kind: AccessControlList
name: acl-tutorial-doc
metadata:
  scope:
    kind: _MainObjectKind_
    name: main-object-name
spec:
  rules:
    - access:
      # Allow users to update/delete the unscoped resource this ACL is scoped under.
      - level: scope
        allowDelete: true/false/null
        allowWrite: true/false/null
      # Allows users to create/update/delete scoped resources. Does not apply to unscoped resource.
      - level: scopedKind
        kind: "*"
        allowCreate: true/false/null
        allowDelete: true/false/null
        allowWrite: true/false/null
      # Allows users to update/delete the 1 referenced scoped resource.
      - level: scopedResource
        kind: APIService
        name: my-api
        allowDelete: true/false/null
        allowWrite: true/false/null
  subjects:
    # list of team the ACL applies to
    - type: team
      id: "*"
```

If you have multiple permissions referencing the same resource, then it will be resolved as follows:

* **false** takes precedence over **true** and **null**/**undefined**.
* **true** takes precedence over **null**/**undefined**.
* **null**/**undefined** defaults to **false** for resources you do NOT own or **true** for resources you do own.

{{< alert title="Note" color="primary" >}}
For the subject, you can use '*' to give access to all teams, or use the teamId to specify a specific team.
{{< /alert >}}

#### ACL and scoped objects

When an object is scoped to another, the sharing of the depending objects is not automatic.

For instance, when an API Service is scoped to environment and that environment is shared with another team, it does not imply that the other team will gain access to the API of the environment.

General rule:

| Parent object ownership | Scoped object ownership | Applied ownership to the scoped object |
|-------------------------|-------------------------|----------------------------------------|
| Owner A                 | None                    | Owner A                                |
| Owner A                 | Owner B                 | Owner B                                |

When an object is added to a parent (or scope), the ownership will either be from the parent or from the scoped object. It is the explicit will of the owner of the object.

Sample for sharing only environment with team1 and team2:

```yaml
---
group: management
apiVersion: v1alpha1
kind: AccessControlList
name: doc-sharing-env
title: Doc sharing doc-env only with team1 and team2
metadata:
  scope:
    kind: Environment
    name: doc-env
  acl: []
  accessRights:
    canChangeOwner: true
    canDelete: true
    canWrite: true
    canRead: true
attributes: {}
finalizers: []
tags: []
spec:
  rules:
    - access:
        - level: scope
  subjects:
    - id: 37cea73d-9d63-*********
      type: team
    - id: bf5c20e9-a2a9-*********
      type: team
```

Sample for sharing environment and depending API Service with team1 and team2:

```yaml
---
group: management
apiVersion: v1alpha1
kind: AccessControlList
name: doc-sharing-apiservice
title: Doc sharing API Service from doc-env with team1 and team2
metadata:
  scope:
    kind: Environment
    name: doc-env
  acl: []
  accessRights:
    canChangeOwner: true
    canDelete: true
    canWrite: true
    canRead: true
attributes: {}
finalizers: []
tags: []
spec:
  rules:
    - access:
        - level: scopedKind
          kind: "apiservice"
  subjects:
    - id: 37cea73d-9d63-*********
      type: team
    - id: bf5c20e9-a2a9-*********
      type: team
```

Sample for sharing environment and specific depending API Service with team1 and team2:

```yaml
---
group: management
apiVersion: v1alpha1
kind: AccessControlList
name: doc-sharing-apiservice-instance
title: Doc sharing API Service service1 from doc-env with team1 and team2
metadata:
  scope:
    kind: Environment
    name: doc-env
  acl: []
  accessRights:
    canChangeOwner: true
    canDelete: true
    canWrite: true
    canRead: true
attributes: {}
finalizers: []
tags: []
spec:
  rules:
    - access:
        - level: scopedKind
          kind: "apiservice"
          name: "service1"
  subjects:
    - id: 37cea73d-9d63-*********
      type: team
    - id: bf5c20e9-a2a9-*********
      type: team
```

#### Attaching ACL to an object

Once the ACL is defined, you need to attach it to the scope object using the `acl` property in metadata of the object. The acl object needs to be created first and then get its id to add it into the metadata.acl.aclId

Sample to add an ACL to an environment:

First get the aclId:

```bash
# get the ACL Id
axway central get acl -s doc-env -o json | jq -r '.[0],matedata.id'
```

Then add the aclId in the acl definition

```yaml
---
group: management
apiVersion: v1alpha1
kind: Environment
name: doc-env
title: Environment for documentation tutorial
metadata:
  acl:
    - subjectType: team
      subjectId: d9120f39-88d1-4977-bc56-5dd7d7335a18
      aclId: 8a2e92f084b161380184c9735a212987
      scopedResourceKind: '*'
      scopedResourceName: '*'
      scopedResourceOwnerId: '*'
...
```

### Multi-languages support

Some objects support translation definitions to visualize them based on the language context used:

List of objects and fields that support translation:

* **Product**: title, description
* **Product Plan**: title, description
* **Product Plan Quota**: name
* **Product Documentation**: topic name, topic description, section name, section description, article name, article description, article markdown
* **Document Library Document**: document title, document description, markdown content, binary content (PDF/PPTX,...), url
* **Category**: title, description
* **Stage**: title, description
* **SubscriptionRequestDefinition**: title, each object in the schema having title and/or description
* **AccessRequestDefinition**: title, each object in the schema having title and/or description
* **CredentialRequestDefinition**: title, each object in the schema having title and/or description

These translations are provided using two different sub-resources attached to the object:

* The default language sub-resources
* The language specific sub-resource (one for each translated languages)

Sample sub-resource for setting the object default language as English:

```json
{
    "languages": {
        "resource": {
            "code": "en-us"
        }
    }
}
```

Similar resource in yaml format:

```yaml
---
languages:
  resource:
    code: en-us
```

This default sub-resource indicates that each individual field of the object is now using the referenced language code.

Available supported language codes are:

* **en-us** for English
* **fr-fr** for French
* **de-de** for German
* **pt-br** for Brazilian Portuguese

Any other code will be rejected by the system.

Each translated field has its existing path in the object and the associated translated value. The path is determine using the place of the field in the object. For instance, title is at the top level; whereas, description is located under the spec section of an object. Consequently, the path for **title** would be *"/title"* and the path for **description** is *"/spec/description"*.

Sample sub-resource for setting a French language translation to any object having a *title* and *description*:

```json
{
    "languages-fr-fr": {
        "values": [
            {
                "path": "/title",
                "value": "Produit de d�monstration (FR)"
            },
            {
                "path": "/spec/description",
                "value": "Ce produit fait ceci et cela... (FR)"
            }
        ]
    }
}
```

Similar resource in yaml format:

```yaml
---
languages-fr-fr:
  values:
  - path: "/title"
    value: Produit de d�monstration (FR)
  - path: "/spec/description"
    value: Ce produit fait ceci et cela... (FR)
```

Using the above definitions, the following code internationalizes a product with the default language of English and translated into French and German:

```json
{
    "group": "catalog",
    "apiVersion": "v1alpha1",
    "kind": "Product",
    "title": "Product in English",
    "spec": {
        "assets": [
            {
                "name": "petstore"
            }
        ],
        "description": "That product does this and that..."
    },
    "languages": {
        "resource": {
            "code": "en-us"
        }
    },
    "languages-fr-fr": {
        "values": [
            {
                "path": "/title",
                "value": "Produit en Fran�ais"
            },
            {
                "path": "/spec/description",
                "value": "Ce produit fait ceci et cela..."
            }
        ]
    },
    "languages-de-de": {
        "values": [
            {
                "path": "/title",
                "value": "Produkt auf Deutsch"
            },
            {
                "path": "/spec/description",
                "value": "Dieses Produkt macht dies und das..."
            }
        ]
    }    
}
```

Once the above settings are imported, using either Amplify CLI or the Amplify API, the product can be view in three languages: English, French and German.

By default, when requesting an object using the CLI or API, the languages are not returned. You must add an extra parameter to your command to get that information: `--language`

Sample to get all language information from the product called "product-i18n":

```cmd
axway central get product product-i18n --language=* -o json
```

Getting a single language information from product called product-i18n:

```cmd
axway central get product product-i18n --language=fr-fr -o json
```

Getting multiple language information from product called product-i18n:

```cmd
axway central get product product-i18n --language=fr-fr,en-us -o json
```

It is also possible to get all the constraints of the fields that need to be translated:

* CLI - use **--languageDefinition={languageCode}** parameter
* API - use **embed=languages-{languageCode}.resource&expand=languages-{languageCode}&fields=languages-{languageCode}.values** to query parameters when getting the object

Sample for getting all fields from product called "product-i18n":

```cmd
axway central get product product-i18n --languageDefinition=fr-fr -o json 
```

will return:

```json
{
    "languages-fr-fr": {
        "values": [
            {
                "path": "/title",
                "status": "undefined",
                "_embedded": {
                    "resource": {
                        "schema": {
                            "type": "string",
                            "maxLength": 350,
                            "description": "The resource title."
                        },
                        "value": "Product i18n"
                    }
                }
            },
            {
                "path": "/spec/description",
                "status": "undefined",
                "_embedded": {
                    "resource": {
                        "schema": {
                            "type": "string",
                            "description": "Description of the Product.",
                            "maxLength": 350
                        },
                        "value": "Help me there"
                    }
                }
            }
        ]
    }
}
```

Each time an object is updated, the system computes the completeness status of each individual field. If a field is not mandatory, then the missing translated field status is not impacting. If a mandatory field is missing in the translation sub-resource, then the status of that field is incomplete and the global status of the sub-resource is incomplete.

Sub-resource possible statuses:

* **Complete**: translation is available
* **Incomplete**: some translations are missing
* **Undefined**: no translation provided

#### Changing the default language

To update the default language, you must first to ensure that the new default language is not already part of the language-specific resource.

For instance, if your current default language is English and you have the additional language as Portuguese, then you are not allowed to change the default language to Portuguese until the Portuguese additional resources are removed.

To remove an additional language, you must mark all the properties of the language as undefined:

```json
{
    "languages-fr-fr": {
        "values": [
            {
                "path": "/title",
                "status": "undefined"
            },
            {
                "path": "/spec/description",
                "status": "undefined"
            }
        ]
    }
}
```

Once this is done, you can change the default language to the new language, as described previously.

## Designing resources within VS Code

Any Amplify Central resource content can be created/validated within Visual Studio Code by using the [yaml plugin](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml&ssr=false#overview). Add the following to the yaml schemas section of the plugin settings to start validating any yaml file ending with ***.central.yaml**: `“<CENTRAL_URL>/apis/jsonschema”: “/.central.yaml”` where <CENTRAL_URL> is either:

* <https://apicentral.axway.com/apis/jsonschema> for US region
* <https://central.eu-fr.axway.com/apis/jsonschema> for EU region
* <https://central.ap-sg.axway.com/apis/jsonschema> for APAC region

``` YAML plugin settings sample for US region
    "yaml.schemas": {
        
        "https://apicentral.axway.com/apis/jsonschema": "/*.central.yaml" 
    },
```

Then each yaml file ending with `.central.yaml` will allow the Engage objects creation/validation. Using the `CTRL + Space` command combination will help with code completion.

## GraphQL requests for resources

In addition to the Rest endpoint, there is a graphQL endpoint `$ENGAGE_URL/apis/graphql` and its corresponding schema `$ENGAGE_URL/apis/graphql/schema` where $ENGAGE_URL is one of:

* US region: <https://apicentral.axway.com>
* EU region: <https://central.eu-fr.axway.com>
* APAC region: <https://central.ap-sg.axway.com>

GraphQL is a query language for APIs (Application Programming Interfaces) and a runtime for executing those queries. GraphQL allows you to navigate inside the relationship of the API Server resources.

Unlike the REST API endpoint where you can create/update/delete API Server resources, the graphQL endpoint is a read-only where you can only get information.

### Anatomy of a graphQL request

The graphqL schema can be browsed using that url: `$ENGAGE_URL/apis/graphql/schema`

All available resources from the API Server are available as a GraphQL object. A different naming convention is used: API Server objects coming from the `management` group will be prefixed by `management_` and those coming from the catalog group are prefixed with `catalog_`. A suffix is added to all objects: `_list`.

Sample:

| API Server object name | GraphQL object name         |
|------------------------|-----------------------------|
| Environment            | management_Environment_List |
| Stage                  | catalog_Stage_List          |
| APIService             | management_APIService_List  |
| ...                    |                             |

Each object comes with the following structure: **filter**, **page**, **total**, **pageInfo** and **items**.

#### filter

This section is divide into two parameters:

* **query**: Add generic filtering to the GraphQL query similar to the query parameter available within apiserver Rest API. Refer to [Query string for filtering entity. Expressed in FIQL/RSQL language.](/docs/integrate_with_central/cli_central/cli_command_reference/index.html#complex-query-filters)
* **properties**: Use the pre-defined query parameter field (name, title...) and a value. Using the '*' in the value allows partial match.

If multiple criteria are entered, an AND operator is used to request the data.

#### page

This section is divide into three parameters:

* **number**: Select the page number to retrieve.
* **size**: Indicate how many objects fits in a page.
* sort:
    * **property**: Name of the field to apply the sorting - few fields are available (usually name, title, timestamp).
    * **direction**: Order of the sorting, DESC or ASC.

For instance, it is possible to retrieve 15 objects per page (**size==15**) and sort them by their creation date from the most recent to the least recent (property==metadata.audit.createTimestamp / direction==DESC).

#### total

This section is divide into two parameter:

* **accessible**: Give the number of requested resources the current user has access to (own, shared with read or write access)
* **existing**: Give the total number of resources, even those the user cannot see.

#### pageInfo

This section is informative and displays what has been used to retrieve the result. It contains the same information as the page parameter and you can select the one you want to see.

#### items

This is the specific part of the object where you will find name, title, kind, tags, attributes, metadata, owner, finalizers, spec, references, scope and more depending on the objects.

In this section, you can navigate in the graph of the dependant objects using the `scopedResources` property. For instance, if the main object is an environment, you can navigate downward in the graph to the APIService of the environment and from there to the APIServiceInstance and APIServiceRevision.

It is also possible to navigate upward in the graph from APIService to the products that use this APIService by using the `referenceBy` property from the APIService.

### Query samples

Get all environments of the system sorted by title:

```graphQL
query Management_Environment_List {
    management_Environment_List(page: { sort: { property: title } }) {
        items {
            name
            title
        }
    }
}
```

Get all environments that start with "Demo" unsorted:

```graphQL
query Management_Environment_List {
    management_Environment_List(filter: { properties: { name: "Demo*" } }) {
        items {
            name
            title
        }
    }
}
```

Get all environments that start with "Demo" with a pagesize of 2 and returning only page 2:

```graphQL
query Management_Environment_List {
    management_Environment_List(
        filter: { properties: { name: "Demo*" } }
        page: { number: 2, size: 2 }
    ) {
        items {
            name
            title
        }
    }
}
```

Get all products that use the APIService "Demo" and return the APIService name, its scope name, the product name and title:

```graphQL
query Management_APIService_List {
    management_APIService_List(filter: { properties: { name: "Demo" } }) {
        items {
            referencedBy {
                catalog_Product {
                    items {
                        title
                        name
                    }
                }
            }
            name
            scope {
                ... on management_Environment {
                    name
                }
            }
        }
    }
}
```

Get all subscriptions from a specific team and return the subscription titles and associated products / product plans

```graphQL
query Catalog_Subscription_List {
    catalog_Subscription_List(
        filter: { properties: { owner_id: "d9120f39-88d1-4977-bc56-5dd7d7335a18" } }
    ) {
        items {
            title
            spec {
                product {
                    title
                }
                plan {
                    name {
                        title
                    }
                }
            }
        }
    }
}

```

### Set up Postman to query GraphQL API Service

1. Open Postman
2. Click **New** and select the **GraphQL** icon to Add a graphql query.
3. Set the url with one of the above endpoints (i.e., using the [region endpoint](#graphql-requests-for-resources) your organization is provisioned in).
4. Navigate to the `Authorization` tab of the query and enter the following to set the authorization process:

    * Select the `OAuth 2.0` in the Auth Type drop-down.
    * Configure the new token:
        * Grant Type: Implicit
        * Callback url: use the Engage URL value of your region
        * Auth URL: <https://login.axway.com/auth/realms/Broker/protocol/openid-connect/auth?idpHint=360>
        * Client ID: apicentral
    * Click the **Get New Access Token** orange button. The *Engage login* screen is displayed. Add your credential and click **Sign in**. Once your login is accepted, the token is returned and you can use it in the query.
    * Set the tenantID in the query header - add a new header: `X-Axway-Tenant-Id` and its value is your organizationID.

5. Navigating to the `Query` tab and click **Use GraphQL Introspection** to collect the GraphQL object definition. You should see the list of available queries.
6. Add the specific fields you want to see and then click **Query** to execute the query and get the result.
