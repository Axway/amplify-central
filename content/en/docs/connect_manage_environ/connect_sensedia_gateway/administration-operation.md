---
title: Administer Sensedia Gateway
linkTitle: Administer Sensedia Gateway
draft: false
weight: 25
---

As a Cloud Administrator / Operator, you are responsible for configuring and managing your organization's Sensedia infrastructure. This topic contains setup and operational details for the Sensedia agents to govern your Sensedia API Gateway service.

## Connected Sensedia API Gateway overview

Connecting Sensedia API Gateway to Amplify will provide you with a connected/managed environment, and a global centralized view of your APIs and their related traffic, allowing users to have a centralized governance (creation/deployment/publish/subscription) and monitoring of the traffic for Sensedia API Gateway hosted APIs.

Each Sensedia Gateway is represented by an Amplify environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents--Discovery and Traceability, interact with Sensedia API Gateway and Amplify.

### Minimum requirements

* [Amplify Platform Service Account](/docs/integrate_with_central/cli_central/cli_install/#option-2---authenticate-and-authorize-your-service-account)
* [Sensedia API Gateway with API Manager v5](https://docs.sensedia.com/en/api-platform-guide/4.14.x.x/index.html)
* Client ID and Client Secret credentials for Sensedia API authentication
* Docker environment for running the agents
* Network connectivity from agent host to Sensedia API Gateway and Amplify platform

### Agent deployment

The Sensedia agents are delivered as Docker images and can be deployed in any Docker-compatible environment. The agents require:

* Network access to Sensedia API Gateway API Manager endpoints
* Network access to Amplify platform endpoints
* Persistent storage for agent data and logs
* Environment variables configuration files

### Authentication and authorization

The Sensedia agents use OAuth 2.0 client credentials flow for authentication with the Sensedia platform:

1. **Client Credentials**: The agent uses a configured Client ID and Client Secret
2. **Token Endpoint**: Authentication requests are made to `/user-management/v1/oauth2/token`
3. **Bearer Token**: All API calls use the obtained Bearer token
4. **Token Refresh**: The agent automatically refreshes tokens when they expire

The Bearer token includes tenant information, so no additional tenant configuration is required.

## Discovery Agent features

The Discovery Agent will query Sensedia APIs to find APIs exposed in Sensedia. It will then create a representation of that API in Amplify Engage, adding any necessary security, that can be published through to Marketplace.

### API discovery process

1. **Get All APIs**: Retrieves a list of all APIs from Sensedia using the API Manager API
2. **Filter APIs**: Applies configured filters based on tags, apiTags, identityApi, privateAPI, and environments
3. **Get API Details**: For each filtered API, retrieves detailed information including revisions and environments
4. **Create API Services**: Creates Amplify API services for each discovered Sensedia API
5. **Create Revisions**: Creates API service revisions for each deployed Sensedia revision
6. **Create Instances**: Creates API service instances for each environment where the API is deployed
7. **Specification Processing**: Retrieves and processes OpenAPI specifications, checking interceptor policies before adding OAuth security information (see [API Specification Enhancement](#api-specification-enhancement))

### API specification enhancement

The Discovery Agent automatically enriches OpenAPI specifications with OAuth 2.0 security definitions by analyzing Sensedia interceptor configurations. It identifies authentication methods, configures appropriate grant types and token endpoints, and ensures APIs published to Amplify Marketplace include the necessary security information for consumer access.

* **OAuth Security**: Adds OAuth 2.0 security definitions based on Sensedia interceptors
* **Grant Types**: Identifies and adds appropriate grant types (CLIENT_CREDENTIALS, etc.)
* **Token URLs**: Configures token and authorization URLs for each environment
* **Authentication Methods**: Supports both "Access token validation" and "OAuth" interceptor types

### Supported filter options

* **Tags**: Filter based on API tags
* **Identity APIs**: Include/exclude identity APIs
* **Private APIs**: Include/exclude private APIs
* **Environments**: Filter by specific environment deployments

## Provisioning features

The agents enable Marketplace provisioning by creating Sensedia applications for API subscriptions, managing access plans with rate limiting, and handling credential lifecycle.

### Application processing

* **Create Applications**: Automatically creates Sensedia applications for subscription requests
* **Application Status**: Sets application status to "APPROVED" by default
* **Developer Association**: Associates applications with configured developer email
* **Application Updates**: Manages application lifecycle through status changes

### Access Request processing

* **Plan Management**: Creates or reuses plans for API access
* **Rate Limiting**: Configures rate limit interceptors based on access request quotas
* **API Association**: Adds APIs to applications while preserving existing associations
* **Plan Reuse**: Efficiently reuses plans across multiple applications for the same API

### Credential processing

* **Client Credentials**: Retrieves client ID and secret from Sensedia applications
* **Single Credential**: Each application supports one credential pair only
* **Credential Rotation**: Supports credential renewal through application status changes
* **Credential Revocation**: Supports credential revocation by setting application to "REJECTED"

## Traceability Agent features

The Traceability Agent collects API call metrics from Sensedia environments and processes them into aggregated traffic data that is sent to Amplify Engage Business Insights.

### Traffic data collection

* **Environment Setup**: Maps configured environment names to Sensedia environment IDs
* **API Metrics**: Collects API call metrics using date ranges with proper time offsets
* **Pagination**: Handles large datasets by processing multiple pages of call data
* **Metric Aggregation**: Groups and aggregates metrics by API, application, client, and status

### Metrics processing

* **Success Metrics**: Tracks successful API calls (status < 400)
* **Client Error Metrics**: Tracks client errors (400-499 status codes)
* **Server Error Metrics**: Tracks server errors (500+ status codes)
* **Application Tracking**: Associates metrics with Sensedia applications and clients
* **Time-based Processing**: Uses configurable time windows with processing delays
* **Batch Processing**: Configurable batch size (1-1000 records) for optimal API performance
* **Processing Delays**: Configurable time offset (1m-60m) to account for Sensedia platform processing delays
* **7-Day Data Limitation**: The agent enforces a 7-day maximum lookback period - if the processing window extends beyond 7 days from the current time, it may not produce reliable results due to Sensedia platform data retention policies

{{< alert title="Note" color="primary" >}}The Traceability Agent supports API metrics only and does not provide transaction logging.{{< /alert >}}

## Configuration management

### Environment variables

| Variable | Description | Required | Default | Example |
|----------|-------------|----------|---------|---------|
| `SENSEDIA_BASEURL` | Sensedia platform base URL | Yes | | `https://platform-production.sensedia.com` |
| `SENSEDIA_AUTH_CLIENTID` | Client ID for authentication | Yes | | `id` |
| `SENSEDIA_AUTH_CLIENTSECRET` | Client Secret for authentication | Yes | | `<secret>` |
| `SENSEDIA_DEVELOPEREMAIL` | Email for application creation (Discovery Agent only) | Yes | | `developer@company.com` |
| `SENSEDIA_ENVIRONMENTS` | Comma-separated list of environments | No | `""` (all environments) | `Production,Development` |
| `SENSEDIA_FILTER` | API discovery filter expression | No | `""` (no filtering) | `tag.Axway_axway.Exists()` |
| `SENSEDIA_POLLINTERVAL` | Discovery/Traceability poll interval | No | `30m` | `5m` |
| `SENSEDIA_DISCOVERYIDENTITYAPIS` | Discover identity APIs | No | `false` | `true` |
| `SENSEDIA_DISCOVERYPRIVATEAPIS` | Discover private APIs | No | `false` | `true` |
| `SENSEDIA_SENDALLTRAFFIC` | Send all API traffic for reporting (Traceability Agent only) | No | `true` | `false` |
| `SENSEDIA_TRACEABILITYBATCHSIZE` | Batch size for traceability API calls (Traceability Agent only) | No | `500` | `1000` |
| `SENSEDIA_TIMEOFFSET` | Time offset for processing delays (Traceability Agent only) | No | `10m` | `15m` |

## Monitoring and troubleshooting

### Health checks

The agents provide health check endpoints for monitoring:

* **Discovery Agent**: Reports API discovery status and connectivity
* **Traceability Agent**: Reports traffic collection status and data processing
* **Platform Connectivity**: Validates connection to Amplify Platform
* **Gateway Connectivity**: Validates connection to Sensedia API Gateway

### Log analysis

Agent logs provide detailed information about:

* **Authentication**: Token acquisition and refresh events
* **API Discovery**: Discovery process and filtering results
* **Traffic Processing**: Metrics collection and aggregation
* **Error Handling**: Connection issues and API errors
* **Performance**: Processing times and throughput metrics

### Common operational tasks

* **Agent Restart**: Restart Docker containers to apply configuration changes
* **Log Review**: Monitor agent logs for errors and performance issues
* **Filter Updates**: Modify discovery filters to adjust API selection
* **Environment Mapping**: Update environment configurations as needed
* **Credential Rotation**: Update Sensedia client credentials when required

See [Get help with Connected Sensedia Gateway](/docs/connect_manage_environ/connect_sensedia_gateway/tips-and-troubleshooting/) for troubleshooting information.
