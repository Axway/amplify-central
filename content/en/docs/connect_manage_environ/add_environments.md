---
title: Add your environment
linkTitle: Add your environment
weight: 8
date: 2023-04-27
---
Robert, why do you need to add your environment???

## Add your environment

1. Navigating to *Topology > Environments*.
2. Click **+ Environment**.

    ![Environment List Page](/Images/central/EnvironmentListPage.png)

    *The Add an Environment wizard is displayed*.

3. Add the following environment profile information and then click **Next**:

    * **Environment Name** - the display name for the environment in the WebUI
    * **Environment Type** - select the type of API Gateway from the list (Amplify API Gateway, AWS API Gateway, Azure API Gateway, Istio) which Axway provides connected agent support.  The "Custom/SDK" option is for community supported agents or agents developed with the Agent SDK.   The Manual option is for a manual sync environment that does not use an agent.
    * **Production** - select **Yes** if this environment will be used to perform production processing or connect to a non-Axway gateway. The usage will count against your entitled quota.
    * **Governance** - select **Axway Manage** if the environment is hosted in Axway Managed Cloud or select **Customer Managed**
    * **Description** - a short description of the environment
    * **Image** - an icon or image to be associated with the environment

4. Configuration (Optional depending on Embedded Agent support)
5. Access Rights
6. Tags & Attributes
