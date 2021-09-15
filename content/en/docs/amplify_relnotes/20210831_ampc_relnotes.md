---
title: Amplify Central August 2021 Release Notes
linkTitle: Amplify Central August 2021
weight: 90
date: 2021-08-26
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

* When installing an agent, the user can select whether to send the transactions to the platform, which level of transactions sampling should be applied, and if all errors should be reported.
* When installing Amplify agents, a new Helm deployment model is available. This is useful when installing the agents on OpenShift or Kubernetes clusters.
* ISTIO Agents installation follows the same pattern as all other agents: 1. Ask questions, 2. Create the Central objects (Service Account / Environment), 3. Create additional object in the cluster (Secrets), 4. Provide the agents' starting command.
* Central assets can be viewed as a filtered list with the use of an RSQL parameter. For example, use this command to view a list of all assets which have tags equal to tag1 or tag2: `amplify central get assets -q "tags=in=(tag1,tag2)`

### Amplify Central WebUI

The Amplify Central WebUI is used by both the API providers and consumers to manage and consume APIs.

The following enhancements are available in this Amplify Central WebUI update:

* Service Mesh support has been updated to use environments with connected Istio Agents in the Topology view.

## Fixed issues

The following issues are fixed in this Amplify Central update: None.

## Known limitations

This following limitations exist in this version of Amplify Central:

* API Observer: Users that are assigned the Consumer role cannot see their subscription usage on the API Observer screen.
