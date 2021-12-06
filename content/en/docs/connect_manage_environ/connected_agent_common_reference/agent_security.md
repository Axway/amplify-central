---
title: Administer agent security
linkTitle: Administer agent security
draft: false
weight: 40
description: This section describes the main security features of the agents.
---

## Information security

The agents communicate to AWS API Gateway Manager, API Manager, APIGateway Manager, and Amplify Central servers over TLS-encrypted HTTP connections by default. Except for AWS API Gateway Manager, the agents can be configured to enforce various TLS protocol versions. You can specify both a minimum and a maximum version. The default minimum version is TLS1.2, and the default maximum version is TLS1.3. Either of these values can be changed to one of the following: TLS1.0, TLS1.1, TLS1.2, TLS1.3. For more information, see the **Reference - Agent configuration** documentation for your specific agent.

Agents can also be configured to use one or more specific SSL. The ciphers that are configured within the agents to be used by default are:

TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384

TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384

TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305

TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305

TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256

TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256

TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256

TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256

The full list of cipher suites is extensive, and many may not be supported by the various servers. The cipher suites listed above are generally considered to be the most secure. Here is a full list of cipher suites that the agents allow for configuration:

TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA

TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256

TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256

TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA

TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384

TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305

TLS_ECDHE_ECDSA_WITH_RC4_128_SHA

TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA

TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA

TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256

TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256

TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA

TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384

TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305

TLS_ECDHE_RSA_WITH_RC4_128_SHA

TLS_RSA_WITH_RC4_128_SHA

TLS_RSA_WITH_3DES_EDE_CBC_SHA

TLS_RSA_WITH_AES_128_CBC_SHA

TLS_RSA_WITH_AES_128_CBC_SHA256

TLS_RSA_WITH_AES_128_GCM_SHA256

TLS_RSA_WITH_AES_256_CBC_SHA

TLS_RSA_WITH_AES_256_GCM_SHA384

TLS_AES_128_GCM_SHA256

TLS_AES_256_GCM_SHA384

TLS_CHACHA20_POLY1305_SHA256

The Traceability Agents also communicate to the Amplify search logs service using the Lumberjack protocol over a TCP connection. The connection host and port can be configured by changing the TRACEABILITY_HOST in your configuration file. For additional information, see [API Manager's Traceability Agent variables](/docs/connect_manage_environ/connect_api_manager/agent-variables/#specific-variables-for-traceability-agent), [AWS Gateway's Traceability Agent variables](/docs/connect_manage_environ/connect_aws_gateway/deploy-your-agents-1/#traceability-agent) and  [Azure Gateway's Traceability Agent variables](/docs/connect_manage_environ/connect_azure_gateway/agent-variables/#specific-variables-for-traceability-agent).

## Proxying - Axway API Gateway only

The agents are configured to use a TLS-encrypted HTTP connection by default.

When using the on-premise installation of API Manager/Gateway, it is possible that the machine where the gateway and API Manager are running cannot access internet. For securing the outgoing connectivity, it is possible to use a proxy to open only the required port and urls the agents will use to communicate with Amplify platform. HTTP, HTTPS, and SOCKS5 proxies are supported. Refer to [communication port list](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/#communication-ports) to view the url/port to open.

 For general information on proxying see [Connection via proxy](/docs/connect_manage_environ/connected_agent_common_reference/network_traffic/#using-proxies-api-manager-only). For specific proxy configuration, consult the documentation for your proxy.

## Agent client/server

The agents use HTTPS connections to its API servers for communication between a running agent, the API Manager, AWS API Gateway, Azure API Gateway or Amplify Central. The Traceability Agents also use the Lumberjack protocol over TCP to communicate to the Amplify search logs service.

Authentication to the servers is enforced through tokens, username/password, or public/private keys, depending upon what is required by the particular server. All JWT tokens and private keys and secrets stay within the environment of the agent. Public keys are registered in Amplify Central. Configuration details for these settings can be found in the **Deploy your agent** documentation for your specific agent.

## Agent configuration file

### Securing Axway API Gateway passwords

The agents are using credentials (username/password) to access the API Manager system. By default, the username and password are stored in clear text inside the agent configuration files.</br>

In order to remove them from the agent configuration file, you can export environment variables (`APIMANAGER_AUTH_USERNAME` / `APIMANAGER_AUTH_PASSWORD` for connecting API Manager, `APIGATEWAY_AUTH_USERNAME` / `APIGATEWAY_AUTH_PASSWORD` for connecting Node Manager) with their respective values and remove them from the agent configuration file. When starting the agent, it will look for these environment variables instead of the value in the file. The environment variables take precedence over any values present in configuration file.

### Securing AWS access

The agents are using an AWS access key and an AWS secret key to execute AWS APIs. The values for these keys are stored in clear in the configuration file used to run the agent Docker image.</br>

In order to remove them from the file, you can create a corresponding Docker secret and reference them in variables (`AWS_AUTH_ACCESSKEY` / `AWS_AUTH_SECRETKEY`).

## Agent security scans

All of Axway’s software is developed under a Secure Software Development Lifecycle; therefore, the agents undergo regular security analysis.

The agents are implemented in Golang. The following security tools are run against the agents and the findings are remediated:

* [Golint](https://github.com/golang/lint) - scans the code for possible coding errors or inconsistencies

* [Fortify](https://www.microfocus.com/en-us/cyberres/application-security/software-security-center) - static code analyzer that searches for violations of security-specific coding rules and guidelines

* [SonarQube](https://www.sonarqube.org/) - looks for code reliability issues, security vulnerabilities, and unit test coverage

* [Whitesource](https://www.whitesourcesoftware.com/) - scans all library dependencies for security vulnerabilities and compliance issues

* [Twistlock](https://www.infoguard.ch/en/partners/twistlock-container-security) - for the agents that run in docker containers, scans the container for security protection within the infrastructure

* [IriusRisk](https://www.iriusrisk.com/) - this is the manual creation of threat models of the system by the system architects to identify and mitigate architectural security risks
