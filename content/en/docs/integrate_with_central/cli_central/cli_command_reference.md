---
title: Axway Central CLI Command reference
linkTitle: CLI commands reference
weight: 130
date: 2021-01-13T00:00:00.000Z
---

Update page to use the CLI and return the i18 information and its constraint to help wih translation

Use Axway Central CLI basic commands for creating, fetching, updating, and deleting various Axway API Server assets. Each command is followed by a brief description, an explanation of the proper command syntax, including command arguments and options, along with example syntax for various use cases.

### The accessibility of resources

Resources can be *scoped* or *unscoped*.

The scope refers to the lifetime and accessibility of a resource. Unscoped resource are top-level resources which act as groups. Scoped resource are grouped under unscoped resources. For example, an API service resource is scoped to a corresponding environment resource. When that environment is deleted, the scoped API service resource (as well as any other scoped resource belonging to it) will also be deleted. Versus deleting the API service resource, which will only delete that one resource.

If the desired resource type is scoped, you must specify the scope name by providing the `-s, --scope <name>` flag.

You can search for more than one resource if you use comma-separated resources in a command. The search for multiple resources will display multiple result tables, one result table for each resource you fetch.

To see the list of all available resources from Enterprise Marketplace, including information about whether those resources are scoped or unscoped, run:

```bash
axway central get
```

## get

This command lists one or more resources. It also prints a table of the most important information about an specified resource.

The following table describes the usage, options, and arguments for the `get` command:

