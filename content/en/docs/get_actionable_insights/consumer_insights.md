---
title: Consumer Insights
linkTitle: Consumer insights
weight: 120
draft: true
date: 2025-10-21
---

Consumer Insights provides API consumers with secure, self-service access to actionable insights regarding their usage of the APIs from the Marketplace.

## Access Consumer Insights

Access to the Consumer Insights menu and dashboards is based on your role and permissions and your organization's subscriptions to the Marketplace. Users must have a Consumer or Subscription Admin [role](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/organization_roles_and_features/index.html#team-roles) to access the dashboards.

From the Marketplace left navigation, click **Consumer Insights**, and then select a dashboard you want to view.

### API Health

Click **API Health** to see an aggregated view of your API recent usage. This view is useful for monitoring traffic patterns and successes or failures over time.

![API Health dashboard.](/Images/marketplace/consumer_experience/ci_api_health.png "API Health dashboard")

You can filter by products, subscriptions, applications, and a pre-configured time range or customize your own.

The view shows all transactions, successes, client errors, and server errors with the total number, percentage details, and trend (when **Compare to previous period** is selected) in the tiles across the top below the filter options. Click the **Compare to previous period** option to compare the current selected time range to the previous time range. You can compare the current week, month, or year to the previous week, month, or year to understand how your API usage is changing over time.

Each individual item provides the following data

* API Name
* Version
* Total Transactions
* Minimum duration (ms)
* Maximum duration (ms)
* Average duration (ms)
* Successful
* Client Error
* Server Error

The API usage reporting for transactions is not real time and may be delayed by several minutes based on settings selected by your API provider.

### Applications

Click **Applications** to see an aggregated view of Application usage. These are applications configured within the Marketplace.

![Applications dashboard.](/Images/marketplace/consumer_experience/ci_applications.png "Applications dashboard")

You can filter by applications, products, and a pre-configured time range or customize your own.

Click an individual item to see that application's usage by product, API, and total transactions.

The Application usage reporting for transactions is not real time and may be delayed by several minutes based on settings selected by your API provider.

### API Traffic

Click **API Traffic** to view the traffic information for the API or Application. This view is useful for finding and troubleshooting failed transactions.

![API Traffic dashboard.](/Images/marketplace/consumer_experience/ci_api_traffic.png "API Traffic dashboard")

You can filter by applications, methods, status codes, and a pre-configured time range or customize your own.

{{< alert title="Note" color="primary" >}} API traffic is based on a limited sample of the actual gateway traffic and will not show all transactions.{{< /alert >}}

Each individual item provides the following data:

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

![API Traffic transaction details.](/Images/marketplace/consumer_experience/ci_api_traffic_details.png "API Traffic transaction details")

Click the **+** next to the transaction details to view the request and response header details. Headers can be redacted and sanitized based on the agent configuration set by your API provider.

### Subscriptions

Click **Subscriptions** to see a list of the products and its subscription in your Marketplace.

![Subscriptions dashboard.](/Images/marketplace/consumer_experience/ci_subscriptions.png "Subscriptions dashboard")

You can filter by products, subscriptions, and time range in three month increments (last 3 months, 4 to 6 months, 7 to 9 months, and 10 to 12 months).

Click an individual item to see quota and last three-month usage by each resource and plan in that subscription.
