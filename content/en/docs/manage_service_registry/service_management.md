---
title: Service management
linkTitle: Service management
weight: 20
---

An API service represents an API, including all its versions and deployed endpoints, and additional information to represent your API. For example, description, environment scope, image encoded in base64.

Use the Service Registry WebUI to view all your API services across all environments.

Use the Topology WebUI to select an environment and then manage your API services, including view, create, update, and delete.

## Before you start

You must have credentials or a user account from your org Administrator to use the Service Registry WebUI.  Please follow the steps [here](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).

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
   * Runtime Managed - View all API Services from all Runtime Managed API Gateways
   * Runtime Unmanaged - View all API Services in all Runtime Unmanaged environments

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

## View API service details

To view service details:

1. Navigate to *Catalog > Service Registry*.
2. From the list view, select a service to open the service details.

Click on the Service name or icon to view the following detailed information for a specific service in any state (Draft, Active, Deprecated, Active):

* General Service information (non-version specific) is displayed at the top and includes the Service Name, Logical Name, Description, and Owning Team. There are tabs for the Versions, Access Rights, Tags & Attributes, Assets, and Products for the General Service.
* The metrics area displays the number of teams the General Service is shared with, the number of assets and products related to the General Service, and the number of active asset requests to the General Service.
* The general Access Rights tab displays all teams the API service is shared with.
* The general Tags & Attributes tab displays the tags and attributes properties for the general API service.
* The general Assets tab displays the assets that contain this API service, the state of the assets, and when they were last modified.
* The general Products tab displays the products that contain this API service, the state and status of the products, and when they were last modified.
* The Versions tab displays version information for the specific service. Every version of the service is displayed by Service Revision name, specification type, and created/updated date, making it easy to view all versions of an API service. This tab also displays the number of endpoints, assets, products, and if enabled, Security, Design, and Runtime compliance validation scores for each of the API Service(s) in the Environment. See [Manage your compliance validation](/docs/manage_compliance/#default-grading-scores) for grading scores information.

    {{< alert title="Tip" color="secondary" >}} Enter the name of a version in the search bar to quickly find a specific version. <br /> <br/>Click Compliance Score **Details** to open the Compliance tab and view the Security and Design Compliance details, download results in CSV format, and run linting tests. {{< /alert >}}

* With the version specific tab, there are other tabs to view the API Specification & Methods, Endpoints listening for requests to the service, Tags & Attributes, Compliance, Assets, and Products which are related to the version of the service.

## Create an API service

1. Navigate to *Topology* and select an environment.
2. Click **+ Add API Service** to add a new service.
3. Upload an API Specification file.
4. Some information will be read from the API Specification file and pre-populated. Add / Edit information where applicable and then click **Next**:

    * Service Name - The display name for the service in the WebUI
    * Description - A short description of the service
    * Image - An icon or image to be associated with the service

5. Add / edit Endpoint information, if available, and then click **Next**.
6. Click **Save**.

## Delete an API service

1. Navigate to *Catalog > Service Registry*.
2. From the list view, select a service to open the service details.
3. Click on the environment name breadcrumb at the top of the page (i.e., the name to the right of **ENVIRONMENTS / NAME**).
4. In the *Services* tab at the bottom of the page, click on the trash bin associated with the service you want to delete.
5. Type the name of the service and click on the confirmation button that “I understand this is a permanent and irreversible action. Delete.” **All versions of the service are deleted.**

## Publish to the Marketplace

Use Publish to Marketplace to quickly promote an API to the Marketplace for internal consumption as a product under a free plan. An asset and a product will automatically be generated. The publication is initially restricted to teams in the provider organization, but changes can be made to the product from the Product Foundry.

1. Navigate to *Catalog > Service Registry*.
2. From the list view, click the ellipsis that is associated to the service.
3. Select **Publish to Marketplace**.
4. Add / edit information where applicable:

    * Asset Name - The proposed asset name is set to the API service name.  
    * Product Name - The proposed asset name is set to the API service name.
    * Included Endpoints - By default all endpoints are selected. Remove any endpoints that are not to be included in the asset.
    * Team Ownership - The proposed team ownership is set to the currently logged in team.  If you are logged in as a Central Admin, no team ownership is proposed and the created asset and product are only visible to the Central Admin role.
    * Product Visibility -  Select the Marketplace where you want to publish the product, as well as the visibility restriction: Authenticated Users and Platform Users and/or Marketplace Users.
  
        * **Authenticated users** visibility - indicates if the user must be authenticated to see the product:
            * **unchecked** - anonymous user can view any product in the Public Marketplace (default behavior). This option is not available for Private Marketplace.
            * **checked** - user must be authenticated to see the product and can be restricted further with the Platform Users or Marketplace Users options. This cannot be unchecked for Private Marketplace.
        * **Platform Users** visibility: under **Platform Users**, select one of the following options from the **Visible To** menu:
            * **Everyone** - (default) the product is visible in the Marketplace by all registered users in your provider organization.
            * **Selected teams** - only members of the selected teams can see the product in the Marketplace.
            * **Exclude selected teams** - only members that are not part of selected teams can see the product in the Marketplace.
            * **Include teams having tag** - only members of the team that have the selected tag can see the product in the Marketplace.
            * **None** - the product is not visible to anyone in the Marketplace.
                * From the list of available teams in your provider organization, select the teams you want to give product visibility or remove visibility from.
        * **Marketplace Users** visibility: under **Marketplace User**, select one of the following options from the **Visible To** menu:
            * **Everyone** - (default) the product is visible in the Marketplace by all registered users in your provider organization.
            * **Selected organizations** - only users registered with a Marketplace account and a member of the selected consumer organization can see the product in the Marketplace.
            * **None** - the product is not visible to any user registered with a Marketplace account or anonymous users.
                * From the list of available consumer organizations in your provider organization, select the consumer organization you want to give product visibility or remove visibility from.

    * The default product plan is a free unlimited plan which can be edited after the product is created.

5. Click **Publish** to quickly make an API service available from consumption in the Marketplace.

## Create a mock endpoint

Create a mock endpoint to simulate the behavior of an API. Contact Axway Support at support.axway.com or reach out to your Axway representative to learn how to enable the API Mocking Service for your organization.
* Mocked endpoints will always be created with the state "MOCKED" as to be easily identifiable.

In order for an API Service to create a mock endpoint 4 requirements must be met:
1. The Service must be OAS2/3
2. The organization must have the API Mocking entitlement.
3. The Service must have an associated spec file (API Service Revision).
4. The Service must be a design/runtime managed service. Cannot be runtime unmanaged.

There are 4 areas that a mock endpoint can be created:
1. [Service Registry](#list-api-services)
2. [Service Wizard](#create-an-api-service)
3. [Service Details Endpoints Tab](#view-api-service-details)
4. [Environment Details Services Tab](/docs/connect_manage_environ/view_environments/#view-environment-details)

Mock endpioints can be viewed in 3 locations:
1. [Service Details Endpoints Tab](#view-api-service-details)
2. [Publish To Marketplace Endpoints Tab](#publish-to-the-marketplace)
3. Marketplace Product Resources Tab

## Edit a mock endpoint

Edit a mock endpoint to simulate the behavior of an API.
