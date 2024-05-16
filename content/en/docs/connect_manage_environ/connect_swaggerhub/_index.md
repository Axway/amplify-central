---
title: Connect SwaggerHub
linkTitle: Connect SwaggerHub
weight: 125
date: 2024-04-23
---

Connect SwaggerHub to Amplify to publish to the Amplify Catalog from your SwaggerHub services, obtain a global view of your APIs, and present the catalog to your consumers.

## What is SwaggerHub connected?

Connecting a SwaggerHub Repository to Amplify will provide you with a global centralized view of your APIs. Once connected, Discovery Agent will detect changes to a SwaggerHub specification file and push the specification file as an API service for the environment. The Discovery Agent discovers new specification files within the configured organization in SwaggerHub.

* Find all files as per the configured visibility and publication filters
* If the filters are not configured, all the files are discovered
* The agent then creates an API service and revision to represent that specification file in Enterprise Marketplace
* If the files are of a known specification type, then the service will be marked with that type. Otherwise, the service will have a type of `Unstructured`

## Before you start

* Gather information on SwaggerHub:
    * The API key that the agent will use to connect to SwaggerHub
    * The organization name that the agent will connect to
    * The visibility and publication filters that the agent should use to discover API spec files
* Ensure your machine (Windows / Linux / Mac) meets the Embedded agent configuration prerequisites, where:
    * You can access platform.axway.com and login.axway.com on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)

## Configure the agents with Axway Central CLI and SwaggerHub

Use Axway Central CLI to install the agents. The CLI will prompt you for answers regarding SwaggerHub access information and where to store the discovered APIs in the Amplify platform.

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
Enter your valid credentials (email address and password). Once the _Authorization Successful_ message is displayed, go back to Axway CLI.

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

The Axway Central CLI will guide you through the configuration of the agents. For additional information, see [Add configuration to your Embedded agents with Axway Central CLI](/docs/integrate_with_central/cli_central/cli_embedded_agent_config/).

Run the following command to start the configuration procedure:

```shell
axway central install agents
```

The installation procedure will prompt for the following:

1. Select the type of gateway you want to connect to SwaggerHub in this scenario.
2. Platform connectivity:

    * **Environment**: can be an existing environment or one that will be created by the installation procedure
    * **Team**: select an existing team

3. SwaggerHub Configuration Setup:

    * **API Key**: the API key the agent will use to read the files in the repository (SwaggerHub's API Key is used here)
    * Set how often the Embedded agent should check SwaggerHub for changes, preferred is no frequency and triggered via a CI/CD pipeline. See [Triggering the agent to run discovery](/docs/connect_manage_environ/connected_agent_common_reference/embedded-agent-triggers/#triggering-the-agent-to-run-discovery)
    * Set if the agent should discover SwaggerHub resources after installation is complete
    * **Organization Owner Name**: the name of the organization of the SwaggerHub repository
    * **Visibility Filter**: the visibility of the API on SwaggerHub (public or private). If nothing is selected, the agent discovers both private and public APIs
    * **Publication Filter**: the publication state of the API on SwaggerHub (published or unpublished). If nothing is selected, the agent discovers both published and unpublished APIs

    Once you have answered all questions, the Embedded agent will be created. The process will securely store the authentication data and validate it by connecting to SwaggerHub. If set to discover SwaggerHub resources upon installation, the agent will immediately discover your resources and show them in the Service Registry.

## Related topics

See the following topics for related information.
