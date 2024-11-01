---
title: Amplify Enterprise Marketplace November 2024
linkTitle: Amplify Enterprise Marketplace November
weight: 4
date: 2024-10-28
---
We work hard to improve the Amplify Enterprise Marketplace experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}The supported agents' versions will no longer be documented here. See [Release Notes](/docs/amplify_relnotes) for the corresponding agent versions.{{< /alert >}}

---

## November ? 2024

New features, enhancements, and bug fixes for the November ? update.

### Agents updates for November ?

* **Enhancement title**

    (Add tags here and remove hidden text<!--For example, PROVIDER EXPERIENCE, BACKSTAGE, ENHANCEMENT-->) <br />
    Enhancement description.

* **Enhancement title**

    (Add tags here and remove hidden text<!--For example, PROVIDER EXPERIENCE, SAAS, EMBEDDED AGENT, ENHANCEMENT-->) <br />
    Enhancement description.

<!--### Agents known issues (hidden if none)-->

### Agents bug fixes for November ?

| Case ID     | Internal ID  | Description                                       |
|-------------|--------------|---------------------------------------------------|
| xxxxxxxx    | APIGOV-xxxxx | **Issue**: (Agent name goes here) Issue description. <br />**Resolution**: Resolution description. |

### Axway Central CLI updates for November ?

The latest version of the [Axway Central CLI is v3.6.0 on NPM](https://www.npmjs.com/package/@axway/axway-central-cli/v/3.6.0). For details on Central CLI commands, see [Axway Central CLI Command reference](/docs/integrate_with_central/cli_central/cli_command_reference).

* **Enhancement title**

    (Add tags here and remove hidden text<!--For example, PROVIDER EXPERIENCE, ENHANCEMENT-->) <br />
    Enhancement description.

<!--### Axway Central CLI known issues for November ? (hidden if none)-->

<!--### Axway Central CLI bug fixes for November ?  (hidden if none)-->

### Axway CLI updates for November ?

The latest version of the [Axway CLI is v3.2.14 on NPM](https://www.npmjs.com/package/@axway/axway/v/3.2.14).

<!--### Axway CLI known issues for November ?  (hidden if none)-->

<!--### Axway CLI bug fixes for November ?  (hidden if none)-->

### Marketplace updates for November ?

* **Custom unit quota**

    (Add tags here and remove hidden text<!--For example, CONSUMER EXPERIENCE, MARKETPLACE, ENHANCEMENT-->) <br />
   Currently only Transactions unit are monitored. But with the rising of LLM model, new units are necessary to charge consumer. TBD + link to current documentation

* **Async API 3.0.0 support**

    (Add tags here and remove hidden text<!--For example, CONSUMER EXPERIENCE, MARKETPLACE, ENHANCEMENT-->) <br />
   The component managing the display of API specification has been upgrades to display the Async API v3.0.0. The component validate the specification definition while importing the specification in Service Registry and allow a nice visual on the Marketplace.

* **Enhancement title**

    (Add tags here and remove hidden text<!--For example, CONSUMER EXPERIENCE, MARKETPLACE, ENHANCEMENT-->) <br />
   Feature description.

<!--### Marketplace known issues for November ?  (hidden if none)-->

### Marketplace bug fixes for November 1st

| Case ID   | Internal ID  | Description                                       |
|-----------|--------------|---------------------------------------------------|
| 01651879 | APIGOV-29133 | **Issue**: Edit plan name not possible <br />**Resolution**: Duplicate product plans has been fixed to allow plan name edition. |
|          | APIGOV-29081 | **Issue**: [Product Foundry] Product plan names can not be changed from the UI <br />**Resolution**: Duplicate of APIGOV-29133 |
|          | APIGOV-29100 | **Issue**: Error when editing plan quotas and saving <br />**Resolution**: creating a paid plan without the setting up plan cost is now working. |
|          | APIGOV-29103 | **Issue**: Advanced Search Functionality Issue <br />**Resolution**: Plan search backend query has been change to to match terms that do not need to be in exact order or consecutive. |
| 01640474 | APIGOV-29088 | **Issue**: No transactions of BO800OPENBO@SENTBANKTRANSFER in BI/CI under Consumer Org <br />**Resolution**: the Subscription / Application metrics enrichment is done even if the related asset/product release is not the latest so that it does not prevent to display the metrics data. |
|          | APIGOV-28102 | **Issue**: [Marketplace UI] Authorize side-blade crashes when selecting auth type <br />**Resolution**: swagger UI component is now initialized correctly based on the authorization definition of the specification. |

---
