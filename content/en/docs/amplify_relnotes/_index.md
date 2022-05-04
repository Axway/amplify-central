---
title: Release Notes
linkTitle: Release Notes
no_list: true
weight: 100
date: 2020-10-28
hide_readingtime: true
---

The following is a list of release notes for Amplify Central, Amplify agents, Analytics, Asset Catalog, Marketplace, Product Foundry, Amplify Platform Management, and Axway CLI. Enhancement overviews and bug fixes for each release are also provided.

For more details, click on the release note title to go to the corresponding release note.

## [Amplify agents April 2022](/docs/amplify_relnotes/20220430_ampc_agents_relnotes/)

**What's new for**:

* **Amplify Gateway Agent** (version 1.1.16): See Amplify agent general
* **Amplify AWS Gateway Agent** (version 1.1.16): See Amplify agent general
* **Amplify Azure Agent** (version 1.1.16): See Amplify agent general
* **Amplify Istio Agent** (helm chart version 0.69.0, Agent version 2.0.28): Multiple Istio namespace support
* **Amplify Apigee Agent** (version 0.0.6): Marketplace provisioning / deprovisioning
* **Amplify Mulesoft Agent** (version 1.1.5): Marketplace provisioning / deprovisioning
* **Amplify agent general** (version 1.1.16): Marketplace subscription provisioning and deprovisioning on the dataplane

**Bug fixes**: Unable to update Istio agents using the helm update command

## [Amplify Central April 2022](/docs/amplify_relnotes/20220430_ampc_relnotes/)

**What's new for**:

* **Axway Central CLI** (version 2.10.2):
    * istioGatewayNamespaces configuration in the hybrid-override.yaml file
    * Updated NPM dependencies
* **Amplify Central WebUI**:
    * See Asset Catalog, Product Foundry, and Service Registry Release Notes

**Bug fixes**:

* Edge agent Helm install template uses the Team name instead of the correct override syntax and organization ID
* Istio agent install errors when a Kubernetes warning is encountered

## [Analytics April 2022](/docs/amplify_relnotes/20220430_analytics_relnotes/)

**What's new**: None

**Bug fixes**: None

## [Asset Catalog April 2022](/docs/amplify_relnotes/20220430_catalog_relnotes/)

**What's new**:

* Link / unlink the API Services when editing an asset with the WebUI Group Resources step
* Access Rights to an asset/product reflect the limitations of the Amplify Central role
* Tags for an asset now support all special characters
* Asset details page lists products that are consuming/using the currently displayed asset version
* When creating or editing an asset, assign one owning team of the asset and share it with other teams

**Bug fixes**:

* Cannot delete an asset with multiple asset versions
* The Product (Catalog) Manager role cannot manage assets
* The team developer role is not limited to read only permissions in the access rights step of the asset wizard

## [Marketplace April 2022](/docs/amplify_relnotes/20220430_marketplace_relnotes/)

**What's new**:

* Product details view lists active plans assigned to product
* Consumers can subscribe from the plan directly
* Product details view provides OS2/OAS3 resource details

**Bug fixes**: None

## [Product Foundry April 2022](/docs/amplify_relnotes/20220430_foundry_relnotes/)

**What's new**: When creating or editing a product, assign one owning team of the product and share it with other teams

**Bug fixes**: The Product (Catalog) Manager role cannot manage products (team ownership/sharing and the management of the lifecycle of a product)

## [Service Registry April 2022](/docs/amplify_relnotes/20220430_serviceregistry_relnotes/)

**What's new**: Service Registry view has a column indicating the number of assets that are linked to each API Service

**Bug fixes**: None

## [Amplify Platform Management April 2022](https://docs.axway.com/bundle/platform-management/page/docs/release_notes/index.html)

## [Axway CLI April 2022](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/release_notes/index.html)

## [Amplify agents March 2022](/docs/amplify_relnotes/20220330_ampc_agents_relnotes/)

**What's new for**:

