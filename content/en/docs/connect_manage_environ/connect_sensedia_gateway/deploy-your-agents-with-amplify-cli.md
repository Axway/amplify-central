---
title: Deploy your agents
linkTitle: Deploy your agents  
draft: false
weight: 20
---
Deploy your Discovery Agent and Traceability Agent using Docker containers so that you can manage your Sensedia API Gateway environment within Amplify.

Once agents are correctly deployed, they can collect the data from the Sensedia API Gateway and send it securely to Amplify.

## Before you start

* Read [Amplify Sensedia API Gateway connected overview](/docs/connect_manage_environ/connect_sensedia_gateway/)
* [Prepare Amplify](/docs/integrate_with_central/cli_central/cli_install/)
* [Prepare Sensedia API Gateway](/docs/connect_manage_environ/connect_sensedia_gateway/administration-operation/)
* Docker must be installed and you will need a basic understanding of Docker commands
* You will need information on Sensedia API Gateway:
    * The Sensedia platform URL (e.g., `https://platform-production.sensedia.com`)
    * Authentication credentials: either Client ID and Client Secret (OAuth) or static token
    * Configured environments (if filtering by environment)

## Objectives

Learn how to create your Discovery Agent and Traceability Agent configuration files, then install and run your agents using either Axway Central CLI or Docker containers directly.

## Discovery Agent

The Discovery Agent is used to discover new APIs from Sensedia API Gateway. Once they are discovered, the related APIs are published to Amplify so that they become available for any consumer.

The Discovery Agent discovers APIs based on tags defined in the agent configuration file. See SENSEDIA_FILTER.

### Create your Discovery Agent configuration

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

| Variable name                  | Description                                                                                                                                                                 |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SENSEDIA_BASEURL               | The base URL of the Sensedia platform API Manager (e.g., `https://platform-production.sensedia.com`).                                                                       |
| SENSEDIA_AUTH_CLIENTID         | The Client ID for OAuth authentication with Sensedia. Either use this with CLIENTSECRET or use TOKEN.                                                                       |
| SENSEDIA_AUTH_CLIENTSECRET     | The Client Secret for OAuth authentication with Sensedia. Either use this with CLIENTID or use TOKEN.                                                                       |
| SENSEDIA_AUTH_TOKEN            | The static authentication token for Sensedia. Either use this or use CLIENTID with CLIENTSECRET.                                                                            |
| SENSEDIA_DEVELOPEREMAIL        | Developer email for application creation in Sensedia.                                                                                                                       |
| SENSEDIA_FILTER                | Filter condition expression for discovering APIs based on tags. The conditional expression must have "tag" as the prefix/selector. For example, `tag.Axway_axway.Exists()`. |
| SENSEDIA_DISCOVERYIDENTITYAPIS | When set to true, the agent will discover Identity APIs. Default is false.                                                                                                  |
| SENSEDIA_DISCOVERYPRIVATEAPIS  | When set to true, the agent will discover Private APIs. Default is false.                                                                                                   |
| SENSEDIA_ENVIRONMENTS          | Comma-separated list of Sensedia environments to filter for discovery (e.g., `Production,Development`).                                                                     |
| SENSEDIA_POLLINTERVAL          | The interval at which to poll Sensedia for changes (ns - default, us, ms, s, m, h). Default is 5m.                                                                          |

### Create your Discovery Agent environment file

Create a configuration file using the above variables. See the variable descriptions for their values. Below is a sample of what the configuration file will look like.

For example:

```yaml
# Sensedia connectivity
SENSEDIA_BASEURL=<YOUR_SENSEDIA_PLATFORM_URL>

# Option 1: OAuth authentication 
SENSEDIA_AUTH_CLIENTID=<YOUR_SENSEDIA_CLIENT_ID>
SENSEDIA_AUTH_CLIENTSECRET=<YOUR_SENSEDIA_CLIENT_SECRET>

# Option 2: Static token authentication - use instead of Option 1
# SENSEDIA_AUTH_TOKEN=<YOUR_STATIC_TOKEN>

SENSEDIA_DEVELOPEREMAIL=<YOUR_DEVELOPER_EMAIL>
SENSEDIA_FILTER=tag.Axway_axway.Exists()
SENSEDIA_POLLINTERVAL=30s

# Amplify connectivity
CENTRAL_ORGANIZATIONID=<YOUR_ORGANIZATION_ID>
CENTRAL_TEAM=<THE_TEAM_NAME>
CENTRAL_ENVIRONMENT=<NAME_OF_THE_CENTRAL_TOPOLOGY_ENVIRONMENT>
CENTRAL_AUTH_CLIENTID=<SERVICE_ACCOUNT_NAME>

LOG_LEVEL=info
LOG_OUTPUT=stdout
LOG_PATH=logs
```

