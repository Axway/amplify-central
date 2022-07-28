---
title: Deploy your agents with Axway CLI
linkTitle: Deploy your agents
weight: 50
date: 2020-12-0
---

Use the Axway CLI or helm commands to deploy Amplify Istio Agents.

## Before you begin

Ensure you have the following tools installed:

* Axway Central CLI 1.24.0 or later
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

{{< alert title="Notes" color="primary" >}}The most recently validated Kubernetes version was 1.19.8. For more information about installing the CLI, see [Install Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/).

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
    Select the type of gateway you want to connect:
    API Gateway v7
    Amazon API Gateway
    Istio
    ```

2. Select `Istio` as your gateway. The next prompt asks if you already have Istio installed.

#### If Istio is already installed

1. If Istio is already installed in your cluster, select 'Yes':

    ```bash
    ? Use existing Istio installation?:  (Use arrow keys)
    ❯ Yes
      No
    ```

2. Select from the list the namespace that the ingress-gateway is running in:

    ```bash
    ? Select the namespace where the Istio ingress gateway is running:
      default
    ❯ istio-system
    ```

The rest of the prompts relate to the Istio agents. Continue on with the section [Select the agents to install](#select-the-agents-to-install).

#### If Istio is not installed

1. If Istio is not installed, select No:

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

#### Generate a self-signed certificate

1. Select `Generate self signed certificate`.

2. Press `enter`:

    ```bash
    Would you like to generate a self signed certificate, or provide your own?: (Use arrow keys)
    Generate self signed certificate
    Provide certificate
    ```

The console displays two lines of text indicating that the certificate and key were created and that a Kubernetes secret was created in the `istio-system` namespace:

```bash
Would you like to generate a self signed certificate, or provide your own?: Generate self signed certificate
Created gateway-cert.crt and gateway-cert.key in /Users/axway
Created secret/gateway-cert in the istio-system namespace.
```

#### Provide certificate

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

### Select the agents to install

The following prompts are related to the details about the Amplify Istio Agents.

1. Select what you would like to install. You can install only one of the agents, or both. The Discovery Agent option deploys the Amplify Istio Discovery Agent.

    ```bash
    Select which agents to install: (Use arrow keys)
    All agents
    Discovery agent
    Traceability agent
    ```

    If you choose to deploy the Traceability Agent, select the mode in which you want the Traceability Agent to run.

    The Amplify Istio Traceability Agent has two modes, default and verbose. The default mode captures only the headers specified in the EnvoyFilter. The verbose mode captures all the headers in the request and response flows. Once selected, you will be able to switch modes if required. Refer to [Monitor APIs and Services - Toggling the Traceability Agent](/docs/connect_manage_environ/mesh_management/traceability_agent_configuration/#toggling-the-traceability-agent).

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

    In this example we will create a new namespace:

    ```bash
    Enter a new namespace name: (amplify-agents)
    ```

3. Select whether you want to deploy the demo List service. This is an optional demo service which can be leveraged to ensure the Istio agents are working as expected. The demo service can be found in the ampc-hybrid namespace if selected to be deployed.

    ```bash
    ? Do you want to deploy the optional demo application?:  (Use arrow keys)
    ❯ No
      Yes
    ```

4. Select either an existing DevOps Service Account (DOSA), or create a new DOSA account, so the agents can authenticate with Amplify Central.

{{< alert title="Note" color="primary" >}} If you choose to use an existing DOSA account, you must provide the same public and private keys that were used to create the DOSA account you have selected. Failure to do so will cause the agents to fail to authenticate with Amplify Central.{{< /alert >}}

#### Create a new DOSA account

1. Select `Create a new account` and press `enter`:

    ```bash
    Select a service account (DOSA): (Use arrow keys)
    Create a new account
    ──────────────
    mesh
    ──────────────
    ```

2. Enter a name for the new DOSA account. Creating a new DOSA account will override any file named `public_key.pem` or `private_key.pem` in the directory where you invoked the Axway Central CLI from. The public and private key pair are used to authenticate with Amplify Central. The keys will be placed in a secret in the selected namespace, and will be named "amplify-agents-keys."

    ```bash
    Select a service account (DOSA):  Create a new account
    WARNING: Creating a new DOSA account will overwrite any existing "private_key.pem" and "public_key.pem" files in this directory
    Enter a new service account name:  mesh-dosa
    ```

    After you enter the name of the account and press `enter`, an output is displayed with the client ID of the account and the directory where the keys were placed:

    ```bash
    Enter a new service account name: mesh-dosa
    Creating a new service account.
    New service account "mesh-dosa" with clientId "DOSA_cb46caebd35f4e8689b56ee5f813b576" has been successfully created.
    The private key has been placed at /Users/axway/private_key.pem
    The public key has been placed at /Users/axway/public_key.pem
    ```

#### Use an existing DOSA account

1. Select the DOSA account from the list and press `enter`:

    ```bash
    Select a service account (DOSA):  (Use arrow keys)
    Create a new account
    ──────────────
    mesh
    ──────────────
    ```

2. Enter the keys that were used to create the account. They must be the **same** keys that were used to create this DOSA account. It is recommended to provide the full file path to the location of the keys. The public and private key pair are used to authenticate with Amplify Central. The keys will be placed in a secret in the selected namespace, and will be named "amplify-agents-keys."

    ```bash
    Select a service account (DOSA):  mesh
    Please provide the same "private_key.pem" and "public_key.pem" that was used to create the selected DOSA Account.
    Enter the file path to the public key:  /Users/axway/public_key.pem
    Enter the file path to the private key:  /Users/axway/private_key.pem
    ```

### Provide an environment resource

After the details of the DOSA account have been provided, you are prompted to either create an environment resource in Amplify Central or provide the name of an existing environment resource. The environment will hold the Kubernetes resources that were found by the Amplify Istio Discovery Agent.

```bash
Create a new environment
──────────────
mesh-env
──────────────
```

If you chose to create a new environment, enter a name and press `enter`:

```bash
Enter a new Environment name:  mesh-demo
Creating a new Environment
New environment "mesh-demo" has been successfully created.
```

A message indicating that the new environment has been created is displayed.

Add a name for your Kubernetes cluster. This unique name will be used by the Istio agents. Enter a name and press 'enter':

```bash
Enter a new k8s Cluster name:  test-cluster
Creating a new k8s Cluster
New k8scluster "test-cluster" has been successfully created.
```

A message indicating that the new k8s cluster has been created is displayed.

After the new environment is created, the CLI creates the following:

* `istio-override.yaml` and `hybrid-override.yaml` files, and places them in your current directory.
* `Mesh`, `MeshDiscovery`, `K8SCluster`, `SpecDiscovery`, and two `ResourceDiscoveries` resources are used to discover and promote the kubernetes resources of the demo service to the provided environment.

The demo service is packaged along with the `ampc-hybrid` helm chart.

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

After the Istio installation is complete, edit the `hybrid-override.yaml` file with the editor of your choice. Since the CLI allows you to enter only one namespace, you can add additional namespaces for the envoy filters in the value of `istioGatewayNamespaces` under the `als` key:

```yaml
als:
   istioGatewayNamespaces:
    - namespace1
    - namespace2
    ..
    - namespaceN
