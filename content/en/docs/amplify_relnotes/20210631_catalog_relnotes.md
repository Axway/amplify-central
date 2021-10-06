---
title: Unified Catalog June 2021 Release Notes
linkTitle: Unified Catalog June 2021
weight: 90
date: 2021-06-21
description: The Unified Catalog is the Marketplace of all integration assets in
  the enterprise, that can range from APIs to Managed File Transfer Flows, and
  caters to both providers and consumers.
---
## New features and enhancements

The following new features and enhancements are available in this update:

### Category assignment via API / CLI

The Central API and CLI have been enhanced to allow for managing categories and assigning to catalog items when publishing an API Service in the Unified Catalog.

* Providers can now CREATE / READ / UPDATE / DELETE / categories using the API / CLI.
* Categories can be configured for ConsumerInstance resources that are published to the Unified Catalog.
* Providers can continue to create and manage categories from the Unified Catalog.

## Fixed issues

The following issues have been fixed in this release:

* **The protocol dropdown on the API Service Endpoint screen did not allow for selection of protocols other than http/http for AsyncAPI services.** Providers can now select from the following protocols for an AsyncAPI service: amqp, amqps, http, https, jms, kafka, kafka-secure, mqtt, secure-mqtt, stomp, stomps, ws, wss.
* **Developers could no longer access an environment owned by their team.** Developers can now access the environments owned by their team in the Central WebUI.
