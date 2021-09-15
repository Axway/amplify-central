---
title: Assign an environment owner
linkTitle: Assign an environment owner
weight: 5
description: Learn how to limit access to environments and API Services by
  assigning an owning team.
---
Within Amplify Central you can configure the environment ownership to limit access to API Services in that environment. By assigning an owner, Administrators can delegate full control over the API Services within that environment to the members of the owning team, as further indicated by their user roles. Members outside of the owning team will not be able to view or create API Services or any other resources in that scope.

#### Who can configure the environment ownership?

Users that are assigned the Platform Administrator role in combination with the Central Administrator role can assign an owning team, assign an owning team when creating the environment or change the owning team after creation.

#### Environment ownership

Environments can be created without configuring the ownership, so setting an owner is OPTIONAL. That means only Central Administrators can view and manage that environment and the API Services within that scope. No other members in the organization will be able to view or access those resources, until an owner is assigned.

#### API Service ownership

When creating an API Service, you can assign an owner. However, the API Service must have the same owner as the environment the service was registered under. If no owner is assigned, then that API Service will inherit the environment's owner. The same rules apply to all the resources created within the environment.

#### How to assign an owner?

Currently, you can assign an owner by using the Amplify Central CLI. To learn how to create an environment using the CLI, see [Build an environment](https://docs.axway.com/bundle/axway-open-docs/page/docs/central/cli_central/cli_environments/index.html).

Sample of an environment that has an owning team:

```json
{
  "apiVersion": "v1alpha1",
  "group": "management",
  "title": "Json env title one",
  "name": "env1",
  "kind": "Environment",
  "attributes": {
    "createdBy": "json",
    "randomNum": "1"
  },
  "tags": [
    "cli",
    "axway"
  ],
 "owner":{
    "type":"team",
    "id":"7a0c3957-8df5-4fdc-8ecd-df8240c1233a"
  },
  "spec": {
    "description": "spec description one"
  }
 }
```

When configuring the owner, you must to specify:

* **type**: the type of the owner. It defaults to "team", if not present. Currently, only the \`team\` type is supported.
* **id:** the id of the owner. When the type is set to \`team\`, set the value to the id of the team you want to assign as owner.

To retrieve the team id:

1. From within Amplify Central, select **ACCESS** from the left side navigation menu.
2. Select **Team Assets**.
3. Select a team. The Team details screen is displayed.
4. Copy the Team ID.

![Team info](/Images/central/central_teams.png)

{{< alert title="" color="warning" >}}This feature is not available yet in the Central UI.{{< /alert >}}

#### Resource access by user role

The table below describes the Amplify Central roles and the resources they have access to.

![Resource Access by Role](/Images/central/env_gw_mgmt/resourcepermissionsbyrole.png)
