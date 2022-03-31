---
title: Create and fetch resources with Axway Central CLI
linkTitle: Create and fetch resources with the CLI
weight: 120
draft: yes
date: 2021-01-13T00:00:00.000Z
description: Creating and fetch different Amplify Central resources using the CLI.
---
## Before You Start

* [Install and authenticate yourself via the Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).
* Familiarize yourself with the [most commonly used Axway Central CLI commands](/docs/integrate_with_central/cli_central/cli_command_reference/).

## Objectives

* Learn how to create and fetch various types of resources via the Axway Central CLI `create` and `get` commands.
* Learn about the information the Axway Central CLI provides when you fetch the resources you have created.

## Create a resource

Axway Central CLI supports creating several resources from either a YAML or JSON file, or Stdin. For example:

```bash
axway central create -f <path_to_file>  # Create resources defined in a YAML or JSON file.
```

## Fetch a resource

You can query for a singular resource or multiple resources, and the CLI will display a table of the most important information about the specified resource.

```bash
axway central get <Resource> # Get a list of the resources
```

```bash
axway central get <Resource1>,<Resource2>,...,<ResourceN> # Get a list of multiple resources
```

```bash
axway central get <Resource> <Name> -s/--scope <Scope Name> # Get a specific resource by name
```

## Create and fetch examples

The following are examples of how you can use Amplify Central samples to create and fetch different resources.

### Consumer instances

You can use the [sdkconsumerinstance.json](/samples/central/sdkconsumerinstance.json) sample to create a consumer instance. Then, you can fetch information about your consumer instances as follows:

```bash
axway central get consumerinstances
```

Alternatively, you can use a short name:

```bash
axway central get consumeri
```

Resource(s) successfully retrieved:

```bash
NAME           AGE           TITLE                RESOURCE KIND    SCOPE KIND   SCOPE NAME          RESOURCE GROUP
consumerinst1  a month ago   consumerinst1 title  ConsumerInstance Environment  awsgtw-us-east-2    management
```

### Consumer subscription definitions

You can use the [apisubscription.json](/samples/central/apisubscription.json) sample to create a consumer subscription definition. Then, you can fetch information about your consumer subscription definitions as follows:

```bash
axway central get consumersubscriptiondefs
```

Alternatively, you can use a short name:

```bash
axway central get consumersd
```

Resource(s) successfully retrieved:

```bash
NAME             AGE           TITLE                 RESOURCE KIND                  SCOPE KIND   SCOPE NAME         RESOURCE GROUP
consumersubdef1  a month ago   consumersubdef1 title ConsumerSubscriptionDefinition Environment  awsgtw-us-east-2   management
```

### Secrets

You can use the [apisecret.json](/samples/central/apisecret.json) sample to create a secret. Then, you can fetch information about your secrets as follows:

```bash
axway central get secret
```

Alternatively, you can use a short name:

```bash
axway central get secrets
```

Resource(s) successfully retrieved:

```bash
NAME        AGE           TITLE       RESOURCE KIND  SCOPE KIND   SCOPE NAME    RESOURCE GROUP
secretname  4 months ago  secrettitle Secret         Environment  apigtw-v77    management
```

### Webhooks

You can use the [apiwebhook.json](/samples/central/apiwebhook.json) sample to create a Webhook. Then, you can then fetch information about your Webhooks as follows:

```bash
axway central get webhooks
```

Alternatively, you can use a short name:

```bash
axway central get wh
```

Resource(s) successfully retrieved:

```
NAME                       AGE           TITLE                             RESOURCE KIND  SCOPE KIND   SCOPE NAME                       RESOURCE GROUP
streams-extension-webhook  a month ago   Streams Extension Webhook         Webhook        Environment  streams-dataplane-integrations   management
webhook                    6 months ago  Webhook to invoke requestbin.com  Webhook        Environment  cisco-b2bi                       management
msflow                     7 months ago  webhook1 title                    Webhook        Environment  swaggerhub                       management
msflow                     7 months ago  webhook1 title                    Webhook        Environment  azure                            management
subscriptionwebhook        4 months ago  subscriptionwebhook               Webhook        Environment  apigtw-v77                       management
```

### More sample resources

You can practice the above pattern of creating and fetching resources using our sample files:

* API services: [apiservice.json](/samples/central/apiservice.json)
* API service instances: [apiendpoint.json](/samples/central/apiendpoint.json)
* API service revisions: [apirevisions1.json](/samples/central/apirevisions1.json)
* Environments: [create_environments.json](/samples/central/create_environments.json)

Run `axway central get` to see the entire list of resources supported by the Axway Central CLI.
