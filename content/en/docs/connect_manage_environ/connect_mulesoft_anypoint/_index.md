---
title: Connect MuleSoft AnyPoint
linkTitle: Connect MuleSoft AnyPoint
weight: 120
---
Connect MuleSoft AnyPoint and Amplify so you can govern and monitor the creation of the MuleSoft AnyPoint APIs in one central location.

## Why do you want to connect Backstage and Amplify?

Connecting MuleSoft AnyPoint to Amplify will provide you with a global, centralized view of your APIs.

MuleSoft AnyPoint can be represented by an Amplify environment, allowing you to better filter APIs. Supplied with the environment, the Discovery Agent interacts with MuleSoft AnyPoint and Amplify to detect changes to MuleSoft AnyPoint APIs using the Discovery Agent. The Discovery Agent pushes the service configuration as an API service for the environment, which can then be published and used by consumers to subscribe to the service.

### Discovery

The Discovery Agent is used to discover new published APIs for a specific MuleSoft AnyPoint Software Catalog. The Discovery Agent pushes all API definitions from MuleSoft AnyPoint to Amplify. If the spec type is unknown by Amplify, the service will have a type of `Unstructured`.

The related APIs are published to Amplify as an API service in the selected environment.

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

The following environment variables file should be created for executing both the Discovery and Traceability agents.

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

## Execute the Discovery Agent

The MuleSoft AnyPoint Discovery Agent is built and distributed as a docker image. To execute the agent using the image, execute the following command. Update the version in the example below.

```shell
docker run --env-file env_vars -v `pwd`/keys:/keys ghcr.io/axway/mulesoft_discovery_agent:v1.2.2
```

## Execute the Traceability Agent

The MuleSoft AnyPoint Traceability Agent is built and distributed as a docker image. To execute the agent using the image, execute the following command. Update the version in the examples below.

```shell
docker run --env-file env_vars -v `pwd`/keys:/keys -v `pwd`/data:/data ghcr.io/axway/mulesoft_traceability_agent:v1.2.6
```

## Related topics

See the following topics for related information.
