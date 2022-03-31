---
title: Create and publish other resource types to the Unified Catalog
linkTitle: Create and publish other resource types to the Unified Catalog
weight: 110
date: 2020-06-10T00:00:00.000Z
description: Learn how your DevOps process can use the Axway Central CLI to create other resource types, which are used by your API service, and publish the API service to the Unified Catalog. You can use the scripting of CLI commands to automate the process to create multiple resource types in your environment.
---

After an [API Service representation](/docs/integrate_with_central/cli_central/cli_apiservices/#create-an-api-service-in-your-environment) is created, you can create additional information (resources) related to the API Service. This includes multiple versions of the API, endpoints, secrets, webhooks, subscription definitions, and a Catalog item.

## Before you start

* You will need to [authorize your DevOps service to use the DevOps API](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-devops-service-to-use-the-amplify-central-devops-apis)
* Verify the @axway/amplify-central-cli version is at minimum 0.1.3.
* You have already learned how to [create a representation of an environment and API Service using the Axway Central CLI](/docs/integrate_with_central/cli_central/cli_apiservices/).

## Objectives

Learn how to publish your API service to Unified Catalog using the Axway Central CLI. Also learn how to create other resource types, which can be used by your API Service, and how to publish SDK docs to the Unified Catalog. All resources types (API service revision, endpoint URL, and so on) are scoped to an environment.

* Create a version of an API service.
* Create an endpoint for an API service version.
* Create a secret.
* Create a webhook.
* Create a Subscription definition.
* Publish a Catalog item for an API service.
* Create and publish a Catalog item combining different resources.
* Create and publish a Catalog item for SDK documentation.

## Create a version of an API service

An API service version represents a version of an API. It comprises of the interface (contract), implementation, and instance of the API. An API can have multiple versions. A client can call different versions of an API to realize different behaviors.

The following is an example of how to create an API service version for `apisvc1` by providing a path to a valid .yaml, .yml, or .json file that defines a specific resource  (APIServiceRevision in the Amplify data model):

```bash
axway central create -f <filepath>
```

Additional versions are created each time you perform the `create` command with the new version of resource defined.

Try out this procedure using the [apirevisions1.json](/samples/central/apirevisions1.json) sample, and see how a DevOps user can use the Axway Central CLI to create a version (`apisvcrev1`) of an API Service (`apisvc1`) in an environment (`env1`).

In the `apirevisions1.json` file, the API definition of the Musical Instruments API is encoded as Base64 with the `"spec" : "definition" : "value"`. For the decoded JSON format of the OAS2 (Swagger) specification for Musical Instruments, see [apirevisions1_decode.json](/samples/central/apirevisions1_decode.json).

To get a list, displayed in a table format (name, age, title), of all the API service versions for the scope of `env1`, run this command:

```bash
axway central get apisvcrev -s env1
```

To get all the API service versions for the scope of `env1` displayed in YAML format, run this command. (Use `-o json` for JSON format):

```bash
axway central get apisvcrev -s env1 -o yaml
```

You can modify the `apirevisions1.json` file to make changes to the API service version, for example:

```bash
axway central apply -f <filepath>  # Update the API Service version using a JSON or YAML file
```

You can delete a specific API service version or multiple versions in an environment, for example:

```bash
axway central delete -f <filepath>   # Delete an API service version using a JSON or YAML file
```

Use the `--scope` option to delete an API service version within an environment (The additional `--wait` option is recommended for delete operations).

```bash
axway central delete apisvcrev apisvcrev1 --scope env1 --wait   # Delete API Service version named apisvcrev1 within the scope of environment env1
```

## Create an endpoint for an API service version

An endpoint (Service Instance in the Amplify data model) represents where an API version is deployed. This endpoint is consumable by target users, and typically represented as a URL with a port number.

The following is an example of how to create an endpoint for `apisvcrev1` of `apisvc1` by providing a path to a valid .yaml, .yml, or .json file that defines a specific resource (endpoint):

```bash
axway central create -f <filepath>
```

Try out this procedure using the [apiendpoint.json](/samples/central/apiendpoint.json) sample, and see how to create an endpoint for a version (`apisvcrev1`) of an API service (`apisvc1`) in an environment (`env1`).

To view the API service endpoint (API service instance) created in the environment `env1`, run this command:

```bash
axway central get apisvcinst -s env1            # Get a list displayed in a table format (name, age, title) of all the API Service endpoints for the scope of env1
axway central get apisvcinst -s env1 -o yaml    # Get all the API Service endpoints for the scope of env1 displayed in YAML format (use -o json for JSON format)
```

To modify the `apiendpoint.json` file to make changes to the API service endpoint, run this command:

```bash
axway central apply -f <filepath>  # Update the API Service endpoint using a JSON or YAML file
```

To delete a specific API service endpoint or multiple endpoints in an environment, run this command:

```bash
axway central delete -f <filepath>   # Delete an API service endpoint using a JSON or YAML file
```

Use the `--scope` option to delete an API service endpoint within an environment (The additional `--wait` option is recommended for delete operations).

```bash
axway central delete apisvcinst apisvcinst1 --scope env1 --wait   ## Delete API Service endpoint named apisvcinst1 within the scope of environment env1
```

## Create a secret

A secret is a key value pair associated with a webhook to secure your API services. By setting a webhook secret, you ensure that API requests sent to the webhook are coming from Axway.

The following is an example of how to create a secret for an environment by providing a path to a valid .yaml, .yml, or .json file that defines a specific resource (Secret in the Amplify data model).

```bash
axway central create -f <filepath>
```

Try out this procedure using the [apisecret.json](/samples/central/apisecret.json) sample, and see how a DevOps user can use the Axway Central CLI to create a secret in an environment (`env1`).

To view the secret created in the environment `env1`, run this command:

```bash
axway central get secret -s env1            # Get a list displayed in a table format (name, age, title) of all the Secrets for the scope of env1
axway central get secret -s env1 -o yaml    # Get all the Secrets for the scope of env1 displayed in YAML format (use -o json for JSON format)
```

To modify the `apisecret.json` file to make changes to the secret, run this command:

```bash
axway central apply -f <filepath>   # Update the Secret using a JSON or YAML file
```

To delete a specific secret or multiple secrets in an environment, run this command:

```bash
axway central delete -f <filepath>   # Delete a secret using a JSON or YAML file
```

Use the `--scope` option to delete a secret within an environment (The additional `--wait` option is recommended for delete operations).

```bash
axway central delete secret secret1 --scope env1 --wait   ## Delete secret named secret1 within the scope of environment env1
```

## Create a webhook

A webhook defines a webhook URL to communicate events (for example, subscription or registration changes) back to an API Service. In Amplify Central and Unified Catalog, a webhook can be used in a custom subscription or registration process. A webhook is a combination of a URL and any custom parameters (for example, a secret) needed to subscribe and register to  your API Service.

The following is an example of how to create a webhook for an environment by providing a path to a valid .yaml, .yml, or .json file that defines a specific resource (Webhook in the Amplify data model).

```bash
axway central create -f <filepath>
```

Try out this procedure using the [apiwebhook.json](/samples/central/apiwebhook.json) sample, and see how a DevOps user can use the Axway Central CLI to create a Webhook in an environment (`env1`).

To get a list, in a table format (name, age, title), of all the Webhooks for the scope of `env1`, run this command:

```bash
axway central get webhook -s env1
```

To get all the Webhooks for the scope of `env1` in YAML format, , run this command. (Use `-o json` for JSON format):

```bash
axway central get webhook -s env1 -o yaml
```

To modify the `apiwebhook.json` file to make changes to the Webhook, run this command:

```bash
axway central apply -f <filepath>    # Update the webhook using a JSON or YAML file
```

To delete a specific webhook or multiple webhooks in an environment, run this command:

```bash
axway central delete -f <filepath>   # Delete a webhook using a JSON or YAML file
```

Use the `--scope` option to delete a webhook within an environment (The additional `--wait` option is recommended for delete operations).

```bash
axway central delete webhook webhook1 --scope env1 --wait   ## Delete webhook named webhook1 within the scope of environment env1
```

## Create a subscription definition

A subscription definition allows the configuration of the data needed from a consumer to subscribe or register to an API service in the Unified Catalog.  In Amplify Central and Unified Catalog, a subscription definition has a reference to a webhook that will be invoked on a subscription or registration event. The subscription definition is referenced in the Catalog item (ConsumerInstance resource in the Amplify data model).

The following is an example of how to create a subscription definition for an environment by providing a path to a valid .yaml, .yml, or .json file that defines a specific resource (ConsumerSubscriptionDefinition).

```bash
axway central create -f <filepath>
```

Try out this procedure using the [apisubscription.json](/samples/central/apisubscription.json) sample, and see how a DevOps user can use the Axway Central CLI to create a subscription definition in an environment (`env1`).

To view the subscription created in the environment `env1`, run this command:

To get a list, in a table format (name, age, title), of all the Subscriptions for the scope of `env1`, run this command:

```bash
axway central get consumersubscriptiondef -s env1
```

To get all the Subscriptions for the scope of `env1` in YAML format, run this command. (Use `-o json` for JSON format):

```bash
axway central get consumersubscriptiondef -s env1 -o yaml
```

To modify the `apisubscription.json` file to make changes to the subscription definition, run this command:

```bash
axway central apply -f <filepath>    # Update the Subscription using a JSON or YAML file
```

To delete a specific subscription definition or multiple subscription definitions in an environment, run this command:

```bash
axway central delete -f <filepath>   # Delete a subscription definition using a JSON or YAML file
```

Use the `--scope` option to delete a subscription definition within an environment (The additional `--wait` option is recommended for delete operations).

```bash
axway central delete consumersubscriptiondef consumersubdef1 --scope env1 --wait   ## Delete subscriptiondefintion named consumersubdef1 within the scope of environment env1
```

## Publish a Catalog item for an API service

The Catalog item is a reference to an API service endpoint, and it contains all the details for creating the Catalog item in the Unified Catalog. These details include a reference to the subscription definition created in the previous section (Create a subscription definition) and a link to the webhook.   The webhook is invoked for each subscription update event generated from Unified Catalog.  Before creating a Catalog item, both an endpoint and a subscription definition must exist.

The following is an example of how to create a Catalog item for an API service and publish it to the Unified Catalog by providing a path to a valid .yaml, .yml, or .json file that defines the specific resource:

```bash
axway central create -f <filepath>
```

Try out this procedure using the [apiconsumerinstance.json](/samples/central/apiconsumerinstance.json) sample, and see how a DevOps user can use the Axway Central CLI to create a Catalog item (ConsumerInstance in the Amplify data model) for an API service in an environment  `env1`, and publish it to the Unified Catalog.

On the `apiconsumerinstance.json` file:

* The spec `state` set to `PUBLISHED` means all roles including the Consumer role can see the Catalog item.
* The spec `state` set to `UNPUBLISHED` means the Consumer role cannot see the Catalog item (Only API Admins and API Developers can see the Catalog item).
* The spec `visibility` set to `RESTRICTED` means only the teams, which shared the Catalog item have access to the item.
* The spec `visibility` set to `PUBLIC` means all teams in the organization have access to the Catalog item.

To get a list, in a table format (name, age, title), of all the Catalog items for the scope of `env1`, run this command:

```bash
axway central get consumerinstance -s env1
```

To get all the Catalog items for the scope of `env1` in YAML format, run this command. (Use `-o json` for JSON format):

```bash
axway central get consumerinstance -s env1 -o yaml
```

To modify the `apiconsumerinstance.json` file to make changes to the Catalog item, run this command:

```bash
axway central apply -f <filepath>   # Update the Catalog Item using a JSON or YAML file
```

To delete a specific Catalog item or multiple Catalog items in an environment, run this command:

```bash
axway central delete -f <filepath>   # Delete a subscription definition using a JSON or YAML file
```

Use the `--scope` option to delete a Catalog item within an environment (The additional `--wait` option is recommended for delete operations).

```bash
axway central delete consumerinstance consumerinst1 --scope env1 --wait   ## Delete Catalog item named consumerinst1 within the scope of environment env1
```

## Create and publish a Catalog item combining different resources

You can create an API service within environment `env1` by providing a path to a valid .yaml, .yml, or .json file that defines a specific resource. In this case, only one API Service called `apisvc1` is created from the resource file and published to the Unified Catalog:

```bash
axway central create -f <filepath>
```

Try out this procedure using the [publishAPI.json](/samples/central/publishAPI.json) sample, which combines all of the previous configuration files into one JSON file.

The `publishAPI.json` file has the optional flags:

* `-o, --output` = yaml | json
* `-f, --file` = filename.yml, filename.yaml, filename.json

## Create a Catalog item for SDK documentation

You can use the Axway Central CLI to create a Catalog item (ConsumerInstance) for any type of unstructured data (for example, SDK documentation in a zip file, PDF file, and so on) in an environment, and publish it to the Unified Catalog.

You can create a Catalog item for SDK documentation in a zip file and publish it to the Unified Catalog by providing a path to a valid .yaml, .yml, or .json file that defines a specific resource (ConsumerInstance). No Endpoint (ServiceInstance) or subscription definition is required to exist before you create a Catalog item.

```bash
axway central create -f <filepath>
```

Try out this procedure using the [sdkconsumerinstance.json](/samples/central/sdkconsumerinstance.json) sample.

On the `sdkconsumerinstance.json` file:

* In the `"spec" : "unstructuredDataProperties" : "data"`, the zip file contents are encoded as Base64.
* The spec `state` set to `PUBLISHED` means all roles including the Consumer role can see the Catalog item.
* The spec `state` set to `UNPUBLISHED` means the Consumer role cannot see the Catalog item (Only API Admins and API Developers can see the Catalog item).
* The spec `visibility` set to `RESTRICTED` means only the teams, which shared the Catalog item have access to the item.
* The spec `visibility` set to `PUBLIC` means all teams in the organization have access to the Catalog item.

The following are some of the `"unstructuredDataProperties" : "contentTypes"` supported:

* application/zip
* application/json
* application/pdf
* application/rtf
* text/protobuf
* text/x-yaml
* text/xml
* text/plain
* txt/csv

## Review

You have learned how to publish your API Service to Unified Catalog using the Axway Central CLI. You have also learned how to create other resource types which can be used by your API service and how to publish SDK docs to the Unified Catalog.

## For Further information

* See [Amplify Unified Catalog](/docs/manage_unified_catalog/).
* See more examples of [Unified Catalog Integrations](https://github.com/Axway/unified-catalog-integrations).
