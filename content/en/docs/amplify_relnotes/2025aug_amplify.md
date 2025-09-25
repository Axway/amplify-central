---
title: Amplify Engage August 2025
linkTitle: Amplify Engage August
weight: 6
date: 2025-8-5
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## August 29, 2025

New enhancement and bug fixes for the August 29 update.

### Marketplace updates for August 29, 2025

* **Custom Marketplace landing page**

  (CONSUMER EXPERIENCE, ENHANCEMENT)</br>
  Marketplace Managers can now define which page in the Marketplace serves as the landing page for users when the default Home page is disabled. They can choose from Browse Products, Categories or a Document in the Document Library, like *Get Started*. This enhancement allows you to align the Marketplace entry point with your branding and engagement strategy.

### Marketplace bug fixes for August 29, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01738307 | APIGOV-30870 | **Issue**: Categories menu and Category filter visible even when no category is available for the Marketplace. <br/>**Resolution**: When there is no category associated to a Marketplace, the Categories menu and Category filter are not displayed. |
| 01735887 | APIGOV-30801 | **Issue**: Application dropdown displays "No option" for teams with x-private tag. <br/>**Resolution**: The *Register Application* screen has been fixed. The information found is now based on the user part of x-private team instead of the teamID. |

## August 21, 2025

New enhancements and bug fixes for the August 21 update.

### Agents updates for August 21, 2025

* **Embedded Traceable API Security (embedded) agent**

  (NEW AGENT RELEASES)</br>
  A new embedded Traceable API Security agent is now available, which you can configure directly from the Amplify Engage user interface. See the latest versions of all available agents at [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).

### Agent bug fixes for August 21, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01745662 | APIGOV-31035 | **Issue**: Suspension and reactivation of a APIM credential caused the client secret to not be visible on the Marketplace. <br/>**Resolution**: A fix was made to the credential handling and credential client secret display on the Marketplace. |
|  | APIGOV-30993 | **Issue**: The Software AG WebMethods agent crashed with a null pointer error. <br/>**Resolution**: A fix was made to handle a null pointer. |

### Axway CLI update for August 21, 2025

* **New Axway Engage CLI v4.5.0 is available**

  (PROVIDER EXPERIENCE, AXWAY ENGAGE CLI, ENHANCEMENT)</br>
  The Axway CLI **[v4.5.0](https://www.npmjs.com/package/@axway/axway/v/4.5.5)** has been updated to support the installation of the embedded Traceable API Security agent.
  
## August 20, 2025

New enhancement for the August 20 update.

### Agents updates for August 20, 2025

* **New Traceable API Security (on-premise) agent version available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

## August 8, 2025

New enhancement and bug fixes for the August 8 update.

### Agents updates for August 8, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

### Marketplace bug fixes for August 8, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01638870 | APIGOV-28902 | **Issue**: A portion of the API Specification was missing from the API Service details screen. <br/>**Resolution**: The entire API Specification now displays. |
|  | APIGOV-30938 | **Issue**: A caching issue caused the compliance run-time results to be displayed on the environment details screen. <br/>**Resolution**: The compliance run-time results no longer display unnecessarily. |
