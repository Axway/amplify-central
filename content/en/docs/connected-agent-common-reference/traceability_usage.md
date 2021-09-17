---
title: Use Traceability Agent to report Gateway usage
linkTitle: Use Traceability Agent to report Gateway usage
draft: false
weight: 10
description: Understand how the Traceability Agent reports the Gateway usage to
  Amplify platform.
---
## Before you start

* Make sure your entitlement is correctly set up, based on your Gateway (AWS / Axway v7 / Azure). Refer to your Axway CSM for more information.

## Objectives

Learn how to install and set up the Traceability Agent to automatically report the Gateway usage data to Amplify platform. Gateway usage data counts all API calls going through the Gateway.

## Traceability Agent overview

The Traceability Agent is attached to a Gateway and monitors the traffic crossing it. The collected traffic is reported to Amplify platform in different events:

* **Usage** event: reports the total number of API calls during a period of time. This feature cannot be inactivated.
* **Transaction** event: reports the transaction summary (API name, duration, status), and the transaction details (request/response headers from the frontend and backend of the API). If your API calls JMS endpoints, the JMS properties are also reported. To reduce the number of transactions sent to the platform, use the [sampling feature](/docs/connected-agent-common-reference/trace_sampling).

{{< alert title="Disabling transacation report" color="warning" >}}To use the Traceability Agent for logging usage only, set `TRACEABILITY_SAMPLING_PERCENTAGE=0` and `TRACEABILITY_SAMPLING_REPORTALLERRORS=false` in the `ta_env_vars.env` file to disable the transaction report. Restart the Traceability Agent to use the new configuration.{{< /alert >}}

## Network prerequisites

All outbound traffic is sent over SSL via TCP / UDP.

Open the following ports so that agents can communicate to the Amplify platform:

| Region | Host                                                                                      | IP             | port       | Protocol     | data                               |
|--------|-------------------------------------------------------------------------------------------|----------------|------------|--------------|------------------------------------|
|        |                                                                                           |                |            |              |                                    |
| EU/US  | login.axway.com                                                                           | 52.58.132.2    | 443        | HTTPS        | Platform authentication            |
|        |                                                                                           | 52.29.4.35     |            |              |                                    |
|        |                                                                                           | 54.93.140.145  |            |              |                                    |
|        |                                                                                           |                |            |              |                                    |
| US     | apicentral.axway.com                                                                      | 3.94.245.118   | 443        | HTTPS        | API definitions, Subscription info |
|        |                                                                                           | 54.208.199.251 |            |              |                                    |
|        |                                                                                           | 3.212.78.217   |            |              |                                    |
|        |                                                                                           | 52.202.95.208  |            |              |                                    |
|        |                                                                                           | 107.23.176.64  |            |              |                                    |
|        |                                                                                           | 3.225.16.120   |            |              |                                    |
|        |                                                                                           |                |            |              |                                    |
| EU     | central.eu-fr.axway.com                                                                   | 52.47.84.198   | 443        | HTTPS        | API definitions, Subscription info |
|        |                                                                                           | 13.36.25.69    |            |              |                                    |
|        |                                                                                           | 35.181.21.87   |            |              |                                    |
|        |                                                                                           | 13.36.2.143    |            |              |                                    |
|        |                                                                                           | 13.36.52.216   |            |              |                                    |
|        |                                                                                           | 15.236.7.112   |            |              |                                    |
|        |                                                                                           |                |            |              |                                    |
| EU/US  | lighthouse.admin.axway.com                                                                |                | 443        | HTTPS        | API usage event                    |
|        |                                                                                           |                |            |              |                                    |
| US     | ingestion.datasearch.axway.com                                                            | 54.225.171.111 | 5044 or 443 | TCP or HTTPS | API transaction event              |
|        |                                                                                           | 54.225.2.221   |            |              |                                    |
|        |                                                                                           | 54.146.97.250  |            |              |                                    |
|        |                                                                                           | 54.147.98.128  |            |              |                                    |
|        |                                                                                           | 52.206.193.184 |            |              |                                    |
|        |                                                                                           | 54.225.92.97   |            |              |                                    |
|        |                                                                                           |                |            |              |                                    |
| EU     | ingestion.visibility.eu-fr.axway.com                                                      | 15.236.125.123 | 5044 or 443 | TCP or HTTPS | API transaction event              |
|        |                                                                                           | 35.180.77.202  |            |              |                                    |
|        |                                                                                           | 13.36.27.97    |            |              |                                    |
|        |                                                                                           | 13.36.33.229   |            |              |                                    |

{{< alert title="Note" color="primary" >}}
_Region_ column represents the region where your Amplify organization is deployed. EU means deployed in European data center and US meaning deployed in US data center. You must use the corresponding _Host_/_Port_ for your agents to operate correctly.
{{< /alert >}}

## Install Traceability Agent

To report usage to Amplify platform, the traceability Agent must be installed and connected to the Gateway to be monitored:

1. Install Axway CLI and Axway Central CLI

   * Install Axway CLI: `npm install -g axway`
   * Install Axway Central CLI: `axway pm install @axway/axway-central-cli`
   * Download and install OpenSSL, if not already present on the machine. This will help you generate a public/private key pair to secure the connection between Traceability Agent and Amplify platform.

      More information regarding the CLI installation is available [here](/docs/cli_central/cli_install/)
