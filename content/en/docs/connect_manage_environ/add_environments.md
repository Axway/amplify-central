---
title: Add your environment
linkTitle: Add your environment
weight: 8
date: 2023-04-27
---
## Add your environment

Start by listing all the environments by navigating to Topology -> Environments 

To add a new environment, click **+ Environment**.

![Environment List Page](/Images/central/EnvironmentListPage.png)

The Add an Environment wizard will be displayed.

1. Add the following Environment profile information and then click **Next**:
* Environment Name - The display name for the environment in the WebUI
* Environment Type - Select the type of API Gateway from the list (Amplify API Gateway, AWS API Gateway, Azure API Gateway, Istio) which Axway provides connected agent support.  The "Custom/SDK" option is for community supported agents or agents developed with the Agent SDK.   The Manual option of for a manual sync environment which does not use an agent.
* Production - Select "Yes" if this environment will be used to perform production processing or connect to a non-Axway gateway.  The usage will count against your entitled quota 
* Governance - Selelct as "Axway Manage" if the environement is hosted in Axway Managed Cloud or select "Customer Managed"
* Description - A short description of the Environment
* Image - An icon or image to be associated with the Environment

2. Configuration (Optional depending on Embedded Agent support)

3. Access Rights

4. Tags & Attributes
