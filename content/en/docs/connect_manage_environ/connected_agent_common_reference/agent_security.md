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

While the agent configuration allows setting up credential-based configuration as environment variables with clear text, it doesn't provide the necessary security.

To overcome that, 2 technics can be used:

* referencing data keys within `@secret` resource created in Central.
* scripting the agent startup with openSSL
* using Docker secret for the Dockerized agents

{{< alert title="Warning" color="warning" >}}If you are running your traceability agent in [offline mode](/docs/connect_manage_environ/connected_agent_common_reference/traceability_usage/), you cannot secure your password with @Secret because there is no connectivity from the agent to Amplify platform where the secret is stored.{{< /alert >}}

### Using the @Secret resources in Central

This first technic will help you to store your password or any sensitive information inside Amplify Central directly. This will work only when the agent is "connected" to Amplify Central.

#### Creating secret resource in Central

* Create a yaml file with a resource definition for secret in environment scope:

```yaml
group: management
apiVersion: v1alpha1
kind: Secret
name: example-azure-secret
title: Example secret for Azure
metadata:
  scope:
    kind: Environment
    name: example-azure-environment
attributes:
  someAttrKey: attrValue
tags:
  - sample
spec:
  data: 
    accessKeyName : AzureShareAcceccKey
    accessKeyValue: ww0********=
```

* Create the secret resource using AXWAY Central CLI:

```shell
axway auth login

axway central create -f ./secret.yaml
```

#### Referencing the secret in the agent configuration

The agents' configurations support referencing data keys in secret resource for their values in all string-based configuration properties. When referencing secret, the configuration property value must begin with `@Secret.`, followed by a dot-separated name of the secret resource and the data key name:

```shell
...
AZURE_SHAREDACCESSKEYNAME=@Secret.example-azure-secret.accessKeyName
AZURE_SHAREDACCESSKEYVALUE=@Secret.example-azure-secret.accessKeyValue
...
```

By specifying the prefix `@Secret.`, the agent configuration parser must resolve the value of the configuration property using the specified secret resource and data key. While resolving the value, if the configuration parser successfully resolves the referenced secret, then the value of the secret data key is set as the configuration property value. Otherwise, the agent logs the error in resolving the secret and the configuration property value is set as empty string.

### Adding openSSL script to start the Axway API Gateway agents

The agent only accept environment variables and clear value. But you can add scripting around the agent startup to decrypt a password using openSSL.

#### Password encryption with openSSL

We can rely on openSLL to encrypt / decrypt your password. For that you will also required a secret key to add complexity to the encryption. The password as well as the secret key will be prompt during the password encryption script below.

**encrypt.sh script content**:

```shell
#!/bin/bash

# the encrypt program rely on openssl
# You will be prompt to enter your password in clear as well as a key to encrypt the password. Be sure to remember the key you use as it is needed for the decrypting process.

#encrypt: ask password and then ask for a passphrase
read -s -p "Enter the password to encrypt: " CLEAR_PASSWORD
echo "****"

# display encrypted password
echo $CLEAR_PASSWORD | openssl aes-256-cbc -a -pbkdf2

echo "This is your encrypted password. Keep it secured as well as the key that was used."
echo ""
```

The above script is using `aes-256-cbc` (AES 256 cypher). You can select the one that suits you based on your security requirements. Refer to <https://www.openssl.org/docs/manmaster/man1/openssl.html> for other cypher.

Sample of execution:

```shell
axway@ref-env:~/TMP$ ./encrypt.sh
Enter the password to encrypt: ****
enter aes-256-cbc encryption password:
Verifying - enter aes-256-cbc encryption password:
U2FsdGVkX19ySXZGRKOvV5lo3U8a9dlRPV3WMhsib/8=
This is your encrypted password. Keep it secured as well as the key that was used.
```

#### Agent startup with password decryption

In order to start the agent, you have first to decrypt the password and then place the decrypted value in the corresponding environment variable the agent is using.

The script below shows how to decrypt an encrypted password and place the value in the environment given as an argument of the script. Note that you will be prompt to enter the encryption key that have been used during the encryption phase. If you don't supply the correct key, the password will not be decrypted.

**decrypt.sh script content**:

```shell
#!/bin/bash

# script argument: the name of the environment variable that will contain the uncrypted value.
if [ $# -ne 1 ];  then
    echo "You need to give the environment variable name in the command: . ./decrypt.sh ENV_VAR_NAME"
else
        # read the encrypted password and the key
        read -s -p "Encrypted password: " ENCRYPTED_PASSWORD
        echo "****"

        # decrypt
        export $1=`echo $ENCRYPTED_PASSWORD | openssl aes-256-cbc -a -d -pbkdf2`
fi
```

Note that decryption algorithm should be the same as the one use to encrypt otherwise it will not work.

Sample of script starting the Axway API Gateway discovery Agent. This script will ask you first to enter the API Gateway password along with its secret key and secondly the API Manager password along with its secret key. Then it will start the agent.

