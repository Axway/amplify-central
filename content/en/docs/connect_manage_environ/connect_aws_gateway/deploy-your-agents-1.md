---
title: Reference - Agent configuration
linkTitle: Reference - Agent configuration
draft: false
weight: 50
description: >-
  Learn how to deploy your Discovery Agent and Traceability Agent using Docker
  containers so that you can manage  your AWS API Gateway environment within
  Amplify Central.

  Once agents are correctly deployed, they can collect the data from the AWS API Gateway and send it securely to Amplify Central.
---
## Before you start

* Read [Amplify Central AWS API Gateway connected overview](/docs/connect_manage_environ/connect_aws_gateway/)
* [Prepare Amplify Central](/docs/integrate_with_central/cli_central/cli_install/)
* [Prepare AWS API Gateway](/docs/connect_manage_environ/connect_aws_gateway/cloud-administration-operation/)
* Docker must be installed and you will need a basic understanding of Docker commands

## Objectives

Learn how to create your Discovery Agent and Traceability Agent configuration files, then install and run your agents.

## Discovery Agent

The Discovery Agent is used to discover new deployments and stage updates to existing deployments. Once they are discovered, the related APIs are published to Amplify Central so that they become available for any consumer.

The Discovery Agent only discovers published APIs where the stage has tags defined in the agent configuration file. See AWS_DISCOVERYTAGS.

There are two operating modes of the Discovery Agent, one is receiving continuous changes from AWS API Gateway and pushing to Amplify Central. The other synchronizing all APIs and then exits.

### Continuous Discovery Overview

In this mode the agent will receive change events for configuration changes to AWS API Gateway resources. These events will be processed and sent to Amplify Central. This mode is also required to manage subscriptions and subscription notifications.

### Synchronous Discovery Overview

In this mode the agent will read the configuration on AWS API Gateway and send all REST APIs to Amplify Central. Once it has completed this task it will exit and no additional changes will be sent to Amplify Central until the agent is executed again. This mode does not handle any subscription events.

The configuration of the AWS_QUEUENAME is not used in this mode.

### Create your Discovery Agent configuration

