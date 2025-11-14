---
title: Subscriptions
linkTitle: Subscriptions
weight: 70
date: 2025-10-21
---

The Subscription dashboard provides visibility into subscription-level usage across API products. It is designed to help administrators and product owners understand how consumer applications are using their subscriptions and whether usage aligns with quotas and consumption patterns.

The table displays subscription usage that meets the selected filter criteria. Data is derived from metric events associated with product plans that have a quota-based product plan unit type — for example, transactions.  

Selecting a subscription row expands a secondary view listing the usage breakdown by APIs in the product.

![Subscriptions dashboard.](/static/Images/Business-Insights-Subscriptions-Dashboard.png "Subscriptions dashboard")

{{< alert title="Note" color="primary" >}}If the user does not have access to a specific product or API, the system still displays the row but substitutes the name with the resource ID. This ensures the total usage remains intact, even when a portion of the contributing resources are not visible due to role ownership restrictions.{{< /alert >}}

## Access the dashboard

To access the dashboard, navigate to *Business Insights > Subscriptions & Revenue > Subscriptions*.  

The dashboard is visible to the following roles:

| Role                                       | Access                                                       |
| ------------------------------------------ | ------------------------------------------------------------ |
| **Engage Admin**                           | Sees all subscriptions across all products.                  |
| **Catalog Manager**                        | Only sees usage for subscriptions tied to products owned by their team.    |
| **Insights Viewer**                        | Same restrictions as Catalog Manager.                        |
| **Developer (Team only)**                  | Cannot access this screen.                                   |
| **Users without Marketplace entitlements** | Cannot access this screen.                                   |
