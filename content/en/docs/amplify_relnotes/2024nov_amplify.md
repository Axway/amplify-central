---
title: Amplify Enterprise Marketplace November 2024
linkTitle: Amplify Enterprise Marketplace November
weight: 4
date: 2024-10-28
---
We work hard to improve the Amplify Enterprise Marketplace experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month of November. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---
## November 22, 2024
New features, enhancements, and bug fixes for the November 16 update.

### Agents updates for November 22, 2024

* **Azure Discovery Agents - Entra ID Integration**

  (NEW FEATURE, ON-PREM DISCOVERY AGENT, EMBEDDED DISCOVERY AGENT,)<br />
  The Azure Discovery agent now supports managing **ClientID** and **ClientSecret** credentials in **Entra ID (formerly Azure AD)**. When discovering and publishing the virtualized APIs that are protected using Entra ID, the Discovery Agent can associate the registered ClientID and CLientSecret to the published resources on Enterprise Marketplace. Marketplace consumers can seamlessly obtain the necessary credentials for their applications without additional setup. This feature is available for both Azure On-prem and Embedded Agents. To enable this feature, ensure that your Discovery Agent is updated to the latest version. Follow the updated documentation for guidance on configuring and managing Entra ID credentials for your APIs.

## November 20, 2024

### Marketplace bug fixes for November 20, 2024

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| | APIGOV-29152 | **Issue**: Not all access request are visible in the application details <br/>**Resolution**: Limit increased to view 50 access request per application. |
| 01607206 | APIGOV-28846 | **Issue**: Web server version disclosure <br/>**Resolution**: Remove the server information when no path match the request. |
| 01607206 | APIGOV-28845 | **Issue**: Failure to sanitize parameters <br/>**Resolution**: Remove input value from validation message for query parameters |

## November 16, 2024

New features, enhancements, and bug fixes for the November 16 update.

### Marketplace updates for November 16, 2024

* **Introducing the table view in Product Foundry**

  (NEW FEATURE, PROVIDER EXPERIENCE, PRODUCT FOUNDRY)<br />
  Users now have the flexibility to switch between the existing **Card Layout** and the new default **Table Layout** using the toggle buttons at the top of the product list page. The action menu contains options to **Publish** to Marketplace, **Translate** into a language of your choice, **Create plan** to monetize the product, **Archive** to retire the product and allow for **Delete**.

## November 15, 2024

New features, enhancements, and bug fixes for the November 15 update.

### Agents updates for November 15, 2024

* **New agent versions available**

    (NEW AGENT RELEASES)<br />
    New versions are available for our on-prem agents. Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents. This update includes several bug fixes and improvements to the Agent SDK.

### Agents bug fixes for November 15, 2024

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01649100 | APIGOV-29100 | **Issue**: Not able to view analytics data for v7 migrated applications with uppercase names <br/>**Resolution**: The agents have been updated to allow handling of application names that contain uppercase characters. |
| 01640474 | APIGOV-29229 | **Issue**: Transactions for the an API that contains '-' in the path are not visible in Consumer Insights or in the Business Insights for a consumer organization. <br/>**Resolution**: A fix has been to show transaction data for APIs that contain **-** in the path name. |
|  | APIGOV-29201 | **Issue**: The publish to marketplace button in service details brings up the create product sideblade <br/>**Resolution**: The **Publish to Marketplace** button now opens up the appropriate sideblade. |
| | APIGOV-29184 | **Issue**: When adding a new endpoint in UI, it shows an error for a valid IP address <br/>**Resolution**: A fix has been released to allow configuring an endpoint with a valid IP address. |

## November 14, 2024

New features, enhancements, and bug fixes for the November 14 update.

### Marketplace updates for November 14, 2024

