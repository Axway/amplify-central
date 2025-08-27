---
title: Connect Kong
linkTitle: Connect Kong
weight: 120
---
Connect Kong and Amplify so you can discover, provision access to, and track usages of Kong gateway routes.

## Why do you want to connect Apigee Edge and Amplify?

Connecting Kong to Amplify will provide you with a global centralized view of your APIs and their related traffic.

The Kong gateway can be represented by an Amplify environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents (Discovery and Traceability) interact with Kong and Amplify to:

* Detect changes to Kong APIs using the Discovery Agent. The Discovery Agent pushes the service configuration as an API service for the environment, which can then be published and used by consumers to subscribe to the service.
* Track API metrics and transactions related to discovered APIs, their consumers, and subscriptions.

### Discovery

On startup, the Kong Discovery Agent first validates that it is able to connect to all required services. Once connected to Kong, the agent begins looking at the plugins configured, more specifically for the ACL. The default option is to require having it. This can be changed from the config by disabling this check. By having the check disabled, it is assumed that access is allowed for everyone. Then the agent will determine, from the plugins, which credential types the Kong gateway has configured and create the Engage representation of those types.

After that initial startup process the Discovery Agent begins running its main discovery loop. In this loop the agent first gets a list of all gateway services. With each service the agent looks for all configured routes. The agent then looks to gather the specification file, see [Specification discovery methods](#specification-discovery-methods), if found the process continues. Using the route the agent checks for plugins to determine the types of credentials to associate with it. After gathering all of this information the agent creates a new API service with the specification file and linking the appropriate credentials. The endpoints associated to the API service are constructed using the **KONG_PROXY_HOST**, **KONG_PROXY_PORTS_HTTP**, and **KONG_PROXY_PORTS_HTTPS** settings.

### Provisioning

As described in the [Discovery](#discovery) section, the Kong agent creates all supported credential types on Engage at startup. Once API services are published they can be made into Assets and Products via Engage itself. The Products can then be published to the Marketplace for consumption. In order to receive access to the service a user must first request access to it and the Kong agent provisioning process will execute based off of that request.

#### Marketplace application

A Marketplace application is created by a Marketplace user. When a resource within the Kong environment is added to that application, Engage will create a ManagedApplication resource that the agent will execute off of. This ManagedApplication resource event is captured by the Kong agent and the agent creates a Kong consumer. In addition to the creation of the consumer, the agent adds an ACL Group ID to the consumer to be used by the access request.

#### Access request

If the ACL plugin is not required, access request is skipped. When a Marketplace user requests access to a resource within the Kong environment, Engage will create an AccessRequest resource in the same Kong environment. The agent receives this event and makes several changes within Kong. First, the agent will add or update an ACL configuration on the Route being requested. This ACL will allow the Group ID created during the handling of the [Marketplace application](#marketplace-application) access to the route. Additionally, if a quota for this route has been set in Engage, in the product being handled the agent will add a Rate limiting plugin to reflect the quota that was set in Engage for that product.

{{< alert title="Note" color="primary" >}}Quotas in Engage can have a Weekly amount, this is not supported by Kong and the agent will reject the access request.{{< /alert >}}

#### Credential

Finally, when a Marketplace user requests a credential within the Kong environment, Engage will create a Credential resource in the same Kong environment. The agent receives this event and creates the proper credential type for the consumer that the [Marketplace application](#marketplace-application) handling created. After successfully creating this credential the necessary details are returned back to the Engage to be viewed and used by the Marketplace user.

### Traceability

On startup the Kong traceability agent first validates that it is able to connect to all required services. Once validation is complete the agent begins listening for log events to be sent to it. The agent receives these events and iterates through them to determine if any of the events should be sampled. If it is to be sampled the agent creates a transaction summary and leg sending that the Amplify Engage. Regardless of the event being set for sampling the agent will update the proper API Metric and Usage details to be sent to Amplify Engage on the interval configured. See [Usage](/docs/connect_manage_environ/connected_agent_common_reference/traceability_usage/index.html).

{{< alert title="Note" color="primary" >}}If the ACL plugin is not required, the traceability agent cannot associate API traffic with a consumer application.{{< /alert >}}

## Prerequisites

* An Axway Amplify subscription in the Amplify platform
* A Platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html/#managing-service-accounts). Set the following:
    * Name: *Kong Agents*, for example
    * Description: optional
    * Tags: optional
    * Method: *Client Certificate*
    * Credentials: *Platform-generated key pair*
    * Org Roles: *Administrator* and *Central Admin*
    * Teams: Do not set any
* An Amplify environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments/). Set the following:
    * Environment Name: *Kong Gateway*, for example
    * Environment Type: *Custom/SDK*
    * Custom Type: *Kong*
    * Production: set the appropriate value
    * Governance: *Customer Managed*
    * Description: optional
    * Profile Image/Icon: optiona
* Access to Kong to retrieve details from the service and CLI Toolkit

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

## Connect to Kong

The Discovery Agent will use the credentials provided. If Kong requires no authentication, credentials are optional.

The Discovery agent expects that the Kong gateway utilizes the [ACL](https://docs.konghq.com/hub/kong-inc/acl/) plugin to control access to the various routes provided in the Kong gateway. On startup the agent checks that this plugin is in use prior to performing any discovery. The agent then uses this plugin while provisioning access to routes in Kong. See [Provisioning](#provisioning).

### Kong Admin API secured by Kong Gateway

See [Kong - Securing the Admin API](https://docs.konghq.com/gateway/latest/production/running-kong/secure-admin-api/).

After following the procedures above, the Kong Admin API can be secured using any authentication method that Kong provides. In this section you will learn the authentication types that the Kong agents support. As well as how to retrieve the values needed for the Kong agents.

Once the Kong Admin API is secured, a gateway service for it must be added to Kong and then a route configured to access the gateway service. After adding those configurations, the following authentication may be added to the route. Then create a consumer, in Kong, for the agent and add credentials for that consumer. Note these credentials for later.

* Basic authentication
* API Key authentication
* OAuth2 authentication (currently, Kong returns an Internal Server Error if securing the admin api with OAuth2. The plugin can be created in Kong, but further requests will not work when receiving the token. The Agent is also configured to not work with OAuth2).

### Specification discovery methods

In order to publish a specification file that properly represents the gateway service configured in Kong, Discovery Agent supports two types of specification discovery methods. The first is a local directory, to the Kong agent, that specification files are saved in. The other is a list of URL paths that the Kong agent will query to attempt to find the specification file/

#### Local specification path

The local specification discovery method is configured by providing a value for the `KONG_SPEC_LOCALPATH` variable. When set, the Kong agent will look for a tag on each of the available gateway services that are prefixed by `spec_local_`. When that tag is set to the value, after stripping the prefix, it is used to find the specification file in the directory configured by `KONG_SPEC_LOCALPATH`. When this configuration value is set, no other specification discovery methods will be used.

Files on disk

```shell
> ls -l /path/to/specfiles
petstore.json
my-service.yaml
```

Configuration for agent

```shell
KONG_SPEC_LOCALPATH=/path/to/specfiles
```

Configuration on my-service gateway service

```json
{
...
"tags": [
  "tag1",
  "tag2",
  "spec_local_my-service.yaml",
  "tag3"
]
...
}
```

##### Filtering gateway services

Some possible ways to use the filter for gateway services (all these are done with the env var `KONG_SPEC_FILTER`):

* "tag.Any() == \"spec_local_petstore.json\""  - This will find all the services that have a tag as "spec_local_petstore.json"
* "tag.discover.Exists()" - This will find all tags that are equal to "discover"

{{< alert title="Note" color="primary" >}}while both ways can achieve the same functionality, the first one is preferred because it does not restrict you on character usages for Kong tags (note the dot in the second example){{< /alert >}}

Currently, functionalities such as tag.Any().Contains() are not implemented in the SDK and only fully equal values are taken into account.

#### URL specification paths

The URL specification paths discovery method is configured by value(s) for the `KONG_SPEC_URLPATHS` variable, comma separated. When values are set here, and a local path is not set, the Kong agent will query each of these paths against the gateway service in order to find a specification file. Once a specification file is found, none of the other configured URL paths will be queried, as that specification file will be used in the creation of the API Service on Engage.

Configuration for agent

```shell
KONG_SPEC_URLPATHS=/openapi.json,/swagger.json
```

#### Kong Dev Portal

The Kong Dev Portal discovery method is configured by providing a value for the `KONG_SPEC_DEVPORTALENABLED`, but also the local spec discovery needs to be disabled by setting an empty value for the`KONG_SPEC_LOCALPATH`, otherwise, the local discovery process will be used.

Configuration for agent

```shell
KONG_SPEC_LOCALPATH=""
KONG_SPEC_DEVPORTALENABLED=true
```

### HTTP Log plugin

The Traceability Agent utilizes Kong's HTTP log plugin to track transactions. In order to set this up the plugin will have to be added, globally, and configured to send to the endpoint that the Traceability Agent will listen on

1. Navigate to the Plugins page
2. Click **+ New Plugin**.
3. In the list of plugins, find *HTTP Log* and click **enable**.
4. Ensure *Global* is selected so the agent receives events for all traffic.
5. Enter the following, all can be customized as necessary for your infrastructure, [HTTP Log](https://docs.konghq.com/hub/kong-inc/http-log/configuration/).
    * An Instance Name (optional)
    * Tags (optional)
    * content_type - `applicaiton/json`
    * custom_fields_by_lua - empty
    * flush_timeout - empty
    * headers - empty
    * http_endpoint - the endpoint the agent will listen on (ie. `http://traceability.host:9000/requestlogs`)
    * keepalive - `60000`
    * method - `POST`
    * queue.initial_retry_delay - `0.01`
    * queue.max_batch_size - `1000`
    * queue.max_bytes - empty
    * queue.max_coalescing_delay - `10`
    * queue.max_entries - `100000`
    * queue.max_retry_delay - `60`
    * queue.max_retry_time - `60`
    * queue_size - empty
    * retry_count - empty
    * timeout - `10000`
6. Click **Install**.

Kong is now set up to send transactions to the Traceability Agent.

### Set up environment variables

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