---
title: Test an API from the browser
linkTitle: Test an API from the browser
weight: 140
description: >
  Learn how to explore the API documentation and test an API from the browser
  using the built-in test capability.
---
Unified Catalog has an built-in testing tool that allows you to explore the list of API endpoints and their related documentation, and test the API methods directly in the browser. It is built over the official Swagger.io and supports both OAS2 and OAS3 specifications.

{{< alert title="Note" color="primary" >}}Unified Catalog can contain APIs that have been registered in Amplify Central as API proxies or APIs that have been published from external gateways. How you authenticate to make an API call from the browser depends on how the API has been published.{{< /alert >}}

## Authenticate an API with an API key

Before you start:

* You will need to create an application with an API key
* You will need to subscribe to an API with your application. See [Subscribe to an API](/docs/manage_unified_catalog/discover-and-consume-catalog-assets/#subscribe-to-an-api).

To test an API that has been registered in Amplify Central and secured with an API key:

1. Select **Catalog** in the left navigation bar to open the **Explore Catalog** submenu.
2. Click an API asset in the list to see its details.
3. Click the **Test Methods** tab.
4. Choose your **Application** from the list of existing apps. If you only have one, it is automatically selected for you.
5. Select your **API Key** from the list of existing API keys. If you do not have an API key, click the **+** icon next to the API Key list to create one.
6. Execute an API method. It should be successful and return a `200 OK` response.

Watch the animation to learn how to authenticate with an API key.

![Authenticate with API key](/Images/central/catalog/test_catalog_api_key.gif)

## Authenticate an API with OAuth

Before you start:

* You will need to create an application within your third-party OAuth server.
* You must create an OAuth profile in your app.
* You will need to subscribe to the API with your created app. See [Subscribe to an API](/docs/manage_unified_catalog/discover-and-consume-catalog-assets/#subscribe-to-an-api).

To test an API that has been registered in Amplify Central and secured with OAuth:

1. Select **Catalog** in the left navigation bar to open the **Explore Catalog** submenu.
2. Click an API asset in the list to see its details.
3. Click the **Test Methods** tab.
4. If you have more than one valid **OAuth profile**, choose the one to test. If you only have one, it is automatically selected for you.

    When you select a valid OAuth profile, your Client ID is displayed in a read-only field. This will assist you in generating an OAuth token from the correct application in your third-party OAuth server.
5. After your third-party OAuth server has generated a valid OAuth token, paste that token into the **OAuth token** field. You can now attempt to make valid API calls with your API.

{{< alert title="Note" color="primary" >}}The Amplify Central OAuth proxy support is RFC 7662 compliant and it should work with any standard OAuth 2.0 authorization server. At this time, Okta is the only verified supported third-party OAuth provider. See more detailed configuration examples showing Okta as an integrated (external) authorization server in [Okta documentation](https://developer.okta.com/docs/guides/customize-authz-server/overview/).{{< /alert >}}

Watch the animation to learn how to authenticate with an OAuth token.

![Authenticate with OAuth](/Images/central/catalog/test_catalog_oauth.gif)

## Authenticate an API with a JWT token

Before you start:

* You will need to create an application with a JWT token.  See [Create a JWT token](/docs/saas_api_gateway/secure_api_jwt/#create-a-jwt-token).
* You will need to subscribe to an API with your application. See [Subscribe to an API](/docs/manage_unified_catalog/discover-and-consume-catalog-assets/#subscribe-to-an-api).

To test your API that has been registered in Amplify Central and secured with a JWT token:

1. Select **Catalog** in the left navigation bar to open the **Explore Catalog** submenu.
2. Click an API asset in the list to see its details.
3. Click the **Test Methods** tab.
4. Use the **Application ID** and **JWT Key ID** to create the JWT token.
5. Paste your JWT token in the **JWT Token** field.
6. Execute an API method. It should be successful and return a `200 OK` response.

Watch the animation to learn how to authenticate with a JWT token.

![Authenticate with JWT](/Images/central/catalog/test_catalog_jwt_key.gif)
