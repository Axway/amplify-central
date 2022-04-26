---
title: Get actionable insights
linkTitle: Get actionable insights
weight: 525
date: 2022-02-04
description: Get insights about your API program, API environments, and APIs.
---

## Business Insights dashboards

Access to the Business Insights menu and dashboards is based on your role and permissions and your organization's subscriptions. Users must have one of the following [roles](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/organization_roles_and_features/index.html) to access the Business Insights dashboards:

* Central Administrator
* Developer (with a team role)

From the [Amplify platform](https://platform.axway.com) home page click **Overview**, and then click **Business Insights** from the left navigation. You are directed to the dashboards in Amplify Central.

Filter options are provided on each dashboard.

## API Health

Click **API Health** to see an aggregated view of your API recent usage. This view is useful for monitoring traffic patterns and successes or failures over time.
  ![Example of API Health](/Images/central/api_usage.png)

The view shows all transactions, successes, client errors, and server errors with the total number, percentage details, and trend (when **Compare to previous period** is selected) in the tiles across the top below the filter options. Click the **Compare to previous period** option to compare the current selected time range to the previous time range. You can compare the current week, month, or year to the previous week, month, or year to understand how your API usage is changing over time.

Each item in the list also provides the average duration, maximum duration, and minimum duration.

Click an individual item to see the usage data of individual transactions of that API over time.

{{< alert title="Note" color="primary" >}} The API Usage is based on either the aggregated metrics the Traceability Agent is sending (agent using Agents SDK version higher than 1.1.14) or the aggregation of transactions sent by Traceability Agent (agent using Agents SDK version lower than 1.1.14).
Depending on the Agent version you are using, the API Usage reporting for transactions on the dataplane may not be in real time. This is because metrics are aggregated on the agent side and sent to the platform on regular intervals (15 min by default).
See the agent variable CENTRAL_USAGEREPORTING_INTERVAL if you want to lower the interval value.{{< /alert >}}

## App Usage

Click **App Usage** to see an aggregated view of API usage in your organization grouped by app over time.

  ![Example of App usage](/Images/central/app_usage.png)

App or Application refers to:

* Axway SaaS Gateway application
* API Gateway application
* AWS Gateway usage plan
* Azure Gateway subscription

{{< alert title="Note" color="primary" >}} The application filter is for SaaS Gateway only. The filter is not populated with external Gateway applications (that is, API Gateway application, AWS Gateway usage plan, or Azure Gateway subscription).{{< /alert >}}

{{% getactionableinsights/api_app_usage %}}

Click an individual item to see the usage of APIs by that app over time.

## API Traffic

Click **API Traffic** to view the traffic information for the API or App. This view is useful for finding and troubleshooting failed transactions.
  ![Example of API traffic](/Images/central/api_traffic.png)

{{< alert title="Note" color="primary" >}} The API traffic view provides details for up to a maximum of 1000 transactions based on your search. You might need to further restrict the search by time range or other filter criteria to view all results.{{< /alert >}}

The total number of items displayed below the filters are based on the configuration of agents and my not represent 100% of transactions. Each individual item provides the following data:

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

## Overview

Click **Overview** to redirect you to the [Amplify Platform Dashboard](https://docs.axway.com/bundle/platform-management/page/docs/dashboard_guide/the_dashboards/platform_dashboard/index.html).
