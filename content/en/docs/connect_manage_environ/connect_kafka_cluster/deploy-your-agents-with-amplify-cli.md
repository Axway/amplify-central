---
title: Deploy your agents with Axway CLI
linkTitle: Deploy your agents with Axway CLI
draft: false
weight: 10
---
Deploy your agents using Axway CLI so you can manage your Kafka cluster environment within Amplify.

## Before you start

* Read [Amplify Kafka cluster connected overview](/docs/connect_manage_environ/connect_kafka_cluster/)
* Based on the Kafka cluster deployment type, you will need following information:
    * Confluent Cloud
        * Confluent Cloud environment identifier
        * Confluent Cloud cluster identifier
        * Cloud API Key
        * Resource API Key for cluster
        * Resource API Key for Schema Registry
    * Confluent Platform
        * Cluster bootstrap server
        * SASL username and password
        * SASL Mechanism (PLAIN, SCRAM-SHA-256 or SCRAM-SHA-512)
        * Schema Registry URL

## Objectives

Learn how to quickly configure, install, and run your Discovery and Traceability agents with basic configuration using Axway Central CLI.

Axway Central CLI and Amplify platform connectivity are required to configure the agent.

* Configure the agent from any machine that has access to the Amplify platform (<https://platform.axway.com>) and a graphical environment (optional).
* For a Docker-based agent, once the configuration is complete, the agent configuration must be copied to a Docker machine so that the Docker runner will find them.

## Agent configuration machine pre-requisites

* Any machine (Windows / Linux / Mac) where:
    * You can access platform.axway.com, login.axway.com and repository.axway.com on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)
    * You can use Kubernetes 1.19 (Helm install only)
* An Amplify platform user account that has the **Platform Administrator** and **Engage Admin** roles
* An Amplify platform service account to run the configuration in headless mode (optional)

## Confluent Cloud prerequisites

* Confluent Cloud environment identifier
* Confluent Cloud cluster identifier
* Cloud API Key
* Cluster API Key
* Schema Registry API Key

## Confluent Platform prerequisites

* Cluster bootstrap server
* SASL username and password
* SASL Mechanism (PLAIN, SCRAM-SHA-256 or SCRAM-SHA-512)
* Schema Registry URL

## Agent runner machine prerequisites

Kafka agents are delivered as a Docker image provided by Axway.

The agents must have access to:

* The platform URLs described in [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/) either directly or via a proxy
* Kafka cluster hosted on Confluent Cloud/Confluent Platform

## Configure the agents with Axway Central CLI

Use Axway Central CLI to configure the agents. This CLI will prompt you for answers regarding your gateway installation, the service account used to ensure the connectivity from the agent to Amplify platform, and where to store the discovered APIs in the Amplify platform.

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
AXWAY CLI, version 3.2.12
Copyright (c) 2018-2024, Axway, Inc. All Rights Reserved.

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

If your Amplify subscription is hosted in the EU region, run the following installation command to start the configuration procedure:

```shell
axway central install agents --region=EU
```

If your Amplify subscription is hosted in the APAC region, run the following installation command to start the configuration procedure:

```shell
axway central install agents --region=AP
```

The installation procedure will prompt for the following:

1. Select the type of gateway you want to connect to (Kafka in this scenario).
2. Select the agents you want to install: Discovery / Traceability / All Agents. **Note**: If you select Traceability **ONLY**, you must provide configurations for both Steps 4 and 5.
3. Platform connectivity:
   * **Environment**: can be an existing environment or one that will be created by the installation procedure
   * **Team**: can be an existing team or one that will be created by the installation procedure
   * **Service account**: can be an existing service account created in Amplify. The installation procedure creates a service account that can be used only with Amplify Engage. If you choose an existing service account, be sure you have the appropriate public and private keys, as they will be required for the agent to connect to the Amplify platform. If you choose to create one, the generated private and public keys will be provided.
