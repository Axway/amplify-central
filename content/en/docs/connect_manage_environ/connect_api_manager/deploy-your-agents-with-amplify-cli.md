---
title: Deploy your agents with Axway CLI
linkTitle: Deploy your agents with Axway CLI
draft: false
weight: 20
description: Learn how to deploy your agents using Axway CLI so that you can
  manage your Axway API Gateway environment within Amplify Central.
---
## Before you start

* Read [Amplify Central and Axway API Manager connected overview](/docs/connect_manage_environ/connect_api_manager/)
* You will need a basic knowledge of Axway API Management installation

    * Where the API Gateway is running (host / port / path to event logs)
    * Where the Admin node manager is running (host / port)
    * What users are available for the agent to use. It is recommended to have one API Manager user for Discovery Agent and one API Gateway operator user for Traceability Agent.

## Objectives

Learn how to quickly configure, install, and run your Discovery and Traceability agents with basic configuration using Axway Central CLI.

Axway Central CLI and Amplify platform connectivity are required to configure the agent.

1. Configure the agent from any machine that has access to the Amplify platform (<https://platform.axway.com>) and a graphical environment (optional).
2. Once the configuration is complete, the agent(s) and its configuration must be copied to the Gateway machine so that it can use the API Manager API's and access the event logs or open traffic logs.

## Agent configuration machine pre-requisites

* Any machine (Windows / Linux / Mac) where:
    * You can access platform.axway.com and login.axway.com on port 443
    * You can install and run Axway Central CLI (node.js module)
    * You can access the npm package (for installing Axway CLI)
    * You can install OpenSSL
    * There is a graphical environment (optional)
    * You can use Kubernetes 1.19 (Helm install only)
* An Amplify platform user account that has the **Platform Administrator** and **Central Admin** roles
* An Amplify platform service account to run the configuration in headless mode (optional)

## Agent runner machine pre-requisites

The agents run on the same machine as the gateway or API Manager when the gateway is deployed in a classic mode.

The agents run on the same Docker environment as the Gateway or API Manager when the gateway is deployed in EMT mode.

{{< alert title="Note" color="primary" >}}The Traceability Agent must use the same volume where the event logs or open traffic logs are written by the Gateway (refer to `anm` container).
{{< /alert >}}

The agents must have access to the platform URLs described in [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/) either directly or via a proxy.

## Configure the agents with Axway Central CLI

To configure the agents, use Axway Central CLI. This CLI will prompt you for answers regarding your Gateway installation, the service account used to ensure the connectivity from the agent to Amplify platform, and where to store the discovered APIs in the Amplify platform.

### Step 1: Install Axway Central CLI

Follow the instructions described in [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

You can validate that your installation is correct by running: `axway central --version`

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
Enter your valid credentials (email address and password). Once the “Authorization Successful” message is displayed, go back to Axway CLI.

If you are a member of multiple Amplify organizations, you may have to choose an organization.

#### Headless mode authentication with Service Account

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

Agents are configured in the directory where the CLI runs. You can configure the agent from anywhere, but then you must transfer the agent and its configuration to the API Management system machine for the agent to operate correctly.

{{< alert title="Note" color="primary" >}}The configure procedure can configure a Discovery Agent and a Traceability Agent at the same time. If you need multiple Traceability Agents, you are required to run the configuration procedure as many times as there are Traceability Agent that will be used. For instance, if you have a cluster of three gateways, you need one Discovery Agent and three Traceability Agents (one for each gateway). To configure all agents, you must execute the configure procedure three times (first time for the Discovery and Traceability Agents and two more times for the two other Traceability Agents).
{{< /alert >}}

```shell
axway central install agents
```

If your Amplify subscription is hosted in the EU region, run the following installation command to configure the agents:

```shell
axway central install agents --region=EU
```

The installation procedure will prompt for the following:

1. Select the type of gateway you want to connect to (V7 Gateway in this scenario).
2. Select the agents you want to install: Discovery / Traceability / Traceability offline mode / all.
3. Platform connectivity:
   * **environment**: can be an existing environment or a new one that will be created by the installation procedure
   * **team**: the default team the agent will assign when no team corresponds to the API Manager organization that the API belongs to. If the value is left empty, "Default team" will be used by the agent when no team correspond to the API organization.
   * **service account**: can be an existing service account. If you choose an existing service account, be sure you have the appropriate public and private keys, as they will be required for the agent to connect to the Amplify platform. If you choose to create a new one, the generated private and public keys will be provided (OpenSSL is required for this step).
4. Select the agent deployment mode: binary / Docker image / Helm.
5. API Manager connectivity:
   * **hostname** of the API Manager (localhost by default - use the API Manager service name `apimgr` when deploying via helm charts)
   * **port** of the API Manager (8075 by default)
   * user/password
6. API Gateway connectivity:
   * **hostname** of the API Gateway (localhost by default - use admin node manager service name `anm` when deploying via helm charts)
   * **port** of the API Gateway (8090 by default)
   * user/password
   * event log path
7. Traceability module connectivity:
   * Traceability Agent protocol (**Lumberjack** (tcp) by default recommended for production environment or **HTTPs** recommended for testing purpose)

Once you have answered all questions, the agents are downloaded, the configuration files are created, the Amplify Central resources are created, and the key pair is generated (if you chose to create a new service account).

The current directory should contain the following files:

```shell
discovery_agent           *Binary deployment only
discovery_agent.yml       *Binary deployment only
traceability_agent        *Binary deployment only
traceability_agent.yml    *Binary deployment only
da_env_vars.env
ta_env_vars.env
private_key.pem           *Only present if a new service account is created
public_key.pem            *only present if a new service account is created
```

`da_env_vars.env` / `ta_env_vars.env` contains the specific configuration you entered during the installation procedure.

`discovery_agent.yml` and `traceability_agent.yml` contain the default minimum agent configuration.

`private_key.pem` and `public_key.pem` are the generated key pair the agent will use to securely talk with the Amplify platform (if you choose to let the installation generate them). If you are re-using an existing service account, then the public key can be retrieved from the service account itself (go to **platform.axway.com > Service accounts** and search for the correct one). Regarding the private key, it is somewhere in your secured storage.

## Install the agents on the gateway machine(s)

To install the agents, copy the configuration files, public/private keys, and the binaries to your gateway machine (as mentioned in the instructions provided by the Axway Central CLI).

Once everything is copied, add the execution rights to the binaries (`chmod +x discovery_agent traceability_agent`). The Traceability Agent configuration file should be writable only by the owner of the file (`chmod u+rw,og+r ./traceability_agent.yml`).

## Start the agents

### Binary mode

As mentioned in the installation procedure, agents can be started with the following commands:

Discovery Agent:

```shell
./discovery_agent --envFile ./da_env_vars.env
```

Traceability Agent:

```shell
./traceability_agent --envFile ./ta_env_vars.env
```

### Docker mode

As mentioned in the installation procedure, agents can be started with the following commands (installation procedure will replace `{agentVersion}` below with the most recent version available):

Discovery Agent:

```shell
docker run -it --env-file $(pwd)/da_env_vars.env -v $(pwd):/keys axway.jfrog.io/ampc-public-docker-release/agent/v7-discovery-agent:{agentVersion}
```

Traceability Agent:

```shell
docker run -it --env-file $(pwd)/ta_env_vars.env -v $(pwd):/keys -v /data -v EVENT_LOG_PATH_ENTERED_DURING_INSTALLATION:/events -v USAGE_METRICS_PATH:/data axway.jfrog.io/ampc-public-docker-release/agent/v7-traceability:{agentVersion}
```

### Helm deployment

To deploy the agents in a helm release, select `Helm` as the installation option:

```bash
? Select the mode of installation:
  Binaries
  Dockerized
❯ Helm
```

Use the names of the services when prompted for the hostnames of API Manager (`apimgr`) and API Gateway (`anm`). The credentials you provide will be used to create two Kubernetes secrets in the cluster in the namespace you select. A secret named `amplify-agents-keys` will hold the public and private key pair information entered during the installation, and a secret named `amplify-agents-credentials` will hold the API Manager and API Gateway authentication details.

Next, select a namespace to install the agents into:

```bash
? Enter the namespace to use for the Amplify Gateway Agents:
  Create a new namespace
  ──────────────
❯ amplify-agents
```

If you are installing the agents in an OpenShift environment, you must run this command in the namespace that the agents will be installed in:

```bash
oc adm policy add-scc-to-group anyuid system:serviceaccounts:<target-namespace>
```

This allows the Traceability Agent to run with an UID associated with the fsGroup that is specified in the PodSecurityContext of the agent.
Additionally, while deploying the Traceability Agent, ensure that the Storage class specified in the ta-overrides.yaml file is present in the cluster.

In ta-overrides.yaml:

```bash
persistentVolumeClaimConfig:
  data:
    # storage class to persist contents of data directory in the agent - should be available in the cluster i.e gp2, gp2-csi, default
    storageClass: gp2-csi
```

The agents can be deployed with the following commands, which are mentioned at the end of the CLI install prompts:

```bash
helm repo add axway https://charts.axway.com/charts
helm repo update
helm upgrade --install --namespace <YOUR_NAMESPACE> v7-discovery axway/v7-discovery -f da-overrides.yaml
helm upgrade --install --namespace <YOUR_NAMESPACE> v7-traceability axway/v7-traceability -f ta-overrides.yaml
```

### Linux Service mode for binary agent

The agent can be installed as a Linux service with systemd. The following commands will help you utilize the service. These commands install the service abilities and must be run as a root user.

When running as a service, it is recommended to update the key path in the environment variables files (`da_env_vars.env` and `ta_env_vars.env`) with an absolute path for the service to find the appropriate key files.

When running as a service, it is best to save your logging to a file rather than the console output. See [Customizing log section (log)](/docs/connect_manage_environ/connect_api_manager/gateway-administation/#customizing-log-section-logging).

* Install the services and execute them as user axway and group axway:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service install -u axway -g axway --envFile /path/to/da_env_file.env
  sudo ./traceability_agent service install -u axway -g axway --envFile /path/to/ta_env_file.env
  ```

* Update the services and execute them as user axway and group axway:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service update -u axway -g axway --envFile /path/to/da_env_file.env
  sudo ./traceability_agent service update -u axway -g axway --envFile /path/to/ta_env_file.env
  ```

* Start the services:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service start
  sudo ./traceability_agent service start
  ```

* Read service logs, since the machine last booted:

  ```shell
  cd /home/APIC-agents
  ./discovery_agent service logs
  ./traceability_agent service logs
  ```

* Stop the services:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service stop
  sudo ./traceability_agent service stop
  ```

* Enable the services to start when the machine starts:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service enable
  sudo ./traceability_agent service enable
  ```

* Get service name:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service name
  sudo ./traceability_agent service name
  ```

* Uninstall the services from the machine:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service stop   # to ensure it is not running
  sudo ./discovery_agent service remove
  sudo ./traceability_agent service stop   # to ensure it is not running
  sudo ./traceability_agent service remove
  ```

## Check that agents are running

### Use the agent status command

Discovery agent:

  ```shell
  cd /home/APIC-agents
  ./discovery_agent --status
  ```

An empty result means the agent is not running; otherwise, you should receive this result:

```shell
/home/APIC-agents$ ./discovery_agent --status
{
  "name": "discovery_agent",
  "version": "0.0.19-658ebd93",
  "status": "OK",
  "statusChecks": {
    "apimanager": {
      "name": "API Manager",
      "endpoint": "apimanager",
      "status": {
        "result": "OK"
      }
    },
    "central": {
      "name": "Amplify Central",
      "endpoint": "central",
      "status": {
        "result": "OK"
      }
    }
  }
}
```  

Traceability agent:

  ```shell
  cd /home/APIC-agents
  ./traceability_agent --status
  ```

An empty result means the agent is not running; otherwise, you should receive this result:

```shell
/home/APIC-agents$ ./traceability_agent status
{
  "name": "traceability_agent",
  "version": "0.0.19-658ebd93",
  "status": "OK",
  "statusChecks": {
    "apimanager": {
      "name": "API Manager",
      "endpoint": "apimanager",
      "status": {
        "result": "OK"
      }
    },
    "apigateway": {
      "name": "API Gateway",
      "endpoint": "apigateway",
      "status": {
        "result": "OK"
      }
    },
    "central": {
      "name": "Amplify Central",
      "endpoint": "central",
      "status": {
        "result": "OK"
      }
    }
  }
}
```

### Use the agent service status command

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service status
  sudo ./traceability_agent service status
  ```

### Use Axway Central CLI

After being authenticated to the platform with `axway auth login` command, run the following:

* `axway central get da` to get all Discovery Agent information.
* `axway central get ta` to get all Traceability Agent information.

The STATUS column will help you identify which agent is running.

```shell
C:\Demos>axway central get da
√ Resource(s) successfully retrieved

NAME                      DATAPLANE TYPE  STATUS     RESOURCE KIND   SCOPE KIND   SCOPE NAME        RESOURCE GROUP
lbean018-discovery        Edge            running    DiscoveryAgent  Environment  apigtw-v77        management
ec2-da                    AWS             stopped    DiscoveryAgent  Environment  awsgtw-us-west-1  management
```

```shell
C:\Demos>axway central get ta
√ Resource(s) successfully retrieved

NAME                         DATAPLANE TYPE  STATUS   RESOURCE KIND      SCOPE KIND   SCOPE NAME        RESOURCE GROUP
lbean018-traceability        Edge            running  TraceabilityAgent  Environment  apigtw-v77        management
ec2-ta                       AWS             stopped  TraceabilityAgent  Environment  awsgtw-us-west-1  management
```

See [Administer API Gateway](/docs/connect_manage_environ/connect_api_manager/gateway-administation/) for additional information about agent features.
