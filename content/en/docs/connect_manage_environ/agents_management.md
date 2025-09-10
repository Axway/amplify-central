---
title: Monitor agent status
linkTitle: Monitor agent status
weight: 25
date: 2024-10-10
---

In **Topology**, you can view all agents configured in your organization to check their health and identify if any actions are needed.  

## View Available Agents

1. Navigate to **Topology > Environments > Agents**.  
2. The *Agents list* view displays five categories of agents:  
   * **Connected**
   * **Unhealthy**
   * **Stopped**
   * **Update Available**
   * **Unsupported**

You can filter the agent list by **Dataplanes, Hosting, Agent State, Version Status,** and **Last Activity** using the filter panel on the left.

Each agent displays the following details:

* **Agent State**  
    * **Connected** – Running normally and updated within the last 24 hours.
    * **Unhealthy** – Failed or has not communicated for 24+ hours.
    * **Stopped** – No longer functioning.
* **Agent Name** – The configured title of the agent.
* **Agent Version** – The current version number.
* **Agent Type** – Discovery Agent or Traceability Agent.
* **Agent Host** – On-premise or SaaS (embedded).
* **Agent Version Status** (on-premise only):
    * **Up To Date** – Running the latest version.
    * **Update Available** – A newer version is available.
    * **Outdated** – Current version is outdated (banner displayed).
    * **Retracted** – Current version is retracted; upgrade immediately (banner displayed).
* **Environment** – The environment linked to the agent.  
* **Last Activity** – Timestamp of the last update (list sorted by most recent by default).  

{{< alert title="Note" color="primary" >}}
If unsupported agents are detected, an alert banner appears at the top of the screen. Follow the instructions to upgrade, or see the [upgrade procedures](/docs/connect_manage_environ/connected_agent_common_reference/upgrade_agent) and [latest agent versions in the release notes](/docs/amplify_relnotes).
{{< /alert >}}

{< alert title="Note" color="primary" >}}
Only the Engage Admin can view the agent list.
{{< /alert >}}

## Add Agent Status to Environment Details (CLI)

Even though agents are configured and sending data, but your environment shows `Manual Sync`, you may have:

* Installed agents manually, or
* Used an older version of **Axway Central CLI** (< 0.12.0) to install the agents.

Newer versions of the CLI automatically create resources for supported agents (AWS, v7, Azure) so their status is reported.

If needed, you must:

* Create **Discovery Agent** and **Traceability Agent** resources.
* Link those resources to the environment.

## Steps to Add Agent Resources

### Step 1: Authenticate with CLI

`axway auth login`

A browser opens to complete login. Once authenticated, you can close the browser.

### Step 2: Create an Environment (if needed)

If you already have an environment, you can skip this step. Only the environment name will be required later.

`axway central apply -f myEnvFile.yaml`

Verify:

`axway central get env`

**Environment resource sample**

```yaml
group: management
apiVersion: v1alpha1
kind: Environment
name: my-engage-environment
title: My beautiful environment title
metadata:
attributes:
  attr1: value1
finalizers: []
tags:
  - sample
spec:
  icon:
    data: >-
          base64EncodedImage
    contentType: image/png
  description: >-
        This is the environment for representing the gateway ZYZ.
```

### Step 3: Create Agent Resources

`axway central apply -f myDiscoveryAgentFile.yaml`

Check resources:

`axway central get da`
`axway central get ta`

**Discovery Agent Resource sample:**

```yaml
group: management
apiVersion: v1alpha1
kind: DiscoveryAgent
name: my-discovery-agent-name
title: My beautiful DiscoveryAgent title
metadata:
  scope:
    kind: Environment
    name: my-engage-environment
attributes: {}
finalizers: []
tags:
  - sample
spec:
  config:
    additionalTags:
      - DiscoveredByV7Agent
  logging:
    level: debug
  dataplaneType: my-dataplane-name

```

**Traceability Agent Resource Sample**

```yaml
group: management
apiVersion: v1alpha1
kind: TraceabilityAgent
name: my-traceability-agent-name
title: My beautiful TraceabilityAgent title
metadata:
  scope:
    kind: Environment
    name: my-engage-environment
attributes: {}
finalizers: []
tags:
  - sample
spec:
  config:
    excludeHeaders:
      - Authorization
  dataplaneType: my-dataplane-name
```

### Step 4: Link Agent Configuration

Update your agent’s **env_vars** to include the **CENTRAL_AGENTNAME** variable:

`CENTRAL_AGENTNAME=my-discovery-agent-name`

Once the agent starts successfully, its status updates in Amplify Engage / Topology.

## Environment Status

The environment’s status is calculated from the status of all linked agents:

* **Connected** – All agents are running.
* **Disconnected** – All agents are stopped.
* **Connection Error** – One or more agents failed.
* **Partially Connected** – Mix of running/stopped or never-started agents.
* **Manual Sync** – No status reported, or mix of stopped and never-started agents.

