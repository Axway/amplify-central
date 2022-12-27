---
title: Install and configure Billing integration
linkTitle: Install and configure Billing integration
draft: False
weight: 10
---
Configure the AIP Billing Integration project to link Amplify product plans, subscriptions, and transactions to a billing provider so you can monetize API usage.  

## Before you start

* Download the [AIP Billing Integration project](https://lbfiletest.s3.amazonaws.com/billingintegration/LBAmplifyCentralBillingIntegrations_V10_NO_Creds.zip)
* Create an [Amplify account](https://docs.axway.com/bundle/platform-management/page/docs/getting_started_with_amplify_platform_management/sign_up/index.html) with a defined [product](/docs/manage_product_foundry) that you can add plans to. The product must have associated [assets](/docs/manage_unified_catalog/discover-and-consume-catalog-assets) that require an access request (i.e., secure APIs).
* Create an [Amplify service account](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/managing_service_accounts/index.html) client ID and client secret (Admin role)
* Create a billing platform account, such as [Recurly](https://recurly.com/), with an associated API Key
* Create an MS Teams channel with an [incoming webhook connector](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) (and its associated URL) for getting status update notifications on plan creation, subscription failure, etc.
* Create a configured [Amplify Webhook Integration](/docs/integrate_with_central/webhook) to trigger the flows ([Axway Central CLI](/docs/integrate_with_central/cli_central) and [YAML files](https://gist.github.com/lbrenman/ba8733b78141e0ebf6de88404af12625))
* Create a [Sendgrid](https://sendgrid.com/) email account for notifying the API consumer that the subscription was approved

## Objectives

Use the following instructions to install and configure the integrations.

### Setup

1. Import the Amplify Integration project, LBAmplifyCentralBillingIntegrations_export_xxxxxx.zip, into your Amplify Integration instance.
2. Click **Lock** to make changes to the project.
3. Edit the connections and enter your account information (billing platform API Key, Amplify Client Id and Secret, etc.):

    * Enter your Service Account Client ID and Secret, as described [here](https://blog.axway.com/product-insights/amplify-platform/application-integration/axway-amplify-platform-api-calls), for Amplify Central, Platform, and Traceability connections. Click **Update**.
    * Set any authentication that you might want on your integration webhooks for the HTTP/S Post Webhook Trigger connection.
    * Enter the URL of your [incoming webhook connector](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) for the MS Teams connection. Click **Update**.
    * Enter your billing platform account API Key as your Basic Authentication Username and clear the Password for the billing platform OAS connection. Click **Update**.
    * Enter your [SendGrid API Key](https://docs.sendgrid.com/ui/account-and-settings/api-keys) as your Token for Token Authentication for the SendGrid connection. Click **Update**.

### Configure

1. Modify the [Amplify Product Plan Integration YAML file](https://gist.github.com/lbrenman/ba8733b78141e0ebf6de88404af12625#file-monitor-updated-deleted-plans-integration-yaml) with the URL of your HTTP/S Post Webhook for your *provision plan*.
2. Modify the [Amplify Subscription Integration YAML file](https://gist.github.com/lbrenman/ba8733b78141e0ebf6de88404af12625#file-monitor-updated-deleted-subscriptions-integration-yaml) with the URL of your HTTP/S Post Webhook for your *provision subscription*.