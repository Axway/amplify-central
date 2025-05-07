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
| Subscription Manager  | Forbidden          |
| Engage Administrator  | Authorized         |
| Developer/Consumer    | Authorized         |

1. Navigate to the *Marketplace*.
2. Select **Applications**.
3. Click **Create Application**. *The Create Applications side panel is displayed*.
4. Provide the following:

    * **Name** - the application name
    * **Description** - the application description
    * **Owner** - the team that owns this application. This drop-down is only available if you belong to multiple teams. If you belong to only one team, then the owner will be set automatically to the team you belong to. Be sure the application owner matches the subscription you will use when requesting access to the product resources.
    * **icon** - The icon / image representing the application, if any

5. Click **Create**.

## View an application

1. Navigate to the *Marketplace*.
2. Select **Applications** and find the application you want to view.
3. Click the application name to open the application details.

The application details shows the application name, description and the owning team.

Additionally, two tabs are displayed:

* **Credentials** for managing and creating application credentials linked to the resources available in the application.
* **Resources** lists available resources the application has access to.

### Credentials details

The Credentials tab lists all credentials managed by the application, along with credential details, including: name, state, and number of resources that can be used with each credential. From here you can either edit a credential or click **Request Credential** to request a new credential. Enter the credential details in the side panel (name, resources and any additional data if required).

#### Edit credential

To edit a credential, you can either:

* Click on the credential name. *A side panel displays the credential details and a list of resources that can use the resource*. Here you can:
    **View credential** - From the details screen, you can **Renew credentials** (if the feature is available on the gateway), **Delete** credentials, **Suspend** credentials (temporarily inactivate the credential) and **Enable** credentials (reactivate a suspended credential).
    **Rotate credential** (if the feature available on the Gateway) - This will update the credential value.
    **Delete credential** - This will delete the credential.

* Click the ellipsis menu and select an option:

    * **View credential** - From the details screen, you can **Renew credentials** (if the feature is available on the gateway), **Delete** credentials, **Suspend** credentials (temporarily inactivate the credential) and **Enable** credentials (reactivate a suspended credential).
    * **Renew credential** (if the feature is available on the Gateway) - This will create a new credential.
    * **Rotate credential** (if the feature is available on the Gateway) - This will update a credential value.
    * **Enable credential** - This will change credential status to active.
    * **Suspend credential** - This will change credential status to inactive.
    * **Delete**  - This will delete a credential.

### Resources details

The Resources tab list all resources the application has access to, along with resource details, including: name, resource stage, the product where the resource is coming from, the subscription and product plan of the subscription as well as the number of credentials that can be used with the resource.

Various link are available:

* Resource name: open the product > Resource details screen
* Product name: open the product details screen
* Subscription name: open the subscription details screen
* Plan name: open the plan details screen

A filter allows to search resources for a specific product.

## Edit an application

You must be a member of the owning team to edit an application.

1. Navigate to the *Marketplace*.
2. Select **Applications** and find the application you want to edit.
3. Click the ellipsis menu and select **Edit** to open the application details.
4. Update the application name, description or icon.
5. Click **Save** to confirm your changes or **Cancel** to undo the changes.

## Archive an application

You must be a member of the owning team to archive an application.

Archive an application if it is no longer needed but you still want to see the corresponding metrics in Consumer Insights. This action cannot be undone.

{{< alert title="Caution" color="danger" >}}Archiving an application will remove all related access and credentials. An archived application cannot be used to consume APIs.{{< /alert >}}

1. Navigate to the *Marketplace*.
2. Select **Applications** and find the application you need to be archive.
3. Click the ellipsis menu and select **Archive** to trigger application archival. A confirmation popup is displayed to confirm the choice.
4. Click **Archive** to confirm or **Cancel** to abort the action.

## Delete an application

You must be a member of the owning team to delete an application.

An application must be in Archived state to be deleted. This action cannot be undone.

{{< alert title="Caution" color="danger" >}}Deleting an application will remove access to related Consumer Insights metrics.{{< /alert >}}

1. Navigate to the *Marketplace*.
2. Select **Applications** and find the application you want to delete.
3. Click the ellipsis menu and select **Delete** to trigger application deletion. A confirmation popup is displayed to confirm the choice.
4. Click **Delete** to confirm or **Cancel** to abort the action.
