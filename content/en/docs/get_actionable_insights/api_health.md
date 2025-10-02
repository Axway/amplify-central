---
title: API Health
linkTitle: API Health
weight: 10
date: 2022-02-04
---

## API Health

Click **API Health** to see an aggregated view of your API recent usage. This view is useful for monitoring traffic patterns and successes or failures over time.
  ![Example of API Health](/Images/central/api_usage.png)

You can filter by environments, APIs, and a pre-configured time range or customize your own. Consuming Team and Subscription filters are available when a Marketplace is enabled for the current org.

The view shows all transactions, successes, client errors, and server errors with the total number, percentage details, and trend (when **Compare to previous period** is selected) in the tiles across the top below the filter options. Click the **Compare to previous period** option to compare the current selected time range to the previous time range. You can compare the current week, month, or year to the previous week, month, or year to understand how your API usage is changing over time.

Each item in the list also provides the average duration, maximum duration, and minimum duration.

Click an individual item to see the usage data of individual transactions of that API over time.

{{< alert title="Note" color="primary" >}} The API usage is based on either the aggregated metrics the Traceability Agent is sending (agent using Agents SDK version higher than 1.1.14) or the aggregation of transactions sent by Traceability Agent (agent using Agents SDK version lower than 1.1.14).
Depending on the Agent version you are using, the API usage reporting for transactions on the data plane may not be in real time. This is because metrics are aggregated on the agent side and sent to the platform on regular intervals (@hourly by default).
See the agent variable CENTRAL_METRICREPORTING_SCHEDULE if you want to lower the interval value.{{< /alert >}}
