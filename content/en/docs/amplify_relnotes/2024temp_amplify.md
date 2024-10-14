---
title: Amplify Enterprise Marketplace November ?? 2024 (template)
linkTitle: Amplify Enterprise Marketplace November 2024
weight: 6
date: 2024-10-08
---
We work hard to improve the Amplify Enterprise Marketplace experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in the latest release. It is always recommended to update the agents to have all the latest features, enhancements, and bug fixes.

{{< alert title="Note" color="primary" >}}The supported agents will no longer be documented here. See [Release Notes](/docs/amplify_relnotes) for the corresponding agent versions.{{< /alert >}}

---

## Agents

### New Backstage Discovery Agent

<!--provider experience ; Backstage ; enhancement-->

The Discovery Agent enables the discovery of all new published APIs for a specific Backstage Software Catalog. These new published APIs can be viewed in the Service Registry as Design APIs. For details, see [Connect Backstage](/docs/connect_manage_environ/connect_backstage).

### Identity Provider status

<!--provider experience ; SaaS embedded agent; enhancement-->

A new Identity Provider status has been added to indicate a Pending, Success, or Error status.  For example, an Error status is set if an issue is found with the Identity Provider configuration of the URL or IdP Secret.

<!--### Agent known issues (hidden if none)-->

### Agent bug fixes

| Case ID     | Internal ID  | Description                                       |
|-------------|--------------|---------------------------------------------------|
| 01637526    | APIGOV-28860 | **Issue**: *Axway API Management Gateway Agent* - In cases where multiple quotas exist on an application, the agent would not retain all quotas when removing a quota from the application. <br />**Resolution**: A fix was made to retain all necessary quotas in removal and migration scenarios. |
| -           | APIGOV-28899 |**Issue**: *Software AG webMethods Agent* - If there was an access request issue, then the agent would not record sufficient details in the logs. <br />**Resolution**: A fix was made to include more detailed information in the agent logs. |

---

## Axway Central CLI

The latest version of the [Axway Central CLI is v3.6.0 on NPM](https://www.npmjs.com/package/@axway/axway-central-cli/v/3.6.0).

For details on Central CLI commands, see [Axway Central CLI Command reference](/docs/integrate_with_central/cli_central/cli_command_reference).

### Internationalization support

<!--provider experience ; enhancement-->

The ability to get and set the language definition information for Marketplace resources.

### Install agent support for Backstage - Axway Central CLI

<!--provider experience ; enhancement-->

The `install agent` command has been enhanced to include Backstage and Azure Event hub agent options.

<!--### Axway Central CLI known issues (hidden if none)-->

<!--### Axway Central CLI bug fixes (hidden if none)-->

---

## Axway CLI

The latest version of the [Axway CLI is v3.2.14 on NPM](https://www.npmjs.com/package/@axway/axway/v/3.2.14).

<!--### Axway CLI known issues (hidden if none)-->

<!--### Axway CLI bug fixes (hidden if none)-->

---

## Marketplace

### Credential creation from product details

<!--consumer experience ; Marketplace ; enhancement-->

A new button **Request Credential** is available from the *product details* screen. This will trigger the create credentials flow where you will need to provide: the resource you want a credential for, the owning team and the associated application where the credential will be attached to.

<!--### Marketplace known issues (hidden if none)-->

### Marketplace bug fixes

| Case ID   | Internal ID  | Description                                       |
|-----------|--------------|---------------------------------------------------|
| -         | APIGOV-28301 | **Issue**: *Product Foundry* - Catalog Manager with read only access can modify a product. <br />**Resolution**: Catalog Manager users with read only access can no longer modify products. |
| -         | APIGOV-28332 | **Issue**: *Marketplace* - Consumer users that are part of a team with the x-private tag can not subscribe to Paid plans . <br />**Resolution**: The WebUI does not rely on the Subscriber role when the team has the x-private tag to allow subscribing to a paid plan. |
