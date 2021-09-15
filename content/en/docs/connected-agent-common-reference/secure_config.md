---
title: Use secure credentials in configuration
linkTitle: Use secure credentials in configuration
draft: false
weight: 20
description: Understand how to secure credentials in the agent configuration by referencing data keys within the secret resource in Central. 
---
## Before You Start

* [Install and authenticate yourself via the Axway Central CLI](/docs/cli_central/cli_install/).
* Familiarize yourself with the [most commonly used Axway Central CLI commands](/docs/cli_central/cli_command_reference/).

## Objectives

Learn how to secure credentials in the agent configuration by referencing data keys within secret resource created in Central.

While the agent configuration allows setting up credential-based configuration as environment variables with clear text, it doesn't provide the necessary security.

## Creating secret resource in Central

* Create a yaml file with a resource definition for secret in environment scope:

```yml
group: management
apiVersion: v1alpha1
kind: Secret
name: example-azure-secret
title: Example secret for Azure
metadata:
  scope:
    kind: Environment
    name: example-azure-environment
attributes:
  someAttrKey: attrValue
tags:
  - sample
spec:
  data: 
    accessKeyName : AzureShareAcceccKey
    accessKeyValue: ww0********=
```

* Create the secret resource using AXWAY Central CLI:

```shell
axway central create -f ./secret.yaml
```

## Referencing the secret in the agent configuration

The agents' configurations support referencing data keys in secret resource for their values in all string-based configuration properties. When referencing secret, the configuration property value must begin with `@Secret.`, followed by a dot-separated name of the secret resource and the data key name:

```shell
...
AZURE_SHAREDACCESSKEYNAME=@Secret.example-azure-secret.accessKeyName
AZURE_SHAREDACCESSKEYVALUE=@Secret.example-azure-secret.accessKeyValue
...
```

By specifying the prefix `@Secret.`, the agent configuration parser must resolve the value of the configuration property using the specified secret resource and data key. While resolving the value, if the configuration parser successfully resolves the referenced secret, then the value of the secret data key is set as the configuration property value. Otherwise, the agent logs the error in resolving the secret and the configuration property value is set as empty string.
