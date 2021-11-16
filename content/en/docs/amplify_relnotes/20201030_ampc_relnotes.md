---
title: Amplify Central October 2020 Release Notes
linkTitle: Amplify Central October 2020
weight: 90
date: 2020-10-30
description: Amplify Central / Unified Catalog enables the user to manage their
  provider / consumer view. For more information, see the Amplify Central and
  Amplify Unified Catalog documentation.
---
## New features and enhancements

The following new features and enhancements are available in this update.

### Amplify Unified Catalog

The Unified Catalog is the Marketplace of all integration assets in the enterprise, that can range from APIs to Managed File Transfer Flows, and caters to both providers and consumers.

The Amplify Unified Catalog includes the following enhancements:

#### Filter asset by type

Filter by type has been enhanced to enable users to view their filter selections and clear the filter with a click of a button.

#### Enable consumers of assets to make changes to their subscriptions

Subscription management in Amplify Unified Catalog has been enhanced to enable consumers to make changes to their subscription contracts, whether they are correcting mistakes or making changes to subscription parameters.

#### Simplify flow for promoting API assets from Unified Catalog to Integration Builder

When promoting API assets from the Amplify Unified Catalog to Integration Builder, users are no longer required to provide the Organization and User secrets.

#### Catalog asset Categorization

The Catalog asset details screen has been redesigned to improve readability and allow for classification by assigning a asset to categories.

Filter by categories has been added to the Amplify Catalog to improve searching / filtering and make discovery of assets easier.

