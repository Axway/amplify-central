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

AWS CloudWatch is used by the Embedded Traceability Agent as well as AWS API Gateway itself. In order for the agent to be able to retrieve API usages the following must be set up.

### AWS IAM Role for API Gateway

The role created here is then given to AWS API Gateway so it will have the ability to create and write to cloud watch log groups.

1. Within the AWS IAM Console, start the *Create role* wizard.
2. On the *Select trusted entity* page.
   * Select *AWS service* and.
   * Select *API Gateway* from the *Use cases for other AWS services*.
   * Select the *API Gateway* radio button.
   * Click **Next**.
3. On the *Add permissions* page.
   * Add the *AmazonAPIGatewayPushToCloudWatchLogs* policy, if it is not already added.
   * Click **Next**.
4. Give the role a name, such as `APIGWPusuToCloudWatch` and click **Create role**, note this role arn.
5. Navigate to the AWS API Gateway Console, start the *Create role* wizard.
6. Select any API listed.
7. Select *Settings* at the bottom left.
8. Enter the previously created role arn and click **Save**.

### AWS CloudWatch Log Group

The CloudWatch Log Group that is created here will be used by both agents. Upon discovery of a Rest API stage the Discovery agent will configure the logging to send details to CloudWatch. The Traceability agent then watches the CloudWatch for new entries in order to send usage, metric, and transactional data to Amplify Central.

1. Within the AWS CloudWatch Console, select *Log groups* on the left then start the *Create log group* wizard
2. Set the log group name, such as `amplify-agents-access-log`, and retention settings, note the log group name for use in setting up the AWS IAM policy
3. Click **Create**
4. After the window refreshes you should see the new log group in the list, select it
5. Under *Log group details* is the ARN for this log group, note this for use in setting up the agents

## AWS IAM policy

Create an IAM policy that allows the Embedded agent the ability to discover and provision access to your AWS API Gateway resources. This step is required regardless of the authentication type you using

1. Within the AWS IAM Console, start the *Create policy* wizard.
2. Select the *JSON editor* tab and paste the [AWS IAM policy JSON](#aws-iam-policy-json) policy.
3. Update the policy sample below with your values
   * &lt;aws-region&gt; becomes us-east-2
   * &lt;aws-account-id&gt;, becomes your AWs account ID
   * &lt;log-group-name&gt;, becomes the log group name from [AWS CloudWatch Log Group](#aws-cloudwatch-log-group)
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
        "arn:aws:logs:<aws-region>:<aws-account-id>:log-group:<log-group-name>:log-stream:*"
        "arn:aws:logs:<aws-region>:<aws-account-id>:log-group:API-Gateway-Execution-Logs_*",
        "arn:aws:logs:<aws-region>:<aws-account-id>:log-group:API-Gateway-Execution-Logs_*:log-stream:*",
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
