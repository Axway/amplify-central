---
title: Environment access rights
linkTitle: Environment access rights
weight: 10
---
Limit access to environments and API services by assigning an owning team.

Within Amplify you can configure the environment ownership to provide access to API services in that environment to a specific team. By assigning an owner, Administrators can delegate full control over the API services within that environment to the members of the owning team, as further indicated by their user roles. Members outside of the owning team will not be able to view or create API services or any other resources in that scope.

#### Who can configure the environment ownership?

Users that are assigned the Platform Administrator role in combination with the Engage Administrator role can assign an owning team, assign an owning team when creating the environment or change the owning team after creation.

#### Environment ownership

Environments can be created without configuring the ownership, so setting an owner is OPTIONAL. If ownership is not configured, then only Engage Administrators can view and manage the environment and the API services within the scope. No other members in the organization will be able to view or access the resources until an owner is assigned. When an owner is assigned, only members of the owner's team can view/edit/delete the environment and manipulate resources scoped to the environment.

#### API service ownership

When creating an API service, you can assign an owner. However, the API service must have the same owner as the environment the service was registered under. If no owner is assigned, then that API service will inherit the environment's owner. The same rules apply to all the resources created within the environment.

#### How to assign an owner?

##### Amplify Engage WebUI

An Engage Admin can set/update ownership and allow API service sharing in the Amplify Engage WebUI via the environment Create or Edit wizard using the Access Rights step.

A non-Engage Admin using the wizard cannot modify the sharing. Ownership is mandatory to make these changes.

##### Amplify Engage CLI or API

The Amplify Central CLI can be used to assign an owner. To learn how to create an environment using the CLI, see [Build an environment](/docs/integrate_with_central/cli_central/cli_environments/).

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

1. Navigate to *Amplify > Organization > Teams*.
2. Select a team. The Team details screen is displayed.
3. Copy the Team ID from the URL.

![Team info](/Images/central/central_teams.png)

#### Resource access by user role

The table below describes the Amplify Engage roles and the resources they have access to.

![Resource Access by Role](/Images/central/env_gw_mgmt/resourcepermissionsbyrole.png)

#### Environment sharing

If you want to use the same environment (owned or not) with multiple teams, you must share the environment with the appropriate teams. Use an Access Control List (ACL) to determine which team can access the environment. Once a team is part of the ACL, each member of that team will be able to see the environment and manipulate the team objects inside the environment. However, they will not see other teams' work; members can only see the work done inside their team. There is no restriction on the number of teams included in the ACL.

API service owners can be set to any team that is not the environment owner.

The ACL is associated or scoped to one environment and references the teamID that can access the environment. You must know the teamId to create the ACL (see "To retrieve the team id," above).

In the following sample, `env1`, which was defined previously, is shared with two teams (teamA and teamB):

```yaml
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

Save this configuration into a file (`acl.yaml`) after finding the teamID that corresponds to your configuration. Then use Axway Central CLI to import this ACL: `axway central apply -f acl.yaml`

{{< alert title="Note" color="primary" >}}Currently, there is no check validating the correctness of the team identifier.{{< /alert >}}

Once everything is correctly setup, developers from teamA or teamB can see the environment `env1` and add their respective services without seeing work done by other teams. They will only see the work done within their team. Be sure to set the owner of your service as describe above. Otherwise, developers will not see the API service inside the environment due to the ACL restriction; they only see what their team(s) own. If the API service owner is not set, only an Engage Admin will be able to view and update the ownership of the API service.
