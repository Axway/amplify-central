---
title: Service management
linkTitle: Service management
weight: 20
---

An API service represents an API, including all its versions and deployed endpoints, and additional information to represent your API, for example, description, environment scope, image encoded in base64.

Use the Service Registry WebUI to view all your API services across all environments.
Use the Topology WebUI to select an environment and then manage your API services, including: view, create, update and delete

## Before you start

You must have credentials or a user account from your org administrator to use the Service Registry WebUI.  Please follow the steps [here](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).

## Objectives

Learn how to use the Service Registry WebUI to create and manage services, including:

* List all API services in an environment
* View details for an API service
* Create a new API service
* Delete an API service

## List API services

To list API services:

1. Navigate to *Service Registry*.
2. Select **Select Catalog > Service Registry**.

View the following information for all services:

* Environment, Owner, Tags and the Create/Updated date by User.

You can also filter the services by the Environment and Team Ownership using the **Filter By** controls.  Search by the Service Name with the search bar

## View API service details

To view service details:

1. Navigate to *Service Registry*.
2. Select **Catalog > Service Registry**.
3. From the list view, select a service to open Service details in a new browser tab.

View the following detailed information for a specific service in any state (Draft, Active, Deprecated, Active):

* Service Name, Description, Owning Team, Tags, Attributes and the Create/Updated date by User.
* Per Service Version tags and Attributes.
* The API Specification and Methods
* Endpoints listening for requests to the Service

## Create an API service

To create an API service:

1. Navigate to *Topology* and select an "Environment".
2. Click **+ Add API Service** to add a new service.
3. Upload an API Specification file.
4. Some information will be read from the API Specification file and pre-populated.  Add/Edit information where applicable and then click **Next**:

    * Service Name - The display name for the service in the WebUI
    * Description - A short description of the service
    * Image - An icon or image to be associated with the service

5. Add/Edit Enpoint information if available and then click **Next**:
6. Click **Save**.



## Delete an API service

To delete the service (all versions):  
1.	Navigate to Service Registry.
2.	Select **Catalog > Service Registry**.
3.	From the list view, select a service to open Service details in a new browser tab.
4.	From the new browser tab, click on the environment name breadcrumb at the top of the page (i.e. the name to the right of “ENVIRONMENTS / NAME“).
5.	In the Services tab at the bottom of the page, click on the Trashcan icon to the right of the Service you want to delete.
6.	Type name of the Service and click on the confirmation button that “I understand this is a permanent and irreversible action.  Delete”



