---
title: Manage your runtime compliance
linkTitle: Manage your runtime compliance
weight: 495
date: 2024-04-01
hide_readingtime: true
---

With an increasing number of APIs, API providers and consumers of APIs, there is a pressing need to capture API traffic and scan the API traffic to assess the security threat(s).

The Amplify API Management platform allows you to assess the runtime compliance of your APIs from a secruity threat perspective. This is known as API Runtime Compliance and has been integrated into the Amplify API Management. Runtime Compliance is an entitlement you can purchase from Axway as part of the API Management platform.

## What is runtime compliance

Runtime compliance is assessment of the potential security risk based on the real API traffic.  Amplify has integrated with Graylog API Security to monitor and assess the security threats from real captured API traffic.  For example, the captured API traffic is scanned by Graylog API security to detect real attacts, leaks, and other threats to your APIs.
To get started, you have to create an Amplify environment which connects to Graylog API Security and to retrieve the security results.   The Graylog API Security data is correlated with the Managed APIs from the API Gateways connected to the Amplify Enterprise Marketplace to determine a security grading.   For APIs not found as a match to the API Gateways in the Amplify Enterprise Marketplace, these APIs are represented as Runtime Unmanaged APIs with a security grading.  These unmanaged runtime APIs are the group of unknown APIs not registed with an API Gateway. 

## Related topics

See the following topics for related information.
