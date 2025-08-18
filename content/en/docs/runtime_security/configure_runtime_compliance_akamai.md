---
title: Configure Akamai runtime compliance
linkTitle: Configure Akamai runtime compliance
weight: 30
---

Configure your runtime compliance and conformance analysis with the Axway Central CLI and Akamai

## Before you start

* Identify existing Amplify environments that Akamai API Security monitors API calls for
* Gather the following information that will be used by the agent to communicate with Akamai:
    * The Akamai API Security base URL for your account
    * Client ID and Client Secret for OAuth 2.0 authentication with Akamai API Security
    * Environment group mappings between Amplify environments and Akamai groups
* Ensure you have the following tools installed:
    * The Axway Central CLI must be installed, and Amplify platform connectivity is required to configure the Akamai agent

## Objectives

* Learn the benefits of integrating Amplify Engage with Akamai API Security.
* Learn how to install and configure the Akamai agent for runtime compliance and conformance analysis.

## Akamai integration

Integrating Amplify Engage with Akamai API Security will bring many benefits, including: discovery of API endpoints being monitored in real time, metrics for the usages of those endpoints, traffic-weighted risk score calculations, and conformance analysis results.

### Discovery of Akamai API endpoints

The discovery process occurs during each polling interval of your Amplify Akamai agent. During this process, the agent uses the `GetAPIsWithGrouping` method to retrieve all APIs from Akamai API Security that are being monitored for your configured groups, applies segmentLength-based grouping to organize APIs by host and path segments, and creates unified API OAS specification documents using `GenerateSpecFromTraffic` representing all API traffic that Akamai has observed for each Environment. This is represented in Amplify Engage as API services where you can observe the specifications derived from real-time monitoring data.

### Traffic metrics for Akamai API endpoints

Along with the discovery process, the Amplify Akamai agent also reports metrics against the API services from the real-time data that Akamai API Security has captured. This will help you visualize the API traffic that Akamai has captured against the traffic that your Managed Gateway has reported in one place.

### Compliance risk scoring

