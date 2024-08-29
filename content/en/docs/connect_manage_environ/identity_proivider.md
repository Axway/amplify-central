---
title: Identity Provider management
linkTitle: Identity Provider management
weight: 20
date: 2024-08-29
---

Within topology, identity providers can be used with environments to issue OAuth access tokens. They are restricted only to environments that are connected through an embedded agent.

## Identity providers and environments

An environment might be linked to a specific gateway managing one or more identity providers.

Currently identity providers can be used with the following:

   * Azure embedded agent.

Multiple identity providers can be assigned to an environment.

{{< alert title="Note" color="primary" >}}Identity provider management is optional.{{< /alert >}}


### Viewing available identity providers

Only the Central Admin can view identity providers.

1. Navigate to *Topology > Identity Providers*.

The list of identity providers is displayed with the following information:

* Identity provider name - the title of the identity provider.
* Environment - the number of environments the identity provider is associated to.
* Updated - the last time the identity provider has been updated.

### Creating an Identity Provider

Only the Central Admin role can create identity providers.

1. Navigate to *Topology > Identity Providers*.
2. Click **+ Add New Identity Provider**.

    *The Add a Identity Provider wizard is displayed*.

3. Add the following identity provider general information:

    * **Identity Provider Name** - enter a friendly name for the identity provider in the WebUI.
    * **Type** - select which type of identity provider. Choose between Generic(default), Keycloak, or Okta.
    * **Metadata URL** - provide a URL to be used to connect to the Identity Provider authorization server to provide metadata information. The URL is exposed by the OAuth authorization server.
    * **Request Headers** (Optional) - enter name and value pairs to add request headers to the registration calls.
    * **Query Parameters** (Optional) - enter name and value pairs to add query paramaters to the registration calls.
    * **Additional Client Properties** (Optional) - enter name and value pairs to add to the client metadata for registering the OAuth client
    * **Client Timeout** - enter the client timeout in seconds until the client registration call remains active (default 60 seconds).
    * **Use Registration Access Token** (Optional) - toggle to allow the agent to save and use the Credential specific registration token when modifying the client in the Identity Provider.

4. Add the following identity provider authorization information:

    * **Authorization Type** - Select the type of authentication method.

        * **Client Secret** - (Default):
     
            * **Authorization Method** - select the client secret authentication method. Choose from client_secret_post (default), client_secret_basic, or client_secret_jwt.
            * **Client ID** - provide the Client ID of the OAuth client. This is used by the agent to authenticate and register OAuth clients.
            * **Client Secret** - provide the OAuth client secret. This is used by the agent to authenticate and register OAuth clients.
            * **Client Scopes** (Optional) - enter a list of client scopes to be used for dynamic client registration.
  
        * **Access Token**:
     
            * **Access Token** - provide the access token to be used for authenticating.
   
    * **Request Headers** (Optional) - enter name and value pairs to add request headers to the token request calls.
    * **Query Parameters** (Optional) - enter name and value pairs to add query paramaters to the token request calls.


6. Click **Save** to create the identity provider and return to the list of identity providers.

### Deleting an identity provider

Only the Central Admin role can delete identity providers.

1. Navigate to *Topology > Idenitity Providers*.
2. Select the identity provider(s).
3. Click the three ellipsis and select **Delete** for single delete, or select multiple identity providers and click **Delete** above the table. A popup is displayed informing how many environments use the selected identity provider(s).

