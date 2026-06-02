---
title: Integrate with Google Console
linkTitle: Integrate with Google Console
weight: 15
---

## Integrate with Google Console

Integrate your Amplify Engage Marketplace with Google Search Console to allow Google to crawl and index public Marketplace pages. This integration enables search engine discoverability through configurable indexing settings and verified site ownership registered with Google.

A public Marketplace with indexing enabled becomes discoverable via Google Search, making your API product catalog and documentation accessible to external developers and partners without requiring them to know your Marketplace URL in advance.

### Before you start

* You must have Marketplace Administrator credentials in Amplify Engage.
* Your Marketplace must be set to **Public** access (unauthenticated users must be able to browse it). See [Marketplace settings](https://docs.axway.com/bundle/amplify-central/page/docs/manage_marketplace/customize_marketplace/marketplace_settings/index.html) for how to configure the Access setting.
* Your Marketplace must have a configured URL. A custom (vanity) URL is strongly recommended so that Google indexes the URL your organization controls rather than an Axway subdomain. See [Customize Marketplace URL](https://docs.axway.com/bundle/amplify-central/page/docs/manage_marketplace/customize_marketplace/marketplace_vanity_url/index.html).
* You must have a Google account with access to [Google Search Console](https://search.google.com/search-console).

### Objectives

After completing this guide you will have:

* Enabled search engine indexing for your Marketplace in Amplify Engage
* Obtained a Google site verification ID from Google Search Console
* Entered the verification ID in your Marketplace settings to complete ownership verification
* Submitted your Marketplace sitemap to Google Search Console to accelerate indexing
* Confirmed which public Marketplace pages are indexed and how their metadata is generated

### Step 1 — Enable indexing in Marketplace settings

Configure the Amplify Engage side of the integration first. This enables the platform to serve the Google site verification meta tag and to allow Googlebot to crawl public Marketplace pages.

1. Log into Amplify and navigate to **Organization**.
2. Select **Marketplaces** and click the name of the Marketplace you want to configure.
3. In the Marketplace configuration, select **Integration > Search Engines**.
4. Locate the **Indexing** setting and set it to **Enabled**.
   * When Indexing is **Enabled**, public Marketplace pages are considered indexable and the `robots.txt` file allows Googlebot access.
   * When Indexing is **Disabled**, a `noindex` directive is applied and Googlebot is instructed not to index the site.
5. Leave the **Google site verification ID** field blank for now. You will return to enter this value after completing the Google Search Console steps.
6. Click **Save**.

> **Note**: The Google site verification ID field is visible only when Indexing is set to **Enabled**. The verification meta tag is rendered on the Marketplace homepage only when a Google ID value is present.

### Step 2 — Add your Marketplace as a property in Google Search Console

Google Search Console requires you to register and verify ownership of your Marketplace URL before it will index your pages.

1. Go to [https://search.google.com/search-console](https://search.google.com/search-console) and sign in with your Google account.
2. Click **Add property** (the `+` button in the property selector at the top left).
3. Choose the property type:
   * **URL-prefix property** — recommended for most Marketplace configurations. Enter the full Marketplace URL, including protocol (e.g., `https://marketplace.example.com`). This covers only pages under that exact URL.
   * **Domain property** — covers all protocols and subdomains under a root domain (e.g., `example.com`). This requires DNS TXT record verification with your domain provider. Use this if you want Search Console to cover multiple subdomains.
4. Click **Continue**.

### Step 3 — Verify site ownership using the HTML meta tag method

Amplify Engage supports site ownership verification via the **HTML meta tag** method. This is the method compatible with the Google site verification ID field in the Marketplace settings.

> **Alternative methods**: Google Search Console also supports HTML file upload, Google Analytics tracking code, Google Tag Manager, and DNS record verification. These methods can be used to verify ownership independently of the Amplify Engage verification ID field, but the HTML meta tag approach is the native integration path.

#### 3a. Get your verification ID from Google Search Console

1. On the Ownership verification page in Search Console, select the **HTML tag** verification method.
2. Google generates a `<meta>` tag similar to the following:

   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
   ```

3. Copy the value of the `content` attribute only — the long alphanumeric string after `content="`. This is your **Google site verification ID**.
   * Do not copy the entire `<meta>` tag. Only the content value is required.
   * The verification ID is unique to your Google account and cannot be reused by another account.
4. Leave the Google Search Console browser tab open. You will return to it to complete verification.

#### 3b. Enter the verification ID in Amplify Engage

1. Return to Amplify Engage.
2. Navigate to **Organization > Marketplaces**, select your Marketplace, then go to **Integration > Search Engines**.
3. Ensure **Indexing** is set to **Enabled**.
4. In the **Google site verification ID** field, paste the content value you copied from Search Console.
5. Click **Save**.

Amplify Engage now injects the following meta tag into the `<head>` of your Marketplace homepage:

```html
<meta name="google-site-verification" content="<your-verification-id>" />
```

#### 3c. Confirm the tag is live on your Marketplace

Before completing verification in Google Search Console, confirm that the meta tag is rendering correctly on your live Marketplace homepage.

1. Open a browser and navigate to your Marketplace URL (e.g., `https://marketplace.example.com`).
2. Open the page source (right-click > **View page source**, or press `Ctrl+U` / `Cmd+U`).
3. Search for `google-site-verification` in the source (press `Ctrl+F` / `Cmd+F`).
4. Confirm the meta tag is present in the `<head>` section and that the `content` value matches the ID you copied from Search Console.

> **Tip**: Use an incognito or private browser window to confirm the tag is visible to unauthenticated users, as Googlebot accesses the page without authentication.

#### 3d. Complete verification in Google Search Console

1. Return to the Google Search Console browser tab.
2. Click **Verify**.
3. Search Console checks for the meta tag on your Marketplace homepage. If found, it confirms ownership and the property status changes to **Verified**.

> **Important**: Do not remove or change the Google site verification ID in Amplify Engage after verification. Google Search Console periodically re-checks for the tag to maintain your verified status. If the tag is removed, your property verification will eventually expire.

### Step 4 — Configure Marketplace settings to optimize indexing

The following Marketplace configuration settings directly affect what Google indexes and how your pages appear in search results. Review and configure these before submitting your sitemap.

#### Marketplace description (meta description)

The **Description** field in Marketplace settings is used as the meta description for the Marketplace homepage and as a fallback description for pages without their own description. This description may appear in Google search result snippets.

1. Navigate to **Organization > Marketplaces** and select your Marketplace.
2. In the **Description** field, enter a clear, concise description of your Marketplace (recommended: 120–160 characters).
   * This value is used as the meta description on the Marketplace homepage.
   * It is also used as a fallback description on product, category, and document pages that do not have their own description configured.
3. Click **Save**.

> **Note**: Only the description in the default language is used for the meta description field, regardless of Marketplace localization settings.

#### Sitename (page title)

The **Sitename** field controls the browser tab title and forms the base of page titles across the Marketplace. Well-formed page titles improve click-through rates from search results.

1. In the Marketplace settings, enter a descriptive value in the **Sitename** field (e.g., `Acme Developer Portal`).
2. This value appears as the primary title component across all Marketplace pages in search results. For example, a product page title renders as: `Acme Developer Portal - My API Product`.

#### Public access

Googlebot only indexes pages accessible to unauthenticated users. If your Marketplace **Access** is set to **Protected**, Google cannot crawl it regardless of your indexing and verification settings.

* Navigate to **Organization > Marketplaces > [Your Marketplace] > Settings**.
* Confirm **Access** is set to **Public**.

### Step 5 — Submit your Marketplace sitemap to Google Search Console

After verification, submit your Marketplace sitemap to Google Search Console. This tells Google which pages exist and helps accelerate initial indexing.

1. In Google Search Console, select your verified Marketplace property from the property selector.
2. In the left navigation, click **Sitemaps**.
3. In the **Add a new sitemap** field, enter your sitemap URL. For Amplify Engage Marketplaces, the sitemap is available at:

   ```text
   sitemap.xml
   ```

   Enter the path relative to your property root, e.g., `sitemap.xml` (Search Console will resolve this to `https://marketplace.example.com/sitemap.xml`).
4. Click **Submit**.
5. Search Console processes the sitemap and displays the number of discovered URLs. Indexing of submitted URLs typically begins within a few days, though it can take longer depending on your site's crawl priority in Google's queue.

> **Note**: The sitemap is generated and maintained automatically by Amplify Engage. You do not need to manually create or update it.

### Step 6 — Request indexing for priority pages (optional)

For pages you want indexed quickly — such as your Marketplace homepage or key product pages — you can request indexing directly in Google Search Console using the URL Inspection tool.

1. In Google Search Console, click **URL Inspection** in the left navigation.
2. Enter the full URL of the page you want indexed (e.g., `https://marketplace.example.com` or `https://marketplace.example.com/products/my-api`).
3. Click **Request Indexing**.
4. Google queues the URL for crawling. Inspection results typically update within a few days.

You can repeat this for any public Marketplace page, including:

* The Marketplace homepage
* Key product detail pages
* Category pages
* Public document pages linked in the navigation menu

### Indexed pages and metadata behavior

When indexing is enabled, Amplify Engage automatically applies page-specific titles and descriptions to the following public pages. These values are used by Google when displaying your Marketplace in search results.

* Homepage
* Products list
* Product details (any tab)
* Category list
* Category details
* Asset resource details (any tab)
* Documents page (only when exposed in the navigation menu)

Each page's title is composed from the Marketplace **Sitename** combined with the relevant entity name (product title, category title, etc.). The meta description uses the entity's own description if one is configured, otherwise it falls back to the Marketplace **Description**.

> **Tip**: To improve the quality of Google search result snippets, add descriptions to your products, categories, and documents in their respective configuration screens in Product Foundry and the Document Library. Pages without their own description f

## Robots.txt behavior

Robots.txt is managed at the platform level. Unified navigation elements are excluded from indexing to ensure only relevant Marketplace content is crawled by search engines.

## Limitation

The Google ID field is visible and editable only when Indexing is set to **Enabled**.
