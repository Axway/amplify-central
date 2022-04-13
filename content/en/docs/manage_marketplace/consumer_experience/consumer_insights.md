---
title: Consumer insights
linkTitle: Consumer insights
weight: 100
date: 2022-03-30
---

Get insights about your consumption of APIs in the Marketplace.

## Consumer Insights dashboards

Access to the Consumer Insights menu and dashboards is based on your role and permissions and your organization's subscriptions to the Marketplace. Users must have one of the following [roles](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/organization_roles_and_features/index.html) to access the Consumer Insights dashboards:

* Subscription Administrator
* API Consumer App Developer (with a team role)

From the Marketplace left navigation click **Consumer Insights**. You are directed to the Consumer Insights dashboards within the Marketplace.

Filter options are provided on each dashboard.

## Subscription Compliance

Click **Subscription Compliance** to see an overview of your subscriptions including:

* Subscription Name
* Plan
* Status

Click an individual subscription to see a list of assets with the quota, usage, and utilization per asset.

<!---  ![Subscription Compliance example](/Images/central/ci_subscription.png) --->

## Application Usage

Click **Application Usage** to see an aggregated view of API usage in your organization grouped by application over time.

<!---  ![Application Usage example](/Images/central/ci_application_usage.png) --->

Application refers to applications configured within the Marketplace.

Click an individual item to see the usage of APIs by that app over time.

## API Health

Click **API Health** to see an aggregated view of your API recent usage. This view is useful for monitoring traffic patterns and successes or failures over time.

<!---  ![API Health example](/Images/central/ci_api_usage.png) --->

The view shows all transactions, successes, client errors, and server errors with the total number, percentage details, and trend (when **Compare to previous period** is selected) in the tiles across the top below the filter options. Click the **Compare to previous period** option to compare the current selected time range to the previous time range. You can compare the current week, month, or year to the previous week, month, or year to understand how your API usage is changing over time.

Each item in the list provides the average, maximum, and minimum duration.

You can filter by subscriptions, products, applications, and APIs. You can choose a wide range of time from minutes to years. You can choose one of the pre-configured time ranges.

The API usage reporting for transactions is not real time and may be delayed by several minutes based on settings selected by your API provider.

## API Traffic

Click **API Traffic** to view the traffic information for the API or Application. This view is useful for finding and troubleshooting failed transactions.

<!--  ![API Traffic example](/Images/central/ci_api_traffic.png) --->

{{% alert title="Note" color="primary" %}} The API traffic view provides details for up to a maximum of 1000 transactions based on your search. You might need to further restrict the search by time range or other filter criteria to view all results.{{% /alert %}}

The total number of items displayed below the filters are based on the sampling configuration set by the provider of your APIs and may not represent 100% of transactions. Each individual item provides the following data:

* Status
* Method
* URI
* Name
* Environment
* Duration
* Timestamp

Click an item in the API traffic list to view its transaction details:

* Type
* Status
* Source
* Destination
* Method
* URI Path
* Duration
* Timestamp

<!---  ![Example of API traffic details example](/Images/central/ci_api_traffic_details.png) --->

 You can view the request and response header details.

<!---  ![API traffic request and response example](/Images/central/ci_api_traffic_request_response.png) --->

 Headers can be redacted and sanitized based on the agent configuration set by your API provider.
