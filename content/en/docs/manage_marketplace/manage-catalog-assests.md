---
title: Manage catalog assets
linkTitle: Manage catalog assets
weight: 110
date: 2020-06-03
description: Learn how to edit the details of your catalog assets and how to
  share the assets with teams in your organization. You can also group catalog
  assets by assigning them to categories.
---
## Edit a catalog asset

You can edit the **Overview** documentation of your catalog asset, as well as its title and description. Follow these steps to edit the **Overview** of your catalog asset.

1. Select an asset in the **Unified Catalog.**
2. Click the ellipsis menu (**...**) and select **Edit** from the drop-down.
3. Make the desired changes and click **Save**.
4. To edit the documentation, click **Edit** on the **Overview** tab.

{{< alert title="Note" color="primary" >}}Unified Catalog uses the GitHub Markdown. Syntax highlighting is not currently supported.{{< /alert >}}

## Delete a catalog asset

Follow these steps to delete a catalog asset.

1. Select an asset in the **Unified Catalog.**
2. Click the ellipsis menu (**...**) and select **Delete** from the drop-down.

{{< alert title="Note" color="primary" >}}Only users that are assigned the **Central Admin** role can delete a catalog asset. A catalog asset that has subscriptions in **Active** or **Subscribing** state cannot be deleted until all dependencies have been removed.{{< /alert >}}

## Add or remove tags

Tags are keywords that you can assign to catalog assets and use them in the search for assets. You can create tags using both lowercase and uppercase. The search, however, converts everything to lowercase. For example, a search for `MyCatalog` returns both tags: `mycatalog` and `MyCatalog`. You can also use the `_ - () \ []` special characters to create your tags. Follow these steps to add or remove tags.

1. Select an asset in the **Unified Catalog.**
2. In the right-side details panel, click **+** sign by the Tags section. A dialog screen is displayed where you can enter your keywords.
3. Press `Enter` to add the new tags to the list of tags.
4. Click **Save**.

## Share a catalog asset

Unified Catalog allows you to control who can view and subscribe to catalog assets. You can make your asset public to all members in your organization or share it with specific teams. Follow these steps to share your catalog asset.

1. Select an asset in the **Unified Catalog**.
2. In the right-side details panel, click the **Share** icon and choose one of the following options:

   * **All members if this team** - Only members of the owning team can view and subscribe to the catalog asset.
   * **Specific teams** - Only members of the selected teams can view and subscribe to the catalog asset.
   * **All members of this organization** - All registered members in the organization can view and subscribe to the catalog asset.
3. Save changes.

![Share asset](/Images/catalog/share_asset.png)

{{< alert title="Note" color="primary" >}}Only users that are assigned the **Central Admin** role can share an asset with another team or organization.{{< /alert >}}

## Manage categories

Searching through an unordered list of catalog assets can become a dauting tasks and make assets not easily discoverable. Central Admin users can create categories to group assets in the Amplify Unified Catalog to make searching for assets more effective and improve discovery.

Categories allow for a broader grouping of catalog assets into different topics or themes. They are created once, and multiple catalog asset can be assigned to them. One catalog asset can be in multiple categories.

{{< alert title="Note" color="primary" >}}Only users that are assigned the **Central Admin** role can create, edit and delete categories. Categories are created at the Organization level and available to all teams to apply them to their assets.{{< /alert >}}

### Create a category

Follow these steps to create a catagory.

1. In the **Unified Catalog**, click on the cogwheel and select **Manage categories**. A screen is displayed where you can see the list of available categories.
2. Click  **+Category**.
3. When you add your first category, a **+Add new category** button is displayed when you click on the cogwheel.
4. Provide a category name. Each category name must be unique.
5. Provide a category description. This field is optional.
6. Save your changes.

![Create category](/Images/catalog/add_first_category.png "Create category")

### Assign a category

Follow these steps to assign a category.

1. Select an asset in the **Unified Catalog**.
2. In the right side details panel, click **+** sign by the Categories group. This will bring up a dialog screen with the list of available categories.
3. Choose the categories from the list. By default, the list will display the fist 10 categories in alphabetical order. To view the next 10 available categories, click **+ Show more**.

### Edit/Delete a category

Categories can be removed from an asset simply by removing the category from the asset details screen. Deleting a category will remove it from all assets that were assign to it. This will permanently delete the category from the system. Follow these steps to edit or delete a category.

1. In the Unified Catalog, click on the cogwheel and select **Manage categories.** This will bring up a screen where you can see the list of available categories.
2. Click the ellipsis menu and select **Edit** to change the category or **Delete** to remove it.

{{< alert title="Note" color="primary" >}}You can configure and manage categories from the WebUI or using the Amplify Unified Catalog APIs. Please refer to our [Postman Collection](https://documenter.getpostman.com/view/3636185/TVYGddhi), for an example of how to create and manage categories via our APIs.{{< /alert >}}

Watch the video below to see how to create and assign categories.

![Create and assign categories](/Images/catalog/add_category.gif "Create and assign categories")
