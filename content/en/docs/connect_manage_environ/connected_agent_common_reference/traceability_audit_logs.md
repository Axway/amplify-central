---
title: Understand the Traceability Agent audit logs
linkTitle: Traceability Agent audit logs
draft: false
weight: 10
---
The Traceability Agent has the ability to keep audit logs for tracking information about what the agent has processed.  The following requires agents with Agent SDK v1.1.80 or later.

## Objectives

Learn how to configure, access, and read the Traceability agent audit logs.

* Configure - learn about the configuration options for the audit logs
* Access - learn how to start the agent to mount the logs directory
* Understand - learn how to read the audit logs the agent produces

## Configure

In all traceability agents, the metric audit log is turned on by default it is used to track all metric events that the agent has generated and the status of that event as known to the agent. The following tables lists the environment variables available to configure the metric audit logs.

| Environment Variable            | Description                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| LOG_METRICFILE_ENABLED          | Enable or disable the metric audit log (default: `true`)                            |
| LOG_METRICFILE_NAME             | The name of the metric log file that will be created (default: `metric.log`)        |
| LOG_METRICFILE_KEEPFILES        | The maximum number of metric audit log files to keep (default: `7`)                 |
| LOG_METRICFILE_ROTATEEVERYBYTES | The maximum size (megabytes) a metric audit log can grow to (default: `10485760`) |
| LOG_METRICFILE_CLEANBACKUPS     | The max age of a metric audit log backup file, in days (default: `0` unlimited)     |

With the default settings, the traceability agent will keep, at most, `7` files each a total of `10485760` megabytes.

### Additional Axway API Manager Traceability agent audit log

The Traceability agent that connects to Axway API Manager includes an additional transaction audit log to track the correlation IDs of each transaction the agent has seen and recorded. Here are the environment variables available to configure the transaction audit logs.

| Environment Variable             | Description                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| LOG_TRANSACTION_ENABLED          | Enable or disable the transaction audit log (default: `true`)                            |
| LOG_TRANSACTION_NAME             | The name of the transaction log file that will be created (default: `transaction.log`)   |
| LOG_TRANSACTION_KEEPFILES        | The maximum number of transaction audit log files to keep (default: `7`)                 |
| LOG_TRANSACTION_ROTATEEVERYBYTES | The maximum size, (megabytes) a transaction audit log can grow to (default: `10485760`) |
| LOG_TRANSACTION_CLEANBACKUPS     | The max age of a transaction audit log backup file, in days (default: `0` unlimited)     |

## Access

All audit logs will be created within an `audit` directory directly underneath the `LOG_FILE_PATH` path.

### Binary

The audit logs will be within an `audit` directory found in the logs directory.

### Docker agents

For all docker agents, a new volume has been added. Which, when mounted, will save the log directory outside of the container. All that is needed is to supply a volume argument to the start command `-v /path/outside/container:/logs`.

### Helm agents

For agents that a helm chart is supplied, Axway API Manager Traceability agent, a new Persistent Volume Claim is created with the helm chart which will be used for the logs directory.

## Understand

The audit logs are an additional set of logs that can be read to ensure proper agent functionality and used to reconcile issues that may occur.

### Metric audit log

The metric audit log is used to track the metric events the agent has created based off traffic through the gateway. This log file will generate 1..n lines for each metric event to help track the progress of that metric.

The first line for each metric event is the `generated` line. This line gives all the pertinent information about a particular metric event, including the `id`. The `id` field is important to note as the follow up log lines will not include details about the metric event, only its id and a message about its state.

```bash
{"apiID":"remoteApiId_store","avgResponse":8,"count":1,"endTimestamp":1713556832244,"id":"47293432-7f9a-4f12-ba67-2338be048cb0","level":"info","maxResponse":8,"message":"generated","minResponse":8,"startTimestamp":1713556375134,"status":"403","time":"2024-04-19T20:00:32Z"}
```

After an event is `generated` the following types of events may be seen, giving information about the state of that metric event.

For instance in a good path situation the audit log will have the following.

