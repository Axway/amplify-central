---
title: Amplify Engage February 2026
linkTitle: Amplify Engage February
weight: 12
date: 2026-2-2
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents). To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).{{< /alert >}}

---

## February 23, 2026

New enhancements and bug fixes for the February 23 update.

### Marketplace updates

* **Advanced Marketplace homepage customization**
  
   (CONSUMER EXPERIENCE, MARKETPLACE HOMEPAGE, ENHANCEMENT)</br>
  Marketplace Administrators can now control the layout and customization of the Marketplace homepage. They can rearrange sections, include or exclude certain elements, and add custom articles (as formatted text) to the homepage. This flexibility grants them the ability to create a tailored experience that aligns with their branding requirements, often driven by their UX or Marketplace teams.

* **Clicking the subscription name on the product details screen opens a side panel instead of navigating away**

  (PROVIDER EXPERIENCE, PRODUCT FOUNDRY, RESOLUTION)</br>
  Fixed an issue on the *Product Details > Subscriptions* screen where clicking a subscription to open the side panel incorrectly navigated the main page back to the Subscriptions list. The main product page now retains focus, keeping the side panel open.

* **UX audit updates for consistency across UI - Product Foundry and Document Library**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  The *Product Foundry* and *Document Library* (documents and templates) have been updated for UI consistency based on a UX audit.

* **Standardize provider Topology > Environments > Details screen "+ Add" button**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  The **+ Add** button and UI header have been updated for *Topology > Environments > Details* screen providing consistency across pages.

* **MCP Tools output schema displays an empty field**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Updated the MCP Tools details to display *No output schema available* when an output schema is not defined.

### Marketplace bug fixes

| Case ID  | Internal ID  | Description |
|--------- |------------- |-------------|
|          | APIGOV-31938 | **Issue**: Product plans could not be edited when they contained over 150 resources. <br/>**Resolution**: Product plans now use GraphQL to retrieve a large number of resources (over 150). |
|          | APIGOV-31937 | **Issue**: Product plans could not be edited if there were assets with no active releases attached to the product. <br/>**Resolution**: The failing request for asset releases has been fixed. |
|          | APIGOV-31918 | **Issue**: The MCP wizard did not save the overview when a description, source code repository, or classification value was not entered during the MCP service creation. <br/>**Resolution**: The MCP service overview is now saved as expected. |
|          | APIGOV-31870 | **Issue**: The action of deleting an environment displayed a confirmation warning with a reference to *Unified Catalog* items. <br/>**Resolution**: The display no longer references the *Unified Catalog*. |

## February 2, 2026

New enhancement and bug fix for the February 2 update.

### Agent update for February 2, 2026

* **New Apigee Edge agent version available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents. To view the agents configured within your organization, see the instructions at [View available agents](/docs/connect_manage_environ/agents_management/#view-available-agents).

### Agent bug fix for February 2, 2026

| Case ID     | Internal ID  | Description                                                                         |
|-------------|--------------|-------------------------------------------------------------------------------------|
| 01776011    | APIGOV-31926 | **Issue**: Apigee Edge agent v1.0.31 appeared to be disconnected on Engage with the wrong version number. <br />**Resolution**: The Apigee Edge agent now shows the correct status and version. |