On a set frequency, the Amplify Akamai agent calculates a traffic-weighted risk score for your APIs. This score uses the business formula: `sum(apiRiskScore * apiCallVolume) / numberOfEndpoints` to provide accurate risk assessment based on actual API usage patterns. The risk score and grade will inform you about how at risk a certain Environment is based on the traffic patterns and security posture of APIs in that Environment. This risk score is visualized under the API Services the Amplify Akamai agent creates. See `AKAMAI_COMPLIANCEFREQUENCY` in [Environment Variables](#environment-variables) for configuration.

### Conformance analysis

The Amplify Akamai agent will keep you informed on how well your API specifications compare to real-time API data as seen by Akamai API Security. By linking your managed environments, via other Amplify agents, to Akamai environments the process is handled for you automatically.

* The Amplify Akamai agent will find all API specs on Amplify and cross-reference them with Akamai API Security data
* On the set frequency (See `AKAMAI_COMPLIANCEFREQUENCY` in [Environment Variables](#environment-variables)) the Amplify Akamai agent will run a Conformance Analysis using pure synchronous processing
* After completion, those analysis results are reflected in Amplify
    * Within the API Service view in the Amplify Akamai environment
    * Within the Environment details view for your referenced managed environments

With the Conformance Analysis results, utilizing the API specifications provided by Engage and real-time traffic data from Akamai, you will see accurate results for the following:

* Matched endpoints with issues - these are APIs that are documented but the API traffic seen by Akamai does not match the documentation
* Shadow endpoints - these are APIs that are not documented but API traffic is flowing through them
* Orphan endpoints - these are APIs that are documented but no API traffic is utilizing them
* Matched endpoints without Issues - these are APIs that are documented correctly when compared to the API traffic data Akamai has observed

Finally, these results provide detailed insights into your API security posture and compliance status across your entire API ecosystem.

## Installation prerequisites

Before installing and configuring, make sure you have the following agent prerequisites.

* Any machine (Windows / Linux / Mac) where:
    * You can access platform.axway.com, login.axway.com and repository.axway.com on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)
* An Amplify platform user account that has the **Platform Administrator** and **Engage Admin** roles
* An Amplify platform service account to run the configuration in headless mode (optional)
* Axway CLI with the Engage CLI installed
    * Follow the instructions described in [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

The agent must have access to:

* The platform URLs described in [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/) either directly or via a proxy
* The Akamai API Security platform APIs

### Identify yourself to Amplify platform with Axway CLI

There are two ways to authenticate with Axway CLI:

* Default mode: with an administrator username (email address) / password via a browser
* Headless mode: with a platform service account and a username / password via a prompt

#### Default mode with browser authentication

Run this command to use Central CLI to log in with your Amplify platform credentials:

```shell
axway auth login
```

A browser will automatically open.
Enter your valid credentials (email address and password). Once the *Authorization Successful* message is displayed, go back to Axway CLI.

If you are a member of multiple Amplify organizations, you may have to choose an organization.

#### Headless mode authentication with service account

You must have a platform service account and a regular administrator account for the headless mode. The permissions of the service account will be overridden by the permission of the administrator account.

```shell
# command syntax: Log into a service account with platform tooling credentials:
axway auth login --client-id <id> --secret-file <path> --username <email>

# the command will prompt you to enter your username and password
```

Sample:

```shell
axway auth login --client-id plsa_a1d6e0a8-XXXXX --secret-file /home/user/axway/SAKeysPlatformSA/private_key.pem --username admin@mail.com
AXWAY CLI, version 3.2.12
Copyright (c) 2018-2024, Axway, Inc. All Rights Reserved.

√ Password: · **********

You are logged into a platform account in organization Axway (a1d6e0a8-XXXXX) as admin@mail.com.
The current region is set to US.
```

If you are a member of multiple Amplify organizations, you may have to choose an organization using the `axway auth switch --org <orgId|orgName>` command.

## Docker deployment

### Docker prerequisites

* For containerized agents, Docker must be installed and you will need a basic understanding of Docker commands

### Environment variables

| Variable                                     | Default | Usage                                                                                                                                                                       |
| -------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AKAMAI_BASEURL                               |         | The base URL for your Akamai API Security account (e.g., `https://your-account.luna.akamaiapis.net`)                                                                       |
| AKAMAI_CLIENTID                              |         | The OAuth 2.0 Client ID for authenticating with Akamai API Security                                                                                                       |
| AKAMAI_CLIENTSECRET                          |         | The OAuth 2.0 Client Secret for authenticating with Akamai API Security                                                                                                   |
| AKAMAI_GROUPS                                |         | Comma-separated list of Akamai group names to monitor (Required - at least one group must be specified)                                                                   |
| AKAMAI_POLLINTERVAL                          | 1h      | The frequency the agent polls Akamai for API discovery, metrics collection, compliance and conformance checks. (Lower Limit: 1h)                                        |
| AKAMAI_COMPLIANCEFREQUENCY                   | 12h     | How often the agent will calculate a traffic-weighted compliance risk score and send to Engage. (Lower Limit: 1h)                                                       |
| AKAMAI_CONFORMANCEFREQUENCY                  | 24h     | How often the agent will run conformance analysis against discovered APIs and send results to Engage. (Lower Limit: 1h)                                                 |
| AKAMAI_SEGMENTLENGTH                         | 2       | Controls API grouping by path segments (e.g., 0=host only, 1="/api", 2="/api/v1", 3="/api/v1/users"). Higher values provide more granular grouping.                    |
| AKAMAI_TOKENREFRESHINTERVAL                  | 55m     | OAuth 2.0 token refresh interval to maintain authentication (0=no auto-refresh)                                                                                           |
| AKAMAI_HTTPTIMEOUT                           | 30s     | HTTP client timeout for Akamai API requests                                                                                                                               |
| AKAMAI_ENVIRONMENTMAPPING_[INDEX]_AMPLIFY    |         | Amplify Engage Environment Name for environment mapping (used with corresponding AKAMAI entry)                                                                            |
| AKAMAI_ENVIRONMENTMAPPING_[INDEX]_AKAMAI     |         | Akamai group name for environment mapping (used with corresponding AMPLIFY entry)                                                                                         |

## Helm deployment

### Helm prerequisites

* Ensure you have the following tools installed:
    * Kubectl - compatible version with your Kubernetes cluster where Akamai agent will be deployed
    * Helm 3.2.4 or later
* Kubernetes context is set for the Kubernetes cluster where the agent will be deployed

### Helm overrides

| Override                       | Default | Usage                                                                                                                                                                            |
| ------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| akamai.baseUrl                 |         | The base URL for your Akamai API Security account (e.g., `https://your-account.luna.akamaiapis.net`)                                                                            |
| akamai.clientId                |         | The OAuth 2.0 Client ID for authenticating with Akamai API Security                                                                                                           |
| akamai.clientSecret            |         | The OAuth 2.0 Client Secret for authenticating with Akamai API Security                                                                                                       |
| akamai.groups                  |         | Array of Akamai group names to monitor (Required - at least one group must be specified)                                                                                      |
| akamai.pollInterval            | 1h      | The frequency the agent polls Akamai for API discovery, metrics collection, compliance and conformance checks                                                                  |
| akamai.complianceFrequency     | 12h     | How often the agent will calculate a traffic-weighted compliance risk score and send to Engage                                                                                 |
| akamai.conformanceFrequency    | 24h     | How often the agent will run conformance analysis and send results to Engage                                                                                                   |
| akamai.segmentLength           | 2       | Controls API grouping by path segments for discovery organization (0=host only, 1="/api", 2="/api/v1", etc.)                                                                  |
| akamai.tokenRefreshInterval    | 55m     | OAuth 2.0 token refresh interval to maintain authentication                                                                                                                    |
| akamai.httpTimeout             | 30s     | HTTP client timeout for Akamai API requests                                                                                                                                    |
| akamai.environmentMapping      |         | An array of objects with an Amplify Engage Environment (key: `amplify`) Name with an Akamai group (key: `akamaiGroupName`) Name, for API discovery and conformance analysis   |

## Step 1: Create directory

Create an empty directory where Axway Central CLI will generate files. Run all Axway Central CLI from this directory.

## Step 2: Run the agents' configure procedure

The Axway Central CLI will guide you through the configuration of the agents.

The agents' configuration will be installed in the directory from where the CLI runs.

```shell
axway central install agents
```

If your Amplify subscription is hosted in the EU region, run this command to start the configuration procedure:

```shell
axway central install agents --region=EU
```

If your Amplify subscription is hosted in the APAC region, run this command to start the configuration procedure:

```shell
axway central install agents --region=AP
```

The installation procedure will prompt for the following:

1. Select the type of gateway you want to connect to (Akamai in this scenario).
2. Select the type of deployment for the Akamai agent (helm or docker).
3. Platform connectivity:
   * **Environment**: can be an existing environment or one that will be created by the installation procedure
        * **Environment Mapping**: choose from existing environments that have Managed APIs and inform the agent of the Akamai group that is linked
   * **Team**: can be an existing team or one that will be created by the installation procedure
   * **Service account**: can be an existing service account created in Amplify. The installation procedure creates a service account that can be used only with Amplify Engage. If you choose an existing service account, be sure you have the appropriate public and private keys, as they will be required for the agent to connect to the Amplify platform. If you choose to create one, the generated private and public keys will be provided.
4. Akamai API Security configuration setup options:
   * **Namespace**: can be an existing namespace or a new one that will be created by the installation procedure in the Kubernetes cluster (Helm install only)
   * **Groups**: the specific Akamai group names to monitor for API discovery (required)
   * **Client ID**: the OAuth 2.0 Client ID for Akamai API Security
   * **Client Secret**: the OAuth 2.0 Client Secret for Akamai API Security
   * **Segment Length**: the path segment grouping level for API discovery (default: 2, where 0=host only, 1="/api", 2="/api/v1")
   * **Token Refresh Interval**: OAuth 2.0 token refresh frequency to maintain authentication (default: 55m)
5. Traceability module connectivity:
   * Traceability Agent protocol (Lumberjack (tcp) by default recommended for production environment or HTTPs recommended for testing purpose), select between `Lumberjack` or `HTTPS`

Once you have answered all questions, the agent installation performs the following operations:

* The Amplify Engage resources are created/updated
* If chosen, a new Amplify Platform service account is created and a public/private key pair is generated
* If chosen, a new namespace is created in the Kubernetes cluster
* The Kubernetes secret with key pair for the Amplify Platform service account is created in the selected namespace
* The Kubernetes secret with Akamai authentication configuration is created in the selected namespace
* The agent Helm override file is generated

The current directory will contain the following files after the agent installation is completed:

```shell
agent-overrides.yaml
private_key.pem          * newly created service account only
public_key.pem           * newly created service account only
```

`agent-overrides.yaml` contains the specific configuration you entered during the installation procedure. These files are required to start the agents.

`private_key.pem` and `public_key.pem` are the generated key pair the agent will use to securely talk with the Amplify platform (if you choose to let the installation generate them).

## Step 3a: Deploy the agent in Docker

The installation summary contains the Docker command needed to finish the installation.

By default, the Docker commands are configured to use the latest available agent version. If you want to use a different version, verify the available version in the agent release note.

```shell
To complete the Akamai agent installation, run the following commands:
  docker run --env-file "$(pwd)"/akamai.env -v "$(pwd)":/keys -v /data {agentImage}
```

Once the commands are completed, the agents should be running in the Docker server.

## Step 3b: Deploy the agent in Kubernetes cluster

The installation summary contains the Helm command needed to finish the installation.

By default, the Helm commands are configured to use the latest available agent version. If you want to use a different version, verify the available version in the agent release note.

```shell
To complete the Akamai agent installation, run the following commands:
  helm repo add axway https://helm.repository.axway.com --username=<client_id> --password=<client_secret>
  helm repo update
  helm upgrade --install --namespace agents-amplify akamai-agent axway/akamai-agent -f agent-overrides.yaml

* client_id - service account id for your Amplify Platform organization
* client_secret - service account secret for your Amplify Platform organization
```

Once the Helm commands are completed, the agents should be running in the Kubernetes cluster.

### Set up secrets for private repositories

To deploy an image stored in a private repository, you must create a kubernetes secret and set up the `pullSecret` field in the `image` section in the override file.
This is necessary for both the Discovery and Traceability agents.

Kubernetes command to create secret:

```bash
kubectl create secret docker-registry <SECRET_NAME> --namespace <YOUR_NAMESPACE> --docker-server=docker.repository.axway.com --docker-username=<client_id> --docker-password=<client_secret>
```

`client_id` - service account id for an Amplify Platform organization that has access to that artifact
`client_secret` - service account secret for an Amplify Platform organization that has access to that artifact

In overrides.yaml:

```bash
image:
  pullSecret: <SECRET_NAME>
```

Agent deployment commands:

```bash
helm repo add axway https://helm.repository.axway.com --username==<client-id> --password=<client_secret>
helm repo update
helm upgrade --install --namespace <YOUR_NAMESPACE> akamai-agent axway/akamai-agent -f agent-overrides.yaml --set image.pullSecret=<image-pull-secret-name>
```

## Step 4: Check that agents are running with Axway Central CLI

After being authenticated to the platform with `axway auth login` command, run the following to check that the agents are running:

* `axway central get ta` to get all Traceability Agent information
* `axway central get da` to get all Discovery Agent information

The STATUS column will help you identify which agent is running.

```shell
C:\Demos>axway central get da
✔ Resource(s) successfully retrieved

NAME        AGE            TITLE         RESOURCE KIND     SCOPE KIND   SCOPE NAME  RESOURCE GROUP  DATAPLANE TYPE  STATUS
akamai-da   3 hours ago    akamai-da     DiscoveryAgent    Environment  akamai      management      Akamai          running

C:\Demos>axway central get ta
✔ Resource(s) successfully retrieved

NAME        AGE            TITLE         RESOURCE KIND      SCOPE KIND   SCOPE NAME  RESOURCE GROUP  DATAPLANE TYPE  STATUS
akamai-ta   3 hours ago    akamai-ta     TraceabilityAgent  Environment  akamai      management      Akamai          running
```

## Agent capabilities and features

### Discovery capabilities

* **API Endpoint Discovery**: Automatically discovers all APIs monitored by Akamai API Security using `GetAPIsWithGrouping`
* **Segment-based Organization**: Organizes APIs by configurable path segment grouping (0=host only, 1="/api", 2="/api/v1", etc.)
* **Unified Specification Generation**: Creates environment-level OpenAPI specifications from discovered APIs using `GenerateSpecFromTraffic`
* **OAuth 2.0 Authentication**: Secure authentication with automatic token refresh capabilities
* **Change Detection**: Monitors for API changes and updates specifications accordingly using traceable-agent patterns
* **Environment Mapping**: Links Amplify environments to Akamai groups for accurate discovery scope
* **Multi-Group Support**: Monitors multiple Akamai groups simultaneously for comprehensive API coverage

### Compliance capabilities

* **Traffic-weighted Risk Scoring**: Calculates risk scores using actual API traffic volumes from `/api/v3/apis/metrics` endpoint
* **Business Formula Implementation**: Uses `sum(apiRiskScore * apiCallVolume) / numberOfEndpoints` for accurate assessment
* **Real-time Metrics Integration**: Leverages Akamai's metrics API with checkpoint-based time window management
* **Intelligent Error Handling**: Gracefully handles metrics API unavailability by skipping unavailable APIs
* **Per-API Analysis**: Individual API endpoint risk assessment and scoring with comprehensive logging
* **Progressive Data Collection**: Uses checkpoint data for consistent time windows across agent executions

### Conformance capabilities

* **Real-time Analysis**: Direct integration with Akamai APIs using synchronous processing
* **Comprehensive State Handling**: Manages Matched, No Risk, Sensitive, Required, Not Matched, Conflicting, and Pending states
* **Traffic-based Validation**: Compares API specifications against actual traffic patterns
* **Shadow API Detection**: Identifies undocumented APIs with active traffic
* **Orphan API Detection**: Identifies documented APIs with no traffic
* **Issue Classification**: Detailed reporting of specification mismatches and compliance issues

## Troubleshooting

### Common issues

#### Agent not starting

* Verify Akamai credentials are correct (clientId and clientSecret)
* Check network connectivity to Akamai API Security platform
* Ensure all required environment variables are set (baseUrl, clientId, clientSecret, groups)
* Verify at least one group is specified in the groups configuration
* Check that the base URL format is correct (e.g., `https://your-account.luna.akamaiapis.net`)

#### Discovery not finding APIs

* Verify environment mapping configuration between Amplify and Akamai groups
* Check Akamai group permissions and access rights
* Validate segment length configuration is appropriate for your API structure (0=host only, 1="/api", 2="/api/v1")
* Ensure the specified groups contain APIs that are actively monitored by Akamai
* Check agent logs for OAuth 2.0 authentication issues

#### Metrics not available

* Ensure your Akamai account has access to the `/api/v3/apis/metrics` endpoint
* Verify API traffic exists for the monitored endpoints within the time window
* Check if metrics collection is enabled in Akamai API Security
* Review checkpoint data to ensure reasonable time windows for metrics collection
* Verify the tokenRefreshInterval is set appropriately (default: 55m)

#### OAuth 2.0 Authentication issues

* Verify client credentials are valid and have not expired
* Check that the client has appropriate permissions for API discovery and metrics access
* Ensure tokenRefreshInterval is configured properly for automatic token renewal
* Review agent logs for specific OAuth 2.0 error messages

#### Conformance analysis issues

* Verify API specifications are properly published in Amplify
* Check environment mapping between Amplify and Akamai groups matches your setup
* Ensure APIs have sufficient traffic for meaningful conformance analysis
* Validate that the `GenerateSpecFromTraffic` method can access required Akamai data

For additional support, please contact Axway support or refer to the Amplify documentation.