4. Kafka cluster configuration setup options:
   * **Deployment Type** select between `Confluent Cloud` or `Confluent Platform`

   * Confluent Cloud Deployment Prompts
     * **Environment ID**: the unique identifier for your environment on Confluent Cloud
     * **Cluster ID**: the unique identifier for your cluster in the selected environment on Confluent Cloud
     * **Cloud API Key ID**: the Cloud API Key ID that agent will use to authenticate with Confluent Cloud
     * **Cloud API Key Secret**: the secret for Cloud API Key
     * **Cluster API Key ID**: the Resource API Key ID for your cluster in the selected environment on Confluent Cloud
     * **Cluster API Key Secret**: the secret for cluster API Key
     * **Schema Registry API Key ID**: the Resource API Key ID for your Schema Registry in the selected environment on Confluent Cloud
     * **Schema Registry API Key Secret**: the secret for Schema Registry API Key

   * Confluent Platform Deployment Prompts
     * **Cluster Server**: the bootstrap server name of the cluster in Confluent Platform
     * **SASL Authentication Mechanism**: select between `PLAIN`, `SCRAM-SHA-256` or `SCRAM-SHA-512`
     * **SASL Username**: the SASL user used by the agent to authenticate with Kafka broker using the selected SASL mechanism
     * **SASL Password**: the password for the SASL user
     * **Use Schema Registry**: defaulted to `Yes`, set to `No` to not use Schema Registry
     * **Schema Registry URL**: the base URL for Schema Registry in Confluent Platform
     * **Use SASL Authentication for Schema Registry**: defaulted to `Yes`, set to `No` to not use SASL authentication with Schema Registry

5. Traceability module connectivity:
   * Traceability Agent protocol (Lumberjack (tcp) by default recommended for production environment or HTTPs recommended for testing purpose), select between `Lumberjack`, or `HTTPS`

Once you have answered all questions, the agents' configuration files are updated, the Amplify Engage resources are created, and the key pair is generated (if you chose to create a new service account).

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

By default, the Docker commands are configured to use the latest available agent version. If you want to use a different version, verify the available version in the agent release note.

Sample:

```shell
To utilize the agents, pull the latest Docker images and run them using the appropriate supplied environment files, (da_env_vars.env & ta_env_vars.env):

 Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then access the list of available agents from your organization:
 * Go to *Help menus > Downloads > Repository* 
     -or-
 * Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents)

 and search for the Docker image for the most recent agents to download as `{agentImage}`.
 Follow the instructions to download the Docker image of the Discovery Agent.

Start the Discovery Agent on a Linux based machine
docker run -it --env-file "$(pwd)"/da_env_vars.env -v "$(pwd)":/keys \
    -v "$(pwd)"/data:/data {agentImage}

Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then access the list of available agents from your organization:
 * Go to *Help menus > Downloads > Repository* 
     -or-
 * Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents)

 and search for the Docker image for the most recent agents to download as `{agentImage}`.
 Follow the instructions to download the Docker image of the Traceability Agent.

Start the Traceability Agent on a Linux based machine
docker run -it --env-file "$(pwd)"/ta_env_vars.env -v "$(pwd)":/keys \
    -v "$(pwd)"/data:/data {agentImage}
```

* Download the latest images of the Discovery/Traceability agents:
    * You must manually download the most recent released agents from [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents).
* Run the latest images of the Discovery/Traceability agents:
    * These two commands run the Docker containers using the created environment files and mount the directory of the location of the appropriate keys, `public_key.pem` & `private_key.pem`, which were either generated during the installation, or available from an existing service account.

Once you have downloaded the most recent agent Docker images and run commands are completed, the agents should be running in the Docker infrastructure.

See [Connect Kafka cluster](/docs/connect_manage_environ/connect_kafka_cluster/) for additional information about connecting Kafka cluster to Amplify Engage.

## Check that agents are running with Axway Central CLI

After being authenticated to the platform with `axway auth login` command, run the following:

* `axway central get da` to get all Discovery Agent information
* `axway central get ta` to get all Traceability Agent information

The STATUS column will help you identify which agent is running.

```shell
C:\Demos>axway central get da
✔ Resource(s) successfully retrieved

NAME                   AGE          TITLE                  RESOURCE KIND   SCOPE KIND   SCOPE NAME          RESOURCE GROUP  DATAPLANE TYPE  STATUS
confluent-cloud-da     2 hours ago  confluent-cloud-da     DiscoveryAgent  Environment  confluent-cloud     management      Kafka
confluent-platform-da  2 hours ago  confluent-platform-da  DiscoveryAgent  Environment  confluent-platform  management      Kafka
```

```shell
C:\Demos>axway central get ta
✔ Resource(s) successfully retrieved

NAME                   AGE          TITLE                  RESOURCE KIND      SCOPE KIND   SCOPE NAME          RESOURCE GROUP  DATAPLANE TYPE  STATUS
confluent-cloud-ta     2 hours ago  confluent-cloud-ta     TraceabilityAgent  Environment  confluent-cloud     management      Kafka
confluent-platform-ta  2 hours ago  confluent-platform-ta  TraceabilityAgent  Environment  confluent-platform  management      Kafka
```

See [Connect Kafka cluster](/docs/connect_manage_environ/connect_kafka_cluster/) for additional information about connecting Kafka cluster to Amplify Engage.
