---
title: Feature - Discover APIs
linkTitle: Feature - Discover APIs
draft: false
weight: 40
description: >-
  You can set up tag-based condition expressions using the AWS_FILTER
  environment variable to discover APIs that could be added to Amplify Central.

  Conditional expressions statements use logical operators to compare values. This section provides sample syntax for defining expressions.
---

{{< alert title="Note" color="primary" >}}For tag based filtering, the conditional expression should have "tag" as the prefix / selector in the symbol name:  `tag.<tagName> == <tagValue>`. The expression can be a simple condition or a compound condition in which multiple conditions are evaluated using logical operators. See Logical operators and Comparative operators, below.{{< /alert >}}

## Filter based on tag name

```
tag.<tagName>.Exists() == true | false
```

Sample to discover all APIs having a tag name API_TYPE: `AWS_FILTER=tag.API_TYPE.Exists() == true`

Sample to discover all APIs not having a tag name API_TYPE: `AWS_FILTER=tag.API_TYPE.Exists() == false`

## Filter based on tag value

```
tag.Any() == | != <tagValue>
```

Sample to discover all APIs having a tag that has Finance in its value: `AWS_FILTER=tag.Any() == Finance`

Sample to discover all APIs having a tag that does not have Finance in its value: `AWS_FILTER=tag.Any() != Finance`

## Filter based on tag name and tag value

```
tag.<tagName> == | != <tagValue>
```

Sample to discover all APIs having a tag name API_TYPE that has ‘Finance’ in its value: `AWS_FILTER=tag.API_TYPE == Finance`

Sample to discover all APIs having a tag name API_TYPE that does not have ‘Finance’ in its value: `AWS_FILTER=tag.API_TYPE != Finance`

## Filter based on partial value

```
tag.<tagName>.contains(<value>) == true |  false
```

Sample to discover all APIs having a tag name containing API: `AWS_FILTER=tag.API_TYPE.contains(API) == true`

Sample to discover all APIs having a tag name not containing API: `AWS_FILTER=tag.API_TYPE.contains(API) == false`

## Filter using MatchRegEx

```
tag.<tagName>.matchRegEx(<regularExpression>)
```

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

Sample of a composite expression to discover APIs having Math as a tag name OR APIs having a tag name API_TYPE whose value is ‘Healthcare’ and exclude APIs having a tag name API_TYPE whose value is ‘SOAP’: `tag.Math.Exists() == true || tag.API_TYPE == Healthcare || tag.API_TYPE != SOAP`