```

where namespaces 1 through N is a list of all the namespaces on your cluster that have an Istio ingress gateway running and where you want the envoy filter to be deployed to monitor the traffic.

Once you save the `hybrid-override.yaml` file with the changes made above, run the following command to finish the installation of the agents:

```bash
helm repo add axway https://charts.axway.com/charts
helm repo update
helm upgrade --install --namespace amplify-agents ampc-hybrid axway/ampc-hybrid -f hybrid-override.yaml
```

{{< alert title="Note" color="primary" >}}By default, the Amplify Istio Discovery Agent polls every 20 seconds for the discovery resources. To change this, you must pass a helm override in the form of `--set ada.poll.interval` or `--set rda.poll.interval` accordingly with the desired agents.{{< /alert >}}

For example, if you want the API Discovery Agent to poll every 2 seconds for the discovery resources, run the following command to install the agents:

```bash
helm upgrade --install --namespace amplify-agents ampc-hybrid axway/ampc-hybrid -f hybrid-override.yaml --set ada.poll.interval=2s
```

## Deploy using helm chart

Before deploying the helm chart, you must prepare the Kubernetes cluster, the Amplify environment, and the override file for deploying the chart correctly.

### Prepare the kubernetes cluster

To prepare the cluster for the Amplify Agents, create a namespace for the agents to run in:

```bash
kubectl create namespace amplify-agents
```

A service account is required for the agents to connect to Amplify Central. Create a service account using the Amplify Central CLI, and either generate a public and private key pair, or provide the file paths to keys you would like to use for the service account.

```bash
~ » axway service-account create
AXWAY CLI, version 3.2.5
Copyright (c) 2018-2022, Axway, Inc. All Rights Reserved.

