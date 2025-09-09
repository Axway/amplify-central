---
title: Create an environment
linkTitle: Create an environment
weight: 5
date: 2023-04-27
---

Creating an environment is a prerequisite for connecting an agent. Agents use the environment definition to establish communication with the correct data plane, enabling automated API discovery, traffic collection, and lifecycle management. Without an environment, an agent cannot be registered or synchronized with Amplify Engage.

Learn how to create an environment to represent your API services and other discovered objects.

## Prerequisites

Before you begin, you must have:

* A valid entitlement to Amplify Engage.
* Engage Admin permissions.

## Create an environment

### Open the Environments page.

1. Navigate to *Topology > Environments*.
2. Click **+ Add New Environment**.

    ![Environment List Page](/static/Images/central/EnvironmentListPage.png)
   
> [!NOTE]
> If you’ve already reached your environment quota, the button will be disabled. Check your entitlement to confirm limits.

### Fill the environment profile

Provide basic details about the environment:

* **Environment Name** - A short friendly display name.
* **Environment Type** - Choose the gateway or system type (for example, AWS API Gateway, Azure API Gateway).
    * Custom/SDK - for community agents or SDK-based agents.
    * Manual - for environments without an agent.
* **Production** - Select **Yes** if this is a production dataplane or connects to a non-Axway gateway. The usage will count against your entitled quota.
* **Governance** - Select **Axway Manage** if hosted in Axway Managed Cloud.
* **Description** - Brief description of the environment.
* **Image** -Upload an iconto help identity this environment.

Click **Next** to continue.

### (Optional) Credential Preferences

You can control how credentials behave in this environment:

* Set the **Credential Expiration** (in days). You can also:

    * Automatically deprovision expired credentials.
    * Send consumers notifications before expiration (30, 14, 7, 3, 1 day).

* Decide how long consumers can see credential values in Marketplace. Set the **Credential value visibility** to Always visible, 3 days(default) or max 365 days.

Click **Next**.

### (Optional) Stage Assignment

Stages in Amplify Engage represent the different phases of the API lifecycle and are a key mechanism for organizing the API landscape. Common examples include development, testing, and production.

* Select one or more stages for the environment.
* Choose a default stage (applied automatically to endpoints).

For details, see [Add and manage stages](/docs/connect_manage_environ/stage).

Click **Next**.

### (Optional) Compliance Profiles

Enable compliance or security rules to apply to all APIs discovered in this environment.

* Choose from existing design/security rulesets or upload custom ones under *Topology > Compliance Profiles*.
  
Amplify Engage includes an embedded Spectral linting server that provides real-time compliance checks along with visualizations of the results.

### Access Rights

Share the environment with other teams if needed:

* Select a **team owner**.
* Grant **read** or **edit** access to one or more teams.

By default, only Engage Admin and members of owning team have access. For details, see [Environment Access Rights](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/manage_environments_ownership/index.html).

### Finalize

1. Add any Tags and Attributes to help organize and filter environments.
2. Click **Save**.

Your environment is now created and ready for agent connection.

> [!TIP]
> Always create environments before setting up discovery or traceability agents. This ensures all API services are associated with the right data plane.
