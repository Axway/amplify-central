---
title: Reference - Agent configuration
linkTitle: Reference - Agent configuration
draft: false
weight: 30
---
Use the following environment variables to control your Discovery and Traceability agents.

To maintain a shareable collection of environment files, you can create a `da_env_vars.env` (Discovery Agent). By default, agent configuration files are looking for corresponding environment variables before looking on the configuration file property.
  
{{% alert title="Note" color="primary" %}} The Docker image of the agent is expecting this `da_env_vars.env` as an argument of the Docker runner `docker run --env-file <PATH>/da_env_vars.env...`{{% /alert %}}

Some variables/properties have a default value so there is no need set them unless there is a change.

## Complete variable list for advance features

You can extend the previous minimum variable list with the following variables. Some are common to all agents, and some are specific to an agent.

### Common variables to both agents

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

| Name                                   | Description                                                                                                                                                                                                                                        |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Discovery Agent Variables              |                                                                                                                                                                                                                                                    |
| **KONG_ACL_DISABLE**                   | Set to true to disable the check for a globally enabled ACL plugin on Kong (default: `false`)                                                                                                                                                      |
| **KONG_ADMIN_URL**                     | The Kong admin API URL that the agent will query against                                                                                                                                                                                           |
| **KONG_ADMIN_AUTH_APIKEY_HEADER**      | The API Key header name the agent will use when authenticating                                                                                                                                                                                     |
| **KONG_ADMIN_AUTH_APIKEY_VALUE**       | The API Key value the agent will use when authenticating                                                                                                                                                                                           |
| **KONG_ADMIN_AUTH_BASICAUTH_USERNAME** | The HTTP Basic username that the agent will use when authenticating                                                                                                                                                                                |
| **KONG_ADMIN_AUTH_BASICAUTH_PASSWORD** | The HTTP Basic password that the agent will use when authenticating                                                                                                                                                                                |
| **KONG_ADMIN_SSL_NEXTPROTOS**          | An array of strings. It is a list of supported application level protocols, in order of preference, based on the ALPN protocol list. Allowed values are: h2, http/1.0, http/1.1, h2c                                                               |
| **KONG_ADMIN_SSL_INSECURESKIPVERIFY**  | Controls whether a client verifies the server’s certificate chain and host name. If true, TLS accepts any certificate presented by the server and any host name in that certificate. In this mode, TLS is susceptible to man-in-the-middle attacks |
| **KONG_ADMIN_SSL_CIPHERSUITES**        | An array of strings. It is a list of supported cipher suites for TLS versions up to TLS 1.2. If CipherSuites is nil, a default list of secure cipher suites is used, with a preference order based on hardware performance                         |
| **KONG_ADMIN_SSL_MAXVERSION**          | String value for the maximum SSL/TLS version that is acceptable. If empty, then the maximum version supported by this package is used, which is currently TLS 1.3. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3                              |
| **KONG_ADMIN_SSL_MINVERSION**          | String value for the minimum SSL/TLS version that is acceptable. If empty TLS 1.2 is taken as the minimum. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3                                                                                      |
| **KONG_PROXY_HOST**                    | The proxy host that the agent will use in API Services when the Kong route does not specify hosts                                                                                                                                                  |
| **KONG_PROXY_PORTS_HTTP_VALUE**        | The HTTP port value that the agent will set for discovered APIS                                                                                                                                                                                    |
| **KONG_PROXY_PORTS_HTTPS_VALUE**       | The HTTPs port value that the agent will set for discovered APIS                                                                                                                                                                                   |
| **KONG_PROXY_PORTS_HTTP_DISABLE**      | Set to true if the agent should ignore routes that serve over HTTP                                                                                                                                                                                 |
| **KONG_PROXY_PORTS_HTTPS_DISABLE**     | Set to true if the agent should ignore routes that serve over HTTPs                                                                                                                                                                                |
| **KONG_PROXY_BASEPATH**                | The proxy base path that will be added between the proxy host and Kong route path when building endpoints                                                                                                                                          |
| **KONG_PROXY_DISCOVERPATHREGEX**       | Set to true to handle Kong routes that include regular expressions. This will strip off the `~` at the beginning, `^` after the first `/`, and `$` at the end. Leaving any other regular expressions in the path (default: `false`)                |
| **KONG_SPEC_FILTER**                   | The Agent SDK specific filter format for filtering out specific Kong services                                                                                                                                                                      |
| **KONG_SPEC_LOCALPATH**                | The local path that the agent will look in for API definitions                                                                                                                                                                                     |
| **KONG_SPEC_URLPATHS**                 | The URL paths that the agent will query on the gateway service for API definitions                                                                                                                                                                 |
| **KONG_SPEC_DEVPORTALENABLED**         | Set to true if the agent should look for spec files in the Kong Dev Portal (default: `false`)                                                                                                                                                      |
| **KONG_SPEC_CREATEUNSTRUCTUREDAPI**    | Set to true to publish unstructured API if spec is not found (default: `false`)                                                                                                                                                                    |
| **KONG_WORKSPACES**                    | Set to the comma separated list of workspaces so the agent discovers the resources from the configured workspaces                                                                                                                                  |
|                                        |                                                                                                                                                                                                                                                    |
| Traceability Agent Variables           |                                                                                                                                                                                                                                                    |
| **KONG_LOGS_HTTP_PATH**                | The path endpoint that the Traceability Agent will listen on (default: `/requestlogs`)                                                                                                                                                             |
| **KONG_LOGS_HTTP_PORT**                | The port that the Traceability Agent HTTP server will listen on (default: `9000`)                                                                                                                                                                  |
