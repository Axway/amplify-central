---
title: Analytics June 2022 Release Notes
linkTitle: Analytics June 2022
weight: 90
date: 2022-06-30
---

Analytics provide insights into your API program, API environments, and APIs.

## New features and enhancements

The following new features is available in this update:

* **Business Insights**: provider is now able to filter the API Health metrics with the consumer teams and/or the consumer subscription. Be sure to have the latest traceability agent version to leverage that feature.

## Fixed issues

The following issues have been fixed in this release:

* None

## Known limitations

The following limitation exists in this update:

* Business insights / App usage: filtering per application is not working, as the application listed only references the SaaS gateway application and not other dataplane applications (usage plan for AWS / Application for v7 / subscription for Azure).
