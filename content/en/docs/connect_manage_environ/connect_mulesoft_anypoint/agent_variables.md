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

See [Common agent variables](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables) for variables that are common to all agents.

### Common variables to both agents

| Variable Name          | YAML Path             | Description        | **Location** / *Default*     |
| ---------------------- | --------------------- | ------------------ | ---------------------------- |
| MULESOFT_ANYPOINTEXCHANGEURL | mulesoft.anypointExchangeUrl | MuleSoft AnyPoint Exchange URL. | <https://anypoint.mulesoft.com> |
| MULESOFT_AUTH_LIFETIME          | mulesoft.auth.lifetime          | The session lifetime. The agent will automatically refresh the access token as it approaches the end of its lifetime.  | 60m |
| MULESOFT_AUTH_PASSWORD          | mulesoft.auth.password          | The password for the MuleSoft AnyPoint username created for this agent. |          |
| MULESOFT_AUTH_USERNAME          | mulesoft.auth.username          | The MuleSoft AnyPoint username created for this agent.  |    |
| MULESOFT_AUTH_CLIENTID          | mulesoft.auth.clientID          | The client id of a defined  connected app with all of the necessary permissions.  |     |
| MULESOFT_AUTH_CLIENTSECRET      | mulesoft.auth.clientSecret      | The client secret of a defined  connected app with all of the necessary permissions.   |     |
| MULESOFT_CACHEPATH              | mulesoft.cachePath              | Path entry to store stateful cache between agent invocations.   | /data  |
| MULESOFT_DISCOVERYIGNORETAGS    | mulesoft.discoveryIgnoreTags    | Comma-separated black list of tags that, if any are present, will prevent an API being published to Amplify Central. Take precedence over MULESOFT_DISCOVERYTAGS.  | (empty tag list)  |
| MULESOFT_DISCOVERYTAGS          | mulesoft.discoveryTags          | Comma-separated list of tags that, if any are present, will allow an API to be published to Amplify Central. All APIs are discovered if not tags are specified.  | (empty tag list)  |
| MULESOFT_DISCOVERORIGINALRAML   | mulesoft.discoverOriginalRAML   | Set to true if the agent should discover the Assets that were created in RAML as RAML.   | false   |
| MULESOFT_ENVIRONMENT            | mulesoft.environment            | The MuleSoft AnyPoint Exchange the agent connects to, e.g., Sandbox.   |    |
| MULESOFT_ORGNAME                | mulesoft.orgName                | The MuleSoft AnyPoint Business Unit the agent connects to.   |     |
| MULESOFT_POLLINTERVAL           | mulesoft.pollInterval           | The frequency in which MuleSoft API Manager is polled for new endpoints.   | 60s  |
| MULESOFT_PROXYURL               | mulesoft.proxyUrl               | The url for the proxy for API Manager (e.g. `<http://username:password@hostname:port>`). If empty, no proxy is defined.   | Internally, this value defaults to empty  |
| MULESOFT_SSL_CIPHERSUITES       | mulesoft.ssl.cipherSuites       | An array of strings. It is a list of supported cipher suites for TLS versions up to TLS 1.2. If CipherSuites is nil, a default list of secure cipher suites is used, with a preference order based on hardware performance.  | See [Administer gent security](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/connected_agent_common_reference/agent_security/index.html) for default cipher suite settings |
| MULESOFT_SSL_INSECURESKIPVERIFY | mulesoft.ssl.insecureSkipVerify | InsecureSkipVerify controls whether a client verifies the server's certificate chain and host name. If InsecureSkipVerify is true, TLS accepts any certificate presented by the server and any host name in that certificate. In this mode, TLS is susceptible to man-in-the-middle attacks. | Internally defaulted to false  |
| MULESOFT_SSL_MAXVERSION         | mulesoft.ssl.maxVersion         | String value for the maximum SSL/TLS version that is acceptable. If empty, then the maximum version supported by this package is used, which is currently TLS 1.3. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3   | Internally, this value defaults to empty |
| MULESOFT_SSL_MINVERSION         | mulesoft.ssl.minVersion         | String value for the minimum SSL/TLS version that is acceptable. If zero, empty TLS 1.0 is taken as the minimum. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3  | Internally, the value defaults to TLS1.2  |
| MULESOFT_SSL_NEXTPROTOS         | mulesoft.ssl.nestProtos         | An array of strings. It is a list of supported application level protocols, in order of preference, based on the ALPN protocol list. Allowed values are: h2, htp/1.0, http/1.1, h2c | Internally empty. Default negotiation. |