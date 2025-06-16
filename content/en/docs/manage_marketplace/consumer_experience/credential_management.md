---
title: Access and Credential management
linkTitle: Access and Credential management
weight: 35
---

Manage your subscriptions credentials from the Marketplace.

## What are credentials

When a product resource is protected by an API Key or an OAuth credential, you must create your Marketplace credential once the product resource access is granted. Your credential is needed every time you call a product resource. It is the key that provides you access to resources.

## Before you start

Browse and find a product in the Marketplace, subscribe to the product.

## Objectives

As a consumer, learn how to request access to an API to be issued credentials, and then manage those credentials.

## Request access to an API

For requesting Access to an API and be able to use it, you will need an application and an approved product subscription (Refer to [Create a subscription](/docs/manage_marketplace/consumer_experience/subscription_management#create-a-new-subscription)). Your access will be approved by the provider either manually or automatically. The application can be pre-existing or you can create it during the Application Registration flow.

Note that an access is not required if the corresponding API does not support any credential type (Oauth, API Key, Invoke Policy, ...).

There are two ways to request access:

* from the product by using the **Register Application** button
* from a product resource tab using the **Door with lock** icon

To request access to an API from the product:

1. From the Marketplace *Home* screen, open a product.
2. Click the **Register Application** button that is displayed below the product description. This button is accessible from any tab of the product (resources, Documentation, Plans, Ratings & Reviews).
3. It opens the side panel with the requested information.
4. Complete the Request access form. Note that **Request access name** is auto populated.

    * Select a resource
    * Select an application. If you are a member in multiple teams, the subscriptions and the application must be owned by the same team.
    * Select a subscription.
    * Fill out any other fields that are displayed on the form.
    * Click **Register Application**.

If the access is automatically approved, you will be directed to the *Create Credential* screen.
If the access is manually approved, you will see the pending status panel from where you can navigate to the Application Registration details.

To request access to an API from the product resource:

1. From the Marketplace *Home* screen, open a product and select the **Resources** tab.
2. Click the **Door with lock** icon that is displayed next to the resource.
3. Complete the Request access form. Note that **Request access name** is auto populated.

    * Select a subscription.
    * Select an application. If you are a member in multiple teams, the subscriptions and the application must be owned by the same team.
    * Fill out any other fields that are displayed on the form.
    * Click **Register Application**.

If the access is automatically approved, you will be directed to the *Create Credential* screen.
If the access is manually approved, you will see the pending status panel from where you can navigate to the Application Registration details.

{{< alert title="Note" color="primary" >}}
To preserve the quota limitation associated with the selected API and the selected plan from the subscription, you are not allowed to register multiple applications to the same product resource and using the same subscription. In other word, one API can be accessed by a single application using a single subscription.
{{< /alert >}}

## Track access to an API

View and track the status of the Application Registrations:

* From the Register Applications: *Marketplace* > Application Registrations. View all access accros all products/applications your team has access to.
* From the application: *Marketplace* > Application > navigate to the appropriate resource. View specific access linked to an application
* From the product: *Marketplace* > Product > Resource > Application Registrations > navigate to the appropriate application. View specific access linked to an API.

## Credential lifecycle

| State          | Description                                                                                                                        |
|----------------|------------------------------------------------------------------------------------------------------------------------------------|
| **Pending**    | The credential creation has been initiated by the consumer and is waiting to be provisioned in the corresponding data plane.              |
| **Active**     | The credential is provisioned on the data plane and can be used to consume APIs.                                                   |
| **Inactive**   | The credential is provisioned on the data plane but cannot be used to consume APIs. This can be the result of a [Suspend action](/docs/manage_marketplace/consumer_experience/credential_management#suspend--enable-credential). |
| **Deleting**   | The credential deletion has been initiated and is waiting for the credentials to be deprovisioned in the data plane.                        |

## Create credentials

The credential request can be done from several places in the Marketplace:

* From the application: *Marketplace* > Application > navigate to the appropriate resource > **Create Credential** button
* From the resource: *Marketplace* > Product > Resource > Credentials > navigate to the appropriate application > **Create Credential** button
* While requesting access to the product resource: if access is auto approved, then the Create Credential screen is displayed

To create a credential, select the credential type and enter the required information. The **Type** field contains the **credential type** associated to this credential and the Credential Request Definition title. If credential type is not set yet, only the Credential Request Definition title is visible.

Once the credential is generated, make sure to copy and paste it in a secure location, as you will not be able to see it again from the Marketplace. If you lose the credential secret, click **Create Credential** to create a new one.

To delete the existing credential, click the trash bin icon.

## List the credentials

The *Marketplace* > Credentials view displays all the credentials your team has access to. This list can be filtered by State, Expiration date and Application. For each credential, the credential type **APIKey**, **OAuth**, **HTTPBasic** or **MutualTLS** is displayed. In case the credential type is not visible, ask the owner of the product.

Note that Engage Admin user is able to see all Credentials regardless the team they belongs to.

## View credential value

Once the credential is provisioned by the provider (either manually or using Discovery Agent), you can view your credential secret. The secret is encrypted and available for only three days to be viewed from inside the Marketplace. After this period, the credential secret will be removed from Amplify, but will remain on the data plane.

To view the clear value of the credential:

* From the credentials list: *Marketplace* > Credentials > Select the appropriate credentials > **View Credential** button
* From the application: *Marketplace* > Application > navigate to the appropriate resource > **View Credential** button
* From the resource: *Marketplace* > Product > Resource > Credentials > navigate to the appropriate application > **View Credential** button

The panel is enlarged to show the remaining time to view the decrypted value and an eye icon to access it. After confirming your need to view the clear value of credentials, the credentials are decrypted and displayed on the screen. After you retrieve the credential clear value, make sure to copy and paste it in a secure location as you will not be able to see it again once the side panel is closed or the session expires.

## Suspend / Enable credential

Credential can be suspended / enabled from several places in the Marketplace:

* From the application: *Marketplace* > Application > navigate to the appropriate resource
* From the resource: *Marketplace* > Product > Resource > Credentials > navigate to the appropriate application

Click on the credential name to display the credential information. From here, you can:

* **Suspend** an active credential using the **Suspend credential** button. The credential status will become Inactive.
* **Enable** a suspended credential using the **Enable credential** button. The credential status will become Active.

Each action must be confirmed by the user.

## Renew credential

This action is not supported by all data planes and may not be available for the consumer.

When viewing the credential list from the application or from the product resources details, a **Renew credential** menu can be used if enabled by the underlying data plane.

## Delete credential

A credential can be deleted:

* From the application: *Marketplace* > Application > navigate to the appropriate resource
* From the resource: *Marketplace* > Product > Resource > Credentials > navigate to the appropriate application

Click on the credential name to display the credential information. Click **Delete credential** to delete the credential. This action must be confirmed by the user, as it is irreversible.
