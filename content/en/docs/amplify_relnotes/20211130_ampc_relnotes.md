---
title: Amplify Central November 2021 Release Notes
linkTitle: Amplify Central November 2021
weight: 90
date: 2021-11-30
description: Amplify Central enables the user to manage their provider /
  consumer view.
---

## New features and enhancements

The following new features and enhancements are available in this update.

### Axway Central CLI

The Axway Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

**Axway Central CLI** version 2.5.3 is now available on NPM (<https://www.npmjs.com/package/@axway/axway-central-cli/v/2.5.3>).

The Axway Central CLI extension is compatible with the Axway CLI **version 3.1.0** (<https://www.npmjs.com/package/axway/v/3.1.0>).
More information about Axway CLI can be found here: [Axway CLI release note](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/release_notes/3_1_0_20211202_relnotes/index.html).

The following enhancements are available in this Axway CLI update:

* Axway CLI has added the current team/role to the 'auth list', 'auth login', and 'auth whoami' commands.
* Axway CLI has added an 'axway auth swtich --team name' command to switch your current team to another team which you are a member of.

The following enhancements are available in this Axway Central CLI update:

* Amplify Central CLI can manage team ownership of Environments and API Services.
* Amplify Central CLI has added a simple '--team' filter for users to only Get Environments and API Services for a specific team which they are a member of. 
* Amplify Central CLI has deprecated the "axway central create service-account" command as of Central CLI version 2.5.0 or later.  The management of service accounts is included in the Axway CLI.

### Amplify Central WebUI

* When adding an API Service using an API Specification file (OAS2/OAS3), the title, description and endpoints are auto-populated.  This reduces the extra data entry steps for hte user.

## Fixed issues

The following issues are fixed in this Amplify Central update:

*  Amplify Central CLI has be updated to enable the use of "install agents" command in a headless mode with a service account and tooling credentials of a platform admin account.

## Known limitations

This following limitation exists in this version of Amplify Central:

* API Service details: The team ownership of API Services is not diplayed on the WebUI.
