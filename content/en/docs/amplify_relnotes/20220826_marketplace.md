---
title: Marketplace August 26th 2022
linkTitle: Marketplace August 26th 2022
weight: 90
date: 2022-08-19
---
We work hard to improve the Marketplace experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in the latest release.

## Provider experience

### Agents

Current agent versions are based on Amplify Agents SDK v1.1.30. To display version information in the agents, use command `agentName --version`.

This version is compatible with:

* Axway API Management 7.6.2 SPx and 7.7 SPx
* AWS Gateway using SDK 2.0
* Azure latest release
* Istio 1.9.5
* Apigee Edge
* Mulesoft Anypoint platform v3

#### Azure Gateway

The following enhancements and bug fixes are available in this release.

##### Feature updates for Azure Gateway

**Consumer insights metrics** - The Traceability Agent enriches the metrics data with information related to the Marketplace (product / resource / subscription / quota / application) to help the consumer filter data in the Consumer insights UI pages.

##### Bug fixes for Azure Gateway

**API Service revision updates** - Agents detect when an API specification changes without deployment changes and updates the service instance with a new revision.

##### Known issues for Azure Gateway

**Renaming an API in API Manager is not synchronized by the Discovery Agent** - When an API is renamed in API Manager, Discovery Agent cannot recognize the API name change. This results in the API displaying in Amplify Central with dual entries of both the originally discovered name and the newly changed name.

### Service Registry

The following enhancements and bug fixes are available in this release.

#### Feature updates for Service Registry

There are no enhancements available in this release.

#### Bug fixes for Service Registry

There are no bug fixes available in this release.

#### Known issues for Service Registry

There are no known limitations in this release.

### Asset Catalog

The following enhancements and bug fixes are available in this release.

#### Feature updates for Asset Catalog

**Asset filtering per owning team** - The Asset Catalog can be filtered by owning team to help find the appropriate one.

**Corrupted asset detection** - A warning icon is displayed on the Asset resource column when the resource reference is missing. This can happen when an existing resource is removed from the dataplane. A warning icon is also displayed on the Asset details page in the Asset version pull-down menu and on the grouped resource tab.

#### Bug fixes for Asset Catalog

**Asset is not updated with latest API Service update** - Previously, a change in the API Service revision was not propagated to the asset. Now, every change in the service is reflected in the asset with the use of the Discovery Agent as soon as the asset is linked to the "latest updated" version of the API Service.

**Asset deletion** - Previously, a team developer role could not delete an asset. Now, a team developer role can delete an asset if they are a member of the owning team.

#### Known issues for Asset Catalog

**Team sharing** - Team sharing has been disabled from the Asset Catalog until *Shared with read-only* access is available.

### Product Foundry

The following enhancements and bug fixes are available in this release.

#### Feature updates for Product Foundry

There are no enhancements available in this release.

#### Bug fixes for Product Foundry

There are no bug fixes available in this release.

#### Known issues for Product Foundry

There are no known limitations in this release.

### Business insights

The following enhancements and bug fixes are available in this release.

#### Feature updates for Business insights

There are no enhancements available in this release.

#### Bug fixes for Business insights

There are no bug fixes available in this release.

#### Known issues for Business insights

There are no known limitations in this release.

## Consumer experience

### Marketplace

The following enhancements and bug fixes are available in this release.

#### Feature updates for Marketplace

There are no enhancements available in this release.

#### Bug fixes for Marketplace

There are no bug fixes available in this release.

#### Known issues for Marketplace

There are no known limitations in this release.

### Consumer insights

The following enhancements and bug fixes are available in this release.

#### Feature updates for Consumer insights

There are no enhancements available in this release.

#### Bug fixes for Consumer insights

There are no bug fixes available in this release.

#### Known issues for Consumer insights

There are no known limitations in this release.
