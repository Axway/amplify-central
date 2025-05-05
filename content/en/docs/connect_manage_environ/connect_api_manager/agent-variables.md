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
CENTRAL_ORGANIZATIONID=TheOrganizationIDfromAmplifyEngage
CENTRAL_ENVIRONMENT=AmplifyEngageEnvironmentName
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
CENTRAL_ORGANIZATIONID=TheOrganizationIDfromAmplifyEngage
CENTRAL_ENVIRONMENT=AmplifyEngageEnvironmentName
#
#Reporting Traffic to Consumer Insights
#
# enable (default=true) the gRPC communication with Amplify platform. Be sure the http/2 connectivity is allowed to cross your firewall/proxy if any.
CENTRAL_GRPC_ENABLED=true 
# enable (default=true) to store a cache locally when the agent is stopped. It enables the agent to resume from where it left off when restarting.
AGENTFEATURES_PERSISTCACHE=true
```

If you are either struggling with a variable value or want to benefit from the advanced agents features (API filtering / SSL security / proxy access / logging), the following section describes the variables the agents (Discovery / Traceability) rely on.

## Complete variable list for advanced features

You can extend the previous minimum variable list with the following variables. Some are common to all agents and some are specific to an agent.

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

### Common API Manager variables for both agents

| Variable name                           | Description                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| APIMANAGER_APIVERSION                   | The API version of the API Manager (default value: `1.3`).                                                                                                                                                                                                                                                                                |
| APIMANAGER_AUTH_PASSWORD                | The password created for the API Manager username created for this agent (created in API Manager).                                                                                                                                                                                                                                        |
| APIMANAGER_AUTH_USERNAME                | The API Manager username for this agent. Created in API Manager (must be API Manager Admin).                                                                                                                                                                                                                                              |
| APIMANAGER_CLIENTTIMEOUT                | The time interval at which the HTTP client times out making HTTP requests to API Manager.  Default value: `60s`. Units: ns, us, ms, s, m, h                                                                                                                                                                                                       |
| APIMANAGER_REQUESTSETTINGS_RETRIES      | The number of retries the agent will make for an API call to API Manager. Default value: `5` (Available in Discovery v1.12.12 and Traceability v1.12.11 or newer)                                                                                                                                                                                 |
| APIMANAGER_REQUESTSETTINGS_INITIALDELAY | The initial amount of time, see APIMANAGER_REQUESTSETTINGS_BACKOFF,  the agent waits between retry attempts for API calls to API Manager. Default value: `2s` (Available in Discovery v1.12.12 and Traceability v1.12.11 or newer)                                                                                                                 |
| APIMANAGER_REQUESTSETTINGS_BACKOFF      | When set to `true`, default, the agent will double the amount of time between retries when making API calls to API Manager. (Available in Discovery v1.12.12 and Traceability v1.12.11 or newer)                                                                                                                                            |
| APIMANAGER_HOST                         | The host API Manager is running on (default value: `localhost`).                                                                                                                                                                                                                                                                          |
| APIMANAGER_PORT                         | The port API Manager is listening on (default value: `8075`).                                                                                                                                                                                                                                                                             |
| APIMANAGER_POLLINTERVAL                 | The frequency in which API Manager is polled for new endpoints (default value: `5m`, Minimum: 30s). Units: ns, us, ms, s, m, h                                                                                                                                                                                                                      |
| APIMANAGER_PROXYURL                     | The URL for the proxy for API Manager `<http://username:password@hostname:port>`. If empty, no proxy is defined.                                                                                                                                                                                                                          |
| APIMANAGER_SSL_CIPHERSUITES             | An array of strings. It is a list of supported cipher suites for TLS versions up to TLS 1.2. If CipherSuites is nil, a default list of secure cipher suites is used, with a preference order based on hardware performance. See [Supported Cipher Suites](/docs/connect_manage_environ/connected_agent_common_reference/agent_security/). |
| APIMANAGER_SSL_INSECURESKIPVERIFY       | Controls whether a client verifies the server's certificate chain and host name. If true, TLS accepts any certificate presented by the server and any host name in that certificate. In this mode, TLS is susceptible to man-in-the-middle attacks.                                                                                       |
| APIMANAGER_SSL_MAXVERSION               | String value for the maximum SSL/TLS version that is acceptable. If empty, then the maximum version supported by this package is used, which is currently TLS 1.3. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                    |
| APIMANAGER_SSL_MINVERSION               | String value for the minimum SSL/TLS version that is acceptable. If zero, empty TLS 1.2 is taken as the minimum. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                                                                      |
| APIMANAGER_SSL_NEXTPROTOS               | An array of strings. It is a list of supported application level protocols, in order of preference, based on the ALPN protocol list. Allowed values are: h2, http/1.0, http/1.1, h2c.                                                                                                                                                     |
| APIMANAGER_WORKERS                      | Controls how many Front End Proxies will be processed at a single time (default value: `10`).                                                                                                                                                                                                                                                     |

