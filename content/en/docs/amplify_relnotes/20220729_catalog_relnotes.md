---
title: Asset Catalog July 2022 Release Notes
linkTitle: Asset Catalog July 2022
weight: 90
date: 2022-07-11
---

The Asset Catalog is used to organize your APIs, group them together, and make them ready to productize.

## New features and enhancements

The following new  enhancement is available in this update:

* **Asset filtering per owning team**: the asset can be filtered by owning team to help finding the appropriate one.
* **Corrupted asset detection**: a warning icon is displayed on the Asset resource column when the resource reference is missing. This can happen when an existing resource is removed from the dataplane.

## Fixed issues

The following issue has been fixed in this update:

* **Asset is not updated with latest API Service update**: previously, a change in the API service revision was not propagated to the asset. Now every changes in the service is reflected in the asset as soon as the asset is linked to the "latest" version of the API Service.

## Known limitations

The following limitation exists in this update:

* An API developer role may not be able to view all the asset details (e.g., Grouped Resources and Access Rights) of an asset shared with their team.
