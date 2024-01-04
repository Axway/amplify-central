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

## List API services

To list API services:

1. Navigate to *Catalog > Service Registry*.
2. View the following information for all services:

   * Environment
   * Assets
   * Owner
   * Version
   * Tags
   * Created/Updated date by User
   * Security compliance grading
   * Design compliance grading

You can filter the services by the Service type, Environment, Team Ownership, and Security and Design grading scores (A, B, C, D, E and F) using the **Filter By** controls. Search by the Service Name with the search bar.

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
* The Versions tab displays version information for the specific service. Every version of the service is displayed by Service Revision name, specification type, and created/updated date, making it easy to view all versions of an API service. This tab also displays the number of endpoints, assets, products, and if enabled, Security and Design compliance validation scores for each of the API Service(s) in the Environment. See [Manage your compliance validation](/docs/manage_compliance/#default-grading-scores) for grading scores information.

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
    * Included Endpoints - Select API service endpoints to be included.
    * Team Ownership - The proposed team ownership is set to the currently logged in team.  If you are logged in as a Central Admin, no team ownership is proposed and the created asset and product are only visible to the Central Admin role.
    * Product Visibility - The proposed visibility is set to the currently logged in team to facilitate collaboration with internal teams to edit the product documentation or product plan.  If you are logged in as a Central Admin, the proposed Product Visibility is set to None.
    * The default product plan is a free unlimited plan which can be edited after the product is created.

5. Click **Publish** to quickly make an API service available from consumption in the Marketplace.
