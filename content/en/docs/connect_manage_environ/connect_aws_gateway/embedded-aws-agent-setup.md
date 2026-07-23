---
title: Set up AWS for Embedded agents
linkTitle: Set up AWS for Embedded agents
draft: false
weight: 21
---
Setup AWS so an Embedded agent can connect to and managed your AWS API Gateway environment within Amplify.

## Before you start

* You must have access to the AWS console with permissions to create and managed IAM policies, roles, and optionally users

## Objectives

Learn how to quickly setup an AWS Assume Role policy or create Access and Secret keys that the Embedded agent can use to discover and manage AWS API Gateway on your behalf.

## AWS CloudWatch

The Embedded Traceability Agent, as well as AWS API Gateway itself, use the AWS CloudWatch. To enable the agent to retrieve API usages, you must set up the following.

### AWS IAM Role for API Gateway

The role created here is given to AWS API Gateway, allowing it to create and write to CloudWatch log groups.

1. Within the AWS IAM Console, start the *Create role* wizard.
2. On the *Select trusted entity* page:
   * Select **AWS service**.
   * Select **API Gateway** from Use cases for other AWS services.
   * Select the **API Gateway** radio button.
   * Click **Next**.
3. On the *Add permissions* page:
   * Add the *AmazonAPIGatewayPushToCloudWatchLogs* policy if it was not already added.
   * Click **Next**.
4. Give the role a name, such as `APIGWPushToCloudWatch` and click **Create role**. Note this role ARN.
5. Navigate to the *AWS API Gateway Console*.
6. Select any API listed.
7. Select **Settings** at the bottom left.
8. Enter the previously created role ARN and click **Save**.

### AWS CloudWatch Log Group

This CloudWatch Log Group will be used by both agents. Upon discovery of a Rest API stage, the Discovery Agent configures the logging to send details to CloudWatch. The Traceability Agent then watches the CloudWatch for new entries and sends usage, metric, and transactional data to Amplify, where you can access it from Business insights.

1. Within the AWS CloudWatch Console, select **Log groups** on the left and start the *Create log group* wizard.
2. Set the log group name, such as `amplify-agents-access-log`, and retention settings. Note the log group name for use in setting up the AWS IAM policy.
3. Click **Create**.
4. After the window refreshes, select the new log group from the list.
5. The ARN for this log group is located in the *Log group details*. Note this ARN for use in setting up the agents.

## AWS IAM policy

Create an IAM policy that allows the Embedded agent to discover and provision access to your AWS API Gateway resources. This step is required regardless of the authentication type you use.

1. Within the AWS IAM Console, start the *Create policy* wizard.
2. Select the *JSON editor* tab and paste the [AWS IAM policy JSON](#aws-iam-policy-json) policy.
3. Update the policy sample below with your values:
   * &lt;aws-region&gt; becomes us-east-2
   * &lt;aws-account-id&gt;, becomes your AWs account ID
   * &lt;log-group-name&gt;, becomes the log group name from [AWS CloudWatch Log Group](#aws-cloudwatch-log-group)
4. Click **Next: Tags** and add any tags you may want.
5. Click **Next: Review**.
6. Give the policy a name, such as `AmplifyAgentPolicy`.

### AWS IAM policy JSON

#### Discover only

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "apigateway:DELETE",
        "apigateway:PATCH",
        "apigateway:POST",
        "apigateway:PUT",
        "apigateway:GET"
      ],
      "Resource": [
        "arn:aws:apigateway:<aws-region>::*"
      ]
    }
  ]
}
```

#### Discover only, least privilege

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "apigateway:GET",
      "Resource": [
        "arn:aws:apigateway:<aws-region>::/restapis",
        "arn:aws:apigateway:<aws-region>::/restapis/*",
        "arn:aws:apigateway:<aws-region>::/restapis/*/deployments",
        "arn:aws:apigateway:<aws-region>::/restapis/*/deployments/*",
        "arn:aws:apigateway:<aws-region>::/apis",
        "arn:aws:apigateway:<aws-region>::/apis/*",
        "arn:aws:apigateway:<aws-region>::/apis/*/deployments",
        "arn:aws:apigateway:<aws-region>::/apis/*/deployments/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "apigateway:DELETE",
        "apigateway:PATCH",
        "apigateway:POST",
        "apigateway:PUT",
        "apigateway:GET"
      ],
      "Resource": [
        "arn:aws:apigateway:<aws-region>::/apis/*/usageplans",
        "arn:aws:apigateway:<aws-region>::/apis/*/usageplans/*",
        "arn:aws:apigateway:<aws-region>::/apikeys/*",
        "arn:aws:apigateway:<aws-region>::/apikeys",
        "arn:aws:apigateway:<aws-region>::/usageplans",
        "arn:aws:apigateway:<aws-region>::/usageplans/*",
        "arn:aws:apigateway:<aws-region>::/usageplans/*/keys/*",
        "arn:aws:apigateway:<aws-region>::/usageplans/*/keys"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "apigateway:PATCH",
        "apigateway:POST",
        "apigateway:PUT",
        "apigateway:GET"
      ],
      "Resource": [
        "arn:aws:apigateway:<aws-region>::/apis/*/stages/*",
        "arn:aws:apigateway:<aws-region>::/apis/*/stages",
        "arn:aws:apigateway:<aws-region>::/restapis/*/stages",
        "arn:aws:apigateway:<aws-region>::/restapis/*/stages/*"
      ]
    }
  ]
}
```

