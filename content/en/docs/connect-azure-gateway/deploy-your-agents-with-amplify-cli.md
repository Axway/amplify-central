---
title: Deploy your agents with Axway CLI
linkTitle: Deploy your agents with Axway CLI
draft: false
weight: 10
description: Learn how to deploy your agents using Axway CLI so that you can
  manage your Azure Gateway environment within Amplify Central.
---
## Before you start

* Read [Amplify Central Azure Gateway connected overview](/docs/connect-azure-gateway/)
* You will need information on Azure:

  * where the API Service management is located (resource group name / API Management service name)
  * service principal for using to Azure APIs
  * event hub definition (namespace / name / policy).

* It is recommended that you have access to the Azure CLI command line to run the necessary setup commands

## Objectives

Learn how to quickly install and run your Discovery and Traceability agents with basic configuration using Axway Central CLI.

## Axway Central CLI prerequisites

* [Node.js](https://nodejs.org/en/download/) version 10.13.0 or later
* Access to npm package (for installing Axway CLI)
* Access to login.axway.com on port 443
* Minimum Axway Central CLI version: 0.7.0 (check version using `axway central --version`)

For more information, see [Install Axway Central CLI](/docs/cli_central/cli_install/).

## Azure prerequisites

* An Azure Service principal
* An Azure Event Hub

## Installing the agents

### Step 1: Folder preparation

Create an empty directory where Axway CLI will generate files. Run all Axway Central CLI from this directory.

### Step 2: Identify yourself to Amplify Platform with Axway CLI

To use Central CLI to log in with your Amplify Platform credentials, run the following command:

```shell
axway auth login
```

A browser automatically opens.
Enter your valid credentials (email address and password). Once the “Authorization Successful” message is displayed, go back to Axway CLI. The browser may be closed at this point.

If you are a member of multiple Amplify organizations, you may have to choose an organization.

{{< alert title="Note" color="primary" >}}If you do not have a graphical environment, forward the display to an X11 server (Xming or similar tools) using the `export DISPLAY=myLaptop:0.0` command.{{< /alert >}}

### Step 3: Run the agents' install procedure

Azure agents are delivered in a Docker image provided by Axway. You can run them from any Docker container that can access the Amplify Platform and Azure Gateway.
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
2. Platform connectivity:
   * **Environment**: can be an existing environment or a new one that will be created by the installation procedure
   * **Team**: can be an existing team or a new one that will be created by the installation procedure
   * **Service account**: can be an existing service account (from platform or Central). The installation procedure creates only a Central service account. If you choose an existing service account, be sure you have the appropriate public and private keys, as they will be required for the agent to connect to the Amplify Platform. If you choose to create a new one, the generated private and public keys will be provided.
3. Select the agents you want to install: Discovery / Traceability / All Agents. **Note**: If you select Traceability **ONLY**, you must provide configurations for both Steps 4 and 5.
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

### Step 4: Deploy the agent in Docker Container

The installation summary contains the Docker commands needed to finish the installation.

Example:

```shell
To utilize the agents, pull the latest Docker images and
run them using the appropriate supplied environment files, (da_env_vars.env & ta_env_vars.env):

  - Pull the latest Discovery Agent:
    docker pull axway.jfrog.io/ampc-public-docker-release/agent/azure-discovery-agent:latest
  - Pull the latest Traceability Agent:
    docker pull axway.jfrog.io/ampc-public-docker-release/agent/azure-traceability-agent:latest

  - Run the latest Discovery Agent:
    docker run --env-file "$(pwd)"/da_env_vars.env -v "$(pwd)":/keys \
        axway.jfrog.io/ampc-public-docker-release/agent/azure-discovery-agent:latest
  - Run the latest Traceability Agent:
    docker run --env-file "$(pwd)"/ta_env_vars.env -v "$(pwd)":/keys \
        axway.jfrog.io/ampc-public-docker-release/agent/azure-traceability-agent:latest
```

* Pull the latest images of the Discovery/Traceability Agents:
  * These two commands pull the latest released agents from docker pull axway.jfrog.io/ampc-public-docker-release/agent.
* Run the latest images of the Discovery/Traceability Agents:
  * These two commands run the Docker Containers using the created environment files, and mount the directory of the location of the appropriate keys, `public_key.pem` & `private_key.pem`, which were either generated during the installation, or available from an existing service account.

Once the pull and run commands are completed, the agents should be running in the Docker infrastructure.

See [Connect Azure Gateway](/docs/connect-azure-gateway/) for additional information about connecting Azure API Management Services to Amplify Central.
