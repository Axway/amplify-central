---
title: Consumer experience
linkTitle: Consumer experience
weight: 100
hide_readingtime: true
---

Once consumers are logged in, they can browse products, subscribe to products, and request access and credentials for resource they want to use.

## Log into the Marketplace

Before you can subscribe to products and request access to APIs, you must first log in with an account. If you don't have an account, you must set one up.

### Account setup options

* If the provider has enabled self-service registration:
    * You can sign up directly by creating a Consumer Organization account.
    * Once registered, you can log in and begin exploring products, subscribing, and requesting access to resources.

* Invite-based:
    * The provider must create an account for you with the appropriate permissions.
    * You'll receive an invitation link from the provider.
    * Use the link to access your account.

## Subscribe to a product

Once you have set up your account and found the product that is right for you, it's time to subscribe to the product.

1. From the *Product details* page, click **Subscribe**.
2. Select a plan that fits your needs.
3. Set a team ownership if you are part of multiple teams.
4. Name your subscription.
5. Click **Subscribe**.

{{< alert title="Note" color="primary" >}}Some subscriptions are approved automatically; others may need provider approval.{{< /alert >}}

## Register an application

Once your product subscription is approved, you can register an application to gain access to the product resources.

1. From the *Product details* page, click **Register Application** and complete the wizard.

    * **Select Application**
        * Choose an existing application or create a new one.
        * Pick an active subscription.
        * Go to the next step.

    * **Select Resources**
        * Select the resources you want from the searchable table. Only resources included in your subscription plan are shown.

    * **Registration Details**
        * Fill out additional details that the resources require (if applicable).
        * Resources that require the same registration information are grouped together. You only need to provide the information once per group.
        * You must complete all required fields before moving to the next step.

    * **Review and Submit**
        * Review your selections.
        * Double check before submitting.
        * Click **Register Application**. After submission, a confirmation message appears with a link to track your application registrations or request a credential.

{{< alert title="Note" color="primary" >}}Some resources may require manual approval by the provider. The registration will indicate whether access is granted instantly or pending approval. You can access the application registration requests from the left menu on the *Application Registrations* page.{{< /alert >}}

## Request a credential

Once your application registration is approved and access to the product resources is granted, you must generate a credential to begin using the APIs. A credential is required every time you call a protected product resource and functions as your access key, verifying your identity and permissions. Without a credential, you won’t be able to interact with APIs that are protected by mechanisms like API Keys or OAuth credentials.

1. Navigate to the application you registered.
2. Click **Generate Credential**.
3. Select a resource and the credential type.
4. Complete necessary configuration details.
5. Once generated, securely store your credential.

{{< alert title="Note" color="primary" >}}Multiple resources can share the same credential. Review the credential details to verify the resources it applies to.{{< /alert >}}

## Related topics

See the following topics for related information.
