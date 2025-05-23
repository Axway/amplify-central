---
title: Use Traceability Agent to report gateway usage
linkTitle: Use Traceability Agent to report gateway usage
draft: false
weight: 10
---
The Traceability Agent reports the gateway usage to Amplify platform. Learn how to configure the Traceability Agent to report usage data.

## Before you start

* Make sure your entitlement is correctly set up, based on your gateway (AWS / Axway v7 / Azure). Refer to your Axway CSM for more information.

## Objectives

Learn how to install and set up the Traceability Agent, using either the online or offline mode, to report the gateway usage data to Amplify platform. Gateway usage data counts all API calls going through the gateway.

* Online mode - Automatic (connected): The agent produces the report and sends it to the Amplify platform at regular intervals
* Offline mode - Manual (offline): The agent produces the report locally, but it must be manually uploaded to the Amplify platform

## Traceability Agent overview

The On-premise Traceability Agent is attached to a gateway and monitors the traffic crossing it. The collected traffic is reported to Amplify platform in different events:

* **Transaction Metrics** event: reports the total number of API calls during a period of time. This feature cannot be deactivated.  The Traceability Agent sends the Transaction Metrics to the database storage for display on *Business Insights > API Health* (default is 1 hour). For more information on how to see an aggregate view of all transactions, see [Business Insights](/docs/get_actionable_insights/business_insights/).
* **Platform Usage** event: reports the total number of API calls during a period of time. This feature cannot be deactivated.  The Traceability Agent sends the Platform Usage counts to the database storage for display on *Organization > Usage* (default is daily). To clarify, the Platform Usage for a day is typically sent after a day has passed. This would make Platform Usage a lagging indicator compared to API Health by at most a whole day.
* **Transaction** event: reports the transaction summary (API name, duration, status), and the transaction details (request/response headers from the frontend and backend of the API). This feature is optional and not required to report gateway usage. The Transaction events are sent as soon as the Traceability Agent processes the transaction event logs.

The SaaS (Embedded) Traceability Service is attached to a gateway and monitors the traffic crossing it. The collected traffic is reported to Amplify platform in different events:

* **Transaction Metrics** event: reports the total number of API calls during a period of time. This feature cannot be deactivated. The Traceability Service sends the Transaction Metrics to the database storage for display on *Business Insights > API Health*. The default frequency is 30 minutes after the Traceability Service is enabled. For more information on how to see an aggregate view of all transactions, see [Business Insights](/docs/get_actionable_insights/business_insights/).
* **Platform Usage** event: reports the total number of API calls during a period of time. This feature cannot be deactivated. The Traceability Agent sends the Platform Usage counts to the database storage for display on *Organization > Usage* (default is daily after the Traceability Service is enabled). To clarify, the Platform Usage for a day is typically sent after a day has passed. This would make Platform Usage a lagging indicator compared to API Health by at most a whole day.
* **Transaction** event: These reports are only supported for the AWS Gateway SaaS (Embedded) Traceability Service. The reports include the transaction summary (API name, duration, status), and the transaction details (request/response headers from the frontend and backend of the API). This feature is optional and not required to report gateway usage. The Transaction events are sent as soon as the Traceability Service processes the transaction event logs.

## Set up usage reporting in online mode

Use the following instructions to set up usage reporting in online mode.

### Network prerequisites for online mode

All outbound traffic is sent over SSL via TCP / UDP.

Open the following ports so that agents can communicate to the Amplify platform:

| Region | Host                       | IP             | port | Protocol | data                                 |
| ------ | -------------------------- | -------------- | ---- | -------- | ------------------------------------ |
|        |                            |                |      |          |                                      |
| AP/EU/US | login.axway.com            | Dynamic    | 443  | HTTPS    | Platform authentication |
| US     | apicentral.axway.com       | 3.94.245.118   | 443  | HTTPS    | API definitions, Subscription info   |
|        |                            | 54.208.199.251 |      |          |                                      |
|        |                            | 3.212.78.217   |      |          |                                      |
|        |                            |                |      |          |                                      |
| EU     | central.eu-fr.axway.com    | 52.47.84.198   | 443  | HTTPS    | API definitions, Subscription info   |
|        |                            | 13.36.25.69    |      |          |                                      |
|        |                            | 35.181.21.87   |      |          |                                      |
|        |                            |                |      |          |                                      |
| AP     | central.ap-sg.axway.com    | 122.248.205.123 | 443  | HTTPS    | API definitions, Subscription info   |
|        |                            | 18.138.187.120  |      |          |                                      |
|        |                            | 52.220.146.36   |      |          |                                      |
|        |                            |                |      |          |                                      |
| AP/EU/US | platform.axway.com       | Dynamic        | 443  | HTTPS    | Usage metrics                                     |
|        |                            |                |      |          |                                      |