### Install and run Discovery Agent

1. Copy the `private_key.pem` and `public_key.pem` files that were originally created when you set up your service account to a keys directory. Make sure the directory is located on the machine being used for deployment.
2. Find the current agent release in the [agent release note](/docs/amplify_relnotes).
   Go to *Help menus > Downloads > Repository*
     -or-
   Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents)
   and search for the Docker image for the most recent agents to download as `{agentImage}`.
   Then replace `{agentImage}` with the current agent release in the following sections.
3. Create a data directory where the agent will store cache data to persist on restarts.
4. Start the Discovery Agent pointing to the `env_vars` file and the keys directory:

    ```bash
    docker run --env-file ./env_vars -v <pwd>/keys:/keys  -v <pwd>/data:/data {agentImage}
    ```

    `pwd` relates to the local directory where the docker command is run. For Windows, the absolute path is preferred.

5. Run the following health check command to ensure the agent is up and running (continuous mode):

   ```bash
   docker inspect --format='{{json .State.Health}}' <container>
   ```

## Traceability Agent

The Traceability Agent is used to filter the transaction logs from Sensedia API Gateway and prepare the transaction events that are sent to Amplify platform. Each time an API is called by a consumer, an event (summary + detail) is sent to Amplify and is visible in Business Insights.

### Create your Traceability Agent configuration

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

| Variable name                  | Description                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| SENSEDIA_BASEURL               | The base URL of the Sensedia platform API Manager (e.g., `https://platform-production.sensedia.com`).                                             |
| SENSEDIA_AUTH_CLIENTID         | The Client ID for OAuth authentication with Sensedia. Either use this with CLIENTSECRET or use TOKEN.                                             |
| SENSEDIA_AUTH_CLIENTSECRET     | The Client Secret for OAuth authentication with Sensedia. Either use this with CLIENTID or use TOKEN.                                             |
| SENSEDIA_AUTH_TOKEN            | The static authentication token for Sensedia. Either use this or use CLIENTID with CLIENTSECRET.                                                  |
| SENSEDIA_ENVIRONMENTS          | Comma-separated list of Sensedia environments to monitor for traceability (e.g., `Production,Development`).                                       |
| SENSEDIA_POLLINTERVAL          | The interval at which to poll Sensedia for transaction data (ns - default, us, ms, s, m, h). Default is 5m.                                       |
| SENSEDIA_SENDALLTRAFFIC        | When set to true, the agent will send all API traffic to be reported. When set to false, only discovered APIs will be reported. Default is false. |
| SENSEDIA_TRACEABILITYBATCHSIZE | The batch size for traceability API calls. Controls how many records are fetched per page. Default is 500. Range: 1-1000.                         |
| SENSEDIA_TIMEOFFSET            | Time offset to subtract from current time when querying for traceability data to account for processing delays. Default is 10m. Range: 1m-60m.    |

### Create your Traceability Agent environment file

Create a configuration file using the above variables. See the variable descriptions for their values. Below is a sample of what the configuration file will look like.

For example:

