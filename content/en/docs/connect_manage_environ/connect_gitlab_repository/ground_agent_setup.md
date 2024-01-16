---
title: Set up GitLab for Ground agents
linkTitle: Set up GitLab for Ground agents
draft: false
weight: 100
---
Set up GitLab so a Ground agent can connect to and discover API specifications to publish in Amplify.

## Before you start

* You must have access to GitLab and the ability to create a user access token that the agent can use to connect to the desired repository.

## Objectives

Learn how to quickly set up a GitLab access token to allow the agent to discover API specification files in your repository.

## Gitlab setup

The following sections will guide through the Gitlab Agent setup

### Gitlab personal access token

1. Log into Gitlab account
2. On the left-top side, under user icon, select **Preferences**
3. Under *User Settings* on the left side, select **Access Tokens**
4. Select **Add new token** and set the following:
    * Token name: *gitlab-agent*, for example
    * Expiration date: set the wanted date
    * Select scopes: *api*, *read_api*, *read_repository*
    * Click **Create personal access token**

---
**NOTE:**

Copy the token value and keep it safe, you won't be able to see it again

---