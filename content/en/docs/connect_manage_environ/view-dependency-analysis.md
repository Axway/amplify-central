---
title: View Dependency Analysis
linkTitle: View Dependency Analysis
draft: true
weight: 60
---
The *Dependency Analysis* view displays details about the relationships to the selected API service version. The relationship details enable the API Provider to make informed decisions and take actions on any of the dependencies.

{{< alert title="Note" color="primary" >}}
The Dependency Analysis view is not supported for Axway Cloud and Service Mesh environments.
{{< /alert >}}

The *API Service* details page has multiple tabs to view:

* **Specifications** for the contract or API methods for the API service version.
* **Endpoints** for the list of URLs of each deployed instance of the API service version.
* **Catalog Items** for the list of consumable API services available in the Marketplace.
* **Dependency Analysis** tab for the related items to the API service version.

The **Dependency Analysis** tab displays the following, if available, for the selected API service version:

* Endpoint
* available Marketplace items
* Subscriptions to the published Marketplace items

To view Dependency Analysis details:

* Click on the **Endpoint** node to focus on the API service dependent endpoints. Click **view info** to display a list of endpoints where you can:

    * view the number of dependent Catalog items to each endpoint
    * add or delete more endpoints
    * publish an endpoint to the Marketplace

* Click on the **Catalog Items** node to focus on the API service dependent Catalog items. Click **view info** to display a list of Catalog items where you can:

    * view the number of dependent Catalog items and each state (e.g. Published, Unpublished, Failed)
    * deleting a Catalog item

* Click on the **Subscriptions** node to focus on the API service dependent subscriptions. Click **view info** to display a list of subscriptions where you can:

    * manage subscriptions. For example, the approval of a subscription request can be done while remaining in the Dependency Analysis view.
    * view the quantity of dependent subscriptions in various states. For example, the number of Cancelled subscriptions would give an indication of the subscriber satisfaction with an API service.
