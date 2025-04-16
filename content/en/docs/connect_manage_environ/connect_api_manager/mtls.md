---
title: Mutual Authentication support
linkTitle: Mutual Authentication support
draft: false
weight: 70
---

Let your consumers know what to fo for trying out APIs secured with mutual TLS (mTLS).

## Before you start

* Read [Customize Application Registration, credentials request and subscription screens](/docs/integrate_with_central/customize_ard_crd)
* Familiarize yourself with [Engage CLI](/docs/integrate_with_central/cli_central)

## Objectives

Configure a `CredentiaRequestDefinition` to indicate that the API supports mTLS, enabling proper guidance for consumers in the Marketplace when trying out the API.

## What is mTLS?

Mutual TLS (mTLS) is a security feature that ensures both the client and serververify each other's identities before allowing data exchange. It works as follows:

* **Certificates**: Both parties (the client and the server) present digital certificates to prove their identities.

* **Handshake Process**: When the client wants to talk to the server, they go through a process called handshake. During this handshake:

    * Client sends its certificate to the server.
    * Server validates the client's certificate.
    * Server sends its certificate to the client.
    * The client validates the server's certificate.

* **Encrypted communication**: After successful validation, both sides establish an encrypted communication.

* **Secure Communication**: With both sides verified and the data encrypted, the client and server can now communicate securely.

In summary, mTLS adds an extra layer of security by making sure both the client and the server are who they claim they are before talking to each other.

## mTLS setup in Amplify Engage

* **Enable mTLS on the API in API Manager**: In Axway API Manager, configure your API frontend to use inbound 2-way SSL or assing a custom policy implementing mTLS.

* **Attach a Credential Request Definition**: Once the API is discoverd, a `CredentialRequestDefinition` should be attached to the API Service Instance as described in the [customization guide](/docs/integrate_with_central/customize_ard_crd#customize-credential-request-screen).

* **Update the Schema Definition**: Modify the CredentialRequestDefinition schema to include the `x-axway-mtls` property as described below:

```json
"x-axway-mtls": {
    "type": "string",
    "x-axway-hidden": true
}  
```

**Example of an API Key schema with mTLS support**

```json
{
    "group": "management",
    "apiVersion": "v1alpha1",
    "kind": "CredentialRequestDefinition",
    "name": "api-key-mtls",
    "title": "API Key and mTLS",
    "metadata": {
        "scope": {
            "kind": "Environment",
            "name": "{environment-name}",
        }
    },
    "attributes": {},
    "finalizers": [],
    "tags": [],
    "spec": {
        "schema": {
            "type": "object",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "properties": {
                "cors": {
                    "type": "array",
                    "items": {
                        "anyOf": [
                            {
                                "type": "string"
                            }
                        ]
                    },
                    "title": "Javascript Origins",
                    "uniqueItems": true
                },
                "x-axway-mtls": {
                    "type": "string",
                    "x-axway-hidden": true
                } 
            },
            "description": "",
            "x-axway-order": [
                "cors"
            ]
        },
        "provision": {
            "schema": {
                "type": "object",
                "$schema": "http://json-schema.org/draft-07/schema#",
                "required": [
                    "apiKey"
                ],
                "properties": {
                    "apiKey": {
                        "type": "string",
                        "title": "API Key",
                        "x-axway-encrypted": true
                    }
                },
                "description": "",
                "x-axway-order": [
                    "apiKey"
                ]
            },
            "policies": {
                "expiry": {
                    "period": 60
                },
                "suspendable": true
            }
        }
    }
}
```

**YAML equivalent**:

```yaml
---
group: management
apiVersion: v1alpha1
kind: CredentialRequestDefinition
name: api-key-mtls
title: API Key and mTLS
metadata:
  scope:
    kind: Environment
    name: apigtw-v77
attributes: {}
finalizers: []
tags: []
spec:
  schema:
    type: object
    $schema: http://json-schema.org/draft-07/schema#
    properties:
      cors:
        type: array
        items:
          anyOf:
            - type: string
        title: Javascript Origins
        uniqueItems: true
      x-axway-mtls:
        type: string
        x-axway-hidden: true
    description: ''
    x-axway-order:
      - cors
  provision:
    schema:
      type: object
      $schema: http://json-schema.org/draft-07/schema#
      required:
        - apiKey
      properties:
        apiKey:
          type: string
          title: API Key
          x-axway-encrypted: true
      description: ''
      x-axway-order:
        - apiKey
    policies:
      expiry:
        period: 60
      suspendable: true
```

Once this schema is applied, the mTLS capability will be reflected in the Marketplace. On the resource details screen, consumers will see a message guiding them to store their client certificate in their browser's certificate store to ensure the mTLS handshake works correctly.
