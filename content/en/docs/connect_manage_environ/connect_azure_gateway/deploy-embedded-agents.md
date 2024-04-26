---
title: Deploy your Embedded Azure agents with Axway CLI
linkTitle:  Deploy your Embedded Azure agents with Axway CLI
draft: false
weight: 10
---
Deploy your Embedded agents using Axway CLI so you can manage your Azure Gateway environment within Amplify.

## Before you start

* Read [Amplify Azure Gateway connected overview](/docs/connect_manage_environ/connect_azure_gateway/)
* Gather the following Azure information:

    * Where the API service management is located (resource group name / API Management service name)
    * Service principal for using Azure APIs
    * Event hub definition (namespace / name / policy / consumer group)

* It is recommended that you have access to the Azure CLI command line to run the necessary setup commands

## Objectives

Learn how to quickly configure, install, and run your Embedded agents using Axway Central CLI.

{{< alert title="Note" color="primary" >}}Axway Central CLI and Amplify platform connectivity are required to configure the agent.{{< /alert >}}

## Prerequisites

Before installing and configuring your Embedded agents, make sure you have the following Embedded agent and Azure prerequisites.

### Embedded agent configuration machine pre-requisites

* Any machine (Windows / Linux / Mac) where:
    * You can access platform.axway.com, login.axway.com and axway.jfrog.io on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)
* An Amplify platform user account that has the **Platform Administrator** and **Central Admin** roles
* An Amplify platform service account to run the configuration in headless mode (optional)

### Azure prerequisites

* An Azure Service principal
* An Azure Event Hub

## Configure the Embedded agents with Axway Central CLI

Use Axway Central CLI to configure the Embedded agents. This CLI will prompt you for answers regarding your Gateway installation, the service account used to ensure the connectivity from the Embedded agent to Amplify platform, and where to store the discovered APIs in the Amplify platform.

### Step 1: Install Axway Central CLI

Follow the instructions described in [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

You can validate that your installation is correct by running: `axway central --version`.

### Step 2: Identify yourself to Amplify platform with Axway CLI

There are two ways to authenticate with Axway CLI:

* Default mode: with an administrator username (email address) / password via a browser
* Headlessmode: with a platform service account and a username / password via a prompt

#### Default mode with browser authentication

Run the following command to use Central CLI to log in with your Amplify platform credentials:

```shell
axway auth login
```

A browser will automatically open.
Enter your valid credentials (email address / password). Once the *Authorization Successful* message is displayed, go back to Axway CLI.

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

### Step 3: Run the agents' configure procedure

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

1. Select the type of gateway you want to connect to (Azure API Gateway in this scenario).
2. Select **Yes** when asked if the agent will be embedded.
3. Select the agents you want to install: All / Discovery. **Note**: If you select All **ONLY**, you must provide configurations for both steps 4 and 5.
4. Platform connectivity:
   * **Environment**: can be an existing environment or one that will be created by the installation procedure
   * **Team**: can be an existing team or one that will be created by the installation procedure
   * **Service account**: can be an existing service account (from platform or Enterprise Marketplace). The installation procedure creates a service account that can be used only with Enterprise Marketplace. If you choose an existing service account, be sure you have the appropriate public and private keys, as they will be required for the agent to connect to the Amplify platform. If you choose to create one, the generated private and public keys will be provided.
5. Azure Discovery Agent Configuration Setup options:
   * **Tenant ID** can be found in the **Directory ID** box on the *Properties* page
   * **Subscription ID** is a GUID that uniquely identifies your subscription to use Azure services
   * **Service Principal Client ID** represents the application that deploys or configures resources through Azure Resource Manager
   * **Service Principal Client Secret** is the authentication used for service principals
   * **Resource Group Name** is the representation of group related resources for your application
   * **API Management Service Name** refers to both the service and the corresponding Azure resource
6. Azure Traceability Agent Configuration Setup options:
   * **Event Hub Namespace** is the management container for one of multiple Event Hub instances
   * **Event Hub Name** associated with the subscription
   * **Policy Name** associated with the Event Hub
   * **Policy Key** associated with the Policy Name
   * **Consumer Group** associated with the Event Hub consumer group
7. Select **Yes** if you want to discover Azure APIM resources immediately after installation

Once you have answered all questions, the Embedded agent will be created. The process will securely store the authentication data and validate it by connecting to your Azure APIM. If set to discover the Azure APIM resources upon installation, the Embedded agent will immediately discover your resources and show them in the Service Registry.
