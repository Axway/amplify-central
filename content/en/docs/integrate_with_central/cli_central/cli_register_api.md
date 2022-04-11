---
title: Register APIs using the CLI
linkTitle: Register APIs using the CLI
weight: 200
draft: yes
---

Learn how to register an API with the Amplify management plane using an existing OpenAPI Specification.

## Before you start

* You must have credentials or a service account to use the CLI. Please follow the steps in [Authorize your CLI to use the Amplify Central APIs](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis)
* Understand the concepts of the Axway Central CLI presented in the overview
* Make sure [curl](https://curl.se/) is installed on the system
* Make sure [jq](https://stedolan.github.io/jq/) is installed on the system

## Objectives

Register an API in Amplify Central using the Axway Central CLI, including:

* Create a new API service in an environment
* Register an API to the service
* Publish the API to the Unified Catalog

## Steps

### Download API

The Petstore OpenAPI Specification is used in this tutorial and is available at:
[https://petstore3.swagger.io/api/v3/openapi.json](https://petstore3.swagger.io/api/v3/openapi.json)

Download the specification and save it to disk as `openapi.json`:

 ```bash
curl https://petstore3.swagger.io/api/v3/openapi.json >> openapi.json
 ```

### Create API Service

Create an API Service to represent your API. Everything related to your Petstore is parented to the API Service.
The API Service belongs to an environment, so an environment called "tutorial" must be created using the following command:

```bash
axway central create env tutorial -o json > env.json
```

Use jq to create the API Service resource from the content in the OAS. Use jq's `-f` argument to read the filter to be applied to the input from file(s) rather than from a command line. Use the `-slurp` argument to read each file into a large array and run the filter just once, instead of running the filter in the jq file for each JSON file in the input. This way, the resource file is generated for the API Service while parsing the OAS file and running the jq filter found in a file.

```bash
jq --slurp -f api-service.jq openapi.json env.json > api-service.json
axway central create -f api-service.json -o json -y > api-service-created.json
```

Where `api-service.jq` contains the following content:

```json
# Creates the API Server object using parts of OAS and env file
{
    apiVersion: "v1alpha1",
    kind: "APIService",
    title: .[0].info.title,
    metadata: {
        scope: {
            kind: "Environment",
            name: .[1].name,
        }
    },
    spec: {
        description: .[0].info.description
    }
}
```

### Create API Service Revision

An API Service may contain multiple revisions of the API (for example, Petstore V1 and Petstore V2). The API Service Revision can represent any API definition / interface (GraphQL, protobuf, OAS, etc.). Create the API Service Revision by filtering the combined OAS and result of creating the API Server previously:

```bash
jq --slurp -f api-service-revision.jq openapi.json api-service-created.json > api-service-revision.json
axway central create -f api-service-revision.json -o json -y > api-service-revision-created.json
```

Where `api-service-revision.jq` has the following content:

```json
# Creates the API Service Revision from OAS and from the created API Service
{
    apiVersion: "v1alpha1",
    kind: "APIServiceRevision",
    title: .[0].info.title,
    metadata: {
        scope: {
            kind: "Environment",
            name: .[1][0].metadata.scope.name,
        }
    },
    spec: {
        apiService: .[1][0].name,
        definition: {
            type: "oas3",
            value: .[0] | @base64
        }
    }
}
```

To remove the API Service revision created above, run the following command:

```bash
axway central delete apisr <name of created service revision> --scope tutorial
```

## Create API Service Instance

The API Service Instance represents the details of where the API Service is currently available, i.e., the endpoint that is listening for requests for the API. Create the API Service Instance by filtering the combined OAS and result of creating the API Service Revision previously:

```bash
jq --slurp -f api-service-instance.jq openapi.json api-service-revision-created.json > api-service-instance.json
axway central create -f api-service-instance.json -o json -y > api-service-instance-created.json
```

Where `api-service-instance.jq` has the following content:

```json
# Creates the API Service Instance from OAS and the created service revision
{
    apiVersion: "v1alpha1",
    kind: "APIServiceInstance",
    title: .[0].info.title,
    metadata: {
        scope: {
            kind: "Environment",
            name: .[1][0].metadata.scope.name,
        }
    },
    spec: {
        apiServiceRevision: .[1][0].name,
        "endpoint" : [ 
            {
                "host" : "petstore3.swagger.io",
                "routing" : {
                    "basePath" : .[0].servers[0].url
                },
                "protocol" : "https"
            } 
        ],
    }
}
```

The API Service is now registered with its associated API definition in Amplify Central.

### Update with a new version of the API

Make a breaking change the OpenAPI Specification by removing a method. For this OAS example, remove the `/pets` path and, as this is a breaking change, increase the API version to `3.0.0`:

```bash
jq '. | .info.version = "2.0.0" | del(.paths."/pet")' openapi.json > openapi-v2.json
```

There is already an existing API Service, so a new API Service revision must be created with the new API definition. Use the steps in [Create an API Revision](#create-api-service-revision):

```bash
jq --slurp -f api-service-revision.jq openapi-v2.json api-service-created.json > api-service-revision-v2.json
axway central create -f api-service-revision-v2.json -o json -y > api-service-revision-v2-created.json
```

Provide the instance (where the API is available) by using the same steps in [Create the API Service instance](#create-api-service-instance):

```bash
jq --slurp -f api-service-instance.jq openapi-v2.json api-service-revision-v2-created.json > api-service-instance-v2.json
```

### Give the API Service an icon

Provide the API Service with an image / avatar, making it visually appealling to the API consumer. The following script queries the created resources on disk using `jq` and stores the result in the environment variables. It will based64 encode the content of a .png file and store this in an environment variable called `encodedImage`. It will query the API Server for the API Service resource and update the responding JSON with the values from the environment variables. Finally, it pushes the updates json content back to the API Server so that the API Service has an image attached.

```bash
#!/bin/bash
export serviceName=`jq -r .[0].name api-service-created.json`
export envName=`jq -r .[0].metadata.scope.name api-service-created.json`
export encodedImage=`base64 -i api.png`
axway central get apis $serviceName --scope $envName -o json | jq '.spec.icon.data = $ENV.encodedImage' | jq '.spec.icon.contentType = "image/png"'  > upload.json
axway central apply -f upload.json
```

### Publish the API to the Unified Catalog

Now that the API has been registered in Amplify, make it available to API consumers in the Unified Catalog. To do this, create a resource of kind `ConsumerInstance`:

```bash
jq --slurp -f consumer-instance.jq openapi.json api-service-instance-created.json > consumer-instance.json
axway central create -f consumer-instance.json -o json -y > consumer-instance-created.json
```

Where `api-service-instance.jq` has the following content:

```json
# Creates the API Service Instance from OAS and the created service revision
{
    apiVersion: "v1alpha1",
    kind: "ConsumerInstance",
    title: .[0].info.title,
    metadata: {
        scope: {
            kind: "Environment",
            name: .[1][0].metadata.scope.name,
        }
    },
    spec: {
        apiServiceRevision: .[1][0].name,
        "endpoint" : [ 
            {
                "host" : "petstore3.swagger.io",
                "routing" : {
                    "basePath" : .[0].servers[0].url
                },
                "protocol" : "https"
            } 
        ],
    }
}
```