### Specific variables for Discovery Agent

| Variable name                         | Description                                                                                                                                                          |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| APIMANAGER_DISCOVERYIGNORETAGS        | Comma-separated blacklist of tags that should not be on a proxy before sending to Amplify Engage. Takes precedence over APIMANAGER_FILTER.                           |
| APIMANAGER_FILTER                     | Expression to filter the API you want the agent to discover. See [Discover APIs](/docs/connect_manage_environ/connect_api_manager/filtering-apis-to-be-discovered/). |
| APIMANAGER_APPLICATIONDEFINITIONTITLE | When this variable is set the agent will discover Custom Application Properties from API Manager and create an Application Profile Definition on Amplify Engage.      |

#### Invoke policy handling

When a Front End Proxy is secured by invoking a policy, the agent will not know what the actual policy does. When the policy itself applies a known security type, it is possible to have the agent map a policy name to a credential type. This credential type is what consumers will be prompted to create in Marketplace. In addition to the internal API Manager security types, the Credential Type may reference the name of an external IDP.

| Variable name                                      | Description                                                                                                                                                                                                         |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| APIMANAGER_INVOKEPOLICY_DEFAULTDESCRIPTION         | When a proxy is secured by a policy, this description is added to the Access Request Definition if no description text is found in API Manager (default value: `Contact your provider about authenticating to this API`). |
| APIMANAGER_INVOKEPOLICY_TITLE                      | When a proxy is secured by a policy, this title is added to the Access Request Definition (default value: `Authentication Details`).                                                                                      |
| APIMANAGER_INVOKEPOLICY_MAPPING_POLICYNAME         | The policy name that should be mapped to a specific credential type.                                                                                                                                                |
| APIMANAGER_INVOKEPOLICY_MAPPING_CREDENTIALTYPE     | The credential type to map for the policy name specified. Options are APIKey, Basic, Oauth, external and any value set in the `AGENTFEATURES_IDP_NAME` variables.                                                   |
| APIMANAGER_INVOKEPOLICY_MAPPING_CREDENTIALTYPENAME | The credential request definition names to map for the policy name specified when using the external credential type.                                                                                               |
| APIMANAGER_INVOKEPOLICY_MAPPING_ACCESSTYPE         | The access type to map for the policy name specified. This is optional and, currently, the only non-empty value it can be set to is external.                                                 |
| APIMANAGER_INVOKEPOLICY_MAPPING_ACCESSTYPENAME     | The access request definition name to map for the policy name specified when using the external credential type.                                                                                               |

The `APIMANAGER_INVOKEPOLICY_DEFAULTDESCRIPTION` and `APIMANAGER_INVOKEPOLICY_TITLE` settings are used when the Discovery Agent cannot find a mapping to apply. These values are set in the Access Request to give the end consumer a hint on authenticating to the API.

The `APIMANAGER_INVOKEPOLICY_MAPPING_POLICYNAME` and `APIMANAGER_INVOKEPOLICY_MAPPING_CREDENTIALTYPE` settings may be repeated for every mapping that is required. For each new mapping being added increase the index at the end of the variable name.

