---
title: Deploy your Embedded AWS agents with Axway CLI
linkTitle: Deploy your Embedded AWS agents with Axway CLI
draft: false
weight: 22
---
Deploy your Embedded agents using Axway CLI so you can manage your AWS API Gateway environment within Amplify.

## Before you start

* Read [Embedded AWS API Gateway agents setup](/docs/connect_manage_environ/connect_aws_gateway/embedded-aws-agent-setup/)
* You will need information on AWS:

    * The region that the Embedded agent will connect to
    * The credentials the Embedded agent will use (one of the following):
        * Assume Role ARN (Amazon Resource Number) and optional External ID
        * Access Key ID and Secret Access Key

## Objectives

Learn how to quickly configure, install, and run your Embedded agents with basic configuration using the Axway Central CLI.

Axway Central CLI and Amplify platform connectivity are required to configure the agent.

## Embedded agent configuration pre-requisites

* Any machine (Windows / Linux / Mac) where:
    * You can access platform.axway.com and login.axway.com on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)

## Configure the agents with Axway Central CLI

Use Axway Central CLI to install the agents. This CLI will prompt you for answers regarding AWS Gateway access information and where to store the discovered APIs in the Amplify platform.

### Step 1: Install Axway Central CLI

Follow the instructions described in [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

You can validate your installation by running: `axway central --version`.

### Step 2: Identify yourself to Amplify platform with Axway CLI

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

### Step 3: Run the agents' configure procedure

The Axway Central CLI will guide you through the configuration of the agents. See [Embedded AWS API Gateway agents setup](/docs/connect_manage_environ/connect_aws_gateway/embedded-aws-agent-setup/) for the prerequisite setup on AWS.

Run the following command to start the configuration procedure:

```shell
axway central install agents
```

The installation procedure will prompt for the following:

1. Select the type of gateway you want to connect to (AWS API Gateway in this scenario).
2. Select **Yes** when asked if the agent will be embedded.
3. Platform connectivity:
   * **Environment**: can be an existing environment or one that will be created by the installation procedure
   * **Team**: select an existing team
4. AWS Configuration Setup options:
   * **Region**: the AWS API Gateway resources
   * **Authentication Type**: select either Assume Role Policy or Access and Secret Keys
   * Assume Role Policy (preferred) Prompts:
     * **Assume Role ARN**: enter the ARN (Amazon Resource Number) that was created in a prerequisite step
     * **External ID**: the optional External ID that the Embedded agent will use when assuming the provided role
   * Access and Secret Keys Prompts:
     * **Access Key ID**: the Access Key ID that the Embedded agent will use when connecting to your AWS API Gateway
     * **Security Access Key**: the Secret Access Key that the Embedded agent will use when connecting to your AWS API Gateway
   * Set how often the Embedded agent should check for changes in your AWS API Gateway, preferred is no frequency and triggered via a CI/CD pipeline. See [Triggering the agent to run discovery](/docs/connect_manage_environ/connected_agent_common_reference/embedded-agent-triggers/#triggering-the-agent-to-run-discovery)
   * Set if the agent should discover AWS API Gateway resources after installation is complete

Once you have answered all questions, the Embedded agent will be created. The process will securely store the authentication data and validate it by connecting to your AWS API Gateway. If set to discover AWS API Gateway resources upon installation, the agent will immediately discover your resources and show them in the Service Registry.
