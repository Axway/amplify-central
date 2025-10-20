---
title: Amplify Engage May 2025
linkTitle: Amplify Engage May
weight: 8
date: 2025-5-1
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## May 30, 2025

New features, enhancements, and bug fixes for the May 30 update.

### Agents updates for May 30, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

* **All Discovery Agents: Custom Field support**
  
  (All DISCOVERY AGENTS, ENHANCEMENT)</br>
  Credential Request Definitions (CRDs), Asser Request Definitions (ARDs), and Application Profile Definitions (MAPD) with 'x-custom-field' properties will be ignored by all Discovery Agents. This enhancement enables customers to include their own custom information that the agents will ignore. This information can be exposed in the Marketplace.

### Agents bug fixes for May 30, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01719757 | APIGOV-30507 | **Issue**: APIM Discovery Agent was not able to process API Specification files larger then 10 MB.<br/>**Resolution**: An improvement was made to all Discovery Agents that compresses API Specification files larger then 10 MB by removing leading space or End-of-line characters. This applies to APIM Discovery Agent **v1.2.27** and later. |
| 01652136 | APIGOV-29139 | **Issue**: APIM Discovery Agent **v1.2.23** was not reflecting multiple inbound security profiles for an API.<br/>**Resolution**: A fix to reflect multiple inbound security policies in the Service Registry was released in APIM Discovery Agent **v1.2.27** and later. |
| 01711170 | APIGOV-30336 | **Issue**: Duplicate API services were detected after an upgrade to APIM Discovery Agent **v1.2.21**.<br/>**Resolution**: The fix to the cache manager that is used to detect API service changes was made in APIM Discovery Agent **v1.2.27** and later. |
| | APIGOV-30564 | **Issue**: When downloading the Docker image of the Kafka Agent **v1.1.19**, a 503 Service Unavailable error was encountered.<br/>**Resolution**: A fix was made that enables access to repository.axway.com. |

### Marketplace update for May 30, 2025

* **Limit on API services/endpoints grouped under a single asset**

  (PROVIDER EXPERIENCE, ASSET CATALOG, ENHANCEMENT)</br>
  The Asset Catalog now enforces a maximum of **150 API services or endpoints** that can be grouped under a single asset. If your use case requires grouping more than 150 APIs or endpoints, consider creating multiple assets to organize them effectively.

## May 29, 2025

New features and enhancements for the May 29 update.

### Marketplace updates for May 29, 2025

* **Improvement to the *application details* screen**

  (CONSUMER EXPERIENCE, APPLICATIONS, ENHANCEMENT)</br>
  It is now simpler to navigate between key parts of an application:
    * On the **Application > Credentials** tab, click on the Resources number to open the linked resources for that credential.
    * On the **Application page > Resources**, click on the Credentials number to open the linked credentials for that resource.

* **Subscription unique identifier**

  (CONSUMER EXPERIENCE, PROVIDER EXPERIENCE, SUBSCRIPTIONS, ENHANCEMENT)</br>
  A **unique subscription identifier** has been introduced to make it easier to manage and locate subscriptions.
  Previously, subscriptions were identified only by a user-defined friendly name, which often resulted in **duplicate names** and difficulty in distinguishing between subscriptions. With this enhancement, each subscription now includes a **system-generated unique ID** that helps you to **quickly and accurately identify** subscriptions, even when names are similar or repeated.

* **Table of Contents now displayed for markdown documents used in the navigation menu**

  (CONSUMER EXPERIENCE, DOCUMENTATION, MENU, ENHANCEMENT)</br>
  A **table of contents** has been added to the right of the document view to make it easier to explore large documents that are accessed via the Marketplace navigation menu. This improvement helps users to quickly navigate between sections of the document and understand the structure at a glance.

## May 23, 2025

New features, enhancements, and bug fixes for the May 23 update.

### Marketplace updates for May 23, 2025

* **Applications filtering by owning team**

  (CONSUMER EXPERIENCE, APPLICATIONS, ENHANCEMENT)</br>
  You can now filter applications by the owning team name in the *Applications* screen. This enhancement allows consumers that are members of multiple teams to quickly locate and manage applications associated with specific teams, improving visibility in a multi-team setup.

* **Enhanced session expiration message**

  (CONSUMER EXPERIENCE, APPLICATIONS, ENHANCEMENT)</br>
  We’ve improved the message that is displayed when a user’s web session expires. The new message provides clearer guidance, making it easier for users to understand what happened and how to securely sign in again.

### Marketplace bug fix for May 23, 2025

| Case ID | Internal ID | Description |
|--------------|--------------|---------------------------------------------------|
|              | APIGOV-30429 | **Issue**: Marketplace application, impossible to view the resources associated to a credential.<br/> **Resolution**: A performance issue linked to products having more than 200 versions has been fixed and now all resources associated to a credential are visible from the *credential details* screen.|

