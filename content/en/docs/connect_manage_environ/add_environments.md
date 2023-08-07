---
title: Add your environment
linkTitle: Add your environment
weight: 8
date: 2023-04-27
---
Within topology, environments are used to represent a group of objects discovered from a gateway, a repository, or anything manually added to the environment.  These grouped objects (API services, webhooks, secrets) are displayed in Amplify. Environments are at the highest hierarchical level, and all objects are scoped within.

Learn how to create an environment to represent your API services and other discovered objects.

## Add your environment

1. Navigating to *Topology > Environments*.
2. Click **+ Environment**.

    ![Environment List Page](/Images/central/EnvironmentListPage.png)

    *The Add an Environment wizard is displayed*.

3. Add the following environment profile information and then click **Next**:

    * **Environment Name** - the display name for the environment in the WebUI
    * **Environment Type** - select the type of API Gateway from the list (Amplify API Gateway, AWS API Gateway, Azure API Gateway, Istio) which Axway provides Connected agent support.  The "Custom/SDK" option is for community supported agents or agents developed with the Agent SDK.   The Manual option is for a manual sync environment that does not use an agent.
    * **Production** - select **Yes** if this environment will be used to perform production processing or connect to a non-Axway gateway. The usage will count against your entitled quota.
    * **Governance** - select **Axway Manage** if the environment is hosted in Axway Managed Cloud or select **Customer Managed**
    * **Description** - a short description of the environment
    * **Image** - an icon or image to be associated with the environment

4. Configure (optionally displayed steps if there is Embedded agent support for the selected environment type): (**Robert- update for Embedded AWS**)

    * **Agent Type** - select the type of agent to be used to connect to this API Gateway. Select **Embedded** for Axway to host the agent or select **Remotely Hosted** if the agent will be hosted by the customer
    * **Agent Configuration** - this is only displayed for environment types supported by the Embedded agent. Currently, only AWS API Gateway is supported.  
         * **AWS Region** - select the AWS region where the AWS API Gateway is located
         * **AWS Authentication** - select the method of AWS authentication to use, AssumeRole or Access Key/Secret Key. For additional information on how to create either the AssumeRole (AWS IAM role) or AWS IAM user, see [Set up AWS for Embedded agents](/docs/connect_manage_environ/connect_aws_gateway/#embedded-aws-agent-setup).
         * **Discovery Frequency** - set how often the Embedded agent should check for changes in your AWS API Gateway, preferred is no frequency and triggered via a CI/CD pipeline. See [Triggering the agent to run discovery](/docs/connect_manage_environ/connect_aws_gateway/deploy-embedded-agents/#triggering-the-agent-to-run-discovery).
         * **Initiate Immediate discovery** - select to enable the Embedded agent to discover AWS API Gateway resources after environment creation and Embedded agent configuration are complete.

5. For Access Rights, select the team(s) the environment can be shared with. By default, an environment is not shared and only the Central Admin will have access to it. If you want your environment to be shared with a specific team, select a team owner, and then select the teams you want to grant Read access rights. For each of the teams selected, each member of the shared team(s) selected will be able to access your environment with Read access rights. This allows you to share/enable access to a specific environment without granting access to all the environments owned by your current team. Click **Next**.

6. Provide the Tags and Attribute details for the environment. Click **Save** to create the environment.
