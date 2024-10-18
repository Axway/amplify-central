---
title: Agents management
linkTitle: Agents management
weight: 20
date: 2024-10-10
---

In topology, agents configured within your organization can be viewed to identify if any actions are to be taken.

### Viewing available agents

Only the Central Admin can view the agents list.

1. Navigate to *Topology > Agents*.

If there are any unsupported agents an alert/banner will appear at the top of the screen. Follow the provided instructions on how to upgrade your agents, or learn the [Upgrade Procedures](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/connected_agent_common_reference/upgrade_agent/index.html) and view the [Latest Vesions](https://docs.axway.com/bundle/amplify-central/page/docs/amplify_relnotes/index.html).

There are 5 cards in the agents list view. Connected, Unhealthy, Stopped, Update Available, and Unsupported. View below for more details on all of them.

The list of agents can be filtered using the filter side bar located on the left side of the screen. Agents may be filtered by Dataplanes, Hosting, Agent State, Version Status, and Last Activity.

A list of agents is displayed with the following information:

* **Agent state** - Displays the current state of the agent. Can be one of three states. Connected, Unhealthy, or Stopped.

    * **Connected** - the agent is running smoothly and has been updated in the last 24 hours.
    * **Unhealthy** -  the agent is in a unhealthy or failed state and/or has not communicated in the last 24 hours or more.
    * **Stopped** - the agent is no longer functioning.

* **Environment & Agent name** - the title of the agent and the environment it is a part of.
* **Agent Version** - the agent version number.
* **Agent Type** - can be either a DiscoveryAgent or a TraceabilityAgent.
* **Agent Host** - can be either On-premise or SAAS(embedded agent).
* **Agent Version Status** - Applies to on-premise agents only. Provides information on the update status of the agent. Can have one of three statuses. Up to date, update available, or outdated. View the [Latest Vesions](https://docs.axway.com/bundle/amplify-central/page/docs/amplify_relnotes/index.html).

    * **Up To Date** - the agent is up to date.
    * **Update Available** - A new version is available.
    * **Outdated** - the current version of the agent is outdated. If there are any unsupported agents an alert/banner will appear at the top of the screen.

* **Agent Dataplane** - the specific type of agent that is being used.
* **Agent's Last Activity** - the last time the agent was updated. By default this field is selected to show agents in descending order based upon the last activity time.

### Viewing agent details

1. Navigate to *Topology > Agents*.
2. **Click** on the agent you wish to see more details for.
3. Basic details will be listed about the specific agent chosen.
