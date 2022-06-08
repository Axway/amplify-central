---
title: Provider journey
linkTitle: Provider journey
weight: 10
---

The provider journey within the Amplify API Management Platform can be summarized through a number of steps:

* Discovering APIS from existing dataplane
* Organizing / Curate APIS
* Productize product (Product Foundry)
* Publish / Monetize product (Product Foundry / Marketplace)
* Manage your consumer subscription

## Discovering APIS

1- [Define an environment](/docs/coonect_manage_environ) that represent the dataplane

2- populate the environment with APIs

There are several ways for populating environment with API Service:

* **Manual** using the Central UI to [import the Service](/docs/connect_manage_environ/manage_services/add_api_service) definition (swagger / OAS3 / AsyncAPI ...)
* **Automatic** using a CI/CD procedure to [Integrate with Amplify](/docs/integrate_with_central)
* **Automatic and synchronized** using a discovery agent to [connect your environment with a Gateway](/docs/connect_manage_environ#synchronize-your-environment-with-a-gatewayvironment-with-a-gateway)
    * install agents to connect the dataplane to the environment using Axway central CLI. Axway supports Axway dataplane, Amazon Gateway API dataplance, Azure dataplane, Istio dataplane and Streams dataplane natively. Axway provide open source agents for Apigee Edge and Mulesoft. It also provide an Agent SDK to [build your own agents](/docs/connect_manage_environ/build_agent_with_sdk).
    * start the agent to discover APIS and populate the environment and service registry and keep the environment up to date based on the changes applies on the dataplane.

3- Viewing the APIs details.

Once the APIS are collected, you can visualize them in the [environment](/docs/connect_manage_environ/view_environments) view or [service registry](/docs/manage_service_registry) view. Environment view is specific to the environment whereas the service registry aggregates all services from all environments.

## Organizing and curating APIS with the asset catalog

The [Asset Catalog](/docs/manage_asset_catalog) is part of the Marketplace experience and is used as a first step to organize your APIs, group them together and make them ready to productize so they can be consumed by your customers, partners, internal developers through the Marketplace.

The journeys start by [creating an asset](/docs/manage_asset_catalog/asset_management/#create-an-asset).

Then the asset needs to be [released](/docs/manage_asset_catalog/asset_management/#activate-an-asset).

And some time later when there is no more need of the asset, you can [deprecate](/docs/manage_asset_catalog/asset_management/#deprecate-an-asset) and then [archive](/docs/manage_asset_catalog/asset_management/#archive-an-asset) the asset.

## Productize product

## Publish

## Manage your consumer subscription