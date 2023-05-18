---
title: Manage your compliance validation
linkTitle: Manage your compliance validation
weight: 475
date: 2023-05-04
hide_readingtime: true
---

With the growth of API usage, there is a need for make sure the APIs are technically correct and meet the API standards of your organization. 
The Amplify API Management Platmform allows you to validate how well your APIs meet the API guidelines of your organization.   This is known as API linting and has been integrated into the Amplify API Management.  Compliance Validation is an entitlement you can purchase API Management.  

## What is compliance validation

Compliance validation is the verification of your APIs in terms of how thy meeet the guidelines defined in a rule set.  Both an API Design and Security rule set can be applied to all the APIs in a selected environment.  Amplify has integrated an open-source tool (Spectral) which supports the linting of Open API version 2, Open API version 3, and Async API specification files.
For example, an API can be checked for compliance in terms of the API methods supported or the presence of a security policy.  The gradiing results of the compliance are measured in the number of Errors, Warnings, Info, or Hints found.

## How to perform compliance validation

API Compliance Validation can be enabled/disabled per Environment.   Navigate to the Topology screen then create/edit an environment.   The environment wizard with have a **Compliance Profile** step, where you can enable either of Design Rules or Security Rules for compliance.   A default Design rule set (default-design-reulate) and a default Security rules set (default-security-ruleset) is available to be used.  Changes take effect as soon as the environment settings are saved.
Once enabled for the environment, all current APIs and future API updates within the selected environment will be automatically Compliance Validated.
At the Service Registry, on each line at the far right is an ellipsis where you can select "Run Ruleset" to manually initiate a Compliance Lint job.

## Default Grading Scores

A letter grade from A to F is used to indicate the level of Design or Security compliance for an API.   The ranges for each grading are as follows:

**A** = no errors, warnings, info or hints found in the API.

**B** = no errors and no warnings found in the API.  Count of 1-5 info and/or at least 1 hint found in the API.

**C** = no errors found in the API.   Count of 1-5 warnings found in the API.   The count of info and hints found the API are ignored.

**D** = no errors found in the API.   Count of more than 5 warnings found in the API.   The count of info and hints found the API are ignored.

**E** = A count of 1-5 errors found in the API.  The count of warnings, info and hints found the API are ignored.

**F** = A count of more than 5 errors found in the API.  The count of warnings, info and hints found the API are ignored.

## Grading Results

In the Services Registry of the WebUI, there are columns with the Compliance Grading of each API.   Hover over the grading letter to view the counts.
A circular spinner will be displayed in either grading column when the API is queued for Design or Security Compliance Validation.
A "N/A" will be displayed in either grading column if the API is not one of the supported API types. 
A red icon will be display in either the grading column if the API specification file is missing a required value.

![Error results](/Images/compliance/error_results.png)

