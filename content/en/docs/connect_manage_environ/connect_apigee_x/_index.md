---
title: Connect Apigee X Gateway
linkTitle: Connect Apigee X Gateway
weight: 120
---
Connect Google Cloud Platform Apigee X and Amplify so you can govern and monitor the creation / deployment / publishing and subscriptions of the Apigee X hosted APIs in one central location.

## Why do you want to connect Apigee X and Amplify?

Connecting Apigee X to Amplify will provide you with a global centralized view of your APIs and their related traffic.

Each Apigee X organization can be represented by an Amplify environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents (Discovery and Traceability) interact with Apigee X and Amplify to:

* Detect changes to Apigee X proxies deployments using the Discovery Agent. The Discovery Agent pushes the proxy configuration as an API service for the environment, which can then be published as a catalog item to be used by consumers to subscribe to the service.
* Gather Apigee X statistics that are related to discovered APIs and prepare the metric events that are sent to Amplify platform.

### Discovery Agent

The Discovery Agent is used to discover new API proxies configured in Apigee X, it is also the agent that handles provisioning for consumers to access the discovered proxies.

#### Discovery process

* Find all deployed API proxy revisions
* From those revisions, attempts to find a specification file
    * To do this the agent looks at the proxy configuration for a resource file of type `oas`
* Given that a specification file is found, the agent then creates an API service, revision, and instance to represent that proxy in Service Registry of the Amplify Engage. The agent does not validate or configure any policies within the proxy, it will expect the spec to represent what is defined in the proxy.

{{< alert title="Note" color="primary" >}}An API Proxy without an API Specification will not be discovered by the agent.{{< /alert >}}

#### Provisioning process

* When a consumer is granted access to an API proxy within Apigee the agent will:
    * Create an application on Apigee, with the same name, and assign the ownership to the developer email address configured for the agent
    * Create a product on Apigee, if one does not already exist, that allows access to the specified API proxy
        * If a quota has been set in Amplify then that quota will be used when creating the product in Apigee
* When a consumer requests credentials for an application that has access to an API proxy within Apigee the agent will:
    * Find the previously created application on Apigee and create a new credential within that application
    * Allow access to all products created previously for the application on Amplify
    * Return the created credential to Amplify, encrypted, to be viewed by the consumer in Marketplace

{{< alert title="Note" color="primary" >}}Although credentials will be created and returned to a consumer, the API proxy on Apigee must have a policy that validates them.{{< /alert >}}

{{< alert title="Note" color="primary" >}}Quotas set on products within Apigee must be enforced by a policy within the API proxy on Apigee. See [Quota policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/quota-policy) for more information.{{< /alert >}}

### Traceability Agent

The Traceability Agent gathers usage metrics for all proxies defined in Apigee X. The agent will query, based on the configured frequency, the Apigee X stats API for new metrics. The metrics, as noted in the [Apigee X documentation](https://cloud.google.com/apigee/docs/api-platform/analytics/use-analytics-api-measure-api-program-performance), can be delayed up to 10 minutes. Due to this possible delay the Traceability Agent will not gather metrics within the last 10 minutes of executing the stats query. On subsequent runs those metrics will be gathered.

## Prerequisites

* An Axway Amplify subscription in the Amplify platform
* A Platform Service Account. See [Managing service accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts)
* An Amplify environment. See [Create an environment](/docs/integrate_with_central/cli_central/cli_environments/)
* A GCP IAM service account

## Set up GCP for Apigee agents

Set up Google Cloud Platform (GCP) so an Apigee agent can connect to and managed your Apigee X environment within Amplify.

### Before you start

* You must have access to the GCP console with permissions to create and managed IAM roles and service accounts.

### Objectives

Learn how to quickly set up a GCP role and create a service account that the Apigee agents can use to discover and manage Apigee X on your behalf.

### GCP IAM setup

#### Enable IAM Service Account Credentials API

The IAM Service Account Credentials API allows the creation of short-lived credentials and is required by the Apigee agents to log into your GCP project and request a short-lived credential while placing API calls.

1. Navigate to *APIs and Services* in your GCP project.
2. Click **+ ENABLE APIS AND SERVICES** at the top of *APIs and Services*.
3. Type `IAM Service Account Credentials API` in the search box and search for it.
4. Select the **IAM Service Account Credentials API** option that appears in the results and click **ENABLE**. If it had previously been enabled the **MANAGE** button will appear.

#### GCP Axway service account (**Embedded agents only**)

Allow the Axway service account to create a token in your GCP project.

1. Navigate to *IAM* in the GCP IAM Console and select **Grant Access**.
2. Enter `srvc-amplifyagent@rd-amplify-apigee-agent.iam.gserviceaccount.com` in the New principals box.
3. Select **Service Account Token Creator** under Assign role.
4. Click **Save**.

The Axway service account can now create short lived tokens within your GCP project.

#### GCP role

Create an IAM role that allows the Apigee agents to discover, provision, and gather stats from your Apigee X deployment.

1. Navigate to *Roles* in the GCP IAM Console and click **+Create Role**.
2. Set a Title, Description, ID, and launch stage.
3. Add all of the permissions listed in [GCP role permissions](#gcp-role-permissions).
4. Click **Create**.

#### GCP role permissions

```
apigee.apiproducts.create
apigee.apiproducts.get
apigee.apiproducts.list
apigee.appkeys.create
apigee.appkeys.delete
apigee.appkeys.get
apigee.appkeys.manage
apigee.deployments.list
apigee.developerapps.create
apigee.developerapps.delete
apigee.developerapps.get
apigee.developerapps.list
apigee.developerapps.manage
apigee.developers.create
apigee.developers.delete
apigee.developers.get
apigee.developers.list
apigee.environments.getStats
apigee.proxyrevisions.get
apigee.resourcefiles.get
apigee.resourcefiles.list
apigee.organizations.get
```

### GCP service account

Create an IAM role with a trust relationship that allows the Apigee agents to receive the privileges in the IAM policy.

1. Navigate to *Service Accounts* in the GCP IAM Console and click **+Create Service Account**.
2. Set a Name, ID, and Description then click **Create and Continue**.
3. Grant the role, created above, to this service account and click **Continue**.
4. (**Embedded agents only**) In the *Service account users role* input allow Axway's GCP service account the ability to [Impersonate](https://cloud.google.com/docs/authentication/use-service-account-impersonation) this role by entering `srvc-amplifyagent@rd-amplify-apigee-agent.iam.gserviceaccount.com`.
5. Save the service account email address, as it will be required when setting up your agent.

Now that GCP is all set, you can deploy your Embedded Apigee agents and Ground Apigee agents with Axway CLI.