**startDiscoveryAgent.sh script content**:

```shell
#!/bin/bash

echo "Decrypt APIGATEAY password"
. ./decrypt.sh APIGATEWAY_AUTH_PASSWORD

echo "Decrypt APIMANGER password"
. ./decrypt.sh APIMANAGER_AUTH_PASSWORD

echo "staring Discovery agent"
/home/agents/discovery_agent --envFile /home/agents/da_env_vars.env --path.config /home/agents

```

Sample of execution:

```shell
axway@ref-env:~/TMP$ ./startDA.sh
Decrypt APIGATEAY password
Encrypted password: ****
enter aes-256-cbc decryption password:
Decrypt APIMANGER password
Encrypted password: ****
enter aes-256-cbc decryption password:
starting Discovery agent
{"level":"debug","msg":"no password, assuming unencrypted key","time":"2021-12-14T07:40:33-07:00"}
{"level":"debug","msg":"Starting interval (Status Update) job 7b014e67-789c-4580-95b0-e10f9c2604fb","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"Waiting for Status Update (7b014e67-789c-4580-95b0-e10f9c2604fb) to be ready","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"Status Update (7b014e67-789c-4580-95b0-e10f9c2604fb) is ready","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"periodic status change -- Last activity updated","time":"2021-12-14T07:40:35-07:00"}
{"level":"info","msg":"Starting Amplify Gateway Discovery Agent version 1.1.7-83dadfb4, Amplify Agents SDK version 1.1.11","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"Starting interval (New APIs Cache) job c6097f9a-284e-4bf0-960d-c3287dddc970","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"Waiting for New APIs Cache (c6097f9a-284e-4bf0-960d-c3287dddc970) to be ready","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"Starting single run (Version Check) job fef10e90-d8c8-4615-9400-792539c31d53","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"Waiting for Version Check (fef10e90-d8c8-4615-9400-792539c31d53) to be ready","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"Version Check (fef10e90-d8c8-4615-9400-792539c31d53) is ready","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"Starting detached interval (Immediate Status Update) job 43c98605-c65b-49e3-830d-1db3734038ba","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"Waiting for Immediate Status Update (43c98605-c65b-49e3-830d-1db3734038ba) to be ready","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"Starting scheduled (Version Check Schedule) job ca6f1414-f889-4b1f-8b96-ada0d45ef77e","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"Waiting for Version Check Schedule (ca6f1414-f889-4b1f-8b96-ada0d45ef77e) to be ready","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"Version Check Schedule (ca6f1414-f889-4b1f-8b96-ada0d45ef77e) is ready","time":"2021-12-14T07:40:35-07:00"}
{"level":"debug","msg":"New APIs Cache (c6097f9a-284e-4bf0-960d-c3287dddc970) is ready","time":"2021-12-14T07:40:36-07:00"}
{"level":"debug","msg":"Immediate Status Update (43c98605-c65b-49e3-830d-1db3734038ba) is ready","time":"2021-12-14T07:40:37-07:00"}
...

```

### Using Docker secret

The agents that are running within Docker container, can leverage the Docker secret to get their configuration.

In order to remove the clear value from the agent configuration file, you can create a corresponding Docker secret and reference it in the corresponding variable.

### Securing Axway API Gateway passwords

The agents are using credentials (username/password) to access the API Manager system. By default, the username and password are stored in clear text inside the agent configuration files.</br>

In order to remove them from the agent configuration file, you can export environment variables (`APIMANAGER_AUTH_USERNAME` / `APIMANAGER_AUTH_PASSWORD` for connecting API Manager, `APIGATEWAY_AUTH_USERNAME` / `APIGATEWAY_AUTH_PASSWORD` for connecting Node Manager) with their respective values and remove them from the agent configuration file. When starting the agent, it will look for these environment variables instead of the value in the file. The environment variables take precedence over any values present in configuration file.

## Agent security scans

All of Axway’s software is developed under a Secure Software Development Lifecycle; therefore, the agents undergo regular security analysis.

The agents are implemented in Golang. The following security tools are run against the agents and the findings are remediated:

* [Golint](https://github.com/golang/lint) - scans the code for possible coding errors or inconsistencies

* [Fortify](https://www.microfocus.com/en-us/cyberres/application-security/software-security-center) - static code analyzer that searches for violations of security-specific coding rules and guidelines

* [SonarQube](https://www.sonarqube.org/) - looks for code reliability issues, security vulnerabilities, and unit test coverage

* [Whitesource](https://www.whitesourcesoftware.com/) - scans all library dependencies for security vulnerabilities and compliance issues

* [Twistlock](https://www.infoguard.ch/en/partners/twistlock-container-security) - for the agents that run in docker containers, scans the container for security protection within the infrastructure

* [IriusRisk](https://www.iriusrisk.com/) - this is the manual creation of threat models of the system by the system architects to identify and mitigate architectural security risks
