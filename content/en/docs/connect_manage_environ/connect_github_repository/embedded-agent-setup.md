---
title: Set up GitHub for Embedded agents
linkTitle: Set up GitHub for Embedded agents
draft: false
weight: 100
---
Set up GitHub so an Embedded agent can connect to and discover API specifications to publish in Amplify.

## Before you start

* You must have access to GitHub and the ability to create a user Access Token that the agent can use to connect to the desired repository.

## Objectives

Learn how to quickly set up a GitHub access token to allow the agent to discover API specification files in your repository.

## GitHub setup

The Embedded agent uses a personal access token to read your repository, this token does not need any access other than read. See [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

1. Within a browser navigate to GitHub.
2. Navigate to *Settings* for your user profile.
3. Click *Developer settings* at the bottom of the left navigation.
4. Select *Personal access tokens* and then *Tokens (classic)*.
5. Click *Generate new token* and then *Generate new token (classic)*.
6. Set an expiration time according to your organizations policy.
7. Do not click and boxes granting more privileges.
8. At the common click *Generate token*.
9. Save the token for installation.