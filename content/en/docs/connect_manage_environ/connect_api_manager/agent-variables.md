---
title: Reference - Agent configuration
linkTitle: Reference - Agent configuration
draft: false
weight: 50
---
Use the following environment variables to control your Discovery and Traceability agents.

The Discovery and Traceability agents share many parameters, which are located in:

* `da_env_vars.env` (Discovery Agent)
* `ta_env_vars.env` (Traceability Agent)

The agent (binary mode) will accept an argument pointing to the environment variables file, which you can point to either `da_env_vars.env` or `ta_env_vars.env`. Use the --envFile `da_env_vars.env` argument with either agent, pointing to the file for that agent.

The Docker image of the agent expects either `da_env_vars.env` or `ta_env_vars.env` as an argument of the Docker runner `docker run --env-file <PATH>/da_env_vars.env...`

Some variables/properties have known default values, so it is not necessary to parameterize them.

## Minimum recommended variables

Use the following environment variables as a starting point to easily switch from one environment to another.

### Discovery Agent

```
#
#API Manager connectivity
#
APIMANAGER_HOST=ApiManagerHostName (localhost by default)
APIMANAGER_PORT=ApiManagerPortNumber (8075 by default)
APIMANAGER_AUTH_USERNAME=AnApiManagerUserName
APIMANAGER_AUTH_PASSWORD=AnApiManagerUserPassword
#
#API Central connectivity
#
CENTRAL_AUTH_CLIENTID=AnApiCentralServiceAccountClientId
CENTRAL_AUTH_PRIVATEKEY=<path>/to/private_key.pem
CENTRAL_AUTH_PUBLICKEY=<path>/to/public_key.pem
CENTRAL_ORGANIZATIONID=TheOrganizationIDfromEnterpriseMarketplace
CENTRAL_ENVIRONMENT=EnterpriseMarketplaceEnvironmentName
#
#Marketplace Provisioning and Deprovisioning
#
# enable the gRPC communication with Amplify platform. Be sure the http/2 connectivity is allowed to cross your firewall/proxy if any.
CENTRAL_GRPC_ENABLED=true
# activate the Marketplace provisioning feature
AGENTFEATURES_MARKETPLACEPROVISIONING=true
# enable to store a cache locally when agent is stopped. It enables the agent to resume his treatment from where it left when restarting.
AGENTFEATURES_PERSISTCACHE=true
```

### Traceability Agent

```
#
#API Manager connectivity
#
APIMANAGER_HOST=ApiManagerHostName (localhost by default)
APIMANAGER_PORT=ApiManagerPortNumber (8075 by default)
APIMANAGER_AUTH_USERNAME=AnApiManagerUserName
APIMANAGER_AUTH_PASSWORD=AnApiManagerUserPassword
#
#API Gateway connectivity
#
APIGATEWAY_HOST=ApiGatewayHostName (localhost by default)
APIGATEWAY_PORT=ApiGatewayPortNumber (8090 by default)
APIGATEWAY_AUTH_USERNAME=AnApiGatewayOperatorUser
APIGATEWAY_AUTH_PASSWORD=AnApiGatewayOperatorUserPassword
#
#API Central connectivity
#
CENTRAL_AUTH_CLIENTID=AnApiCentralServiceAccountClientId
CENTRAL_AUTH_PRIVATEKEY=<path>/to/private_key.pem
CENTRAL_AUTH_PUBLICKEY=<path>/to/public_key.pem
CENTRAL_ORGANIZATIONID=TheOrganizationIDfromEnterpriseMarketplace
CENTRAL_ENVIRONMENT=EnterpriseMarketplaceEnvironmentName
#
#Reporting Traffic to Consumer Insights
#
# enable the gRPC communication with Amplify platform. Be sure the http/2 connectivity is allowed to cross your firewall/proxy if any.
CENTRAL_GRPC_ENABLED=true
# activate the Marketplace provisioning feature
AGENTFEATURES_MARKETPLACEPROVISIONING=true
# enable to store a cache locally when agent is stopped. It enables the agent to resume his treatment from where it left when restarting.
AGENTFEATURES_PERSISTCACHE=true
# enable to add sampling based on consumer and subscription information so each consumer can see a certain percentage of the traffic
TRACEABILITY_PER_SUBSCRIPTION=true
```

