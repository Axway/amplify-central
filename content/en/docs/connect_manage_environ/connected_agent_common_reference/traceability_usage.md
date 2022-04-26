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

Learn how to install and set up the Traceability Agent, using either the online or offline mode, to report the Gateway usage data to Amplify platform. Gateway usage data counts all API calls going through the Gateway.

* Online mode - Automatic (connected): The agent produces the report and sends it to the Amplify platform at regular intervals
* Offline mode - Manual (offline): The agent produces the report locally, but it must be manually uploaded to the Amplify platform

## Traceability Agent overview

The Traceability Agent is attached to a Gateway and monitors the traffic crossing it. The collected traffic is reported to Amplify platform in different events:

* **Usage** event: reports the total number of API calls during a period of time. This feature cannot be inactivated.
* **Transaction** event: reports the transaction summary (API name, duration, status), and the transaction details (request/response headers from the frontend and backend of the API). This feature is optional and not required to report Gateway usage.

## Set up usage reporting in online mode

Use the following instructions to set up usage reporting in online mode.

### Network prerequisites for online mode

All outbound traffic is sent over SSL via TCP / UDP.

Open the following ports so that agents can communicate to the Amplify platform:

| Region | Host                       | IP             | port | Protocol | data                                 |
| ------ | -------------------------- | -------------- | ---- | -------- | ------------------------------------ |
|        |                            |                |      |          |                                      |
| EU/US  | login.axway.com            | 52.58.132.2    | 443  | HTTPS    | Platform authentication              |
|        |                            | 52.29.4.35     |      |          |                                      |
|        |                            | 54.93.140.145  |      |          |                                      |
|        |                            |                |      |          |                                      |
| US     | apicentral.axway.com       | 3.94.245.118   | 443  | HTTPS    | API definitions, Subscription info   |
|        |                            | 54.208.199.251 |      |          |                                      |
|        |                            | 3.212.78.217   |      |          |                                      |
|        |                            |                |      |          |                                      |
| EU     | central.eu-fr.axway.com    | 52.47.84.198   | 443  | HTTPS    | API definitions, Subscription info   |
|        |                            | 13.36.25.69    |      |          |                                      |
|        |                            | 35.181.21.87   |      |          |                                      |
|        |                            |                |      |          |                                      |
| EU/US  | lighthouse.admin.axway.com |                | 443  | HTTPS    | API usage event for online mode only |
|        |                            |                |      |          |                                      |

