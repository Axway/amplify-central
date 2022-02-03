---
title: Common agent variables
linkTitle: Common agent variables
draft: false
weight: 40
description: This section describes, in more detail, variables common to all agents.
---

This common agent variable is explained in detail:

* [CENTRAL_APISERVICEREVISIONPATTERN](#central_apiservicerevisionpattern)

## CENTRAL_APISERVICEREVISIONPATTERN

This variable sets the pattern used when creating API Service Revisions on Amplify Central.  The default pattern is `{{.APIServiceName}}{{if ne .Stage ""}} ({{.StageLabel}}: {{.Stage}}){{end}} - {{.Date:YYYY/MM/DD}} - r {{.Revision}}`.

### Default pattern

As shown above, the default pattern for this variable is `{{.APIServiceName}}{{if ne .Stage ""}} ({{.StageLabel}}: {{.Stage}}){{end}} - {{.Date:YYYY/MM/DD}} - r {{.Revision}}`.

Each variable is surrounded by two sets of curly braces `{{ }}` and prepended with a period `.`.

In this template there is also a conditional check that the Stage variable is not equal to `ne` to an empty string `""`, `{{if ne .Stage ""}}`. When that condition is true, everything up to the `{{end}}` portion is added to the title, `({{.StageLabel}}: {{.Stage}})`.

Examples:

| .APIServiceName | .Stage     | .StageLabel | .Date             | .Revision | Revision Title                                 |
|-----------------|------------|-------------|-------------------|-----------|------------------------------------------------|
| MyAPI           |            |             | June 16 2011      | 1         | MyAPI - 2011/06/16 - r 1                       |
| ThisAPI         | Production | Stage       | September 15 2015 | 3         | ThisAPI (Stage: Production) - 2015/09/15 - r 3 |
| YourAPI         | test       | Portal      | December 23 2015  | 5         | YourAPI (Portal: test) - 2015/12/23 - r 5      |
| LastAPI         |            | Stage       | January 11 2018   | 2         | LastAPI - 2018/01/11 - r 2                     |

More information about these templates can be found at [https://pkg.go.dev/text/template](https://pkg.go.dev/text/template).

### Available variables

These variables can be used in the naming template:

| Variable Name   | Description                                                                                                                                                          |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| .APIServiceName | The friendly name of the API Service that this revision is being added too                                                                                           |
| .Stage          | The name of the stage, if applicable, that this API Service Revision is linked to on the dataplane                                                                   |
| .StageLabel     | The descriptor of the stage for the linked dataplane. For example, AWS stage descriptor is Stage or Apigee stage descriptor is Portal                                         |
| .Date           | The [date](#date-formats) that this API Service Revision is being created. This is when the resource is created on Amplify, not when the dataplane created the API |
| .Revision       | The revision number, according to what is on Amplify, for this API Service Revision                                                                                  |

### Date Formats

These date formats can added with the .Date variable:

| Format               | Example for April 13 2010 |
|----------------------|---------------------------|
| YYYY/MM/DD (default) | 2010/04/13                |
| YYYY-MM-DD           | 2010-04-13                |
| MM/DD/YYYY           | 04/13/2010                |
| MM-DD-YYYY           | 04-13-2010                |

For example, `{{.Date:YYYY/MM/DD}}`