|Usage                                                          |                             |
|---                                                            |---                                   |
|`axway central get [options] [<args...>]`                    |                                    |
|`axway central get <Resource>`                               |Get a list of the resources          |
|`axway central get <Resource1>,<Resource2>,...,<ResourceN>`  |Get a list of multiple resources  |
|`axway central get <Resource> <Name> -s/--scope <Scope Name>`|Get a specific resource by name |
|**Options**                                                    |                 |
|`--account=<value>`                                            |Override default account. To be used when multiple accounts are currently logged in via [axway auth login](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html#login).<br/>Ex: `--account=amplify-cli:johndoe@domain.com`<br/>*(Added: v2.4.0)*|
|`--attribute <key=value>`                                      |Attribute in key=value pair format to filter by. Exact match.<br/>*(Added: v1.28.0)*|
|`--client-id=<value>`                                          |Override your DevOps account's client ID.<br/>*(Removed: v2.4.0)*|
|`--no-cache`                                                   |Refresh system definition cache.<br/>*(Added: v1.8.0)*|
|`--no-owner`                                                   |Display results that have no team owner.<br/>*(Added: v2.10.0)|
|`--language=<value>`                                           |Get the language translation requested along with the resource.<br/>*(Added: v3.2.0)*|
|`--languageDefinition=<value>`                                 |Get the language translation requested.<br/>*(Added: v3.4.0)*|
|`-o,--output=<value>`                                          |Additional output formats, YAML or JSON  |
|`-q,--query "<RSQL-formatted query>"`                          |RSQL-formatted query to search for filters that match specific parameters.<br/>*(Added: v1.23.0)*|
|`--region=<value>`                                             |Override region configuration. Set to `US`, `EU` or `AP`.|
|`-s,--scope=<name>`                                            |Scope name for scoped resources.<br/>*(Added: v1.17.0)*|
|`--tag <tag>`                                                  |Tag of resource(s) to fetch. Exact match.<br/>*(Added: v1.28.0)*|
|`--team <name`\|`guid>`                                        |Filter results by owner using team name or team guid. Overrides `--no-owner`.<br/>*(Added: v2.6.0)*|
|`--title <title of resource>`                                  |Title of resource(s) to fetch. Includes partial match.<br/>*(Added: v1.28.0)*|
|**Arguments**                                                  |                   |
|args...                                                        |Command arguments, run `axway central get` to see the examples |

### Fetching, Filtering and Querying

You can fetch resources by either Resource, Short Name, or the specific Resource Name.

You can "simple filter" resources by title, tag, and attribute (see examples below). These simple filters can be used independently or in combination (i.e., you can filter by title AND tag AND attribute). However, they only support -singular- filters; you can only filter by *one* tag, *one* title, or *one* attribute at a time.

For more complex filtering and fetching (e.g., filtering by *multiple* tags, titles, attributes, and other filters), you can also query for resources that match [RSQL-formatted](https://github.com/jirutka/rsql-parser#grammar-and-semantic) query parameters you pass in. See the linked documentation for an example of RSQL query syntax, and the "get examples" below for sample usage.

{{< alert title="Note" color="primary" >}}Using the --query flag will override any --title, --tag or --attribute flags you use.{{< /alert >}}

The following examples show how to use the `get` command:

```bash
# To get all environments:
axway central get envs

# To get all environments in YAML format:
axway central get environments -o yaml

# To get environment by resource, or common name (for example, 'myenv') in JSON format:
axway central get env myenv -o json

# To get all webhooks:
axway central get webhooks

# To get all webhooks by short name:
axway central get webh

# To get all webhooks and API services by short name:
axway central get webh, apis

# To get all environments and API services:
axway central get envs, apisvc

# To get an environment and an API service, which matches a resource in a specified scope in JSON format. In the following example, 'env1' is scope, and it is required after the `-s` flag):
axway central get env,apisvc commonname -s env1 -o json

# To get apiservice with name "testsvc" in the scope "Environment" with name "testenv"
axway central get apisvc testsvc -s Environment/testenv
```

The following example shows how to use the get command to fetch the internationalization information for a resource using the --language argument:

```bash
# To get a product with name "test-product" with all the available language translations in JSON format
axway central get products test-product --language="*" -o json
```

The sample output for the 'get' command with '--language="*"' argument is as follows:

```json
{
    "group": "catalog",
    "apiVersion": "v1alpha1",
    "kind": "Product",
    "name": "test-product",
    "title": "test-product",
    "metadata": {
        "id": "8a2e8aaa9126f35801912dd66cbe4517",
        "acl": [],
        "accessRights": {
            "canChangeOwner": true,
            "canDelete": true,
            "canWrite": true,
            "canRead": true
        },
        "resourceVersion": "3",
        "references": [
            {
                "id": "8a2e89ce9126f24c01912dd66fe746c6",
                "kind": "ProductRelease",
                "name": "test-product-1.0.0",
                "selfLink": "/catalog/v1/productreleases/test-product-1.0.0",
                "type": "soft",
                "group": "catalog"
            },
            {
                "id": "8a2e83f29127009001912dd66f1a63b7",
                "kind": "ReleaseTag",
                "name": "test-product",
                "scopeKind": "Product",
                "scopeName": "test-product",
                "selfLink": "/catalog/v1alpha1/products/test-product/releasetags/test-product",
                "type": "soft",
                "group": "catalog"
            }
        ],
        "selfLink": "/catalog/v1alpha1/products/test-product"
    },
    "attributes": {},
    "finalizers": [],
    "tags": [],
    "spec": {
        "assets": [],
        "categories": []
    },
    "latestrelease": {
        "name": "test-product-1.0.0",
        "tagName": "test-product/test-product",
        "version": "1.0.0"
    },
    "references": {
        "assets": [],
        "marketplaces": []
    },
    "state": "active",
    "languages": {
        "resource": {
            "code": "fr-fr"
        },
        "metadata": {
            "additional": [
                {
                    "code": "en-us",
                    "status": "complete"
                },
                {
                    "code": "de-de",
                    "status": "complete"
                }
            ]
        }
    },
    "languages-en-us": {
        "metadata": {
            "code": "en-us",
            "status": "complete"
        },
        "values": [
            {
                "path": "/title",
                "value": "This is the product title",
                "status": "complete"
            }
        ]
    },
    "languages-de-de": {
        "metadata": {
            "code": "de-de",
            "status": "complete"
        },
        "values": [
            {
                "path": "/title",
                "value": "La souscription demande un identifiant de département",
                "status": "complete"
            }
        ]
    }
}

```

```bash
# To get a product with name "test-product" with French language translation if available in YAML format
axway central get products test-product --language="fr-fr" -o yaml

# To get a product with name "test-product" with German language translation if available in YAML format
axway central get products test-product --language="de-de" -o yaml

# To get a product with name "test-product" with US English language translation if available in YAML format
axway central get products test-product --language="en-us" -o yaml

# To get a product with name "test-product" with Portugal language translation if available in YAML format
axway central get products test-product --language="pt-br" -o yaml
```

The following example shows how to use the get command to fetch just the internationalization information to facilitate a translation using the --languageDefinition argument:

```bash
# To get a stage with name "demo-stage" with the French language translation in JSON format
axway central get stages demo-stage --languageDefinition="fr-fr" -o json
```

The sample output for the 'get' command with '--languageDefinition="fr-fr"' argument is as follows:

```json
{
    "group": "catalog",
    "apiVersion": "v1alpha1",
    "kind": "Stage",
    "name": "demo-test",
    "metadata": {
        "id": "8a2e834391fb249101920c6a860d07e1",
        "resourceVersion": "1",
        "selfLink": "/catalog/v1alpha1/stages/demo-test"
    },
    "languages": {
        "resource": {
            "code": "en-us"
        }
    },
    "languages-fr-fr": {
        "values": [
            {
                "path": "/title",
                "value": "Qualification",
                "status": "complete",
                "_embedded": {
                    "resource": {
                        "schema": {
                            "type": "string",
                            "maxLength": 350,
                            "description": "The resource title."
                        },
                        "value": "Test/QA stage"
                    }
                }
            },
            {
                "path": "/spec/description",
                "value": "Regroupe les assets disponibles en Test",
                "status": "complete",
                "_embedded": {
                    "resource": {
                        "schema": {
                            "type": "string",
                            "description": "description of the stage",
                            "maxLength": 350
                        },
                        "value": "Groups Assets available in QA"
                    }
                }
            }
        ]
    }
}
```

```bash
# To get a stage with name "demo-stage" with the US English language translation in JSON format
axway central get stages demo-stage --languageDefinition="en-us" -o json

# To get a stage with name "demo-stage" with the German language translation in JSON format
axway central get stages demo-stage --languageDefinition="de-de" -o json

# To get a stage with name "demo-stage" with the Portugese language translation in JSON format
axway central get stages demo-stage --languageDefinition="pt-br" -o json
```

The following examples show how to use the get command with RSQL queries using the -q flag:

```bash
# To get assets with titles that start with "a"
axway central get assets -q "title==a*"

# To get assets with titles that start with a or i
axway central get assets -q "title==a* or title==i*"

# To get assets with tags that match tag1 or tag2
axway central get assets -q "tags=in=(tag1,tag2)"

# To get assets with logical names that start with 'i'
axway central get assets -q "name==i*"

# To get assets whose logical names start with 'a' OR 'i'
axway central get assets -q "name==a* or name==i*"

# To get assets whose logical names start with 'i' AND are tagged with 'test123'
axway central get assets -q "name=='i*';tags==test123"

# To get assets whose logical names start with 'i' or 'a' AND are tagged with 'test' or 'prod'
axway central get assets -q "name=='i*' or name=='a*';tags=in=(test,prod)"
```

The following examples show how to use the get command with simple filters:

```bash
# To get assets and filter the list to assets that have a specific title "test123"
axway central get assets --title test123

# To get assets and filter the list to assets that have a specific tag "tag1"
axway central get assets --tag tag1

# To get assets and filter the list to assets that have a specific attribute "location=arizona"
axway central get assets --attribute location=arizona

# To get assets and filter the list with a combination of title, tag and attribute filters
axway central get assets --title test123 --tag tag1 --attribute location=arizona

# To get environments owned by a specific team
axway central get env --team <name|guid>

# To get API services owned by a specific team or implicitly owned by the environments owning team
axway central get apis --team <name|guid>

# To get API services that are not owned by a team
axway central get apis --no-owner
```

## create

Use this command to create one or more resources from a YAML or JSON file, or `Stdin`.

The following table describes the usage, options, and arguments for the `create` command:

|Usage                                                    |                             |
|---                                                      |---                                   |
|`axway central create <command> [options]`             |                                    |
|`axway central create -f <path_to_file>`               |Create multiple resources from a file|
|`axway central create environment [options] <name>`    |Create an environment with the specified name. Only environments are currently available for this command|
|`axway central create agent-resource`                 |Create the mandatory information for connecting agents to Amplify environment|
|**Commands**                                             |          |
|`environment`                                            |Create an environment with the specified name  |
|`service-account`                                        |Create a service account<br />*(Removed in v2.5.0. Use [axway service-account](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/service_accounts/index.html) command instead.)* |
|`agent-resource`                                        |Create the mandatory information for connecting agents to Amplify environment|
|**Options**                                              |                   |
|`--account=<value>`                                      |Override default account. To be used when multiple accounts are currently logged in via [axway auth login](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html#login).<br/>Ex: `--account=amplify-cli:johndoe@domain.com`<br/>*(Added: v2.4.0)*|
|`--client-id=<value>`                                    |Override your DevOps account's client ID.<br/>*(Removed: v2.4.0)*|
|`-f,--file=<path>`                                       |Filename to use to create the resource  |
|`--no-cache`                                             |Do not use cache when communicating with the server.<br/>*(Added: v1.8.0)*|
|`-o,--output=<value>`                                    |Additional output formats, YAML or JSON|
|`--region=<value>`                                       |Override region configuration. Set to `US`, `EU` or `AP`.|
|`-y,--yes`                                               |Automatically reply `yes` to any command prompts.<br/>*(Added: v2.3.0)*|
|**Arguments**                                            |                   |
|`name`                                                   |Name of the new environment |

The following examples show how to use the `create` command:

```bash
# create new environment with "newenv" name
axway central create env newenv

# create new environment with "newenv" name and output result in YAML
axway central create environment newenv -o yaml

# create multiple resources from file
axway central create -f ./some/folder/resources.yaml

# create agent resources
axway central create agent-resource
```

## apply

The `apply` command updates resources from a file. The resource name must be specified in the file. The resource will be created if it does not exist yet.

The following table describes the usage and options for the `apply` command:

|Usage                                                    |                             |
|---                                                      |---                                   |
|`axway central apply [options]`             |                                    |
|**Options**                                              |                   |
|`--account=<value>`                                      |Override default account. To be used when multiple accounts are currently logged in via [axway auth login](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html#login).<br/>Ex: `--account=amplify-cli:johndoe@domain.com`<br/>*(Added: v2.4.0)*|
|`--client-id=<value>`                                    |Override your DevOps account's client ID.<br/>*(Removed: v2.4.0)*|
|`-f,--file=<path>`                                       |Filename to use to create the resource  |
|`--no-cache`                                             |Do not use cache when communicating with the server.<br/>*(Added: v1.8.0)*|
|`--language=<value>`                                     |Apply the language translation requested.<br/>*(Added: v3.4.0)*|
|`-o,--output=<value>`                                    |Additional output formats, YAML or JSON|
|`--region=<value>`                                       |Override region configuration. Set to `US`, `EU` or `AP`.|
|`-y,--yes`                                               |Automatically reply `yes` to any command prompts.<br/>*(Added: v2.3.0)*|

The following examples show how to use the `apply` command:

```bash
# create multiple resources from file
axway central apply -f ./some/folder/resources.yaml

# create multiple resources from file and output results in YAML format
axway central apply -f ./some/folder/resources.json -o yaml
```

The following examples show how to use the `apply` command to apply just the language translation requested using '--language' argument :

```bash
# apply french language translation to the resource from file if the translation exists
axway central apply -f ./some/folder/lang-resources.json --language="fr-fr"

# apply german and portugese translation to the resource from file if the translations eixts and output results in YAML format
axway central apply -f ./some/folder/lang-resources.json --language="de-de,pt-br,en-us" -o yaml
```

The 'lang-resources.json' file contents are as follows :

```json
{
    "group": "catalog",
    "apiVersion": "v1alpha1",
    "kind": "Stage",
    "name": "demo-stage",
    "metadata": {
        "id": "8a2e834391fb249101920c6a860d07e1",
        "resourceVersion": "1",
        "selfLink": "/catalog/v1alpha1/stages/demo-test"
    },
    "languages": {
        "resource": {
            "code": "en-us"
        }
    },
    "languages-de-de": {
        "values": [
            {
                "path": "/title",
                "value": "Qualification Edited.....",
                "status": "complete",
                "_embedded": {
                    "resource": {
                        "schema": {
                            "type": "string",
                            "maxLength": 350,
                            "description": "The resource title."
                        },
                        "value": "Test/QA stage"
                    }
                }
            },
            {
                "path": "/spec/description",
                "value": "Regroupe les assets disponibles en Test",
                "status": "complete",
                "_embedded": {
                    "resource": {
                        "schema": {
                            "type": "string",
                            "description": "description of the stage",
                            "maxLength": 350
                        },
                        "value": "Groups Assets available in QA"
                    }
                }
            }
        ]
    },
    "languages-pt-br": {
        "values": [
            {
                "path": "/title",
                "value": "Qualification",
                "status": "complete",
                "_embedded": {
                    "resource": {
                        "schema": {
                            "type": "string",
                            "maxLength": 350,
                            "description": "The resource title."
                        },
                        "value": "Test/QA stage"
                    }
                }
            },
            {
                "path": "/spec/description",
                "value": "Regroupe les assets disponibles en Test",
                "status": "complete",
                "_embedded": {
                    "resource": {
                        "schema": {
                            "type": "string",
                            "description": "description of the stage",
                            "maxLength": 350
                        },
                        "value": "Groups Assets available in QA"
                    }
                }
            }
        ]
    }
}
```


## delete

Delete resources by type name or file name. When deleting a single resource by its name, if the desired resource type is scoped, you must specify the scope name by adding the `-s, --scope <name>` flag.

The following table describes the usage, options, and arguments for the `delete` command:

|Usage                                                    |                             |
|---                                                      |---                                   |
|`axway central delete [options] [<args...>]`             |                                    |
|**Options**                                              |                   |
|`--account=<value>`                                      |Override default account. To be used when multiple accounts are currently logged in via [axway auth login](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html#login).<br/>Ex: `--account=amplify-cli:johndoe@domain.com`<br/>*(Added: v2.4.0)*|
|`--client-id=<value>`                                    |Override your DevOps account's client ID.<br/>*(Removed: v2.4.0)*|
|`-f,--file=<path>`                                       |Filename to use to delete the resource   |
|`--no-cache`                                             |Do not use cache when communicating with the server.<br/>*(Added: v1.8.0)*|
|`--region=<value>`                                       |Override region configuration. Set to `US`, `EU` or `AP`.|
|`-s,--scope=<name>`                                      |Scope name for scoped resources.<br/>*(Added: v1.17.0)*|
|`--wait`                                                 |Wait for the resources to be completely deleted          |
|`-y,--yes`                                               |Automatically reply `yes` to any command prompts.<br/>*(Added: v1.17.0)*|
|**Arguments**                                            |                   |
|`args...`                                                |Command arguments, run `axway central delete` to see the examples |

The following examples show how to use the `delete` command:

```bash
# delete environment by name
axway central delete environment newenv

# delete API service by name (a scoped resource)
axway central delete apisvc someapisvc -s newenv

# delete all resources specified in the file
axway central delete -f ./some/folder/resources.yaml
```

## edit

Edit and update resources by using the default editor.

The following table describes the usage, options, and arguments for the `edit` command:

|Usage                                                    |                             |
|---                                                      |---                                   |
|`axway central edit <command> [options]`             |                                    |
|`axway central edit environment [options] <name>`      |`environment` - Edit an environment with the specified name.     |
|**Options**                                              |                   |
|`--account=<value>`                                      |Override default account. To be used when multiple accounts are currently logged in via [axway auth login](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html#login).<br/>Ex: `--account=amplify-cli:johndoe@domain.com`<br/>*(Added: v2.4.0)*|
|`--client-id=<value>`                                    |Override your DevOps account's client ID.<br/>*(Removed: v2.4.0)*|
|`--no-cache`                                             |Do not use cache when communicating with the server.<br/>*(Added: v1.8.0)*|
|`-o,--output=<value>`                                       |Additional output formats, YAML or JSON |
|`--region=<value>`                                       |Override region configuration. Set to `US`, `EU` or `AP`.|
|**Arguments**                                            |                   |
|`name`                                                  |Name of the environment |

The following example shows how to use the `edit` command:

```bash
# edit environment by name
axway central edit environment newenv
```

## install

Install additional platform resources.

The following table describes the usage, options, and arguments for the `edit` command:

|Usage                                                    |                             |
|---                                                      |---                                   |
|`axway central install <command> [options] [<args...>]`             |                                    |
|`axway central install agents [options]`             |`agents` - Install API Gateway v7, Amazon API Gateway, Azure API Gateway, Kubernetes agents|
|**Options**                                              |                   |
|`--account=<value>`                                      |Override default account. To be used when multiple accounts are currently logged in via [axway auth login](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html#login).<br/>Ex: `--account=amplify-cli:johndoe@domain.com`<br/>*(Added: v2.4.0)*|
|`--client-id=<value>`                                    |Override your DevOps account's client ID.<br/>*(Removed: v2.4.0)*|
|`--no-cache`                                             |Do not use cache when communicating with the server.<br/>*(Added: v1.8.0)*|
|`--region=<value>`                                       |Override region configuration. Set to `US`, `EU` or `AP`.|
|**Arguments**                                            |                   |
|`args...`                                                  |Command arguments, run `axway central install` to see the examples |

The following example shows how to use the `install` command:

```bash
# install agent configuration in interactive mode
axway central install agents
```
