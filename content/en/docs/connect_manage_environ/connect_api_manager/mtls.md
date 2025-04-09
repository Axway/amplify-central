---
title: Mutual Authentication support
linkTitle: Mutual Authentication support
draft: false
weight: 70
---

Customize your Access Request Definition so your consumer will know what to do for trying out API with mTLS security.

## Before you start

* Read [Customize Application Registration, credentials request and subscription screens](/docs/integrate_with_central/customize_ard_crd)
* Get familiar with [Engage CLI](/docs/integrate_with_central/cli_central)

## Objectives

Learn how to update AccessRequestDefinition to inform the Marketplace that the API Security supports mTLS.

## Mutual TLS definition

Mutual TLS (mTLS) is a security feature that ensures both sides of a communication (the client and the server) verify each other's identities before exchanging data. Here's a simple breakdown:

**Certificates**: Both the client and the server have digital certificates. These certificates are like ID cards that prove their identities.

**Handshake**: When the client wants to talk to the server, they go through a process called a handshake. During this handshake:

* The client sends its certificate to the server.
* The server checks the client's certificate to make sure it's valid.
* The server sends its certificate to the client.
* The client checks the server's certificate to make sure it's valid.

**Encryption**: Once both sides have verified each other's certificates, they agree on a way to encrypt the data they will send to each other. This encryption makes sure that even if someone intercepts the data, they can't read it.

**Secure Communication**: With both sides verified and the data encrypted, the client and server can now communicate securely.

In summary, mTLS adds an extra layer of security by making sure both the client and the server are who they claim to be before they start talking to each other.

## Mutual TLS in Amplify Engage

First, you need to configure the API on Axway Manager to support that security layer: you have to use the 2-way SSL security on the API frontend or assign a custom policy that uses mTLS.

Once the API is discoverd, a credential request definition should be attached to the API Service Instance as mentioned [here](/docs/integrate_with_central/customize_ard_crd#customize-credential-request-screen).

Update the `schema` definition and add the `x-axway-mtls` property as describe below:

```json
"x-axway-mtls": {
    "type": "string",
    "x-axway-hidden": true
}  
```

Sample of x-axway-mtls properties in an API Key schema:

```json
{
    "group": "management",
    "apiVersion": "v1alpha1",
    "kind": "CredentialRequestDefinition",
    "name": "api-key",
    "title": "API Key",
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

Same in yaml format:

```yaml
---
group: management
apiVersion: v1alpha1
kind: CredentialRequestDefinition
name: api-key
title: API Key
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

Once the schema is updated, the information will be transmitted to the Marketplace product resources. Under the specific resource details screen a warning message will be displayed to inform the user how to try out the API. Consumer will have to store their client certificate in their browser certificate storage so that the Mutual TLS handshake works.