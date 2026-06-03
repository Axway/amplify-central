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

* From the product by using the **Register Application** button
* From a product resource tab using the **Door with lock** icon

To request access to an API from the product:

1. From the Marketplace *Home* screen, open a product.
2. Click the **Register Application** button that is displayed below the product description. This button is accessible from any tab of the product (resources, Documentation, Plans, Ratings & Reviews).
3. It opens the side panel with the requested information.
4. Complete the Request access form. Note that **Request access name** is auto populated.

    * Select a resource.
    * Select an application. If you are a member in multiple teams, the subscriptions and the application must be owned by the same team.
    * Select a subscription.
    * Fill out any other fields that are displayed on the form.
    * Click **Register Application**.

If the access is automatically approved, you will be prompted with the option to Request Credential.
If the access is manually approved, you will see the pending status panel from where you can navigate to the Application Registration details.

To request access to an API from the product resource:

1. From the Marketplace *Home* or *Products* screen, open a product and select the **Resources** tab.
2. Click the **Door with lock** icon that is displayed next to the resource.
3. Complete the Request access form. Note that **Request access name** is auto populated.

    * Select a subscription.
    * Select an application. If you are a member in multiple teams, the subscriptions and the application must be owned by the same team.
    * Fill out any other fields that are displayed on the form.
    * Click **Register Application**.

If the access is automatically approved, you will be prompted to Request Credential.
If the access is manually approved, you will see the pending status panel from where you can navigate to the Application Registration details.

{{< alert title="Note" color="primary" >}}
To preserve the quota limitation associated with the selected API and the selected plan from the subscription, you are not allowed to register multiple applications to the same product resource and using the same subscription. In other word, one API can be accessed by a single application using a single subscription.
{{< /alert >}}

## Track access to an API

View and track the status of the Application Registrations:

* From the Register Applications: *Marketplace > Application Registrations*. View all access across all products/applications your team has access to.
* From the application: *Marketplace > Application* > navigate to the appropriate resource. View specific access linked to an application.
* From the product: *Marketplace > Product > Resource > Application Registrations* > navigate to the appropriate application. View specific access linked to an API.

## Credential lifecycle