Account:      amplify-cli:user@axway.com
Organization: axway (12345678-0000-4444-99e9-ac4fa7d116db)

✔ Display name · istio-service-account
✔ Description ·
✔ Authentication method · generate
✔ Private key output file · private_key.pem
✔ Public key output file · public_key.pem
✔ Roles · Central Admin

Successfully created service account

Client ID: istio-service-account_12345678-0000-4444-99e9-ac4fa7d116db
```

After the service account has been created you will be provided with a Client ID. Save this ID to be used later in the `hybrid-override.yaml` to install the agents.

The public and private keys that were used to create the service account must be added to the namespace as a secret:

```bash
kubectl create secret generic amplify-agents-keys \
--namespace amplify-agents \
--from-file=publicKey=public_key.pem \
--from-file=privateKey=private_key.pem \
--from-literal=password="" -o yaml
```

### Prepare Istio

An `IstioOperator` is required for Istio to connect to the Traceability Agent. It tells Istio where the Envoy Access Log Service is running. If you already have Istio deployed in your environment, then merge the following configuration into your `IstioOperator` resource and apply the change. If Istio is not yet deployed, then copy this configuration into a file and then apply the change.

```yaml
---
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
spec:
  meshConfig:
    enableTracing: true
    enableEnvoyAccessLogService: false
    defaultConfig:
      envoyAccessLogService:
        address: ampc-hybrid-als.amplify-agents.svc.cluster.local:9000
    outboundTrafficPolicy:
      mode: REGISTRY_ONLY

  values:
    telemetry:
      enabled: true
      v2:
        enabled: true
```

To deploy this change to your istio environment you will run `istioctl install --set profile=$YOUR_PROFILE -f istio-override.yaml`
Update the command to use your desired Istio profile, and then run the install. For questions about the installation refer to the [Istio documentation](https://istio.io/v1.9/docs/setup/install/istioctl/).

### Prepare Amplify Central

There are two agents that can be deployed. A Discovery Agent, and a Traceability Agent. The Environment resource is required for each agent.

```yaml
apiVersion: v1alpha1
title: istio
name: istio
kind: Environment
spec:
  description: istio environment
```

```bash
axway central create -f environment.yaml
```

#### [Discovery Agent resources](#discovery-agent-resources)

The following resources are required to run the Discovery Agent. Copy the following yaml into a file and use the Amplify Central CLI to create the resources. The names of the resources can be modified. However, a resource may reference another resource by name, so be sure to update all occurrences of the name in the file.

```yaml
apiVersion: v1alpha1
group: management
kind: Mesh
name: istio-mesh
title: istio-mesh
spec: {}
---
apiVersion: v1alpha1
group: management
kind: MeshDiscovery
name: istio-mesh-discovery
title: istio-mesh-discovery
metadata:
  scope:
    kind: Mesh
    name: istio-mesh
