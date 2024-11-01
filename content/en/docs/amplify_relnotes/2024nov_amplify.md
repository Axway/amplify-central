---
title: Amplify Enterprise Marketplace November 2024
linkTitle: Amplify Enterprise Marketplace November
weight: 4
date: 2024-10-28
---
We work hard to improve the Amplify Enterprise Marketplace experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}The supported agents' versions will no longer be documented here. See [Release Notes](/docs/amplify_relnotes) for the corresponding agent versions.{{< /alert >}}

---

## November 1st 2024

New features, enhancements, and bug fixes for the November ? update.

### Agents updates for November 1st

* **Provisioning Handling of Custom Credential Requests in APIM Discovery Agent**

    ENHANCEMENT; APIM AGENT<br />
    A new feature enhancement has been added in the APIM Agent that providers greater control over the provisioning of custom credential requests. This update introduces the ability to override the default Credential Request Definition (CRD) and manage the credential provisioning externally. Here's what you need to know about the new capability:
     * **Override Default CRD**: Users can define and implement their own custom CRD insted of relying on the default definitioin provided by the agent. This allows for a tailored request handling that aligns with unique integration requirements.
     * **Ignore Automatic Credential Provisioning**: The agent will automatically bypass the default credential provisioning in the API Manager, when a custom CRD is enabled. Users must manage the entire provisioning process externally, enabling integration with 3rd-party systems or custom authentication mechanisms. 

    To enable the override feature, update the releant settings in the APIM agent configuration and ensure you have the external credential provisioning flow in place, as the agent will not manage credentials when this feature is active.

* **All Agents Defaults to GRPC communication mode**

    ENHANCEMENT<br />
    This update in the Agent SDK v1.1.102 enables all existing agents to use the GRPC communication mode by default. By enabling this mode, agents can communicate with the platform more efficiently, compared to the traditional polled mode. To switch to the poll mode, you can set the CENTRAL_GRPC_ENABLED=false.

<!--### Agents known issues (hidden if none)-->

* **Agents screen update**

    ENHANCEMENT<br />
    Several enhancements have been added to the Agents screen to enhance the user experience and navigation within the platform. Here's what has changed:
     * **Agent Management Screen Relocation**: The **Agents** screen has been moved and is now accessible under **Topology -> Environments**.
     * **Updated columns for clarity**: The first column of the Agents screen now displays both the **Agent Title** and its **Logical Name**. The Dataplane column has been replaced with **Environments**, allowing user to see in which environment the agent is deployed.

* **Jump to a specific page in Service Registry**

    ENHANCEMENT<br />
    When multiple pages are available for the **Service Registry** to display, simply click the "..." in the pagination controls that is place at the button of the page and select tha page you want to navigate to. This makes it easier to browse large lists of Services in the Service Registry.

### Agents bug fixes for November 1st

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

### Axway CLI updates for November 1st

The latest version of the [Axway CLI is v3.2.14 on NPM](https://www.npmjs.com/package/@axway/axway/v/3.2.14).

### Marketplace updates for November 1st

* **Custom consumption units for billing and usage tracking**

   PROVIDER BILLING<br />
   We are thrilled to introduce a powerful new feature that gives users the flexibility to define custom consumption units for more accurate and adaptable usage-based charging. This enhancement is designed to meet the evolving needs of service providers, particularly with the rise of generative AI and Large Language Model (LLM) services.
    * **Custom Consumption Unit**: Users can now define custom units for measuring and charging API usage. Previously, usage metrics were limited to charging by transactions only. This feature is especially valuable for providers offering generative AI services, where usage metrics like tokens are more appropriate.
    * **Use custom unit in plan quota**: Custom consumption units can now be used in the **product plan quota** definitions.
 
    Refer to [Manage consumption unit](/docs/manage_product_foundry/manage_consumption_units) for more details.

* **Async API 3.0.0 support**

   CONSUMER EXPERIENCE, ENHANCEMENT<br />
   The component responsible for rendering API specifications has been upgraded to support **AsyncAPI v3.0.0**.
Users can now enjoy a visually appealing and well-structured presentation of AsyncAPI specifications directly in the Marketplace. In addition, when importing an AsyncAPI 3.0.0 specification into the **Service Registry**, the system will now automatically validate the definition. This ensures that only properly defined and compliant specifications are registered.

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
