---
title: Apigee Edge Traceability Agent
linkTitle: Apigee Edge Traceability Agent
weight: 120
---

The Traceability Agent finds logs from consumed Apigee proxies and sends the traffic data to Amplify Engage.

## Traceability Agent variables

| Environment Variable       | Description                                                                                                              | Default (if applicable)           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| APIGEE_URL                 | The base Apigee URL for this agent to connect to                                                                         | `https://api.enterprise.apigee.com` |
| APIGEE_APIVERSION          | The version of the API for the agent to use                                                                              | v1                                |
| APIGEE_DATAURL             | The base Apigee Data API URL for this agent to connect to                                                                | `https://apigee.com/dapi/api`       |
| APIGEE_ORGANIZATION        | The Apigee organization name                                                                                             |                                   |
| APIGEE_ENVIRONMENT         | Set to discover metrics only in a specific environment, if not set discover metrics in all environments                  |                                   |
| APIGEE_DEVELOPERID         | The Apigee developer, email, that will own all apps                                                                      |                                   |
| APIGEE_DISCOVERYMODE       | The mode in which the Discovery Agent operates, determines how stats are gathered, proxies (proxy) or products (product) | proxy                             |
| APIGEE_INTERVAL_STATS      | The polling interval checking for API Proxy changes, only in proxy mode                                                  | 15m (15 minutes), >=15m           |
| APIGEE_AUTH_USERNAME       | The Apigee account username/email address                                                                                |                                   |
| APIGEE_AUTH_PASSWORD       | The Apigee account password                                                                                              |                                   |
| APIGEE_AUTH_USEBASICAUTH   | Set this to true to have the Apigee API client use HTTP Basic Authentication                                             | false                             |
| APIGEE_AUTH_URL            | The IDP URL                                                                                                              | `https://login.apigee.com`          |
| APIGEE_AUTH_SERVERUSERNAME | The IDP username for requesting tokens                                                                                   | edgecli                           |
| APIGEE_AUTH_SERVERPASSWORD | The IDP password for requesting tokens                                                                                   | edgeclisecret                     |
| APIGEE_FILTERED_APIS       | List that should contain APIs for which metrics are wanted. Leave empty to use all the discovered APIs instead           |                                   |
| APIGEE_FILTER_METRICS      | This flag determines if API metrics filtering is wanted                                                                  | true                              |