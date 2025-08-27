---
title: Manage your Marketplace provisioning
linkTitle: Manage your Marketplace provisioning
draft: false
weight: 320 
---

A subscription provides the consumer, or subscriber, with the required security and endpoint materials to correctly consume the API.

The security material and/or quota to access an API is configured inside the gateway on either the application (Axway API Manager), the usage plan (AWS Gateway), or the subscription (Azure Gateway).

## Objectives

Learn how to configure:

* Discovery Agent for Marketplace provisioning / deprovisioning
* Traceability Agent for reporting traffic to Consumer Insights

## Supported use cases

Provisioning use cases include:

* Provision data plane when a consumer requests access to a product resource
* Deprovision data plane when a consumer deletes an application or credentials
* Enforce an expiration date for provisioned credential
* Report traffic to Consumer Insights
* Provisioning OAuth credential to an identity provider

### Provision data plane when consumer requests access to a product resource

From the Marketplace, a consumer first requests access to a resource and then request credentials. These two actions generate events that the Discovery Agent is listening to. Once the events are received by the agent, the agent converts them based on the data plane it is connected to:

* accessRequest becomes:
    * Application and API authorization on Axway API Manager
    * Usage plan and API authorization on AWS Gateway
    * Subscription and API authorization on Azure Gateway
* credentialRequest becomes:
    * API key (Axway API Manager / AWS Gateway / Azure)
    * OAuth credential (Axway API Manager only)

### Provisioning OAuth credential to an identity provider