## May 21, 2025

New bug fixes for the May 16 update.

### Agents bug fix for May 21, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
|  | APIGOV-30504 | **Issue**: Traceability Agents could encounter a nil pointer run-time error.<br/>**Resolution**: The fix is available in all Traceability Agents released on May 21 2025 or later. |

### Marketplace bug fix for May 21, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
|  | APIGOV-30506 | **Issue**: The Axway Engage CLI (formally Axway Central CLI) was missing support for the 'productize' command.<br/>**Resolution**: A fix was made to support the 'productize' command in **[v4.1.0](https://www.npmjs.com/package/@axway/axway-central-cli/v/4.1.0)**. |

## May 16, 2025

New features, enhancements, and bug fixes for the May 16 update.

### Agents update for May 16, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Agents bug fixes for May 16, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
|  | APIGOV-30205 | **Issue**: The Traceability Agent was not able to send metrics to Engage.<br/>**Resolution**: Updates were made to all Traceability Agents to improve the handling of additional communication scenarios. |
|  | APIGOV-30182 | **Issue**: The APIM Discovery Agent was not detecting changes to the Frontend Proxy tags.<br/>**Resolution**: The APIM Discovery Agent has been updated to detect changes to the Frontend Proxy tags/attributes and update the revision of the affected API service. |
|  | APIGOV-30456 | **Issue**: The Kafka Agent status was not updated properly on Engage.<br/>**Resolution**: The Kafka Agent has been updated to reflect the Agent status correctly. |
| 01691705 | APIGOV-29869 | **Issue**: The GitHub Discovery Agent was not able to discover from a 'Private' GitHub repository.<br/>**Resolution**: The GitHub Discovery Agent documentation has been updated for the minimum set of permissions to discover from a 'Private' GitHub repository. |

### Axway CLI updates for May 16, 2025

* **New Axway CLI v4.0.1 is available**

   (PROVIDER EXPERIENCE, AXWAY CENTRAL CLI, AXWAY ENGAGE CLI, ENHANCEMENT)</br>
   The Axway CLI **[v4.0.1](https://www.npmjs.com/package/@axway/axway/v/4.0.1)** has been updated to support Node.js version **20.18.2** or later. This is a major release (breaking change) and intended to be used with the Axway Central/Engage CLI **v4.0.0** or later.
  
* **New Axway Engage CLI v4.0.0 is available**

  (PROVIDER EXPERIENCE, AXWAY CENTRAL CLI, AXWAY ENGAGE CLI, ENHANCEMENT)</br>
  The Axway Engage CLI (formally Axway Central CLI) **[v4.0.0](https://www.npmjs.com/package/@axway/axway-central-cli/v/4.0.0)** has been updated to support Node.js version **20.18.2** or later. This is a major release (breaking change) and intended to be used with the Axway CLI **v4.0.1** or later.

* **Updates to `install agents` command**

   (PROVIDER EXPERIENCE, AXWAY CENTRAL CLI, AXWAY ENGAGE CLI, ENHANCEMENT)</br>
   The Axway Central CLI `install agents` command has been updated to install the Graylog and Traceable agents using a new ComplianceAgent resource.

### Marketplace updates for May 16, 2025

* **Customizable table columns**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Providers can now customize the columns displayed in the table list views and define the order that they appear. This enhancement is available through a Customize table icon, located just above the tables in the following screens:
    * Service Registry (for each of the individual tabs)
    * Document Library
    * Invoices
    * Application Registrations
    * Credentials
    * Environments
    * Agent Status
    * Compliance Profiles (for each of the individual tabs)
    * Identity Providers
    * Stages
    * Categories
    * Support Contacts
    * Consumption Units

    Once configured, the displays will persist for each user.

* **Improved handling of corrupted assets**

  (PROVIDER EXPERIENCE, ASSET CATALOG, ENHANCEMENT)</br>
  Catalog Managers can now edit a corrupted asset and identify the API services causing the issue. From the Asset Edit / Create wizard, the *Included Resources* step now includes a new **Errors** tab. This tab allows you to:

    * Visualize the API services responsible for the corruption
    * Unlink the faulty API services, provided they are not currently used in any product or product plans

### Marketplace bug fixes for May 16, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
|  | APIGOV-30450 | **Issue**: An error would occur if an asset was linked to an API service specification in YAML file format larger than 3 MB.<br/>**Resolution**: A fix was made to support up to a 7.68 MB YAML API Specification file to be linked to an asset. |
|  | APIGOV-30453 | **Issue**: Document library icon generator security issue.<br/>**Resolution**: Due to security concerns related to the library used for generating preview images from PDF files, the system will no longer create first-page preview icons for newly imported PDFs. Preview images generated for documents uploaded prior to this change will remain visible. |

## May 12, 2025

New enhancements for the May 12 update.

### Axway Central CLI updates for April 12, 2025

* **New version of Axway Central CLI**

  (NEW CLI RELEASE)</br>
  The latest version **[3.15.0](https://www.npmjs.com/package/@axway/axway-central-cli/v/3.14.0)** of the Axway Central CLI is now available on NPM.

* **New productize command**

   (PROVIDER EXPERIENCE, AXWAY CENTRAL CLI, ENHANCEMENT)</br>
   The Axway Central CLI now includes a new `productize` command, which automates the creation of an asset and a product for a given API service. This allows you to use shell scripts to bulk-create assets and products for multiple API services. A sample script demonstrating this process is available in the updated documentation here.  Refer to [productize command](/docs/integrate_with_central/cli_central/cli_command_reference#productize).

* **Axway Central / Axway Engage command support**

  (PROVIDER EXPERIENCE, AXWAY CENTRAL CLI, AXWAY ENGAGE CLI, ENHANCEMENT)</br>
  Starting with version 3.14.0, the Axway Central CLI supports commands for both 'Axway Central' and 'Axway Engage'.

### Marketplace update for May 12, 2025

* **Limit on API Services grouped under a single asset**

  (PROVIDER EXPERIENCE, ASSET CATALOG, ENHANCEMENT)</br>
  The Asset Catalog now enforces a maximum of **150 API Services** that can be grouped under a single asset. If your use case requires grouping more than 150 APIs, consider creating multiple assets to organize them effectively.

## May 8, 2025

New enhancement and bug fix for the May 8 update.

### Marketplace update for May 8, 2025

* **Improved Applications details screen**
  
  (CONSUMER EXPERIENCE, ENHANCEMENT)</br>
  The Applications details screen has been redesigned to display the information in a clearer, more organized way. The new layout contains two separate tabs: *Credentials* and *Resources*. The Request Credential experience has also been improved to better represent when a credential can be used with multiple resources. Refer to [View an application](/docs/manage_marketplace/consumer_experience/application_management#view-an-application).

### Marketplace bug fix for May 8, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01705619 | APIGOV-30196 | **Issue**: Stage not visible in credentials / resources <br/>**Resolution**: The stage is now displayed even when the credential was created on a resource that is part of a product release that has been archived. |

## May 2, 2025

New features, enhancements, and bug fixes for the May 2 update.

### Agents updates for May 2, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

* **APIM Discovery Agent: Credential Request Definitions for multiple Inbound Security Policies**
  
  (APIM DISCOVERY AGENT, ENHANCEMENT)</br>
  When an API is configured with multiple inbound security profiles in v7 API Management, the Discovery Agent will now automatically generate a distinct *Credential Request Definition* for each supported security profile. This enhancement ensures that all credential types associated with the API are exposed and selectable in the Marketplace.

### Agents bug fixes for May 2, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01713319 | APIGOV-30367 | **Issue**: All Traceability Agents were displayed with an unhealthy status while traffic metrics were not affected. <br/>**Resolution**: Errors are now handled correctly while updating the Traceability Agent status. |
| 01702598 | APIGOV-30220 | **Issue**: The Kafka Discovery Agent encountered a 409 status error while updating an AccessRequestDefinition. <br/>**Resolution**: Additional checks now create/update the AccessRequestDefinition only when changes are detected. |
|          | APIGOV-30267 | **Issue**: The Traceable Agent conformance results were not reflected on the Engage WebUI. <br/>**Resolution**: Null objects returned from the Traceable conformance analysis API are now handled correctly. |
|          | APIGOV-30293 | **Issue**: The Discovery Agent encountered a nil panic error when the agent discovered an OAS specification without a component property. <br/>**Resolution**: The Agent SDK now prevents nil panic errors while processing the OAS specification. |
|          | APIGOV-30351 | **Issue**: The Discovery Agent may discover an API as a duplicate in some cases. <br/>**Resolution**: The method of handling API duplicate detection has been fixed. |
| 01691705 | APIGOV-29869 | **Issue**: The GitHub SaaS Discovery Agent was not able to discover API services from a private repository. <br/>**Resolution**: Repository accessibility and permissions are now validated during configuration. |

### Marketplace update for May 2, 2025

* **Asset Request Definition Cleanup**
  
  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  An enhancement has been implemented to improve the configuration consistency in the Asset Catalog. When an *Access Request Definition* is deleted, the system will now automatically remove the corresponding *Asset Request Definition*, if one exists. This prevents orphaned configuration resources.

### Marketplace bug fix for May 2, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01701322 | APIGOV-30079 | **Issue**: When a user is not logged in to a public Marketplace, the language cannot be switched.<br/>**Resolution**: Now, the language switcher works even when users are not logged in. |
