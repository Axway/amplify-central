---
title: Amplify Engage July 2025
linkTitle: Amplify Engage July
weight: 6
date: 2025-7-1
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## July 28, 2025

New enhancement and bug fixes for the July 28 update.

### Axway CLI update for July 28, 2025

* **New Axway CLI v4.0.4 is available**

   (PROVIDER EXPERIENCE, AXWAY CENTRAL CLI, AXWAY ENGAGE CLI, ENHANCEMENT)</br>
   The latest Axway CLI **[v4.0.4](https://www.npmjs.com/package/@axway/axway/v/4.0.4)** is now available on NPM. This update includes a fix to the **Axway CLI returning Not Authorized error** that is listed under Marketplace bug fixes for July 28, 2025.

### Marketplace bug fixes for July 28, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01741524 <br/>01741705 | APIGOV-30889 <br/>APIGOV-30909 <br/>APIGOV-30907 | **Axway CLI returning Not Authorized error**:  A "Not authorized" error was returned from the Axway CLI when using a service account. For example, the "Not authorized" error would occur with the `axway org user list` or `axway engage install agents` command. <br/>**Resolution**: Upgrade the Axway CLI version, which can be found at **[v4.0.4](https://www.npmjs.com/package/axway/v/4.0.4)**. When using a service account, the user account with "Tooling Credentials" must be used in order to access all Axway CLI commands. To create a Tooling Credential, refer to [Configuring tooling credentials](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/configuring_and_managing_identity_providers/configuring_tooling_credentials/index.html). |

## July 25, 2025

New enhancement for the July 25 update.

### Agents updates for July 25, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](https://docs.axway.com/bundle/amplify-central/page/docs/amplify_relnotes/index.html) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

## July 23, 2025

New features, enhancements, and bug fix for the July 23 update.

### Marketplace updates for July 23, 2025

* **Email notifications for subscriptions and application registrations workflows**

  (CONSUMER EXPERIENCE, PROVIDER EXPERIENCE, NEW FEATURE)</br>
  **Automated email notifications** on subscriptions and application registration events have been introduced to ensure timely action on incoming subscription and application registration requests and deliver a more responsive experience for consumers. This enhancement includes:
  
    * **Engage Admin** and **Subscription Approver** role assignees receive an email notification when a new **subscription request** is submitted for a product owned by their team and requires manual approval.
    * **Engage Admin** role assignees receive an email notification when a new **application registration request** is submitted for an API owned by their team and requires manual approval.
    * **Consumers** and **Subscriber** role assignees in the requesting team receive an email notification when their **subscription request** has been **approved or rejected**.
    * **Consumers** and **Subscriber** role assignees in the requesting team receive an email notification when their **application registration request** has been **approved or rejected**.

* **Configurable credential visibility duration**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Engage now allows providers to define how long generated credentials remain viewable in the Marketplace after they are issued. Previously, credential visibility was fixed at 3 days, with no ability to modify this behavior. A new setting is now available in the **Credential Preferences** screen of an Environment to define the number of days credentials remain visible in the Marketplace. This configuration affects all credentials generated for APIs within that environment. The **default value is 3 days** if no customization is made. This enhancement gives providers more control over credential security policies.

* **Consumer role updates**

  (ACCESS RIGHTS, ENHANCEMENT)  
  Users with the **Consumer Organization Role** who were previously assigned one of the following producer team-level roles had those roles automatically **unassigned** to align with the intended usage and boundaries of the Consumer Organization role:

    * Developer
    * Catalog Manager
    * Marketplace Manager
    * Subscription Approver

  Going forward, users with the Consumer Organization Role may only be assigned a **Consumer** and/or **Subscriber** team-level role. This change helps enforce clear boundaries between producer and consumer responsibilities and simplifies access control management across Amplify Engage.

* **Enhanced customization for status elements and action buttons**

  (MARKETPLACE CUSTOMIZATION, BRANDING, ENHANCEMENT)</br>
  Marketplace Administrators can now more precisely align the Marketplace appearance with their company’s brand guidelines. Previously, the Marketplace applied a single global font color, which limited the ability to style status elements (badges) and action buttons independently. This update includes the following changes:

    * **Status elements font color**: A new setting in the Marketplace Theme configuration allows Marketplace Manager users to customize the font color of status elements independently from the global font color.
    * **Action button text color**: Another new setting allows marketplace managers to configure the text color of action buttons separately, ensuring better contrast and improved brand alignment.

* **SEO support using the Marketplace Description property**

  (DISCOVERABILITY, SEO, ENHANCEMENT)</br>
  The Marketplace description defined in the settings is now automatically included in the HTML "head" section as the page description meta tag to improve search engine optimization (SEO) and make Marketplace instances discoverable. This change allows search engines to better index and rank the Marketplace site using the administrator-defined description.
  
### Marketplace bug fixes for July 23, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01726716 | APIGOV-30782 | **Problem with migrating v7 applications to Marketplace**: Script fails at creating the credentials. <br/>**Resolution**: The script has been updated to use newly introduced Credential Type metadata.|

## July 22, 2025

New bug fix for the July 22 update.

### Agents bug fixes for July 22, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
|  | APIGOV-30847 | **Embedded AWS - unable to discover APIs**: The AWS Embedded agent is not discovering APIs. <br/>**Resolution**: The AWS SaaS agent discovery process has been optimized (avoiding an AWS rate limit blocker). |

## July 1, 2025

New enhancement for the July 1 update.

### Marketplace updates for July 1, 2025

* **Credential type now visible in Marketplace Applications**

  (CONSUMER EXPERIENCE, APPLICATION, ENHANCEMENT)</br>
  The *Credential List* view under **Marketplace Applications** has been enhanced to display the credential type for each credential entry. This update allows users to view the kind of credentials associated with their applications, making it easier to manage and differentiate between various authentication methods.
