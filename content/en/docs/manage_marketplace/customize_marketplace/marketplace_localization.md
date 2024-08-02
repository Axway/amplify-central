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

Setup the language of your choice - 4 are available: English / French / German / Brazilian Portuguese

By default, English is the default Marketplace language. The default language is the one that will be use if a product translation cannot be found. Otherwise the Marketplace will display the product in its own default language if that language is available in the Marketplace.

{{< alert title="Note" color="warning" >}}
In case a product is not fully localized ie not all product fields (title / description / plan / quota / markdown documentation) are translated to a specific language, the default Marketplace language will be applied to the missing field translation.
{{< /alert >}}

How Marketplace product display language is determined?

| Marketplace available language(s) | Product available language(s) | Marketplace product language display |
| --------------------------------- | ----------------------------- | ------------------------------------ |
| English (Default)                 | English (Default)             | English                              |
| English (Default) </br> French    | French (Default)              | French                               |
| English (Default) </br> German    | French (Default) </br> no other translation provided | English       |
| German (Default) </br> Portuguese | French (Default) </br> German translation | German                   |

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

## Consumer experience

Consumer will see the translated product.

{{< alert title="Limitation" color="warning" >}}
Although most of the static elements of the Marketplace will be translated, some will not:

* swagger UI component that render the API specification
* Additional fields available for Subscription Request, Access Request or Credential Request
{{< /alert >}}
