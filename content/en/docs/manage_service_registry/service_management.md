---
title: Service management
linkTitle: Service management
weight: 20
---

An API service represents an API, including all its versions and deployed endpoints, and additional information to represent your API. For example, description, environment scope, image encoded in base64.

Use the Service Registry WebUI to view all your API services across all environments.

Use the Topology WebUI to select an environment and then manage your API services, including view, create, update, and delete.

## Before you start

You must have credentials or a user account from your org Administrator to use the Service Registry WebUI. Please follow the steps [here](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).

## Objectives

Learn how to use the Service Registry WebUI to create and manage services, including:

* List all API services in an environment
* View details for an API service
* Create a new API service
* Delete an API service
* Publish a service to the Marketplace
* Create mock endpoints
* Edit mock endpoints

## List API services

To list API services:

1. Navigate to *Catalog > Service Registry*.
2. Click on a tab to select a view:

   * All - View all API services from all API Gateways and environments
   * Design - View all API services from all Design repository environments
   * Runtime Managed - View all API services from all Runtime Managed API Gateways
   * Runtime Unmanaged - View all API services in all Runtime Unmanaged environments

3. View the following information for all services:

   * Version
   * Assets
   * Environment
   * Owner
   * Modified date by user
   * Security compliance grading
   * Design compliance grading
   * Runtime compliance grading

You can filter the services by the Service type, Stages, Environments, Owners, and Security and Design grading scores (A, B, C, D, E and F) using the **Filter By** controls. Search by the Service Name with the search bar.

Click the **Customize table** icon in the top-right corner of the table to customize the table layout. A modal opens that allows you to tailor the layout to your needs, including:

* Show columns
* Hide columns
* Reorder columns via drag-and-drop
* Restore to default layout

Layout preferences are automatically saved and persist across browser sessions.

## View API service details

To view service details:

1. Navigate to *Catalog > Service Registry*.
2. From the list view, select a service to open the service details.

Click on the Service name or icon to view the following detailed information for a specific service in any state (Draft, Active, Deprecated, Active):