2. Authorize your CLI to use the Amplify Central APIs: `axway auth login`
3. Install the Traceability Agent using Axway Central CLI: `axway central install agents`

   * For usage tracking, only the Traceability Agent is required.
   * Answer ALL questions when prompted (environment / team / connectivity with Gateway).
   * CLI creates appropriate resources in Amplify platform / local files based on the answers.
   * CLI output next steps: copy files on the Gateway machine / start the agent.

      For more information regarding agents installation, see [Axway Gateway agents](/docs/connect-api-manager/deploy-your-agents-with-amplify-cli), [AWS Gateway agents](/docs/connect-aws-gateway/deploy-your-agents-with-amplify-cli), [Azure Gateway agent](/docs/connect-azure-gateway/deploy-your-agents-with-amplify-cli).

## Reporting Gateway usage event

You can view the environment in **Amplify Central > Topology** once the Traceability Agent is installed. The same environment is visible in Amplify platform under the **Organization** menu.

Use of of the following methods to report usage from the Traceability Agent to the Amplify platform:

* Automatic (connected) - the agent produces the report and sends it to the Amplify platform at regular intervals
* Manual (offline) - the agent produces the report locally, but must be manually uploaded to the Amplify platform

### Automatic reporting

Once Traceability Agent starts, it detects the Gateway traffic, and begins counting the transactions. On a regular basis (default is 15 minutes), the Traceability Agent sends the usage counter to the platform.

To change the reporting interval, use the `CENTRAL_USAGEREPORTING_INTERVAL` variable with either a second, minute or hour notation:

```shell
# report every 5 minutes expressed in second unit
CENTRAL_USAGEREPORTING_INTERVAL=900s

# report every 5 minutes expressed in minute unit
CENTRAL_USAGEREPORTING_INTERVAL=15m

# report every hour expressed in hour unit
CENTRAL_USAGEREPORTING_INTERVAL=1h
```

If for any reason the usage report cannot be uploaded to Amplify platform, the data are kept in memory and will be pushed at the next trigger interval.

If the Traceability Agent is stopped while there are still remaining usage events to be sent, the report is saved on the disk where the Traceability Agent is located. The data will be sent to Amplify platform at the next Traceability Agent startup.

### Manual reporting

When offline usage reporting is on, `CENTRAL_USAGEREPORTING_OFFLINE=true` (default = false), the `CENTRAL_USAGEREPORTING_SCHEDULE` variable determines how often usage numbers are saved (default and minimum = "@hourly"). For additional cron schedules information, see [Scheduled jobs](https://github.com/Axway/agent-sdk/blob/main/pkg/jobs/README.md#scheduled-jobs). Note that offline ignores the `CENTRAL_USAGEREPORTING_INTERVAL` value that is only used for online reporting.

In addition to setting `CENTRAL_USAGEREPORTING_OFFLINE=true`, the `CENTRAL_ENVIRONMENTID` variable must be set.  The usage report requires a valid Environment ID and cannot retrieve it in Offline mode.  This can be retrieved with the axway cli, see [Retrieve a list of all available environments](/docs/cli_central/cli_environments#retrieve-a-list-of-all-available-environments).

The offline report is generated every month and saved to the [agent_dir]/data/reports directory as `YYYY_MM_DD_usage_report.json`.

When the agent restarts, any usage reports that had been previously generated are saved to a file in the reports directory and the agent starts a new report. If necessary, the agent will add an index to the usage report name (`YYYY_MM_DD_{INDEX}_usage_report.json`). The first usage in the new report contains all events that occurred while the agent was not running.

## View the usage data from Amplify platform

Based on the frequency you choose, the Traceability Agent reports to the platform the number of transactions that happen during each period. To view the data:

* Log into the platform, select the **Organization** menu:

![Usage data menu](/Images/central/connected_agent_common_reference/organization_menu.png)

* Select the **Usage** menu to view the usage data:

![Usage data menu](/Images/central/connected_agent_common_reference/usage_data_menu.png)

* Select a Usage data report tab:

  * **Monthly Usage** to visualize your monthly data. Filter either by month (to get a specific month's values), or products (if you have multiple product entitlements).
  * **Report History** to view and download the usage report history. Filter the data per reporting period and/or per file name, environment name or status.

![Usage report page](/Images/central/connected_agent_common_reference/usage_report_screen.png)

* Click **Download** to download a specific report.

## Known limitations

The following known limitations exist in the current implementation.

{{< alert title="Note" color="primary" >}}
The usage report is based on the transactions the Traceability Agent monitors. If the transactions are not provided by the Gateway, the usage report will be inaccurate.
{{< /alert >}}

### Axway API Gateway

In the case of high demand, Axway recommends to turn off the trace event logging of the Gateway. In this situation, the Traceability Agent will not be able to monitor the transactions or report the corresponding traffic.

### AWS API Gateway

The current solution relies on AWS Simple Queue Service to collect traffic from Cloud Watch. However, there is a limit of 10 SQS messages per client connection that can be consumed at one time. As a workaround, you can increase the number of workers (i.e., consumer clients) using the `AWS_WORKERS` variable. Be aware that the number of workers is directly related to the network consumption -- the more you add, the more network connections are used.

### Azure API Gateway

Within Azure API Gateway, it is possible to activate the transaction sampling for Azure Monitoring (either at API level or for all APIs). Activating sampling will make the usage report inaccurate.
