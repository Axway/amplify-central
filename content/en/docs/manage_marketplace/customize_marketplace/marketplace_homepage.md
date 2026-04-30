---
title: Marketplace homepage
linkTitle: Marketplace homepage
weight: 40
---

Configure the Marketplace homepage using a flexible, element-based layout model that allows Marketplace Administrators to control structure, ordering, visibility, and content in alignment with branding and user-experience requirements.

---

## Before you start

* You must have Marketplace Administrator (or Platform Administrator) credentials.
* Your organization must have the Public Marketplace entitlement enabled.
  
---

## Objectives

* Understand the element based homepage model.
* Customize homepage layout, order, and visibility.
* Configure homepage elements and their content.

---

## Element based homepage model

The Marketplace homepage is composed of elements. Each element represents a section of the homepage and includes its own configuration and styling properties.

### Element Key characteristics

* All Elements can be added, removed, and reordered.
* Elements support configurable widths: **full**, **half**, or **quarter**.
* Elements automatically wrap to the next row when the total width exceeds available space.
* Multiple elements of the same type can be added.
* Each element includes visibility settings for unauthenticated users.
* All elements are responsive across desktop, tablet, and mobile devices.

---

## Open homepage settings

All Marketplace homepage customizations are performed from **Marketplace Settings > Pages and Menus > Homepage**.

1. Sign in to Amplify Engage.
2. Navigate to **Marketplace Settings > Pages and Menus**.
3. Select **Homepage**: A default homepage layout is displayed. You can modify existing elements or add new ones.
4. Click **Save** to apply changes.

> **Important**: Ensure the **Enabled** toggle is set to **Show**. Setting it to **Hide** disables the custom homepage and prevents it from being displayed.
Changes are reflected dynamically in the preview, which can be toggled between:

Once configured, the homepage renders using the selected elements in the defined order. Only the elements explicitly added by the administrator are displayed, and visibility rules are applied to control what unauthenticated users can see. The layout automatically adapts to different screen sizes, ensuring a responsive and consistent experience across devices.

---

## Manage homepage layout

Elements can be added, deleted, and reordered at any time.
> Actions are executed by clicking the respective buttons. Changes appear immediately in the preview.

### Add an element

1. Click the **+** button to add a new element.
2. The **Add to page** screen opens.
3. Select an element type.
4. The element is added to the layout.

### Edit an element

Clicking the edit button opens the element configuration screen specific to the element type

### Delete an element

Clicking the delete button will delete the selected element and reorder the remaining elements accordingly.

### Reorder an element

Drag and drop the element using the reorder button to update the order of the elements

### Default

Revert the homepage items to the default layout at any time.

---

## Homepage configuration actions

* **Export** – Download the current homepage configuration.
* **Import** – Import a previously exported configuration.
* **Reset** – Restore the default homepage configuration.

> Changes are **not applied** until you click **Save**. All edits, imports, or resets take effect only after saving.

The homepage preview has additional options for

* Signed in view
* Signed out view
* Localized language views

---

## Supported homepage elements

Each element can be configured independently, and multiple instances of any element type can be added.

### Available element types

* **Page Header (Content)**
* **Card**
* **Navigation menu**
* **Categories**
* **Products**
* **Separator**
* **Sign In / Register**

---

## Element: Page Header (Content)

The Page Header (Content) element is a pre‑defined, content‑based homepage element used to introduce, frame, and structure Marketplace homepage content. It serves as a container for multiple UI elements, enabling Marketplace Administrators to build rich, branded, and targeted homepage sections without requiring custom development.
This element supports flexible composition and layout and can be reused multiple times on the homepage.

Common uses include branding, announcements, onboarding, search first experiences, and calls to action.

* Optional element - not required on the homepage
* Fully configurable - styling, layout, and visibility can be tailored per instance
* Can be placed anywhere on the homepage.
* Multiple instances supported - use several Content elements on the homepage

A Page Header (Content) element can include any combination of the following elements:

* **Text**
* **Button**
* **Image**
* **Document**
* **Search**

Each element inside the Content container has its own configuration options.

Configurable properties

The following properties apply to the Content element itself and control the overall look, layout, and visibility of the container.

* Background image (PNG, GIF, JPG, max 5 MB): Image source, Image Size, Image position in the container.
* Background boder and layout
* Background color or gradient
* Visibility settings - controls who can see the content. This allows targeted content such as onboarding prompts for anonymous users or announcements for authenticated consumers.

---

## Element: Card (Content)

The **Card** element is a pre‑defined, content‑based homepage element that serves as a compact container for multiple UI elements, similar to the **Page Header (Content)** element. It allows Marketplace Administrators to group text, buttons, images, documents, or search into a focused, self‑contained section. The Card element is best suited for localized calls to action and supporting content that complements larger homepage sections.

While both elements act as containers, they are designed for different presentation and intent:

* The **Page Header** element is optimized for hero‑style sections, typically spanning the full width of the page and used to introduce or frame major areas of the homepage.
* The **Card** element is optimized for targeted, action‑oriented content within the homepage canvas and is typically used to highlight a specific action, message, or entry point.

### Card Key characteristics

