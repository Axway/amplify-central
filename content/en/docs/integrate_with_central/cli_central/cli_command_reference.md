---
title: Axway Central CLI Command reference
linkTitle: CLI commands reference
weight: 130
date: 2021-01-13T00:00:00.000Z
---

Use Axway Central CLI basic commands for creating, fetching, updating, and deleting various Axway API Server assets. Each command is followed by a brief description, an explanation of the proper command syntax, including command arguments and options, along with example syntax for various use cases.

## The accessibility of resources

Resources can be *scoped* or *unscoped*.

The scope refers to the lifetime and accessibility of a resource. Unscoped resource are top-level resources which act as groups. Scoped resource are grouped under unscoped resources. For example, an API service resource is scoped to a corresponding environment resource. When that environment is deleted, the scoped API service resource (as well as any other scoped resource belonging to it) will also be deleted. Versus deleting the API service resource, which will only delete that one resource.

If the desired resource type is scoped, you must specify the scope name by providing the `-s, --scope <name>` flag.

You can search for more than one resource if you use comma-separated resources in a command. The search for multiple resources will display multiple result tables, one result table for each resource you fetch.

To see the list of all available resources from Amplify Engage, including information about whether those resources are scoped or unscoped, run:

```bash
axway central get
```

## get

This command lists one or more resources. It also prints a table of the most important information about an specified resource.

