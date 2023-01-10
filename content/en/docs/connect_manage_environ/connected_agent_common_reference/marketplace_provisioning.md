---
title: Manage your Marketplace provisioning
linkTitle: Manage your Marketplace provisioning
draft: false
weight: 35 
---

A subscription provides the consumer, or subscriber, with the required security and endpoint materials to correctly consume the API.

The security material and/or quota to access an API is configured inside the gateway on either the application (Axway API Manager), the usage plan (AWS Gateway), or the subscription (Azure Gateway).

## Objectives

Learn how to configure:

* Discovery Agent for Marketplace provisioning /deprovisioning
* Traceability Agent for reporting traffic to Consumer Insights

## Supported use cases

Provisioning use cases include:

* Provision data plane when a consumer requests access to a product resource
* Deprovision data plane when a consumer deletes an application or credentials
* Enforce an expiration date for provisioned credential
* Report traffic to Consumer Insights

### Provision data plane when consumer requests access to a product resource

From the Marketplace, a consumer first requests access to a resource and then request credentials. These two actions generate events that the Discovery Agent is listening to. Once the events are received by the agent, the agent converts them based on the data plane it is connected to:

* accessRequest becomes:
    * Application and API authorization on Axway API Manager
    * Usage plan and API authorization on AWS Gateway
    * Subscription and API authorization on Azure Gateway
* credentialRequest becomes:
    * API key (Axway API Manager / AWS Gateway / Azure)
    * OAuth credential (Axway API Manager only)

#### Provisioning OAuth credential to an identity provider

