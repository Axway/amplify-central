---
title: Connect Kafka cluster
linkTitle: Connect Kafka cluster
weight: 120
date: 2024-02-14
---
Connect your Kafka cluster, hosted with Confluent Cloud/Confluent Platform, to Amplify so you can govern and monitor the creation / deployment / subscriptions of the topics in the cluster as an AsyncAPI specification in a centralized location.

## Why do you want to connect your Kafka cluster and Amplify?

Connecting your Kafka cluster to Amplify will provide a global, centralized view of your topics and their related consumption metrics.

A Kafka cluster within a [Confluent Cloud](https://docs.confluent.io/cloud/current/overview.html)/[Confluent Platform](https://docs.confluent.io/platform/current/overview.html) can be represented as an Amplify environment, allowing you to better filter AsyncAPIs associated to the topics in your Kafka cluster and their consumption metrics. Supplied with the environment, two agents (Discovery and Traceability) interact with the Kafka cluster and Amplify to:

* Detect topics within the Kafka cluster and associated schemas from the Schema registry using the Discovery Agent. The Discovery Agent prepares the AsyncAPI specification based on discovered items and pushes it as an API service for the environment, which can then be published as a catalog item to be used by consumers to subscribe to the service.
* Gather consumer statistics that are related to discovered topics and prepare the metric events that are sent to Amplify platform.

### Discovery Agent

The Discovery Agent is used to discover topics and associated schemas in the Kafka cluster. It is also the agent that handles provisioning for consumers to access the discovered topics.

#### Discovery process

1. Find all topics from the Kafka cluster.
2. For those topics, attempt to find associated schema in the Schema registry.
3. Using the discovered topics, associated schema, and Kafka broker configuration, the agent prepares the AsyncAPI specification.
4. The agent creates an API service, revision, and instance to represent the topics in Service Registry of the Enterprise Marketplace. The agent uses the broker configuration to associate security policy to the published API service.

#### Provisioning process

1. When a consumer is granted access to the discovered AsyncAPI representing the topics within Kafka cluster, the agent will:
    * Find the previously created credentials and create ACL for each principal and requested operation.
    * Create ACL for the consumer group that identifies the application.
2. When a consumer requests credentials for an application that has access to an API proxy within Kafka, the agent will:
    * Create new credential based on the associated security policy.
    * Find the previously granted accesses for the topics for the application and create ACL for the new principal and requested operation.
    * Create ACL for the consumer group that identifies the application.
3. For Confluent Cloud, the agent creates a service account and associates a Resource API Key with ACL for the associated topic.
4. For Confluent Platform, the agent creates a SASL user with ACL for the associated topic.

### Traceability Agent

The Traceability Agent gathers consumer metrics for topics defined in the Kafka cluster. The agent, based on the configured frequency, will query the topics' consumer offset stats for the consumer group that identifies the created applications. The consumer metric will identify the total number of messages read by the clients within the consumer group associated with the Marketplace application.

## Prerequisites

* An Axway Amplify subscription in the Amplify platform
* A Platform service account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts)
* An Amplify environment representing the Kafka cluster
* The [Traceability Agent](#traceability-agent) requires a connected and running [Discovery Agent](#discovery-agent)
* Credentials to communicate with the Kafka cluster hosted with Confluent Cloud/Confluent Platform
    * Confluent Cloud
        * Cloud API Key. See [Cloud API key](https://docs.confluent.io/cloud/current/access-management/authenticate/api-keys/api-keys.html#create-a-cloud-api-key)
        * Resource API Key for Cluster. See [Resource API key](https://docs.confluent.io/cloud/current/access-management/authenticate/api-keys/api-keys.html#resource-api-keys)
        * Resource API Key for Schema Registry. See [Resource API key](https://docs.confluent.io/cloud/current/access-management/authenticate/api-keys/api-keys.html#resource-api-keys)
    * Confluent Platform
        * SASL User. The agent supports SASL/PLAIN and SASL/SCRAM based authentication. See [Authenticate with SASL](https://docs.confluent.io/platform/current/kafka/authentication_sasl/auth-sasl-overview.html)

## Region support

Amplify supports three regions, US (default), EU and APAC. The data (APIs, traffic) that the agents send to Amplify is stored in one of those regions (based on the agent configuration).

Use one of the following URLs to access the Amplify WebUI:

* US: <https://apicentral.axway.com>
* EU: <https://central.eu-fr.axway.com>
* APAC: <https://central.ap-sg-fr.axway.com>

Update the following variables to move data to the EU region:

* `CENTRAL_DEPLOYMENT`= **prod-eu**
* `CENTRAL_URL`= **<https://central.eu-fr.axway.com>**
* `TRACEABILITY_HOST`= **ingestion.visibility.eu-fr.axway.com:5044**

Update the following variables to move data to the APAC region:

* `CENTRAL_DEPLOYMENT`= **prod-ap**
* `CENTRAL_URL`= **<https://central.ap-sg.axway.com>**
* `TRACEABILITY_HOST`= **ingestion.visibility.ap-sg.axway.com:5044**

## Related topics

See the following topics for related information.
