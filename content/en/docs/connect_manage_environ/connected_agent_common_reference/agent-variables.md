---
title: Common agent variables
linkTitle: Common agent variables
draft: false
weight: 40
---
The variables common to all agents are described here in more detail.

- [Agent Variables](#agent-variables)
  - [Common to Discovery and Traceability](#common-to-discovery-and-traceability)
    - [Status endpoint variables](#status-endpoint-variables)
    - [Logging variables](#logging-variables)
    - [Custom unit metric service variables](#custom-unit-metric-service-variables)
  - [Discovery Agent only variables](#discovery-agent-only-variables)
    - [IdP configuration variables](#idp-configuration-variables)
  - [Traceability Agent only variables](#traceability-agent-only-variables)
    - [Audit log variables](#audit-log-variables)
    - [Additional Axway API Manager Traceability Agent audit log](#additional-axway-api-manager-traceability-agent-audit-log)
- [CENTRAL\_APISERVICEREVISIONPATTERN](#central_apiservicerevisionpattern)
  - [Default pattern](#default-pattern)
  - [Available variables](#available-variables)
  - [Date Formats](#date-formats)

## Agent Variables

### Common to Discovery and Traceability

| Variable name                     | Description                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CENTRAL_REGION                    | The Amplify region that the agent will connect to. See [CENTRAL_REGION setting](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic#central_region-setting) for more information                                                                                                                                    |
| CENTRAL_AGENTNAME                 | The agent name of this agent on Amplify Central.                                                                                                                                                                                                                                                                                              |
| CENTRAL_APIVALIDATIONCRONSCHEDULE | The schedule on which the agent validates each API Instance and Service against the data plane (`@daily` - default value and minimum, `@hourly`, `@weekly`, `@monthly`).                                                                                                                                                                      |
| CENTRAL_APISERVICEREVISIONPATTERN | Refer to [CENTRAL_APISERVICEREVISIONPATTERN](#central_apiservicerevisionpattern).                                                                                                                                                                                                                                                             |
| CENTRAL_APISERVERVERSION          | Version of the API Server that the agent will communicate with.                                                                                                                                                                                                                                                                               |
| CENTRAL_AUTH_CLIENTID             | The client identifier associated to the Service Account created in Amplify Central. Locate this at Amplify > Organization > Service Accounts > client Id.                                                                                                                                                                                     |
| CENTRAL_AUTH_KEYPASSWORD          | The path to the file with the password for the private key, if applicable.                                                                                                                                                                                                                                                                    |
| CENTRAL_AUTH_PRIVATEKEY           | The private key associated with the Service Account.                                                                                                                                                                                                                                                                                          |
| CENTRAL_AUTH_PUBLICKEY            | The public key associated with the Service Account.                                                                                                                                                                                                                                                                                           |
| CENTRAL_AUTH_REALM                | The Realm used to authenticate for Amplify Central: `Broker`.                                                                                                                                                                                                                                                                                 |
| CENTRAL_AUTH_TIMEOUT              | The timeout to wait for the authentication server to respond (default=ns, us, ms, s, m, h). Set to 10s.                                                                                                                                                                                                                                       |
| CENTRAL_CLIENTTIMEOUT             | The time interval at which the HTTP client times out making HTTP requests and processing the response (ns - default, us, ms, s, m, h). Set to 60s.                                                                                                                                                                                            |
| CENTRAL_ENVIRONMENT               | Name of the Amplify Central environment where API will be hosted.                                                                                                                                                                                                                                                                             |
| CENTRAL_JOBTIMEOUT                | The longest duration interval or scheduled jobs are allowed to run before being canceled (default: `5m`).                                                                                                                                                                                                                                     |
| CENTRAL_ORGANIZATIONID            | The Organization ID from Amplify Central. Locate this at Platform > User > Organization.                                                                                                                                                                                                                                                      |
| CENTRAL_PROXYURL                  | The URL for the proxy for Amplify Central `<http://username:password@hostname:port>`. If empty, no proxy is defined.                                                                                                                                                                                                                          |
| CENTRAL_REPORTACTIVITYFREQUENCY   | The frequency at which the agent polls for event changes for the periodic agent status updater (ns - default, us, ms, s, m, h). Set to 5m.                                                                                                                                                                                                    |
| CENTRAL_SSL_NEXTPROTOS            | An array of strings. It is a list of supported application level protocols, in order of preference, based on the ALPN protocol list. Allowed values are: h2, http/1.0, http/1.1, h2c.                                                                                                                                                         |
| CENTRAL_SSL_CIPHERSUITES          | An array of strings. It is a list of supported cipher suites for TLS versions up to TLS 1.2. If CipherSuites is nil, a default list of secure cipher suites is used, with a preference order based on hardware performance. See [Supported Cipher Suites](/docs/connect_manage_environ/connected_agent_common_reference/agent_security/).     |
| CENTRAL_SSL_INSECURESKIPVERIFY    | Controls whether a client verifies the server's certificate chain and host name. If true, TLS accepts any certificate presented by the server and any host name in that certificate. In this mode, TLS is susceptible to man-in-the-middle attacks.                                                                                           |
| CENTRAL_SSL_MAXVERSION            | String value for the maximum SSL/TLS version that is acceptable. If empty, then the maximum version supported by this package is used, which is currently TLS 1.3. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                        |
| CENTRAL_SSL_MINVERSION            | String value for the minimum SSL/TLS version that is acceptable. If zero, empty TLS 1.2 is taken as the minimum. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                                                                          |
| CENTRAL_TEAM                      | Set to assign an owner of all API resources in the CENTRAL_ENVIRONMENT to that team. When blank (default), the agent will attempt to match API Manager organizations to existing teams. When no match is found, the API resources will not be assigned an owner. Catalog items will be assigned to the same team, or default team when blank. |
| AGENTFEATURES_VERSIONCHECKER      | Set to false to turn off the agent job that checks if the running agent is the latest available (default: `true`).                                                                                                                                                                                                                            |
| AGENTFEATURES_PERSISTCACHE        | Set to false to turn off the agent's persisted cache (default: `true`).                                                                                                                                                                                                                                                                       |
| CENTRAL_GRPC_ENABLED              | Set to false to make agent function in poll mode (default: `true`).                                                                                                                                                                                                                                                                            |
| CENTRAL_INSTANCEVALIDATORENABLED  | Set to true to enable the instance validator (default:   `false`).                                                                                                                                 |

#### Status endpoint variables

| Variable name              | Description                                                                                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| STATUS_HEALTHCHECKINTERVAL | Time in seconds between running periodic health checker (binary agents only). Allowed values are from 30 seconds to 5 minutes. Specify value as s or m (default value: 30s). |
| STATUS_PORT                | Port used for checking the health status of the running agent.                                                                                                               |

#### Logging variables

| Variable name             | Description                                                                                                                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LOG_FILE_CLEANBACKUPS     | The max age of a backup file, in days.                                                                                                                                                    |
| LOG_FILE_KEEPFILES        | The max number of log file backups to keep.                                                                                                                                               |
| LOG_FILE_NAME             | The name of the log files.                                                                                                                                                                |
| LOG_FILE_PATH             | The path to save logs files, if output type file or both. Traceability agents require this to be an absolute path.                                                                        |
| LOG_FILE_ROTATEEVERYBYTES | The max size, in bytes that a log file can grow to.                                                                                                                                       |
| LOG_FORMAT                | The format to print log messages (json, line, package).                                                                                                                                   |
| LOG_LEVEL                 | The log level for output messages (trace, debug, info, warn, error).                                                                                                                      |
| LOG_MASKEDVALUES          | Comma-separated list of keywords to identify within the agent config, which is used to mask its corresponding sensitive data. Keywords are matched by whole words and are case-sensitive. |
| LOG_OUTPUT                | The output for the log lines (stdout, file, both). When set to `both` for the Traceability Agent, only the file output will appear.                                                       |

{{< alert title="Note" color="primary" >}}It is recommended to set up logging in the agent configuration file to keep the logs separated for each agent.{{< /alert >}}

#### Custom unit metric service variables

For more information about the following variables, see [Use Custom Units with Discovery and Traceability Agents](/docs/connect_manage_environ/connected_agent_common_reference/custom-unit-metrics).

All of the variables in this list may be repeated for each metric service to be used. Each set of variables should be appended with an index number (i.e., `AGENTFEATURES_METRICSERVICES_ENABLE_1=true`).

| Variable name                             | Description                                                                                         |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------- |
| AGENTFEATURES_METRICSERVICES_ENABLE       | Set to true to enable this metric service URL.                                                       |
| AGENTFEATURES_METRICSERVICES_URL          | The URL, host and port number, that the metric service is listening on.                              |
| AGENTFEATURES_METRICSERVICES_REJECTONFAIL | If set to true, any error with the quota enforcement will fail the provisioning event in Marketplace. |

### Discovery Agent only variables

| Variable name                    | Description                                                                                                                                                                |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CENTRAL_ADDITIONALTAGS           | Additional tag names to publish while publishing the API. Could help to identified the API source. It is a comma separated list.                                           |
| CENTRAL_MIGRATION_CLEANINSTANCES | When set to true, the agent, on startup, will clean all except the latest API service instance for every API service and Stage combination.                                |
| CENTRAL_CREDENTIALS_OAUTHMETHODS | Agents will add all OAuth credential types that the Gateway supports on discovery. To limit the types added, set this variable (default: `oauth_public_key,oauth_secret`). |

#### IdP configuration variables

For more information about the following variables see [Marketplace provisioning](/docs/connect_manage_environ/marketplace_provisioning).

All of the variables in this list may be repeated for each IdP to be used. Each set of variables should be appended with an index number (ie. `AGENTFEATURES_IDP_NAME_1=my-idp`)

| Variable name                               | Description                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AGENTFEATURES_IDP_NAME                      | The name of the OAuth identity provider.                                                                                                                                                                                                                                                                                                  |
| AGENTFEATURES_IDP_TITLE                     | The title of the Credential Request Definition that will be shown to consumers in Marketplace.                                                                                                                                                                                                                                    |
| AGENTFEATURES_IDP_TYPE                      | The type of OAuth identity provider (`generic`, `keycloak` or `okta`).                                                                                                                                                                                                                                                                    |
| AGENTFEATURES_IDP_METADATAURL               | The URL exposed by the OAuth authorization server to provide metadata information.                                                                                                                                                                                                                                                        |
| AGENTFEATURES_IDP_EXTRAPROPERTIES           | Additional properties to send in the client metadata when registering a new client.                                                                                                                                                                                                                                                       |
| AGENTFEATURES_IDP_REQUESTHEADERS            | Additional request headers to send in the request when registering a new client.                                                                                                                                                                                                                                                          |
| AGENTFEATURES_IDP_QUERYPARAMS               | Additional query parameters to send in the request when registering a new client.                                                                                                                                                                                                                                                         |
| AGENTFEATURES_IDP_AUTH_TYPE                 | The type of authentication mechanism to be used.                                                                                                                                                                                                                                                                                          |
| AGENTFEATURES_IDP_AUTH_ACCESSTOKEN          | The token (initial access token, Admin API Token, etc.) to be used by the Agent SDK to authenticate with the OAuth identity provider.                                                                                                                                                                                                     |
| AGENTFEATURES_IDP_AUTH_CLIENTID             | The identifier of the client in the OAuth identity provider that can used to create new OAuth clients.                                                                                                                                                                                                                                    |
| AGENTFEATURES_IDP_AUTH_CLIENTSECRET         | The secret for the client in the OAuth identity provider.                                                                                                                                                                                                                                                                                 |
| AGENTFEATURES_IDP_AUTH_CLIENTSCOPE          | Space-separated scopes to be used when requesting the access token from the authorization server.                                                                                                                                                                                                                                         |
| AGENTFEATURES_IDP_AUTH_PRIVATEKEY           | Path of the private key file to be used for `private_key_jwt` authentication.                                                                                                                                                                                                                                                             |
| AGENTFEATURES_IDP_AUTH_PUBLICKEY            | Path of the public key file to be used for `private_key_jwt` authentication.                                                                                                                                                                                                                                                              |
| AGENTFEATURES_IDP_AUTH_KEYPASSWORD          | Password for the private key.                                                                                                                                                                                                                                                                                                             |
| AGENTFEATURES_IDP_AUTH_TOKENSIGNINGMETHOD   | Algorithm used for signing the token.                                                                                                                                                                                                                                                                                                     |
| AGENTFEATURES_IDP_AUTH_USECACHEDTOKEN       | Boolean flag to enable / disable the agent to cache the token until the expiry of the access token.                                                                                                                                                                                                                                       |
| AGENTFEATURES_IDP_AUTH_USEREGISTRATIONTOKEN | Boolean flag to enable / disable the agent to save and use the Credential specific registration token when modifying the client in the IDP.                                                                                                                                                                                               |
| AGENTFEATURES_IDP_AUTH_REQUESTHEADERS       | Additional request headers to send in the request for getting token.                                                                                                                                                                                                                                                                      |
| AGENTFEATURES_IDP_AUTH_QUERYPARAMS          | Additional query parameters to send in the request for getting token.                                                                                                                                                                                                                                                                     |
| AGENTFEATURES_IDP_SSL_NEXTPROTOS            | An array of strings. It is a list of supported application level protocols, in order of preference, based on the ALPN protocol list. Allowed values are: h2, http/1.0, http/1.1, h2c.                                                                                                                                                     |
| AGENTFEATURES_IDP_SSL_CIPHERSUITES          | An array of strings. It is a list of supported cipher suites for TLS versions up to TLS 1.2. If CipherSuites is nil, a default list of secure cipher suites is used, with a preference order based on hardware performance. See [Supported Cipher Suites](/docs/connect_manage_environ/connected_agent_common_reference/agent_security/). |
| AGENTFEATURES_IDP_SSL_INSECURESKIPVERIFY    | Controls whether a client verifies the server's certificate chain and host name. If true, TLS accepts any certificate presented by the server and any host name in that certificate. In this mode, TLS is susceptible to man-in-the-middle attacks.                                                                                       |
| AGENTFEATURES_IDP_SSL_MAXVERSION            | String value for the maximum SSL/TLS version that is acceptable. If empty, then the maximum version supported by this package is used, which is currently TLS 1.3. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                    |
| AGENTFEATURES_IDP_SSL_MINVERSION            | String value for the minimum SSL/TLS version that is acceptable. If zero, empty TLS 1.2 is taken as the minimum. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                                                                      |

{{< alert title="Note" color="primary" >}}Not all agents support these IdP settings.{{< /alert >}}

### Traceability Agent only variables

| Variable name                                  | Description                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CENTRAL_ENVIRONMENTID                          | ID of the Amplify Engage environment. This is only used and required when `CENTRAL_USAGEREPORTING_OFFLINE=true`. See [Manual reporting](/docs/connect_manage_environ/connected_agent_common_reference/traceability_usage#manual-reporting).                                                                             |
| CENTRAL_METRICREPORTING_PUBLISH                | Enables/disables the sending of metric events to Amplify (default value: `true`).                                                                                                                                                                                                                                               |
| CENTRAL_METRICREPORTING_SCHEDULE               | The schedule at which the agent reports API metrics to Amplify and cache usage numbers (default value: `@hourly`, minimum value: `@hourly`, ex:`@hourly`, `@daily`). Takes precedence over replaced variable CENTRAL_USAGEREPORTING_INTERVAL.                                                                                   |
| CENTRAL_USAGEREPORTING_PUBLISH                 | Enables/disables the sending of usage events to Amplify (default value: `true`). Takes precedence over replaced variable CENTRAL_PUBLISHUSAGE.                                                                                                                                                                                  |
| CENTRAL_USAGEREPORTING_SCHEDULE                | The schedule at which cached usage events are sent to the platform (default value: `@daily`, minimum value: `@hourly`, ex: `@weekly`, `@monthly`).                                                                                                                                                                              |
| CENTRAL_USAGEREPORTING_OFFLINE                 | Set to `true` to enable offline usage reporting (default value: `false`). Ignores CENTRAL_METRICREPORTING_SCHEDULE value as that is only for online reporting.                                                                                                                                                                  |
| CENTRAL_USAGEREPORTING_OFFLINESCHEDULE         | Determines how often usage numbers are saved to the report (default value and minimum: `@hourly`, ex: `@daily`, `@weekly`, `@monthly`).                                                                                                                                                                                         |
| QUEUE_MEM_EVENTS                               | The size of the internal queue used for storing consumed events before publishing them (default value: `2048`).                                                                                                                                                                                                                 |
| QUEUE_MEM_FLUSH_MINEVENTS                      | The minimum number of events in queue required for publishing (default value: `100`).                                                                                                                                                                                                                                           |
| QUEUE_MEM_FLUSH_TIMEOUT                        | The maximum time to wait for min_events to be fulfilled (default value: `1s`).                                                                                                                                                                                                                                                  |
| TRACEABILITY_BULKMAXSIZE                       | The maximum number of events to bulk in a single ingestion request (default value: `100`).                                                                                                                                                                                                                                      |
| TRACEABILITY_CLIENTTIMEOUT                     | The time to wait for ingestion response (default value: `60s`).                                                                                                                                                                                                                                                                 |
| TRACEABILITY_COMPRESSIONLEVEL                  | The gzip compression level for the output event (default value: `3`).                                                                                                                                                                                                                                                           |
| TRACEABILITY_EXCEPTION_LIST                    | Determines what API paths the agent will dismiss and not process for usage or transaction reporting. Valid regular expressions can be configured. Example: `["/api/v\\d+/ping.*$", "^/qa.*$", "/qa.*" ]`. Learn the Regular Expression syntax ([RE2 Syntax](https://github.com/google/re2/wiki/Syntax)) supported by the agent. |
| TRACEABILITY_PROXYURL                          | The socks5 or http URL of the proxy server for ingestion service (`<socks5://hostname:port>`). If empty, no proxy is defined.                                                                                                                                                                                                   |
| TRACEABILITY_REDACTION_MASKING_CHARACTERS      | Determines what characters are displayed as the sanitized response header values on Amplify (default value `{*}`).                                                                                                                                                                                                              |
| TRACEABILITY_REDACTION_PATH_SHOW               | Determines what portions of a transactions PATH to send to Amplify Engage. By default, the entire path is redacted. Example: `[{keyMatch:".*"}]` to send all paths.                                                                                                                                                     |
| TRACEABILITY_REDACTION_QUERYARGUMENT_SANITIZE  | Determines what portions of a Query Argument value to sanitize. Sanitize query parameter `tenantId` to mask the ten first characters or less `[{keyMatch:"tenantId",valueMatch:"^.{0,10}"}]                                                                                                                                     |
| TRACEABILITY_REDACTION_QUERYARGUMENT_SHOW      | Determines what Query Arguments to send to Amplify Engage. By default, all query parameters are redacted. Example: `[{keyMatch:".*"}]` to send all query parameters.                                                                                                                                                    |
| TRACEABILITY_REDACTION_REQUESTHEADER_SANITIZE  | Determines what portions of a Request Header value to sanitize. Sanitize `Authorization` request header to mask the ten first characters or less `[{keyMatch:"Authorization",valueMatch:"^.{0,10}"}]`                                                                                                                           |
| TRACEABILITY_REDACTION_REQUESTHEADER_SHOW      | Determines what Request Header Keys to send to Amplify Engage. By default, all request headers are redacted. Example: `[{keyMatch:"Accept.*"}, {keyMatch:"Connection"}]` to send all Accept* and the Connection request header.                                                                                         |
| TRACEABILITY_REDACTION_RESPONSEHEADER_SANITIZE | Determines what portions of a Response Header value to sanitize. Example: `[{keyMatch:"apiKey",valueMatch:".{0,10}$"}]` to sanitize the `apiKey` request header to mask the last ten characters or less.                                                                                                                        |
| TRACEABILITY_REDACTION_RESPONSEHEADER_SHOW     | Determines which Response Header Keys to send to Amplify. By default, all response headers are redacted. Example: `[{keyMatch:".*"}]` to send all response headers.                                                                                                                                                             |
| TRACEABILITY_WORKER                            | The number of workers collecting events and sending them to Amplify Engage (default value: `1`).                                                                                                                                                                                                                        |

#### Audit log variables

For a full explanation on how to use the Traceability Agent audit logs see [Traceability Agent audit logs](/docs/connect_manage_environ/connected_agent_common_reference/traceability_audit_logs).

| Environment Variable            | Description                                                                                   |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| LOG_METRICFILE_ENABLED          | Enable or disable the metric audit log (default: `true`).                                     |
| LOG_METRICFILE_NAME             | The name of the metric log file that will be created (default: `metric.log`).                 |
| LOG_METRICFILE_KEEPFILES        | The maximum number of metric audit log files to keep (default: `7`).                          |
| LOG_METRICFILE_ROTATEEVERYBYTES | The maximum size (bytes) a metric audit log can grow to (default: `10485760`=`10 megabytes`). |
| LOG_METRICFILE_CLEANBACKUPS     | The maximum age of a metric audit log backup file, in days (default: `0` unlimited).          |
| LOG_USAGEFILE_ENABLED           | Enable or disable the usage audit log (default: `true`).                                      |
| LOG_USAGEFILE_NAME              | The name of the usage log file that will be created (default: `usagefile.log`).               |
| LOG_USAGEFILE_KEEPFILES         | The maximum number of usage audit log files to keep (default: `7`).                           |
| LOG_USAGEFILE_ROTATEEVERYBYTES  | The maximum size (bytes) a usage audit log can grow to (default: `10485760`=`10 megabytes`).  |
| LOG_USAGEFILE_CLEANBACKUPS      | The maximum age of a usage audit log backup file, in days (default: `365` days).              |

With the default settings, the Traceability Agent will keep a maximum of `7` files, each a total of `10485760` bytes.

#### Additional Axway API Manager Traceability Agent audit log

The Traceability Agent that connects to Axway API Manager includes an additional transaction audit log to track the correlation IDs of each transaction the agent has seen and recorded. The following table lists the environment variables that are available to configure the transaction audit logs.

| Environment Variable             | Description                                                                                         |
| -------------------------------- | --------------------------------------------------------------------------------------------------- |
| LOG_TRANSACTION_ENABLED          | Enable or disable the transaction audit log (default: `true`).                                      |
| LOG_TRANSACTION_NAME             | The name of the transaction log file that will be created (default: `transaction.log`).             |
| LOG_TRANSACTION_KEEPFILES        | The maximum number of transaction audit log files to keep (default: `7`).                           |
| LOG_TRANSACTION_ROTATEEVERYBYTES | The maximum size, (bytes) a transaction audit log can grow to (default: `10485760`=`10 megabytes`). |
| LOG_TRANSACTION_CLEANBACKUPS     | The maximum age of a transaction audit log backup file, in days (default: `0` unlimited).           |

## CENTRAL_APISERVICEREVISIONPATTERN

This variable sets the pattern used when creating API service revisions on Amplify Engage. The default pattern is `{{.APIServiceName}}{{if ne .Stage ""}} ({{.StageLabel}}: {{.Stage}}){{end}} - {{.Date:YYYY/MM/DD}} - r {{.Revision}}`.

### Default pattern

As shown above, the default pattern for this variable is `{{.APIServiceName}}{{if ne .Stage ""}} ({{.StageLabel}}: {{.Stage}}){{end}} - {{.Date:YYYY/MM/DD}} - r {{.Revision}}`.

Each variable is surrounded by two sets of curly braces `{{ }}` and prepended with a period `.`.

In this template there is also a conditional check that the Stage variable is not equal to `ne` to an empty string `""`, `{{if ne .Stage ""}}`. When that condition is true, everything up to the `{{end}}` portion is added to the title, `({{.StageLabel}}: {{.Stage}})`.

Examples:

| .APIServiceName | .Stage     | .StageLabel | .Date             | .Revision | Revision Title                                 |
| --------------- | ---------- | ----------- | ----------------- | --------- | ---------------------------------------------- |
| MyAPI           |            |             | June 16 2011      | 1         | MyAPI - 2011/06/16 - r 1                       |
| ThisAPI         | Production | Stage       | September 15 2015 | 3         | ThisAPI (Stage: Production) - 2015/09/15 - r 3 |
| YourAPI         | test       | Portal      | December 23 2015  | 5         | YourAPI (Portal: test) - 2015/12/23 - r 5      |
| LastAPI         |            | Stage       | January 11 2018   | 2         | LastAPI - 2018/01/11 - r 2                     |

More information about these templates can be found at [https://pkg.go.dev/text/template](https://pkg.go.dev/text/template).

### Available variables

These variables can be used in the naming template:

| Variable Name   | Description                                                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .APIServiceName | The friendly name of the API service that this revision is being added too                                                                                          |
| .Stage          | The name of the stage, if applicable, that this API service revision is linked to on the data plane                                                                 |
| .StageLabel     | The descriptor of the stage for the linked data plane. For example, AWS stage descriptor is Stage or Apigee stage descriptor is Portal                              |
| .Date           | The [date](#date-formats) that this API service revision is being created. This is when the resource is created on Amplify, not when the data plane created the API |
| .Revision       | The revision number, according to what is on Amplify, for this API service revision                                                                                 |

### Date Formats

These date formats can added with the .Date variable:

| Format               | Example for April 13 2010 |
| -------------------- | ------------------------- |
| YYYY/MM/DD (default) | 2010/04/13                |
| YYYY-MM-DD           | 2010-04-13                |
| MM/DD/YYYY           | 04/13/2010                |
| MM-DD-YYYY           | 04-13-2010                |

For example, `{{.Date:YYYY/MM/DD}}`