#### Traceability only

{{< alert title="Note" color="primary" >}}The role that the Embedded agents use will be the same and require both the Traceability and Discovery policies.{{< /alert >}}

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:GetLogEvents",
        "logs:FilterLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:<aws-region>:<aws-account-id>:log-group:<log-group-name>",
        "arn:aws:logs:<aws-region>:<aws-account-id>:log-group:<log-group-name>:log-stream:*",
        "arn:aws:logs:<aws-region>:<aws-account-id>:log-group:API-Gateway-Execution-Logs_*",
        "arn:aws:logs:<aws-region>:<aws-account-id>:log-group:API-Gateway-Execution-Logs_*:log-stream:*"
      ]
    }
  ]
}
```

#### Discovery and Traceability combined policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "apigateway:DELETE",
        "apigateway:PATCH",
        "apigateway:POST",
        "apigateway:PUT",
        "apigateway:GET"
      ],
      "Resource": [
        "arn:aws:apigateway:<aws-region>::*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:GetLogEvents",
        "logs:FilterLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:<aws-region>:<aws-account-id>:log-group:<log-group-name>",
        "arn:aws:logs:<aws-region>:<aws-account-id>:log-group:<log-group-name>:log-stream:*",
        "arn:aws:logs:<aws-region>:<aws-account-id>:log-group:API-Gateway-Execution-Logs_*",
        "arn:aws:logs:<aws-region>:<aws-account-id>:log-group:API-Gateway-Execution-Logs_*:log-stream:*"
      ]
    }
  ]
}
```

## AWS IAM role (preferred)

Create an IAM role with a trust relationship that allows the Embedded agent to receive the privileges in the IAM policy.

1. Within the AWS IAM Console, start the *Create role* wizard.
2. Select the **AWS account** option for the trusted entity type and select **Another AWS account**.
3. Enter Axway's AWS account ID `358983902532`, which will grant the Embedded agent access to your AWS API Gateway.
4. Optionally, but preferred, select **set an Require external ID** and enter any string. Go [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) for more information on external IDs. Note this for installation.
5. Ensure **Require MFA** is not selected and click **Next**.
6. Search for and select the IAM policy that was created in the previous section and click **Next**.
7. Enter the role name, such as `AmplifyAgentRole`.
8. Set an optional description and tags, then click **Create role**.
9. Note the created ARN for this role for installation.

## AWS IAM user (optional, not preferred)

Create an IAM user and generate an Access Key ID and Secret Access Key ID that the Embedded agent will use to receive the privileges in the IAM policy.

1. Within the AWS IAM Console, start the *Add users* wizard.
2. Give the user a name, such as `AmpliFyAgentUser`.
3. Ensure **Provide user access to the AWS Management Console** is not selected and click **Next**.
4. Select **Attach policies directly** and select the policy created in the first section.
5. Click **Next** to set any optional tags, then select **Create user**.
6. Find the newly created user and select it to view.
7. On the users page, select the *Security credentials* tab.
8. Click **Create access key**.
9. Select **Third-party service** and acknowledge that you understand the risks before clicking **Next**.
10. Give an optional description and click **Create access key**.
11. Note the Access Key ID and the Secret Access Key to be used during installation.

## AWS IAM policy for AgentCore mode

Create an IAM policy that allows the agent to discover, provision access to, and collect traceability for your AWS Bedrock AgentCore gateway resources. This policy is required when running in `agentcore-gateway` mode. Attach it to the same IAM role or user used by the agents.

