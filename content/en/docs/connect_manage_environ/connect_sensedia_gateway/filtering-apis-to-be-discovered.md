---
title: Feature - Discover APIs
linkTitle: Feature - Discover APIs
draft: false
weight: 40
---
Set up tag-based condition expressions using the SENSEDIA_FILTER environment variable to discover APIs that could be added to Amplify API Service Registry.

Conditional expressions statements use logical operators to compare values. This section provides sample syntax for defining expressions.

{{< alert title="Note" color="primary" >}}For tag based filtering, the conditional expression should have "tag" as the prefix / selector in the symbol name:  `tag.<tagName> == <tagValue>`. The expression can be a simple condition or a compound condition in which multiple conditions are evaluated using logical operators. See Logical operators and Comparative operators, below.{{< /alert >}}

## Sensedia Tag Structure

Sensedia APIs use a specific tag structure with `apiTags` containing attribute names and their associated tag values:

```json
"apiTags": [
  {
    "attributeName": "Axway",
    "tags": ["axway", "discover", "testing"]
  },
  {
    "attributeName": "API Type",
    "tags": ["private"]
  }
]
```

## Filter based on tag attribute and value combination

`The primary and tested format for tag filtering is:

`tag.<attributeName>_<tagValue>.Exists()`

Sample to discover all APIs having attribute "Axway" with tag value "axway": `SENSEDIA_FILTER=tag.Axway_axway.Exists()`

Sample to discover all APIs having attribute "API Type" with tag value "development": `SENSEDIA_FILTER=tag.API_Type_development.Exists()`

### Format with boolean comparison (for exclusion)

`tag.<attributeName>_<specificTagValue>.Exists() == false`

Sample to exclude APIs having attribute "Axway" with tag value 'testing': `SENSEDIA_FILTER=tag.Axway_testing.Exists() == false`

{{< alert title="Note" color="primary" >}}The tested and recommended format is `tag.<attributeName>_<tagValue>.Exists()` without the `== true` comparison. Use `== false` only when you need to explicitly exclude APIs with specific tags.{{< /alert >}}`

This is the primary filter format used in Sensedia agents. It combines the attribute name and tag value with an underscore.

Sample to discover all APIs having attribute "Axway" with tag value "axway": `SENSEDIA_FILTER=tag.Axway_axway.Exists() == true`

Sample to discover all APIs having attribute "API Type" with tag value "private": `SENSEDIA_FILTER=tag.API_Type_private.Exists() == true`

Sample to exclude APIs with "Axway" attribute containing "testing" tag: `SENSEDIA_FILTER=tag.Axway_testing.Exists() == false`