---
title: Build an Asset using the Axway Central CLI
linkTitle: Build an Asset using the Axway Central CLI
weight: 125
draft: yes
description: Learn how your DevOps process can use Axway Central CLI to build
  and manage your assets.
---

## Before you start

* You must [authorize your DevOps service to use the DevOps API](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis)
* Verify the @axway/axway-central-cli version is at minimum 2.2.0.

## Objectives

Learn how to create an asset from one API Service or multiple similar API Services across multiple environments using the Axway Central CLI.

* Create a new asset
* Retrieve a list of all available assets
* Retrieve details for a specific asset
* Update a specific asset
* Delete a specific asset

## Create an asset

An asset represents one or more API Services (i.e. grouping) across multiple user or customer defined contexts.

The following is an example of how a DevOps user can run a CLI command to create an asset.

Create an asset by providing the path to a valid .yaml, .yml, or .json file that defines a specific resource:

```bash
axway central create -f <filepath>
```

Try out the [create_asset.yaml](https://amplify-central.netlify.app/samples/central/create_asset.yaml) sample to create an asset.
This sample includes optional resources for adding multiple API services to your asset across different environments.

## Retrieve a list of all available assets

The following example shows how to get a list of all assets (names, ages, and titles) for my tenant/organization:

```bash
axway central get assets
```

To get a list of all asset details displayed in JSON format. (Use `-o yaml` to display the output in YAML format):

```bash
axway central get assets -o json
```

## Retrieve details for a specific asset

The following example shows how to get details (name, age, and title) on a specific asset by providing the asset name:

```bash
axway central get asset <name>
```

To get details on a specific asset displayed in JSON format. (Use `-o yaml` to display the output in YAML format):

```bash
axway central get asset <name> -o json
```

## Update a specific asset

The following example shows how to edit the details of a specific asset by providing an updated and valid .yaml, .yml, or .json file:

```bash
axway central apply -f <filename>
```

## Delete a specific asset

{{< alert title="Warning" color="warning" >}}This action cannot be reversed.{{< /alert >}}

To delete an asset:

```bash
axway central delete asset <name>
```

To delete an asset and all other resources defined in a provided .yaml, .yml, or .json file:

```bash
axway central delete -f <filepath>
```

## Review

You have learned how to use the Axway Central CLI to build and manage your assets.
