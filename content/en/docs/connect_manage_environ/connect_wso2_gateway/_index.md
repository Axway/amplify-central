---
title: Connect WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal
linkTitle: Connect WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal
weight: 120
---
Connect WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal and Amplify so you can govern and monitor the creation / deployment / publishing and subscriptions of the WSO2 API Manager APIs in one central location.

## Why do you want to connect Connect WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal and Amplify?

The WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal can be represented by an Amplify environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents (Discovery and Traceability) interact with WSO2 API Manager and Amplify to:

* Detect changes to WSO2 Publisher APIs using the Discovery Agent. The Discovery Agent pushes the service configuration as an API service for the environment, which can then be published and used by consumers to subscribe to the service.
* Create and update business plans through Admin to manage quota and subscriptions
* Create applications and credentials through the Dev Portal to execute WSO2 APIs
* Track API metrics and transactions related to discovered APIs, their consumers, and subscriptions.

### Discovery

The Discovery Agent is used to discover new published APIs for a specific WSO2 API Manager. The Discovery Agent pushes REST, SOAP, and GraphQL API definitions to Amplify.

The related APIs are published to Amplify as an API service in the selected environment and then can be published to Marketplace within a product.

#### Application

While handling a new application event the following steps are taken:

* Create a new application

For deprovisioning the created application will be removed.

#### Access Request

When handling a new access request event, for an existing managed application, the following steps are taken:

* Add a subscription policy containing a business plan
* Create a quota plan and assign it to the API policy
* Identify the API or API Product and interrogate API id
* Assign API or API Product with the created application
* Add/update application's identifiers

For deprovisioning:

* Remove API subscription policy
* Remove the application
* If previously created, remove plan from API's policy
* Remove/update application identifiers

#### Credential

When handling a new credential event, for a given application, the following steps are taken:

* For API key:
    * Provision:
        * Create API key - the API key present on the application is used.
    * Deprovision:
        * Application's API key is revoked and removed from the application.
* For OAuth2:
    * Provision:
        * Create Oauth Key - an OAuth2 strategy is created and assigned to the application.
    * Deprovision:
        * The OAuth2 strategy is deleted and removed from application.

### Traceability

A global WSO2 policy is created and deployed to intercept API requests, collect various details about the request and the API itself, formats this information as a JSON payload, and sends it to a separate tracing service, in this case the Traceability Agent. Crucially, it does this in a non-blocking way, so the original API request/response flow is not affected. 
In order to do so, you will need to create a policy with a synapse sequence that implements a tracing mechanism used to interrogate and track APIs.