* **Amplify Gateway Agent** (version 1.1.13): Discovery Agent adds a status message to the API Service when the API Service cannot be assigned to a team
* **Amplify AWS Gateway Agent** (version 1.1.13): None
* **Amplify Azure Agent** (version 1.1.13): None
* **Amplify Istio Agent** (helm chart version 0.62.0, Agent version 2.0.23): None
* **Amplify Apigee Agent** (version 0.0.5): None
* **Amplify agent general** (version 1.1.13): Agents can manage teams better when they are added to the Access Control List (ACL) and share environments across multiple teams: only required teams are part of the ACL

**Bug fixes**: None

## [Amplify Central March 2022](/docs/amplify_relnotes/20220330_ampc_relnotes/)

**What's new for**:

* **Axway Central CLI** (version 2.8.0):
    * Displays the friendly team name that owns an environment
    * Filter environments and API Services by team ownership or no ownership
* **Amplify Central WebUI**:
    * Refer to the Asset Catalog March 2022 Release notes

**Bug fixes**: None

## [Analytics March 2022](/docs/amplify_relnotes/20220330_analytics_relnotes/)

**What's new**: None

**Bug fixes**: API Health and API Traffic cannot be filtered by API

## [Asset Catalog March 2022](/docs/amplify_relnotes/20220330_catalog_relnotes/)

**What's new**:

* API Providers can set/change the Categories with the WebUI
* API Providers can set/change the team ownership of an Asset with the WebUI

**Bug fixes**:

* Display of all asset stages for filtering
* Improved warning message when attempting to archive an asset release being used by a product

## [Marketplace March 2022](/docs/amplify_relnotes/20220330_marketplace_relnotes/)

**What's new**:

* Consumers can accept the Marketplace Terms & Conditions the first time they navigate to the Marketplace
* Consumer will see only active product versions
* Consumers can download the API swagger definition from the Marketplace product
* Consumers can explore the product documents and articles from the Documentation tab of a product

**Bug fixes**: None

## [Product Foundry March 2022](/docs/amplify_relnotes/20220330_foundry_relnotes/)

**What's new**:

* Product documentation appears in a document folder structure
* Documentation articles can be renamed
* Documentation can be added
* Catalog manager role added

**Bug fixes**: None

## [Service Registry March 2022](/docs/amplify_relnotes/20220330_serviceregistry_relnotes/)

**What's new**:

* API Services across all environments can be viewed
* API Services can be filtered by Environment / Owner and searched by Service Name across all environments

**Bug fixes**: None

## [Amplify Platform Management March 2022](https://docs.axway.com/bundle/platform-management/page/docs/release_notes/index.html)

**What's new**: None

**Bug fixes**: None

## [Axway CLI March 2022](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/release_notes/index.html)

**Improvements**:

* auth: When logging out, direct browser to correct sign out page
* telemetry: Resolved issue where CLI would hang if telemetry is enabled and an error occurred

## [Amplify agents February 2022](/docs/amplify_relnotes/20220228_ampc_agents_relnotes/)

**What's new for**:

* **Amplify Gateway Agent** (version 1.1.12): None
* **Amplify AWS Gateway Agent** (version 1.1.12): None
* **Amplify Azure Agent** (version 1.1.12): None
* **Amplify Istio Agent** (helm chart version 0.62.0, Agent version 2.0.23): None
* **Amplify Apigee Agent** (version 0.0.4): None
* **Amplify agent general** (version 1.1.10):
    * Agent technical tags and attributes are now stored under `x-agent-details` sub-resources on the APIService / APIService revision and are no longer visible in Central WebUI
    * `TRACEABILITY_EXCEPTION_LIST` now supports regex expression based on RE2 Syntax.

**Bug fixes**: None

## [Amplify Central February 2022](/docs/amplify_relnotes/20220228_ampc_relnotes/)

**What's new for**:

* **Axway Central CLI** (version 2.8.0):
    * The `install agents` command has the option to replicate your organizational structure by auto-associating the team ownership of API Services
    * The Central Admin role can share environments with other teams using an Access Control List
    * The Central Admin role can view / set the team ownership of an Environment or an API Service
    * The logical names of resources are now more friendly