| Variable name                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|--------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **AWS variables**                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| AWS_SQSPOLLINTERVAL                                                | The interval at which to poll SQS for messages (ns - default, us, ms, s). Set to 20s. Max value is 20s                                                                                                                                                                                                                                                                                                                                                                                             |
| AWS_APIPOLLINTERVAL                                                | The interval at which to poll AWS for changes to things like UsagePlans (ns - default, us, ms, s, m, h). Set to 60s.                                                                                                                                                                                                                                                                                                                                                                               |
| AWS_REGION                                                         | The region where AWS APIs are stored.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| AWS_QUEUENAME                                                      | The name of the queue where Discovery Agent will read relevant AWS events. It is the QueueName provided during installation.                                                                                                                                                                                                                                                                                                                                                                       |
| AWS_LOGGROUP                                                       | The log group name where API Gateway will send Execution events (output of Step 5). See [Prepare AWS Gateway to deploy the Discovery Agent AWS config setup](/docs/connect_manage_environ/connect_aws_gateway/cloud-administration-operation/).                                                                                                                                                                                                                                                    |
| AWS_ALLOWUSAGEPLANAUTOCREATION                                     | When creating a subscription on Amplify Central, setting this value to true will enable a selection in the App name drop-down for 'Create a usage plan.' This allows the user to either select from an existing AWS Gateway Usage Plan, or to create a new Usage Plan in AWS Gateway. The new Usage Plan in AWS Gateway will be given the name of the subscription ID from Amplify Central. A value of false will cause 'Create an application' to not be shown in the drop-down. Default is true. |
| AWS_FILTER                                                         | Filter conditions for discovery based on AWS Stage tags to determine adding the API to Central. [See Discover APIs for conditional expression samples](/docs/connect_manage_environ/connect_aws_gateway/filtering-apis-to-be-discovered-1/).                                                                                                                                                                                                                                                       |
| AWS_PUSHTAGS                                                       | Determines whether the AWS Stage tags should be pushed to Amplify Central along with the API definition. Value must be true or false. Default is false.                                                                                                                                                                                                                                                                                                                                            |
| AWS_AUTH_ACCESSKEY                                                 | If not deploying in an EC2 instance, the access key of the AWS account where APIs are stored. Generated when the apigw_cloudformation script is run or you can use your own.                                                                                                                                                                                                                                                                                                                       |
| AWS_AUTH_SECRETKEY                                                 | If not deploying in an EC2 instance, the secret access key of the AWS account where APIs are stored. Generated when the apigw_cloudformation script is run or you can use your own.                                                                                                                                                                                                                                                                                                                |
| AWS_CLIENTTIMEOUT                                                  | The amount of time a single AWS transaction may wait to process (default value: `30s`).                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Logging variables**                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| LOG_LEVEL                                                          | The log level for output messages (debug, info, warn, error).                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| LOG_FORMAT                                                         | The format to print log messages (json, line, package).                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| LOG_OUTPUT                                                         | The output for the log lines (stdout, file, both). When set to `both` for the Traceability Agent, only the file output will appear.                                                                                                                                                                                                                                                                                                                                                                |
| LOG_MASKEDVALUES                                                   | Comma-separated list of keywords to identify within the agent config, which is used to mask its corresponding sensitive data. Keywords are matched by whole words and are case-sensitive.                                                                                                                                                                                                                                                                                                          |
| LOG_FILE_NAME                                                      | The name of the log files.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| LOG_FILE_PATH                                                      | The path (relative or absolute) to save logs files, if output type file or both.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| LOG_FILE_ROTATEEVERYMEGABYTES                                      | The max size, in megabytes that a log file can grow to.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| LOG_FILE_KEEPFILES                                                 | The max number of log file backups to keep.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| LOG_FILE_CLEANBACKUPS                                              | The max age of a backup file, in days.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Status variables**                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| STATUS_HEALTHCHECKPERIOD                                           | Time in minutes allotted for services to be ready before exiting the agent. Allowed values are from 1 to 5 minutes.                                                                                                                                                                                                                                                                                                                                                                                |
| **Amplify Central variables**                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| CENTRAL_URL                                                        | The URL to the Amplify Central instance being used for this Discovery Agent.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| CENTRAL_ORGANIZATIONID                                             | The Organization ID from Amplify Central. Locate this at Platform > User > Organization.                                                                                                                                                                                                                                                                                                                                                                                                           |
| CENTRAL_TEAM                                                       | The name of the team in Amplify Central that all APIs will be linked to. Locate this at Amplify Central > Access > Team Assets.                                                                                                                                                                                                                                                                                                                                                                    |
| CENTRAL_MODE                                                       | Method to send endpoints back to Central. (`publishToEnvironment` = API Service, `publishToEnvironmentAndCatalog` = API Service and Catalog asset).                                                                                                                                                                                                                                                                                                                                                |
| CENTRAL_AGENTNAME                                                  | The agent name of this agent on Amplify Central.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| CENTRAL_PROXYURL                                                   | The URL for the proxy for Amplify Central `<http://username:password@hostname:port>`. If empty, no proxy is defined.                                                                                                                                                                                                                                                                                                                                                                               |
| CENTRAL_REPORTACTIVITYFREQUENCY                                    | The frequency at which the agent polls for event changes for the periodic agent status updater (ns - default, us, ms, s, m, h). Set to 5m.                                                                                                                                                                                                                                                                                                                                                         |
| CENTRAL_VERSIONCHECKER                                             | Set to false to turn off the Agent job that checks if the running agent is the latest available (default: `true`).                                                                                                                                                                                                                                                                                                                                                                                 |
| CENTRAL_CLIENTTIMEOUT                                              | The time interval at which the HTTP client times out making HTTP requests and processing the response (ns - default, us, ms, s, m, h). Set to 60s.                                                                                                                                                                                                                                                                                                                                                 |
| CENTRAL_JOBTIMEOUT                                                 | The longest duration interval or scheduled jobs are allowed to run before being canceled (default: `5m`).                                                                                                                                                                                                                                                                                                                                                                                          |
| CENTRAL_APISERVICEREVISIONPATTERN                                  | Refer to [CENTRAL_APISERVICEREVISIONPATTERN](/docs/connect_manage_environ/connected_agent_common_reference/agent-variables#CENTRAL_APISERVICEREVISIONPATTERN).                                                                                                                                                                                                                                                                                                                                     |
| CENTRAL_AUTH_URL                                                   | The Amplify login URL: <https://login.axway.com/auth>.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| CENTRAL_AUTH_REALM                                                 | The Realm used to authenticate for Amplify Central.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| CENTRAL_AUTH_CLIENTID                                              | The name of the Service Account created in Amplify Central. Locate this at Amplify Central > Access > Service Accounts.                                                                                                                                                                                                                                                                                                                                                                            |
| CENTRAL_AUTH_PRIVATEKEY                                            | The private key associated with the Service Account.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| CENTRAL_AUTH_PUBLICKEY                                             | The public key associated with the Service Account.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| CENTRAL_AUTH_KEYPASSWORD                                           | The password for the private key, if applicable.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| CENTRAL_AUTH_TIMEOUT                                               | The timeout to wait for the authentication server to respond (ns - default, us, ms, s, m, h). Set to 10s.                                                                                                                                                                                                                                                                                                                                                                                          |
| CENTRAL_ADDITIONALTAGS                                             | Additional tag names to publish separated by a comma.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| CENTRAL_APISERVERENVIRONMENT                                       | Environment eventually set by download kit in APIC.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| CENTRAL_SSL_MINVERSION                                             | String value for the minimum SSL/TLS version that is acceptable. If zero, empty TLS 1.0 is taken as the minimum. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                                                                                                                                                                                                                               |
| CENTRAL_SSL_MAXVERSION                                             | String value for the maximum SSL/TLS version that is acceptable. If empty, then the maximum version supported by this package is used, which is currently TLS 1.3. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                                                                                                                                                                             |
| CENTRAL_SSL_CIPHERSUITES                                           | An array of strings. It is a list of supported cipher suites for TLS versions up to TLS 1.2. If CipherSuites is nil, a default list of secure cipher suites is used, with a preference order based on hardware performance. See the [supported cipher suites](/docs/connect_manage_environ/connected_agent_common_reference/agent_security/).                                                                                                                                                      |
| CENTRAL_SSL_NEXTPROTOS                                             | An array of strings. It is a list of supported application level protocols, in order of preference, based on the ALPN protocol list. Allowed values are: h2, htp/1.0, http/1.1, h2c.                                                                                                                                                                                                                                                                                                               |
| CENTRAL_SSL_INSECURESKIPVERIFY                                     | InsecureSkipVerify controls whether a client verifies the server's certificate chain and host name. If true, TLS accepts any certificate presented by the server and any host name in that certificate. In this mode, TLS is susceptible to man-in-the-middle attacks.                                                                                                                                                                                                                             |
| CENTRAL_SUBSCRIPTIONS_APPROVALMODE                                 | The mode for approving subscriptions on Amplify Central (manual, auto, webhook; default = manual).                                                                                                                                                                                                                                                                                                                                                                                                 |
| CENTRAL_SUBSCRIPTIONS_APPROVALWEBHOOK_URL                          | The url for a subscription approval webhook (if any). CENTRAL_SUBSCRIPTIONS_APPROVALMODE must be set to "webhook" for webhooks to be invoked.                                                                                                                                                                                                                                                                                                                                                      |
| CENTRAL_SUBSCRIPTIONS_APPROVALWEBHOOK_HEADERS                      | The headers to pass to the subscription approval webhook (if any). For example, "Header=contentType,Value=application/json".                                                                                                                                                                                                                                                                                                                                                                       |
| CENTRAL_SUBSCRIPTIONS_APPROVALWEBHOOK_AUTHSECRET                   | The authentication secret to pass to the subscription approval webhook (if any).                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Subscription notification variables**                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_WEBHOOK_URL                    | The webhook URL that subscription data will be posted to, see [Subscription webhook notifications](#subscription-webhook-notifications).                                                                                                                                                                                                                                                                                                                                                           |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_WEBHOOK_HEADERS                | The headers that will be used when posting data to the webhook url, see [Subscription webhook notifications](#subscription-webhook-notifications).                                                                                                                                                                                                                                                                                                                                                 |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_HOST                      | The SMTP server that will send email notifications.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PORT                      | The SMTP port to communicate to the SMTP server over.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_AUTHTYPE                  | The authentication type based on the email server.  You may have to refer to the email server properties and specifications. This value defaults to NONE. See [Customizing email servers](#customizing-email-servers).                                                                                                                                                                                                                                                                             |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_USERNAME                  | The username used to authenticate to the SMTP server, if necessary.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PASSWORD                  | The password used to authenticate to the SMTP server, if necessary.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_FROMADDRESS               | The email address that will be listed in the from field.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBE_SUBJECT         | The subject of email sent for Subscribe events.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBE_BODY            | The body of the email for Subscribe events, see [SMTP notifications](#smtp-notifications).                                                                                                                                                                                                                                                                                                                                                                                                         |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBE_OAUTH           | The body of the email for Subscribe events when the API is secured using an OAUTH token, see [SMTP notifications](#smtp-notifications).                                                                                                                                                                                                                                                                                                                                                            |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBE_APIKEYS         | The body of the email for Subscribe events when the API is secured using an APIKey, see [SMTP notifications](#smtp-notifications).                                                                                                                                                                                                                                                                                                                                                                 |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_UNSUBSCRIBE_SUBJECT       | The subject of email sent for Unsubscribe events.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_UNSUBSCRIBE_BODY          | The body of the email for Unsubscribe events, see [SMTP notifications](#smtp-notifications).                                                                                                                                                                                                                                                                                                                                                                                                       |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBEFAILED_SUBJECT   | The subject of email sent for Failed to Subscribe events.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBEFAILED_BODY      | The body of the email for Failed to Subscribe events, see [SMTP notifications](#smtp-notifications).                                                                                                                                                                                                                                                                                                                                                                                               |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_UNSUBSCRIBEFAILED_SUBJECT | The subject of email sent for Failed to Unsubscribe events.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_UNSUBSCRIBEFAILED_BODY    | The body of the email for Failed to Unsubscribe events, see [SMTP notifications](#smtp-notifications).                                                                                                                                                                                                                                                                                                                                                                                             |

### Customizing email servers

The `host`, which represents the email server, can be configured with minimal setup. This section represents the email servers that have been currently tested. Please note that all testing has been set up on port 587 signifying TLS support.

```yaml
# Google/Gmail server
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_HOST=smtp.gmail.com
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PORT=587
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_USERNAME=your GMAIL account
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PASSWORD=your GMAIL password (see note below)
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_AUTHTYPE=PLAIN

# Microsoft  Office 365 server
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_HOST=smtp.office365.com
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PORT=587
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_USERNAME=your Office Mail account
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PASSWORD=your Office Mail password
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_AUTHTYPE=LOGIN

# Microsoft Outlook server
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_HOST=smtp-mail.outlook.com
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PORT=587
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_USERNAME=your Outlook Mail account
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PASSWORD=your Office Mail password
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_AUTHTYPE=PLAIN

# Yahoo email server
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_HOST=smtp.mail.yahoo.com
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PORT=587
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_USERNAME=your Yahoo Mail account
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PASSWORD=your Yahoo Mail password (see note below)
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_AUTHTYPE=PLAIN

# Amazon Simple Email Service
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_HOST=email-smtp.<region>.amazonaws.com
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PORT=587
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_USERNAME=user access key (see note below)
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PASSWORD=user secret key (see note below)
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_AUTHTYPE=PLAIN
```

**Note**: You will be required to use an application generated password instead of the actual user email password for the following email servers. Follow the links for application generated passwords.

* Gmail - [Application generated gmail password](https://support.google.com/accounts/answer/185833?hl=en). Use this password in place of your actual password in the agent configuration `password:` field.
* Yahoo - [Application generated yahoo password](https://help.yahoo.com/kb/generate-third-party-passwords-sln15241.html). Use this password in place of your actual password in the agent configuration `password:` field.
* [AWS  Simple email service](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-email-smtp.html). Create your [SMTP credentials](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/smtp-credentials.html) and use them in the username (ACCESS KEY) and password (SECRET KEY) of the agent configuration. You might also have to verify the email address you will use (at least the sender email address).

### Subscription webhook notifications

When configured, a webhook notification will create an HTTP Post request to the URL specified.

The post request can include optional headers specified in the CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_WEBHOOK_HEADERS environment variables. Here is an example of specifying multiple headers in the environment file:

```
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_WEBHOOK_HEADERS=Header=contentType,Value=application/json, Header=Elements-Formula-Instance-Id,Value=5551212, Header=Authorization,Value=authvalue
```

The data posted will be a JSON object with the following structure:

```json
{
  "catalogItemId":"value",
  "catalogItemUrl":"value",
  "catalogItemName":"value",
  "action":"value",           # see below
  "email":"value",            # if applicable
  "message":"value",          # if applicable, any errors that occurred will be here
  "key":"value",              # if applicable
  "keyHeaderName":"value",    # if applicable
  "clientID":"value",         # if applicable
  "clientSecret":"value"      # if applicable
}
```

The action above will be one of the following:

* ACTIVE - Subscription was approved and processed properly by the agent
* FAILED_TO_SUBSCRIBE - Subscription was approved but failed processing in the agent
* UNSUBSCRIBED - Unsubscribe was processed properly by the agent
* FAILED_TO_UNSUBSCRIBE - Unsubscribe process failed in the agent

### SMTP notifications

Subscription notifications with email notifications can set both the subject and the body. The body, which may be HTML, is able to substitute data from the subscription event into the email that is sent to the event initiator. Here is a sample of the template used for subscribe events:

```
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBE_SUBJECT=Subscription Notification
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBE_BODY=Subscription created for Catalog Item:  <a href= {{.CatalogItemURL}}> {{.CatalogItemName}} </a> <br/>
Your API is secured using an APIKey credential:header:<b>{{.KeyHeaderName}}</b>/value:<b>{{.Key}}</b>
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBE_OAUTH=Your API is secured using OAuth token. You can obtain your token using grant_type=client_credentials with the following client_id=<b>{{.ClientID}}</b> and client_secret=<b>{{.ClientSecret}}</b>
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBE_APIKEYS=Your API is secured using an APIKey credential:header:<b>{{.KeyHeaderName}}</b>/value:<b>{{.Key}}</b>

```

The agent will fill in the appropriate data for the variables specified, i.e., \{{.CatalogItemName}}, {{.KeyHeaderName}} before sending the SMTP message. The variables that may be used are the keys for the JSON data sent to the webhook endpoint, see [Subscription webhook notifications](#subscription-webhook-notifications).

### Create your Discovery Agent environment file

Create a configuration file using the above variables. See the variable descriptions for their values. Below is a sample of what the configuration file will look like.

For example:

```yaml
# AWS connectivity
AWS_REGION=us-east-2
AWS_QUEUENAME=aws-apigw-discovery-us-east-2
AWS_AUTH_ACCESSKEY=<YOUR AWS ACCESS KEY HERE>
AWS_AUTH_SECRETKEY=<YOUR AWS SECRET KEY HERE>
AWS_LOGGROUP=<YOUR LOG GROUP NAME>
AWS_FILTER=tag.PushToAmplify == true
AWS_PUSHTAGS=true

#Amplify Central connectivity
# organization config:
CENTRAL_ORGANIZATIONID=<YOUR ORGANIZATION ID>
CENTRAL_TEAM=<THE TEAM NAME>
CENTRAL_ENVIRONMENT=<NAME OF THE CENTRAL TOPOLOGY ENVIRONMENT>
CENTRAL_AUTH_CLIENTID=<SERVICE ACCOUNT NAME: DOSA_xxxxxxxxx>

CENTRAL_MODE=<publishToEnvironment | publishToEnvironmentAndCatalog>

#CENTRAL_SSL_MINVERSION=
#CENTRAL_SSL_MAXVERSION=
#CENTRAL_SSL_CIPHERSUITES=
#CENTRAL_SSL_NEXTPROTOS=
#CENTRAL_SSL_INSECURESKIPVERIFY=

LOG_LEVEL=info
LOG_OUTPUT=stdout
LOG_PATH=logs
```

### Install and run Discovery Agent

1. Copy the `private_key.pem` and `public_key.pem` files that were originally created when you set up your Service Account to a keys directory. Make sure the directory is located on the machine being used for deployment. Note that the `public_key.pem` comes from Steps 3 and 4 of [Prepare AWS Gateway to deploy the Discovery Agent AWS config setup](/docs/connect_manage_environ/connect_aws_gateway/cloud-administration-operation/).
2. Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then replace `{agentVersion}` with the current agent release in following sections.
3. Pull the current image of the Discovery Agent:

   ```bash
   docker pull axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-discovery-agent:{agentVersion}
   ```

4. Start the Discovery Agent pointing to the `env_vars` file and the keys directory:

    * Continuous Discovery mode:

        ```bash
       docker run --env-file ./env_vars -v <pwd>/keys:/keys  axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-discovery-agent:{agentVersion}
        ```

        `pwd` relates to the local directory where the docker command is run. For Windows, the absolute path is preferred.

    * Synchronous Discovery mode:
  
        ```bash
        docker run --env-file ./env_vars -v <pwd>/keys:/keys  axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-discovery-agent:{agentVersion} --synchronize
        ```

        `pwd` relates to the local directory where the docker command is run. For Windows, the absolute path is preferred.

5. Run the following health check command to ensure the agent is up and running (continuous mode):

   ```bash
   docker inspect --format='{{json .State.Health}}' <container>
   ```

## Traceability Agent

The Traceability Agent is used to filter the AWS CloudWatch logs that are related to discovered APIs and prepare the transaction events that are sent to Amplify platform. Each time an API is called by a consumer, an event (summary + detail) is sent to Amplify Central and is visible in Business Insights.

### Create your Traceability Agent configuration

<!-- HTML table removed here, it will need to be added back manually as a Markdown table -->

| Variable name                                  | Description                                                                                                                                                                                                                                                                                                                                   |
|------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AWS variables                                  |                                                                                                                                                                                                                                                                                                                                               |
| AWS_AUTH_ACCESSKEY                             | If not deploying in an EC2 instance, the access key of the AWS account where APIs are stored.                                                                                                                                                                                                                                                 |
| AWS_AUTH_SECRETKEY                             | If not deploying in an EC2 instance, the secret access key of the AWS account where APIs are stored.                                                                                                                                                                                                                                          |
| AWS_REGION                                     | The region where AWS APIs are stored.                                                                                                                                                                                                                                                                                                         |
| AWS_SQSPOLLINTERVAL                            | How often SQS queue is polled.                                                                                                                                                                                                                                                                                                                |
| AWS_QUEUENAME                                  | The name of the queue (TraceabilityQueueName) from Step 5. This is used for logging custom access log entries. See [Prepare AWS Gateway to deploy the Discovery Agent AWS config setup](/docs/connect_manage_environ/connect_aws_gateway/cloud-administration-operation/).                                                                    |
| AWS_CLIENTTIMEOUT                              | The amount of time a single AWS transaction may wait to process (default value: `30s`).                                                                                                                                                                                                                                                       |
| Amplify Central variables                      |                                                                                                                                                                                                                                                                                                                                               |
| LOG_LEVEL                                      | The log level for the agent.                                                                                                                                                                                                                                                                                                                  |
| LOG_FORMAT                                     | The format to print log messages (json, line, package).                                                                                                                                                                                                                                                                                       |
| LOG_OUTPUT                                     | The output for the log lines (stdout, file, both). When set to `both` for the Traceability Agent, only the file output will appear.                                                                                                                                                                                                           |
| LOG_PATH                                       | LOG_PATH                                                                                                                                                                                                                                                                                                                                      |
| TRACEABILITY_HOST                              | The host name and port of the ingestion service to forward the transaction log entries (default value: `<ingestion.datasearch.axway.com:5044>`).                                                                                                                                                                                              |
| TRACEABILITY_PROTOCOL                          | Protocol (https or tcp) to be used for communicating with ingestion service (default value: `tcp`).                                                                                                                                                                                                                                           |
| TRACEABILITY_PROXYURL                          | The socks5 or http URL of the proxy server for ingestion service (`<socks5://hostname:port>`). If empty, no proxy is defined.                                                                                                                                                                                                                 |
| TRACEABILITY_COMPRESSIONLEVEL                  | The gzip compression level for the output event (default value: `3`).                                                                                                                                                                                                                                                                         |
| TRACEABILITY_BULKMAXSIZE                       | The maximum number of events to bulk in a single ingestion request (default value: `100`).                                                                                                                                                                                                                                                    |
| TRACEABILITY_CLIENTTIMEOUT                     | The time to wait for ingestion response (default value: `60s`).                                                                                                                                                                                                                                                                               |
| TRACEABILITY_WORKER                            | The number of workers collecting events and sending them to Amplify Central (default value: `1`).                                                                                                                                                                                                                                             |
| TRACEABILITY_REDACTION_PATH_SHOW               | Determines what portions of a transactions PATH to send to Amplify Central.                                                                                                                                                                                                                                                                   |
| TRACEABILITY_REDACTION_QUERYARGUMENT_SHOW      | Determines what Query Arguments to send to Amplify Central.                                                                                                                                                                                                                                                                                   |
| TRACEABILITY_REDACTION_QUERYARGUMENT_SANITIZE  | Determines what portions of a Query Arguments value to sanitize.                                                                                                                                                                                                                                                                              |
| TRACEABILITY_REDACTION_REQUESTHEADER_SHOW      | Determines what Request Header Keys to send to Amplify Central.                                                                                                                                                                                                                                                                               |
| TRACEABILITY_REDACTION_REQUESTHEADER_SANITIZE  | Determines what portions of a Request Headers value to sanitize.                                                                                                                                                                                                                                                                              |
| TRACEABILITY_REDACTION_RESPONSEHEADER_SHOW     | Determines what Response Header Keys to send to Amplify Central.                                                                                                                                                                                                                                                                              |
| TRACEABILITY_REDACTION_RESPONSEHEADER_SANITIZE | Determines what portions of a Response Headers value to sanitize.                                                                                                                                                                                                                                                                             |
| TRACEABILITY_REDACTION_MASKING_CHARACTERS      | Determines what characters are displayed as the sanitized response header values on Amplify (default value `{*}`).                                                                                                                                                                                                                            |
| TRACEABILITY_SAMPLING_PERCENTAGE               | The percentage of all transactions that are sent to Amplify. A value of `0` reports no traffic (default value `10`).                                                                                                                                                                                                                          |
| TRACEABILITY_SAMPLING_PER_API                  | When true, the percentage of API transactions sent will be based on each API ID in the transaction (default value: `true`).                                                                                                                                                                                                                   |
| TRACEABILITY_EXCEPTION_LIST                    | Determines what API paths the agent will dismiss and not process for usage or transaction reporting. Valid regular expressions can be configured. Example: `["/api/v\\d+/ping.*$", "^/qa.*$", "/qa.*" ]`. Learn the Regular Expression syntax ([RE2 Syntax](https://github.com/google/re2/wiki/Syntax)) supported by the agent.               |
| CENTRAL_ORGANIZATIONID                         | The Organization ID from Amplify Central. Locate this ID in the Platform > Organization > Org ID.                                                                                                                                                                                                                                             |
| CENTRAL_TEAM                                   | The name of the team in Amplify Central that all API traffic events will be linked to. Locate this at Amplify Central > Access > Team Assets.                                                                                                                                                                                                 |
| CENTRAL_DEPLOYMENT                             | The APIC deployment environment.                                                                                                                                                                                                                                                                                                              |
| CENTRAL_ENVIRONMENTID                          | The unique character string that identifies your monitoring environment. e4e0810XXXXXXXXX                                                                                                                                                                                                                                                     |
| CENTRAL_AUTH_URL                               | The Amplify login URL: <https://login.axway.com/auth>                                                                                                                                                                                                                                                                                         |
| CENTRAL_AUTH_REALM                             | The Realm used to authenticate for Amplify Central. Locate this in Amplify Central > Access > Service Accounts.                                                                                                                                                                                                                               |
| CENTRAL_AUTH_CLIENTID                          | The name of the Service Account created in Amplify Central. Locate this in Amplify Central > Access > Service Accounts. DOSA_XXXXXXXXXx                                                                                                                                                                                                       |
| CENTRAL_AUTH_PRIVATEKEY                        | The private key associated with the Service Account.                                                                                                                                                                                                                                                                                          |
| CENTRAL_AUTH_PUBLICKEY                         | The public key associated to the Service Account.                                                                                                                                                                                                                                                                                             |
| CENTRAL_AUTH_KEYPASSWORD                       | The password for the private key, if applicable.                                                                                                                                                                                                                                                                                              |
| CENTRAL_USAGEREPORTING_PUBLISH                 | Enables/disables the sending of usage events to Amplify (default value: `true`). Takes precedence over replaced variable CENTRAL_PUBLISHUSAGE .                                                                                                                                                                                               |
| CENTRAL_USAGEREPORTING_INTERVAL                | The frequency in which the agent reports API usage to Amplify (default value: 15m). Takes precedence over replaced variable CENTRAL_EVENTAGGREGATIONINTERVAL.                                                                                                                                                                                |
| CENTRAL_USAGEREPORTING_OFFLINE                 | Set to True to enable offline usage reporting (default value: False). Ignores CENTRAL_USAGEREPORTING_INTERVAL value as that is only for online reporting.                                                                                                                                                                                     |
| CENTRAL_USAGEREPORTING_OFFLINESCHEDULE         | Determines how often usage numbers should be saved (default value and minimum: @hourly).                                                                                                                                                                                                                                                      |
| CENTRAL_PROXYURL                               | The URL for the proxy for Amplify Central `<http://username:password@hostname:port>`. If empty, no proxy is defined.                                                                                                                                                                                                                          |
| CENTRAL_REPORTACTIVITYFREQUENCY                | The frequency at which the agent polls for event changes for the periodic agent status updater (ns - default, us, ms, s, m, h). Set to 5m.                                                                                                                                                                                                    |
| CENTRAL_VERSIONCHECKER                         | Set to false to turn off the Agent job that checks if the running agent is the latest available (default: `true`).                                                                                                                                                                                                                            |
| CENTRAL_CLIENTTIMEOUT                          | The time interval at which the HTTP client times out making HTTP requests and processing the response (ns - default, us, ms, s, m, h). Set to 60s.                                                                                                                                                                                            |
| CENTRAL_JOBTIMEOUT                             | The longest duration interval or scheduled jobs are allowed to run before being canceled (default: `5m`).                                                                                                                                                                                                                                     |
| CENTRAL_SSL_MINVERSION                         | String value for the minimum SSL/TLS version that is acceptable. If zero, empty TLS 1.0 is taken as the minimum. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                                                                          |
| CENTRAL_SSL_MAXVERSION                         | String value for the maximum SSL/TLS version that is acceptable. If empty, then the maximum version supported by this package is used, which is currently TLS 1.3. Allowed values are: TLS1.0, TLS1.1, TLS1.2, TLS1.3.                                                                                                                        |
| CENTRAL_SSL_CIPHERSUITES                       | An array of strings. It is a list of supported cipher suites for TLS versions up to TLS 1.2. If CipherSuites is nil, a default list of secure cipher suites is used, with a preference order based on hardware performance. See the [supported cipher suites](/docs/connect_manage_environ/connected_agent_common_reference/agent_security/). |
| CENTRAL_SSL_NEXTPROTOS                         | An array of strings. It is a list of supported application level protocols, in order of preference, based on the ALPN protocol list. Allowed values are: h2, htp/1.0, http/1.1, h2c                                                                                                                                                           |
| CENTRAL_SSL_INSECURESKIPVERIFY                 | InsecureSkipVerify controls whether a client verifies the server's certificate chain and host name. If true, TLS accepts any certificate presented by the server and any host name in that certificate. In this mode, TLS is susceptible to man-in-the-middle attacks.                                                                        |

### Create your Traceability Agent environment file

Create a configuration file using the above variables. See the variable descriptions for their values. Below is a sample of what the configuration file will look like.

For example:

```yaml
# AWS connectivity
AWS_REGION=us-east-2
AWS_QUEUENAME=aws-apigw-traceability-us-east-2
AWS_AUTH_ACCESSKEY=<YOUR AWS ACCESS KEY HERE>
AWS_AUTH_SECRETKEY=<YOUR AWS SECRET KEY HERE>

#Amplify Central connectivity
# organisation config:
CENTRAL_ORGANIZATIONID=<YOUR ORGANIZATION ID>
CENTRAL_TEAM=<THE TEAM NAME>
CENTRAL_ENVIRONMENT=<NAME OF THE CENTRAL TOPOLOGY ENVIRONMENT>
CENTRAL_AUTH_CLIENTID=<SERVICE ACCOUNT NAME: DOSA_xxxxxxxxx>

#CENTRAL_SSL_MINVERSION=
#CENTRAL_SSL_MAXVERSION=
#CENTRAL_SSL_CIPHERSUITES=
#CENTRAL_SSL_NEXTPROTOS=
#CENTRAL_SSL_INSECURESKIPVERIFY=

LOG_LEVEL=debug
LOG_OUTPUT=stdout
LOG_PATH=logs
```

### Install and run Traceability Agent

1. Copy the `private_key.pem` and `public_key.pem` files that were originally created when you set up your Service Account to a keys directory. Make sure the directory is located on the machine being used for deployment.
2. Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then replace `{agentVersion}` with the current agent release in following sections.
3. Pull the current image of the Traceability Agent:

   ```bash
   docker pull docker pull axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-traceability-agent:{agentVersion}
   ```

4. Start the Traceability Agent pointing to the `env_vars` file and the `keys` directory. Note that `pwd` relates to the local directory where the docker command is run. For Windows, the absolute path is preferred.

   ```bash
   docker run --env-file ./env_vars -v <pwd>/keys:/keys  axway.jfrog.io/ampc-public-docker-release/agent/aws-apigw-traceability-agent:{agentVersion}
   ```

5. Run the following health check command to ensure the agent is up and running:

   ```bash
   docker inspect --format='{{json .State.Health}}' <container>
   ```
