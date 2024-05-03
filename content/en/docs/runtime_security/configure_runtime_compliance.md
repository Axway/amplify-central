---
title: Configure runtime compliance
linkTitle: Configure runtime compliance
weight: 20
---

Configure your runtime compliance with the Axway Central CLI.

## Before you start

* Identify existing Amplify environments that have Managed APIs for the Graylog agent to correlate with the API calls monitored by Graylog API Security
* Gather the following information that will be used by the agent to communicate with Graylog API Security:
    * The URL for Graylog
    * Username and password for authenticating with Graylog API Security
* Ensure you have the following tools installed:
    * The Axway Central CLI must be installed and Amplify platform connectivity is required to configure the Graylog agent
    * Kubectl - compatible version with your Kubernetes cluster with Graylog deployment
    * Helm 3.2.4 or later

## Objectives

Learn how to install and configure the Graylog agent for runtime compliance.

## Prerequisites

Before installing and configuring, make sure you have the following agent prerequisites.

### Agent configuration prerequisites

* Any machine (Windows / Linux / Mac) where:
    * You can access platform.axway.com, login.axway.com and repository.axway.com on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)
* An Amplify platform user account that has the **Platform Administrator** and **Central Admin** roles
* An Amplify platform service account to run the configuration in headless mode (optional)
* Kubernetes context is set for the Kubernetes cluster where the agent will be deployed

### Agent deployment prerequisites

Graylog agent is delivered as a Helm chart that can be deployed in the same Kubernetes cluster where Graylog API Security is deployed.

The agent must have access to:

* The platform URLs described in [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/) either directly or via a proxy
* Graylog Ingress service running within the Kubernetes cluster where the agent will be deployed

## Configure the agents with Axway Central CLI

Use Axway Central CLI to configure the agent. The CLI will prompt you for answers regarding Graylog installation, the service account used to ensure the connectivity from the agent to Amplify platform, and where to store the discovered APIs in the Amplify platform.

### Step 1: Install Axway Central CLI

Follow the instructions described in [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

You can validate that your installation is correct by running: `axway central --version`.

### Step 2: Folder preparation

Create an empty directory where Axway Central CLI will generate files. Run all Axway Central CLI from this directory.

### Step 3: Identify yourself to Amplify platform with Axway CLI

There are two ways to authenticate with Axway CLI:

* Default mode: with an administrator username (email address) / password via a browser
* Headless mode: with a platform service account and a username /password via a prompt

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

The agents' configuration will be installed in the directory from where the CLI runs.

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

1. Select the type of gateway you want to connect to (Graylog in this scenario).

2. Platform connectivity:
   * **Environment**: can be an existing environment or one that will be created by the installation procedure
        * **Referenced Environments**: choose from existing environments that have Managed APIs for the Graylog agent to correlate with the API calls monitored by Graylog API Security
   * **Team**: can be an existing team or one that will be created by the installation procedure
   * **Service account**: can be an existing service account (from platform or Enterprise Marketplace). The installation procedure creates a service account that can be used only with Enterprise Marketplace. If you choose an existing service account, be sure you have the appropriate public and private keys, as they will be required for the agent to connect to the Amplify platform. If you choose to create one, the generated private and public keys will be provided.

3. Graylog API Security configuration setup options:
   * **Namespace**: can be an existing namespace or a new one that will be created by the installation procedure in the Kubernetes cluster
   * **Graylog API Security URL**: the URL for Graylog
   * **Username**: the username for Graylog API Security
   * **Password**: the password for the specified user
   * **Base path segment length**: the number of base path segments that the agent will use to correlate monitored APIs from Graylog to Managed APIs in existing environments. Default to `2`.

4. Traceability module connectivity:
   * Traceability Agent protocol (Lumberjack (tcp) by default recommended for production environment or HTTPs recommended for testing purpose), select between `Lumberjack` or `HTTPS`

Once you have answered all questions, the agent installation performs the following operations:

* The Amplify Marketplace resources are created/updated
* If chose, a new Amplify Platform service account is created and public/private key-pair is generated
* If chose, a new namespace is created in the Kubernetes cluster.
* The Kubernetes secret with key pair for Amplify Platform service account is created in the selected namespace
* The Kubernetes secret with Graylog authentication config is created in the selected namespace
* The agent Helm override file is generated

The current directory will contain the following files after the agent installation is completed:

```shell
agent-overrides.yaml
private_key.pem          * newly created service account only
public_key.pem           * newly created service account only
```

`agent-overrides.yaml` contains the specific configuration you entered during the installation procedure. These files are required to start the agents.

`private_key.pem` and `public_key.pem` are the generated key pair the agent will use to securely talk with the Amplify platform (if you choose to let the installation generate them).

### Step 5: Deploy the agent in Kubernetes cluster

The installation summary contains the Helm command needed to finish the installation.

By default, the Helm commands are configured to use the latest available agent version. If you want to use a different version, verify the available version in the agent release note.

Sample:

```shell
To complete the Graylog agent installation run the following commands:
  helm repo add axway https://helm.repository.axway.com --username=<client_id> --password=<client_secret>
  helm repo update
  helm upgrade --install --namespace agents-amplify graylog-agent axway/graylog-agent -f agent-overrides.yaml

* client_id - service account id for your Amplify Platform organization
* client_secret - service account secret for your Amplify Platform organization
```

Once the Helm commands are completed, the agents should be running in the Kubernetes cluster.

## Check that agents are running with Axway Central CLI

After being authenticated to the platform with `axway auth login` command, run the following:

* `axway central get ta` to get all Traceability Agent information

The STATUS column will help you identify which agent is running.

```shell
C:\Demos>axway central get ta
✔ Resource(s) successfully retrieved

NAME        AGE             TITLE       RESOURCE KIND      SCOPE KIND   SCOPE NAME  RESOURCE GROUP  DATAPLANE TYPE  STATUS
graylog-ta  5 hours ago     graylog-ta  TraceabilityAgent  Environment  graylog     management      Graylog         running
```
