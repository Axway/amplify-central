---
title: Integrate with API / CLI
linkTitle: Integrate with API / CLI
weight: 30
---

Use the Amplify Central API / CLI to create, manage and promote your products to the Marketplace for consumption.

## Before you start

* You must have credentials or a user account to use the CLI. Please follow the steps in [Authorize your CLI to use the Amplify Central APIs](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis)
* Understand the concepts of the Axway Central CLI presented in the [Overview of the Axway Central CLI capabilities](/docs/integrate_with_central/cli_central/_index)  
* Make sure [jq](https://stedolan.github.io/jq/) is installed on the system

## Objectives

Learn how to create a product from an existing asset and make it available in the Marketplace for consumption.

* Create a product
* Add documentation to a product
* Version the product
* Publish the product to the Marketplace

{{< alert title="Note" color="primary" >}}For consistency and readability, the same product is used throughout the code examples in this topic.{{< /alert >}}

## Amplify Central API

For reference, the Open API Specification for Amplify Central is located [here](https://apicentral.axway.com/apis/docs).

## Create product YAML

Create a product to address a particular use case and solve specific needs, then make it available to API Consumers in the Marketplace. Products are created with one or more asset from the Asset Catalog.

### List available assets

To find the list of available assets, which have been marked as `active` and released to the Marketplace, run the following command:

```bash
axway central get assets
```

### Create the YAML or JSON file

From the resulting response from the platform, above, select the names of the assets that you want to bundle in your product. This example will use `petstore-asset`.

To create a basic product YAML or JSON file, populate the product with a single asset, namely `petstore-asset`.
A `.yaml`, `.yml`, or `.json` file can be used to define a specific resource, but this example uses `.json`:

```json
{
  "group": "catalog",
  "apiVersion": "v1alpha1",
  "kind": "Product",
  "title": "Petstore",
  "spec": {
    "assets": [
      {
        "name": "petstore"
      }
    ],
    "description" : "Get the best of breed pets online!"
  }
}
```

### Save the file as product.json

Create the product on the server (`-f` is the filename to use to create the resource, `-y` as we haven't given the product a local name then the server will automatically create one, providing `-y` means we will accept the auto generated name)

```bash
axway central create -f product.json -y -o json > product-created.json
```

where `-f` is the filename to use to create the resource, `-y` mean that the product's automatically generated local name will be accepted.

## Prepare your product to be consumed

Follow these steps to make your newly created product ready to be consumed.

### Add documentation to your product

Product documentation consists of articles, which are created by adding resources of kind `Resource` to the API Server. Each `Resource` contains markdown content that will be rendered with the product in the Marketplace.

In the following example, three articles are added to the product:

* Overview
* Authentication
* Troubleshooting

#### Create document resources in your product

To create a document resource within the product so you can upload documents then organize and reference them.

{{< alert title="Note" color="primary" >}}The following step must be repeated for each document resource. For this example, repeat this step for Authentication and again for Troubleshooting.{{< /alert >}}

```bash
export docTitle='Overview'
export docContent='# Overview<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit'
jq -f article.jq product-created.json > article.json
axway central create -f article.json -o json -y 
```

where `article.jq` has the following content:

```json
{
    group: "catalog",
    apiVersion: "v1",
    kind: "Resource",
    title: env.docTitle,
    metadata: {
        scope: {
            kind: "Product",
            name: .[0].name,
        }
    },
    spec: {
        data: {
          type: "text",
          content: env.docContent
        },
        fileType: "markdown",
        contentType: "text/markdown"
    }
}
```

{{< alert title="Note" color="primary" >}}If the documentation already exists as a markdown file on disk, then you can load the content with the following script.{{< /alert >}}

```bash
export docTitle='readme'
export docContent=$(cat README.md)
jq -f article.jq product-created.json > article.json
axway central create -f article.json -o json -y 
```

#### Get a list of the created articles

Once each article is created, get a list of the articles to assemble in the document. the following command queries for all articles in the scope of the product name:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get  resources -s $productName -o json 
```

To get a list of all articles available for the product and store them in a file:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get resources -s $productName -o json > available-articles.json
```

#### Create a document from the articles

To create a document form all the articles you have created, run the following command:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
jq -f document.jq available-articles.json > document.json
axway central create -f document.json -o json -y > document-created.json
```

Where `document.jq` has the following content:

```json
{
    group: "catalog",
    apiVersion: "v1",
    kind: "Document",
    title: "API Document",
    metadata: {
        scope: {
            kind: "Product",
            name: env.productName,
        }
    },
    spec: {
        sections: [
        {
            title: "Overview",
            articles: [
                 .[] | {
                     kind: .kind, 
                     name: .name,
                     title: .title
                }
            ]
        }
        ]
    }
}
```

#### Delete the product documentation

To delete product documentation, run the following command:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
export documentName=`jq -r .[0].name document-created.json`
axway central delete document  $documentName -s $productName
```

#### Delete created articles

To delete all the created articles, get the list of articles that were created for the product and then pass the result of the listing into the delete command:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get resources -s $productName -o json > delete-articles.json
axway central delete -f delete-articles.json
```

### Add an image to the product

To supply the product with an image / avatar to make the product more attractive and recognizable to the API Consumer, run the following command:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
export encodedImage=`base64 -i api.png`
axway central get product $productName -o json | jq '.icon = "data:image/png;base64," + env.encodedImage' > product-updated.json
axway central apply -f product-updated.json
```

### Assign a product category

Categorize a product to help API Providers organize them in the Marketplace so that are easily accessible.

To query the API Server to get the resource details of the category to be assigned to the product and store it to disk, run the following command. In this example, the category `title` is called `OpenBanking`:

```bash
axway central get category -q "title==OpenBanking" -o json > category-details.json
```

{{< alert title="Note" color="primary" >}}If the category does not exist, see [Create a category](/docs/manage_asset_catalog/asset_integrate_api_cli/#create-a-category).{{< /alert >}}

To update the product with the category, run the following command:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
export categoryName=`jq -r .[0].name category-details.json`
axway central get product $productName -o json | jq '.spec.categories |= . + [env.categoryName]' > product-updated.json
axway central apply -f product-updated.json
```

### Tag a product

Use tags to organize and filter products in the marketplace. To tag a product you update the `tags` field of a product resource. The `tags` field is a string array.

To update `tags` with a value of `experimental` to indicate to the API consumer that the API they are subscribing to is in an experimental state, run the following commands:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get product $productName -o json  | jq '.tags |= . + ["experimental"]' > product-updated.json
axway central apply -f product-updated.json
```

## Create a product plan

Plans define the limitations and subscription details of how API Consumers can use your products. A plan:

* Defines quota limits that indicate how many transactions an API consumer can use.
* Indicates which assets resources in the product that the quota is applicable to.
* Determines whether the plan is free or paid.

This example creates a free plan for the product:

```bash
jq -f product-plan.jq product-created.json > product-plan.json
axway central create -f product-plan.json -o json -y > product-plan-created.json
```

Where `product-plan.jq` has the following content:

```json
{
  group: "catalog",
  apiVersion: "v1alpha1",
  kind: "ProductPlan",
  title: "Basic Free Project Plan",
  spec: {
    product: .[0].name,
    description: "Free access to the api",
    type: "free",
    features: [
      {
        name: "Free API access"
      },
      {
        name: "10 Hours of support"
      }
    ],
    subscription: {
      interval: {
        type: "months",
        length: 1
      },
      renewal: "automatic",
      approval: "manual"
    }
  },
  state: "draft"
}
```

### Mark the product ready to be published to the Marketplace

Only products that are in an `active` state and marked as released are available to be published to the Marketplace.

#### Mark the product as Active state

To mark a product as `active`, run the following commands:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get product $productName -o json  | jq '.state = "active"' > product-updated.json
axway central apply -f product-updated.json
```

#### Create a release tag

To release a product, you must create a release tag for the product. The Product Foundry enforces sematic versioning, so when you create a release tag you must specify whether it is a major, minor or patch update. The Amplify platform will automatically calculate the semantic version based on the historic release version that has been applied. You can select how the release version number is incremented by selected one of the following values: `major`, `minor`, or `patch` for the `releaseType` field in the `ReleaseTag`. If you the current version number is 1.0.1 then the version will become the following:

| Value provided      | Result | Used when
| ----------- | ----------- | ----------- |
|major|2.0.1|Breaking changes introduced in the product for API Consumers |
|minor|1.1.1| New feature introduced to the product which does not break existing capabilities being consumed by API Consumers |
|patch|1.0.2| Bug fixes |

To make a release tag, run the following command:

```bash
jq -f product-release-tag.jq product-created.json > product-release-tag.json
axway central create -f product-release-tag.json -o json -y > product-release-tag-created.json
```

Where `product-release-tag.jq` has the following content:

```json
{
    group: "catalog",
    apiVersion: "v1",
    kind: "ReleaseTag",
    metadata: {
        scope: {
            kind: "Product",
            name: .[0].name,
        }
    },
    spec: {
        releaseType: "major"
    }
}
```

{{< alert title="Note" color="primary" >}}To update the version number further, create additional `ReleaseTag` resources and change the field `releaseType` to either `major`, `minor` or `patch` depending on the changes that you have made to the product.{{< /alert >}}

## Publish to the Marketplace

To publish your product to the Marketplace, you must find the name of the Marketplace, retrieve the Marketplace details, and create a PublishProduct event for the API Server.

### Get the Marketplace name

To get the name, run the following command:

```json
axway central get marketplaces -o json > marketplace.json
```

{{< alert title="Note" color="primary" >}}If no marketplace resources are returned, save the Marketplace settings on the platform, and set your subdomain at [Marketplace settings page](https://platform.axway.com/org/marketplace/settings), then check the output again for the previous command.{{< /alert >}}

### Get the details of your marketplace and create a PublishedProduct event for the API Server

To get the details and create a PublishedProduct event, run the following commands:

```bash
jq --slurp -f publish-product.jq marketplace.json product-created.json  > publish-product.json
axway central create -f publish-product.json -o json -y > publish-product-created.json
```

Where `publish-product.jq` has the following content:

```json
{
    group: "catalog",
    apiVersion: "v1alpha1",
    kind: "PublishedProduct",
    metadata: {
        scope: {
            kind: "Marketplace",
            name: .[0][0].name,
        }
    },
    spec: {
        product: {
            name: .[1][0].name
        }
    }
}
```

Your product is now available in the Marketplace for API consumers to subscribe to. You can see your Marketplace at the domain configured in your [Marketplace settings page](https://platform.axway.com/org/marketplace/settings).

## Remove a product

Before an active product can be deleted, its state must first transition to `deprecated` and then to `archived`.

### Change a product state

To change the state of a product named `petstore`, run the following commands to get the product details from the API Server and change the `state` field in the result. The modified result is written to file and this file is applied to the resource as its state is changed:

```bash
axway central get products petstore -o json | jq '.state = "NEW STATE"' > product-changed.json
axway central apply -f product-changed.json
```

{{% alert title="Warning" color="warning"%}}This action cannot be reversed.{{% /alert %}}

To prepare the product for removal, run the previous command two times:

* first time: replace NEW STATE with `deprecated`
* second time: replace NEW STATE with `archived`

### Delete the product

To delete the product, run the following command:

```bash
axway central delete products petstore -y
```
