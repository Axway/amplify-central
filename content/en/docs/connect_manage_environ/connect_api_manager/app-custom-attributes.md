---
title: Application custom properties
linkTitle: Application custom properties
draft: false
weight: 60
---

Customize your Discovery Agent so you can discover and provision application custom properties from your Axway API Gateway environment within Amplify.

## Before you start

* Read [API Manager - add custom properties to an Application](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apimgr_admin/api_mgmt_custom/index.html#add-a-custom-property-to-applications)
* Know where your Discovery Agent is running and how to update its configuration

## Objectives

Learn how to configure your Discovery Agent to collect application custom properties.

## Concepts

### Application custom properties

API Manager application object supports user-defined fields called custom properties. These custom properties allows you to extend the default application object content in API Manager to collect additional information and store them into the application object itself. The value can then be used during a provisioning process, to perform statistical computation or any additional needs.

These properties can be of various type: label, text, number, switch, or dropdown. Refer to [API Manager - Custom property options](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apimgr_admin/api_mgmt_custom/index.html#custom-property-options).

Each property can be mandatory or optional.

### ApplicationProfileDefinition

This object is similar to SubscriptionRequestDefinition, AccessRequestDefinition and CredentialRequestDefinition. See [Customize Application Registration, credentials request and subscription screens](/docs/integrate_with_central/customize_ard_crd).

It contains the schema definition corresponding to the application custom properties the provider needs to collect. For each application custom property, there will be a pending object in the ApplicationProfileDefinition. If a custom property is mandatory, the corresponding field in the schema will be required.

ApplicationProfileDefinition accepts internationalization so that it can be presented in the Marketplace WebUI in the language the consumer understands.

It must be linked to an AccessRequestDefinition to allow the Marketplace WebUI to render it when the consumer registers their application.

### ApplicationProfile

The application profile hosts the values entered by a consumer, as well as the reference of the ApplicationProfileDefinition that enables the rendering of those values.

## Overview of the flow

1. Provider prepares API Manager to support application custom properties.

2. Provider prepares the Discovery Agent to discover the application custom properties definition.

3. Discovery Agent attaches the ApplicationDefinitionProfile to AccessRequestDefinition and to the relevant API service.

4. Marketplace consumer registers their application and provides required information based on the application custom properties definition.

5. Discovery Agent reads the entered values and adds them to the created application in API Manager.

{{< alert title="Note" color="primary" >}}Whenever a Marketplace consumer updates the values, the Discovery Agent will persist them on API Manager.{{< /alert >}}

## Preparing the Discovery Agent to discover the application custom properties definition

Tou must add a new property in the agent configuration: `APIMANAGER_APPLICATIONDEFINITIONTITLE=myApplicationProfileName` to enable the Discovery Agent to discover the application custom properties and push them into an ApplicationProfileDefinition. The property value will be used to name the ApplicationProfileDefinition that will be created under the environment the agent is monitoring.

Once you add this property, be sure to restart the agent so that it starts discovering the defined application custom properties.

## Attaching the ApplicationProfileDefinition to AccessRequestDefinition

Before data can be collected, the discovered ApplicationProfileDefinition must be attached to an AccessRequestDefinition. The AccessRequestDefinition must be attached to an API Service Instance. This enables the Marketplace WebUI to render the schema and help the consumer enter the requested values.

This process is automatically handled by the Discovery Agent: after creating the ApplicationProfileDefinition, it creates an empty AccessRequestDefinition and links the ApplicationProfileDefinition, and then updates the discovered API service instance with the appropriate AccessRequestDefinition.

## Populating ApplicationProfile

At the time a consumer registers an application, if the Marketplace WebUI detects that there is an ApplicationProfileDefinition required, the corresponding schema is rendered so that the consumer can enter the requested values.

Once the consumer validates the application registration, an ApplicationProfile is created and the Discovery Agent that is monitoring this environment will proceed to first create the application in API Manager, then link the selected API to the application and finally add any custom property value entered by the consumer to its corresponding field on the Application.

The consumer can review the content that was provided by navigating to *Marketplace > Applications*, opening the Application details and going to the *Attributes* tab. A card is displayed that represents an ApplicationProfile that represents the application custom property. Click on the name to open the side panel with the details of the properties. Using the Edit ellipsis menu to change the property values, as well as the title of the ApplicationProfile.

If the application contains API coming from various environments, different properties may be needed, and there will be as many ApplicationProfiles as environments used by the Application. For instance, there will be an application profile for a dev environment and an application profile for prod environment.

## Sample

Request a PEM key (`PSK`), its format (`JWKS`) and a company department identifier (`DGPSystemID`) to be able to validate it at the application level while receiving an API call. The definition is internationalized in French.

```yaml
---
group: management
apiVersion: v1
kind: ApplicationProfileDefinition
name: v7-custom-attributes-demo
title: V7 Custom Attributes for mTLS validation
metadata:
  scope:
    kind: Environment
    name: non-prod
  acl: []
attributes: {}
finalizers: []
tags: []
spec:
  schema:
    type: object
    $schema: http://json-schema.org/draft-07/schema#
    properties:
      PSK:
        type: string
        title: AES-256 Preshared Key (in BASE64)
      JWKS:
        type: string
        title: JWKS
        description: 'Enter JWKS in the format of { "keys": [ {JWK_1}, {JWK_2} ] }'
      DGPSystemID:
        type: string
        title: DGP Sub System ID
    description: ''
    x-axway-order:
      - DGPSystemID
      - JWKS
      - PSK
languages:
  resource:
    code: en-us
languages-fr-fr:
  values:
    - path: /title
      value: Attributs customisés pour la validation mTLS
    - path: /spec/schema
      value:
        type: object
        $schema: http://json-schema.org/draft-07/schema#
        properties:
          PSK:
            type: string
            title: Clé pré-partagée AES-256 (en BASE64)
          JWKS:
            type: string
            title: JWKS
            description: 'Entrez JWKS au format { "keys": [ {JWK_1}, {JWK_2} ] }'
          DGPSystemID:
            type: string
            title: Identifiant du sous-système DGP
        description: ''
        x-axway-order:
          - DGPSystemID
          - JWKS
          - PSK

```

Link the ApplicationProfileDefinition to an AccessRequestDefinition - see `applicationprofile` section below:

```yaml
---
group: management
apiVersion: v1alpha1
kind: AccessRequestDefinition
name: ard-purpose
title: API Access
metadata:
  scope:
    kind: Environment
    name: non-prod
attributes: {}
finalizers: []
tags: []
spec:
  schema:
    type: object
    $schema: http://json-schema.org/draft-07/schema
    required:
      - TermsAndConditions
      - scopes
    properties:
      scopes:
        type: object
        title: Why Do You Want Access?
        properties:
          Toggle:
            type: string
            oneOf:
              - const: tryout
                title: Just trying things out
              - const: testing
                title: Would like to perform test
              - const: developing
                title: Beginning developments
            title: Select a value
      TermsAndConditions:
        type: boolean
        title: I accept the terms and conditions
        default: false
    description: Please choose the best answer
    additionalProperties: false
  provision:
    schema:
      type: object
      $schema: http://json-schema.org/draft-07/schema#
      required:
        - clientIdentifier
      properties:
        clientIdentifier:
          type: string
          description: Client Identifier
          x-axway-encrypted: true
      description: access request provision schema
applicationprofile:
  name: v7-custom-attributes-demo
```

Add the accessRequestDefinition to a service instance:

```yaml
group: management
apiVersion: v1alpha1
kind: APIServiceInstance
name: customer-data-instance-dev
title: Cutomer Data Service Instance DEV
metadata:
  scope:
    kind: Environment
    name: non-prod
attributes: {}
finalizers: []
tags:
  - nonprod
spec:
  endpoint:
    - host: dev100.k8s.axwayamplify.com
      port: 443
      routing:
        basePath: /apis
      protocol: https
  apiServiceRevision: customer-data-revision-v100
  accessRequestDefinition: ard-purpose
lifecycle:
  stage: dev
  releaseState: 
    name: experimental
```

## Frequently asked questions

Question: What happens when the property `APIMANAGER_APPLICATIONDEFINITIONTITLE` is deleted from the agent configuration file?
<br/>Answer: After the agent restarts, the ApplicationProfileDefinition is deleted and all AccessRequestDefinition reference are removed. Consumer can longer enter the values for the application custom properties.

Question: Can I change the title of the custom properties?
<br/>Answer: Yes, from the Marketplace application details / Attributes tab, editing an attribute profile will allow you to update the title displayed.

Question: Is a value change in API Manager Application custom property value reflected on the Marketplace corresponding application?
<br/>Answer: No, Discovery Agent only synchronizes the application custom properties schema and pushes the values from Marketplace to API Manager.
