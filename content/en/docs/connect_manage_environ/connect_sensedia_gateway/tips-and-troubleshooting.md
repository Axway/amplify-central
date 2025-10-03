---
title: Get help with Connected Sensedia Gateway
linkTitle: Get help with Connected Sensedia Gateway
draft: false
weight: 55
---
Troubleshooting and error codes that you may encounter while working with the connected managed environment for Sensedia API Gateway within Amplify.

## Troubleshooting

This section describes the common error cases you can encounter when using agents for the first time. If your error is not listed, please check the [Understand the agent log](/docs/connect_manage_environ/connect_sensedia_gateway/tips-and-troubleshooting/#understand-the-agent-logs) and [Error Codes and Mitigations](/docs/connect_manage_environ/connect_sensedia_gateway/tips-and-troubleshooting/#error-codes-and-mitigations) sections.

| Question                                                                            | Answer                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Why isn't my API discovered?                                                        | Check that the API meets the filter criteria set in the `SENSEDIA_FILTER` variable. Verify that the API is deployed to a configured environment and has the expected tags or properties. Example working filter: `tag.Axway_axway.Exists()`                                                |
| Why can't my agents connect to Sensedia API Gateway?                                | Check that the `SENSEDIA_BASEURL` is correct and accessible. Verify that `SENSEDIA_AUTH_CLIENTID` and `SENSEDIA_AUTH_CLIENTSECRET` are valid and not expired. Ensure the Docker container has network connectivity to the Sensedia platform.                                                        |
| Why can't my agents connect to Sensedia API Gateway?                                | Check that the `SENSEDIA_PLATFORM_URL` is correct and accessible. Verify that `SENSEDIA_CLIENT_ID` and `SENSEDIA_CLIENT_SECRET` are valid and not expired. Ensure the Docker container has network connectivity to the Sensedia platform.                                                                                                                                  |
| Why can't my agents connect to Amplify?                                             | Go to Amplify > Organization > Service Accounts and make sure that the Service Account is correctly named and valid in `CENTRAL_AUTH_CLIENTID` variable. Also make sure that the organizationID (`CENTRAL_ORGANIZATIONID`) is correct.                                                                                                                                        |
| Why don't I see traffic in Amplify Business Insights?                               | Make sure that the `TRACEABILITY_HOST` and `TRACEABILITY_PORT` are accessible from the Docker container where Traceability Agent is running. If you are using a proxy (`TRACEABILITY_PROXYURL`), make sure the connections are opened correctly. Refer to [Communication ports](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/#communication-ports). |
| Why isn't my agent status displayed in the environment details page?                | It is possible that your agents and their corresponding resources are not linked together. Follow [this procedure](/docs/connect_manage_environ//environment_agent_resources) to ensure the correct usage of agent resources.                                                                                                                                                 |
| Why is my Traceability Agent receiving EOF errors while sending transaction events? | It is possible that the number of `TRACEABILITY_WORKER` is set too high. Lower the number of configured workers.                                                                                                                                                                                                                                                              |
| Why are no APIs being discovered even though they exist in Sensedia?               | Check if the APIs are deployed to environments listed in `SENSEDIA_ENVIRONMENTS`. Verify that the discovery filter is not too restrictive. Ensure that `SENSEDIA_DISCOVERY_PRIVATE_APIS` and `SENSEDIA_DISCOVERY_IDENTITY_APIS` are set correctly based on your API types.                                                                                                  |
| Why are credential requests failing?                                                | Verify that the Sensedia application exists and is in "APPROVED" status. Check that the application has been properly created with the configured developer email. Ensure that the client has permission to access the deobfuscation endpoint.                                                                                                                             |
| Why are access requests not being processed correctly?                              | Check that the API exists in Sensedia and is accessible. Verify that rate limiting configuration is valid. Ensure that the application can be updated with the new API association.                                                                                                                                                                                         |

## Understand the agent logs

Each log is displayed in a JSON format following this pattern: {"level":"info|debug|trace|warn","msg":"messageFromTheAgentGoesHere","time":"messageTimestamp"}

The agent logging mechanism is based on logrus (<https://github.com/sirupsen/logrus>) and can display several levels of information:

* **info** (default): informative log about the agent activity (start, stop, discovering API, publishing traffic, etc.).
* **debug**: same as info level plus some troubleshooting information (healthcheck, connection to Amplify / Gateway, etc.).
* **trace**: same as debug plus all information related to API call (action / duration / return code / endpoint).

The log level definition is provided using the `LOG_LEVEL` variable set in the agent configuration file.

Agent logs are written to the Docker container's stdout and can be viewed using standard Docker logging commands:

```shell
# View Discovery Agent logs
docker logs <discovery-agent-container-id>

# View Traceability Agent logs
docker logs <traceability-agent-container-id>

# Follow logs in real-time
docker logs -f <container-id>
```

{{< alert title="Note" color="primary" >}}If you change any configuration, you must restart your Docker containers to use the new configuration settings.{{< /alert >}}

## Error Codes and Mitigations

In case an error is encountered, the agent will automatically log it based on the logging definition.

The error message format is: `Component - [Error Code _ErrorCode_] error message`.

Below is the list of error codes and possible remediations.

| Code # | Description                                                                                                                                          | Mitigation                                                                                                                                                                                                                                                                                       |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|        | **Amplify Agent SDK errors**                                                                                                                         |                                                                                                                                                                                                                                                                                                  |
| 1001   | initialization error checking for dependencies to respond, possibly network or settings                                                              | Typically, a previous error in the log is displayed. See [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/) and [Reference - Agent configuration](/docs/connect_manage_environ/connect_sensedia_gateway/deploy-your-agents-with-amplify-cli/). |
| 1004   | error starting status update job                                                                                                                     | Internal system error. Contact your system administrator.                                                                                                                                                                                                                                        |
| 1005   | error starting agent version checker                                                                                                                 | Build version is missing or of noncompliant semantic versioning. Check the build version of your agent.                                                                                                                                                                                          |
| 1007   | grpc client is not connected to CENTRAL                                                                                                              | Check `CENTRAL_URL` configuration. See [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/) and make sure your outbound rules enable the connection to this url.                                                             |
| 1008   | harvester client is not connected to CENTRAL                                                                                                         | Check `CENTRAL_URL` configuration. See [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/) and make sure your outbound rules enable the connection to this url.                                                             |
| 1100   | general configuration error in CENTRAL                                                                                                               | `CENTRAL_AGENTNAME` is set but corresponding resources do not exist. Either [create agent resources](/docs/connect_manage_environ//environment_agent_resources) or remove the `CENTRAL_AGENTNAME` variable.                                                                                      |
| 1101   | error attempting to query for ENVIRONMENT                                                                                                            | Check that the Environment Name (`CENTRAL_ENVIRONMENT`) in configuration matches the name on Amplify Engage.                                                                                                                                                                             |
| 1102   | could not find specified team in Amplify Engage, check CENTRAL_TEAM                                                                          | Check that the Team Name (`CENTRAL_TEAM`) in configuration matches the name on Amplify Engage.                                                                                                                                                                                           |
| 1110   | connection to Amplify Engage failed                                                                                                          | Check `CENTRAL_URL` configuration. See [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/) and make sure your outbound rule enable the connection to this url.                                                              |
| 1120   | request to Amplify Engage failed                                                                                                             | A request is not processed correctly. Set `LOG_LEVEL=trace` in agent configuration to retrieve the failing request and help diagnose the issue.                                                                                                                                                  |
| 1130   | request to get authentication token failed                                                                                                           | Check the `CENTRAL_AUTH_*` configuration (ClientId, Private and Public keys). Verify that you can connect to platform.axway.com. See [Administer network traffic](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/).                                   |
| 1131   | token retrieved but was invalid on request to Amplify Engage                                                                                 | The token to communicate with Platform is not valid. The agent will try to get a new token. Check the `CENTRAL_AUTH_*` configuration (ClientId, Private and Public keys). See [Reference - Agent configuration](/docs/connect_manage_environ/connect_sensedia_gateway/deploy-your-agents-with-amplify-cli/).         |
| 1139   | couldn't find a subscriber email address based on the ID in the subscription event                                                                   | The user requesting this subscription may not have an email address set. |
| 1147   | error parsing filter in configuration. Syntax error                                                                                                  | See [Discover APIs](/docs/connect_manage_environ/connect_sensedia_gateway/filtering-apis-to-be-discovered/).                                                                                                                                                                                        |
| 1148   | error parsing filter in configuration. Unrecognized expression                                                                                       | See [Discover APIs](/docs/connect_manage_environ/connect_sensedia_gateway/filtering-apis-to-be-discovered/).                                                                                                                                                                                        |
| 1149   | error parsing filter in configuration                                                                                                                | See [Discover APIs](/docs/connect_manage_environ/connect_sensedia_gateway/filtering-apis-to-be-discovered/).                                                                                                                                                                                        |
| 1150   | error parsing filter in configuration. Invalid call argument                                                                                         | See [Discover APIs](/docs/connect_manage_environ/connect_sensedia_gateway/filtering-apis-to-be-discovered/).                                                                                                                                                                                        |
| 1151   | error parsing filter in configuration. Invalid selector type                                                                                         | See [Discover APIs](/docs/connect_manage_environ/connect_sensedia_gateway/filtering-apis-to-be-discovered/).                                                                                                                                                                                        |
| 1152   | error parsing filter in configuration. Invalid selector expression                                                                                   | See [Discover APIs](/docs/connect_manage_environ/connect_sensedia_gateway/filtering-apis-to-be-discovered/).                                                                                                                                                                                        |
| 1153   | error parsing filter in configuration. Invalid operator                                                                                              | See [Discover APIs](/docs/connect_manage_environ/connect_sensedia_gateway/filtering-apis-to-be-discovered/).                                                                                                                                                                                        |
| 1154   | error parsing filter in configuration. Unrecognized condition                                                                                        | See [Discover APIs](/docs/connect_manage_environ/connect_sensedia_gateway/filtering-apis-to-be-discovered/). |
| 1160   | error getting endpoints for the API specification                                                                                                    | Verify that the OpenAPI Specification for the discovered API has available endpoints and operations on each endpoint.                                                                                                                                                                            |
| 1161   | error deleting API service for catalog item in Amplify Engage                                                                                | Verify that the catalog item exists in Amplify Engage.                                                                                                                                                                                                                                   |
| 1162   | error deleting catalog item in Amplify Engage                                                                                                | Verify that the catalog item exists in Amplify Engage.                                                                                                                                                                                                                                   |
| 1163   | error retrieving API service resource instances                                                                                                      | Verify that the service exists in Amplify Engage.                                                                                                                                                                                                                                        |
|        | **Specific errors for Sensedia Discovery agents**                                                                                                    |                                                                                                                                                                                                                                                                                                  |
| 3001   | sensedia platform URL must be set in the configuration                                                                                               | Check that `SENSEDIA_BASEURL` is set in the configuration. See [Reference - Agent configuration](/docs/connect_manage_environ/connect_sensedia_gateway/deploy-your-agents-with-amplify-cli/).                                                                                              |
| 3002   | sensedia client ID must be set in the configuration                                                                                                  | Check that `SENSEDIA_AUTH_CLIENTID` is set in the configuration. See [Reference - Agent configuration](/docs/connect_manage_environ/connect_sensedia_gateway/deploy-your-agents-with-amplify-cli/).                                                                                                 |
| 3003   | sensedia client secret must be set in the configuration                                                                                              | Check that `SENSEDIA_AUTH_CLIENTSECRET` is set in the configuration. See [Reference - Agent configuration](/docs/connect_manage_environ/connect_sensedia_gateway/deploy-your-agents-with-amplify-cli/).                                                                                             |
| 3100   | failed to authenticate with Sensedia platform                                                                                                        | Check that `SENSEDIA_AUTH_CLIENTID` and `SENSEDIA_AUTH_CLIENTSECRET` are valid. Verify network connectivity to the Sensedia platform.                                                                                                                                                                   |
| 3101   | failed to refresh authentication token                                                                                                               | The authentication token has expired and could not be refreshed. Check credentials and network connectivity.                                                                                                                                                                                     |
| 3200   | error getting a list of APIs from Sensedia                                                                                                           | Check Sensedia Setup and API Manager access. Verify that the client has permission to access the API Manager endpoints.                                                                                                                                                                          |
| 3201   | error getting a specific API from Sensedia                                                                                                           | Check that the API exists in Sensedia and is accessible with the configured credentials.                                                                                                                                                                                                         |
| 3202   | error getting API specification from Sensedia                                                                                                        | Check that the API revision exists and has a valid OpenAPI specification.                                                                                                                                                                                                                         |
| 3203   | error getting environments from Sensedia                                                                                                             | Check that the client has permission to access environment information.                                                                                                                                                                                                                           |
| 3300   | failed to process subscription request. Cannot find API related to ID                                                                                | Could not find the API on Sensedia related to this Catalog Item. It may have been removed from Sensedia.                                                                                                                                                                                         |
| 3301   | failed to create application in Sensedia                                                                                                             | Check Sensedia permissions and that the developer email is valid.                                                                                                                                                                                                                                 |
| 3302   | failed to create plan for API in Sensedia                                                                                                            | Check that the API exists and that the client has permission to create plans.                                                                                                                                                                                                                     |
| 3303   | failed to add API to application in Sensedia                                                                                                         | Check that both the API and application exist and that the association is valid.                                                                                                                                                                                                                  |
| 3304   | failed to get application credentials from Sensedia                                                                                                  | Check that the application exists and that the client has permission to access the deobfuscation endpoint.                                                                                                                                                                                       |
|        | **Specific errors for Sensedia Traceability agents**                                                                                                 |                                                                                                                                                                                                                                                                                                  |
| 3500   | error getting call logs from Sensedia                                                                                                                | Check Sensedia Setup and permissions for accessing call logs. Verify network connectivity to the Sensedia platform.                                                                                                                                                                              |
| 3501   | error processing call log data                                                                                                                       | Internal processing error. Check agent logs for more details and contact support if the issue persists.                                                                                                                                                                                          |
| 3502   | error mapping environment names to IDs                                                                                                               | Check that the environment names in `SENSEDIA_ENVIRONMENTS` exist in Sensedia and are accessible.                                                                                                                                                                                                |

## Docker troubleshooting

### Container status

Check if your containers are running:

```shell
# List all containers
docker ps -a

# Check container health
docker inspect --format='{{json .State.Health}}' <container-name>
```

### Container logs

```shell
# View recent logs
docker logs <container-name>

# Follow logs in real-time
docker logs -f <container-name>

# View logs with timestamps
docker logs -t <container-name>
```

### Network connectivity

Test connectivity from within the container:

```shell
# Test connectivity to Sensedia platform
docker exec <container-name> curl -k https://platform-production.sensedia.com/health

# Test connectivity to Amplify
docker exec <container-name> curl -k https://apicentral.axway.com/health
```

### Configuration validation

Verify environment variables are properly set:

```shell
# Check environment variables
docker exec <container-name> env | grep SENSEDIA
docker exec <container-name> env | grep CENTRAL

# Verify specific Sensedia configuration
docker exec <container-name> env | grep SENSEDIA_BASEURL
docker exec <container-name> env | grep SENSEDIA_AUTH_CLIENTID
docker exec <container-name> env | grep SENSEDIA_FILTER
```