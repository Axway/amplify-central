---
title: Create a product and promote it to the Marketplace
linkTitle: Create a product and promote it to the Marketplace
weight: 250
---
Create a product from an existing asset and make it available in the marketplace for consumption.

## Before you start

* Have credentials or service account to use the CLI. Follow the steps in [Authorize your CLI to use the Amplify Central APIs](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis)
* Understanding of the concepts of the Axway Central CLI presented in the [Overview of the Axway Central CLI capabilities](/docs/integrate_with_central/cli_central/_index)
* Install [jq](https://stedolan.github.io/jq/) on the system

For reference, the Open API specification for Amplify Central is located [here](https://apicentral.axway.com/apis/docs)

## Objectives

In this tutorial, you'll create a product with documentation, version it, and then publish it to the Marketplace.

## Steps to create and promote a product to the Marketplace

1. Create a new product
2. Ready the product for publication:

    * Add documentation
    * Add an image
    * Categorize the product
    * Tag the product

3. Create a plan
4. Mark the product ready to publish
5. Publish the product to the Marketplace

### Create Product YAML

You can create a product to address particular use cases that solve specific needs. A product is created to make it available to API consumers in the market place. Products are created with one or more assets available in the Asset Catalog.

Run the following command to find the list of available assets, which have been marked as `active` and released to the Marketplace:

```bash
axway central get assets
```

From the resulting platform response, select the names of the assets you want to bundle in your product. In this scenario, select the asset with the name `petstore-asset`.

To create a new product, first create a basic product YAML or JSON file. Populate the product with a single asset named `petstore-asset`.
A `.yaml`, `.yml`, or `.json` file can be used to define a specific resource. This tutorial uses `.json`.

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

Save file as `product.json`

Run the follow command to create the product on the server where `-f` is the filename used to create the resource, `-y` indicates that you'll accept the name for the product that the server auto generates (since a local name hasn't already been created):

```bash
axway central create -f product.json -y -o json > product-created.json
```

#### Make your product ready to be consumed

Perform the following tasks to make your newly created product ready to be consumed.

##### Add documentation to your product

Documentation consists of a number of articles, and can be associated to your product. Articles are created by adding resources of kind `Resource` to the API Server. Each `Resource` contains markdown content that is rendered with the product in the Marketplace.

In this tutorial you'll create three articles for the product:

* Overview
* Authentication
* Trouble shooting

Run the following commands to create a document resource within the product. Then upload the documents, organize, and reference them.

```bash
export docTitle='Overview'
export docContent='# Overview<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit'
jq -f article.jq product-created.json > article.json
axway central create -f article.json -o json -y 
```

Where ```article.jq``` has the following content:

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

Repeat the above step for `Authentication` article:

```bash
export docTitle='Authentication'
export docContent='# Authentication<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit'
jq -f article.jq product-created.json > article.json
axway central create -f article.json -o json -y 
```

Repeat the step again for the `Trouble shooting` article:

```bash
export docTitle='Trouble shooting'
export docContent='# Trouble shooting<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit'
jq -f article.jq product-created.json > article.json
axway central create -f article.json -o json -y 
```

If you already have the documentation as a markdown file on disk, then you can load the content with the following script:

```bash
export docTitle='readme'
export docContent=$(cat README.md)
jq -f article.jq product-created.json > article.json
axway central create -f article.json -o json -y 
```

Now that each article is created, assemble them into a document. Run the following command to querying for all articles in the scope of the product name:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get  resources -s $productName -o json 
```

Run the following command to get the list of all articles available for the product and store them in a file:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get resources -s $productName -o json > available-articles.json
```

Run the following command to create a document from the articles that have been created:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
jq -f document.jq available-articles.json > document.json
axway central create -f document.json -o json -y > document-created.json
```

Where ```document.jq``` has the following content:

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

Run the following command to delete the documentation:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
export documentName=`jq -r .[0].name document-created.json`
axway central delete document  $documentName -s $productName
```

You can delete all the created articles by first getting the list of articles that were created for the product and then passing the result of the listing into the delete command:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get resources -s $productName -o json > delete-articles.json
axway central delete -f delete-articles.json
```

##### Add an image to a product

An image / avatar makes the product more attractive and recognizable to the API Consumer. Run the following script to query the created resources on disk using `jq` and store the result in environment variables. It will based64 encode the content of a png file and store it in an `encodedImage` environment variable. It will query the API Server for the product resource and update the responding JSON with the values from the environment variables. Finally, it pushes the updates json content back to the API Server so that the product has an image attached.

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
export encodedImage=`base64 -i api.png`
axway central get product $productName -o json | jq '.icon = "data:image/png;base64," + env.encodedImage' > product-updated.json
axway central apply -f product-updated.json
```

##### Assign a product a category

Products are categorized to help API providers organize products in the Marketplace, making it easy for API consumers to quickly find them. To assign a product a category, first find it's logical name and then update the product to use it.

Run the following command to query the API Server to get the resource details of the category to be assigned to the product, in this case the category we want to use has the `title` called `OpenBanking`, and store it to disk:

```bash
axway central get category -q "title==OpenBanking" -o json > category-details.json
```

Run the following command to update the product:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
export categoryName=`jq -r .[0].name category-details.json`
axway central get product $productName -o json | jq '.spec.categories |= . + [env.categoryName]' > product-updated.json
axway central apply -f product-updated.json
```

##### Tagging a product

Tags are used to organize and filter products in the Marketplace. To tag a product, update the `tags` field (string array) of a product resource.

Run the following command to update the `tags` field with a tag value of `experimental` to indicate to the API consumer that the API they are subscribing to is in a experimental state:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get product $productName -o json  | jq '.tags |= . + ["experimental"]' > product-updated.json
axway central apply -f product-updated.json
```

### Create Plan

Plans define the limitations and subscription details of how API Consumers can use your products. A plan includes a quota limit that indicates how many transactions an API consumer can use, and which assets resources in the product that the quota is applicable to. Plans can be free or paid.

Run the following command to configure a free plan for the product:

```bash
jq -f product-plan.jq product-created.json > product-plan.json
axway central create -f product-plan.json -o json -y > product-plan-created.json
```

Where ```product-plan.jq``` has the following content:

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

The product plan has now been associated with the product.

### Mark the product ready to be published to the Marketplace

Only products that are in an `active` state and marked as released are made available to be published to the Marketplace.

Run the following commands to update the product you created in step 1 to `active`:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get product $productName -o json  | jq '.state = "active"' > product-updated.json
axway central apply -f product-updated.json
```

A product must have a Release Tag before it can be released. The Product Foundry Catalog enforces sematic versioning, so you must specify how the release version number should be incremented by entering a `releaseType` of either `major`, `minor` or `patch`. The Amplify platform automatically calculates the semantic version of the product based on the historic release version that has been applied. If the current version number is 1.0.1, then the version will become:

| Value provided      | Result | Used when
| ----------- | ----------- | ----------- |
|major|2.0.1|Breaking changes introduced in the product for API Consumers |
|minor|1.1.1| New feature introduced to the product which does not break existing capabilities being consumed by API Consumers |
|patch|1.0.2| Bug fixes |

Run the following command to make a release tag for the product:

```bash
jq -f product-release-tag.jq product-created.json > product-release-tag.json
axway central create -f product-release-tag.json -o json -y > product-release-tag-created.json
```

Where ```product-release-tag.jq``` has the following content:

```json
{
    group: "catalog",
    apiVersion: "v1alpha1",
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

After making a product `active` and versioning it with a `release tag` the asset is now available to be published to the Marketplace.

If you want to update the version number further, then create more `ReleaseTag` resources and change the field `releaseType` to either `major`, `minor`, or `patch` depending on the changes that you have made to the product.

### Publish to Market

To publish your product to the Marketplace, you must first know the name of the Marketplace.

Run the following command get the details of your Marketplace:

```js
axway central get marketplaces -o json > marketplace.json
```

If no marketplace resources are returned, make sure to save the Marketplace settings on platform and set your subdomain at [Marketplace settings page](https://platform.axway.com/org/marketplace/settings) and check the output again for the previous command.

Run the following command to create a PublishedProduct event for the API Server:

```bash
jq --slurp -f publish-product.jq marketplace.json product-created.json  > publish-product.json
axway central create -f publish-product.json -o json -y > publish-product-created.json
```

Where ```publish-product.jq``` has the following content:

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

Your product is now available in the Marketplace for API consumers to find and subscribe to use the asset resources associated with the product. You can see your Marketplace at the domain configured in your [Marketplace settings page](https://platform.axway.com/org/marketplace/settings).

### Remove a product

Before a product can be deleted, its state must first be marked as `archived`. Run the following command to archive a product named `petstore`, where you get the product details from the API Server, and change the ```state``` field in the result. The modified result is written to file and then this file is applied to the resource as its state is changed.

```bash
axway central get products petstore -o json | jq '.state = "archived"' > product-changed.json
axway central apply -f product-changed.json
```

{{% alert title="Warning" color="warning"%}}This action cannot be reversed.{{% /alert %}}

Once the product state is set to `archived`, the asset can be deleted. Run the following command to delete the asset:

```bash
axway central delete products petstore -y
```
