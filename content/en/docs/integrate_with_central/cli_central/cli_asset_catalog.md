---
title: Manage assets using the CLI
linkTitle: Manage assets using the CLI
weight: 200
---

Learn how to create assets from discovered APIs with the Amplify management plane.

## Before you start

* Have credentials or service account to use the CLI. Follow the steps in [Authorize your CLI to use the Amplify Central APIs](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis)
* Understanding of the concepts of the Axway Central CLI presented in the [Overview of the Axway Central CLI capabilities](/docs/integrate_with_central/cli_central/_index)
* Understand the steps in steps in [Register APIs using the CLI](/docs/integrate_with_central/cli_central/cli_register_api)
* Install [jq](https://stedolan.github.io/jq/) on the system

## Objectives

In this tutorial, you'll create an asset in the Asset Catalog, link an API to it, and release it to the Product Foundry using the Axway Central CLI.

## Steps to manually create, publish and manage your assets

1. Group an asset in a stage
2. Create an asset
3. Link an existing API to the created asset
4. Release the asset to the Product Foundry
5. Manage your asset

### Group an asset in a stage

Assets can represent any digital entity – sdks, docs, REST API, WSDL, gif etc. – whatever you want to catalog and productize, APIs being the primary use case for assets in the system. The lifecycle of those productizable APIs is nebulous, as the decisions on how they can be grouped and managed is a business decision. A “stage” is a grouping mechanism, but it’s not got a concrete physical representation (i.e., tied to an environment). It could be dev/test/prod, it could be eu/us/cn, it could be R&D/Sales/Marketing.

Run the following command To see the list of currently available stages in the system:

```bash
axway central get stg
```

Run the following command to get details of the stages, including their logical name:

```bash
axway central get stg -o json > stages.json
```

```stages.json``` contains all information of the stages.

If the stage that you want to use already exists then you can use it by finding it's logical name and updating the asset to use it. Query the API Server to get the resource details of the stage you want to assign to the asset. In this case, the stage has the `title` called `production`. Use this command to get the category resource and store it to disk:

```bash
axway central get stage -q "title==production" -o json > stage-details.json
```

Run the following command if you want to create a new stage that doesn't exist in the system. then repeat the earlier steps to assign an asset to a stage.

```bash
axway central create -f stage.json -o json -y > stage-details.json
```

Where ```stage.json``` contains the following content:

```json
{
    "group": "catalog",
    "apiVersion": "v1alpha1",
    "kind": "Stage",
    "title": "production",
    "spec": {
        "description": "All APIs hosted in production"
    }
}
```

### Create an asset

An Asset is a resource that has business value, something that an API Provider might want to expose to API Consumers via the marketplace. The Asset resource is a scope, which aggregates the business value.

Run the following command to create an asset:

```bash
axway central create -f asset.json -o json -y > asset-created.json
```

Where ```asset.json``` contains the following content:

```json
{
    "group": "catalog",
    "apiVersion": "v1alpha1",
    "kind": "Asset",
    "title": "Asset from tutorial",
    "spec": {
        "type": "API"
    },
    "state": "draft"
}
```

### Link an existing API to the created asset

To link an API to an asset you must create an AssetResource. AssetResources are the business value that the asset is wrapping - these may be SDKs, scripts, APIs, etc. Similar to an APIServiceRevision, API Server is not opinionated about what the AssetResource is.

Create the AssetResource in the scope of the previously created Asset. Group the asset in the stage created previously.

```bash
jq --slurp -f asset-resource.jq asset-created.json api-service-revision-created.json stage-details.json > asset-resource.json
axway central create -f asset-resource.json -o json -y > asset-resource-created.json
```

Where ```asset-resource.jq``` has the following content:

```json
# Creates the API Service Instance from OAS and the created service revision
{
    apiVersion: "v1alpha1",
    kind: "AssetResource",
    title: .[1][0].title,
    metadata: {
        scope: {
            kind: "Asset",
            name: .[0][0].name,
        }
    },
    spec: {
        type: .[1][0].spec.definition.type,
        definition: .[1][0].spec.definition.value,
        stage: .[2][0].name,
        status: "active"
    }
}
```

### Make the asset available to the Product Foundry

Only assets that are in an `active` state and marked as released are available in the Product Foundry. The Product Foundry is where you create products to be made available in the Marketplace.

Run the following commands to mark an asset as `active`, which will update the asset created in the first step to `active`:

```bash
#!/bin/bash
export assetName=`jq -r .[0].name asset-created.json`
axway central get asset $assetName -o json | jq '.state = "active"' > asset-changed.json
axway central apply -f asset-changed.json
```

To release an asset, you must create a Release Tag for the asset. The Asset Catalog is enforcing sematic versioning, so when you create a release tag you need to specify if you are releasing a major, minor or patch update. The Amplify platform will automatically calculate the semantic version of the asset based on historic release times that have been applied. You can select how the release version number should be incremented by selected one of the following values `major`, `minor`, or `patch`. If the current version number is 1.0.1 then the subsequent versions will become:

| Value provided      | Result |
| ----------- | ----------- |
|major|2.0.1|
|minor|1.1.1|
|patch|1.0.2|

Run the following commands to make a release tag for the asset created earlier:

```bash
jq --slurp -f asset-release-tag.jq asset-created.json > asset-release-tag.json
axway central create -f asset-release-tag.json -o json -y > asset-release-tag-created.json
```

Where ```asset-release-tag.jq``` has the following content:

```json
{
    group: catalog,
    apiVersion: "v1alpha1",
    kind: "ReleaseTag",
    metadata: {
        scope: {
            kind: "Asset",
            name: .[0][0].name,
        }
    },
    spec: {
        releaseType: major
    }
}
```

After making a product `active` and versioning it with a `release tag` the asset is now available to be used in the Product Foundry.

### Manage assets

#### Add an image to an asset

An image / avatar can be added to the asset. The script below will query the created resources on disk using `jq` and store the result in environment variables. It will based64 encode the content of a png file and store it in an environment variable called `encodedImage`. It will the query the API Server for the asset resource and update the responding JSON with the values from the environment variables. Finally, it pushes the updated json content back to the API Server so that the asset has an image attached.

```bash
#!/bin/bash
export assetName=`jq -r .[0].name asset-created.json`
export encodedImage=`base64 -i api.png`
axway central get asset $assetName -o json | jq '.icon = "data:image/png;base64," + env.encodedImage' > asset-updated.json
axway central apply -f asset-updated.json
```

#### Organize your assets

##### Tag an asset

Tags are a way to organize and filter assets in the Asset catalog. To tag an asset, update the `tags` field (string array) of an asset resource. 

Run the following commands to update the `tags` with a tag value of `experimental`:

```bash
#!/bin/bash
export assetName=`jq -r .[0].name asset-created.json`
axway central get asset $assetName -o json | jq '.tags |= . + ["experimental"]' > asset-updated.json
axway central apply -f asset-updated.json
```

##### Assign an asset a category

To help manage the number of assets in the Asset Catalog, you can assign an asset to a category. 
If the category you wish to assign to the asset does not exist, then you can create the category using the `Category` resource type. 

Run the following command to create a new category with the titled `Finance` and the description `Finance APIs`:

```bash
axway central create -f category.json -o json -y > category-created.json
```

Where ```category.json``` contains the following content:

```json
{
    "group": "catalog",
    "apiVersion": "v1alpha1",
    "kind": "Category",
    "title": "Finance",
    "spec": {
        "description": "Finance APIs"
    }
}
```

After the category has been created, run the following command to assign the category to the asset:

```bash
#!/bin/bash
export assetName=`jq -r .[0].name asset-created.json`
export categoryName=`jq -r .[0].name category-created.json`
axway central get asset $assetName -o json | jq '.spec.categories |= . + [env.categoryName]' > asset-updated.json
axway central apply -f asset-updated.json
```

If the category that you want to use already exists as a category in the API Server, then you can find its logical name and update the asset to use it. Query the API Server to get the resource details of the category to be assigned to the asset. In this case, the category you'll use has the `title` called `OpenBanking`. 

Run the following command to get the category resource and store it to disk:

```bash
axway central get category -q "title==OpenBanking" -o json > category-details.json
```

Run the following command update the asset:

```bash
#!/bin/bash
export assetName=`jq -r .[0].name asset-created.json`
export categoryName=`jq -r .[0].name category-details.json`
axway central get asset $assetName -o json | jq '.spec.categories |= . + [env.categoryName]' > asset-updated.json
axway central apply -f asset-updated.json
```

#### Archive and delete an asset

Before an asset can be deleted, its state must first be marked as `archived`. Run the following commands to archive an asset named `my-asset` where you'll get the named asset and change the `state` field  in the result. The modified result is written to file and then this file is applied to the resource as its state is changed. To follow the lifecycle of an asset, it must first be set to the `deprecated` state before it can be set to `archived`.

```bash
axway central get asset my-asset -o json | jq '.state = "deprecated"' > asset-changed.json
axway central apply -f asset-changed.json
```

Repeat the commands above to change the state to `archived`:

```bash
axway central get asset my-asset -o json | jq '.state = "archived"' > asset-changed.json
axway central apply -f asset-changed.json
```

{{% alert title="Warning" color="warning"%}}This action cannot be reversed.{{% /alert %}}

After the asset state is set to `archived`, run the following command to delete the asset:

```bash
axway central delete asset my-asset -y
```