```yaml
# Sensedia connectivity
SENSEDIA_BASEURL=<YOUR_SENSEDIA_PLATFORM_URL>

# Option 1: OAuth authentication
SENSEDIA_AUTH_CLIENTID=<YOUR_SENSEDIA_CLIENT_ID>
SENSEDIA_AUTH_CLIENTSECRET=<YOUR_SENSEDIA_CLIENT_SECRET>

# Option 2: Static token authentication - use instead of Option 1
# SENSEDIA_AUTH_TOKEN=<YOUR_STATIC_TOKEN>

SENSEDIA_ENVIRONMENTS=Production,Development
SENSEDIA_POLLINTERVAL=5m
SENSEDIA_TRACEABILITYBATCHSIZE=500
SENSEDIA_TIMEOFFSET=10m

# Amplify connectivity
CENTRAL_ORGANIZATIONID=<YOUR_ORGANIZATION_ID>
CENTRAL_TEAM=<THE_TEAM_NAME>
CENTRAL_ENVIRONMENT=<NAME_OF_THE_CENTRAL_TOPOLOGY_ENVIRONMENT>
CENTRAL_AUTH_CLIENTID=<SERVICE_ACCOUNT_NAME>

LOG_LEVEL=info
LOG_OUTPUT=stdout
LOG_PATH=logs
```

### Install and run Traceability Agent

1. Copy the `private_key.pem` and `public_key.pem` files that were originally created when you set up your service account to a keys directory. Make sure the directory is located on the machine being used for deployment.
2. Find the current agent release in the [agent release note](/docs/amplify_relnotes).
   Go to *Help menus > Downloads > Repository*
     -or-
   Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents)
   and search for the Docker image for the most recent agents to download as `{agentImage}`
   Then replace `{agentImage}` with the current agent release in following sections.
3. Create a data directory where the agent will store cache data to persist on restarts.
4. Start the Traceability Agent pointing to the `env_vars` file and the `keys` directory. Note that `pwd` relates to the local directory where the docker command is run. For Windows, the absolute path is preferred.

   ```bash
   docker run --env-file ./env_vars -v <pwd>/keys:/keys -v <pwd>/data:/data {agentImage}
   ```

5. Run the following health check command to ensure the agent is up and running:

   ```bash
   docker inspect --format='{{json .State.Health}}' <container>
   ```

## Deploy with Axway Central CLI

Alternatively, you can use Axway Central CLI to configure the agents. This CLI will prompt you for answers regarding your Sensedia Gateway installation, the service account used to ensure the connectivity from the agent to the Amplify platform, and where to store the discovered APIs in the Amplify platform.

### Agent configuration machine pre-requisites

* Any machine (Windows / Linux / Mac) where:
    * You can access platform.axway.com, login.axway.com and repository.axway.com on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)
* An Amplify platform user account that has the **Platform Administrator** and **Engage Admin** roles
* An Amplify platform service account to run the configuration in headless mode (optional)

## Agent runner machine pre-requisites

The agents run on Docker containers and must have access to:

* The platform URLs described in [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/) either directly or via a proxy
* Sensedia API Gateway API Manager endpoints

### Step 1: Install Axway Central CLI

