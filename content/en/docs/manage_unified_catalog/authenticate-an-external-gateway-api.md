---
title: Authenticate an external API secured with OAuth
linkTitle: Authenticate an API secured with OAuth
weight: 40
date: 2020-04-28T00:00:00.000Z
description: Learn how to authenticate an API secured with OAuth credentials,
  which was published from an external gateway.
---
The Unified Catalog allows you to test OAS2 and OAS3 API's methods from the browser. The current support for testing APIs published from an external gateway from the browser includes APIs secured with an API key, JWT authentication, and no authentication at all. At this time, it is not possible to test OAuth methods from the catalog in the browser, we recommend you use a tool like Postman for testing your external gateway APIs with OAuth. You may still publish APIs secured with OAuth to the Unified Catalog. To learn more, see [Authorizing requests](https://learning.postman.com/docs/postman/sending-api-requests/authorization/#oauth-20).

## Test an external API using Postman

This section shows how to test an external gateway API from the Unified Catalog using Postman. In this example, we have used the Axway Support API as the external gateway API with OAuth authentication. The OAS2 specification for the API can be found at [Axway Support API 1.1.7](https://apis-developer.axway.com/index.php?option=com_apiportal&view=apitester&usage=api&tab=tests&apiId=da355fc4-484e-44a3-b436-965ffc377031&menuId=152&managerId=1&renderTool=2&type=rest&apiVersion=1.1.7).

Follow this procedure to test your API:

In Amplify Central navigate to the Unified Catalog, click the **Explore catalog** side menu and form the list of APIs, click an API secured with OAuth that is published from an external gateway to go to the details page.

![Download specification from catalog](/Images/central/catalog/catalog-details.png)

Click the **Download** button from the catalog details page to download the specification file.

Once the file is downloaded, open Postman and click **Import**.

![Postman import specification](/Images/central/catalog/postman-import.png)

Upload the file downloaded from the catalog and generate a Postman Collection from the file.

![Postman select a file for import](/Images/central/catalog/postman-select-file.png)

![Postman generate a collection](/Images/central/catalog/postman-generate-collection.png)

After the Postman Collection has been created, from the catalog item specification, click the **three dots** on the right side when hovering over the collection, then click **Edit**.

This will open up a dialog box where you can edit the authorization for the API.

![Postman edit button](/Images/central/catalog/postman-edit-dots.png)

Click the **Authorization** tab, and from the **Type** dropdown list select **OAuth 2.0**.

![Postman edit auth](/Images/central/catalog/postman-edit-auth.png)

After selecting **OAuth 2.0**, click the **Get New Access Token** button that is now available on the right.

![Postman get token button](/Images/central/catalog/postman-get-token-button.png)

This will open another dialog box with authorization details to retrieve the OAuth token. The details displayed in this dialog box will depend on the API you have downloaded, and will not reflect every OAuth use case.

Set the Callback URL to <https://www.postman.com/oauth2/callback>, and list this value as an acceptable callback URL defined within the application you are using to perform the OAuth login.

Values like Client ID and Client Secret will be defined in the OAuth 2.0 application you have with the provider of the catalog item. These values also may or may not be needed depending on the Grant Type of the token.  You must contact the provider of the catalog item if you have questions on how to authenticate using OAuth 2.0.

After filling out the details for the token, click **Request Token**.

![Postman add token details](/Images/central/catalog/postman-token-details.png)

You will then be taken through the applications OAuth login flow, and you must sign in with your credentials to the application.

Upon a successful login you will be re-directed back to Postman and presented with your OAuth token credentials.

![Postman use new token](/Images/central/catalog/postman-use-token.png)

Click **Update** to complete the authorization process.

![Postman update collection authentication](/Images/central/catalog/postman-update-collection-auth.png)

After authenticating and setting the OAuth token, expand the collection and select a method. Once you select a method, click the **Authorization** tab,  and from the **Type** dropdown list select **Inherit auth from parent** to use the new OAuth token.

![Postman select method](/Images/central/catalog/postman-select-method.png)

After setting the authentication you can try the method by clicking **Send**.

![Postman try method](/Images/central/catalog/postman-try-method.png)
