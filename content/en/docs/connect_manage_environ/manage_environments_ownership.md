---
title: Assign an environment owner
linkTitle: Assign an environment owner
weight: 5
description: Learn how to limit access to environments and API Services by
  assigning an owning team.
---
Within Amplify Central you can configure the environment ownership to provide access to API Services in that environment to a specific team. By assigning an owner, Administrators can delegate full control over the API Services within that environment to the members of the owning team, as further indicated by their user roles. Members outside of the owning team will not be able to view or create API Services or any other resources in that scope.

#### Who can configure the environment ownership?

Users that are assigned the Platform Administrator role in combination with the Central Administrator role can assign an owning team, assign an owning team when creating the environment or change the owning team after creation.

#### Environment ownership

Environments can be created without configuring the ownership, so setting an owner is OPTIONAL. That means only Central Administrators can view and manage that environment and the API Services within that scope. No other members in the organization will be able to view or access those resources, until an owner is assigned. When owner is assigned, only member of the owner team can view/edit/delete the environment and manipulate resources scoped to this environment.

#### API Service ownership

When creating an API Service, you can assign an owner. However, the API Service must have the same owner as the environment the service was registered under. If no owner is assigned, then that API Service will inherit the environment's owner. The same rules apply to all the resources created within the environment.

#### How to assign an owner?

{{< alert title="" color="warning" >}}This feature is not available yet in the Central UI: you can see the owner of a service/environment but you cannot change it.{{< /alert >}}

Currently, you can assign an owner by using the Amplify Central CLI. To learn how to create an environment using the CLI, see [Build an environment](/docs/integrate_with_central/cli_central/cli_environments/).

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

#### Resource access by user role

The table below describes the Amplify Central roles and the resources they have access to.

![Resource Access by Role](/Images/central/env_gw_mgmt/resourcepermissionsbyrole.png)

#### Environment sharing

{{< alert title="" color="warning" >}}This feature is not available yet in the Central UI.{{< /alert >}}

If you want to use the same environment (owned or not) with multiple teams, you will need to share the environment with the appropriate teams. For that we are using an Access Control List or ACL to determine which team can access the environment. Once a team is part of the ACL, each member of that team will be able to see the environment and manipulate the team objects inside the environment. But, they will not see other team work: you only see the work done inside your team. There is no restriction on the number of teams included in the ACL.

The ACL is associated or scoped to one environment and reference the teamID that can access the environment. You need to know the teamId to create the ACL (see above "To retrieve the team id").

In the following sample, we want to share `env1` defined previously with 2 teams (teamA and teamB):

```yml
{
  "group": "management",
  "apiVersion": "v1alpha1",
  "kind": "AccessControlList",
  "scope": "env1",
  "name": "acl1",
  "metadata": {
        "scope": {
            "kind": "Environment",
            "name": "env1"
        }
    },  "spec": {
    "rules": [
      {
        "access": [{
              "level": "scope"
          }
        ]
      }
    ],
    "subjects": [
      {
        "type": "team",
        # teamA identifier
        "id": "d9120f39-88d1-4977-bc56-5dd7d7335a18"
      },
      {
        "type": "team",
        # teamB identifier
        "id": "37cea73d-9d63-4a7b-ad69-4b79e8b4a2b7"
      }
    ]
  }
}
```

Save this configuration into a file (`acl.yaml`) after finding teamID corresponding to your configuration. Then use axway central CLI to import this ACL: `axway central apply -f acl.yaml`

Currently, there is no check validating the correctness of the team identifier.

Once everything is correctly setup, each developer from teamA or teamB are able to see the environment `env1` and add their respective services without noticing work done by other teams. They will only see the work done by their team mates. Be sure to set the owner of your service as describe above. Otherwise, developers will not see the API service inside the environment due to the ACL restriction: you only see what your team(s) own. If by mistake the API Service owner is not set, only a Central administrator will be able to view and update the ownership of the API service.
