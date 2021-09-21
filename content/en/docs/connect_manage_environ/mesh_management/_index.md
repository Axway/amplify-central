---
title: Connect Istio Gateway
linkTitle: Connect Istio Gateway
weight: 130
date: 2019-07-30
description: Understand what Amplify Istio agents are used for, what a hybrid environment is,
  and how you can monitor the APIs and microservices in a hybrid environment from
  Amplify Central.
---

## What is Istio Gateway connected?

Connecting Istio Gateway to Amplify Central will provide you with a global centralized view of your APIs and their related traffic.

Each Istio Gateway can be represented by an Amplify Central environment allowing you to better filter APIs and their traffic. Supplied with the environment, two agents (Discovery and Traceability) interact with Istio Gateway and Amplify Central to:

* Monitor your public and private services, wherever they are located
* Connect and manage those hybrid environments and their service meshes

## What is a hybrid environment?

Amplify Central provides a central control plane, hosted in Axway public cloud, which manages your API traffic across multiple cloud and on-premise environments. It can monitor data planes in the Axway public cloud as well as in numerous connected private cloud hybrid environments. In Amplify Central, *hybrid* means working across SaaS, multi-cloud, and on-premise environments.

![Amplify Central control plane](/Images/central/hybrid_control_data_plane.png)

### Control plane

The control plane is where you manage the API traffic flowing through the data plane.

### Data plane

The data plane is where API transactions and related user microservices are hosted. The data plane is wherever you want it to be, for example, it can be Axway managed, or customer managed using Kubernetes, Amazon EKS, Google Kubernetes Engine, and so on.

The data plane in an Amplify Central hybrid environment is split into a service mesh data plane and a control plane.

* Service mesh data plane – Consists of a set of intelligent proxies (Envoy) deployed as sidecars on your microservices.
* Service mesh control plane – Amplify Istio agents configure Istio to provide traceability functionalities.

For more information on Istio and Envoy, see the [Istio documentation](https://istio.io/latest/docs/).

## Amplify Istio agents

Amplify Istio agents provide the secure connection between your hybrid environments and the Amplify Central public cloud. The Istio agents run in the service mesh in your hybrid environment and enables you to monitor your microservices from Amplify Central.

### Amplify Istio Discovery Agent

The Amplify Istio Discovery Agent listens for events coming from Kubernetes to discover pods, services, and API documentation within your cluster to publish resources to Amplify Central in a corresponding environment.

### Amplify Istio Traceability Agent

The Amplify Istio Traceability Agent (TA) sends metrics and logs for API activity back to Amplify Central so that you can monitor service activity and troubleshoot your services. All API transactions are captured and sent to Amplify Central. The agent has deployment configuration options that control the optional logging of request and response headers. The payload remains in the hybrid data plane and can be operated on by other native tools.
