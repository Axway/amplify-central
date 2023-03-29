---
title: Application management
linkTitle: Application management
weight: 30
---

Manage your applications from the Marketplace, including create, view, and delete applications. View issued credentials that enable you to consume the product resources, request new credentials and delete existing credential.

## What is an application

An application is one (or multiple) business facet of a product that a consumer will use. An application can use one or more product under the constraint of subscription plan.

## Before you start

You must have a [Marketplace subscription](/docs/manage_marketplace/consumer_experience/subscription_management).

## Objectives

As a consumer, learn how to create and manage your applications from the Marketplace.

## Create a new application

Anyone who is authenticated in the Marketplace can subscribe to a product with the following role restrictions:

| Persona               | Create application |
|-----------------------|--------------------|
| Subscription manager  | Forbidden          |
| Central administrator | Authorized         |
| Developer/Consumer    | Authorized         |

1. Navigate to the *Marketplace*.
2. Select **Applications**.
3. Click **Create Application**. *The Create Applications side panel is displayed*.
4. Provide the following:

    * **Name** - the application name
    * **Description** - the application description
    * **Owner** - the team that owns this application. This dropdown is only available if you belong to multiple teams. If you belong to only one team, then the owner will be set automatically to the team you belong to. Be sure the application owner matches the subscription you will use when requesting access to the product resources.
    * **icon** - The icon / image representing the application, if any

5. Click **Create**.

## View an application

1. Navigate to the *Marketplace*.
2. Select **Applications** and find the application you want to view.
3. Click the application name to open the application details.

View the following product information associated with the application:

* The subscription and plan names
* For each subscription/plan, all resources that are accessible with the subscription
* For each resource, all credentials requested by the consumers with their statuses (Pending / Active / Inactive - see the details [here](/docs/manage_marketplace/consumer_experience/credential_management#credential-life-cycle)) and its expiration date if any

    * Click the resource name to open the resource details screen (Methods / Credentials / Access Requests).
    * Click **Create Credential** to request new credentials. Once the credential is provision on the data plane, you will be able to see it using the **eye** icon. **Important**: For security, the value of a credential can be viewed only once inside the Marketplace, but it will remain on the data plane. Be sure to store it in a secure place to use every time you call a product resource. If the credential value is lost, you can request a new one.
    * The ellipsis menu on each credentials allows to:

        * **View** the credential details. From the details screen, you can **Renew credentials** (if the feature available on the Gateway), **Delete** credential, **Suspend** credential (i.e. temporary inactivate the credential) or **Enable credential** (i.e. reactivate a suspended credential)
        * **Renew** a credential (if the feature available on the Gateway) - this will create an new credential
        * **Delete** a credentials

From this page, you can also initiate a new subscription using the **Add subscription** button.

## Edit an application

You have to be part of the owning team to be able to edit an application.

1. Navigate to the *Marketplace*.
2. Select **Applications** and find the application you want to edit.
3. From application ellipsis menu, click **Edit** to open the application details.
4. Update the application name, description or icon as required.
5. Click **Save** to confirm your changes or **Cancel** to undo the changes.

## Archive an application

You have to be part of the owning team to be able to archive an application.

In case an application is no more needed but you still want to see the corresponding metrics in the Consumer Insights screen, you can archive the application. This action cannot be undone.

{{< alert title="Warning" color="warning" >}}Archiving an application will remove all related access and credentials. An archived application cannot be used anymore to consume APIs.{{< /alert >}}

1. Navigate to the *Marketplace*.
2. Select **Applications** and find the application you need to be archive.
3. From the Application ellipsis menu, click the **Archive** to trigger the application archival. A confirmation popup is displayed to confirm the choice.
4. Click **Archive** to confirm or **Cancel** to abort the action.

## Delete an application

You have to be part of the owning team to be able to delete an application.

Application must be in Archived state to be deleted. This action cannot be undone.

{{< alert title="Warning" color="warning" >}}Deleting an application will prevent to access related Consumer Insights metrics.{{< /alert >}}

1. Navigate to the *Marketplace*.
2. Select **Applications** and find the application you need to delete.
3. From the Application ellipsis menu, click the **Delete** to trigger the application deletion. A confirmation popup is displayed to confirm the choice.
4. Click **Delete** to confirm or **Cancel** to abort the action.
