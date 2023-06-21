---
title: Marketplace settings
linkTitle: Marketplace settings
weight: 10
---

Configure the Marketplace to publish your products and expose them to consumers for consumption.

The platform Administrator will use the Amplify Enterprise Marketplace WebUI to configure the settings, including the Marketplace URL, access, and Terms & Conditions.

## Before you start

You must have platform Administrator credentials.

## Objectives

Learn how to use the Amplify Enterprise Marketplace WebUI to configure your organization's settings.

## Configure settings

1. Log into Amplify.
2. Navigate to Organization.

    {{< alert title="Caution" color="danger" >}}Users with the appropriate rights can configure General Settings for the Marketplace, such as the name of the Marketplace (that will appear in the Marketplace URL) and the Access mode, by using the Organization settings in the user menu. {{< /alert >}}

3. Select **Marketplace > Settings**. *The Marketplace Settings page is displayed*.
4. Set the values for:

    * **Marketplace URL** - select whether your Marketplace is hosted on a subdomain or fully qualified domain name. This is required to make your Marketplace available for product publication:

        * **URL** - select to host your Marketplace on a fully qualified domain name. Type the URL where your Marketplace will be available and upload a certificate that matches the specified URL.
        * **Certificate** - for a fully qualified domain name, upload a certificate that matches the specified URL.
        See [Customize Marketplace URL](/docs/manage_marketplace/marketplace_vanity_url) for more information.
        * **Subdomain** - select to host your Marketplace on a subdomain. Type the URL where your Marketplace will be available. This subdomain is hosted by Axway.

    * **Access** - indicates whether the Marketplace can be accessed by unauthenticated users or by registered users in your organization:

        * **Protected** - select to make the Marketplace accessible only to registered users in your organization.
        * **Public** - select to make your Marketplace accessible to all users, anonymous and authenticated with an account.

    * **Consumer Organizations** - select whether consumers outside of your organization can access your Marketplace (allow or disallow):

        * **Self signup** - when Consumer Organizations are allowed, this setting becomes available and indicates whether a user can signup for the Marketplace:

            * **Disallow** - self-signup is disabled and only Administrators can invite users into the Marketplace.
            * **Allow** - anyone can sign up to the Marketplace and register their own account.

        * **Require Approval** - select to require approval for newly registered consumer orgs before allowing access to the corresponding Marketplace:

            * **Unrestricted** - approval from an org Administrator is not required to access the corresponding Marketplace.
            * **Restricted** - approval from an org Administrator is required to access the corresponding Marketplace.

    * **Terms and Conditions** - enable **Require acceptance of Terms & Conditions** to require users to acknowledge the Terms & Conditions the first time they navigate to the Marketplace. Otherwise, acknowledgement is never required.

        * If enabled, you must provide the Terms & Conditions by either uploading a PDF file or entering a URL where it is available.

    * **Administration preference** - indicates who will be able to update the Marketplace settings:
        * **All teams** (default) - anyone having a Marketplace Manager role in any team is allowed to manage the Marketplace settings or any Administrator user.
        * **None** - only an Administrator user can manage the Marketplace settings.
        * **Selected teams** - only a member of the team with a **Marketplace Manager** role can manage the Marketplace settings or any Administrator user.

    * **Publication preference** - indicates which team can publish product into the Marketplace:
        * **All teams** (default) - anyone having a Catalog Manager role in any team is allowed to publish product into the Marketplace.
        * **None** - no one is allowed to publish a product into the Marketplace.
        * **Included teams** - only a **Catalogs Manager** of the selected team can publish product into the Marketplace.
        * **Excluded teams** - only a **Catalogs Manager** that is not part of the selected team can publish product into the Marketplace.
        * **Included teams with tags** - only a **Catalogs Manager** of the specified team that has the selected tag can publish product into the Marketplace.
