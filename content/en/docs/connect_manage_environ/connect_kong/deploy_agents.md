---
title: Deploy your agents
linkTitle: Deploy your agents
draft: false
weight: 10
---
The Kong agents are delivered as containers, kong-discovery-agent and kong-traceability-agent. These containers can be deployed directly to a container server, such as Docker, or using the provided helm chart. In this section you will lean how to deploy the agents directly as containers or within a kubernetes cluster using the helm chart.

## Before you start

Before beginning to deploy the agents, gather the following in addition to the details that were noted in setup.

* The full URL to connect to the Kong admin API, `KONG_ADMIN_URL`. Note that if secured by kong, the URL should look like: [https://host:port/secured-route-from-kong]
* The host the agent will use when setting the endpoint of a discovered API, (`KONG_PROXY_HOST`)
    *The HTTP `KONG_PROXY_PORTS_HTTP` and HTTPs `KONG_PROXY_PORTS_HTTPS` ports the agent will use with the endpoint above
* The URL paths, hosted by the gateway service, to query for spec files, `KONG_SPEC_URLPATHS`
* Go to *Help menus > Downloads > Repository*
     -or-
* Go to [https://repository.axway.com/catalog?q=agents](https://repository.axway.com/catalog?q=agents) and search for the Docker image for the most recent agents to download as `{discoveryAgentImage}` and `{traceabilityAgentImage}`.

## Objectives

Learn how to deploy the agents directly as containers or within a kubernetes cluster using the helm chart.

* For a Docker-based agent, once the configuration is complete, the agent configuration must be copied to a Docker machine so that the Docker runner will find them.

### Docker deployment

Use the information gathered above to create two environment variable files for each agent to use. This is the minimum configuration, assuming defaults for all other available settings. The settings below expect the use of the API Key authentication method for the Kong Admin API.

#### Environment variables

Discovery Agent

```shell
KONG_ADMIN_URL=https://kong.url.com:8444
KONG_ADMIN_AUTH_APIKEY_HEADER="apikey"
KONG_ADMIN_AUTH_APIKEY_VALUE=123456789abcdefghijkl098765432109
KONG_PROXY_HOST=kong.proxy.endpoint.com
KONG_PROXY_PORTS_HTTP_VALUE=8000
KONG_PROXY_PORTS_HTTPS_VALUE=8443
KONG_SPEC_LOCALPATH=/specs
KONG_WORKSPACES=default,devops

CENTRAL_ORGANIZATIONID=123456789
CENTRAL_AUTH_CLIENTID=kong-agents_123456789-abcd-efgh-ijkl-098765432109
CENTRAL_ENVIRONMENT=kong
CENTRAL_REGION=US

```

Traceability Agent

```shell
CENTRAL_ORGANIZATIONID=123456789
CENTRAL_AUTH_CLIENTID=kong-agents_123456789-abcd-efgh-ijkl-098765432109
CENTRAL_ENVIRONMENT=kong
CENTRAL_REGION=US

```

#### Deployment

Kong Discovery agent

```shell
docker run -d -v /home/user/keys:/keys -v /home/user/specs:/specs -v /home/user/discovery/data:/data --env-file discovery-agents.env {discoveryAgentImage}
```

Kong Traceability agent

```shell
docker run -d -v /home/user/keys:/keys -v /home/user/traceability/data:/data --env-file traceability-agents.env -p 9000:9000 {traceabilityAgentImage}
```

Where:

`/home/user/keys` refers to the directory where the key files were created while setting up the platform service account.
`/home/user/discovery/data:/data` and `/home/user/traceability/data:/data` are volumes that are used to store cached information to be saved outside of the container in order to persist restarts.
`/home/user/specs:/specs` is a volume mount for the spec files, the path in the `KONG_SPEC_LOCALPATH` variable is `/specs` and the path outside fo the container is `/home/user/specs`.
`discovery-agents.env` and `traceability-agents.env` are files with the various environment variable settings that are available to each agent.

### Helm deployment

#### Traceability agent stateful set

The helm deployment of the Traceability Agent uses a resource type of Stateful set along with a service to distribute the events to the agent pods. This is to allow scaling of the Traceability Agent in order to properly handle the load of events being sent through Kong. The agent is expected to be ran in the same kubernetes cluster as the Gateway and the HTTP Log plugin should set its endpoint configuration to the [Service](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#services) that is created (i.e., `http://kong-traceability-agent.kong-agents.svc.cluster.local:9000` where `kong-traceability-agent` is the service name and `kong-agents` is the namespace for the service).

#### Create secrets

Platform service account key secret.

kong-agent-keys.yaml

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: kong-agent-keys
type: Opaque
stringData:
  private_key: |
    -----BEGIN PRIVATE KEY-----
    private
    key
    data
    -----END PRIVATE KEY-----
  public_key: |
    -----BEGIN PUBLIC KEY-----
    public
    key
    data
    -----END PUBLIC KEY-----
```

#### Create volume, local specification files only

A volume of with the local specification files is required, given that is the desired specification discovery method. This volume could be of any kubernetes resource type which can be mounted in the Kong agent container. See [Kubernetes Volumes](https://kubernetes.io/docs/concepts/storage/volumes/).

Below are a couple of examples on adding specifications to a volume, of any type, to the agent pod for discovery purposes.

##### ConfigMap

ConfigMap sample that is used for the local specification files.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-spec-files
data:
  petstore.json: |
  ...spec file contents...
```

If a ConfigMap is being used, the kubectl command provides a utility to create the resource file for you. The command that follows will create a ConfigMap named `specs`, in the current kubernetes context and namespace. All files found in the current directories `specs/` folder will be included in the ConfigMap resource.

```bash
kubectl create configmap specs --from-file=specs/
```

---
**NOTE:**

An update to the ConfigMap will *NOT* be seen by any running pods, a pod restart is required to see changes.

It is recommended to use a volume type that is more mutable than a ConfigMap. The agent has no knowledge of the volume type being used.

---

Once a resource with the files is created, which ever resource type is chosen, the overrides file must be updated with that resource information for mounting as a volume.

```yaml
kong:
  ...
  spec:
    localPath:
      configMap:             # type of the resource, provided in the deployment as a volume.
        name: my-spec-files  # name of the resource created
```

##### AWS S3 Synchronization

A kubernetes PersistentVolume resource with a CronJob volume can be set up to regularly synchronize spec files from an S3 bucket to the volume for the agent to utilize. Below you will find the three kubernetes resources that must be created, as well as the update to the agent helm chart override file.

* Create a PersistentVolume - this will store the specification files in the cluster
    * In this example a storage class of manual is used with a host path in the kubernetes cluster, however any class type may be used
        * [K8S Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
        * [EKS Persistent Volumes](https://aws.amazon.com/blogs/storage/persistent-storage-for-kubernetes/)

```yaml
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: spec-volume
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/data"
```

* Create a PersistentVolumeClaim - this allows pods to mount this volume, needed for the job and the agent

```yaml
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: spec-volume-claim
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

* Create a CronJob - this will run on the specified interval synchronizing the S3 bucket to the volume
    * The keys are embedded in this definition, but this can be replaced by a kubernetes secret or service account with the proper role in EKS
    * The schedule is to sync the spec files every 15 minutes
    * The bucket name is within the command, `specs-bucket`

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: s3-sync
spec:
  schedule: "*/15 * * * *"
  concurrencyPolicy: Forbid
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: s3-sync
            image: public.ecr.aws/aws-cli/aws-cli
            env:
            - name: AWS_ACCESS_KEY_ID
              value: XXXXXXXXXXXXXXXXXXX
            - name: AWS_SECRET_ACCESS_KEY
              value: XXXXXXXXXXXXXXXXXXX
            imagePullPolicy: IfNotPresent
            command:
            - /bin/sh
            - -c
            - aws s3 sync s3://specs-bucket/ /specs/
            volumeMounts:
            - name: specs-mount
              mountPath: /specs
          volumes:
          - name: specs-mount
            persistentVolumeClaim:
              claimName: spec-volume-claim
          restartPolicy: Never
```

* Override the agent helm chart accordingly
  
```yaml
kong:
  ...
  spec:
    localPath:
      persistentVolumeClaim:           # type of the resource, provided in the deployment as a volume.
        claimName: spec-volume-claim   # name of the resource created
```

#### Create overrides

overrides.yaml

```yaml
kong:
  enable:
    traceability: true # set this to true to deploy the Traceability Agent stateful set
  admin:
    url: http://kong-gateway-kong-admin.kong.svc.cluster.local:8001
  proxy:
    host: kong.proxy.endpoint.com
    ports:
      http: 80
      https: 443
  spec:
    localPath:
      configMap:            
        name: my-spec-files 
env:
  CENTRAL_ORGANIZATIONID: 123456789
  CENTRAL_AUTH_CLIENTID: kong-agents_123456789-abcd-efgh-ijkl-098765432109
  CENTRAL_ENVIRONMENT: kong
  CENTRAL_REGION=US
  
```

#### Deploy

Assuming you are already in the desired kubernetes context and namespace, execute the following commands.

Create the secret containing the Engage key files used for authentication.

```shell
kubectl apply -f kong-agent-keys.yaml
```

Install the helm chart using the created overrides file. Set the release version to install.

```shell
release=v0.0.2
helm upgrade -i kong-agents https://github.com/Axway/agents-kong/releases/download/${release}/kong-agents.tgz -f overrides.yaml
```
