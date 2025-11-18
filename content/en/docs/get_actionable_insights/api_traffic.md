---
title: API Traffic
linkTitle: API Traffic
weight: 30
date: 2025-10-21
---

The API Traffic dashboard allows you to inspect transaction-level data for your APIs. This view is especially useful for finding and troubleshooting failed transactions.

The dashboard displays up to **1000** of the most recent transactions that match your filter criteria. Each transaction includes core metadata such as request method, status code, latency, and execution timestamp.

![API Traffic dashboard.](/Images/central/api_traffic.png "API Traffic dashboard example" )

Each transaction in the list includes:

* **Status**: HTTP status code reported by the transaction.
* **Method**: HTTP method used (GET, POST, etc).
* **URI**: Target resource or endpoint path.
* **Name**: The API or operation name.
* **Environment**: The environment where the transaction was processed.
* **Duration**: Total request execution time.
* **Timestamp**: When the transaction occurred.

{{< alert title="Note" color="primary" >}}The total number of displayed records is derived from agent-based sampling rules and may not represent all traffic.{{< /alert >}}

## Transaction Details

Click any transaction in the list to open its detailed trace view.

The detailed trace displays the span-level breakdown of the transaction, including:

* **Type**: The span classification.
* **Status**: Outcome of the call at this specific span.
* **Source**: Component or service initiating the call.
* **Destination**: Component or service receiving the call.
* **Method**: HTTP method.
* **URI Path**: The endpoint for this span.
* **Duration**: Time spent in this span.
* **Timestamp**: Execution timestamp for the span.

![API traffic trace view.](/Images/central/api_traffic_details.png "API traffic trace view")

Each span may also include request and response headers, where available.

![API traffic request and response.](/Images/central/api_traffic_request_response.png "API traffic request and response")

## Access the dashboard

To access the dashboard, navigate to *Business Insights > API Traffic*.

The dashboard is visible to the following roles:

| Role                             | Access                                         |
| ---------------------------------| ---------------------------------------------- |
| **Engage Admin**                 | Sees all traffic across all apis.              |
| **Catalog Manager**              | Only sees usage for APIs owned by their team.  |
| **Insights Viewer**              | Same restrictions as Catalog Manager.          |
| **Developer (Team only)**        | Same restrictions as Catalog Manager.          |

## Header redaction and sanitization

Depending on the agent configuration, certain headers may be redacted or sanitized for security or compliance purposes. Sensitive values may be masked or suppressed entirely.

For more information on how this is configured, see [Trace redaction](/docs/connect_manage_environ/connected_agent_common_reference/trace_redaction/).

## Transaction sampling

API traffic displayed in this dashboard is sampled, not fully captured. To view transactions, Administrators must enable the on-demand sampling at the agent level. Sampling is time-bound and only collects transactions during the active sampling window, allowing focused troubleshooting without continuously streaming all traffic.

For more information on how to turn on sampling, see [Traffic sampling](/docs/connect_manage_environ/connected_agent_common_reference/trace_sampling/).
