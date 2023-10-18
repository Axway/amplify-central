---
title: Add your environment
linkTitle: Add your environment
weight: 20
date: 2023-10-18
---

Within topology, stages are used to regroup API Service discovered from a gateway, a repository, or anything manually added to the environment.

Learn how to manage the stage to represent your API services life cycle.

## What is a Stage?

A stage is a concept that provides an abstraction view of the life cycle state of an API (for example, beta, dev, pre-prod, prod, and so on).
The stage allows to quickly identify where the API is available and if some restriction may apply. For instance in a dev stage, the API security might be less important than in production stage.
Once the API satisfied all the criteria of the current stage, the API can be promoted to the next stage. Like this you can build your API life cycle and ensure a correct implementation at each stage.

Stage management is optional.

## Stage and environment

A environment might be link to a specific Gateway managing one or more stages of the API life cycle.

Multiple stages can be assigned to an environment and one of them can become the default stage for the environment. Once you define a default stage, this stage will be automatically assigned to the API Service endpoint discovered in the environment. Without default stage, user will have to manually assign the stage to the API Service endpoint

By default the stage is assigned to no environment meaning nobody can use/view it.

## Stage and API Service endpoint

Each API Service is part of an environment. When the environment has a default stage, the discovered API Service endpoint is automatically assigned to the stage. When creating Asset, Catalog Manager has to decide which endpoint will be exposed by the asset and consequently which stage will be visible in the Marketplace when this asset is used in a published product.

## Stage and Marketplace visibility

By default the stage is not visible in the Marketplace. Catalog Manager has to explicitly give a stage visibility for each Marketplace where he wants the stage to be visible.

The visibility follows the same pattern as for product visibility and took precedence on the product visibility. That mean I can be part of a team having visibility on product but no visibility on the stage: in that situation, consumer will see the product but no resources inside.

A stage can be restricted to:

* provider organization: everyone, specific teams, nobody
* consumer organization: all organizations, specific organization, no organization

With the stage visibility, provider is able to exposed the endpoint he wants to the appropriate consumer audience:

* a dev endpoint may be suitable for an internal development teams but not for a partner team.
* a production endpoint may be suitable for the validation team as well as for a partner team or for any consumer organization.
  
## Stage Management

### Viewing available stages

1. Navigate to *Topology > Stages*.

The list of stages is displayed with the following information:

* Stage name - the title of the stage
* Stage visibility - the number of marketplace where the stage will be visible with restriction / the number of marketplace where the stage will be visible without restriction
* Asset count - number of asset having and endpoint attached to the stage
* Description - the stage description

### Creating a stage

1. Navigate to *Topology > Stages*.
2. Click **+ Add new Stage**.

    *The Add an Environment wizard is displayed*.

3. Add the following stage profile information and then click **Next**:

    * **Title** - enter a display name for the stage in the WebUI.
    * **Logical name** (Optional) - Will be auto computed based on the stage title if left empty.
    * **Description** (Optional) - enter a brief description of the stage.

4. Add the stage visibility for Marketplace in the list and then click **Next**:

    * Only set visibility to the Marketplace where the stage should be visible and leave other empty.
    * **Platform Users** visibility: under **Platform Users**, select one of the following options from the **Visible To** menu:

        * **Everyone** - (default) the stage is visible in the Marketplace by all registered users in your provider organization.
        * **Selected teams** - only members of the selected teams can see the stage in the Marketplace.
        * **Exclude selected teams** - only members that are not part of selected teams can see the stage in the Marketplace.
        * **Include teams having tag** - only members of the team that have the selected tag can see the stage in the Marketplace.
        * **None** - the stage is not visible to anyone in the Marketplace.

            * From the list of available teams in your provider organization, select the teams you want to give product visibility or remove visibility from.

    * **Marketplace Users** visibility: under **Marketplace User** (only available when MArketplace has consumer organization), select one of the following options from the **Visible To** menu:

        * **Everyone** - (default) the product is visible in the Marketplace by all registered users in your provider organization.
        * **Selected organizations** - only users registered with a Marketplace account and a member of the selected consumer organization can see the product in the Marketplace.
        * **None** - the product is not visible to any user registered with a Marketplace account or anonymous users.

            * From the list of available consumer organizations in your provider organization, select the consumer organization you want to give product visibility or remove visibility from.

5. Add the stage assignment for each environment and then click **Next**:

    * define for which environment the stage will be assigned using the **Assignment dropdown** and eventually if the stage is the default one for a specific environment using the **Default checkbox**. In case there is already a default stage assigned to an environment, the Default check box contains a "-" and a tooltip indicate which stage is the default.
    * by default the stage is not assigned to any environment.
    * you can select multiple environments at a time to assign/unassign the current stage.

6. Provide the Tags and Attribute details for the stage.
7. Click **Save** to create the stage and return to the list of stage view.

### Deleting a stage - TBD

1. Navigate to *Topology > Stages*.
2. Select one or more stage
3. Click Delete. A popup is displayed informing which environment can use the stage.

## Stage in Marketplace

Once a product using an asset having endpoint link to a stage, the consumer will be able to see that endpoint and the stage information if the team he is part of has visibility over the stage.

The stage is visible:

* when displaying the product resources page
* when displaying the plan details page
* when subscribing to a plan via the plan preview

If a consumer from a provider organization is part of multiple teams able to subscribe to a product, when subscribing, a warning is displayed informing that what he sees in the plan is not necessary what he will be able to access with the specified selected team and encourage the consumer to review the plan details before proceeding to the subscription.