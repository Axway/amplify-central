---
title: Set up GCP for Embedded agents
linkTitle: Set up GCP for Embedded agents
draft: false
weight: 100
---
Set up Google Cloud Platform (GCP) so an Embedded agent can connect to and managed your Apigee X environment within Amplify.

## Before you start

* You must have access to the GCP console with permissions to create and managed IAM roles and service accounts.

## Objectives

Learn how to quickly set up a GCP role and create a service account that the Embedded agent can use to discover and manage Apigee X on your behalf.

## GCP IAM setup

### Enable IAM Service Account Credentials API

The IAM Service Account Credentials API allows the creation of short-lived credentials and is required by the Embedded Apigee Agent to log into your GCP project and request a short-lived credential while placing API calls.

1. Navigate to *APIs and Services* in your GPC project.
2. Click **+ ENABLE APIS AND SERVICES** at the top of *APIs and Services*.
3. Type `IAM Service Account Credentials API` in the search box and search for it.
4. Select the **IAM Service Account Credentials API** option that appears in the results and click **ENABLE**. If it had previously been enabled the **MANAGE** button will appear.

### GCP Axway service account

Allow the Axway service account to create a token in your GCP project.

1. Navigate to *IAM* in the GCP IAM Console and select **Grant Access**.
2. Enter `srvc-amplifyagent@rd-amplify-apigee-agent.iam.gserviceaccount.com` in the New principals box.
3. Select **Service Account Token Creator** under Assign role.
4. Click **Save**.

The Axway service account can now create short lived tokens within your GCP project.

### GCP role

Create an IAM role that allows the Embedded agent to discover, provision, and gather stats from your Apigee X deployment.

1. Navigate to *Roles* in the GCP IAM Console and click **+Create Role**.
2. Set a Title, Description, ID, and launch stage.
3. Add all of the permissions listed in [GCP role permissions](#gcp-role-permissions).
4. Click **Create**.

### GCP role permissions

```
apigee.apiproducts.create
apigee.apiproducts.get
apigee.apiproducts.list
apigee.appkeys.create
apigee.appkeys.delete
apigee.appkeys.get
apigee.appkeys.manage
apigee.deployments.list
apigee.developerapps.create
apigee.developerapps.delete
apigee.developerapps.get
apigee.developerapps.list
apigee.developerapps.manage
apigee.developers.create
apigee.developers.delete
apigee.developers.get
apigee.developers.list
apigee.environments.getStats
apigee.proxyrevisions.get
apigee.resourcefiles.get
apigee.resourcefiles.list
```

## GCP service account

Create an IAM role with a trust relationship that allows the Embedded agent to receive the privileges in the IAM policy.

1. Navigate to *Service Accounts* in the GCP IAM Console and click **+Create Service Account**.
2. Set a Name, ID, and Description then click **Create and Continue**.
3. Grant the role, created above, to this service account and click **Continue**.
4. In the *Service account users role* input allow Axway's GCP service account the ability to [Impersonate](https://cloud.google.com/docs/authentication/use-service-account-impersonation) this role by entering `srvc-amplifyagent@rd-amplify-apigee-agent.iam.gserviceaccount.com`.
5. Save the service account email address, as it will be required when setting up your agent.
