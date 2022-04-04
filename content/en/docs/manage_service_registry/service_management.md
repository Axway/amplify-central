---
title: Service management
linkTitle: Service management
weight: 20
---

An API service represents an API, including all its versions and deployed endpoints, and additional information to represent your API, for example, description, environment scope, image encoded in base64.

Use the Service Registry WebUI to manage your API services, including: view, create, update and delete

## Before you start

You must have credentials or a user account from your org administrator to use the Service Registry WebUI.  Please follow the steps [here](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).

## Objectives

Learn how to use the Service Registry WebUI to create and manage services, including:

* List all API services in an environment
* View details for an API service
* Create a new API service
* Update an API service
* Delete an API service

## List API services

To list API services:

1. Navigate to *Service Registry*.
2. Select **Services > Service Registry > All Services**.

View the following information for all services in any state (Draft, Active, Deprecated, Active):

* Add text

You can also filter the services by the current category / stage / state, and type using the **Filter By** controls.

## View API service details

To view service details:

1. Navigate to *Service Registry*.
2. Select **Services > Service Registry > All Services**.
3. From the list view, select a service.

View the following detailed information for a specific service in any state (Draft, Active, Deprecated, Active):

* (add content)

{{< alert title="Note" color="primary" >}}Tags, Attributes, and Categories can be added or removed in the service details view.{{< /alert >}}

## Create an API service

To create an API service:

1. Navigate to *Service Registry*.
2. Select **Services > Service Registry > All Services**.
3. Click **+ Add New Service** to add a new service.
4. Add the following and then click **Next**:

    * Service Name - The display name for the service in the WebUI
    * Description - A short description of the service
    * Image - An icon or image to be associated with the service

5. (add text)
6. Click **Save Draft * Exit**.

The service is created in **Draft** state. To use this service in a product definition, you must move the service to an **Active** state by activating the service.

## Update an API service

The API service can be in **Draft**, **Active**, or **Deprecated** state.

1. Navigate to *Service Registry*.
2. Select **Services > Service Registry > All Services**.
3. From the list view, select the service to edit.
4. Select a service version in a **Draft**, **Active** or **Deprecated** state.
5. Click **Edit Service** or **Create Draft**.
6. The Edit Service wizard is displayed. You can edit the Service Name, Description, Image, Access Rights, Categories, Tags and Attributes.
7. Click **Save Draft * Exit**.

The service is created in **Draft** state.

## Delete an API service

The API service (all versions) must be in **Draft**  or **Archived** state.

1. Navigate to *Service Registry*.
2. Select **Services > Service Registry > All Services**.
3. From the list view, use the checkboxes to select the service(s) to delete.
4. Click **Delete Service**.
5. Type "Delete" and click to confirm that you understand this is a permanent and irreversible action.

{{< alert title="Note" color="primary" >}}Services that are part of an active product definition cannot be deleted.{{< /alert >}}
