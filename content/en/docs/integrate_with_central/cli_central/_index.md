---
title: Get started with Axway Central CLI
linkTitle: Axway Central CLI
weight: 200
date: 2020-05-29T00:00:00.000Z
hide_readingtime: true
---
Get started with the Axway Central CLI to support a DevOps approach to API Management. **Update topic for MCP Client**

## What is the Axway Central CLI

Axway Central CLI is an add on package to the [Axway CLI tool](https://www.npmjs.com/package/axway).  The Central CLI provides a command line tool for communicating with Amplify Engage’s management plane, using the API Server’s API. The CLI is a client of the API and can get and set resources on the management plane to facilitate universal API Management. The API Server’s API lets you query and manipulate the state of resources in Amplify Engage (for example: environments, API services, assets, products, secrets, webhooks etc.). All resources in the API Server can be manipulated in the same way by fetching, updating, creating and deleting, as outlined below.

If you need help with any of the Axway Central CLI commands, add the `--help` argument to the command to output the help:

 ```bash
> axway central --help
 ```

## Authentication to the Amplify platform

Before you start, you must have credentials or a service account to use the CLI. Please follow the steps in [Authorize your CLI to use the Amplify Central APIs](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis).

## Overview of the Axway Central CLI capabilities

Manage your resources with Axway Central CLI.

### Fetch resources

To view all resource types that are available in the system, run the following `get` command and provide an argument as to which type to get:

```bash
axway central get 
```

To view all resource types that are available in the system if your organization is in the EU region, run the following `get` command and provide an argument as to which type to get:

```bash
axway central get --region=EU
```

To view all resource types that are available in the system if your organization is in the APAC region, run the following `get` command and provide an argument as to which type to get:

```bash
axway central get --region=AP
```

{{< alert title="Note" color="primary" >}}The additional parameter of `--region=EU` or `--region=AP` will execute any Axway Central command in the EU or APAC region specifically.{{< /alert >}}  

The result from the `get` command lists the available types in the API Server and the results are displayed in a table with the following columns:

| Name      | Description |
| ----------- | ----------- |
| RESOURCE      | The longhand name for the resource to identify the resource kind. For example, run the following command to get a list of all environments: `axway central get environments`. Where `environments` is the resource type to get.         |
| SHORT NAMES   | The shorthand name for the resource, which can be used instead of typing in the entire resource kind name. For example, use the following shorthand to get the list of environments: `axway central get envs`.        |
| RESOURCE KIND   | The type of object this represents        |
| SCOPED   | Resources are scoped to prevent naming collisions and to reinforce the relationship between the resources in the scope. This column indicates if the resource is scoped or not.         |
| SCOPE KIND   | The resource kind which the type is scope to. For example, API services are scoped to Environments.         |
| RESOURCE GROUP  | These will represent separate business domains, e.g., ‘management’ encompasses our API and Data plane management businesses for the API Provider side of the platform. ‘catalog’ represents the API Consumer side of the platform.  |

You can query for a singular resource or multiple resources, and the CLI will display a table of the most important information about the specified resource.

```bash
axway central get <Resource> # Get a list of the resources
```

```bash
axway central get <Resource1>,<Resource2>,...,<ResourceN> # Get a list of multiple resources
```

```bash
axway central get <Resource> <Name> -s/--scope <Scope Name> # Get a specific resource by name in a named scope
```

### Fetch all the details of a resource

By default, results of the `get` command are outputted in table format. You can see additional information for the resource if you use the `-output` argument and request for the result to be rendered in yaml or json.

To see the details of an environment named 'Azure' in yaml format, run the following commands:

```bash
> axway central get environments azure -o yaml
group: management
apiVersion: v1alpha1
kind: Environment
name: azure
title: Azure Environment
metadata:
  id: e4f37c79728174c901728804244e051a
  audit:
    createTimestamp: 2020-06-06T05:04:32.335+0000
    createUserId: DOSA_6c81495138a743d29e9b4ae6704c2d39
    modifyTimestamp: 2021-04-16T03:09:45.572+0000
    modifyUserId: 6563ef56-bbab-48a9-bc4a-e564cb3fa148
  acl: []
  resourceVersion: '14742'
  references: []
  selfLink: /management/v1alpha1/environments/azure
attributes:
  dept: Innovation Lab
finalizers: []
tags:
  - cli
  - axway
spec:
  icon:
    data: >-
      iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEX///
      ..........
      pOYT5PX
    contentType: image/png
  description: Azure Environment
```

### Create resources

Create resources using the `create` command. To create a resource, provided the `create` a resource definition in a file. json and yaml formats are accepted. Note that multiple resources can be in a single file if each resource is separated by three dashes `---`.
Alternatively, an empty resource can be created by providing only a value for the resource's name.

Example of creating a resource that represents an environment resource type using a file with the create command:

```bash
axway central create -f environment.yaml
```

Where, the `environment.yaml` file contains the definition of the environment to be created:

```yaml
group: management
apiVersion: v1alpha1
kind: Environment
name: helloworld
title: Hello World
spec:
  icon:
    data: iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR42mMAAQAABQABoIJXOQAAAABJRU5ErkJggg==
    contentType: image/png
  production: true
  description: The description for this environment
  axwayManaged: false
```

To create an empty resource that represents an environment resource type with a name of “helloworld”, run the following command:

```bash
axway central create environment helloworld
```

Example of creating a resource that represents an Model Context Protocol (MCP) service resource type using a file with the create command:

```bash
axway central create -f mcp.json
```

Where, the `mcp.json` file contains the definition of the mcp service to be created:

```json
{
  "mcp": "1.0.0",
  "details":
  {
    "protocolVersion": "2025-03-26",
    "capabilities":
    {
      "tools":
      {
        "listChanged": false
      }
    },
    "serverInfo":
    {
      "name": "x-mcpvw2",
      "version": "1.0.2"
    }
  },
  "tools":
  [
    {
      "name": "pets_list239r2",
      "description": "Some tool to list pets",
      "inputSchema":
      {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "title": "Pet",
        "type": "object",
        "properties":
        {
          "name":
          {
            "type": "string"
          },
          "status":
          {
            "type": "string",
            "enum":
            [
              "available",
              "pending",
              "sold"
            ]
          }
        },
        "required":
        [
          "name",
          "status"
        ],
        "additionalProperties": false
      }
    }
  ],
  "transports":
  {
    "http-stream":
    {
      "definition":
      {
        "openapi": "3.0.1",
        "info":
        {
          "title": "MCP HTTP Streaming Transport API",
          "description": "This API allows clients to interact with the MCP server using HTTP streaming.\nAll requests and responses conform to the JSON-RPC 2.0 specification.\n",
          "version": "1.0.0"
        },
        "servers":
        [
          {
            "url": "http://localhost:3000"
          }
        ],
        "paths":
        {
          "/":
          {
            "get":
            {
              "summary": "GET not allowed",
              "operationId": "getMcpNotAllowed",
              "responses":
              {
                "405":
                {
                  "description": "Method Not Allowed"
                }
              }
            },
            "post":
            {
              "summary": "JSON-RPC 2.0 endpoint for MCP",
              "operationId": "mcpJsonRpc",
              "requestBody":
              {
                "content":
                {
                  "application/json":
                  {
                    "schema":
                    {
                      "required":
                      [
                        "jsonrpc",
                        "method"
                      ],
                      "type": "object",
                      "properties":
                      {
                        "method":
                        {
                          "type": "string",
                          "description": "The name of the method to be invoked"
                        },
                        "id":
                        {
                          "description": "An identifier established by the Client that must contain a String, Number, or NULL value if included. If it is not included, it is assumed to be a notification.",
                          "anyOf":
                          [
                            {
                              "type": "string"
                            },
                            {
                              "type": "number"
                            }
                          ]
                        },
                        "params":
                        {
                          "type": "object",
                          "description": "A structured value that holds the parameter values to be used during the invocation of the method"
                        },
                        "jsonrpc":
                        {
                          "type": "string",
                          "enum":
                          [
                            "2.0"
                          ]
                        }
                      }
                    }
                  }
                },
                "required": true
              },
              "responses":
              {
                "200":
                {
                  "description": "JSON-RPC 2.0 response",
                  "content":
                  {
                    "application/json":
                    {
                      "schema":
                      {
                        "required":
                        [
                          "id",
                          "jsonrpc"
                        ],
                        "type": "object",
                        "properties":
                        {
                          "result":
                          {
                            "type": "object",
                            "description": "The result of the method invocation"
                          },
                          "id":
                          {
                            "description": "An identifier established by the Client that must contain a String, Number, or NULL value. If it is not included, it is assumed to be a notification.",
                            "anyOf":
                            [
                              {
                                "type": "string"
                              },
                              {
                                "type": "number"
                              }
                            ]
                          },
                          "error":
                          {
                            "type": "object",
                            "properties":
                            {
                              "message":
                              {
                                "type": "string",
                                "description": "A String providing a short description of the error"
                              },
                              "code":
                              {
                                "type": "integer",
                                "description": "A Number that indicates the error type that occurred"
                              },
                              "data":
                              {
                                "type": "object",
                                "description": "A Primitive or Structured value that contains additional information about the error"
                              }
                            },
                            "description": "Error object if there was an error invoking the method"
                          },
                          "jsonrpc":
                          {
                            "type": "string",
                            "enum":
                            [
                              "2.0"
                            ]
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "components":
        {
          "schemas":
          {
            "JsonRpcResponse":
            {
              "required":
              [
                "id",
                "jsonrpc"
              ],
              "type": "object",
              "properties":
              {
                "result":
                {
                  "type": "object",
                  "description": "The result of the method invocation"
                },
                "id":
                {
                  "description": "An identifier established by the Client that must contain a String, Number, or NULL value. If it is not included, it is assumed to be a notification.",
                  "anyOf":
                  [
                    {
                      "type": "string"
                    },
                    {
                      "type": "number"
                    }
                  ]
                },
                "error":
                {
                  "type": "object",
                  "properties":
                  {
                    "message":
                    {
                      "type": "string",
                      "description": "A String providing a short description of the error"
                    },
                    "code":
                    {
                      "type": "integer",
                      "description": "A Number that indicates the error type that occurred"
                    },
                    "data":
                    {
                      "type": "object",
                      "description": "A Primitive or Structured value that contains additional information about the error"
                    }
                  },
                  "description": "Error object if there was an error invoking the method"
                },
                "jsonrpc":
                {
                  "type": "string",
                  "enum":
                  [
                    "2.0"
                  ]
                }
              }
            },
            "JsonRpcRequest":
            {
              "required":
              [
                "jsonrpc",
                "method"
              ],
              "type": "object",
              "properties":
              {
                "method":
                {
                  "type": "string",
                  "description": "The name of the method to be invoked"
                },
                "id":
                {
                  "description": "An identifier established by the Client that must contain a String, Number, or NULL value if included. If it is not included, it is assumed to be a notification.",
                  "anyOf":
                  [
                    {
                      "type": "string"
                    },
                    {
                      "type": "number"
                    }
                  ]
                },
                "params":
                {
                  "type": "object",
                  "description": "A structured value that holds the parameter values to be used during the invocation of the method"
                },
                "jsonrpc":
                {
                  "type": "string",
                  "enum":
                  [
                    "2.0"
                  ]
                }
              }
            }
          },
          "responses":
          {}
        }
      }
    }
  }
}
```


### Update resources

Update resources using the `apply` command. The apply command accepts a file containing the resource(s) to be updated. json and yaml formats are accepted.

```bash
axway central apply -f delete.yaml
```

### Delete resources

Delete resources from the API Server using the `delete command`. The Delete command can accept resource name or file name containing the resource definition. json and yaml formats are accepted.

To delete a resource that represents an environment type using a file containing the resource definition, run the following command:

```bash
axway central delete -f delete.yaml
```

To delete a resource that represents an environment type with a name “helloworld”, run the following command:

```bash
axway central delete environment helloworld
```

## Related topics

See the following topics for related information.
