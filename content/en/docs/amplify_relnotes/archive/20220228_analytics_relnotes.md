---
title: Analytics February 2022 Release Notes
linkTitle: Analytics February 2022
weight: 90
date: 2022-02-25
---

Analytics provide insights into your API program, API environments, and APIs.

## New features and enhancements

The following new features and enhancements are available in this update:

* Rebranded screens: the UI has been rebranded to match other Amplify screens.
* Comparing insights: each screen has a compare capability to visualize the trend with the previous period.
* Leaderboard view: help to verify your API performance: the most/least used, the most/least performant.

See [Get actionable insights](/docs/get_actionable_insights) for more information.

## Fixed issues

The following issues have been fixed in this release:

* **Application usage is not visible** Previously, when the report metrics feature was turned on, the application usage was not reported correctly. Now, the application usage is correctly computed based on the transactions reported by the Traceability Agent. Be aware that the Traceability Agent can sample the transaction (i.e., not sending all transactions). In this situation, the application usage will not reflect all the calls made by this application in the Gateway.

## Known limitations

The following limitations exist in this update:

* **App usage filtering**: application filter does not contains external gateway applications (Axway API Manager application, Azure subscription and AWS usage plan).
* **Api usage**: since the introduction of aggregated metrics sent by the Traceability Agent at regular intervals, the API usage is not as real time as it used to be when it was computed from the transactions. Depending on the agent configuration (by default, metrics are sent every 15 minutes), the metrics graphic will show spikes instead of a regular curve.
