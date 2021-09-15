---
title: Visualize the agent status
linkTitle: Visualize the agent status
weight: 50
description: Adding your agent status to the environment detail page
---

If your environment status in **Amplify Cental / Topology** displays `Manual Sync.`, even though you have configured agents that have discovered APIs from your gateway and sent relative traffic to the API Observer, then you either installed the agents manually or with an older version of Axway Central CLI. Axway Central CLI (0.12.0 and later) creates necessary resources for the known agents (AWS, v7, Azure) to report its environment status to Amplify Central for you to view.

If you installed the agents manually or with an older version of Axway Central CLI, you must:

* Add new agent resources: Discovery Agent resource and Traceability Agent resource
* Add your agent resources to the environment  

## Resources descriptions

Refer to `axway central get` to list the resources.

**Discovery Agent resource**:

| RESOURCE                  | SHORT NAMES  | RESOURCE KIND                   | SCOPED  | SCOPE KIND    | RESOURCE GROUP  |
|---------------------------|--------------|---------------------------------|---------|---------------|-----------------|
| discoveryagents           | da           | DiscoveryAgent                  | true    | Environment   | management

**Traceability Agent resource**:

| RESOURCE                  | SHORT NAMES  | RESOURCE KIND                   | SCOPED  | SCOPE KIND    | RESOURCE GROUP  |
|---------------------------|--------------|---------------------------------|---------|---------------|-----------------|
| traceabilityagents        | ta           | TraceabilityAgent               | true    | Environment   | management

The following samples describe the resources for:

* An environment: my-amplify-central-environment
* A Discovery Agent: my-discovery-agent-name
* A Traceability Agent: my-traceability-agent-name

Environment sample:

```yml
group: management
apiVersion: v1alpha1
kind: Environment
name: my-amplify-central-environment
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
    name: my-amplify-central-environment
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
    name: my-amplify-central-environment
attributes: {}
finalizers: []
tags:
  - sample
spec:
  config:
    excludeHeaders:
      - Authorization
    processHeaders: true
  dataplaneType: my-dataplane-name
```

## Add your agent resources to the environment?

The following steps will guide you in defining the require agent resources in order to display the agent status associated to an environment.

You must access the Axway Central CLI. See [Install Axway Central CLI](/docs/central/cli_central/cli_install).

### Step 1: Authenticate yourself with Axway Central CLI

In a command line prompt, enter `axway auth login`.

A browser opens. You are prompted to enter your credentials and choose your platform organization. Once connected you can close the browser.

### Step 2: Create an environment

If you already have an environment, you can skip this step. Only the environment name will be require later.

Create an environment using one of these methods:

* Use the CLI: `axway central create env my-environment-name`.
* Use the CLI with a file: create a file (myEnvFile.yaml) containing the environment resource definition mentioned above and use `axway central apply -f myEnvFile.yaml` to create it.
* Use the UI: Go to topology and use the "+ Environment" button.

Run `axway central get env`. You should see something similar to this:

```shell
NAME                            AGE                TITLE                           RESOURCE KIND    RESOURCE GROUP
my-amplify-central-environment  a few seconds ago  My beautiful environment title  Environment      management
```

### Step 3: Create the agent resources

Create agent resources using one of these methods:

* Manually use a file containing the content explained in the above [Resources descriptions](#resources-descriptions) section.
* Use the Axway Central CLI: `axway central create agent-resources`. You will be prompt to select the type of agent (Discovery | Traceability | both), the name of these agents and the type of Gateway (free text).

Reference the CLI output name `CENTRAL_AGENTNAME` variable in your agent configuration file.

Check that the resources were created correctly by using either the Axway Central CLI or by going to **Central WebUI > Topology > Environment**.

Once you are done, verify your work by running the commands `axway central get da` or `axway central get ta` or `axway central get da,ta`

You should see something similar to this:

```shell
// discovery agent
NAME                     STATUS   AGE           RESOURCE KIND       SCOPE KIND   SCOPE NAME                       RESOURCE GROUP
my-discovery-agent-name           a minute ago  DiscoveryAgent      Environment  my-amplify-central-environment   management

// traceability agent
NAME                        STATUS   AGE                RESOURCE KIND          SCOPE KIND   SCOPE NAME                      RESOURCE GROUP
my-traceability-agent-name           a few seconds ago  TraceabilityAgent      Environment  my-amplify-central-environment  management
```

Notice that each agent has an empty column named `STATUS`. This status column will be updated with either `running` when agent is running, `stopped` when agent is stopped or `failed` when the agent cannot establish the connection with the gateway.

### Step 4: Update agent configuration

In order to link agent binary with the appropriate agent resource, you have to update the agent configuration file (env_vars). Use the `CENTRAL_AGENTNAME` variable and link the value to the resource name defined previously.

Sample: CENTRAL_AGENTNAME=my-discovery-agent-name

Once the Discovery Agent successfully starts, the agent status (Amplify Central / Topology) will change to `Running`. If there are no other agents linked to that environment, then the environment status will change from `Manual Sync` to `Connected`.
{{% alert title="Note" %}}
The environment status is calculated from the aggregate status of all agents linked to that environment:

* If all the agents in the environment are `Running`, the environment status will be `Connected`.
* If all the agents are `Stopped`, the environment status will be `Disconnected`.
* If one or more agents are `Failed` and the agent cannot reach the Gateway, then the environment status will be `Connection Error`.
* If one or more agents are `Stopped` and the other agents are `Running`, **or** one or more agents are `Running` and the other agents have never been started, then the environment status will be `Partially Connected`.
* If there are no reported agent status resource values, **or** one or more agents are `Stopped` and one or more agents have never been started (no agent status), then the environment status will be `Manual Sync`.
{{% /alert %}}

Opening the environment details page displays all agents and status linked to this environment.

You can also check the status value in CLI using `axway central get da` or `axway central get ta`.
