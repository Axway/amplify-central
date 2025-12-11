---
title: Trace sampling
linkTitle: Trace sampling
draft: false
weight: 10
---

The Traceability Agent can temporarily sample API transaction traffic and send it to Amplify Engage to include in the API Traffic dashboards in Business Insights and Consumer Insights.

Sampling must be requested on demand, and it runs only for a defined duration.

Before requesting sampling, use *Business Insights > API Health* to identify APIs with errors.
Then, use sampling to capture the traffic that helps you troubleshoot the problem. There are two supported mechanisms for sampling:

| Type           | Scope                                  | Triggered From       | Duration       | Notes                      |
| -------------- | -------------------------------------- | -------------------- | -------------- | -------------------------- |
| Agent sampling | All API traffic across the environment | Traceability Agent   | 1-5 minutes  | Up to 100 transactions/min |
| API sampling   | Traffic for a specific API             | API Service Instance | 1-60 minutes | Up to 5 APIs per agent     |

{{< alert title="Note" color="primary" >}}If you are using a Traceability Agent version that supports percentage-based sampling, see [Archived trace sampling](/docs/connect_manage_environ/connected_agent_common_reference/archive/trace_sampling).{{< /alert >}}

## Agent sampling

Agent sampling enables transaction capture (successes and errors) for all APIs associated with a Traceability Agent.
The agent must have passed its 30-minute cool-down since the last sampling session before you can trigger a new one.

### Start agent sampling via the UI

1. Go to *Topology > Environments > Agents* in Amplify Engage.
2. Locate the Traceability Agent you want to sample.
3. Click the Enable Sampling icon.
4. Toggle on Enable Traceability Sampling and select a duration (1-5 minutes). Click Save.

The agent will now capture traffic for the requested duration (subject to cool-down limits).

### Start agent sampling via the CLI

Login:

```
axway auth login
 ```

Retrieve the Traceability Agent you would like transactional data from:

```
axway central get -o yaml -s [Environment Name] traceabilityagent [Agent Name] > resource.yaml
```

Edit resource.yaml and add:

```
   sampletrigger:
    requested: true
    duration: 5
 ```

Then apply it:

```
axway central apply -f resource.yam
```

The agent will now sample for 5 minutes.

## API Sampling (sampling a specific API)

API sampling captures traffic for only a specific API, rather than all APIs in the environment.

* You can sample up to five APIs per Traceability Agent at the same time.
* Requesting API sampling does not automatically start agent sampling.
* You must trigger agent sampling separately if you want traffic to be collected.

### Start API sampling via the UI

* Go to *Topology > Environments > All Environments* in Amplify Engage and select an environment.
* Locate the API Service you want to sample.
* Open the Endpoints tab.
* Click the Ellipsis menu and select Enable Sampling.
* Toggle on Enable Sampling and select a duration (1-60 minutes). Click Save.

The API is now configured for sampling for the selected duration.

### Start API sampling via the CLI

Login:

```
axway auth login
```

Export the API Service Instance:

```
axway central get -o yaml -s [Environment Name] apisi [API Service Instance Name] > resource.yaml
```

Edit resource.yaml and add:

```
sampletrigger:
  requested: true
  onlyErrors: true  # Set to false to sample all transactions
  duration: 60
```

Apply the change:

```
axway central apply -f resource.yaml
```

The API will now be sampled for up to 60 minutes.

## Always On Error sampling

This feature focuses on sampling errors in a continuous manner without sampling all errors, but the first error for a unique API/App pair. Pairs reset once per hour in order to allow for new errors to be sampled.

### How to enable always on error sampling

Set the Traceability Agent environment variable `CENTRAL_ERRORSAMPLINGENABLED` to `true`. The default is `false`, so error sampling is disabled unless explicitly enabled.

```shell
CENTRAL_ERRORSAMPLINGENABLED=true
```

### Resolve errors

Resolving errors clears the API/App pair from error sampling, allowing for another error for that pair to be sampled without waiting for the error sampling reset (happens every hour).

#### Use CLI to resolve error

1. Login:

```shell
axway auth login
```

2. Retrieve the API Service you want to resolve errors on:

```shell
axway central get apis -s  [Environment Name] -n [API Service Name] -o yaml > resource.yaml
```

3. Edit `resource.yaml` and add the Managed Application reference under `appinfo`:

```yaml
appinfo:
  name: "<Managed Application Name>"
```

Important: `appinfo.name` must be the name of the Managed Application from the Marketplace.

4. Apply the change:

```bash
axway central apply -f resource.yaml
```

### Agents that support always on error sampling

Only V7 Traceability Agent supports always on error sampling for now. More agents will be added in the future.