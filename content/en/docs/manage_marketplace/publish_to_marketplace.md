---
title: Publish to the Marketplace
linkTitle: Publish to the Marketplace
weight: 25
---

Make a product available for consumption by subscribers. Publish a set of business capabilities into the Marketplace, which is the storefront into all products exposed for discovery and consumption by internal and / or external consumers.

## Before you start

Create a valid product by bundling assets that solve a business case, create comprehensive product user documentation, and define a subscription plan for your product. For information, see [Manage your Product Foundry](/docs/manage_product_foundry/).

## Objectives

Learn how to publish the product to the Marketplace and how to control its visibility in the Marketplace.

## Publish and set product visibility to a Marketplace

The product visibility helps you to control who can see the product in your various Marketplaces. By default, everyone can see the product in any Marketplace.

Visibility can be restricted based on a provider team, a provider team tag and/or a consumer organization (only available if consumer organization is enable in the Marketplace).

Visibility also depends on the Marketplace type (private vs. public). A public Marketplace can be browsed anonymously, but a product can be restriced to only authenticated users. Whereas, a private Marketplace always requires authenticated users.

1. Navigate to *Catalog > Product Foundry*.
2. Select **All Products**. *The product list view is displayed*.
3. Find the product you want to publish and click **+**, located at the bottom right beside the Unpublished badge, to start the publication process.
4. Select the Marketplace where you want to publish the product, as well as the visibility restriction: Authenticated Users and Platform Users and/or Marketplace Users.

    * **Authenticated users** visibility - indicates if the user must be authenticated to see the product:

        * **unchecked** - anonymous user can view any product in the Public Marketplace (default behavior). This option is not available for Private Marketplace.
        * **checked** - user must be authenticated to see the product and can be restricted farther with the Platform Users or Marketplace Users options. This cannot be unchecked for Private Marketplace.

    * **Platform Users** visibility: under **Platform Users**, select one of the following options from the **Visible To** menu:

        * **Everyone** - (default) the product is visible in the Marketplace by all registered users in your provider organization.
        * **Selected teams** - only members of the selected teams can see the product in the Marketplace.
        * **Exclude selected teams** - only members that are not part of selected teams can see the product in the Marketplace.
        * **Include teams having tag** - only members of the team that have the selected tag can see the product in the Marketplace.
        * **None** - the product is not visible to anyone in the Marketplace.

            * From the list of available teams in your provider organization, select the teams you want to give product visibility or remove visibility from.

    * **Marketplace Users** visibility: under **Marketplace User**, select one of the following options from the **Visible To** menu:

        * **Everyone** - (default) the product is visible in the Marketplace by all registered users in your provider organization.
        * **Selected organizations** - only users registered with a Marketplace account and a member of the selected consumer organization can see the product in the Marketplace.
        * **None** - the product is not visible to any user registered with a Marketplace account or anonymous users.

            * From the list of available consumer organizations in your provider organization, select the consumer organization you want to give product visibility or remove visibility from.

5. Click **Save and Publish** to apply the changes or **Cancel** to discard the changes. The current product version that will be visible from the Marketplace, as well as the defined plans, are displayed while saving.
6. Select the plan(s) you want activated at the same time as the publication.
7. Click **Publish** to publish the product to the Marketplace and make it available to the consumers.

## View/Update the product visibility

You can view the product visibility across all available Marketplaces.

1. Navigate to *Product Foundry*.
2. Select **All Products**. *The product list view is displayed*.
3. Select a product to view its details.
4. Either select the **Visibility** tab or click the **Publish** badge to be redirected to the **Visibility** tab where the following is displayed for each Marketplace:

    * The Marketplace name
    * The Marketplace product status (Published / Unpublished)
    * The visibility restrictions (Organization / Teams / Tags), if any

5. Click the Marketplace name to open and edit the visibility. Click the **Save** button to apply the changes or **Cancel** to discard the changes.
