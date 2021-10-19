---
title: Amplify Central October 2021 Release Notes
linkTitle: Amplify Central October 2021
weight: 90
date: 2021-10-13
description: Amplify Central enables the user to manage their provider /
  consumer view.
---

## New features and enhancements

The following new features and enhancements are available in this update.

### Axway Central CLI

The Axway Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

**Axway Central CLI** version 1.25.0 is now available on NPM (<https://www.npmjs.com/package/@axway/axway-central-cli/v/1.25.0>).

The Axway Central CLI extension is compatible with the Axway CLI **version 2.2.0** (<https://www.npmjs.com/package/axway/v/2.2.0>).
More information about Axway CLI can be found here: [Axway CLI release note](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/release_notes/2_2_0_20210730_relnotes/index.html).

The following enhancements are available in this Axway Central CLI update:

* Amplify central CLI has been updated to configure the agent with the proper "latest release". The Docker command as well as the EC2 instance start script are no more referring to "latest" tag but the latest official release tag.

### Amplify Central WebUI

The Amplify Central WebUI is used by both the API providers and consumers to manage and consume APIs.

The following enhancements are available in this Amplify Central WebUI update:

## Fixed issues

The following issues are fixed in this Amplify Central update:

* **Private key and Public key transposed in amplify-agents-keys secret**. Previously when installing the agents with helm charts, the public and private keys were inverted in the helm which prevented the agent to start. Now, public and private keys are correctly setup and the agents can start.
* **CLI - Incorrect cloudformation_properties.json generated for AWS Agent**. After the uplift of the Service Account from Platform to Central, the cloud formation template expected the service account to start with "DOSA_" which is not the case with a platform service account. Now this check has been removed and the cloud formation template can be executed correctly.

## Known limitations

This following limitations exist in this version of Amplify Central:

* API Observer: Users that are assigned the Consumer role cannot see their subscription usage on the API Observer screen.
