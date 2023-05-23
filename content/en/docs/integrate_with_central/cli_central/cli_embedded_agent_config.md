---
title: Add configuration to your Embedded agents
linkTitle: Add configuration to your Embedded agents
weight: 300
---
Use the Axway Central CLI to update the configuration settings for an Embedded agent.

## Before you start

* You must [authorize your DevOps service to use the DevOps API](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-devops-service-to-use-the-amplify-central-apis)
* Verify that the @axway/amplify-central-cli version is at a minimum of 0.1.3
* Know the logical name of the environment that the agent to be updated belongs
* You have already completed the setup and creation of an Embedded agent

## Objective

Learn how to add or change configuration settings for an Embedded agent using the Axway Central CLI.

* Pull the current agent configuration and save it to a file
* Learn the configuration settings and where to add them in the resource file
* Apply the updated resource, with configuration changes, to Amplify Central

## Embedded Discovery Agent

The Embedded Discovery Agent can be configured to apply a filter to the data plane resource for discovery, add additional tags to resources on Central, ignore tags on data plane resources before pushing to Central, and set the owner of the resources.

* Pull the existing Discovery Agent from your environment and direct it to a file:

    ```bash
    axway central get -o yaml -s <environment> discoveryagent <agent-name> > agent.yaml
    ```

* Using the editor of your choice, open the `agent.yaml` file and add/change any or all values:
    * **filter** - `tag.DISCOVER.Exists() == true` specifies that the data plane resource must have a tag named DISCOVER
    * **additionalTags** - a list of strings that will be added to Central resources that are created
    * **ignoreTags** - tags that, if found on the data plane resource, will not be added to Central resources
    * **owner** - the team owner that will be set when creating resources in Central
        * type - set to `team`
        * id - the id value found when viewing the team in Central

    ```yaml
    spec:
      config:
        filter: tag.DISCOVER.Exists() == true
        additionalTags:
          - addTagName1
          - addTagName2
        ignoreTags:
          - sensitive
          - SENSITIVE
       owner:
          type: team
          id: <team-id>
    ```

* After editing is complete and the file is saved, run the command to push the changes:

    ```bash
    axway central apply -f agent.yaml
    ```
