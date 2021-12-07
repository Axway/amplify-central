---
title: Deploy your agents with Axway CLI
linkTitle: Deploy your agents with Axway CLI
draft: false
weight: 10
description: Learn how to deploy your agents using Axway CLI so that you can
  manage your Azure Gateway environment within Amplify Central.
---
## Before you start

* Read [Amplify Central Azure Gateway connected overview](/docs/connect_manage_environ/connect_azure_gateway/)
* You will need information on Azure:

    * where the API Service management is located (resource group name / API Management service name)
    * service principal for using to Azure APIs
    * event hub definition (namespace / name / policy).

* It is recommended that you have access to the Azure CLI command line to run the necessary setup commands

## Objectives

Learn how to quickly configure, install, and run your Discovery and Traceability agents with basic configuration using Axway Central CLI.

Axway Central CLI and Amplify platform connectivity are required to configure the agent.

1. Configure the agent from any machine that has access to the Amplify platform (<https://platform.axway.com>) and a graphical environment (optional).
2. Once the configuration is complete, the agent configuration must be copied to a Docker machine so that the Docker runner will find them.

## Agent configuration machine pre-requisites

* Any machine (Windows / Linux / Mac) where:
    * You can access platform.axway.com and login.axway.com on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)
    * You can use Kubernetes 1.19 (Helm install only)
* An Amplify platform user account that has the **Platform Administrator** and **Central Admin** roles
* An Amplify platform service account to run the configuration in headless mode (optional)

## Azure prerequisites

* An Azure Service principal
* An Azure Event Hub

## Agent runner machine pre-requisites

Azure agents are delivered in a Docker image provided by Axway. You can run them from any Docker container.

The agents must have access to:

* The platform URLs described in [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/) either directly or via a proxy
* Azure Gateway

## Configure the agents with Axway Central CLI

Use Axway Central CLI to configure the agents. This CLI will prompt you for answers regarding your Gateway installation, the service account used to ensure the connectivity from the agent to Amplify platform, and where to store the discovered APIs in the Amplify platform.

### Step 1: Install Axway Central CLI

