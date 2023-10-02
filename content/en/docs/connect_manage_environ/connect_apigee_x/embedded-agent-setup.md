---
title: Set up GCP for Embedded agents
linkTitle: Set up GCP for Embedded agents
draft: false
weight: 100
---
Setup Google Cloud Platform (GCP) so an Embedded agent can connect to and managed your Apigee X environment within Amplify.

## Before you start

* You must have access to the GCP console with permissions to create and managed IAM roles and service accounts.

## Objectives

Learn how to quickly setup a GCP Role and create a service account that the Embedded agent can use to discover and manage Apigee X on your behalf.

## GCP IAM setup

### GCP role

Create an IAM role that allows the Embedded agent to discover, provision, and gather stats from your Apigee X deployment.

1. Within the GCP IAM Console, navigate to *Roles* and select *+Create Role*
2. Set a Title, Description, ID, and launch stage
3. Add all of the permissions listed in [GCP role permissions](#gcp-role-permissions).
4. Click *Create*

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

1. Within the GCP IAM Console, navigate to *Service Accounts* and select *+Create Service Account*
2. Set a Name, ID, and Description then click *Create and Continue*
3. Grant the role, created above, to this service account then click *Continue*
4. In the *Service account users role* input allow Axway's GCP Service Account the ability to [Impersonate](https://cloud.google.com/docs/authentication/use-service-account-impersonation) this role by entering `apigee-agent@rd-amplify-apigee-agent.iam.gserviceaccount.com`
5. Save the service account email address, as it will be required when setting up your agent