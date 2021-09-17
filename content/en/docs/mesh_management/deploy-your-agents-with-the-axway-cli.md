---
title: Deploy your agents with Axway CLI
linkTitle: Deploy your agents
weight: 50
date: 2020-12-0
description: Use the Axway CLI to deploy Amplify Istio Agents.
---

## Before you begin

Ensure you have the following tools installed:

* Axway Central CLI 1.24.0 or later
* Helm 3.2.4 or later
* Istioctl 1.9.5
* Kubectl - compatible version with your K8s server side
* Node.js >= 10.13.0 and <= 12.14.1
* OpenSSL 2.8.3 or later

## Log in to the Axway Central CLI

**Note:** The most recently validated Kubernetes version was 1.19.8.

For more information about installing the CLI, see [Install Axway Central CLI](/docs/cli_central/cli_install/).

**Note:** Istio agents are compatible with RedHat OpenShift 4.7 and later. For more information see [Using RedHat OpenShift](/docs/mesh_management/using_redhat_openshift/).

Run the following command to log into the Axway CLI with your Amplify Platform credentials:

```shell
axway auth login
```

A dialog box is shown. Enter your valid credentials (email address and password), and after the authorization successful message is displayed, go back to the Axway CLI.

If you are a member of multiple Amplify organizations, select an organization and continue.

## Install Amplify Istio Agents

1. Run the `install` command to begin the installation of the Amplify Istio Agents. The first section of the installation collects information about the Istio deployment.

    ```bash
    axway central install agents
    ```

    The installation displays the following prompts.

    ```bash
    Select the type of gateway you want to connect:
    API Gateway v7
    Amazon API Gateway
    Istio
    ```

2. Select `Istio` as your gateway. The next prompt asks if you already have Istio installed.

### If Istio is already installed

1. If Istio is already installed in your cluster, select 'Yes'.

    ```bash
    ? Use existing Istio installation?:  (Use arrow keys)
    ❯ Yes
      No
    ```

2. Select from the list the namespace that the ingress-gateway is running in.

    ```bash
    ? Select the namespace where the Istio ingress gateway is running:
      default
    ❯ istio-system
    ```