Follow the instructions described in [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

You can validate that your installation is correct by running: `axway central --version`.

### Step 2: Folder preparation

Create an empty directory where Axway CLI will generate files. Run all Axway Central CLI from this directory.

### Step 3: Identify yourself to Amplify Platform with Axway CLI

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

The Axway Central CLI will guide you through the configuration of the agents.

Agents configuration will be installed in the directory from where the CLI runs.

```shell
axway central install agents
```

If your Amplify subscription is hosted in the EU region, then the following installation command must be used to correctly configure the agents:

```shell
axway central install agents --region=EU
```

The installation procedure will prompt for the following:

1. Select the type of gateway you want to connect to (Azure API Gateway in this scenario).
2. Select the agents you want to install: Discovery / Traceability / All Agents. **Note**: If you select Traceability **ONLY**, you must provide configurations for both Steps 4 and 5.
3. Platform connectivity:
   * **Environment**: can be an existing environment or a new one that will be created by the installation procedure
   * **Team**: can be an existing team or a new one that will be created by the installation procedure
   * **Service account**: can be an existing service account (from platform or Central). The installation procedure creates only a Central service account. If you choose an existing service account, be sure you have the appropriate public and private keys, as they will be required for the agent to connect to the Amplify Platform. If you choose to create a new one, the generated private and public keys will be provided.
4. Azure Discovery Agent Configuration Setup options:
   * **Tenant ID** can be found in the *Directory ID* box on the Properties page
   * **Subscription ID** is a GUID that uniquely identifies your subscription to use Azure services
   * **Service Principal Client ID** represents the application that needs to deploy or configure resources through Azure Resource Manager
   * **Service Principal Client Secret** is the authentication used for service principals
   * **Resource Group Name** is the representation of group related resources for your application
   * **API Management Service Name** refers to both the service and the corresponding Azure resource
5. Azure Traceability Agent Configuration Setup options:
   * **Event Hub Namespace** is the management container for one of multiple Event Hub instances
   * **Event Hub Name** associated with the subscription
   * **Policy Name** associated with the Event Hub
   * **Policy Key** associated with the Policy Name
6. Traceability module connectivity:
   * Traceability Agent protocol (Lumberjack (tcp) by default recommended for production environment or HTTPs recommended for testing purpose), select between `Lumberjack`, or `HTTPS`

Once you have answered all questions, the agents' configuration files are updated, the Amplify Central resources are created and the key pair is generated (if you chose to create a new service account).

The current directory contains the following files:

```shell
da_env_vars.env                   
ta_env_vars.env                   
private_key.pem          *newly created service account only
public_key.pem           *newly created service account only

```

`da_env_vars.env` / `ta_env_vars.env` contains the specific configuration you entered during the installation procedure. These files are required to start the agents.

`private_key.pem` and `public_key.pem` are the generated key pair the agent will use to securely talk with the Amplify Platform (if you choose to let the installation generate them).

### Step 5: Deploy the agent in Docker Container

The installation summary contains the Docker commands needed to finish the installation.

By default, the Docker commands are configured to use the latest available agents version. If you want to use a different version, verify the available version in the agent release note.

Sample:

```shell
To utilize the agents, pull the latest Docker images and
run them using the appropriate supplied environment files, (da_env_vars.env & ta_env_vars.env):

  - Pull the latest image of the Discovery Agent:
    docker pull axway.jfrog.io/ampc-public-docker-release/agent/azure-discovery-agent:1.1.6

  - Start the Discovery Agent:
    docker run --env-file "$(pwd)"/da_env_vars.env -v "$(pwd)":/keys \
        axway.jfrog.io/ampc-public-docker-release/agent/azure-discovery-agent:1.1.6

  - Pull the latest image of the Traceability Agent:
    docker pull axway.jfrog.io/ampc-public-docker-release/agent/azure-traceability-agent:1.1.6

  - Start the Traceability Agent:
    docker run --env-file "$(pwd)"/ta_env_vars.env -v "$(pwd)":/keys \
        axway.jfrog.io/ampc-public-docker-release/agent/azure-traceability-agent:1.1.6
```

* Pull the latest images of the Discovery/Traceability Agents:
    * These two commands pull the most recent released agents from docker pull axway.jfrog.io/ampc-public-docker-release/agent.
* Run the latest images of the Discovery/Traceability Agents:
    * These two commands run the Docker Containers using the created environment files, and mount the directory of the location of the appropriate keys, `public_key.pem` & `private_key.pem`, which were either generated during the installation, or available from an existing service account.

Once the pull and run commands are completed, the agents should be running in the Docker infrastructure.

See [Connect Azure Gateway](/docs/connect_manage_environ/connect_azure_gateway/) for additional information about connecting Azure API Management Services to Amplify Central.

## Check that agents are running with Axway Central CLI

After being authenticated to the platform with `axway auth login` command, run the following:

* `axway central get da` to get all Discovery Agent information
* `axway central get ta` to get all Traceability Agent information

The STATUS column will help you identify which agent is running.

```shell
C:\Demos>axway central get da
√ Resource(s) successfully retrieved

NAME                      DATAPLANE TYPE  STATUS     RESOURCE KIND   SCOPE KIND   SCOPE NAME        RESOURCE GROUP
lbean018-discovery        Edge            running    DiscoveryAgent  Environment  apigtw-v77        management
ec2-da                    AWS             stopped    DiscoveryAgent  Environment  awsgtw-us-west-1  management
azure-da                  Azure           running    DiscoveryAgent  Environment  azure-dev         management
```

```shell
C:\Demos>axway central get ta
√ Resource(s) successfully retrieved

NAME                         DATAPLANE TYPE  STATUS   RESOURCE KIND      SCOPE KIND   SCOPE NAME        RESOURCE GROUP
lbean018-traceability        Edge            running  TraceabilityAgent  Environment  apigtw-v77        management
ec2-ta                       AWS             stopped  TraceabilityAgent  Environment  awsgtw-us-west-1  management
azure-ta                     Azure           running  TraceabilityAgent  Environment  azure-dev         management
```

See [Connect Azure Gateway](/docs/connect_manage_environ/connect_azure_gateway/) for additional information about connecting Azure API Management Services to Amplify Central.
