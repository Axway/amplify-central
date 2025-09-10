---
title: Add and manage stages
linkTitle: Add and manage stages
weight: 35
date: 2023-10-18
---

An API stage is a named environment that represents a specific point in the API’s lifecycle (such as development, testing, pre-production, or production). A stage provides a distinct deployment of the API, often with its own URL, configuration, and policies, allowing providers to control access, apply environment-specific settings, and promote APIs safely through their lifecycle.

In Amplify Engage, stages help you represent your API landscape. They act as labels (e.g., Dev, Test, Beta, Prod) that indicates where an API runs, who can see it in the Marketplace, and how it progresses through your delivery pipelines.

{{< alert title="Note" color="primary" >}}Stage management is optional.{{< /alert >}}

## How stages fit in Engage

| Concept                  | What it Means                                                           | Relationship to Stages                                                             |
| ------------------------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Environment**          | The connection point to a specific data plane where your APIs are hosted and managedv(e.g AWS Prod US).         | Can contain one or more stages (i.e Connected AWS gateway).|
| **API Service Endpoint** | A discovered or defined API instance (e.g., `https://api.example.com`). | Could be assigned to a stage, either automatically (via default stage) or manually.|
| **Marketplace**          | Where consumers browse and subscribe to API products.                           | Only endpoints in *visible stages* appear in the Marketplace.                      |

### Stage and environment

* Multiple stages can be assinged to one environment.
* Stages are optional. If you choose not to use them consumers will not see any lifecycle context (such as Dev, Test, or Prod) or environment information.
* One stage can be marked as **default**. New endpoints discovered in that environment are assigned to it automatically.
* Without a default, endpoints must be manually assigned.

### Stage & API service endpoints

* Each endpoint can be assigned to one stage.
* Users choose which endpoint/stage to expose when creating assets.

### Stages in Marketplace

* Stages determine what endpoints consumers see in the Marketplace.
* By default, a stage is not visible.
* A Catalog Manager must explicitly enable stage visibility.
* Stage visibility overrides product visibility.
    * Product visible + Stage hidden → Consumers see the product but no resources.
    * Product visible + Stage visible → Consumers see both product and resources.
 
{{< alert title="Note" color="primary" >}}The Marketplace does not request the user’s team context until they subscribe or register an application. As a result, it cannot filter plan resources by team in advance. Instead, the plan displays all resources available to any of the teams the user belongs to, which may be broader than what a specific team will ultimately be able to access. Upon subscription, the consumer is encouraged to review the plan details before proceeding to the subscription.{{< /alert >}}

#### Visibility options

You can restrict visibility to:

* Provider Organizations: Everyone, Specific teams, None.
* Consumer Organization: All, Selected Organizations, None.

**Example scenarios**:

* Dev endpoints → Internal dev team only
* Prod endpoints →  Integration teams + partner organizations.

``` yaml
---
group: management
apiVersion: v1alpha1
kind: APIServiceInstance
name: customer-data-instance-prod-v2
title: Customer Data Service Instance PROD V2
metadata:
  scope:
    kind: Environment
    name: demo-prod
attributes: {}
finalizers: []
tags:
  - nonprod
spec:
  endpoint:
    - host: prod200.k8s.axwayamplify.com
      port: 443
      routing:
        basePath: /apis
      protocol: https
  apiServiceRevision: customer-data-revision-v200
lifecycle:
  stage: demo-prod
```

## Managing stages

The following provider roles have access to and can manage stages: 

| Role            | Can View | Can Create | Can Assign     | Can Delete |
| --------------- | -------- | ---------- | -------------- | ---------- |
| Engage Admin    | ✅       | ✅          | ✅           | ✅        |
| Catalog Manager | ✅       | ✅          | ✅           |  ❌       |
| Developer       | ✅       | ❌          | ❌           | ❌        |

### View stages

1. Navigate to **Topology > Stages**.
2. The list displays:
    * **Name** - Display name.
    * **Environment** - The number of environments assigned.
    * **Services** - The number of API Services linked.
    * **Assets** - The number of assets tied to this stage.
    * **Description** - Short description.

### Create a stage

1. Navigate to **Topology > Stages > + Add New Stage**.
2. Enter the basic info:
    * **Title** (Required)
    * **Logical name** (Optional, auto-generated if empty)
    * **Description** (Optional)
3. Set Visibility

    * Choose **Platform Users** visibility
      
        * **Everyone** (Default) - visible to all registered users in your provider organization.
        * **Selected teams** - visible to members of the selected teams.
        * **Exclude selected teams** - visible to members outside of the selected teams.
        * **Include teams having tag** - visible to members of the teams that have the selected tag.
        * **None** - not visible in Marketplace
     
    * Choose **Marketplace Users** visibility: only available when Consumer Organizations are enabled for that Marketplace.
        * **Everyone** (Default) - all registered users in your provider organization.
        * **Selected organizations** - only users in the selected Consumer Organization.
        * **None** - not visible to any Consumer Organization.
5. Assign to environments:
     * Use dropdown to assign environments.
     * Mark as **Default** if needed.
     * If another default exists, a tooltip will show which one.
7. Add **Tags & Attributes**(optional).
8. **Save**.

### Deleting a stage (Engage Admin only) 

1. Navigate to **Topology > Stages**.
2. Select the stage(s).
3. Click **Delete**. A confirmation popup listing affected environments is displayed.
4. Confirm the action.

{{< alert title="Note" color="yellow" >}}A stage cannot be deleted once it is assigned to one or more environments and/or API services. You must remove the associations before deleting a stage.{{< /alert >}}

## Best practices

* **Always set a default stage** for each environment to avoid manual assignment.
* **Align stages with your CI/CD flow**: Dev → Test → Prod.
* **Be cautious with visibility**: Hide early stages (Dev, Beta) from external consumers.
* **Use consistent naming**: Match stage titles across environments (e.g., “Prod” not “Production” vs “Live”)

## Advanced options

### Multi-languages support

If multiple languages are enabled for a Marketplace, you can translate its name/description. Supported languages: English, French, German, Brazilian Portuguese.

1. Navigate to **Topology > Stages**.
2. Select a stage. From the **...(ellipses)** menu, choose **Translate**.
3. Set default language and add translations as needed.
