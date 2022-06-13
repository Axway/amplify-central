---
title: Manage your Marketplace provisioning
linkTitle: Manage your Marketplace provisioning
draft: false
weight: 35
description: >-
  A subscription provides the consumer, or subscriber, with the required
  security and endpoint materials to correctly consume the API.

  The security material and/or quota to access an API is configured inside the Gateway either on the Application (Axway API Manager) or the Usage plan (AWS Gateway) or subscription (Azure Gateway).
---
## Supported use cases

### Provision dataplane when consumer request access to to a product resource

From the marketplace, a consumer will request access to a resource and then request credential. These 2 actions will generate events the discovery agent is listening to. Once the events are received by the agent, the agent will convert them based on the dataplane it is connected to:

* accessRequest becomes:
    * application and API authorization on Axway API Manager
    * Usage plan and API authorization on AWS Gateway
    * Subscription and API authorization on Azure Gateway.
* credentialRequest becomes:
    * API Key (Axway API Manager / AWS Gateway / Azure) or Oauth credential (Axway API Manager only).

### Deprovision dataplane when consumer delete an application or credentials

From the marketplace, a consumer can delete an existing application or delete an existing credential. These 2 actions will generate events the discovery agent is listening to. Once the events are received by the agent, the agent will convert them based on the dataplane it is connected to:

* removing the corresponding application from the dataplane:
    * application on Axway API MAnager
    * Usage plan on AWS Gateway
    * Subscription on Azure Gateway
* deleting a credentials:
    * API Key (Axway API Manager / AWS Gateway / Azure) or Oauth credential (Axway API Manager only).

### Report the traffic

Each time a call to an API is made on a dataplane monitored by a traceability agent, the agent will correlate the traffic to the appropriate marketplace subscription and product based on the credentials used to call the API.

In case a correlation is found, the corresponding traffic will be visible in [Consumer Insights](/docs/manage_marketplace/consumer_experience/consumer_insights) screens as well as in [Business Insights](/docs/get_actionable_insights) screens.

In case there is no possible correlation, the traffic will only be visible from Business Insights

## Discovery Agent configuration for marketplace provisioning and deprovisioning

The discovery agent variables to be added in the agent configuration

```powershell
# enable the gRPC communication with Amplify platform. Be sure the http/2 connectivity is allowed to cross your firewall/proxy if any.
CENTRAL_GRPC_ENABLED=true
# activate the Marketplace provisioning feature
AGENTFEATURES_MARKETPLACEPROVISIONING=true
# enable to store a cache locally when agent is stopped. It enables the agent to resume his treatment from where it left when restarting.
AGENTFEATURES_PERSISTCACHE=true
```

Be sure to restart your agent once the variables are updated.

{{< alert title="Note" color="primary" >}}Enabling the marketplace provisioning feature disable the unified catalog subscription workflow.{{< /alert >}}

## Traceability Agent configuration for reporting the traffic to Consumer Insights

The traceability agent variables to be added in the configuration

```powershell
# enable the gRPC communication with Amplify platform. Be sure the http/2 connectivity is allowed to cross your firewall/proxy if any.
CENTRAL_GRPC_ENABLED=true
# activate the Marketplace provisioning feature
AGENTFEATURES_MARKETPLACEPROVISIONING=true
# enable to store a cache locally when agent is stopped. It enables the agent to resume his treatment from where it left when restarting.
AGENTFEATURES_PERSISTCACHE=true
```

Be sure to restart your agent once the variables are updated.