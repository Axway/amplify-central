---
title: Deploy your agents with helm
linkTitle: Deploy your agents with helm
weight: 55
date: 2022-9-26
---
Before deploying the helm chart, you must prepare the Kubernetes cluster, the Amplify environment, and the override file for deploying the chart correctly.

## Prepare the Kubernetes cluster

To prepare the cluster for the Amplify Agents, create a namespace for the agents to run in:

```bash
kubectl create namespace amplify-agents
```

A service account is required for the agents to connect to Amplify. Create a service account using the Amplify Central CLI, and either generate a public and private key pair, or provide the file paths to keys you would like to use for the service account:

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
✔ Roles · Engage Admin

Successfully created service account

Client ID: istio-service-account_12345678-0000-4444-99e9
```

After the service account has been created you will be provided with a Client ID. Save this ID to be used later in the `hybrid-override.yaml` to install the agents.

The public and private keys that were used to create the service account must be added to the namespace as a Secret:

```bash
kubectl create secret generic amplify-agents-keys \
--namespace amplify-agents \
--from-file=publicKey=public_key.pem \
--from-file=privateKey=private_key.pem \
--from-literal=password="" -o yaml
```

Alternatively, the Kubernetes Secrets can be created with the helm deployment by overriding the Secret properties. Please refer to the section [Update the override file](#update-the-override-file)

## Prepare Istio

An `IstioOperator` is required for Istio to connect to the Traceability Agent. It tells Istio where the Envoy Access Log Service is running. If you already have Istio deployed in your environment, then merge the following configuration into your `IstioOperator` resource and apply the change. If Istio is not yet deployed, then copy this configuration into a file and apply the change.

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

To deploy this change to your Istio environment you will run `istioctl install --set profile=$YOUR_PROFILE -f istio-override.yaml`.
Update the command to use your desired Istio profile, and then run the install. Refer to the [Istio documentation](https://istio.io/v1.9/docs/setup/install/istioctl/) for more information.

## Prepare Amplify

There are two agents that can be deployed, a Discovery Agent (DA) and a Traceability Agent (TA). The required Amplify resources are an `Environment` (one per target environment) and, where applicable, a `Mesh` resource that represents the mesh the cluster belongs to. The previous `K8SCluster` resource type has been removed from the API server and should not be used in new examples.

The following resources are used run the agents. Copy the yaml below into a file and use the Amplify Central CLI to create the resources. The names of the resources can be modified.

```yaml
apiVersion: v1alpha1
title: istio
name: istio
kind: Environment
spec:
  description: istio environment
---
apiVersion: v1alpha1
group: management
kind: Mesh
name: istio-mesh
title: istio-mesh
spec:
  description: Istio service mesh that contains one or more clusters
```

```bash
axway central create -f environment.yaml
```

For the Discovery Agent, create the DiscoveryAgent resource:

```yaml
group: management
apiVersion: v1alpha1
kind: DiscoveryAgent
name: istio-da
title: istio-da
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
axway central create -f discovery-agent.yaml
```

For the Traceability Agent, create the TraceabilityAgent resource:

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
✔ axway                 55e55b55-0000-4444-9999                         123456789912345

"ABC-AXWAY-COM" ROLES  DESCRIPTION    TYPE
  administrator             Administrator  Platform
  api_central_admin         Engage Admin  Service

"ABC-AXWAY-COM" TEAMS                GUID                                  ROLE
✔ Default Team              4e44d44f-d444-4f44-9999                     administrator
```

The command returns details about your current logged in organization. The ID of the org from the command is `123456789912345`. Use your org ID as the `tenantID` field in the yaml content below.

### Retrieve the Environment ID

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

The Environment ID from the command above is `8ac9924581ed71fa0181ef817e9b0976`. Use this in the envID field, and use the Environment name field in the `envName` field in the following yaml.

### Update the override file

