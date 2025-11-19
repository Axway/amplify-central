---
title: Discover APIs and services
linkTitle: Discover APIs and services
weight: 60
date: 2020-11-19
---
This topic explains how to configure the Amplify Istio Agent to discover your APIs and services.

## Before you begin

Before you start, see [Deploy your agents with the Axway CLI](/docs/connect_manage_environ/mesh_management/deploy-your-agents-with-the-axway-cli/) to learn how to use the CLI to install the Istio agents into your Kubernetes cluster, and to create default resources to discover the demo service that gets deployed.

This page references the resources created from the [Deploy your agents with the Axway CLI](/docs/connect_manage_environ/mesh_management/deploy-your-agents-with-the-axway-cli/) procedure.

You may optionally create the Amplify resources manually with the Axway CLI, and install the agents with helm by referencing [Deploy your agents with helm](/docs/connect_manage_environ/mesh_management/deploy-agents-with-helm/). Either article should be completed before starting.

## Overview

Amplify Istio Discovery Agent is a service that gets installed into your Kubernetes cluster as part of deploying the `ampc-hybrid` helm chart. The Discovery Agent is also available as a standalone Helm chart (`discovery-agent`) and can be installed independently if you prefer to manage DA and TA separately.

The Discovery Agent (DA) discovers Istio Virtual Service resources from configured namespaces, and creates API Services based on the routes defined in the Virtual Service.

## Configure the Discovery Agent

The Discovery Agent must be configured to find the Virtual Services, API documentation, and Request Authentication resources in your cluster.
The values below must be updated in the `hybrid-override.yaml` file in order for discovery to work.

To configure the discovery of Virtual Services, update `da.discovery.virtualService.namespaces` to provide a list of namespaces where the agent should find Virtual Service resources in your cluster.

```yaml
da:
  discovery:
    virtualService:
      namespaces:
      - namespace-1
      - namespace-2
    labels: []
```

You may optionally restrict discovery to specific resources by providing a list of label keys at `da.discovery.virtualService.labels`.
For example, if the agent is configured to discover from `namespace-1` and `namespace-2`, and you update `da.discovery.labels` to have the string `discovery`,
then only Virtual Services with a label key of `discovery` will be found in the `namespace-1` and `namespace-2` namespaces.

```yaml
da:
  discovery:
    virtualService:
      namespaces:
      - namespace-1
      - namespace-2
    labels:
    - discovery
```

Because the location of a spec file varies between each service, the agent must be provided a list of possible endpoints to look up the spec file when a service is discovered.
To configure this list of API spec endpoints, update `da.discovery.specEndpoints` with a list of endpoints for the agent to look for a spec file for each service found. The list of endpoints below is an example. The list of endpoints for your services will depend on where your documentation is found.

```yaml
da:
  discovery:
    specEndpoints:
    - /apidoc/swagger.json
    - /swagger.json
    - /api/v1/docs
    - /apis/docs
```

### How to discover Request Authentication resources

The agent can also discover `RequestAuthentication` resources in the cluster. This allows the agent to identify if a service is secured by OAuth.

By default, a `RequestAuthentication` resource applies to all K8S services running in the namespace that it is created in. If the `RequestAuthentication` is created in the `istio-system` namespace, then it will apply to all services across the cluster.

