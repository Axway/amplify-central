---
title: SaaS API Gateway concepts
linkTitle: Concepts
draft: true
weight: 10
date: 2019-07-30T00:00:00.000Z
---
The fundamental SaaS API Gateway concepts you will encounter in Amplify.

## API and API proxy

Watch this short video to learn more about API proxies.

{{< youtube ja9HPLlzcn4 >}}

### What is an API?

An API is an interface to a service, that enables app developers to interact with it or *consume* it. For example, you might have a weather service that app developers can use to show today's weather forecast to the users of their cycling app.

An API is clearly defined by way of its endpoints, request parameters, and responses. This makes it easy for app developers to use the API, as the API specification (for example, Open API or Swagger) tells them:

* What requests they can send and to what address
* What the supported request parameters are
* What responses they can expect

An API implies a *contract*, which provides app developers with an assurance that the API will change in a predictable manner over time, meaning that their app will continue to work with future changes to the API. Amplify supports Swagger 2.0 and Open API 3.0 specifications.

### What is an API proxy?

In Amplify, you create an API proxy to represent your back-end API to your API consumers. Instead of interacting directly with your API, app developers now interact with the API proxy.

![Interactions between app developers - API proxy - back-end API](/Images/central/api_proxy.png)

Managing your API in Amplify by way of an API proxy offers the following benefits:

* You can change the implementation of the back-end service without impacting app developers as they continue to call the API proxy.
* You can apply policies to the API proxy to manage or secure how client apps use your API.
* You can analyze the usage of your APIs by client apps, and identify and analyze failed transactions, as all traffic that flows through an API proxy is monitored and recorded.

## Roles and teams

Amplify has its own set of roles in addition to the Amplify platform roles. These Amplify roles include Amplify **Engage Admin**, **Developer**, and **Consumer** type roles to manage and use assets (for example, API proxies, applications, environments, Marketplace, and so on).  

* Amplify **Engage Admin** has full access to manage Amplify and the Marketplace.
* Amplify **Central Developer** has access to the Marketplace, Application management, and traffic monitoring.
* Amplify **Central Consumer** has access to the Marketplace and its Applications.

An Amplify team is a group of users with varying abilities to manage and use assets. For example, a team member can share assets and their promotion to the Marketplace.

Users and teams of Amplify are managed by the Amplify platform. For more information, see [Managing Organizations](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html).

<!-- ### Amplify Central roles -->

<!-- The roles available in Amplify Central and the capabilities of each role are: -->

<!-- TODO Add list of roles and what they can do -->

<!-- TODO Add something explaining a user can have a different role on each of the teams they are a member of. -->