The Discovery Agent provides the capability to provision credentials to an OAuth identity provider based on [OAuth 2.0 Dynamic Client Registration Protocol](https://datatracker.ietf.org/doc/html/rfc7591). The Discovery Agent can be configured with multiple OAuth identity providers that can be used by the agent to provision credentials for the associated data plane. The Discovery Agent requires the following configuration to register the OAuth identity providers:

* Name: The name of the OAuth identity provider
* Type: The type of OAuth identity provider ("generic", "keycloak" or "okta")
* Metadata URL: The URL exposed by the OAuth authorization server to provide metadata information
* Authentication Config: Used by the agent to communicate with the OAuth identity provider
    * Type: The type of authentication mechanism to be used ("accessToken" or "client")
    * Access Token: The token (initial access token, Admin API Token, etc.) to be used by the Agent SDK to authenticate with the OAuth identity provider. The config is required if type is set to "accessToken"
    * Client ID: The identifier of the client in the OAuth identity provider that can used to create new OAuth clients. The config is required if the type is set to "client"
    * Client Secret: The secret for the client in the OAuth identity provider. The config is required if the type is set to "client"

The Discovery Agent provides support for implicitly registering multiple identity providers based on environment variable based configuration. The environment variable based config must be suffixed with the index number. The following is an example of registering the provider using environment variable based configuration.

```shell
# IDP configuration with client type authentication
AGENTFEATURES_IDP_NAME_1="dev-keycloak"
AGENTFEATURES_IDP_TYPE_1="keycloak"
AGENTFEATURES_IDP_METADATAURL_1="http://keycloak:9999/realms/somerealm/.well-known/openid-configuration"
AGENTFEATURES_IDP_AUTH_TYPE_1="client"
AGENTFEATURES_IDP_AUTH_CLIENTID_1="service-account"
AGENTFEATURES_IDP_AUTH_CLIENTSECRET_1="service-account-secret"

# IDP configuration with accessToken type authentication
AGENTFEATURES_IDP_NAME_2="dev-okta"
AGENTFEATURES_IDP_TYPE_2="okta"
AGENTFEATURES_IDP_METADATAURL_2="https://dev-xxxxxxxxx.okta.com/oauth2/default/.well-known/oauth-authorization-server"
AGENTFEATURES_IDP_AUTH_TYPE_2="accessToken"
AGENTFEATURES_IDP_AUTH_ACCESSTOKEN_2="okta-admin-api-access-token-xxxxxxxxx"
```

### Enforce credential expiration date

In addition to the provisioning, an expiration date can be assigned to the provisioned credentials. This expiration date will be reflected on the underlying data plane, if the data plane supports this feature.

By default, the credential has no expiry. To set an expiration date, you must configure the agent using the CENTRAL_CREDENTIALS_EXPIRATIONDAYS variable. At that point, another variable CENTRAL_CREDENTIALS_DEPROVISIONONEXPIRE=true can be configured to enforce the deprovisioning of the credential on the data plane, so that consumers can no longer use it.

Sample variables to automatically deprovision credential after 30 days:

```shell
CENTRAL_CREDENTIALS_EXPIRATIONDAYS=30
CENTRAL_CREDENTIALS_DEPROVISIONONEXPIRE=true
```

Sample variables to expire credential after 90 days:

```shell
CENTRAL_CREDENTIALS_EXPIRATIONDAYS=90
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

If a correlation is found, then the corresponding traffic will be visible in [Consumer Insights](/docs/manage_marketplace/consumer_experience/consumer_insights), as well as in [Business Insights](/docs/get_actionable_insights).

If no correlation is found, then the traffic will only be visible in [Business Insights](/docs/get_actionable_insights).

## Discovery Agent configuration for Marketplace provisioning and deprovisioning

Add the following Discovery Agent variables to the agent configuration:

```powershell
# enable the gRPC communication with Amplify platform. Be sure the http/2 connectivity is allowed to cross your firewall/proxy if any.
CENTRAL_GRPC_ENABLED=true
# activate the Marketplace provisioning feature
AGENTFEATURES_MARKETPLACEPROVISIONING=true
# enable to store a cache locally when agent is stopped. It enables the agent to resume his treatment from where it left when restarting.
AGENTFEATURES_PERSISTCACHE=true
```

Restart your agent once the variables are updated.

{{< alert title="Note" color="primary" >}}Enabling the Marketplace provisioning feature disables the Unified Catalog subscription workflow and the creation of Unified Catalog item{{< /alert >}}

## Traceability Agent configuration for reporting the traffic to Consumer Insights

Add the following Traceability Agent variables to the agent configuration:

```powershell
# enable the gRPC communication with Amplify platform. Be sure the http/2 connectivity is allowed to cross your firewall/proxy if any.
CENTRAL_GRPC_ENABLED=true
# activate the Marketplace provisioning feature
AGENTFEATURES_MARKETPLACEPROVISIONING=true
# enable to store a cache locally when agent is stopped. It enables the agent to resume his treatment from where it left when restarting.
AGENTFEATURES_PERSISTCACHE=true
# enable to add sampling based on consumer and subscription information so each consumer can see a certain percentage of the traffic
TRACEABILITY_PER_SUBSCRIPTION=true
```

Restart your agent once the variables are updated.

## Troubleshooting

These are the more common error cases you can encounter when using agents for the first time. If your error is not listed, see [Understand the agent log](/docs/connect_manage_environ/connect_api_manager/tips-troubleshooting-and-limitations/#understand-the-agent-logs) and [Error Codes and Mitigations](/docs/connect_manage_environ/connect_api_manager/tips-troubleshooting-and-limitations/#error-codes-and-mitigations).

| Question                                                  | Answer                                                                                                                                                                                                                                                                                                                                          |
|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Why doesn't agent provisioning work?                      | Make sure the marketplace provisioning feature (`AGENTFEATURES_MARKETPLACEPROVISIONING`) is enabled.                                                                                                                                                                                                                                            |
| Why can't Traceability Agent connect to Amplify platform? | Make sure the gRPC communication with Amplify platform (`CENTRAL_GRPC_ENABLED`) is enabled. Make sure the http/2 connectivity is allowed to cross your firewall/proxy, if any.  Use `curl --http2 htpps://apircentral.axway.com` (US region) / `curl --http2 htpps://central.eu-fr.axway.com` (EU region) to check the http/2 connectivity.     |
| Why can't Discovery Agent connect to Amplify platform?    | Make sure that the gRPC communication with Amplify platform (`CENTRAL_GRPC_ENABLED`) is enabled. Make sure the http/2 connectivity is allowed to cross your firewall/proxy, if any. Use `curl --http2 htpps://apircentral.axway.com` (US region) / `curl --http2 htpps://central.eu-fr.axway.com` (EU region) to check the http/2 connectivity. |
