---
title: End 2 End scenario from Environment to Marketplace and Internationalization
linkTitle: e2e scenario
---

## Before you start

* You understand the concepts involved in the [API Server](/docs/integrate_with_central/api_server/).
* You know how to use [Amplify Central CLI](/docs/integrate_with_central/cli_central)

## Objectives

Learn with a step by step adventure how to create and manipulate Amplify Enterprise Marketplace concepts: from the environment to the Marketplace.

## scenario description

The scenario is the following: we have an API Service that will move from Dev, QA to Production stage. An asset will embed that API Service and then a Product will be built on top of the Asset. To help understanding all phases, the Asset and Product will use the Manual Release procedure.

The product and his various components (category, documentation, stage, plan) will be internationalized using two languages: US (default) and FR. So that it can be displayed differently based on the Marketplace language settings.

The scenario is available here for [download](/static/samples/e2e/e2e.zip)

The zip structure is the following:

* folder **1.init**: contains Stage, Environment, Category, SubscriptionRequestDefinition, AccessRequestDefinition and CredentialRequestDefinition
    * *J0-1-stage-multi-language.json*: the stages definition and their translation.
    * *J0-2-stage-visibility.json*: the stages visibility for specific Marketplace. See note below.
    * *J0-3-env.json*: the environment definition (non-prod and prod) and their stage access.
    * *J0-4-category-multi-language.json*: the category definition that will be assigned to the product.
    * *J0-5-category-visibility.json*: the category visibility for specific Marketplace. See note below.
    * *J0-5-srd-billing-multi-language.json*: the subscription additional data asked when subscriber subscribe to the product plan.
    * *J0-6-ard-scopes-multi-language.json*: the application registration additional data asked when consumer wants to link an API to an Application.
    * *J0-7-crd-externalCredential-multi-language.json*: the credential additional data asked when consumer request for credentials.
* folder **2.v1.0.0-dev**: contains API Service for Dev stage, Asset and Product
    * *J1-1-apiservice.json*: the API Service definition for v1.0.0 in Dev stage.
    * *J1-2-asset.json*: the Asset definition.
    * *J1-3-assetMapping.json*: the Asset mapping to assign the API Service instance to the Asset.
    * *J1-4-assetActivation.json*: the asset releasing process (from Draft to V1.0.0).
    * *J1-5-documentLibrary-multi-language.json*: some document library document (PDF, URL, Markdown) in 2 languages.
    * *J1-6-product-multi-language.json*: the product we will expose to the Marketplace.
    * *J1-7-productDocumentation-multi-language.json*: the product documentation (2 topics with Sections and Markdown, 1 topic specific to Document Library Documents).
    * *J1-8-productActivation.json*: the product releasing process (from Draft to V1.0.0).
    * *J1-9-productPlan-multi-language.json*: a paid plan associated to the product.
    * *J1-10-productPlanActivation.json*: the plan activation (from Draft to Active).
    * *J1-11-productPublish.json*: the product publication to a Marketplace without any restriction. See note below.
* folder **3.v1.0.0-qa**: contains API Service for QA stage, Asset and Product update.
    * *J2-1-apiServiceInstance-v100-qa.json*: the new instance endpoint for QA stage
    * *J2-2-assetMapping.json*: the new mapping for the asset to onboard the new instance.
    * *J2-3-assetActivation.json*: the asset releasing process (from V1.0.0 to V2.0.0)
    * *J2-4-productActivation.json*: the product releasing process since the asset release changed (rom V1.0.0 to V2.0.0)
    * *J2-5-assetV1deprecate.json*: deprecating Asset release V1.0.0
* folder **4.v1.0.0-prod**: contains API Service for Production stage, Asset and Product update
    * *J3-1-apiService-v100-prod.json*: the API Service definition for v1.0.0 in production stage.
    * *J3-2-assetMapping.json*: the new mapping for the asset to onboard the new production service.
    * *J3-3-assetActivation.json*: the asset releasing process (from V2.0.0 to V3.0.0)
    * *J3-4-productActivation.json*: the product releasing process since the asset release changed (rom V12.0.0 to V3.0.0)
    * *J3-5-assetV2deprecate.json*: deprecating Asset release V2.0.0

All the files are prefixed with a number to determine in which order you should apply them with the CLI: `axway central apply -f file.json`.

{{< alert title="Stage visibility" color="primary" >}}
The file *J0-2-stage-visibility.json* needs to be updated with the Marketplace name before applying it.

You can find the Marketplace name using this CLI command: `axway central get marketplace`.

Grab the name and replace `_MKT_NAME_GOES_HERE_` inside the file with the appropriate name you want. Save it and apply it as the other files. Now, the stages should be visible in the Marketplace you selected.
{{< /alert >}}

{{< alert title="Category visibility" color="primary" >}}
The file *J0-5-category-visibility.json* needs to be updated with the Marketplace name before applying it.

You can find the Marketplace name using this CLI command: `axway central get marketplace`.

Grab the name and replace `_MKT_NAME_GOES_HERE_` inside the file with the appropriate name you want. Save it and apply it as the other files. Now, the category should be visible in the Marketplace you selected.
{{< /alert >}}

{{< alert title="Marketplace publication" color="primary" >}}
The file *J1-11-productPublish.json* needs to be updated with the Marketplace name before applying it.

You can find the Marketplace name using this CLI command: `axway central get marketplace`.

Grab the name and replace `_MKT_NAME_GOES_HERE_` inside the file with the appropriate name you want. Save it and apply it as the other files. Now, your product should be visible in the Marketplace you selected.
{{< /alert >}}

## Tips

How can I see the language information from the objects using the CLI?

```cmd
axway central get {objectType} {objectName} --language=* -o json
```

Applying that to our sample:

```cmd
axway central get product customer-data -o json --language=*
```

will produce (some part are voluntary removed for clarity):

```json
{
    "group": "catalog",
    "apiVersion": "v1alpha1",
    "kind": "Product",
    "name": "customer-data",
    "title": "Customner Data",
    ...
    "spec": {
        "assets": [
            {
                "name": "customer-data-asset"
            }
        ],
        "categories": [
            "category-marketing"
        ],
        "description": "That product does this and that..."
    },
    ...
    "languages": {
        "resource": {
            "code": "en-us"
        },
        ...
    },
    "languages-fr-fr": {
        "metadata": {
            "code": "fr-fr",
            "status": "complete",
            "audit": {
                ...
            }
        },
        "values": [
            {
                "path": "/spec/description",
                "value": "Ce produit fait ceci et cela...",
                "status": "complete"
            },
            {
                "path": "/title",
                "value": "Données clients",
                "status": "complete"
            }
        ]
    }
}
```