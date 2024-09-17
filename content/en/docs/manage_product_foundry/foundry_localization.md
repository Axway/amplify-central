---
title: Manage product localization
linkTitle: Manage product localization
weight: 70
---

Manage the various product translation to offer the best experience to the consumer.

## Before you start

* You must have a user account with Catalog Manager rights to view the product.
* Some languages must be defined in the Marketplace you want to publish the product. Refer to [Marketplace settings](/docs/manage_marketplace/customize_marketplace/marketplace_localization)

## Objectives

Learn how to Manage your product translation.

## Supported languages

By default 4 languages are available : English / French / German / Brazilian Portuguese

## Selecting the product default language

When you want a product to be seen in one or more available languages, provider needs to define what is the default language of the product and what are the possible translation languages. Translated languages are not mandatory, you can use the one you need or none of them.

To define the product default language, open the product and click the **translation icon** near the Edit button. The system will automatically detect if no default language is already set. Clicking the **Set Default Language** will direct you to the panel where you can select one of the available languages to become the product default language.

{{< alert title="Note" color="warning" >}}
Once the default language is selected, it cannot be changed from the UI as it potentially needs to remove some existing translations. However, it is possible to do it using the API or CLI: Refer to [Changing the default language](/docs/integrate_with_central/api_server#changing-the-default-language)
{{< /alert >}}

## Add the product translation

A product can have a default language but can also be translated in the other available languages. Like this based on the Marketplace languages definition the product is published to, the product will be visible in a specific language.

How Marketplace product display language is determined?

| Marketplace available language(s) | Product available language(s) | Marketplace product language display |
| --------------------------------- | ----------------------------- | ------------------------------------ |
| English (Default)                 | English (Default)             | English                              |
| English (Default) </br> French    | French (Default)              | French                               |
| English (Default) </br> German    | French (Default) </br> no other translation provided | English       |
| German (Default) </br> Portuguese | French (Default) </br> German translation | German                   |

What are the fields that could be translated?

* Product title
* Product description
* Plan name
* Plan description
* Plan quota name
* Product documentation (Markdown / document library)

To Translate a product, open it and use the translate icon closed to the Edit button to view the product translation progress details. If the product does not contain a default language yet, a message information is displayed. You have to click the message to open the default language selection dialog. Once selected, the translation panel is displayed. For each language, the status INCOMPLETE or COMPLETED and the progress is displayed. Then the translate button allows to open the translation wizard.

The left side of the wizard contains the dropdown for selecting the language, below you have all sections that needs translation (Product profile / Usage Plans / Documentation). You can navigate from one section to the other by clicking it. Once a section is selected, the left side of the panel is updated to display the fields that needs a translation for that section.

Each field contains its default language and a field to enter the translated value corresponding to the selected language. You can switch anytime from one language to another or from one section to another.

Once you are satisfied with your translation, click **Save & Exit** to validate the translation.

The translation will be immediately available in the Marketplace based on the Marketplace language support.

It is not mandatory to translate the product in all available languages. We recommend to a least have the language supported by the Marketplace so that your consumer will see the product correctly.

{{< alert title="Product documentation" color="warning" >}}
Since the product can contain multiple releases and the product documentation is specific to a release, be sure to select the appropriate release in the list before clicking the Translate icon.

When creating a new product release, the existing documentation and associated translation (if any) is added to the new release automatically.
{{< /alert >}}

{{< alert title="Product documentation using Document Library" color="warning" >}}
A document from the Document Library can be used in the product documentation. In case the document has a default language, only the additional languages can be added/updated via the product document translation screens. We recommend to update the default language information from the Document Library itself. Refer to [Document library multi-language](/docs/manage_document_library/documentation_library_management#multi-languages-support)
{{< /alert >}}

## Product publication check

When you publish a product to a Marketplace, a new dialog is displayed to show you the current translation status. Based on the provided information, you can decide to interrupt the publication and update the translation or pursue the publication knowing that it may impact your consumer.

## Screen customization specific translation

It is possible to customize the Subscription, Access Request and Credentials screens using SubscriptionRequestDefinition, AccessRequestDefinition and CredentialsRequestDefinition to ask more information from the consumer. Refer to [Customize access request, credentials request and subscription screens](/docs/integrate_with_central/customize_ard_crd#multi-languages-support)

We allow the provider to translate the *title* and *description* of individual fields used in those definition.

{{< alert title="Note" color="warning" >}}
It is not allowed in the translation file to modify any properties related to the field (size limit, type, enum values, etc.). In case the definition does not match the initial fields, the translation will be rejected in this case.
{{< /alert >}}

For the moment, there is no UI to manipulate such customization definition. You will need to use either the Amplify API or the Amplify CLI to add the translation.

There are 2 different sections to provide:

* the default language section
* the language specific section (one for each translated languages)

Sample code for setting the object default language:

```json
{
    "languages": {
        "resource": {
            "code": "en-us"
        }
    }
}
```

Available language code are:

* **en-us** for English
* **fr-fr** for French
* **de-de** for German
* **pt-br** for Brazilian Portuguese

Since Subscription, Access and Credentials request accepts a schema, the specific language part should contain the exact same schema as its origin with the translated information. In case the schema does not match, the translation will be rejected.

Sample of specific translation containing a single String value called *ClientID*.

```json
{
    "languages-fr-fr": {
        "values": [
            {
                "path": "/title",
                "value": "The translated title of the specific screen for French display"
            },
            {
                "path": "/spec/schema",
                "value": {
                    "type": "object",
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "properties": {
                        "clientID": {
                            "type": "string",
                            "title": "My translated title in French"
                        }
                    }
                }
            }
        ]
    }
}
```

{{< alert title="Note" color="warning" >}}
If your schema contains enum simple String values, do not translate them as it will confuse any backend process expected these values.
{{< /alert >}}
