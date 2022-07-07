---
title: Events and webhooks
linkTitle: Events and webhooks
weight: 300
hide_readingtime: true
---

Amplify enables the user to augment the default functionality through the integration of third-party systems and functionality. One of the ways this can be accomplished is with inbuilt events in combination with webhook integration.

**Events**: Represent things that happen in the Amplify platform.

**Webhooks**:  Used to automatically receive notifications of events that happen. These notifications can then be used as a trigger for integration purposes. Each time an event occurs, Amplify will send it to the URL configured in the Webhook. Once the target system receives this event, it can process it and act on it as needed.

A more detailed explanation around webhook integration can be found [here](/docs/integrate_with_central/integrate_with_webhooks/).

Amplify generates a wide array of events that can be used for integration purposes through webhooks, including but not limited to:

* Environments (CRUD, State changes)
* Services (CRUD, State changes)
* Assets (CRUD, State changes)
* Products (CRUD, State changes)

Common scenarios to integrate through events / webhooks are the following items:

* Manage manual subscription approvals for the Marketplace through a third-party system
* Manage manual subscription approvals for the Unified Catalog through a third-party system

The links below provide a step-by-step guide for these scenarios.