spec:
  environmentRef: istio
---
apiVersion: v1alpha1
group: management
kind: K8SCluster
name: istio-k8scluster
title: istio-k8scluster
spec:
  mesh: istio-mesh
---
apiVersion: v1alpha1
kind: SpecDiscovery
group: management
name: dumbservices-discovery
metadata:
  scope:
    kind: K8SCluster
    name: istio-k8scluster
spec:
# Specify the namespaces the Discovery Agent should look for resources
  namespaceFilter:
    names:
    - ampc-demo
  targets:
# Specify the endpoints where OAS or Swagger specs may be found in the cluster
    exactPaths:
      - path: /apidocs
        headers:
          Content-Type: application/json
      - path: /apidoc/swagger.json
        headers:
          Content-Type: application/json
      - path: /swagger.json
        headers:
          Content-Type: application/json
      - path: /api/v1/docs
        headers:
          Content-Type: application/json
      - path: /apis/docs
        headers:
          Content-Type: application/json
---
apiVersion: v1alpha1
group: management
kind: ResourceDiscovery
name: pod-discovery
title: pod-discovery
metadata:
  scope:
    kind: K8SCluster
    name: istio-k8scluster
spec:
# Tells the Discovery Agent to watch for Pod resources
  kind: Pod
  group: ''
  version: v1
# Tells the Discovery Agent to watch for Pods in the provided namespaces
  namespaceFilter:
    names:
    - ampc-demo
---
apiVersion: v1alpha1
group: management
kind: ResourceDiscovery
name: service-discovery
title: service-discovery
metadata:
  scope:
    kind: K8SCluster
    name: istio-k8scluster
spec:
# Tells the Discovery Agent to watch for Service resources
  kind: Service
  group: ''
  version: v1
# Tells the Discovery Agent to watch for Services in the provided namespaces
  namespaceFilter:
    names:
    - ampc-demo
```

Create the Discovery Agent resources:

```bash
axway central create -f discovery-resources.yaml
```

#### Traceability Agent resources

The following resources are required to run the Traceability Agent. Copy the yaml below into a file and use the Amplify Central CLI to create the resources. The names of the resources can be modified. However, a resource may reference another resource by name, so be sure to update all occurrences of the name in the file.

If you are running the Discovery Agent and have already applied the resources from the [Discovery Agent resources](#discovery-agent-resources) section above, then you do not need to create the K8SCluster resource again.

If you are not running the Discovery Agent, then create the K8SCluster resource now:

```yaml
apiVersion: v1alpha1
group: management
kind: K8SCluster
name: istio-k8scluster
title: istio-k8scluster
spec: {}
```

```bash
axway central create -f k8scluster.yaml
```

Create the Traceability Agent resource so that the agent can report a health status back to Amplify Central:

```yaml
group: management
apiVersion: v1alpha1
kind: TraceabilityAgent
name: istio-ta
title: istio-ta
metadata:
  scope:
    kind: Environment
    name: istio
spec:
  config:
    owningTeam: Default Team
  dataplaneType: Istio
```

```bash
axway central create -f traceability-agent.yaml
```

### Prepare the helm override file

A helm override file is required to deploy the agents to an environment. Update the following override file according to your needs.

#### Retrieve the Organization ID

The override file requires your organization ID. Run the following command to retrieve your organization ID:

```bash
axway auth whoami

AXWAY CLI, version 3.2.5
Copyright (c) 2018-2022, Axway, Inc. All Rights Reserved.

You are logged into a platform account in organization axway
The current region is set to US.

ORGANIZATION                          GUID                                  ORG ID
✔ axway                 55e55b55-0000-4444-9999-ac4fa4d444db  123937327920141

"TJOHNSON-AXWAY-COM" ROLES  DESCRIPTION    TYPE
  administrator             Administrator  Platform
  api_central_admin         Central Admin  Service