1. Within the AWS IAM Console, start the *Create policy* wizard.
2. Select the *JSON editor* tab and paste the [Discovery policy JSON](#discovery-policy) below. If provisioning and/or traceability are also enabled, add those permissions to the same policy — a separate policy is not required.
3. Update the placeholder values:
   * `<aws-region>` becomes your AWS region, such as `eu-west-1`
   * `<aws-account-id>` becomes your AWS account ID
   * `<user-pool-id>` becomes your Cognito User Pool ID (Provisioning permissions only)
   * `<cloudtrail-bucket>` becomes the S3 bucket holding the CloudTrail data-event logs (Traceability with CloudTrail attribution only)
4. Click **Next: Tags** and add any tags you may want.
5. Click **Next: Review**.
6. Give the policy a name, such as `AmplifyAgentCorePolicy`.

### Discovery policy

Required for the Discovery Agent to list and inspect AgentCore gateways:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "bedrock-agentcore:ListGateways",
                "bedrock-agentcore:GetGateway",
                "bedrock-agentcore:ListGatewayTargets",
                "bedrock-agentcore:GetGatewayTarget"
            ],
            "Resource": "arn:aws:bedrock-agentcore:<aws-region>:<aws-account-id>:gateway/*"
        }
    ]
}
```

### Provisioning policy

Required for the Provisioning Agent to manage Cognito app clients and update the gateway's allowed-client list on subscribe and unsubscribe events. These statements can be added to the existing AgentCore discovery policy — no separate policy file is needed:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "bedrock-agentcore:UpdateGateway"
            ],
            "Resource": "arn:aws:bedrock-agentcore:<aws-region>:<aws-account-id>:gateway/*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "cognito-idp:ListUserPoolClients",
                "cognito-idp:CreateUserPoolClient",
                "cognito-idp:DescribeUserPoolClient",
                "cognito-idp:UpdateUserPoolClient",
                "cognito-idp:DeleteUserPoolClient"
            ],
            "Resource": "arn:aws:cognito-idp:<aws-region>:<aws-account-id>:userpool/<user-pool-id>"
        },
        {
            "Effect": "Allow",
            "Action": "iam:PassRole",
            "Resource": "arn:aws:iam::<aws-account-id>:role/*"
        }
    ]
}
```

| Permission | Purpose |
| --- | --- |
| `bedrock-agentcore:UpdateGateway` | Provisioning Agent updates the gateway's `allowedClients` list when credentials are issued or revoked |
| `cognito-idp:*` | Provisioning Agent creates, describes, updates, and deletes app clients in the Cognito User Pool linked to the gateway's CUSTOM_JWT authorizer |
| `iam:PassRole` | Required so Bedrock AgentCore can assume the execution role associated with the gateway when processing provisioning updates |

{{< alert title="Note" color="primary" >}}The `iam:PassRole` resource can be scoped to a specific role ARN instead of a wildcard for least-privilege configurations.{{< /alert >}}

### Traceability policy

Required for the Traceability Agent to collect metrics from AgentCore gateways. The CloudWatch statement is always required in `agentcore-gateway` mode. The S3 statement is required only when CloudTrail-based consumer attribution is enabled (`AWS_AGENTCORE_CLOUDTRAILENABLED=true`). These statements can be added to the existing AgentCore policy — no separate policy file is needed:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:FilterLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:<aws-region>:<aws-account-id>:log-group:/aws/vendedlogs/bedrock-agentcore/gateway/APPLICATION_LOGS/*",
                "arn:aws:logs:<aws-region>:<aws-account-id>:log-group:/aws/vendedlogs/bedrock-agentcore/gateway/APPLICATION_LOGS/*:log-stream:*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::<cloudtrail-bucket>",
                "arn:aws:s3:::<cloudtrail-bucket>/*"
            ]
        }
    ]
}
```

| Permission | Purpose |
| --- | --- |
| `logs:FilterLogEvents` | Traceability Agent reads each gateway's CloudWatch application logs to build usage metrics. Scope the resource to the log-group prefix set by `AWS_AGENTCORE_LOGGROUPPREFIX` (default shown). |
| `s3:ListBucket`, `s3:GetObject` | Traceability Agent reads CloudTrail `InvokeGateway` data events from the trail's S3 bucket for consumer attribution. Required only when `AWS_AGENTCORE_CLOUDTRAILENABLED=true` |

{{< alert title="Note" color="primary" >}}Omit the `s3` statement when running in CloudWatch-only mode. The agent also calls `sts:GetCallerIdentity` (to derive the CloudTrail object prefix), which AWS allows by default and does not require an explicit policy statement.{{< /alert >}}

For an overview of the traceability modes and the CloudTrail/S3 setup, see [Traceability for AgentCore gateways](/docs/connect_manage_environ/connect_aws_gateway/traceability-agentcore/).
