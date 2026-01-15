---
title: Connect MuleSoft AnyPoint
linkTitle: Connect MuleSoft AnyPoint
weight: 210
---
Connect MuleSoft AnyPoint and Amplify so you can discover, provision access to, and track usages of MuleSoft AnyPoint API Manager Assets.

## Why do you want to connect MuleSoft AnyPoint and Amplify?

Connecting MuleSoft AnyPoint to Amplify will provide you with a global centralized view of your APIs and their related traffic.

The MuleSoft AnyPoint API Manager Assets can be represented by an Amplify environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents (Discovery and Traceability) interact with MuleSoft and Amplify to:

* Detect changes to API Manager APIs using the Discovery Agent. The Discovery Agent pushes the service configuration as an API service for the environment, which can then be published and used by consumers to subscribe to the service.
* Track API metrics and transactions related to discovered APIs, their consumers, and subscriptions.

### Discovery

On startup, the MuleSoft Discovery Agent first validates that it is able to connect to all required services. Once connected to MuleSoft, the agent begins looking at MuleSoft Anypoint APIs for what it should discover.

After that initial startup process, the Discovery Agent begins running its main discovery process. In this process the agent will look for Active API Manager Assets in MuleSoft. With each active asset found, the agent will determine what credential types are associated with the API based on the policies applied to it. Finally, it will gather the API spec from MuleSoft AnyPoint Exchange prior to publishing to Amplify Engage. If the spec type is unknown by Amplify, the service will have a type of `Unstructured`.

#### OpenID Connect client providers

For integrating the Discovery Agent with any OpenID Connect client providers in MuleSoft the agent will need read access to the client providers in the top level MuleSoft Organization. This will allow the agent to properly setup Marketplace with the supported grant types.

The process the agent takes when associating a MuleSoft Exchange API to a specific client provider is the following.

* For an Exchange API check the configuration for its default client provider
* Given the client provider is not the AnyPoint provider associate a specific client provider ID to the API
* Prior to publishing the API create the necessary request definitions, if not already created, for the client provider, with its supported grant types

### Provisioning

As described in the [Discovery](#discovery) section, the MuleSoft agent creates all supported credential types on Engage during its normal processing. Once API services are published they can be made into Assets and Products via Engage itself. The Products can then be published to the Marketplace for consumption. In order to receive access to the service a user must first request access to it and the MuleSoft agent provisioning process will execute based off of that request.

#### Marketplace application

A Marketplace application is created by a Marketplace user. When a resource within the MuleSoft connected environment is added to that application, Engage will create a ManagedApplication resource that the agent will execute off of. This creation of the ManagedApplication does not immediately trigger an action within MuleSoft, as MuleSoft requires an asset association to create an Application. Continue on the [Access request](#access-request) and [Credential](#credential) sections to learn more.

#### Access request

When a Marketplace user requests access to an API Resource Engage will create an AccessRequest resource within the Engage environment connected to MuleSoft. The MuleSoft agent will see this resource creation event and complete one of the following steps in MuleSoft.

* Determine the MuleSoft client provider for the API in the AccessRequest.
* Check if the MuleSoft Agent has previously created a MuleSoft application for the Marketplace application and client provider combination
    * If the Application does not yet exist, the agent will create a MuleSoft application for the client provider. This process will use the values given in Marketplace for setting the proper grant types in the MuleSoft application.
* Once the application has been found or created the agent will finally associate the API to the MuleSoft application.

{{< alert title="Note" color="primary" >}}The MuleSoft agent currently only supports the OpenID Connect Token policy in MuleSoft for Open ID Connect client providers.{{< /alert >}}

#### Credential

Finally, when a Marketplace user requests a credential for a resource that belongs to a MuleSoft environment, Engage will create a Credential resource in the same Engage environment connected to MuleSoft. The agent receives this event and retrieves the client id and secret from the  MuleSoft Application for the expected client provider returning it to Engage.

### Traceability

The Traceability Agent is used to gather API Metric data using the  MuleSoft AnyPoint Archive API. The data returned by the [MuleSoft AnyPoint Monitoring API](https://anypoint.mulesoft.com/exchange/portals/anypoint-platform/f1e97bc6-315a-4490-82a7-23abe036327a.anypoint-platform/anypoint-monitoring-archive-api/) is then used to determine the Amplify Engage API and Application context for associating metrics to specific Marketplace Applications.

The Traceability Agent may also utilize the [MuleSoft AnyPoint Monitoring Metrics API](https://anypoint.mulesoft.com/exchange/portals/anypoint-platform/f1e97bc6-315a-4490-82a7-23abe036327a.anypoint-platform/metrics-api/) for compiling the same data, the archive API is the default behavior. See `MULESOFT_USEMONITORINGAPI` in the [Common variables to both agents](agent_variables#common-variables-to-both-agents) table.

## Prerequisites

* An Axway Amplify subscription in the Amplify platform
* A Platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html/#managing-service-accounts)
* An Amplify environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments/)
* Access to MuleSoft to retrieve details needed for the agents
* A connected app using the **client credentials** grant type that impersonates the agent. This app requires the following scopes:
    **Discovery Agent**
        - **View Environments in a Particular Organization** – Retrieve environments
        - **View APIs Configuration** – Retrieve APIs (agent-configured environments must be selected)
        - **View Policies** – Retrieve policies (agent-configured environments must be selected)
        - **Manage Contracts** – Create SLA tiers (agent-configured environments must be selected)
        - **Manage Client Applications** – Retrieve and delete client applications
        - **Application Creator** – Create client applications
        - **Exchange Creator** – Create contracts and retrieve Exchange assets

    **Traceability Agent**
        - **View Policies** – Retrieve monitoring metrics (agent-configured environments must be selected)

## System requirements

* An environment to run the agent Docker containers.

## Region support

Amplify supports three regions: US (default), EU, and APAC. The data (i.e., APIs) that the Discovery Agent sends to Amplify is stored in one of those regions based on the agent configuration.

Use one of the following URLs to access the Amplify UI:

* US: [https://apicentral.axway.com](https://apicentral.axway.com)
* EU: [https://central.eu-fr.axway.com](https://central.eu-fr.axway.com)
* APAC: [https://central.ap-sg.axway.com](https://central.ap-sg.axway.com)

Use one of the following settings, for the Discovery Agent, to set the region the agent will connect to:

* `CENTRAL_REGION`= **US**
* `CENTRAL_REGION`= **EU**
* `CENTRAL_REGION`= **AP**

{{< alert title="Note" color="primary" >}}`CENTRAL_REGION` is part of agents released after June 5, 2024. See [CENTRAL_REGION setting](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/#central_region-setting) for the variables that `CENTRAL_REGION` sets.{{< /alert >}}

## Related topics

See the following topics for related information.
