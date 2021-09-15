---
title: Administer API Manager agent security
linkTitle: Administer API Manager agent security
draft: false
weight: 35
description: This section describes the main security features of the API Manager agents.
---

## Information security

The agents communicate to AWS API Gateway Manager, API Manager, APIGateway Manager, and Amplify Central servers over TLS-encrypted HTTP connections by default. Except for AWS API Gateway Manager, the agents can be configured to enforce various TLS protocol versions. You can specify both a minimum and a maximum version. The default minimum version is TLS1.2, and the default maximum version is TLS1.3. Either of these values can be changed to one of the following: TLS1.0, TLS1.1, TLS1.2, TLS1.3.

Agents can also be configured to use one or more specific SSL. The ciphers that are configured within the agents to be used by default are:

TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384

TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384

TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305

TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305

TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256

TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256

TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256

TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256

The full list of cipher suites is extensive, and many may not be supported by the various servers. The cipher suites listed above are generally considered to be the most secure (at the time of this writing). Here is a full list of cipher suites that the agents allow for configuration:

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

The Traceability Agents also communicate to the Amplify search logs service using the Lumberjack protocol over a TCP connection. The connection host and port can be configured by changing the TRACEABILITY_HOST in your configuration file. See [Traceability Agent variables](/docs/central/connect-api-manager/agent-variables/#specific-variables-for-traceability-agent).

## Certificate host validation

`ssl.InsecureSkipVerify` option controls whether a client verifies the server’s certificate chain and host name. If true, then TLS accepts any certificate presented by the server and any host name in that certificate. In this mode, TLS is susceptible to man-in-the-middle attacks. If false (by default), then TLS accepts only the certificate containing the hostname that matches the server hostname.

## Proxying

The agents are configured to use a TLS-encrypted HTTP connection by default. Customers can also configure the agents to use a proxy. HTTP, HTTPS, and SOCKS5 proxies are supported. For general information on proxying see [Network traffic API Manager](/docs/central/connect-api-manager/network-traffic-apimanager#using-proxies). For specific proxy configuration, consult the documentation for your proxy.

## Agent client/server

The agents use HTTPS connections to its API servers for communication between a running agent, the API Manager, AWS API Gateway, or Amplify Central. The Traceability Agents also use the Lumberjack protocol over TCP to communicate to the Amplify search logs service.

Authentication to the servers is enforced through tokens, username/password, or public/private keys, depending upon what is required by the particular server. All JWT tokens and private keys and secrets stay within the environment of the agent. Public keys are registered in Amplify Central. Configuration details for these settings can be found at [Discovery Agent variables](/docs/central/connect-api-manager/agent-variables/) and [Traceability Agent variables](/docs/central/connect-api-manager/agent-variables/). For the AWS API Gateway Discovery and Traceability agents, the configuration details are at [Deploy agents](/docs/central/connect-aws-gateway/deploy-your-agents-1/).

## Agent configuration file: securing the user passwords

The agents are using credentials (username/password) to access the API Manager system. By default, the username and password are stored in clear text inside the agent configuration files.</br>

In order to remove them from the agent configuration file, you can export environment variables (`APIMANAGER_AUTH_USERNAME` / `APIMANAGER_AUTH_PASSWORD` for connecting API Manager, `APIGATEWAY_AUTH_USERNAME` / `APIGATEWAY_AUTH_PASSWORD` for connecting Node Manager) with their respective values and remove them from the agent configuration file. When starting the agent, it will look for these environment variables instead of the value in the file. The environment variables take precedence over any values present in configuration file.

## Agent security scans

All of Axway’s software is developed under a Secure Software Development Lifecycle; therefore, the agents undergo regular security analysis.

The agents are implemented in Golang. The following security tools are run against the agents and the findings are remediated:

* Golint - scans the code for possible coding errors or inconsistencies

* Sonar cube - looks for code reliability issues, security vulnerabilities, and unit test coverage

* Gosec - specific to Golang, and checks the code for security vulnerabilities

* DependencyCheck - scans all library dependencies for security vulnerabilities

* Twistlock - for the agents that run in docker containers, scans the container for security protection within the infrastructure

* IriusRisk - this is the manual creation of threat models of the system by the system architects to identify and mitigate architectural security risks
