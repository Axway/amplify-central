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

The Discovery Agent is used to discover new API proxies configured in Apigee X. The agent discovery process is as follows. First the agent finds all deployed revisions. From those revisions the agent attempts to find a specification file attached to the revision. To do this it will look at the proxy configuration for a resource of type oas attached. Given a specification file is found the agent will then create an API Service to represent that proxy in Amplify Central.

### Traceability Agent

The Traceability Agent gathers usage metrics for all proxies defined in Apigee X. The agent will query, based on the configured frequency, the Apigee X stats API for new metrics. The metrics, as noted in the [Apigee X documentation](https://cloud.google.com/apigee/docs/api-platform/analytics/use-analytics-api-measure-api-program-performance), can be delayed up to 10 minutes. Do to this possible delay the Traceability Agent will not gather metrics within the last 10 minutes when it queries the stats API. On subsequent runs those metrics will be gathered.