If you are either struggling with a variable value or want to benefit from the advanced agents features (API filtering / SSL security / proxy access / logging), the following section describes the variables the agents (Discovery / Traceability) rely on.

## Complete variable list for advanced features

You can extend the previous minimum variable list with the following variables. Some are common to all agents and some are specific to an agent.

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

### Common API Manager variables for both agents

| Variable name                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| APIMANAGER_APIVERSION                            | The API version of the API Manager (default value: `1.3`).                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| APIMANAGER_ALLOWAPPLICATIONAUTOCREATION          | When creating a subscription on Amplify Central, setting this value to true will enable a selection in the App name drop-down for 'Create an application.' This allows the user to either select from an existing API Manager application, or to create an application in API Manager. The new application in API Manager will be given the name of the subscription ID from Amplify Central. A value of false will cause 'Create an application' to not be shown in the drop-down. (default value: true). |
| APIMANAGER_APPORGPOLLINTERVAL                    | The frequency in which the agent checks for application and organization changes (default=ns, us, ms, s, m, h). Set to 5m (30s minimum).                                                                                                                                                                                                                                                                                                                                                                   |
| APIMANAGER_AUTH_PASSWORD                         | The password created for the API Manager username created for this agent (created in API Manager).                                                                                                                                                                                                                                                                                                                                                                                                         |
| APIMANAGER_AUTH_USERNAME                         | The API Manager username for this agent. Created in API Manager (must be API Manager Admin).                                                                                                                                                                                                                                                                                                                                                                                                               |
| APIMANAGER_CLIENTTIMEOUT                         | The time interval at which the HTTP client times out making HTTP requests to API Manager (ns - default, us, ms, s, m, h). Set to 60s.                                                                                                                                                                                                                                                                                                                                                                      |
| APIMANAGER_HOST                                  | The host API Manager is running on (default value: `localhost`).                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| APIMANAGER_PORT                                  | The port API Manager is listening on (default value: `8075`).                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| APIMANAGER_POLLINTERVAL                          | The frequency in which API Manager is polled for new endpoints (default=ns, us, ms, s, m, h). Set to 30s (minimum).                                                                                                                                                                                                                                                                                                                                                                                        |
| APIMANAGER_PROXYURL                              | The URL for the proxy for API Manager `<http://username:password@hostname:port>`. If empty, no proxy is defined.                                                                                                                                                                                                                                                                                                                                                                                           |
| APIMANAGER_SSL_CIPHERSUITES                      | An array of strings. It is a list of supported cipher suites for TLS versions up to TLS 1.2. If CipherSuites is nil, a default list of secure cipher suites is used, with a preference order based on hardware performance. See [Supported Cipher Suites](/docs/connect_manage_environ/connected_agent_common_reference/agent_security/).                                                                                                                                                                  |
| APIMANAGER_SSL_INSECURESKIPVERIFY                | Controls whether a client verifies the server's certificate chain and host name. If true, TLS accepts any certificate presented by the server and any host name in that certificate. In this mode, TLS is susceptible to man-in-the-middle attacks.                                                                                                                                                                                                                                                        |
| APIMANAGER_SSL_MAXVERSION                        | String value for the maximum SSL/TLS version that is acceptable. If empty, then the maximum version supported by this package is used, which is currently TLS 1.3. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                                                                                                                                                                                     |
| APIMANAGER_SSL_MINVERSION                        | String value for the minimum SSL/TLS version that is acceptable. If zero, empty TLS 1.2 is taken as the minimum. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                                                                                                                                                                                                                                       |
| APIMANAGER_SSL_NEXTPROTOS                        | An array of strings. It is a list of supported application level protocols, in order of preference, based on the ALPN protocol list. Allowed values are: h2, http/1.0, http/1.1, h2c.                                                                                                                                                                                                                                                                                                                      |
| APIMANAGER_WORKERS                               | Controls how many Front End Proxies will be processed at a single time (default: 10).                                                                                                                                                                                                                                                                                                                                                                                                                      |
| APIMANAGER_INVOKEPOLICY_DEFAULTDESCRIPTION       | When a proxy is secured by a policy, this description is added to the Access Request Definition if no description text is found in API Manager (default: `Contact your provider about authenticating to this API`).                                                                                                                                                                                                                                                                                        |
| APIMANAGER_INVOKEPOLICY_TITLE                    | When a proxy is secured by a policy, this title is added to the Access Request Definition (default: `Authentication Details`)                                                                                                                                                                                                                                                                                                                                                                              |
| APIMANAGER_INVOKEPOLICY_MAPPING_POLICYNAME_1     | The policy name that should be mapped to a specific credential type. Update the index for each mapping.                                                                                                                                                                                                                                                                                                                                                                                                    |
| APIMANAGER_INVOKEPOLICY_MAPPING_CREDENTIALTYPE_1 | The credential type to map for the policy name specified. Options are APIKey, Basic, and OAuth. Update the index for each mapping.                                                                                                                                                                                                                                                                                                                                                                         |

