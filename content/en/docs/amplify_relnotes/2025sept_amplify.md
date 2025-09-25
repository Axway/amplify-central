---
title: Amplify Engage September 2025
linkTitle: Amplify Engage September
weight: 5
date: 2025-9-3
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## September 24, 2025

New enhancements for the September 24 update.

### Agent updates for September 24, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Marketplace update for September 24, 2025

* **Navigation menu items customization**

  (CONSUMER EXPERIENCE, MARKETPLACE, ENHANCEMENT)</br>
  Marketplace Managers now have full control over the visibility and naming of the default navigation menu items — Home, Products, Categories, and Applications. With this enhancement, you can:

    * Individually toggle the visibility of each default menu item.
    * Rename default menu items to better fit business or branding needs.
    * Reorder the display position of menu items in the navigation bar.

  For more information, see [Customize menu items](/docs/manage_marketplace/customize_marketplace/marketplace_menus).
  
  {{< alert title="Note" color="primary" >}}The new visibility settings will cause the Categories item to reappear in the navigation menu when no categories are defined. To correct this, set the Categories item visibility to *Hidden* by going to *Pages & Menus > Navigation Menu* in your Marketplace instance.{{< /alert >}}

## September 23, 2025

New enhancements for the September 23 update.

### Marketplace updates for September 23, 2025

* **Register application to multiple resources**

  (CONSUMER EXPERIENCE, MARKETPLACE, ENHANCEMENT)</br>
  Users can now register for access to multiple resources from the same product in a single request, saving time and effort. The new registration flow is organized into clear steps:

    * **Select Application**: Choose an existing application and active subscription plan, or create a new application if needed.
    * **Configure Resource**: Select the resources to register to in a searchable table.
    * **Additional Details**: Complete any required registration fields.  Resources that require the same registration information are grouped together. You only need to provide additional info once per group.
    * **Preview Application**: Review your selections and submit the request.

  After submission, users receive a confirmation message with a link to track the status of each registration request or to request a credential. Marketplace automatically creates a separate registration request for each selected resource.

* **Enhanced Credential Details view**

  (CONSUMER EXPERIENCE, MARKETPLACE, ENHANCEMENT)</br>
  The Credential Details screen now displays the information provided during credential creation. For instance, it now shows the token URL, the redirect URL, the scopes, and any custom fields included in the credential definition for an OAuth credential type. Note that the **v7 API Manager internal OAuth server** does not include the **token URL** by default for credentials it manages. To display it, providers must add a custom field named *tokenUrl* of type *string* to the credential definition. See [Customize credential request screen](/docs/integrate_with_central/customize_ard_crd#customize-credential-request-screen) for implementation details.

## September 19, 2025

New enhancement and bug fixes for the September 19 update.

### Agent updates for September 19, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Agent bug fixes for September 19, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01752991   | APIGOV-31195 | **Issue**: The platform usage events were showing the incorrect observation start time. For example, if no traffic occurred on a weekend, the observation start time would be Saturday instead of Monday when API traffic started. <br/>**Resolution**: All Traceability Agents have had the usage publishing logic updated for the observation start time, even if no usage is reported. Additionally, a short delay was added to processing usage to allow inflight metric reports to update the usage prior to the report being sent. |
| 01751619   | APIGOV-31098 | **Issue**: The APIM Discovery Agent detected a duplicate API service from a published API. <br/>**Resolution**: The APIM Discovery Agent and Traceability Agent have improved cache handling. This reduces the probability of duplicate APIs and improves the sending of metrics. |

## September 17, 2025

New enhancement for the September 17 update.

### Marketplace update for September 17, 2025

* **Delete assets in active state**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Engage Admins can now delete assets that are in active state, which skips the need to manually deprecate and archive the asset. Amplify Engage provides a guided workflow that automatically cleans up all related dependencies so you don’t need to manually track or remove them. For more details, see [Delete an asset (for Engage Admins)](https://docs.axway.com/bundle/amplify-central/page/docs/manage_asset_catalog/asset_management/index.html#delete-an-asset-for-engage-admins).

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
