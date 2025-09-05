---
title: Connect and manage an environment
linkTitle: Connect and manage an environment
weight: 350
date: 2025-02-05
---
The Discovery Process in Amplify Engage empowers organizations to automatically find, catalog, and manage APIs and services across all environments and data planes. By leveraging lightweight agents, Amplify Engage provides centralized visibility, governance, and operational efficiency for your API ecosystem.

For detailed information about agent configuration, features and limitations, see:

* [Discovery and Traceability Agents for Axway API Manager](/docs/connect_manage_environ/connect_api_manager/)
* [Discovery and Traceability Agents for GCP Apigee X](/docs/connect_manage_environ/connect_apigee_x/)
* [Discovery and Traceability Agents for AWS API Gateway](/docs/connect_manage_environ/connect_aws_gateway/)
* [Discovery and Traceability Agents for Azure API Management](/docs/connect_manage_environ/connect_azure_gateway/)
* [Discovery and Traceability Agents for IBM API Connect](/docs/connect_manage_environ/connect_ibm_api_connect/)
* [Discovery and Traceability Agents for Istio Gateway](/docs/connect_manage_environ/mesh_management/)
* [Discovery and Traceability Agents for MuleSoft Gateway](https://github.com/Axway/agents-mulesoft)
* [Discovery and Traceability Agents for Software AG webMethods](https:///docs/connect_software_ag_webmethods/)
* [Discovery and Traceability Agents for Kong Gateway](https://github.com/Axway/agents-kong)
* [Discovery Agent for GitHub Repository](/docs/connect_manage_environ/connect_github_repository/)
* [Discovery Agent for GitLab Repository](/docs/connect_manage_environ/connect_gitlab_repository/)
* [Discovery Agent for Kafka Cluster](/docs/connect_manage_environ/connect_kafka_cluster/)
* [Discovery Agent for SwaggerHub](/docs/connect_manage_environ/connect_swaggerhub/)
* [Discovery Agent for Backstage](/docs/connect_manage_environ/connect_backstage/)
* [Discovery Agent for SAP Integration Suite - API Management / API Portal](/docs/connect_manage_environ/connect_sap_api_portal/)

To manually synchronize your environment, you can use the [Axway Central CLI](/docs/integrate_with_central/cli_central/cli_environments) or the [Amplify APIs](https://apicentral.axway.com/apis/docs). Note that changes in your deployment will not be automatically synchronized with Amplify.

## Asset definitions

This section describes the assets that are represented in your environment.

### API services

An API service represents a physical deployment of a resource in an environment. Examples of API services include API, MFT, Protobuf, documentation, and so on. You can manually add API services to your environment or they can be discovered and auto-added by Axway agents. Later, these API services can be combined and packaged together to create catalog items for your consumers to access.

#### Versions

API services have a specification based on type (OAS2, OAS3, WSDL, Protobuf, etc). Whenever this specification changes, a version must be created. This helps account for different stages in the lifecycle of the API service. Each version has a direct dependency on its associated API services and can be individually configured for differing consumer access needs.

#### Endpoints

An endpoint is a URL that represents the deployment of an API service. There can be one or many endpoints to access a deployed API service version. An endpoint includes a name and description to make it easier for others to consume later. They also contain the host and port information used to access the API service and have a hard dependency on the API service version it is associated with.

### Webhooks

Webhook assets are used for enabling subscription flows when a catalog user wants to subscribe to your API service. Webhooks are scoped to the environment level, which makes them reusable with other assets within the environment.

### Secrets

Secrets are a special kind of asset used with webhooks for securing subscription flows.

## Related topics

See the following topics for related information.
