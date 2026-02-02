---
title: Set up an Identity Provider for a SaaS hosted agent
linkTitle: Set up an Identity Provider for a SaaS hosted agent
weight: 30
date: 2024-08-29
---

Within topology, identity providers can be used with environments to issue OAuth access tokens. They are restricted only to environments that are connected through an Embedded agent.

## Identity providers and environments

An environment might be linked to a specific gateway managing one or more identity providers.

Currently, identity providers can be used with the Azure Embedded agent.

Multiple identity providers can be assigned to an environment.

{{< alert title="Note" color="primary" >}}Identity provider management is optional.{{< /alert >}}

### Viewing available identity providers

Only the Engage Admin can view identity providers.

1. Navigate to *Topology > Identity Providers*.

A list of identity providers is displayed with the following information:

* Identity provider name - the title of the identity provider.
* Environment - the number of environments the identity provider is associated to.
* Updated - the last time the identity provider has been updated.

### Creating an identity provider

Only the Engage Admin role can create identity providers.

1. Navigate to *Topology > Identity Providers*.
2. Click **+ Add Identity Provider**. *The Add a Identity Provider wizard is displayed*.
3. Add the following identity provider general information:

    * **Identity Provider Name** - enter a friendly name for the identity provider in the WebUI.
    * **Type** - select which type of identity provider. Choose between Generic (default), Keycloak, or Okta.
    * **Metadata URL** - provide the URL to connect to the identity provider authorization server to provide metadata information. The OAuth authorization server exposes the URL.
    * **Request Headers** (Optional) - enter name and value pairs to add request headers to the registration calls.
    * **Query Parameters** (Optional) - enter name and value pairs to add query parameters to the registration calls.
    * **Additional Client Properties** (Optional) - enter name and value pairs to add to the client metadata for registering the OAuth client
    * **Client Timeout** - enter the client timeout in seconds until the client registration call remains active (default 60 seconds).
    * **Use Registration Access Token** (Optional) - toggle to allow the agent to save and use the credential-specific registration token when modifying the client in the identity provider.

4. Add the following identity provider authorization information:

    * **Authorization Type** - Select the type of authentication method.

        * **Client Secret** - (Default):

            * **Authorization Method** - select the client secret authentication method. Choose from client_secret_post (default), client_secret_basic, or client_secret_jwt.
            * **Client ID** - provide the client ID of the OAuth client. The agent uses this to authenticate and register OAuth clients.
            * **Client Secret** - provide the OAuth client secret. The agent uses this to authenticate and register OAuth clients.
            * **Client Scopes** (Optional) - enter a list of client scopes to be used for dynamic client registration.
  
        * **Access Token**:
  
            * **Access Token** - provide the access token to be used for authenticating.

    * **Request Headers** (Optional) - enter name and value pairs to add request headers to the token request calls.
    * **Query Parameters** (Optional) - enter name and value pairs to add query parameters to the token request calls.

5. Click **Save** to create the identity provider and return to the list of identity providers.

### Editing an identity provider

1. On the Identity Provider list view, click the three ellipsis for the identity provider you would like to edit and select **Edit**.
2. Edit any fields you would like to change.
3. Click **Save**.

### Deleting an identity provider

Only the Engage Admin role can delete identity providers.

1. Navigate to *Topology > Identity Providers*.
2. Select the identity provider(s).
3. Click the three ellipsis and select **Delete** for single delete or select multiple identity providers and click **Delete** above the table. A popup is displayed informing how many environments use the selected identity provider(s).
