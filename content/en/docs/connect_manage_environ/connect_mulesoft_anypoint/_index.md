---
title: Connect MuleSoft AnyPoint
linkTitle: Connect MuleSoft AnyPoint
weight: 210
---
Connect MuleSoft AnyPoint and Amplify so you can govern and monitor the creation of the MuleSoft AnyPoint APIs in one central location.

## Why do you want to connect MuleSoft AnyPoint and Amplify?

Connecting MuleSoft AnyPoint to Amplify will provide you with a global, centralized view of your APIs.

MuleSoft AnyPoint can be represented by an Amplify environment, allowing you to better filter APIs. Supplied with the environment, the Discovery Agent interacts with MuleSoft AnyPoint and Amplify to detect changes to MuleSoft AnyPoint APIs using the Discovery Agent. The Discovery Agent pushes the service configuration as an API service for the environment, which can then be published and used by consumers to subscribe to the service.

### Discovery

The Discovery Agent is used to discover new published APIs for a specific MuleSoft AnyPoint Software Catalog. The Discovery Agent pushes all API definitions from MuleSoft AnyPoint to Amplify. If the spec type is unknown by Amplify, the service will have a type of `Unstructured`.

The related APIs are published to Amplify as an API service in the selected environment.

#### OpenID Connect Client Providers

For integrating the Discovery Agent with any OpenID Connect Client Providers in MuleSoft the agent will need read access to the Client Providers in the top level MuleSoft Organization. This will allow the agent to properly setup Marketplace with the supported grant types.

The process the agent takes to associate a MuleSoft Exchange API to a specific Client Provider is the following.

* For an Exchange API check the configuration for its default Client Provider
* Given the Client Provider is not the AnyPoint provider associate a specific Client Provider ID to the API
* Prior to publishing the API create the necessary request definitions, if not already created, for the Client Provider, with its supported grant types

Once the agent has discoverd APIs with a Client Provider they can by published through the Marketplace. Then the agent handles provisioning as follows.

* For each API in a Marketplace application, create a MuleSoft application for each unique Client Provider
* Associate APIs to their proper MuleSoft Application based on the Client Provider
* Return the Client ID and Secret to Marketplace for the proper MuleSoft Application

### Traceability

The Traceability Agent is used to gather API Metric data using the  MuleSoft AnyPoint Archive API. The data returned by the [MuleSoft AnyPoint Monitoring API](https://anypoint.mulesoft.com/exchange/portals/anypoint-platform/f1e97bc6-315a-4490-82a7-23abe036327a.anypoint-platform/anypoint-monitoring-archive-api/) is then used to determine the Amplify Engage API and Application context for associating metrics to specific Marketplace Applications.

The the Traceability Agent may also utilize the [MuleSoft AnyPoint Monitoring Metrics API](https://anypoint.mulesoft.com/exchange/portals/anypoint-platform/f1e97bc6-315a-4490-82a7-23abe036327a.anypoint-platform/metrics-api/) for compiling the same data, the archive API is the default behavior. See `MULESOFT_USEMONITORINGAPI` in the [Common variables to both agents](agent_variables.md#common-variables-to-both-agents) table.

## Prerequisites

* An Axway Amplify subscription in the Amplify platform
* A Platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html/#managing-service-accounts)
* An Amplify environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments/)
* Access to MuleSoft to retrieve details from the service and CLI Toolkit

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

## Connect to MuleSoft

The Discovery Agent will use the credentials provided. If MuleSoft requires no authentication, credentials are optional.

## Gather the required values from MuleSoft

* MuleSoft AnyPoint Exchange URL
* MuleSoft Environment name to discover and track transactions from (e.g. Sandbox)
* MuleSoft AnyPoint Business Unit the agent connects to
* MuleSoft Username and Password or Client ID and Secret
    * If using a Client ID and Secret then a MuleSoft App Integration will need to be created

## Set up environment variables

The following environment variables file must be created for executing both the Discovery and Traceability agents.

```ini
CENTRAL_ORGANIZATIONID=<Amplify Central Organization ID>
CENTRAL_TEAM=<Amplify Central Team Name>
CENTRAL_ENVIRONMENT=<Amplify Central Environment Name>   # created in Prepare AMPLIFY Central Environments step

CENTRAL_AUTH_CLIENTID=<Amplify Central Service Account>  # created in Prepare AMPLIFY Central Environments step
CENTRAL_AUTH_PRIVATEKEY=/keys/private_key.pem            # path to the key file created with openssl
CENTRAL_AUTH_PUBLICKEY=/keys/public_key.pem              # path to the key file created with openssl

MULESOFT_ANYPOINTEXCHANGEURL=https://mulesoftexhange.com # gathered in Prepare MuleSoft step
MULESOFT_AUTH_USERNAME=username                          # gathered in Prepare MuleSoft step
MULESOFT_AUTH_PASSWORD=password                          # gathered in Prepare MuleSoft step
MULESOFT_ENVIRONMENT=Sandbox                             # gathered in Prepare MuleSoft step
MULESOFT_ORGNAME=Unit                                    # gathered in Prepare MuleSoft step

LOG_LEVEL=info
LOG_OUTPUT=stdout
```

## Install and run Discovery and Traceability agents

The MuleSoft AnyPoint Discovery and Traceability agents are built and distributed as docker images. The following steps must be done for both agents.

1. Copy the `private_key.pem` and `public_key.pem` files that were originally created when you set up your Service Account to a keys directory. Make sure the directory is located on the machine being used for deployment.
2. Find the current agent release in the [agent release note](/docs/amplify_relnotes).
   Go to *Help menus > Downloads > Repository*
     -or-
   Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents)
   and search for the Docker image for the most recent agents to download as `{agentImage}`.
   Then replace `{agentImage}` with the current agent release in the following sections.
3. Create a data directory where the agent will store cache data to persist on restarts.
4. Start the Discovery Agent pointing to the `env_vars` file and the keys directory:

    ```bash
    docker run --env-file ./env_vars -v <pwd>/keys:/keys  -v <pwd>/data:data {agentImage}
    ```

    `pwd` relates to the local directory where the docker command is run. For Windows, the absolute path is preferred.

5. Run the following health check command to ensure the agent is up and running (continuous mode):

   ```bash
   docker inspect --format='{{json .State.Health}}' <container>
   ```

## Related topics

See the following topics for related information.
