---
title: Reference - Agent configuration
linkTitle: Reference - Agent configuration
draft: false
weight: 30
---
Use the following environment variables to control your Discovery agent

To maintain a shareable collection of environment files, you can create a `da_env_vars.env` (Discovery Agent).  By default, agent configuration files are looking for corresponding environment variables before looking on the configuration file property.
  
Note that the Docker image of the agent is expecting this `da_env_vars.env` as an argument of the Docker runner `docker run --env-file <PATH>/da_env_vars.env...`

Some variables/properties have a default value so that there is no need set them unless they need to change.

If you are either struggling with a variable value or you want to benefit from the advanced agents features (SSL security / logging), the following section describe all the variables the Discovery Agent relies on.

## Complete variable list for advance features

You can extend the previous minimum variable list with the following variables. Some are common to all agents and some are specific to an agent.

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

### Discovery agent variables

| Variable name                        | Description                                                                                                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------  |
| BACKSTAGE_POLLINTERVAL              | The poll interval for each discovery trigger. Defaults to 5 minutes.                                                              |
| BACKSTAGE_TIMEOUT                   | The timeout for each call to Backstage. Defaults to 1 minute                                                                      |
| BACKSTAGE_URL_SCHEME                | The scheme ("http" or "https") of the URL used to connect to Backstage                                                            |
| BACKSTAGE_URL_HOST                  | The host part of the URL used to connect to Backstage                                                                             |
| BACKSTAGE_URL_BACKENDPORT           | The backend port if, for example, Backstage is deployed locally                                                                   |
| BACKSTAGE_URL_PATH                  | The path of the URL used to connect to Backstage                                                                                  |
| BACKSTAGE_AUTH_MODE                 | The authentication mode for connecting to Backstage. Possible values: ["guest", "token", "jwks"]. Defaults to no auth.            |
| BACKSTAGE_AUTH_STATICTOKEN          | The static token value configured in Backstage used for authentication. Required with mode="token"                                |
| BACKSTAGE_AUTH_CLIENTID             | The clientID from the Identity Provider used to get the access token for making calls to Backstage. Required with mode="jwks"     |
| BACKSTAGE_AUTH_CLIENTSECRET         | The clientSecret from the Identity Provider used to get the access token for making calls to Backstage. Required with mode="jwks" |
| BACKSTAGE_AUTH_TOKENURL             | The token URL from the Identity Provider used to get the access token for making calls to Backstage. Required with mode="jwks"    |
