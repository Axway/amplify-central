---
title: Discover and consume catalog assets
linkTitle: Discover and consume catalog assets
weight: 20
date: 2019-12-16T00:00:00.000Z
description: Learn how to discover and consume assets in Amplify Unified
  Catalog. Assets can be REST APIs, SOAP APIs, other non-REST APIs (for example,
  gRPC, Avro, graphQL), MFT services, and custom catalog assets.
---

## Find a catalog asset

Start by searching the Amplify Unified Catalog to find the asset. By default, catalog assets are sorted by the most recently items published or updated first. Those assets are marked with **New** or **Updated** labels at the top of the list.

If you don't know exactly what you are looking for, you can type a keyword in the search bar to search for assets. The result will return all catalog assets that have the search term either in the **name** or in the **tags** fields. You can further refine your search by using the **Filter** by **Category** and **Type**.

Watch the animation to learn how to search and filter in the Unified Catalog.

![find demo](/Images/catalog/search-and-filter-catalog-item.gif)

## Subscribe to an API

The provider of the API asset can configure when a subscription is required, and the metadata to be provided for the subscription. In this case, before using the API, you must subscribe to request access to use it. The **Subscribe** button is not displayed if the API asset was configured not to require a subscription, or if the API is not protected with an API Key.

Follow these steps to subscribe to an API asset:

1. Select **Catalog** in the left navigation bar.
2. Select an API asset in the list to see a detailed view of its description, test methods, and subscriptions.
3. Click **Subscribe** in the top right corner.
4. On the dialog box, enter a **name** for the subscription.
5. (Optional) Enter a short description. This can be used to let the asset provider know how you intend to use the API.
6. Select an **Application**.

   Amplify Central administrators can subscribe an application on behalf of API consumers. In this case, they will be required to select the **Team** that will own the subscription.
7. Click **Subscribe**.

Watch the animation to learn how to subscribe to an API asset.

![subscribe demo](/Images/catalog/subscribe-catalog-item-new.gif)

When subscription requests to an API are set to be manually approved by the API provider, a **Request access** button is shown. After you click to request access, a message is displayed to inform that the subscription request has been submitted and is awaiting for approval.

A successful subscription flow looks like this:

1. When a subscription is created, the subscription state is set to **Waiting for approval**.
2. The subscription stays in this state until the request is approved, either automatically or manually, by the asset provider.
3. When the  request is approved, the subscription state is set to **Subscribing**, and the access is provisioned.
4. After the provisioning is complete, the subscription state is set to **Active**. Depending on how the subscription flow was configured by the provider, you can receive the API credentials or you can generate the credentials on the Application that was selected when subscribing.

When the provisioning fails, the subscription state is set to **Subscribe Failed.** For instance, the subscription could fail because the application was not given access to the API. You could try to re-subscribe by editing the subscription and providing a different application.

## Subscribe to an MFT asset

By subscribing to an MFT service, you request access to exchange files with your partners.

Follow these steps to subscribe to an MFT asset that enables Account-to-Account (A2A) exchanges.

