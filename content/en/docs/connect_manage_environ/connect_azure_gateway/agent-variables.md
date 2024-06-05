---
title: Reference - Agent configuration
linkTitle: Reference - Agent configuration
draft: false
weight: 30
---
Use variables to control your Discovery and Traceability agents.

As the Discovery and Traceability agents share many parameters, it is more efficient to use environment variables and reference these parameters, instead of declaring parameters twice.

To maintain a shareable collection of environment files, you can create a `da_env_vars.env` (Discovery Agent) and `ta_env_vars.env` (Traceability Agent) file per environment, which contains simple key value pairs.  By default, agent configuration files are looking for corresponding environment variables before looking on the configuration file property. This file can be used for both modes of the agent (binary VS Docker container).
  
Note that the agent (binary mode) will accept an argument pointing to the environment variables file, which you can point to the `da_env_vars.env` or `ta_env_vars.env` file. Use the --envFile `da_env_vars.env` argument with either agent, pointing to the file for that agent.

Note that the Docker image of the agent is expecting this `da_env_vars.env` or `ta_env_vars.env` as an argument of the Docker runner `docker run --env-file <PATH>/da_env_vars.env...`

Some variables/properties have a default known value so that there is no need to parameter them.

If you are either struggling with a variable value or you want to benefit from the advanced agents features (API filtering / SSL security / proxy access / logging), the following section describe all the variables the agents (Discovery / Traceability) rely on.

## Complete variable list for advance features

You can extend the previous minimum variable list with the following variables. Some are common to all agents and some are specific to an agent.

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

### Common variables to both agents

| Variable name           | Description                              |
| ----------------------- | ---------------------------------------- |
| AZURE_CLIENTID          | The appId of the service principal.      |
| AZURE_CLIENTSECRET      | The password of the service principal.   |
| AZURE_RESOURCEGROUPNAME | The container name that holds resources. |
| AZURE_SUBSCRIPTIONID    | The Azure subscription identifier.       |
| AZURE_TENANTID          | The tenantID of the service principal.   |  |

{{< alert title="Note" color="primary" >}}For logging, it is recommended to set it up in the agent configuration file to keep the log separated for each agent.{{< /alert >}}

### Specific variables for Discovery Agent

| Variable name         |                                                                                                                                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AZURE_APIMSERVICENAME | The container that holds the API you want the agent to discover.                                                                                                                                                                                                       |
| AZURE_FILTER          | Filter condition expression for discovering APIs based on tags. The conditional expression must have \"tag\" as the prefix/selector. Azure Discovery Agent supports only Exists() call expression-based conditions. For example, `tag.some_tag_name.Exists() == true`. |
| AZURE_PUSHTAGS        | When set to TRUE, the Azure API tags will be pushed to Amplify API service.                                                                                                                                                                                            |

### Specific variables for Traceability Agent

| Variable name               | Description                                                                                                                                                                                                                                                                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AZURE_GETHEADERS            | Call the Azure Gateway API to get additional transaction details (headers, useragent). Default is True.                                                                                                                                                                                                                                  |
| AZURE_EVENTHUBNAME          | The management container for event hub in Azure.                                                                                                                                                                                                                                                                                         |
| AZURE_EVENTHUBNAMESPACE     | The entity that provides a unique scoping container in which you create one or more event hubs.                                                                                                                                                                                                                                          |
| AZURE_EVENTHUBCONSUMERGROUP | The logical grouping of consumers that read data from the event hub. It enables multiple consuming applications to read the same streaming data in an event hub independently at their own pace with their offsets. This configuration is optional. Default consumer group is set to `$Default` internally when an event hub is created. |
| AZURE_EVENTHUBTIMEOUT       | The timeout to wait for connection to the event hub. Set to 30s, minimum value of 30s, maximum value of 300s.                                                                                                                                                                                                                            |
| AZURE_SHAREDACCESSKEYNAME   | Name of the signature or token that is appended to the URI for an Azure storage resource.                                                                                                                                                                                                                                                |
| AZURE_SHAREDACCESSKEYVALUE  | The value of the shared access key.                                                                                                                                                                                                                                                                                                      |
