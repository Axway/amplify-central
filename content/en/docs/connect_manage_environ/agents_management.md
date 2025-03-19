---
title: Monitor agent status
linkTitle: Monitor agent status
weight: 20
date: 2024-10-10
---

In Topology, agents configured within your organization can be viewed to identify if any actions are to be taken.

## View available agents

Only the Engage Admin can view the *agents list*.

1. Navigate to *Topology > Environments > Agents*. There are five cards in the *agents list* view: Connected, Unhealthy, Stopped, Update Available, and Unsupported.

{{< alert title="Note" color="primary" >}}If there are unsupported agents, an alert/banner will appear at the top of the screen. Follow the provided instructions on how to upgrade your agents, or see the [upgrade procedures](/docs/connect_manage_environ/connected_agent_common_reference/upgrade_agent) documentation and view the [latest agent versions in the release notes](/docs/amplify_relnotes).{{< /alert >}}

{{< alert title="Tip" color="secondary" >}}The list of agents can be filtered by Dataplanes, Hosting, Agent State, Version Status and Last Activity by using the filter located at the left of the screen.{{< /alert >}}

A list of agents is displayed with the following information:

* **Agent State** - displays the current state of the agent. Can be one of three states: Connected, Unhealthy, or Stopped.

    * **Connected** - the agent is running smoothly and has been updated in the last 24 hours.
    * **Unhealthy** -  the agent is in a unhealthy or failed state and/or has not communicated in the last 24 hours or more.
    * **Stopped** - the agent is no longer functioning.

* **Agent Name** - the title of the agent.
* **Agent Version** - the agent version number.
* **Agent Type** - can be either a Discovery Agent or a Traceability Agent.
* **Agent Host** - can be either On-premise or SaaS (embedded agent).
* **Agent Version Status** - applies to on-premise agents only. Provides information on the update status of the agent. Can have one of three statuses: Up To Date, Update Available, or Outdated. View the [latest agent versions](/docs/amplify_relnotes).

    * **Up To Date** - the agent is up to date.
    * **Update Available** - a new version is available.
    * **Outdated** - the current version of the agent is outdated. If there are any unsupported agents, an alert/banner will appear at the top of the screen.
    * **Redacted** - the current version has been redacted. It is recommended to upgrade immediately. If there are any redacted agents, an alert/banner will appear at the top of the screen.

* **Environment** - the environment the agent is a part of.
* **Agent's Last Activity** - the last time the agent was updated. By default, this field is selected to show agents in descending order based upon the last activity time.

## View agent details

1. Navigate to *Topology > Environments > Agents*.
2. Click on the agent. *Basic details are displayed about the agent*.

## Add your agent status to the environment details page using the CLI

If your environment status in **Amplify Engage / Topology** displays `Manual Sync.`, even though you have configured agents that have discovered APIs from your gateway and sent relative traffic to Business Insights, then you either installed the agents manually or with an older version of Axway Central CLI. Axway Central CLI (0.12.0 and later) creates necessary resources for the known agents (AWS, v7, Azure) to report its environment status to Amplify for you to view.

If you installed the agents manually or with an older version of Axway Central CLI, you must:

* Add new agent resources: Discovery Agent resource and Traceability Agent resource
* Add your agent resources to the environment  

### Resources descriptions

Refer to `axway central get` to list the resources.

**Discovery Agent resource**:

| RESOURCE                  | SHORT NAMES  | RESOURCE KIND                   | SCOPED  | SCOPE KIND    | RESOURCE GROUP  |
|---------------------------|--------------|---------------------------------|---------|---------------|-----------------|
| discoveryagents           | da           | DiscoveryAgent                  | true    | Environment   | management |

**Traceability Agent resource**:

| RESOURCE                  | SHORT NAMES  | RESOURCE KIND                   | SCOPED  | SCOPE KIND    | RESOURCE GROUP  |
|---------------------------|--------------|---------------------------------|---------|---------------|-----------------|
| traceabilityagents        | ta           | TraceabilityAgent               | true    | Environment   | management |