The Discovery Agent provides the capability to provision credentials to an OAuth identity provider based on [OAuth 2.0 Dynamic Client Registration Protocol](https://datatracker.ietf.org/doc/html/rfc7591). The Discovery Agent can be configured with multiple OAuth identity providers that can be used by the agent to provision credentials for the associated data plane. The Discovery Agent requires the following configuration to register the OAuth identity providers:

* Name (`AGENTFEATURES_IDP_NAME`): The name of the OAuth identity provider.
* Title (`AGENTFEATURES_IDP_TITLE`): The title of the Credential Request Definition that will be shown to consumers in Amplify Marketplace.
* Type (`AGENTFEATURES_IDP_TYPE`): The type of OAuth identity provider (`generic`, `keycloak` or `okta`).
* Metadata URL (`AGENTFEATURES_IDP_METADATAURL`): The URL exposed by the OAuth authorization server to provide metadata information.
* Authentication Config: Used by the agent to communicate with the OAuth identity provider.
    * Type (`AGENTFEATURES_IDP_AUTH_TYPE`): The type of authentication mechanism to be used. The supported types are:
        * `accessToken`: Authentication based on the pre-configured access token(initial access token, Admin API token, etc.).
        * `client`: *Deprecated*. Use client_secret_post.
        * `client_secret_basic`: Agent uses the client id and secret to acquire access token using HTTP Basic authentication.
        * `client_secret_post`: Agent uses the client id and secret to acquire access token by placing a POST request with client credential in request body.
        * `client_secret_jwt`: Agent generates a HMAC SHA signed JWT token using client secret and uses it to acquire the token.
        * `private_key_jwt`: Agent generates a signed JWT token using registered key pair and uses it to acquire the token.
        * `tls_client_auth`: Agent uses the mTLS connection based on public key infrastructure (PKI) with registered client certificate to acquire the access token.
        * `self_signed_tls_client_auth`: Agent uses the mTLS connection with registered self-signed client certificate to acquire the access token.
    * Access Token (`AGENTFEATURES_IDP_AUTH_ACCESSTOKEN`): The token (initial access token, Admin API Token, etc.) to be used by the Agent SDK to authenticate with the OAuth identity provider. The config is required if the type is set to `accessToken`. The config is required when using `accessToken` based authentication.
    * Client ID (`AGENTFEATURES_IDP_AUTH_CLIENTID`): The identifier of the client in the OAuth identity provider that can used to create new OAuth clients. The config is required if the type is not set to `accessToken`.
    * Client Secret (`AGENTFEATURES_IDP_AUTH_CLIENTSECRET`): The secret for the client in the OAuth identity provider. The config is required if the type is set to `client_secret_basic`, `client_secret_post` or `client_secret_jwt`.
    * Scopes (`AGENTFEATURES_IDP_AUTH_CLIENTSCOPE`): Space-separated scopes to be used when requesting the access token from the authorization server.
    * Private Key file path (`AGENTFEATURES_IDP_AUTH_PRIVATEKEY`): Path of the private key file to be used for `private_key_jwt` authentication.
    * Public Key file path (`AGENTFEATURES_IDP_AUTH_PUBLICKEY`): Path of the public key file to be used for `private_key_jwt` authentication.
    * Private Key password (`AGENTFEATURES_IDP_AUTH_KEYPASSWORD`): Password for the private key.
    * Token Signing Algorithm (`AGENTFEATURES_IDP_AUTH_TOKENSIGNINGMETHOD`): Algorithm used for signing the token for `client_secret_jwt` or `private_key_jwt`. Defaults to `HS256` for `client_secret_jwt` and `RS256` for `private_key_jwt`.
    * Flag for re-using cached token (`AGENTFEATURES_IDP_AUTH_USECACHEDTOKEN`): Boolean flag to enable / disable the agent to cache the token until the expiry of the access token.
    * Flag for using the user registration token (`AGENTFEATURES_IDP_AUTH_USEREGISTRATIONTOKEN`): Boolean flag to enable / disable the agent to save and use the Credential specific registration token when modifying the client in the IDP.
    * mTLS Config:
        * Skip host verification (`AGENTFEATURES_IDP_SSL_INSECURESKIPVERIFY`): Flag to control verification of the TLS server certificate chain and host name.
        * Root CA certificate (`AGENTFEATURES_IDP_SSL_ROOTCACERTPATH`): The path of the root CA certificate to be used for the mTLS connection.
        * Client certificate (`AGENTFEATURES_IDP_SSL_CLIENTCERTPATH`): The path of the client certificate to be used for the mTLS connection.
        * Client key (`AGENTFEATURES_IDP_SSL_CLIENTKEYPATH`): The path of the client key to be used for the mTLS connection.

{{< alert title="Note" color="primary" >}}If your IDP is configured to use Client Registration Policies, ensure that the scopes defined in the API are allowed in the policy. See [Keycloak Client Registration](https://www.keycloak.org/docs/23.0.6/securing_apps/#_client_registration_policies).{{< /alert >}}

The Discovery Agent provides support for implicitly registering multiple identity providers based on environment variable configuration. The environment variable based config must be suffixed with the index number. The following is an example of registering the provider using environment variable based configuration.

```shell
# IDP configuration with accessToken type authentication
AGENTFEATURES_IDP_NAME_1="idp-name"
AGENTFEATURES_IDP_TYPE_1="okta"
AGENTFEATURES_IDP_METADATAURL_1="https://dev-xxxxxxxxx.okta.com/oauth2/default/.well-known/oauth-authorization-server"

AGENTFEATURES_IDP_AUTH_TYPE_1="accessToken"

AGENTFEATURES_IDP_AUTH_ACCESSTOKEN_1="okta-admin-api-access-token-xxxxxxxxx"
```

```shell
# IDP configuration with client_secret_basic type authentication
AGENTFEATURES_IDP_NAME_1="idp-name"
AGENTFEATURES_IDP_TYPE_1="keycloak"
AGENTFEATURES_IDP_METADATAURL_1="http://keycloak:9999/realms/somerealm/.well-known/openid-configuration"

AGENTFEATURES_IDP_AUTH_TYPE_1="client_secret_basic"

AGENTFEATURES_IDP_AUTH_CLIENTID_1="id-for-client"
AGENTFEATURES_IDP_AUTH_CLIENTSECRET_1="secret-for-client"
```

```shell
# IDP configuration with client_secret_post type authentication
AGENTFEATURES_IDP_NAME_1="idp-name"
AGENTFEATURES_IDP_TYPE_1="generic"
AGENTFEATURES_IDP_METADATAURL_1="https://idp-url/.well-known/openid-configuration"

AGENTFEATURES_IDP_AUTH_TYPE_1="client_secret_post"

AGENTFEATURES_IDP_AUTH_CLIENTID_1="id-for-client"
AGENTFEATURES_IDP_AUTH_CLIENTSECRET_1="secret-for-client"

AGENTFEATURES_IDP_AUTH_CLIENTSCOPE_1="register-client manage-client"
```

```shell
# IDP configuration with client_secret_jwt type authentication
AGENTFEATURES_IDP_NAME_1="idp-name"
AGENTFEATURES_IDP_TYPE_1="generic"
AGENTFEATURES_IDP_METADATAURL_1="https://idp-url/.well-known/openid-configuration"

AGENTFEATURES_IDP_AUTH_TYPE_1="client_secret_jwt"

AGENTFEATURES_IDP_AUTH_CLIENTID_1="id-for-client"
AGENTFEATURES_IDP_AUTH_CLIENTSECRET_1="secret-for-client"
AGENTFEATURES_IDP_AUTH_TOKENSIGNINGMETHOD_1=HS256
```

```shell
# IDP configuration with private_key_jwt type authentication
AGENTFEATURES_IDP_NAME_1="idp-name"
AGENTFEATURES_IDP_TYPE_1="generic"
AGENTFEATURES_IDP_METADATAURL_1="https://idp-url/.well-known/openid-configuration"

AGENTFEATURES_IDP_AUTH_TYPE_1="private_key_jwt"

AGENTFEATURES_IDP_AUTH_CLIENTID_1="id-for-client"
AGENTFEATURES_IDP_AUTH_PRIVATEKEY_1=/path-of-pem-encoded-private-key-file
AGENTFEATURES_IDP_AUTH_PUBLICKEY_1=/path-of-pem-encoded-public-key-file
AGENTFEATURES_IDP_AUTH_TOKENSIGNINGMETHOD_1=RS256
```

```shell
# IDP configuration with tls_client_auth type authentication
AGENTFEATURES_IDP_NAME_1="idp-name"
AGENTFEATURES_IDP_TYPE_1="generic"
AGENTFEATURES_IDP_METADATAURL_1="https://idp-url/.well-known/openid-configuration"

AGENTFEATURES_IDP_AUTH_TYPE_1="tls_client_auth"

AGENTFEATURES_IDP_AUTH_CLIENTID_1="id-for-client"
AGENTFEATURES_IDP_AUTH_USECACHEDTOKEN_1=false

AGENTFEATURES_IDP_SSL_INSECURESKIPVERIFY_1=true
AGENTFEATURES_IDP_SSL_ROOTCACERTPATH_1=/path-of-root-ca-certificate
AGENTFEATURES_IDP_SSL_CLIENTCERTPATH_1=/path-of-client-certificate
AGENTFEATURES_IDP_SSL_CLIENTKEYPATH_1=/path-of-client-key
```

```shell
# IDP configuration with self_signed_tls_client_auth type authentication
AGENTFEATURES_IDP_NAME_1="admin_self_signed_tls_client_auth"
AGENTFEATURES_IDP_TYPE_1="generic"
AGENTFEATURES_IDP_METADATAURL_1="https://idp-url/.well-known/openid-configuration"

AGENTFEATURES_IDP_AUTH_TYPE_1="self_signed_tls_client_auth"

AGENTFEATURES_IDP_AUTH_CLIENTID_1="id-for-client"

AGENTFEATURES_IDP_SSL_INSECURESKIPVERIFY_1=true
AGENTFEATURES_IDP_SSL_CLIENTCERTPATH_1=/path-of-self-signed-client-certificate
AGENTFEATURES_IDP_SSL_CLIENTKEYPATH_1=/path-of-client-key
```

#### Show / Hide the values in the credential request OAuth Type dropdown menu

This feature allows you to toggle between displaying or hiding the specific options within the OAuth credential Type dropdown menu on the Request Credential screen in the Marketplace.

![Alt image](/Images/marketplace/Oauth.png)

The Discovery Agent for Axway API Management 7.7 provides the ability to control the OAuth credential Type dropdown values in the Marketplace based on environment variable configuration.
The following is an example to limit the dropdown value to "OAuth Client ID & Secret."

```shell
# create credential dropdown menu with only the OAuth Client ID & Secret credential type
CENTRAL_CREDENTIALS_OAUTHMETHODS=oauth_secret
```

The following is an example to limit the dropdown value to "OAuth Client ID & Private Key."

```shell
# create credential dropdown menu with only the OAuth Client ID & Private Key credential type
CENTRAL_CREDENTIALS_OAUTHMETHODS=oauth_public_key
```

The following is an example to allow the dropdown values of both "OAuth Client ID & Secret" and "OAuth Client ID & Private Key." This is also the default setting if the CENTRAL_CREDENTIALS_OAUTHMETHODS environment variable is not set.

```shell
# create credential dropdown menu with both the OAuth Client ID & Private Key and OAuth Client ID & Secret credential types
CENTRAL_CREDENTIALS_OAUTHMETHODS=oauth_public_key,oauth_secret
```

### Deprovision data plane when consumer deletes an application or credentials

From the Marketplace, a consumer can delete an existing application or an existing credential. These two actions generate events that the Discovery Agent is listening to. Once the events are received by the agent, the agent converts them based on the data plane it is connected to:

* Remove the corresponding application from the data plane:
    * Application on Axway API Manager
    * Usage plan on AWS Gateway
    * Subscription on Azure Gateway
* Delete a credential:
    * API key (Axway API Manager / AWS Gateway / Azure)
    * OAuth credential (Axway API Manager only)

### Report the traffic

Each time a call to an API is made on a data plane monitored by a Traceability Agent, the agent correlates the traffic to the appropriate Marketplace subscription and product based on the credentials used to call the API.

If a correlation is found, then the corresponding traffic will be visible in [Consumer Insights](/docs/get_actionable_insights/consumer_insights), as well as in [Business Insights](/docs/get_actionable_insights/business_insights).

If no correlation is found, then the traffic will only be visible in [Business Insights](/docs/get_actionable_insights/business_insights).

## Troubleshooting

These are the more common error cases you can encounter when using agents for the first time. If your error is not listed, see [Understand the agent log](/docs/connect_manage_environ/connect_api_manager/tips-troubleshooting-and-limitations/#understand-the-agent-logs) and [Error Codes and Mitigations](/docs/connect_manage_environ/connect_api_manager/tips-troubleshooting-and-limitations/#error-codes-and-mitigations).

| Question                                                  | Answer                                                                                                                                                                                                                                                                                                                                          |
|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Why can't Traceability Agent connect to Amplify platform? | Make sure the gRPC communication with Amplify platform (`CENTRAL_GRPC_ENABLED`) is enabled (default). Make sure the http/2 connectivity is allowed to cross your firewall/proxy, if any. Use `curl --http2 htpps://apircentral.axway.com` (US region) / `curl --http2 htpps://central.eu-fr.axway.com` (EU region) /  `curl --http2 htpps://central.ap-sg.axway.com` (APAC region) to check the http/2 connectivity.     |
| Why can't Discovery Agent connect to Amplify platform?    | Make sure that the gRPC communication with Amplify platform (`CENTRAL_GRPC_ENABLED`) is enabled (default=true). Make sure the http/2 connectivity is allowed to cross your firewall/proxy, if any. Use `curl --http2 htpps://apircentral.axway.com` (US region) / `curl --http2 htpps://central.eu-fr.axway.com` (EU region) / `curl --http2 htpps://central.sg-ap.axway.com` (APAC region) to check the http/2 connectivity. |