```yaml
---
# Configuration for creating the K8S Secret that holds the Amplify Platform service account details as part of the helm chart deployment
secret:
  # Set to true, and provide the following values to enable the creation of the K8S Secret. als.keysSecretName and da.keysSecretName should receive the same name if this is enabled.
  create: false
  # Name of the secret that will be created
  name: ""
  # Set to false if the value of password, publicKey and privateKey properties are base64 encoded.
  # Defaults to true, the properties will be base64 encoded by template.
  base64Encode: true
  # Password for the private key
  password: ""
  # Content of the public key
  publicKey: ""
  # Content of the private key
  privateKey: ""

# Configures the ALS Traceability Agent
als:
  enabled: true

  # # Traceability Agent image overrides
  # image:
  #   fullPath:
  #   registry: docker.repository.axway.com
  #   repository: ampc-beano-docker-prod/2.1
  #   name: als-traceability-agent
  #   tag:
  #   pullPolicy: IfNotPresent
  #   pullSecret:

  # Amplify Central Configuration
  env:
    LOG_LEVEL: info
    # Amplify Central Deployment (prod, prod-eu, prod-ap)
    CENTRAL_DEPLOYMENT: prod
    # Amplify Central Region (US, EU, AP)
    CENTRAL_REGION: US
    CENTRAL_ENVIRONMENT: istio
    CENTRAL_AGENTNAME: istio-ta
    CENTRAL_AUTH_CLIENTID: istio-service-account_12345678-0000-4444-99e9
    CENTRAL_ORGANIZATIONID: "123456789912345"

  # Header publishing mode. Choose one of:
  #  - `ambient` (recommended baseline) — agent accepts forwarded access-log data and works with Telemetry CRs
  #  - `default` (sidecar) — sidecar access-log based capture (often referred to as "sidecar")
  #  - `verbose` — capture a superset of headers for debugging/observability
  # Note: the CLI still offers `default` and `verbose` choices; in documentation `sidecar` is often used as an equivalent term for `default` when referring to sidecar access-log capture.
  mode: ambient
  # Name for the cluster or mesh identifier (used for externalAPIID correlation)
  clusterName: istio-cluster
  # The tracing provider configured for Istio
  istioTracer: "zipkin"
  # Name of the secret containing the public & private keys used by the provided service account client ID
  keysSecretName: amplify-agents-keys
  # PersistentVolumeClaim configuration: logs and data claims are configurable via
  # the chart `values.yaml` under `persistentVolumeClaimConfig`. Example:
  # persistentVolumeClaimConfig:
  #   logs:
  #     storageClass: gp2
  #     name: logs-claim
  #     size: 2Gi
  #   data:
  #     storageClass: gp2
  #     name: data-claim
  #     size: 2Gi

  # Example `env:` snippet for traceability sampling and telemetry control:
  # env:
  #   TRACEABILITY_SAMPLING_PERCENTAGE: 10
  #   TRACEABILITY_SAMPLING_ONLYERRORS: false
  #   TRACEABILITY_SAMPLING_PER_API: true
  #   telemetry.enabled: false
  # List of namespaces where the ALS Envoy filters should be applied
  envoyFilterNamespaces:
  - default
  publishHeaders: true
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
  # Config to override default values set by the ALS agent by extracting them from the Access Log Entry filter metadata.
  # To override the apiID or clientID, filterName and filterKeyMeta must be set.
  metadataOverride:
    # The name of the filter that contains the metadata. Ex: "envoy.filters.http.lua"
    filterName: ""
    # The name of the key within the filter: Ex: "custom.metadata"
    filterKeyMeta: ""
    # The name of the API ID key found within the filterKeyMetadata: Ex: "externalAPIID"
    apiID: ""
    # The name of the Client ID key: Ex: "clientID"
    clientID: ""
  # Config for correlation service to be used for getting the apiID, stage, version and clientID to lookup API Server resources.
  correlation:
    # correlation service host
    host:
    # correlation service port
    port:

# Configures the Discovery Agent
da:
  enabled: true

  # # Discovery Agent image overrides
  # image:
  #   fullPath:
  #   registry: docker.repository.axway.com
  #   repository: ampc-beano-docker-prod/1.1
  #   name: istio-discovery-agent
  #   tag:
  #   pullPolicy: IfNotPresent
  #   pullSecret:

  # Amplify Central Configuration
  env:
    LOG_LEVEL: info
    # Amplify Central Region (US, EU, AP)
    CENTRAL_REGION: US
    CENTRAL_ENVIRONMENT: istio
    CENTRAL_AGENTNAME: istio-da
    CENTRAL_AUTH_CLIENTID: istio-service-account_12345678-0000-4444-99e9
    CENTRAL_ORGANIZATIONID: "123456789912345"

  # Name for the Istio cluster or mesh identifier
  clusterName: istio-cluster
  # Name of the k8s secret for private/public key pair
  keysSecretName: amplify-agents-keys
  # Discovery configuration
  discovery:
    # List of http endpoints to discover api specs from
    specEndpoints:
    - /apidoc/swagger.json
    - /swagger.json
    - /api/v1/docs
    - /apis/docs
    virtualService:
      # List of namespaces that will be used by agent to discover VirtualService resources
      namespaces:
      - ampc-demo
      # List of labels that will be used by agent to filter VirtualService resources
      labels: []
    requestAuth:
      # List of namespaces that will be used by agent to discover RequestAuthentication resources
      namespaces:
      - ampc-demo
      # List of labels that will be used by agent to filter RequestAuthentication resources
      labels: []
  # IDP Provider configuration
  idpProviders:

# Deploy the chart with an optional demo service
list:
  enabled: true
```