If a resource is in the "Deleting" state, the entry in the table is displayed in the color *yellow* to warn the user that the resource is in the "Deleting" state. The user can fetch that particular resource using the `--output` argument to see if there are any finalizers set and can perform a force deletion operation using the `--forceDelete` argument, as mentioned in the [delete](#delete) section.

The following table describes the usage, options, and arguments for the `get` command:

|Usage                                                          |                             |
|---                                                            |---                                   |
|`axway central get [options] [<args...>]`                    |                                    |
|`axway central get <Resource>`                               |Get a list of the resources          |
|`axway central get <Resource1>,<Resource2>,...,<ResourceN>`  |Get a list of multiple resources  |
|`axway central get <Resource> <Name> -s/--scope <Scope Name>`|Get a specific resource by name |
|**Options**                                                    |                 |
|`--account=<value>`                                            |Override default account. To be used when multiple accounts are currently logged in via [axway auth login](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html#login) <br/>Ex: `--account=amplify-cli:johndoe@domain.com`<br/>*(Added: v2.4.0)*|
|`--attribute <key=value>`                                      |Attribute in key=value pair format to filter by. Exact match <br/>*(Added: v1.28.0)*|
|`--client-id=<value>`                                          |Override your DevOps account's client ID <br/>*(Removed: v2.4.0)*|
|`--no-cache`                                                   |Refresh system definition cache <br/>*(Added: v1.8.0)*|
|`--no-owner`                                                   |Display results that have no team owner <br/>*(Added: v2.10.0)*|
|`--language=<value>`                                           |Get the language translation requested along with the resource <br/>*(Added: v3.2.0)*|
|`--languageDefinition=<value>`                                 |Get the language translation requested <br/>*(Added: v3.4.0)*|
|`-o,--output=<value>`                                          |Additional output formats, YAML or JSON  |
|`-q,--query "<RSQL-formatted query>"`                          |RSQL-formatted query to search for filters that match specific parameters <br/>*(Added: v1.23.0)*|
|`--region=<value>`                                             |Override region configuration. Set to `US`, `EU` or `AP`|
|`-s,--scope=<name>`                                            |Scope name for scoped resources <br/>*(Added: v1.17.0)*|
|`--tag <tag>`                                                  |Tag of resource(s) to fetch. Exact match <br/>*(Added: v1.28.0)*|
|`--team <name`\|`guid>`                                        |Filter results by owner using team name or team guid. Overrides `--no-owner` <br/>*(Added: v2.6.0)*|
|`--title <title of resource>`                                  |Title of resource(s) to fetch. Includes partial match <br/>*(Added: v1.28.0)*|
|**Arguments**                                                  |                   |
|args...                                                        |Command arguments, run `axway central get` to see the examples |

### Fetching by Kind, Name, and Scope

You can fetch resources by their `kind`, such as "environments, "webhooks", etc.

Optionally, you can also fetch one specific resource by name.
You can also fetch a subset of scoped resources by their scope name via the `-s` flag.

By default, a summary of the resource information is shown in table form. Alternatively, you can use the `--output` or `-o` flag to output
all the resource's information in JSON or YAML form.

The following examples show how to use the `get` command:

```bash
# Get all environments.
axway central get envs

# Get all environments in YAML format.
axway central get environments -o yaml

# Get environment by resource, or common name (for example, 'myenv') in JSON format.
axway central get env myenv -o json

# Get all webhooks.
axway central get webhooks

# Get all webhooks by short name.
axway central get webh

# Get all webhooks and API services by short name.
axway central get webh, apis

# Get all environments and API services.
axway central get envs, apisvc

# Get an environment and an API service, which matches a resource in a specified scope in JSON format.
# In the following example, 'env1' is scope, and it is required after the `-s` flag).
axway central get env,apisvc commonname -s env1 -o json

# Get apiservice with name "testsvc" in the scope "Environment" with name "testenv".
axway central get apisvc testsvc -s Environment/testenv
```

The following example shows how to use the `get` command to fetch the internationalization information for a resource using the `--language` argument:

```bash
# Get a product with name "test-product" with all the available language translations in JSON format.
axway central get products test-product --language="*" -o json
```

The sample output for the `get` command with the `--language="*"` argument is as follows:

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

The following example shows how to use the `get` command to fetch just the internationalization information to facilitate a translation using the `--languageDefinition` argument:

```bash
# To get a stage with name "demo-stage" with the French language translation in JSON format
axway central get stages demo-stage --languageDefinition="fr-fr" -o json
```

The sample output for the `get` command with `--languageDefinition="fr-fr"` argument is as follows:

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

# To get a stage with name "demo-stage" with the Portuguese language translation in JSON format
axway central get stages demo-stage --languageDefinition="pt-br" -o json
```

### Simple query filters

You can use the `--title`, `--tag`, `--attribute`, and `--team` arguments to apply a simple filter. The arguments can be used independently or in combination. For example, you can filter by "title" AND "tag" AND "attribute" in the same query. However, these arguments only support -singular- filters. You can only filter by *one* tag, *one* title, or *one* attribute at a time.

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

### Complex query filters

For more complex filtering, you can query for resources that match an RSQL formatted expression following the "ISO/IEC 14977:1996" grammar using the `-q` flag.

{{< alert title="Note" color="primary" >}}The --query flag will override any --title, --tag or --attribute flags you use.{{< /alert >}}

The following are basic RSQL query examples:

```bash
# Get assets with titles that start with 'a' (case insensitive)
axway central get assets -q "title==a*"

# Get assets with titles that start with 'a' or 'i' (case insensitive)
axway central get assets -q "title==a* or title==i*"

# Get assets with tags that match 'tag1' or 'tag2' (case sensitive)
axway central get assets -q "tags=in=(tag1,tag2)"

# Get assets with names start with 'i' (case insensitive)
axway central get assets -q "name==i*"

# Get assets whose names start with 'a' OR 'i' (case insensitive)
axway central get assets -q "name==a* or name==i*"

# Get assets whose names start with 'i' AND are tagged with 'test123'
axway central get assets -q "name=='i*';tags==test123"

# Get assets whose names start with 'i' or 'a' (case insensitive) AND are tagged with 'test' or 'prod' (case sensitive)
# Note the usage of parenthesis to wrap the OR conditions.
axway central get assets -q "(name==i*,name==a*);tags=in=(test,prod)"
```

The following operators are supported in the RSQL expression.

|Comparison Operator |Description                            |
|---                 |---                                    |
|`==`                |Case insensitive equals. Supports wildcards '*' (multiple characters) and '_' (singular character) |
|`!=`                |Case insensitive not equals. Supports wildcards '*' and '_' |
|`===` or `=eq=`     |Case sensitive equals. Does not support wildcards; '*' and '_' will be treated literally |
|`!==` or `=neq=`    |Case sensitive not equals. Does not support wildcards |
|`<` or `=lt=`       |Less than |
|`<=` or `=le=`      |Less than or equal to |
|`>` or `=gt=`       |Greater than |
|`>=` or `=ge=`      |Greater than or equal to |
|`=in=`              |True if at least 1 of the given values match (case sensitive). Right side of expression must be surrounded by parenthesis. Ex: `tags=in=(foo,bar)` is equivalent to `tags===foo,tags===bar` |
|`=out=`             |True if none of the given values match (case sensitive). Right side of expression must be surrounded by parenthesis. Ex: `tags=out=(foo,bar)` is equivalent to `tags!==foo;tags!==bar` |
|`=with=`            |Applies multiple conditions on a property having multiple entries. Right side of expression must be surrounded by double quotes or single quotes. Ex: `metadata.references=with='name===foo;kind===APIService'` |
|`=without=`         |Applies an exclusion filter with multiple conditions on a property having multiple entries. If there is at least 1 match, then the resource is excluded. Right side of expression must be surrounded by double quotes or single quotes. Ex: `metadata.references=without='name===foo;kind===APIService'` |

|Logical Operator    |Description                            |
|---                 |---                                    |
|`and`               |The left and right conditions must both be true. Ex: `name==a* and tags===test` |
|`;`                 |Behaves the same as `and`. Ex: `name==a*;tags===test` |
|`or`                |Only 1 of the conditions on the left or right must be true. Ex: `tags===foo or tags===bar` |
|`,`                 |Behaves the same as `or`. Ex: `tags===foo,tags===bar` |

The following special properties are only available to RSQL query filters:

|Query Properties    |Description                            |
|---                 |---                                    |
|`scopedResources.kind` |Only applicable to unscoped resources. Checks if scope has at least 1 scoped resource of the given kind. Ex: `scopedResources.kind===APIService` |
|`scopedResources.metadata.id` |Only applicable to unscoped resources. Checks if scope has any scoped resources with the given ID |
|`scopedResources.metadata.references.id` |Only applicable to unscoped resources. Checks if scope has any scoped resources having a reference to the given resource ID |
|`scopeResource.*`   |Only applicable to scoped resources. Provides access to the unscoped resource's properties that the queried resource is scoped under. Ex: `scopeResource.tags===production` |
|`referencedByResources.kind` |Does a reverse reference lookup. Checks if at least 1 resource of the given kind references the queried resource. Ex: `referencedByResources.kind===Asset` |
|`referencedByResources.*` |Does a reverse reference lookup. Provides access to properties belonging to any resource that references the queried resource |

The below are practical examples using RSQL query expressions:

```bash
# Get products that have at least one release.
axway central get product -q "metadata.references.kind===ProductRelease"

# Get environments that have at least 1 API service.
axway central get env -q "scopedResources.kind===APIService"

# Get environments that don't have any API services.
axway central get env -q "scopedResources=without='kind===APIService'"

# Get stages that are assigned to environments.
axway central get stage -q "referencedByResources=with='kind===Environment'"

# Get stages that are not assigned to any environments.
axway central get stage -q "referencedByResources=without='kind===Environment'"

# Get API services that are not linked to non-archived assets.
axway central get apis -q "referencedByResources=without='kind===AssetMapping;scopeResource.state!==archived'"

# Get API services that have the "owasp" linting ruleset applied to them (via their environment).
axway central get apis -q "scopeResource.metadata.references=with='kind===APISpecLintingRuleset;name===owasp'"
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
|`service-account`                                        |Create a service account<br />*(Removed in v2.5.0. Use [axway service-account](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/service_accounts/index.html) command instead)* |
|`agent-resource`                                        |Create the mandatory information for connecting agents to Amplify environment|
|**Options**                                              |                   |
|`--account=<value>`                                      |Override default account. To be used when multiple accounts are currently logged in via [axway auth login](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html#login) <br/>Ex: `--account=amplify-cli:johndoe@domain.com`<br/>*(Added: v2.4.0)*|
|`--client-id=<value>`                                    |Override your DevOps account's client ID <br/>*(Removed: v2.4.0)*|
|`-f,--file=<path>`                                       |Filename to use to create the resource  |
|`--no-cache`                                             |Do not use cache when communicating with the server <br/>*(Added: v1.8.0)*|
|`-o,--output=<value>`                                    |Additional output formats, YAML or JSON|
|`--region=<value>`                                       |Override region configuration. Set to `US`, `EU` or `AP`|
|`-y,--yes`                                               |Automatically reply `yes` to any command prompts <br/>*(Added: v2.3.0)*|
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
|`--account=<value>`                                      |Override default account. To be used when multiple accounts are currently logged in via [axway auth login](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html#login) <br/>Ex: `--account=amplify-cli:johndoe@domain.com`<br/>*(Added: v2.4.0)*|
|`--client-id=<value>`                                    |Override your DevOps account's client ID <br/>*(Removed: v2.4.0)*|
|`-f,--file=<path>`                                       |Filename to use to create the resource  |
|`--no-cache`                                             |Do not use cache when communicating with the server <br/>*(Added: v1.8.0)*|
|`--language=<value>`                                     |Apply the language translation requested <br/>*(Added: v3.4.0)*|
|`-o,--output=<value>`                                    |Additional output formats, YAML or JSON|
|`--region=<value>`                                       |Override region configuration. Set to `US`, `EU` or `AP`|
|`-y,--yes`                                               |Automatically reply `yes` to any command prompts <br/>*(Added: v2.3.0)*|

The following examples show how to use the `apply` command:

```bash
# create multiple resources from file
axway central apply -f ./some/folder/resources.yaml

# create multiple resources from file and output results in YAML format
axway central apply -f ./some/folder/resources.json -o yaml
```

The following examples show how to use the `apply` command to apply just the language translation requested using `--language` argument:

```bash
# apply french language translation to the resource from file if the translation exists
axway central apply -f ./some/folder/lang-resources.json --language="fr-fr"

# apply german and portuguese translation to the resource from file if the translations exists and output results in YAML format
axway central apply -f ./some/folder/lang-resources.json --language="de-de,pt-br,en-us" -o yaml
```

The `lang-resources.json` file contents are as follows:

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
|`--account=<value>`                                      |Override default account. To be used when multiple accounts are currently logged in via [axway auth login](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html#login) <br/>Ex: `--account=amplify-cli:johndoe@domain.com`<br/>*(Added: v2.4.0)*|
|`--client-id=<value>`                                    |Override your DevOps account's client ID <br/>*(Removed: v2.4.0)*|
|`-f,--file=<path>`                                       |Filename to use to delete the resource   |
|`--no-cache`                                             |Do not use cache when communicating with the server <br/>*(Added: v1.8.0)*|
|`--region=<value>`                                       |Override region configuration. Set to `US`, `EU` or `AP`|
|`-s,--scope=<name>`                                      |Scope name for scoped resources <br/>*(Added: v1.17.0)*|
|`--wait`                                                 |Wait for the resources to be completely deleted          |
|`-y,--yes`                                               |Automatically reply `yes` to any command prompts <br/>*(Added: v1.17.0)*|
|`--forceDelete`                                          |Force delete a resource (Warning: Ignores finalizers on the resource and the resources scoped under it) <br/>*(Added: v3.6.0)*|
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

The `delete` command can be used with the `--forceDelete` argument to perform a force deletion on any resource. This argument can be helpful when the resource is stuck in the "Deleting" state because of the finalizers being set on the resource itself or the resources scoped under it, and using this argument can delete the resource and all the scoped resources if present. It prompts the user with a confirmation to delete the resource, but the prompt can be ignored by passing a `--yes` argument. The following examples show how to use the `delete` command with the `--forceDelete` argument:

```bash
# force delete environment by name with a prompt
axway central delete environment newenv --forceDelete

# force delete API service by name (a scoped resource) with a prompt
axway central delete apisvc someapisvc -s newenv --forceDelete

# force delete all resources specified in the file without a prompt
axway central delete -f ./some/folder/resources.yaml --forceDelete --yes
```

## edit

Edit and update resources by using the default editor.

The following table describes the usage, options, and arguments for the `edit` command:

|Usage                                                    |                             |
|---                                                      |---                                   |
|`axway central edit <command> [options]`             |                                    |
|`axway central edit environment [options] <name>`      |`environment` - Edit an environment with the specified name     |
|**Options**                                              |                   |
|`--account=<value>`                                      |Override default account. To be used when multiple accounts are currently logged in via [axway auth login](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html#login) <br/>Ex: `--account=amplify-cli:johndoe@domain.com`<br/>*(Added: v2.4.0)*|
|`--client-id=<value>`                                    |Override your DevOps account's client ID <br/>*(Removed: v2.4.0)*|
|`--no-cache`                                             |Do not use cache when communicating with the server <br/>*(Added: v1.8.0)*|
|`-o,--output=<value>`                                       |Additional output formats, YAML or JSON |
|`--region=<value>`                                       |Override region configuration. Set to `US`, `EU` or `AP`|
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
|`--account=<value>`                                      |Override default account. To be used when multiple accounts are currently logged in via [axway auth login](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html#login) <br/>Ex: `--account=amplify-cli:johndoe@domain.com`<br/>*(Added: v2.4.0)*|
|`--client-id=<value>`                                    |Override your DevOps account's client ID <br/>*(Removed: v2.4.0)*|
|`--no-cache`                                             |Do not use cache when communicating with the server <br/>*(Added: v1.8.0)*|
|`--region=<value>`                                       |Override region configuration. Set to `US`, `EU` or `AP`|
|**Arguments**                                            |                   |
|`args...`                                                  |Command arguments, run `axway central install` to see the examples |

The following example shows how to use the `install` command:

```bash
# install agent configuration in interactive mode
axway central install agents
```

## productize

Productize one or more API Services from a file.

This action creates an Asset, and a Product for each API Service in the file with no ownership assignment as default. The title of the API Service is used for Asset title and Product title. All the API Service Instances(API endpoints) are included by default in the Asset created.

The following table describes the usage, and options for the `productize` command:

|Usage                                                    |                             |
|---                                                      |---                                   |
|`axway central productize [options]`                     |                             |
|**Options**                                              |                   |
|`--account=<value>`                                      |Override default account. To be used when multiple accounts are currently logged in via [axway auth login](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html#login) <br/>Ex: `--account=amplify-cli:johndoe@domain.com`<br/>*(Added: v2.4.0)*|
|`--no-cache`                                             |Do not use cache when communicating with the server <br/>*(Added: v1.8.0)*|
|`-f,--file=<path>`                                       |Filename to use to produtize the resource(s)  |
|`--region=<value>`                                       |Override region configuration. Set to `US`, `EU` or `AP`|
|`--transferOwnership`                                    |Transfers the ownership(if exisiting) of API Service(s) to corresponding Asset(s) and Product(s). Default is no ownership and only the engage admin has access to assign/change an ownership.|

The following example shows how to use the `productize` command:

```bash
# productize api services from a file without transfer of ownership
axway central productize -f ./some/folder/apiservices.json

# productize api services from a file with transfer of ownership
axway central productize -f ./some/folder/apiservices.json --transferOwnership
```

The input file needs to be formatted in a certain way for the productize command. The `apiservices.json` file contents are as follows:

```json
[
    {
        "metadata": {
            "scope": {
                "kind": "Environment",
                "name": "env1"
            }
        },
        "spec": {
            "apiService": {
                "name": "apisvc1"
            }
        }  
    },
    {
        "metadata": {
            "scope": {
                "kind": "Environment",
                "name": "env2"
            }
        },
        "spec": {
            "apiService": {
                "name": "apisvc2"
            }
        }
    }
]
```
The following shell script can be used as an example on how to run the `productize` command for large number of api services:

```bash
#!/bin/bash

# Get all the apiservices that are needed to be productized in JSON format and copy to a file
axway central get apis -s env1 -o json > apisvc.json

# Format the file in a way that it is acceptable for productize command in Engage CLI
jq 'map({metadata: {scope: {name: .metadata.scope.name, kind: .metadata.scope.kind}} , spec: {apiService: {name: .name}}})' apisvc.json > input.json

# Input JSON file for productizing api services
input_file="input.json"

# Output text file to append the results to
output_file="log.txt"

# Create a temporary file to store the 10 entries as a JSON array
temp_file=$(mktemp)

# Get the total number of entries in the array
total_entries=$(jq 'length' "$input_file")

# Loop through the array 10 entries at a time
for ((i=0; i<total_entries; i+=10)); do
  # If the next iteration goes beyond the total number of entries, adjust accordingly
  end_index=$((i+9))
  if (( end_index >= total_entries )); then
    end_index=$((total_entries - 1))
  fi
  
  # Extract 10 entries at a time and wrap them in a JSON array
  jq ".[$i:$((end_index+1))]" "$input_file" > "$temp_file.json"
  
  # Perform productize action for the 10 entries in the file and append the output to a log file
  axway central productize -f "$temp_file.json" >> "$output_file" 2>&1
  echo "Output appended to $output_file"
  
done

# Clean up the temporary file
rm "$temp_file.json"

# Clean up the input file
rm "apisvc.json"
```

The script above has a query using `axway central get apis` command to fetch api services scoped under 'env1'. This query can be customized and used to fetch the api services that needs to be productized. These api services are formatted and used as an input to the productize command. The above example loops over the apiservices in a batch size of '10', but that can altered accordingly by changing the 'for' loop condition with the appropriate batch size and setting the 'end_index' value as end_index=$((i+(batch_size -1))). Finally, the output file 'log.txt' will have the console output of the bulk productize execution as follows:

```txt
- Productizing API Service(s)

API Service: swagger-petstore
✔ "Asset/swagger-petstore-4" was created successfully with an autogenerated logical name.
✔ "AssetMapping/giant-warrior" in the scope "Asset/swagger-petstore-4" was created successfully with an autogenerated logical name.
✔ "ReleaseTag/edgy-rhino" in the scope "Asset/swagger-petstore-4" was created successfully with an autogenerated logical name.
✔ "Product/swagger-petstore-4" was created successfully with an autogenerated logical name.
✔ "ReleaseTag/zippy-chicken" in the scope "Product/swagger-petstore-4" was created successfully with an autogenerated logical name.
API Service 'swagger-petstore' has been successfully productized.


API Service: swagger-petstore-openapi-3-0
✖ Error: Unable to find APIServiceInstances for API Service: swagger-petstore-openapi-3-0
⚠ Unable to productize API Service 'swagger-petstore-openapi-3-0' for the above errors.

```
