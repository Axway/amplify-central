---
title: Amplify Engage October 2025
linkTitle: Amplify Engage October
weight: 4
date: 2025-10-1
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## October 31, 2025

New enhancements and bug fixes for the October 31 update.

### Agent updates for October 31, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Agent bug fixes for October 31, 2025

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-31284 | **Issue**: The APIM agent was not able to set the PKCE file when provisioning an OKTA credential. <br/>**Resolution**: The use of boolen or string values are now allowed in the extra properties configuration. <br/>Add the following to your Discovery Agent IDP settings to enable this: <br/>`AGENTFEATURES_IDP_EXTRAPROPERTIES_X="{\"application_type\":\"browser\", \"pkce_required\": true}"`. |
| 01770978 | APIGOV-31423 | **Issue**: The APIM Discovery Agent was not using a persistent volume for its cache which caused a rebuild on startup. <br/>**Resolution**: An APIM Discovery Agent helm chart fix now mounts both the data and log directories in a persistent manner. |
| 01763934 | APIGOV-31436 <br/>APIGOV-31305| **Issue**: The APIM Discovery Agent was not able to delete an Identity Provider credential because the IDP expected the returned registration client URI to be used. <br/>**Resolution**: The IDP returned registration client URI is now used as a query parameter to request the credential deletion. |
|          | APIGOV-31361| **Issue**: The AWS SaaS agent was experiencing a small memory leak over time. <br/>**Resolution**: The memory cleanup process has been fixed. |

### Marketplace updates for October 31, 2025

* **User Console screen**

  (CONSUMER EXPERIENCE, ENHANCEMENT)</br>
  A new **User Console** screen that is designed to help both new and returning users easily stay on top of their Marketplace activity. The Console brings together key information into one convenient place, offering a quick snapshot of what matters most. Users can now:

    * **View Subscriptions** – Track the status of recently approved, pending, or declined subscriptions at a glance.
    * **Manage Application Registrations** – See recently registered applications and quickly access related details or generate credentials.
    * **Access subscribed Products** – Explore and manage products already subscribed to without switching between multiple screens.

## October 24, 2025

New enhancement and bug fixes for the October 24 update.

### Marketplace updates for October 24, 2025

* **Empty fields are hidden automatically**

  (CONSUMER EXPERIENCE, ENHANCEMENT)</br>
  When a field has no information to show, it simply won’t appear on the screen anymore. This keeps the page clean and easy to read, so users can quickly focus on what matters. This behavior is supported across key Marketplace views, including:

    * Empty categories and tags are not displayed on the product details screen
    * Stages filters is not displayed in the Products screen when no stages are enabled
    * The Plans tab is not displayed in the product details screen when there are no available plans

### Marketplace bug fixes for October 24, 2025

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-31430 | **Issue**: Scrolling issue in the Subscription dropdown in the Register Application wizard <br/>**Resolution**: You can now scroll up to 10 subscriptions at a time. |
| 01752744 | APIGOV-31144 | **Issue**: Misconfigured CORS Policy (CWE-942) found on security scan of Marketplace <br/>**Resolution**: `Access-Control-Allow-Credentials` is set to **False** by default to mitigate the risk. |
|          | APIGOV-31311 | **Issue**: Grouping per asset filter does not show the resource group <br/>**Resolution**: Filter load has been fixed. |
| 01771338 <br/>01765710 | APIGOV-31420 <br/>APIGOV-31332 | **Issue**: When attempting to create a new version of an asset without corrupted resources or resources in error, an error message page is displayed <br/>**Resolution**: A fix has been made to enable new asset version creation. |

## October 17, 2025

New enhancements and bug fixes for the October 17 update.

