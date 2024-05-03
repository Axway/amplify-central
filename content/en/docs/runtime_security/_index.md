---
title: Manage your runtime compliance
linkTitle: Manage your runtime compliance
weight: 495
date: 2024-04-01
hide_readingtime: true
---

With an increasing number of APIs, API providers and consumers of APIs, there is a pressing need to capture and scan API traffic to assess security threats.

Amplify's runtime compliance entitlement for the API Management platform allows you to assess the runtime compliance of your APIs from a security threat perspective. Runtime Compliance is an entitlement you can purchase from Axway as part of the API Management platform.

## What is runtime compliance

Runtime compliance is the assessment of potential security risks based on real-time API traffic. Amplify has integrated with [Graylog API Security](https://graylog.org/products/api-security/) to monitor and assess API traffic for security threats. For example, the captured real-time API traffic is continuously scanned by Graylog API security to detect real attacks, leaks, and other threats.

## What are Unmanaged APIs

There is a grouping of "Runtime Managed" APIs that are discovered from all the API gateways connected to the Amplify Marketplace.  The group of "Runtime Unmanaged" APIs are discovered from Graylog API Security.  Both can be visualized on the [Service Registry](/docs/manage_service_registry/service_management). The combination of "Runtime Managed" and "Runtime Unmanaged" APIs is a representation of all the APIs. As a result of the runtime Compliance, APIs can be prioritized for remediation based on the security grading.

## How runtime compliance works

* An Amplify environment is created that connects to Graylog API Security data lake.  
* The Amplify Graylog agent retrieves the security results and correlates the endpoints with the Managed API endpoints from the API Gateways connected to the Amplify Enterprise Marketplace.
* Graylog API Security assesses and determines a security grading.  

{{< alert title="Note" color="primary" >}}APIs that do not match the API Gateways in the Amplify Enterprise Marketplace are represented as Runtime Unmanaged APIs with a security grading. These unmanaged runtime APIs are unknown APIs not registered with an API Gateway.{{< /alert >}}

## Related topics

See the following topics for related information.
