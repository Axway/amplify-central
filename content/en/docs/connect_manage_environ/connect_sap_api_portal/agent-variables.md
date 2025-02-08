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

Some variables/properties have default values so it is not necessary to set them unless they need to changed.

If you are either struggling with a variable value or you want to benefit from the advanced agents features (SSL security / logging), the following section describes all the variables the agents (Discovery / Traceability) rely on.

## Complete variable list for advance features

You can extend the previous minimum variable list with the following variables. Some are common to all agents and some are specific to an agent.

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

### Common variables to both agents

| Variable name                        | Description                                                                                                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SAP_AUTH_TOKENURL                    | The token URL used for authenticating  |
| SAP_AUTH_APIPORTAL_BASEURL           | The SAP API Portal BaseURL that the agent will make API calls to    |
| SAP_AUTH_APIPORTAL_CLIENTID          | The SAP API Portal ClientID that the agent will use to authenticate to API Portal |
| SAP_AUTH_APIPORTAL_CLIENTSECRET      | The SAP API Portal ClientSecret that the agent will use to authenticate to API Portal |
| SAP_AUTH_DEVPORTAL_BASEURL           | The SAP Dev Portal BaseURL that the agent will make API calls to    |
| SAP_AUTH_DEVPORTAL_CLIENTID          | The SAP Dev Portal ClientID that the agent will use to authenticate to Dev Portal |
| SAP_AUTH_DEVPORTAL_CLIENTSECRET      | The SAP Dev Portal ClientSecret that the agent will use to authenticate to Dev Portal |
| SAP_DEVELOPEREMAIL                   | The SAP Developer Email that the agent will create applications based on |
| SAP_SPEC_CREATEUNSTRUCTUREDAPI       | A flag which will create an unstructured API in Central if the provided API Spec is unknown/invalid |
