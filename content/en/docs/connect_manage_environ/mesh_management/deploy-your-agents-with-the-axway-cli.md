---
title: Deploy your agents with Axway CLI
linkTitle: Deploy your agents with Axway CLI
weight: 50
date: 2020-12-0
---

Use the Axway CLI or helm commands to deploy Amplify Istio Agents.

## Before you begin

Ensure you have the following tools installed:

* Axway Central CLI 2.12.0 or later
* Helm 3.2.4 or later
* Istioctl 1.9.5
* Kubectl - compatible version with your K8s server side
* Node.js >= 10.13.0 and <= 12.14.1
* OpenSSL 2.8.3 or later

## Objectives

Learn how to configure and deploy Istio agents using either Axway Central CLI or helm commands.

## Deployment methods

There are two methods for configuring and deploying Istio agents:

* Automatic using [Axway Central CLI](/docs/connect_manage_environ/mesh_management/deploy-your-agents-with-the-axway-cli/#deploy-using-axway-cli)
* Manual using [helm commands](/docs/connect_manage_environ/mesh_management/deploy-your-agents-with-the-axway-cli/#deploy-using-helm-chart)

## Deploy using Axway CLI

Use the following procedures to deploy the agent using Axway CLI.

### Log into the Axway Central CLI

{{< alert title="Note" color="primary" >}}The most recently validated Kubernetes version was 1.19.8. For more information about installing the CLI, see [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

Istio agents are compatible with RedHat OpenShift 4.7 and later. For more information see [Using RedHat OpenShift](/docs/connect_manage_environ/mesh_management/using_redhat_openshift/).{{< /alert >}}

Run the following command to log into the Axway CLI with your Amplify Platform credentials:

```shell
axway auth login
```

A dialog box is displayed. Enter your valid credentials (email address and password), and after the authorization successful message is displayed, go back to the Axway CLI.

If you are a member of multiple Amplify organizations, select an organization and continue.

### Install Amplify Istio Agents

1. Run the `install` command to begin the installation of the Amplify Istio Agents. The first section of the installation collects information about the Istio deployment:

    ```bash
    axway central install agents
    ```

    The installation displays the following prompts:

    ```bash
      Amplify API Gateway
      Amazon API Gateway
      Azure API Gateway
    ❯ Istio
    ```

2. Select what you would like to install. You can install only one of the agents, or both.

    ```bash
    Select the type of agent(s) you want to install:
    ❯ All agents
      Discovery
      Traceability
    ```

3. Select an environment to connect, or create a new environment.

    ```bash
    Create a new environment
    ──────────────
    istio
    ──────────────
    ```

    If you chose to create a new environment, enter a name and press `enter`:

    ```bash
    Enter a new Environment name:istio-demo
    Creating a new Environment
    New environment "istio-demo" has been successfully created.
    ```

4. Select a team.

    ```bash
      Select a team:
    ❯ Default Team
    ```

5. Select either an existing DevOps Service Account (DOSA), or create a new DOSA account, so the agents can authenticate with Amplify.

    If you choose to use an existing DOSA account, you must provide the same public and private keys that were used to create the DOSA account you have selected. Failure to do so will cause the agents to fail to authenticate with Amplify.

    Select `Create a new account` and press `enter`.

    ```bash
    Select a service account (DOSA):
    Create a new account
    ──────────────
    istio-service-account
    ──────────────
    ```

6. Create the Discovery Agent resource (Prompt only appears if installing the Discovery Agent).

    ```bash
    Enter a new discovery agent name:(cli-1664387590624)
    ```

7. Create the Traceability Agent resource (Prompt only appears if installing the Traceability Agent)

    ```bash
    Enter a new traceability agent name:(cli-1664387590624)
    ```

#### If Istio is already installed

1. If Istio is already installed in your cluster, select 'Yes':

    ```bash
    ? Use existing Istio installation?:
    ❯ Yes
      No
    ```

2. Select the namespace where the Envoy filters should be created for the Traceability Agent:

    ```bash
    ? Select the namespace where you would like the ALS Envoy Filters to be applied:
      default
    ❯ istio-system
    ```

The rest of the prompts relate to the Istio agents. Continue with [Discovery Agent prompts](#discovery-agent-prompts).

#### If Istio is not installed

1. If Istio is not installed, select No:

    ```bash
    ? Use existing Istio installation?:
    ❯ No
      Yes
    ```

2. Enter the domain name of the cluster. If you do not know the domain name for the cluster at this time, leave the prompt blank and you will not be asked any details about the protocol, port, or certificate.

    ```bash
    Enter the public domain name for your cluster (FQDN), if available. (leave blank to skip):
    ```

3. Enter the protocol to use for the Istio gateway:

    ```bash
    Enter the protocol to use for the ingress gateway:
    HTTP
    HTTPS
    ```

4. Enter the port on which you want to expose the gateway. If you choose `HTTPS`, the default port is `443`. If you choose `HTTP`, the default port is `8080`.

    ```bash
    Enter the Kubernetes cluster port: (443)
    ```

5. Enter the name of the Kubernetes Secret to store the certificate. By default, the Istio ingress gateway is deployed in the `istio-system` namespace, and the Secret for the gateway certificate is saved to this namespace. The creation of this namespace is handled by the deployment of Istio, if it does not exists yet.

   ```bash
   Enter the name of the secret to store the Istio gateway certificate: (gateway-cert)
   ```

6. Choose if you would like to generate a self-signed certificate or provide your own certificate.

    If you choose to generate a certificate, the Axway CLI will use OpenSSL to create the private key and the certificate, which will be placed in the current directory where you are running the Axway CLI. If you choose to provide an existing certificate, you will be prompted with the file path to the private key and the certificate.

##### Generate a self-signed certificate

1. Select `Generate self signed certificate`.

2. Press `enter`:

    ```bash
    Would you like to generate a self signed certificate, or provide your own?: 
    Generate self signed certificate
    Provide certificate
    ```

The console displays two lines of text indicating that the certificate and key were created and that a Kubernetes Secret was created in the `istio-system` namespace:

```bash
Would you like to generate a self signed certificate, or provide your own?: Generate self signed certificate
Created gateway-cert.crt and gateway-cert.key in /Users/axway
Created secret/gateway-cert in the istio-system namespace.
```

##### Provide certificate

1. Select `Provide certificate`.

2. Press `enter`.

3. Provide the path for both the private key and the certificate. Note that the path is relative to the directory where you invoked the Axway Central CLI command from. If your certificate and key are stored in another directory from where you are running the CLI, then you must provide the full path to the files.

    ```bash
    Enter the name of the secret to store the Istio gateway certificate: gateway-cert
    Would you like to generate a self signed certificate, or provide your own?: Provide certificate
    Enter the file path to the private key: /Users/axway/private_key.key
    Enter the file path to the certificate: /Users/axway/certificate.crt
    Created secret/gateway-cert in the istio-system namespace.
    ```

    The CLI will create the Secret in the `istio-system` namespace.

### Discovery Agent prompts

1. Select the Traceability Agent mode.

    If you choose to deploy the Traceability Agent, select the mode in which you want the Traceability Agent to run.

    The Amplify Istio Traceability Agent has two modes, default and verbose. The default mode captures only the headers specified in the EnvoyFilter. The verbose mode captures all the headers in the request and response flows. Once selected, you will be able to switch modes if required. Refer to [Monitor APIs and Services - Toggling the Traceability Agent](/docs/connect_manage_environ/mesh_management/traceability_agent_configuration/#toggling-the-traceability-agent).

   ```bash
    Select Traceability Agent HTTP header publishing mode:
    ❯ Default
      Verbose
   ```

2. Select the namespace where Virtual Services should be discovered from.

   ```bash
    Select the namespace where the agent should discover Virtual Service resources:
    ❯ default
      istio-system
   ```

3. Enter the namespace where you would like to deploy the agents, or accept the default option by pressing `enter`. The CLI collects a list of all your existing namespaces and provides an option to deploy to one of those. You can also choose to create a new Kubernetes namespace and deploy there instead.

    ```bash
    Create a new namespace
    ──────────────
    default
    istio-system
    ```

    To create a new namespace:

    ```bash
    Enter a new namespace name: (amplify-agents)
    ```

4. Select whether you want to deploy the demo List service. This is an optional demo service which can be leveraged to ensure the Istio agents are working as expected. The demo service can be found in the ampc-demo namespace if selected to be deployed.

    ```bash
    Do you want to deploy the optional demo application?:
    ❯ No
      Yes
    ```

5. Create a `Mesh` and `Environment` resource.

  The API Server no longer uses the `K8SCluster` resource type. Instead, model your cluster using a `Mesh` resource (to represent the service mesh) and an `Environment` resource (one per target environment). Create a `Mesh` and an `Environment` if they do not already exist.

  Example (CLI prompts):

  ```bash
  Enter a name for the Mesh: (mesh-1234)
  Enter a name for the Environment: (istio-demo)
  ```

  Note: older CLI versions or legacy docs may still reference `K8SCluster`; treat any existing prompts that ask for a cluster name as the Environment name when following current API Server models.

### Traceability Agent prompts

1. Optionally enable traceability logging to gather usage and metrics of your API services.

    ```bash
    Would you like to enable transaction logging?:
    ❯ Yes
      No
    ```

2. Select the Traceability Agent protocol.

    ```bash
    ? Select Traceability protocol:  (Use arrow keys)
    ❯ Lumberjack
      HTTPS
    ```

### Install Istio

If Istio is not yet installed, the final output of the install prompts will provide the following command to install Istio:

```bash
istioctl install --set profile=demo -f istio-override.yaml
```

If Istio is already installed, then no install command will be provided. Instead, the CLI will provide instructions for you to merge the provided `istio-override.yaml` file with your own Istio configuration:

```bash
Istio override file has been placed at /Users/Axway/istio-override.yaml
  Please merge the generated `istio-override.yaml` file with your Istio configuration to allow the Traceability Agent to function.
```

If you want to install Istio in an Openshift Cluster, there are additional steps required. Please follow the steps in the [Istio docs](https://istio.io/latest/docs/setup/platform-setup/openshift/) for installing Istio into an OCP cluster. Istio has multiple profiles that can be used for installation. Select the appropriate profile and apply with the merged details from the CLI generated `istio-override.yaml` file.

### Finish the installation of the agents

After the Istio installation is complete, edit the `hybrid-override.yaml`. Since the CLI allows you to enter only one namespace, you can add additional namespaces for the envoy filters in the value of `envoyFilterNamespaces` under the `als` key:

```yaml
als:
   envoyFilterNamespaces:
    - namespace1
    - namespace2
    ...
    - namespaceN
```

where namespaces 1 through N is a list of all the namespaces on your cluster that have an Istio ingress gateway running and where you want the envoy filter to be deployed to monitor the traffic.

Once you save the `hybrid-override.yaml` file with the changes made above, run the following command to finish the installation of the agents:

```bash
helm repo add axway https://helm.repository.axway.com --username==<client-id> --password=<client_secret>
helm repo update
helm upgrade --install --namespace amplify-agents ampc-hybrid axway/ampc-beano-helm-prod-ampc-hybrid -f hybrid-override.yaml
```

If your cluster pulls images from Axway's private Docker registry, create a Kubernetes image-pull secret of type `kubernetes.io/dockerconfigjson` (the docker-registry secret) and set the `image.pullSecret` (or `pullSecret`) value in your override file so pods can pull private images. Example:

```bash
kubectl create secret docker-registry <SECRET_NAME> --namespace <YOUR_NAMESPACE> --docker-server=docker.repository.axway.com --docker-username=<client_id> --docker-password=<client_secret>
```

Note: If you prefer to manage the agents independently, you can install the Discovery Agent (DA) and Traceability Agent (TA) using separate, standalone Helm charts instead of the `ampc-hybrid` umbrella chart. When installing separately, ensure values intended for the DA are placed under the `da:` key in `da-overrides.yaml` and values intended for the TA are placed under the `als:` (or `ta:`) key in `ta-overrides.yaml`. Standalone install example commands:

```bash
helm repo add axway https://helm.repository.axway.com --username=<client-id> --password=<client_secret>
helm repo update
helm upgrade --install --namespace amplify-agents ampc-als axway/als-traceability-agent -f ta-overrides.yaml
helm upgrade --install --namespace amplify-agents ampc-da axway/discovery-agent -f da-overrides.yaml
```

{{< alert title="Note" color="primary" >}}By default, the Amplify Istio Discovery Agent polls every 60 seconds for the discovery resources. To change this, you must pass a helm override in the form of `--set da.poll.interval` or `--set da.pollInterval` accordingly with the desired agents.{{< /alert >}}

For example, if you want the Discovery Agent to poll every 10 seconds for the discovery resources, run the following command to install the agents:

```bash
helm upgrade --install --namespace amplify-agents ampc-hybrid axway/ampc-beano-helm-prod-ampc-hybrid -f hybrid-override.yaml --set da.pollInterval=10s
```