"TJOHNSON-AXWAY-COM" TEAMS  GUID                                  ROLE
✔ Default Team              4e44d44f-d444-4f44-9999-04f4ca44d4a4  administrator
```

The command returns details about your current logged in organization. The ID of the org from the command is `123937327920141`. Use this as the `tenantID` field in the yaml content below.

#### Retrieve the Environment ID

Run the following command to retrieve the ID of the Environment resource created earlier. Be sure to update the command to use the same environment name you created.

```bash
axway central get environments $YOUR_ENVIRONMENT_NAME -o yaml

group: management
apiVersion: v1alpha1
kind: Environment
name: istio
title: istio
metadata:
  id: 8ac9924581ed71fa0181ef817e9b0976
  audit:
    createTimestamp: 2022-07-11T23:04:10.139+0000
    createUserId: 31c9538c-32ad-4db7-a5e4-020470accd0c
    modifyTimestamp: 2022-07-11T23:04:10.139+0000
    modifyUserId: 31c9538c-32ad-4db7-a5e4-020470accd0c
  acl: []
  resourceVersion: '0'
  references: []
  selfLink: /management/v1alpha1/environments/istio
attributes: {}
finalizers: []
tags: []
spec:
  production: false
  axwayManaged: false
```

The Environment ID from the command above is `8ac9924581ed71fa0181ef817e9b0976`. Use this in the envID field, and use the Environment name field in the `envName` field in the following yaml:

#### Update the override file

```yaml
---
global:
  apic:
    host: apicentral.axway.com
    port: 443
    scheme: https
    timeout: 10s
  # Provide the ID of the Environment resource
  envID: 8ac9924581ed71fa0181ef817e9b0976
  # Provide the name of the Environment resource
  envName: "istio"
  instanceID: ""
  # Provide the tenantID
  tenantID: "123937327920141"
  imageRegistry: axway.jfrog.io/ampc-public-docker-release
  tokenUrl: "https://login.axway.com/auth/realms/Broker/protocol/openid-connect/token"
  aud: "https://login.axway.com/auth/realms/Broker"
  platformTimeout: 10s
  auth:
    baseUrl: "https://login.axway.com/auth"
    realm: Broker
    protocol: openid-connect
    platformTimeout: 10s

# Optional method that allows the helm chart to create the k8s secret that contains the service account public/private key pair.
secret:
  # Set to true to have the secret be created as part of the helm deployment
  create: false
   # The name of the secret. If create is set to true, then update als.keysSecretName, rda.keysSecretName, and ada.keysSecretName with the same secret name that is set here.
  name: ""
  password: ""
  publicKey: |
                # Public key pem content
  privateKey: |
                # Private key pem content

# configures the ALS Traceability agent
als:
  # Enables the ALS Traceability Agent
  enabled: true
  # Header publishing mode. Set to default or verbose.
  mode: default
  # Use the name of the K8SCluster resource
  clusterName: istio-k8scluster

  # Use the name of the TraceabilityAgent resource
  agentName: istio-ta

  # distinguishes events between apic deployments
  apicDeployment: prod

  # Use the name of the Service Account
  clientID: istio-service-account_12345678-0000-4444-99e9-ac4fa7d116db

  # condor ingestion endpoint
  condorUrl: ingestion.datasearch.axway.com:5044
  condorSslVerification: full

  # Set to true to connect to Amplify Central over gRPC
  grpcEnabled: false

  # Set to true to report traffic/metric events for marketplace subscription/application
  marketplaceProvisioningEnabled: false

  # Set to true to report traffic/metric events for marketplace subscription/application
  versionCheckerEnabled: "true"

  # sampling configuration
  sampling:
    percentage: 100
    per_api: true
    per_subscription: true
    reportAllErrors: true

  # The tracing provider configured for Istio
  istioTracer: "zipkin"

  # The name of the secret created in the cluster to hold the keys to authenticate with Amplify Central. 
	# If .Values.secret.create is set to true, then use the name set in .Values.secret.name
  keysSecretName: amplify-agents-keys
  publishHeaders: true

  # A list of namespaces where the envoy filters should be created
  istioGatewayNamespaces:
  - default

  # A list of request headers that are sent to the agent
  defaultModeRequestHeaders:
  - "accept"
  - "user-agent"
  - "x-envoy-decorator-operation"
  - "x-envoy-external-address"
  - "x-forwarded-client-cert"
  - "x-forwarded-for"
  - "x-forwarded-proto"
  - "x-istio-attributes"

  # A list of response headers that are sent to the agent
  defaultModeResponseHeaders:
  - "connection"
  - "content-length"
  - "content-md5"
  - "content-type"
  - "date"
  - "etag"
  - "request-id"
  - "response-time"
  - "server"
  - "start-time"
  - "vary"

