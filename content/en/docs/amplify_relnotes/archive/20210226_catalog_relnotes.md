---
title: Unified Catalog February 2021 Release Notes
linkTitle: Unified Catalog February 2021
weight: 90
date: 2021-02-26
description: The Unified Catalog is the Marketplace of all integration assets in
  the enterprise, that can range from APIs to Managed File Transfer Flows, and
  caters to both providers and consumers.
---
## New features and enhancements

The following new features and enhancements are available in this update:

### AsyncAPI support

Event-based APIs can now be registered in the Unified Catalog as AsyncAPI type.

* Providers can register an AsyncAPI under an environment in Amplify Central and publish it up to the Unified Catalog for consumption.
* Unified Catalog filter has been enhanced to allow filtering by AsyncAPI type.
* AsyncAPI specification is displayed in a friendly human-readable format.

### Catalog Subscription enhancements

Cosmetic enhancements have been made to the catalog asset subscription screens to show the subscription lifecycle. Users can now only see team and user details that pertain to their team as follows:

* Users assigned a Consumer or Developer role  can see which member of their team submitted a subscription request. They can no longer access the provider's profile information, including the team and user details.

## Fixed issue

The following issues were fixed in this update:

* **Team names no longer visible on catalog asset:** Previously, when browsing the Unified Catalog and looking at the teams the catalog asset had shared with, you could no longer see the team names. After the fix, the user can see the team names.
* **Logging with a user that was assigned the Consumer role, does not allow viewing the subscription details:** Previously, the user would get a "You do not have access privileges to view this content" error. After the fix, the consumer can access the details of a subscription that belongs to their team.
* **Failure publishing to the Unified Catalog using the Amplify Apigee extension for APIs with long description:** Previously, the API extension would error out while creating a consumer instance and publishing to the Catalog when an API description was larger than 350 chars. Now, the description is trimmed to 350 and the full content is added to the overview markdown documentation. Please refer to  [Unified Catalog Integration with Apigee](<* https://github.com/Axway/unified-catalog-integrations/tree/master/apigee/apigee-extension>).
* **Filter by category pagination issue:** Previously, when a user clicked *Show more* to display all categories in the filter, and then selected a category from the list, the last page would load multiple times until the Filter Category disappeared from the screen. Now, all categories are displayed only once.

## Known limitations

There are no known limitations in this release.
