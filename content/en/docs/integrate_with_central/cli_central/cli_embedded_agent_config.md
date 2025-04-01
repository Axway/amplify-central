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
* Apply the updated resource, with configuration changes, to Amplify Engage

## Dataplane

The dataplane resource can be configured with configuration that is common to both the Embedded Discovery and Traceability Agents.

* Pull the existing dataplane from your environment and direct it to a file:

    ```bash
    axway central get -o yaml -s <environment> dataplane <dataplane-name> > dataplane.yaml
    ```

* Using an editor of your choice, open the `agent.yaml` file and update the settings for the dataplane type you are using. The settings for each are listed below.

### AWS

Set the access log group ARN value so that the Discovery Agent can set up logging and the Traceability Agent will know where to read the logs.

* **accessLogARN** - the ARN needed in both agents. When a Discovery Agent discovers a Stage, this arn will be set for its logging. The Traceability Agent will also read this log for reporting usage, metrics, and traffic events.

## Embedded Discovery Agent

Configure to apply a filter to the dataplane resource for discovery, add additional tags to resources on Amplify Engage, ignore tags on dataplane resources before pushing to Amplify Engage, and set the owner of the resources.

* Pull the existing Discovery Agent from your environment and direct it to a file:

    ```bash
    axway central get -o yaml -s <environment> discoveryagent <agent-name> > agent.yaml
    ```

* Using an editor of your choice, open the `agent.yaml` file and add/change any or all values:
    * **filter** - `tag.DISCOVER.Exists() == true` specifies that the data plane resource must have a tag named DISCOVER
    * **additionalTags** - a list of strings that will be added to Amplify Engage resources that are created
    * **ignoreTags** - tags that, if found on the data plane resource, will not be added to Amplify Engage resources
    * **owner** - the team owner that will be set when creating resources in Amplify Engage
        * type - set to `team`
        * id - the id value found when viewing the team in Amplify Engage

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

### SwaggerHub configuration

Add additional tags to resources on Amplify Engage, ignore tags on dataplane resources before pushing to Amplify Engage, and set the owner of the resources.

* Pull the existing Discovery Agent from your environment and direct it to a file:

    ```bash
    axway central get -o yaml -s <environment> discoveryagent <agent-name> > agent.yaml
    ```

* Using an editor of your choice, open the `agent.yaml` file and add/change any or all values:
    * **additionalTags** - a list of strings that will be added to Amplify Engage resources that are created
    * **ignoreTags** - tags that, if found on the data plane resource, will not be added to Amplify Engage resources
    * **owner** - the team owner that will be set when creating resources in Amplify Engage
        * type - set to `team`
        * id - the id value found when viewing the team in Amplify Engage

    ```yaml
    spec:
      config:
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

* Set the filter values:
    * **filter** - the filters to determine what kind of APIs to discover. Not setting the filter will discover all the APIs.
        * **visibility** - the visbility state of the API in   SwaggerHub, it can be either public, private, or both.
        * **publication** - the publication state of the API in SwaggerHub, it can be either published, unpublished, or both.

    ```yaml
    spec:
    type: SwaggerHub
    config:
      type: SwaggerHub
      owner: <org_owner>
      filter: { 
        visibility: Public,
        publication: Both 
      }
    ```

* After editing is complete and the file is saved, run the command to push the changes:

    ```bash
    axway central apply -f agent.yaml
    ```

## Embedded Traceability Agent

Configured to set if headers should be processed, redact certain information, and set the owner for the transactional data.

* Pull the existing Traceability Agent from your environment and direct it to a file:

    ```bash
    axway central get -o yaml -s <environment> traceabilityagent <agent-name> > agent.yaml
    ```
* Using an editor of your choice, open the `agent.yaml` file and add/change any or all values:
    * **redaction** - the redaction settings to use when reporting transactions from the dataplane [Redaction](#redaction)
        * **path** - a list of all URL paths, or path regular expressions, which may be reported to Amplify Engage
        * **queryArgument** - regular expressions applied to the query argument name and query argument value in the transactional data
            * **show** - query argument names that match any of these expressions will be reported
            * **sanitize**
                * **keyMatch** - query argument names that match any of these expressions will have the valueMatch sanitized
                * **valueMatch** - when the query argument name matches the keyMatch expression, the valueMatch expression is applied and replaces the matches in the query argument value with the masking character value
        * **requestHeaders** - regular expressions applied to the request headers in the transactional data
            * **show** - request headers keys that match any of these expressions will be reported
            * **sanitize**
                * **keyMatch** - request headers keys that match any of these expressions will have the valueMatch sanitized
                * **valueMatch** - when the header name matches the keyMatch expression, the valueMatch expression is applied and replaces the matches in the header value with the masking character value
        * **responseHeaders** - regular expressions applied to the response headers in the transactional data
            * **show** - response headers keys that match any of these expressions will be reported
            * **sanitize**
                * **keyMatch** - response headers keys that match any of these expressions will have the valueMatch sanitized
                * **valueMatch** - when the header name matches the keyMatch expression, the valueMatch expression is applied and replaces the matches in the header value with the masking character value.
        * **maskingCharacter** - the set of character(s) that will replace any value matched while sanitizing
    * **owner** - the team owner that will be set when creating resources in Amplify Engage
        * type - set to `team`
        * id - the id value found when viewing the team in Amplify Engage

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
        owner:
          type: team
          id: <team-id>
    ```

### Redaction

Redaction settings can be added to the Embedded Traceability Agent that will be used when finding and reporting transactional data to Amplify Engage. The settings include the ability to customize the URL path of the transaction, the query arguments in the transaction, as well as the request and response headers.

* Learn the Regular Expression syntax ([RE2 Syntax](https://github.com/google/re2/wiki/Syntax)) supported by the agent.