* **Amplify Central WebUI**:
    * New API Services can be published faster to the Unified Catalog
    * Async API specification version 2.3.0 is now supported with six additional Async protocols: IBMMQ, JMS SECURE, MECURE, SOLACE, SOLACE SECURE, and SOLACE COMPRESSED
    * The UX display of many tags / attributes and long text names has been improved

**Bug fixes**:

* The Axway Central CLI `install agents` command outputs an error message indicating the required platform roles to access the teams
* The Axway Central CLI `get` command can support retrieving thousands of resources without a timeout

## [Analytics February 2022](/docs/amplify_relnotes/20220228_analytics_relnotes/)

**What's new**:

* The UI has been rebranded to match other Amplify screens
* Each screen has a compare capability to visualize the trend with the previous period
* Leaderboard view to help verify your API performance

**Bug fixes**: Application usage is not visible

## [Asset Catalog February 2022](/docs/amplify_relnotes/20220228_catalog_relnotes/)

**What's new**:

* Developers can create, view, edit, and delete an asset
* Lifecycle management covers the release, deprecate, and archive stages
* The asset logical name can be computed from the asset title or auto-generated
* An asset version can be released as a Major, Minor, or Patch release type
* Changes can be made to an asset after it has been released by using the `Create new version` button
* An asset can have multiple active versions, but only one Draft
* Assets that are packaged with a product cannot be archived

**Bug fixes**: None

## [Marketplace February 2022](/docs/amplify_relnotes/20220228_marketplace_relnotes/)

**What's new**:

* Platform administrators can define the marketplace sub-domain from the *Marketplace Settings* page
* Platform administrators can change the look and feel of their Marketplace from the *Marketplace Appearance* page
* Marketplace is available in public mode

**Bug fixes**: None

## [Product Foundry February 2022](/docs/amplify_relnotes/20220228_foundry_relnotes/)

**What's new**:

* A user can view, create, edit, release, deprecate, archive, and delete a product
* A product is automatically created with a free plan
* The product logical name is derived from the product title
* Multiple assets can be included in a product
* A product can be documented using markdown content
* A product can be released with a Major, Minor or Patch version
* Changes can be made to a product by using the **Create Draft** button
* A product supports multiple active versions and only one draft

**Bug fixes**: None

## [Amplify Platform Management February 2022](https://docs.axway.com/bundle/platform-management/page/docs/release_notes/index.html)

**What's new**: None

**Bug fixes**:

* Org Activity view events for updating a team member’s roles or removing a member from a team may not state which member was affected
* Amplify Runtime Services app Overview view may not render for unpublished apps

## [Axway CLI February 2022](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/release_notes/index.html)

**Security update**. Migrated from the outdated `listr` package to the actively maintained `listr2` package to resolves moderate security vulnerability warnings during installation

## [Amplify agents January 2022](/docs/amplify_relnotes/20220131_ampc_agents_relnotes/)

**What's new for**:

* **Amplify Gateway Agent** (version 1.1.10): APIs can be spread across teams in the same Amplify environment
* **Amplify AWS Gateway Agent** (version 1.1.10): Technical information for consumer subscription (AWS usage plan ID) are now stored with the subscription object on Amplify
* **Amplify Azure Agent** (version 1.1.10): Technical information for consumer subscription (Azure subscription ID) are now stored with the subscription object on Amplify
* **Amplify Istio Agent** (helm chart version 0.62.0, Agent version 2.0.23):
    * The Traceability Agent inherits the sampling feature from Agents SDK
    * The Traceability Agent can now track multiple ISTIO namespaces
* **Amplify Apigee Agent** (version 0.0.4):
    * Portal and products exposed in Apigee Edge can be discovered
    * Consumer subscriptions can be managed from Amplify platform
    * API Usage is reported to Amplify Analytics
* **Amplify agent general** (version 1.1.10): Traceability Agents now report three types of data to the platform: Transaction, Usage and Metrics (new)

