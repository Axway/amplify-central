---
title: API Traffic
linkTitle: API Traffic
weight: 10
date: 2025-10-21
---

The **API Traffic** dashboard allows you to inspect transaction-level data for your APIs. This view is especially useful for finding and troubleshooting failed transactions.

The dashboard displays up to **1000** of the most recent transactions that match your filter criteria. Each transaction includes core metadata such as request method, status code, latency, and execution timestamp. 

Each transaction in the list includes:

* **Status**:	HTTP status code reported by the transaction.
* **Method**:	HTTP method used (GET, POST, etc.).
* **URI**:	Target resource or endpoint path.
* **Name**:	The API or operation name.
* **Environment**:	The environment where the transaction was processed.
* **Duration**:	Total request execution time.
* **Timestamp**:	When the transaction occurred.

{< alert title="Note" color="primary" >}}
The total number of displayed records is derived from agent-based sampling rules and may not represent all traffic.
{{< /alert >}}

## Transaction Details

Click any transaction in the list to open its detailed trace view.

The detailed trace displays the span-level breakdown of the transaction, including:

* **Type**:	The span classification (gateway leg, backend call, etc.).
* **Status**:	Outcome of the call at this specific span.
* **Source**:	Component or service initiating the call.
* **Destination**:	Component or service receiving the call.
* **Method**:	HTTP method.
* **URI Path**:	The endpoint for this span.
* **Duration**:	Time spent in this span.
* **Timestamp**:	Execution timestamp for the span.

Each span may also include request and response headers, where available. 
