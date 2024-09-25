---
title: Marketplace localization
linkTitle: Marketplace localization
weight: 42
---

Configure your Marketplace to accept multiple languages and present product in the appropriate one.

## Before you start

You must have Platform Administrator credentials and your organization must have the Public Marketplace entitlement to enable and configure *Marketplace Localization* content.

## Objectives

Learn how to manage your Marketplace language(s) so that consumer can see product in their own language if product are translated.

## Marketplace localization setup

Setup the language of your choice - 4 are available: **English** / **French** / **German** / **Brazilian Portuguese**

By default, English is the default Marketplace language. Provider can change the default language to any supported one as needed. The default language is the one that will be used for displaying the Marketplace visual elements (menus / buttons / static labels) in case the user language does not match any Marketplace language definition. For instance having a user language in Spanish will result in displaying the Marketplace element in the default Marketplace language as Spanish is not a known language managed by the Marketplace.

Samples:

| Marketplace available language(s) | User language selection       | Marketplace graphic elements display |
| --------------------------------- | ----------------------------- |------------------------------------- |
| English (Default)                 | English                       | English                              |
| English (Default) </br> French    | Spanish                       | English                              |
| English (Default) </br> French    | French                        | French                               |
| German (Default) </br> Portuguese | French                        | German                               |

Product definition can have his own language definition different from the Marketplace language definition. The system will try to match the product language based on the browser language definition and if a product translation cannot be found, it will default to the default product language to show those missing translation. This mean consumer may see as partial translated product in the Marketplace.

Let's see with examples how Marketplace product display language is determined?

| Marketplace available language(s) | Product available language(s) | Marketplace product language display |
| --------------------------------- | ----------------------------- | ------------------------------------ |
| English (Default)                 | English (Default)             | English                              |
| English (Default) </br> French    | French (Default)              | French                               |
| English (Default) </br> German    | French (Default) </br> no other translation provided | French (product default)       |
| German (Default) </br> Portuguese | French (Default) </br> German translation | German                   |
| German (Default) </br> Portuguese | French (Default) </br> English translation | French (product default)                   |

{{< alert title="Note" color="warning" >}}
It is highly recommended to align the Marketplace default language with product default language to avoid inconsistencies in translation.
{{< /alert >}}

To setup the Marketplace accepted languages:

1. Navigate to *platform.axway.com > Organization > Marketplaces*.
2. Open the desired Marketplace by clicking the Marketplace name.
3. Select to *Internationalization* tab
4. Choose the product display: a choice between 2 options:
   1. *All products* - products that are internationalized or not will be visible in the Marketplace
   2. *Only fully-localized products* - only the internationalized products will be visible in the Marketplace
5. The 4 languages are displayed. English is highlighted as **Default** and other languages are **Disabled**
   1. Using the ellipsis menu you can **Enabled** / **Disabled** a language
   2. Using the ellipsis menu you can set a language as default.

{{< alert title="Note" color="primary" >}}
The Default language cannot be disabled.
{{< /alert >}}

Now that you have selected the appropriate languages, you can define the appropriate translation of some Marketplace elements:

* Marketplace settings: Name, Site name, Description
* Marketplace footer content.
* Marketplace help and navigation menus.

For that, navigate to the dedicated tab and you will see on top of the field the language list with an icon:

* checkmark icon: this language is the default one
* pencil icon: this language is an additional language
* forbidden icon: this language is not used by the Marketplace.

By selecting a language, you can enter the corresponding value. Once your value are all set, don't forget to hit the **Save** button to validate your changes.

## Consumer experience

On the Marketplace navigation bar, a language selector is available. This selector contains the default language and available languages for the Marketplace. Default language is the selected one. Consumer can use the language he wants from the selection.

Consumer will see the translated product according to the selected language and rules above if ever the product does not support the selected language.

{{< alert title="Limitation" color="warning" >}}
Although most of the static elements of the Marketplace will be translated, some will not:

* swagger UI component that render the API specification
{{< /alert >}}
