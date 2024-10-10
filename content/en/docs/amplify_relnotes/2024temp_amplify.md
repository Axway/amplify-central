---
title: Amplify Enterprise Marketplace November 2024
linkTitle: Amplify Enterprise Marketplace November 2024
weight: 6
date: 2024-10-08
---
We work hard to improve the Amplify Enterprise Marketplace experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in the latest release. It is always recommended to update the agents to have all the latest features, enhancements, and bug fixes.

Access the list of available agents from your organization:

* Go to *Help menus > Downloads > Repository* and search for agents.

    -or-

* Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents).

## Provider experience

### Agent SDK - Bug fix

| Case ID     | Internal ID  | Description                                       |
|-------------|--------------|---------------------------------------------------|
| -           | APIGOV-28892 | **Issue**: If a dash was used in the filter name, then the agent would not filter the API name properly. <br />**Resolution**: A fix was made to enable the matching with a dash in the filter name.  |

### Backstage Agent - Enhancement

* **New Backstage Discovery Agent** - The Discovery Agent enables the discovery of all new published APIs for a specific Backstage Software Catalog. These new published APIs can be viewed in the Service Registry as Design APIs. For details, see [Connect Backstage](/docs/connect_manage_environ/connect_backstage).

### Axway API Management Gateway Agent - Bug fix

| Case ID     | Internal ID  | Description                                       |
|-------------|--------------|---------------------------------------------------|
| 01637526    | APIGOV-28860 | **Issue**: In cases where multiple quotas exist on an application, the agent would not retain all quotas when removing a quota from the application. <br />**Resolution**: A fix was made to retain all necessary quotas in removal and migration scenarios. |

### Software AG webMethods Agent - Bug fix

| Case ID     | Internal ID  | Description                                       |
|-------------|--------------|---------------------------------------------------|
| -           | APIGOV-28899 | **Issue**: If there was an access request issue, then the agent would not record sufficient details in the logs. <br />**Resolution**: A fix was made to include more detailed information in the agent logs.  |

### SaaS (embedded) agents - enhancement

* **Identity Provider status** - A new Identity Provider status has been added to indicate a Pending, Success, or Error status.  For example, an Error status is set if an issue is found with the Identity Provider configuration of the URL or IdP Secret.

### Axway Central CLI - Enhancements

The latest version of the [Axway Central CLI is v3.6.0 on NPM](https://www.npmjs.com/package/@axway/axway-central-cli/v/3.6.0).

* **Install agent support for Backstage** - The `install agent` command has been enhanced to include Backstage and Azure Event hub agent options.
* **Internationalization support** - The ability to get and set the language definition information for Marketplace resources.
* **Force Delete command** - The `delete` command can now be use with a `--forceDelete` option on any resource. This is helpful when a resource is stuck in a "Deleting" state.

For details on Central CLI commands, see [Axway Central CLI Command reference](/docs/integrate_with_central/cli_central/cli_command_reference).

### Product Foundry - Bug fix

| Case ID   | Internal ID  | Description                                       |
|-----------|--------------|---------------------------------------------------|
| -         | APIGOV-28301 | **Issue**: Catalog Manager with read only access can modify a product. <br />**Resolution**: Catalog Manager users with read only access can no longer modify products. |

## Consumer experience

### Marketplace - Enhancement

* **Credential creation from product details** - A new button **Request Credential** is available from the *product details* screen. This will trigger the create credentials flow where you will need to provide: the resource you want a credential for, the owning team and the associated application where the credential will be attached to.

### Marketplace - Bug fix

| Case ID   | Internal ID  | Description                                       |
|-----------|--------------|---------------------------------------------------|
| -         | APIGOV-28332 | **Issue**: Consumer users that are part of a team with the x-private tag can not subscribe to Paid plans . <br />**Resolution**: The WebUI does not rely on the Subscriber role when the team has the x-private tag to allow subscribing to a paid plan. |
