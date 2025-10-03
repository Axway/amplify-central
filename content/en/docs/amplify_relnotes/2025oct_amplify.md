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

New enhancements for the October 3 update.

### Agent updates for October 3, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Agent bug fixes for October 3, 2025

| Case ID     | Internal ID  | Description                                       |
|-------------|--------------|---------------------------------------------------|
|             | APIGOV-31178 | **Issue**: An issue was found where the agent connected with GRPC would not always re-establish a connection to Amplify when the connection was lost. <br />**Resolution**: A fix was made to improve the agent’s GRPC reconnection logic to Amplify. |
| 01753872    | APIGOV-31216 | **Issue**: An issue was found where the Discovery Agent would update the Credential Request Definition (CRD) for an Identity Provider unnecessarily. <br />**Resolution**: A fix was made to refine the change detection method for Credential Request Definition (CRD) updates. |

### Marketplace update for October 3, 2025

* **Provider has more insights about the subscription he is migrating**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Catalog Manager can now see more information about the migration they tried to migrate (Marketplace name, Organization, subscriber email, creation date, owning team). He has also the possibility to select only the column he is interested by.

* **Provider can search subscription by plan name**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Catalog Manager, when viewing product details / subscription list, can now search the subscription with *subscription name*, *subscription ID* or *plan name*. The subscription creation date is also available in the list.

* **Provider can preserve the plan status after migrating all subscriptions**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Catalog Manager, has now the choice after all subscriptions are migrated to not archive the plan. Like this the plan remains active for further subscriber. This option is only available as soon as the system detect that all subscription will be migrated. A popup is displayed asking Catalo Manager to either Archive the plan or keep the plan in Active state.

### Marketplace bug fix for October 3, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
|         | APIGOV-31308 | **Issue**: Attempt to decrypt the credential value fails. <br/>**Resolution**: a library has been cleaned up but was mandatory for Marketplace system to access the AWS KMS storage where the encrypted credential value is stored. |
