---
title: Consumer Insights
linkTitle: Consumer Insights
weight: 20
date: 2025-10-23
---

Consumer Insights gives API consumers an easy, self-service way to view how they’re using APIs in the Marketplace.

To access the Consumer Insights dashboard, users must have a consumer or subscriber role. To get started, open the Marketplace’s left navigation panel, select **Consumer Insights**, and choose the dashboard you want to explore.

## API Health

Click **API Health** to view a high-level summary of your recent API activity. This dashboard helps you monitor traffic patterns, spot unusual spikes or drops, and track overall success versus error rates over time.

You can filter the data by product, subscription, application, or time range - using either the preset options or a custom window.

At the top of the page, the tiles show counts and percentages for all transactions, successes, client errors, and server errors. If you select **Compare to previous period**, you can see how your current usage compares to the prior week, month, or year and quickly identify trends.

![API Health dashboard.](/Images/marketplace/consumer_experience/ci_api_health.png "API Health dashboard")

Below the summary, each API entry includes:

* API Name
* Version
* Total Transactions
* Minimum duration (ms)
* Maximum duration (ms)
* Average duration (ms)
* Successful requests
* Client errors
* Server errors

Note that the API usage data is not real-time. There may be a delay of several minutes before new transactions appear in the dashboard.

## Applications

![Applications dashboard.](/Images/marketplace/consumer_experience/ci_applications.png "Applications dashboard")

Click **Applications** to view a summary of how each of your applications is using APIs in the Marketplace.
This dashboard helps you understand which applications are generating traffic and how actively they are being used.

You can filter the data by application, product, or time range.

Click on an individual application to open a detailed view showing its usage broken down by API.

{{< alert title="Note" color="primary" >}}
The application usage data is not shown in real time. New transactions may take a few minutes to appear in the dashboard.
{{< /alert >}}

## API Traffic

The **API Traffic** dashboard lets you drill down into individual API calls made through your subscribed APIs or your own applications. It’s especially helpful for identifying and troubleshooting failed or unexpected transactions.
You can filter the view by application, HTTP method, status code, or time range — either using one of the presets or by choosing a custom window. Data in the API Traffic dashboard is retained for seven days, so you can review and troubleshoot recent activity within that time window.

![API Traffic dashboard.](/Images/marketplace/consumer_experience/ci_api_traffic.png "API Traffic dashboard")

Each transaction in the list includes:

* **Status**: HTTP status code reported by the transaction.
* **Method**: HTTP method used (GET, POST, etc.).
* **URI**: Target resource or endpoint path.
* **Name**: The API or operation name.
* **Environment**: The environment where the transaction was processed.
* **Duration**: Total request execution time.
* **Timestamp**: When the transaction occurred.

### Transaction details

Click any transaction in the list to open its detailed trace view.
The detailed trace displays the span-level breakdown of the transaction, including:

* **Type**: The span classification (gateway leg, backend call, etc.).
* **Status**: Outcome of the call at this specific span.
* **Source**: Component or service initiating the call.
* **Destination**: Component or service receiving the call.
* **Method**: HTTP method.
* **URI Path**: The endpoint for this span.
* **Duration**: Time spent in this span.
* **Timestamp**: Execution timestamp for the span.

Each span may also include request and response headers, where available.

![API traffic transaction details.](/Images/marketplace/consumer_experience/ci_api_traffic_details.png "API traffic transaction details")

{{< alert title="Note" color="primary" >}} API traffic is based on a limited sample of the actual gateway traffic and will not show all transactions.{{< /alert >}}

## Subscriptions

The **Subscriptions** dashboard shows how each of your subscriptions is being used across the products you’re subscribed to. It helps you easily track your consumption and see how it compares to the quota you’ve been allocated.

The subscription table shows usage for the subscriptions that match your selected filters. You can filter by product, subscription, or time range.

When you click on a subscription row, it expands to display a detailed breakdown of usage by each API within that product.

![Subscriptions dashboard.](/Images/marketplace/consumer_experience/consumer_insights_subscriptions.png "Subscriptions dashboard")
