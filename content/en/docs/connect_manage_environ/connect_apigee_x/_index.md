---
title: Connect Apigee X
linkTitle: Connect Apigee X
weight: 110
---
Connect Google Cloud Platform Apigee X and Amplify so you can govern and monitor the creation / deployment / publishing and subscriptions of the Apigee X hosted APIs in one central location.

## Why do you want to connect Apigee X and Amplify?

Connecting Apigee X to Amplify will provide you with a global centralized view of your APIs and their related traffic.

Each Apigee X organization can be represented by an Amplify environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents (Discovery and Traceability) interact with Apigee X and Amplify to:

* Detect changes to Apigee X proxies deployments using the Discovery Agent. The Discovery Agent pushes the proxy configuration as an API service for the environment, which can then be published as a catalog item to be used by consumers to subscribe to the service.
* Gather Apigee X statistics that are related to discovered APIs and prepare the metric events that are sent to Amplify platform.

## Before you start

* Read [Embedded Apigee X agents setup](/docs/connect_manage_environ/connect_apigee_x/embedded-agent-setup/)
* Gather information on GCP and Apigee:
    * The project ID for the Google Cloud project
    * The developer email address that will be the owner of the agent created application in Apigee
    * The principal name of the service account created in setup

### Discovery Agent

The Discovery Agent is used to discover new API proxies configured in Apigee X, it is also the agent that handles provisioning for consumers to access the discovered proxies.

#### Discovery process

* Find all deployed API proxy revisions
* From those revisions, attempts to find a specification file
    * To do this the agent looks at the proxy configuration for a resource file of type `oas`
* Given that a specification file is found, the agent then creates an API service, revision, and instance to represent that proxy in Service Registry of the Enterprise Marketplace. The agent does not validate or configure any policies within the proxy, it will expect the spec to represent what is defined in the proxy.

{{< alert title="Note" color="primary" >}}An API Proxy without an API Specification will not be discovered by the agent.{{< /alert >}}

#### Provisioning process

* When a consumer is granted access to an API proxy within Apigee the agent will:
    * Create an application on Apigee, with the same name, and assign the ownership to the developer email address configured for the agent
    * Create a product on Apigee, if one does not already exist, that allows access to the specified API proxy
        * If a quota has been set in Amplify then that quota will be used when creating the product in Apigee
* When a consumer requests credentials for an application that has access to an API proxy within Apigee the agent will:
    * Find the previously created application on Apigee and create a new credential within that application
    * Allow access to all products created previously for the application on Amplify
    * Return the created credential to Amplify, encrypted, to be viewed by the consumer in Marketplace

{{< alert title="Note" color="primary" >}}Although credentials will be created and returned to a consumer, the API proxy on Apigee must have a policy that validates them.{{< /alert >}}

{{< alert title="Note" color="primary" >}}Quotas set on products within Apigee must be enforced by a policy within the API proxy on Apigee. See [Quota policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/quota-policy) for more information.{{< /alert >}}

### Traceability Agent

The Traceability Agent gathers usage metrics for all proxies defined in Apigee X. The agent will query, based on the configured frequency, the Apigee X stats API for new metrics. The metrics, as noted in the [Apigee X documentation](https://cloud.google.com/apigee/docs/api-platform/analytics/use-analytics-api-measure-api-program-performance), can be delayed up to 10 minutes. Due to this possible delay the Traceability Agent will not gather metrics within the last 10 minutes of executing the stats query. On subsequent runs those metrics will be gathered.

### Installation via CLI

## Embedded agent configuration pre-requisites

* Any machine (Windows / Linux / Mac) where:
    * You can access platform.axway.com and login.axway.com on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)

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

The Axway Central CLI will guide you through the configuration of the agents. See [Embedded Apigee X agents setup](/docs/connect_manage_environ/connect_apigee_x/embedded-agent-setup/) for the prerequisite setup on GCP and Apigee.

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
   * **Filter Metrics**: set to true (default) for API metrics filtering. For more information see [Filter settings](#filter-settings)
   * **Filtered APIs**: enter APIs names that will metrics should be gathered for, blank to gather metrics for all discovered APIs. For more information see [Filter settings](#filter-settings)
   * Set how often the Embedded agent should check Apigee for changes, preferred is no frequency and triggered via a CI/CD pipeline. See [Triggering the agent to run discovery](/docs/connect_manage_environ/connected_agent_common_reference/embedded-agent-triggers/#triggering-the-agent-to-run-discovery)
   * Set if the agent should discover Apigee resources after installation is complete

Once you have answered all questions, the Embedded agent will be created. The process will securely store the authentication data and validate it by connecting to GCP and Apigee. If set to discover Apigee resources upon installation, the agent will immediately discover your resources and show them in the Service Registry.

### Filter settings

While setting up Apigee Configuration settings you will be able to add configuration options that will limit what the agent discovers and tracks for API Metrics.

* Environment filtering
    * By default the agent will discover all API proxies within your Apigee, regardless of the Apigee environment they are deployed to. To modify this the `environment` configuration is available. By setting a value here the agent will only discovery proxies deployed to the specified environment. Setting this will also restrict the agent to gather API Metric data for only the environment that is configured.
* Metric filtering
    * By default the agent will gather all API Metric data for all discovered APIs. To modify this behavior two settings are available. First `filterMetrics`, defaulted to `true` is what restricts the API Metrics gathering for only discoverd APIS, set to `false` for the opposite behavior. Additionally `filterAPIS` is a list of API names that may be provided to further restrict the APIs the agent gathers Metrics for.

Here is an exmple of using these settings in the Dataplane resource file.

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

With the settings above the agent will only discover any API Proxies deployed to the `test` environment. While gathering API Metrics the agent will filter by the `test` environment and additionally check that the API Proxy name is included in the `filteredAPIs` list. 

## Related topics

See the following topics for related information.
