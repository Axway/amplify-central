---
title: Set up your GitLab discovery agent
linkTitle: Set up GitLab discovery agent
draft: false
weight: 100
---
Set up GitLab so a Ground agent can connect to and discover API specifications to publish in Amplify.

## Before you start

* You must have access to GitLab and the ability to create a user access token that the agent can use to connect to the desired repository.

## Objectives

Learn how to quickly set up a GitLab access token to allow the agent to discover API specification files in your repository.

## GitLab setup

1. Log into your GitLab account.
2. Click the user icon, select **Preferences**.
3. On the left under *User Settings*, select **Access Tokens**.
4. Click **Add new token** and set the following:
    * Token name: *gitlab-agent*, for example
    * Expiration date: set the wanted date
    * Select scopes: **api**, **read_api**, **read_repository**
    * Click **Create personal access token**

{{< alert title="Note" color="primary" >}}Copy the token value and keep it safe, you won't be able to see it again.{{< /alert >}}

## Agent variables

All common agent variables can be found [here](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#agent-variables).

| Variable name                  | Description                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| GITLAB_TOKEN                   | The token that the agent will use to authenticate to GitLab.                                                 |
| GITLAB_BASE_URL                | The base URL that the agent will use to communicate to GitLab.                                               |
| GITLAB_REPOSITORY_ID           | The ID of the repository on GitLab.                                                                          |
| GITLAB_REPOSITORY_BRANCH       | The name of the branch within the repository that the agent should look for spec files  in                   |
| GITLAB_REPOSITORY_SPEC_PATHS   | A comma separated list of paths within the repository to look for spec files in                              |
| GITLAB_REPOSITORY_SPEC_FILTERS | Regular expression filters to apply to files in order to determine if it should be discovered as a spec file |

### GITLAB_REPOSITORY_SPEC_PATHS and GITLAB_REPOSITORY_SPEC_FILTERS

While setting up your agent it is possible to limit where the agent will look for specification files as well as limit the file names that the agent will discover.

Below is an example of how to use both of these settings in the agent environment configuration.

```shell
GITLAB_REPOSITORY_SPEC_PATHS="rest-apis,wsdl-apis"
GITLAB_REPOSITORY_SPEC_FILTERS=".*.json$,.*.yaml$,.*.xml$"
```

These settings will configure the agent to look only for files that end in `json`, `yaml`, or `xml`. Furthermore only the folders named `rest-apis` and `wsdl-apis` will be searched.