The `APIMANAGER_INVOKEPOLICY_MAPPING_CREDENTIALTYPENAME` setting is used when the agent should not handle a CRD which is managed externally.

The `APIMANAGER_INVOKEPOLICY_MAPPING_ACCESSTYPENAME` setting is used when the agent should not handle an ARD which is managed externally.

Here is an example of multiple invoke policy mappings. Notice how the index number was incremented for each successive mapping.

```shell
APIMANAGER_INVOKEPOLICY_MAPPING_POLICYNAME_1=BasicAuthPolicy
APIMANAGER_INVOKEPOLICY_MAPPING_CREDENTIALTYPE_1=Basic

APIMANAGER_INVOKEPOLICY_MAPPING_POLICYNAME_2=AnotherAuthPolicy
APIMANAGER_INVOKEPOLICY_MAPPING_CREDENTIALTYPE_2=OAuth

APIMANAGER_INVOKEPOLICY_MAPPING_POLICYNAME_3=ThisAuthPolicy
APIMANAGER_INVOKEPOLICY_MAPPING_CREDENTIALTYPE_3=APIKey
```

##### Invoke policy mapping to External IDP configuration example

An invoke policy mapping may reference any IDP name set in the configuration, below is a sample of the environment variable setup to handle this mapping.

Given the configuration below, a proxy secured by the `IDPAuthPolicy` policy will map the credential type to the `idp-name` Okta IDP. For more information on the IDP environment variables, see [Provisioning OAuth credential to an identity provider](/docs/connect_manage_environ/marketplace_provisioning#provisioning-OAuth-credential-to-an-identity-provider).

```shell
APIMANAGER_INVOKEPOLICY_MAPPING_POLICYNAME_1=IDPAuthPolicy
APIMANAGER_INVOKEPOLICY_MAPPING_CREDENTIALTYPE_1=idp-name

# IDP configuration variables
AGENTFEATURES_IDP_NAME_1="idp-name"
AGENTFEATURES_IDP_TYPE_1="okta"
AGENTFEATURES_IDP_METADATAURL_1="https://dev-xxxxxxxxx.okta.com/oauth2/default/.well-known/oauth-authorization-server"
AGENTFEATURES_IDP_AUTH_TYPE_1="accessToken"
AGENTFEATURES_IDP_AUTH_ACCESSTOKEN_1="okta-admin-api-access-token-xxxxxxxxx"
```

##### Invoke policy mapping to externally managed credential request definition example

An invoke policy mapping may reference an externally managed credential request definition. Below is a sample of the environment variable setup to handle this mapping.

Given the configuration below, an agent will ignore events which trigger the credential provisioning because it is assumed to be handled externally. The credential type for this must be set as external.

```shell
APIMANAGER_INVOKEPOLICY_MAPPING_POLICYNAME_1=ExternalPolicy
APIMANAGER_INVOKEPOLICY_MAPPING_CREDENTIALTYPE_1=external
APIMANAGER_INVOKEPOLICY_MAPPING_CREDENTIALTYPENAME_1=external-crd-name
```

For detailed instructions on handling these custom credentials, see [Use Custom Credentials with the Discovery Agent](/docs/connect_manage_environ/connected_agent_common_reference/custom-external-credentials).

##### Invoke policy mapping to externally managed access request definition example

An invoke policy mapping may reference an externally managed access request definition. Below is a sample of the environment variable setup to handle this mapping.

Given the configuration below, an agent will ignore events which trigger the application registration provisioning because it is assumed to be handled externally. The access type for this must be set as external.

```shell
APIMANAGER_INVOKEPOLICY_MAPPING_POLICYNAME_1=ExternalPolicy
APIMANAGER_INVOKEPOLICY_MAPPING_CREDENTIALTYPE_1=external
APIMANAGER_INVOKEPOLICY_MAPPING_CREDENTIALTYPENAME_1=external-crd-name
APIMANAGER_INVOKEPOLICY_MAPPING_ACCESSTYPE_1=external
APIMANAGER_INVOKEPOLICY_MAPPING_ACCESSTYPENAME_1=external-ard-name
```

For detailed instructions on handling these custom credentials, see [Use Custom Credentials with the Discovery Agent](/docs/connect_manage_environ/connected_agent_common_reference/custom-external-credentials).

#### Externally managed credential

When a Front End Proxy is secured by a security scheme (OAuth, Basic Auth, API Key, OAuth External), the agent manages the credential provisioning based on respective credential type. This behavior can be overridden to allow custom processing for the credential by configuring a mapping for the credential type to externally managed credential request definition.

Given the configuration below, an agent will ignore events which trigger the credential provisioning because it is assumed to be handled externally.

| Variable name                                        | Description                                                                                                                                                                                                       |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| APIMANAGER_CREDENTIALTYPE_MAPPING_CREDENTIALTYPE     | The credential type to map for custom credential processing. Options are APIKey, Basic, Oauth, OAuthExternal.                                                                                                     |
| APIMANAGER_CREDENTIALTYPE_MAPPING_CREDENTIALTYPENAME | The name of the externally managed credential request definition to map for the credential type.                                                                                                                  |

Here is an example of multiple credential type mappings. Notice how the index number was incremented for each successive mapping.

```shell
APIMANAGER_CREDENTIALTYPE_MAPPING_CREDENTIALTYPE_1=OAuth
APIMANAGER_CREDENTIALTYPE_MAPPING_CREDENTIALTYPENAME_1=custom-oauth-crd

APIMANAGER_CREDENTIALTYPE_MAPPING_CREDENTIALTYPE_2=Basic
APIMANAGER_CREDENTIALTYPE_MAPPING_CREDENTIALTYPENAME_2=custom-basic-crd

APIMANAGER_CREDENTIALTYPE_MAPPING_CREDENTIALTYPE_3=APIKey
APIMANAGER_CREDENTIALTYPE_MAPPING_CREDENTIALTYPENAME_3=custom-api-key-crd
```

For detailed instructions on handling these custom credentials, see [Use Custom Credentials with the Discovery Agent](/docs/connect_manage_environ/connected_agent_common_reference/custom-external-credentials).

#### Custom OAuth External policy handling

When a Front End Proxy is secured by an OAuth External policy for an identity provider that does not support OAuth 2.0 Dynamic Client Registration Protocol, the agent will link the API to a Credential Request definition for specifying the identifier of the OAuth client provisioned outside the context of an agent.

| Variable name                             | Description                                                                                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| APIMANAGER_CUSTOM_OAUTHEXT_TITLE          | This title is added to the Credential Request Definition for custom OAuth External handling (default value: `Custom OAuth External`).                              |
| APIMANAGER_CUSTOM_OAUTHEXT_DESCRIPTION    | This description is added to the Credential Request Definition for custom OAuth External handling (default value: `Contact your provider to get the credentials`). |
| APIMANAGER_CUSTOM_OAUTHEXT_CLIENTID_LABEL | This label is added for the client identifier field in the Credential Request Definition for custom OAuth External handling (default value: `Client Id`).          |

The value for `APIMANAGER_CUSTOM_OAUTHEXT_DESCRIPTION` in the Credential Request gives the end consumer a hint on how to get the OAuth client details.

Here is an example of the configuration to override the custom OAuth External handling.

```shell
APIMANAGER_CUSTOM_OAUTHEXT_TITLE="Azure AD"
APIMANAGER_CUSTOM_OAUTHEXT_DESCRIPTION="Contact your Azure AD administrator to get the credentials"
APIMANAGER_CUSTOM_OAUTHEXT_CLIENTID_LABEL="Azure AD Client Id"
```

### Specific variables for Traceability Agent

{{< alert title="Note" color="primary" >}}To exclude health checks from being counted towards the number of transactions for the purpose of entitlement, use the variable TRACEABILITY_EXCEPTION_LIST to identify the API path that the health check transactions use. The agent will then dismiss the transactions and not process them for usage in transaction reporting.{{< /alert >}}

| Variable name                                 | Description                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| EVENT_LOG_INPUT                               | Used to disable/enable the event log input for the Traceability Agent (default value: `true`). Use this or `OPENTRAFFIC_LOG_INPUT`.                                                                                                                                                                                                        |
| EVENT_LOG_PATHS                               | The paths, comma separated, to the event logs that need to be watched.                                                                                                                                                                                                                                                                     |
| OPENTRAFFIC_LOG_INPUT                         | Used to disable/enable the event log input for the Traceability Agent (default value: `false`). Use this or `EVENT_LOG_INPUT`.                                                                                                                                                                                                             |
| OPENTRAFFIC_LOG_PATHS                         | The paths, comma separated, to the open traffic logs that need to be watched.                                                                                                                                                                                                                                                              |
| INPUTS_IGNORE_OLDER                           | When set, the agent will not track files that were modified before the set duration (default value: `1h`). See [ignore_older](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-input-log.html#filebeat-input-log-ignore-older).                                                                                             |
| INPUTS_CLOSE_INACTIVE                         | The agent will close the harvester when the file has not been modified for the duration specified (default value: `10m`). See [close_inactive](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-input-log.html#filebeat-input-log-close-inactive).                                                                          |
| INPUTS_CLEAN_INACTIVE                         | The agent will remove the state of the file when it has not been modified for the duration specified (default value: `2h`). See [clean_inactive](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-input-log.html#filebeat-input-log-clean-inactive).                                                                        |
| INPUTS_CLOSE_REMOVED                          | The agent will close the harvester of the file when it has been removed from disk (default value: `2h`). See [close_removed](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-input-log.html#filebeat-input-log-close-removed).                                                                                             |
| INPUTS_CLEAN_REMOVED                          | The agent will remove the state of the file when it has been removed from from the disk (default value: `2h`). See [clean_removed](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-input-log.html#filebeat-input-log-clean-removed).                                                                                       |
| TRACEABILITY_REDACTION_JMSPROPERTIES_SANITIZE | Determines what portions of a JMS Property value to sanitize. Example: `[{keyMatch:"jmsProviderURL",valueMatch:".{0,10}$"}]` to sanitize the `jmsProviderURL` property to mask the last ten characters or less.                                                                                                                            |
| TRACEABILITY_REDACTION_JMSPROPERTIES_SHOW     | Determines what JMS Properties to send to Amplify Engage. By default, all JMS properties are redacted. Example: `[{keyMatch:".*"}]` to send all JMS properties.                                                                                                                                                                            |
| APIGATEWAY_AUTH_USERNAME                      | Your Axway API Gateway username: should have an API Operator role.                                                                                                                                                                                                                                                                         |
| APIGATEWAY_AUTH_PASSWORD                      | Your Axway API Gateway user password.                                                                                                                                                                                                                                                                                                      |
| APIGATEWAY_CLIENTTIMEOUT                      | The time interval at which the HTTP client times out making HTTP requests to API Gateway (ns - default, us, ms, s, m, h). Set to 60s.                                                                                                                                                                                                      |
| APIGATEWAY_GETHEADERS                         | Call the API Gateway API to get additional transaction details (headers, useragent). If false, API Gateway config does not need to be set. Default: `True`. Set it to false if API Manager is installed in a Docker container.                                                                                                             |
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

#### Audit log variables

For a full explanation on how to use the Traceability Agent audit logs see [Traceability Agent audit logs](/docs/connect_manage_environ/connected_agent_common_reference/traceability_audit_logs).

{{< alert title="Note" color="primary" >}}The following variables are available but not recommended for production purposes.{{< /alert >}}

| Variable name           | Description                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| DEDUPLICATION_ENABLE    | When enabled, the agent will keep track of correlation IDs for log events that have been harvested (default value: `false`).         |
| DEDUPLICATION_QUEUESIZE | The number of correlation IDs the agent will keep in memory and compare to while processing a new log event (default value: `1024`). |
| DEDUPLICATION_EXPIRY    | Time to live for each correlation ID in the agent's memory (default value: `5m`).                                                    |
