---
title: WSO2 Synapse Sequence for Traceability Agent Deconstructed
linkTitle: WSO2 Synapse Sequence for Traceability Agent Deconstructed
draft: false
weight: 25
---

## Synapse sequence further explained

In WSO2, a synapse sequence YAML file is used to define the mediation logic within the Synapse mediation engine. Specifically, it's a way to configure how messages are processed as they flow through the WSO2 Enterprise Integrator (EI) or API Manager.

### Traceability Agent synapse sequence template broken down

The synapse sequence below is provided as the recommended policy to use for your Traceability Agent. It is a common pattern for implementing traceability or logging in a WSO2 API Gateway. It allows you to:

* Capture detailed information about each request.
* Send that information to a centralized logging system for analysis.
* Without interrupting the normal flow of the original request.
* This is very useful for debugging, monitoring, and auditing.

```
yaml
<?xml version="1.0" encoding="UTF-8"?>
<sequence name="TraceabilityAgent" statistics="enable" trace="enable" xmlns="http://ws.apache.org/ns/synapse">
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
                        <http method="POST" uri-template="http://[TRACEABILITY_AGENT_URL]/trace">
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

## Synapse sequence breakdown

* Overall Structure:
    * <sequence name="TraceabilityAgent" ...>:
        * This defines a Synapse sequence named "TraceabilityAgent."
        * statistics="enable": Enables collection of performance statistics for this sequence.
        * trace="enable": Enables detailed tracing of message flow through the sequence, helpful for debugging.
        * xmlns="<http://ws.apache.org/ns/synapse>": Specifies the Synapse XML namespace.
    * &lt;clone&gt;:
        * This is a crucial element. It creates two copies (clones) of the incoming message, allowing parallel processing.
* First Clone (Trace Logging):
    * &lt;target&gt;&lt;sequence&gt; ... </sequence></target>:
        * This defines the processing logic for the first clone.
        * <property ...> elements:
            * These extract various properties from the message context:
                * HTTP_SC: HTTP status code.
                * contentLength: The content length of the message.
            * lgt;script language="js"&gt; ... </script>:
                * This executes JavaScript code within the Synapse environment.
                * It retrieves more properties:
                    * correlation_id, REST_METHOD, request.execution.start.time, REST_FULL_REQUEST_PATH, REST_SUB_REQUEST_PATH.
                    * api related properties such as context, name, version, application name, application id, hostname, and request times.
                * It then constructs a JSON payload containing these properties using mc.setPayloadJSON().
                * mc is the message context variable.
                * It also sets the content type to application/json.
            * &lt;call blocking="true"&gt; ... </call>:
                * This makes a synchronous HTTP POST request to http:[TRACEABILITY_AGENT_URL]/trace.
                * The JSON payload created in the script is sent as the request body.
                * The endpoint is configured with a 1 second timeout, and failure handling.
            * &lt;drop/&gt;:
                * This discards the first clone's message after the trace logging is complete. This means that this clone of the message will not continue through anymore mediation.
* Second Clone (Original Message Processing):
    * &lt;target&gt;&lt;sequence&gt;  &lt;send/&gt; </sequence></target>:
        * This defines the processing logic for the second clone.
    * &lt;send/&gt;:
        * This sends the original message (the second clone) to its intended destination. The send element without a specified endpoint will send the message to the endpoint that was originally sent to the synapse proxy.

## Summary

In essence, this sequence does the following:

* Clones the incoming message.
* In the first clone:
    * Extracts relevant information.
    * Formats it into a JSON payload.
    * Sends the payload to a trace logging service (http:[TRACEABILITY_AGENT_URL]/trace).
    * Discards the message.
* In the second clone:
    * Sends the original message to its intended backend service.

If you have trouble generating Synapse sequences, you can refer to the following guidelines below or reach out to your WSO2 API Manager administrator for assistance.

* Synapse Mediation Sequences: [https://apim.docs.wso2.com/en/latest/learn/api-gateway/message-mediation/](https://apim.docs.wso2.com/en/latest/learn/api-gateway/message-mediation/). This covers how to define and attach custom mediation policies using Synapse sequences.
* WSO2 Mediation Extensions: [https://apim.docs.wso2.com/en/latest/extend/mediation-extensions/](https://apim.docs.wso2.com/en/latest/extend/mediation-extensions/). This provides a guide on extending WSO2 with custom Synapse mediators.