---
title: Integrate with Google Console
linkTitle: Integrate with Google Console
weight: 15
---

Integrate your Amplify Engage Marketplace with Google Search Console to allow Google to crawl and index public Marketplace pages. This integration enables search engine discoverability through configurable indexing settings and metadata applied to public pages.

## Before you start

* You must have **Marketplace Administrator** credentials.
* Your Marketplace must be publicly accessible.
* You must have access to **Google Search Console** for site verification.

## Objectives

Learn how to:

* Configure Google Console
* Enable or disable search engine indexing for your Marketplace
* Configure the Google site verification ID
* Understand which pages are indexable by Google

## Set up Google Console

1. Add Instructions.

## Enable Google Console indexing

1. Navigate to *Marketplace > Marketplace Settings*.
2. Select **Integration > Search Engines** tab.
3. Locate the **Indexing** setting.
4. Set **Indexing** to **Enabled** to allow the Marketplace to be indexed.
    * When Indexing is **Enabled**, the site is considered indexable.
    * When Indexing is explicitly set to **Disabled**, the site is not indexable.
5. Once Indexing is enabled, a **Google site verification ID** field becomes available. Enter your **Google site verification ID**.
    * The verification meta tag is added only when a Google ID value is present.
6. Save your changes.

The Marketplace consumes these settings via the `marketplace.settings.update` event. No changes are required in `Appc.data.provider`.

## Indexed pages and metadata behavior

When indexing is enabled, Amplify Engage automatically applies page-specific titles and descriptions to the following public pages.

### Homepage

* **Title**: `[Marketplace site name]`
* **Description**: `[Marketplace description]`

### Products list

* **Title**: `[Marketplace site name] - Products`
* **Description**: `Browse products - [Marketplace description]`

### Product details (any tab)

* **Title**: `[Marketplace site name] - [Product title]`
* **Description**:  
    * `[Product description]`, if defined  
    * `[Marketplace description]`, if no product description exists

### Category list

* **Title**: `[Marketplace site name] - Categories`
* **Description**: `Browse categories - [Marketplace description]`

### Category details

* **Title**: `[Marketplace site name] - [Category title]`
* **Description**:  
    * `[Category description]`, if defined  
    * `[Marketplace description]`, if no category description exists

### Asset resource details (any tab)

* **Title**: `[Marketplace site name] - [Product title] - [Asset resource title]`
* **Description**: `[Asset resource title] Resource Details - [Marketplace description]`

### Documents page (`/documents/{doc_Id}`)

* Applies only when the document link is exposed in the navigation menu.
* **Title**: `[Marketplace site name] - [Document title]`
* **Description**:  
    * `[Document description]`, if defined  
    * `[Marketplace description]`, if no document description exists

## Robots.txt behavior

Robots.txt is managed at the platform level. Unified navigation elements are excluded from indexing to ensure only relevant Marketplace content is crawled by search engines.

## Limitation

The Google ID field is visible and editable only when Indexing is set to **Enabled**.
