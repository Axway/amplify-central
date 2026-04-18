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

### Key characteristics

* Elements can be added, removed, and reordered.
* Elements support configurable widths: **full**, **half**, or **quarter**.
* Elements automatically wrap to the next row when the total width exceeds available space.
* Multiple elements of the same type can be added.
* Each element includes visibility settings for unauthenticated users.
* All elements are responsive across desktop, tablet, and mobile devices.

> The **Navigation menu** element is required and is always present, including in an empty homepage state. Its menu items are configured from **Marketplace Settings > Pages and Menus > Homepage**.

---

## Open homepage settings

All Marketplace homepage customizations are performed from **Marketplace Settings > Pages and Menus > Homepage**.

1. Sign in to Amplify Engage.
2. Navigate to **Marketplace Settings > Pages and Menus**.
3. Select **Homepage**.

A default homepage layout is displayed. You can modify existing elements or add new ones.

> **Important**: Ensure the **Enabled** toggle is set to **Show**. Setting it to **Hide** disables the custom homepage and prevents it from being displayed.
Changes are reflected dynamically in the preview, which can be toggled between:

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

[//]: # (**Sign In / Register**)
---

## Page Header (Content)


A flexible, content based element to introduce and frame homepage content.

* Optional element.
* Can be added, removed, and reordered.
* Multiple instances supported.

Supports:

* Text
* Button
* Image
* Document
* Search

Common uses include branding, announcements, onboarding, search first experiences, and calls to action.
 
**Configurable properties**

* Content objects and layout
* Background color or gradient
* Background image (PNG, GIF, JPG, max 5 MB)
* Typography and alignment
* Visibility settings

---

## Card

A structured container for grouped information, links, or actions.

* Optional element.
* Multiple instances supported.

Common uses include promotions and curated content.
 
**Configurable properties**

* Content and layout
* Background styling
* Typography
* Visibility settings

---

## Navigation menu (required)

Provides primary navigation.

* Required element.
* Can be reordered.
* Multiple navigation menus supported.
* Menu entries configured from **Marketplace Settings > Pages and Menus > Homepage**.

---

## Categories

Supports discovery and browsing. Highlights category groupings or discovery paths.
  
**Configurable properties**

* Category selection
* Sort order
* Layout and styling
* Visibility settings

---

## Products

Displays curated or dynamic product lists.
 
**Configurable properties**

* Product selection method
* Sort order
* Item limits
* Layout and styling
* Visibility settings

---

## Separator

Visually separates sections to improve readability.
 
**Available styles**

* Solid
* Dotted
* Dashed


[//]: #
  (Sign In / Register
  Adds or configures authentication entry points.
  Optional element.
  Can be reordered.
  Supports hiding the default Marketplace Sign In / Register button.
  Used when providing custom sign in or registration experiences.)

---

## Review and save

1. Review layout and content in the live preview.
2. Verify ordering, messaging, language, and authentication behavior.
3. Click **Save** to apply changes.

---

## Result

* Homepage renders using the configured elements and order.
* Only selected elements are displayed.
* Visibility rules are applied for unauthenticated users.
* Layout adapts to different screen sizes.
