---
title: Marketplace appearance
linkTitle: Marketplace appearance
weight: 30
---

Adjust the branding / appearance of the Marketplace to match the corporate guidelines of the Marketplace owner. The platform administrator may choose to use the Amplify Enterprise Marketplace WebUI or API to change the settings;however, only changes made with the WebUI can be previewed before they are saved.

Standard appearance capabilities include:

* Branding
    * Customize the logo
    * Upload an icon for users to see on the browser tab
    * Modify the WebUI color scheme / theme

* Typography
    * Change the font
    * Change the spacing between characters

* Buttons
    * Select the background fill of the buttons
    * Select the default radius of the buttons

## Before you start

You must have platform administrator credentials.

## Objectives

Learn how to change the appearance of the Marketplace by using either the WebUI or API.

## Customize the Marketplace appearance in the WebUI

All Marketplace branding changes are made from the Marketplace *Appearance* page:

1. Navigate to *Organization > Marketplace*.
2. Select **Appearance**. *The Appearance page is displayed*:

    ![Marketplace appearance](/Images/marketplace/marketplace_appearance.png)

### Change the logo and favicon

From the *Appearance* page, click **Choose file** in either the Logo or the Favicon section to upload an icon from your local computer.

* **Logo** - acceptable file formats are PNG, GIF or JPG and the file must be less than 500KB.
* **Favicon** - acceptable file formats are ICO or PNG and the file must be less than 100KB.

A preview of the selected logo / favicon is displayed.

Click **Remove** to remove the logo or favicon image.

### Change the color theme

From the *Appearance* page, click **Configure** in the Theme section to change the Marketplace colors and theming to match your brand.

The Theme settings are displayed:

* Click anywhere in the preview to highlight the corresponding colors from the list.
* Select a color from the list to see it reflected on the preview.

{{< alert title="Note" color="primary" >}} At any time while you are modifying the theme, simply click **Reset to Amplify Platform defaults** in the Colors section to reset to the default light or dark values.{{< /alert >}}

Under **Element Colors**, you can customize and preview common elements:

* **Text** - color applied to default page text.
* **Background** - color applied to the page background.
* **Links** - color applied to clickable text.
* **Icons** - color applied to icons.
* **Muted Text** - color applied to details and contextual text.

Under **Action Colors**, you can customize and preview buttons and other actionable elements:

* **Primary** - color used for primary actions, such as icons, card titles, tab menu links (hover and active), and call to action (CTA) buttons.
* **Secondary** - color for the secondary actions, such as the hero banner.
* **Tertiary** - color for the supplemental actions, such as the product banner.

Under **Status Colors**, you can customize and preview alerts, badges and other status indicators:

* **Success** - color used to indicate success or completion.
* **Danger** - color used to indicate an error or loss of data.
* **Warning** - color used for to indicate a non-destructive message.
* **Info** - color used for additional information message.

Under **Container Colors**, you can customize and preview cards, inputs, rules, modals, sideblades and drop-downs

* **Titles** - color used for container element title text.
* **Text** - color used for container element text.
* **Backgrounds** - color used for container element backgrounds.
* **Secondary Backgrounds** - color used for alternate container element backgrounds, such as table headings.
* **Borders** - color used for container element borders.
* **Active Text** - color used for text to indicate active state.
* **Active Backgrounds** - color used for backgrounds to indicate active state.

Under **Header Colors**, you can customize and preview header elements:

* **Title** - color used for page heading text.
* **Background** - color used for page heading background.
* **Buttons** - color used for page heading button background
* **Button Text** - color used for page heading button text.

Under **Navigation Colors**, you can customize and preview the top and left navigation elements:

* Top Navigation
    * **Text** - color used for top navigation bar text.
    * **Background Fill** - pattern used for top navigation background fill.
    * **Color** - color used for top navigation bar background.
    * **Menu Background** - color used for top navigation bar drop-down menu backgrounds.
    * **Icons** - color used for top navigation bar drop-down menu icons.

* Left Navigation
    * **Text** - color used for left navigation text.
    * **Background** - color used for left navigation background.
    * **Active Text** - color used for left navigation text to indicate active state.
    * **Active Background** - color used for left navigation backgrounds to indicate active state.

Click **Save** at the top of the page to save your changes or **Reset** to revert the changes to the previous values.

### Change the font

From the *Appearance* page, select a menu option from the Typography section to change and preview the Marketplace font:

* **Font family** - the font set to display text. You can choose an existing font or add your own font.
* **Kerning** - adjust the spacing between characters.

Click **Save** at the top of the page to save your changes or **Reset** to revert the changes to the previous values.

### Change the buttons appearance

From the *Appearance* page, select a radio button in the Buttons section to change and preview the Marketplace buttons:

* **Button format** - the format of the button. Choose Solid or Outline.
* **Button radius** - the button shape. Choose Square, Rounded or Round.

Click **Save** at the top of the page to save your changes or **Reset** to revert the changes to the previous values.

## Customize the Marketplace appearance with APIs

The following APIs provide the equivalent functionality of what is provided throughout the WebUI to brand your Marketplace.

See [APIs](https://platform.axway.com/api-docs.html#operation/provider_providerFindGroups).

| Function                    |                  |
|-----------------------------|------------------|
| Get Marketplace settings    | /provider (GET)  |
| Set Marketplace settings    | /provider (POST) |
| Update Marketplace settings | / provider (PUT) |