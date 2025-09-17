---
title: Amplify Engage September 2025
linkTitle: Amplify Engage September
weight: 5
date: 2025-9-3
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## September 17, 2025

New enhancement for the September 17 update.

### Marketplace updates for September 17, 2025

* **Delet assets in active state**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Engage Admins can now delete assets that are in active state, which skips the need to manually deprecate and archive the asset. Amplify Enagage provides a guided workflow that automatically cleans up all related dependencies so you don’t need to manually track or remove them. For more details, see [Delete an asset (for Engage Admins)](https://docs.axway.com/bundle/amplify-central/page/docs/manage_asset_catalog/asset_management/index.html#delete-an-asset-for-engage-admins).

## September 16, 2025

New bug fix for the September 16 update.

### Marketplace bug fix for September 16, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
|         | APIGOV-31208 | **Issue**: Error occurs when trying to create a mock endpoint with a service which does not have an owner and the user is an Engage Admin. <br/>**Resolution**: Mock endpoints can now be created with the UI by an Engage Admin regardless of whether the service has an owner. |

## September 11, 2025

New bug fix for the September 11 update.

### Marketplace bug fix for September 11, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01747539 | APIGOV-31025 | **Issue**: Developers and Catalog Managers could open an asset for editing but were unable to save changes if they were not members of the owning team. <br/>**Resolution**: Engage now blocks asset editing for users who are not members of the owning team. |

## September 4, 2025

New bug fix for the September 4 update.

### Marketplace bug fix for September 4, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01747565 | APIGOV-31054 | **Issue**: The **Add API Service** button does not display for users with the team role of either Catalog Manager or Developer in environments with shared edit access. <br/>**Resolution**: The **Add API Service** button now displays for user that are not environments owner but are granted shared edit access to the environments. |
