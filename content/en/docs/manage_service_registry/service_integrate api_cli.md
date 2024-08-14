---
title: Integrate with API / CLI
linkTitle: Integrate with API / CLI
weight: 30
---

Manually register an API with the Amplify Management Plane using an existing OpenAPI Specification so that it appears in the Service Registry.

## Before you start

- You must have credentials or a service account to use the CLI. Please follow the steps in [Authorize your CLI to use the Amplify Central APIs](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis)
- Understand the concepts of the Axway Central CLI presented in the overview
- Make sure [curl](https://curl.se/) is installed on the system
- Make sure [jq](https://stedolan.github.io/jq/) is installed on the system

## Objectives

Register an API in Amplify using the Axway Central CLI, including:

- Create a new API service in an environment
- Register an API to the service
- Publish the API to the Marketplace

## Steps

### Download API

The Petstore OpenAPI Specification is used in this tutorial and is available at:
[https://petstore3.swagger.io/api/v3/openapi.json](https://petstore3.swagger.io/api/v3/openapi.json)

Download the specification and save it to disk as `openapi.json`:

```bash
curl https://petstore3.swagger.io/api/v3/openapi.json >> openapi.json
```

### Create API service

Create an API service to represent your API. Everything related to your Petstore is parented to the API service.
The API service belongs to an environment, so an environment called "tutorial" must be created using the following command:

```bash
axway central create env tutorial -o json > env.json
```

Use jq to create the API service resource from the content in the OAS. Use jq's `-f` argument to read the filter to be applied to the input from file(s) rather than from a command line. Use the `-slurp` argument to read each file into a large array and run the filter just once, instead of running the filter in the jq file for each JSON file in the input. This way, the resource file is generated for the API service while parsing the OAS file and running the jq filter found in a file.

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

### Create API service Revision

An API service may contain multiple revisions of the API (for example, Petstore V1 and Petstore V2). The API service Revision can represent any API definition / interface (GraphQL, protobuf, OAS, etc.). Create the API service Revision by filtering the combined OAS and result of creating the API Server previously:

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

To remove the API service revision created above, run the following command:

```bash
axway central delete apisr <name of created service revision> --scope tutorial
```

## Create API service instance

The API service instance represents the details of where the API service is currently available, i.e., the endpoint that is listening for requests for the API. Create the API service instance by filtering the combined OAS and result of creating the API service revision previously:

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

The API service is now registered with its associated API definition in Amplify and can be viewed in the Service Registry.

### Update with a new version of the API

Make a breaking change the OpenAPI Specification by removing a method. For this OAS example, remove the `/pets` path and, as this is a breaking change, increase the API version to `3.0.0`:

```bash
jq '. | .info.version = "2.0.0" | del(.paths."/pet")' openapi.json > openapi-v2.json
```

There is already an existing API service, so a new API service revision must be created with the new API definition. Use the steps in [Create an API Revision](#create-api-service-revision):

```bash
jq --slurp -f api-service-revision.jq openapi-v2.json api-service-created.json > api-service-revision-v2.json
axway central create -f api-service-revision-v2.json -o json -y > api-service-revision-v2-created.json
```

Provide the instance (where the API is available) by using the same steps in [Create the API service instance](#create-api-service-instance):

```bash
jq --slurp -f api-service-instance.jq openapi-v2.json api-service-revision-v2-created.json > api-service-instance-v2.json
```

### Give the API service an icon

Provide the API service with an image / avatar, making it visually appealing to the API consumer. The following script queries the created resources on disk using `jq` and stores the result in the environment variables. It will based64 encode the content of a .png file and store this in an environment variable called `encodedImage`. It will query the API Server for the API service resource and update the responding JSON with the values from the environment variables. Finally, it pushes the updates json content back to the API Server so that the API service has an image attached.

```bash
#!/bin/bash
export serviceName=`jq -r .[0].name api-service-created.json`
export envName=`jq -r .[0].metadata.scope.name api-service-created.json`
export encodedImage=`base64 -i api.png`
axway central get apis $serviceName --scope $envName -o json | jq '.spec.icon.data = $ENV.encodedImage' | jq '.spec.icon.contentType = "image/png"'  > upload.json
axway central apply -f upload.json
```

### Publish the API to the Amplify Marketplace

Now that the API has been registered in Amplify, make it available to API consumers in the Amplify Marketpalce. To do this, create the resources in the following order:

- Create Asset

```bash
axway central create -f asset.json -o json -y > asset-created.json
```

Where `asset.json` has the following content:

```json
{
  "group": "catalog",
  "apiVersion": "v1alpha1",
  "kind": "Asset",
  "name": "asset-example",
  "title": "asset-example",
  "metadata": {},
  "attributes": {},
  "finalizers": [],
  "tags": [],
  "spec": {
    "type": "API",
    "categories": [],
    "description": ""
  },
  "state": "active"
}
```

- Create Asset Icon if needed (Optional)

Provide the Asset with an image / avatar, making it visually appealing to the API consumer. The following script queries the created resources on disk using `jq` and stores the result in the environment variables. It will based64 encode the content of a .png file and store this in an environment variable called `encodedAssetImage`. It will query the API Server for the Asset resource and update the responding JSON with the values from the environment variables. Finally, it pushes the updates json content back to the API Server so that the Asset has an image attached.

```bash
#!/bin/bash
export assetName=`jq -r .[0].name asset-created.json`
export encodedAssetImage=`base64 -i api.png`
axway central get asset $assetName -o json | jq '.spec.icon.data = $ENV.encodedAssetImage' | jq '.spec.icon.contentType = "image/png"'  > upload-asset.json
axway central apply -f upload-asset.json
```

- Create AssetResource

To create the AssetMappings, the following script queries the created resources on disk using `jq` and stores the result in the environment variables. It will create the AssetResource resourcevwith the create command.

```bash
#!/bin/bash
export assetName=`jq -r .[0].name asset-created.json`
export serviceDefinition=`jq -r .[0].spec.definition.value api-service-created.json`
axway central create -f asset-resource.json -o json -y > asset-resource-created.json
```

Where `asset-resource.json` has the following content:

```json
{
  "group": "catalog",
  "apiVersion": "v1alpha1",
  "kind": "AssetResource",
  "name": "$ENV.assetName-version",
  "title": "$ENV.assetName-version",
  "metadata": {
    "scope": {
      "kind": "Asset",
      "name": "$ENV.assetName",
      "selfLink": "/catalog/v1alpha1/assets/$ENV.assetName"
    }
  },
  "attributes": {},
  "finalizers": [],
  "tags": [],
  "spec": {
    "type": "oas2",
    "status": "active",
    "accessInfo": [
      {
        "url": "https://petstore3.swagger.io/api/v3/openapi.json"
      }
    ],
    "definition": "$ENV.serviceDefinition"
  }
}
```

- Create AssetMapping

To create the AssetMapping, the following script queries the created resources on disk using `jq` and stores the result in the environment variables. It will create the AssetMapping resource with the create command.

```bash
#!/bin/bash
export serviceName=`jq -r .[0].name api-service-created.json`
export serviceInstanceName=`jq -r .[0].name api-service-instance-created.json`
export envName=`jq -r .[0].metadata.scope.name api-service-created.json`
axway central create -f asset-mappings.json -o json -y > asset-mappings-created.json
```

Where `asset-mappings.json` has the following content:

```json
{
  "group": "catalog",
  "apiVersion": "v1alpha1",
  "kind": "AssetMapping",
  "name": "foo-asset-mapping-1",
  "title": "foo-asset-mapping-1",
  "metadata": {
    "scope": {
      "kind": "Asset",
      "name": "foo-asset-1"
    }
  },
  "attributes": {},
  "finalizers": [],
  "tags": [],
  "spec": {
    "inputs": {
      "apiService": "management/$ENV.envName/$ENV.serviceName",
      "apiServiceInstance": "management/$ENV.envName/$ENV.serviceInstanceName"
    }
  }
}
```

- Create Asset Access Approval

We need to set the asset access approval to automatic.

```bash
#!/bin/bash
export assetName=`jq -r .[0].name asset-created.json`
axway central get asset $assetName -o json | jq '.access.approval = "automatic"'  > upload-asset-access.json
axway central apply -f upload-asset-access.json
```

- Create Asset ReleaseTag

To create the Asset ReleaseTag, the following script queries the created resources on disk using `jq` and stores the result in the environment variables. It will create the ReleaseTag resource with the create command.

```bash
#!/bin/bash
export assetName=`jq -r .[0].name asset-created.json`
axway central create -f asset-release-tag.json -o json -y > asset-release-tag-created.json
```

Where `asset-release-tag.json` has the following content:

```json
{
  "group": "catalog",
  "apiVersion": "v1alpha1",
  "kind": "ReleaseTag",
  "name": "$ENV.assetName",
  "title": "$ENV.assetName",
  "metadata": {
    "scope": {
      "kind": "Asset",
      "name": "$ENV.assetName",
      "selfLink": "/catalog/v1alpha1/assets/$ENV.assetName"
    },
    "resourceVersion": "0",
    "selfLink": "/catalog/v1alpha1/assets/$ENV.assetName/releasetags/$ENV.assetName"
  },
  "attributes": {},
  "finalizers": [],
  "tags": [],
  "spec": {
    "releaseType": "major"
  },
  "state": "active"
}
```

- Create Product

```bash
axway central create -f product.json -o json -y > product-created.json
```

Where `product.json` has the following content:

```json
{
  "group": "catalog",
  "apiVersion": "v1alpha1",
  "kind": "Product",
  "name": "product-example",
  "title": "product-example",
  "metadata": {},
  "attributes": {},
  "finalizers": [],
  "tags": [],
  "spec": {
    "type": "API",
    "categories": [],
    "description": ""
  },
  "owner": "{OWNER}",
  "state": "active"
}
```

- Create Product Icon if needed (Optional)

Provide the Product with an image / avatar, making it visually appealing to the API consumer. The following script queries the created resources on disk using `jq` and stores the result in the environment variables. It will based64 encode the content of a .png file and store this in an environment variable called `encodedProductName`. It will query the API Server for the Product resource and update the responding JSON with the values from the environment variables. Finally, it pushes the updates json content back to the API Server so that the Product has an image attached.

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
export encodedProductName=`base64 -i api.png`
axway central get product $productName -o json | jq '.spec.icon.data = $ENV.encodedProductName' | jq '.spec.icon.contentType = "image/png"'  > upload-product.json
axway central apply -f upload-product.json
```

- Create Product ReleaseTag

To create the Product ReleaseTag, the following script queries the created resources on disk using `jq` and stores the result in the environment variables. It will create the ReleaseTag resource with the create command.

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central create -f product-release-tag.json -o json -y > product-release-tag-created.json
```

Where `product-release-tag.json` has the following content:

```json
{
  "group": "catalog",
  "apiVersion": "v1alpha1",
  "kind": "ReleaseTag",
  "name": "$ENV.productName",
  "title": "$ENV.productName",
  "metadata": {
    "scope": {
      "kind": "Product",
      "name": "$ENV.productName",
      "selfLink": "/catalog/v1alpha1/products/$ENV.productName"
    },
    "resourceVersion": "0",
    "selfLink": "/catalog/v1alpha1/products/$ENV.productName/releasetags/$ENV.productName"
  },
  "attributes": {},
  "finalizers": [],
  "tags": [],
  "spec": {
    "releaseType": "major"
  },
  "state": "active"
}
```

- Create ProductPlan

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central create -f product-plan.json -o json -y > product-plan-created.json
```

Where `product-plan.json` has the following content:

```json
{
  "group": "catalog",
  "apiVersion": "v1alpha1",
  "kind": "ProductPlan",
  "name": "product-plan",
  "title": "product-plan",
  "attributes": {},
  "finalizers": [],
  "tags": [],
  "spec": {
    "type": "paid",
    "billing": {
      "cycle": "recurring",
      "price": 10,
      "currency": "USD",
      "interval": "monthly"
    },
    "product": "$ENV.productName",
    "subscription": {
      "renewal": "automatic",
      "approval": "automatic",
      "interval": {
        "type": "months",
        "length": 1
      }
    }
  },
  "state": "active"
}
```

- Create Product Quota

```bash
export assetResourceName=`jq -r .[0].name asset-resource-created.json`
export assetName=`jq -r .[0].name asset-created.json`
axway central create -f product-quota.json -o json -y > product-quota-created.json
```

Where `product-quota.json` has the following content:

```json
{
  "group": "catalog",
  "apiVersion": "v1alpha1",
  "kind": "Quota",
  "name": "product-quota",
  "title": "product-quota",
  "attributes": {},
  "finalizers": [],
  "tags": [],
  "spec": {
    "pricing": {
      "type": "unlimited"
    },
    "resources": [
      {
        "kind": "AssetResource",
        "name": "$ENV.assetName/$ENV.assetResourceName"
      }
    ],
    "unit": "transactions"
  }
}
```

- Setup Product & Consumer Visibilities

The product and consumer visibilities can be set based on whether the authentication is required or not.

```bash
export productOwner=`jq -r .[0].owner product-created.json`
axway central create -f product-visibility.json -o json -y > product-visibility-created.json
```

Where `product-visibility.json` has the following content:

```json
{
  "group": "catalog",
  "apiVersion": "v1alpha1",
  "kind": "ProductVisibility",
  "metadata": {
    "scope": {
      "kind": "MarketPlace",
      "name": "{MARKETPLACE_GUID}"
    }
  },
  "attributes": {},
  "finalizers": [],
  "tags": [],
  "spec": {
    "subjects": ["authenticated"] // if auth required and visibility if for everyone
  },
  "owner": "$ENV.productOwner"
}
```

```bash
export productOwner=`jq -r .[0].owner product-created.json`
axway central create -f consumer-product-visibility.json -o json -y > consumer-product-visbility-created.json
```

Where `consumer-product-visibility.json` has the following content:

```json
{
  "group": "catalog",
  "apiVersion": "v1alpha1",
  "kind": "ConsumerProductVisibility",
  "metadata": {
    "scope": {
      "kind": "MarketPlace",
      "name": "{MARKETPLACE_GUID}"
    }
  },
  "attributes": {},
  "finalizers": [],
  "tags": [],
  "spec": {
    "subjects": [] // if the visibility is none
  },
  "owner": "$ENV.productOwner"
}
```

- Update ProductPlan 'state' to "active"

To update the ProductPlan state to 'active, use `jq` to get the ProductPlan name and store in the env variable and using the name fetch the ProductPlan resource and update the state to 'active'.

```bash
export productPlanName=`jq -r .[0].name product-plan-created.json`
axway central get productplan $productPlanName -o json | jq '.state = "active"' > upload-product-plan-state.json
axway central apply -f upload-product-plan-state.json
```

- Publish Product to Amplify Marketplace

Finally, we can publish this product to the Amplify Marketplace of our choice.

```bash
export productName=`jq -r .[0].name product-created.json`
export productOwner=`jq -r .[0].owner product-created.json`
axway central create -f published-product.json -o json -y > published-product-created.json
```

Where `published-product.json` has the following content:

```json
{
  "group": "catalog",
  "apiVersion": "v1alpha1",
  "kind": "PublishedProduct",
  "metadata": {
    "scope": {
      "kind": "MarketPlace",
      "name": "{MARKETPLACE_GUID}"
    }
  },
  "attributes": {},
  "finalizers": [],
  "tags": [],
  "spec": {
    "product": {
      "name": "$ENV.productName"
    }
  },
  "owner": "$ENV.productOwner"
}
```

- NOTE: Please replace the above environment variables for all the steps in the '.json' files accrodingly.