* Pre-defined, reusable element
* Optional element - not required on the homepage
* Acts as a container for multiple child UI elements
* Designed for focused, CTA‑driven content
* Typically placed within the homepage layout grid rather than spanning full width
* Fully configurable - styling, layout, and visibility can be tailored per instance
* Can be placed anywhere on the homepage.
* Multiple card elements can be used

Can include any combination of the following elements:

* **Text**
* **Button**
* **Image**
* **Document**
* **Search**

Each element inside the Content container has its own configuration options.

Configurable properties

* Background image (PNG, GIF, JPG, max 5 MB): Image source, Image Size, Image position in the container.
* Background boder and layout
* Background color or gradient
* Visibility settings - controls who can see the content. This allows targeted content such as onboarding prompts for anonymous users or announcements for authenticated consumers.

---

## Element: Navigation Menu

Provides primary navigation.

* Required element.
* Can be reordered.
* Multiple navigation menus supported.
* Menu entries configured from **Marketplace Settings > Pages and Menus > Homepage**.

For full configuration details, see [Marketplace menus](https://docs.axway.com/bundle/amplify-central/page/docs/manage_marketplace/customize_marketplace/marketplace_menus/index.html).

---

## Element: Categories

The **Categories** element is a pre‑defined homepage element designed to support discovery and browsing by highlighting category groupings and curated discovery paths within the Marketplace. It allows Marketplace Administrators to surface Featured Categories prominently on the homepage, helping consumers quickly navigate products and resources that are relevant to their needs.
This element can be used to:

* Promote featured or prioritized categories
* Guide users toward specific use cases, domains, or solution areas
* Improve product discoverability by organizing content into clear, meaningful groupings
* Reduce friction for new or exploratory users by providing curated entry points
  
Configurable properties

The Categories element provides the following configuration options:

* Title
    * Descriptive label displayed above the categories
    * Default value: Featured Categories
    * Can be customized to reflect the intended discovery theme (for example, Explore by Use Case or Popular Categories)
* Sort Order
    * Alphabetical
    * Most recent
* Layout
    * Control how categories are visually presented within the homepage layout
    * Supports consistent alignment with other supported elements
* Visibility Settings
    * Control who can see the Categories element
    * Options include always visible, signed‑in users only, or signed‑out users only

---

## Element: Products

The **Products** element is a pre‑defined homepage element used to display curated or dynamic lists of Marketplace products. It enables Marketplace Administrators to prominently surface selected products on the homepage, supporting discovery, promotion, and adoption of offerings that align with business priorities or specific consumer use cases.
This element allows administrators to control which products are displayed, how they are ordered, and how many are shown, while ensuring a consistent visual presentation aligned with the overall Marketplace design.

### Purpose and Use Cases

The Products element is best suited for highlighting specific products and driving engagement directly from the homepage.

Common use cases include:

* Promoting featured or strategic products
* Highlighting products related to a specific use case or domain
* Surfacing newly published or recently updated products
* Guiding consumers toward recommended starting points
* Supporting campaigns, launches, or adoption initiatives

The Products element can be used in combination with Page Header (Content), Card, and Categories elements to create clear discovery paths across the homepage.

Configurable properties

* Display Products
    * Define how products are selected for display (for example, curated selections or dynamically driven sets)
    * Options include *Products with specific tag*, *Top rated products*, *Published Products*
* Sort by
    * Control the order in which products are displayed
    * Options include *alphabetical* and *most recent*
* Count
    * Specify the maximum number of products displayed in the element. Max 12 products.
    * Helps maintain visual balance and avoid overwhelming users
* Layout
* Visibility Settings
    * Define who can see the Products element
    * Options may include: *Always visible*, *Signed‑in users*, *Signed‑out users*

---

## Element: Separator

Visually separates sections to improve readability.

### Available styles

* Solid
* Dotted
* Dashed

===

## Sign In / Register

Adds or configures authentication entry points.
  
* Optional element.
* Can be reordered.
* Supports hiding the default Marketplace Sign In / Register button.
* Used when providing custom sign in or registration experiences.

---

## Element: Text

Can be used for headings, descriptions, announcements, or instructional content, section headers.

Configurable properties:

* Markdown‑formatted content
* Text color
* Border
* Layout

---

## Element: Button

Can be used for call to action and navigation.

Configurable properties:

* URL: External link or document selected from the Document Library
* Button text
* Action behavior: Open in same tab / Open in new tab
* Appearance: Can be selected from a set of predefined styles (Heading, Primary, Secondary, Tertiary) or define your own custom style.
* Border
* Layout

---

## Element: Image

Typically used for branding, visual emphasis, or banners.

Configurable properties:

* Image source
* Alt text (for accessibility)
* Border
* Layout

---

## Element: Document

Embeds content from the Document Library directly into the homepage.

Configurable properties:

* Selected document from Document Library
* Border
* Layout
* Alignment

Typical uses:

* Embedded welcome documents
* Release notes or announcements
* Getting‑started guides

---

## Element: Search

Adds a search bar inside the Content container to facilitate discovery.

Configurable properties:

* Search scope
    * Products
    * Documents
    * Resources
    * All
* Placeholder text: Text displayed inside the search bar
* Layout

Typical uses:

* Search‑first homepage experiences
* Prominent product or documentation search