| State          | Description                                                                                                                        |
|----------------|------------------------------------------------------------------------------------------------------------------------------------|
| **Pending**    | The credential creation has been initiated by the consumer and is waiting to be provisioned in the corresponding data plane.              |
| **Active**     | The credential is provisioned on the data plane and can be used to consume APIs.                                                   |
| **Inactive**   | The credential is provisioned on the data plane but cannot be used to consume APIs. This can be the result of a [Suspend action](/docs/manage_marketplace/consumer_experience/credential_management#suspend--enable-credential). |
| **Deleting**   | The credential deletion has been initiated and is waiting for the credentials to be deprovisioned in the data plane.                        |

## Create credentials

The credential request can be done from several places in the Marketplace:

* From the application: *Marketplace > Application* > navigate to the appropriate resource > click **Request Credential**
* From the resource: *Marketplace > Product > Resource > Credentials* > navigate to the appropriate application > click **Request Credential**
* From the product: *Marketplace > Product* > click **Request Credential**
* While requesting access to the product resource: if access is auto approved, then the *Request Credential* screen is displayed

To create a credential, enter a **Name**, select the resource to acccess, choose an owning Team (optional), select which application to add the credential to, speicify the credential type and required details. The **Type** field contains the **credential type** associated to this credential and the Credential Request Definition title. If credential type is not set, only the Credential Request Definition title appears.

When you choose a resource and application, you'll receive a notification stating "Existing credentials found" if there are credentials that can be reused for that application. This message provides a "View existing credentials" link, which opens a dialog displaying details about the available credentials. Selecting any Credential Name takes you to its details page. If you find a reusable credential, simply cancel the Request credential process. However, if no credentials are available or none are reusable, you can create a new credential.  

Once you click **Submit**, you will be redirected to the **Credential Requst Submitted** page, which will list resources within the application that are compatible with the new credential. You can choose **View Crendential** to go to the **Credenaial Details** page, or select **Close** to exit the page.

Once the credential is generated, make sure to copy and paste it in a secure location, as you will not be able to see it again from the Marketplace. If you lose the credential secret, click **Create Credential** to create a new one.

To delete the existing credential, click the trash bin icon.

### Credential reuse across API services

When creating a credential, if the requested API service shares an Identity Provider with another API service for which you already have a credential, the Marketplace displays a notification indicating that the existing credential can be reused. In this case:

* No new `client_id / client_secret` is generated.
* The existing credential is extended to cover the additional API service.
* The credential details page shows all resources accessible with this credential.

You can still choose to create a new credential instead of reusing the existing one if needed.

#### Resource availability during cross-environment provisioning

When a credential is reused across environments, provisioning in additional environments may take time (for example, if a Discovery Agent is temporarily unavailable). During this period:

* The primary credential remains fully functional for its original API service.
* There will show an indicator on the primary credential **Status** to inform there are resource provisioning processing.  Also a hover-over will show the avaiability of the resources during this time.
* The credential details page indicates which resources are pending provisioning.
* A status indicator shows when a resource is:
  * **Pending** — Provisioning is in progress in the additional environment.
  * **Error** — Provisioning failed in the additional environment. Contact the provider.
* Once provisioning completes, the resource status updates to Active and becomes available.

## List the credentials

The *Marketplace > Credentials* view displays all the credentials your team has access to. This list can be filtered by State, Expiration date and Application. For each credential, the credential type **APIKey**, **OAuth**, **HTTPBasic** or **MutualTLS** is displayed. If the credential type is not visible, ask the owner of the product.

Note that the Engage Admin user can see all Credentials regardless of the team they belongs to.

## View credential value

Once the credential is provisioned by the provider (either manually or using Discovery Agent), you can view your credential secret (if allowed by the provider). The secret is encrypted but can be viewed from inside the Marketplace for a specified period. After this period, the credential secret is removed from Amplify, but remains on the data plane.

To view the clear value of the credential:

* From the credentials list: *Marketplace > Credentials* > Select the appropriate credentials > click **View Credential**
* From the application: *Marketplace > Application* > navigate to the appropriate resource > click **View Credential**
* From the resource: *Marketplace > Product > Resource > Credentials* > navigate to the appropriate application > click **View Credential**

The remaining time to view the decrypted credential value is displayed. To view the value, click the eye icon and confirm your need to view the clear value of the credential. The credential is decrypted and displayed on the screen. Make sure to copy and paste the credential value in a secure location. The secret can be viewed as often as you wish during its remaining period. If you do not save your credential value during the available period, you must renew or request a new credential.

## Suspend / Enable credential

Credential can be suspended / enabled from several places in the Marketplace:

* From the application: *Marketplace > Application* > navigate to the appropriate resource
* From the resource: *Marketplace > Product > Resource > Credentials* > navigate to the appropriate application

Click on the credential name to display the credential information. From here, you can:

* **Suspend** an active credential using the **Suspend credential** button. The credential status will become Inactive.
* **Enable** a suspended credential using the **Enable credential** button. The credential status will become Active.

Each action must be confirmed by the user.

## Renew credential

This action is not supported by all data planes and may not be available for the consumer.

When viewing the credential list from the application or from the product resources details, a **Renew credential** menu can be used if enabled by the underlying data plane.

## Delete credential

A credential can be deleted:

* From the application: *Marketplace > Application* > navigate to the appropriate resource
* From the resource: *Marketplace > Product > Resource > Credentials* > navigate to the appropriate application

Click on the credential name to display the credential information. Click **Delete credential** to delete the credential. This action must be confirmed by the user, as it is irreversible.
