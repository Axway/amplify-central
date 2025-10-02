---
title: Provider Engagement
linkTitle: Provider Engagement
weight: 10
date: 2022-02-04
---
The Provider Engagement dashboard helps you monitor and evaluate the activity and engagement level of your provider teams. It gives you visibility into how teams contribute to your API program by tracking the number of teams, services, assets, and products created or updated over time.
Use this dashboard to understand and improve the overall health of your API program and to identify highly active or underperforming teams.

![Example of Provider Engagement](/static//Images/central/provider_engagement.png)

## Accessing the dashboard

To access the dashboard, navigate to **Business Insights -> Engagement -> Provider Engagement** .
From here, you can view metrics that reflect both the current state and the recent activity of your provider teams.

The Provider Engagement dashboard is visible to the following roles:

| Role                | Description                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Engage Admin**    | Has full visibility across all provider teams and environments. Can view activity for all teams, including unassigned services or assets.         |
| **Catalog Manager** | Can view metrics for assets, services and products owned by their team.                                                                           |
| **Insights Viewer** | Can view metrics for assets, services and products owned by their team.                                                                           |

## Filtering options

Use the filter controls at the top of the dashboard to refine the displayed data:

* **Provider Team**: Select one, multiple, or all provider teams.
* **Time Range**: Choose a specific timeframe (for example, last 7 days, 30 days, or custom range) to analyze activity.
* **View Mode**: Switch between Services, Assets and Products.

## Current totals

The **Current Totals** section displays the most up-to-date counts for all key provider-related objects within your organization. These totals represent the current state of your provider landscape.  
Use this section to assess the current inventory of your provider ecosystem and understand the distribution of assets and products by state.

| Metric       | Description                                                                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Teams**    | Total number of provider teams currently defined in the organization.                                                                                     |
| **Services** | Total number of services currently registered in the Service Registry.                                                                                    |
| **Assets**   | Total number of assets, categorized by lifecycle state (Draft, Active, Deprecated, Archived).                                                             |
| **Products** | Total number of products, categorized by lifecycle state (Draft, Active, Deprecated, Archived). Also displays the total number of *Published* products. This count can be filtered by one or more marketplaces, and is the only thing impacted by the marketplace filter.                                                                                                |

## Team activity

The **Team Activity** section tracks how your teams are engaging over time — showing how many services, assets, and products were created or changed within a selected timeframe.

You can view the data in two ways:

* **Chart view**: Aggregated events across all selected teams.
* **Table view**: Detailed breakdown per team.

### Metrics tracked

| Category     | Event Types Tracked                                 | Description                                                                                           |
| ------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------|
| **Services** | Created                                             | Measures the creation  of APIs and services by team in the selected time range.                       |
| **Assets**   | Created, Activated, Deprecated, Archived            | Tracks asset lifecycle activities in the selected time range, reflecting how teams evolve their APIs. |
| **Products** | Created, Activated, Published, Deprecated, Archived | Captures product lifecycle events in the selected time range, including publication activity.         |


### Chart view

In the chart you can visualize the level of engagement across all selected teams:

* Review total activities for the chosen timeframe.
* Use the granularity filter to display results by week or month.
* Identify trends such as spikes in activity following new initiatives or releases.

### Table view

In the table, you can examine the same activity data broken down per team:

* Each row corresponds to a specific provider team.
* Shows "admin only" row for any product not owned by a team
* Columns show counts of events per object type (services, assets, products).
* Use this view to identify which teams are most active or need additional support.


