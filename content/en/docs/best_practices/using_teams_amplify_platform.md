---
title: Using teams in Amplify platform
linkTitle: Using teams in Amplify platform
draft: false
weight: 10
description: A set of best practices for using teams in the Amplify platform,
  which will help you to have a global and centralized approach of managing your
  APIs.
---
Use this information as a guide for setting up your teams in the Amplify platform.

{{< alert title="Note" color="primary" >}}Please note that the team concept is flexible, it can be used for your specific use case.
{{< /alert >}}

A team is a concept in the Amplify platform that is used to group users and assets. This ensures that assets can be governed and consumed by a specific group of users.

![Using teams](/Images/central/best_practices/using_teams.png)

A team is linked to multiple components in the Amplify platform:

* **Agents** - publish API Services in an environment and can transform these API services into Unified Catalog items. These Unified Catalog Items represent an API in the data plane and are owned by a specific team. APIs coming from AWS, Azure and Istio must be linked to a specific team. APIs coming from the Axway API Gateway can either be linked to a specific team or the Agent can link the API to the same team as the Organization that the API belongs to in the API Gateway. Creating Unified Catalog items is optional, and you can choose to create your own Unified Catalog items through the API or CLI and assign them to the team of your choice.
* **Users and service accounts** - users and service accounts can be a member of one or more teams. A user and a service account are assigned one role per team. Assigning this membership and the role can be done manually or automatically:

    * **Manually** - use the UI to add users and service accounts to one or more teams and assign team roles.
    * **Automated** - use either IdP or API:<br />**IdP** - add a user to one or more teams and assigned a role based on attributes from the customers IdP. Every time a user logs in, the Amplify platform will check the attributes from the IdP and make sure the user belong to the correct team and has the correct role.<br />**API** - add users and service accounts to one or more teams and assigning team roles by using the API.
* **Roles** - the Amplify platform offers the following team roles. A user can only be assigned one role per team:

    * **Administrator** - manages the users of the team, but cannot manage assets of that team.
    * **Catalog Manager** - has full control of the assets of the team, but cannot manage the users of the team.
    * **Developer** - edits and consumes assets of the team, but cannot manage the users of the team.
    * **Consumer** - can only consume the assets of the team.
* **Unified Catalog**:

    * Every item in the Unified Catalog, which represents an API, is owned by a specific team. That team has full control over their APIs.
    * An API can be shared with another team. The other team can only consume the API and has no other rights.
    * The team can consume the API by subscribing to it. An approval step can be configured, but the owning team must approve the subscription.

## Types of teams

Although you can choose how you set up and use your teams, Axway provides the following best practices. Please note that all teams are of the same type and are equal in functionality:

* **Global** - contains all the company’s APIs or the APIs the other teams want to share with the broader public. All company users can be consumers in the team so they can discover and use all company APIs.
* **Departmental** - contains all the assets of a department.
* **Project** - create for a specific project. This enables all members of the project to work together on a specific set of related APIs.
* **Amplify Gateway Agent Organization** - use to reflect the same organization structure as the API Gateway in the Amplify platform. To use this approach, you must have the same number of teams as you have organizations in the API Gateway and they must have the same names. The Amplify Gateway Agent will add the discovered APIs in the team that matches the organization.
* **Data plane** - manages all the APIs belonging to a specific data plane. To use this approach, create a team for a specific data plane and configure each agent to use the team that corresponds with that specific data plane.
* **Personal** - use to create/use personal APIs. To use this approach, either give each member of the organization a Personal team, only give certain profiles a Personal team, or create a Personal team when someone asks for it. The user has the Developer role in this team. Only an Administrator can add other users to this team.

{{< alert title="Note" color="primary" >}}All members of a team have access to all subscriptions of that team. For example, if you have a Global team with all users of your organization, then all users will see all subscriptions made in that Global team. To restrict a user’s access to their own subscriptions, you must create a Personal team for that user and then add or share APIs with that Personal team.
{{< /alert >}}

## Use teams to support a global and centralized API strategy

![Teams strategy](/Images/central/best_practices/teams_strategy.png)

A global and centralized API team strategy consists of:

* **Data plane**:

    * **Gateway** - contains the API Gateways that host and run the APIs. There can be multiple gateways of several types, such as the Axway API Gateway, Azure API Gateway, Amazon API Gateway, Istio Service Mesh, etc.
    * **Agents** - the link between the data plane and the Amplify platform. They discover the APIs in the gateways and publish them in environments hosted on Amplify Central.
* **Amplify platform**:

    * **Amplify Central** - hosts the environments which represent the different gateways in the data planes. It also contains the definitions of the APIs that were discovered by the agents.
    * **Unified Catalog** - use to view and consume APIs. Use provider and consumer teams with Unified Catalog:

        * **Provider** - these teams can, for example, be linked to a department or a project and are used for all APIs that the provider team owns. The members of the provider team are the users of the project or the department.<br /> An API in a provider team can either be shared with other provider teams or  with the Global team. If it is shared with the Global team, then it becomes part of the global catalog and everyone has access to the API.<br /> There are three approaches to add APIs to a provider team:

            * **Automated** - an agent can automatically create API Catalog items with the following restrictions:<br /> For Azure and AWS, all APIs that are discovered by a certain agent are added to the same team.<br /> For the Axway API Gateway, the Agent can either put all APIs in a single team, or the agent can put the APIs from API Manager organization X in team X.
            * **Scripted** - use the APIs or CLI to put the APIs in the correct team.
            * **Manual** - use the APIs or CLI to put the APIs in the correct team.

        * **Consumer** - one Global team where all members have the Consumer role. Users can browse the catalog to have a view of all the APIs that are offered by the company, and they can also subscribe to the APIs. The approval of the subscription is handled by the provider team that owns the API. A user from a consuming team can choose to create a composite API on top of different APIs that are found in this Global team. That API will then be hosted in the data plane, pushed to the team of that user, and become a new API in the Global team. One limitation is that all users of the Global team have access to all subscriptions created in the Global team.
