---
title: Back-end TLS authentication
linkTitle: Back-end TLS authentication
weight: 60
date: 2019-10-16
description: Learn how to configure TLS for requests to your back-end API.
---

## Before you start

* You will need an administrator account for Amplify Central
* Learn how to import your API as an API proxy in Amplify Central (see [Register an API](/docs/central/saas_api_gateway/quickstart/#register-an-api))
* Learn how to use the Axway Central CLI to manage an API proxy (see [Manage an API proxy using Axway Central CLI](/docs/central/cli_central/cli_proxy_flow))

## Objectives

Learn how Transport Layer Security (TLS) is applied to requests to the back-end API:

* Understand what TLS is and how it can be useful
* Use the Amplify Central UI to to confirm TLS is negotiated for your API

## What is Transport Layer Security?

Transport Layer Security (TLS) is a internet protocol standard designed to allow security communications over the public Internet. It is similar in nature to what is used on most modern browsers to secure the communication from the browser to the server application. As part of the TLS protocol, a cryptographic cipher mechanism and key used to secure the communications is established between the client (Amplify Central API proxy) and the back-end API when it is configured as a HTTPS endpoint (for example, back-end URL `https://petstore.swagger.io/v2`).

There are two versions of TLS Protocol. Version 1.2 is described in [RFC 5246](https://tools.ietf.org/html/rfc5246). Version 1.3 is described in [RFC 8446](https://tools.ietf.org/html/rfc8446). In all versions of TLS, it can be configured to support one-way or two-way TLS.  In one-way TLS, the client (Amplify Central API proxy) requests a signed certificate from the back-end API endpoint. Two-way TLS is the same as one-way TLS with the additional step of the back-end API endpoint also requesting a signed certificate from the Amplify Central API proxy.

### TLS from Amplify Central API proxy to the back-end API

Amplify Central provides one-way TLS from the API proxy to the back-end API. One-way TLS is automatically negotiated for each API registered to a HTTPS back-end URL endpoint.

TLS versions 1.2 and 1.3 are both supported by Amplify Central. Advanced Encryption Standard (AES) using both 128-bit and 256-bit keys are supported. RSA 1024-bit public key lengths are supported for X.509v3 certificates.

## Confirm that TLS is negotiated for your API

1. [Register an API proxy](/docs/central/saas_api_gateway/quickstart/#register-an-api) for a HTTPS API endpoint in the Amplify Central UI.
2. Navigate to the **API Proxies** tab.
3. Click the API proxy name to open the API proxy details page.
4. Click the **Policies** tab, and verify the following under the **Request to backend** section:
    * The **Backend URL** should show a HTTPS endpoint
    * The **HTTPS certificate** should show a green check mark with a valid until date.

    ![Valid HTTPS certificate](/Images/central/TLS_example.png)
5. Click the gear icon next to the certificate to view details and optionally update the certificate.

## Review

You have learned what TLS is and how to set up TLS for a HTTPS back-end API.
