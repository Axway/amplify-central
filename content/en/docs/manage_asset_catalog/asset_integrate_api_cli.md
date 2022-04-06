---
title: Integrate with API / CLI
linkTitle: Integrate with API / CLI
weight: 30
---

Use the Amplify Central API / CLI to create and manage your assets.

## Before you start

* You must have credentials or a user account to use the CLI. Please follow the steps in [Authorize your CLI to use the Amplify Central APIs](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis)
* Understand the concepts of the Axway Central CLI presented in the [Overview of the Axway Central CLI capabilities](/docs/integrate_with_central/cli_central/_index)  
* Be familiar with the steps in [Register APIs using the CLI](/docs/integrate_with_central/cli_central/cli_register_api)
* Make sure [jq](https://stedolan.github.io/jq/) is installed on the system

## Objectives

Learn how to use the Axway Central CLI to create and manage assets in the Asset Catalog.

* Create an asset
* Link an existing API to the created asset
* Activate the asset to make it available to the Product Foundry
* Organize your assets
* Archive and delete an asset

{{< alert title="Note" color="primary" >}}For consistency and readability, the same asset is used throughout the code examples in this topic.{{< /alert >}}

## Group an asset in a stage

Assets can represent any digital entity (sdks, docs, REST API, WSDL, gif, etc.) that you want to catalog and productize, with APIs being the primary use case for assets in the system. The lifecycle of the APIs that can be productized is a business decision which determines how they are grouped and managed. A “stage” is a grouping mechanism, which isn't tied to an environment and does not have a concrete physical representation. It could be, for example, dev/test/prod, eu/us/cn, or R&D/Sales/Marketing.

### List available stages

To see the list of currently available stages in the system, run the following command:

```bash
axway central get stg
```

### Get details

To get the details of the stages, including their logical names, run the following command:

```bash
axway central get stg -o json > stages.json
```

`stages.json` contains all information of the stages.

### Use a stage that already exists

If the stage you want to use already exists, you can still use it if you find its logical name and update the asset to use it.

Query the API Server to get the resource details of the stage you want to assign to the asset. In this example, the stage we want to use has the `title` called `production`.

Use this command to get the stage resource and store it to disk:

```bash
axway central get stage -q "title==production" -o json > stage-details.json
```

### Create a new stage

To create a new stage that doesn't exist in the system, run the following command, and repeat the previous step to assign the asset to a stage:

```bash
axway central create -f stage.json -o json -y > stage-details.json
```

Where `stage.json` contains the following content:

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

## Create an asset

An asset is a resource that has business value, something that an API Provider might want to expose to API consumers via the Marketplace. The Asset resource is a scope, which aggregates the business value.

To create an asset run the following command:

```bash
axway central create -f asset.json -o json -y > asset-created.json
```

Where `asset.json` contains the following content:

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

The asset is created in **Draft** state. To use this asset in a product definition, you must move the asset to an **Active** state by activating the asset.

### Link an existing API to the created asset

To link an API to an asset, create an `AssetResource`. AssetResources are the business value that the asset is wrapping and can be SDKs, scripts, APIs, etc. Similar to an `APIServiceRevision`, the API Server is not opinionated about what the AssetResource is.

Create the AssetResource in the scope of the previously created asset. In this example, the asset will be grouped in the stage that was created previously:

```bash
jq --slurp -f asset-resource.jq asset-created.json api-service-revision-created.json stage-details.json > asset-resource.json
axway central create -f asset-resource.json -o json -y > asset-resource-created.json
```

Where `asset-resource.jq` has the following content:

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

### Activate the asset to make it available in the Product Foundry

Only assets that are in an `active` state and marked as released are available in the Product Foundry, where the assets are productized to be made available in the Marketplace.

To mark an asset as `active` run the following commands:

```bash
#!/bin/bash
export assetName=`jq -r .[0].name asset-created.json`
axway central get asset $assetName -o json | jq '.state = "active"' > asset-changed.json
axway central apply -f asset-changed.json
```

### Create a release tag

To release an asset, you must create a release tag for the asset. The Asset Catalog enforces sematic versioning, so when you create a release tag you must specify whether it is a major, minor or patch update. The Amplify platform will automatically calculate the semantic version of the asset based on historic release times that have been applied. You can select how the release version number is incremented by selected one of the following values: `major`, `minor`, or `patch`. If the current version number is 1.0.1, then the version is incremented to:

| Value provided      | Result |
| ----------- | ----------- |
|major|2.0.1|
|minor|1.1.1|
|patch|1.0.2|

To make a release tag, run the following command:

```bash
jq --slurp -f asset-release-tag.jq asset-created.json > asset-release-tag.json
axway central create -f asset-release-tag.json -o json -y > asset-release-tag-created.json
```

Where `asset-release-tag.jq` has the following content:

```json
{
    group: "catalog",
    apiVersion: "v1alpha1",
    kind: "ReleaseTag",
    metadata: {
        scope: {
            kind: "Asset",
            name: .[0][0].name,
        }
    },
    spec: {
        releaseType: "major"
    }
}
```

The asset is now available to be used in the Product Foundry.

## Manage assets

Once your assets have been created, use the Axway Central CLI to help organize and manage them.

### Tag an asset

Use tags to organize and filter assets in the Asset catalog. To tag an asset, update the `tags` field of an asset resource. The `tags` field is a string array.

To update `tags` with a value of `experimental`, run the following commands:

```bash
#!/bin/bash
export assetName=`jq -r .[0].name asset-created.json`
axway central get asset $assetName -o json | jq '.tags |= . + ["experimental"]' > asset-updated.json
axway central apply -f asset-updated.json
```

### Create a category

Categories help in the management of the number of assets in the Asset Catalog. To create a new category, use the `Category` resource type.

Run the following command to create a new category with the title `Finance` and the description: `Finance APIs`:

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

### Assign a category to an asset

To assign the category to the asset, run the following command:

```bash
#!/bin/bash
export assetName=`jq -r .[0].name asset-created.json`
export categoryName=`jq -r .[0].name category-created.json`
axway central get asset $assetName -o json | jq '.spec.categories |= . + [env.categoryName]' > asset-updated.json
axway central apply -f asset-updated.json
```

### Use a category that already exists

If the category you want to use already exists, you can still use it if you find its logical name and update the asset to use it.

Query the API Server to get the resource details of the category to assign to assigned to the asset. In this example, the category we want to use has the `title` called `OpenBanking`.

Use this command to get the category resource and store it to disk:

```bash
axway central get category -q "title==OpenBanking" -o json > category-details.json
```

To update the asset, run the following command:

```bash
#!/bin/bash
export assetName=`jq -r .[0].name asset-created.json`
export categoryName=`jq -r .[0].name category-details.json`
axway central get asset $assetName -o json | jq '.spec.categories |= . + [env.categoryName]' > asset-updated.json
axway central apply -f asset-updated.json
```

### Deprecate an asset

Before an asset's state can be set to `archived`, it must first be set to the state `deprecated`.

To deprecate an asset named `my-asset`, run the following command the named asset, and change the `state` field:

```bash
axway central get asset my-asset -o json | jq '.state = "deprecated"' > asset-changed.json
axway central apply -f asset-changed.json
```

### Archive an asset

Before an asset can be deleted its state must be set to `archived`.

To archive an asset named `my-asset`, run the following commands to get the named asset, and change the `state` field.

```bash
axway central get asset my-asset -o json | jq '.state = "archived"' > asset-changed.json
axway central apply -f asset-changed.json
```

{{% alert title="Warning" color="warning"%}}This action cannot be reversed.{{% /alert %}}

### Delete an asset

To delete an asset, run the following command::

```bash
axway central delete asset my-asset -y
```
