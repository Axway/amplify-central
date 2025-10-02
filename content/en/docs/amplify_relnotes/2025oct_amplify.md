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