**Bug fixes**:

* Custom webhook for subscription is overridden by the agent
* Traceability Agent fails to connect to transaction service via proxy
* Changing discovery filter does not always update the discovered APIs

## [Amplify Central January 2022](/docs/amplify_relnotes/20220131_ampc_relnotes/)

**What's new for**:

* **Axway Central CLI** (version 2.7.1):
    * A developer on a team can access Environments and API Services owned by teams that the developer is a member of
* **Amplify Central WebUI**:
    * Team ownership of Environments and API Services is now displayed on the WebUI
    * Consumers from the same team are not able to manipulate/view subscriptions from other team members in the Unified Catalog
    * API Providers can now publish APIs to the Unified Catalog faster with the relaxed validation of API Specification files on the WebUI

**Bug fixes**:

* A Service account cannot be used in a headless environment with the install agents command
* The `get` command with `--team` option does not support all teams that you have access to as a Central Administrator
* The CLI command `axway central config` does not execute with telemetry enabled
* The CLI command to add a service account user to a team does not execute

## [Amplify agents November 2021](/docs/amplify_relnotes/20211130_ampc_agents_relnotes/)

**What's new for**:

* **Amplify Gateway Agent** (version 1.1.7): A warning is raised when using @secret for password configuration in the Traceability Agent offline mode

**Bug fixes**:

* Error getting authentication token from AxwayId
* AWS Discovery Agent goes stale after a while
* logger adds additional rotate file hooks on config change

## [Amplify Central November 2021](/docs/amplify_relnotes/20211130_ampc_relnotes/)

**What's new for**:

* **Axway Central CLI** (version 2.6.0):
    * Manages team ownership of Environments and API Services
    * Added a simple ‘–team’ filter for users to only Get Environments and API Services for a specific team that they are a member of
    * Auto-generates a logical name for resources when a logical name is not provided with a ‘create’ and ‘apply’ command
    * Deprecated the “axway central create service-account” command as of Central CLI version 2.5.0 or later
* **Amplify Central WebUI**:
    * When adding an API Service using an API Specification file (OAS2/OAS3), the title, description and endpoints are auto-populated

**Bug fixes**:

* CLI - The use of “install agents” command in a headless mode with a service account and tooling credentials of a platform admin account
* WebUI - Creating an Environment with the name ‘add’

## [Amplify agents October 2021](/docs/amplify_relnotes/20211031_ampc_agents_relnotes/)

**What's new for**:

* **Amplify Gateway Agent** (version 1.1.5): Agent resource status contains the previous and current status
* **Amplify agents general** (version 1.1.5): Amplify Central CLI configures the agent with the proper "latest release"

**Bug fixes**:

* Traceability connectivity connection failed, too many colons in address
* Discovery Agent fails when using an environment owned by a team
* Amplify Gateway helm installation Private key and Public key transposed in amplify-agents-keys secret

## [Amplify Central October 2021](/docs/amplify_relnotes/20211031_ampc_relnotes/)

**What's new for**:

* **Axway Central CLI** (version 2.2.0): Amplify Central CLI configures the agent with the proper "latest release"
* **Amplify Central WebUI**:
    * A Trial Experience is available to new free trail users to experience the features of Amplify Central
    * Developer role can access the API Observer and see the traffic associated to APIs belonging to the teams he is part of

**Bug fixes**:

* CLI - Incorrect cloudformation_properties.json generated for AWS Agent
* CLI - Authentication timeout

## [Amplify agents September 2021](/docs/amplify_relnotes/20210930_ampc_agents_relnotes/)

**What's new for**:

* **Amplify Gateway Agent** (version 1.1.4):
    * Discovery Agent configuration to map a tag to one or more categories in API Manager, and to automatically create a category if one does not exist
    * Traceability Agent configuration to disregard API paths from being reported to the Platform
* **Amplify agents general** (version 1.1.4): None

**Bug fixes**: Agent cannot contact the version service check

