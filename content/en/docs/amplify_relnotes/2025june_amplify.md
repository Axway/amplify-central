---
title: Amplify Engage June 2025
linkTitle: Amplify Engage June
weight: 7
date: 2025-5-1
---
We work hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## June 13, 2025

New enhancement and bug fixes for the June 13 update.

### Agents updates for June 13, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

* **All Discovery Agents: Credential Request Type**

  (ALL DISCOVERY AGENTS, ENHANCEMENT)</br>
  An enhancement to Credential Request Definitions (CRDs) for a Credential Type value (e.g. APIKey, OAuth, HTTPBasic, MutualTLS) has been added.  This will enable clearer communication that a single CRD can be used for multiple APIs.

* **Apigee X Discovery Agents: Data Residency Support**

  (ALL DISCOVERY AGENTS, ENHANCEMENT)</br>
  The Apigee X on-premise and embedded Discovery agents will use an Apigee Data Residency endpoint to determine the region based URL for accessing Apigee resources.

### Agents bug fixes for June 13, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01721183 | APIGOV-30536 | **Issue**: The Agent version status would display "Update Available"/"Retracted" for the latest version of agents in GRPC mode. <br/>**Resolution**: A fix was made to correctly recognize the latest version of all agents. |

### Marketplace updates for June 13, 2025

* **Feature**

  (PROVIDER EXPERIENCE, ASSET CATALOG, ENHANCEMENT)</br>
  Description.

### Marketplace bug fixes for June 13, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| | APIGOV-30534 | **Issue**: After an active product plan is duplicated, the UI is not able to display the quota when editing the duplicated plan. <br/>**Resolution**: A fix was made to an Engage API to enable the display of the quota. |

## June 6, 2025

New enhancement and bug fixes for the June 6 update.

### Marketplace updates for June 6, 2025

* **Delete archived product release**

  (PROVIDER EXPERIENCE, ASSET CATALOG, ENHANCEMENT)</br>
  To help maintain a clean and organized product release history, users can now delete archived product releases. This action can be performed via the ellipsis menu on the specific product release. Use this feature to remove outdated or unnecessary archived releases once they are no longer needed.

### Marketplace bug fixes for June 6, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| | APIGOV-30512 | **Issue**: Attempting to duplicate a plan with a name of 350 chars causes a 400 error <br/>**Resolution**: When a plan was duplicated, the system added "-copy" to the name, which would have exceeded the maximum allowed length if the original plan name was already at the 350-character limit. To avoid this, we now generate a new name automatically. |
| | APIGOV-30216 | **Issue**: [Central UI] Resources, like product/asset, logical names validation uses a different pattern then what the backend enforces <br/>**Resolution**: The validation pattern has been aligned between the UI and the backend. |
| | APIGOV-30059 | **Issue**: Fix inconsistent field lengths in UI vs what is allowed via API calls <br/>**Resolution**: Now, check field length from UI and backend model are aligned. |
