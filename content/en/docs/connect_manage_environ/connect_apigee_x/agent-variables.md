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

If you are either struggling with a variable value or you want to benefit from the advanced agents features (API filtering / SSL security / proxy access / logging), the following section describe all the variables the agents (Discovery / Traceability) rely on.

## Complete variable list for advance features

You can extend the previous minimum variable list with the following variables. Some are common to all agents and some are specific to an agent.

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

### Common variables to both agents

| Variable name           | Description                                                                                    |
|-------------------------|------------------------------------------------------------------------------------------------|
| APIGEE_AUTHFILEPATH     | The path where you put the GCP authentication file in docker container (**Ground agent only**) |
| APIGEE_PROJECTID        | the Project ID for your GCP project                                                            |
| APIGEE_DEVELOPEREMAIL   | The Apigee developer email                                                                     |
| APIGEE_MODE             | Apigee agent running mode                                                                      |
| APIGEE_ENVIRONMENT      | The environment from which metrics are gathered                                                |
| APIGEE_CLIENTTIMEOUT    | Maximum amount of time to wait for a reply from the Apigee client (default: 1m)                |

### Specific variables for Traceability Agent

| Variable name                        | Description                                                                            |
|--------------------------------------|----------------------------------------------------------------------------------------|
| APIGEE_METRICSFILTER_FILTEREDAPIS    | The names of the APIs for which the metrics will be processed                          |
| APIGEE_METRICSFILTER_FILTERMETRICS   | The flag upon which is decided if the API metrics are filtered or not (default: true)  |