---
title: Install and configure Billing integration
linkTitle: Install and configure Billing integration
draft: False
weight: 10
---
Configure the Billing integration solution to link Amplify product plans, subscriptions, and transactions to a billing provider to monetize API usage.  

## Before you start

* Download the [AIP Billing Integration project](https://lbfiletest.s3.amazonaws.com/billingintegration/LBAmplifyCentralBillingIntegrations_V10_NO_Creds.zip)
* Create an [Amplify account](https://docs.axway.com/bundle/platform-management/page/docs/getting_started_with_amplify_platform_management/sign_up/index.html) with a defined [product](/docs/manage_product_foundry) that you can add plans to. The product must have associated [assets](/docs/manage_unified_catalog/discover-and-consume-catalog-assets) that require an access request (i.e., secure APIs)
* Create an [Amplify service account](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/managing_service_accounts/index.html) client ID and client secret (Admin role)
* Create a billing platform account, such as [Recurly](https://recurly.com/), with an associated API Key
* Create an MS Teams channel with an [incoming webhook connector](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) (and its associated URL) for getting status update notifications on plan creation, subscription failure, etc.
* Create a configured [Amplify Webhook Integration](/docs/integrate_with_central/webhook) to trigger the flows ([Axway Central CLI](/docs/integrate_with_central/cli_central) and [YAML files](https://gist.github.com/lbrenman/ba8733b78141e0ebf6de88404af12625))
* Create a [Sendgrid](https://sendgrid.com/) email account for notifying the API consumer that the subscription was approved

## Objectives

Use the following instructions to install and configure the integrations.

## Setup

1. Import the Amplify Integration project, LBAmplifyCentralBillingIntegrations_export_xxxxxx.zip, into your Amplify Integration instance.

    ![Manager](/Images/marketplace/billing_integration/config1.png)

    ![Environments](/Images/marketplace/billing_integration/config2.png)

    ![Gateways](/Images/marketplace/billing_integration/config3.png)

    ![Import project](/Images/marketplace/billing_integration/config4.png)

    ![Project imported](/Images/marketplace/billing_integration/config5.png)

2. Click **Lock** to make changes to the project.

    ![Lock project](/Images/marketplace/billing_integration/config6.png)

    ![Project locked](/Images/marketplace/billing_integration/config7.png)

3. Edit the connections and enter your account information (billing platform API Key, Amplify Client Id and Secret, etc.).

    ![Edit connections](/Images/marketplace/billing_integration/config8.png)

    * Enter your Service Account Client ID and Secret, as described [here](https://blog.axway.com/product-insights/amplify-platform/application-integration/axway-amplify-platform-api-calls), for Amplify Central, Platform, and Traceability connections. Click **Update**.

    ![Client ID and secret](/Images/marketplace/billing_integration/config9.png)

    * Set any authentication that you might want on your integration webhooks for the HTTP/S Post Webhook Trigger connection.
    * Enter the URL of your [incoming webhook connector](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) for the MS Teams connection. Click **Update**.

    ![URL](/Images/marketplace/billing_integration/config10.png)

    * Enter your billing platform account API Key as your Basic Authentication Username and clear the Password for the billing platform OAS connection. Click **Update**. <br />

    ![Recurly API Key](/Images/marketplace/billing_integration/config11.png)

    * Enter your [SendGrid API Key](https://docs.sendgrid.com/ui/account-and-settings/api-keys) as your Token for Token Authentication for the SendGrid connection. Click **Update**.

    ![SendGrip API Key](/Images/marketplace/billing_integration/config12.png)

## Configure

1. Modify the [Amplify Product Plan Integration YAML file](https://gist.github.com/lbrenman/ba8733b78141e0ebf6de88404af12625#file-monitor-updated-deleted-plans-integration-yaml) with the URL of your HTTP/S Post Webhook for your *provision plan*.

    ![Product Plan YAML](/Images/marketplace/billing_integration/config13.png)

2. Modify the [Amplify Subscription Integration YAML file](https://gist.github.com/lbrenman/ba8733b78141e0ebf6de88404af12625#file-monitor-updated-deleted-subscriptions-integration-yaml) with the URL of your HTTP/S Post Webhook for your *provision subscription*.

    ![Subscription YAML](/Images/marketplace/billing_integration/config14.png)

3. Create your [Amplify integration](https://blog.axway.com/product-insights/amplify-platform/central/create-an-amplify-central-integration-webhook-using-the-axway-cli) using the CLI:

    ```yaml
    amplify central create -f monitor-updated-deleted-plans-integration.yaml
    ```

    and

    ```yaml
    amplify central create -f monitor-updated-deleted-subscriptions-integration.yaml
    ```

4. Edit the Traffic Reporter Integration Scheduler trigger to specify the frequency that traffic will be reported to the billing system.

    ![Scheduler trigger](/Images/marketplace/billing_integration/config15.png)

5. Open the Provision Subscription integration and click on the Declare vars Map Component. Set the value of the the MARKETPLACE_URL variable with the URL of your Marketplace and click **Save**. This URL is sent to the API subscriber in an email so that they can click on the link to return to the Marketplace and request access to API credentials once the subscription is approved by the provision subscription integration.

    ![Declare vars Map](/Images/marketplace/billing_integration/config16.png)

    ![Set value](/Images/marketplace/billing_integration/config17.png)

6. In the Provision Subscription integration, expand the if-else components and click on the rightmost HTTP/S Client component, labeled **Send email to subscriber**.

     ![if-else](/Images/marketplace/billing_integration/config18.png)

    * Expand the bottom panel, expand the HTTPSPostInput ACTION PROPERTY, and click on the body property. <br />
    * Modify the `from` property with SendGrid account owner. Modify the `reply_to` property with whatever you'd like for when the subscriber clicks reply on the email. <br />
    * Click **Save**.

     ![HTTPSPostInput ACTION PROPERTY](/Images/marketplace/billing_integration/config19.png)

    Alternatively, you can use the built-in SMTP email connection if you have access and credentials for an SMTP server. Or, you can disable the email component and not email the subscriber when the subscription is approved.

7. Open each of the three integrations and click the toggle switch to enable them.

    ![toggle switch](/Images/marketplace/billing_integration/config20.png)

    For test purposes, you can click **Test** to trigger the Traffic Reporter integration manually.

    ![Traffic Reporter integration](/Images/marketplace/billing_integration/config21.png)

8. Test the integration by creating a product plan and a subscription. After the subscription is approved by the integration, you can request access to an asset and make API calls. You can then trigger the Traffic Reporting integration to report subscription usage to the billing system.

## Link the Amplify plan and subscription to the billing platform

 To automatically create billing plans based on product plans, you must set a `billingSystem` attribute in the Marketplace product:

 ```json
 "group": "catalog",
"apiVersion": "v1",
"kind": "Product",
"name": "finance-starter",
"title": "Finance Starter",
"attributes": {
    "billingSystem": "recurly"
},
.
.
.
```

Or you can set it in the UI.

![billingSystem recurly](/Images/marketplace/billing_integration/config22.png)

![Product Foundry](/Images/marketplace/billing_integration/config23.png)

The product plan must be a paid plan with manual approval. Only product plans with at least one Tiered/Graduated and/or Pay Per Use quota are supported.

![Tiered Graduated](/Images/marketplace/billing_integration/config24.png)

For product subscriptions to be linked to subscriptions in the billing platform, such as Recurly, an account must exist in in the billing platform with a code that corresponds to the subscriber's user ID, team ID or organization ID.

![Recurly accounts](/Images/marketplace/billing_integration/config25.png)

![Recurly accounts 2](/Images/marketplace/billing_integration/config26.png)
