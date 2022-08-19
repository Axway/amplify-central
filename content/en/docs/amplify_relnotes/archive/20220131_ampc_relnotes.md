---
title: Amplify Central January 2022 Release Notes
linkTitle: Amplify Central January 2022
weight: 90
date: 2022-01-14
description: Amplify Central enables the user to manage their provider /
  consumer view.
---

## New features and enhancements

The following new features and enhancements are available in this update.

### Axway Central CLI

The Axway Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

**Axway Central CLI** version 2.7.1 is now available on NPM (<https://www.npmjs.com/package/@axway/axway-central-cli/v/2.7.1>).

The Axway Central CLI extension is compatible with the Axway CLI **version 3.2.1** (<https://www.npmjs.com/package/axway/v/3.2.1>).
For more information, see [Axway CLI release note](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/release_notes/3_2_1_20220114_relnote/index.html).

The following enhancements are available in this Axway CLI update:

* The ability to view or update the team ownership of an environment or an API Service.
* A Central Administrator can add an existing service account to a team with `axway team user add <org> <team> <user_guid> --role <role>` command.

The following enhancements are available in this Axway Central CLI update:

* A developer on a team can access Environments and API Services owned by teams that the developer is a member of. Access is denied to Environments and API Services owned by teams that the developer is not a member of.

### Amplify Central WebUI

* Team ownership of Environments and API Services is now displayed on the WebUI.
* Consumers from the same team are not able to manipulate/view subscriptions from other team members in the Unified Catalog. However, the Central Administrator role can see subscriptions from every member of the team. For this enhancement, the API Provider must add the tag `x-private` on the corresponding team.
* API Providers can now publish APIs faster to the Unified Catalog because the validation of API Specification files on the WebUI has been relaxed.

## Fixed issues

The following issues are fixed in this Amplify Central update:

* Fixed a Central CLI issue where a Service account can now be used in a headless environment with the `install agents` command.
* Fixed a Central CLI issue with the `get` command with `--team` option which now support all teams that you have access to as a Central Administrator (not just the teams you are a member of).
* Fixed a Central CLI issue where the CLI command `axway central config` did not execute with telemetry enabled.
* Fixed a Central CLI issue where the CLI command to add a service account user to a team did not execute.

## Known limitations

This following limitation exists in this version of Amplify Central:

* None.
