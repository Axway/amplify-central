---
title: Connect Apigee X
linkTitle: Connect Apigee X
weight: 110
date: 2021-01-04
---
Connect Google Cloud Platform Apigee X and Amplify so you can govern and monitor the creation / deployment / publishing and subscriptions of the Apigee X hosted APIs in one central location.

## Why do you want to connect Apigee X and Amplify?

Connecting Apigee X to Amplify will provide you with a global centralized view of your APIs and their related traffic.

Each Apigee X Organization can be represented by an Amplify environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents (Discovery and Traceability) interact with Apigee X and Amplify to:

* Detect changes to Apigee X proxies deployments using the Discovery Agent. The Discovery Agent pushes the proxy configuration as an API service for the environment, which can then be published as a catalog item to be used by consumers to subscribe to the service.
* Gather Apigee X statistics that are related to discovered APIs and prepare the metric events that are sent to Amplify Platform.

## Before you start

* Read [Embedded Apigee X agents setup](/docs/connect_manage_environ/connect_apigee_x/embedded-agent-setup/)
* You will need information on AWS:
    * The Principal name of the service account created in setup

### Discovery Agent

The Discovery Agent is used to discover new API proxies configured in Apigee X, it is also the agent that handles provisioning for consumers to access the discovered proxies.

#### Discovery process

* Find all deployed API Proxy revisions
* From those revisions attempts to find a specification file
    * To do this the agent looks at the proxy configuration for a resource file of type oas
* Given a specification file is found the agent will then create an API Service, Revision, and Instance to represent that proxy in Amplify Central
* The agent does not validate or configure any policies within the proxy, it will expect the spec to represent what is defined in the proxy

#### Provisioning process

* When a consumer is granted access to an API proxy within Apigee the agent will...
    * Create an Application on Apigee, with the same name, and assign the ownership to the developer email address configured for the agent
    * Create a Product on Apigee, if one does not already exist, that allows access to the specified API proxy
        * If a quota has been set in Ampilfy then that quota will be used when creating the product in Apigee
* When a consumer requests credentials for an Application that has access to an API proxy within Apigee the agent will... 
    * Find the previously created Application on Apigee and create a new Credential within that Application
    * Allow access to all Products created previously for the Application on Amplify
    * Return the created credential to Amplify, encrypted, to be viewed by the consumer in Marketplace

{{< alert title="Note" color="primary" >}}Although credentials will be created and returned to a consumer the API proxy on Apigee must have a policy which validates them{{< /alert >}}

{{< alert title="Note" color="primary" >}}Quotas set on Products within Apigee must be enforced by a policy within the API proxy on Apigee{{< /alert >}}

### Traceability Agent

The Traceability Agent gathers usage metrics for all proxies defined in Apigee X. The agent will query, based on the configured frequency, the Apigee X stats API for new metrics. The metrics, as noted in the [Apigee X documentation](https://cloud.google.com/apigee/docs/api-platform/analytics/use-analytics-api-measure-api-program-performance), can be delayed up to 10 minutes. Do to this possible delay the Traceability Agent will not gather metrics within the last 10 minutes of executing the stats query. On subsequent runs those metrics will be gathered.