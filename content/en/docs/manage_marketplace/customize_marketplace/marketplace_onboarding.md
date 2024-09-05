---
title: Marketplace Onboarding
linkTitle: Marketplace Onboarding
weight: 47
---

Customize the Marketplace to capture additional metadata during the user sign up process on the Consumer Org registration form.

## Before you start

You must have Platform Administrator credentials and your organization must have the Public Marketplace entitlement to enable and configure additional *Onboarding* data capture.

## Objectives

Learn how to enable and configure Marketplace *Onboarding* so that administrators can capture additional consumer organization registration information.

## Enable the Marketplace additional data capture

1. Navigate to *platform.axway.com > Organization > Marketplaces*.
2. Open the desired Marketplace by clicking the Marketplace name.
3. Select **Onboarding** tab.
4. Switch the **Onboarding** toggle to **Enabled** (Disabled by default) to enable additional data to be captured for your Marketplace consumer organizations during onboarding.
5. Click **+ Field** to configure a field type.
6. Select a **type** from the dropdown menu:

    * **Header** - Enter the header **label**.
    * **Text** - Enter the field **label**, toggle to set field to either **required** or **optional**. Note that the hover **Hint**, **Max Length** of field and field **Place holder** are not required.
    * **Number** - Enter the field **label**, toggle to set field to either **required** or **optional**. Note that the hover **Hint** and field **Place holder** are not required.
    * **Date** - Enter the field **label**, toggle to set field to either **required** or **optional**. Note that the hover **Hint** and field **Place holder** are not required.
    * **Checkbox** - Enter the checkbox **label**, toggle to set checkbox to either **required** or **optional**. Note that hover **Hint** and **Selection text** are not required.
    * **Toggle** - Enter the toggle **label**, toggle to set whether the toggle control is **required** or **optional**. Note that the hover **Hint** is not required, but **Enabled Text** and **Disabled Text** are required. This is the text that is either enabled or disabled by the toggle selection on the registration form.
    * **Select** - Enter the selection **label**, toggle to set field to either **required** or **optional**. Note that the hover **Hint** and **Default selected text** are not required, but **Options** must have at least two values and corresponding labels.
    * Multi-Select - Enter the multi-select **label**, toggle to set field to either **required** or **optional**. Note that the hover **Hint** and **Default selected text** are not required, but **Options** must have at least two values and corresponding labels.

7. Click **+** to add another field to the Consumer Org registration form. Click **Save** to add the field(s) to the Consumer Org registration form.

{{< alert title="Note" color="primary" >}}Only an admin user can add/edit additional onboarding information. Use the editing toolbar on the **Onboarding** tab to move, edit and delete the configured field(s).{{< /alert >}}
