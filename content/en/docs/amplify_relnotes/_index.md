---
title: Release Notes
linkTitle: Release Notes
no_list: true
weight: 100
date: 2020-10-28
hide_readingtime: true
description: Provides a list of release notes for Amplify Central, Amplify agents, and Unified Catalog; along with enhancement overviews and bug fixes for each release. For more details, click on the release note title to go to the corresponding release note. 
---

## [Amplify agents August 2021](/docs/amplify_relnotes/20210831_ampc_agents_relnotes/)

**What's new for**:

* **Amplify Gateway Agent**: Offline usage report and volume usage report
* **Amplify agents general**: Usage report contains the agent name

**Bug fixes**:

* Index out of range in trace log when attempting to send a 403 traffic
* Discovered API added to wrong team
* Discovery Agent panic while discovering

## [Amplify Central August 2021](/docs/amplify_relnotes/20210831_ampc_relnotes/)

**What's new for Axway CLI**:

* Transaction configuration during installation
* Helm deployment for agent installation
* Central assets can be filtered with the use of RSQL

## [Amplify agents July 2021](/docs/amplify_relnotes/20210731_ampc_agents_relnotes/)

**What's new for**:

* **Amplify Gateway Agent**: Report traffic for API Gateway only scenario
* **Amplify AWS Gateway Agent**: Encrypted queues
* **Amplify Istio Agent**: Alignment with the latest Amplify Agents SDK

**Bug fixes**: Catalog item’s categories are lost when a consumer instance is updated

## [Amplify Central July 2021](/docs/amplify_relnotes/20210731_ampc_relnotes/)

**What's new for**:

* **Axway CLI**:
    * Group API Services in Assets
    * Delete Resources using a name scope parameter

* **Amplify Central WebUI**:
    * Delete Resources using a name scope parameter Environments list page
    * Service Mesh v1 support has been removed. It is now replaced by Amplify ISTIO

**Bug fixes**:

* Amplify Central CLI could not create a service account when the path contained a space
* Long endpoint names that contained a period could not be created

## [Amplify Central June 2021](/docs/amplify_relnotes/20210630_ampc_relnotes/)

**What's new for**:

* **Axway CLI**: Manage organization, users and teams
* **Amplify Central WebUI**:
    * Visualize the Agent Status in Central WebUI
    * Dependency Analysis View

**Bug fixes**:

* Wrong API Service count on the service page list
* A provider cannot remove tags from an API Service
* A page error is displayed when adding the first API Service to an environment in the WebUI
* Traceability Agent working in an Externally Managed Topology (EMT) deployment cannot report the transaction request/response headers

## [Unified Catalog June 2021](/docs/amplify_relnotes/20210631_catalog_relnotes/)

**What's new**:

**Bug fixes**:

## [Amplify Central May 2021](/docs/amplify_relnotes/20210531_ampc_relnotes/)

**What's new for**:

* **Amplify Central WebUI**:
    * The Developer role has access to the environment and API services
    * The Central Administrator can edit the environment details

* **Amplify agents general**:
    * Transaction sampling
    * Transaction redaction

**Bug fixes**:

* Could not import large API specification file
* Azure Discovery Agent adds (Azure) to the service name
* Agents terminate if API Manager system is unreachable on startup
* Discovery agent does not remove API Service when API is removed in Axway API Manager
* Azure trace is not pushed to Condor: "empty url"
* Prevent running multiple instances of an agent on the same machine
* Installing Traceability Agent only for v7 asks you for disco agent name

## [Unified Catalog May 2021](/docs/amplify_relnotes/20210531_catalog_relnotes/)

**What's new**:

**Bug fixes**:

## [Amplify Central April 2021](/docs/amplify_relnotes/20210430_ampc_relnotes/)

**What's new for**:

* **Amplify Central WebUI**: Use markdown formatting for Environment and API Service descriptions

* **Amplify agents general**: Traceability Agent data redaction

**Bug fixes**:

* Unsubscribing to an API does not remove the corresponding credentials on the data plane
* As a consumer, I want to see the friendly name for my AWS Usage plan
* Azure agents are not able to reconnect after Amplify token expiration
* Base path is not displayed in service endpoint
* API Observer is not always showing the correct number of spans

## [Unified Catalog April 2021](/docs/amplify_relnotes/20210431_catalog_relnotes/)

**What's new**:

**Bug fixes**:

## [Amplify Central March 2021](/docs/amplify_relnotes/20210331_ampc_relnotes/)

**What's new for**:

* **Amplify Central WebUI**: JSON or YAML to create API service / Catalog item

* **Mesh governance**:
    * Support for Istio 1.8.2
    * Support for Red Hat OpenShift 4.7 managed clusters

**Bug fixes**:

