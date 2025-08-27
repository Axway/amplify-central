---
title: Connect Apigee Edge
linkTitle: Connect Apigee Edge
weight: 110
---
Connect Apigee Edge and Amplify so you can govern and monitor the creation of the Apigee Edge APIs in one central location.

## Why do you want to connect Apigee Edge and Amplify?

Connecting Apigee Edge to Amplify will provide you with a global, centralized view of your APIs.

Apigee Edge can be represented by an Amplify environment, allowing you to better filter APIs. Supplied with the environment, the Discovery Agent interacts with Apigee Edge and Amplify to detect changes to Apigee Edge APIs using the Discovery Agent. The Discovery Agent pushes the service configuration as an API service for the environment, which can then be published and used by consumers to subscribe to the service.

## Prerequisites

* An Axway Amplify subscription in the Amplify platform
* A Platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html/#managing-service-accounts)
* An Amplify environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments/)
* Access to Apigee Edge to retrieve details from the service and CLI Toolkit

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

## Prepare Apigee

* Create an Apigee account. The Discovery Agent will use the credentials provided. If Apigee Edge requires no authentication, credentials are optional.

* Add a developer that will be the owner of all applications created by the agent.

## Set up environment variables

The following environment variables file must be created for executing both the Discovery and Traceability agents.

```ini
CENTRAL_ORGANIZATIONID=<Amplify Central Organization ID>
CENTRAL_TEAM=<Amplify Central Team Name>
CENTRAL_ENVIRONMENT=<Amplify Central Environment Name>   # created in Prerequisite steps

CENTRAL_AUTH_CLIENTID=<Amplify Central Service Account>  # created in Prerequisite steps
CENTRAL_AUTH_PRIVATEKEY=/keys/private_key.pem            # path to the key file created with openssl
CENTRAL_AUTH_PUBLICKEY=/keys/public_key.pem              # path to the key file created with openssl

APIGEE_ORGANIZATION=<Apigee Organization>                # created in Prepare Apigee step
APIGEE_DEVELOPERID=dev@email.address                     # created in Prepare Apigee step
APIGEE_AUTH_USERNAME=<Apigee Username>                   # created in Prepare Apigee step
APIGEE_AUTH_PASSWORD=<Apigee Password>                   # created in Prepare Apigee step
APIGEE_AUTH_URL=<IDP URL>                                # The IDP the agent should request an auth token from for Apigee API Access (default: https://login.apigee.com)
APIGEE_AUTH_SERVERUSERNAME=<Auth Server Username>        # The username for requesting a token from the IDP server (default: edgecli)
APIGEE_AUTH_SERVERPASSWORD=<Auth Server Password>        # The password for requesting a token from the IDP server (default: edgeclisecret)

LOG_LEVEL=info
LOG_OUTPUT=stdout
```

## Install and run Discovery and Traceability agents

The Apigee Discovery and Traceability agents are built and distributed as docker images. The following steps must be done for both agents.

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