## [Amplify Central September 2021](/docs/amplify_relnotes/20210930_ampc_relnotes/)

**What's new for**:

* **Axway Central CLI** (version 2.0.0):
    * Search/filter resources with either a simple query or an advanced RSQL query
    * Create and manage service accounts
    * Display organization activity and usage for a selected date range
    * Support for Node.js version 12.13.0 or later
* **Amplify Central WebUI**: API provider can add an API Service without specifying an endpoint

**Bug fixes**: Activity report on the Environment details page does not display an error message if an API Service encounters an error while publishing to the Unified Catalog

## [Amplify agents August 2021](/docs/amplify_relnotes/20210831_ampc_agents_relnotes/)

**What's new for**:

* **Amplify Gateway Agent** (version 1.1.2): Offline usage report and volume usage report
* **Amplify agents general** (version 1.1.2): Usage report contains the agent name

**Bug fixes**:

* Index out of range in trace log when attempting to send a 403 traffic
* Discovered API added to wrong team
* Discovery Agent panic while discovering

## [Amplify Central August 2021](/docs/amplify_relnotes/20210831_ampc_relnotes/)

**What's new for Axway Central CLI** (version 1.25.0):

* Transaction configuration during installation
* Helm deployment for agent installation
* Central assets can be filtered with the use of RSQL

**Bug fixes**: None

## [Amplify agents July 2021](/docs/amplify_relnotes/20210731_ampc_agents_relnotes/)

**What's new for**:

* **Amplify Gateway Agent** (version 1.1.0): Report traffic for API Gateway only scenario
* **Amplify AWS Gateway Agent** (version 1.1.0): Encrypted queues
* **Amplify Istio Agent** (version 1.1.0): Alignment with the latest Amplify Agents SDK

**Bug fixes**: Catalog item’s categories are lost when a consumer instance is updated

## [Amplify Central July 2021](/docs/amplify_relnotes/20210731_ampc_relnotes/)

**What's new for**:

* **Axway Central CLI** (version 1.21.0):
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

* **Axway CLI** (version 2.1): Manage organization, users and teams
* **Axway Central CLI** (version 1.16.0):
    * New commands to manage organization, users and teams
    * New command to create agent resource
* **Amplify Central WebUI**:
    * Visualize the Agent Status in Central WebUI
    * Dependency Analysis View

**Bug fixes**:

* Wrong API Service count on the service page list
* A provider cannot remove tags from an API Service
* A page error is displayed when adding the first API Service to an environment in the WebUI
* Traceability Agent working in an Externally Managed Topology (EMT) deployment cannot report the transaction request/response headers

## [Unified Catalog June 2021](/docs/amplify_relnotes/20210631_catalog_relnotes/)

**What's new**: Managing categories and assigning them to catalog items when publishing an API Service

**Bug fixes**:

* The protocol dropdown on the API Service Endpoint screen did not allow for selection of protocols other than http/http for AsyncAPI services
* Developers could no longer access an environment owned by their team

## [Amplify Central May 2021](/docs/amplify_relnotes/20210531_ampc_relnotes/)

**What's new for**:

* **Amplify Central CLI** (version 1.10.0): None
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

**What's new**: Discovery and publishing of GraphQL APIs

**Bug fixes**: None

## [Amplify Central April 2021](/docs/amplify_relnotes/20210430_ampc_relnotes/)

**What's new for**:

* **Axway Central CLI** (version 1.9.0):
    * Select the name of your agent you want to appear in the Topology view
    * Environment and API Services can be segmented by team
* **Amplify Central WebUI**: Use markdown formatting for Environment and API Service descriptions
* **Amplify agents general**: Traceability Agent data redaction

**Bug fixes**:

* Unsubscribing to an API does not remove the corresponding credentials on the data plane
* As a consumer, I want to see the friendly name for my AWS Usage plan
* Azure agents are not able to reconnect after Amplify token expiration
* Base path is not displayed in service endpoint
* API Observer is not always showing the correct number of spans

## [Unified Catalog April 2021](/docs/amplify_relnotes/20210431_catalog_relnotes/)

