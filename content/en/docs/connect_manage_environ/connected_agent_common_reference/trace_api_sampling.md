---
title: Trace API sampling
linkTitle: Trace API sampling
draft: false
weight: 10
---

The Traceability Agent can sample the transaction information for individual APIs that is sent to Amplify Analytics.

## API sampling

Sampling grants the agent the ability to send transaction information for specific APIs to Amplify Analytics.

When requesting sampling for an API the user will also request a time frame, 0-3600 seconds(1 hour). Given that the selected API has surpassed its cool down period (30 minutes) since the last sampling for the selected API has ended, the API sampling will be enabled. The agent will begin to send transactions as they come through, but still be limited to a maximum of 100 transactions a minute.

{{< alert title="Note" color="primary" >}}The max sampling time and transactions per minute limit may be changed in future updates to Amplify Engage.{{< /alert >}}

### Requesting sampling for an individual API

The Traceability Agent, if listed as [supporting sampling](/docs/connect_manage_environ#on-premise-Agent-Features), is already configured. The only other step is to request sampling for an individual API. This would add the endpoints of the API Service Instance to all the Traceability Agents from the environment. The maximum number of APIs that can be sampled at one time, per Traceability Agent, is 5. Note that requesting sampling for an API will not trigger sampling for the Traceability Agents themselves, this would have to be done separately.

#### Request via the UI

1. Navigate to the *Environment List* page in Amplify Engage.
2. Select the environment you want to sample APIs in.
3. Find the API you would like to sample.
4. Go to the **Endpoints** tab.
5. Click the **API Sampling** icon.
6. Click in the menu to enable sampling. Select a duration, and click **Save**.

Your selected API should now be enabled for sampling for the duration selected.
  
#### Request via the CLI

* Log in using the Amplify CLI:

```shell
axway auth login
```

* Retrieve the API Service Instance you would like transactional data from:
  
```shell
axway central get -o yaml -s [Environment Name] apisi [API Service Instance Name] > resource.yaml
```

* Within the `resource.yaml` file, add:
  
```yaml
sampletrigger:
  requested: true
  onlyErrors: true # Set to true to sample only error transactions; set to false to sample all transactions.
  duration: 3600
```

* Update the API Service Instance using the `resource.yaml` file:

```shell
axway central apply -f resource.yaml
```

Your selected API should now have sampling enabled for the duration selected.

For details on how to configure and view API Traffic Insights on the Axway API Management Gateway, see:

* [Amplify Analytics Operational Insights](https://docs.axway.com/bundle/axway-open-docs/page/docs/operational_insights/index.html)
* [Configure API Gateway Analytics](https://docs.axway.com/bundle/axway-open-docs/page/docs/apimanager_analytics/index.html).
