---
title: Marketplace localization
linkTitle: Marketplace localization
weight: 42
---

Marketplace localization allows users to select their preferred language and seamlessly present the product information, documentation, and user interfaces in their selected language.

## Before you start

To enable and configure Marketplace localization, you'll need Platform Administrator permissions and ensure your organization has the necessary Public Marketplace entitlement.

## Objectives

In this guide you will learn how to configure a Marketplace with multiple languages.

## Configure a Marketplace with multiple languages

Besides English, the Marketplace can now be translated to any of the following languages:

* **French**
* **German**
* **Brazilian Portuguese**

English is the default language for the Marketplace. However, you can choose a different default language if desired.

In addition to translating the Marketplace content in multiple languages, you can translate the product definition and its related configuration that is displayed to consumers.

While Marketplace pages are automatically translated, custom fields and content require manual translation. To ensure a fully localized experience, you must manually translate the following fields:

* Marketplace settings: Name (mandatory), Site name (optional), Description (optional)
* Marketplace footer content
* Marketplace menus: Help menu items and Navigation menu items
* Marketplace and navigation menus
* Marketplace homepage: Hero banner content, featured content title, call to action content
* Ratings & Reviews: Review instructions
* Onboarding Form

You can translate these fields directly from inside the targeted screens. For instance, to translate the Marketplace settings:

1. Navigate to *platform.axway.com > Organization > Marketplaces*.
2. Click the Marketplace title to access the *Settings* screen.
3. Click the *Settings* tab.
4. Enter the translated values for each of the displayed languages. Each language has a visual indicator:

   * Checkmark icon: Indicates this is the default language
   * Pencil icon: This language was enabled / activated for the Marketplace
   * Disabled icon: This language is not activated, which means consumers cannot select it as a preferred language

5. Click **Save** to save your changes.

For a Marketplace to be displayed in a certain language, you must enable it first:

1. Navigate to *platform.axway.com > Organization > Marketplaces*.
2. Click the Marketplace name.
3. Click the *Internationalization* tab.
4. Choose one of the product display options:
   * **All products** - Products that are internationalized or not will be visible in the Marketplace
   * **Only fully-localized products** - Only the internationalized products will be visible in the Marketplace
5. The four languages are displayed. English is highlighted as **Default** and other languages are **Disabled**. Using the ellipsis menu:
   1. **Enabled** / **Disabled** a language.
   2. Set a default language.

{{< alert title="Note" color="primary" >}}
The Default language cannot be disabled; however, you can set a different language as the default.
The **Enable** button is disabled for languages without a corresponding Marketplace name translation.
{{< /alert >}}

## Select the preferred language as a consumer

When you access a Marketplace, if multiple languages are enabled, you can change the language from the Language drop-down menu that is located in the top right of the Marketplace navigation bar.

Products are shown in the user's preferred language whenever possible. If a translation is missing, the default product language is displayed. This might lead to consumers seeing a partially translated product.

{{< alert title="Note" color="warning" >}}
It is highly recommended that you align the Marketplace default language with the product default language to avoid inconsistencies in translation.
{{< /alert >}}

{{< alert title="Note" color="warning" >}}
**Warning**: The API specifications are not translated.
{{< /alert >}}