**What's new**: None

**Bug fixes**:

* API catalog item is not created for API with large swagger files (3000 methods)
* Users that are assigned the Platform Consumer role and Team Consumer role are not able to access Unified Catalog
* Loading the subscriptions details screen fails with a CORS error on Safari

## [Amplify Central March 2021](/docs/amplify_relnotes/20210331_ampc_relnotes/)

**What's new for**:

* **Axway Central CLI** (version 1.0.0): None
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

**What's new**: None

**Bug fixes**:

* Removing an environment with duplicate attributes could get stuck in deleting state
* The Unified Catalog could not display the full schema definition in the embedded Swagger UI

## [Amplify Central February 2021](/docs/amplify_relnotes/20210228_ampc_relnotes/)

**What's new for**:

* **Amplify Central CLI** (version 0.12.0): Download the Azure agents from the public artifactory
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

* Event-based APIs can now be registered in the Unified Catalog as AsyncAPI type
* Catalog Subscription enhancements

**Bug fixes**:

* Team names no longer visible on catalog asset
* Logging with a user that was assigned the Consumer role, does not allow viewing the subscription details
* Failure publishing to the Unified Catalog using the Amplify Apigee extension for APIs with long description
* Filter by category pagination issue

## [Amplify Central January 2021](/docs/amplify_relnotes/20210131_ampc_relnotes/)

**What's new for**:

* **Amplify Central CLI** (version 0.7.0):
    * Installation of Azure agents
    * Installation of the alpha Mesh Governance Discovery Agent
* **Amplify Central WebUI**: View the agents connected to an environment in the Environment Detail page
* **Mesh governance**: The alpha Mesh Governance Discovery Agent can be installed with the CLI option

**Bug fixes**:

* Mesh Governance helm APIC-hybrid chart installation step would not accept an alternate target namespace
* Some Amplify Central CLI results from the amplify central get xxx commands did not correctly return their RESOURCE KIND and SCOPE KIND columns
* The environment name was not reported for API transactions shown in the Amplify Platform Visibility Dashboard

## [Unified Catalog January 2021](/docs/amplify_relnotes/20210130_catalog_relnotes/)

**What's new**: Improve searching and browsing in the Unified Catalog

**Bug fixes**:

* Name of an active subscription could not be updated without changing the subscription status
* Long category names, descriptions, or tags were not properly displayed

## [Amplify Central November 2020](/docs/amplify_relnotes/20201130_ampc_relnotes/)

**What's new for**:

* **Amplify Central CLI** (version 0.1.19): The EU region is now supported while installing agents
* **Amplify Central WebUI**: View if a Discovery Agent is connected to an environment
* **Amplify agents general**: Discovery Agent now handles log rotation/retention

**Bug fixes**:

* When a service account was installed with a wrong name it caused the CLI to freeze
* When a subscription failed, Discovery Agent did not send an email to the subscriber
* When an API was not in PUBLISHED status, a consumer could still start the subscription
* The Central CLI results listing for the Mesh Discovery resources now indicates the correct SCOPE and SCOPE NAME the resources are related to

## [Unified Catalog November 2021](/docs/amplify_relnotes/20201130_catalog_relnotes/)

**What's new**:

* Categories management through the Unified Catalog UI
* Improved searching and browsing in the Unified Catalog
* Enable integration with Bitbucket for manual discovery and publishing of APIs
* Enable integration with Layer7 for manual discovery and publishing of APIs

**Bug fixes**:

* Users assigned the Developer role could not push an API asset from the Unified Catalog to Integration Builder as a connector
* When no app was required with a subscription, the Approve and Reject dialog screen would display “App has been deleted”

## [Amplify Central October 2020](/docs/amplify_relnotes/20201030_ampc_relnotes/)

**What's new for**:

* **Amplify Unified Catalog**:
    * Filter asset by type
    * Enable consumers to make changes to their subscriptions
    * Catalog asset Categorization
* **Amplify Central CLI** (version 0.1.15):
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
