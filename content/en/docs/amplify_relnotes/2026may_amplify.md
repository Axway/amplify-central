---
title: Amplify Engage May 2026
linkTitle: Amplify Engage May
weight: 9
date: 2026-4-30
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents). To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).{{< /alert >}}

---

## May 4, 2026

New enhancements and bug fixes for the May 4 update.

### Agent updates for May 4, 2026

* **Apigee X: Endpoints discovered from the API spec file**

  (APIGEE X AGENT, ENHANCEMENT)</br>
  The Apigee X discovery agent has been enhanced to discover the Endpoint URL from the server field in associated API specification file.  If no server field is found in the API Specification file, an endpoint constructed from the Proxy details will be used.

* **Azure Agent support for new Entra ID URI format**

  (AZURE AGENT, ENHANCEMENT)</br>
  The Azure agent has been enhanced to support the updated Microsoft Entra ID URI format. TURI validation now aligns with Entra ID restriction policy requirements, ensuring identifier URIs include the application’s client ID, a verified domain, or tenant ID(s). For details, see the Microsoft documentation on the [Entra ID format](https://learn.microsoft.com/en-us/entra/identity-platform/reference-app-manifest#identifieruris-attribute).

* **Azure Agent: permissions update**

  (AZURE AGENT, ENHANCEMENT)</br>
  The Azure agent now supports **Application.ReadWrite.OwnedBy** and **ServicePrincipal.ReadWrite.OwnedBy** Microsoft Graph permissions, reducing the required scope to only manage resources the agent creates. Customers with existing **.All** permissions are unaffected and no configuration changes are required.

* **IBM webMethods: rate limiting support**

  (WEBMETHODS AGENT, ENHANCEMENT)</br>
  The IBM (formerly Software AG) webMethods Discovery and Traceability agents have been enhanced to support rate limiting of API requests to the webMethods platform. Rate limiting can be configured using the **WEBMETHODS_RATELIMIT** environment variable to help manage request volume.

* **New agent releases**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

### Agent bug fixes for May 4, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32406 | **Issue**: The Azure on-premise Traceability Agent was not reporting information to Consumer Insights and Business Insights > Application screens. <br/>**Resolution**: A fix was made to display the information on both Consumer Insights and Business Insights. |
|          | APIGOV-32441 | **Issue**: The APIM Discovery Agent would not detect the first deleted API Proxy as "Out of Sync." <br/>**Resolution**: A fix was made to detect the "Out of Sync" status of the first deleted API. |

### Marketplace updates for May 4, 2026

* **Marketplace Sign-In button customization**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Marketplace owners can now fully manage and style the **Sign In** button as a standard navigation bar item. The Sign In control follows the same configuration model as other built in navigation items, including consistent visibility and labeling management. In addition, Marketplaces can present distinct Sign In actions with different emphasis (for example, primary versus secondary), enabling clearer authentication entry points and more intentional user journeys.

* **Custom sender email address for Marketplace notifications**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT, MARKETPLACE)</br>
  Admins can now customize the "From" email address for Marketplace triggered emails, such as subscription approvals, Consumer Org registrations, credential expiry notifications, etc. This ensures a consistent, branded experience, improves partner trust, and reduces the risk of emails being flagged as spam.

  **How to configure**

    * Navigate to *Marketplace > Settings > SMTP*.
    * Enable use of a custom SMTP service.
    * In the **Sender** section, enter the email address that will be used as the sender using your organization’s domain and the display **name**.
    * In the **Connection Settings** section, provide your SMTP server details.
    * Save your changes.
    * Once configured, all Marketplace triggered emails will use the updated sender address.
  
## Marketplace bug fixes for May 4, 2026

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-32414| **Issue**: Tooltip on Marketplace Product Warning Icon is not visible. <br/>**Resolution**: Fixed display issue to show the warning icon.|
|          | APIGOV-32294| **Issue**: Consumer Org User with Consumer role on x-private team cannot subscribe to free plans. <br/>**Resolution**: Consumer role for x-private team fixed to allow subscription to free plans. |
|          | APIGOV-32300| **Issue**: Featured Categories limit reached panel is not visible. <br/>**Resolution**: Fixed the UI so that the limit reached panel is now visible.|
|          | APIGOV-32355 | **Issue**: Users cannot run a compliance linting job for a specific API in the Service Registry. <br/>**Resolution**: A fix was made to allow users with permissions (Engage Admin) to run a compliance linting job from the Service Registry. |
|          | APIGOV-32541 | **Issue**: Subscription remains in pending to archive when the name is close to 100 characters. <br/>**Resolution**: The logical name for a subscription job that is generated when the consumer archives a subscription or plan is now generated based on the subscription ID, avoiding trimming or maxing out the resource logical name. |
