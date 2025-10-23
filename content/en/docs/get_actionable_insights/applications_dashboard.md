---
title: Applications dashboard
linkTitle: Applications dashboard
weight: 10
date: 2025-10-23
---

To access the Applications dashboard, navigate to *Business Insights > Applications*. This dashboard helps you understand which applications are generating traffic to your APIs and how actively they are being used.
What you can see in this view depends on your role and the ownership of the assets.

| Role                                       | Access                                                     |
| ------------------------------------------ | ---------------------------------------------------------- |
| **Engage Admin**                           | Can see all application usage across the Marketplace       |
| **Catalog Manager**                        | Can see usage for assets owned by their team, as long as the API or Product is also owned by their team |
| **Insights Viewer**                        | Same visibility rules as Catalog Manager                   |
| **Developer**                              | Cannot access this screen                                  |

![Example of App usage](/static/Images/central/bi_applications.png)

The table lists all applications that match your selected filters. It displays:

* The application name
* The Marketplace it belongs to
* The consumer organization and team that owns the application
* The total usage for the selected unit (for example, number of transactions)

Only usage that is tied to a quota-backed metric is shown, so the data reflects what counts against the plan quota.
You can filter the data by application, product, or time range.

Clicking on an individual application opens a detailed view showing its usage broken down by API.
