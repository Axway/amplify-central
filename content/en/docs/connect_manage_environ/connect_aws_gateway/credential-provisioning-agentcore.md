---
title: Credential provisioning for AgentCore gateways
linkTitle: Credential provisioning - AgentCore
draft: false
weight: 55
---
When a consumer subscribes to an API service discovered from an AgentCore gateway, the Provisioning Agent automatically creates and manages credentials in the authorizer service linked to that gateway. The type of credentials depends on the gateway's authorizer configuration.

## Before you start

* AgentCore mode must be configured. See [AgentCore Gateway mode configuration](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-1/#agentcore-gateway-mode-configuration).
* For gateways using CUSTOM_JWT authorization, at least one Cognito User Pool must be configured via `AWS_COGNITO_USERPOOLID_N` and `AWS_COGNITO_REGION_N`.
* The agent's IAM policy must include the [Provisioning permissions](/docs/connect_manage_environ/connect_aws_gateway/embedded-aws-agent-setup/#provisioning-policy).

## Objectives

Learn about the available Credential Request Definitions (CRDs) for AgentCore gateways and how credentials are created and removed for Cognito-secured and IAM-secured gateways.

## Available credential request definitions

The agent assigns a Credential Request Definition (CRD) to each discovered API service based on the gateway's authorizer type:

| Gateway authorizer | CRD name | Notes |
| --- | --- | --- |
| `CUSTOM_JWT` (Cognito issuer) | `cognito-{user-pool-id}` | Assigned when the issuer URL matches a configured Cognito User Pool. The pool ID is normalized to lowercase with underscores replaced by hyphens. For example, pool `eu-west-1_cEL0M3519` produces CRD name `cognito-eu-west-1-cel0m3519`. |
| `AWS_IAM` | `aws-iam` | Assigned only when `AWS_AGENTCORE_IAMAUTHENABLED=true`. The gateway is still discovered and published without a CRD when this flag is `false`. |
| `NONE` | *(none)* | No credentials are required; no CRD is assigned. |

## Cognito credential lifecycle

### On subscription

The Provisioning Agent creates a new app client in the configured Cognito User Pool. The returned `client_id` and `client_secret` are delivered to the consumer. The client ID is also added to the gateway's `allowedClients` list via `bedrock-agentcore:UpdateGateway`.

### On unsubscription

The Provisioning Agent deletes the app client from the Cognito User Pool and removes the client ID from the gateway's `allowedClients` list.

## IAM credential handling

Gateways with `AWS_IAM` authorizer are always discovered and published to Amplify. When `AWS_AGENTCORE_IAMAUTHENABLED=true`, the published service is associated with the `aws-iam` CRD, allowing consumers to request credentials through Amplify. When the flag is `false`, the gateway is published without a CRD — it is visible in Amplify but no managed credential flow is available.

No external credential resources are created in either case. Consumers authenticate using their own AWS credentials with the appropriate IAM permissions to invoke the gateway.

## Related topics

* [AWS IAM policy for AgentCore mode](/docs/connect_manage_environ/connect_aws_gateway/embedded-aws-agent-setup/#aws-iam-policy-for-agentcore-mode)
* [AgentCore Gateway mode configuration](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-1/#agentcore-gateway-mode-configuration)
