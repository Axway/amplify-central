---
title: Use Custom Units with Discovery and Traceability Agents
linkTitle: Use Custom Units with Discovery and Traceability Agents
draft: false
weight: 10
---
Marketplace has the ability to create and track usage of custom units. These custom units may also be used in a product plan quota. To enable the tracking of the usage and associating it to a proper quota, the Discovery and Traceability agents have been enhanced to connect to a custom metric reporting service that may be implemented to provide this information.

{{< alert title="Note" color="primary" >}}
This functionality requires agents that have been built with SDK version 1.1.104 or newer.
{{< /alert >}}

## Before you start

* Familiarize yourself with [Protocol Buffers](https://protobuf.dev/)
* Validate that the specific agent you want to use supports the handling of custom units

## Objectives

* Create a sample custom unit metric service using [Go](https://go.dev/)
* Set up your agent configuration, Discovery and Traceability, to reach out to your new service

## Creating a custom unit metric service

The following examples will show the custom unit metric service developed in [Go](https://go.dev/). The use of Go is not required, as the Protocol Buffer file can be used for any of the languages the site supports.

The protobuf file can be found within the Agent SDK repo [here](https://github.com/Axway/agent-sdk/tree/main/proto/customunits). Within the protobuf file you will find 2 RPC services as well as the messages that support them.

### Quota Enforcement service

The QuotaEnforcement service is used by Discovery Agents. Upon receiving an AccessRequest resource event, the Discovery Agent will make a call to this service. This will provide the metric service information about each application and API combination as well as any quota that is set for custom units as part of this access request.

The RPC will be called for every access request event the Discovery Agent receives. If the metric service does not need to handle the event, it may simply reply with an empty response. If the metric service does need to handle the event, it can do so and then send an empty response for success or an error message for a failure. The Discovery Agent will handle communicating that response back to Marketplace.

In the following sample the metric service receives the QuotaInfo message. If within that QuotaInfo message, quota data is provided, the service will handle it as needed. In all cases the service stores the application and API IDs, the ones that relate to the gateway the agent connects to, in order to use that info for [sending metric usage data](#metric-reporting-service).

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

The MetricReporting service is used by Traceability Agents. Upon startup, the agent will connect to each configured service. The connection that is opened will be a persistent stream connection in which the service may send metric usage reports as needed. As the agent receives the reports, it will begin to cache them and on the metric reporting interval, and send the custom metrics usage numbers alongside the transaction metric reports. If a disconnect happens between the service and the agent, the agent will begin a retry loop to reestablish the connection.

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

## Set up the agent configuration

Since this service will be used by both the Discovery and Traceability agents, the following environment variables can be added to the agents configuration. In this example the metric service is on the same machine as the agents, localhost, listening on port 50011. The configuration variables may be replicated for as many services as needed, incrementing the index.

```shell
AGENTFEATURES_METRICSERVICES_ENABLE_1=true
AGENTFEATURES_METRICSERVICES_URL_1=localhost:50011
```
