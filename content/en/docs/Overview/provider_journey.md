---
title: Provider Journey
linkTitle: Provider Journey
weight: 10
---

# Provider Journey in Amplify Engage

The **Provider Journey** in Amplify Engage is the end-to-end process that API providers follow to bring APIs into the platform, curate them into compliant assets, assemble them into products, and publish them for consumer access. It enables enterprises to maintain control and governance while maximizing API adoption, reuse, and business value.

The provider journey follows these key stages:

---

## 1. Create an Environment
The first step is to define an **environment**, which represents a data plane (such as an API Gateway, service platform, or repository). Environments act as the integration points between Amplify Engage and your existing runtime systems.

## 2. Discover APIs
Once an environment is connected, APIs can be discovered and brought into Amplify Engage. Discovery can happen in several ways:

- **Manual discovery** – Use the Amplify Engage WebUI to add an API service directly.  
- **Automated via CI/CD** – Integrate API discovery into your continuous delivery pipelines.  
- **Agent-based discovery** – Deploy discovery agents to continuously and automatically detect APIs from the connected gateway or service platform.

Discovered APIs are visible in both the **Environment view** and the **Service Registry view**, giving providers a central place to review and manage all available APIs.

## 3. Organize and Curate APIs
Discovered APIs must be curated into **assets** before they can be exposed for consumption. This stage ensures that APIs meet internal standards and include the necessary metadata and documentation.

- **Create an asset** – Transform a discovered API into a reusable, governed entity.  
- **Release an asset** – Activate the asset, making it available for use.  
- **End-of-life an asset** – Deprecate or archive assets that should no longer be consumed.

## 4. Productize Assets
Curated assets can be combined into **products** that represent a business offering, tailored to a specific audience or use case. Productization allows providers to group multiple APIs into a cohesive package.

- **Create a product** – Build a product from one or more curated assets.  
- **Release a product** – Activate the product and make it available for consumption.  
- **End-of-life a product** – Deprecate or archive products that are no longer relevant.

## 5. Publish and Monetize Products
Products are then **published to the Marketplace**, where they can be discovered by developers and partners. This stage provides a branded, user-friendly interface for consumers to browse, learn about, and subscribe to available products.

If monetization is enabled, products can also be tied to subscription plans that define usage tiers, pricing, and other business terms.

## 6. Manage Subscriptions and Credentials
Amplify Engage automates the provisioning and de-provisioning of consumer credentials when users subscribe to or unsubscribe from products. This includes handling API keys, OAuth credentials, and certificates, ensuring secure access and simplified administration.

# See Also

- [Define an Environment](/docs/connect_manage_environ)
- [Add an API Service](/docs/connect_manage_environ/manage_services/add_api_service)
- [Integrate with Amplify](/docs/integrate_with_central)
- [Connect an Environment via Agents](/docs/connect_manage_environ#synchronize-your-environment-with-a-gateway)
- [Service Registry](/docs/manage_service_registry)
- [Asset Catalog](/docs/manage_asset_catalog)
- [Product Foundry](/docs/manage_product_foundry)
- [Publish to Marketplace](/docs/manage_marketplace/publish_to_marketplace)
- [Credential provisioning](/docs/connect_manage_environ/marketplace_provisioning)
