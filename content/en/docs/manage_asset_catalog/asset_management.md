---
title: Asset management
linkTitle: Asset management
weight: 20
---

Use the Asset Catalog WebUI to manage the full lifecycle of your assets—from creation and configuration to activation, updates, deprecation, and archival.

## Before you start

* You must have a Catalog Manager or Developer role. For information, see [Managing users](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).
* Ensure the API services you want to link already exist and are discoverable

---

## Objectives

Learn how to use the Asset Catalog WebUI to create and manage assets, including:

* Create an asset
* Activate the asset to make it available to the Product Foundry
* Edit the asset with or without creating a new release
* Archive and delete an asset

---

## Create an asset

Creating an asset is the first step in making APIs or other resources available for use in products.
An asset starts in a Draft state, where you can safely configure and review it before making it available for consumption.
This section walks you through the asset creation flow in a clear, logical sequence, from defining the asset to activating it.

When creating an asset, you will complete the following phases:

1. Define the asset profile
2. Link API resources
3. (Optional) Configure API exposure
4. Configure release management
5. Configure access and sharing
6. Classify the asset (categories, tags, attributes)
7. Review and save (Draft or Active)

{{< alert title="Important" color="primary" >}} An asset must be **Active** before it can be used in a product definition. Assets created as Draft must be activated later. See [Activate an asset](#activate-an-asset). {{< /alert >}}

### Step 1: Start creating the asset

* Navigate to *Catalog > Asset Catalog*
* Select **All Assets**
* Click **+ Add Asset**

{{< alert title="Note" color="primary" >}}
The + Add Asset button is disabled when

* The combined number of Active and Deprecated assets exceeds the entitlement quota
* If no entitlement is defined, no quota is enforced.

{{< /alert >}}

### Step 2: Define the asset profile

The asset profile describes **what this asset is** and how users will see it in the WebUI. Clear names and descriptions help consumers quickly understand what your asset provides.

Provide the following information, then click **Next**:

* **Asset Name**: Display name shown throughout the UI and Marketplace
* **Logical Name**: A unique, system‑level identifier for the asset
  > This cannot be changed later
* **Description**: A short summary describing the purpose of the asset
* **Image**:An optional icon or image associated with the asset

### Step 3: Link API resources

In this step, you associate existing API services with the asset. This is the most important step, as it determines how APIs are grouped and exposed together based on their intended use cases or capabilities.

In the **Group Resources** section:

* Find available resources (API, MCP)
* Click the **Link icon** to add a resource to the asset
* Select endpoints to expose. Each endpoint shows:
    * API service version
    * URL(s)
    * Stage
    * State

{{< alert title="Note" color="primary" >}} API resources that are *Out of Sync* are not listed. {{< /alert >}}

{{< alert title="Important" color="primary" >}} Removing an API service from the data plane does not automatically remove it from the platform.
The provider must explicitly delete the API service and clean up the associated references in the linked asset {{< /alert >}}

### Step 4 (Optional): Configure API exposure

Some API services support partial exposure, allowing you to expose only selected portions of an API.
Partial exposure is supported for:

* Unstructured APIs
* OAS2 services
* OAS3 services

By default, all linked services use **Full exposure**, meaning the asset includes the complete API specification from the linked API service.

#### How it works

* Select **Edit Specification** for a service
* Upload a file containing the partial API specification
* The Exposure column updates from **Full** to **Partial**

{{< alert title="Important" color="primary" >}} Changes here affect only how the API is exposed within the asset.
The source API service is not modified. {{< /alert >}}

#### Impact on release management

If any linked API uses partial exposure:

* **Auto‑Release is automatically disabled**
* Manual activation is required for publishing updates

### Step 5: Configure release management

Release management controls how and when new versions of the asset are published.

Provide the following and click **Next**:

#### Auto‑Release

* **Enabled**
  New versions are automatically released when:

    * A grouped API service changes
    * A new API revision is detected

* **Disabled**
  You manually control when new versions are released.

> Tip </br>
Enable auto‑release for highly automated pipelines. Disable it if you need tighter release control.

#### Auto‑Release Type

If auto‑release is enabled, select the default version increment:

* Patch (default)
* Minor
* Major

#### Application reigstration requests handling

Choose how application registration requests to the APIs in this asset are handled:

* **Automatic** – Access is granted immediately
* **Manual** – Access must be approved

### Step 6: Configure access and sharing

Define who owns the asset and who can access it.

* Select the Owning Team
* Optionally share the asset with other teams
* For each shared team, select *Read* or *Edit* access rights: 

{{< alert title="Important" color="primary" >}} By default, assets are private to the owning team and Engage Admins. {{< /alert >}}

### Step 7: Classify the asset

Add metadata to help users discover and organize the asset:

* Categories – Group assets logically
* Tags – Searchable labels
* Attributes – Custom key/value metadata

Click **Next** when finished.

### Step 8: Review and save the asset

Click **Preview Asset** to review everything before creation.

Choose how to save: 

* **Save**
  Creates the asset in Draft state
* **Save & Activate**
  Creates and immediately releases the asset as Active, making it consumable.

> Reminder </br>
Assets created as Draft must be activated before they can be used in a product definition.

---

## Activate an asset

Activating an asset publishes a version of the asset and makes it available for use in a product definition. Until an asset is activated, it remains in a **Draft** or **Deprecated** state and cannot be consumed by products.
Activation is also the point at which versioning and release semantics are applied, ensuring providers understand the impact of changes.

### When activation is required

You must activate an asset when:

* The asset was created in a **Draft** state
* Changes requiring a new asset version have been saved as Draft
* The asset is **Deprecated** and needs to be reintroduced for use

Activation always results in a released asset version (Major, Minor, or Patch).

### Asset states eligible for activation
An asset can be activated when it is in one of the following states:

* Draft
* Deprecated

### Activate an asset version

* Navigate to *Catalog > Asset Catalog*
* Select **All Assets**
* From the list, select the asset you want to activate
* Select the asset version
* Click **Activate**
* Choose a release type
    * **Patch**: Backward‑compatible changes, such as documentation updates or minor refinements
    * **Minor**: Backward‑compatible feature additions or extensions
    * **Major**:Breaking or significant changes that may impact consumers
* Click **Update** to complete activation

Once activated, the asset version enters the **Active** state and becomes available for consumption in product definitions.

### Activation and auto‑release behavior

* If **Auto‑Release** is enabled, new asset versions may be released automatically based on changes to linked API services.
* If **Auto‑Release** is disabled, activation is always manual.
* If an asset uses **Partial exposure**, auto‑release is disabled and manual activation is required.

---

## Edit an asset

Editing an asset allows you to update its details, configuration, or linked API services.
Depending on what you edit, changes may take effect immediately or require creating and releasing a new asset version.
Understanding this distinction helps you avoid unintended releases and maintain control over what consumers see.

An asset can be edited when it is in one of the following states:

* **Draft**
* **Active**
* **Deprecated**

All edits are based on the latest draft or latest released version of the asset.

### Editing without creating a new version

Some changes do not impact how the asset is consumed by products and therefore do not require a new version or activation.
To make these changes:

* Navigate to *Catalog > Asset Catalog*
* Select **All Assets**
* Open the asset you want to edit
* Click **Edit** (pencil icon) in the top‑right corner

You can update the following fields without creating a draft or releasing a new version:

* Asset profile
* Release Management settings
* Application registration approvals
* Access Rights
* Categories, Tags or Attributes

These changes take effect immediately and apply to:

* The asset
* Any products that reference the asset

> Use this edit path when</br>
You are making metadata, access, or visibility updates that do not change the underlying APIs.
>

### Editing that requires a new asset version

Changes that modify which APIs are grouped, how they are exposed, or what consumers receive require a new asset version.
Examples include:

* Adding or removing API services
* Changing linked endpoints
* Updating partial vs full API exposure

Depending on the asset state, select:

* Edit Draft – if a draft already exists
* Create New Version – if editing from an active version

This opens the guided edit flow, starting with **Group Resources**.
After making changes, choose one of the following options:

#### Save as Draft

* Saves changes to a draft version
* Does not make changes visible to consumers
* Used when:

    * You want to review changes later
    * Auto‑Release is disabled and you plan to activate manually
    * Auto‑Release is enabled and you are updating the latest draft

#### Save & Activate

* Saves changes and immediately releases a new asset version
* Makes the updated asset available for consumption
* This option is available only when Auto‑Release is disabled.

### Choosing the right edit path

* **Metadata or access changes?**
  → Edit directly, no new version required

* **API grouping or exposure changes?**
  → Create a draft or new version

* **Ready to publish changes?**
  → Activate the asset version (manual or automatic)

---

## Deprecate an asset

The asset must be in **Active** state. Each version of the asset must be deprecated individually. Once all versions are deprecated, the entire asset is marked as deprecated.

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. From the list view, select the active asset to deprecate.
4. Select the version you want to deprecate and click **Deprecate**.
5. Repeat for each active version.
6. When no active versions remain, the asset automatically moves to **Deprecated** state.

----

## Archive an asset

The asset must be in **Deprecated** state.

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. From the list view, select the Deprecated asset to archive.
4. Click **Archive**.
5. Type *ARCHIVE* in the confirmation box.
6. Confirm action.

---

## Delete an asset

There are two ways to delete an asset, depending on your role.

* **Engage Admins** can delete assets that are in active state, which skips the need to manually deprecate and archive the assest. The system provides a guided workflow that automatically cleans up all related dependencies so you don’t need to manually track or remove them.
* **Catalog Managers** must manually deprecate, archive, and delete the asset.

### Delete an asset (for Engage Admins)

1. Navigate to *Catalog > Asset Catalog*.
2. Select **All Assets**.
3. From the list view, click the ellipsis menu of the asset to be deleted.
4. Click **Delete**.
5. Confirm your intent.
6. Review the [Dependency Summary](#what-happens-during-automatic-asset-cleanup):

    * **Plans using this asset** - Lists plans with resources from this asset.
    * **Active subscriptions** - Lists subscriptions that are still active and tied to those plans.
    * **Linked products** - Lists products (draft or released) that include this asset.
    * *If no dependencies exist, this step is skipped*.

7. Choose an action for linked products:

    * **Release a new product version** - Creates a new version of the product without the asset.
    * **Create a draft product** -  Moves the product to draft without the asset so you can edit it before releasing.

8. Review the summary of planned actions.
9. Type *DELETE* in the confirmation box and click **Delete Asset**.

    * A modal will show deletion progress.
    * Once complete, you will return to the asset list with a confirmation message.

{{< alert title="Note" color="primary" >}}Cancelling subscriptions may take longer than expected in some cases. Please leave the tab open.{{< /alert >}}

#### What happens during automatic Asset cleanup

When you delete an asset, Amplify Engage scans for all dependencies and provides a summary before you confirm the action.

* **Plans**

    * Plans using the asset’s resources are checked.
    * If removing the asset leaves the plan with no resources:
        * Quotas that become empty are automatically removed.
        * The plan is automatically archived.
        * All subscriptions to that plan are cancelled as well.
    * If the plan still contains other assets:
        * The plan remains active, minus the deleted asset.

* **Products**

    * You can choose how the product should be updated:
        * **Release a new product version** – The system creates a new version of the product without the asset.
        * **Create a draft product** – The system moves the product to draft without the asset so you can edit it before releasing.

* **Subscriptions**

    * Subscriptions linked to archived plans are cancelled automatically.
    * Subscriptions linked to active plans remain intact.

### Delete an asset (for Catalog Managers)

1. Manually deprecate and archive the asset and each release.
2. Once archived, delete the asset directly from the Asset Catalog.

{{< alert title="Note" color="primary" >}}Assets that are part of an active product definition cannot be deleted.{{< /alert >}}
