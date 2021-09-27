---
title: View Dependency Analysis
linkTitle: View Dependency Analysis
weight: 60
description: "An API Service can be selected from the list on the Environment
  details page. The API Services details page includes a Dependency Analysis
  view of the relationship to  dependencies to the selected API Service
  version.    "
---
The *Dependency Analysis* view displays details about the relationships to the selected API Service version. The relationship details enable the API Provider to make informed decisions and take actions on any of the dependencies.

{{% alert title="Note" %}}
The Dependency Analysis view is not supported for Axway Cloud and Service Mesh environments.
{{% /alert %}}

The *API Service* details page has multiple tabs to view:

* **Specifications** for the contract or API methods for the API Service version.
* **Endpoints** for the list of URLs of each deployed instance of the API Service version.
* **Catalog Items** for the list of consumable API Services available in the Unified Catalog.
* **Dependency Analysis** for the related items to the API Service version.

The **Dependency Analysis** tab displays the following, if available, for the selected API Service version:

* Endpoint
* available Unified Catalog Items
* Subscriptions to the published Unified Catalog items

To view Dependency Analysis details:

* Click on the **Endpoint** node to focus on the API Service dependent endpoints. Click **view info** to display a list of endpoints where you can:

    * view the number of dependent Catalog items to each endpoint
    * add or delete more endpoints
    * publish an endpoint to the Unified Catalog

* Click on the **Catalog Items** node to focus on the API Service dependent Catalog items. Click **view info** to display a list of Catalog items where you can:

    * view the number of dependent Catalog items and each state (e.g. Published, Unpublished, Failed)
    * deleting a Catalog item

* Click on the **Subscriptions** node to focus on the API Service dependent subscriptions. Click **view info** to display a list of subscriptions where you can:

    * manage subscriptions. For example, the approval of a subscription request can be done while remaining in the Dependency Analysis view.
    * view the quantity of dependent subscriptions in various states. For example, the number of Cancelled subscriptions would give an indication of the subscriber satisfaction with an API Service.
