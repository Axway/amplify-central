---
title: Amplify Engage June 2025
linkTitle: Amplify Engage June
weight: 7
date: 2025-5-1
---
Axway works hard to improve the Amplify Engage experience by releasing new features and fixing bugs. Here is the list of new features, enhancements, and bug fixes you’ll find in each update for the month. It is always recommended to update to the latest agents' versions.

{{< alert title="Note" color="primary" >}}For information on the latest agent versions, please refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents).{{< /alert >}}

---

## June 27, 2025

New features, enhancements, and bug fixes for the June 27 update.

### Agents updates for June 27, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

* **On-demand API Sampling for Traceability Agents**

  (Traceability Agents, ENHANCEMENT)</br>
  Traceability Agents can sample the transaction information for individual API Endpoints on demand (up to a maximum of one hour) and send the information to Amplify Analytics. A maximum of five APIs can be sampled per Traceability Agent. The API Sampling can be requested on the WebUI by clicking on the API Sampling icon from the **Endpoints** tab on the *API Service details* screen.

* **Team synchronization with the platform**

  (Agents, ENHANCEMENT)</br>
  The time to synchronize platform teams with the agents has been reduced to a maximum of five minutes.

* **Kafka agents improvements**

  (Kafka Agents, ENHANCEMENT)</br>
  The Kafka agents have been modified to handle the discovery of hundreds of topics, schemas, and versions.

### Agents bug fixes for June 27, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
|  | APIGOV-30674 | **Issue**: The Traceability Agent was restarting after an upgrade to v1.2.18. <br/>**Resolution**: A fix was made for handling transactions on APIM APIs that are named the same but serve different paths. |

### Marketplace bug fixes for June 27, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
|  | APIGOV-30533 | **Issue**: Cannot enter value in quota limit entry field. <br/>**Resolution**: Focus corrected to enter the value correctly in the quota limit field. |
|  | APIGOV-30646 | **Issue**: Cannot navigate to document library after document upload. <br/>**Resolution**: The 'Next' button works as expected after document upload for navigation. |
|  | APIGOV-30622 | **Issue**: The Axway CLI returns an error for 'axway user credentials' command. <br/>**Resolution**: A fix was released in Axway CLI version 4.0.2 to [NPM](https://www.npmjs.com/package/axway/v/4.0.2). |
| 01695151 | APIGOV-29928 | **Issue**: Importing of Open API Specification version 3.0.4 was displaying incorrectly. <br/>**Resolution**: A fix was deployed to the Engage WebUI. |
|  | APIGOV-30724 | **Issue**: The asset wizard preview step was displaying misleading information. <br/>**Resolution**: A fix was deployed to the Engage WebUI to display the preview step more accurately. |

## June 16, 2025

New enhancements for the June 16 update.

### Marketplace updates for June 16, 2025

* **Enhanced Markdown editor with HTML support and improved tooling**

  (PROVIDER EXPERIENCE, MARKDOWN, ENHANCEMENT)</br>
  The Markdown editor has been upgraded to support a more flexible and powerful editing experience. Key improvements include:
    * Users can now include basic, non-risk HTML tags within the markdown content. This enables more advanced formatting beyond what standard Markdown supports. For a complete list of supported HTML tags, see [Markdown Editor](/docs/manage_product_foundry/markdown_editor). Only safe HTML tags that comply with our security policies are allowed, ensuring that the enhanced formatting does not compromise the platform security.
    * The editor tooling now offers shortcuts for aligning text (left, center, right), allowing users to format the content efficiently.
  
## June 13, 2025

New enhancements and bug fixes for the June 13 update.

### Agents updates for June 13, 2025

* **New agent versions available**

  (NEW AGENT RELEASES)</br>
  Refer to [Release Notes](/docs/amplify_relnotes) or go to [Axway Repository](https://repository.axway.com/catalog?q=agents) to see the latest versions for all available agents.

* **Apigee X Discovery Agents: Data Residency support**

  (APIGEE DISCOVERY AGENTS, ENHANCEMENT)</br>
  The on-premise and embedded Apigee X discovery agents have been enhanced to utilize the Apigee Data Residency endpoint to determine the appropriate region-based URL for accessing Apigee resources.

### Agents bug fixes for June 13, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| 01721183 | APIGOV-30536 | **Issue**: The Agent version status would display "Update Available"/"Retracted" for the latest version of agents in GRPC mode. <br/>**Resolution**: A fix was made to correctly recognize the latest version of all agents. |

### Marketplace bug fixes for June 13, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| | APIGOV-30534 | **Issue**: After an active product plan is duplicated, the UI is not able to display the quota when editing the duplicated plan. <br/>**Resolution**: A fix was made to an Engage API to enable the display of the quota. |

## June 6, 2025

New enhancement and bug fixes for the June 6 update.

### Marketplace updates for June 6, 2025

* **Delete archived product release**

  (PROVIDER EXPERIENCE, PRODUCT FOUNDRY, ENHANCEMENT)</br>
  To help maintain a clean and organized product release history, users can now delete archived product releases. This action can be performed via the ellipsis menu on the specific product release. Use this feature to remove outdated or unnecessary archived releases once they are no longer needed.

### Marketplace bug fixes for June 6, 2025

| Case ID | Internal ID | Description |
|-------------|--------------|---------------------------------------------------|
| | APIGOV-30512 | **Issue**: Attempting to duplicate a plan with a name of 350 chars causes a 400 error <br/>**Resolution**: When a plan was duplicated, the system added "-copy" to the name, which would have exceeded the maximum allowed length if the original plan name was already at the 350-character limit. To avoid this, a new name is  automatically generated. |
| | APIGOV-30216 | **Issue**: [Central UI] Resources, like product/asset, logical names validation uses a different pattern then what the backend enforces <br/>**Resolution**: The validation pattern has been aligned between the UI and the backend. |
| | APIGOV-30059 | **Issue**: Fix inconsistent field lengths in UI vs what is allowed via API calls <br/>**Resolution**: Now, check field length from UI and backend model are aligned. |
