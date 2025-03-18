---
title: Deploy your Embedded Apigee agents with Axway CLI
linkTitle:  Deploy your Embedded Apigee agents with Axway CLI
draft: false
weight: 10
---
Deploy your Embedded agents using Axway CLI so you can manage your Apigee X Gateway environment within Amplify.

## Before you start

* Read [Connect Apigee X Gateway](/docs/connect_manage_environ/connect_apigee_x/)
* Gather information on GCP and Apigee:
    * The project ID for the Google Cloud project
    * The developer email address that will be the owner of the agent created application in Apigee
    * The principal name of the service account created in setup

## Objectives

Learn how to quickly configure, install, and run your Embedded agents using Axway Central CLI.

{{< alert title="Note" color="primary" >}}Axway Central CLI and Amplify platform connectivity are required to configure the agent.{{< /alert >}}

## Prerequisites

* Any machine (Windows / Linux / Mac) where:
    * You can access platform.axway.com, login.axway.com and repository.axway.com on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)
* An Amplify platform user account that has the **Platform Administrator** and **Engage Admin** roles
* An Amplify platform service account to run the configuration in headless mode (optional)

## Configure the agents with Axway Central CLI

Use Axway Central CLI to install the agents. This CLI will prompt you for answers regarding GCP and Apigee access information and where to store the discovered APIs in the Amplify platform.

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

The Axway Central CLI will guide you through the configuration of the agents. See [Connect Apigee X Gateway](/docs/connect_manage_environ/connect_apigee_x/) for the prerequisite setup on GCP and Apigee.

Run the following command to start the configuration procedure:

```shell
axway central install agents
```

The installation procedure will prompt for the following:

1. Select the type of gateway you want to connect to Apigee-X in this scenario.
2. Platform connectivity:
   * **Environment**: can be an existing environment or one that will be created by the installation procedure
   * **Team**: select an existing team
3. Apigee Configuration Setup:
   * **Project ID**: the Project ID for your Google Cloud Platform project
   * **Developer Email**: the email address of a developer, defined in Apigee, that will be given ownership of all Applications
   * **Client Email**: the email address, principal name, for the service account in GCP that has the role to discovery Apigee resources
   * **Environment**: filter proxies (discovery)/filter metrics (traceability). For more information see [Filter settings](#filter-settings)
   * **Filter Metrics**: set to true for API metrics filtering. For more information see [Filter settings](#filter-settings)
   * **Filtered APIs**: enter APIs names that metrics should be gathered for. If blank, gathers metrics for all discovered APIs. For more information see [Filter settings](#filter-settings)
   * Set how often the Embedded agent should check Apigee for changes. Preferred is no frequency and triggered via a CI/CD pipeline. See [Triggering the agent to run discovery](/docs/connect_manage_environ/connected_agent_common_reference/embedded-agent-triggers/#triggering-the-agent-to-run-discovery)
   * Set if the agent should discover Apigee resources after installation is complete

Once you have answered all questions, the Embedded agent will be created. The process will securely store the authentication data and validate it by connecting to GCP and Apigee. If set to discover Apigee resources upon installation, the agent will immediately discover your resources and show them in the Service Registry.

### Filter settings

While configuring Apigee settings you can add options that will limit what the agent discovers and tracks for API Metrics.

* Environment filtering - By default, the agent will discover all API proxies within your Apigee, regardless of the Apigee environment they are deployed to. To modify this behavior:
    * **environment**: the agent will only discover proxies deployed to the specified environment. This will also restrict the agent to gather API metric data for only the environment that is configured.
* Metric filtering - By default, the agent will gather all API metric data for all discovered APIs. To modify this behavior:
    * **filterMetrics**: set to true to restrict gathering API metrics for only discovered APIs. Set to false (default) for the opposite behavior.
    * **filteredAPIs**: list of API names that may be provided to further restrict the APIs that the agent gathers metrics for.

Here is an example of using these settings in the Dataplane resource file.

```yaml
...
group: management
apiVersion: v1alpha1
kind: Dataplane
...
spec:
  type: Apigee
  config:
    mode: proxy
    type: Apigee
    projectId: rd-amplify-apigee-x
    developerEmail: axway-agent@axway.com
    environment: test
    metricsFilter:
      filterMetrics: true
      filteredAPIs:
        - PetStore
```

{{< alert title="Note" color="primary" >}}The agent will only discover API Proxies deployed to the `test` environment. While gathering API metrics, the agent will filter by the `test` environment and additionally check that the API Proxy name is included in the `filteredAPIs` list.{{< /alert >}}