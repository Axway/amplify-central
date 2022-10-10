---
title: Marketplace appearance
linkTitle: Marketplace appearance
weight: 40
---

Adjust the branding / appearance of the Marketplace to match the corporate guidelines of the Marketplace owner. The platform administrator may choose to use the Amplify Enterprise Marketplace WebUI or API to change the settings.

Standard custom branding capabilities include:

* Customize the logo
* Modify the WebUI color scheme / theme
* Alter font colors with organization's branding colors
* Change the contents of the help menu displayed in the navigation bar

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

A preview of the selected logo / favicon is displayed:

![Logo and Favicon preview](/Images/marketplace/marketplace_logo.png)

Click **Remove** to remove the logo or favicon image.

### Change the color theme

From the *Appearance* page, click **Configure** in the Theme section to change the Marketplace colors and theming to match your brand. The Theme settings are displayed:

![Color theme preview](/Images/marketplace/marketplace_colortheme.png)

Under **Brand Colors**, you can configure and preview:

* **Primary** - colors used for icons, card titles, tab menu links (hover and active), and call to action (CTA) buttons.
* **Secondary** - color for the hero banner.
* **Tertirary** - color for the product banner.
* **Black** - color used for page text.
* **Background** - color of the main Marketplace screens. This setting does not apply to the card elements.

Under **Semantic Colors**, you can configure and preview:

* Alerts, messaging, and common UI patterns:

    * **Success** - color used for the success state icon.
    * **Danger** - color used for the danger state icon.
    * **Warning** - color used for the warning state icon.
    * **Info** - color used for the info state icon.

Under **Element Colors**, you can customize and preview:

* Product details banner:

    * **Heading Titles** - color used for page titles, section titles, and title text.
    * **Heading Backgrounds** - color used for the heading block.

* Cards:

    * **Card Titles** - color of the card titles.
    * **Card Backgrounds** - color applied to all card background.
    * **Card Borders** - color applied to card borders of all card elements in the Marketplace.

* Links and icons:

    * **Links** - color applied to clickable text on the Marketplace screens.
    * **Icons** -  color applied to icons next to clickable text on the Marketplace screens.

* Call to Action buttons:

    * **CTA Button** - color of the buttons displayed in the heading section, such as **View** and **Subscribe**.
    * **CTA Button Text** - color of the CTA button text.

Click **Reset to Amplify Platform defaults** to reset the colors to the default values.

### Change the fonts

From the *Appearance* page, click **Configure** in the Fonts section to change and preview the Marketplace fonts. The font settings are displayed:

* **Font family** - the font set to display text. You can choose an existing font or add your own font.
* **Kerning** - adjust the spacing between characters.

Click **Save** at the top of the page to save your changes or **Reset** to revert the changes to the previous values.

### Change the buttons appearance

From the *Appearance* page, click **Configure** in the Buttons section to change and preview the Marketplace buttons. The buttons settings are displayed:

* **Button format** - the format of the button: Solid or Outline.
* **Button radius** - the button radius: Square, Rounded or Round.

Click **Save** at the top of the page to save your changes or **Reset** to revert the changes to the previous values.

### Customize the help menu

From the *Appearance* page, click **Configure** in the Help Menu section to change the contents of the help menu displayed in the navigation bar. Click **Add menu item** to configure a Help menu. Do the following to configure menu items:

1. Click the question mark icon to select an icon from the drop down menu to use for the help item image.
2. Type a label for the menu item.
3. Type a link to the menu item.
4. Click the up or down arrow keys to move the menu item's position.
5. Click the delete icon to remove a menu item.
6. Click **Clear all items** to start with a blank configuration. *No Menu Configured* is displayed.

## Customize the Marketplace appearance with APIs

The following APIs provide the equivalent functionality of what is provided throughout the WebUI to brand your Marketplace.

See [APIs](https://platform.axway.com/api-docs.html#operation/provider_providerFindGroups).

| Function                    |                  |
|-----------------------------|------------------|
| Get Marketplace settings    | /provider (GET)  |
| Set Marketplace settings    | /provider (POST) |
| Update Marketplace settings | / provider (PUT) |