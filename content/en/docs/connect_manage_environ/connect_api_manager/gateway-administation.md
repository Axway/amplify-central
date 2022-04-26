---
title: Administer API Manager Gateway
linkTitle: Administer API Manager Gateway
draft: false
weight: 25
description: Learn how to deploy your Discovery Agent and Traceability Agent so
  that you can manage your Axway API Gateway environment within Amplify Central.
---
## Before you start

* Read [Amplify Central and Axway API Manager connected overview](/docs/connect_manage_environ/connect_api_manager/)
* Be sure you have [Prepared Amplify Central](/docs/connect_manage_environ/connect_api_manager/#prerequisites)
* You will need a basic knowledge of Axway API Management solution:

    * Where the solution is running (host / port / path to the logs / users)
    * How to create / publish an API
    * How to call an API
* For containerized agents, Docker must be installed and you will need a basic understanding of Docker commands

## Objectives

Learn how to install, customize and run your Discovery and Traceability agents.

## Discovery Agent

The Discovery Agent is used to discover new published APIs or any updated APIs. Once they are discovered, the related APIs are published to Amplify Central, in one of the following publication modes:

* **Environment / API Service publication**: Customers publish their APIs to the Amplify platform.
* **Environment / API Service publication / Catalog item publication** (default mode): Same as previous plus automatically expose the APIS to the consumer via the Amplify Catalog.

The Discovery Agent only discovers APIs that have tags defined in the agent configuration file. See [Discover APIs](/docs/connect_manage_environ/connect_api_manager/filtering-apis-to-be-discovered/). By default, the filter is empty and thus the agent will discover all APIs.

The binary agent can run in the following mode:

* Default: With a yaml configuration file having the same name as the agent binary - `discovery_agent.yml`. Some values (Central url / authentication url) are defaulted to avoid mistake and will not be visible in the provided discovery_agent.yml file.
* **Recommended**: With an environment variable file `da_env_vars.env`. All values in the `discovery_agent.yml` file can be overridden with environment variables. Those environment variables can be stored in a single file and this file can be located anywhere (use --envFile flag in the agent command line to access it=`./discovery_agent --envFile /home/config/da_env_vars.env`). This makes it easy to update the agent (binary/yaml) without loosing the agent configuration. All environment variables are described in [Discovery Agent variables](/docs/connect_manage_environ/connect_api_manager/agent-variables/) section.

The containerized agent can run in the following mode:

* With an environment variables configuration file, `da_env_vars.env`, supplied as a command line argument when running the Docker image.

### Installing the Discovery Agent

#### To install the Binary Discovery Agent

**Step 1**: Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then replace `{agentVersion}` with the current agent release in following sections.

**Step 2**: Download the current version of the zip file from the Axway public repository using the following command:

```shell
curl -L "https://axway.jfrog.io/artifactory/ampc-public-generic-release/v7-agents/v7_discovery_agent/{agentVersion}/discovery_agent-{agentVersion}.zip" -o discovery_agent-{agentVersion}.zip
```

**Step 3**: Unzip the file discovery_agent-{agentVersion}.zip to get the agent binary (discovery_agent) and a template configuration file (discovery_agent.yml).

```shell
unzip discovery_agent-{agentVersion}.zip
```

**Step 4**: Copy those 2 files into a folder (/home/APIC-agents for instance) on the machine where the API Manager environment is located.

**Step 5**: Move the `private_key.pem` and `public_key.pem` files that were originally created when you set up your Service Account to the agent directory (APIC-agents). Note that the `public_key.pem` comes from Steps 3 or 4 of [Create a Service Account](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis) depending if you choose to use the `der` format or not.

#### To install the Dockerized Discovery Agent

Create your Discovery Agent environment file, `da_env_vars.env`. See [Discovery Agent variables](/docs/connect_manage_environ/connect_api_manager/agent-variables/) for a reference to variable descriptions.
After customizing all the sections, your `da_env_vars.env` file should look like this example file:

```shell
# API MANAGER connectivity
APIMANAGER_HOST=<HOST>
APIMANAGER_AUTH_USERNAME=<USER>
APIMANAGER_AUTH_PASSWORD=<PASSWORD>

# API GATEWAY connectivity
APIGATEWAY_HOST=<HOST>
APIGATEWAY_AUTH_USERNAME=<USER>
APIGATEWAY_AUTH_PASSWORD=<PASSWORD>

# Amplify connectivity
CENTRAL_ORGANIZATIONID=<ORGANIZATIONID>
CENTRAL_AUTH_CLIENTID=<CLIENTID, ie. DOSA_12345...>
```

* The value for *team* can be found in [Amplify Central > Access > Team Assets](https://apicentral.axway.com/access/teams/).
* The value for *organizationID* can be found in Amplify Central Platform > Organization.
* The value for *clientId* can be found in Service Account. See [Create a service account](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis).

Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then replace `{agentVersion}` with the current agent release in following sections.

Pull the Docker image of the Discovery Agent:

```shell
docker pull axway.jfrog.io/ampc-public-docker-release/agent/v7-discovery-agent:{agentVersion}
```

### Customizing the Discovery Agent environment variable file

The `da_env_vars.env` configuration file contain 3 sections to personalize: API Manager connectivity, central connectivity and logging.

#### Customizing Discovery Agent API Manager connectivity variables

This section connects the agent to API Manager and determines which APIs should be discovered and published to Amplify Central.

`APIMANAGER_HOST`: Machine name where API Manager is running. Use a hostname according to the certificate returned by the API-Manager.

`APIMANAGER_PORT`: API Manager port number (8075 by default).

`APIMANAGER_DISCOVERYIGNORETAGS` (optional): Comma-separated blacklist of tags. If an API has one or several of these blacklist tags, the agent ignores this API and will not publish it to Amplify Central. This property takes precedence over the filter property below. The default value is empty, which means no API is ignored.

`APIMANAGER_FILTER` (optional): Expression to filter the API you want the agent to discover. See [Discover APIs](/docs/connect_manage_environ/connect_api_manager/filtering-apis-to-be-discovered/). Leaving this field empty tells the agent to discover all published APIs (REST / SOAP).

`APIMANAGER_SUBSCRIPTIONAPPLICATIONFIELD` (optional): The field name used to store Amplify Central subscription identifier inside the API Manager application securing the front end proxy. Default value is **subscriptions**. If you do not intend to change it, comment this property. Be aware that the field will not be visible in the API Manager application, as it is a specific configuration. If you want to see that field or customize it, refer to Add a custom property to applications in [Customize API Manager](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apimgr_admin/api_mgmt_custom/index.html#customize-api-manager-data) documentation.

`APIMANAGER_POLLINTERVAL`: The frequency in which API Manager is polled for new endpoints. Default value is 30s.

`APIMANAGER_ALLOWAPPLICATIONAUTOCREATION` (optional): When creating a subscription on Amplify Central, setting this value to true will enable a selection in the App name dropdown for 'Create an application.' This allows the user to either select from an existing API Manager application, or to create a new application in API Manager. The new application in API Manager will be given the name of the subscription ID from Amplify Central. A value of false will cause 'Create an application' to not be shown in the dropdown. Default value is **true**.

`APIMANAGER_AUTH_USERNAME`: An API Manager user the agent will use to connect to the API Manager. This user must have either the “API Manager Administrator” or “Organization administrator” role. Based on the role of this user, the agent is able to:

* Discover any API from any organization (“API Manager Administrator”)  
* Discover any API from a specific organization (“Organization administrator”)

`APIMANAGER_AUTH_PASSWORD`: The password of the API Manager user in clear text.

Once all data is gathered, this section should looks like:

```shell
APIMANAGER_HOST=localhost
APIMANAGER_PORT=8075
APIMANAGER_AUTH_USERNAME=apiManagerUser
APIMANAGER_AUTH_PASSWORD=apiManagerUserPassword
APIMANAGER_DISCOVERYIGNORETAGS=tag1,tag2
APIMANAGER_FILTER=tag.APITAG==value
#APIMANAGER_POLLINTERVAL=30s
# Subscription management
#APIMANAGER_SUBSCRIPTIONAPPLICATIONFIELD=subscriptions
#APIMANAGER_ALLOWAPPLICATIONAUTOCREATION=true
```

#### Customizing Discovery Agent Central connectivity variables

This section connects the agent to Amplify Central and determines how to published the discovered APIs.

`CENTRAL_URL`: The Amplify Central url. Default value is **<https://apicentral.axway.com>**.

`CENTRAL_TEAM`: Set to assign an owner of all API resources in the CENTRAL_ENVRIONMENT to that team. When blank (default), the agent will attempt to match API Manager organizations to existing teams. When no match is found, the API resources will not be assigned an owner. Catalog items will be assigned to the same team, or default team when blank.                                                                                                                                                                                                                   |

`CENTRAL_ORGANIZATIONID`: The Organization ID from Amplify Central. Locate this at Platform > User > Organization > Org ID field.

`CENTRAL_ENVIRONMENT`: The environment name you created when [preparing Amplify Central](/docs/integrate_with_central/cli_central/cli_install/).

`CENTRAL_APISERVERVERSION`: The version of Amplify Central API the agent is using. Default value is **v1alpha1**.

`CENTRAL_MODE`: The method to send endpoints back to Central. (publishToEnvironment = API Service, publishToEnvironmentAndCatalog = API Service and Catalog asset).  

`CENTRAL_AUTH_URL`: The Amplify login URL. Default value is **<https://login.axway.com/auth>**.

`CENTRAL_AUTH_REALM`: The Realm used to authenticate for Amplify Central. Default value is **Broker**.

`CENTRAL_AUTH_CLIENTID`: The Client ID of the Service Account (DOSA_....) you created when [preparing Amplify Central](/docs/integrate_with_central/cli_central/cli_install/). Locate this at Amplify Central > Access > Service Accounts.

`CENTRAL_AUTH_PRIVATEKEY`: The location of the private key file you created when [preparing Amplify Central](/docs/integrate_with_central/cli_central/cli_install/). Absolute file path is recommended to avoid confusion.

`CENTRAL_AUTH_PUBLICKEY`:  The location of the public key file you created when [preparing Amplify Central](/docs/integrate_with_central/cli_central/cli_install/). Absolute file path is recommended to avoid confusion.  

`CENTRAL_AUTH_KEYPASSWORD`: The key password to open the key. None set up by default.

`CENTRAL_AUTH_TIMEOUT`: Timeout for the authentication. Default value is **10s**.

Once all data is gathered, this section should look like:

```shell
#CENTRAL_URL=https://apicentral.axway.com
CENTRAL_TEAM=Dev
CENTRAL_ORGANIZATIONID=68794y2
CENTRAL_ENVIRONMENT=my-v7-env
#CENTRAL_APISERVERVERSION=v1alpha1
#CENTRAL_MODE=publishToEnvironmentAndCatalog
#CENTRAL_AUTH_URL=https://login.axway.com/auth
#CENTRAL_AUTH_REALM=Broker
CENTRAL_AUTH_CLIENTID=DOSA_66743...
CENTRAL_AUTH_PRIVATEKEY=/home/APIC-agents/private_key.pem
CENTRAL_AUTH_PUBLICKEY=/home/APIC-agents/public_key.pem
#CENTRAL_AUTH_KEYPASSWORD:
#CENTRAL_AUTH_TIMEOUT=10s
```

#### Customizing Discovery Agent to manage subscription approval and notifications

Various use cases are supported to approve a subscription using the `CENTRAL_SUBSCRIPTIONS_APPROVAL_MODE` variable:

* manual (default): a provider must manually approve the subscription
* auto: all subscription are automatically approved
* webhook: a webhook can be added to the agent configuration. The webhook endpoint will be trigger each time the subscription state is updated. For this, there are 2 additional variables required: `CENTRAL_SUBSCRIPTIONS_APPROVAL_WEBHOOK_URL` and `CENTRAL_SUBSCRIPTIONS_APPROVAL_WEBHOOK_HEADERS`.

More information can be found in [Supported use cases for subscription approval](/docs/connect_manage_environ/connected_agent_common_reference/manage_subscription_workflow/#supported-use-case-for-issuing-consumer-credentials) section.

We also support two use cases to send API credentials to the subscriber:

* via an email: you must configure the email server, as well as the various email templates the agent can send (Subscription success / Subscription failure / Unsubscribing success / Unsubscribing failure)
* via a webhook: a webhook can be triggered with the subscription credentials payload.

These options are mutually exclusive.

More information can be found in [Supported use cases for receiving API credentials](/docs/connect_manage_environ/connected_agent_common_reference/manage_subscription_workflow/#supported-use-cases-for-receiving-api-credentials) section.

Once all data is gathered, this subscription section should look like this:

```shell
# Subscription approval mode
CENTRAL_SUBSCRIPTIONS_APPROVAL_MODE=[webhook|auto|manual]
CENTRAL_SUBSCRIPTIONS_APPROVAL_WEBHOOK_URL=http://mywebhookurl.com
CENTRAL_SUBSCRIPTIONS_APPROVAL_WEBHOOK_HEADERS=contentType,Value=application/json

# Subscription notification via email - to be commented or removed if you don't want to use it
## SMTP server
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_HOST=smtpServerHost
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PORT=smtpServerPort
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_USERNAME=userName
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PASSWORD=userPassword
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_AUTHTYPE=PLAIN
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_FROMADDRESS=agentSubscription@email.com

## email templates
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBE_SUBJECT=Subscription Notification
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBE_BODY=Subscription created for Catalog Item:  <a href= {{.CatalogItemURL}}> {{.CatalogItemName}} {{.CatalogItemID}}.</br></a>{{if .IsAPIKey}} Your API is secured using an APIKey credential:header:<b>{{.KeyHeaderName}}</b>/value:<b>{{.Key}}</b>{{else}} Your API is secured using OAuth token. You can obtain your token using grant_type=client_credentials with the following client_id=<b>{{.ClientID}}</b> and client_secret=<b>{{.ClientSecret}}</b>{{end}}

CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_UNSUBSCRIBE_SUBJECT=Subscription Removal Notification
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_UNSUBSCRIBE_BODY=Subscription for Catalog Item=<a href= {{.CatalogItemURL}}> {{.CatalogItemName}}</a> has been unsubscribed

CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBEFAILED_SUBJECT=Subscription Failed Notification
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBEFAILED_BODY=Could not unsubscribe to Catalog Item=<a href= {{.CatalogItemURL}}> {{.CatalogItemName}}</a>.<br/> Error encountered: ${message}

CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_UNSUBSCRIBEFAILED_SUBJECT=Subscription Removal Failed Notification
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_UNSUBSCRIBEFAILED_BODY=Could not unsubscribe to Catalog Item=<a href= {{.CatalogItemURL}}> {{.CatalogItemName}}</a>.<br/> Error encountered: ${message}

## webhook notification - to be un-commented if you want to use it
#CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_WEBHOOK_URL=subscriptionNotificationWebhookURL
#CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_WEBHOOK_HEADERS=subscriptionWebHookHeader
```

#### Customizing Discovery Agent logging variables

The log section defines how the agent is managing its logs.

`LOG_LEVEL`: The log level for output messages (debug, info, warn, error). Default value is **info**.

`LOG_FORMAT`: The format to print log messages (json, line, package). Default value is **json**.

`LOG_OUTPUT`: The output for the log lines (stdout, file, both). Default value is **stdout**.

`LOG_MASKEDVALUES` : Comma-separated list of keywords to identify within the agent config, which is used to mask its corresponding sensitive data. Keywords are matched by whole words and are case-sensitive. Displaying of agent config to the console requires that the log.level be at debug (level: debug).

`LOG_FILE_NAME`: The name of the log file. Default value is the name of the binary.

`LOG_FILE_PATH`: The path (relative / absolute) to save log files, if output is file or both.

`LOG_FILE_ROTATEEVERYBYTES`: The maximum size, in bytes, that log file can grow to.

`LOG_FILE_KEEPFILES`: The maximum number of log file backups to keep.

`LOG_FILE_CLEANBACKUPS`: The maximum age of a backup, in days.

Once all data is gathered, this section should look like:

```shell
LOG_LEVEL=info
LOG_OUTPUT=stdout
LOG_FILE_PATH=logs
LOG_MASKEDVALUES=keyword1, keyword2, keyword3
LOG_FILE_NAME=discovery_agent.log
```

#### Validating your Discovery Agent configuration file

After customizing all variables, your `da_env_vars.env` file should look like:

```shell
# API Manager connectivity
APIMANAGER_HOST=localhost
APIMANAGER_PORT=8075
APIMANAGER_AUTH_USERNAME=apiManagerUser
APIMANAGER_AUTH_PASSWORD=apiManagerUserPassword
APIMANAGER_DISCOVERYIGNORETAGS=tag1,tag2
APIMANAGER_FILTER=tag.APITAG==value
#APIMANAGER_POLLINTERVAL=30s
# Subscription management
#APIMANAGER_SUBSCRIPTIONAPPLICATIONFIELD=subscriptions
#APIMANAGER_ALLOWAPPLICATIONAUTOCREATION=true

# Central connectivity 
#CENTRAL_URL=https://apicentral.axway.com
CENTRAL_TEAM=Dev
CENTRAL_ORGANIZATIONID=68794y2
CENTRAL_ENVIRONMENT=my-v7-env
#CENTRAL_APISERVERVERSION=v1alpha1
#CENTRAL_MODE=publishToEnvironmentAndCatalog
#CENTRAL_AUTH_URL=https://login.axway.com/auth
#CENTRAL_AUTH_REALM=Broker
CENTRAL_AUTH_CLIENTID=DOSA_66743...
CENTRAL_AUTH_PRIVATEKEY=/home/APIC-agents/private_key.pem
CENTRAL_AUTH_PUBLICKEY=/home/APIC-agents/public_key.pem
#CENTRAL_AUTH_KEYPASSWORD:
#CENTRAL_AUTH_TIMEOUT=10s

# Subscription approval
CENTRAL_SUBSCRIPTIONS_APPROVAL_MODE=webhook
CENTRAL_SUBSCRIPTIONS_APPROVAL_WEBHOOK_URL=http://mywebhookurl.com
CENTRAL_SUBSCRIPTIONS_APPROVAL_WEBHOOK_HEADERS=contentType,Value=application/json

# Subscription SMTP definition
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_HOST=smtpServerHost
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PORT=smtpServerPort
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_USERNAME=userName
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_PASSWORD=userPassword
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_AUTHTYPE=PLAIN
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_FROMADDRESS=agentSubscription@email.com

# Subscription email notification
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBE_SUBJECT==Custom Subscription Notification
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBE_BODY=Subscription created for Catalog Item:  <a href= {{.CatalogItemURL}}> {{.CatalogItemName}} {{.CatalogItemID}}.</br></a>{{if .IsAPIKey}} Your API is secured using an APIKey credential:header:<b>{{.KeyHeaderName}}</b>/value:<b>{{.Key}}</b>{{else}} Your API is secured using OAuth token. You can obtain your token using grant_type=client_credentials with the following client_id=<b>{{.ClientID}}</b> and client_secret=<b>{{.ClientSecret}}</b>{{end}}

CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_UNSUBSCRIBE_SUBJECT=Custom subscription Removal Notification
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_UNSUBSCRIBE_BODY=Subscription for Catalog Item=<a href= {{.CatalogItemURL}}> {{.CatalogItemName}}</a> has been unsubscribed

CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBEFAILED_SUBJECT=Custom Subscription Failed Notification
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_SUBSCRIBEFAILED_BODY=Could not unsubscribe to Catalog Item=<a href= {{.CatalogItemURL}}> {{.CatalogItemName}}</a> with following error: {{.Message}}

CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_UNSUBSCRIBEFAILED_SUBJECT=Custom Subscription Removal Failed Notification
CENTRAL_SUBSCRIPTIONS_NOTIFICATIONS_SMTP_UNSUBSCRIBEFAILED_BODY=Could not unsubscribe to Catalog Item=<a href= {{.CatalogItemURL}}> {{.CatalogItemName}}</a> with following error: {{.Message}}

# logging
LOG_LEVEL=info
LOG_OUTPUT=stdout
LOG_FILE_PATH=logs
LOG_MASKEDVALUES=keyword1, keyword2, keyword3
```

### Running the Discovery Agent

Open a shell and run one of the following commands to start your agent:

#### Execute binary Discovery Agent in Foreground

Open a shell and run the following command to start your agent:

```shell
cd /home/APIC-agents
./discovery_agent --envFile ./da_env_vars.env
{"level":"info","msg":"Starting Discovery agent for V7 APIGateway (-)","time":"2020-07-06T02:56:20-07:00"}
{"level":"info","msg":"Services are Ready","time":"2020-07-06T02:56:22-07:00"}
{"level":"info","msg":"Found new frontend proxy: EMR-System-Surgery","time":"2020-07-06T02:56:22-07:00"}
{"level":"info","msg":"Found new frontend proxy: Security-HIPAA-Control","time":"2020-07-06T02:56:22-07:00"}
...
```

To stop your binary agent, press Ctrl+C within the shell.

#### Execute binary Discovery Agent in Background

When executing in the background, it is best to save your logging to a file rather than the console output. See [Customizing logging variables](#customizing-discovery-agent-logging-variables) above.

Open a shell and run the following command to start your agent:

```shell
cd /home/APIC-agents
./discovery_agent --envFile /path/to/da_env_vars.env &
[1] 13186
```

Notice that the line after the execution returns the PID (Process Identifier).

Run the following commands to kill the PID and stop your agent:

```shell
# to find the PID, if you do not know it
ps -ef | grep discovery_agent
ubuntu     13186    4615 16 13:37 pts/1    00:00:02 ./bin/discovery_agent

# to stop the PID
kill 13186
```

#### Execute Discovery Agent as a Service

The agent can be installed as a Linux service with systemd. The following commands will help you utilize the service. These commands install the service abilities and must be run as a root user.

When running as a service, it is best to save your logging to a file rather than the console output. See [Customizing logging variables](#customizing-discovery-agent-logging-variables) above.

**`install`** - To install the service and have it execute as user axway and group axway:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service install -u axway -g axway --envFile /path/to/da_env_file.env
  ```

{{< alert title="Note" color="primary" >}}
If you are not in the agent directory while installing the service, it is mandatory to add `--pathConfig /home/APIC-agents` to the previous command. Otherwise, pathConfig will be automatically set with current directory.

For the service to start correctly, ensure that the variables `CENTRAL_AUTH_PUBLICKEY` and `CENTRAL_AUTH_PRIVATEKEY` are referencing an absolute path to the file.
{{< /alert >}}

**`update`** - The service definition may need to be updated for the following reasons:

* A change to the user or group to execute the agent as
* A change in the path to the configuration or environment variable files
* Service definition change between agent versions

  To update the service definition and have the agent execute as user axway and group axway:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service update -u axway -g axway --envFile /path/to/da_env_file.env
  ```

{{< alert title="Note" color="primary" >}}
When using the update command, the current service definition will be removed and a new one will be created.  Therefore, it is required to supply all of the necessary values, such as the user and group arguments.
{{< /alert >}}

**`start`** - To start the service:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service start
  ```

**`logs`** - To get all logs for the service, since the machine last booted:

  ```shell
  cd /home/APIC-agents
  ./discovery_agent service logs
  ```

**`stop`** - To stop the service:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service stop
  ```

**`enable`** - To enable the service to start when the machine starts:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service enable
  ```

**`name`** - To get the name of the service:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service name
  ```

**`remove`** - To uninstall the service from the machine:

  ```shell
  cd /home/APIC-agents
  sudo ./discovery_agent service stop   # to ensure it is not running
  sudo ./discovery_agent service remove
  ```

#### Verify Discovery Agent is running

To verify if the agent is up and running, open a shell and run:

```shell
cd /home/APIC-agents
./discovery_agent --envFile /path/to/da_env_vars.env --status

{
  "name"="discovery_agent",
  "version"="-",
  "status"="OK",
  "statusChecks"={
    "apimanager"={
      "name"="API Manager",
      "endpoint"="apimanager",
      "status"={
        "result"="OK"
      }
    },
    "central"={
      "name"="Amplify Central",
      "endpoint"="central",
      "status"={
        "result"="OK"
      }
    }
  }
}
```

#### Run the Dockerized Discovery Agent

1. Copy the `private_key.pem` and `public_key.pem` files that were originally created when you set up your Service Account to a keys directory. Make sure the directory is located on the machine being used for deployment.
2. Start the Docker Discovery Agent pointing to the `da_env_vars.env` file and the keys directory. `pwd` relates to the local directory where the docker command is run. For Windows, the absolute path is preferred.

   ```shell
   docker run --env-file ./da_env_vars.env -v <pwd>/keys:/keys axway.jfrog.io/ampc-public-docker-release/agent/v7-discovery-agent:{agentVersion}
   ```

3. Run the following health check command to ensure the agent is up and running:

   ```shell
   docker inspect --format='{{json .State.Health}}' <container>
   ```

## Traceability Agent

The Traceability Agent is used to prepare the transaction events that are sent to Amplify platform. Each time an API is called by a consumer, an event (summary + detail) is sent to Amplify Central and is visible in Business Insights.

The binary agent can run in the following mode:

* Default: With a yaml configuration file having the same name as the agent binary - `traceability_agent.yml`. Some values (Central url / authentication url) are defaulted to avoid mistake and will not be visible in the provided traceability_agent.yml file.
* **Recommended**: With an environment variable file `ta_env_vars.env`. All values in the `traceability_agent.yml` file can be overridden with environment variables. Those environment variables can be stored in a single file and this file can be located anywhere (use --envFile flag in the agent command line to access it=`./traceability_agent --envFile /home/config/ta_env_vars.env`). This makes it easy to update the agent (binary/yaml) without loosing the agent configuration. All environment variables are described in [Traceability Agent variables](/docs/connect_manage_environ/connect_api_manager/agent-variables/) section.

The containerized agent can run in the following mode:

* With an environment variables configuration file, `ta_env_vars.env`, supplied as a command line argument when running the Docker image.

### Installing the Traceability Agent

#### To install the binary Traceability Agent

**Step 1**: Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then replace `{agentVersion}` with the current agent release in following sections.

**Step 2**: Download the current version of the zip file from the Axway public repository using the following command:

```shell
curl -L "https://axway.jfrog.io/artifactory/ampc-public-generic-release/v7-agents/v7_traceability_agent/{agentVersion}/traceability_agent-{agentVersion}.zip" -o traceability_agent-{agentVersion}.zip
```

**Step 3**: Unzip the file traceability_agent-{agentVersion}.zip to get the agent binary (traceability_agent) and a template configuration file (traceability_agent.yml):

```shell
unzip traceability_agent-{agentVersion}.zip
```

**Step 4**: Copy those 2 files into a folder (/home/APIC-agents for instance) on the machine where the API Manager environment is located.

**Step 5**: If not done yet, move the `private_key.pem` and `public_key.pem` files that were originally created when you set up your Service Account to the agent directory (APIC-agents). Note that the `public_key` comes from Steps 3 or 4 of [Create a Service Account](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis), depending on whether you choose to use the `der` format.

#### To install the Dockerized Traceability Agent

Create your Traceability Agent environment file, `ta_env_vars.env`. See [Traceability Agent variables](/docs/connect_manage_environ/connect_api_manager/agent-variables/) for a reference to variable descriptions.
After customizing all the sections, your `ta_env_vars.env` file should look like this example file:

```shell
# API MANAGER connectivity
APIMANAGER_HOST=<HOST>
APIMANAGER_AUTH_USERNAME=<USER>
APIMANAGER_AUTH_PASSWORD=<PASSWORD>

# API GATEWAY connectivity
APIGATEWAY_HOST=<HOST>
APIGATEWAY_AUTH_USERNAME=<USER>
APIGATEWAY_AUTH_PASSWORD=<PASSWORD>
# Uncomment this value if APIM is installed in a Docker environment as headers are not accessible in this configuration.
#APIGATEWAY_GETHEADERS=false

# Amplify connectivity
CENTRAL_ORGANIZATIONID=<ORGANIZATIONID>
CENTRAL_TEAM=<TEAM>
CENTRAL_AUTH_CLIENTID=<CLIENTID, ie. DOSA_12345...>
CENTRAL_ENVIRONMENT=<Environment>
```

* The value for *team* can be found in [Amplify Central > Access > Team Assets](https://apicentral.axway.com/access/teams/).
* The value for *organizationID* can be found in Amplify Central Platform > Organization.
* The value for *clientId* can be found in Service Account. See [Create a service account](/docs/integrate_with_central/cli_central/cli_install/#authorize-your-cli-to-use-the-amplify-central-apis).

Find the current agent release in the [agent release note](/docs/amplify_relnotes). Then replace `{agentVersion}` with the current agent release in following sections.

Pull the Docker image of the Traceability Agent:

```shell
docker pull axway.jfrog.io/ampc-public-docker-release/agent/v7-traceability-agent:{agentVersion}
```

### Customizing the Traceability Agent environment variable file

The `ta_env_vars.env` configuration file contain six sections to customize: the beat input, API Manager connectivity, API Gateway connectivity, central connectivity, output ingestion service and logging.

#### Customizing Traceability Agent beat input variables

This section describes where the API Gateway logs are located on the machine so the beat can read them.

The agent can work either with the Gateway event logs (**default**) or the Gateway open traffic log. To configure the open traffic log from the Axway Gateway, you must turn it on using Policy Studio. Refer to this [page](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apigtw_admin/admin_open_logging/index.html) for more information.

##### Sourcing Gateway traffic from event log file(s)

This section describes how to use Gateway event logs for traceability reporting.

`EVENT_LOG_INPUT`: Used to turn on or off the event log input for the Traceability Agent. Defaulted is `true`, set to false when using [open traffic](#sourcing-gateway-traffic-from-open-traffic-file-s).
`EVENT_LOG_PATHS`: List all API Gateway event log files (absolute path) the beat will listen to. It could be a single file if there is only one Gateway installed on the machine, or multiple files if several Gateways are installed on the same machine.

Single Gateway - explicit file name:

```shell
EVENT_LOG_PATHS=<API GATEWAY INSTALL DIRECTORY>/apigateway/events/group-2_instance-1.log
```

Multiple Gateways on the same machine - explicit file names:

```shell
EVENT_LOG_PATHS=<API GATEWAY INSTALL DIRECTORY>/apigateway/events/group-2_instance-1.log <API GATEWAY INSTALL DIRECTORY>/apigateway/events/group-2_instance-3.log <API GATEWAY INSTALL DIRECTORY>/apigateway/events/group-2_instance-7.log
```

Multiple Gateways on the same machine - file path with wildcard:

```shell
# Input files
EVENT_LOG_PATHS=<API GATEWAY INSTALL DIRECTORY>/apigateway/events/group-2_instance-?.log
```

##### Sourcing Gateway traffic from open traffic file(s)

This section describes how to use API Gateway open traffic logs for traceability reporting, rather than the default event log configuration.

`OPENTRAFFIC_LOG_INPUT`: Used to turn on or off the open traffic log input for the Traceability Agent. Default is `false`. Set `EVENT_LOG_INPUT` to false when using this.
`OPENTRAFFIC_LOG_PATHS`: List all API Gateway open traffic log files (absolute path) the beat will listen to. It could be a single file if there is only one Gateway installed on the machine, or multiple files if several Gateways are installed on the same machine.

Single Gateway handling log rotation - file path with wildcard:

```shell
# sample configuration for Gateway standard installation: 
EVENT_LOG_INPUT=false
OPENTRAFFIC_LOG_INPUT=true
OPENTRAFFIC_LOG_PATHS=<API GATEWAY INSTALL DIRECTORY>/apigateway/logs/opentraffic/group-*_instance-*.log
```

```shell
# sample configuration for Gateway EMT installation: 
EVENT_LOG_INPUT=false
OPENTRAFFIC_LOG_INPUT=true
OPENTRAFFIC_LOG_PATHS=/events/DefaultGroup_*.log
```

{{< alert title="Warning" color="warning" >}}Be careful when entering the file name in `OPENTRAFFIC_LOG_PATHS` variable, as based on the Gateway deployment (standard VS EMT mode). The default name **group-\*_instance-\*.log** might not be accurate if any customization occurred!

When using the open traffic logs, it is not required to configure the Gateway connectivity (`APIGATEWAY_*` variables), as all information the Traceability Agent needs to report is present in the open traffic log.
{{< /alert >}}

#### Customizing Traceability Agent API Manager connectivity variables

This section is exactly the same as the [Discovery Agent - API Manager](/docs/connect_manage_environ/connect_api_manager/gateway-administation/#customizing-discovery-agent-api-manager-connectivity-variables).

Once all data is gathered, this section should look like:

```shell
# API Manager connectivity
APIMANAGER_HOST=localhost
APIMANAGER_PORT=8075
APIMANAGER_AUTH_USERNAME=apiManagerUser
APIMANAGER_AUTH_PASSWORD=apiManagerUserPassword
```

#### Customizing Traceability Agent API Gateway connectivity variables

This section helps the agent to collect the request/response headers from the API Gateway system.  This is not needed or used when `OPENTRAFFIC_LOG_INPUT` is true.

{{< alert title="Note" color="primary" >}}When APIM is installed in a Docker environment, request/response headers will not be available for the Traceability Agent. Set `APIGATEWAY_HEADERS=false` only in this section.{{< /alert >}}

`APIGATEWAY_GETHEADERS`: Tells the agent to  call the API Gateway API to get additional transaction details (headers). Default value is **true**. If false, API Gateway config does not need to be set and no headers will be sent to Amplify Central.

`APIGATEWAY_HOST`: The host that Axway API Gateway is running on. Default value is **localhost**.

`APIGATEWAY_PORT`: The port that Axway API Gateway is listening on. Default value is **8090**.

`APIGATEWAY_POLLINTERVAL`: The frequency in which the agent polls the logs in us, ms, s, m, h. Default value is **1m**.

`APIGATEWAY_SENDALLTRAFFIC`: Used to determine whether the Traceability Agent should send all traffic to be reported. When set to **false**, only discovered APIs will be reported. Default value is **true**.

`APIGATEWAY_AUTH_USERNAME`: An Axway API Gateway username with the "API Gateway operator" role.

`APIGATEWAY_AUTH_PASSWORD`: The Axway API Gateway username password in clear text.

Security connection settings: By default, for connecting to API Gateway, the agent uses TLS 1.2 with a predefined list of cipher suites. Refer to [Administer agent security](/docs/connect_manage_environ/connected_agent_common_reference/agent_security/) section for changing this behavior.

Once all data is gathered, this section should look like:

```shell
# API Gateway connectivity
APIGATEWAY_HOST=localhost
APIGATEWAY_PORT=8090
APIGATEWAY_AUTH_USERNAME=myApiGatewayOperatorUser
APIGATEWAY_AUTH_PASSWORD=myApiGatewayOperatorUserPassword
APIGATEWAY_SENDALLTRAFFIC=false
#APIGATEWAY_GETHEADERS=true 
#APIGATEWAY_POLLINTERVAL
```

#### Customizing Traceability Agent Central connectivity variables

This section connects the agent to Amplify Central.
This section is exactly the same as the [Discovery Agent - Central connectivity](/docs/connect_manage_environ/connect_api_manager/gateway-administation/#customizing-discovery-agent-central-connectivity-variables).

Once all data is gathered, the variable list should look like:

```shell
# Central connectivity
#CENTRAL_URL=https://apicentral.axway.com
CENTRAL_TEAM=Dev
CENTRAL_ORGANIZATIONID=68794y2
CENTRAL_ENVIRONMENT=my-v7-env
#CENTRAL_APISERVERVERSION=v1alpha1
#CENTRAL_MODE=publishToEnvironmmentAndCatalog
#CENTRAL_AUTH_URL=https://login.axway.com/auth
#CENTRAL_AUTH_REALM=Broker
CENTRAL_AUTH_CLIENTID=DOSA_66743...
CENTRAL_AUTH_PRIVATEKEY=/home/APIC-agents/private_key.pem
CENTRAL_AUTH_PUBLICKEY=/home/APIC-agents/public_key.pem
#CENTRAL_AUTH_KEYPASSWORD:
#CENTRAL_AUTH_TIMEOUT=10s
```

#### Customizing Traceability Agent output ingestion service variables

This section describes where the logs should be sent on Amplify Central.

`TRACEABILITY_HOST`: The host and port of the ingestion service to forward the transaction log entries. Default value is **ingestion.datasearch.axway.com:5044**.

`TRACEABILITY_PROTOCOL`: The protocol (https or tcp) to be used for communicating with ingestion service. Default value is **tcp**.

`TRACEABILITY_PROXYURL`: The socks5 or http URL of the proxy server for ingestion service (**socks5://username:password@hostname:port**) to use when the API Management eco-system is not allowed to access the internet world where Amplify Central is installed. **username** and **password** are optional and can be omitted if not required by the proxy configuration. Leaving this value empty means that no proxy will be used to connect to Amplify Central ingestion service.

`TRACEABILITY_COMPRESSIONLEVEL`: The gzip compression level for the output event. Default value is **3**.

`TRACEABILITY_BULKMAXSIZE`: Maximum number of events to bulk in a single ingestion request. Default value is **100**.

`TRACEABILITY_TIMEOUT`: Time to wait for ingestion response. Default value is **300s**.

`TRACEABILITY_WORKER`: The number of workers in the Traceability agent making connections to the TRACEABILITY_HOST. It is recommended to change this for high volume machine. Default value is **2**.

Security connection settings: By default, for connecting to API Gateway, the agent uses TLS 1.2 with a predefined list of cipher suites. Refer to [Administer agent security](/docs/connect_manage_environ/connected_agent_common_reference/agent_security/) section for changing this behavior.

Once all data is gathered, the section should look like this if you do not use a proxy:

```shell
# Send output to Central Database
TRACEABILITY_HOST=ingestion.datasearch.axway.com:5044
TRACEABILITY_PROTOCOL=tcp
#TRACEABILITY_PROXYURL=socks5://username:password@hostname:port
#TRACEABILITY_COMPRESSIONLEVEL=3
#TRACEABILITY_BULKMAXSIZE=100
#TRACEABILITY_TIMEOUT=300s
#TRACEABILITY_WORKER=2
```

#### Customizing Traceability Agent beat queuing section variables

The queue section defines the internal Filebeat queue to store events before publishing them. The queue is responsible for buffering and combining events into batches that can be consumed by the outputs. The outputs use bulk operations to send a batch of events in one transaction.

`QUEUE_MEM_EVENTS`: Number of events the queue can store (2048 by default).

`QUEUE_MEM_FLUSH_MINEVENTS`: Minimum number of events required for publishing. If this value is set to 0, the output starts publishing events without additional waiting times. Otherwise, the output must wait for more events to become available (100 by default).

`QUEUE_MEM_FLUSH_TIMEOUT`: Maximum wait time for `QUEUE_MEM_FLUSH_MINEVENTS` to be fulfilled (1 second by default). If set to 0s, events are immediately available for consumption.

Once all data is gathered, this section should look like:

```shell
#QUEUE_MEM_EVENTS=2048
#QUEUE_MEM_FLUSH_MINEVENTS=100
#QUEUE_MEM_FLUSH_TIMEOUT=1s
```

#### Customizing Traceability Agent logging variables

The log section defines how the agent manages its logs. This section is similar to the one defined for the [Discovery Agent](/docs/connect_manage_environ/connect_api_manager/gateway-administation/#customizing-discovery-agent-logging-variables).

Once all data is gathered, this section should look like this for standard output logging:

```shell
LOG_LEVEL=info
LOG_OUTPUT=stdout
LOG_FILE_PATH=logs
LOG_FILE_NAME=traceability_agent.log
```

#### Validating your Traceability Agent configuration file

After customizing all variables, your `ta_env_vars.env` file should look like:

```shell
# Input files
EVENT_LOG_PATHS=<API GATEWAY INSTALL DIRECTORY>/apigateway/events/group-2_instance-?.log

# API Manager connectivity
APIMANAGER_HOST=localhost
APIMANAGER_PORT=8075
APIMANAGER_AUTH_USERNAME=apiManagerUser
APIMANAGER_AUTH_PASSWORD=apiManagerUserPassword

# API Gateway connectivity
APIGATEWAY_HOST=localhost
APIGATEWAY_PORT=8090
APIGATEWAY_AUTH_USERNAME=myApiGatewayOperatorUser
APIGATEWAY_AUTH_PASSWORD=myApiGatewayOperatorUserPassword
APIGATEWAY_SENDALLTRAFFIC=true
# Uncomment this value if APIM is installed in a Docker environment as headers are not accessible in this configuration.
#APIGATEWAY_GETHEADERS=false
#APIGATEWAY_POLLINTERVAL

# Central connectivity
#CENTRAL_URL=https://apicentral.axway.com
CENTRAL_TEAM=Dev
CENTRAL_ORGANIZATIONID=68794y2
CENTRAL_ENVIRONMENT=my-v7-env
#CENTRAL_APISERVERVERSION=v1alpha1
#CENTRAL_MODE=publishToEnvironmmentAndCatalog
#CENTRAL_AUTH_URL=https://login.axway.com/auth
#CENTRAL_AUTH_REALM=Broker
CENTRAL_AUTH_CLIENTID=DOSA_66743...
CENTRAL_AUTH_PRIVATEKEY=/home/APIC-agents/private_key.pem
CENTRAL_AUTH_PUBLICKEY=/home/APIC-agents/public_key.pem
#CENTRAL_AUTH_KEYPASSWORD:
#CENTRAL_AUTH_TIMEOUT=10s

# Send output to Central Database
TRACEABILITY_HOST=ingestion.datasearch.axway.com:5044
TRACEABILITY_PROTOCOL=tcp
#TRACEABILITY_PROXYURL=socks5://username:password@hostname:port
#TRACEABILITY_COMPRESSIONLEVEL=3
#TRACEABILITY_BULKMAXSIZE=100
#TRACEABILITY_TIMEOUT=300s

#logging
LOG_LEVEL=info
LOG_OUTPUT=stdout
LOG_FILE_PATH=logs
LOG_FILE_NAME=traceability_agent.log
```

### Running the binary Traceability Agent

Open a shell and run one of the following commands to start your agent:

#### Execute binary Traceability Agent in Foreground

Open a shell and run the following command to start your agent:

```shell
cd /home/APIC-agents
./traceability_agent --envFile ta_env_vars.env
```

To stop your agent, press Ctrl+C within the shell.

#### Execute binary Traceability Agent in Background

When executing in the background, it is best to save your logging to a file rather than the console output. See [Customizing logging variables](#customizing-traceability-agent-logging-variables) above.

Open a shell and run the following command to start your agent:

```shell
cd /home/APIC-agents
./traceability_agent --envFile ta_env_vars.env &
[1] 13186
```

Notice that the line after the execution returns the PID (Process Identifier).

Run the following commands to kill the PID and stop your agent:

```shell
# to find the PID, if you do not know it
ps -ef | grep traceability_agent
ubuntu     13186    4615 16 13:37 pts/1    00:00:02 ./bin/traceability_agent

# to stop the PID
kill 13186
```

#### Execute binary Traceability Agent as a Service

The agent can be installed as a Linux service, with systemd. The following commands will help you utilize the service. These commands install the service abilities and must be run as a root user.

When running as a service, it is best to save your logging to a file rather than the console output. See [Customizing logging variables](#customizing-traceability-agent-logging-variables) above.

**`install`** - To install the service and have it execute as user axway and group axway:

  ```shell
  cd /home/APIC-agents
  sudo ./traceability_agent service install -u axway -g axway --envFile /path/to/ta_env_file.env
  ```

{{< alert title="Note" color="primary" >}}
If you are not in the agent directory while installing the service, it is mandatory to add `--pathConfig /home/APIC-agents` to the previous command. Otherwise, pathConfig will be automatically set with current directory

For the service to start correctly, ensure that the variable `CENTRAL_AUTH_PUBLICKEY` and `CENTRAL_AUTH_PRIVATEKEY` are referencing an absolute path to the file.
{{< /alert >}}

**`update`** - The service definition may need to be updated for the following reasons:

* A change to the user or group to execute the agent as
* A change in the path to the configuration or environment variable files
* Service definition change between agent versions

To update the service definition and have the agent execute as user axway and group axway:

  ```shell
  cd /home/APIC-agents
  sudo ./traceability_agent service update -u axway -g axway --envFile /path/to/ta_env_file.env
  ```

{{< alert title="Note" color="primary" >}}
When using the update command, the current service definition will be removed and a new one will be created. Therefore, it is required to supply all of the necessary values, such as the user and group arguments.
{{< /alert >}}

**`start`** - To start the service:

  ```shell
  cd /home/APIC-agents
  sudo ./traceability_agent service start
  ```

**`logs`** - To get all logs for the service, since the machine last booted:

  ```shell
  cd /home/APIC-agents
  ./traceability_agent service logs
  ```

**`stop`** - To stop the service:

  ```shell
  cd /home/APIC-agents
  sudo ./traceability_agent service stop
  ```

**`enable`** - To enable the service to start when the machine starts:

  ```shell
  cd /home/APIC-agents
  sudo ./traceability_agent service enable
  ```

**`name`** - To get the name of the service:

  ```shell
  cd /home/APIC-agents
  sudo ./traceability_agent service name
  ```

**`remove`** - To uninstall the service from the machine:

  ```shell
  cd /home/APIC-agents
  sudo ./traceability_agent service stop   # to ensure it is not running
  sudo ./traceability_agent service remove
  ```

#### Verify binary Traceability Agent is Running

To verify if the agent is up and running, open a shell command and run:

```shell
cd /home/APIC-agents
./traceability_agent status
```

##### Run the Dockerized Traceability Agent

See "To install the Dockerized Discovery Agent" section above for the `ta_env_vars.env` configuration.

1. Copy the `private_key.pem` and `public_key.pem` files that were originally created when you set up your Service Account to a keys directory. Make sure the directory is located on the machine being used for deployment.
2. Start the Traceability Agent pointing to the `ta_env_vars.env` file, `keys`, logging `events`, and the usage metrics `data` directory. `pwd` relates to the local directory where the docker command is run. For Windows, the absolute path is preferred.

   ```shell
   docker run --env-file ./ta_env_vars.env -v <pwd>/keys:/keys -v <pwd>/events:/events -v <pwd>/data:/data axway.jfrog.io/ampc-public-docker-release/agent/v7-traceability:{agentVersion}
   ```

   * See [Create and start API Gateway Docker container](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_installation/apigw_containers/docker_script_gwimage/index.html#mount-volumes-to-persist-logs-outside-the-api-gateway-container) for more  information regarding the persistent API Gateway trace and event logs to a directory on your host machine.
   * Run the following health check command to ensure the agent is up and running:

   ```shell
   docker inspect --format='{{json .State.Health}}' <container>
   ```
