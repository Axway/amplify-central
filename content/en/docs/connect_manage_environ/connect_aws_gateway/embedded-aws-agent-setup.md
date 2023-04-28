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

## AWS IAM policy

Create an IAM policy that allows the Embedded agent the ability to discover and provision access to your AWS API Gateway resources. This step is required regardless of the authentication type you using.

1. Within the AWS IAM Console, start the *Create policy* wizard.
2. Select the *JSON editor* tab and paste the [AWS IAM policy JSON](#aws-iam-policy-json) policy.
3. Update for your specific region (i.e. &lt;aws-region&gt; becomes us-east-2) to set up [least-privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege) access.
4. Click **Next: Tags** and add any tags you may want.
5. Click **Next: Review**.
6. Give the policy a name, such as `AmplifyAgentPolicy`.

### AWS IAM policy JSON

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
