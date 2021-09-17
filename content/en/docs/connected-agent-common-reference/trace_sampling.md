---
title: Trace sampling
linkTitle: Trace sampling
draft: false
weight: 10
description: Understand how the Traceability Agent can sample the transaction
  information that is sent to Amplify Central.  Learn how you can control the
  sampling by using the sampling configuration.
---
## Objectives

Learn how to set up sampling rules used to send only certain transactions to Amplify Central. With the agent default configuration, all transactions are sent to Amplify Central.

## Sampling

Sampling adds the ability to control the amount of transaction data that is sent to Amplify Central.

### Settings

The following settings can be used to control the sampling.  A percentage can be set to control the number of transactions that are sent, and a switch can be set to determine how that percentage is applied.

#### Percentage

The `TRACEABILITY_SAMPLING_PERCENTAGE` variable, defaulted to `100`, may be set to any value between 0 and 100.  

* A value of `0` results in no transactions sent to Amplify Central
* A value of `100` results in all transactions sent to Amplify Central

The agent uses a counter to apply the sampling. When a value (other than 0 and 100) is set, the agent will send all transactions up to that value and then not send any until it reaches 100.  Therefore, this percentage results in the first x of each 100 transactions being sampled.

#### Per API

The `TRACEABILITY_SAMPLING_PER_API` variable, defaulted to `true`, may be changed to determine how the percentage variable is applied.

* A value of `true` means that the percentage is applied to each API ID within the transaction. In this case, regardless of usage, all APIs will have transaction representation in API Observer.
* A value of `false` means that the percentage is applied globally to all APIs. In this case, APIs with lower utilization may never be seen in API Observer, as the sampling is always the first x of each 100 transactions.

#### Report All Errors

The `TRACEABILITY_SAMPLING_REPORTALLERRORS` variable, defaulted to `true`, may be changed to send all error transaction events to Condor.

* A value of `true` means that all transaction events with a transaction status of *Failure* are sent to Condor and may be seen in API Observer, regardless of the sampling percentage.
* A value of `false` means that transaction events with a transaction status of *Failure* will follow the sampling percentage and may or may not not be seen in API Observer, as the sampling is always the first x of each 100 transactions.

### Preparing Traceability Agent

The Traceability Agent may be configured to sample fewer than all events.

#### No events

The following is a sample value that is added to `ta_env_vars.env`, which will send no gateway transactions to Amplify Central.

```shell
TRACEABILITY_SAMPLING_PERCENTAGE=0
```

#### 50% of all events, regardless of API

The following is a sample value that is added to `ta_env_vars.env`, which will send 50% of the gateway transactions to Amplify Central.

```shell
TRACEABILITY_SAMPLING_PERCENTAGE=50
TRACEABILITY_SAMPLING_PER_API=false
```

If the agent receives 100 transactions, evenly between 2 APIs, only the first 50 will be sent to Amplify Central.

#### 50% of events per API ID

The following is a sample value that is added to `ta_env_vars.env`, which will send 50% of the gateway transactions to Amplify Central.

```shell
TRACEABILITY_SAMPLING_PERCENTAGE=50
TRACEABILITY_SAMPLING_PER_API=true
```

If the agent receives 100 transactions, evenly between 2 APIs, only 50 (25 from each API) will be sent to Amplify Central.