{{< alert title="Note" color="primary" >}}
*Region* column represents the region where your Amplify organization is deployed. EU means deployed in European data center, AP means deployed in Asia Pacific data center and US meaning deployed in US data center. You must use the corresponding *Host* / *Port* for your agents to operate correctly.
{{< /alert >}}

{{< alert title="Note" color="primary" >}}
OPTIONAL - To monitor transactions additional ports need to be opened. They are not mentioned in the table above and can be found in the Network Traffic section of the documentation of each agent.
{{< /alert >}}

### Install Traceability Agent for online mode

To report usage to Amplify platform, the Traceability Agent must be configured, installed, and connected to the gateway to be monitored.

To configure the agent, Amplify platform connectivity is required and can be performed from any machine having the correct Amplify platform access (refer to above URLs and IPs). Once configured, the agent and its configuration must be copied to the gateway machine so that it can access the event logs or open traffic logs to start collecting the usage.

This procedure will help you to configure and install the Traceability Agent:

Step 1. Install Axway CLI and Axway Central CLI:

* Install Axway CLI: `npm install -g axway`
* Install Axway Central CLI: `axway pm install @axway/axway-central-cli`
* Download and install OpenSSL, if not already present on the machine. This will help you generate a public/private key pair to secure the connection between Traceability Agent and Amplify platform.

   More information regarding the CLI installation is available [here](/docs/integrate_with_central/cli_central/cli_install/).

Step 2. Authorize your CLI to use the Amplify APIs: `axway auth login`

Step 3. Create an empty directory and go in that directory to run the next command.

Step 4. Configure the Traceability Agent using Axway Central CLI: `axway central install agents`

* For usage tracking, only the Traceability Agent is required. API Gateway Manager access is not required.

```shell
? Do you want to use API Manager with the API Gateway:  No
? Select the type of agent(s) you want to install:
> Traceability
  Traceability offline mode
```

* Answer ALL questions when prompted (environment / team / connectivity with gateway) to correctly configure.

Step 5. Install the agent.

After all questions are answered, the Axway Central CLI will create an Amplify platform environment that will host the usage report, as well as local files (`traceability_agent` binary file / `ta_env_vars.env` file containing the agent configuration / the public-private key to manage the communication from the agent to the Platform), based on the provided answers.

The local files must be copied to the gateway machine, as mentioned in the CLI output.

After all files are copied, start Traceability Agent: `./traceability_agent ./ta_env_vars.env`

For more information regarding agents' installation, see [Axway gateway agents](/docs/connect_manage_environ/connect_api_manager/deploy-your-agents-with-amplify-cli), [AWS Gateway agents](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-with-amplify-cli), [Azure Gateway agent](/docs/connect_manage_environ/connect_azure_gateway/deploy-your-agents-with-amplify-cli) and [Istio Gateway agents](/docs/connect_manage_environ/mesh_management/deploy-your-agents-with-the-axway-cli).

### Reporting Gateway Transaction Metrics event - automatic reporting for online mode

You can view the environment in *Amplify Engage > Topology > Environments* once the Traceability Agent is installed. The same environment is visible in Amplify platform under the **Business Insights -> API Health** menu.

Once Traceability Agent starts, it detects the gateway traffic, and begins counting the transactions. The Traceability Agent sends the Transaction Metrics to the platform on a regular basis (default is 1 hour).

To change the reporting interval for the On-premise Traceability Agent, use the `CENTRAL_METRICREPORTING_SCHEDULE` variable with cron expressions:

```shell
# report every hour
CENTRAL_METRICREPORTING_SCHEDULE=@hourly
```

If for any reason the Transaction Metrics report cannot be uploaded to Amplify platform, the data are kept in memory and will be pushed at the next trigger interval.

