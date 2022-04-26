---
title: Use Discovery Agent to categorize your APIs
linkTitle: Use Discovery Agent to categorize your APIs
draft: false
weight: 10
description: Understand how the Discovery Agent can automatically categorize 
  discovered APIs when publishing to Amplify Central. Learn how you can add
  conditions and associated categories when those conditions are met.
---

{{< alert title="Note" color="primary" >}}
The automatic categorization filter is only available in the Axway API Manager Discovery Agent. Support in the other agents is coming soon!
{{< /alert >}}

## Before you start

* Review Logical operators and Comparative operators.

## Objectives

Learn how to set conditions based on tag name and tag value to automatically categorize discovered APIs in Amplify Central.

## Category mapping

Category mapping provides a way for your agent to determine how to map discovered APIs to categories for viewing in Amplify Central.

{{< alert title="Note" color="primary" >}}
When any category mapping is defined, manual categories will be removed from an API when the agent performs an update
{{< /alert >}}

## Mapping sample

Each mapping definition will include both the `conditions` key and the `categories` key.  When the condition returns true, the comma separated list of categories will be applied to the API.

{{< alert title="Note" color="primary" >}}
The `APIMANAGER_` prefix, below, will be different depending on which gateway the agent is for.
{{< /alert >}}

```bash
APIMANAGER_CATEGORY_MAPPINGS=[{conditions:"tag.API_TYPE.Exists()",categories:"CategoryA,CategoryB"}]
```

Multiple mappings may be used in the environment variable by separating each mapping with a comma.

```bash
APIMANAGER_CATEGORY_MAPPINGS=[{mapping1}, {mapping2}, {mapping3}, ...]
```

Example:

```bash
APIMANAGER_CATEGORY_MAPPINGS=[{conditions:"tag.API_TYPE.Exists()",categories:"CategoryA, CategoryB"}, {conditions:"tag.API_TYPE.Contains(\"API\")",categories:"API Category"}]
```

## Conditionals

Conditionals use the same format and operators that the Discovery Agent filter feature uses.

### Categorize based on tag name

```
tag.<tagName>.Exists()
```

Sample to categorize APIs having a tag name API_TYPE: ```conditions: tag.API_TYPE.Exists()```

Sample to categorize APIs that do not not having a tag name API_TYPE: ```conditions: tag.API_TYPE.Exists() == false```

### Categorize based on tag value

```
tag.<tagName> == | != <tagValue>
```

Sample to categorize APIs having a tag name API_TYPE and 'Finance' as its value: ```filter: tag.API_TYPE == Finance```

Sample to categorize APIs having a tag name API_TYPE and does not have 'Finance' as its value: ```filter: tag.API_TYPE !=  Finance```

### Categorize based on partial value

```
tag.<tagName>.contains(<value>)
```

Sample to categorize APIs having a tag name API_TYPE with a value containing API: ```tag.API_TYPE.contains(API)```

Sample to categorize APIs having a tag name API_TYPE with a value not containing API: ```tag.API_TYPE.contains(API) == false```

### Categorize using MatchRegEx

```
tag.<tagName>.matchRegEx(<regularExpression>)
```

### Logical operators

Logical operators are used for evaluating multiple conditions. These can be combined with comparative operators and any of the above expressions.

| Operator | Description                                                                |
|----------|----------------------------------------------------------------------------|
| `&&`     | Logical AND operator, returns true if conditions on both sides are true.   |
| \|\|     | Logical OR operator, returns true if the condition on either side is true. |

### Comparative operators

Comparative operators are used for comparing two values. These can be combined with logical operators and any of the above expressions.

| Operator | Description                                                                                                    |
|----------|----------------------------------------------------------------------------------------------------------------|
| `==`     | Equal to operator, returns true if values on both sides are equal.                                             |
| `!=`     | Not equal to operator, returns true if the value on the left side is not equal to the value on the right side. |

Sample of a composite expression to categorize APIs having Math as a tag name OR APIs having a tag name API_TYPE whose value is 'Healthcare' and not APIs having a tag name API_TYPE whose value is 'SOAP': ```tag.Math.Exists() || tag.API_TYPE == Healthcare && tag.API_TYPE != SOAP```

## Categorizing

When an entire conditional is met, the categories defined with that condition are added to the list of categories that will be applied to the API in Amplify Central.

When multiple mapping conditions evaluate to true, all categories from all mappings are added to the list with duplicates removed.

### Category auto creation

An additional switch (default: `false`) is provided to tell the Agent to create any category that does not already exist in Amplify Central. When this switch is off the agent will not apply non-existent categories to the API.

{{< alert title="Note" color="primary" >}}
The `APIMANAGER_` prefix, below, will be different depending on which gateway the agent is for.
{{< /alert >}}

```
APIMANAGER_CATEGORY_AUTOCREATION=true
```

When auto creating categories, the name of all categories will be processed prior to creating the category on Amplify Central.  Since categories may only contain letters, numbers, spaces, [], and (), any other characters will be removed automatically.

### Tag value as category

In addition to static category names, the category mapping may reference a tags value as a category to add.  To do this, the categories list must add a value such as `tag.TagA.Value`.  This will have the affect of the value of TagA becoming a category.

Sample of using TagA's value as a category on the API:

```
APIMANAGER_CATEGORY_MAPPINGS=[{conditions:"tag.TagA.Exists()",categories:"CategoryA,tag.TagA.Value"}]
```

If a discoverd API has a tag of `TagA = TagValue` then that API would get two categories assigned to it, `CategoryA` and `TagValue`.
