---
title: MCP sample
linkTitle: MCP sample
weight: 80
---
Use the sample mcp.zip file to create an MCP service.

## Before you start

* You understand the concepts involved in the [API Server](/docs/integrate_with_central/api_server/)
* You know how to use [Amplify Central CLI](/docs/integrate_with_central/cli_central)

## Objectives

Learn how to create and manipulate Amplify Engage MCP service: from the environment to the Marketplace.

## Scenario description

An MPC service `Conference Assistant` will be created in a `Tutorial` environment with several MCP clients.

The scenario is available here for [download](/samples/mcp/mcp.zip).

The zip contains the following file:

* 1-stages.yaml: The stages definition.
* 2-env.yaml: The environment definition and its stage access.
* 3-crd-ard.yaml: Empty additional data asked during application registration additional and credential request.
* 4-mcp-client-claude.yaml: An MCP client for Claude with its corresponding documentation.
* 5-mcp-client-cursor.yaml: An MCP client for Cursor with its corresponding documentation.
* 6-mcp-client-vscode.yaml: An MCP client for Visual Studio Code with its corresponding documentation.
* 7-mcp-agenda.yaml: The MCP Service and its definition.
* mcp-agenda-details.json: A sample of the MCP service specification.

{{< alert title="Note" color="primary" >}}
**MCP specification**

The file *mcp-agenda-details.json* contains a sample of the MCP specification for you to update. It must then be encoded in base64. Once encoded, the value can replace the one present in the APIServiceRevison `conference-assistant-revision1` spec>definition>value.

Once the replacement is done, import the file `7-mcp-agenda.yaml` to update the existing definition.
{{< /alert >}}

All the files are prefixed with a number to determine in which order you should apply them with the CLI: `axway central apply -f file.yaml`.

Once imported, publish the MCP service to a Marketplace to see how the consumer will be able to consume it.