* **Try It Out Experience Enhancements**

  (ENHANCEMENT,CONSUMER EXPERIENCE)<br />
  We have made several improvements to the **Try it out** experience, designed to make the testing of an API easier and more intuitive. Here's what is new in this release:
    * **Credential Origin Selection**: We've introduced a new field called **Credential Origin**. This will allow you to select if you wish to use credentials managed and issued directly from the Marketplace or a credential generated externally.
    * **Automatic Client ID and Secret population**: Now, the **Client ID** and **Client Secret** fields will be automatically populated based on the selected credential. Previously, the values had to be manually entered after selecting the credential. This reduces the unnecessary clicks and speeds up the try it out process.
    * **Bearer Authorization**: The **Provide your token** option in **Credential Type** has been renamed to **Bearer Authorization** to better reflect the credential type used. Bearer Authorization is a widely used HTTP authentication scheme that allows secure access by sending a token with each request. In this setup, the token (or “bearer token”) is included in the Authorization header, eliminating the need to share sensitive credentials like a username and password for each request.
    * **Override Token URL**: You now have the option to **override the default Token URL** with your own token.

### Marketplace bug fixes for November 14, 2024

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| | APIGOV-29192 | **Issue**: Error (400) when editing paid plan billing and saving <br/>**Resolution**: Switching from paid to free and vice-versa is now correctly handling the billing information of each plan type |
| 01653208 | APIGOV-29172 | **Issue**: Marketplace Advanced Search Error <br/>**Resolution**: A fix has been added to Advanced Search feature to return the search results when a product is published in the same marketplace twice. |
| 01651887 | APIGOV-29158 | **Issue**: Subscription migration ends with duplicates <br/>**Resolution**: A fix was release to not duplicate subscriptions when duplicating a plan and migration subscriptions. |
| | APIGOV-29121 | **Issue**: [Invoices] Subscription invoices do not contain the setup cost if there is no base price defined <br/>**Resolution**: The invoice now contains all information of the plan cost (setup fee + recurring fee). |

## November 13, 2024

New features, enhancements, and bug fixes for the November 13 update.

### Marketplace updates for November 13, 2024

* **Track an invoice**

  (NEW FEATURE, PROVIDER EXPERIENCE)<br />
  When the Marketplace is configured with a billing provider, you can now track the status of all consumer invoices on the **Invoices screen**. This page enables providers to monitor consumer payments and ensure timely follow-ups on overdue accounts. You can quickly check the invoice status, amount, due date and more. Using the filtering by invoice status option (e.g Paid, Past Due) you can easily locate outstanding invoices that need attention or confirm payment on recently paid invoices. You can refine your view with **Created** and **Due Date** filters to see invoices generated or due within a specific time frame. To access the Invoices page, navigate to your platform organization, Marketplace -> Invoices. You will need either a Central Admin or Catalog Manager role to be able to access this feature.

* **Edit an active plan**

  (ENHANCEMENT, PROVIDER EXPERIENCE)<br />
  A new feature enhancement has been added to the product plans to allow users to **edit active plans**, enabling grater flexibility and control over plan management. With this update, you can:
    * **Add new API resources** to an existing quota definition.
    * **Create a new quota** to accomodate additional resources.
    * **Remove corrupted resources** from the plan to ensure accuracy and valid plan entitlements.

  **Limitations**:
    * Plan **pricing** cannot be modified.
    * The **quota model** remains fixed and cannot be adjusted.

## November 6, 2024

New features, enhancements, and bug fixes for the November 6 update.

### Marketplace updates for November 6, 2024

* **Create DRAFT Product from Service Registry**

  (ENHANCEMENT, APIM AGENT)<br />
  You can quickly create an API product without immediately publishing it to the Marketplace. This fast lane allows you to create the product directly from the Service Registry. All you need to do is go to the **Service Registry**, select an API and click **Create Product** in the action menu. Once the draft product is created, you can continue to refine and complete the product definition within the **Product Foundry**.

## November 4, 2024

New features, enhancements, and bug fixes for the November 4th update.

### Agents updates for November 4, 2024

