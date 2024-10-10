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

A list of agents is displayed with the following information:

* **Agent state** - Displays the current state of the agent. Can be one of three states. Connected, Unhealthy, or Stopped.

   * **Connected** - the agent is running smoothly and has been updated in the last 24 hours.
   * **Unhealthy** -  the agent is in a unhealthy or failed state and/or has not communicated in the last 24 hours or more.
   * **Stopped** - the agent is no longer functioning.

* **Environment & Agent name** - the title of the agent and the environment it is a part of.
* **Agent Version** - the agent version number.
* **Agent Type** - can be either a DiscoveryAgent or a TraceabilityAgent.
* **Agent Host** - can be either on-premise or saas(Axway managed).
* **Agent Version Status** - Applies to on-premise agents only. Provides information on the update status of the agent. Can have one of three statuses. Up to date, update available, or outdated. View the latest versions [here](https://docs.axway.com/bundle/amplify-central/page/docs/amplify_relnotes/index.html)

   * **Up To Date** - the agent is up to date.
   * **Update Available** - A new version is available.
   * **Outdated** - the current versio of the agent is outdated.

* **Agent Dataplane** - the specific type of agent that is being used.
* **Agent's Last Activity** - the last time the agent was updated. By default this field is selected to show agents in descending order based upon the last activity time.


### Viewing agent details

1. Navigate to *Topology > Agents*.
2. **Click** on the agent you wish to see more details for.
3. Basic details will be listed about the specific agent chosen.
