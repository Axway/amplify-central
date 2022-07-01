---
title: Amplify Central November 2020 Release Notes
linkTitle: Amplify Central November 2020
weight: 90
date: 2020-11-30
description: Amplify Central enables the user to manage their provider /
  consumer view. For more information, see the Amplify Central documentation.
---
## New features and enhancements

The following new features and enhancements are available in this update.

### Amplify Central CLI

The Amplify Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

Amplify Central CLI version 0.1.19 is now available on NPM (<https://www.npmjs.com/package/@axway/amplify-central-cli/v/0.1.19>)

The CLI extension is compatible **only** with the Amplify CLI **version 1.4** (<https://www.npmjs.com/package/@axway/amplify-cli/v/1.4.0>)

**This is not yet compatible with the Axway CLI**.

The Amplify Central CLI includes the following enhancements:

* The EU region is now supported while installing agents.
* During the installation of AWS Agent, it outputs the AWS CLI command used to install the agent in AWS environment (EC2 instance or ECS-fargate instance).
* Amplify CLI login using `amplify auth login` eliminates the need for the  "--client-id" parameter.  The defaults is to use the Amplify Central credentials ("--client-id=apicentral").
* The ability to get resources by name where the name of the resource can exist across multiple scopes. To improve readability, the result of the command has been enhanced to display multiple tables with the resource type prefixed to the name of the resource.
    * Example 1:  "amplify central get secret test" will return secret resources named "test" from all environments or integration root scopes.
    * Example 2:  "amplify central get secret –s test" will return secret resources from an environment and/or integration named "test".
    * Example 3:  "amplify central get webhook,secret –s test" will return webhook/secret resources from an environment and/or integration named "test".

### Amplify Central WebUI

The Amplify Central WebUI is used by both the API providers and consumers to manage and consume APIs.

The Amplify Central WebUI includes the following enhancements:

* View if a discovery agent is connected to an environment. The `Manual Sync.` badge is replace by:
    * `CONNECTED` when Discovery Agent is up and running.
    * `CONNECTION ERROR` when the Discovery Agent is not able to connect to the Gateway.
    * `DISCONNECTED` when the Discovery Agent is down.
* Improved Provider UX for the Environment details page:
    * Activity report metrics of the aggregated count of API Services, Catalog Items and Subscriptions for the selected Environment.  
* Improved Provider UX of the API Service details page:
    * View of multiple API Service versions.
    * Activity report metrics of the related Endpoints, Catalog Items and Subscriptions for the selected API Service version.  
    * Rendering of WSDL and PROTOBUF specifications in addition to OAS2/OAS3.

### Axway Edge Gateway / AWS Agents

To provide better visibility into your multi-type gateway eco system, two sets of agents are provided. These agents collect data from the Gateway (API / traffic) and exposes it in Amplify Central, providing you with a global vision of your eco system from a single interface.

The agents include the following enhancements:

* When subscribing, the default behavior is now to create unique credentials for each consumer (API Key / oauth credentials).
* Discovery Agent now handles log rotation/retention. Refer to [logging variables](/docs/connect-api-manager/agent-variables/).

### Mesh governance

Amplify Central mesh governance enables you to govern and manage your APIs, public and private services, along with the hybrid environments where they are located.

Mesh governance has no new enhancements.

## Fixed issues

The following issues were fixed in this version of Amplify Central:

* Previously, within Amplify Central CLI 0.1.17 version, when a service account was installed with a wrong name it caused the CLI to freeze. Now, a message is displayed to help the user understand the error.
* Previously, when a subscription failed, Discovery Agent did not send an email to the subscriber. Now, an email contains the reason of failure is sent.
* Previously, when an API was not in PUBLISHED status, a consumer could still start the subscription. Now, an API must have a PUBLISHED status for a consumer to subscribe to it.
* The Central CLI results listing for the Mesh Discovery resources now indicates the correct SCOPE and SCOPE NAME the resources are related to.

## Known limitations

This version of Amplify Central has the following limitations:

* API Observer:

    * Users that are assigned the Consumer role cannot see their subscription usage on the API Observer screen.  

* Axway Edge Gateway Agents:

    * Discovery Agent only discovers APIs having PassThrough, API Key and Oauth security.
    * Discovery Agent cannot expose discovered APIs in multiple teams, so the organization structure on API Manager is lost in Central. As a result, the API provider must create the team in Amplify Platform and share the API within appropriate teams.
    * Discovery Agent cannot detect that an API has been renamed. Consequently, you will see both the old API and the new API on Amplify Central.
    * Discovery Agent does not handle frontend API deletion. Consequently, the Unified Catalog API is out of sync.
    * Traceability Agent is not working in an externally managed topology deployment.

* AWS Gateway agents:

    * Discovery Agent is working with only one AWS Region (the one used when installing the agent).
    * Discovery Agent does not associate the usage plan and API when a subscriber chooses a usage plan that is not already linked to the chosen API.

* Mesh governance alpha Discovery Agents:

    * The alpha Discovery Agents do not work with the Mesh Traceability Agent.
