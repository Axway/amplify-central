---
title: Connect GitLab Repository
linkTitle: Connect GitLab Repository
weight: 110
---
Connect a GitLab Repository to Amplify so you can discover your API specifications within your repository.

## Why do you want to connect GitLab and Amplify?

Connecting a GitLab Repository to Amplify will provide you with a global centralized view of your APIs. Once connected, Discovery Agent will detect changes to a GitLab specification file and push the specification file as an API service for the environment. The Discovery Agent discovers new specification files within the configured paths that match any of the configured file name patterns:

* Finds all files within the paths configured
* From those files, validates that they match at least one of the patterns configured. If no patterns are configured, then all files are discovered
* The agent then creates an API service and revision to represent that specification file in Amplify Engage
* If the files are of a known specification type, then the service will be marked with that type. Otherwise, the service will have a type of `Unstructured`

## Before you start

* Read [GitLab discovery agent setup](/docs/connect_manage_environ/connect_gitlab_repository/ground_agent_setup/)
* Gather information on GitLab:
    * The access token that the agent will use to connect to GitLab
    * The organization base URL where the GitLab instance is hosted
    * The repository ID that the agent will connect to
    * The repository branch where the agent should discover API specifications
    * The paths and filename patterns that the agent should discover in API specifications
* Ensure your machine (Windows / Linux / Mac) meets the Ground agent configuration prerequisites, where:
    * You can access platform.axway.com and login.axway.com on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)

## Configure the agents with Axway Central CLI and GitLab

Use Axway Central CLI to install the agents. The CLI will prompt you for answers regarding GitLab access information and where to store the discovered APIs in the Amplify platform.

### Step 1: Install Axway Central CLI

Follow the instructions described in [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

You can validate your installation by running: `axway central --version`

### Step 2: Identify yourself to Amplify platform with Axway CLI

There are two ways to authenticate with Axway CLI:

* With a Central Admin username/password via a browser
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

You must have a platform service account and a regular administrator account for the headless mode. The permissions of the service account will be overridden by the permissions of the administrator account.

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

The Axway Central CLI will guide you through the configuration of the agents. See [GitLab Ground agents' setup](/docs/connect_manage_environ/connect_gitlab_repository/ground_agent_setup/) for the prerequisite setup on GitHub agent.

Run the following command to start the configuration procedure:

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

1. Select the type of gateway you want to connect to (GitLab in this scenario).
2. Platform connectivity:
   * **Environment**: can be an existing environment or one that will be created by the installation procedure
   * **Team**: select an existing team
   * **Service account**: select an existing service account or create a new one
   * **Discovery agent name**: enter a name for the agent
3. GitLab Configuration Setup:
   * **Access Token**: the access token the agent will use to read the files in the repository (GitLab Personal Access Token)
   * **Base URL**: organization base URL where the GitLab instance is hosted
   * **Repository ID**: the repository ID can be found on the main page of the repository, under the repository name (is called project ID)
   * **Branch**:  the repository branch where the agent will discover API specs
   * **Paths**: the paths that the agent will look for specs in, paths should start with a `/` character (example: `/apis`)
   * **Filename Patterns**: the patterns that a filename must match to be discovered
     * The pattens here are regular expressions [RE2 Syntax](https://github.com/google/re2/wiki/Syntax), only one pattern must match to discover a specification file
     * The pattern will pass if it matches any part of the filename. To match the whole name, add anchors to the expression (example: `^spec\.json$`, this will match only files that are literally named `spec.json`).

Once you have answered all questions, the agent will be created. The process will securely store the authentication data and validate it by connecting to GitLab. If set to discover GitLab resources upon installation, the agent will immediately discover your resources and show them in the Service Registry.

## Related topics

See the following topics for related information.