If the Traceability Agent is stopped while there are remaining usage events to be sent, the report is saved on the disk where the Traceability Agent is located. The data will be sent to Amplify platform at the next Traceability Agent startup.

### Reporting Gateway Platform Usage event - automatic reporting for online mode

You can view the environment in *Amplify Engage > Topology > Environments* once the Traceability Agent is installed. The same environment is visible in Amplify platform under *Organization > Usage*.

Once Traceability Agent starts, it detects the gateway traffic and begins counting the transactions. The Traceability Agent sends the Platform Usage metrics to the platform on a regular basis (default is daily).

To change the reporting interval for the On-premise Traceability Agent, use the `CENTRAL_USAGEREPORTING_SCHEDULE` variable with cron expressions:

```shell
# report every 60 minutes expressed in hourly value
CENTRAL_USAGEREPORTING_SCHEDULE=@hourly

# report every 24 hours expressed in daily value
CENTRAL_USAGEREPORTING_SCHEDULE=@daily

# report every 7 days expressed in weekly value
CENTRAL_USAGEREPORTING_SCHEDULE=@weekly
```

## Set up Transaction reporting in offline mode

Use the following instructions to set up usage reporting in offline mode.

### Install Traceability Agent for offline mode

To report usage to Amplify platform, the Traceability Agent must be configured, installed, and connected to the gateway to be monitored.

To configure the agent, Amplify platform connectivity is required for creating the installables. This action can be performed from any machine that has the correct Amplify platform access (refer to above urls and IPs). The installables can be copied to a machine with no external connections and the agents can be used without connectivity to the Amplify platform. Once configured, the agent and its configuration must be copied to the gateway machine so that it can access the event logs or open traffic logs to start collecting the usage.

This procedure will help you to configure and install the traceability agent:

Step 1. Install Axway CLI and Axway Central CLI:

* Install Axway CLI: `npm install -g axway`
* Install Axway Central CLI: `axway pm install @axway/axway-central-cli`

Step 2. Authorize your CLI to use the Amplify APIs: `axway auth login`

Step 3. Create an empty directory and go in that directory to run the next command.

Step 4. Configure the Traceability Agent using Axway Central CLI: `axway central install agents`

* For usage tracking, only the Traceability Agent offline mode is required. API Gateway Manager access is not required.

```shell
? Do you want to use API Manager with the API Gateway:  No
? Select the type of agent(s) you want to install:
  Traceability
> Traceability offline mode
```

* Answer ALL questions when prompted (environment / team / connectivity with gateway) to correctly configure the agent. By Default, the API Gateway and API Manager passwords are stored in cleartext in a configuration file in the agent installation folder. To secure your passwords, see [Administer Agent Security](/docs/connect_manage_environ/connected_agent_common_reference/agent_security/).

Step 5. Install the agent

After all questions are answered, the Axway Central CLI will create an Amplify platform environment that will host the usage report, as well as local files (`traceability_agent` binary file / `ta_env_vars.env` file containing the agent configuration), based on the provided answers.

The local files must be copied to the gateway machine, as mentioned in the CLI output.

After all files are copied, start the Traceability Agent: `./traceability_agent ./ta_env_vars.env`

For more information regarding agents installation, see [Axway gateway agents](/docs/connect_manage_environ/connect_api_manager/deploy-your-agents-with-amplify-cli), [AWS Gateway agents](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-with-amplify-cli), [Azure Gateway agent](/docs/connect_manage_environ/connect_azure_gateway/deploy-your-agents-with-amplify-cli) and [Istio Gateway agents](/docs/connect_manage_environ/mesh_management/deploy-your-agents-with-the-axway-cli).

### Reporting Gateway Usage event - manual reporting for offline mode

You can view the environment in *Amplify Engage > Topology > Environment* once the Traceability Agent is installed. The same environment is visible in Amplify platform under the **Organization** menu.

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
The usage report is based on the transactions the Traceability Agent monitors. If the transactions are not provided by the gateway, the usage report will be inaccurate.
{{< /alert >}}

### Axway API Gateway

In the case of high demand, Axway recommends turning off the trace event logging of the gateway. In this situation, the Traceability Agent will not be able to monitor the transactions or report the corresponding traffic.

### Azure API Gateway

Within Azure API Gateway, it is possible to activate the transaction sampling for Azure Monitoring (either at API level or for all APIs). Activating sampling will make the usage report inaccurate.