**The creation and management of categories is currently not available through the Unified Catalog WebUI, but can be done through the Unified Catalog APIs. See our [Postman collection](https://documenter.getpostman.com/view/3636185/TVYGddhi) for an example**.

### Amplify Central CLI

The Amplify Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

Amplify Central CLI version 0.1.15 is now available on NPM (<https://www.npmjs.com/package/@axway/amplify-central-cli/v/0.1.15>)

The CLI extension is compatible **only** with the Amplify CLI **version 1.4** (<https://www.npmjs.com/package/@axway/amplify-cli/v/1.4.0>)

**This is not yet compatible with the Axway CLI**.

The Amplify Central CLI includes the following enhancements:

* Window 10 support using the Command Prompt and Powershell  
* Support for an https self-signed proxy server. Refer to the readme on the NPM repository, section Proxy configuration.
* Creation of Amplify Central Service Accounts: `amplify central create service-account`
* Installation of the Axway Edge Discovery and Traceability Agents: `amplify central install agents`. Refer to [Deploy your agent with Amplify CLI](/docs/connect_manage_environ/connect_api_manager/deploy-your-agents-with-amplify-cli) for details
* Installation of the AWS Discovery and Traceability Agents: `amplify central install agents`. Refer to [Deploy your agent with Amplify CLI](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-with-amplify-cli) for details
* Installation of the Mesh discovery agent in a Kubernetes cluster: `amplify central install agents`. Refer to [Build your hybrid environment](/docs/connect_manage_environ/mesh_management/build_hybrid_env) for details

### Amplify Central WebUI

The Amplify Central WebUI is the UI where API providers and API consumers will log to manage and consume APIs.

The Amplify Central WebUI includes the following enhancements:

* Amplify Central is now available in an EU Data Region. A user can choose where to host its data (US or EU region) when subscribing to Amplify platform.
* The Search, Sort, and table count of Environments on the Topology page have been improved.
* The Observer display of filters, time range, and the table count on the API Traffic page have been improved.

#### Fixed Issue

This version of Amplify Central WebUI provides the following fix:

* Previously, there was an issue with the Observer display of API filters menu displaying the Axway Cloud and Service mesh environment names. This has been fixed.

### Axway Edge Gateway / AWS Agents

In order to provide a better visibility of your multi-type gateway eco system, two sets of agents are provided. These agents collect data from the Gateway (API / traffic) and expose them in Amplify Central, giving you a global vision of your eco system from a single interface.

#### Deliverables

Axway Edge Gateway agents are available either as a Linux binary or a Docker image.

AWS API Gateway agents are available as a Docker image. Cloud formation templates used to set up the agent in EC2 instance or ECS-fargate instance are also available.

#### Installing Axway Edge Gateway agents

Discovery Agent can be installed anywhere it can access the Axway API Manager APIs.

Traceability Agent must be installed on the same machine where the API Gateway event logs are stored, as the agent reads those files to push the transaction to Amplify Central.

#### Installing AWS API Gateway agents

Agents can be installed in any Docker container. A Cloud formation template is provided to install the agents in an AWS EC2 instance or in an AWS ECS-fargate cluster.

#### Agent resources

A new set of resource is provided within Amplify Central CLI:

* **edgedp**: this resource represent the Axway API Management dataplane. It contains the connectivity (url / port) to the Axway API Manager/Gateway and a reference to the Amplify Central topology environment.
* **eddeda**: this resource represent a Discovery Agent for Axway API Manager. It contains the Discovery Agent configuration and the reference to the dataplane.
* **edgeta**: this resource represent a Discovery Agent for Axway Edge Gateway. It contains the Traceability Agent configuration and the reference to the dataplane.
* **awsdp**: this resource represent the AWS API Management dataplane. It contains the region, transactionLogGroup reference and the queues to be monitored by the agents.
* **awsda**: this resource represent a Discovery Agent for AWS API Manager. It contains the Discovery Agent configuration and the reference to the dataplane.
* **awsta**: this resource represent a Discovery Agent for Axway Edge Gateway. It contains the Traceability Agent configuration and the reference to the dataplane.

#### Discovery Agent

The Discovery Agent discovers APIs from the Gateway and exposes the APIs in Amplify Central topology and/or in the Unified Catalog. As the agent runs continuously, it maintains the integrity of Amplify Central based on the gateway changes. The agent also helps managing the subscription flow.

The Discovery Agent includes the following enhancements:

##### Filter APIs to be discovered

By default, Discovery Agent discovers all APIs matching the following filters:

* **user level filter**: depending on the user the agent is configured to use to access API Manager, only the visible APIs to that user will be accessible to the Discovery Agent. The agent sees the same APIs as the user does in the API Manager UI. If the user can access multiple organizations, then the agent will be able to access the same multiple organization. If the user manages a single organization, then the agent will access the same single organization.
* **API type filter**: only REST and SOAP API definitions are visible to the agent.
* **API Status filter**: only Published/UnPublished/Deprecated are visible to the agent.
* **API tag exclusion filter**: a Discovery Agent parameter (`APIMANAGER_DISCOVERYIGNORETAGS`) helps the agent to exclude APIs having one or more particular tags. It allows the publishing of all APIs except the one that matches this filter.
* **API tag filter**: this filter `APIMANAGER_FILTER` helps the Discovery Agent to determine which API needs to be send to Amplify Central by using conditional expression based on the tag name/value of the API present in API Management system. Filters can be based on tag name only, tag value only or a combination of both. It allows the publishing of APIs that match certain criteria. Some filter samples are available at [Filtering APIs](/docs/connect_manage_environ/connect_api_manager/filtering-apis-to-be-discovered/).

##### Expose APIs in Amplify Central

Within Amplify Central, an API can by visible in different angles. Either it is only exposed for the API provider or it is also exposed for a consumer:

* When an API is exposed for the provider, it is visible in the Topology/Environment view as an API Service.
* When an API is exposed for the consumer, it is visible in the Catalog view as a Catalog asset.
* The same API can be exposed in both views.

The Discovery Agent, via its `CENTRAL_MODE` configuration, helps to publish APIs in Central either visible to the provider `CENTRAL_MODE=publishToEnvironment` or, by default, to the provider and consumer `CENTRAL_MODE=publishToEnvironmentAndCatalog`.

##### Expose APIs to a team

Within Amplify Central, APIs can be segregated per team. Team can represent a company department, an effective team or any other concept that suit the company structure. If a user belongs to a single team, he will only access the APIs referencing this team. If a user belongs to multiple teams, he will have to choose the team he wants to work with prior to accessing the related APIs visible in the team.

The Discovery Agent configuration can contain the team you want to associate APIs with (`CENTRAL_TEAM=<teamName>`). By default, the agent publishes APIs in the `Default Team`.

##### Maintain the Amplify Central integrity

The Discovery Agent is periodically polling information from AWS API Gateway / Axway API Manager in order to find any changes in the Gateways. Based on the found changes (status, summary, image, definition), the Discovery Agent will update Amplify Central assets accordingly.

##### Manage Consumer subscription

Once API are exposed in Amplify Central and specifically in the Catalog, any user logged to Amplify platform belonging to a team will be able to see the APIs shared in this team and consume it.

In order to consume an API, some credentials (API key / OAuth token) might be required based on the API security. In order to obtain the corresponding credentials, a user must subscribe to the API. This process is called the subscription flow.

The subscription flow is initiated by the consumer. The subscription requires an application (v7) / usage plan (AWS) to link the subscriber credential and the selected API.

By default, the subscriber can create an application / usage plan or reuse an existing application during the initial phase of subscription flow. The Discovery Agent will:

* create / update the application / usage plan
* create unique credentials for each subscriber

Once the subscription is initiated, it must be approved. There are three types of subscription approvals managed by the Discovery Agent:

* **CENTRAL_SUBSCRIPTIONS_APPROVAL_MODE=manual** (default): in this mode, nothing is done by the Discovery Agent. The API Manager approves the subscription manually from Amplify platform.
* **CENTRAL_SUBSCRIPTIONS_APPROVAL_MODE=webhook**: this mode requires additional agent configuration (`CENTRAL_SUBSCRIPTIONS_APPROVAL_WEBHOOK_URL`) containing webhook information that is triggered on each subscription state change. The webhook implementation can, for instance, trigger an MS Teams card to a dedicated Teams channel where the API provider will approve the subscription and move the subscription status to the next step.
* **CENTRAL_SUBSCRIPTIONS_APPROVAL_MODE=automatic**: in this mode, the subscription request is auto-approved without human intervention.

The agent waits for the subscription to be approved in order to:

1. Create the application/Usage plan, if needed.

2. Create new credentials and associate them to the application/Usage plan.

3. Send the credentials notification either using an SMTP server (`CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_*`) or a webhook url (`CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_WEBHOOK_URL`).

4. Set the subscription as active.

#### Traceability Agent

The Traceability Agent filters the Axway Edge Gateway logs, or the AWS Cloud Watch logs that are related to discovered APIs, and prepares the transaction events that are sent to Amplify platform. Each time an already discovered API is called by a consumer, an event is sent to Amplify Central and is visible in API Observer.

This event contains the transaction status, transaction urls (frontEnd / backEnd), transaction duration and timestamp, transaction service called (method type + uri path). It also sends the corresponding HTTP headers for each requests/responses.

Optionally, you can avoid sending the HTTP Headers associated to the request using the `APIGATEWAY_GETHEADERS=false` configuration. **This option is not available for AWS agent**.

#### Supporting proxy

If the Amplify platform url is not accessible from the machine where the agents are installed, you must set up proxies:

* Discovery Agent requires an HTTP proxy
* Traceability Agent requires an HTTP proxy and a SOCKS5 proxy

For information, see [Using proxies](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/#using-proxies-api-manager-only).

#### Fixed issues

This version 0.0.17-xxx of the agents provides the following fix:

* Previously, the 403 error was not handled properly by the AWS Traceability Agent due to a misconfiguration of the logging variable by the Discovery Agent. Now, 403 status (security issue on AWS Gateway when using wrong API Key) is visible in API Observer.

### Mesh governance

Amplify Central mesh governance enables you to govern and manage your APIs, public and private services, along with the hybrid environments where they are located.

The Amplify Central mesh governance includes the following enhancements:

* The validated service mesh version has been updated to Istio 1.6.8

    * Istio deployment now uses the **istioctl** tool which needs to be added to your client
    * See the documentation links at the end of this section for details

* A new Mesh Traceability Agent is available

    * A new Mesh Traceability ALS Agent that automatically logs HTTP headers replaces the previous agent
    * This updated mesh agent shares logging logic with the Central SaaS Gateway Access Logging Service (or ALS)
    * The new agent is installed using a new helm agent deployment option: `--set als.enabled=true`

* A new Traceability ALS Agent deployment option to turn HTTP header logging on or off

    * Header logging can be disabled using new helm agent deployment option: `--set als.publishHeaders=false`

* Amplify CLI can now deploy new alpha Mesh Discovery Agents

    * A future version of Amplify Central CLI will include additional support for Mesh Agent installation

    * `amplify central install agents` command will include new **Kubernetes** option

    * **Note**: This new option will preview upcoming changes and does not replace the existing mesh deployment commands for full mesh governance and policy management.

* The alpha Mesh Discovery Agent support provides a new set of agent resources within Amplify Central CLI:

    * **mesh**: this resource (Mesh) represents the connected Kubernetes cluster and its related resources. It provides a bridge from the connected Kubernetes cluster to the Central environment.
    * k8s: this resource (K8sCluster) represents the details of the Kubernetes cluster and provides a reference to the Mesh discovery resources listed below.
    * **k8sres**: this resource (K8SResource) represents Discovery Agent reported raw resources from the Kubernetes cluster. This is controlled by the resdisc resource that defines the configuration of the Mesh Discovery Agent.
    * **resdisc**: this resource (ResourceDiscovery) represents the configuration used by the Mesh Discovery Agent to monitor this connected Kubernetes cluster.  It holds resource and namespace filters that define the matching logic for what will be reported back to Central in the k8sres instances. It also contains configuration for the tags, labels and attributes to be filtered or added to the published k8sres instances.
    * **apispec**: this resource (APISpec) represents Discovery Agent reported API specifications (Swagger2, OAS3, or other) from the Kubernetes cluster. This is controlled by the specdisc resource that defines the configuration of the Mesh Discovery Agent.
    * **specdisc**: this resource (SpecDiscovery) represents the configuration used by the Mesh Discovery Agent to inspect endpoints found in this connected Kubernetes cluster.  It holds resource and namespace filters that define the searching and matching logic for what will be reported back to Central in the apispec instances. It also includes the endpoint searching rules for direct and indirect paths to use trying to resolve a bundled specification for a reported k8sres instance.
    * **More detailed documentation and examples for these Mesh Agent resources will be coming soon**.

* See the updated Mesh Governance documentation at: [Mesh management](/docs/connect_manage_environ/mesh_management)
* See the updated step-by-step deployment details at: <https://github.com/Axway/Setup-Amplify-Mesh-Governance>

### Known limitations

This version of Amplify Central has the following limitations:

* Users that are assigned the Consumer role cannot see their subscription usage on the API Observer screen.  
* Axway Edge Gateway Agents:

    * Discovery Agent can only discover APIs having PassThrough, API Key and Oauth security.
    * Discovery Agent cannot expose discovered APIs in multiple teams, meaning that the Organization structure on API Manager is lost in Central. The API provider has to create the team in Amplify Platform and share the API within appropriate teams.
    * Discovery Agent is not able to detect that an API has been renamed. Consequently, on the Amplify Central side, you will see two APIs: the old one and the new one.
    * Discovery Agent does not handle frontend API deletion. Consequently, Unified Catalog API is out of sync.
    * Traceability Agent is not working in an Externally Managed Topology deployment.

* AWS Gateway agents:

    * Discovery Agent is working with one AWS Region only (the one used when installing the agent).
    * Discovery Agent does not associate the usage plan and API when a subscriber chooses a usage plan that is not already linked to the chosen API.

* Mesh Governance alpha Discovery Agents:

    * The alpha Discovery Agents do not work with the Mesh Traceability Agent.
