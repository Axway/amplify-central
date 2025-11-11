---
title: Leaderboard
linkTitle: Leaderboard
weight: 90
date: 2025-10-21
---

The Leaderboard dashboard provides a set of curated "Top 10" lists to help you identify trends at a glance:

* **Top 10 Most used APIs**: APIs with the highest traffic volume in the selected time range. Useful for understanding adoption leaders.
* **Top 10 Least Used APIs**: APIs with low or declining usage. Helpful for prioritizing lifecycle decisions (retire, improve docs, or promote).
* **Top 10 Fastest APIs**: APIs with the highest average latency in the selected time range.
* **Top 10 Slowest APIs**: APIs with the lowest average latency in the selected time range.

## Access Leaderboard

The Leaderboard honors the same access rules used in API Health. What you see depends on your role and ownership of the APIs:

| Role                      | Access                                                                         |
| ------------------------- | ------------------------------------------------------------------------------ |
| **Engage Admin**          | Full visibility across all APIs. No ownership restriction.                     |
| **Catalog Manager**       | Usage for APIs owned by their team(s). Does not see APIs owned by other teams. |
| **Insights Viewer**       | Usage for APIs owned by their team(s). Same visibility rules as Catalog Manager.|
| **Developer**             | Usage for APIs owned by their team. No Marketplace filter available.           |

## Important notes

* Leaderboard reflects only usage within the selected time range (environment + time range filters).
* APIs with no usage in the selected period do not display; therefore, are not shown under "Least Used."
* The Leaderboard is calculated from the top 100 most used APIs (based on traffic volume) retrieved from the API Health data source.
