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

* **Custom Credential support on Axway API Management Agent**

    ENHANCEMENT<br />
    The custom credential support has been released in a the Axway API Management agents to ignore handling of a custom credential (CRD).  The will enable customers to perform their own credential handling.

* **Agent SDK defaults to GRPC mode**

    ENHANCEMENT<br />
    The Agent SDK v1.1.102 has been updated so all agents default to use GRPC mode instead of polled mode (CENTRAL_GRPC_ENABLED=true).  This will improve the efficiency of the communication between the agents and the platform

<!--### Agents known issues (hidden if none)-->

* **UI for Agent Management**

    ENHANCEMENT<br />
    The Agent Management screen has been moved to a subpage under Topology -> Environments.  The first column displays the Agent Title and logical name and the Dataplane column has been renamed to Environment to improve the User Experience.

<!--### Agents known issues (hidden if none)-->

### Agents bug fixes for November ?

| Case ID     | Internal ID  | Description                                       |
|-------------|--------------|---------------------------------------------------|
| 01647785<br /> 01650304 | APIGOV-29069 | **Issue**: Axway API Management agent did not reflect the transision from "unhealthy" to a "running" states on the Ui. <br />**Resolution**: A fix was made to the agent state correctly. |
|             | APIGOV-29157 | **Issue**: Auto-release of a new asset version was not being triggered by CRD or ARD changes. <br />**Resolution**: A fix was made to the auto-release an asset version when ARD or CRD changes are made. |
| 01640474    | APIGOV-29048 | **Issue**: Axway API Management agent did not report metrics for a specific API. <br />**Resolution**: A fix was made to the handling of application name to check that the base path matches the path reported in the event. |
|             | APIGOV-29142 | **Issue**: Axway API Management Discovery agent would not be able to get the information needed to publish a proxy. <br />**Resolution**: A fix was made add retry logic to make additional attempts to get the information needed to publish a proxy. |
|             | APIGOV-29109 | **Issue**: Axway API Management Traceability agent helm chart deployment for StatefulSet would fail. <br />**Resolution**: A fix was made to the StatefulSet helm chart to include the missing required "serviceName"' field. |
|             | APIGOV-29054 | **Issue**: Mulsoft agent was using the incorrect timestamps for queries. <br />**Resolution**: A fix was made to the timestamps being used for the Mulesoft Monitoring API queries. |
|             | APIGOV-29150 | **Issue**: AWS Dicovery agent would encounter access request provisioning error because the credentials list API call failed. <br />**Resolution**: A fix was made to the call to get the credentials list. |
|             | APIGOV-29162 | **Issue**: Agent Management version detection would report an "Outdated" agent incorrectly. <br />**Resolution**: A fix was made to the ignore the hash value when comparing agent versions to the latest available version. |

### Axway Central CLI updates for November ?

The latest version of the [Axway Central CLI is v3.7.0 on NPM](https://www.npmjs.com/package/@axway/axway-central-cli/v/3.7.0). For details on Central CLI commands, see [Axway Central CLI Command reference](/docs/integrate_with_central/cli_central/cli_command_reference).

### Axway CLI updates for November ?

The latest version of the [Axway CLI is v3.2.14 on NPM](https://www.npmjs.com/package/@axway/axway/v/3.2.14).

### Marketplace updates for November 1st

* **Custom unit quota**

   PROVIDER BILLING<br />
   Currently only Transactions unit are monitored. But with the rising of LLM model, new units are necessary to charge consumer. By default the system manages only **Transaction** unit. When defining your plan quota, you can select any other consumption unit available in the system. Refer to [Manage consumption unit](/docs/manage_product_foundry/manage_consumption_units).

* **Async API 3.0.0 support**

   CONSUMER EXPERIENCE, ENHANCEMENT<br />
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
