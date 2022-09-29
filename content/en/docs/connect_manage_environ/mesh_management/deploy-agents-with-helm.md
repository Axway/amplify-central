---
title: Deploy your agents with helm
linkTitle: Deploy your agents with helm
weight: 55
date: 2022-9-26
---
Before deploying the helm chart, you must prepare the Kubernetes cluster, the Amplify environment, and the override file for deploying the chart correctly.

## Prepare the kubernetes cluster

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
✔ Roles · Central Admin

Successfully created service account

Client ID: istio-service-account_12345678-0000-4444-99e9
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

## Prepare Amplify Central

There are two agents that can be deployed, a Discovery Agent and a Traceability Agent. The Environment and K8SCluster resources are required for each agent.

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
kind: K8SCluster
name: istio-k8scluster
title: istio-k8scluster
spec:
  mesh: istio-mesh
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
  api_central_admin         Central Admin  Service

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
global:
  # Amplify Central Configuration
  central:
    url: https://apicentral.axway.com:443
    clientTimeout: 10s
    envID: 8ac9924581ed71fa0181ef817e9b0976
    envName: "istio"
    tenantID: "123456789912345"
    grpcEnabled: "true"
    marketplaceProvisioningEnabled: "true"
    auth:
      baseUrl: "https://login.axway.com/auth"
      clientTimeout: 10s

  # Configuration for creating the K8S Secret that holds the Amplify Platform service account details as part of the helm chart deployment
  secret:
    # Set to true, and provide the following values to enable the creation of the K8S Secret. als.keysSecretName and da.keysSecretName should receive the same name if this is enabled.
    create: false
    name: ""
    password: ""
    publicKey: ""
    privateKey: ""

  # configures the ALS Traceability agent
  als:
    enabled: true
    # Header publishing mode. Set to default or verbose.
    mode: default
    # Name of the k8scluster
    clusterName: istio-k8scluster
    # Name of the traceability agent resource
    agentName: istio-ta
    # Amplify Central Deployment (prod, prod-eu)
    apicDeployment: prod
    # Amplify Platform service account client ID
    clientID: istio-service-account_12345678-0000-4444-99e9
    # Amplify ingestion service endpoint
    condorUrl: ingestion.datasearch.axway.com:5044
    condorSslVerification: full
    # Sampling configuration
    sampling:
      percentage: 100
      per_api: true
      per_subscription: true
      reportAllErrors: true
    # The tracing provider configured for Istio
    istioTracer: "zipkin"
    # Name of the secret containing the public & private keys used by the provided service account client ID
    keysSecretName: amplify-agents-keys
    publishHeaders: true
    # List of namespaces where the ALS Envoy filters should be applied
    envoyFilterNamespaces:
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

  # configures the discovery agent
  da:
    enabled: true
    # Name of the discovery agent resource
    agentName: istio-da
    # Amplify Platform service account client ID
    clientID: istio-service-account_12345678-0000-4444-99e9
    # Name of the k8s secret for private/public key pair
    keysSecretName: amplify-agents-keys
    # name of the K8SCluster the agent is connected to
    clusterName: istio-k8scluster
    # Polling interval for events
    pollInterval: "60s"
    # Discovery Configuration
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
helm repo add axway https://charts.axway.com/charts
helm repo update
helm upgrade --install --namespace amplify-agents ampc-hybrid axway/ampc-hybrid -f hybrid-override.yaml
```

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
