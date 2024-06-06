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

| Variable name                  | Description                                                                                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| APICONNECT_URL                 | The base URL for connect to IBM API Connect.                                                                                                                              |
| APICONNECT_ORGANIZATIONNAME    | The IBM API Connect organization name, or ID, the agents will connect to.                                                                                                 |
| APICONNECT_CATALOGNAME         | The catalog name, or ID, that the agents will discover apis and transactions from.                                                                                        |
| APICONNECT_ANALYTICSSERVERNAME | The analytics server name, or ID, that the traceability agent will query for transaction data.                                                                            |
| APICONNECT_TIMEOUT             | The connection timeout for querying IBM API Connect's API (default: `1m`)                                                                                                 |
| APICONNECT_POLLINTERVAL        | The interval in which the agent will query IBM API Connect for new APIs or transactions. (Discovery default: `5m`, `1m` minimum, Traceability default and minimum: `15m`) |
| APICONNECT_AUTH_APIKEY         | The API Key to use when authenticating API calls to IBM API Connect.                                                                                                                                    |
| APICONNECT_AUTH_CLIENTID       | The Client ID to use when authenticating API calls to IBM API Connect.                                                                                                                                    |
| APICONNECT_AUTH_CLIENTSECRET   | The Client Secret to use when authenticating API calls to IBM API Connect.                                                                                                                                   |