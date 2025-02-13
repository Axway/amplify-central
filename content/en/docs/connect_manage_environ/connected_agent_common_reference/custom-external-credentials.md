---
title: Use Custom Credentials with the Discovery Agent
linkTitle: Use Custom Credentials with the Discovery Agent
draft: false
weight: 10
---
The Discovery Agent, for certain Gateways, can be configured to allow for handling a specified credential request type outside of the normal agent processing. This can be useful for cases where custom attributes or special processing is required that the agent does not know about.

## Before you start

* [Install and authenticate yourself via the Axway Central CLI](/docs/integrate_with_central/cli_central/cli_install/)
* Familiarize yourself with [JSON schemas](https://json-schema.org/)
* Validate that the specific Agent you want to use supports the handling of custom credential types

## Objectives

* Set up your custom credential request definition
* Set your configuration to notify the agent that the credential request definition is to be handled externally
* Create a Watch Topic or Webhook that an external process may use to subscribe to credential requests
* Update the requested credential in the proper order to notify the Engage consumer

## Creating a credential request definition

See [Customize Application Registration, credentials request and subscription screens](/docs/integrate_with_central/customize_ard_crd).

## Set the agent to ignore the custom credential

Each agent will support setting a custom credential differently. See the specific agent configuration for how to set this up.

## Integrating with Engage for handling a custom credential

In both cases, Watch Topic or Webhook, the integration should be set up for create and update events on the Credential resource in your specific Environment.

Upon receiving an event, the process checks a few data points to determine whether it should handle the event.

Handle provisioning a new credential when...

* The Credential resource references the custom Credential Request Definition
    * Check `spec.credentialRequestDefinition` for the referenced Credential Request Definition
* The Credential resource has a desired state of `active`
    * Check `spec.state.name` for the desired state
* The Credential resource has a `Pending` status
    * Check `status.level` for the status
* The Credential does not have the finalizer that the process will add

Handle a credential update event for updates when...

* The Credential resource references the custom Credential Request Definition
    * Check `spec.credentialRequestDefinition` for the referenced Credential Request Definition
* The Credential resource has a `Pending` status
    * Check `status.level` for the status
* The Credential has the finalizer that the process adds
* If the `state.name` is `active` and the `spec.state.name` is `inactive` the Credential should be disabled
* If the `state.name` is `inactive` and the `spec.state.name` is `active` the Credential should be enabled
* If `state.name` and `spec.state.name` are `active` and `spec.state.rotate` is true then the Credential should be rotated

Handle a credential update event for deletes when...

* The Credential resource references the custom Credential Request Definition
    * Check `spec.credentialRequestDefinition` for the referenced Credential Request Definition
* The Credential has the finalizer that the process adds
* The Credential is marked as `DELETING`
    * Check the `metadata.state` value for `DELETING`

### Integrate using a watch topic

See [Set up integrations through watch topics](/docs/integrate_with_central/integrate-with-watchtopics) for a full description of setting up watch topics.

### Integrating using a Webhook

See [Set up integrations through Webhooks](/docs/integrate_with_central/webhook) for a full description of setting up Webhooks.

## Updating the Credential resource after provisioning

After the Credential is handled by the custom processing, make the following updates to the Resource.

### Encrypting sensitive data within the credential

In order to encrypt any sensitive data, marked *x-axway-encrypted*, in the credential request definition, the custom processing needs public key information. This key can be easily obtained by retrieving the Managed Application resource that the Credential resource refers to.

Here is an example of a Managed Application with public key information.

```json
{
    "group": "management",
    "apiVersion": "v1alpha1",
    "kind": "ManagedApplication",
    "name": "my-app",
    "title": "My Application",
    "metadata": {
        "scope": {
            "kind": "Environment",
            "name": "my-env",
        }
    },
    "attributes": {},
    "finalizers": [
        {
            "name": "agent.managedapplication.provisioned"
        }
    ],
    "tags": [],
    "spec": {
        "security": {
            "encryptionKey": "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAzjKAKBf6LHiGit25qttm\n0Me8K2AMf7gVsVR4G+2Ir+cZwRg3PN7mLn2R5OEtCLxN/v5GcECojkN2L+4OrsKA\nH+ZnT86NgmN00Kvj6D0S4rXuzY6AmbpWqA2ynJX1XTe0Ao4mREjbk23GlpqCumcI\nbuxRxk5HesDL3PiXhftF1adZva1HBZQHLE0TWdoitWmVr9Go6ZCdzk1luASdyBxD\nodOu+63wI1a3y9yqtsceEAG/Yn4uDckYo2jQDtev8db85b4sUNENQFsWOZj+iUwH\nR1sFUEFA58VGSn9vcZ8Wz+Rn1EyH333SemBC1vlWzt05cQ+F/GfE86IlnNmOswjn\nF7qzcOO50wnUm6WhGwuQKfTgrhfsBFH2GaHrWsRytscGTaPUezklYCMp1NXY6kG5\nAKHoXhW1gyPYUY5YxF57/kglDJ5Q1kt52QXTBpqVcYWEbUha1+pU9g2MY6KEBRKC\ny64i5+EsZ6SQIlZN+hIhOI+NY2LWtWew8ViCErWCiGmNATnTDYExyXa+eL/pokIH\n7cmQP20dOIyJq6AL6e/SLrSFyYMIZEVXpsTS9ZIJTm1ebmFz16k4NFCcZLv1gVha\nFzTMKrLDccvcUv4M/S+GCdopnSc9wdEvk9WZ2G2uH8MvNyphe7NSpVo8xv2Th4jg\nZAQx+dcis026rM0fDGj78w0CAwEAAQ==\n-----END PUBLIC KEY-----",
            "encryptionHash": "SHA256",
            "encryptionAlgorithm": "RSA-OAEP"
        }
    }
}
```

### Updating the Credential resource

After encrypting any sensitive data, the custom handling makes the following updates to the Credential resource.

1. Update the base resource with a new finalizer.
    * A finalizer is a way to tell Engage to not immediately remove a resource on delete. In this case, the finalizer will allow the custom credential handling to do a cleanup when the Credential resource is deleted.
2. Update the data sub-resource with the provisioned data, including the encrypted and base64 encoded data.
3. Update the state sub-resource marking the credential as "active."
4. Add any data needed for updating or removing the credential in a custom sub-resource.
5. Finally, update the status sub-resource marking the credential as "Success."

Below is an example of a Credential resource with the finalizer, encrypted data, custom sub-resource, and updated status added. Simply update the Credential resource, as below, using the API. This includes a PUT call on the base resource and each of the sub-resource URLs.

{{< alert title="Note" color="primary" >}}
The last API call made must *always* be the status sub-resource
{{< /alert >}}

```json
{
    "group": "management",
    "apiVersion": "v1alpha1",
    "kind": "Credential",
    "name": "consumer-cred",
    "title": "Consumer Credential",
    "metadata": {
        "scope": {
            "kind": "Environment",
            "name": "my-env"
        }
    },
    "attributes": {},
    "finalizers": [
        {
            "name": "custom.credential.provisioned"
        }
    ],
    "tags": [],
    "spec": {
        "data": {
            "requested-data": "provided-value"
        },
        "state": {
            "name": "active"
        },
        "managedApplication": "my-app",
        "credentialRequestDefinition": "my-custom-credential"
    },
     "data": {
        "encyrpted-data": "K3vFk1A/LYBjAXePdkneuQ+dR+6RwrvWYZsPDokyfV/JIt9uI1/iwxlv6u0Bu+Nep7+EVKEMZhYbhV+PMBGn80tAZsypOg2HDVRw1HdnibRLic7fRvwwCS4uu3Yssu4PKJYiWxpJYY16cC84XtDlsmnnM+E+82GSn2nAU0NCjv77v+JrenD3xxVJVT+Q9wOkq3sdaUr3W38lLUWJNxGbaWFhWlvecWZ5wnjhwIFhM6wuSMVFJep9N4j4WOhosFCSvIyUbwvHjW07qq3NeTEnMJqrqBYo82RvcYf+/+A/BT/mZPtEpt7RsTnTbGljVdS6a+GYGAlQ8alpT82Mdgu0i8vvTI+BFAF/t5oS0iFAUuDEuakfnDrOvAAzLFZmE/51G/mWZsFFzSqsHsze/OUS1PUnnSUxbI/XmBSZ4iqHEQs0O5q9riE+Hm8PI/soTTrY8ZCAH+FXpJd1go5Mi70="
    },
    "state": {
        "name": "active"
    },
    "x-custom-credential": {
        "my-data-1": "9e1ade34-ec3d-446f-8387-4cda0ed368f4",
        "my-data-2": "17626962051421552363"
    },
    "status": {
        "level": "Success"
    }
}
```

### Deleting the Credential resource

If the process is handling a delete event, the only step that needs to be taken on the resource, after successful handling, is to remove the finalizer that the process added. Doing so will inform Amplify that the Credential resource may be completely removed from the system.
