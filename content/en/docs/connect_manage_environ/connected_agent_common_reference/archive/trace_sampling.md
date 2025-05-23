---
title: Trace sampling
linkTitle: Trace sampling
draft: false
weight: 150
date: 2025-04-18
---
{{< alert title="Note" color="primary" >}}This is an archived functionality. For the latest sampling support, see [Trace sampling](/docs/connect_manage_environ/connected_agent_common_reference/trace_sampling).{{< /alert >}}

The Traceability Agent can sample the transaction information that is sent to Amplify Analytics. Learn how to set up sampling rules used to send only certain transactions to Amplify Analytics. With the agent default configuration, all transactions are sent to Amplify Analytics.

## Sampling

Sampling adds the ability to control the amount of transaction data that is sent to Amplify Analytics.

### Settings

The following settings can be used to control the sampling. A percentage can be set to control the number of transactions that are sent, and a switch can be set to determine how that percentage is applied.

#### Percentage

The `TRACEABILITY_SAMPLING_PERCENTAGE` variable, defaulted to **`0`**, may be set to any value between 0 and 10.  

* A value of `0` results in no transactions sent to Amplify Analytics for the API traffic display within Business Insights. The API Health display will still show the API metrics even with sampling set to zero percent.
* A value of `10` results in 10% of all transactions sent to Amplify Analytics for the API traffic display.

The agent uses a counter to apply the sampling. When a value (other than 0 and 10) is set, the agent will send all transactions up to that value and then not send any until it reaches 100. Therefore, this percentage results in the first x of each 100 transactions being sampled.

#### Per API

The `TRACEABILITY_SAMPLING_PER_API` variable, defaulted to `true`, may be changed to determine how the percentage variable is applied.

* A value of `true` means that the percentage is applied to each API ID within the transaction. In this case, regardless of usage, all APIs will have transaction representation in Business Insights.
* A value of `false` means that the percentage is applied globally to all APIs. In this case, APIs with lower utilization may never be seen in Business Insights, as the sampling is always the first x of each 100 transactions.

#### Report Only Errors

The `TRACEABILITY_SAMPLING_ONLYERRORS` variable, defaulted to `false`, may be changed to send only error transaction events to ingestion service.

* A value of `true` means that only the transaction events with a transaction status of *Failure* are sent to ingestion service based on the sampling percentage and may be seen in Business Insights.
* A value of `false` means that transaction events with a transaction status of *Failure* will follow the sampling percentage and may or may not not be seen in Business Insights, as the sampling is always the first x of each 100 transactions.

### Preparing Traceability Agent

The Traceability Agent may be configured to sample fewer than all events. The maximum percentage is 10%.

#### No events

The following is a sample value that is added to `ta_env_vars.env`, which will send no gateway transactions to Amplify Analytics.

```shell
TRACEABILITY_SAMPLING_PERCENTAGE=0
```

#### 10% of all events, regardless of API

The following is a sample value that is added to `ta_env_vars.env`, which will send 10% of the gateway transactions to Amplify Analytics.

```shell
TRACEABILITY_SAMPLING_PERCENTAGE=10
TRACEABILITY_SAMPLING_PER_API=false
```

If the agent receives 100 transactions, evenly between two APIs, only the first 10 will be sent to Amplify Analytics.

#### 10% of all events, regardless of API and error status

The following is a sample value that is added to `ta_env_vars.env`, which will send 10% of the gateway transactions, including errors to Amplify Analytics.

```shell
TRACEABILITY_SAMPLING_PERCENTAGE=10
TRACEABILITY_SAMPLING_PER_API=false
TRACEABILITY_SAMPLING_ONLYERRORS=false
```

#### 10% of error events, regardless of API

The following is a sample value that is added to `ta_env_vars.env`, which will send 10% of the gateway transactions to Amplify Analytics. Including all errors.

```shell
TRACEABILITY_SAMPLING_PERCENTAGE=10
TRACEABILITY_SAMPLING_PER_API=false
TRACEABILITY_SAMPLING_ONLYERRORS=true
```

If the agent receives 100 transactions, evenly between two APIs, the first 10 (five from each API) with error status will be sent to Amplify Analytics.

#### 10% of events per API ID

The following is a sample value that is added to `ta_env_vars.env`, which will send 10% of the gateway transactions to Amplify Analytics.

```shell
TRACEABILITY_SAMPLING_PERCENTAGE=10
TRACEABILITY_SAMPLING_PER_API=true
```

If the agent receives 100 transactions, evenly between two APIs, only 10 (five from each API) will be sent to Amplify Analytics.

{{< alert title="Note" color="primary" >}}It is recommended that you use the Business Insights API Health screen to identify the APIs that have status errors. Then view the API details with the tools provided by your API Gateway vendor.{{< /alert >}}

For details on how to configure and view API Traffic Insights on the Axway API Management Gateway, see:

* [Amplify Analytics Operational Insights](https://docs.axway.com/bundle/axway-open-docs/page/docs/operational_insights/index.html)
* [Configure API Gateway Analytics](https://docs.axway.com/bundle/axway-open-docs/page/docs/apimanager_analytics/index.html).
