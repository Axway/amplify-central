---
title: Traceability for AgentCore gateways
linkTitle: Traceability - AgentCore
draft: false
weight: 56
---
The Traceability Agent turns Bedrock AgentCore gateway activity into the usage metrics shown in Amplify Business Insights. In `agentcore-gateway` mode it reads each gateway's CloudWatch application logs to produce per-gateway usage metrics, and can optionally use CloudTrail to attribute that usage to the consuming application.

## Before you start

* AgentCore mode must be configured. See [AgentCore mode configuration](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-1/#agentcore-mode-configuration).
* Application logging must be enabled on each gateway you want metrics for. See [Enable gateway logging](#enable-gateway-logging).
* The agent's IAM policy must include the [AgentCore traceability permissions](/docs/connect_manage_environ/connect_aws_gateway/embedded-aws-agent-setup/#traceability-policy).

## Objectives

Learn which traceability modes are available for AgentCore gateways, what each mode requires, and how to configure gateway logging and, optionally, CloudTrail-based consumer attribution.

## Traceability modes

The Traceability Agent supports two modes for AgentCore gateways, selected by the `AWS_AGENTCORE_CLOUDTRAILENABLED` variable:

| Mode | How it works | Consumer attribution | Additional AWS cost |
| --- | --- | --- | --- |
| **CloudWatch only** (default) | The agent reads each gateway's CloudWatch application logs and publishes per-gateway usage metrics: invocation count, status (success or exception), and response time. | No — metrics are reported at the gateway (API) level, not per consuming application. | None beyond the gateway's own CloudWatch logs. |
| **CloudWatch + CloudTrail** (`AWS_AGENTCORE_CLOUDTRAILENABLED=true`) | In addition to the above, the agent reads Bedrock AgentCore `InvokeGateway` data events from a CloudTrail S3 bucket to recover the caller identity, then attributes the matching CloudWatch metrics to the consuming application. | Yes — for gateways secured with Cognito (`CUSTOM_JWT`), usage is attributed to the subscribing application. | Extra cost for CloudTrail data events and the S3 bucket that stores them. |

{{< alert title="Note" color="primary" >}}CloudTrail delivers data events to S3 with a delay (typically around five minutes), so attributed metrics for Cognito gateways appear a few minutes after the activity. The unattributed CloudWatch metrics are near real time.{{< /alert >}}

Attribution reuses the credential the Provisioning Agent creates for each subscription: the CloudTrail caller id (the Cognito app client id) is matched to that credential, which links to the consuming managed application. Gateways that are not Cognito-secured (for example `AWS_IAM` or `NONE`) are always metered through the CloudWatch-only path, even when CloudTrail is enabled.

{{< alert title="What is counted" color="primary" >}}Usage is measured from the gateway's MCP application logs. **Currently every MCP method is counted** — the `initialize` handshake and the `tools/list` discovery call as well as the `tools/call` tool invocations that represent actual usage. Restricting the count to `tools/call` only is planned; until then, expect the reported counts to include this protocol overhead.{{< /alert >}}

## Enable gateway logging

Metrics are produced only for gateways that emit application logs to CloudWatch. AgentCore delivers these to log groups under the prefix set by `AWS_AGENTCORE_LOGGROUPPREFIX` (default `/aws/vendedlogs/bedrock-agentcore/gateway/APPLICATION_LOGS`), one log group per gateway:

```
/aws/vendedlogs/bedrock-agentcore/gateway/APPLICATION_LOGS/<gateway-id>
```

Enable logging on each Bedrock AgentCore gateway you want to govern, using the AgentCore console or API when you create or update the gateway. A gateway with logging disabled is still discovered, but produces no traceability metrics.

A gateway can deliver its application logs to more than one log group. The Traceability Agent reads **only** the log group under the configured prefix — `AWS_AGENTCORE_LOGGROUPPREFIX`, default `/aws/vendedlogs/bedrock-agentcore/gateway/APPLICATION_LOGS/<gateway-id>`. Any other log groups you add for your own purposes are ignored by the agent, so make sure this default one exists and is receiving logs.

### Required log fields

The agent parses each log record for a fixed set of fields, so the delivery configured for the default log group must include at least the following. If any of these is omitted, metrics for that gateway are incomplete or absent:

| Field | Why it is required |
| --- | --- |
| `request_id` | Groups the log records that belong to a single invocation, and is the join key to the CloudTrail event used for consumer attribution. |
| `event_timestamp` | Provides the invocation time and the response time (derived from the earliest and latest records of the invocation). |
| `body` | Carries `isError` (mapped to success `200` / exception `500`) and `requestBody` — from which the **target name** (`{target}___{tool}`) and the MCP method are read. |

Other fields (for example `gateway_id`, `trace_id`, `span_id`, or severity) are not required — the gateway is already identified by the log-group name.

{{< alert title="Note" color="primary" >}}Configuring vended-log delivery is an administrative action that requires log-delivery permissions (`logs:CreateLogDelivery`, `logs:PutResourcePolicy`, and related). These are separate from the agent's runtime permissions.{{< /alert >}}

## Environment variables

Set these on the Traceability Agent, in addition to `AWS_GATEWAYMODE=agentcore-gateway`:

| Variable | Description |
| --- | --- |
| AWS_AGENTCORE_LOGGROUPPREFIX | CloudWatch log group prefix for AgentCore gateway application logs. Default is `/aws/vendedlogs/bedrock-agentcore/gateway/APPLICATION_LOGS`. |
| AWS_AGENTCORE_CLOUDTRAILENABLED | When `true`, enables CloudTrail-based consumer attribution for Cognito gateways. Default is `false`. |
| AWS_AGENTCORE_CLOUDTRAILBUCKET | Name of the S3 bucket that stores the CloudTrail data-event logs. Required when `AWS_AGENTCORE_CLOUDTRAILENABLED=true`. |

## Configure CloudTrail and S3 for attribution

These steps are required only for the CloudWatch + CloudTrail mode.

1. **Create or reuse a CloudTrail trail** that delivers to an S3 bucket in the same account and region as the gateways.
2. **Enable Bedrock AgentCore Gateway data events.** In the trail's data-event configuration, add the Bedrock AgentCore Gateway resource type and ensure the `InvokeGateway` activity is logged. Management events are not required for attribution.
3. **Set the bucket name** as `AWS_AGENTCORE_CLOUDTRAILBUCKET`. The agent derives the object prefix automatically from the account and region: `AWSLogs/<account-id>/CloudTrail/<region>/<YYYY>/<MM>/<DD>/`.
4. **Grant the agent read access** to the bucket. See [AgentCore traceability permissions](/docs/connect_manage_environ/connect_aws_gateway/embedded-aws-agent-setup/#traceability-policy).

## Required permissions

See [AgentCore traceability permissions](/docs/connect_manage_environ/connect_aws_gateway/embedded-aws-agent-setup/#traceability-policy) for the full IAM policy. In summary:

* **CloudWatch only:** `logs:FilterLogEvents` on the AgentCore application-log groups.
* **CloudWatch + CloudTrail:** additionally `s3:ListBucket` and `s3:GetObject` on the CloudTrail bucket.

## Related topics

* [AgentCore traceability permissions](/docs/connect_manage_environ/connect_aws_gateway/embedded-aws-agent-setup/#traceability-policy)
* [Credential provisioning for AgentCore gateways](/docs/connect_manage_environ/connect_aws_gateway/credential-provisioning-agentcore/)
* [AgentCore mode configuration](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-1/#agentcore-mode-configuration)
