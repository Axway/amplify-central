---
title: Reference - Agent configuration
linkTitle: Reference - Agent configuration
draft: false
weight: 30
---
Use the following environment variables to control your Discovery and Traceability agents.

As the Discovery and Traceability agents share many parameters, it is more efficient to use environment variables and reference these parameters, instead of declaring parameters twice.

To maintain a shareable collection of environment files, you can create a `da_env_vars.env` (Discovery Agent) and `ta_env_vars.env` (Traceability Agent) file per environment, which contains simple key value pairs.  By default, agent configuration files are looking for corresponding environment variables before looking on the configuration file property.
  
Note that the Docker image of the agent is expecting this `da_env_vars.env` or `ta_env_vars.env` as an argument of the Docker runner `docker run --env-file <PATH>/da_env_vars.env...`

Some variables/properties have a default value so that there is no need set them unless they need to change.

If you are either struggling with a variable value or you want to benefit from the advanced agents features (SSL security / logging), the following section describe all the variables the agents (Discovery / Traceability) rely on.

## Complete variable list for advance features

You can extend the previous minimum variable list with the following variables. Some are common to all agents and some are specific to an agent.

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

### Common variables to both agents

| Variable name                        | Description                                                                                                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WEBMETHODS_URL                       | The base URL for connect to SoftwareAG WebMethods.                                                                                                                              |
| WEBMETHODS_AUTH_USERNAME             | The username used to authenticate the calls to SoftwareAG WebMethods gateway (same as the one used to login)                                                                    |
| WEBMETHODS_AUTH_PASSWORD             | The password used to authenticate the calls to SoftwareAG WebMethods gateway (same as the one used to login)                                                                    |
| WEBMETHODS_TIMEOUT                   | The connection timeout for querying SoftwareAG WebMethods's API (default: `1m`)                                                                                                 |
| WEBMETHODS_POLLINTERVAL              | The interval in which the agent will query SoftwareAG WebMethods for new APIs or transactions. (Discovery default: `5m`, `1m` minimum, Traceability default and minimum: `15m`) |
| WEBMETHODS_OAUTH2AUTHZSERVERALIAS    | The OAuth2 server alias used by SoftwareAG WebMethods to authenticate with OAuth2 creedntial                                                                                    |