* General Service information (non-version specific) is displayed at the top and includes the Service Name, Logical Name, Description, and Owning Team. There are tabs for the Versions, Endpoints, Access Rights, Tags & Attributes, Assets, and Products for the General Service.
* The metrics area displays the number of teams the General Service is shared with, the number of assets and products related to the General Service, and the number of active asset requests to the General Service.
* The general Endpoints tab displays a list of endpoints associated with the API service. If the API service is not within the scope of an environment with agent, the user can create and edit runtime endpoints by using the **Create Runtime Endpoint** button or dropdown. Editing is done by clicking the three ellipsis and selecting **Edit Endpoint**. If [requirements](#create-a-mock-endpoint) are met, the user can create and edit mocked endpoints by using the **Create Mock Endpoint** button or dropdown. Editing is done by clicking the three ellipsis and selecting **Edit Mock Endpoint**.
* The general Access Rights tab displays all teams the API service is shared with.
* The general Tags & Attributes tab displays the tags and attributes properties for the general API service.
* The general Assets tab displays the assets that contain this API service, the state of the assets, and when they were last modified.
* The general Products tab displays the products that contain this API service, the state and status of the products, and when they were last modified.
* The Versions tab displays version information for the specific service. Every version of the service is displayed by Service Revision name, specification type, and created/updated date, making it easy to view all versions of an API service. This tab also displays the number of endpoints, assets, products, and if enabled, Security, Design, and Runtime compliance validation scores for each of the API service(s) in the Environment. See [Manage your compliance validation](/docs/manage_compliance/#default-grading-scores) for grading scores information.

    {{< alert title="Tip" color="secondary" >}} Enter the name of a version in the search bar to quickly find a specific version. <br /> <br/>Click Compliance Score **Details** to open the Compliance tab and view the Security and Design Compliance details, download results in CSV format, and run linting tests. {{< /alert >}}

* With the version specific tab, there are other tabs to view the API Specification & Methods, Tags & Attributes, Compliance, Assets, and Products, which are related to the version of the service.

* If an MCP service is selected, the *Specifications* tab is populated with MCP server information. Server Metadata, Tools, Resources, Prompts, and MCP Clients are viewable.

## Create an API service

1. Navigate to *Topology* and select an environment.
2. Click **Add Service** (located at the top right of the page). Then select **Add API Service**.
3. Upload an API Specification file.
4. Some information will be read from the API Specification file and pre-populated. Add / Edit information where applicable and then click **Next**:

    * Service Name - The display name for the service in the WebUI
    * Description - A short description of the service
    * Image - An icon or image to be associated with the service

5. If [requirements](#create-a-mock-endpoint) are met, there will be an option to create a mock or runtime endpoint. If mock endpoint creation is selected, then fill in the mock endpoint inputs according to the information [provided](#create-a-mock-endpoint). If requirements are not met, then the only option available will be runtime endpoint. Simply add / edit Endpoint information, if available, and click **Next**.
6. Click **Save**.

## Delete an API service

1. Navigate to *Catalog > Service Registry*.
2. From the list view, select a service to open the service details.
3. Click on the environment name breadcrumb at the top of the page (i.e., the name to the right of **ENVIRONMENTS / NAME**).
4. In the *Services* tab at the bottom of the page, click on the trash bin associated with the service you want to delete.
5. Type the name of the service and click on the confirmation button that “I understand this is a permanent and irreversible action. Delete.” **All versions of the service are deleted.**

## Create product

Use **Create Product** to quickly create a product in draft. An asset and a product will automatically be generated. Changes can be made to the product from the Product Foundry if needed.

1. Navigate to *Catalog > Service Registry*.
2. From the list view, click the ellipsis that is associated to the service.
3. Select **Create Product**. Note there must be endpoints associated with this service and the asset quota must not have been reached in order to have access to this action.
4. Add / edit information where applicable:

    * Asset Name - The proposed asset name is set to the API service name.  
    * Product Name - The proposed asset name is set to the API service name.
    * Included Endpoints - By default, all endpoints are selected. Remove any endpoints that are not to be included in the asset. Mocked endpoints will also be listed if [requirements](#create-a-mock-endpoint) are met. Mocked endpoints will be easily recognized through the **State** column, as the mock endpoint has the state **MOCKED**.
    * Team Ownership - The proposed team ownership is set to the currently logged in team.  If you are logged in as a Engage Admin, no team ownership is proposed and the created asset and product are only visible to the Engage Admin role.

## Publish to the Marketplace

Use Publish to Marketplace to quickly promote an API to the Marketplace for internal consumption as a product under a free plan. An asset and a product will automatically be generated. The publication is initially restricted to teams in the provider organization, but changes can be made to the product from the Product Foundry.

1. Navigate to *Catalog > Service Registry*.
2. From the list view, click the ellipsis that is associated to the service.
3. Select **Publish to Marketplace**.
4. Add / edit information where applicable:

    * Asset Name - The proposed asset name is set to the API service name.  
    * Product Name - The proposed asset name is set to the API service name.
    * Included Endpoints - By default, all endpoints are selected. Remove any endpoints that are not to be included in the asset. Mocked endpoints will also be listed if [requirements](#create-a-mock-endpoint) are met. Mocked endpoints will be easily recognized through the **State** column, as the mock endpoint has the state **MOCKED**.
    * Team Ownership - The proposed team ownership is set to the currently logged in team.  If you are logged in as a Engage Admin, no team ownership is proposed and the created asset and product are only visible to the Engage Admin role.
    * Product Visibility -  Select the Marketplace where you want to publish the product, as well as the visibility restriction: Authenticated Users and Platform Users and/or Marketplace Users.

        * **Authenticated users** visibility - Indicates if the user must be authenticated to see the product:
            * **unchecked** - Anonymous user can view any product in the Public Marketplace (default behavior). This option is not available for Private Marketplace.
            * **checked** - User must be authenticated to see the product and can be restricted further with the Platform Users or Marketplace Users options. This cannot be unchecked for Private Marketplace.
        * **Platform Users** visibility - Under **Platform Users**, select one of the following options from the **Visible To** menu:
            * **Everyone** - (default) The product is visible in the Marketplace by all registered users in your provider organization.
            * **Selected teams** - Only members of the selected teams can see the product in the Marketplace.
            * **Exclude selected teams** - Only members that are not part of selected teams can see the product in the Marketplace.
            * **Include teams having tag** - Only members of the team that have the selected tag can see the product in the Marketplace.
            * **None** - The product is not visible to anyone in the Marketplace.
                * From the list of available teams in your provider organization, select the teams you want to give product visibility or remove visibility from.
        * **Marketplace Users** visibility - Under **Marketplace User**, select one of the following options from the **Visible To** menu:
            * **Everyone** - (default) The product is visible in the Marketplace by all registered users in your provider organization.
            * **Selected organizations** - Only users registered with a Marketplace account and a member of the selected consumer organization can see the product in the Marketplace.
            * **None** - The product is not visible to any user registered with a Marketplace account or anonymous users.
                * From the list of available consumer organizations in your provider organization, select the consumer organization you want to give product visibility or remove visibility from.

    * The default product plan is a free unlimited plan which can be edited after the product is created.

5. Click **Publish** to quickly make an API service available from consumption in the Marketplace.

## Create a mock endpoint

Create a mock endpoint to simulate the behavior of an API. Contact Axway Support at support.axway.com or reach out to your Axway representative to learn how to enable the API Mocking Service for your organization.

{{< alert title="Tip" color="secondary" >}}Mocked endpoints will always be created with the state "MOCKED" as to be easily identifiable.{{< /alert >}}

These requirements must be met before an API service can create a mock endpoint:

1. The Service must be OAS2/3.
2. The organization must have the API Mocking entitlement.
3. The Service must have an associated spec file (API Service Revision).

To create a mock endpoint:

1. Click the name of the service in the Registry.
2. Select the **Endpoints** tab in the service details page.
3. Click **+ Create Mock Endpoint**.
4. Enter the information in the *Create Mock Endpoint* side panel. Note that only two of the following fields are required:

    * **Endpoint Name** - A friendly name, or title, for this mock endpoint.
    * **API Service Version** - (required) Select or search for a version number for the API service. The latest version option is automatically updated with new API service versions.
    * **Mock Endpoint Name** - (required) Provide a unique name to be appended to the mock URL. Must be unique for your organization.
    * **Secure Mock Endpoint** - By default, the mocked endpoint is not secured. Toggle the button on to secure the mocked endpoint with an authorization header.

5. Click **Save** to save your changes. If successful, a success screen will give the option to close the side panel or go to the API service.

{{< alert title="Note" color="primary" >}}Make sure that your mock endpoint is secured. This requires an HTTP request to set an authorization header, as shown below, with your Axway login token. The Marketplace "Try it out" feature will automatically set this header. Disabling this security feature will make the mock service public to everyone on the Internet.

`X-Axway-Authorization: bearer [your-login-token]`{{< /alert >}}

Mock endpoints can also be created in the [Service Wizard](#create-an-api-service) and in the [Environment Details Services](/docs/connect_manage_environ/view_environments/#view-environment-details).

Mock endpoints can be viewed in:

* [service details Endpoints tab](#view-api-service-details)
* [Create Product side panel](#create-product)
* [Publish To Marketplace side panel](#publish-to-the-marketplace)
* [Marketplace product Resources tab](/docs/manage_product_foundry/foundry_product_management/#view-product-details)

## Edit a mock endpoint

1. Click the name of the service in the Registry.
2. Select the **Endpoints** tab in the service details page.
3. Click the ellipsis that is associated to the endpoint.
4. Select **Edit Endpoint** and edit information where applicable.
5. Click **Save** to save your edits.
