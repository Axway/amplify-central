---
title: Get actionable insights
linkTitle: Get actionable insights
weight: 525
date: 2022-02-04
description: Get insights about your API program, API environments, and APIs.
---

## API Observer dashboards

Access to the API Observer menu and dashboards is based on your role and permissions and your organization's subscriptions. Users must have one of the following [team roles](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/organization_roles_and_features/index.html#team-roles) to access the API Observer dashboards:

* Administrator
* Catalog Manager
* Consumer
* Developer

From the [Amplify platform](https://platform.axway.com) home page click **Dashboard**, and then click **API Observer** from the left navigation. You are directed to the dashboards in Amplify Central.

## API Usage

Click **API Usage** to see an aggregated view of your API recent usage. This view is useful for monitoring traffic patterns and successes or failures over time.
  ![Example of API usage](/Images/central/api_usage.png)

The view shows all transactions, successes, client errors, and server errors with the total number, percentage details, and trend (when **Compare to previous period** is selected). Click the **Compare to previous period** option to compare the current selected time range to the previous time range.

Click an item in the list to view the traffic information.

## App Usage

Click **App Usage** to see an aggregated view of API usage in your organization grouped by app over time.
  ![Example of App usage](/Images/central/app_usage.png)

The view shows all transactions, successes, client errors, and server errors with the total number, percentage details, and trend (when **Compare to previous period** is selected). Click the **Compare to previous period** option to compare the current selected time range to the previous time range.

Click an item in the list to view the traffic information.

## API Traffic

Click **API Traffic** to view the traffic information for the API or App. This view is useful for finding and troubleshooting failed transactions.
  ![Example of API traffic](/Images/central/api_traffic.png)

{{% alert title="Note" color="primary" %}} The API traffic view provides details for up to a maximum of 1000 transactions based on your search. You might need to further restrict the search by time range or other filter criteria to view all results.{{% /alert %}}

Click an item in the API traffic list to view transaction details including the number of spans.
  ![Example of API traffic details](/Images/central/api_traffic_details.png)

 For each span you can view the request and response header details.
  ![Example of API traffic request and response](/Images/central/api_traffic_request_response.png)

 Headers can be redacted and sanitized based on the agent configuration reporting the data. Refer to [Trace redaction](/docs/connect_manage_environ/connected_agent_common_reference/trace_redaction/) for details.

## Leaderboard

Click **Leaderboard** to view the following aspects about the APIs in your organization:

* Top 10 most used APIs
* Top 10 least used APIs
* Top 10 most performant APIs
* Top 10 least performant APIs

This view is useful for improving your API program and focusing your efforts based on your program goals and current state of different APIs. The first 100 most used APIs are displayed only.  
  ![Example of Leaderboard](/Images/central/leaderboard.png)

## Engagement

Click **Engagement** to redirect you to the [Amplify Platform Dashboard](https://docs.axway.com/bundle/platform-management/page/docs/dashboard_guide/the_dashboards/platform_dashboard/index.html).