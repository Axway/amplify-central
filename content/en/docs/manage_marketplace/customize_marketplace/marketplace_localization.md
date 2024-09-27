---
title: Marketplace localization
linkTitle: Marketplace localization
weight: 42
---

**Configure the Enterprise Marketplace to support multiple languages.** Allow users to select their preferred language and seamlessly present the product information, documentation, and user interfaces in their selected language.

## Before you start

To enable and configure Marketplace Localization, you'll need Platform Administrator permissions and ensure your organization has the necessary Public Marketplace entitlement.

## Objectives

In this guide you will learn how to configure a Marketplace with multiple languages.

## Configure a Marketplace with multiple languages

Besides English, the Marketplace can now be translated to any of the following languages:
* **French**
* **German**
* **Brazilian Portuguese**

English is the default language for the Marketplace. However, you can choose a different default language if desired.
In addition to translating the Marketplace content in multiple languages, you can translate the product definition and its related configuration that is displayed to consumers.

While Marketplace pages are automatically translated, custom fields and content require manual translation. To ensure a fully localized experience, you must manually translated the following fields:
* Marketplace settings: Name (mandatory), Site name (optional), Description (optional)
* Marketplace footer content.
* Marketplace menus: Help menu items and Navigation menu items.
* Marketplace and navigation menus.
* Marketplace homepage: Hero banner content, Featured content title, Call to action content.
* Ratings & Reviews: Review Instructions.
* Onboarding Form.

You can translated these fields directly from inside the targeted screens. For instance, to translate the Marketplace Settings:
1. Navigate to *platform.axway.com > Organization > Marketplaces*.
2. Click the a Marketplace title to access the settings screen.
3. Go to the *Settings* tab.
4. Enter the translated values for each of the displayed languages. Eeach language will have a visual indicator:

   * checkmark icon: indicates this is the default language
   * pencil icon: this language was enabled / activated for the Marketplace
   * disabled icon: this language is not activated, which means consumers cannot select it as a preferred language.

5. Click **Save** button to save your changes.

For a Marketplace to be displayed in a certain language, you must enable it first:

1. Navigate to *platform.axway.com > Organization > Marketplaces*.
2. Open the desired Marketplace by clicking the Marketplace name.
3. Go to the *Internationalization* tab
4. Choose the product display: a choice between 2 options:
   1. *All products* - products that are internationalized or not will be visible in the Marketplace
   2. *Only fully-localized products* - only the internationalized products will be visible in the Marketplace
5. The 4 languages are displayed. English is highlighted as **Default** and other languages are **Disabled**
   1. Using the ellipsis menu you can **Enabled** / **Disabled** a language
   2. Using the ellipsis menu you can set a language as default.

{{< alert title="Note" color="primary" >}}
The Default language cannot be disabled, however you can set a different language as default. 
The "Enable" button will be disabled for languages without a corresponding Marketplace name translation.
{{< /alert >}}

## Select the preferred language as a consumer

When you access a Marketplace, if multiple languages are enabled, you can change the language from the Language drop-down menu that is located in the top right corned of the Maketplace navigation bar.

Products will be shown in the user's preferred language whenever possible. If a translation is missing, the default product language will be displayed. This might lead to consumers seeing a partially translated product.

{{< alert title="Note" color="warning" >}}
We highly recommended you aligning the Marketplace default language with the product default language to avoid inconsistencies in translation.
{{< /alert >}}

{{< alert title="Limitation" color="warning" >}}
The API specification are not translated.
{{< /alert >}}
