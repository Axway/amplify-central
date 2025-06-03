---
title: Trace sampling
linkTitle: Trace sampling
draft: false
weight: 10
---
{{< alert title="Note" color="primary" >}}If you are using a Traceability Agent version that supports percentage-based sampling, see [Archived trace sampling](/docs/connect_manage_environ/connected_agent_common_reference/archive/trace_sampling).{{< /alert >}}

The Traceability Agent can sample the transaction information that is sent to Amplify Analytics. Learn how to request a sampling period, the restrictions of the sampling period, and the rules used by the agent when sending those transactions.

{{< alert title="Note" color="primary" >}}It is recommended that you use the Business Insights API Health screen to identify the APIs that have status errors. Then view the API details with the tools provided by your API Gateway vendor.{{< /alert >}}

## Sampling

Sampling grants the agent the ability to send transaction information of API Traffic to Amplify Analytics.

When requesting a sampling period the user will also request a time frame, 0-300 seconds (five minutes). Given that the agent has surpassed its cool down period (30 minutes) since the last sampling ended, the agent sampling will be enabled. The agent will begin to send transactions as they come through, but still be limited to a maximum of 100 transactions a minute.

{{< alert title="Note" color="primary" >}}The max sampling time and transactions per minute limit may be changed in future updates to Amplify Engage.{{< /alert >}}

{{< alert title="Note" color="primary" >}}The agent will only sample the APIs which were configured for sampling. This ensures that only relevant API traffic is analyzed, reducing unnecessary data processing. For details on how to configure APIs for sampling, see [Trace API sampling](/docs/connect_manage_environ/connected_agent_common_reference/trace_api_sampling).{{< /alert >}}

### Requesting the Traceability Agent to sample

The Traceability Agent, if listed as [supporting sampling](/docs/connect_manage_environ#on-premise-Agent-Features), is already configured. The only other step is to request the sampling to begin using the Amplify Engage UI or CLI.

{{< alert title="Note" color="primary" >}}The duration field below does not apply to SaaS agents. When enabled, the SaaS agent will immediately run and send transactional data for that execution only.{{< /alert >}}

#### Request via the UI

1. Navigate to the *Agents List* page in Amplify Engage.
2. Find a Traceability Agent you would like transactional data from.
3. Click the **Traceability Sampling** icon.
4. Click in the menu to enable sampling. Select a duration, and click **Save**.

Your selected agent should now sample transactions for the duration selected.
  
#### Request via the CLI

* Log in using the Amplify CLI:

```shell
axway auth login
```

* Retrieve the Traceability Agent you would like transactional data from:
  
```shell
axway central get -o yaml -s [Environment Name] traceabilityagent [Traceability Agent Name] > resource.yaml
```

* Within the `resource.yaml` file, add:
  
```yaml
sampletrigger:
  requested: true
  duration: 60
```

* Update the Traceability Agent using the `resource.yaml` file:

```shell
axway central apply -f resource.yaml
```

Your selected agent should now sample transactions for 60 seconds.

For details on how to configure and view API Traffic Insights on the Axway API Management Gateway, see:

* [Amplify Analytics Operational Insights](https://docs.axway.com/bundle/axway-open-docs/page/docs/operational_insights/index.html)
* [Configure API Gateway Analytics](https://docs.axway.com/bundle/axway-open-docs/page/docs/apimanager_analytics/index.html).