The rest of the prompts relate to the Istio agents. Continue on with the section [Select the agents to install](#select-the-agents-to-install).

### If Istio is not installed

1. If Istio is not installed, select No.

    ```bash
    ? Use existing Istio installation?:  (Use arrow keys)
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

5. Enter the name of the Kubernetes secret to store the certificate. By default, Istio is deployed in the `istio-system` namespace, and the secret for the gateway certificate is saved to this namespace. The creation of this namespace is handled by the deployment of Istio, if it does not exists yet.

   ```bash
   Enter the name of the secret to store the Istio gateway certificate: (gateway-cert)
   ```

6. Choose if you would like to generate a self-signed certificate or provide your own certificate.

    If you choose to generate a certificate, the Axway CLI will use OpenSSL to create the private key and the certificate, which will be placed in the current directory where you are running the Axway CLI. If you choose to provide an existing certificate, you will be prompted with the file path to the private key and the certificate.

### Generate a self-signed certificate

1. Select `Generate self signed certificate`.

2. Press `enter`.

    ```bash
    Would you like to generate a self signed certificate, or provide your own?: (Use arrow keys)
    Generate self signed certificate
    Provide certificate
    ```

The console displays two lines of text indicating that the certificate and key were created and that a Kubernetes secret was created in the `istio-system` namespace.

```bash
Would you like to generate a self signed certificate, or provide your own?: Generate self signed certificate
Created gateway-cert.crt and gateway-cert.key in /Users/axway
Created secret/gateway-cert in the istio-system namespace.
```

### Provide certificate

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

    The CLI will create the secret in the `istio-system` namespace.

## Select the agents to install

The following prompts are related to the details about the Amplify Istio Agents.

1. Select what you would like to install. You can install only one of the agents, or both. The Discovery agent option deploys the Amplify Istio Discovery Agent.

    ```bash
    Select which agents to install: (Use arrow keys)
    All agents
    Discovery agent
    Traceability agent
    ```

    If you choose to deploy Traceability agent, select the mode in which you want the Traceability Agent to run.

    The Amplify Istio Traceability Agent has two modes, default and verbose. The default mode captures only the headers specified in the EnvoyFilter. The verbose mode captures all the headers in the request and response flows. Once selected, you will be able to switch modes if required. Refer to [Monitor APIs and Services - Toggling the Traceability Agent](/docs/mesh_management/traceability_agent_configuration/#toggling-the-traceability-agent).

   ```bash
    Select Traceability Agent HTTP header publishing mode:  (Use arrow keys)
    ❯ Default
      Verbose
   ```

2. Enter the namespace where you would like to deploy the agents or accept the default option by pressing `enter`. The CLI collects a list of all your existing namespaces and provides an option to deploy to one of those. You can also choose to create a new Kubernetes namespace and deploy there instead.

    ```bash
    Create a new namespace
    ──────────────
    default
    istio-system
    kube-node-lease
    ```

    In this example we will create a new namespace.

    ```bash
    Enter a new namespace name: (amplify-agents)
    ```

3. Select whether you want to deploy the demo List service. This is an optional demo service which can be leveraged to ensure the Istio agents are working as expected. The demo service can be found in the ampc-hybrid namespace if selected to be deployed.

    ```bash
    ? Do you want to deploy the optional demo application?:  (Use arrow keys)
    ❯ No
      Yes
    ```

4. Select either an exisiting DevOps Service Account (DOSA), or create a new DOSA account, so the agents can authenticate with Amplify Central.

{{< alert title="Note">}} If you choose to use an existing DOSA account, you must provide the same public and private keys that were used to create the DOSA account you have selected. Failure to do so will cause the agents to fail to authenticate with Amplify Central.{{< /alert >}}

### Create a new DOSA account

1. Select `Create a new account` and press `enter`.

    ```bash
    Select a service account (DOSA): (Use arrow keys)
    Create a new account
    ──────────────
    mesh
    ──────────────
    ```

2. Enter a name for the new DOSA account. Creating a new DOSA account will override any file named `public_key.pem` or `private_key.pem` in the directory where you invoked the Axway Central CLI from. The public and private key pair are used to authenticate with Amplify Central. The keys will be placed in a secret in the selected namespace, and will be named "amplify-agents-keys".

    ```bash
    Select a service account (DOSA):  Create a new account
    WARNING: Creating a new DOSA account will overwrite any existing "private_key.pem" and "public_key.pem" files in this directory
    Enter a new service account name:  mesh-dosa
    ```

    After you enter the name of the account and press `enter`, an output is shown with the client ID of the account and the directory where the keys were placed.

    ```bash
    Enter a new service account name: mesh-dosa
    Creating a new service account.
    New service account "mesh-dosa" with clientId "DOSA_cb46caebd35f4e8689b56ee5f813b576" has been successfully created.
    The private key has been placed at /Users/axway/private_key.pem
    The public key has been placed at /Users/axway/public_key.pem
    ```

### Use an existing DOSA account

1. Select the DOSA account from the list and press `enter`.

    ```bash
    Select a service account (DOSA):  (Use arrow keys)
    Create a new account
    ──────────────
    mesh
    ──────────────
    ```

2. Enter the keys that were used to create the account. They must be the **same** keys that were used to create this DOSA account. It is recommended to provide the full file path to the location of the keys. The public and private key pair are used to authenticate with Amplify Central. The keys will be placed in a secret in the selected namespace, and will be named "amplify-agents-keys".

    ```bash
    Select a service account (DOSA):  mesh
    Please provide the the same "private_key.pem" and "public_key.pem" that was used to create the selected DOSA Account.
    Enter the file path to the public key:  /Users/axway/public_key.pem
    Enter the file path to the private key:  /Users/axway/private_key.pem
    ```

## Provide an environment resource

After the details of the DOSA account have been provided, you are prompted to either create an environment resource in Amplify Central or provide the name of an existing environment resource. The environment will hold the Kubernetes resources that were found by the Amplify Istio Discovery Agent.

```bash
Create a new environment
──────────────
mesh-env
──────────────
```

If you chose to create a new environment, enter a name and press `enter`.

```bash
Enter a new Environment name:  mesh-demo
Creating a new Environment
New environment "mesh-demo" has been successfully created.
```

A message indicating that the new environment has been created is shown.

Add a name for your Kubernetes cluster. This unique name will be used by the Istio agents. Enter a name and press 'enter'.

```bash
Enter a new k8s Cluster name:  test-cluster
Creating a new k8s Cluster
New k8scluster "test-cluster" has been successfully created.
```

A message indicating that the new k8s cluster has been created is shown.

After the new environment is created, the CLI creates the following:

* `istio-override.yaml` and `hybrid-override.yaml` files, and places them in your current directory.
* `Mesh`, `MeshDiscovery`, `K8SCluster`, `SpecDiscovery`, and two `ResourceDiscoveries` resources are used to discover and promote the kubernetes resources of the demo service to the provided environment.

The demo service is packaged along with the `ampc-hybrid` helm chart.

## Install Istio

If Istio is not yet installed the final output of the install prompts will provide the command below to install Istio.

```bash
istioctl install --set profile=demo -f istio-override.yaml
```

If Istio is already installed then no install command will be provided. Instead, the CLI will provide instructions for you to merge the provided `istio-override.yaml` file with your own Istio configuration.

```bash
Istio override file has been placed at /Users/Axway/istio-override.yaml
  Please merge the generated `istio-override.yaml` file with your Istio configuration to allow the Traceability Agent to function.
```

If you want to install Istio in an Openshift Cluster, there are additional steps required. Please follow the steps in the [Istio docs](https://istio.io/latest/docs/setup/platform-setup/openshift/) for installing Istio into an OCP cluster. Istio has multiple profiles that can be used for installation. Select the appropriate profile and apply with the merged details from the CLI generated `istio-override.yaml` file.

## Finish the installation of the agents

After the Istio installation is complete, run the following command to finish the installation of the agents:

```bash
helm repo update
helm upgrade --install --namespace amplify-agents ampc-hybrid axway/ampc-hybrid -f hybrid-override.yaml
```

Note that the Amplify Istio Discovery Agent polls every 20 seconds for the discovery resources by default. To change this, you must pass a helm override in the form of `--set ada.poll.interval` or `--set rda.poll.interval` accordingly with the desired agents.

For example, if you want the API Discovery agent to poll every 2 seconds for the discovery resources, you must run the following command to install the agents:

```bash
helm upgrade --install --namespace amplify-agents ampc-hybrid axway/ampc-hybrid -f hybrid-override.yaml --set ada.poll.interval=2s
```

## Verify that the pods are running

1. After the installation is complete, run the command below with the namespace you selected for the Istio agent location and confirm that the pods are all in a running status.

    ```bash
    kgp -n amplify-agents
    NAME                               READY   STATUS    RESTARTS   AGE
    ampc-hybrid-ada-bc5fcd58-6ghvb     1/1     Running   0          18s
    ampc-hybrid-als-76b499bc7c-d4566   1/1     Running   0          17s
    ampc-hybrid-als-76b499bc7c-rgtqb   1/1     Running   0          17s
    ampc-hybrid-rda-64cfdb558b-7kz2s   1/1     Running   0          17s
    ```

2. If you opted to install the optional demo service, the `ampc-hybrid` helm installation creates a namespace named `ampc-demo` and deploys a service called `ampc-hybrid-list`. Run the following command to verify this demo service is running.

    ```bash
    kgp -n ampc-demo
    NAME                                READY   STATUS    RESTARTS   AGE
    ampc-hybrid-list-598f8f9b4b-9wsc6   2/2     Running   0          90s
    ```

3. The installation creates resources, which provide configuration to the API Discovery Agent and the Resource Discovery Agent. You can use the Axway CLI to verify the agents are configured and running, and to list the resources that are expect to exist as a result of the agents discovering the `ampc-hybrid-list` service.

    ```bash
    axway central get apispecs -s mesh-demo
    ✔ Resource(s) has successfully been retrieved

    NAME              AGE            TITLE   SCOPE KIND  SCOPE NAME
    mylist100swagger  5 minutes ago  mylist  K8SCluster  mesh-demo
    ```

    If you see one resource after running this command, that confirms that the API Discovery Agent is working.

    ```bash
    axway central get k8sresources -s mesh-demo
    ✔ Resource(s) has successfully been retrieved

    NAME                                             AGE            TITLE                      SCOPE KIND  SCOPE NAME
    service.ampc-demo.ampc-hybrid-list               6 minutes ago  service-cli-1605812140608  K8SCluster  mesh-demo
    pod.ampc-demo.ampc-hybrid-list-598f8f9b4b-9wsc6  6 minutes ago  pod-cli-1605812140608      K8SCluster  mesh-demo
    ```

    If you see two resources after running this command, that confirms that the Resource Discovery Agent is working.

## Where to go next

For more information on the details of the resources and how the discovery process works, see [Discover APIs and services](/docs/mesh_management/discover-apis-and-services/).

For more information on monitoring APIs and services, see [Monitor APIs and Services](/docs/mesh_management/traceability_agent_configuration/).
