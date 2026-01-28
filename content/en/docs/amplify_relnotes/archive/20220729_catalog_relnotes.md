---
title: Asset Catalog July 2022 Release Notes
linkTitle: Asset Catalog July 2022
weight: 90
draft: true
date: 2022-07-11
---

The Asset Catalog is used to organize your APIs, group them together, and make them ready to productize.

## New features and enhancements

The following new enhancements are available in this update:

* **Asset filtering per owning team**: the asset can be filtered by owning team to help find the appropriate one.
* **Corrupted asset detection**: a warning icon is displayed on the Asset resource column when the resource reference is missing. This can happen when an existing resource is removed from the data plane. A warning icon is also displayed on the Asset details page in the Asset version pull-down menu and on the grouped resource tab.

## Fixed issues

The following issues have been fixed in this update:

* **Asset is not updated with latest API service update**: previously, a change in the API service revision was not propagated to the asset. Now every change in the service is reflected in the asset with the use of the Discovery Agent as soon as the asset is linked to the "latest updated" version of the API service.
* **Asset deletion**: a team developer role can delete an asset if they are a member of the owning team.

## Known limitations

The following limitation exists in this update:

* Team sharing has been disabled from the Asset Catalog until "Shared with read-only" access is available.
