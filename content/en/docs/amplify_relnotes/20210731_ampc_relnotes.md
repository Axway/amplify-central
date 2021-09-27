---
title: Amplify Central July 2021 Release Notes
linkTitle: Amplify Central July 2021
weight: 90
date: 2021-07-26
description: Amplify Central enables the user to manage their provider /
  consumer view. For more information, see the Amplify Central documentation.
---

## New features and enhancements

The following new features and enhancements are available in this update.

### Axway Central CLI

The Axway Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

**Axway Central CLI** version 1.21.0 is now available on NPM (<https://www.npmjs.com/package/@axway/axway-central-cli/v/1.21.0>).

The Axway Central CLI extension is compatible with the Axway CLI **version 2.2.0** (<https://www.npmjs.com/package/axway/v/2.2.0>).
More information about Axway CLI can be found here: [Axway CLI release note](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/release_notes/2_2_0_20210730_relnotes/index.html).

The following enhancements are available in this Axway Central CLI update:

* An API provider can now manage or group similar or duplicate API services together in an asset resource with a mapping template.
* Specific resources that have the same name in multiple scopes can now be deleted by specifying a scope parameter.

### Amplify Central WebUI

The Amplify Central WebUI is used by both the API providers and consumers to manage and consume APIs.

The following enhancements are available in this Amplify Central WebUI update:

* The Topology Environments list page performance has been improved by using a paginated table.
* Service Mesh v1 support has been removed. It is now replaced by [Amplify ISTIO agents](/docs/connect_manage_environ/mesh_management).

## Fixed issues

The following issues are fixed in this Amplify Central update:

* **Amplify Central CLI could not create a service account when the path contained a space**. Previously, on a Windows machine, when using the `axway central create service-account` command, the command failed if the path contained a space. Now, a long path or a path that contains a space is handled correctly and the service account can be created.
* **Long endpoint names that contained a period could not be created**. Previously, when creating an endpoint with a name containing a period, the endpoint could not be created. Now, an endpoint can be created with a period in its name.

## Known limitations

This following limitations exist in this version of Amplify Central:

* API Observer:

    * Users that are assigned the Consumer role cannot see their subscription usage on the API Observer screen.
