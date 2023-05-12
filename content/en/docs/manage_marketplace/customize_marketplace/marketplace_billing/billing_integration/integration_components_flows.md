---
title: Billing integration components
linkTitle: Billing integration components
draft: false
weight: 40
---
The Enterprise Amplify Billing integration solution is comprise of seven connections, three integration flows, one Service and one Java Service:

![Components](/Images/marketplace/billing_integration/components1.png)

## Connections

* **Amplify Central Connector** - An OAuth2 HTTP/S Client connection for making calls to Amplify for retrieving products, product plans, product plan quotas and subscriptions
* **Amplify Platform Connector** - An OAuth2 HTTP/S Client connection for making calls to Amplify platform for retrieving the API subscriber email address
* **Amplify Traceability Connector** - An OAuth2 HTTP/S Client connection for making calls to Amplify for retrieving API traffic
* **HTTP/S Post Webhook Trigger** - An HTTP/S Server connection for triggering the provision plan and provision subscription
* **MS Teams** - An HTTP/S Client connection for sending notifications to MS Teams via a MS Teams incoming webhook connector URL
* **Recurly OAS** - An OpenAPI connection for making API calls to Recurly for creating plans and subscriptions and reporting API traffic data
* **SendGrid Send Email** - An HTTP/S Client connection for sending emails to the API subscriber when a subscription is approved

## Integration flows

* **Provision Plan** - Handles the creation and deletion of billing plans (and measured units) based on Marketplace product plans and product plan units (i.e., transactions). It is triggered by an Amplify webhook integration based on updated product plans.
* **Provision Subscription** - Handles the creation and deletion of billing subscriptions. It is triggered by an Amplify webhook integration based on Marketplace product plan subscriptions.
* **Traffic Reporter** - Queries Amplify for API traffic related to linked subscriptions and reports the traffic to Recurly. It runs on a configurable cron job.

## Java Service

* **DateTimeToEpoch** - Converts date/time stamps to epoch format for the Amplify Traceability Connector query calls.

## Service

* **ProviderNotifier** - Notifies the API Provider of issues. It contains an MS Teams call:

    ![MS Teams call](/Images/marketplace/billing_integration/components2.png)

    It is separated out from the integrations in case you want to modify the way notifications are handled (e.g., send an email instead). This way, you modify just this service instead of making multiple changes throughout the integrations.