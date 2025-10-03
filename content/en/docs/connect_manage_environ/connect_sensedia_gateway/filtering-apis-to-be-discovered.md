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

### Alternative format with specific tag value filtering

`tag.<attributeName>.Exists()`

Sample to discover all APIs having any tag with attribute name "Axway": `SENSEDIA_FILTER=tag.Axway.Exists()`

### Format with boolean comparison (for exclusion)

`tag.<attributeName>_<specificTagValue>.Exists() == false`

Sample to exclude APIs having attribute "Axway" with tag value 'testing': `SENSEDIA_FILTER=tag.Axway_testing.Exists() == false`

{{< alert title="Note" color="primary" >}}The tested and recommended format is `tag.<attributeName>_<tagValue>.Exists()` without the `== true` comparison. Use `== false` only when you need to explicitly exclude APIs with specific tags.{{< /alert >}}`

This is the primary filter format used in Sensedia agents. It combines the attribute name and tag value with an underscore.

Sample to discover all APIs having attribute "Axway" with tag value "axway": `SENSEDIA_FILTER=tag.Axway_axway.Exists() == true`

Sample to discover all APIs having attribute "API Type" with tag value "private": `SENSEDIA_FILTER=tag.API_Type_private.Exists() == true`

Sample to exclude APIs with "Axway" attribute containing "testing" tag: `SENSEDIA_FILTER=tag.Axway_testing.Exists() == false`

## Filter based on tag attribute existence

`tag.<attributeName>.Exists() == true | false`

Sample to discover all APIs having any tag with attribute name "Axway": `SENSEDIA_FILTER=tag.Axway.Exists() == true`

Sample to discover all APIs not having any tag with attribute name "API Type": `SENSEDIA_FILTER=tag.API_Type.Exists() == false`

## Filter based on specific tag values within attributes

`tag.<attributeName>_<specificTagValue>.Exists() == true | false`

This format allows filtering for specific tag values within a tag attribute.

Sample to discover all APIs having attribute "Axway" with specific tag value 'axway': `SENSEDIA_FILTER=tag.Axway_axway.Exists() == true`

Sample to discover all APIs having attribute "Axway" with specific tag value 'discover': `SENSEDIA_FILTER=tag.Axway_discover.Exists() == true`

Sample to exclude APIs having attribute "Axway" with tag value 'testing': `SENSEDIA_FILTER=tag.Axway_testing.Exists() == false`

## Alternative filter methods

Based on the Agent SDK, several additional tag filter methods are available:

### Filter by tag value equality

`tag.<tagName> == | != <value>`

Sample to discover APIs with specific tag value: `SENSEDIA_FILTER=tag.Axway == "axway"`

Sample to exclude APIs with specific tag value: `SENSEDIA_FILTER=tag.Axway != "testing"`

### Filter using Any() method

`tag.Any() == | != <value>`

Sample to discover APIs where any tag has specific value: `SENSEDIA_FILTER=tag.Any() == "production"`

Sample to exclude APIs where any tag has specific value: `SENSEDIA_FILTER=tag.Any() != "testing"`

### Filter using Contains method

`tag.<tagName>.Contains(<value>)`

Sample to discover APIs where tag contains partial value: `SENSEDIA_FILTER=tag.Axway.Contains("axway")`

### Filter using MatchRegEx method

`tag.<tagName>.MatchRegEx(<regularExpression>)`

Sample to discover APIs with tags matching a pattern: `SENSEDIA_FILTER=tag.Axway.MatchRegEx("^axway.*")`

### Global MatchRegEx for tag names

`tag.MatchRegEx(<regularExpression>)`

Sample to discover APIs with tag names matching a pattern: `SENSEDIA_FILTER=tag.MatchRegEx("Axway.*")`

{{< alert title="Note" color="primary" >}}While these methods are available in the Agent SDK, the primary tested and recommended format for Sensedia is `tag.<attributeName>_<tagValue>.Exists()`. Use other methods only if you have specific filtering requirements that the basic Exists() method cannot handle.{{< /alert >}}

## Logical operators

Logical operators are used for evaluating multiple conditions. These can be combined with comparative operators and any of the above expressions.

| Operator | Description                                                                |
|----------|----------------------------------------------------------------------------|
| `&&`       | Logical AND operator, returns true if conditions on both sides are true.   |
| `\|\|`      | Logical OR operator, returns true if the condition on either side is true. |

## Comparative operators

Comparative operators are used for comparing two values. These can be combined with logical operators and any of the above expressions.

| Operator | Description                                                                                                    |
|----------|----------------------------------------------------------------------------------------------------------------|
| `==`       | Equal to operator, returns true if values on both sides are equal.                                             |
| `!=`       | Not equal to operator, returns true if the value on the left side is not equal to the value on the right side. |

## Example filter expressions

Based on the actual tag structure and correct filter format, here are practical examples:

### Simple filters

* Discover APIs with Axway attribute containing "axway" tag: `SENSEDIA_FILTER=tag.Axway_axway.Exists()`
* Discover APIs with Axway attribute containing "discover" tag: `SENSEDIA_FILTER=tag.Axway_discover.Exists()`
* Discover APIs with API Type attribute containing "development" tag: `SENSEDIA_FILTER=tag.API_Type_development.Exists()`
* Exclude testing APIs: `SENSEDIA_FILTER=tag.Axway_testing.Exists() == false`

### Compound filters

* Discover Axway APIs that are also for testing: `SENSEDIA_FILTER=tag.Axway_axway.Exists() && tag.Axway_testing.Exists()`
* Discover APIs that have Axway tags OR API Type tags: `SENSEDIA_FILTER=tag.Axway_axway.Exists() || tag.API_Type_development.Exists()`
* Exclude testing APIs from discovery: `SENSEDIA_FILTER=tag.Axway_testing.Exists() == false`

### Special characters in attribute names

Note that spaces in attribute names like "API Type" should be referenced as `API_Type` in filters:

`SENSEDIA_FILTER=tag.API_Type_development.Exists()`