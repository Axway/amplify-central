---
title: Amplify Engage July 2025
linkTitle: Amplify Engage July
weight: 6
date: 2025-7-1
---
We work hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## July 23, 2025

New features, enhancements, and bug fixes for the July 23 update.

### Marketplace updates for July 23, 2025

* **Email notifications for subscriptions and application registrations workflows**

  (CONSUMER EXPERIENCE, PROVIDER EXPERIENCE, NEW FEATURE)</br>
  To ensure timely action on incoming subscription and application registration requests and deliver a more response experience for consumers, we've introduced **automated email notifications** on subscriptions and application registration events. This ehancement includes:
  
  - **Engage Admin** and **Subscription Approver** role assignees receive an email notification when a new **subscription request** is submitted for a product owned by their team and requires manual approval.
  - **Engage Admin** assignees receive an email notification when a new **application registration request** is submitted for an API owned by their team and requires manual approval.
  - **Consumers** and **Subscriber** role assignees in the requesting team receive an email notification when their **subscription request** has been **approved or rejected**.
  - **Consumers** and **Subscriber** role assignees in the requesting team receive an email notification when their **application registration request** has been **approved or rejected**.

* **Configurable Credential visibility duration**

  (PROVIDER EXPERIENCE, ENHANCEMENT)</br>
  Engage now allows providers to define how long generated credentials remain viewable in the Marketplace after they are issued. Previously, credential visibility was fixed at 3 days, with no ability to modify this behavior. A new setting is now available in the **Credential Preferences** screen of an Environment to define the number of days credentials remain visible in the Marketplace. This configuration affect all credentials generated for APIs within that environment. The **default value is 3 days** if no customization is made. This enhancement gives providers more control over credential security policies.

* **Consumer Role Updates**

  (ACCESS RIGHTS, ENHANCEMENT)</br>
  Users with the **Consumer Organization Role** who were previously assigned one of the following producer team-level roles had those roles automatically **unassigned** to align with the intended usage and bounderies of the Consumer Organization role:
  
  * Developer
  * Catalog Manager
  * Marketplace Manager
  * Subscription Approver
 
Going forward, users with the Consumer Organization Role may only be assigned a Consumer and/or Subscriber role.
This change helps enforce clear boundaries between produces and consumer responsabilities and simplifies the access control management across the Amplify Engage.
  
### Marketplace bug fixes for July 23, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
|  | APIGOV-xxxxx | **Issue**: Description. <br/>**Resolution**: Description. |

## July 1, 2025

New enhancement for the July 1 update.

### Marketplace updates for July 1, 2025

* **Credential type now visible in Marketplace Applications**

  (CONSUMER EXPERIENCE, APPLICATION, ENHANCEMENT)</br>
  The *Credential List* view under **Marketplace Applications** has been enhanced to display the credential type for each credential entry. This update allows users to view the kind of credentials associated with their applications, making it easier to manage and differentiate between various authentication methods.
