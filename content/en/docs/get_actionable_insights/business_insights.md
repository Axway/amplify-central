---
title: Business insights
linkTitle: Business insights
weight: 10
draft: true
date: 2022-02-04
---

Business insights provides API providers and program Managers with 360-degree actionable insights on their API program, consumption, adoption, API health, applications, and environments.

## Business Insights dashboards

Access to the Business Insights menu and dashboards is based on your role and permissions and your organization's subscriptions. Users must have a Engage Administrator or Developer with a team [role](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/organization_roles_and_features/index.html#team-roles) to access the dashboards.

From the [Amplify platform](https://platform.axway.com) home page click **Overview**, and then click **Business Insights** from the left navigation. You are directed to the dashboards.

## API Health

Click **API Health** to see an aggregated view of your API recent usage. This view is useful for monitoring traffic patterns and successes or failures over time.
  ![API Health dashboard view.](/Images/central/api_usage.png "API Health dashboard view")

You can filter by environments, APIs, and a pre-configured time range or customize your own. Consuming Team and Subscription filters are available when a Marketplace is enabled for the current org.

The view shows all transactions, successes, client errors, and server errors with the total number, percentage details, and trend (when **Compare to previous period** is selected) in the tiles across the top below the filter options. Click the **Compare to previous period** option to compare the current selected time range to the previous time range. You can compare the current week, month, or year to the previous week, month, or year to understand how your API usage is changing over time.

Each item in the list also provides the average duration, maximum duration, and minimum duration.

Click an individual item to see the usage data of individual transactions of that API over time.

{{< alert title="Note" color="primary" >}} The API usage is based on either the aggregated metrics the Traceability Agent is sending (agent using Agents SDK version higher than 1.1.14) or the aggregation of transactions sent by Traceability Agent (agent using Agents SDK version lower than 1.1.14).
Depending on the Agent version you are using, the API usage reporting for transactions on the data plane may not be in real time. This is because metrics are aggregated on the agent side and sent to the platform on regular intervals (@hourly by default).
See the agent variable CENTRAL_METRICREPORTING_SCHEDULE if you want to lower the interval value.{{< /alert >}}

## API Traffic

Click **API Traffic** to view the traffic information for the API or App. This view is useful for finding and troubleshooting failed transactions.

{{< alert title="Note" color="primary" >}} The API traffic view provides details for up to a maximum of 1000 transactions based on your search. You might need to further restrict the search by time range or other filter criteria to view all results.{{< /alert >}}

You can filter by environments, APIs, apps, methods, status codes, and a pre-configured time range or customize your own.

The total number of items displayed below the filters are based on the configuration of agents and may not represent maximum 10% of transactions. Each individual item provides the following data:

* Status
* Method
* URI
* Name
* Environment
* Duration
* Timestamp

Click an item in the API traffic list to view its transaction details, including number of spans:

* Type
* Status
* Source
* Destination
* Method
* URI Path
* Duration
* Timestamp

  ![API traffic transaction details.](/Images/central/api_traffic_details.png "API traffic transaction details")

 For each span you can view the request and response header details.
  ![API traffic request and response details.](/Images/central/api_traffic_request_response.png "API traffic request and response details")

 Headers can be redacted and sanitized based on the agent configuration reporting the data. Refer to [Trace redaction](/docs/connect_manage_environ/connected_agent_common_reference/trace_redaction/) for details.

## Provider Engagement

Click **Provider Engagement** to see metrics and details about your provider teams engagement level to understand and improve overall health of your API program and engagement of different teams.

![Provider Engagement dashboard view.](/Images/central/provider_engagement.png "Provider Engagement dashboard view")

You can filter by provider team (select one, multiple, or all).

In the **Current Totals** section, view the total current counts for the following:

* **Teams** - total number of teams as of the current time.
* **Services** - total number of services as of the current time.
* **Assets** - total number of assets and their current states (draft, active, deprecated, and archived) as of the current time.
* **Products** - total number of products and their current states (draft, active, deprecated, and archived) as of the current time. Also, the total number of published products is displayed.

In the **Team Activity** section, view the chart (for all teams selected) or the table (break down by team) for events that have occurred in the time frame selected.

* **Services** - the number of services created, updated, and deprecated during the selected timeframe.
* **Assets** - the number of assets created, activated, deprecated, and archived during the selected timeframe.
* **Products** - the number of products created, activated, published, deprecated, and archived during the selected timeframe.

The events reflect changes of state, creation, and publish actions. In the chart view, use the filter to show the details by week or month. Review the table to see the break down by team.

## Applications

Click **Applications** to see metrics and charts about the performance of API assets within the consumers' Marketplace Applications to understand and improve the real world performance of the APIs. The list includes the parent consuming team that owns each application and its usage.

  ![Applications dashboard view.](/Images/central/app_usage.png "Applications dashboard view")

You can filter by consuming team, application, product, service, consumption units and a pre-configured timeframe or customize your own.

Click an individual item to see the products with the service name and number of transactions per service.

## Subscriptions

Click **Subscriptions** to see a list of the consumer team with their subscriptions in their Marketplace to verify subscription usage.

{{% alert title="Note" color="primary" %}} The Subscription page is available to providers with an active Marketplace subscription.{{% /alert %}}

![Subscriptions dashboard view.](/Images/central/subscriptions.png "Subscriptions dashboard view")

You can filter by consuming team, product, resource (API), application, subscription, consumption units and time range in three month increments (last 3 months, 4 to 6 months, 7 to 9 months, and 10 to 12 months).

Click the **Actions (..) menu** to download the table data.

Click an individual item to see quota and last three-month usage by each resource and plan in that subscription.

## Leaderboard

Click **Leaderboard** to view the following aspects about the APIs in your organization:

* Top 10 most used APIs
* Top 10 least used APIs
* Top 10 most performant APIs
* Top 10 least performant APIs

![Leaderboard dashboard view.](/Images/central/leaderboard.png "Leaderboard dashboard view")

This view is useful for improving your API program and focusing your efforts based on your program goals and current state of different APIs. The first 100 most used APIs are displayed only.  

You can filter by environments and a pre-configured time range or customize your own.

## Overview

Click **Overview** to redirect you to the [Amplify Platform Overview](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/overview/index.html).
