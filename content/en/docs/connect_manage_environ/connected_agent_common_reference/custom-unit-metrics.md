---
title: Reporting custom unit usage
linkTitle: Reporting custom unit usage
draft: false
weight: 10
---
The Marketplace allows the creation and tracking of custom units, which can also be tied to a Product Plan Quota. To enable tracking and associate custom units with the appropriate quotas, the Discovery and Traceability agents have been enhanced to connect to a custom metric reporting service. This guide will help you implement and configure this functionality.

{{< alert title="Note" color="primary" >}}
This feature requires agents built with SDK version 1.1.104 or later.
{{< /alert >}}

## Before you start

1. **Understand Protocol Buffers**: Review the [Protocol Buffers](https://protobuf.dev/) to familiarize yourself with this serialization format.
2. **Check Agent Compatibility**: Ensure the agent you are using supports custom unit handling.

## Objectives

By the end of this guide, you will be able to:

1. Create a sample custom unit metric service using [Go](https://go.dev/)
2. Configure your Discovery and Traceability agents to connect to the custom metric service.

## Step1: Create a custom unit metric service

Custom metric service allows you to report and manage custom unit usage. Custom unit metric services can be implemented in any supported language. This guide uses [Go](https://go.dev/) as an example.

Access the Protocol Buffer File

You can find the Protocol Buffer file in the Agent SDK repository [here](https://github.com/Axway/agent-sdk/tree/main/proto/customunits).
It includes two RPC services and the associated message structures.

### Quota Enforcement service

The **Quota Enforcement service** works with Discovery Agents to manage quota-related events.

**Workflow**:

1. **Trigger Event**: When an AccessRequest resource event occurs, the Discovery Agent calls the Quota Enforcement service.
2. **Information Passed**: The service receives details about each application and API combination, as well as the quota associated with the custom units.
3. **Handle or Ignore**:
    * If the event does not need to be processed, the service replies with an empty response.
    * If processing is required, handle the event and reply with either an empty response (success) or an error message (failure)
4. **Communicate response to Marketplace**: The Discovery AGent relays the response to Marketplace.

**Example: Handling Quota Info**:

In this example, the metric service process the `quotaInfo` message

* it checks for quota data in the message
* the service performs necessary operations and stores related Applications and API IDs, the ones which relate to the gateway the agent connects to.
* These IDs will later be used for reporting metric usageExample: Handling Quota Info
In this example, the metric service processess the quotaInfo message

it checks for quota data in the message
the service performs necessary operations and stores related Applications and API IDs, the ones which relate to the gateway the agent connects to.
These IDs will later be used for [reporting metric usage](#metric-reporting-service).

```go
package services

import (
    "context"

    "github.com/Axway/agent-sdk/pkg/amplify/agent/cßustomunits"
    "github.com/sirupsen/logrus"
)

// a store to keep track of api and app relationships 
type storeAdd interface {
    Add(apiID, appID string)
}

type QuotaEnforcementServiceOption func(*quotaEnforcementServiceServer)

type quotaEnforcementServiceServer struct {
    customunits.UnimplementedQuotaEnforcementServer
    logger *logrus.Entry
    store  storeAdd
}

func NewQuotaEnforcementServiceServer(store storeAdd) customunits.QuotaEnforcementServer {
    return &quotaEnforcementServiceServer{
        logger: logrus.New().WithField("package", "services").WithField("component", "quotaEnforcement"),
        store:  store,
    }
}

func (s *quotaEnforcementServiceServer) QuotaEnforcementInfo(ctx context.Context, quotaInfo *customunits.QuotaInfo) (*customunits.QuotaEnforcementResponse, error) {
    apiID := quotaInfo.ApiInfo.ExternalAPIID
    appID := quotaInfo.AppInfo.ExternalAppID
    unit := quotaInfo.Quota.Unit
    count := quotaInfo.Quota.Count
    logger := s.logger.WithField("apiID", apiID).WithField("appID", appID)
    if unit != "" {
        logger = logger.WithField("unit", unit).WithField("unitCount", count)
        logger.Info("handling quota enforcement")
        // Code to be implemented here.
    }
    logger.Info("adding app and api relationship to store")
    s.store.Add(apiID, appID)
    // if error
    // &customunits.QuotaEnforcementResponse{Error: "provisioning failed"}, nil
    return &customunits.QuotaEnforcementResponse{}, nil
}
```

### Metric Reporting service

The **MetricReporting** service is used by **Traceability Agents** to send custom metric usage reports.

**Key Points**:

* Upon startup, the Traceability Agent establishes a persistent connection to each connected service.
* Metric usage reports are sent via this connection as needed.
* The agent caches received reports and includes them in its periodic metric reporting cycle.
* If the connection is lost, the agent retries until the connection is restored.

**Example: Reports metrics events**:

In the following sample the metric service receives a connection from the agent and sends reports back.

```go
package services

import (
    "time"

    "github.com/Axway/agent-sdk/pkg/amplify/agent/customunits"
    "github.com/sirupsen/logrus"
)

const MetricReportingServiceNotImplemented = "Metric Reporting Service is not implemented"

type data struct {
    reportID string
    apiID    string
    appID    string
    unit     string
    count    int
}

type MetricReportingServiceOption func(*metricReportingServiceServer)

type metricReportingServiceServer struct {
    customunits.UnimplementedMetricReportingServiceServer
    logger *logrus.Entry
    store  quotaGet
}

func NewMetricReportingServiceServer(store quotaGet) customunits.MetricReportingServiceServer {
    return &metricReportingServiceServer{
        logger: logrus.New().WithField("package", "services").WithField("component", "metricReporter"),
        store:  store,
    }
}

func (s *metricReportingServiceServer) MetricReporting(metricServiceInit *customunits.MetricServiceInit, server customunits.MetricReportingService_MetricReportingServer) error {
    s.logger.Info("connection started")
    defer s.logger.Info("connection ended")
    for {
        // code to handle gathering metric data
        metricData := s.getMetricData()
        for _, data := range metricData {
            report := s.createMetricReport(data)
            err := server.Send(report)
            if err != nil {
                logger.WithError(err).Error("sending report")
                continue // try sending the others
            }
            logger.Debug("sent report")
        }
        // sleep a minute before generating more reports
        time.Sleep(1 * time.Minute)
    }
}

func (s *metricReportingServiceServer) getMetricData() []data {
    // custom code for gathering metric usage data containing app, api, unit, and counts
    return []data{}
}

func (s *metricReportingServiceServer) createMetricReport(report data) *customunits.MetricReport {
    if report.apiID == "" {
        // can't send report with api data 
        return nil
    }
    logger := p.logger.WithField("externalAPIID", report.apiID).
        WithField("externalAppID", report.appID).
        WithField("count", report.count).
        WithField("unit", report.unit)
    logger.Info("creating metric report")

    return &customunits.MetricReport{
        ApiService: &customunits.APIServiceLookup{
            Type:  customunits.APIServiceLookupType_ExternalAPIID,
            Value: apiID,
        },
        ManagedApp: &customunits.AppLookup{
            Type:  customunits.AppLookupType_ExternalAppID,
            Value: appID,
        },
        PlanUnit: &customunits.UnitLookup{
            UnitName: unit,
        },
        Count: count,
    }
}
```

## Step 2: Setup the agent configuration

Both Discovery and Traceability agents require configuration to connect to the custom metric service.

**Configuration Example**:

Assume the metric service is hosted on the same machine as the agents (localhost) and listens on port 50011. Add the following environment variables to the agent's configuration:

```shell
AGENTFEATURES_METRICSERVICES_ENABLE_1=true
AGENTFEATURES_METRICSERVICES_URL_1=localhost:50011
```

## Summary

You have now:

* Created a custom unit metric service to manage quotas and track usage.
* Configured Discovery and Traceability agents to connect to the service.
With these steps completed, your agents can enforce quotas for custom units and report usage effectively.