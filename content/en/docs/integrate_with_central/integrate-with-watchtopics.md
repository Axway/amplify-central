---
title: Set up integrations through Watch Topics
linkTitle: Set up integrations through Watch Topics
weight: 100
hide_readingtime: true
---
Amplify enables the user to augment the default functionality through the integration of third-party systems. One of the ways this can be accomplished is with inbuilt events in combination with watch topics.

Common scenarios to integrate through watch topics are the following items:

* Manage custom credential handling
* Manage subscription invoices for custom billing

## Before you start

* You understand the concepts involved in the [API Server](/docs/integrate_with_central/api_server/).

## Objectives

Learn how to create and configure watch topics in Amplify, as well as the event structure that corresponds to a set of actions.

## Watch Topic

A watch topic is an API resource that is defined in such a way that a single topic may be used to keep track of changes on other specific API Server resources. For example when a new Credential is created in a given environment any watch topics that are set to track those credential resources will have a new event to handle.

### Create a watch topic

Create a watchtopic using API:

```bash
curl --location 'https://apicentral.axway.com/apis/management/v1alpha1/watchtopics' \
--data '{
    "group": "management",
    "apiVersion": "v1alpha1",
    "kind": "WatchTopic",
    "name": "custom-credentials-in-my-env",
    "title": "Custom Credential in My Environment",
    "spec": {
        "filters": [
            {
                "kind": "Credential",
                "name": "*",
                "type": [
                    "created",
                    "deleted",
                    "updated"
                ],
                "scope": {
                    "kind": "Environment",
                    "name": "my-env"
                },
                "group": "management"
            }
        ],
        "description": "Watch Topic for handling custom credentials."
    }
}'
```

Or create a watchtopic using the Axway CLI: Add the following in a file and apply the file `axway central apply -f {filename.yaml}`

```yaml
group: management
apiVersion: v1alpha1
kind: WatchTopic
name: custom-credentials-in-my-env
title: Custom Credential in My Environment
attributes: {}
tags: []
spec:
  filters:
    - kind: Credential
      name: '*'
      type:
        - created
        - deleted
        - updated
      group: management
      scope:
        kind: Environment
        name: 'my-env'
  description: "Watch Topic for handling custom credentials."
```

### Read events form a watch topic

Events in the WatchTopic are sequential and will available for seven days.

To request for all events in the watch topic query the API as below. It will return all events from oldest to newest.

```bash
curl --location 'https://apicentral.axway.com/events/management/v1alpha1/watchtopics/custom-credentials-in-my-env?sort=sequenceID
```

After handling the events follow up calls to the API should include a query using the sequenceID parameter as well as sequenceID for the last handled event `query=sequenceID>[id]`. Including the parameter argument will give only events that have been created after that sequenceID.

```bash
curl --location 'https://apicentral.axway.com/events/management/v1alpha1/watchtopics/custom-credentials-in-my-env?sort=sequenceID
```

Each of the above calls well return an array of events that have occurred for a given watch topic.

```json
[
    {
        "id": "acb8e658-5871-473b-9177-99c16c0bc25f",
        "time": "2024-10-28 15:43:02.689148",
        "version": "v1",
        "product": "AmplifyCentral",
        "correlationId": "18d2ef01-c04a-40a3-b959-d9f37ca733f3",
        "organization": {
            "id": "org-id"
        },
        "type": "ResourceCreated",
        "payload": {
            "group": "management",
            "kind": "Credential",
            "name": "my-new-credential",
            "finalizers": null,
            "attributes": {},
            "tags": [],
            "metadata": {
                "id": "8ac98c5a92d38a930192d3cb81720189",
                "selfLink": "/management/v1alpha1/environments/my-env/credential/my-new-credential",
                "references": [
                    {
                        "id": "8ac98c5a92d38a930192d3cb6fb00174",
                        "group": "management",
                        "kind": "ManagedApplication",
                        "name": "my-app",
                        "title": null,
                        "scopeName": null,
                        "scopeKind": null,
                        "selfLink": "/management/v1alpha1/environments/my-env/managedapplications/my-app",
                        "type": "HARD"
                    }
                ],
                "scope": {
                    "id": "8ac9887192467328019249e58c01014f",
                    "kind": "Environment",
                    "name": "my-env",
                    "selfLink": "/management/v1alpha1/environments/my-envedge"
                }
            }
        },
        "metadata": {
            "watchTopicSelfLink": "/management/v1alpha1/watchtopics/custom-credentials-in-my-env",
            "watchTopicID": "8ac9858191a360160191a3a32365001d",
            "sequenceID": 284734,
            "subresource": null
        }
    },
    {
        "id": "3c8e4073-aa47-4694-b74f-783ff35e9966",
        "time": "2024-10-28 15:43:02.707423",
        "version": "v1",
        "product": "AmplifyCentral",
        "correlationId": "18d2ef01-c04a-40a3-b959-d9f37ca711f3",
        "organization": {
            "id": "org-id"
        },
        "type": "ResourceUpdated",
        "payload": {
            "group": "management",
            "kind": "Credential",
            "name": "my-new-credential",
            "finalizers": null,
            "attributes": {},
            "tags": [],
            "metadata": {
                "id": "8ac98c5a92d38a930192d3cb81720189",
                "selfLink": "/management/v1alpha1/environments/my-env/credential/my-new-credential",
                "references": [
                    {
                        "id": "8ac98c5a92d38a930192d3cb6fb00174",
                        "group": "management",
                        "kind": "ManagedApplication",
                        "name": "my-app",
                        "title": null,
                        "scopeName": null,
                        "scopeKind": null,
                        "selfLink": "/management/v1alpha1/environments/my-env/managedapplications/my-app",
                        "type": "HARD"
                    }
                ],
                "scope": {
                    "id": "8ac9887192467328019249e58c01014f",
                    "kind": "Environment",
                    "name": "my-env",
                    "selfLink": "/management/v1alpha1/environments/my-envedge"
                }
            }
        },
        "metadata": {
            "watchTopicSelfLink": "/management/v1alpha1/watchtopics/custom-credentials-in-my-env",
            "watchTopicID": "8ac9858191a360160191a3a32365001d",
            "sequenceID": 284747,
            "subresource": null
        }
    }
]
```