### Specific variables for Discovery Agent

| Variable name                  | Description                                                                                                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| APIMANAGER_DISCOVERYIGNORETAGS | Comma-separated blacklist of tags that should not be on a proxy before sending to Enterprise Marketplace. Takes precedence over APIMANAGER_FILTER.                   |
| APIMANAGER_FILTER              | Expression to filter the API you want the agent to discover. See [Discover APIs](/docs/connect_manage_environ/connect_api_manager/filtering-apis-to-be-discovered/). |

### Specific variables for Traceability Agent

{{< alert title="Note" color="primary" >}}To exclude health checks from being counted towards the number of transactions for the purpose of entitlement, use the variable TRACEABILITY_EXCEPTION_LIST to identify the API path that the health check transactions use. The agent will then dismiss the transactions and not process them for usage in transaction reporting.{{< /alert >}}

| Variable name                                 | Description                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| EVENT_LOG_INPUT                               | Used to disable/enable the event log input for the Traceability Agent (default value: `true`). Use this or `OPENTRAFFIC_LOG_INPUT`.                                                                                                                                                                                                        |
| EVENT_LOG_PATHS                               | The paths, comma separated, to the event logs that need to be watched.                                                                                                                                                                                                                                                                     |
| OPENTRAFFIC_LOG_INPUT                         | Used to disable/enable the event log input for the Traceability Agent (default value: `false`). Use this or `EVENT_LOG_INPUT`.                                                                                                                                                                                                             |
| OPENTRAFFIC_LOG_PATHS                         | The paths, comma separated, to the open traffic logs that need to be watched.                                                                                                                                                                                                                                                              |
| TRACEABILITY_REDACTION_JMSPROPERTIES_SANITIZE | Determines what portions of a JMS Property value to sanitize. Example: `[{keyMatch:"jmsProviderURL",valueMatch:".{0,10}$"}]` to sanitize the `jmsProviderURL` property to mask the last ten characters or less.                                                                                                                            |
| TRACEABILITY_REDACTION_JMSPROPERTIES_SHOW     | Determines what JMS Properties to send to Enterprise Marketplace. By default, all JMS properties are redacted. Example: `[{keyMatch:".*"}]` to send all JMS properties.                                                                                                                                                                    |
| APIGATEWAY_AUTH_USERNAME                      | Your Axway API Gateway username: should have an API Operator role.                                                                                                                                                                                                                                                                         |
| APIGATEWAY_AUTH_PASSWORD                      | Your Axway API Gateway user password.                                                                                                                                                                                                                                                                                                      |
| APIGATEWAY_CLIENTTIMEOUT                      | The time interval at which the HTTP client times out making HTTP requests to API Gateway (ns - default, us, ms, s, m, h). Set to 60s.                                                                                                                                                                                                      |
| APIGATEWAY_GETHEADERS                         | Call the API Gateway API to get additional transaction details (headers, useragent). If false, API Gateway config does not need to be set. Default is True. Set it to false if API Manager is installed in a Docker container.                                                                                                             |
| APIGATEWAY_HEALTHCHECKPORT                    | The port that Axway API Gateway is listening on for healthcheck status. (default value: `8080`).                                                                                                                                                                                                                                           |
| APIGATEWAY_HEALTHCHECKPROTOCOL                | The protocol that Axway API Gateway is listening on for healthcheck status. (default value: `http`).                                                                                                                                                                                                                                       |
| APIGATEWAY_HEALTHCHECKURI                     | The URI path that Axway API Gateway is listening on for healthcheck status. (default value: `healthcheck`).                                                                                                                                                                                                                                |
| APIGATEWAY_HOST                               | The host that Axway API Gateway is running on (default value: `localhost`).                                                                                                                                                                                                                                                                |
| APIGATEWAY_ONLY                               | Set to True to enable API Gateway only mode where connection to API MAnager is not used and all APIMANAGER_* config is not required (default value: `false`).                                                                                                                                                                              |
| APIGATEWAY_POLLINTERVAL                       | The frequency in which the agent polls the logs in us, ms, s, m, h. Default=ns. Set to 1m.                                                                                                                                                                                                                                                 |
| APIGATEWAY_PORT                               | The port that Axway API Gateway is listening on (default value: `8090`).                                                                                                                                                                                                                                                                   |
| APIGATEWAY_PROXYURL                           | The URL for the proxy for Axway API Gateway `<http://username:password@hostname:port>`. If empty, no proxy is defined.                                                                                                                                                                                                                     |
| APIGATEWAY_SENDALLTRAFFIC                     | Controls whether the Traceability Agent sends all traffic to be reported. Set to **false** to only report discovered APIs. (default value: `true`).                                                                                                                                                                                        |
| APIGATEWAY_SERVICE_NAMES                      | Service names defined here will increment the usage count whenever that service is used. Separate each service by a `\|` character (i.e., `"OAuth 2.0 Token Service\|OAuth 2.0 Token Info Service"`). These transactions will not be posted to Business insights.                                                                          |
| APIGATEWAY_SSL_CIPHERSUITES                   | An array of strings. It is a list of supported cipher suites for TLS versions up to TLS 1.2. If CipherSuites is nil, a default list of secure cipher suites is used, with a preference order based on hardware performance. See [Supported Cipher Suites] (/docs/connect_manage_environ/connected_agent_common_reference/agent_security/). |
| APIGATEWAY_SSL_INSECURESKIPVERIFY             | InsecureSkipVerify controls whether a client verifies the server’s certificate chain and host name. If true, then TLS accepts any certificate presented by the server and any host name in that certificate. In this mode, TLS is susceptible to man-in-the-middle attacks.                                                                |
| APIGATEWAY_SSL_MAXVERSION                     | String value for the maximum SSL / TLS version that is acceptable. If empty, then the maximum version supported by this package is used, which is currently TLS 1.3. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                   |
| APIGATEWAY_SSL_MINVERSION                     | String value for the minimum SSL / TLS version that is acceptable. If zero, empty TLS 1.0 is taken as the minimum. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                                                                     |
| APIGATEWAY_SSL_NEXTPROTOS                     | An array of strings. It is a list of supported application level protocols, in order of preference, based on the ALPN protocol list. Allowed values are: h2, http/1.0, http/1.1, h2c.                                                                                                                                                      |
