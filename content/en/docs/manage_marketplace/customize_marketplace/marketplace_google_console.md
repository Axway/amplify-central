---
title: Integrate with Google Console
linkTitle: Integrate with Google Console
weight: 15
---

Integrate your Amplify Engage Marketplace with Google Search Console to allow Google to crawl and index public marketplace pages. This integration enables search engine discoverability through configurable indexing settings and metadata applied to public pages.

## Before you start

* You must have **Marketplace Administrator** credentials.
* Your marketplace must be publicly accessible.
* You must have access to **Google Search Console** for site verification.

## Objectives

Learn how to:

* Enable or disable search engine indexing for your marketplace
* Configure the Google site verification ID
* Understand which pages are indexable by Google

## Enable Google Console indexing

1. Navigate to **Marketplace > Marketplace Settings**.
2. Navigate tp **Integration > Search Engines** tab.
3. Locate the **Indexing** setting.
4. Set **Indexing** to **Enabled** to allow the marketplace to be indexed.
    * When Indexing is **ON**, the site is considered indexable.
    * When Indexing is explicitly set to **Disabled**, the site is not indexable.
5. Once Indexing is enabled, a **Google site verification ID** field becomes available.
6. Enter your **Google site verification ID**.
    * The verification meta tag is added only when a Google ID value is present.
7. Save your changes.

The Marketplace consumes these settings via the `marketplace.settings.update` event. No changes are required in `Appc.data.provider`.

## Indexed pages and metadata behavior

When indexing is enabled, Amplify Engage automatically applies page-specific titles and descriptions to public pages:

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

Robots.txt is managed at the Platform level. Unified navigation elements are excluded from indexing to ensure only relevant marketplace content is crawled by search engines.

## Notes and limitations

* The Google ID field is visible and editable only when Indexing is set to **Enabled**.
