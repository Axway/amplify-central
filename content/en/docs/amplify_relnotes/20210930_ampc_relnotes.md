---
title: Amplify Central September 2021 Release Notes
linkTitle: Amplify Central September 2021
weight: 90
date: 2021-09-30
description: Amplify Central enables the user to manage their provider /
  consumer view.
---

## New features and enhancements

The following new features and enhancements are available in this update.

### Axway Central CLI

The Axway Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

**Axway Central CLI** version 2.0.0 is now available on NPM (<https://www.npmjs.com/package/@axway/axway-central-cli/v/2.0.0>).

The Axway Central CLI extension is compatible with the Axway CLI **version 3.0.0** (<https://www.npmjs.com/package/axway/v/3.0.0>).
More information about Axway CLI can be found here: [Axway CLI release note](<https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/release_notes/3_0_0_20210924_relnotes/index.html>).

Note: Both the Axway Central CLI and Axway CLI are compatible major releases. Support for the prior major release has been deprecated along with older Node.js versions.

The following enhancements are available in this Axway Central CLI update:

* The Axway Central CLI can search/filter resources with either a simple query or an advanced RSQL query.
* The Axway CLI can create and manage service accounts.
* The Axway CLI can display organization activity and usage for a selected date range.
* The Node.js version supported is 12.13.0 or later.

### Amplify Central WebUI

The Amplify Central WebUI is used by both the API providers and consumers to manage and consume APIs.

The following enhancements are available in this Amplify Central WebUI update:

* An API provider can add an API Service without specifying an endpoint.  When using an OAS2 API Specifiation file, information from the file (title, description, and tags) is automatically entered for the API Service.

## Fixed issues

The following issues are fixed in this Amplify Central update:

* The Activity report on the Environment details page now displays an error message if an API Service encounters an error while publishing to the Unified Catalog. A similar error message is displayed on the API Service details page to assist with finding which catalog items failed to publish to the Unified Catalog.

## Known limitations

This following limitations exist in this version of Amplify Central:

* Only an OAS2 API Specification file is supported for the auto-population. Additional API Specification file types will be support soon.