Copy the content into a file called `hybrid-override.yaml`.

For a detailed example of how to configure the agent for discovery, see [Discover APIs and Services](/docs/connect_manage_environ/mesh_management/discover-apis-and-services/).

#### Fields to update

There are several fields that must be updated in order to properly connect to Amplify and discover resources in your environment.

## Deploy the agent

```bash
helm repo add axway https://helm.repository.axway.com --username==<client-id> --password=<client_secret>
helm repo update
helm upgrade --install --namespace amplify-agents ampc-hybrid axway/ampc-beano-helm-prod-ampc-hybrid -f hybrid-override.yaml
```

Note: the `ampc-hybrid` umbrella chart deploys both the Discovery Agent (DA) and Traceability Agent (TA) together. If you prefer, the Traceability Agent also ships as a standalone chart (`als-traceability-agent`) and can be installed separately. When installing in air-gapped or secured clusters that pull images from Axway's private registry, create a docker-registry secret (type `kubernetes.io/dockerconfigjson`) so pods can pull private images. For example, create the secret with:

```bash
kubectl create secret docker-registry <secret-name> \
  --docker-server=<registry-server> \
  --docker-username=<username> \
  --docker-password=<password> \
  --docker-email=<email> --namespace <namespace>
```

Pass the secret name to the chart using the `image.pullSecret` or `pullSecret` values.

## Helm install quick steps

Follow these high-level steps to install the Amplify Istio Agents using Helm. These steps cover the common items required for a successful install:

1. Prepare a Kubernetes namespace and service account/keys as described above.
2. Create or update a Helm override file (for example `hybrid-override.yaml`) with required values including `env:` entries, `keysSecretName`, `clusterName`, and the `persistentVolumeClaimConfig` for `logs` and `data` if persistent storage is required.
3. If installing in an air-gapped or secured cluster, create a `docker-registry` secret and set `image.pullSecret` in the override file.
4. Add the Axway Helm repo and update:

```bash
helm repo add axway https://helm.repository.axway.com --username=<client-id> --password=<client_secret>
helm repo update
```

1. Install or upgrade the umbrella chart (example installs both Discovery and Traceability agents):

