---
title: Administer network traffic
linkTitle: Administer network traffic
draft: false
weight: 40
---
Traffic is always initiated by the Agent to the data plane, API Gateway, and Amplify. No sessions are ever initiated back to the Agent.

![Agent networking](/Images/central/connect-api-manager/agents-proxy2.png "Agent networking")

All communications are initiated by the agents so there are no requirements to change the inbound rules on your network infrastructure.

## Data destinations

The destination for:

* Agent Authentication data is `login.axway.com`
* API definition (Swagger or WSDL) and API documentation data is `apicentral.axway.com`
* API Event data, the transaction summary and headers, is `ingestion.datasearch.axway.com` or `ingestion.visibility.eu-fr.axway.com`
* Subscription notification for getting platform user information is `platform.axway.com`
* Usage reporting, the number of API transactions, is `platform.axway.com`

## Data exchanged

### Discovery Agent

The Discovery Agent sends the following information to the Axway Amplify platform:

* API definition using Swagger or WSDL depending on the API type (REST vs SOAP)
* API documentation

It is also possible to filter the API to be discover using the filter capabilities of the agent:

| Gateway type      | Variable name       | Description                                                                                                            | Reference                                                                                            |
|-------------------|---------------------|------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| Axway API Gateway | `APIMANAGER_FILTER` | filter APIs based on the API tags                                                                                      | [Discover APIs](/docs/connect_manage_environ/connect_api_manager/filtering-apis-to-be-discovered/)   |
| AWS               | `AWS_FILTER`        | filter APIs based on the Stage tags                                                                                    | [Discover APIs](/docs/connect_manage_environ/connect_aws_gateway/filtering-apis-to-be-discovered-1/) |
| Azure             | `AZURE_FILTER`      | filter APIs based on the API tags. Only exists condition is available: `AZURE_FILTER=tag.{someTagName}.Exists()==true` |                                                                                                      |

### Traceability Agent

Robert to update

The Traceability Agent reports two sets of data to Amplify platform:

* Usage data
* Metrics data
* Transactions data

#### Usage data

