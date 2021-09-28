---
title: Integrate with Amplify Central
linkTitle: Integrate with Amplify Central
weight: 300
description: "What you need to know to try Amplify Central APIs and build you
  own integrations. "
---
## Introduction

Amplify Central is built using API first pattern then CLI and lastly UI.

Because of that Amplify Central offers the possibility to use its own APIs to build your own integration patterns. 

## Amplify Central APis definition and usage

Amplify Central APIs are described as OAS 3.0 specification here: <https://apicentral.axway.com/apis/docs> (US region) or <https://central.eu-fr.axway.com/apis/docs> (EU region).

You can use these APIs either programmatically or using the [Axway Central CLI](/docs/integrate_with_central/cli_central/)

All APIs are secured using a JSON Web Token (JWT). When using the Axway Central CLI, this token will be automatically retrieved as soon as you are connected to Amplify using `axway auth login` command.

When using the APIs, you will need to use the following url / parameters to get your token:

* Auth URL: <https://login.axway.com/auth/realms/Broker/protocol/openid-connect/auth>
* Grant Type: Implicit
* Client ID: apicentral

and a username / password to validate your credentials.

Once you get your token you can start manipulating the Amplify Central resources.

When using APIs programmatically, some headers are required:

* **X-Axway-Tenant-Id**: should contain your organization identifier. Refer to <https://platform.axway.com> and navigate to Organization tile to find the Organization ID.
* **authentication**: contains your JWT token obtained previously. 

## What you can do?

It all depends on what you want to accomplish with the platform. 

If you want to manipulate Amplify Central resources, the APIs or [Axway Central CLI](/docs/integrate_with_central/cli_central/a) can be used to add/update/remove resources.

If you want to trigger a flow when specific events happen in Amplify Central, you will need a [webhook integration](/docs/integrate_with_central/integrate_with_webhooks/).