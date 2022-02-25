---
title: Analytics February 2022 Release Notes
linkTitle: Analytics February 2022
weight: 90
date: 2022-02-25
description: Analytics provide insights into your API program, API environments, and APIs.
---
## New features and enhancements

The following new features and enhancements are available in this update:

* Rebranded screen: the UI has been rebranded to match other Amplify screens.
* comparing insights: each screen has a compare capability to visualize the trend with the previous period.
* Leaderboard view: help to verify your API performance: the most/least used, the most/least performant.

More information can be found [here](/docs/get_actionable_insights)

## Fixed issues

The following issues have been fixed in this release:

* **Application usage no more visible** Previously, when the report metrics feature has been activated, the App usage usage cannot be computed correctly. Now, the app usage is correctly computed based on the transactions sent by the Traceability agent. Be aware that TA can sample

## Known limitations

The following limitations exist in this update:

* **App usage filtering**: application filter does not contains external gateway application (Axway API Manager application, Azure subscription and AWS usage plan).
* **Api usage**: since the introduction of aggregated metrics sent by the Traceability Agent on regular interval, the Api usage is not as real time as it used to be when it was computed from the transactions. Depending on the agent configuration (by default metrics are sent every 15 minutes) the metrics graphic will show spikes instead of a regular curve.
