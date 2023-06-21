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

## Dataplane

The Dataplane resource can be configured with configuration that is common to both the Embedded Discovery and Traceability Agents.

* Pull the existing Dataplane from your environment and direct it to a file:

    ```bash
    axway central get -o yaml -s <environment> dataplane <dataplane-name> > dataplane.yaml
    ```
* Using the editor of your choice, open the `agent.yaml` file
* Update the settings for the dataplane type you are using, settings for each are below.

### AWS

A Dataplane of type AWS will need the access log group ARN value set so the Discovery Agent may setup logging and the Traceability Agent will know where to read the logs.

* **accessLogARN** - the ARN needed in both agents. When a discovery agent discovers a Stage this arn will be set for its logging. The traceability agent will also read this log for reporting usage, metrics, and traffic events.

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

## Embedded Traceability Agent

The Embedded Traceability Agent can by configured to set if headers should be processed, redact certain information, sample an amount of the transactional data, and set the owner for the transactional data.

* Pull the existing Traceability Agent from your environment and direct it to a file:

    ```bash
    axway central get -o yaml -s <environment> traceabilityagent <agent-name> > agent.yaml
    ```
* Using the editor of your choice, open the `agent.yaml` file and add/change any or all values:
    * **redaction** - the redaction settings to use when reporting transactions from the data plane [Redaction](#redaction)
        * **path** - a list of all URL paths, or path regular expressions, that may be reported to Central
        * **queryArgument** - regular expressions applied to the query arguments in the transactional data
            * **show** - query arguments names that match any of these expressions will be reported
            * **sanitize**
                * **keyMatch** - query argument names that match any of these expressions will have the valueMatch sanitized
                * **valueMatch** - when the keyMatch matches this expression is applied to replace matches within the value masking character
        * **requestHeaders** - regular expressions applied to the request headers in the transactional data
            * **show** - request headers keys that match any of these expressions will be reported
            * **sanitize**
                * **keyMatch** - request headers keys that match any of these expressions will have the valueMatch sanitized
                * **valueMatch** - when the keyMatch matches this expression is applied to replace matches within the value the masking character
        * **responseHeaders** - regular expressions applied to the response headers in the transactional data
            * **show** - response headers keys that match any of these expressions will be reported
            * **sanitize**
                * **keyMatch** - response headers keys that match any of these expressions will have the valueMatch sanitized
                * **valueMatch** - when the keyMatch matches this expression is applied to replace matches within the value masking character
        * **maskingCharacter** - the set of character(s) that will replace any value matched while sanitizing
    * **sampling** - the sampling settings that will be applied when reporting transactional data
        * **percentage** - the percentage of all transacations that will be reported to Central for display in Business and Consumer Insights
        * **allErrors** - when set to `true`, regardless of the percentage, all errored transactions will be reported to Central
    * **owner** - the team owner that will be set when creating resources in Central
        * type - set to `team`
        * id - the id value found when viewing the team in Central

    ```yaml
    spec:
      config:
        redaction:
          path:
            - <path-regex>
          queryArgument:
            show:
              - <arg-regex>
            sanitize:
              - keyMath: <arg-regex>
                valueMatch: <val-regex>
          requestHeaders:
            show:
              - <header-key-regex>
            sanitize:
              - keyMath: <header-key-regex>
                valueMatch: <header-val-regex>
          responseHeaders:
            show:
              - <header-key-regex>
            sanitize:
              - keyMath: <header-key-regex>
                valueMatch: <header-val-regex>
          maskingCharacter: {*}
        sampling: 
          percentage: 1
          allErrors: true
        owner:
          type: team
          id: <team-id>
    ```

### Redaction

Redaction settings can be added to the Embedded Traceability Agnet that will be used when finding and reporting transactional data to Central.  The settings include the ability to customize the URL path of the transaction, the query arguments in the transaction, as well as the request and response headers

* Learn the Regular Expression syntax ([RE2 Syntax](https://github.com/google/re2/wiki/Syntax)) supported by the agent.