1. Select **Catalog** in the left navigation bar.
2. Select an MFT asset and click **Subscribe** from the top right corner.
3. On the dialog boxM enter a **name** for the subscription.
4. (Optional) Enter a short description. This can be used to let the asset provider know how you intend to use the API.
5. Choose an **Application** for the target App.
6. Select a **Profile** for the target App.
7. Choose an **Application** for the source application.
8. Select a **Profile** for the source application. For more information, see [Create a CFT profile](/docs/manage_unified_catalog/discover-and-consume-catalog-assets/#add-cft-profile-to-an-application).
9. Click **Subscribe**.

{{< alert title="Note" color="primary" >}}After the subscription request has been submitted, a subscription entry is automatically created in Flow Manager and a flow will be deployed that enables the transfer files between the registered applications. For more information, see [Flow Manager](https://docs.axway.com/bundle/FlowManager_20_allOS_en_HTML5/page/welcome_to_flow_manager.html).{{< /alert >}}

A subscription is created in **Requested** state. When its status changes to **Active**, the flow is deployed successfully.

The following is a list of all possible subscription states:

* **Waiting for approval**: The user has submitted a subscription request, and is awaiting approval by the asset provider.
* **Subscribing**: The subscription request was approved, and the flow is being deployed.
* **Rejected**: The subscription request was rejected by the asset provider.
* **Active**: The flow was successfully deployed.
* **Subscribe Failed**: There was an error during the deployment of the flow.
* **Change Requested**: A change request was submitted by the consumer. Change requests can be approved or rejected by asset providers.
* **Unsubscribing**:  The user has requested to unsubscribe from the asset. The flow is being removed.
* **Unsubscribed**: The flow was successfully removed from Flow Manager.
* **Unsubscribe Failed**: There was an error with the removal of the flow in Flow Manager.

## Add CFT profile to an application

This section shows how to configure an application with a CFT profile.

### Create or open an application

1. Select **Apps** in the left navigation bar, and select an existing app or create a new app.
2. On **Identity Profiles** tab, add a **CFT profile**.
3. Enter **Name** and **Product name**, which will be used by the file exchange application.

Watch the animation to learn how to perform this task.

![CFT profile created](/Images/central/cft_profile_Save.gif)

{{< alert title="Note" color="primary" >}}A Profile used for a catalog subscription cannot be updated or deleted.{{< /alert >}}

## Edit a subscription

You can change the details of a subscription (for instance, when you want to select another application) from the **Subscriptions** page. To edit a subscription:

1. Select **Subscriptions** in the left navigation bar.
2. Click a subscription to view its details.
3. Click **Edit**.
4. After you enter the new values, click **Update**.

After you submit your changes, the subscription will transition to **Change Requested**. The subscription stays in this state until the change request is approved, either automatically or manually, by the asset provider.

## Download a Catalog asset

Follow these steps to download an asset from the catalog:

1. Select an asset from the Unified Catalog to see a detailed view of its description.
2. Click the **More Options** menu, and select **Download** from the dropdown list.

## Promote an API to Integration Builder

If you are leveraging the Amplify iPaaS to create integrations between different applications, you can promote an API from the Unified Catalog to Integration Builder as a custom connector with a click of a button. This saves you the trouble of exporting the swagger file and manually import it in Integration Builder. To lean more, see [Amplify Integration Builder](https://docs.axway.com/bundle/Amplify_Integration_Builder_allOS_en/page/amplify_integration_builder.html).

You can promote an API published in the Unified Catalog to Integration Builder as a custom connector. Before you start, ensure that you have access to Integration Builder, and that have your API secured, as well as a valid subscription. For details, see [Subscribe to an API](#subscribe-to-an-api).

To promote an API as a connector template:

1. Navigate to **Unified Catalog**.
2. Select an API asset. From the details screen, click the **More Options** menu, and select **Export** from the dropdown list.
3. Select either the **Production** or **Sandbox** Integration Builder environment where you want to use this API. This option is not shown when you have only one environment activated with your Amplify platform license.
4. Enter a **Connector Name** for the template. This name is mandatory and it has the API asset name by default.
5. (Optional) Enter a short description in the **Connector description** box.
6. Click **Export**.

{{< alert title="Tip" color="primary" >}}You must have the **Central admin** role or the **Developer** team role assigned, and Integration Builder activated to view the **Export** option.{{< /alert >}}

Now you can navigate to Integration Builder to use your connector.

Watch the animation to learn how to promote an API as a connector template.

![export demo](/Images/catalog/export-ci-to-ib.gif)

## Authenticate an exported API from Unified Catalog in Integration Builder

Watch this video to learn how to configure and authorize an API that has been promoted from Amplify Unified Catalog into Integration Builder.

{{< youtube tGNXQo-1frE >}}
