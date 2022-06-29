---
title: Create a product and promote it to the Marketplace
linkTitle: Create a product and promote it to the Marketplace
weight: 250
---

Learn how to create a product from an existing asset and make it available in the marketplace for consumption.

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
4. Publish the product to the Marketplace

### Create Product YAML

You can create a product to address a particular use cases that solve specific needs. You create a product in order to make it available to API Consumers in the market place. Products are created with one or more assets available in the Asset Catalog.

To find the list of available assets which have been marked as ```active``` and released to the Marketplace run the following command:

```bash
axway central get assets
```

From the resulting response from the platform select the name or names of the assets that you want to bundle in your product. In the scenario we will select the asset with the name ````petstore-asset```.

To create a new product we will first create an basic product YAML or JSON file. We will populate the product with a single asset, namely ````petstore-asset```.
A `.yaml`, `.yml`, or `.json` file can be used to define a specific resource for these examples we will be using `.json`

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

Run the follow command to create the product on the server  where `-f` is the filename to use to create the resource, `-y` indicates that you'll accept the name for the product that the server auto generates (since a local name hasn't already been created):

```bash
axway central create -f product.json -y -o json > product-created.json
```

#### Make your product ready to be consumed

Perform the following tasks to make your newly created product ready to be consumed.

##### Add documentation to your product

You can associate documentation with your product. Documentation consists of a number of articles. Articles are created by adding resources of kind ```Resource``` to the API Server. Each ```Resource``` will contain markdown content which will be rendered with the product in the Marketplace.

We will create some three articles for our product:

* Overview
* Authentication
* Trouble shooting

This will create a document resource within the product. You can upload documents then organize and reference them.

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

Repeat the above step for ```Authentication``` article:

```bash
export docTitle='Authentication'
export docContent='# Authentication<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit'
jq -f article.jq product-created.json > article.json
axway central create -f article.json -o json -y 
```

And for the ```Trouble shooting``` article:

```bash
export docTitle='Trouble shooting'
export docContent='# Trouble shooting<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit'
jq -f article.jq product-created.json > article.json
axway central create -f article.json -o json -y 
```

 Note that if you already have the documentation as markdown file on disk then you could load the content with the following script:

```bash
export docTitle='readme'
export docContent=$(cat README.md)
jq -f article.jq product-created.json > article.json
axway central create -f article.json -o json -y 
```

Now that each article is created we need to assemble these into a document. We can get the list of created articles by running the following command which is querying for all articles in the scope of the product name:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get  resources -s $productName -o json 
```

To get the list of all articles available for the product and store them in a file:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get resources -s $productName -o json > available-articles.json
```

We will now create a document from the all the articles that have been created:

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

You can delete product documentation by running the following command:

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

##### Adding an image a product

It is possible to supply the product with with an image / avatar to make the product more attractive and recognizable to the API Consumer. The script below will query the created resources on disk using ```jq``` and store the result in environment variables. It will based64 encode the content of a png file and store this in an environment variable called ```encodedImage```. It will query the API Server for the product resource and update the responding JSON with the values from the environment variables. Finally it pushes the updates json content back to the API Server so that the product has an image attached.

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
export encodedImage=`base64 -i api.png`
axway central get product $productName -o json | jq '.icon = "data:image/png;base64," + env.encodedImage' > product-updated.json
axway central apply -f product-updated.json
```

##### Assign a product a category

You can categorize a product in order to help API Providers organize products in the Marketplace so that API Consumers can quickly find them.

We will assume that the category that you want to assign a product already exists. If it doesn't then see the section ~~~~ REF TO "Assigned an asset a category" in the asset catalog ~~~~.

You can find a category by finding it's logical name and updating the product to use it. First we will query the API Server to get the resource details of the category to be assigned to the product, in this case the category we want to use has the ```title``` called ```OpenBanking```. Use this command to get the category resource and store it to disk:

```bash
axway central get category -q "title==OpenBanking" -o json > category-details.json
```

Now that we have the category we can update the product using the following commands:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
export categoryName=`jq -r .[0].name category-details.json`
axway central get product $productName -o json | jq '.spec.categories |= . + [env.categoryName]' > product-updated.json
axway central apply -f product-updated.json
```

##### Tagging a product

Tags are a way to organize and filter products in the marketplace. To tag a product you update the ```tags``` field of a product resource. The ```tags``` field is a string array. To update the ```tags``` with a tag value of ```experimental``` to indicate ot the API consumer that the API they are subscribing to is in a experimental state, you run the following commands:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get product $productName -o json  | jq '.tags |= . + ["experimental"]' > product-updated.json
axway central apply -f product-updated.json
```

### Create Plan

Define Plans to specify the limitations and subscription details of how API Consumers can use your products. A plan includes quota limit that indicates how many transactions that an API consumer can use. The plan an indicate which assets resources in the product that the quota is applicable to. Plans can be free or paid.

In this example we will configure a free plan for the product.

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

Only products which are in an ```active``` state and marked as released are made available to be published to the Marketplace.

To mark an product as ```active``` run the following commands which will update the asset created in the first step to ```active```:

```bash
#!/bin/bash
export productName=`jq -r .[0].name product-created.json`
axway central get product $productName -o json  | jq '.state = "active"' > product-updated.json
axway central apply -f product-updated.json
```

To release an product you need to create a Release Tag for the product. The Product Foundry Catalog is enforcing sematic versioning. So when you create a release tag you need to specify if you are releasing a major, minor or patch update. The Amplify platform will automatically calculate the semantic version of the asset based on historic release version that have been applied. You can select how the release version number should be incremented by selecting one of the following values ```major```, ```minor```, or ```patch``` for the ```releaseType``` field in the ```ReleaseTag```. If you the current version number is 1.0.1 then the version will become the following:

| Value provided      | Result | Used when
| ----------- | ----------- | ----------- |
|major|2.0.1|Breaking changes introduced in the product for API Consumers |
|minor|1.1.1| New feature introduced to the product which does not break existing capabilities being consumed by API Consumers |
|patch|1.0.2| Bug fixes |

To make a release tag for the product created earlier run the following command:

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

After making a product ```active``` and versioning it via a ```release tag``` the asset is now available to be published to the Marketplace.

Note, if you want to update the version number further then you create more ```ReleaseTag``` resources and change the field ```releaseType``` to the either ```major```, ```minor```, ```patch``` depending on the changes that you have made to the product.

### Publish to Market

In order to publish your product to the market place you will need the name of the market. To acquire this use the following command.

```js
axway central get marketplaces -o json > marketplace.json
```

This will retrieve the details of your marketplace and we will use this to create a PublishedProduct event for the API Server.

Note: if no marketplace resources are returned, make sure to save the Marketplace settings on platform and set your subdomain at [Marketplace settings page](https://platform.axway.com/org/marketplace/settings) and check again the output for the previous command.

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

Before a product can be deleted, its state must first be marked as `archived`. To archive a product named ```petstore``` run the following commands where first we get the product details from the API Server, we change the ```state``` field in the result. The modified result is written to file and then this file is applied to the resource as it's state is changed:

```bash
axway central get products petstore -o json | jq '.state = "archived"' > product-changed.json
axway central apply -f product-changed.json
```

{{% alert title="Warning" color="warning"%}}This action cannot be reversed.{{% /alert %}}

Now that the product state is set to ```archived``` we can delete the asset by running the following command:

```bash
axway central delete products petstore -y
```
