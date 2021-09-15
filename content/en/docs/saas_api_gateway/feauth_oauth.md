---
title: Secure an API with OAuth
linkTitle: Secure an API with OAuth
weight: 40
date: 2019-07-30T00:00:00.000Z
description: >-
  API proxies can be secured with a client authentication policy. Learn how to
  set up an OAuth front-end security policy on an API proxy.
---

## Before you start

* You will need a client ID, issuer, and metadata path provided by your third-party OAuth server.
* The authorization server must issue signed JWT access tokens.
* The authorization server must issue tokens with `Amplify Central` in the `aud` claim.

## Objectives

Learn how to set up an OAuth front-end security policy on an API proxy.

### Add OAuth security to an API proxy

Follow these steps to require an OAuth policy on an API proxy:

1. Select the API proxy.
2. Click the **Policies** tab.
3. Click the gear icon next to **Client authentication**.
4. On the dialog box, select **OAuth Token** from the **Authentication type** list.
5. On the **Deployments** tab, click **Deploy** to deploy or update a runtime group with the OAuth security.

Watch the animation to learn how to do this in Amplify Central UI.

![Add OAuth security](/Images/central/OAuthaddproxyauth_animation.gif)

## Use an API proxy secured with an OAuth policy

To use the proxy, the provider must first set up a third-party OAuth server with a valid application. A single application from the third-party server's application will directly relate to a single Amplify Central application.

{{< alert title="Note" >}}The Amplify Central OAuth proxy support is RFC 7662 compliant and it should work with any standard OAuth 2.0 authorization server. At this time, Okta is the only verified supported third-party OAuth provider. See more detailed configuration examples showing Okta as an integrated (external) authorization server in [Okta documentation](https://developer.okta.com/docs/guides/customize-authz-server/overview/).{{< /alert >}}

### Create an application profile

After you have created an application within your third-party OAuth server, you must create an application profile to use your secured proxy.

1. Select **Apps** in the left navigation bar, and click your API proxy in the list.
2. On the **Identity Profiles** tab, click **+ OAuth Profile** to add an Oauth profile.
3. Enter the required information, and click **Save**.

### Make an API call

1. Inside the API proxy with an OAuth Client authentication policy, click the **Test Methods** tab.
2. If you have more than one valid deployment, choose the one to test. If you only have one, it is automatically selected for you.
3. If you have more than one valid OAuth profile, choose the one to test. If you only have one, it is automatically selected for you.

When you select a valid OAuth profile, you will see your Client ID displayed in a read-only field. This will assist you, the provider, in generating an OAuth token from the correct application in your third-party OAuth server.

After your third-party OAuth server has generated a valid OAuth token, paste that token into the **OAuth token** field. You can now attempt to make valid API calls with your proxy.

{{< alert title="Note" >}}If your token is invalid, expired, or empty, the API call will result in a `403: Unauthorized` response.{{< /alert >}}

## Review

You have learned how to set up an OAuth front-end security policy on an API proxy in Amplify Central.
