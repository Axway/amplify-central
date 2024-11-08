---
title: Try out APIs
linkTitle: Try out APIs
weight: 40
---

Learn how to use the credentials for trying out APIs.

## Where do I start?

Once your credentials have been [created](/docs/manage_marketplace/consumer_experience/credential_management#create-credentials) and provisioned by the provider, it is time to ensure that this credentials works as expected.

First, you have to find the Product / APis you want to test. Browse the product list and find the appropriate one. You can use the [search capabilities](/docs/manage_marketplace/consumer_experience/searching)

Once you find the product, select the appropriate resources to open the resources details page. By default the Methods tab is visible. The tab shows all the methods and models the API is using.

To call an API, you will need first to select the credentials you want to use to access the API and then call the API itself.

## Select your credentials

In order to select the credentials for calling an API, you have to click the Authorize button for globally using the credentials or the lock button beside the method to use a credentials for that specific methods.

Then a side panel is open.

The first step is to select the Authorization type. This authorization list depends on the provided API Security. This would include one or more of these :

* [API Key](#api-key)
* [HTTP Basic](#http-basic)
* [OAuth2](#oauth2)

In addition, a [Bearer authorization](#bearer-authorization) choice is available.

### API Key

API Key credential can be hosted in the Marketplace under a specific Application or can come from outside of the Marketplace.

Fist, select the API Key origin: **External** or **Marketplace**:

* For External choice, paste the API Key value in the Value field.
* For Marketplace choice, a list of application that can access the specific API will be displayed. Select the one you need and then the list of available credentials for that application are displayed. Select the one you need. In case the API Key is still available in the Marketplace, its values will be decrypted and pasted in the Value field. If API Key is no more present in the Marketplace, a message will let you know. In that case, you can still provide the value you want by providing it in the Value field.

Once pasted, click **Authorize** button. The value is change to stars and Authorize button becomes Logout. If you logout, the API Key is erased and you have to start the process again. If you click **Close**, the side panel is closed and you are now ready to [try a method](#try-a-method).

### HTTP Basic

HTTP Basic credential can be hosted in the Marketplace under a specific Application or can come from outside of the Marketplace.

Fist, select the API Key origin: **External** or **Marketplace**:

* For External choice, paste the API Key value in the Value field.
* For Marketplace choice, a list of application that can access the specific API will be displayed. Select the one you need and then the list of available credentials for that application are displayed. Select the one you need. In case the API Key is still available in the Marketplace, its values will be decrypted and pasted in the Value field. If API Key is no more present in the Marketplace, a message will let you know. In that case, you can still provide the value you want by providing it in the Value field.

Once pasted, click **Authorize** button. The value is change to stars and Authorize button becomes Logout. If you logout, the API Key is erased and you have to start the process again. If you click **Close**, the side panel is closed and you are now ready to [try a method](#try-a-method).

### OAuth2

OAuth credential is the most complex one because multiple flows are available based on the provider choice:

* Application - a client ID and client secret
* Implicit - a client ID only
* Access code with PKCE - a client ID and client secret + an authorization code given by the authorization server

Usually OAuth authentication flow requires either an Authorization URL or a Token Access URL or both that would be provided by the API provider.

OAuth credential can be hosted in the Marketplace under a specific Application or can come from outside of the Marketplace.

Fist, select the OAuth credential origin: **External** or **Marketplace**:

* For External choice, first select the Grant type. Based on the flow, you will see the appropriate field to enter. You can leave the Authorization URL and/or Token Access URL as they are presented (you will see their current value at the bottom of the screen after the separator line) or override them if you know their appropriate value in the override field. The override is reflected in the real value at the bottom of the screen. Then enter the client ID and client secret if required.
* For Marketplace choice, first select the grant type, then the application and finally one of the credentials attached to the selected application. If the credential is still available in the Marketplace and can be decoded, the client ID and client Secret will be automatically copied in their respective field. In any case, you can still override the provided value.

Once pasted, click **Authorize** button. Depending on the flow, you may be redirected to the authentification server to authenticate the client ID and client secret and then get back to the Marketplace where all values are changed to stars and Authorize button becomes Logout. If you logout, the API Key is erased and you have to start the process again. If you click **Close**, the side panel is closed and you are now ready to [try a method](#try-a-method).

### Bearer authorization

Bearer authorization is not linked to a credential managed in the Marketplace. This is the token the provider already gave you somehow.

When selecting this authorization type, you are presented a value box where you can paste your token.

Once pasted, click **Authorize** button. The value is change to stars and Authorize button becomes Logout. If you logout, the bearer is erased and you have to paste it again. If you click **Close**, the side panel is closed and you are now ready to [try a method](#try-a-method).

## Try a method

Now that you have provided your credentials and the authorization succeed, you can try a method.

Select the method you want to try, click on the **down chevron** to expand the method panel.

Click the **Try out** button. This will allow you the see the **Execute** button and enter any parameter the method may need. Once ready, click Execute.

Once executed, the curl command used is displayed as well as the API answer.

If a traceability agent is monitoring the corresponding Gateway, it will allow you to see in the Consumer Insights the corresponding metrics:

* API Health: summary of API call with their status and timing
* Application: usage per application and product combination
* Subscription: usage per subscription and product combination