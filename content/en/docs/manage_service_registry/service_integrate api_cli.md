---
title: Integrate with API / CLI
linkTitle: Integrate with API / CLI
weight: 30
---

Use the Amplify Central CLI to create and manage API services in your environment.

## Before you start

* You must [authorize your DevOps service to use the DevOps API](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis)
* Verify that the @axway/amplify-central-cli version is at minimum 0.1.3

## Objectives

Learn how to create and manage your API services to represent your distributed cloud and on-premise environments using the Axway Central CLI.

* Retrieve a list of all API services in an environment
* Retrieve details for an API service
* Create new API service in an environment
* Update an API service
* Delete an API service

## List API services

To get a list of all API services in all environments, run the following command:

```bash
axway central get apiservices
```

Alternatively, you can use the short name, `apis`:

```bash
axway central get apis
```

This command outputs a list of all API services in all environments, with information about the API service name, age, title, and environment scope:

```bash
NAME                                  AGE           TITLE                   RESOURCE KIND  SCOPE KIND   SCOPE NAME         RESOURCE GROUP
7841311a-3338-11eb-b6eb-0242ac110002  a month ago   PetStore-Secured        APIService     Environment  awsgtw-us-east-2   management
2f754bb3-34b2-11eb-986d-000c29b55428  a month ago   Stockquote (V7)         APIService     Environment  cca-m2020-apim     management
govuk-pay                             23 days ago   GOV.UK Pay              APIService     Environment  mulesoft           management
lyft                                  23 days ago   Lyft                    APIService     Environment  mulesoft           management
swagger-petstore-raml                 23 days ago   Swagger Petstore RAML   APIService     Environment  mulesoft           management
ably-rest-api                         5 days ago    ably-rest-api           APIService     Environment  apig33             management
```

### Help listing supported resource types

To get help with a list of supported resource types, run the following command:

```bash
axway central get
```

This command outputs a table of supported resources, along with their resource kinds, short names, scopes, and resource groups:

```bash
The server supports the following resources:

RESOURCE                  SHORT NAMES    RESOURCE KIND                   SCOPED  SCOPE KIND    RESOURCE GROUP
accessrequestdefinitions  accreqdef      AccessRequestDefinition         true    Environment   management
accessrequests            accreq         AccessRequest                   true    Environment   management
apiserviceinstances       apisi          APIServiceInstance              true    Environment   management
apiservicerevisions       apisr          APIServiceRevision              true    Environment   management
apiservices               apis           APIService                      true    Environment   management
apispecs                  apisp          APISpec                         true    K8SCluster    management
assetmappings             assetmpng      AssetMapping                    true    Environment   management
assetmappingtemplates     assetmpngtmpl  AssetMappingTemplate            true    Environment   management
assetreleases             assetrelease   AssetRelease                    false                 catalog
assetrequestdefinitions   assetreqdef    AssetRequestDefinition          true    Asset         catalog
assetrequestdefinitions   assetreqdef    AssetRequestDefinition          true    AssetRelease  catalog
assetrequests             assetreq       AssetRequest                    true    Asset         catalog
assetrequests             assetreq       AssetRequest                    true    AssetRelease  catalog
assetresources            assetres       AssetResource                   true    Asset         catalog
assetresources            assetres       AssetResource                   true    AssetRelease  catalog
assets                    asset          Asset                           false                 catalog
consumerinstances         consumeri      ConsumerInstance                true    Environment   management
consumersubscriptiondefs  consumersd     ConsumerSubscriptionDefinition  true    Environment   management
discoveryagents           da             DiscoveryAgent                  true    Environment   management
documents                 docs           Document                        true    Asset         catalog
documents                 docs           Document                        true    AssetRelease  catalog
environments              env            Environment                     false                 management
integrations              integ          Integration                     false                 management
k8sclusters               k8sc           K8SCluster                      false                 management
k8sresources              k8sr           K8SResource                     true    K8SCluster    management
meshdiscoveries           meshd          MeshDiscovery                   true    Mesh          management
meshes                    mesh           Mesh                            false                 management
meshservices              meshsvc        MeshService                     true    Mesh          management
meshworkloads             meshwrk        MeshWorkload                    true    Mesh          management
releasetags               releasetag     ReleaseTag                      true    Asset         catalog
resourcediscoveries       resourced      ResourceDiscovery               true    K8SCluster    management
resourcehooks             resourceh      ResourceHook                    true    Integration   management
secrets                   secret         Secret                          true    Integration   management
secrets                   secret         Secret                          true    Environment   management
specdiscoveries           specd          SpecDiscovery                   true    K8SCluster    management
stages                    stg            Stage                           false                 catalog
traceabilityagents        ta             TraceabilityAgent               true    Environment   management
webhooks                  webh           Webhook                         true    Integration   management
webhooks                  webh           Webhook                         true    Environment   management

```