* As a consumer, I want to see the friendly name for my v7 application
* As a consumer, I want to see the friendly name for my Azure subscription
* Traceability Agent logs are not stored to a log file
* API Service is duplicated
* V7 agent fails to start if APIMANAGER_HOST is not set
* Incorrect URL for Traceability Agent running in EU organization
* Amplify Central WebUI Observer traffic display is incomplete

## [Unified Catalog March 2021](/docs/amplify_relnotes/20210331_catalog_relnotes/)

**What's new**:

**Bug fixes**:

## [Amplify Central February 2021](/docs/amplify_relnotes/20210228_ampc_relnotes/)

**What's new for**:

* **Amplify Central CLI**: Download the Azure agents from the public artifactory

* **Amplify Central WebUI**:
    * Providers can publish an API Service to the Unified Catalog
    * Providers can register an AsyncAPI

* **Amplify Azure Agent**:
    * Amplify Azure Agent is publicly available
    * Amplify Azure Traceability Agent reports subscription usage
    * Amplify Azure Traceability Agent reports APIs usage

* **Mesh governance**: Amplify CLI for Istio agent Kubernetes discovery

**Bug fixes**:

* The image import/crop feature for environments, API services, and catalog items is not a blocking action
* API Service creator detail link is broken for service account
* The Central CLI instructions after an agent installation are not clear
* Consumer is unable to consume v7 discovered APIs from Amplify Central WebUI
* V7 Traceability Agent Linux service mode broken
* Fixed IP addresses

## [Unified Catalog February 2021](/docs/amplify_relnotes/20210226_catalog_relnotes/)

**What's new**:

**Bug fixes**:

## [Amplify Central January 2021](/docs/amplify_relnotes/20210131_ampc_relnotes/)

**What's new for**:

* **Amplify Central CLI**:
    * Installation of Azure agents
    * Installation of the alpha Mesh Governance Discovery Agent

* **Amplify Central WebUI**: View the agents connected to an environment in the Environment Detail page

* **Mesh governance**: The alpha Mesh Governance Discovery Agent can be installed with the CLI option

**Bug fixes**:

* Mesh Governance helm apic-hybrid chart installation step would not accept an alternate target namespace
* Some Amplify Central CLI results from the amplify central get xxx commands did not correctly return their RESOURCE KIND and SCOPE KIND columns
* The environment name was not reported for API transactions shown in the Amplify Platform Visibility Dashboard

## [Unified Catalog January 2021](/docs/amplify_relnotes/20210130_catalog_relnotes/)

**What's new**:

**Bug fixes**:

## [Amplify Central November 2020](/docs/amplify_relnotes/20201130_ampc_relnotes/)

**What's new for**:

* **Amplify Central CLI**: The EU region is now supported while installing agents

* **Amplify Central WebUI**: View if a Discovery Agent is connected to an environment

* **Amplify agents general**: Discovery Agent now handles log rotation/retention

**Bug fixes**:

* When a service account was installed with a wrong name it caused the CLI to freeze
* When a subscription failed, Discovery Agent did not send an email to the subscriber
* When an API was not in PUBLISHED status, a consumer could still start the subscription
* The Central CLI results listing for the Mesh Discovery resources now indicates the correct SCOPE and SCOPE NAME the resources are related to

## [Unified Catalog November 2021](/docs/amplify_relnotes/20201130_catalog_relnotes/)

**What's new**:

**Bug fixes**:

## [Amplify Central October 2020](/docs/amplify_relnotes/20201030_ampc_relnotes/)

**What's new for**:

* **Amplify Unified Catalog**:
    * Filter asset by type
    * Enable consumers to make changes to their subscriptions
    * Catalog asset Categorization

* **Amplify Central CLI**:
    * Window 10 support using the Command Prompt and Powershell
    * Creation of Amplify Central Service Accounts
    * Installation of the Axway Edge Discovery and Traceability Agents
    * Installation of the AWS Discovery and Traceability Agents
    * Installation of the Mesh discovery agent in a Kubernetes cluster

* **Amplify Central WebUI**: Amplify Central is now available in an EU Data Region

* **Amplify Edge Gateway / AWS Agents**:
    * Axway Edge Gateway agents are available either as a Linux binary or a Docker image
    * AWS API Gateway agents are available as a Docker image

* **Mesh governance**: The validated service mesh version has been updated to Istio 1.6.8

**Bug fixes**:

* Issue with the Observer display of API filters menu displaying the Axway Cloud and Service mesh environment names
* The 403 error is not handled properly by the AWS Traceability Agent due to a misconfiguration of the logging variable by the Discovery Agent

## Support Policy for Amplify Agents and Amplify Agent SDK

See [Support Policy](/docs/amplify_relnotes/agent_agentsdk_support_policy/).
