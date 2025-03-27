---
title: View environments
linkTitle: View environments
weight: 10
date: 2020-12-14
---
Display your environments in a searchable and sortable list. The list contains:

* Axway Cloud SaaS environments
* Environments using the API service model:

    * Amplify API Gateway environments
    * Apigee X Gateway environments
    * AWS API Gateway environments
    * Azure API Gateway environments
    * Github repository environments
    * Istio environments
    * Custom/SDK environments
    * Environments that have been defined manually using the Axway Central CLI or APIs

![Environment List Page](/Images/central/EnvironmentListPage.png)

This page can be sorted by an environment title, logical name, or by the time that they were created or last modified. To sort the list, select the desired option from the drop-down menu.

You can search the environments by their title, logical name, or any tags that are attached to it.

Each environment in the list contains some basic information:

1. An icon
2. Environment Name
3. Logical name
4. The connection status of any AWS Gateway or API Manager Discovery and Traceability agents that you have connected to the environment. MANUAL SYNC will be displayed if there is no agent connected. See [Agent environment status](#service-synchronization).
5. The Production/Non-Production status of the environment. PRODUCTION indicates that the environment will be used to perform production processing or connect to a non-Axway gateway. This usage will be reflected in your entitled quota.
6. The number of assets, API services, housed in the environment
7. Tags or keywords assigned to the environment
8. The user who last modified the environment, and when
9. Trash bin to delete the environment

## View environment details

To view environment details, click the environment name.

The following information is displayed for environments created using the API service model:

* The title of the environment
* The status of any connected discovery and traceability agents
* Sections **Environment Information**, **Activity Report**, **Service Synchronization**, **Tags & Attributes**
* Tabs **Services**, **Access Rights**, **Credential Management**

    * **Environment Information**: This section contains general information.
    * **Activity Report**: Dashboard, which shows the aggregated values for how your environment assets are distributed and how many subscriptions exist across all of those assets:

        * Services: The total count of API services represented in the environment.
        * Catalog Items: The total count of published catalog items.
        * Subscriptions: The total count of subscribers to all the published Marketplace items.

    * **Tags & Attributes**: This section shows any tags (keywords) and attributes (key and value pairs) that are specific to the environment asset. Attributes in this context are key and value pairs used for extending functionality and integrations with third-party systems.
    * **Services, Access Rights, Credential Management**: This section shows all API services, access rights, and when credentials expire within the environment. It is sortable by logical name, Version Count, and when the service was created or last modified. You can search by title, name, or tag. For each API service, it shows the number of versions, the user who last modified the API service, and when the API service was last modified.

        * Mock Endpoints: If requirements are met, a mock endpoint can be created from the **Services** tab:

            1. Click the three ellipsis and select **Create Mock Endpoint**.
            2. Once the **Create Mock Endpoint** side panel appears, fill in the three inputs according to the information [provided](/docs/manage_service_registry/service_management/#create-mock-endpoint).
            3. Click **Save**. If successful, a success screen will give the option to close the side panel or go to the API service.

        The following requirements must be met before an API service can create a mock endpoint:

        * The service must be OAS2/3
        * The organization must have the API Mocking entitlement.
        * The service must have an associated spec file (API Service Revision).
        * The service must be a design/runtime managed service. Cannot be runtime unmanaged.

    {{< alert title="Note" color="primary" >}}If enabled, Security and Design compliance validation scores are displayed for each of the API service(s) in the Environment. See [Manage your compliance validation](/docs/manage_compliance/#default-grading-scores) for grading scores information.{{< /alert >}}

For more information about Axway Cloud SaaS environment, refer to [Axway Cloud SaaS: Get Started](/docs/saas_api_gateway/quickstart/)

### Delete an API service

To delete an API service:

1. Click the trash bin associated to the API service.
2. Click **Delete**.

### Service Synchronization

Agents associated to the environment are listed with their Agent Kind, Agent Name, Version, Data Plane type, Agent Status, and Last Activity time stamp.

**Agents resources scoped to the environment**:

| STATUS              | BADGE                                                                 | SCENARIOS                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connected           | ![Connected](/Images/central/env_gw_mgmt/statusconnected.png)         | All agents are running                                                                                                                              |
| Connection Error    | ![Connection Error](/Images/central/env_gw_mgmt/statuserror.png)      | One or more agents have failed                                                                                                                      |
| Disconnected        | ![Disconnected](/Images/central/env_gw_mgmt/statusdisconnected.png)   | All agents are stopped                                                                                                                              |
| Manual Sync         | ![Manual Sync](/Images/central/env_gw_mgmt/statusmanual.png)          | No reported agent status resource values, **or** one or more agents have been stopped and one or more agents have never been started (no status)  |
| Partially Connected | ![Partially Connected](/Images/central/env_gw_mgmt/statuspartial.png) | One or more agents are stopped and the other agents are running, **or** one or more agents are running and the other agents have never been started |

### View the details of an API service

To view the details of your API service and its versions:

1. Click an API service from the list. *The Version tab is displayed*.
2. Select a version. The most recent version is displayed by default.

The API service details page includes:

* **Service Information**: Contains general information and any tags or attributes that are specific to the API service asset. Attributes in this context are key and value pairs used for extending functionality and integrations with third party systems.
* **Dashboard Report**: Dashboard that shows the aggregated values for how your API service version assets are distributed and how many subscriptions exist across all of those assets.

    * Shared with: The total count of teams this API service is shared with
    * Assets: The total count of assets this API service is linked with
    * Products: The total count of products linked to this service
    * Consumers: The total count of asset requests to this service

* **Compliance Score**: Compliance validation is an optional entitlement, API Compliance, which can be purchased with the Amplify API Management Platform product.  Compliance validation is the verification of your APIs in terms of how they meet the guidelines defined in a ruleset. Both an API Design and Security ruleset can be applied to all the APIs in a selected environment. The API is checked for compliance in terms of the API methods supported or the presence of a security policy. The grading results of the compliance are measured in the number of errors, warnings, info, or hints found. In the Services tab, two columns visualize the compliance grading of each API. The first one shows the grade from a Security perspective, the second is the Design compliance level. An activity indicator is displayed in either grading column once the API is queued for Design or Security compliance validation. An N/A is displayed in either grading column if the API is not one of the supported API types. A red icon is displayed in the grading column if the API specification file is missing a required value.

    ![Error results](/Images/compliance/error_results.png)

* **Versions information**: Contains information specific to the version that you have selected. Includes the type of specification (OAS2, OAS3, WSDL, Protobuf, etc.) and the version string from the API Specification file.
    * Specifications tab: Displays the contract or methods for your selected API service version. Some specification types provide a visualization of your API methods, and some fields are collapsible. You can see additional information by clicking to open relevant methods or models.
    * Endpoints tab: Contains the URLs pointing to deployed instances of the API service version and their associated stage and state.
    * Tags & Attributes tab: Contains a list of tags and attributes assigned to the selected API service version.
    * Compliance: Security and Design compliance scores are visualized. Click **Download Results** to receive a file with details of each error or click **Run Linting Test** to rerun the validation profile.
    * Assets tab: Contains a list of the assets linked to selected API service version.
    * Products tab: Contains the details of products linked to the selected API service version.

* **Access Rights**: Shared teams can have different types of access to this API service

* **Tags and Attributes**: Contains a list of tags and attributes assigned to the API service.

* **Assets**: Contains a list of the assets linked to the API service.

* **Products**: Contains the details of products linked to the API service.

* **Dependency Graph**: Contains details about all of the API service endpoint's dependencies.

### Publish endpoint

1. Click the **Endpoints** tab.
2. Click the associated **Ellipsis** icon.
3. Click **Publish**. A *Publish to Marketplace* wizard is displayed to assist in quickly publishing an endpoint, creating an asset, creating a product, and publishing the product to the Marketplace.

### Edit endpoint

1. Click the **Endpoints** tab.
2. Click the associated **Ellipsis** icon.
3. Click **Edit Endpoint**. An *Endpoint Edit* wizard is displayed to assist with changing the stage of an endpoint.
4. The wizard will also assist with setting the state of an endpoint:
   * None: No state set.
   * Design: Reserved for endpoints tied to a mockup service.
   * Experimental: API published for preliminary testing. It might not be feature complete and has bugs.
   * Pre-released: API is published for beta testing. It is mostly feature complete but has bugs.
   * Active: API is released and ready for production use.
   * Deprecated: API is deprecated in favor of a newer version or another API.
   * Archived: API is retired and no longer available for use.
5. On the second step of the wizard, labelled **Endpoint**, specific endpoints can be added, edited, or deleted.

### Delete endpoints and catalog items

1. Click the **Endpoints** tab.
2. Click the associated **Ellipsis** icon.
3. Click **Delete**.
