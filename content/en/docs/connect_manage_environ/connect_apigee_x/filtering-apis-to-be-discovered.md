---
title: Discover APIs
linkTitle: Discover APIs
draft: false
weight: 40
---
Set up tag-based condition expressions using the APIGEE_FILTER environment variable (or, for SaaS, by editing the api-server resource DiscoveryAgent.spec.config.filter) to discover APIs that could be added to Amplify.

The tag names are taken from the API Spec, currently only working for OAS2/OAS3. For example, if you have a tag name 'PET' defined in the OAS Spec, you can use that tag name in the conditional expression to discover APIs that could be added to Amplify.

Conditional expressions statements use logical operators to compare values. This section provides sample syntax for defining expressions.

## Before you start

* Review Logical operators and Comparative operators
* Use exact tag and proxy name casing in expressions to avoid mismatches

## Objectives

Learn how to set filtering based on tag name from the API Spec, tag value, partial value and MatchRegEx to discover APIs that can be published to Amplify.

## Filter based on tag name or proxy name

`tag.Name.Exists() == true`
`tag.Name.Exists() == false`
`name.Proxy.Exists() == false`
`name.Proxy.Exists() == true`


Sample to discover all APIs having any tag name: `filter: tag.Name.Exists() == true`

Sample to discover all APIs not having a tag name: `filter: tag.Name.Exists() == false`

Sample to discover all APIs having a proxy name: `filter: name.Proxy.Exists() == true`

Sample to discover all APIs not having a proxy name: `filter: name.Proxy.Exists() == false`

## Filter based on tag value or proxy name

`tag.Name != <tagValue>`
`tag.Name == <tagValue>`
`name.Proxy != <proxyName>`
`name.Proxy == <proxyName>`

Sample to discover all APIs having a tag that has Finance in its value: `filter: tag.Name == Finance`

Sample to discover all APIs having a tag that does not have Finance in its value: `filter: tag.Name != Finance`

Sample to discover all APIs having a proxy name 'CurrencyConverter': `filter: name.Proxy == CurrencyConverter`

Sample to discover all APIs not having a proxy name 'CurrencyConverter': `filter: name.Proxy != CurrencyConverter`

## Filter based on partial tag value or partial proxy name

`tag.Name.Contains(<value>) == true | false`
`name.Proxy.Contains(<value>) == true | false`

Sample to discover all APIs having a tag name containing API: `tag.Name.Contains("API") == true`

Sample to discover all APIs having a tag name not containing API: `tag.Name.Contains("API") == false`

Sample to discover all APIs having a proxy name containing 'Currency': `name.Proxy.Contains("Currency") == true`

Sample to discover all APIs having a proxy name not containing 'Currency': `name.Proxy.Contains("Currency") == false`

## Filter using MatchRegEx

`tag.Name.matchRegEx(<regularExpression>)`
`name.Proxy.matchRegEx(<regularExpression>)`

## Logical operators

Logical operators are used for evaluating multiple conditions. These can be combined with comparative operators and any of the above expressions.

* `&&` - Logical AND operator, returns true if conditions on both sides are true.
* `||` - Logical OR operator, returns true if the condition on either side is true.

## Comparative operators

Comparative operators are used for comparing two values. These can be combined with logical operators and any of the above expressions.

* `==` - Equal to operator, returns true if values on both sides are equal.
* `!=` - Not equal to operator, returns true if the value on the left side is not equal to the value on the right side.

## Quick reference

Use these patterns to build filter expressions quickly:

* Check if any tag exists: `tag.Name.Exists() == true`
* Check if no tag exists: `tag.Name.Exists() == false`
* Check if proxy name exists: `name.Proxy.Exists() == true`
* Match an exact tag value: `tag.Name == Finance`
* Match an exact proxy name: `name.Proxy == CurrencyConverter`
* Match partial tag value: `tag.Name.Contains("API") == true`
* Match partial proxy name: `name.Proxy.Contains("Currency") == true`
* Match with regular expression: `tag.Name.matchRegEx(<regularExpression>)`
* Combine conditions: `name.Proxy == "CurrencyConverter" && tag.Name == "Finance"`

## Other examples which can be used both for tag name and proxy name

Discover all APIs having a logical name that is equal to CurrencyConverter and a tag name equal to Finance: 
`name.Proxy == "CurrencyConverter" && tag.Name == "Finance"`

Discover all APIs having a logical name that is not equal to CurrencyConverter and APIs that have tag name that is not equal to Finance:
`name.Proxy != "CurrencyConverter" && tag.Name != "Finance"`

## See also

* [Connect Apigee X Gateway](/docs/connect_manage_environ/connect_apigee_x/)
* [Deploy embedded agents](/docs/connect_manage_environ/connect_apigee_x/deploy-embedded-agents/)
* [Deploy ground agents](/docs/connect_manage_environ/connect_apigee_x/deploy-ground-agents/)
* [Agent variables](/docs/connect_manage_environ/connect_apigee_x/agent-variables/)
