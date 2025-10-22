---
title: Trace sampling
linkTitle: Trace sampling
draft: false
weight: 10
---

The Traceability Agent can temporarily sample API transaction traffic and send it to Amplify Analytics for troubleshooting and investigation.
Sampling must be requested on demand, and it runs only for a defined duration.

{{< alert title="Note" color="primary" >}}If you are using a Traceability Agent version that supports percentage-based sampling, see [Archived trace sampling](/docs/connect_manage_environ/connected_agent_common_reference/archive/trace_sampling).{{< /alert >}}

## When to use sampling

Before requesting sampling, use Business Insights → API Health to identify APIs with errors.
Then, use sampling to capture the traffic that helps you troubleshoot the problem. There are 2 supported mechanisms for sampling:

| Type           | Scope                                  | Triggered From       | Duration       | Notes                      |
| -------------- | -------------------------------------- | -------------------- | -------------- | -------------------------- |
| Agent sampling | All API traffic across the environment | Traceability Agent   | 0–300 seconds  | Up to 100 transactions/min |
| API Sampling   | Traffic for a specific API             | API Service Instance | 0–3600 seconds | Up to 5 APIs per agent     |

## Agent Sampling (all API traffic)

Agent sampling enables transaction capture (successess and errors) for all APIs associated with a Traceability Agent.
The agent must have passed its 30-minute cool-down since the last sampling session before you can trigger a new one.

### Start Agent Sampling via the UI

1. Go to Agents List in Amplify Engage.
2. Locate the Traceability Agent you want to sample.
3. Click the Traceability Sampling icon.
4. Enable sampling and select a duration (0–300 seconds). Click Save.

The agent will now capture traffic for the requested duration (subject to cool-down limits).

### Start Agent Sampling via the CLI

1. Login
   ```
   axway auth login
   ```

2. Retrieve the Traceability Agent you would like transactional data from
   ```
   axway central get -o yaml -s [Environment Name] traceabilityagent [Agent Name] > resource.yaml
   ```

3. Edit resource.yaml and add:
   ```
   sampletrigger:
    requested: true
    duration: 60
   ```

4. Then apply it:
   ```
   axway central apply -f resource.yam
   ```

The agent will now sample for 60 seconds.

## Sampling a Specific API (API Sampling)

API sampling captures traffic for only a specific API, rather than all APIs in the environment.

You can sample up to 5 APIs per Traceability Agent at the same time.

Requesting API sampling does not automatically start agent sampling.
You must trigger agent sampling separately if you want traffic to be collected.

Start API Sampling via the UI

Go to Environment List and select an environment.

Locate the API you want to sample.

Open the Endpoints tab.

Click the API Sampling icon.

Enable sampling and select a duration (0–3600 seconds).

Click Save.

The API is now configured for sampling for the selected duration.

Start API Sampling via the CLI
# 1. Login
axway auth login

# 2. Export the API Service Instance
axway central get -o yaml -s [Environment Name] apisi [API Service Instance Name] > resource.yaml


Edit resource.yaml and add:

sampletrigger:
  requested: true
  onlyErrors: true  # Set to false to sample all transactions
  duration: 3600


Apply the change:

axway central apply -f resource.yaml


The API will now be sampled for up to 3600 seconds (1 hour).

Where to View Sampled Traffic

Once sampling is active, you can view the captured traffic through:

Amplify Analytics Operational Insights (for traffic and error metrics)

API Gateway analytics views (for debugging at gateway level)

For configuration guidance, see:

Configure API Gateway Analytics

Amplify Analytics Operational Insights