The following samples describe the resources for:

* An environment: my-engage-environment
* A Discovery Agent: my-discovery-agent-name
* A Traceability Agent: my-traceability-agent-name

Environment sample:

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

Discovery Agent sample:

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

Traceability Agent sample:

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

### Add your agent resources to the environment

The following steps will guide you in defining the require agent resources in order to display the agent status associated to an environment.

You must access the Axway Central CLI. See [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install).

#### Step 1: Authenticate yourself with Axway Central CLI

In a command line prompt, enter `axway auth login`.

A browser opens. You are prompted to enter your credentials and choose your platform organization. Once connected you can close the browser.

#### Step 2: Create an environment

If you already have an environment, you can skip this step. Only the environment name will be require later.

Create an environment using one of these methods:

* Use the CLI: `axway central create env my-environment-name`.
* Use the CLI with a file: create a file (myEnvFile.yaml) containing the environment resource definition mentioned above and use `axway central apply -f myEnvFile.yaml` to create it.
* Use the UI: Go to topology and use the "+ Environment" button.

Run `axway central get env`. You should see something similar to this:

```shell
NAME                            AGE                TITLE                           RESOURCE KIND    RESOURCE GROUP
my-engage-environment  a few seconds ago  My beautiful environment title  Environment      management
```

#### Step 3: Create the agent resources

Create agent resources using one of these methods:

* Manually use a file containing the content explained in the above [Resources descriptions](#resources-descriptions) section.
* Use the Axway Central CLI: `axway central create agent-resource`. You will be prompt to select the type of agent (Discovery | Traceability | both), the name of these agents and the type of Gateway (free text).

Reference the CLI output name `CENTRAL_AGENTNAME` variable in your agent configuration file.

Check that the resources were created correctly by using either the Axway Central CLI or by going to **Amplify Engage WebUI > Topology > Environment**.

Once you are done, verify your work by running the commands `axway central get da` or `axway central get ta` or `axway central get da,ta`

You should see something similar to this:

```shell
// discovery agent
NAME                     STATUS   AGE           RESOURCE KIND       SCOPE KIND   SCOPE NAME                       RESOURCE GROUP
my-discovery-agent-name           a minute ago  DiscoveryAgent      Environment  my-engage-environment   management

// traceability agent
NAME                        STATUS   AGE                RESOURCE KIND          SCOPE KIND   SCOPE NAME                      RESOURCE GROUP
my-traceability-agent-name           a few seconds ago  TraceabilityAgent      Environment  my-engage-environment  management
```

Notice that each agent has an empty column named `STATUS`. This status column will be updated with either `running` when agent is running, `stopped` when agent is stopped or `failed` when the agent cannot establish the connection with the gateway.

#### Step 4: Update agent configuration

In order to link agent binary with the appropriate agent resource, you have to update the agent configuration file (env_vars). Use the `CENTRAL_AGENTNAME` variable and link the value to the resource name defined previously.

Sample: CENTRAL_AGENTNAME=my-discovery-agent-name

Once the Discovery Agent successfully starts, the agent status (Amplify Engage / Topology) will change to `Running`. If there are no other agents linked to that environment, then the environment status will change from `Manual Sync` to `Connected`.
{{< alert title="Note" color="primary" >}}
The environment status is calculated from the aggregate status of all agents linked to that environment:

* If all the agents in the environment are `Running`, the environment status will be `Connected`.
* If all the agents are `Stopped`, the environment status will be `Disconnected`.
* If one or more agents are `Failed` and the agent cannot reach the Gateway, then the environment status will be `Connection Error`.
* If one or more agents are `Stopped` and the other agents are `Running`, **or** one or more agents are `Running` and the other agents have never been started, then the environment status will be `Partially Connected`.
* If there are no reported agent status resource values, **or** one or more agents are `Stopped` and one or more agents have never been started (no agent status), then the environment status will be `Manual Sync`.
{{< /alert >}}

Opening the environment details page displays all agents and status linked to this environment.

You can also check the status value in CLI using `axway central get da` or `axway central get ta`.
