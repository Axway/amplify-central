---
title: Authorize API calls to platform services
linkTitle: Authorize API calls to platform services
weight: 400
---
Use a service account client and secret key for authorizing clients to make REST calls to the Amplify platform API.  

## Before you start

[Install the Axway CLI](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/quick_start/index.html).

## Objectives

Learn how to authorize clients to make REST calls to the Amplify platform API.

## Create your service account

A service account is an Amplify concept that allows a non-user, such as a CLI or headless process, to gain access to the platform services and be granted specific roles and privileges within an organization. You can create service account(s) either using the CLI or directly within the UI.

### Create the service account with the CLI

1. From the command line, log into the platform using:

    `axway auth login`

2. Create a service account using:

    `axway service-account create`

3. Enter a name and description.

4. Select the client secret authentication method as either "Auto-generated client secret key" or "Custom client secret key." In this example, "Auto-generated client secret key" is used.

5. Select the appropriate role for this service account. In this example, Central Admin is used. Your service account should now be created.

    ![service acoount dialog screen](/Images/integration/create-service-account.png)
  
6. Take note of the Client ID and Secret. You will need to remember or store the secret securely, as this is the only time it will ever be displayed.

7. Verify your account using:

    `axway service-account list`

  ![service account list screen](/Images/integration/service-account-list.png)

### Create the service account with the UI

1. Sign into the Amplify platform and select **Organization** from the User dropdown menu.

    ![organization drop down screen](/Images/integration/organization-drop-down.png)

2. Click **Service Accounts** from the left navigation.

3. Click **+ Service Account** in the upper-right corner.

    ![ui create service account screen](/Images/integration/ui-create-service-account.png)

4. Complete the following form. This example uses Client Secret, Platform Generated and the Central Admin role.

    ![ui service account form screen](/Images/integration/ui-service-account-form.png)

5. When finished, click **Save**. A dialog appears allowing you to view or copy the generated secret to store securely. You need to store this secret, as this is the only time it will ever be displayed.

    ![ui service account form screen](/Images/integration/ui-service-account-secret.png)

Now that your service account has been created, use your client Id and secret to authenticate to the platform.

![ui service account completed screen](/Images/integration/ui-service-acccount-client-id.png)

## Use your service account

Now that you have created your service account with client and secret, you can reuse this approach in a scripted manner.

### Authorization

If you are using cURL or Postman, the easiest way to authenticate is by using the CLI. However, if you need to embed authorization within a compiled application, use the [alternative approach](#alternative-approach-to-call-auth-server-directly).

#### Use the CLI Directly

The following command will fulfill the authorization flow and cause the client ID and Secret to be base64 encoded, passed to the auth server and then subsequently use the token to call platform services:

```shell
axway auth login --client-id sa-test_6d66dc36-f838-4006-8c44-5340d4698be5 --client-secret c961d6f2-8596-4ec3-9aca-0b32f49bf328 --json
```

You can extract and use the token from the resulting JSON response:

```json
{
  "auth": {
    "authenticator": "ClientSecret",
    "baseUrl": "https://login.axway.com",
    "clientId": "sa-test_6d66dc36-f838-4006-8c44-5340d4698be5",
    "env": "prod",
    "expires": {
      "access": 1669920901070,
      "refresh": null
    },
    "realm": "Broker",
    "tokens": {
      "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI...",
            ...
      }
      ...
}
```

#### Alternative approach to call auth server directly

This approach is cumbersome but demonstrates what is necessary to build an application using a language like JavaScript, Java or Golang.  

Use the client ID and secret for basic authentication and base64 encode the string. A colon must be used as a field separator, so that the unencoded string looks like "clientID:secret":  

```shell
echo "clientID:secret" | base64 
```

After base64 encoding the string, the authorization call will look similar to:

```bash
curl --location --request POST 'https://login.axway.com/auth/realms/Broker/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic c2EtdGVzdF84Y2RlMWExOC0yYWViLTRiY2QtODVkNS1jZmI1M2VjOWVmYjQ6ZjU0MDlmYjMtYjNhZC00MjU3LWE4NjgtZTNmMzY4NGYxMmY1' \
--data-urlencode 'grant_type=client_credentials'
```

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKLUhJOWxTbE5fYUxMSj...",
  "expires_in": 1800,
  "refresh_expires_in": 0,
  "token_type": "bearer",
  "not-before-policy": 1571719187,
  "scope": "email profile"
}
```

### Make the API Calls

Now that you have a valid bearer token you can make platform calls as outlined in [Amplify Platform API docs](https://docs.axway.com/category/api) and in the following examples.  

#### Call Central  

```shell
curl --location --request GET 'https://apicentral.axway.com/apis/management/v1alpha1/environments' \
--header "Authorization: Bearer ${token}" \
--header "Content-Type: application/json" 
```

#### Call Traceability

```shell
curl --location --request GET 'https://apicentral.axway.com/api/traceability/v1/traceability/summary?groupBy=proxyId&groupBy=proxyRevision&count=10&offset=0&from=1668895561864&to=1669500361864' \
--header "Authorization: Bearer ${token}" \
--header "Content-Type: application/json" 
```

#### Call platform

```shell
curl --location --request GET 'https://platform.axway.com/api/v1/env' \
--header "Authorization: Bearer ${token}" \
--header "Content-Type: application/json"
```
