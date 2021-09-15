---
title: Build an environment using the Axway Central CLI
linkTitle: Build an environment
weight: 110
date: 2020-06-10T00:00:00.000Z
description: Learn how your DevOps process can use Axway Central CLI to build
  and manage your environments.
---

## Before you start

* You must [authorize your DevOps service to use the DevOps API](/docs/central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis)
* Verify the @axway/axway-central-cli version is at minimum 0.1.3.

## Objectives

Learn how to create and manage your distributed cloud and on-premise environments using the Axway Central CLI. This includes the representation of connected Axway Agent environments (Amplify API Management V7 and AWS).

* Create a new environment
* Retrieve a list of all available environments
* Retrieve details for a specific environment
* Update a specific environment
* Delete a specific environment

## Create an environment

An environment represents a logical grouping of API services within a user or customer defined context.

The following are examples of how a DevOps user can run CLI commands to create an environment representation.

Create an environment by providing the environment name:

 ```
 axway central create env <name>
 ```

Create an environment by providing the environment name and the output in JSON format. (Use `-o yaml` to display the output in YAML format):

 ```
 axway central create env <name> -o json
 ```

Create an environment by providing the path to a valid .yaml, .yml, or .json file that defines a specific resource:

 ```
 axway central create -f <filepath>
 ```

Create an environment by providing the environment name (`env3`) and a path to a valid .yaml, .yml, or .json file that defines a specific resource:

```
axway central create environment env3 -f <filepath>
```

Optional flags:

```
-o, --output = yaml | json
-f, --file = (filename.yml, filename.yaml, filename.json)
```

Try out the [create_environments.json](https://axway-open-docs.netlify.app/samples/central/create_environments.json) or [create_environments.yaml](https://axway-open-docs.netlify.app/samples/central/create_environments.yaml) samples to create an environment.

## Retrieve a list of all available environments

The following example shows how to get a list of all environments (names, ages, and titles) for my tenant/organization:

```
axway central get environments
```

To get a list of all environments details displayed in JSON format. (Use `-o yaml` to display the output in YAML format):

```
axway central get envs -o json
```

## Retrieve details for a specific environment

The following example shows how to get details (name, age, and title) on a specific environment by providing the environment name:

```
axway central get environment <name>
```

To get details on a specific environment displayed in JSON format. (Use `-o yaml` to display the output in YAML format):

```
axway central get env <name> -o json
```

## Update a specific environment

The following example shows how to edit the details of a specific environment by providing the environment name:

```
axway central edit environment <name>
```

To edit the details of a specific environment, displayed in YAML format in the editor, run:

```
axway central edit env <name> -o yaml
```

## Delete a specific environment

This action will delete all API services and resources in the environment specified. The CLI command can take a few seconds to finish depending on the number of resources represented in the environment.

{{% alert title="Warning" color="warning"%}}This action cannot be reversed.{{% /alert %}}

To delete all resources in an environment:

```
axway central delete env <name>
```

Use `--wait` to delete resources from an environment while waiting for resource deletion confirmation. The `--wait` option will check for resource deletion for up to 10 seconds.

```
axway central delete env <name> --wait
```

## Review

You have learned how to use the Axway Central CLI to build and manage your environments.
