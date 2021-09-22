---
title: View your environments
linkTitle: View your environments
weight: 10
date: 2020-12-14
description: All of your environments displayed in one place.
---

The environments page contains all of your environments in a searchable and sortable list. This list contains:

* Axway Cloud SaaS environment
* Environments using the API service model:

    * AWS Gateway environments
    * API Manager environments
    * Environments that have been defined manually using the Axway Central CLI or APIs

To add a new environment, click **+ Environment**.

![Environment List Page](/Images/central/EnvironmentListPage.png)

This page can be sorted by an environment's logical name, title, or by the time that they were created or last modified. To sort the list, select the desired option from the dropdown menu.

You can search the environments by their logical name, title, or any tags that are attached to it.

Each environment in the list contains some basic information:

![Environment Results Details](/Images/central/env_gw_mgmt/environmentlistresultupdate.png)

1. Title
2. Logical name
3. An icon
4. The connection status of any AWS Gateway or API Manager Discovery and Traceability agents that you have connected to the environment. MANUAL SYNC will be displayed if there is no agent connected. See [Agent environment status](#agent-environment-status).
5. Description
6. Tags
7. The number of assets, API services, housed in the environment
8. The user who last modified the environment, and when
9. The Production/Non-Production status of the environment. PRODUCTION indicates that the environment will be used to perform production processing or connect to a non-Axway gateway. This usage will be reflected in your entitled quota.
10. HOSTED indicates that this environment is hosted in the Axway Managed Cloud.
11. Menu with an option to delete the environment

Click the title or logical name of the environment to view additional details.

## View environment details

The following information is displayed for environments created using the API service model:

* The title of the environment
* The status of any connected discovery and traceability agents
* Sections **Environment Information**, **Activity Report**, and **Services**

![Environment Details Page](/Images/central/env_gw_mgmt/environmentdetailspage2.png)

* **Environment Information**: This section contains general information and any tags or attributes that are specific to the environment asset. Attributes in this context are key and value pairs used for extending functionality and integrations with third-party systems.
* **Activity Report**: Dashboard, which shows the aggregated values for how your environment assets are distributed and how many subscriptions exist across all of those assets:

    * Services: The total count of API services represented in the environment.
    * Catalog Items: The total count of published catalog items.
    * Subscriptions: The total count of subscribers to all the published catalog items.
* **Services**: This section shows all API services that exist within the environment. It is sortable by title, logical name, and when the service was created or last modified. You can search by title, name, or tag. For each API service, it shows the number of versions, the user who last modified the API service, and when.

For more information about Axway Cloud SaaS environment, refer to [Axway Cloud SaaS: Get Started](/docs/saas_api_gateway/quickstart/)

### Delete an API Service

To delete an API service:

1. Click the **Ellipsis** icon at the far right of the API service's row.
2. Click **Delete** on the menu that is shown.

### Agent Environment Status

**Agents resources scoped to the environment**:

| STATUS              | BADGE                                                                 | SCENARIOS                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connected           | ![Connected](/Images/central/env_gw_mgmt/statusconnected.png)         | All agents are running                                                                                                                              |
| Connection Error    | ![Connection Error](/Images/central/env_gw_mgmt/statuserror.png)      | One or more agents have failed                                                                                                                      |
| Disconnected        | ![Disconnected](/Images/central/env_gw_mgmt/statusdisconnected.png)   | All agents are stopped                                                                                                                              |
| Manual Sync         | ![Manual Sync](/Images/central/env_gw_mgmt/statusmanual.png)          | No reported agent status resource values, **or** one or more agents have been stopped and one or more agents have never been started (no status)  |
| Partially Connected | ![Partially Connected](/Images/central/env_gw_mgmt/statuspartial.png) | One or more agents are stopped and the other agents are running, **or** one or more agents are running and the other agents have never been started |

### View the details of an API Service

To view the details of your API Service and its versions:

1. Click an API service from the list.
2. Choose a version from the **Version** dropdown menu. The most recent version is displayed by default.

![Service Details Page](/Images/central/ServiceDetailsPage.png)

The following describes the sections on the API Service details page:

* **Service Information**: Contains general information and any tags or attributes that are specific to the API service asset. Attributes in this context are key and value pairs used for extending functionality and integrations with third party systems.
* **Activity Report**: Dashboard, which shows the aggregated values for how your API service version assets are distributed and how many subscriptions exist across all of those assets.

    * Endpoints: The total count of endpoints associated with this API service version.
    * Catalog Items: The total count of successfully published items in the Unified Catalog. This number might differ from the number of items available in the **Catalog Items** table. This count only recognizes items that are available in the Unified Catalog, whereas the table also contains items that were not published or that are in an error state.
    * Subscriptions: The total count of subscribers to all the published catalog items.
* **Version Information**: Contains information specific to the version that you have selected from the dropdown menu. Includes the type of specification represented by the API service version (OAS2, OAS3, WSDL, Protobuf, and so on.)
* **Specification tab**: Displays the contract or methods for your selected API service version. Some specification types provide a visualization of your API methods, and some fields are collapsible. You can see additional information by clicking to open relevant methods or models.
* **Endpoints tab**: Contains a table listing the URLs pointing to deployed instances of the API service.
* **Catalog Items tab**: Contains a table listing both successfully published and unpublished items in the Unified Catalog. Each entry contains the state of the item (PUBLISHED, UNPUBLISHED, or IN ERROR).

### Delete endpoints and catalog items

To delete an **Endpoint** or a **Catalog item**:

1. Click the relevant tab
2. Click the **Ellipsis** icon at the far right of the item's row
3. Click **Delete** on the menu that is shown.