```bash
{"id":"47293432-7f9a-4f12-ba67-2338be048cb0","level":"info","message":"publishing","time":"2024-04-19T20:00:32Z"}
{"id":"47293432-7f9a-4f12-ba67-2338be048cb0","level":"info","message":"published","time":"2024-04-19T20:00:32Z"}
```

But it is also possible that an event may encounter an error causing the metric event to be cancelled. In these cases the metric counts are not removed from the system, however any new transactions for that metric event that come in will be added on top of the previous event. This will be seen by a new `generated` event for the same `id` with an increasing count.

```bash
{"apiID":"remoteApiId_44dc9d85-c1d8-465f-a7ff-88cb9a631f6e","avgResponse":1318,"count":40,"endTimestamp":1712933224025,"id":"ea2be3b3-5931-47b2-b5eb-851036b9b9f0","level":"info","maxResponse":1318,"message":"generated","minResponse":1318,"startTimestamp":1712932910655,"status":"200","time":"2024-04-12T07:47:04-07:00"}
{"id":"ea2be3b3-5931-47b2-b5eb-851036b9b9f0","level":"info","message":"publishing","time":"2024-04-12T07:47:35-07:00"}
{"id":"ea2be3b3-5931-47b2-b5eb-851036b9b9f0","level":"info","message":"event cancelled, counts added at next publish","time":"2024-04-12T07:47:35-07:00"}
{"apiID":"remoteApiId_44dc9d85-c1d8-465f-a7ff-88cb9a631f6e","avgResponse":1318,"count":100,"endTimestamp":1712933652207,"id":"ea2be3b3-5931-47b2-b5eb-851036b9b9f0","level":"info","maxResponse":1318,"message":"generated","minResponse":1318,"startTimestamp":1712932910655,"status":"200","time":"2024-04-12T07:54:12-07:00"}
{"id":"ea2be3b3-5931-47b2-b5eb-851036b9b9f0","level":"info","message":"publishing","time":"2024-04-12T07:54:24-07:00"}
{"id":"ea2be3b3-5931-47b2-b5eb-851036b9b9f0","level":"info","message":"published","time":"2024-04-12T07:54:25-07:00"}
```

As can be seen above, all lines contain the same `id`, new `generated` events take precedence over any previous events. These are the events that will be reflected in Amplify.

In rare cases, such as an agent restart at the time of event generation and publishing, a `generating` log but no additional logs may be seen. In these cases the metric event was not lost, but rather included in the followup event. Compare with the agent logs at the same time to check for errors or restarts.

The audit log in these cases would look like the following.

```bash
{"apiID":"remoteApiId_store","avgResponse":6.658536585365853,"count":164,"endTimestamp":1713564740997,"id":"286639d4-af0b-4bd9-8912-71a8cb99dccd","level":"info","maxResponse":9,"message":"generated","minResponse":6,"startTimestamp":1713558936461,"status":"403","time":"2024-04-19T22:12:20Z"}
{"apiID":"remoteApiId_store","avgResponse":6.702265372168285,"count":309,"endTimestamp":1713565867138,"id":"2fc1f178-abb3-4b3f-8edc-41edc6932c70","level":"info","maxResponse":17,"message":"generated","minResponse":6,"startTimestamp":1713558936461,"status":"403","time":"2024-04-19T22:31:07Z"}
{"id":"2fc1f178-abb3-4b3f-8edc-41edc6932c70","level":"info","message":"publishing","time":"2024-04-19T22:31:07Z"}
{"id":"2fc1f178-abb3-4b3f-8edc-41edc6932c70","level":"info","message":"published","time":"2024-04-19T22:31:08Z"}
```

Notice that each metric event is linked to the same api, however other fields have adjusted for new transactions. A field to note is the startTimestamp. In both cases the observation period for the event was at the same time. This is another clue that the metric counts from the first event were sent with the second event.

### Axway API Manager Traceability transaction audit log

The transaction audit log is used to reconcile the transactions the agent has seen in the event log. This can be helpful to find any specific transaction the agent may have missed.  Each new correlation id the agent sees will create a single log entry in the transaction log file.

```bash
{"correlationId":"43682066c6147e926b2a944e","level":"info","message":"recorded","time":"2024-04-18T00:24:37Z"}
```
