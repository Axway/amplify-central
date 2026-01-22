---
title: Configure Akamai runtime compliance
linkTitle: Configure Akamai runtime compliance
weight: 30
---

Configure your runtime compliance and conformance analysis with the Axway Central CLI and Akamai

## Before you start

* Identify existing Amplify environments that Akamai API Security monitors API calls for
* Create a service account in Akamai API Security to obtain OAuth 2.0 credentials (see [Create Akamai service account](#create-akamai-service-account))
* Gather the following information that will be used by the agent to communicate with Akamai:
    * The Akamai API Security base URL for your account (e.g., `https://your-account.luna.akamaiapis.net`)
    * Client ID and Client Secret for OAuth 2.0 authentication with Akamai API Security
    * Akamai group names that contain the APIs you want to monitor
    * Environment group mappings between Amplify environments and Akamai groups
* Ensure you have the following tools installed:
    * The Axway Central CLI
    * Amplify platform connectivity (required to configure the Akamai agent)

### Create Akamai service account

To connect the Akamai agents to your Akamai API Security platform, create a service account with the appropriate permissions. This service account will provide the OAuth 2.0 Client ID and Client Secret required for authentication.

#### Prerequisites for Akamai service account

* Administrative access to your Akamai API Security platform
* Permissions to create API clients and manage service accounts
* Knowledge of which Akamai groups contain the APIs you want to monitor

#### Steps to create the service account

1. Log in to Akamai API Security platform:
   * Navigate to your Akamai API Security dashboard
   * Use your administrative credentials to access the platform

2. Access Service Accounts section:
   * Navigate to *Identity and Access Management* > *Service Accounts*, or go directly to `/user-management/service-accounts`
   * Look for the option to create a new API client or service account

3. Create a new OAuth 2.0 client:
   * Click **Create service account**
   * Enter a descriptive name for your client (e.g., "Amplify Akamai Agent")
   * Select **Service Account** as the client type

4. Configure client permissions:
   * Select the permission level for the service account. Available options are:
     * **Admin** (Recommended): Full access to all APIs, groups, metrics, and configuration
     * **Contributor**: Read and write access to most resources
     * **Participant**: Limited read and write access
     * **Viewer**: Read-only access

      We recommend selecting Admin** to ensure the agent has access to all required functionality including:
     * API discovery and group information
     * API traffic metrics (`/api/v3/apis/metrics`)
     * OpenAPI specification generation from traffic data
     * Group configurations and mappings
   * Ensure the client has access to all groups you want to monitor

5. Generate credentials:
   * Complete the client creation process
   * Copy and securely store the Client ID and Client Secret - you will need these for agent configuration
   * The Client Secret will only be displayed once, so save it immediately

6. Verify API access:
   * Test the credentials by making a sample API call to verify connectivity:</br>

   ```bash
   # Test authentication (replace with your actual credentials and base URL)
   curl -X POST "https://your-account.luna.akamaiapis.net/auth/token" \
     -H "Content-Type: application/json" \
     -d '{
       "client_id": "your-client-id",
       "client_secret": "your-client-secret"
     }'
   ```

   * Verify you receive an access token in the response

7. Note your base URL:
   * Record your Akamai API Security base URL (typically in the format: `https://your-account.luna.akamaiapis.net`)
   * This will be used as the `AKAMAI_BASEURL` in your agent configuration

#### Required information summary

After creating your service account, you should have:

| Information | Example | Usage |
|-------------|---------|-------|
| **Base URL** | `https://your-account.luna.akamaiapis.net` | Akamai API Security endpoint |
| **Client ID** | `781605bf18ce5f59400ea717ef17d90f7751b00f36e14272e668de1a4fb2674c` | OAuth 2.0 client identifier |
| **Client Secret** | `eb6f2737c2156822efa47ed84cc45577a35857d40bbe9b4056ce0f81c94d827529038fb34dd571f64f5e45216fc804598a106aaf79bd3217278835f81b1bb6f2` | OAuth 2.0 client secret (sensitive) |
| **Groups** | `production-apis`, `staging-apis` | Akamai group names to monitor |

{{< alert title="Note" color="danger" >}}
**Security Note**</br>Store the Client Secret securely. It provides access to your Akamai API Security data and should be treated as a sensitive credential. Never commit it to source control or share it in plain text.
{{< /alert >}}

## Objectives

* Learn the benefits of integrating Amplify Engage with Akamai API Security
* Learn how to install and configure the Akamai agents for runtime compliance and conformance analysis

## Benefits of Akamai integration

Integrating Amplify Engage with Akamai API Security will bring many benefits, including: discovery of API endpoints being monitored in real time, metrics for the usages of those endpoints, traffic-weighted risk score calculations, and conformance analysis results.

### Discovery of Akamai API endpoints

The discovery process occurs during each polling interval of your Amplify Akamai agent. The agent retrieves all APIs from Akamai API Security that are being monitored for your configured groups, organizes them by host and path segments based on the configured segment length, and creates unified OpenAPI specification documents representing all API traffic that Akamai has observed for each environment. These discovered APIs are represented in Amplify Engage as API services where you can observe the specifications derived from real-time monitoring data.

### Traffic metrics for Akamai API endpoints

Along with the discovery process, the Amplify Akamai agent also reports metrics against the API services from the real-time data that Akamai API Security has captured. This will help you visualize the API traffic that Akamai has captured against the traffic that your Managed Gateway has reported in one place.

### Compliance risk scoring

On a set frequency, the Amplify Akamai agent calculates a traffic-weighted risk score for your APIs. This score uses the business formula: `sum(apiRiskScore * apiCallVolume) / numberOfEndpoints` to provide accurate risk assessment based on actual API usage patterns. The agent normalizes the risk score to accepted Amplify values (between 0 and 5). The risk score and grade will inform you about how at risk a certain environment is based on the traffic patterns and security posture of APIs in that environment. This risk score is visualized under the API services the Amplify Akamai agent creates. See `AKAMAI_COMPLIANCEFREQUENCY` in [Environment Variables](#environment-variables) for configuration.

### Conformance analysis

The Amplify Akamai agent will keep you informed on how well your API specifications compare to real-time API data as seen by Akamai API Security. By linking your managed environments (via other Amplify agents) to Akamai environments, the process is handled for you automatically.

* The Amplify Akamai agent will find all API specs on Amplify and cross-reference them with Akamai API Security data
* On the set frequency (See `AKAMAI_CONFORMANCEFREQUENCY` in [Environment Variables](#environment-variables)) the Amplify Akamai agent will run a conformance analysis using pure synchronous processing
* After completion, those analysis results are reflected in Amplify within the Environment details view for the Akamai environment

With the conformance analysis results, utilizing the API specifications provided by Engage and real-time traffic data from Akamai, you will see accurate results for the following:

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
    * Follow the instructions described in [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/)

The agent must have access to:

* The platform URLs described in [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/) either directly or via a proxy
* The Akamai API Security platform APIs

## Install as a SaaS agent

### Amplify Engage installation

The Akamai agent can be deployed completely within Amplify Engage. For installation, go to *Engage > Topology > Environments > Add New*. Follow the *Environment Creation* wizard and select "Akamai" as the **Environment Type**. The wizard will guide you through the installation process.

### Axway CLI installation

#### Step 1: Install Axway Central CLI

Follow the instructions described in [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

You can validate that your installation is correct by running: `axway central --version`.

#### Step 2: Identify yourself to Amplify platform with Axway CLI

There are two ways to authenticate with Axway CLI:

* Default mode: with an administrator username (email address) / password via a browser
* Headlessmode: with a platform service account and a username / password via a prompt

##### Default mode with browser authentication

Run the following command to use Axway Central CLI to log in with your Amplify platform credentials:

```shell
axway auth login
```

A browser will automatically open.
Enter your valid credentials (email address / password). Once the *Authorization Successful* message is displayed, go back to Axway CLI.

If you are a member of multiple Amplify organizations, you may have to choose an organization.

##### Headless mode authentication with service account

You must have a platform service account and a regular administrator account for the headless mode. The permissions of the service account will be overridden by the permission of the administrator account.

```shell
# command syntax: Log into a service account with platform tooling credentials:
axway auth login --client-id <id> --secret-file <path> --username <email>

# the command will prompt you to enter your username password
```

Sample:

```shell
axway auth login --client-id plsa_a1d6e0a8-XXXXX --secret-file /home/user/axway/SAKeysPlatformSA/private_key.pem --username admin@mail.com
AXWAY CLI, version 3.1.0
Copyright (c) 2018-2021, Axway, Inc. All Rights Reserved.

√ Password: · **********

You are logged into a platform account in organization Axway (a1d6e0a8-XXXXX) as admin@mail.com.
The current region is set to US.
```

If you are a member of multiple Amplify organizations, you may have to choose an organization using the `axway auth switch --org <orgId|orgName>` command.

#### Step 3: Run the agents' configure procedure

The Axway Central CLI will guide you through the configuration of the agents.

Agents' configurations will be installed in the directory from where the CLI runs.

```shell
axway central install agents
```

If your Amplify subscription is hosted in the EU region, run the following installation command to start the configuration procedure:

```shell
axway central install agents --region=EU
```

If your Amplify subscription is hosted in the APAC region, run the following installation command to start the configuration procedure:

```shell
axway central install agents --region=AP
```

The installation procedure will prompt for the following:

1. Select the type of gateway you want to connect to (Akamai in this scenario).
2. Select the type of deployment for the Akamai agents (helm or docker).
3. Platform connectivity:
   * **Environment**: Can be an existing environment or one that will be created by the installation procedure
        * **Environment Mapping**: Choose from existing environments that have Managed APIs and inform the agent of the Akamai group that is linked
   * **Team**: Can be an existing team or one that will be created by the installation procedure
   * **Service account**: Can be an existing service account created in Amplify. The installation procedure creates a service account that can be used only with Amplify Engage. If you choose an existing service account, be sure you have the appropriate public and private keys, as they will be required for the agent to connect to the Amplify platform. If you choose to create one, the generated private and public keys will be provided.
4. Akamai API Security configuration setup options:
   * **Namespace**: Can be an existing namespace or a new one that will be created by the installation procedure in the Kubernetes cluster (Helm install only)
   * **Base URL**: The Akamai API Security base URL for your account (e.g., `https://your-account.luna.akamaiapis.net`)
   * **Groups**: The specific Akamai group names to monitor for API discovery (required). Enter the exact group names from your Akamai platform
   * **Client ID**: The OAuth 2.0 Client ID for Akamai API Security (obtained from [Create Akamai service account](#create-akamai-service-account))
   * **Client Secret**: The OAuth 2.0 Client Secret for Akamai API Security (obtained from service account creation - keep secure)
   * **Segment Length**: The path segment grouping level for API discovery (default: 2, where 0=host only, 1="/api", 2="/api/v1")
5. Traceability module connectivity:
   * Traceability Agent protocol (Lumberjack (tcp) by default recommended for production environment or HTTPs recommended for testing purpose), select between `Lumberjack` or `HTTPS`

Once you have answered all questions, the Embedded agent will be created. The process will securely store the authentication data and validate it by connecting to your Akamai API Security platform.

## Install as an on-premise agent

### Identify yourself to Amplify platform with Axway CLI

There are two ways to authenticate with Axway CLI:

* Default mode: With an administrator username (email address) / password via a browser
* Headless mode: With a platform service account and a username / password via a prompt

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

### Docker deployment

For containerized agents, Docker must be installed and you will need a basic understanding of Docker commands

#### Environment variables

| Variable                                     | Default | Usage                                                                                                                                                                       |
| -------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AKAMAI_BASEURL                               |         | The base URL for your Akamai API Security account (e.g., `https://your-account.luna.akamaiapis.net`). See [Create Akamai service account](#create-akamai-service-account) |
| AKAMAI_CLIENTID                              |         | The OAuth 2.0 Client ID for authenticating with Akamai API Security. Obtained from your service account creation                                                          |
| AKAMAI_CLIENTSECRET                          |         | The OAuth 2.0 Client Secret for authenticating with Akamai API Security. Keep this secure and never commit to source control                                             |
| AKAMAI_POLLINTERVAL                          | 5m      | The frequency the agent polls Akamai for API discovery, metrics collection, compliance and conformance checks                                                           |
| AKAMAI_COMPLIANCEFREQUENCY                   | 12h     | How often the agent will calculate a traffic-weighted compliance risk score and send to Engage. (Lower Limit: 1h)                                                       |
| AKAMAI_CONFORMANCEFREQUENCY                  | 24h     | How often the agent will run conformance analysis against discovered APIs and send results to Engage. (Lower Limit: 1h)                                                 |
| AKAMAI_SEGMENTLENGTH                         | 2       | Controls API grouping by path segments (e.g., 0=host only, 1="/api", 2="/api/v1", 3="/api/v1/users"). Higher values provide more granular grouping.                    |
| AKAMAI_HTTPTIMEOUT                           | 30s     | HTTP client timeout for Akamai API requests                                                                                                                               |
| AKAMAI_ENVIRONMENTMAPPING_AMPLIFY_[INDEX]    |         | Amplify Engage Environment Name for environment mapping (used with corresponding AKAMAI entry)                                                                            |
| AKAMAI_ENVIRONMENTMAPPING_AKAMAI_[INDEX]     |         | Akamai group name for environment mapping (used with corresponding AMPLIFY entry)                                                                                         |

### Helm deployment

* Ensure you have the following tools installed:
    * Kubectl - compatible version with your Kubernetes cluster where Akamai agent will be deployed
    * Helm 3.2.4 or later
* Kubernetes context is set for the Kubernetes cluster where the agent will be deployed

#### Helm overrides

| Override                       | Default | Usage                                                                                                                                                                            |
| ------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| akamai.baseUrl                 |         | The base URL for your Akamai API Security account (e.g., `https://your-account.luna.akamaiapis.net`). See [Create Akamai service account](#create-akamai-service-account)    |
| akamai.clientId                |         | The OAuth 2.0 Client ID for authenticating with Akamai API Security. Obtained from your service account creation                                                               |
| akamai.clientSecret            |         | The OAuth 2.0 Client Secret for authenticating with Akamai API Security. Keep this secure and never commit to source control                                                  |
| akamai.pollInterval            | 5m      | The frequency the agent polls Akamai for API discovery, metrics collection, compliance and conformance checks                                                                  |
| akamai.complianceFrequency     | 12h     | How often the agent will calculate a traffic-weighted compliance risk score and send to Engage. (Lower Limit: 1h)                                                       |
| akamai.conformanceFrequency    | 24h     | How often the agent will run conformance analysis against discovered APIs and send results to Engage. (Lower Limit: 1h)                                                 |
| akamai.segmentLength           | 2       | Controls API grouping by path segments (e.g., 0=host only, 1="/api", 2="/api/v1", 3="/api/v1/users"). Higher values provide more granular grouping.                    |
| akamai.httpTimeout             | 30s     | HTTP client timeout for Akamai API requests                                                                                                                               |
| akamai.environmentMapping      |         | An array of objects with an Amplify Engage Environment (key: `amplify`) Name with an Akamai group (key: `akamaiGroupName`) Name, for API discovery and conformance analysis   |

## Install and Configure Akamai agents

Follow these steps to install and configure the Akamai agents.

### Step 1: Create directory

Create an empty directory where Axway Central CLI will generate files. Run all Axway Central CLI from this directory.

### Step 2: Run the agents' configure procedure

The Axway Central CLI will guide you through the configuration of the agents.

The agents' configuration will be installed in the directory from where the CLI runs.

```shell
axway engage install agents
```

If your Amplify subscription is hosted in the EU region, run this command to start the configuration procedure:

```shell
axway engage install agents --region=EU
```

If your Amplify subscription is hosted in the APAC region, run this command to start the configuration procedure:

```shell
axway engage install agents --region=AP
```

The installation procedure will prompt for the following:

1. Select the type of gateway you want to connect to (Akamai in this scenario).
2. Select the type of deployment for the Akamai agents (helm or docker).
3. Platform connectivity:
   * **Environment**: Can be an existing environment or one that will be created by the installation procedure
        * **Environment Mapping**: Choose from existing environments that have Managed APIs and inform the agent of the Akamai group that is linked
   * **Team**: Can be an existing team or one that will be created by the installation procedure
   * **Service account**: Can be an existing service account created in Amplify. The installation procedure creates a service account that can be used only with Amplify Engage. If you choose an existing service account, be sure you have the appropriate public and private keys, as they will be required for the agent to connect to the Amplify platform. If you choose to create one, the generated private and public keys will be provided.
4. Akamai API Security configuration setup options:
   * **Namespace**: Can be an existing namespace or a new one that will be created by the installation procedure in the Kubernetes cluster (Helm install only)
   * **Base URL**: The Akamai API Security base URL for your account (e.g., `https://your-account.luna.akamaiapis.net`)
   * **Groups**: The specific Akamai group names to monitor for API discovery (required). Enter the exact group names from your Akamai platform
   * **Client ID**: The OAuth 2.0 Client ID for Akamai API Security (obtained from [Create Akamai service account](#create-akamai-service-account))
   * **Client Secret**: The OAuth 2.0 Client Secret for Akamai API Security (obtained from service account creation - keep secure)
   * **Segment Length**: The path segment grouping level for API discovery (default: 2, where 0=host only, 1="/api", 2="/api/v1")
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

`private_key.pem` and `public_key.pem` are the generated key pair the agents will use to securely talk with the Amplify platform (if you choose to let the installation generate them).

### Step 3a: Deploy the agents in Docker

The installation summary contains the Docker command needed to finish the installation.

By default, the Docker commands are configured to use the latest available agents version. If you want to use a different version, verify the available version in the agents release note.

```shell
To complete the Akamai agents installation, run the following commands:
  docker run --env-file "$(pwd)"/akamai.env -v "$(pwd)":/keys -v /data {agentImage}
```

Once the commands are completed, the agents should be running in the Docker server.

### Step 3b: Deploy the agents in Kubernetes cluster

The installation summary contains the Helm command needed to finish the installation.

By default, the Helm commands are configured to use the latest available agents version. If you want to use a different version, verify the available version in the agents release note.

```shell
To complete the Akamai agents installation, run the following commands:
  helm repo add axway https://helm.repository.axway.com --username=<client_id> --password=<client_secret>
  helm repo update
  helm upgrade --install --namespace agents-amplify akamai-agent axway/akamai-agent -f agent-overrides.yaml

* client_id - service account id for your Amplify Platform organization
* client_secret - service account secret for your Amplify Platform organization
```

Once the Helm commands are completed, the agents should be running in the Kubernetes cluster.

#### Set up secrets for private repositories

To deploy an image stored in a private repository, you must create a Kubernetes secret and set up the `pullSecret` field in the `image` section in the override file.
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

### Step 4: Check that agents are running with Axway Central CLI

After being authenticated to the platform with `axway auth login` command, run the following to check that the agents are running:

* `axway engage get ta` to get all Traceability Agent information
* `axway engage get da` to get all Discovery Agent information

The STATUS column will help you identify which agent is running.

```shell
C:\Demos>axway engage get da
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

* **API Endpoint Discovery**: Automatically discovers all APIs monitored by Akamai API Security
* **Segment-based Organization**: Organizes APIs by configurable path segment grouping (0=host only, 1="/api", 2="/api/v1", etc.)
* **Unified Specification Generation**: Creates environment-level OpenAPI specifications from discovered APIs
* **OAuth 2.0 Authentication**: Secures authentication with automatic token refresh capabilities
* **Change Detection**: Monitors for API changes and updates specifications accordingly
* **Environment Mapping**: Links Amplify environments to Akamai groups for accurate discovery scope

### Compliance capabilities

* **Traffic-weighted Risk Scoring**: Calculates risk scores using actual API traffic volumes
* **Business Formula Implementation**: Uses `sum(apiRiskScore * apiCallVolume) / numberOfEndpoints` for accurate assessment
* **Real-time Metrics Integration**: Leverages Akamai's traffic metrics with checkpoint-based time window management
* **Intelligent Error Handling**: Gracefully handles metrics unavailability by skipping unavailable APIs
* **Per-API Analysis**: Individual API endpoint risk assessment and scoring with comprehensive logging
* **Progressive Data Collection**: Uses checkpoint data for consistent time windows across agent executions

### Conformance capabilities

* **Real-time Analysis**: Direct integration with Akamai for synchronous processing
* **Comprehensive State Handling**: Manages Matched, No Risk, Sensitive, Required, Not Matched, Conflicting, and Pending states
* **Traffic-based Validation**: Compares API specifications against actual traffic patterns
* **Shadow API Detection**: Identifies undocumented APIs with active traffic
* **Orphan API Detection**: Identifies documented APIs with no traffic
* **Issue Classification**: Detailed reporting of specification mismatches and compliance issues

## Common troubleshooting issues

### Agent not starting

* **Verify Akamai credentials**: Ensure the Client ID and Client Secret are correct and match what was generated during [service account creation](#create-akamai-service-account)
* **Test authentication manually**: Use a tool like cURL to verify your credentials work:
  ```bash
  curl -X POST "https://your-account.luna.akamaiapis.net/auth/token" \
    -H "Content-Type: application/json" \
    -d '{"client_id": "your-client-id", "client_secret": "your-client-secret"}'
  ```
* **Check network connectivity**: Ensure the agent can reach your Akamai API Security platform URL
* **Validate environment variables**: Confirm all required variables are set (baseUrl, clientId, clientSecret)
* **Verify group names**: Ensure group names match exactly what exists in your Akamai platform (not group IDs)
* **Check base URL format**: Confirm the URL follows the pattern `https://your-account.luna.akamaiapis.net`

### Discovery not finding APIs

* **Verify group access**: Log into Akamai API Security and confirm the service account has access to the specified groups
* **Check group API content**: Ensure the specified groups contain APIs that are actively monitored by Akamai
* **Test group discovery**: Use cURL to test group and API discovery:
  ```bash
  # Get groups (after obtaining token)
  curl -H "Authorization: Bearer YOUR_TOKEN" \
    "https://your-account.luna.akamaiapis.net/api/v3/groups"
  
  # Get APIs for a specific group
  curl -H "Authorization: Bearer YOUR_TOKEN" \
    "https://your-account.luna.akamaiapis.net/api/v3/apis?group=GROUP_ID"
  ```
* **Validate environment mapping**: Ensure environment mapping between Amplify and Akamai groups is correctly configured
* **Adjust segment length**: Try different segmentLength values (0=host only, 1="/api", 2="/api/v1") based on your API structure
* **Review agent logs**: Check for OAuth 2.0 authentication errors or API access permission issues

### Metrics not available

* **Verify metrics endpoint access**: Ensure your service account has permissions for `/api/v3/apis/metrics`
* **Check traffic existence**: Confirm API traffic exists for the monitored endpoints within the collection time window
* **Validate metrics API response**: Test metrics access manually:
  ```bash
  curl -H "Authorization: Bearer YOUR_TOKEN" \
    "https://your-account.luna.akamaiapis.net/api/v3/apis/metrics?group=GROUP_ID"
  ```
* **Review time windows**: Ensure checkpoint data provides reasonable time windows for metrics collection

### OAuth 2.0 Authentication issues

* **Validate service account permissions**: Ensure the Akamai service account has all required permissions:
    * API Discovery (read access to APIs and groups)
    * Metrics Access (read access to metrics endpoint)
    * Spec Generation (access to generate specifications from traffic)
* **Check token expiry**: Verify tokens are being refreshed before expiration
* **Review credential storage**: Ensure Client Secret is stored securely and not corrupted
* **Test token acquisition**: Manually test OAuth 2.0 flow using cURL
* **Check network issues**: Verify no firewalls or proxies are interfering with OAuth requests

### Group configuration issues

* **List available groups**: Use the Akamai API to get all available groups:
  ```bash
  curl -H "Authorization: Bearer YOUR_TOKEN" \
    "https://your-account.luna.akamaiapis.net/api/v3/groups"
  ```
* **Use exact group names**: Group names are case-sensitive and must match exactly
* **Verify group permissions**: Ensure the service account has read access to all specified groups
* **Check group content**: Confirm groups contain the APIs you want to monitor

### Conformance analysis issues

* **Verify API specifications**: Ensure API specifications are properly published in Amplify Engage
* **Check environment mapping**: Confirm mapping between Amplify environments and Akamai groups is accurate
* **Validate traffic requirements**: Ensure APIs have sufficient traffic for meaningful conformance analysis
* **Test specification generation**: Verify the service account has access to generate specifications from traffic data
* **Review analysis frequency**: Check if conformanceFrequency setting is appropriate for your use case

## Getting additional help

If you continue to experience issues:

1. **Check agent logs**: Review detailed logs for specific error messages and authentication failures
2. **Verify service account**: Confirm the Akamai service account has all required permissions in the API Security platform
3. **Test API access**: Use cURL commands to manually test connectivity and permissions
4. **Contact support**: Reach out to Axway support with specific error messages and configuration details

For additional support, please contact Axway support or refer to the Amplify documentation.