Follow the instructions described in [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

You can validate that your installation by running: `axway engage --version`.

### Step 2: Folder preparation

Create an empty directory where Axway CLI will generate files. Run all Axway Central CLI from this directory.

### Step 3: Identify yourself to Amplify platform with Axway CLI

There are two ways to authenticate with Axway CLI:

* With an administrator username/password via a browser
* With a platform service account and a username/password via a prompt

#### Default mode with browser authentication

Run the following command to use Central CLI to log in with your Amplify platform credentials:

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

### Step 4: Run the agents' configure procedure

Sensedia agents are delivered in Docker images provided by Axway. You can run them from any Docker environment that can access the Amplify platform and Sensedia API Gateway.

For additional information, see [Add configuration to your agents with Axway Central CLI](/docs/integrate_with_central/cli_central/cli_embedded_agent_config/).

To start the configuration procedure, run the following command:

```shell
axway engage install agents
```

If your Amplify subscription is hosted in the EU region, run the following installation command to start the configuration procedure:

```shell
axway engage install agents --region=EU
```

If your Amplify subscription is hosted in the APAC region, run the following installation command to start the configuration procedure:

```shell
axway engage install agents --region=AP
```

The installation procedure will prompt for the following:

1. Select the type of gateway you want to connect to (Sensedia API Gateway in this scenario).
2. Platform connectivity:
   * **Environment**: can be an existing environment or one that will be created by the installation procedure
   * **Team**: can be an existing team or one that will be created by the installation procedure
   * **Service account**: can be an existing service account created in the Amplify platform. The installation procedure creates a service account that can be used only with Amplify Engage. If you choose an existing service account, be sure you have the appropriate public and private keys, as they will be required for the agent to connect to the Amplify platform. If you choose to create one, the generated private and public keys will be provided.
3. Sensedia Configuration Setup options:
   * **Platform URL**: Sensedia platform base URL (e.g., `https://platform-production.sensedia.com`)
   * **Authentication Method**: Choose between OAuth or Static Token
      * **OAuth**: Client ID and Client Secret
      * **Static Token**: Authentication token
   * **Environments**: Comma-separated list of environment names (e.g., `Producao,Development`)
   * **Discovery Identity APIs**: Whether to discover identity APIs (true/false)
   * **Discovery Private APIs**: Whether to discover private APIs (true/false)
   * **Developer Email**: Email address to associate with applications created by the agent

Once you have answered all questions, the agents' configuration files are updated, the Amplify Engage resources are created and the key pair is generated (if you chose to create a new service account).

The current directory contains the following files:

```shell
da_env_vars.env
ta_env_vars.env
private_key.pem
public_key.pem
```

`da_env_vars.env` / `ta_env_vars.env` contains the specific configuration you entered during the installation procedure. These files are required to start the agents.

`private_key.pem` and `public_key.pem` are the generated key pair the agent will use to securely talk with the Amplify platform (if you choose to let the installation generate them).

### Step 5: Deploy the agent in Docker containers

The installation summary contains the Docker commands needed to finish the installation.

Example:

```shell
To complete the install, run the following Docker commands:
  - Find the current agent release for the Discovery and Traceability agents in the [agent release note](/docs/amplify_relnotes).
    Go to *Help menus > Downloads > Repository* 
     -or-
    Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents)
    and search for Docker Image for the most recent agents.
    Download the image of each Discovery Agent `{agentDAImage}` and Traceability Agent `{agentTAImage}`.  Then replace the `{agentXXImage}` with the current agent release in the following sections.
  - Run the latest Discovery Agent:
    docker run --env-file "$(pwd)"/da_env_vars.env -v "$(pwd)"/keys:/keys \
        -v "$(pwd)"/data:/data {agentDAImage}
  - Run the latest Traceability Agent:
    docker run --env-file "$(pwd)"/ta_env_vars.env -v "$(pwd)"/keys:/keys \
        -v "$(pwd)"/data:/data {agentTAImage}
```

In the sample above, the installation procedure will replace `{agentXXImage}` with the most recent version available.

* Find the current agent release for the Discovery and Traceability agents in the [agent release note](/docs/amplify_relnotes).
    Go to *Help menus > Downloads > Repository*
     -or-
    Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents)
    and search for the Docker image for the most recent agents.
    Download the image of each Discovery Agent `{agentDAImage}` and Traceability Agent `{agentTAImage}`.  Then replace the `{agentXXImage}` with the current agent release in the following sections.
* Run the current images of the Discovery/Traceability Agents:
    * These two commands run the Docker Containers using the created environment files, and mounting the directory of the location of the appropriate keys, `public_key.pem` & `private_key.pem`, which were either generated during the installation, or available from an existing service account.

Once the Docker containers are running, the agents should be operational.

See [Administer Sensedia Gateway](/docs/connect_manage_environ/connect_sensedia_gateway/administration-operation/) for additional information about agent features.

## Check that agents are running with Axway Central CLI

After being authenticated to the platform with the `axway auth login` command, run the following:

* `axway engage get da,ta` to get both Discovery and Traceability Agent information

The STATUS column will help you identify which agent is running.

```shell
C:\Demos>axway engage get da,ta
√ Resource(s) successfully retrieved

NAME            DATAPLANE TYPE  STATUS   RESOURCE KIND      SCOPE KIND   SCOPE NAME      RESOURCE GROUP
sensedia-da     Sensedia        running  DiscoveryAgent     Environment  sensedia-prod   management
sensedia-ta     Sensedia        running  TraceabilityAgent  Environment  sensedia-prod   management
```

See [Administer Sensedia Gateway](/docs/connect_manage_environ/connect_sensedia_gateway/administration-operation/) for additional information about agent features.
