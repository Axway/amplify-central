---
title: Analytics March 2022 Release Notes
linkTitle: Analytics March 2022
weight: 90
date: 2022-03-30
---

Analytics provide insights into your API program, API environments, and APIs.

## New features and enhancements

The following new features and enhancements are available in this update:

* None

See [Get actionable insights](/docs/get_actionable_insights) for more information.

## Fixed issues

The following issues have been fixed in this release:

* **API Health and API Traffic cannot be filtered by API**. Previously, after changes to the agent internal information, the API filter was not able to identify the traffic corresponding to the selected API. Now, the filter is managed by previous and new versions of the agent configuration that enable a user to filter the traffic based on the selected API.

## Known limitations

The following limitations exist in this update:

* **App usage filtering**: Application filter does not contain external gateway applications (Axway API Manager application, Azure subscription and AWS usage plan).
* **API usage**: Since the introduction of aggregated metrics sent by the Traceability Agent at regular intervals, the API usage is not as real time as it used to be when it was computed from the transactions. Depending on the agent configuration (by default, metrics are sent every 15 minutes), the metrics graphic will show spikes instead of a regular curve.
