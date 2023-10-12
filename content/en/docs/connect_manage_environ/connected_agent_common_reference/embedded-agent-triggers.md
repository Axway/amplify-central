---
title: Triggering your Embedded agent to run immediately
linkTitle: Triggering your Embedded agent to run immediately
draft: false
weight: 19
---

## Objectives

* Learn how to use the CLI or API to trigger an Embedded agent to run immediately

### Triggering the agent to run discovery

Integrating the Embedded agent discovery process with your CI/CD pipelines is the preferred way to ensure your APIs are always up to date within Amplify.

#### Triggering via CLI

1. Log into the Axway Central CLI.
2. Retrieve the latest Discovery Agent resource for your environment `axway central get discoveryagent <agent-name> -s <environment-name> -o yaml > da.yaml`.
3. Modify the da.yaml file by adding the line `queueDiscovery: true` to the `dataplane` section.
4. Run `axway central apply -f da.yaml` to apply the changes.

##### Discovery Agent CLI Dataplane example

```yaml
dataplane:
  name: <dataplane-name>
  queueDiscovery: true
```

##### Traceability Agent CLI Dataplane example

```yaml
dataplane:
  name: <dataplane-name>
  queueTrafficCollection: true
```

#### Triggering via API

1. Follow the instructions on [Authorize API calls to platform services](/docs/integrate_with_central/platform-auth-examples/) to create a service account and authenticate with curl.
2. Run one of the following curl commands. Update the values of &lt;environment-name&gt;, &lt;agent-name&gt; and &lt;dataplane-name&gt;


##### Discovery Agent API Dataplane example

```shell
curl --location --request PUT 'https://apicentral.axway.com/apis/management/v1alpha1/environments/<environment-name>/discoveryagents/<agent-name>/dataplane' \
--header "Authorization: Bearer ${token}" \
--header "Content-Type: application/json" \
-d '{"dataplane": {"name": "<dataplane-name>","queueDiscovery": true}}'
```

##### Traceability Agent API Dataplane example

```shell
curl --location --request PUT 'https://apicentral.axway.com/apis/management/v1alpha1/environments/<environment-name>/traceabilityagents/<agent-name>/dataplane' \
--header "Authorization: Bearer ${token}" \
--header "Content-Type: application/json" \
-d '{"dataplane": {"name": "<dataplane-name>","queueTrafficCollection": true}}'
```

{{< alert title="Note" color="primary" >}}Update the preceding commands Axway Central URL with the correct region based URL.{{< /alert >}}

