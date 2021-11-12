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

Learn how to quickly configure, install and run your Discovery and Traceability agents with basic configuration using Axway Central CLI.

To configure the agent, Axway Central CLI and Amplify platform connectivity are required. The configuration of the agent can be performed from any machine having access to Amplify platform (<https://platform.axway.com>) and a graphical environment. Once the configuration is complete, the agents and its configuration must be copied to the Gateway machine so that it can use the API Manager APIs and access the event logs or open traffic logs.

## Agent configuration machine pre-requisites

* any machine where:
    * you can access platform.axway.com and login.axway.com on port 443
    * you can install and run Axway Central CLI (node.js module)
    * you can Access npm package (for installing Axway CLI)
    * you can install OpenSSL
    * there is a graphical environment
    * you can use Kubernetes 1.19 (Helm install only)
* an Amplify platform user account that have the **Platform Administrator** and **Central Admin** roles.

## Agent runner machine pre-requisites

The agents are running on the same machine as the Gateway or API Manager are when the Gateway is deployed in a classic mode.

The agents are running on the same Docker environment as the Gateway or API Manager when the Gateway is deployed in EMT mode. Note that traceability agent needs to use the same volume where the event logs or open traffic logs are written by the Gateway (refer to `anm` container)

The agents need access to the platform urls described here: [Administer API Manager network traffic](/docs/connect_manage_environ/connect_api_manager/network-traffic-apimanager) either directly or via a proxy.

## Configure the agents with Axway Central CLI

To configure the agents, we will use Axway Central CLI. This CLI will ask you questions about your Gateway installation, the service account that need to be used to ensure the connectivity from the agent to Amplify platform and where to store the discovered API in the Amplify Platform

### Step 1: install Axway Central CLI

Follow the instructions described in [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

You can validate your installation is correct by running: `axway central --version`

### Step 2: Folder preparation

Create an empty directory where Axway CLI will generate files. Run all Axway Central CLI from this directory.

### Step 3: Identify yourself to Amplify Platform with Axway CLI

To use Central CLI to log in with your Amplify Platform credentials, run the following command:

```shell
axway auth login
```

A browser will automatically open.
Enter your valid credentials (email address and password). Once the “Authorization Successful” message is displayed, go back to Axway CLI.

If you are a member of multiple Amplify organizations, you may have to choose an organization.

### Step 4: Run the agents' configure procedure

Agents will be configured in the directory from where the CLI runs. You can configure the agent from anywhere, but then you must transfer the agent and its configuration to the API Management system machine for the agent to operate correctly.

{{< alert title="Note" color="primary" >}}The configure procedure can configure a Discovery Agent and a Traceability agent at the same time. If you need multiple traceability agents, you are required to run the configuration procedure as many times as many Traceability agent you want to use. For instance if you have a cluster of 3 Gateways, you need 1 discovery agent and 3 traceability agents (one for each gateway). To configure all the agents, you will need to execute the configure procedure 3 times (first time for the discovery and traceability agents and 2 more times for the 2 other traceability agents).
{{< /alert >}}

```shell
axway central install agents
```

If your Amplify subscription is hosted in the EU region, then the following installation command must be used to correctly configure the agents:

```shell
axway central install agents --region=EU
```

The installation procedure will prompt for the following:

1. Select the type of gateway you want to connect to (V7 gateway in this scenario).
2. Select the agents you want to install: Discovery / Traceability / Traceability offline mode / all.
3. Platform connectivity:
   * **environment**: can be an existing environment or a new one that will be created by the installation procedure
   * **team**: the default team the agent will assign when no team corresponds to the API Manager organization that the API belongs to. If the value is left empty, "Default team" will be used by the agent when no team correspond to the API organization.
   * **service account**: can be an existing service account. If you choose an existing service account, be sure you have the appropriate public and private keys, as they will be required for the agent to connect to the Amplify Platform. If you choose to create a new one, the generated private and public keys will be provided (Opensll is required for this step).
4. Select the agent deployment mode: binary / Docker image / Helm.
5. API Manager connectivity:
   * **hostname** of the API Manager (localhost by default - use the api manager service name `apimgr` when deploying via helm charts)
   * **port** of the API Manager (8075 by default)
   * user/password
6. API Gateway connectivity:
   * **hostname** of the API Gateway (localhost by default - use admin node manager service name `anm` when deploying via helm charts)
   * **port** of the API Gateway (8090 by default)
   * user/password
   * event log path
7. Traceability module connectivity:
   * Traceability Agent protocol (**Lumberjack** (tcp) by default recommended for production environment or **HTTPs** recommended for testing purpose)

Once you have answered all questions, the agents are downloaded, the configuration files are created, the Amplify Central resources are created and the key pair is generated (if you chose to create a new service account).

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

`private_key.pem` and `public_key.pem` are the generated key pair the agent will use to securely talk with the Amplify Platform (if you choose to let the installation generate them).

## Install the agent on the Gateway machine(s)

For installing the agent, just copy the configuration files, public/private keys and the binaries to your Gateway machine as mentioned by the instruction provided by the Axway Central CLI.

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

As mentioned in the installation procedure, agents can be started with the following commands:

Discovery Agent:

```shell
docker run -it --env-file $(pwd)/da_env_vars.env -v $(pwd):/keys axway.jfrog.io/ampc-public-docker-release/agent/v7-discovery-agent:latest
```

Traceability Agent:

```shell
docker run -it --env-file $(pwd)/ta_env_vars.env -v $(pwd):/keys -v /data -v EVENT_LOG_PATH_ENTERED_DURING_INSTALLATION:/events -v USAGE_METRICS_PATH:/data axway.jfrog.io/ampc-public-docker-release/agent/v7-traceability:latest
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

If you are installing the agents in an Openshift environment, you must run this command in the namespace that the agents will be installed in:

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

* Install the services and execute it as user axway and group axway:

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

* `axway central get edgeda` to get all discovery agent information.
* `axway central get edgeta` to get all traceability agent information.

The STATUS column will help you identify which agent is running.

```shell
C:\Demos>axway central get edgeda
√ Resource(s) successfully retrieved

NAME                                       STATUS   AGE             SCOPE KIND   SCOPE NAME
EdgeDiscoveryAgent/cli-1607014956109       started  26 minutes ago  Environment  pre-prod
EdgeDiscoveryAgent/lbean018-discovery      stopped  2 months ago    Environment  prod
```

```shell
C:\Demos>axway central get edgeta
√ Resource(s) successfully retrieved

NAME                                             STATUS   AGE             SCOPE KIND   SCOPE NAME
EdgeTraceabilityAgent/cli-1607014956731          started  30 minutes ago  Environment  pre-prod
EdgeTraceabilityAgent/lbean018-traceability      stopped  2 months ago    Environment  prod
```

See [Administer API Gateway](/docs/connect_manage_environ/connect_api_manager/gateway-administation/) for additional information about agent features.
