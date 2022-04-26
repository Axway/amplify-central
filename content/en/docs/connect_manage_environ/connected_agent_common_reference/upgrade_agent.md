---
title: Upgrade an agent
linkTitle: Upgrade an agent
draft: false
weight: 20
description: Upgrade your agent
---
## Before you start

* Make sure a previous version of the agent is installed
* Determine if your existing agent installation uses environment variables or a YAML file, or both

## Objectives

Learn how to upgrade an existing agent installation.

## Standard upgrade procedure

* Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then replace `{agentVersion}` with the current agent release in following sections.

* If your agent uses environment variables, replace the existing [binary](#axway-gateway-agents-binary-mode-upgrade)/[Docker](#axway-gateway-agents-docker-mode-upgrade) image with the new one.

* If your agent uses a YAML file, to simplify the upgrades going forward, it is recommended to convert the YAML file values into the corresponding environment variables. The variables are described in the "Reference - Agent Configuration" section of the corresponding gateway:

    * [Axway gateway](/docs/connect_manage_environ/connect_api_manager/agent-variables/)
    * [AWS gateway](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-1)
    * [Azure gateway](/docs/connect_manage_environ/connect_azure_gateway/agent-variables)

For converting a YAML entry into an environment variable entry, all the YAML paths you traverse to reach a value should become part of the environment variable name. The name of the environment variable is compose of each capitalized path separated by an underscore.

Original YAML file:

```yaml
main:
  subsection:
    entry: value
```

Correspond to this entry in environment variables: `MAIN_SUBSECTION_ENTRY=value`

This [blog article](https://devblog.axway.com/dev-insights/amplify-central-agent-configuration-yaml-and-env-files/) contains another transformation sample related to the subscription section.

### Axway gateway agents upgrade

For version 1.1.9 and later, the agent sets the owner team of an API Service based on the organization name the API belongs to. If an organization name matches a team name, the ownership of the API is assign to this team, and only the users belongings to this team can manage the APIs. It is no longer necessary to set `CENTRAL_TEAM` in the Discovery Agent configuration and `owningTeam` in the Discovery Agent resource.

To remove the owningTeam from the agent resource:

* Get existing resource: `axway central get da -s <environmentName> -o yaml > da.yaml`
* Edit the `da.yaml` file and replace:

```yaml
...
spec:
  config:
    owningTeam: valueHere
...
```

by

```yaml
...
spec:
  config: {}
...
```

* Apply the updated file: `axway central apply -f da.yaml`

When you restart your agent, the API services ownership will be set according to your v7 organization setup. APIs belongings to one organization will be owned by the matching team in Amplify platform. Only users from that team will be able to manage this API.

#### Axway gateway agents binary mode upgrade

The following steps will guide your through the upgrade procedure:

1. Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then replace `{agentVersion}` with the current agent release, below.
2. Download the agent binary:
    * discovery agent: `curl -L "https://axway.jfrog.io/artifactory/ampc-public-generic-release/v7-agents/v7_discovery_agent/{agentVersion}/discovery_agent-{agentVersion}.zip" -o discovery_agent-{agentVersion}.zip`
    * traceability agent: `curl -L "https://axway.jfrog.io/artifactory/ampc-public-generic-release/v7-agents/v7_traceability_agent/{agentVersion}/traceability_agent-{agentVersion}.zip" -o traceability_agent-{agentVersion}.zip`
3. Stop the agent or the agent service.
4. Archive the previous agent binary in case you need to revert back to the previous version.
5. Replace the binary with the new one contained in the zip file that was downloaded from Step 1.
6. Start the agent or the agent service.

{{< alert title="Note" color="primary" >}}For Discovery Agent version 1.1.9 and later, when the `CENTRAL_TEAM variable` is not set (default = blank), the agent will attempt to match an Axway gateway organization to an Amplify platform team, assigning resources appropriately. No match will have the previous behavior.{{< /alert >}}

#### Axway gateway agents Docker mode upgrade

The following steps will guide you through the upgrade procedure:

1. Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then replace `{agentVersion}` with the current agent release, below.
2. Pull the current image:
    * Discovery Agent: `docker pull axway.jfrog.io/ampc-public-docker-release/agent/v7-discovery-agent:{agentVersion}`
    * Traceability Agent: `docker pull axway.jfrog.io/ampc-public-docker-release/agent/v7-traceability-agent:{agentVersion}`
3. Stop and delete the existing container:
    * Find the container identifier: `docker container ls`
    * `docker container stop {container id}`
    * `docker rm {container id}`
4. Start the new container:
    * Discovery Agent: `docker run --env-file ./da_env_vars.env -v <pwd>/keys:/keys axway.jfrog.io/ampc-public-docker-release/agent/v7-discovery-agent:{agentVersion}`
    * Traceability Agent: `docker run --env-file ./ta_env_vars.env -v <pwd>/keys:/keys -v <pwd>/events:/events axway.jfrog.io/ampc-public-docker-release/agent/v7-traceability:{agentVersion}`

{{< alert title="Note" color="primary" >}}For Discovery Agent version 1.1.9 and later, when the `CENTRAL_TEAM variable` is not set (default = blank), the agent will attempt to match an Axway gateway organization to an Amplify platform team, assigning resources appropriately. No match will have the previous behavior.{{< /alert >}}

### AWS agents

* If your AWS agents are running in an EC2 instance or ECS-fargate, restart the instance to get the latest agent release.

{{< alert title="Note" color="primary">}}It is possible that an old installation contains the latest tags attached to the Docker pull command. If you do not want the instance restart to pull the latest agent, connect to your instance and edit the file `start-agents.sh`. Comment the line that removes the container and pulls the new image:

```shell
#echo "Pulling docker images"
#docker pull axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-discovery-agent:latest
#docker pull axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-traceability-agent:latest
...
echo "Removing current docker containers to update env_vars"
#docker rm traceability-agent | true
#docker rm discovery-agent | true
```

Otherwise, if the command shows an actual version and not `latest`, then restarting the instance will not download a new version. You will then have to decide when to install a more recent version. Refer to [Agent release note](/dosc/amplify_relnotes) to find the current available version. When you are ready to upgrade, simply replace the existing version number with the new one and restart the instance. The images will be automatically pulled and started.
{{< /alert >}}

* If your AWS agents are running in a Docker container, use the following upgrade procedure:

    1. Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then replace `{agentVersion}` with the current agent release, below.
    2. Pull the current image:
        * Discovery Agent: `docker pull axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-discovery-agent:{agentVersion}`
        * Traceability Agent: `docker pull axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-traceability-agent:{agentVersion}`
    3. Stop and delete the existing container:
       * find the container identifier: `docker container ls`
       * `docker container stop {container id}`
       * `docker rm {container id}`
    4. Start the new container:
        * Discovery Agent: `docker run --env-file ./da_env_vars.env -v <pwd>/keys:/keys axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-discovery-agent:{agentVersion}`
        * Traceability Agent: `docker run --env-file ./ta_env_vars.env -v <pwd>/keys:/keys -v axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-traceability-agent:{agentVersion}`

### Azure agents

The following steps will guide you through the upgrade procedure:

1. Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then replace `{agentVersion}` with the current agent release, below.
2. Pull the current image:
    * Discovery Agent: `docker pull axway.jfrog.io/ampc-public-docker-release/agent/azure-discovery-agent:{agentVersion}`
    * traceability agent: `docker pull axway.jfrog.io/ampc-public-docker-release/agent/azure-traceability-agent:{agentVersion}`
3. Stop and delete the existing container:
    * find the container identifier: `docker container ls`
    * `docker container stop {container id}`
    * `docker rm {container id}`
4. Add the AZURE_* properties coming from the `da_env_vars.env` file to  the `ta_env_vars.env` file for Traceability Agent to use Azure API for fetching the metrics for the usage report:

```shell
#sample configuration after this step:

# added Azure properties from Discovery Agent configuration
AZURE_TENANTID=300f59df-....
AZURE_SUBSCRIPTIONID=0fb0f691-....
AZURE_RESOURCEGROUPNAME=res-group-name
AZURE_CLIENTID=3be27ccb-....
AZURE_CLIENTSECRET=edH~Csgc.....
AZURE_APIMSERVICENAME=beano-apim


# existing Azure properties for Traceability Agent
AZURE_EVENTHUBNAME=sample-event-hub
AZURE_EVENTHUBNAMESPACE=event-hub-namespace
AZURE_SHAREDACCESSKEYNAME=SharedAccess
AZURE_SHAREDACCESSKEYVALUE=zYn2K4P...
...
```

Start the new container:

* Discovery Agent: `docker run --env-file ./da_env_vars.env -v <pwd>/keys:/keys axway.jfrog.io/ampc-public-docker-release/agent/azure-discovery-agent:{agentVersion}`
* Traceability Agent: `docker run --env-file ./ta_env_vars.env -v <pwd>/keys:/keys -v <pwd>/events:/events axway.jfrog.io/ampc-public-docker-release/agent/azure-traceability:{agentVersion}`

## Troubleshooting your upgrade

The following are common issues you may encounter when upgrading.

### Why can't I see my agent status in the Topology/Environment details page?

There are 2 main reasons why the agent status is not shown in the environment details page: either the agent is not hooked up to the existing resource or the agent resource does not exist.

#### Agent not hooked up to the existing resource

In this scenario, you must first verify that the agent resources exist on Amplify and use the Amplify Central CLI.

1. Connect to the platform: `axway auth login`
2. Check that resources exist:
    * Discovery Agent: `axway central get da -s yourEnvironmentName`
    * Traceability Agent: `axway central get ta -s yourEnvironmentName`
3. Identify the resource name using the **Name** column from the previous result and report it in the environment variable file (`da_anv_vars.env` for Discovery Agent or `ta_env_vars.env` for Traceability Agent) using the variable `CENTRAL_AGENTNAME=theValueYoufound`.

Sample of the CLI output when resources are found:

```shell
C:\>axway central get da -s azure
√ Resource(s) successfully retrieved

NAME                   DATAPLANE TYPE  STATUS   RESOURCE KIND   SCOPE KIND   SCOPE NAME     RESOURCE GROUP
azure-discovery-agent  Azure           stopped  DiscoveryAgent  Environment  azure          management

C:\>axway central get ta -s azure
√ Resource(s) successfully retrieved

NAME                      DATAPLANE TYPE  STATUS   RESOURCE KIND      SCOPE KIND   SCOPE NAME   RESOURCE GROUP
azure-traceability-agent  Azure           stopped  TraceabilityAgent  Environment  azure        management
```

Sample of the CLI output when no resources are found:

```shell
C:\>axway central get da -s azure
√ Resource(s) successfully retrieved

No resources found.

C:\>axway central get ta -s azure
√ Resource(s) successfully retrieved

No resources found.
```

{{< alert title="Note" color="primary" >}}`yourEnvironmentName` is the name of the environment where the agent is supposed to be attached to (azure in the samples above). If you do not find any resources, please proceed to [Agent resources do not exist](#agent-resources-do-not-exist).{{< /alert >}}

#### Agent resources do not exist

This typically happens when an agent is installed but the agent resources do not exist, or the Axway Central CLI did not provide them.

In this situation, you must create the appropriate resources in the Amplify platform. The resources will represent the agent in Amplify platform. Once the resources are created, you must link the agent with with the resources using the environment variable `CENTRAL_AGENTNAME=yourCreatedResourceName`.

The resource creation procedure is explained [here](/docs/connect_manage_environ/environment_agent_resources).

### After upgrading, I cannot see my headers & path in Business Insights?

As of release 1.0.20210421, the agent SDK includes a tracing redaction/sanitizing feature, which is turned on by default.

Previously, users were able to see the headers/path in Business Insights. Now, everything is replace with the '*' character.  For the same experience as before, add the following to `ta_env_vars.env`:

```shell
# path
TRACEABILITY_REDACTION_PATH_SHOW=[{keyMatch:".*"}]
# query parameters
TRACEABILITY_REDACTION_QUERYARGUMENT_SHOW=[{keyMatch:".*"}] 
# request headers
TRACEABILITY_REDACTION_REQUESTHEADER_SHOW=[{keyMatch:".*"}] 
# response headers
TRACEABILITY_REDACTION_RESPONSEHEADER_SHOW=[{keyMatch:".*"}]
# jms properties
TRACEABILITY_REDACTION_JMSPROPERTIES_SHOW=[{keyMatch:".*"}]
```

See [Trace redaction](/docs/connect_manage_environ/connected_agent_common_reference/trace_redaction) for more information.
