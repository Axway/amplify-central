---
title: Query the Traceability APIs with Lexus
description: Learn how you can query data about API specifics and aggregate
  performance using the Amplify Central Traceability APIs.
---
## Core concepts

Lexus is a small [JSON](http://www.json.org/) language used for querying multiple types of data storage systems. With Lexus you can query for a set of specific documents using filters that match them, or for counts of the documents that match. You can also ask for basic histograms or group by field values in the documents. Other aggregations, such as sums and averages, are also possible. Lexus is used as the query language against the analytics store inside the Amplify platform and these Lexus-based queries can be passed to APIs. This cookbook covers some specific examples of Lexus queries that will help you to form more complex examples.

The core of the Lexus language and how to use it are described [in this document](https://github.com/appcelerator/lexus/blob/c8b4049ed91c19f722d55e4fbb3aa0ed61b65add/docs/getting-started.md).

## Prerequisite - API authorization

1. ***Install the Axway CLI***: [https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/quick\_start/index.html](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/quick_start/index.html)
2. ***Authorize the CLI***: [https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/index.html)

{{< alert title="Note" color="primary" >}}If you are querying against Amplify Central APIs, ensure your account is assigned the **Central Admin** role in the Amplify platform dashboard.{{< /alert >}}

## Amplify Central use case

One common use case is to call the various APIs inside Amplify Central to retrieve summaries of transactions, events, or an individual transaction or event. See [https://docs.axway.com/category/api](https://docs.axway.com/category/api) > Amplify Platform > Traceability Connector API.

You can use whichever of the following methods you feel the most comfortable with to call the APIs.

### Postman Collection

For quicker execution, you may prefer to use the postman collection containing some of the examples shown below in the sample queries: [https://documenter.getpostman.com/view/2125605/TWDanGAu](https://documenter.getpostman.com/view/2125605/TWDanGAu).

{{< alert title="Note" color="primary" >}}The Postman Collection requires the ***X-Axway-Tenant-Id*** and ***Authorization*** headers to be set to POST to the backend service.{{< /alert >}}

### cURL

To call APIs via cURL:

1. Paste the following document into a file: `amplify\_api.sh`
2. Change the file to be executable: `chmod a+x amplify.sh`
3. Call the file: `./amplify\_api.sh`

{{< alert title="Note" color="primary" >}}In this script, environment variables are assumed to have been set using the information specified under [API Authorization](#api-authorization):{{< /alert >}}

```sh
export $CLIENT_ID=<clientId>
export $SECRET_FILE=<secretFile>
```

### Command line

This script shows an example of exercising the API calls directly from the command line:

```js
#!/bin/bash
 
# params
CENTRAL_URL="https://apicentral.axway.com"
# This could be simplified on systems that support date %N
DATE=$(python -c "import time; print(int(time.time()*1000))")
 
# Set these parameters externally, or change to using a different authentication style if you like
authResult=$(axway auth login --client-id $CLIENT_ID  --secret-file $SECRET_FILE --json)
token=$(echo $authResult | jq -r '.auth.tokens.access_token')
tenantId=$(echo $authResult | jq -r '.org.org_id')
 
# note the double-escape around $DATE given that the payload is encapsulated in single-quotes
curl --location --request POST "${CENTRAL_URL}/api/traceability/v1/traceability/search" \
--header "X-Axway-Tenant-Id: ${tenantId}" \
--header "Authorization: Bearer ${token}" \
--header "Content-Type: application/json" \
--data-raw '
{
    "filters": {
        "$range": {
            "@event_time": {
                "lt": '${DATE}'
            }
        }
    },
    "invoke": {
        "field": "@event_time",
        "params": {
            "limit": 100,
            "offset": 0,
            "sort": {
                "@event_time": -1
            }
        },
        "method": "find"
    },
    "version": "0.2"
}'
```

## Transaction event examples

### Last 100 events, both summaries and events

```js
// Replace "lt" with the current time in ms
// List is last 100 items, sorted in descending order by event_time
{
    "filters": {
        "$range": {
            "@event_time": {
                "lt": <current time>
            }
        }
    },
    "invoke": {
        "field": "@event_time",
        "params": {
            "limit": 100,
            "offset": 0,
            "sort": {
                "@event_time": -1
            }
        },
        "method": "find"
    },
    "version": "0.2"
}
```

### Show only transactionSummary or transactionEvent events

```js
// This extends the previous example to filter on the type of "transactionSummary"
{
    "filters": {
        "$match": {
            "type": [
                "transactionSummary"
            ]
        },
        "$range": {
            "@event_time": {
                "lt": <current time>
             }
        }
    },
    "invoke": {
        "field": "@event_time",
        "params": {
            "limit": 100,
            "offset": 0,
            "sort": {
                "@event_time": -1
            }
        },
        "method": "find"
    },
    "version": "0.2"
}
```

Transaction summary event

```js
{
   "@category":"message",
   "headers":{
      "environment":"prod4",
      "deployment":"apicentral"
   },
   "metadata":{
      "origin":"<ip>",
      "certificate":"CN=axway_api",
      "format":"json",
      "source":"API-C",
      "tenant":<tenant>,
      "orgId":"<orgId>",
      "flow":"api-central-v8"
   },
   "@knowledge_time":"2021-09-16T08:33:37.230Z",
   "@event_time":"2021-09-16T08:33:35.730Z",
   "body":{
      "environmentId":"<environmentId>",
      "environmentName":"Axway Cloud",
      "tenantId":"<tenantId>",
      "apicDeployment":"prod",
      "transactionSummary":{
         "duration":61,
         "proxy":{
            "name":"<name>",
            "id":"<uuid>",
            "revision":1
         },
         "runtime":{
            "name":"Prod Runtime",
            "id":"<guid>"
         },
         "statusDetail":200,
         "entryPoint":{
            "path":"/v6/pet/123",
            "method":"GET",
            "host":"<random>.apicentral.axwayamplify.com",
            "type":"http"
         },
         "status":"Success"
      },
      "type":"transactionSummary",
      "version":"1.0",
      "transactionId":"<guid>",
      "timestamp":1631781215730
   },
   "@sorted_event_id":"<random>,
   "@index_time":"2021-09-16T08:33:37.232523Z",
   "@org_guid":"<guid>",
   "@fulltext":"<text of event>",
   "@tenant_id":58,
   "@clearance":"log",
   "@source_id":1
}
```

### Transaction event

```js
{
   "@category":"message",
   "headers":{
      "environment":"prod4",
      "deployment":"apicentral"
   },
   "metadata":{
      "origin":"<ip>",
      "certificate":"CN=axway_api",
      "format":"json",
      "source":"API-C",
      "tenant":58,
      "orgId":"<orgId>",
      "flow":"api-central-v8"
   },
   "@knowledge_time":"2021-09-16T08:33:38.233Z",
   "@event_time":"2021-09-16T08:33:36.740Z",
   "body":{
      "environmentId":"<environmentId>",
      "transactionEvent":{
         "duration":26,
         "protocol":{
            "sslServerName":"petstore.swagger.io",
            "method":"GET",
            "localPort":8080,
            "timing":{
               "sslHandshake":21,
               "tcpConnection":17,
               "dnsLookup":15,
               "end":26,
               "firstByte":26
            },
            "remotePort":59562,
            "userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
            "bytesSent":400,
            "type":"http",
            "uri":"/pet/123",
            "version":"1.1",
            "args":"{}",
            "bytesReceived":1046,
            "requestHeaders":"<requestHeaders>",
            "statusText":"Not Found",
            "host":"petstore.swagger.io",
            "sslProtocol":"TLSv1.2",
            "localAddr":"<ip>",
            "remoteAddress":"<ip>",
            "status":404
         },
         "destination":"backend.cloud",
         "id":"leg1",
         "source":"nginx.cloud",
         "parentId":"leg0",
         "direction":"outbound",
         "status":"Failure"
      },
      "tenantId":"100094705",
      "apicDeployment":"prod",
      "type":"transactionEvent",
      "version":"1.0",
      "transactionId":"<guid>",
      "timestamp":1631781216740
   },
   "@sorted_event_id":"<random>",
   "@index_time":"2021-09-16T08:33:38.270384Z",
   "@org_guid":"<guid>",
   "@fulltext":"<text of event>",
   "@tenant_id":58,
   "@clearance":"log",
   "@source_id":1
}
```

## Sample queries

When using the sample queries:

* Replace {{ }} with actual values, or use one of the substitution methods above.
* Timestamps are milliseconds since the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time).

### Received bytes per environment

Find all transaction events, where the event direction is "inbound" between the two stated times. Sum the total number of bytes received, and group the totals by environmentId.

```js
{
    "filters": {
        "$and": [
            {
                "$match": {
                    "type": [
                        "transactionEvent"
                    ]
                }
            },
            {
                "$match": {
                    "transactionEvent.direction": [
                        "inbound","Inbound"
                    ]
                }
            }
        ],
        "$range": {
            "@event_time": {
                "gt": {{generated_startTimestamp}},
                "lt": {{generated_endTimestamp}}
            }
        }
    },
    "invoke": {
        "field": "transactionEvent.protocol.bytesReceived",
        "method": "sum"
    },
    "group_by": [
        {
            "field": "environmentId",
            "type": "string"
        }
    ],
    "version": "0.2"
}
```

### Distribution of response codes per environment

Find all inbound transaction events between the two timestamps, and count the number of response codes of each type, grouped by environment.

```js
{
    "filters": {
        "$and": [
            {
                "$match": {
                    "type": [
                        "transactionEvent"
                    ]
                }
            },
            {
                "$match": {
                    "transactionEvent.direction": [
                        "Inbound","inbound"
                    ]
                }
            }
        ],
        "$range": {
            "@event_time": {
                "gt": {{generated_startTimestamp}},
                "lt": {{generated_endTimestamp}}
            }
        }
    },
    "invoke": {
        "field": "@event_time",
        "method": "count"
    },
    "group_by": [
        {
            "field": "environmentId",
            "type": "string"
        },
        {
            "field": "transactionEvent.protocol.status",
            "type": "numeric",
            "params": {
                "interval": 1
            }
        }
    ],
    "version": "0.2"
}
```

### 404 response codes per environment

{{< alert title="Note" color="primary" >}}The "404" can be replaced with a new response code, or extended to include other error codes by adding additional elements to the array. This query also shows all environments. See the following query to specify a specific environment by adding another "$match" clause.{{< /alert >}}

```js
{
    "filters": {
        "$and": [
            {
                "$match": {
                    "type": [
                        "transactionEvent"
                    ]
                }
            },
            {
                "$prefix": {
                    "transactionEvent.protocol.status": [
                        "404"
                    ]
                }
            }
        ],
        "$range": {
            "@event_time": {
                "gt": {{generated_startTimestamp}},
                "lt": {{generated_endTimestamp}}
            }
        }
    },
    "invoke": {
        "field": "@event_time",
        "method": "count"
    },
    "group_by": [
        {
            "field": "environmentId",
            "type": "string"
        },
        {
            "field": "transactionEvent.protocol.status",
            "type": "numeric",
            "params": {
                "interval": 1
            }
        }
    ],
    "version": "0.2"
}
```

### Mesh graph - specify environmentId as parameter

Show the graph of calls going in and out, grouped by source and destination, restricted to the environment in question.

```js
{
    "filters": {
        "$and": [
            {
                "$match": {
                    "type": [
                        "transactionEvent"
                    ]
                }
            },
            {
                "$match": {
                    "transactionEvent.direction": [
                        "Inbound",
                        "inbound"
                    ]
                }
            },
            {
                "$match": {
                    "environmentId": [
                        "{{environmentId}}"
                    ]
                }
            }
        ],
        "$range": {
            "@event_time": {
                "gt": {{generated_startTimestamp}},
                "lt": {{generated_endTimestamp}}
            }
        }
    },
    "group_by": [
        {
            "field": "transactionEvent.source",
            "type": "string"
        },
        {
            "field": "transactionEvent.destination",
            "type": "string"
        },
        {
            "field": "transactionEvent.protocol.status",
            "type": "numeric",
            "params": {
                "interval": 1
            }
        }
    ],
    "invoke": {
        "field": "@event_time",
        "method": "count"
    },
    "version": "0.2"
}
```

### Environments - Number of calls grouped by source/destination/resource code

Similar to the previous one, but now for all environments, grouped by environment id.

```js
{
    "filters": {
        "$and": [
            {
                "$match": {
                    "type": [
                        "transactionEvent"
                    ]
                }
            },
            {
                "$match": {
                    "transactionEvent.direction": [
                        "Inbound","inbound"
                    ]
                }
            }
        ],
        "$range": {
            "@event_time": {
                "gt": {{generated_startTimestamp}},
                "lt": {{generated_endTimestamp}}
            }
        }
    },
    "invoke": {
        "field": "@event_time",
        "method": "count"
    },
    "group_by": [
        {
            "field": "environmentId",
            "type": "string"
        },
        {
            "field": "transactionEvent.source",
            "type": "string"
        },
        {
            "field": "transactionEvent.destination",
            "type": "string"
        },
        {
            "field": "transactionEvent.protocol.status",
            "type": "numeric",
            "params": {
                "interval": 1
            }
        }
    ],
    "version": "0.2"
}
```

### Environments - Number of calls grouped by source/destination/path/status code

Extend the previous call to also include the API paths called.

```js
{
    "filters": {
        "$and": [
            {
                "$match": {
                    "type": [
                        "transactionEvent"
                    ]
                }
            }
        ],
        "$range": {
            "@event_time": {
                "gt": {{generated_startTimestamp}},
                "lt": {{generated_endTimestamp}}
            }
        }
    },
    "group_by": [
        {
            "field": "environmentId",
            "type": "string"
        },
        {
            "field": "transactionEvent.source",
            "type": "string"
        },
        {
            "field": "transactionEvent.destination",
            "type": "string"
        },
         {
            "field": "transactionEvent.protocol.uri",
            "type": "string"
        },
        {
            "field": "transactionEvent.protocol.status",
            "type": "numeric",
            "params": {
                "interval": 1
            }
        }
    ],
    "invoke": {
        "field": "@event_time",
        "method": "count"
    },
    "version": "0.2"
}
```

### Transactions by status code

The count of transactionSummaries for a particular environment, grouped by status code. Note statuses are 1XX, 2XX, 3XX, so the interval of "100" will group them into those buckets.

```js
{
    "filters": {
        "$and": [
            {
                "$match": {
                    "type": [
                        "transactionSummary"
                    ]
                }
            },
            {
                "$match": {
                    "environmentId": [
                        "{{environmentId}}"
                    ]
                }
            }
        ],
        "$range": {
            "@event_time": {
                "gt": {{generated_startTimestamp}},
                "lt": {{generated_endTimestamp}}
            }
        }
    },
    "invoke": {
        "field": "@event_time",
        "method": "count"
    },
    "group_by": [
        {
            "field": "transactionSummary.statusDetail",
            "type": "numeric",
            "params": {
                "interval": 100
            }
        }
    ],
    "version": "0.2"
}
```

### Transactions by Method and Path

The count of transactionSummaries across all environments, grouped by method and path.

```js
{
    "filters": {
        "$and": [
            {
                "$match": {
                    "type": [
                        "transactionSummary"
                    ]
                }
            }
        ],
        "$range": {
            "@event_time": {
                "gt": {{generated_startTimestamp}},
                "lt": {{generated_endTimestamp}}
            }
        }
    },
    "invoke": {
        "field": "@event_time",
        "method": "count"
    },
    "group_by": [
        {
            "field": "transactionSummary.entryPoint.method",
            "type": "string"
        },
        {
            "field": "transactionSummary.entryPoint.path",
            "type": "string"
        }
    ],
    "version": "0.2"
}
```

### Transactions by Method and Path for api calls that start with /apis

The count of transactionSummaries across all environments, grouped by method and path, but only paths that start with the phrase "/apis".

```js
{
    "filters": {
        "$and": [
            {
                "$match": {
                    "type": [
                        "transactionSummary"
                    ]
                }
            },
            {
                "$prefix": {
                    "transactionSummary.entryPoint.path": [
                        "/apis"
                    ]
                }
            }
        ],
        "$range": {
            "@event_time": {
                "gt": {{generated_startTimestamp}},
                "lt": {{generated_endTimestamp}}
            }
        }
    },
    "invoke": {
        "field": "@event_time",
        "method": "count"
    },
    "group_by": [
        {
            "field": "transactionSummary.entryPoint.method",
            "type": "string"
        },
        {
            "field": "transactionSummary.entryPoint.path",
            "type": "string"
        }
    ],
    "version": "0.2"
}
```

### All Events for a Transaction ID

Given a specific transaction id, find all matching transaction events.

```js
{
    "filters": {
        "$and": [
            {
                "$or": [
                    {
                        "$match": {
                            "type": [
                                "transactionSummary"
                            ]
                        }
                    },
                    {
                        "$match": {
                            "type": [
                                "transactionEvent"
                            ]
                        }
                    }
                ]
            },
            {
                "$match": {
                    "transactionId": [
                        "{{transactionId}"
                    ]
                }
            }
        ],
        "$range": {
            "@event_time": {
                "gte": {{}},
                "lte": {{}}
            }
        }
    },
    "invoke": {
        "field": "@event_time",
        "method": "find",
        "params": {
            "limit": 100,
            "offset": 0,
            "sort": {
                "@event_time": -1
            },
            "include": []
        }
    },
    "version": "0.2"
}
```
