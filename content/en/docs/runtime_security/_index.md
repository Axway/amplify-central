---
title: Manage your runtime compliance
linkTitle: Manage your runtime compliance
weight: 495
date: 2024-04-01
hide_readingtime: true
---

With an increasing number of APIs, API providers and consumers of APIs, there is a pressing need to capture and scan API traffic to assess security threats.

Amplify's runtime compliance feature allows you to assess the runtime compliance of your APIs from a security threat perspective. Contact Axway Support at support.axway.com or reach out to your Axway representative to learn how to enable runtime compliance for your organization.

## What is runtime compliance

Runtime compliance is the assessment of potential security risks based on real-time API traffic. Amplify has integrated with multiple tools to monitor and assess API traffic for security threats. For example, the captured real-time API traffic is continuously scanned by the tools to detect real attacks, leaks, and other threats.

* [Graylog API Security](https://graylog.org/products/api-security/)
    * [Configure Graylog](/docs/runtime_security/configure_runtime_compliance_graylog)
* [Traceable](https://www.traceable.ai/api-security-testing)
    * [Configure Traceable](/docs/runtime_security/configure_runtime_compliance_traceable)

## What are Unmanaged APIs

There is a grouping of "Runtime Managed" APIs that are discovered from all the API gateways connected to the Amplify Marketplace. The group of "Runtime Unmanaged" APIs are discovered from Graylog API Security. Both can be visualized on the [Service Registry](/docs/manage_service_registry/service_management). The combination of "Runtime Managed" and "Runtime Unmanaged" APIs is a representation of all the APIs. As a result of the runtime compliance, APIs can be prioritized for remediation based on the security grading.

## How runtime compliance works

* An Amplify environment is created that connects to a real-time API traffic monitoring tool.  
* The Amplify agent retrieves the security results and correlates the endpoints with the managed API endpoints from the API Gateways connected to the Amplify Enterprise Marketplace.
* The API Security monitoring tool assesses and determines a security grade.  

{{< alert title="Note" color="primary" >}}APIs that do not match the API Gateways in the Amplify Enterprise Marketplace are represented as Runtime Unmanaged APIs with a security grading. These unmanaged runtime APIs are unknown APIs not registered with an API Gateway.{{< /alert >}}

## Related topics

See the following topics for related information.