#Redaction configuration
redaction:
  path:
    show:
  queryArgument:
    show:
    sanitize:
  requestHeader:
    show:
    sanitize:
  responseHeader:
    show:
    sanitize:

# discovers API Documentation
ada:
  # Use the name of the Service Account
  clientID: istio-service-account_12345678-0000-4444-99e9-ac4fa7d116db

  # name of the K8SCluster the agent is connected to
  clusterName: istio-k8scluster
  command: apis
  # Enables API Discovery
  enabled: true

  # name of the secret containing the public & private keys used by the provided service account client ID
  keysSecretName: amplify-agents-keys

# discovers running pods/services
rda:
  # Use the name of the Service Account
  clientID: istio-service-account_12345678-0000-4444-99e9-ac4fa7d116db

  # name of the connected K8SCluster
  clusterName: istio-k8scluster
  command: resources
  # Enables Pod and Service Discovery
  enabled: false

  # name of the secret containing the public & private keys used by the provided service account client ID
  keysSecretName: amplify-agents-keys

# to enable deployment of demo list service with agent installation. Set to true to install the demo service
list:
  enabled: false
```

Copy the content into a file called `hybrid-override.yaml`.

### Deploy the agent

```bash
helm repo add axway https://charts.axway.com/charts
helm repo update
helm upgrade --install --namespace amplify-agents ampc-hybrid axway/ampc-hybrid -f hybrid-override.yaml
```

## Verify that the pods are running

1. After the installation is complete, run the following command with the namespace you selected for the Istio agent location and confirm that the pods are all in a running status:

    ```bash
    kgp -n amplify-agents
    NAME                               READY   STATUS    RESTARTS   AGE
    ampc-hybrid-ada-bc5fcd58-6ghvb     1/1     Running   0          18s
    ampc-hybrid-als-76b499bc7c-d4566   1/1     Running   0          17s
    ampc-hybrid-als-76b499bc7c-rgtqb   1/1     Running   0          17s
    ampc-hybrid-rda-64cfdb558b-7kz2s   1/1     Running   0          17s
    ```

2. If you opted to install the optional demo service, the `ampc-hybrid` helm installation creates a namespace named `ampc-demo` and deploys a service called `ampc-hybrid-list`. Run the following command to verify this demo service is running:

    ```bash
    kgp -n ampc-demo
    NAME                                READY   STATUS    RESTARTS   AGE
    ampc-hybrid-list-598f8f9b4b-9wsc6   2/2     Running   0          90s
    ```

3. The installation creates resources, which provide configuration to the API Discovery Agent and the Resource Discovery Agent. You can use the Axway CLI to verify the agents are configured and running, and to list the resources that are expected to exist as a result of the agents discovering the `ampc-hybrid-list` service:

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

For more information on the details of the resources and how the discovery process works, see [Discover APIs and services](/docs/connect_manage_environ/mesh_management/discover-apis-and-services/).

For more information on monitoring APIs and services, see [Monitor APIs and Services](/docs/connect_manage_environ/mesh_management/traceability_agent_configuration/).
