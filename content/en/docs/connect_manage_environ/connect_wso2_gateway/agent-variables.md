---
title: Reference - Agent configuration
linkTitle: Reference - Agent configuration
draft: false
weight: 30
---
Use the following environment variables to control your Discovery and Traceability agents.

As the Discovery and Traceability agents share many parameters, it is more efficient to use environment variables and reference these parameters, instead of declaring parameters twice.

To maintain a shareable collection of environment files, you can create a `da_env_vars.env` (Discovery Agent) and `ta_env_vars.env` (Traceability Agent) file per environment, which contains simple key value pairs. By default, agent configuration files are looking for corresponding environment variables before looking on the configuration file property.
  
Note that the Docker image of the agent is expecting this `da_env_vars.env` or `ta_env_vars.env` as an argument of the Docker runner `docker run --env-file <PATH>/da_env_vars.env...`

Some variables/properties have default values, so it is not necessary to set them unless they need to change.

If you are either struggling with a variable value or want to benefit from the advanced agents features (SSL security / logging), the following section describes all the variables the agents (Discovery / Traceability) rely on.

## Complete variable list for advance features

You can extend the previous minimum variable list with the following variables. Some are common to all agents, and some are specific to an agent.

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

Beyond the common agent variables, for the WSO2 Traceability Agent, there are no WSO2 specific variables. WSO2 Traceability Agent setup can be found [here](/docs/connect_manage_environ/connect_wso2_gateway).

### Specific variable for Discovery agents

| Variable name               | Description                                                                                                                                                                                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WSO2_BASEURL                | WSO2 URL for accessing Publisher, Admin and Dev Portal resources                                                                                                                                                                                                            |
| WSO2_CLIENTID               | ClientID that the agent will use to authenticate to WSO2 API Portal                                                                                                                                                                                                         |
| WSO2_CLIENTSECRET           | ClientSecret that the agent will use to authenticate to WSO2 API Portal                                                                                                                                                                                                     |
| WSO2_SSL_INSECURESKIPVERIFY | Controls whether a client verifies the server's certificate chain and host name (default value: `false`). If true, TLS accepts any certificate presented by the server and any host name in that certificate. In this mode, TLS is susceptible to man-in-the-middle attacks |
