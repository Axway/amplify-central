---
title: Add and manage stages
linkTitle: Add and manage stages
weight: 35
date: 2023-10-18
---

Within topology, stages are used to regroup API services discovered from a gateway, a repository, or anything manually added to the environment.

Learn how to manage the stage to represent your API services lifecycle.

## What is a Stage?

A stage is a concept that provides an abstraction view of the lifecycle state of an API (for example, beta, dev, pre-prod, prod, etc.).
The stage identifies where the API is available and if any restriction apply. For instance, in a dev stage, the API security might be less important than in production stage.
Once the API satisfies all the criteria of the current stage, the API can be promoted to the next stage, helping you to build your API lifecycle and to ensure a correct implementation at each stage.

{{< alert title="Note" color="primary" >}}Stage management is optional.{{< /alert >}}

## Stage and environment

An environment might be linked to a specific gateway managing one or more stages of the API lifecycle.

Multiple stages can be assigned to an environment and one of them can become the default stage for the environment. Once you define a default stage, this stage will be automatically assigned to the API service endpoint discovered in the environment. Without a default stage, you must manually assign the stage to the API service endpoint

By default, the stage is assigned to no environment, meaning that nobody can use/view it.

## Stage and API service endpoint

Each API service is part of an environment. When the environment has a default stage, the discovered API service endpoint is automatically assigned to the stage. When creating an asset, the Catalog Manager must decide which endpoint will be exposed by the asset and consequently which stage will be visible in the Marketplace when this asset is used in a published product.

If the environment supports multiple stages, then each API service endpoint must be manually assigned to a specific stage via the **lifecycle** field.

API service endpoint sample for attaching a specific stage:

``` yaml
---
group: management
apiVersion: v1alpha1
kind: APIServiceInstance
name: customer-data-instance-prod-v2
title: Customer Data Service Instance PROD V2
metadata:
  scope:
    kind: Environment
    name: demo-prod
attributes: {}
finalizers: []
tags:
  - nonprod
spec:
  endpoint:
    - host: prod200.k8s.axwayamplify.com
      port: 443
      routing:
        basePath: /apis
      protocol: https
  apiServiceRevision: customer-data-revision-v200
lifecycle:
  stage: demo-prod
```

## Stage and Marketplace visibility

By default, the stage is not visible in the Marketplace. The Catalog Manager must explicitly give a stage visibility for each Marketplace where the stage is to be visible.

The visibility follows the same pattern as for product visibility but has precedence over the product visibility. Meaning that there could be visibility on the product but no visibility on the stage. In this situation, the consumer will see the product but no resources inside.

A stage can be restricted to:

* Provider organization: everyone, specific teams, nobody
* Consumer organization: all organizations, specific organization, no organization

With the stage visibility, the provider can expose an endpoint to the appropriate consumer audience:

* A dev endpoint may be suitable for an internal development team but not for a partner team.
* A production endpoint may be suitable for the validation team as well as for a partner team or any consumer organization.
  
## Stage management

### Viewing available stages

Engage Admin, Catalog Manager and Developer can view the Stages.

1. Navigate to *Topology > Stages*.

The list of stages is displayed with the following information:

* Stage name - the title of the stage.
* Environment - the number of environments the stage is associated to.
* Services - the number of services the stage is associated to.
* Assets - the number of assets that have a service the stage is associated to.
* Description - the stage description.

### Creating a stage

Only the Engage Admin role can create Stages.

1. Navigate to *Topology > Stages*.
2. Click **+ Add Stage**.

    *The Add a Stage wizard is displayed*.

3. Add the following stage profile information and then click **Next**:

    * **Title** - enter a display name for the stage in the WebUI.
    * **Logical name** (Optional) - if left empty, it will auto computed based on the stage title.
    * **Description** (Optional) - enter a brief description of the stage.

4. Add the stage visibility for the Marketplace in the list and then click **Next**:

    * Only set visibility to the Marketplace where the stage should be visible. Leave others empty.
    * **Platform Users** visibility: under **Platform Users**, select one of the following options from the **Visible To** menu:

        * **Everyone** - (Default) - the stage is visible in the Marketplace by all registered users in your provider organization.
        * **Selected teams** - only members of the selected teams can see the stage in the Marketplace.
        * **Exclude selected teams** - only members that are not part of selected teams can see the stage in the Marketplace.
        * **Include teams having tag** - only members of the team that have the selected tag can see the stage in the Marketplace.
        * **None** - the stage is not visible to anyone in the Marketplace.

            * From the list of available teams in your provider organization, select the teams you want to give product visibility to or remove visibility from.

    * **Marketplace Users** visibility: under **Marketplace User** (only available when the Marketplace has a consumer organization), select one of the following options from the **Visible To** menu:

        * **Everyone** - (Default) - the product is visible in the Marketplace by all registered users in your provider organization.
        * **Selected organizations** - only users registered with a Marketplace account and a member of the selected consumer organization can see the product in the Marketplace.
        * **None** - the product is not visible to any user registered with a Marketplace account or anonymous users.

            * From the list of available consumer organizations in your provider organization, select the consumer organization you want to give product visibility to or remove visibility from.

5. Add the stage assignment for each environment and then click **Next**:

    * Define for which environment the stage will be assigned using the **Assignment dropdown** and if the stage will be the default for a specific environment using the **Default checkbox**. If there is already a default stage assigned to an environment, the Default check box will contain a "-" and a tooltip indicating which stage is the default.
    * By default, the stage is not assigned to any environment.
    * You can select multiple environments at a time to assign/unassign the current stage.

6. Provide the Tags and Attribute details for the stage.
7. Click **Save** to create the stage and return to the list of stage views.

### Deleting a stage

A stage cannot be deleted once it is assigned to one or more environments and/or API services. You must remove the associations before deleting a stage.

Only the Engage Admin role can delete stages.

1. Navigate to *Topology > Stages*.
2. Select the stage(s).
3. Click **Delete**. A popup is displayed informing which environment can be used the stage.

## Stage in Marketplace

Once a product has an asset with an endpoint linked to a stage, the consumer will be able to see that endpoint and the stage information if their team has visibility over the stage.

The stage is visible when:

* Displaying the product resources page.
* Displaying the plan details page.
* Subscribing to a plan through the plan preview.

{{< alert title="Note" color="primary" >}}If a consumer from a provider organization is part of multiple teams that can subscribe to a product, then a warning is displayed when attempting to subscribe. It informs the consumer that what is seen in the plan is not necessarily what will be accessible to the specified team. The consumer is encouraged to review the plan details before proceeding to the subscription.{{< /alert >}}

## Multi-languages support

If the stage is visible on the Marketplace, then it's translation(s) can be added so that it can be viewed based on the Marketplace language settings.

By default, four languages are available : English / French / German / Brazilian Portuguese

To set multi-languages support, you need:

* The stage default language
* The stage translation languages

The language(s) can be set using the *List view* ellipsis menu **Translate**. This will open the *translation details* screen where you can set the default language as well as the other needed languages.