* Create a local policy in WSO2 API Manager to represent your agents traceability flow: [https://your-domain:9443/publisher/policies]
* Create a policy definition that implements a tracing mechanism used to interrogate and track APIs. WSO2 uses Synapse sequences to define request and response flows. This policy is designed for monitoring and debugging, allowing you to track API invocations and identify potential issues. See below for a very high level example.

```
shell
<?xml version="1.0" encoding="UTF-8"?>
<sequence name="TraceabilityTest" statistics="enable" trace="enable" xmlns="http://ws.apache.org/ns/synapse">
    <clone>
        <target>
            <sequence>
                <property name="HTTP_SC" expression="get-property('axis2', 'HTTP_SC')" scope="default"/>
                <property name="contentLength" expression="get-property('transport', 'Content-Length')" scope="default"/>
                <script language="js"><![CDATA[
mc.setProperty('CONTENT_TYPE', 'application/json');
var correlationId = mc.getProperty('correlation_id');
var httpStatusCode = mc.getProperty('HTTP_SC');
var restMethod = mc.getProperty('REST_METHOD');
var requestExecutionStartTime = mc.getProperty('request.execution.start.time');
var uriIn = mc.getProperty('REST_FULL_REQUEST_PATH');
var uriOut = mc.getProperty('REST_SUB_REQUEST_PATH');

var apiContext = mc.getProperty('api.ut.context');
var apiName = mc.getProperty('api.ut.api');
var apiVersion = mc.getProperty('api.ut.api_version');
var apiAppName = mc.getProperty('api.ut.application.name');
var apiAppId = mc.getProperty('api.ut.application.id');
var apiHost = mc.getProperty('api.ut.hostName');
var apiReqStartTime = mc.getProperty('api.ut.requestTime');
var apiBackendReqStartTime = mc.getProperty('api.ut.backendRequestTime');
var apiBackendReqEndTime = mc.getProperty('api.ut.backendRequestEndTime');

mc.setPayloadJSON({
    correlationId: correlationId,
    httpStatusCode: httpStatusCode,
    restMethod:restMethod,
    uriIn: uriIn,
    uriOut: uriOut,
    requestExecutionStartTime: requestExecutionStartTime,
    apiContext: apiContext,
    apiName: apiName,
    apiVersion: apiVersion,
    apiAppName: apiAppName,
    apiAppId: apiAppId,
    apiHost: apiHost,
    apiReqStartTime: apiReqStartTime,
    apiBackendReqStartTime: apiBackendReqStartTime,
    apiBackendReqEndTime: apiBackendReqEndTime,
});

]]></script>
                <call blocking="true">
                    <endpoint>
                        <http method="POST" uri-template="http://your-traceability-agent/trace">
                            <timeout>1</timeout>
                            <suspendOnFailure>
                                <initialDuration>-1</initialDuration>
                                <progressionFactor>-1</progressionFactor>
                                <maximumDuration>0</maximumDuration>
                            </suspendOnFailure>
                            <markForSuspension>
                                <retriesBeforeSuspension>0</retriesBeforeSuspension>
                            </markForSuspension>
                        </http>
                    </endpoint>
                </call>
                <drop/>
            </sequence>
        </target>
        <target>
            <sequence>
                <send/>
            </sequence>
        </target>
    </clone>
</sequence>

```

* Upload the policy definition to the local policy.
    * Save
* Add a new global policy: [https://your-domain:9443/publisher/global-policies]
    * Give it a name and description to represent your agents traceability flow that will apply to all APIs and services deployed within your environment.
    * Drag and drop the Response Flow policy from the local policy you created (click over via Policy List header to RESPONSE).
    * Drag and drip the Fault Flow policy from the local policy you created (click over via Policy List header to FAULT).
    * Save and deploy to the necessary Gateway.

If you have trouble generating Synapse sequences, you can refer to the following guidelines below or reach out to your WSO2 API Manager administrator for assistance.

* Synapse Mediation Sequences: [https://apim.docs.wso2.com/en/latest/learn/api-gateway/message-mediation/](https://apim.docs.wso2.com/en/latest/learn/api-gateway/message-mediation/). This covers how to define and attach custom mediation policies using Synapse sequences.
* WSO2 Mediation Extensions: [https://apim.docs.wso2.com/en/latest/extend/mediation-extensions/](https://apim.docs.wso2.com/en/latest/extend/mediation-extensions/). This provides a guide on extending WSO2 with custom Synapse mediators.

## Prerequisites

* An Axway Amplify subscription in the Amplify platform
* A Platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts)
* An Amplify environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments/)
* Access to Connect WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal to retrieve details from the services
* The [Traceability Agent](#traceability) requires a connected and running [Discovery Agent](#discovery)

## System requirements

* An environment to run the agent Docker containers.

## Region support

Amplify supports three regions, US (default), EU and APAC. The data (APIs, traffic) that the agents send to Amplify are stored in one of those regions based on the agent configuration.

Use one of the following URLs to access the Amplify UI:

* US: [https://apicentral.axway.com](https://apicentral.axway.com)
* EU: [https://central.eu-fr.axway.com](https://central.eu-fr.axway.com)
* APAC: [https://central.ap-sg.axway.com](https://central.ap-sg.axway.com)

Use one of the following settings, for both agents, to set the region the agent will connect to:

* `CENTRAL_REGION`= **US**
* `CENTRAL_REGION`= **EU**
* `CENTRAL_REGION`= **AP**

{{< alert title="Note" color="primary" >}}`CENTRAL_REGION` is part of agents released after June 5, 2024. See [CENTRAL_REGION setting](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic#central_region-setting) for the variables that `CENTRAL_REGION` sets{{< /alert >}}

## Gather the required values from Connect WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal

### WSO2 API Manager - baseURL (will be used for Publisher Portal / Dev Portal / Admin Portal)

Values of the baseURL must be provided for the agent to be able to fulfill API Calls to WSO2.  The baseURL is where the WSO2 APIM resides.

* baseURL: [https:/your-domain:9443]
* Publisher Portal: [https://your-domain:9443/publisher]
* Developer Portal: [https://your-domain:9443/devportal]
* Admin Portal: [https://your-domain:9443/admin]

### WSO2 API Manager -  API portal Client ID and Secret & Dev Portal ClientID and Secret

The Discovery Agent will need to use the credentials provided by calling the dynamic client registration(DCR) to connect to, discover APIs and track transactions.
WSO2 API Manager uses OAuth 2.0 for security. This means that applications need to be authenticated before they can access the API Manager's resources (like API discovery). The client ID and secret act as your application's credentials, verifying its identity to the API Manager.

#### How to obtain Client ID and Client Secret

* Understand the DCR Flow
    * The DCR endpoint allows you to register a client dynamically without prior manual registration. Upon successful registration, the response will contain the client_id (consumer key) and client_secret (secret key).
* Identify the DCR Endpoint
    * Example - WSO2: https://wso2-server/client-registration/v0.17/register
* Make the DCR Request (WSO2 example)

```
shell
curl -X POST https://<wso2-server>/client-registration/v0.17/register \
     -H "Content-Type: application/json" \
     -H "Authorization: Basic <base64-encoded-credentials>" \
     -d '{
          "callbackUrl": "http://localhost/callback",
          "clientName": "MyDynamicClient",
          "owner": "admin",
          "grantType": "client_credentials password refresh_token",
          "saasApp": true
         }'
```

* Parse the Response (WSO2 example)
    * A successful response will include the client_id (consumer key) and client_secret (secret key).

```
shell
{
  "client_id": "my-dynamic-client",
  "client_secret": "random-generated-secret",
  "registration_access_token": "access-token-to-manage-client",
  "token_endpoint_auth_method": "client_secret_basic"
}

```

ClientID and ClientSecret from calling the dynamic client registration (DCR) will be required. Further guidance can be found [here](https://apim.docs.wso2.com/en/latest/reference/product-apis/publisher-apis/publisher-v4/publisher-v4/)
If you're having trouble generating keys, reach out to your WSO2 API Manager administrator for assistance. They should be able to guide you through the process.

### Additional WSO2 references

Connecting WSO2 API Manager - Publisher Portal / Dev Portal / Admin Portal to Amplify will provide you with a global centralized view of your APIs and their related traffic.

* Overview:[https://apim.docs.wso2.com/en/latest/get-started/overview](https://apim.docs.wso2.com/en/latest/get-started/overview)
* API Manager:[https://wso2.com/api-manager/](https://wso2.com/api-manager/)
* Publisher Portal:[https://apim.docs.wso2.com/en/latest/deploy-and-publish/publish-on-dev-portal/publish-an-api/](https://apim.docs.wso2.com/en/latest/deploy-and-publish/publish-on-dev-portal/publish-an-api/)
* Dev Portal:[https://apim.docs.wso2.com/en/3.0.0/develop/product-apis/getting-started/guide-devportal-v1/](https://apim.docs.wso2.com/en/3.0.0/develop/product-apis/getting-started/guide-devportal-v1/)
* Admin Portal:[https://apim.docs.wso2.com/en/latest/get-started/api-manager-quick-start-guide/](https://apim.docs.wso2.com/en/latest/get-started/api-manager-quick-start-guide/)