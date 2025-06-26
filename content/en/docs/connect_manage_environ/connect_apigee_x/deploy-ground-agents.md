---
title: Deploy your Ground Apigee agents with Axway CLI
linkTitle: Deploy your Ground Apigee agents with Axway CLI
draft: false
weight: 10
---
Deploy your agents using Axway CLI so you can manage your Apigee X Gateway environment within Amplify.

## Before you start

* Read [Connect Apigee X Gateway](/docs/connect_manage_environ/connect_apigee_x/)
* Gather information on GCP and Apigee:
    * The project ID for the Google Cloud project
    * The developer email address that will be the owner of the agent created application in Apigee
    * The principal name of the service account created in setup
    * The GCP service account authentication file

## Objectives

Learn how to quickly configure, install, and run your Discovery and Traceability agents with basic configuration using Axway Central CLI.

Axway Central CLI and Amplify platform connectivity are required to configure the agent.

1. Configure the agent from any machine that has access to the Amplify platform (<https://platform.axway.com>) and a graphical environment (optional).
2. Once the configuration is complete, the agent configuration must be copied to a Docker machine so that the Docker runner will find them.

## Prerequisites

* Any machine (Windows / Linux / Mac) where:
    * You can access platform.axway.com, login.axway.com and repository.axway.com on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)
* An Amplify platform user account that has the **Platform Administrator** and **Engage Admin** roles
* An Amplify platform service account to run the configuration in headless mode (optional)

## Apigee prerequisites

For GCP authentication, the Apigee agent needs the GCP service account authentication file. This is how you can obtain it:

1. Navigate to *IAM & Admin* in your GCP project.
2. Go to *Service Accounts* on the left menu.
3. Click on the service account name you're using.
4. Navigate to the *KEYS* page.
5. Click **ADD KEY**, **Create new key** and select **JSON**.
6. Save the file and use it when you run the agent docker image.

## Agent runner machine pre-requisites

Apigee X agents are delivered in a Docker image provided by Axway. You can run them from any Docker container.

The agents must have access to:

* The platform URLs described in [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/) either directly or via a proxy
* Apigee X Gateway

## Configure the agents with Axway Central CLI

Use Axway Central CLI to configure the agents. This CLI will prompt you for answers regarding your Gateway installation, the service account used to ensure the connectivity from the agent to Amplify platform, and where to store the discovered APIs in the Amplify platform.

### Step 1: Install Axway Central CLI

Follow the instructions described in [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

You can validate that your installation is correct by running: `axway central --version`.

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

The Axway Central CLI will guide you through the configuration of the agents. For additional information, see [Add configuration to your Embedded agents with Axway Central CLI](/docs/integrate_with_central/cli_central/cli_embedded_agent_config/).

Agents configuration will be installed in the directory from where the CLI runs.

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

1. Select the type of gateway you want to connect to Apigee-X in this scenario.
2. Platform connectivity:
   * **Environment**: can be an existing environment or one that will be created by the installation procedure
   * **Team**: select an existing team
3. Apigee Configuration Setup:
   * **Authentication File Path**: The path where you put the GCP authentication file in docker container
   * **Project ID**: the Project ID for your Google Cloud Platform project
   * **Developer Email**: the email address of a developer, defined in Apigee, that will be given ownership of all Applications
   * **Client Email**: the email address, principal name, for the service account in GCP that has the role to discovery Apigee resources
   * **Environment**: filter proxies (discovery)/filter metrics (traceability). For more information see [Filter settings](#filter-settings)
   * **Filter Metrics**: set to true for API metrics filtering. For more information see [Filter settings](#filter-settings)
   * **Filtered APIs**: enter APIs names that metrics should be gathered for. If blank, gathers metrics for all discovered APIs. For more information see [Filter settings](#filter-settings)

### Filter settings

While configuring Apigee settings you can add options that will limit what the agent discovers and tracks for API Metrics.

* Environment filtering - By default, the agent will discover all API proxies within your Apigee, regardless of the Apigee environment they are deployed to. To modify this behavior:
    * **environment**: the agent will only discover proxies deployed to the specified environment. This will also restrict the agent to gather API metric data for only the environment that is configured.
* Metric filtering - By default, the agent will gather all API metric data for all discovered APIs. To modify this behavior:
    * **filterMetrics**: set to true to restrict gathering API metrics for only discovered APIs. Set to false (default) for the opposite behavior.
    * **filteredAPIs**: list of API names that may be provided to further restrict the APIs that the agent gathers metrics for.

{{< alert title="Note" color="primary" >}}The agent will only discover API Proxies deployed to the `test` environment. While gathering API metrics, the agent will filter by the `test` environment and additionally check that the API Proxy name is included in the `filteredAPIs` list.{{< /alert >}}

Once you have answered all questions, the agents' configuration files are updated, the Amplify Engage resources are created and the key pair is generated (if you chose to create a new service account).

The current directory contains the following files:

```shell
da_env_vars.env                   
ta_env_vars.env                   
private_key.pem          *newly created service account only
public_key.pem           *newly created service account only

```

`da_env_vars.env` / `ta_env_vars.env` contains the specific configuration you entered during the installation procedure. These files are required to start the agents.

`private_key.pem` and `public_key.pem` are the generated key pair the agent will use to securely talk with the Amplify platform (if you choose to let the installation generate them).

### Step 5: Deploy the agent in Docker Container

The installation summary contains the Docker commands needed to finish the installation.

By default, the Docker commands are configured to use the latest available agents version. If you want to use a different version, verify the available version in the agent release note.

Sample:

```shell
To utilize the agents, pull the latest Docker images and
run them using the appropriate supplied environment files, (da_env_vars.env & ta_env_vars.env):

  - Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then access the list of available agents from your organization:
    * Go to *Help menus > Downloads > Repository* 
     -or-
    * Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents)

    and search for the Docker image for the most recent agents to download as `{agentImage}`.
    Follow the instructions to download the Docker image of the Discovery Agent.

  - Start the Discovery Agent:
    docker run --env-file "$(pwd)"/da_env_vars.env -v "$(pwd)"/keys:/keys -v \
        -v /machine/path/to/authentication/file:/container/path/to/authentication/file -v "$(pwd)"/data:/data {agentImage}

  - Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then access the list of available agents from your organization:
    * Go to *Help menus > Downloads > Repository* 
     -or-
    * Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents)

    and search for the Docker image for the most recent agents to download as `{agentImage}`.
    Follow the instructions to download the Docker image of the Traceability Agent.

  - Start the Traceability Agent:
    docker run --env-file "$(pwd)"/ta_env_vars.env -v "$(pwd)":/keys \
        -v /machine/path/to/authentication/file:/container/path/to/authentication/file -v "$(pwd)"/data:/data {agentImage}
```

* Download the latest images of the Discovery/Traceability agents:
    * You must manually download the most recent released agents from [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents).
* Run the latest images of the Discovery/Traceability Agents:
    * These two commands run the Docker Containers using the created environment files, and mount the directory of the location of the appropriate keys, `public_key.pem` & `private_key.pem`, which were either generated during the installation, or available from an existing service account.

Once you have downloaded the most recent agent Docker images and run commands are completed, the agents should be running in the Docker infrastructure.

See [Connect Apigee X Gateway](/docs/connect_manage_environ/connect_apigee_x/) for additional information about connecting Apigee X API Management Services to Amplify Engage.
