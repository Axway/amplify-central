---
title: How to authorize API Calls to Platform Services
---
Step by step guide for authorizing clients to make REST calls to the Amplify Platform API. This section will outline the easiest way, by using a service account client and secret key. There is also a private key method that will not be covered in the section.

## Prerequisite - API authorization

1. ***Install the Axway CLI***: [https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/quick\_start/index.html](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/quick_start/index.html)

2. ***Install JQ***:  [https://github.com/stedolan/jq](https://github.com/stedolan/jq)

JQ is needed for parsing the authorization response and extracting the bearer token and org id required in the http  request headers.


## Create yuor service account via the CLI

A service account is an Amplify concept that allows for a non-user, such as a CLI or headless process to gain access to the platform services and will be granted specific roles and privileges within on organization.

* From the command line, log into the platform using:

  `axway auth login`

* Create a service account using:

  `axway service-account create`

* Enter a name and description

* Select the client secret Authentication method as either 'Auto-generated client secret key' or 'Custom client secret key'. Here we select 'Custom client secret key'

* Enter a client secret. You need to remember/store this secret as it will not be displayed anywhere.

* For the Roles, select what is appropriate for this service account, in this case, we are choosing Central Admin

* Your service account should now be created:

  ![](/Images/integration/create-service-account.png)

* To verify you can use the CLI:

  `axway service-account list`

  ![](/Images/integration/service-account-list.png)

## Using your Service Account

Now that you have created your service account with client and secret, you can reuse this approach in a scripted manner.


### Authorization

#### Using the CLI Directly

**Capture the Auth Result as a JSON Body**
```sh
authResult=$(axway auth login --client-id test-sa-ccc_6d66dc36-f838-4006-8c44-5340d4698be5 --client-secret thisisasecret --json)
```
The command above will cause the client ID and Secret to be base64 encoded and then passed to the auth server. This can be done manually too, but the CLI is much easier


**Extract the Bearer Token and TenantID**
```sh
token=$(echo $authResult | jq -r '.auth.tokens.access_token')
tenantId=$(echo $authResult | jq -r '.org.id')
```
#### Alternative approach call auth server directly
This approach is more cumbersome, but demonstrates what is necessary if you decide to build against an application using a language like JavaScript, Java or Golang.

Use the Client ID and Secret for Basic Authentication and base64 encode the string. A colon should be used as a field seperator, such that the unencoded string looks like "clientID:secret". After base64 encoding the string the authorization call will look something like this:

```
curl --location --request POST 'https://login.axway.com/auth/realms/Broker/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic c2EtdGVzdF84Y2RlMWExOC0yYWViLTRiY2QtODVkNS1jZmI1M2VjOWVmYjQ6ZjU0MDlmYjMtYjNhZC00MjU3LWE4NjgtZTNmMzY4NGYxMmY1' \
--data-urlencode 'grant_type=client_credentials'
```
The token will be in the resulting string

### Making the API Calls
Now that you have a valid bearer token and the Tenant ID you can make platform calls as outlined in API docs. For example:


 
