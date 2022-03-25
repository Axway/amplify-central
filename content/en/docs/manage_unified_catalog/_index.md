---
title: Manage your Unified Catalog
linkTitle: Manage your Unified Catalog
weight: 500
description: "Normalize discovery for APIs from multiple gateways, classify your
  services to support multiple audiences (partners, IT, business), control
  consumer subscription to access your APIs, and extend your APIs to be reused
  in other integration flows."
---
Amplify Unified Catalog is a SaaS based service that is part of the Amplify platform management layer, Amplify Central.

Amplify Central and Amplify Unified Catalog work together to provide a common place for all integration assets from all of your distributed gateways through the enterprise. Amplify Unified Catalog enables sophisticated integration ﬂows combining cloud and public on-premise APIs together. Alongside API interfaces, you can find Managed File Transfer (MFT) flows that move data across your enterprise and outside its boundaries.

The endpoints in the catalog are hosted in different environments, such as in the cloud, on-premise, within a microservice mesh, or at the edge (DMZ) of the organization. Amplify Central manages multiple gateway environments that feed the Unified Catalog service. These gateways can be Axway gateways (for example, API Manager) or another vendors (for example, AWS or Azure), or they can also be repositories such as GitHub and SwaggerHub.

![Automate the population of the Unified Catalog from multiple source](/Images/catalog/automate-the-population-of-the-unified-catalog-from-multiple-sources.png "Automate the population of the Unified Catalog from multiple source")

## Unified Catalog capabilities

The Unified Catalog capabilities include:

* Event-driven subscriptions management: You can create custom subscription flows for each registered environment enabling complex approval flows and integration with existing systems to streamline experience and reduce time for approval.
* Customized documentation for each catalog asset. The documentation is written using Markdown.
* Selective sharing of integration assets with teams and users.
* Tagging and categorization to create views for different type of audiences (providers and consumers).

## Use cases for discovering assets

Use cases to find and discover assets in the Unified Catalog include:

* Line of Business Managers and Digital Strategists looking for how they can innovate and take advantage of the value your APIs are unlocking.
* Providers (IT Planners and Product Managers) looking for how your APIs and integration assets can support reuse, and the data to which they need access to deliver new digital and mobile experiences.
* Consumers (Application Developers, Integration Specialists) looking to use your APIs directly and get access so they can innovate and build digital products with speed and control.
* Managed File Transfer Providers looking for easily and efficiently onboard new partners to exchange files, by removing all the human-to-human contact and manual processes.
* Managed File Transfer Consumers, Relationship managers or Partners looking to exchange files.
* Searching and filtering.
* Management of the apps that consume the APIs or other integration assets.
* Measuring the popularity of an asset using views, subscriptions, and transactions.

## Supported Asset Types

The Unified Catalog supports the following type of assets:

* REST APIs: OpenAPI Specification (OAS) file that describes the structure of the REST API.
* SOAP APIs: WSDL specification file that describes the definition of the SOAP API.
* gRPC APIs: Protocol Buffer file that describes the definition of gRPC APIs.
* AsyncAPI: Supported as "Unstructured" type to publish the specification of the API.
* MFT flows: Manage File Transfer Service definitions.
* Custom: Custom assets, such as API Definitions that are technology agnostic, SDKs, tutorials, etc.