{{< alert title="Note" color="primary" >}}
*Region* column represents the region where your Amplify organization is deployed. EU means deployed in European data center and US meaning deployed in US data center. You must use the corresponding *Host*/*Port* for your agents to operate correctly.
{{< /alert >}}

{{< alert title="Note" color="primary" >}}
OPTIONAL - To monitor transactions additional ports need to be opened. They are not mentioned in the table above and can be found in the Network Traffic section of the documentation of each agent.
{{< /alert >}}

### Install Traceability Agent for online mode

To report usage to Amplify platform, the Traceability Agent must be configured, installed, and connected to the Gateway to be monitored.

To configure the agent, Amplify platform connectivity is required and can be performed from any machine having the correct Amplify platform access (refer to above URLs and IPs). Once configured, the agent and its configuration must be copied to the Gateway machine so that it can access the event logs or open traffic logs to start collecting the usage.

This procedure will help you to configure and install the Traceability Agent:

Step 1. Install Axway CLI and Axway Central CLI:

* Install Axway CLI: `npm install -g axway`
* Install Axway Central CLI: `axway pm install @axway/axway-central-cli`
* Download and install OpenSSL, if not already present on the machine. This will help you generate a public/private key pair to secure the connection between Traceability Agent and Amplify platform.

   More information regarding the CLI installation is available [here](/docs/integrate_with_central/cli_central/cli_install/).

Step 2. Authorize your CLI to use the Amplify Central APIs: `axway auth login`

Step 3. Create an empty directory and go in that directory to run the next command.

Step 4. Configure the Traceability Agent using Axway Central CLI: `axway central install agents`

* For usage tracking, only the Traceability Agent is required. API Gateway Manager access is not required.

```shell
? Do you want to use API Manager with the API Gateway:  No
? Select the type of agent(s) you want to install:
> Traceability
  Traceability offline mode
```

* Answer ALL questions when prompted (environment / team / connectivity with Gateway) to correctly configure.

Step 5. Install the agent.

After all questions are answered, the Axway Central CLI will create an Amplify platform environment that will host the usage report, as well as local files (`traceability_agent` binary file / `ta_env_vars.env` file containing the agent configuration / the public-private key to manage the communication from the agent to the Platform), based on the provided answers.

{{< alert title="Disabling transaction report" color="warning" >}}If you plan to use the Traceability Agent for logging usage only, set `TRACEABILITY_SAMPLING_PERCENTAGE=0` and `TRACEABILITY_SAMPLING_REPORTALLERRORS=false` in the `ta_env_vars.env` file produced by the CLI to disable the transaction report.{{< /alert >}}

The local files must be copied to the Gateway machine, as mentioned in the CLI output.

After all files are copied, start Traceability Agent: `./traceability_agent ./ta_env_vars.env`

For more information regarding agents' installation, see [Axway Gateway agents](/docs/connect_manage_environ/connect_api_manager/deploy-your-agents-with-amplify-cli), [AWS Gateway agents](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-with-amplify-cli), [Azure Gateway agent](/docs/connect_manage_environ/connect_azure_gateway/deploy-your-agents-with-amplify-cli) and [Istio Gateway agents](/docs/connect_manage_environ/mesh_management/deploy-your-agents-with-the-axway-cli).

### Reporting Gateway usage event - automatic reporting for online mode

You can view the environment in **Amplify Central > Topology** once the Traceability Agent is installed. The same environment is visible in Amplify platform under the **Organization** menu.

Once Traceability Agent starts, it detects the Gateway traffic, and begins counting the transactions. The Traceability Agent sends the usage counter to the platform on a regular basis (default is 15 minutes).

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

If the Traceability Agent is stopped while there are remaining usage events to be sent, the report is saved on the disk where the Traceability Agent is located. The data will be sent to Amplify platform at the next Traceability Agent startup.

## Set up usage reporting in offline mode

Use the following instructions to set up usage reporting in offline mode.

### Install Traceability Agent for offline mode

To report usage to Amplify platform, the Traceability Agent must be configured, installed, and connected to the Gateway to be monitored.

To configure the agent, Amplify platform connectivity is required for creating the installables. This action can be performed from any machine that has the correct Amplify platform access (refer to above urls and IPs). The installables can be copied to a machine with no external connections and the agents can be used without connectivity to the Amplify platform. The Lighthouse URL is not required for this mode. Once configured, the agent and its configuration must be copied to the Gateway machine so that it can access the event logs or open traffic logs to start collecting the usage.

This procedure will help you to configure and install the traceability agent:

Step 1. Install Axway CLI and Axway Central CLI:

* Install Axway CLI: `npm install -g axway`
* Install Axway Central CLI: `axway pm install @axway/axway-central-cli`

Step 2. Authorize your CLI to use the Amplify Central APIs: `axway auth login`

Step 3. Create an empty directory and go in that directory to run the next command.

Step 4. Configure the Traceability Agent using Axway Central CLI: `axway central install agents`

* For usage tracking, only the Traceability Agent offline mode is required. API Gateway Manager access is not required.

```shell
? Do you want to use API Manager with the API Gateway:  No
? Select the type of agent(s) you want to install:
  Traceability
> Traceability offline mode
```

* Answer ALL questions when prompted (environment / team / connectivity with Gateway) to correctly configure the agent. By Default, the API Gateway and API Manager passwords are stored in cleartext in a configuration file in the agent installation folder. To secure your passwords, see [Administer Agent Security](/docs/connect_manage_environ/connected_agent_common_reference/agent_security/).

Step 5. Install the agent

After all questions are answered, the Axway Central CLI will create an Amplify platform environment that will host the usage report, as well as local files (`traceability_agent` binary file / `ta_env_vars.env` file containing the agent configuration), based on the provided answers.

The local files must be copied to the Gateway machine, as mentioned in the CLI output.

After all files are copied, start the Traceability Agent: `./traceability_agent ./ta_env_vars.env`

For more information regarding agents installation, see [Axway Gateway agents](/docs/connect_manage_environ/connect_api_manager/deploy-your-agents-with-amplify-cli), [AWS Gateway agents](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-with-amplify-cli), [Azure Gateway agent](/docs/connect_manage_environ/connect_azure_gateway/deploy-your-agents-with-amplify-cli) and [Istio Gateway agents](/docs/connect_manage_environ/mesh_management/deploy-your-agents-with-the-axway-cli).

### Reporting Gateway usage event - manual reporting for offline mode

You can view the environment in **Amplify Central > Topology** once the Traceability Agent is installed. The same environment is visible in Amplify platform under the **Organization** menu.

The offline report is generated every month and saved to the \[agent_dir]/data/reports directory as `YYYY_MM_DD_usage_report.json`.

When the agent restarts, any usage reports that had been previously generated are saved to a file in the reports directory and the agent starts a new report. If necessary, the agent will add an index to the usage report name (`YYYY_MM_DD_{INDEX}_usage_report.json`). The first usage in the new report contains all events that occurred while the agent was not running.

To visualize your reports in Amplify platform, you must upload the generated reports to the platform.

1. Log into platform.axway.com and navigate to **Organization**.
2. Open the Usage menu. Click **...**, located at the top right corner, and then click **Upload Usage**.
3. Select the file and validate your entry on the pop-up window.
4. Repeat these steps for all the reports the agent has generated in case of multiple files.

You can now view your data with the **Usage** menu. See the next section for more information.

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

In the case of high demand, Axway recommends turning off the trace event logging of the Gateway. In this situation, the Traceability Agent will not be able to monitor the transactions or report the corresponding traffic.

### AWS API Gateway

The current solution relies on AWS Simple Queue Service to collect traffic from Cloud Watch. However, there is a limit of 10 SQS messages per client connection that can be consumed at one time. As a workaround, you can increase the number of workers (i.e., consumer clients) using the `AWS_WORKERS` variable. Be aware that the number of workers is directly related to the network consumption -- the more you add, the more network connections are used.

### Azure API Gateway

Within Azure API Gateway, it is possible to activate the transaction sampling for Azure Monitoring (either at API level or for all APIs). Activating sampling will make the usage report inaccurate.