* **New version v1.2.9 available for Axway API Management Discovery Agent**

    (BUG FIX, APIM AGENT)<br />
    This update contains a fix for a critical issue where the agent would encounter a null pointer exception error if it was started without a cache. It is recommended to update to this version if your agent has encountered issues related to cache initialization. For upgrade instructions, refer to [Upgrade an agent](/docs/connect_manage_environ/connected_agent_common_reference/upgrade_agent/).

## November 1, 2024

New features, enhancements, and bug fixes for the November 1st update.

### Agents updates for November 1, 2024

* **Provisioning handling of custom credential requests in APIM Discovery Agent**

    (ENHANCEMENT, APIM AGENT)<br />
    A new feature enhancement has been added in the APIM Agent that provides greater control over the provisioning of custom credential requests. This update introduces the ability to override the default Credential Request Definition (CRD) and manage the credential provisioning externally. Here's what you need to know about the new capability:

    * **Override default CRD**: Users can define and implement their own custom CRD instead of relying on the default definition provided by the agent. This allows for a tailored request handling that aligns with unique integration requirements.
    * **Ignore automatic credential provisioning**: The agent will automatically bypass the default credential provisioning in the API Manager when a custom CRD is enabled. Users must manage the entire provisioning process externally, enabling integration with 3rd-party systems or custom authentication mechanisms.

    To enable the override feature, update the relevant settings in the APIM agent configuration and ensure you have the external credential provisioning flow in place, as the agent will not manage credentials when this feature is active.

