---
title: Connect Backstage
linkTitle: Connect Backstage
weight: 120
---
Connect Backstage and Amplify so you can govern and monitor the creation of the Backstage APIs in one central location.

## Why do you want to connect Backstage and Amplify?

Connecting Backstage to Amplify will provide you with a global, centralized view of your APIs.

Backstage can be represented by an Amplify environment, allowing you to better filter APIs and their traffic. Supplied with the environment, the Discovery Agent interacts with Backstage and Amplify to detect changes to Backstage APIs using the Discovery Agent. The Discovery Agent pushes the service configuration as an API service for the environment, which can then be published and used by consumers to subscribe to the service.

### Discovery

The Discovery Agent is used to discover new published APIs for a specific Backstage Software Catalog. The Discovery Agent pushes all API definitions from Backstage to Amplify. If the spec type is unknown by Amplify, the service will have a type of `Unstructured`.

The related APIs are published to Amplify as an API service in the selected environment.

## Prerequisites

* An Axway Amplify subscription in the Amplify platform
* A Platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html/#managing-service-accounts)
* An Amplify environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments/)
* Access to Backstage to retrieve details from the service and CLI Toolkit

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

## Connect to Backstage

The Discovery Agent will use the credentials provided. If Backstage requires no authentication, credentials are optional.

## Gather the required values from Backstage

### URL parts

In order to make calls to Backstage, the agent needs a valid url:

1. Scheme: Either "http" or "https" (mandatory)
2. Host: Where Backstage is hosted. Example: "demo.backstage.io" (mandatory)
3. BackendPort: If Backstage is hosted locally, the agent must know the port where the Backstage backend runs (optional)
4. Path: Path of the URL, if any. Example: "/path/v2" (optional)

### Authentication parts

Depending on the configured authentication by the Backstage backend, the agent can support three modes/types of authentication (it can also support no auth at all):

1. guest: Calls an endpoint from Backstage to get a generated token and use it. This is a temporary token that will refresh when needed.
2. token: Used the token generated in the Backstage config. This is a permanent token. More info: <https://backstage.io/docs/auth/service-to-service-auth#static-tokens>. Additional property required:
   * staticToken: the value of the token
3. jwks: Uses the JWKS Authentication flow with an existing Identity Provider. The agent currently supports only ClientSecretBasic flow. More info: <https://backstage.io/docs/auth/service-to-service-auth#jwks-token-auth>. Additional properties required:
   1. clientId: The clientID used to get the access token from the Identity Provider
   2. clientSecret: The clientSecret used to get the access token from the Identity Provider
   3. tokenUrl: The url used to validate the credentials and get an access token from the Identity Provider

## Related topics

See the following topics for related information.
