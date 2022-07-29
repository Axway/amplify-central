---
title: Analytics July 2022 Release Notes
linkTitle: Analytics July 2022
weight: 90
date: 2022-07-11
---

Analytics provide insights into your API program, API environments, and APIs.

## New features and enhancements

The following new feature is available in this update:

* **Consumer insights per application**: consumer can see their consumption across multiple products linked to an application and filter per application and/or products. Go to Marketplace home page > Consumer Insights > Applications.
* **Consumer insights traffic**: consumer can see the detail of their traffic (return code / endpoint called / duration). This traffic can be sampled by the provider but at least all errors will be visible. Go to Marketplace home page > Consumer Insights > Traffic.
* **Consumer insights subscriptions**: consumer can see the detail of their subscription consumption. For each subscription the details of each resource consumption is displayed (quota definition / actual consumption) Go to Marketplace home page > Consumer Insights > Subscriptions.

## Fixed issues

The following issue has been fixed in this release:

* None

## Known limitations

The following limitation exists in this update:

* Business insights / App usage: filtering per application is not working, as the application listed only references the SaaS gateway application and not other dataplane applications (usage plan for AWS / Application for v7 / subscription for Azure).
