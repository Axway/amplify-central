---
title: Deploy your agents
linkTitle: Deploy your agents
draft: false
weight: 10
---
The MuleSoft agents are delivered as containers, mulesoft-discovery-agent and mulesoft-traceability-agent. These containers can be deployed directly to a container server, such as Docker, or using the provided helm chart. In this section you will lean how to deploy the agents directly as containers or within a kubernetes cluster using the helm chart.

## Before you start

Before beginning to deploy the agents, gather the following in addition to the details that were noted in setup.

* MuleSoft AnyPoint Exchange URL, if it differs from the default of **<https://anypoint.mulesoft.com>**
* MuleSoft Environment name to discover and track transactions from (e.g. Sandbox)
* MuleSoft AnyPoint Business Unit the agent connects to
* MuleSoft Username and Password or Client ID and Secret
    * If using a Client ID and Secret then a MuleSoft App Integration will need to be created
* Go to *Help menus > Downloads > Repository*
     -or-
* Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents) and search for the Docker image for the most recent agents to download as `{discoveryAgentImage}` and `{traceabilityAgentImage}`.

## Objectives

Learn how to deploy the agents as containers

* For a Docker-based agent, once the configuration is complete, the agent configuration must be copied to a Docker machine so that the Docker runner will find them.

### Docker deployment

Use the information gathered above to create two environment variable files for each agent to use. This is the minimum configuration, assuming defaults for all other available settings.

#### Environment variables

Discovery Agent

```shell
MULESOFT_AUTH_CLIENTID=client-id                          
MULESOFT_AUTH_CLIENTSECRET=client-secret                          
MULESOFT_ENVIRONMENT=Sandbox                            
MULESOFT_ORGNAME=Unit                                   

CENTRAL_ORGANIZATIONID=123456789
CENTRAL_AUTH_CLIENTID=mulesoft-agents_123456789-abcd-efgh-ijkl-098765432109
CENTRAL_AUTH_PRIVATEKEY=/keys/private_key.pem            # path to the key file created with openssl
CENTRAL_AUTH_PUBLICKEY=/keys/public_key.pem              # path to the key file created with openssl
CENTRAL_ENVIRONMENT=mulesoft
CENTRAL_REGION=US
```

Traceability Agent

```shell
MULESOFT_AUTH_CLIENTID=client-id                          
MULESOFT_AUTH_CLIENTSECRET=client-secret                          
MULESOFT_ENVIRONMENT=Sandbox                            
MULESOFT_ORGNAME=Unit                                   

CENTRAL_ORGANIZATIONID=123456789
CENTRAL_AUTH_CLIENTID=mulesoft-agents_123456789-abcd-efgh-ijkl-098765432109
CENTRAL_AUTH_PRIVATEKEY=/keys/private_key.pem            # path to the key file created with openssl
CENTRAL_AUTH_PUBLICKEY=/keys/public_key.pem              # path to the key file created with openssl
CENTRAL_ENVIRONMENT=mulesoft
CENTRAL_REGION=US
```

#### Deployment

MuleSoft Discovery agent

```shell
docker run -d -v /home/user/keys:/keys -v /home/user/discovery/data:/data --env-file discovery-agents.env {discoveryAgentImage}
```

MuleSoft Traceability agent

```shell
docker run -d -v /home/user/keys:/keys -v /home/user/traceability/data:/data --env-file traceability-agents.env {traceabilityAgentImage}
```

Where:

`/home/user/keys` refers to the directory where the key files were created while setting up the platform service account.
`/home/user/discovery/data:/data` and `/home/user/traceability/data:/data` are volumes that are used to store cached information to be saved outside of the container in order to persist restarts.
`discovery-agents.env` and `traceability-agents.env` are files with the various environment variable settings that are available to each agent.
