---
title: How to authorize API Calls to Platform Services
---
A step-by-step guide for authorizing clients to make REST calls to the Amplify Platform API. This section will outline the easiest way, by using a service account client and secret key.

## Prerequisite - API authorization

1. ***Install the Axway CLI***: [https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/quick\_start/index.html](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/quick_start/index.html)

## Create your service account

A service account is an Amplify concept that allows for a non-user, such as a CLI or headless process, to gain access to the platform services and will be granted specific roles and privileges within an organization. You can create your service account(s) using the CLI or directly within the UI.

### Create the service account via the CLI

* From the command line, log into the platform using:

  `axway auth login`

* Create a service account using:

  `axway service-account create`

* Enter a name and description

* Select the client secret authentication method as either 'Auto-generated client secret key' or 'Custom client secret key'. Here we select 'Custom client secret key'

* Enter a client secret. You need to remember/store this secret as it will not be displayed anywhere.

* For the Roles, select what is appropriate for this service account, in this case, we are choosing Central Admin

* Your service account should now be created:

  ![service acoount dialog screen](/Images/integration/create-service-account.png)

* To verify you can use the CLI:

  `axway service-account list`

  ![service account list screen](/Images/integration/service-account-list.png)

### Create the service account via the UI

* From the Platform screen, select the dropdown in the right-hand corner and choose **Organization**

  ![organization drop down screen](/Images/integration/organization-drop-down.png)

* From the Service Accounts screen select the button labeled **+ Service Account**

  ![ui create service account screen](/Images/integration/ui-create-service-account.png)

* Fillout the following form. Here we are choosing Client Secret, Platform Generated and the Central Admin role. Next, select the button labeled **Save**

  ![ui service account form screen](/Images/integration/ui-service-account-form.png)

* You will now be presented with a popup screen where you can copy your generated secret. You need to store this secret as this is the only time it will ever be displayed

  ![ui service account form screen](/Images/integration/ui-service-account-secret.png)

* You now have your service account and can use the Client Id and Secret to Authenticate to the platform

  ![ui service account form screen](/Images/integration/ui-service-account-client-id.png)

## Using your Service Account

Now that you have created your service account with client and secret, you can reuse this approach in a scripted manner.

### Authorization

If you are interested in using cURL or Postman, the easiest way to authenticate is by using the CLI. However, in the event that you need to embed authorization within a compiled application, see the section [here](#alternative-approach-to-call-auth-server-directly).

#### Using the CLI Directly

```sh
axway auth login --client-id sa-test_6d66dc36-f838-4006-8c44-5340d4698be5 --client-secret c961d6f2-8596-4ec3-9aca-0b32f49bf328 --json
```

The command above will fulfill the authorization flow and cause the client ID and Secret to be base64 encoded and then passed to the auth server and then subsequently use the token to call platform services. 

You can extract and use the token from the resulting JSON response:

```
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

This approach is more cumbersome, but demonstrates what is necessary if you decide to build an application using a language like JavaScript, Java or Golang.  

Use the Client ID and Secret for Basic Authentication and base64 encode the string. A colon should be used as a field seperator, such that the unencoded string looks like "clientID:secret".  

```
echo "clientID:secret" | base64 
```

After base64 encoding the string the authorization call will look something like this:

```
curl --location --request POST 'https://login.axway.com/auth/realms/Broker/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic c2EtdGVzdF84Y2RlMWExOC0yYWViLTRiY2QtODVkNS1jZmI1M2VjOWVmYjQ6ZjU0MDlmYjMtYjNhZC00MjU3LWE4NjgtZTNmMzY4NGYxMmY1' \
--data-urlencode 'grant_type=client_credentials'
```

```
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKLUhJOWxTbE5fYUxMSj...",
  "expires_in": 1800,
  "refresh_expires_in": 0,
  "token_type": "bearer",
  "not-before-policy": 1571719187,
  "scope": "email profile"
}
```

### Making the API Calls

Now that you have a valid bearer token and the Tenant ID you can make platform calls as outlined in [Amplify Platform API docs](https://docs.axway.com/category/api). For example:  

#### Calling Central  

```
curl --location --request GET 'https://apicentral.axway.com/apis/management/v1alpha1/environments' \
--header "Authorization: Bearer ${token}" \
--header "Content-Type: application/json" 
```

#### Calling Tracability

```
curl --location --request GET 'https://apicentral.axway.com/api/traceability/v1/traceability/summary?groupBy=proxyId&groupBy=proxyRevision&count=10&offset=0&from=1668895561864&to=1669500361864' \
--header "Authorization: Bearer ${token}" \
--header "Content-Type: application/json" 
```

#### Calling Platform

```
curl --location --request GET 'https://platform.axway.com/api/v1/env' \
--header "Authorization: Bearer ${token}" \
--header "Content-Type: application/json"
```