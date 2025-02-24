---
title: Application custom properties
linkTitle: Application custom properties
draft: false
weight: 60
---

Customize your Discovery Agent so you can discover and provision Application custom properties from your Axway API Gateway environment within Amplify.

## Before you start

* Read [API Manager - add custom properties to an Application](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apimgr_admin/api_mgmt_custom/index.html#add-a-custom-property-to-applications)
* Know where your discovery agent is running and how to update its configuration

## Objectives

Learn how to configure your Discovery agent to be able to collect application custom properties.

## Concepts

### Application custom properties

API Manager application object supports user-defined fields called custom properties. These custom properties allow to extend the default application object content in API Manager to collect additional information and store them into the Application object itself. Those value can then be used during a provisioning process, to perform statistical computation or any additional needs.

These properties can be of various type: label, text, number, switch or dropdown. Refer to [API Manager - Custom property options](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apimgr_admin/api_mgmt_custom/index.html#custom-property-options)

More, each property can be mandatory or not.

### ApplicationProfileDefinition

This new object is similar to existing SubscriptionRequestDefinition, AccessRequestDefinition and CredentialRequestDefinition. Refer to [Customize Application Registration, credentials request and subscription screens](/docs/integrate_with_central/customize_ard_crd).

Its goal is to contain the schema definition corresponding to the application custom properties the provider needs to collect. For each application custom property, there will be a pending object in the ApplicationProfileDefinition. If a custom property is mandatory, the corresponding field in the schema will be required.

ApplicationProfileDefinition accepts internationalization so that it can be presented in the Marketplace WebUI in the langage the consumer understands.

It must be linked to an AccessRequestDefinition to allow the Marketplace WebUI to render it when Consumer will register their application.

### ApplicationProfile

The application profile hosts the values entered by a consumer as well as the reference of the ApplicationProfileDefinition that allows to render those values.

## Overview of the flow

Provider prepares API Manager to support Application custom properties

Provider prepares the Discovery Agent to discover the Application custom properties definition

Discovery Agent attach the ApplicationDefinitionProfile to AccessRequestDefinition and to relevant API Service

Marketplace Consumer registers his application and provide required information based on the application custom properties definition

Discovery agent read the entered values and add them to the created application in API Manager

Whenever a Marketplace consumer update the values, the Discovery Agent will persist them on API Manager

## Preparing the Discovery Agent to discover the Application custom properties definition

For the discovery agent to discover the application custom properties and push them into an ApplicationProfileDefinition, you have to add a new property in the agent configuration: `APIMANAGER_APPLICATIONDEFINITIONTITLE=myApplicationProfileName`. The property value will be used to name the ApplicationProfileDefinition that will be created under the environment the agent is monitoring.

Once you add this property, be sure to restart the agent so that it starts discovering the application custom properties if any are defined.

## Attaching the ApplicationProfileDefinition to AccessRequestDefinition

To be able to collect appropriate data, the discovered ApplicationProfileDefinition needs to be attached to an AccessRequestDefinition. The AccessRequestDefinition needs to be attached to an API Service Instance. This will help the Marketplace WebUI to render the schema and help consumer to enter the requested values.

All this process is automatically handled by the Discovery Agent: after creating the ApplicationProfileDefinition, it creates an empty AccessRequestDefinition and link the ApplicationProfileDefinition and finally update discovered API Service Instance with the appropriate AccessRequestDefinition.

## Populating ApplicationProfile

At the time a consumer registers an application, if the Marketplace WebUI detects, that there is an ApplicationProfileDefinition required, it will render the corresponding schema to let the consumer enter the requested values.

Once the consumer validates its application registration, an ApplicationProfile is created and the Discovery Agent who monitoring this environment will proceed to first create the application in API Manager, link the selected API to the application and finally add any custom property value entered by the consumer to their corresponding field on the Application.

Consumer is able to review the content he provided by navigating to the Marketplace > Applications, opening the Application details and going to the Attributes tab. There, he will see a card representing an ApplicationProfile that represents the application custom property. Clicking on the name will open the side blade with the details of the properties. Using the Edit ellipsis menu, he is allowed to change the property values as well as the title of the ApplicationProfile.

If the application contains API coming from various environments, it is possible that different properties may be needed. In that case, there will be as many ApplicationProfile as environment used by the Application. For instance, you can see an application profile for a dev environment and an application profile for prod environment.

## Sample

Below is the ApplicationProfileDefinition asking for a PEM key (`PSK`), its format (`JWKS`) and a company department identifier (`DGPSystemID`) to be able to validate it at the application level while receiving API call. The definition is also internationalized in French.

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

Sample how to link the ApplicationProfileDefinition to an AccessRequestDefinition - see `applicationprofile` section below:

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

Finally adding the accessRequestDefinition to a service instance:

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