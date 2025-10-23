---
title: API Health
linkTitle: API Health
weight: 10
date: 2025-10-04
---

The API Health Dashboard offers centralized view into API performance and usage across your environments. It helps you monitor transaction volumes, identify error trends, and analyze the health of both **managed** and **unmanaged** APIs.

![Example of API Health](/static/Images/central/BusinessInsights_API_Health.png)

To access the API Health Dashboard, navigate to your **Platform account -> Business Insights-> API Health**.

The following roles can access the API Health dashboard, with visibility varying according to permissions:

| Role                | Description                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Engage Admin**    | Can view all API usage data across the organization, including APIs that cannot be resolved to a specific environment. |
| **Catalog Manager** | Can view usage data for APIs owned by their team only.                                                                 |
| **Developer**       | Can view usage data for APIs owned by their team                                                                       |
| **Insights Viewer** | Can view usage data for APIs owned by their team and filter results by marketplace.                                    |

## Overview of the dashboard components

The dashboard is composed of summary cards, a usage chart, and transaction tables for both managed and unmanaged APIs. Filters at the top of the page allow users to narrow the view by environment, API, timeframe, and other parameters.

{{< alert title="Note" color="primary" >}} Depending on the Agent version you are using, the API usage reporting for transactions on the data plane may not be in real time. This is because metrics are aggregated on the agent side and sent to the platform on regular intervals (hourly by default). See the agent variable CENTRAL_METRICREPORTING_SCHEDULE if you want to lower the interval value.{{< /alert >}}

### Summary cards

Each card providers a high-level overview of transaction health based on the applied filters.

* **Transactions**

    * Displays the **total number of API transactions** matching the filters.

* **Successes**

    * Shows the number of **successful transactions** (status code < 400).
    * Includes a percentage indicating the proportion of successfull calls relative to the total transactions.

* **Client Errors**

    * Shows the number of transactions with **client-side errors**.
    * Displays the percentage of client error transactions relative to the total.

* **Server Errors**

    * Shows the number of transactions with **server-side errors** (status code ≥ 500).
    * Displays the percentage of server error transactions relative to total.

### Usage chart

* Provides a visual timeline of transaction counts, grouped by status:

    * Success
    * Client Error
    * Server Error

* Helps identify trends or anomalies in the API performance.
* The total in the chart align with the figures shown in the summary cards.

### Usage breakdown by API

* **Runtime Managed**

    * Lists transaction details per API for managed environments.
    * Includes metrics such success/error counts and min/max/avg response times.
    * If an environment name cannot be resolved, displays “not found.”

* **Runtime Unmanaged**

    * Lists transaction details for unmanaged APIs.
    * Includes data collected from sources such as Graylog or environments referencing other runtime instances.

### Export usage data

You can export data from the API Health dashboard for deeper analysis or reporting. The export includes all data currently displayed on the screen — this covers the chart data (transactions over time), the summary card data (totals and percentages for successes, client errors, and server errors), and the table data for both managed and unmanaged APIs. Exports are generated in CSV format, making it easy to open and analyze in spreadsheet tools such as Excel or Google Sheets.

{{< alert title="Note" color="primary" >}} Please note that the table export file can include a maximum of 1,000 APIs. If your filters return more than 1000 APIs, refine your selection to reduce the dataset before exporting.{{< /alert >}}
