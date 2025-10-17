---
title: Amplify Engage October 2025
linkTitle: Amplify Engage October
weight: 4
date: 2025-10-1
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

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
| 01762649 | APIGOV-31273 | **Issue**: Consumer can create application without an owner <br/>**Resolution**: Owning team in now mandatory while creating application. |
|          | APIGOV-31372 | **Issue**: Marketplace UI: Application registration wizard does not support creation of x-private applications <br/>**Resolution**: Consumer can use the Application Registration even when their owning team has the x-private tag. |
| 01752882 | APIGOV-31384 | **Issue**: Blank screen when platform role developer and team role developer attempts to visualize an API from the Service Registry or Environments UI. <br/>**Resolution**: The platform role developer and team role developer can visualize an API owned by their team. |
| 01763934 | APIGOV-31305 | **Issue**: A credential is not being deleting on the Identity Provider after being deleted on Engage. <br/>**Resolution**: The Discovery agent will use registration_cli_uri to unregister the credential on the Identity Provider. |

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
