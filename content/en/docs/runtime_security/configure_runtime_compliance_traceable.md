---
title: Configure Traceable runtime compliance
linkTitle: Configure Traceable runtime compliance
weight: 20
---

Configure your runtime compliance and conformance analysis with the Axway Central CLI and Traceable

## Before you start

* Identify existing Amplify environments that Traceable monitors API calls for
* Gather the following information that will be used by the agent to communicate with Traceable:
    * The Region for the Traceable app
    * Platform API token for authenticating with Traceable, replace TRACEABLE_REGION as needed in the URL
        * [https://app.{TRACEABLE_REGION.}traceable.ai/preferences/api-tokens] (ie. [https://app.eu.traceable.ai/preferences/api-tokens])
* Ensure you have the following tools installed:
    * The Axway Central CLI must be installed, and Amplify platform connectivity is required to configure the Traceable agent

## Objectives

* Learn the benefits of integrating Amplify Engage with Traceable.
* Learn how to install and configure the Traceable agent for runtime compliance and conformance analysis.

## Traceable integration

Integrating Amplify Engage with Traceable will bring many benefits, including: discovery of API endpoints being used in real time, metrics for the usages of those endpoints, a risk score calculation, and conformance analysis results.

### Discovery of Traceable API endpoints

The discovery process occurs during each polling interval of your Amplify Traceable agent. During this process, the agent has Traceable create an API OAS specification document representing all API traffic that Traceable has seen for that Environment. This is represented in Amplify Engage as an API service where you can observe the specification as seen by real time data.

### Traceability metrics for Traceable API endpoints

Along with the discovery process the Amplify Traceable agent also reports metrics against the API service from the real time data that Traceable has captured. This will help you visualize the API traffic that Traceable has captured against the Traffic that your Managed Gateway has reported in one place.

### Compliance risk scoring

On a set frequency the Amplify Traceable agent calculates a risk score for your APIs. This score and grade will inform you about how at risk a certain Environment is based on the traffic and data exchanged by APIs in that Environment. This risk score is visualized under the API Service the Amplify Traceable agent creates. See `TRACEABLE_COMPLIANCEFREQUENCY` in [Environment Variables](#environment-variables) for configuration.

### Conformance analysis

The Amplify Traceable agent will keep you informed on how well your API Spec files compare to real time API data as seen by Traceable. By linking your managed environments, via other Amplify agents, to Traceable environments the process is handled for you automatically.

* The Amplify Traceable agent (version 1.0.14 and later) will find all API specs on Amplify and upload them to Traceable
* On the set frequency (See `TRACEABLE_COMPLIANCEFREQUENCY` in [Environment Variables](#environment-variables)) the Amplify Traceable agent will have Traceable run a Conformance Analysis job
* After completion those job results are reflected, not only in Traceable, but on Amplify
    * Within the API Service view in the Amplify Traceable environment
    * Within the Environment details view for your referenced managed environments

With the Conformance Analysis job results, utilizing the API specifications provided by Engage, you will see a more accurate result for the following:

* Matched endpoints with issues - these are APIs that are documented but the API traffic seen by Traceable does not match the documentation
* Shadow endpoints - these are APIs that are not documented but API traffic is flowing threw them
* Orphan endpoints - these are APIs that are documented but no API traffic is utilizing them
* Matched endpoints without Issues - these are APIs that are documented correctly when compared to the API traffic data Traceable has seen

Finally, these results are accompanied by a link to the Conformance Analysis job that calculated them so you can learn more on Traceable.

## Installation prerequisites

Before installing and configuring, make sure you have the following agent prerequisites.

* Any machine (Windows / Linux / Mac) where:
    * You can access platform.axway.com, login.axway.com and repository.axway.com on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)
* An Amplify platform user account that has the **Platform Administrator** and **Engage Admin** roles
* An Amplify platform service account to run the configuration in headless mode (optional)
* Axway CLI with the Engage CLI installed
    * Follow the instructions described in [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

The agent must have access to:

* The platform URLs described in [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/) either directly or via a proxy
* The Traceable Platform API

## Install as a SaaS Agent

The Traceable agent can be deployed completely within Amplify Engage. For installation, go to *Engage > Topology > Environments > Add New*. Follow the *Environment Creation* wizard and select "Traceable" as the **Environment Type**. The wizard will guide you through the installation process.

## Install as an On-Premise Agent

### Identify yourself to Amplify platform with Axway CLI

There are two ways to authenticate with Axway CLI:

* Default mode: with an administrator username (email address) / password via a browser
* Headless mode: with a platform service account and a username / password via a prompt

#### Default mode with browser authentication

Run this command to use Central CLI to log in with your Amplify platform credentials:

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

# the command will prompt you to enter your username and password
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

## Docker deployment

### Docker prerequisites

* For containerized agents, Docker must be installed and you will need a basic understanding of Docker commands

### Environment variables

| Variable                                       | Default | Usage                                                                                                                                                                       |
| ---------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TRACEABLE_REGION                               |         | The [Traceable Region](https://docs.traceable.ai/docs/allow-list) the agent will connect to. (US, US-1, EU, APAC, APAC-2, Canada, UAE)                                      |
| TRACEABLE_TOKEN                                |         | The Traceable Platform Token the agent will use when connecting to Traceable                                                                                               |
| TRACEABLE_POLLINTERVAL                         | 1h      | The frequency the agent polls Traceable for Spec changes, metric collecting, compliance and conformance checks. (Lower Limit: 1h)                                           |
| TRACEABLE_COMPLIANCEFREQUENCY                  | 12h     | How often the agent will calculate a compliance risk score and send to Engage. (Lower Limit: 1h)                                                                            |
| TRACEABLE_CONFORMANCEFREQUENCY                 | 7d      | How often the agent will have Traceable run a [Conformance Analysis](https://docs.traceable.ai/docs/conformance-analysis) job and send results to Engage. (Lower Limit: 24h) |
| TRACEABLE_ENVIRONMENTMAPPING_AMPLIFY_[INDEX]   |         | Match an Amplify Engage Environment Name with a Traceable Environment Name, for spec mapping in Conformance Analysis jobs                                                  |
| TRACEABLE_ENVIRONMENTMAPPING_TRACEABLE_[INDEX] |         | Match an Amplify Engage Environment Name with a Traceable Environment Name, for spec mapping in Conformance Analysis jobs                                                  |

## Helm deployment

### Helm prerequisites

* Ensure you have the following tools installed:
    * Kubectl - compatible version with your Kubernetes cluster with Traceable deployment
    * Helm 3.2.4 or later
* Kubernetes context is set for the Kubernetes cluster where the agent will be deployed

### Helm overrides

| Override                       | Default | Usage                                                                                                                                                                            |
| ------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| traceable.region               |         | The [Traceable Region](https://docs.traceable.ai/docs/allow-list) the agent will connect to. (US, US-1, EU, APAC, APAC-2, Canada, UAE)                                           |
| traceable.token                |         | The Platform Token the agent will use when connecting to Traceable                                                                                                               |
| traceable.pollInterval         | 1h      | The frequency the agent polls Traceable for Spec changes, metric collecting, compliance and conformance checks                                                                   |
| traceable.complianceFrequency  | 12h     | How often the agent will calculate a compliance risk score and send to Engage                                                                                                    |
| traceable.conformanceFrequency | 7d      | How often the agent will have Traceable run a [Conformance Analysis](https://docs.traceable.ai/docs/conformance-analysis) job and send results to Engage                         |
| traceable.environmentMapping   |         | An array of objects with an Amplify Engage Environment (key: `amplify`) Name with a Traceable Environment (key: `traceable`) Name, for spec mapping in Conformance Analysis jobs |

## Step 1: Create directory

Create an empty directory where Axway Central CLI will generate files. Run all Axway Central CLI from this directory.

## Step 2: Run the agents' configure procedure

The Axway Central CLI will guide you through the configuration of the agents.

The agents' configuration will be installed in the directory from where the CLI runs.

```shell
axway central install agents
```

If your Amplify subscription is hosted in the EU region, run this command to start the configuration procedure:

```shell
axway central install agents --region=EU
```

If your Amplify subscription is hosted in the APAC region, run this command to start the configuration procedure:

```shell
axway central install agents --region=AP
```

The installation procedure will prompt for the following:

1. Select the type of gateway you want to connect to (Traceable in this scenario).
2. Select the type of deployment for the Traceable agent (helm or docker).
3. Platform connectivity:
   * **Environment**: can be an existing environment or one that will be created by the installation procedure
        * **Environment Mapping**: choose from existing environments that have Managed APIs and inform the agent of the Traceable environment that is linked
   * **Team**: can be an existing team or one that will be created by the installation procedure
   * **Service account**: can be an existing service account created in Amplify. The installation procedure creates a service account that can be used only with Amplify Engage. If you choose an existing service account, be sure you have the appropriate public and private keys, as they will be required for the agent to connect to the Amplify platform. If you choose to create one, the generated private and public keys will be provided.
4. Traceable API Security configuration setup options:
   * **Namespace**: can be an existing namespace or a new one that will be created by the installation procedure in the Kubernetes cluster (Helm install only)
   * **Traceable Region**: the region for Traceable
   * **Token**: the Platform API token for Traceable
5. Traceability module connectivity:
   * Traceability Agent protocol (Lumberjack (tcp) by default recommended for production environment or HTTPs recommended for testing purpose), select between `Lumberjack` or `HTTPS`

Once you have answered all questions, the agent installation performs the following operations:

* The Amplify Engage resources are created/updated
* If chosen, a new Amplify Platform service account is created and a public/private key pair is generated
* If chosen, a new namespace is created in the Kubernetes cluster
* The Kubernetes secret with key pair for the Amplify Platform service account is created in the selected namespace
* The Kubernetes secret with a Traceable authentication configuration is created in the selected namespace
* The agent Helm override file is generated

The current directory will contain the following files after the agent installation is completed:

```shell
agent-overrides.yaml
private_key.pem          * newly created service account only
public_key.pem           * newly created service account only
```

`agent-overrides.yaml` contains the specific configuration you entered during the installation procedure. These files are required to start the agents.

`private_key.pem` and `public_key.pem` are the generated key pair the agent will use to securely talk with the Amplify platform (if you choose to let the installation generate them).

## Step 3a: Deploy the agent in Docker

The installation summary contains the Docker command needed to finish the installation.

By default, the Docker commands are configured to use the latest available agent version. If you want to use a different version, verify the available version in the agent release note.

```shell
To complete the Traceable agent installation, run the following commands:
  docker run --env-file "$(pwd)"/traceable.env -v "$(pwd)"/keys:/keys -v "$(pwd)"/data:/data {agentImage}
```

Once the commands are completed, the agents should be running in the Docker server.

## Step 3b: Deploy the agent in Kubernetes cluster

The installation summary contains the Helm command needed to finish the installation.

By default, the Helm commands are configured to use the latest available agent version. If you want to use a different version, verify the available version in the agent release note.

```shell
To complete the Traceable agent installation, run the following commands:
  helm repo add axway https://helm.repository.axway.com --username=<client_id> --password=<client_secret>
  helm repo update
  helm upgrade --install --namespace agents-amplify traceable-agent axway/traceable-agent -f agent-overrides.yaml

* client_id - service account id for your Amplify Platform organization
* client_secret - service account secret for your Amplify Platform organization
```

Once the Helm commands are completed, the agents should be running in the Kubernetes cluster.

### Set up secrets for private repositories

To deploy an image stored in a private repository, you must create a kubernetes secret and set up the `pullSecret` field in the `image` section in the override file.
This is necessary for both the Discovery and Traceability agents.

Kubernetes command to create secret:

```bash
kubectl create secret docker-registry <SECRET_NAME> --namespace <YOUR_NAMESPACE> --docker-server=docker.repository.axway.com --docker-username=<client_id> --docker-password=<client_secret>
```

`client_id` - service account id for an Amplify Platform organization that has access to that artifact
`client_secret` - service account secret for an Amplify Platform organization that has access to that artifact

In overrides.yaml:

```bash
image:
  pullSecret: <SECRET_NAME>
```

Agent deployment commands:

```bash
helm repo add axway https://helm.repository.axway.com --username==<client-id> --password=<client_secret>
helm repo update
helm upgrade --install --namespace <YOUR_NAMESPACE> traceable-agent axway/traceable-agent -f agent-overrides.yaml --set image.pullSecret=<image-pull-secret-name>
```

## Step 4: Check that agents are running with Axway Central CLI

After being authenticated to the platform with `axway auth login` command, run the following to check that the agents are running:

* `axway central get ta` to get all Traceability Agent information

The STATUS column will help you identify which agent is running.

```shell
C:\Demos>axway central get ta
✔ Resource(s) successfully retrieved

NAME        AGE            TITLE         RESOURCE KIND      SCOPE KIND   SCOPE NAME  RESOURCE GROUP  DATAPLANE TYPE  STATUS
traceable-ta  5 hours ago  traceable-ta  TraceabilityAgent  Environment  traceable   management      Traceable       running
```
