---
title: Amplify Central January 2021 Release Notes
linkTitle: Amplify Central January 2021
weight: 90
date: 2021-01-31
description: Amplify Central enables the user to manage their provider /
  consumer view. For more information, see the Amplify Central documentation.
---
## New features and enhancements

The following new features and enhancements are available in this update.

### Amplify Central CLI

The Amplify Central CLI is a package for managing Amplify Central resources with a DevOps approach to API Management.

Amplify Central CLI version 0.7.0 is now available on NPM (<https://www.npmjs.com/package/@axway/amplify-central-cli/v/0.7.0>)

The CLI extension is compatible **only** with the Amplify CLI **version 1.4** (<https://www.npmjs.com/package/@axway/amplify-cli/v/1.4.0>)

**This is not yet compatible with the Axway CLI**.

The Amplify Central CLI includes the following enhancements:  

* Installation of Azure agents (use `amplify central install agents` using the new **Azure** option)
* Installation of the alpha Mesh Governance Discovery Agent (use `amplify central install agents` using the new **Kubernetes** option)
* Providers can use new resource shortnames to access resources (use `amplify central get` to view the list of all resource shortnames)
* Providers can remove previously configured parameters using the interactive mode of the Central CLI (use `amplify central config unset <key>`)
* Providers can request multiple resources at one time. The result displays the resource tables split according to resource type (sample `amplify central get apis,apisr,apisi –s <scopename>`)

### Amplify Central WebUI

The Amplify Central WebUI is used by both the API providers and consumers to manage and consume APIs.

The Amplify Central WebUI includes the following enhancements:  

* View the agents connected to an environment in the Environment Detail page
* Improved Provider UX of API Service List and Details page:

    * Providers can view the user who made the last modification from the list of API Service versions
    * Providers can search/sort on the Endpoints and Catalog Item list tables
    * Providers can add new API Services from the UI

### Axway Edge Gateway / AWS / Azure Agents

To provide better visibility into your multi-type gateway eco system, two sets of agents are provided. These agents collect data from the Gateway (API / traffic) and exposes it in Amplify Central, providing you with a global vision of your eco system from a single interface.

The agents include the following enhancements:

* Azure Gateway support. Refer to [Connect Azure Gateway to Axway Amplify platform](/docs/connect_manage_environ/connect_azure_gateway/)

### Mesh governance

Amplify Central mesh governance enables you to govern and manage your APIs, public and private services, along with the hybrid environments where they are located.

Mesh governance includes the following enhancements:

* Mesh Governance deployment operations have been updated to use helm3 and to support Kubernetes 1.16 customer clusters.

* The Mesh Governance open beta Traceability Agent has been updated to allow API transaction header logging to be globally enabled or disabled with an option passed to it on deployment. This will affect all API transactions visible in the API Observer.
* The Mesh  Governance open beta Traceability Agent has been updated to allow a set of header redaction rules to be passed to it on deployment. The rules apply globally to all transaction logging and provide options for path, query parameter and header filtering. Request and response headers may be separately managed to selectively redacted or entirely removed from the results visible in the API Observer.
* Both of these Traceability agent options are applied using the mesh agent helm deployment step and are documented in Step 4 of the full mesh client and cluster setup instructions here: [https://github.com/Axway/Setup-Amplify-Mesh-Governance/wiki/Step-4.-Create-an-Amplify-Central-environment-and-connect-your-Kubernetes-cluster-to-it](https://github.com/Axway/Setup-Amplify-Mesh-Governance/wiki/Step-4.-Create-an-Amplify-Central-environment-and-connect-your-Kubernetes-cluster-to-it). Redeploying with helm to change either of the two options above will cause the mesh agent to restart.

* The alpha Mesh Governance Discovery Agent can be installed with the CLI option: `amplify central install agents` using the new **Kubernetes** option. Note that the alpha Mesh Governance agent capabilities are separate from the existing beta agents, and are available for preview and feedback.
* The alpha agent installation is documented here: [https://amplify-central/bundle/page/docs/connect_manage_environ/mesh_management/deploy-your-agents-with-the-axway-cli/index.html](/docs/connect_manage_environ/mesh_management/deploy-your-agents-with-the-amplify-cli/).
* The alpha agent usage and configuration is documented here: [https://amplify-central/bundle/page/docs/connect_manage_environ/mesh_management/discover-apis-and-services/index.html](/docs/connect_manage_environ/mesh_management/discover-apis-and-services/).
* The alpha Mesh Discovery agent limitations are noted below.

## Fixed issues

The following issues were fixed in this version of Amplify Central:

* Previously, the Mesh Governance helm apic-hybrid chart installation step would not accept an alternate target namespace. Now, the `--namespace` option can use any any properly prepared namespace on the target cluster.
* Previously, some Amplify Central CLI results from the `amplify central get xxx` commands did not correctly return their RESOURCE KIND and SCOPE KIND columns. Now, the RESOURCE KIND and SCOPE KIND columns are correctly populated for all Amplify Central resources.
* Previously, the environment name was not reported for API transactions shown in the Amplify Platform Visibility Dashboard. Now, API traffic reported by the API Gateway or AWS Traceability Agents as well as by the SaaS gateway will report the environment name for transactions visible in the API Observer and the platform Visibility Dashboard.

## Known limitations

This version of Amplify Central has the following limitations:

* API Observer:

    * Users that are assigned the Consumer role cannot see their subscription usage on the API Observer screen.  

* Axway Edge Gateway Agents:

    * Discovery Agent only discovers APIs having PassThrough, API Key and Oauth security.
    * Discovery Agent cannot expose discovered APIs in multiple teams, so the organization structure on API Manager is lost in Amplify Central. As a result, the API provider must create the team in Amplify Platform and share the API within appropriate teams.
    * When an API is renamed on the API Manager, the Discovery Agent is not able to recognize the API name change. This results in the API displaying in Amplify Central with dual entries of both the originally discovered name and the newly changed name.
    * Traceability Agent is not working in an externally managed topology deployment.

* AWS Gateway agents:

    * Discovery Agent is working with only one AWS Region (the one used when installing the agent).
    * Discovery Agent does not associate the usage plan and API when a subscriber chooses a usage plan that is not already linked to the chosen API.

* Azure agents:

    * Discovery Agent is not managing revision and version yet.
    * Traceability agent is not reporting the App usage traffic.

* Mesh governance alpha Discovery Agents:

    * The alpha Discovery Agents do not work with the Mesh Traceability Agent.