* **All agents default to GRPC communication mode**

    (ENHANCEMENT)<br />
    This update in the Agent SDK v1.1.102 enables all existing agents to use the GRPC communication mode by default. By enabling this mode, agents can communicate with the platform more efficiently, compared to the traditional polled mode. To switch to the poll mode, you can set the CENTRAL_GRPC_ENABLED=false. Please refer to this page for all available [agent versions](/docs/amplify_relnotes/#amplify-enterprise-marketplace-november-1-2024).

<!--### Agents known issues (hidden if none)-->

* **Agents screen update**

    (ENHANCEMENT)<br />
    Several enhancements have been added to the Agents screen to enhance the user experience and navigation within the platform. Here's what has changed:

    * **Agent Management screen relocation**: The *Agents* screen has been moved and is now accessible under *Topology > Environments*.
    * **Updated columns for clarity**: The first column of the *Agents* screen now displays both the **Agent Title** and its **Logical Name**. The Dataplane column has been replaced with **Environments**, allowing the user to see in which environment the agent is deployed.

* **Jump to a specific page in Service Registry**

    (ENHANCEMENT)<br />
    When multiple pages are available for the *Service Registry* to display, simply click **...** in the pagination controls that is place at the bottom of the page and select the page you want to navigate to. This makes it easier to browse large lists of services in the Service Registry.

### Agents bug fixes for November 1, 2024

| Case ID     | Internal ID  | Description                                       |
|-------------|--------------|---------------------------------------------------|
| 01647785<br /> 01650304 | APIGOV-29069 | **Issue**: Axway API Management agent did not reflect the agent state on the UI. <br />**Resolution**: A fix was made to represent the agent state correctly. |
|             | APIGOV-29048 | **Issue**: Auto-release of a new asset version was not being triggered by request definition changes (CRD or ARD). <br />**Resolution**: A fix was made to auto-release an asset version when request definition changes are made. |
| 01640474    | APIGOV-29157 | **Issue**: Axway API Management agent did not report metrics for a specific API. <br />**Resolution**: A fix was made to the handling of the application name to check that the base path matches the path reported in the event. |
|             | APIGOV-29142 | **Issue**: Axway API Management Discovery Agent could not get the information needed to publish a proxy. <br />**Resolution**: A fix was made to add retry logic to make additional attempts to get the information needed to publish a proxy. |
|             | APIGOV-29109 | **Issue**: Axway API Management Traceability Agent helm chart deployment for StatefulSet would fail. <br />**Resolution**: A fix was made to the StatefulSet helm chart to include the missing required **serviceName** field. |
|             | APIGOV-29054 | **Issue**: Mulesoft agent was using the incorrect timestamps for queries. <br />**Resolution**: A fix was made to the timestamps being used for the Mulesoft Monitoring API queries. |
|             | APIGOV-29150 | **Issue**: AWS Discovery Agent encountered an access request provisioning error because the credentials list API call failed. <br />**Resolution**: A fix was made to the call to get the credentials list. |
|             | APIGOV-29162 | **Issue**: Agent Management version detection reported an "Outdated" agent incorrectly. <br />**Resolution**: A fix was made to ignore the hash value when comparing agent versions to the latest available versions. |

### Axway Central CLI updates for November 1, 2024

The latest version of the [Axway Central CLI is v3.7.0 on NPM](https://www.npmjs.com/package/@axway/axway-central-cli/v/3.7.0). For details on Central CLI commands, see [Axway Central CLI Command reference](/docs/integrate_with_central/cli_central/cli_command_reference).

### Axway CLI updates for November 1, 2024

The latest version of the [Axway CLI is v3.2.14 on NPM](https://www.npmjs.com/package/@axway/axway/v/3.2.14).

### Marketplace updates for November 1, 2024

<!--
* **Custom consumption units for billing and usage tracking**

   PROVIDER BILLING<br />
   We are thrilled to introduce a powerful new feature that gives users the flexibility to define custom consumption units for more accurate and adaptable usage-based charging. This enhancement is designed to meet the evolving needs of service providers, particularly with the rise of generative AI and Large Language Model (LLM) services.
    * **Custom Consumption Unit**: Users can now define custom units for measuring and charging API usage. Previously, usage metrics were limited to charging by transactions only. This feature is especially valuable for providers offering generative AI services, where usage metrics like tokens are more appropriate.
    * **Use custom unit in plan quota**: Custom consumption units can now be used in the **product plan quota** definitions.

    Refer to [Manage consumption unit](/docs/manage_product_foundry/manage_consumption_units) for more details.
-->
* **Async API 3.0.0 support**

   (CONSUMER EXPERIENCE, ENHANCEMENT)<br />
   The component responsible for rendering API specifications has been upgraded to support **AsyncAPI v3.0.0**.
Users can now enjoy a visually appealing and well-structured presentation of AsyncAPI specifications directly in the Marketplace. In addition, when importing an AsyncAPI 3.0.0 specification into the **Service Registry**, the system will now automatically validate the definition. This ensures that only properly defined and compliant specifications are registered.

<!--### Marketplace known issues for November ?  (hidden if none)-->

### Marketplace bug fixes for November 1, 2024

| Case ID   | Internal ID  | Description                                       |
|-----------|--------------|---------------------------------------------------|
| 01651879 | APIGOV-29133 | **Issue**: Edit plan name not possible <br />**Resolution**: Duplicate product plans has been fixed to allow plan name edition. |
|          | APIGOV-29100 | **Issue**: Error when editing plan quotas and saving <br />**Resolution**: A fix was added that allows creating a paid plan with a plan cost set to 0. |
|          | APIGOV-29103 | **Issue**: Advanced Search functionality issue <br />**Resolution**: Plan search backend query has been changed to match terms that do not need to be in the exact order or consecutive. |
| 01640474 | APIGOV-29088 | **Issue**: No transactions show for API Business Insights / Consumer Insights under Consumer Org <br />**Resolution**: The Subscription / Application metrics enrichment is done even if the related asset / product release is not the latest so that it does not prevent the display of the metrics data. |
|          | APIGOV-28102 | **Issue**: [Marketplace UI] Authorize side panel crashes when selecting auth type <br />**Resolution**: A fix was made so that the Swagger UI component is now initialized correctly based on the authorization definition of the specification. |

---
