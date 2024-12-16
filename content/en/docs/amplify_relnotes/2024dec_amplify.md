---
title: Amplify Enterprise Marketplace December 2024
linkTitle: Amplify Enterprise Marketplace December
weight: 3
date: 2024-12-02
---
We work hard to improve the Amplify Enterprise Marketplace experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## December 12, 2024

New features, enhancements, and bug fixes for the December 12 update.

### Agents updates for December 12, 2024

* **New agents versions available**

  (AGENT SDK UPDATE, DISCOVERY AGENT, TRACEABILITY AGENT)<br />
  New versions are available for our on-prem agents. Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents. This update includes several bug fixes listed under *Agents bug fixes for December 12, 2024*  and the **Custom Consumption Unit** functionality to the **Agent SDK v1.1.105**.

### Agents bug fixes for December 12, 2024

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
|  | APIGOV-29342 | **Issue**: V7 Discovery Agent credential request definitions with null identifiers.<br/>**Resolution**: Credential Request Definitions are no longer created with null indentifiers, which no longer breaks the consumer credential request flows in the Marketplace. The fix is available in Axway API Management discovery agent **v1.2.12**. |

### Marketplace updates for December 12, 2024

* **Custom Consumption Units Support**

  (PRODUCT FOUNDRY, NEW FEATURE, PROVIDER EXPERIECE)<br />
Enables you to define and manage custom consumption metrics for more tailored monetization strategies that better align with the unique requirements of your offerings. You can incorporate these custom-defined units into your plan for quota allocation to control how many units a consumer is entitled to use, and monitor the usage in Business Insights.<br />

See [Reporting custom unit usage](/docs/connect_manage_environ/connected_agent_common_reference/custom-unit-metrics) for more information about its implementation.

  This feature empowers you to align your quota system with custom metrics that reflect the value of your services, providing greater flexibility and revenue potential. Refer to [Manage consumption units](/docs/manage_product_foundry/manage_consumption_units) for more details.
  
* **Bulk Archive and Bulk Delete in Product Foundry List View**

  (PRODUCT FOUNDRY, ENHANCEMENT)<br />
  The bulk **Archive** functionality in the Product Foundry list view allows you to archive products in a single action.
  The bulk **Delete** allows you to remove multiple products at once, simplifying cleanup of your product list. An error message will appear if the delete action is not permitted, clearly stating the reason for the restriction (e.g., product not being in archive state).
  
## December 4, 2024

### Agents bug fixes for December 4, 2024

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
|  | APIGOV-29292 | **Issue**: Environments that have an agent without a `status.version` are throwing an error.<br/>**Resolution**: The error is no longer displayed in *environment details*. |
|  | APIGOV-29228 | **Issue**: The mock server errors with 404 on APIs having a "servers" section.<br/>**Resolution**: If an API spec contains a "servers" section under a path, then the mock server will no longer respond with a 404. The "servers" section of the loaded API spec is now removed before being passed to the prism library.|
| 01609369 | APIGOV-28448 | **Issue**: The metric for services discovered by the Discovery Agent is reflected inappropriately as "Registered Services" in the *Overview dashboard* when it should be under "Discovered Services".<br/>**Resolution**: A single metric is now displayed for Registered Services during the selected time period, which will cover both manually registered and automatically discovered services.|
|  | APIGOV-29391 | **Issue**: API calls occasionally fail contacting API Manager.<br/>**Resolution**: Automatic retries for all API calls to v7 was added to the Discovery Agent. The fix is available in Axway API Management Discovery Agent **v1.2.11**. |

### Marketplace updates for December 4, 2024

* **Tiered Plan Quota Limits**

  (PRODUCT FOUNDRY, ENHANCEMENT)<br />
  This feature enables users to enforce specific unit quantity limits per **day, week, or month**, regardless of the tiered pricing structure applied to the total usage during a billing cycle. Providers can ensure consumers stay within defined usage limits on a daily, weekly, or monthly basis by capping usage at predefined thresholds.
  
  **Limitation**<br />
  Currently, quota limits **cannot be enforced on a per-minute or per-hour basis**. This limitation will be addressed in a future release to provide even finer granularity for usage controls.

## December 2, 2024

New features, enhancements, and bug fixes for the December 2 update.

### Agents updates for December 2, 2024

* **New Agents Versions Available**

  (AGENT SDK UPDATE, DISCOVERY AGENT, TRACEABILITY AGENT)<br />
  New versions are available for our on-prem agents. Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents. This update includes several bug fixes to the **Agent SDK v1.1.104**.

### Agents bug fixes for December 2, 2024

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01663226 | APIGOV-29338 | **Issue**: Traceability Agent errors with 403 Forbidden upon starting when the proxy's whitelist includes only the FQDN central.eu-fr.axway.com but not its IPs.<br/>**Resolution**: A fix was released with Traceability Agent **v1.2.10** to not error out upon starting when the proxy whitelist does not include the IP. |

### Axway Central CLI updates for December 2, 2024

* **Introducing Axway Central CLI version 3.8.0**
  
The latest version of the [Axway Central CLI](https://www.npmjs.com/package/@axway/axway-central-cli/v/3.8.0) is **v3.8.0** on NPM. For details on Central CLI commands, see [Axway Central CLI Command reference](/docs/integrate_with_central/cli_central/cli_command_reference).
