---
title: Try out APIs
linkTitle: Try out APIs
weight: 40
---

Learn how to use the credentials for trying out APIs.

## Where do I start?

Once your credentials have been [created](/docs/manage_marketplace/consumer_experience/credential_management#create-credentials) and provisioned by the provider, ensure that these credentials work as expected.

First, you have to find the Product / APIs you want to test. Browse the product list and find the appropriate one. You can use the [search capabilities](/docs/manage_marketplace/consumer_experience/searching).

Once you find the product, select the appropriate resources to open the *resource details* page. By default, the **Methods** tab is visible. This tab shows all the methods and models the API is using.

To call an API, you will need to first select the credentials you want to use to access the API and then call the API itself.

## Select your credentials

To select the credentials for calling an API, you must either click **Authorize** to globally use credentials or **lock** icon, located beside the method, to use a credentials for that specific method.

In the side panel, select the Authorization type. This authorization list depends on the provided API Security and includes one or more of the following:

* [API Key](#api-key)
* [HTTP Basic](#http-basic)
* [OAuth2](#oauth2)

In addition, a [Bearer authorization](#bearer-authorization) choice is available.

### API Key

The API Key credential can be hosted in the Marketplace under a specific application or can come from outside of the Marketplace.

First, select the API Key origin: **External** or **Marketplace**:

* For External, paste the API Key value in the Value field.
* For Marketplace, a list of applications that can access the specific API will be displayed. Select the one you need, and then the list of available credentials for that application is displayed. Select the one you need. If the API Key is still available in the Marketplace, then its values will be decrypted and pasted in the **Value** field. If the API Key is no longer present in the Marketplace, a message will let you know, and you can still provide the value in the **Value** field.

Once pasted, click **Authorize**. The value changes to stars, and **Authorize** changes to **Logout**. If you logout, the API Key is erased, and you must start the process again. If you click **Close**, the side panel is closed, and you are now ready to [try a method](#try-a-method).

### HTTP Basic

The HTTP Basic credential can be hosted in the Marketplace under a specific application or can come from outside of the Marketplace.

First, select the API Key origin: **External** or **Marketplace**:

* For External, paste the API Key value in the Value field.
* For Marketplace, a list of applications that can access the specific API will be displayed. Select the one you need, and then the list of available credentials for that application is displayed. Select the one you need. In case the API Key is still available in the Marketplace, its values will be decrypted and pasted in the Value field. If the API Key is no longer present in the Marketplace, a message will let you know. In that case, you can still provide the value you want by providing it in the Value field.

Once pasted, click **Authorize**. The value changes to stars, and **Authorize** changes to **Logout**. If you logout, the API Key is erased, and you must start the process again. If you click **Close**, the side panel is closed, and you are now ready to [try a method](#try-a-method).

### OAuth2

The OAuth credential is the most complex one because multiple flows are available based on the provider choice:

* Application - A client ID and client secret
* Implicit - A client ID only
* Access code with PKCE - A client ID and client secret and an authorization code given by the authorization server

Typically, the OAuth authentication flow requires either an Authorization URL or a Token Access URL or both that would be provided by the API provider.

The OAuth credential can be hosted in the Marketplace under a specific application or can come from outside of the Marketplace.

First, select the OAuth credential origin: **External** or **Marketplace**:

* For External, first select the Grant type. Based on the flow, you will see the appropriate field to enter. You can leave the Authorization URL and/or Token Access URL as they are presented (you will see their current value at the bottom of the screen after the separator line) or override them if you know their appropriate value in the override field. The override is reflected in the real value at the bottom of the screen. Then enter the client ID and client secret if required.
* For Marketplace, first select the grant type, then the application and finally one of the credentials attached to the selected application. If the credential is still available in the Marketplace and can be decoded, the client ID and client secret will be automatically copied in their respective fields. In any case, you can still override the provided value.

Once pasted, click **Authorize**. Depending on the flow, you may be redirected to the authentication server to authenticate the client ID and client secret and then get back to the Marketplace where all values change to stars, and **Authorize** changes to **Logout**. If you logout, the API Key is erased, and you must start the process again. If you click **Close**, the side panel is closed, and you are now ready to [try a method](#try-a-method).

### Bearer authorization

The Bearer authorization is not linked to a credential managed in the Marketplace. This is the token the provider already gave you.

When selecting this authorization type, you are presented a value box where you can paste your token.

Once pasted, click **Authorize** button. The value is changed to stars, and **Authorize** changes to **Logout**. If you logout, the bearer is erased and you must paste it again. If you click **Close**, the side panel is closed and you are now ready to [try a method](#try-a-method).

## Try a method

Now that you have provided your credentials and the authorization is successful, you can try a method.

Select the method you want to try, click on the **down chevron** to expand the method panel.

Click **Try out**. The **Execute** button is displayed, and you can enter any parameter the method may need. Once ready, click **Execute**.

Once executed, the curl command used is displayed, as well as the API answer.

If a Traceability Agent is monitoring the corresponding Gateway, it will allow you to see in the Consumer Insights of the corresponding metrics:

* API Health - Summary of API call with their status and timing
* Application - Usage per application and product combination
* Subscription - Usage per subscription and product combination