The `RequestAuthentication` can be configured to select specific services by providing labels for the `RequestAuthentication` to match on. Refer to the [Istio documentation](https://istio.io/v1.9/docs/reference/config/security/request_authentication/) to learn more.

The agent will create an Amplify resource called `CredentialRequestDefinition` for each JWT rule found in a `RequestAuthentication`. If a service is discovered, and it it is determined that Istio is applying a `RequestAuthentication` resource to secure that service, then the agent will publish an `APIService` in Amplify Engage with the authentication policy set as OAuth, and link the `APIServiceInstance` it creates to the `CredentialRequestDefinition` that was created from the Istio `RequestAuthentication`.

Discovery of `RequestAuthentication` is the same as the discovery of `VirtualServices`. Update `da.discovery.requestAuth.namespaces` with a list of namespaces for the agent to find the `RequestAuthentication` resources in. Optionally provide a list of labels to restrict the discovery to only resources with the provided label key.

```yaml
da:
  discovery:
    requestAuth:
      namespaces:
      - namespace-1
      - namespace-2
    labels:
    - discovery
```

## Discover the Hybrid List app

This section shows how to deploy a service called `hybrid-list`, create a `VirtualService` to expose the service outside the cluster, and allow the Istio DA to discover the api and publish it in Amplify. It also shows how to create a `RequestAuthentication` resource to secure the `hybrid-list` service, and then shows an OAuth policy applied to the API in Amplify.

### Prepare the hybrid-override.yaml

Configure the `hybrid-override.yaml` to discover `VirtualServices` and `RequestAuthentication` resources from the `ampc-demo` namespace, and documentation from the `/apidoc/swagger.json` endpoint

```yaml
da:
  discovery:
    specEndpoints:
    - /apidoc/swagger.json
    virtualServices:
      namespaces:
      - ampc-demo
    requestAuth:
      namespaces:
      - ampc-demo
```

Next, provide configuration for the agent to identify your external OAuth servers so that the agent can attach an OAuth policy to the API when it is discovered. The yaml content below is an example of how to provide configuration for an IDP. Please update the values to reflect your own IDP.

```yaml
da:
  idpProviders:
    - name: local-keycloak
      type: keycloak
      metadataUrl: https://example.com/.well-known/openid-configuration
      auth:
        type: "client"
        clientID: client-id
        clientSecret: client-secret
```

### Create the resources

The steps are as follows:

1. Copy the following content into a yaml file named `hybrid-list.yaml` on your machine.

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: hybrid-list
      namespace: apic-demo
      labels:
        app: hybrid-list
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: hybrid-list
      template:
        metadata:
          labels:
            app: hybrid-list
        spec:
          containers:
            - name: hybrid-list
              image: axway.jfrog.io/ampc-public-docker-release/hybrid/list:latest_dev
              imagePullPolicy: IfNotPresent
              ports:
                - name: http
                  containerPort: 8080
                  protocol: TCP
    ---
    apiVersion: v1
    kind: Service
    metadata:
      name: hybrid-list-service
      namespace: apic-demo
      labels:
        app: hybrid-list-service
    spec:
      ports:
        - port: 8080
          name: http
      selector:
        app: hybrid-list
    ```

2. Create a VirtualService. Copy the following content into a yaml file named `hybrid-list-vs.yaml` on your machine. Be sure to update `spec.gateways` with the name of the gateway resource that is deployed in your cluster that you would like to use, and update `spec.hosts` to be the name of the host this VirtualService uses.

    ```yaml
    apiVersion: networking.istio.io/v1beta1
    kind: VirtualService
    metadata:
      name: hybrid-list
      namespace: amplify-agents
    spec:
      hosts:
      - demo.hybrid.sandbox.axwaytest.net
      gateways:
      - gateway-ingress # Update the gateway to reflect the gateway resource you want to use
      http:
      - name: mylist
        match:
        - uri:
            prefix: "/hybridlist"
        rewrite:
          uri: "/api"
        route:
        - destination:
            host: ampc-hybrid-list.ampc-demo.svc.cluster.local
            port:
              number: 8080
    ```

3. Create a RequestAuthentication. Copy the content into a yaml file named `request-auth.yaml` on your machine. Be sure to update the resource to reflect your own IDP configuration.

    ```yaml
    apiVersion: "security.istio.io/v1beta1"
    kind: RequestAuthentication
    metadata:
      name: list-request-authentication
      namespace: ampc-demo
    spec:
      selector:
        matchLabels:
          app: list
      jwtRules:
        - issuer: "local-keycloak"
          jwksUri: https://example.com/.well-known/jwks.json
    ```

4. Create a new namespace named `ampc-demo`:

   ```bash
   kubectl create namespace ampc-demo
   ```

5. Deploy the `hybrid-list` app:

   ```bash
   kubectl apply -f hybrid-list.yaml
   ```

6. Create the hybrid list virtual service:

   ```bash
   kubectl apply -f hybrid-list-vs.yaml
   ```

7. Create the request authentication:

   ```bash
   kubectl apply -f request-auth.yaml
   ```

8. Verify that the deployment was successful and that the `hybrid-list` app is in a running status:

   ```bash
   ~ » kubectl get pods -n ampc-demo
   NAME                                READY   STATUS    RESTARTS   AGE
   hybrid-list-749ddd444-ncllr              1/1     Running   0          22m
   ```

9. If you modified anything in the `hybrid-override.yaml`, then re-deploy the helm chart. You can redeploy using the umbrella chart or deploy agents separately using the standalone charts:

  ```bash
  helm upgrade --install --namespace amplify-agents ampc-hybrid axway/ampc-hybrid -f hybrid-override.yaml
  # or deploy the agents individually
  helm upgrade --install --namespace amplify-agents ampc-als axway/als-traceability-agent -f ta-overrides.yaml
  helm upgrade --install --namespace amplify-agents ampc-da axway/discovery-agent -f da-overrides.yaml
  ```

1. Confirm that the agent discovered the hybrid-list virtual service by looking up `APIServices` in Amplify.

    ```bash
    ~ » axway central get apiservices -s istio
    ✔ Resource(s) successfully retrieved

    NAME    AGE            TITLE   RESOURCE KIND  SCOPE KIND   SCOPE NAME  RESOURCE GROUP  OWNER
    mylist  9 minutes ago  mylist  APIService     Environment  istio       management      Default Team
    ```

2. Confirm that the agent discovered the `RequestAuthentication` by looking up `CredentialRequestDefinitions` in Amplify.

    ```bash
    ~ » axway central get credentialrequestdefinitions -s istio
    ✔ Resource(s) successfully retrieved

    NAME                AGE             TITLE          RESOURCE KIND                SCOPE KIND   SCOPE NAME  RESOURCE GROUP
    local-keycloak-oauth-idp  22 minutes ago  OAuthlocal-keycloak  CredentialRequestDefinition  Environment  istio       management
    ```

3. Confirm that the agent discovered associated the `APIServiceInstance` to the `CredentialRequestDefinition`. The value of `spec.credentialRequestDefinition` should be the same as the `CredentialRequestDefinition` name from the previous step.

    ```bash
    ~ » axway central get apiserviceinstances -s istio mylist -o yaml
    ✔ Resource(s) successfully retrieved

    NAME                AGE             TITLE          RESOURCE KIND                SCOPE KIND   SCOPE NAME  RESOURCE GROUP
    local-keycloak-oauth-idp  22 minutes ago  OAuthlocal-keycloak  CredentialRequestDefinition  Environment  istio       management

    group: management
    apiVersion: v1alpha1
    kind: APIServiceInstance
    name: mylist
    title: mylist (istio)
    spec:
      endpoint:
        - host: tjohnson.hybrid.sandbox.axwaytest.net
          port: 8080
          routing:
            basePath: /hybridlist
          protocol: http
      apiServiceRevision: mylist.1
      accessRequestDefinition: istio
      credentialRequestDefinitions:
        - local-keycloak-oauth-idp # Should be the same crd name from the previous step
    ```
