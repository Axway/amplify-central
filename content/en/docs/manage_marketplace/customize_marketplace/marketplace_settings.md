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

3. Select **Marketplaces** and click the Edit icon. *The Marketplaces Settings page is displayed*.
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

        * **Self signup** - when Consumer Organizations are allowed, this setting becomes available and indicates whether a user can sign up for the Marketplace:

            * **Disallow** - self-signup is disabled and only Administrators can invite users into the Marketplace.
            * **Allow** - anyone can sign up to the Marketplace and register their own account.

        * **Require Approval** - select to require approval for newly registered consumer orgs before allowing access to the corresponding Marketplace:

            * **Unrestricted** - approval from an org Administrator is not required to access the corresponding Marketplace.
            * **Restricted** - approval from an org Administrator is required to access the corresponding Marketplace.

        * **Identity Providers** - when Consumer orgs are allowed, this setting becomes available and indicates whether an organization can establish custom Identity Providers for the Marketplace:

            * **Disallow** - default. No external Identity Provider can be used for the Marketplace organization.
            * **Allow** - consumer organizations in your Marketplace can establish/use custom Identity Providers.

        * **Sign In With GitHub** - when Consumer users are allowed, this setting indicates that a user can sign into the Marketplace with GitHub:

            * **Disallow** - default. No login or sign up with a GitHub account is allowed for this Marketplace.
            * **Allow** - Consumer users can sign into your Marketplace using their GitHub account. If self-signup is enabled, consumers can sign up with their GitHub account. To enable, you must create an Authorized Client in GitHub with the displayed callback URL and then enter the GitHub Client ID and secret in the Marketplace settings. Once the settings are saved, users will be allowed to use their GitHub account to connect to this Marketplace.

                * **GitHub Authorization Callback URL** - authorized callback URL to set on your registered Client within GitHub. The GitHub authorization will call this URL after a successful login.
                * **GitHub Client ID** - Client ID of your registered application within GitHub.
                * **GitHub Client Secret** - Client secret for your registered application within GitHub.

        * **Sign In With GitLab** - when Consumer users are allowed, this setting indicates that a user can sign into the Marketplace with GitLab:

            * **Disallow** - default. No login or sign up with a GitLab account is allowed for this Marketplace.
            * **Allow** - Consumer users can sign into your Marketplace using their GitLab account. If self-signup is enabled, consumers can sign up with their GitLab account. To enable, you must create an Authorized application in GitLab with the displayed callback URL and then enter the Application ID and secret in the Marketplace settings. Once the settings are saved, users will be allowed to use their GitLab account to connect to this Marketplace.

                * **GitLab Authorization Callback URL** - authorized callback URL to set on your registered application within GitLab. The GitLab authorization will call this URL after a successful login.
                * **GitLAb Application ID** - Application ID of your registered application within GitLab.
                * **GitLab Application Secret** - Application Secret for your registered application within GitLab.

        * **Sign In With Google** - when Consumer users are allowed, this setting indicates that a user can sign into the Marketplace with Google:

            * **Disallow** - default. No login or sign up with a Google account is allowed for this Marketplace.
            * **Allow** - Consumer users can sign into your Marketplace using their Google account. If self-signup is enabled, consumers can sign up with their Google account. To enable, you must create an OAuth 2.0 Client ID in Google cloud service with the displayed callback url and then enter the Client ID and secret in the Marketplace settings. Once the settings are saved, users will be allowed to use their Google account to connect to this Marketplace.

                * **Google Authorization Callback URL** - authorized redirect URI to set on your OAuth client within Google. Google will call this URL after a successful login.
                * **Google Client ID** - Client ID of your registered OAuth 2.0 Credentials within Google.
                * **Google Client Secret** - Client secret for your registered OAuth 2.0 Credentials within Google.

    * **Terms and Conditions** - enable **Require acceptance of Terms & Conditions** to require users to acknowledge the Terms & Conditions the first time they navigate to the Marketplace. Otherwise, acknowledgement is never required.

        * If enabled, you must provide the Terms & Conditions by either uploading a PDF file or entering a URL where it is available.

    * **Custom Version Display** - indicates which product version will be visible in the Marketplace (the generated one or the custom one).

        * **Disabled** - default. The consumer will see the system generated version of the product.
        * **Enabled** - the consumer will see the custom product version, if any, set by the provider. If the provider does not supply a custom version, the system generated version will be displayed.

        * **Product Version display** - select which version to show in the Marketplace.
          * **Show all versions** - all available versions will be displayed.
          * **Show only latest version** - only the most recent version will be visible to the consumer.

    * **Administration preference** - indicates who will be able to update the Marketplace settings:
        * **All teams** (default) - anyone having a Marketplace Manager role in any team is allowed to manage the Marketplace settings or any Administrator user.
        * **None** - only an Administrator user can manage the Marketplace settings.
        * **Selected teams** - only a member of the team with a **Marketplace Manager** role can manage the Marketplace settings or any Administrator user.

    * **Publication Preference** - indicates which team can publish product into the Marketplace:
        * **All teams** (default) - anyone having a Catalog Manager role in any team is allowed to publish product into the Marketplace.
        * **None** - no one is allowed to publish a product into the Marketplace.
        * **Included teams** - only a **Catalogs Manager** of the selected team can publish product into the Marketplace.
        * **Excluded teams** - only a **Catalogs Manager** that is not part of the selected team can publish product into the Marketplace.
        * **Included teams with tags** - only a **Catalogs Manager** of the specified team that has the selected tag can publish product into the Marketplace.

    * **Consumption Preference** - indicates which teams can view and navigate to this Marketplace:
        * **All teams** (default) - anyone in any team is allowed to view and navigate this Marketplace.
        * **None** - no one is allowed to view and navigate this Marketplace.
        * **Included teams** - only members of the selected team can view and navigate this Marketplace.
        * **Excluded teams** - only members that are not part of the selected team can view and navigate this Marketplace.
        * **Included teams with tags** - only members of the specified team that has the selected tag can view and navigate this Marketplace.
