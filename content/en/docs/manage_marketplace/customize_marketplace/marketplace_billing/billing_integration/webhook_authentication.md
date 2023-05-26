---
title: Integration webhook authentication
linkTitle: Integration webhook authentication
draft: False
weight: 20
---
The imported integrations do not contain authentication on the webhook trigger, but you can enhance security by adding basic authentication.  

## Before you start

You must have an [installed and configured](/docs/manage_marketplace/customize_marketplace/marketplace_billing/billing_integration/intall_configure_billing_integration) Enterprise Billing integration solution.

## Objective

Use the following instructions to add basic authentication and set a username and password.

## Set basic authentication

1. Edit the HTTP/S Post Webhook Trigger connection:

    a. Set **Authentication** to *Basic*. <br />
    b. Enter your **Username** and **Password**. <br />
    c. Click **Update**.

    ![Components](/Images/marketplace/billing_integration/webhook1.png)

2. Edit your YAML files to specify the authentication via a [secret](https://docs.axway.com/bundle/amplify-central/page/docs/integrate_with_central/webhook/), so that the webhook will use Basic Authentication with the provided credentials when it triggers your integrations.

Define a secret with a Basic Auth header example:

```yaml
name: secret-monitor-updated-deleted-plans-integration
kind: Secret
apiVersion: v1alpha1
title: Secret for Webhook reference
metadata:
  scope:
    kind: Integration
    name: monitor-updated-deleted-plans-integration
spec:
    data:
      Authorization: Basic YWJjZDoxMjM0
```

Webhook YAML example:

```yaml
group: management
apiVersion: v1alpha1
kind: Webhook
title: Webhook for updated and deleted product plans
name: wh-monitor-updated-deleted-plans-integration
metadata:
  scope:
    kind: Integration
    name: monitor-updated-deleted-plans-integration
spec:
  enabled: true
  url: <YOUR INTEGRATION EVENT TRIGGER URL>
  headers:
      Content-Type: application/json
  auth:x
      secret:
        name: secret-monitor-updated-deleted-plans-integration
        key: Authorization
```
