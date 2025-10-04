---
title: Amplify Engage October 2025
linkTitle: Amplify Engage October
weight: 4
date: 2025-10-1
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

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
