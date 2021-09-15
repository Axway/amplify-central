---
title: Publish an endpoint to Unified Catalog
linkTitle: Publish an endpoint to Unified Catalog
weight: 40
date: 2021-02-11
description: Learn how to publish an API service endpoint to Unified Catalog.
---

## Publish an endpoint to Unified Catalog

API service endpoints are an optional component of an API Service published to Unified Catalog, to make them available to developers and consumers to consume within the team or across the organization.

Before you publish an endpoint to catalog, you must [add an endpoint to the API service](/docs/central/env_gw_mgmt/add_endpoints).

1. From the details page of your service, within the **Endpoints** tab select the **Publish** button from the actions menu of the endpoint you wish to publish.
2. Manage your endpoint to be published to Unified Catalog:
   * **State** Published endpoints will be available for developers and consumers. Unpublished endpoints are only available for developers.
   * **Visibility** Public endpoints will be visible to the entire organization. Restricted endpoints will be visible only to the owning team.  
   * **Version Name** Prefilled name of the version of service to which the endpoint belongs to.
   * **Endpoint Name** Prefilled name of the endpoint being published.
3. Click **Save** to publish to catalog.

> If you want to publish an endpoint to Unified Catalog using the Axway Central CLI, please refer to these [docs](/docs/central/cli_central/cli_publish) instead.

### Errors and debugging

If there is an error while publishing to catalog, the form page will present a large error box explaining the caused of the error. The error may contain references to objects only found when using the CLI or API directly. In this case please refer to the [Axway CLI](/docs/central/cli_central/cli_publish) documentation for further guidance.
