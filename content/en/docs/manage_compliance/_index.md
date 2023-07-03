---
title: Manage your compliance validation
linkTitle: Manage your compliance validation
weight: 475
date: 2023-05-04
hide_readingtime: true
---

With an increasing number of APIs, API providers and consumers of APIs, there is a pressing need to make sure that exposed APIs are compliant with internally or externally defined API standards.

The Amplify API Management platform allows you to validate how well your APIs meet the API guidelines of your organization. This is known as API linting and has been integrated into the Amplify API Management. Compliance validation is an entitlement you can purchase from Axway as part of the API Management platform.

## What is compliance validation

Compliance validation is the verification of your APIs in terms of how they meet the guidelines defined in a ruleset. Both an API Design and Security ruleset can be applied to all the APIs in a selected environment. See the default [Design](#default-design-ruleset) and [Security](#default-security-ruleset) ruleset values. Amplify has integrated an open-source tool (Spectral) which supports the linting of Open API version 2, Open API version 3, and Async API specification files.

For example, an API can be checked for compliance in terms of the API methods supported or the presence of a security policy. The grading results of the compliance are measured in the number of errors, warnings, info, or hints found.

## How to perform compliance validation

API compliance validation can be enabled/disabled per environment. Navigate to the Topology screen then create/edit an environment. The environment wizard has a **Compliance Profile** step, where you can enable the Design rules and/or Security rules for compliance. A default [Design ruleset](#default-design-ruleset) (default-design-ruleset) and a default [Security ruleset](#default-security-ruleset) (default-security-ruleset) are available. Changes take effect as soon as the environment settings are saved.

Once enabled for the environment, all current APIs and future API updates within the selected environment are automatically compliance validated.

At the right of each line in the Service Registry is an ellipsis where you can select **Run Ruleset** to manually initiate a compliance lint job.

### Default Design ruleset

```yaml
default-design-rulesset

extends: ["spectral:oas", "spectral:asyncapi"]
```

### Default Security ruleset

```yaml
default-security-rulesset

rules:
    security-must-be-enforced-for-unsafe-endpoints:
        message: Security must be applied to "write" endpoints
        severity: error
        given: "$.paths.*[?(@property == 'post' || @property == 'put' || @property == 'patch' || @property == 'delete')]"
        then:
        - field: security 
         function: truthy
```

## Default grading scores

A letter grade from A to F is used to indicate the level of Design or Security compliance for an API. The ranges for each grading are:

| Grading score  | Range  | Information  |
|----------------|--------|--------------|
| **A**          | 0 errors <br />0 warnings <br />0 infos <br />0 hints         |   |
| **B**          | 0 errors <br />0 warnings <br />1 - 5 infos and / or hints |   |
| **C**          | 0 errors <br />1 - 5 warnings | The count of info and hints found the API are ignored |
| **D**          | 0 errors <br />5+ warnings | The count of info and hints found the API are ignored |
| **E**          | 1 - 5 errors | The count of warnings, info and hints found the API are ignored |
| **F**          | 5+ errors | The count of warnings, info and hints found the API are ignored |

## Grading results

In the Service Registry, two columns visualize the compliance grading of each API. The first one shows the grade from a Security perspective, the second one visualized the Design compliance level. Hover over the grading letter to see the summary of the analysis that resulted in the current grading. A circular spinner is displayed in either grading column once the API is queued for Design or Security compliance validation. An N/A is displayed in either grading column if the API is not one of the supported API types. A red icon is displayed in the grading column if the API specification file is missing a required value.

![Error results](/Images/compliance/error_results.png)
