---
title: Manage your compliance
linkTitle: Manage your compliance
weight: 475
date: 2023-05-04
hide_readingtime: true
---

The Amplify API Management Platmform allows you to validate how well your APIs meet the API guidelines of your organization.   This is known as API linting and has been integrated into the Amplify API Management.  Compliance Validation is an entitlement when you purchase API Management.  

## What is compliance

Compliance is the validation of your APIs in terms of how thy meeet the guidelines defined in a rule set.  Both an API Design and Security rule set can be applied to all the APIs in a selected environment.  Amplify has integrated an open-source tool which supports the linting of Open API, Async API and JSON specification files.
For example, an API can be checked for compliance in terms of the API methods supported or the presence of a security policy.  The gradiies ng results of the compliance are measured as in the number of Errors, Warnings, Info, or Hints found.  

## Grading Results

In the Services Registry and the Environment Details pages of the WebUI, there are columns with the Compliance Grading of each API.   Hover over the grading letter to view the counts.  

![Error results](/Images/compliance/error_results.png)

Default Grading Scores
