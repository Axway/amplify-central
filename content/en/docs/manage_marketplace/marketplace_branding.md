---
title: Marketplace appearance
linkTitle: Marketplace appearance
weight: 40
---

Adjust the branding / appearance of the Marketplace to match the corporate guidelines of the Marketplace owner. The platform administrator may choose to use the Marketplace WebUI or API to change the settings.

Customizing the Marketplace appearance includes:

* Customize the logo
* Modify the WebUI color scheme / theme
* Alter font colors with organization's branding colors
* Replace standard banner with organization’s custom banner
* Change the contents of the help menu displayed in the navigation bar

## Before you start

You must have platform administrator credentials.

## Objectives

Learn how to change the appearance of the Marketplace by using either the WebUI or API.

## Customize the Marketplace appearance in the WebUI

All Marketplace appearance changes are made from the Marketplace *Appearance* page:

1. Navigate to *Organization > Marketplace*.
2. Select **Appearance**. *The Appearance page is displayed*:

    ![Marketplace appearance](/Images/marketplace/marketplace_appearance.png)

To revert branding changes, select either:

* **Reset to Amplify Platform defaults** - resets to default values.
* **Reset** - resets the changes to the previous values.

### Change the logo and favicon

From the *Appearance* page, click **Choose file** in either the Logo or the Favicon section to upload an icon from your local computer.

* Acceptable file formats include JPEG, PNG and GIF.
* The file must be less than 500MB.

A preview of the selected logo / favicon is displayed:

![Icon preview](/Images/marketplace/marketplace_defaulticons.png)

To remove the logo or favicon image, click **Remove** to revert to the Amplify default values.

### Change the color theme

From the *Appearance* page, click **Configure** in the Theme section to change the Marketplace colors and theming. The Theme settings are displayed:

![Icon preview](/Images/marketplace/marketplace_colortheme.png)

Under **Default Colors**, you can configure and preview:

* **Text** - color used for the page text.
* **Background** - color of the main Marketplace screens. This setting does not apply to the Product Card elements.
* **Link** - color applied to clickable text on the Marketplace screens.

Under **Elements Colors**, you can customize and preview:

* Product Cards:

    * **Card Title** - color of the card title.
    * **Card Background** - color applied to all card elements in the Marketplace.
    * **Card Boarders** - color applied to card boarders of all card elements in the Marketplace.

* Product Details banner and Call to Actions buttons:

    * **Heading Background** - color of the heading block displayed on the *Product Details* page.
    * **Heading Title** - color of the product title on the *Product Details* page.
    * **CTA button** - color of the buttons displayed in the heading section, such as **Documentation** and **Subscribe**.
    * **CTA button text** - color of the CTA button text.

* Default icons:

    * **Icon** - color of the default icons.

### Change the fonts

From the *Appearance* page, click **Configure** in the Fonts section to change and preview the Marketplace fonts. The font settings are displayed:

* **Font family** - the font set to display text. You can choose an existing font or add your own font.
* **Kerning** - adjust the spacing between characters.

### Change the buttons appearance

From the *Appearance* page, click **Configure** in the Buttons section to change and preview the Marketplace buttons. The buttons settings are displayed:

* **Button format** - the format of the button: Solid or Outline.
* **Button radius** - the button radius: Square, Rounded or Round.

### Use a custom banner

From the *Appearance* page, click **Choose File** to upload a banner from your local computer.

### Customize the help menu

From the *Appearance* page, click **Configure** in the Help Menu section to change the contents of the help menu displayed in the navigation bar. Click **Add menu item** to configure a Help menu. Do the following to configure menu items:

1. Click the question mark icon to select an icon from the drop down menu to use for the help item image.
2. Type a label for the menu item.
3. Type a link to the menu item.
4. Use the up and down arrow keys to arrange the menu items.
5. Click the delete icon to remove a menu item.
6. Click **Clear all items** to start with a blank configuration. *No Menu Configured* is displayed.

## Customize the Marketplace branding with APIs

The following APIs provide the equivalent functionality of what is provided throughout the WebUI.

See [APIs](https://apidocs.axway.com/swagger-ui-NEW/index.html?productname=AmplifyPlatform&productversion=1.0.0&filename=swagger.json&disabletry=true#/).

| Function                    |                  |
|-----------------------------|------------------|
| Get Marketplace settings    | /provider (GET)  |
| Set Marketplace settings    | /provider (POST) |
| Update Marketplace settings | / provider (PUT) |