The usage data represent the total number of APIs called during a certain period of time. This usage is automatically reported daily by default to Amplify platform and cannot be inactivated. See [Reporting Gateway usage event](/docs/connect_manage_environ/connected_agent_common_reference/traceability_usage/#reporting-gateway-usage-event).

It contains the following information:

Structural Fields:

* Unique ID
* Timestamp
* Event Identifier
* Environment Identifier
* Event name and version

Data Fields:

* Count
* Observation Window (start / end)

#### Metrics data

The metrics data represent an aggregation of the transaction data made during a certain period of time. The aggregation is based on the API name and API response code. The metrics are automatically reported every 15 minutes for on-premise agents (30 minutes by default for SaaS agents), by default, to Amplify platform and cannot be inactivated. The data can be viewed at **Amplify platform > Analytics > API Usage**.

It contains the following information:

Structural Fields:

* Timestamp
* Organization Identifier
* Event name and version

Data Fields:

* Count of call
* API name
* Response code / status
* Response min/max/avg time
* Observation Window (start / end)

#### Transactions data

The transaction data represent the number and details of transactions processed by the Gateway during a period of time. You can limit the number of transactions sent to the platform, or completely turn this feature off, by applying a sampling configuration to the Traceability Agent. See [Trace Sampling](/docs/connect_manage_environ/connected_agent_common_reference/trace_sampling/#sampling).

The transactions can be redacted (by default) and/or sanitized, according to your need, before sending the information to Amplify platform. See [Trace redaction](/docs/connect_manage_environ/connected_agent_common_reference/trace_redaction/).

It contains the following information:

Structural Fields:

* Unique ID
* Timestamp
* Event Identifier
* App Identifier (v7 Gateway application or AWS Usage plan or Azure subscription)
* Amplify environment Identifier
* Event name and version

Data Fields:

* API Identifier
* Transaction status (i.e., HTTP status of the API)
* URLs (frontend / backend API)
* Duration and timestamp
* Service called: method (POST / GET…) + URI path
* Request/response headers from each API call (this can be turned off using the `APIGATEWAY_GETHEADERS=false` property)

{{< alert title="Note" color="primary" >}}You can disable sending the headers by using the following property:  `APIGATEWAY_GETHEADERS=false`. By default, the property is set to true. If collecting the headers is disabled, they will not be visible in Axway Amplify platform Observability module, as the Traceability Agent will send only the transaction summary data (status / url / duration / timestamp / transaction service called) to the platform.{{< /alert >}}

#### Retention and archival periods

The Usage and Metrics data collected by the Traceability Agent are retained for specified amounts of time before being automatically archived.

| Source            | Retention period                               | Archival period |
|-------------------|------------------------------------------------|-----------------|
| Usage data        | 731 Days (Two years + 1)                       | 7 years         |
| Metrics data      | 731 Days (Two years + 1)                       | 7 years         |
| Transactions data | 7 Days (Business Insights / Consumer Insights) | N/A             |

The Transactions data is available in the Business/Consumer Insights API Traffic for only one week before being deleted from Amplify Enterprise Marketplace.

{{< alert title="Note" color="primary" >}}Transactions data is not archived; however, the data may still be available on the gateway that hosted them initially.{{< /alert >}}

## Communication ports

All outbound traffic is sent over SSL via TCP / UDP.

Open the following ports so that agents can communicate to the Amplify platform:

**Single Entry Point**:

| Region | Host                               | IP             | port | Protocol | data            |
|--------|------------------------------------|----------------|------|----------|-----------------|
| US     | ingestion.platform.axway.com       | 35.71.150.229  | 443  | HTTPS    | See note below  |
|        |                                    | 52.223.61.108  |      |          |                 |
|        |                                    |                |      |          |                 |
| EU     | ingestion-eu.platform.axway.com    | 76.223.107.214 | 443  | HTTPS    | See note below  |
|        |                                    | 13.248.240.123 |      |          |                 |
|        |                                    |                |      |          |                 |
| APAC   | ingestion-ap-sg.platform.axway.com | 3.33.213.199   | 443  | HTTPS    | See note below  |
|        |                                    | 15.197.242.120 |      |          |                 |

{{< alert title="Note" color="primary" >}}
*Region* column is representing the region where your Amplify organization is deployed. EU means deployed in European data center and US meaning deployed in US data center. Be sure to use the corresponding *Host*/*Port* for your agents to operate correctly. <br />*Data* for the US, EU and APAC Regions include: API usage statistics, version check for new releases, API definitions and subscription information, API event data. <br />The connection to axway.jfrog.io is optional. If the agent cannot reach this URL, then the agent cannot check for new agent releases. Other than this, the agent will function correctly.
{{< /alert >}}

### Axway API Gateway - other ports

Other ports which may need to be opened so that the Agent may monitor API Gateway / Manager are:

**Internal**:

| Host             | Port           | Protocol | Data                                                                                                                                                                   |
|------------------|----------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API Manager Host | 8075 (default) | HTTPS    | API Discovery                                                                                                                                                          |
| API Gateway Host | 8090 (default) | HTTPS    | API Transaction Header data (see [APIGATEWAY GETHEADERS](/docs/connect_manage_environ/connect_api_manager/agent-variables/#specific-variables-for-traceability-agent)) |

**Inbound (used for the agent status server)**:

| Host          | Port           | Protocol | Data                                                               |
|---------------|----------------|----------|--------------------------------------------------------------------|
| Agent Host(s) | 8989 (default) | HTTPS    | Serves the status of the agent and its dependencies for monitoring |

### AWS Gateway and Azure Gateway - other ports

The docker container does not expose any ports outside of the container. Within the container, the following listen:

**Inbound**:

| Host             | Port           | Protocol | Data                                                               |
|------------------|----------------|----------|--------------------------------------------------------------------|
| Docker Container | 8989 (default) | HTTPS    | Serves the status of the agent and its dependencies for monitoring |

## Subscription notifications

SMTP and/or a webhook URL can be set up to send subscription notifications on both subscribe and unsubscribe actions.  You can find the configuration to set up the SMTP or webhook URL at [Subscription supported use cases for receiving API credentials](/docs/connect_manage_environ/connected_agent_common_reference/manage_subscription_workflow/#supported-use-cases-for-receiving-api-credentials).

The SMTP server address or the webhook url needs to be accessible from the Gateway machine for the agent to use them.

## Using proxies - Axway API Gateway

If your network policy restricts outbound traffic such that outbound traffic must pass through a proxy. A proxy can be configured in the configuration file of the agents.

### HTTP/HTTPS Proxy for Discovery and Traceability Agent

Use a HTTP/HTTPS Proxy for communication to the Amplify platform.  This configuration is set for both the [Discovery](/docs/connect_manage_environ/connect_api_manager/agent-variables/) and [Traceability](/docs/connect_manage_environ/connect_api_manager/agent-variables/) Agents.

Associated agent variables are:

* APIMANAGER_PROXYURL: connection to API Manager
* APIGATEWAY_PROXYURL: connection to API Gateway
* CENTRAL_PROXYURL: connection to Amplify platform

### Proxy authentication

Proxy will use one of two authentication mechanisms, none or username/password authentication. The username authentication is specified within the URL `http://{userName}:{password}@{proxyHost}:{proxyPort}`.

## Validation

### Direct Connection

**Connecting to Amplify hosts:**

```shell
# US region
curl -s -o /dev/null -w "%{http_code}"  https://ingestion.platform.axway.com
# EU region
curl -s -o /dev/null -w "%{http_code}"  https://ingestion-eu.platform.axway.com
# APAC region
curl -s -o /dev/null -w "%{http_code}"  https://ingestion-ap-sg.platform.axway.com
```

A return of **"200"** validates the connection was established.

### Connection via Proxy

**Connecting to Amplify and Login hosts:**

```shell
# US region
curl -x {{proxy_host}}:{{proxy_port}} -s -o /dev/null -w "%{http_code}"  https://ingestion.platform.axway.com
# EU region
curl -x {{proxy_host}}:{{proxy_port}} -s -o /dev/null -w "%{http_code}"  https://ingestion-eu.platform.axway.com
# APAC region
curl -x {{proxy_host}}:{{proxy_port}} -s -o /dev/null -w "%{http_code}"  https://ingestion-ap-sg.platform.axway.com
```

A return of **"200"** validates the connection was established.

## Troubleshooting

### Curl connection to ingestion.platform.axway.com

* **Error:**

  ```shell
  curl: (6) Could not resolve host: ingestion.platform.axway.com
  ```

    * **Cause:** The host making the call can’t resolve the ingestion.platform.axway.com DNS name.
    * **Possible Resolution:** Make sure the firewall whitelist ingestion.platform.axway.com corresponds to the IP address, and your proxy allows the connection to ingestion.platform.axway.com.

  ```shell
  curl -x {{proxy_host}}:{{proxy_port}} ingestion.platform.axway.com
  ```
* **Error:**

  ```shell
  curl: (7) No authentication method was acceptable.
  ```

    * **Cause:** The proxy server expected an authentication type other than what was specified.
    * **Possible Resolution:** Provide authentication to the proxy:

  ```shell
  {{username}}:{{password}}@{{proxy_host}}:{{proxy_port}}
  ```

    The Agents only support the use of username/password authentication method for proxy connections.