## Get details

To get the details of an API service in an environment, provide the environment name and the API service name.

### YAML output

To output the information in JSON format, run the follow command:

```bash
axway central get apisvc <name> --scope env1 -o yaml  # Get API service <name> details of `env1` in YAML format
```

This command outputs the details of that specific service:

```yaml
---
group: management
apiVersion: v1alpha1
kind: APIService
name: apisvc1
title: apisvc1 title
metadata:
  id: e4e540a975678cb901757ae1436562c2
  audit:
    createTimestamp: '2020-10-30T18:59:44.613+0000'
    createUserId: bd45cb77-e09f-440d-9a09-37f8812420b4
    modifyTimestamp: '2020-10-30T18:59:44.613+0000'
    modifyUserId: bd45cb77-e09f-440d-9a09-37f8812420b4
  scope:
    id: e4e87a1675678dc001757ae1417d483b
    kind: Environment
    name: env1
    selfLink: /management/v1alpha1/environments/env1
  resourceVersion: '46171'
  references: []
  selfLink: /management/v1alpha1/environments/env1/apiservices/apisvc1
attributes:
  createdBy: yaml
finalizers: []
tags:
  - apisvc
  - cli
  - axway
spec:
  description: api service 1 description

---
```

### JSON output

To output the information in JSON format, change the `-o` flag from YAML to JSON:

```bash
axway central get apisvc <name> -s env1 -o json       # Get API service <name> details of `env1` in JSON format
```

## Create an API service in your environment

An API service represents an API, including its versions and deployed endpoints, and additional information to represent your API. For example, description, environment scope, image encoded in base64.

To automate the creation of an API service in your environment:

1. Create an environment by providing the environment name argument. For example, `env1`:

    ```bash
    axway central create env env1
    ```

2. Create an API service within environment `env1` by providing a path to a valid .yaml, .yml, or .json file that defines a specific resource (for example, `apiservice.yaml`).  In this example, only one API service called `apisvc1` is created from the resource file:

    ```bash
    axway central create -f <filepath>
    ```

Try out this procedure using the [apiservice.json](https://amplify-central.netlify.app/samples/central/apiservice.json) or [apiservice.yaml](https://amplify-central.netlify.app/samples/central/apiservice.yaml) samples.

## Update an API service

To update the details of a API service, providing a path to the configuration file:

```bash
axway central apply -f apiservice.yaml   # Update API service in YAML format
```

```bash
axway central apply -f apiservice.json   # Update API service in JSON format
```

## Delete an API service in an environment

This action will delete all API services and resources in the environment specified. The CLI command can take a few seconds to finish depending on the number of resources represented in the environment.

{{% alert title="Warning" color="warning"%}}This action cannot be reversed.{{% /alert %}}

To delete a specific API service in an environment, provide a path to the configuration file:

```bash
axway central delete -f apiservice.yaml   # Delete an API service using a file in YAML format
```

```bash
axway central delete -f apiservice.json   # Delete an API service using a file in JSON format
```

Use `--wait` to delete an API service using a YAML file while waiting for resource deletion confirmation. The `--wait` option will check for resource deletion for up to 10 seconds.

```bash
axway central delete -f apiservice.yaml --wait
```

Use `--scope` to delete an API service within the scope of and environment named env1.

```bash
axway central delete apiservice apisvc1 -scope env1 --wait
```
