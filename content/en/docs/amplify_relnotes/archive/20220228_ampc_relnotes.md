---
title: Amplify Central February 2022 Release Notes
linkTitle: Amplify Central February 2022
weight: 90
date: 2022-01-25
---

Amplify Central enables the user to manage their provider / consumer view.

## New features and enhancements

The following new features and enhancements are available in this update.

### Axway Central CLI

The Axway Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

**Axway Central CLI** version 2.8.0 is now available on NPM (<https://www.npmjs.com/package/@axway/axway-central-cli/v/2.8.0>).

The Axway Central CLI extension is compatible with the Axway CLI **version 3.2.3** (<https://www.npmjs.com/package/axway/v/3.2.3>).
For more information, see [Axway CLI release note](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/release_notes/3_2_3_20220216_relnote/index.html).

The following enhancements are available in this Axway Central CLI update:

* The Axway Central CLI `install agents` command has the option to replicate your organizational structure by auto-associating the team ownership of API Services.
* The Central Admin role can share environments with other teams using an Access Control List (ACLs).
* The Central Admin role can view / set the team ownership of an Environment or an API Service.
* The logical names of resources are now more friendly and memorable. The logical name is uniquely derived from the provided resource name / title or auto-generated.

### Amplify Central WebUI

* New API Services can be published faster to the Unified Catalog.  Errors in the API Specification file are allowed.
* Async API specification version 2.3.0 is now supported with six additional Async protocols: IBMMQ, JMS SECURE, MECURE, SOLACE, SOLACE SECURE, and SOLACE COMPRESSED.
* The UX display of many tags / attributes and long text names has been improved.

## Fixed issues

The following issues are fixed in this Amplify Central update:

* The Axway Central CLI `install agents` command outputs an error message indicating the required platform roles to access the teams.
* The Axway Central CLI `get` command can support retrieving thousands of resources without a timeout.

## Known limitations

This following limitation exists in this update of Amplify Central:

* None
