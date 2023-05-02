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

4. Configuration (Optionally displayed stesp if there is Embedded Agent support for the selected Environment Type)

    * **Agent Type** - select the type of agent to be be used to connect to this API Gateway.  Select **Embedded** for Axway to host the agent in the Amplify Managed Cloud or select **Remotely Hosted** if the agent will be hosted by the customer.
    * **Agent Configuration** - This is only displayed for the Embedded Agent Type of AWS API Gateway.  
         * **AWS Region** - Select the AWS Region where the AWS API Gateway is located.
         * **AWS Authentication** - Select the method of AWS Authentication to use, AssmeRole or Access Key/Secret Key.  For additional information on how to create either the AssumeRole (AWS IAM role) or AWS IAM user, see [Set up AWS for Embedded Agents](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/connect_aws_gateway/embedded-aws-agent-setup/index.html)
         * **Discovery Frequency** - Set how often the Embedded agent should check for changes in your AWS API Gateway, preferred is no frequency and triggered via a CI/CD pipeline.  See [Triggering the agent to run discovery](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/connect_aws_gateway/deploy-embedded-agents/index.html#triggering-the-agent-to-run-discovery)
         *  **Initiate Immediate discovery** - Check the checkbox if the embedded agent should discover AWS API Gateway resources after environment creation and embedded agent configuration are complete.

5. For Access Rights, select the team(s) the environment can be shared with. By default, an environment is not shared and only the Central Admin will have access to it. If you want your environment to be shared with a specific team, select a team owner, and then select all the teams you want to grant Read access “Rights” to the selected environment. For each of the teams selected, each member of the shared team(s) selected will be able to access your environem with the Read access “Rights”. This allows you to share/enable access to a specific environment without granting access to all the environments owned by your current team. Click **Next**.

6. Provide the Tags and Attribute details for the environment. Click **Save** to create the environment.