### Agent updates for October 17, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Marketplace bug fixes for October 17, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01753476 | APIGOV-31123 | **Issue**: Blank screen after Oauth Authorization code flow with PKCE <br/>**Resolution**: Authorization code with PKCE has been corrected to supply the code_challenge and code_challenge_method=S256. |
| 01767119 | APIGOV-31366 | **Issue**: OAuth Authorization code flow with PKCE fails via Marketplace <br/>**Resolution**: Authorization code with PKCE has been corrected to supply the code_challenge and code_challenge_method=S256. |
| 01762649 | APIGOV-31273 | **Issue**: A consumer can create an application without an owner <br/>**Resolution**: The owning team is now mandatory when creating an application. |
|          | APIGOV-31372 | **Issue**: Marketplace UI: Application registration wizard does not support creation of x-private applications <br/>**Resolution**: A consumer can use the Application Registration even if their owning team has the `x-private` tag. |
| 01752882 | APIGOV-31384 | **Issue**: Blank screen when platform role developer and team role developer attempts to visualize an API from the Service Registry or Environments UI <br/>**Resolution**: The platform role *developer* and team role *developer* can visualize an API owned by their team. |
| 01763934 | APIGOV-31305 | **Issue**: A credential is not unregistered from the Identity Provider after being deleted on Engage <br/>**Resolution**: The Discovery agent will now unregister the credential from the Identity Provider using the `registration_client_uri`, which is returned during the registration of new credentials. |

## October 13, 2025

New enhancements for the October 13 update.

### Agent update for October 13, 2025

* **New Sensedia Discovery and Traceability agents**

  (NEW AGENT RELEASES)</br>
  You can now use the new Discovery and Traceability agents to connect an Sensedia environment to Amplify for automatic discovery of APIs and API metrics reporting. See the latest versions of all available agents at [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents). The key capabilities include:

    * API discovery: Automatic API discovery from Sensedia, ensuring comprehensive visibility of your API landscape and federated API governance.
    * Enhanced traceability: Insights into API usage and performance by integrating with Amplify for detailed reporting.
    * Improved governance and compliance: Apply linting rules to validate the API from an API compliance perspective.

### Axway CLI update for October 13, 2025

* **New Axway Engage CLI v4.6.0 is available**

  (PROVIDER EXPERIENCE, AXWAY ENGAGE CLI, ENHANCEMENT)</br>
  The Axway Engage CLI [v4.6.0](https://www.npmjs.com/package/@axway/axway-central-cli/v/4.6.0) has been updated to support the installation of the Sensedia on-premise Discovery and Traceability agents.

## October 10, 2025

New bug fixes for the October 10 update.

### Marketplace bug fixes for October 10, 2025

| Case ID     | Internal ID  | Description                                       |
|-------------|--------------|---------------------------------------------------|
| 01764972, 01764914 | APIGOV-31313 | **Issue**: Unable to create credentials from Application details page <br/>**Resolution**: Product Version ID was wrongly parsed to the URL. |
| 01767554 | APIGOV-31338 | **Issue**: Engage document libraries are not available in the Marketplace settings they are published to <br/>**Resolution**: The publication event for document library documents has been fixed and now documents are visible in the Marketplace settings. |

## October 3, 2025

New enhancements and bug fixes for the October 3 update.

### Agent updates for October 3, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Agent bug fixes for October 3, 2025

| Case ID     | Internal ID  | Description                                       |
|-------------|--------------|---------------------------------------------------|
|             | APIGOV-31178 | **Issue**: Agent connected with GRPC could not always re-establish the connection to Amplify. <br />**Resolution**: The agent’s GRPC reconnection logic to Amplify has been improved. |
| 01753872    | APIGOV-31216 | **Issue**: The Discovery Agent updated the Credential Request Definition (CRD) for an Identity Provider when it was not necessary. <br />**Resolution**: The change detection method for Credential Request Definition (CRD) updates has been refined. |

### Marketplace updates for October 3, 2025

* **Enhanced subscription selection for migration**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  To help users select the correct subscription to migrate, more contextual and relevant information about each subscription is now displayed.

* **Product Details: Improved subscription search**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Catalog Managers can search for subscriptions using any of the following fields: Subscription name, Subscription Id, and Plan name. The **subscription creation date** is now visible directly in the subscription list, providing better context when managing or troubleshooting subscriptions.

* **Keep plans active after subscription migration**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Catalog Managers now have the flexibility to decide whether a plan should remain active after all its subscriptions have been migrated. When the system detects that all subscriptions for a plan will be migrated, the user is presented with two options:

    * Deprecate the plan
    * Leave the plan active, allowing new consumers to continue subscribing

### Marketplace bug fix for October 3, 2025

| Case ID     | Internal ID  | Description                                       |
|-------------|--------------|---------------------------------------------------|
|             | APIGOV-31308 | **Issue**: Attempt to decrypt the credential value fails. <br/>**Resolution**: A library has been cleaned up that is mandatory for the Marketplace system to access the AWS KMS storage where the encrypted credential value is stored. |