```bash
helm upgrade --install --namespace <NAMESPACE> ampc-hybrid axway/ampc-beano-helm-prod-ampc-hybrid -f hybrid-override.yaml
```

* To set the Traceability Agent mode (ambient/default/verbose) at install time use `--set als.mode=<mode>` or set it in your `hybrid-override.yaml`.
* If you need the chart to create Istio Telemetry CRs automatically when using ambient mode, set `telemetry.enabled=true` in the values or via `--set als.telemetry.enabled=true`.
* Verify pods and logs with `kubectl -n <NAMESPACE> get pods` and `kubectl -n <NAMESPACE> logs <podName>`.

Notes:

* Use `--set` overrides carefully — complex multi-value overrides are easier to manage in an override file.
* For private images, ensure `image.pullSecret` is set and the secret exists in the target namespace.

## Deploy DA and TA with separate Helm charts

If you prefer to manage the Discovery Agent (DA) and Traceability Agent (TA) independently, both agents can be deployed using separate Helm charts instead of the `ampc-hybrid` umbrella chart. This provides more granular control over lifecycle, versions, and values for each agent.

Example: install the Traceability Agent standalone chart (`als-traceability-agent`):

```bash
helm repo add axway https://helm.repository.axway.com --username=<client-id> --password=<client_secret>
helm repo update
helm upgrade --install --namespace amplify-agents ampc-als axway/als-traceability-agent -f hybrid-override.yaml
```

Example: install the Discovery Agent standalone chart (often named `discovery-agent` or similar in the Axway repo):

```bash
helm repo add axway https://helm.repository.axway.com --username=<client-id> --password=<client_secret>
helm repo update
helm upgrade --install --namespace amplify-agents ampc-da axway/discovery-agent -f hybrid-override.yaml
```

Notes:

* **Values separation**: When installing separately, split or adapt values in your override file so that values intended for the DA go under the `da:` key and values for the TA go under the `als:` (or `ta:`) key as appropriate for each chart. Standalone charts typically accept the same top-level values (`env`, `keysSecretName`, `clusterName`, `persistentVolumeClaimConfig`) but namespacing may differ — check the chart's `values.yaml` for exact keys.
* **Versioning**: Installing charts independently allows you to upgrade DA and TA separately to different chart/app versions.
* **Resource footprint**: Separate installs create distinct Kubernetes resources (Deployments/StatefulSets/DaemonSets) per agent which can simplify resource tuning and RBAC separation.
* **Helm hooks and CR creation**: If you rely on umbrella-chart hooks (for example to create shared Secrets or CRs), ensure you account for those when installing separately — you may need to create those resources yourself or enable equivalent hooks in each chart.

## Verify that the pods are running

1. After the installation is complete, run the following command with the namespace you selected for the Istio agent location and confirm that the pods are all in a running status:

    ```bash
    kgp -n amplify-agents
    NAME                               READY   STATUS    RESTARTS   AGE
    ampc-hybrid-da-bc5fcd58-6ghvb     1/1     Running   0          18s
    ampc-hybrid-als-76b499bc7c-d4566   1/1     Running   0          17s
    ```

2. If you opted to install the optional demo service, the `ampc-hybrid` helm installation creates a namespace named `ampc-demo` and deploys a service called `ampc-hybrid-list`. Run the following command to verify this demo service is running:

    ```bash
    kgp -n ampc-demo
    NAME                                READY   STATUS    RESTARTS   AGE
    ampc-hybrid-list-598f8f9b4b-9wsc6   2/2     Running   0          90s
    ```

## Where to go next

For more information on the details of the resources and how the discovery process works, see [Discover APIs and services](/docs/connect_manage_environ/mesh_management/discover-apis-and-services/).

For more information on monitoring APIs and services, see [Monitor APIs and Services](/docs/connect_manage_environ/mesh_management/traceability_agent_configuration/).
