---
title: Usage and engagement insights
linkTitle: Usage and engagement insights
weight: 525
date: 2022-09-15
---

Amplify Engage delivers robust traceability, monitoring, and analytics features that empower platform administrators and API stakeholders to gain centralized visibility and actionable intelligence across their API ecosystem.

Amplify Engage Insights is a suite of dashboards and analytics tools that provides a comprehensive view of API usage, health, adoption, and engagement. These capabilities are designed to support both business and technical decision-making by surfacing key metrics and trends from across all environments and data planes.

## Business Insights capabilities

Business Insights offers a 360-degree view of your API program, including engagement, consumption, health, applications, and environments.

* **Platform Dashboard**: Track API program adoption, metrics, and trends for assets, subscriptions, environments, teams, users, and transactions.
* [**API Health**](/docs/get_actionable_insights/api_health/): Centralized visibility into API usage, success rates, errors, and trends across all environments.
* [**API Traffic**](/docs/get_actionable_insights/api_traffic/): Detailed transaction-level data for troubleshooting and performance analysis.
* [**Provider Engagement**](/docs/get_actionable_insights/provider_engagement/): Metrics on provider team activity and collaboration.
* [**Consumer Engagement**](/docs/get_actionable_insights/consumer_engagement/): Trends and metrics for spotting adoption patterns and refining your engagement strategies to drive further API consumption.
* [**Applications**](/docs/get_actionable_insights/applications_dashboard/): Usage metrics for each Marketplace application, with filtering by organization, team, product, and timeframe.
* [**Subscriptions**](/docs/get_actionable_insights/subscriptions_dashboard/): List of the consumers and their product subscriptions and monthly usage​.
* **Revenue**: Breakdown of charges and invoice statistics by product and consumer, enabling revenue analysis.
* [**Leaderboard**](/docs/get_actionable_insights/leaderboard/): Track the most and least performant and popular services.

## Consumer Insights capabilities

Consumer Insights provides API consumers with secure, self-service access to actionable insights about their own API usage.

* API Health, Application metrics, API Traffic, and Subscriptions scoped to the consumer’s teams and subscriptions.
* Data privacy and access controls ensure consumers only see data relevant to their own usage.
* Filter data by product, subscription, or application.
* Choose time slices from five minutes to a week for a quick data views, or pick a custom time interval.
* Monitor API usage against quotas in subscribed plans.

For details, see [Consumer Insights](/docs/manage_marketplace/consumer_experience/consumer_insights/).

## Roles and permissions

The following roles can access the Insights dashboards:

* **Engage Administrators** can access both Business Insights and Consumer Insights dashboards. They can see metrics across all teams in the organization.
* **Catalog Manager** can view the Business Insights dashboards. Usage and metrics are scoped to their team. They must be a member in the owning team to view usage or engagement metrics.
* **Developer** can view only a subset of the Business Insights dashboards (API Health, API Traffic, Leaderboard). Their visibility is limited usage and metrics associated with their team membership.
* **Insights Viewer** can access the Business Insights dashboard. Their visibility is limited to usage and metrics associated with their team membership.
* **Consumer** and **Subscriber** can access Consumer Insights dashboard only.

## Filtering in Business Insights dashboards

The Marketplace filter that is available in the Business Insights dashboard is dynamically determined by the Marketplace preferences options given to a team. Only Marketplaces with explicit preferences that match your team and role will display, ensuring that users only see usage data and metrics relevant to their permissions and responsibilities.

* The filter displays only those Marketplaces that have preferences granting visibility to your team (such as administration, publication, or consumption preferences).
* No Marketplaces are visible if the teams you are part of have not been selected in the preferences above.
* If your team is included in the **consumption preference** for a Marketplace, that Marketplace is visible to you when you have the Insights Viewer role.

For setting Marketplace preferences, refer to [Marketplace Settings](https://docs.axway.com/bundle/amplify-central/page/docs/manage_marketplace/customize_marketplace/marketplace_settings/index.html).

## Related Topics

See the following topics for related information.
