---
title: Tags, Attributes and Categories
linkTitle: Product Tags, Attributes and Categories
weight: 40
---

Edit the details of your products using tags, attributes, and categories. This can make the curation and organization of products more valuable.

Tags, attributes, and categories are set at the product level, meaning all releases of the product will always look similar. The tags, attributes and categories can be updated any time and do not require a new release of the product.

## Add or remove tags

Tags are keywords that can be assigned to catalog products and used to search for products. You can create tags with special characters. For example, `_ - & () \ []` and all types of special language characters.

1. Select a product in the *Product Foundry* and open it
2. click on the Tags field in the detail side panel and enter the new tag. To remove a tag, click the **X** next to the tag name.

## Add or remove attributes

Attributes are keyword and value pairs that can be assigned to products and used to search for products. You can create attributes using both lowercase and uppercase. Examples of useful attributes are `state = France` and `city = Paris`.

1. Select a product in the *Product Foundry* and open it.
2. click on the Attributes field in the details side panel and enter the new attribute and value. To remove an attribute, click the **X** next to the attribute key=value.

## Manage categories

Searching through an unordered, unorganized list of products can be a daunting task. However, **Engage Admin** or **Catalog Manager** users can create categories to group products in the Product Foundry to make searching for products more effective and more organized. Examples of categories are `Finance` and `Medicine`.

Categories allow for a broader grouping of products into different topics or themes. Categories are created once, and multiple products can be assigned to them. One product can be in multiple categories.

The category types are:

* **Global**: Either legacy categories that were created using the deprecated Unified Catalog category management system, or categories added while creating products. They can be used with either asset or products.
* **Product specific**: Categories that can only be assigned to a product.

The product specific categories have two types of visibility:

* Private: Visible in the Product Foundry only.
* Public: Visible in both the Product Foundry and the Marketplace.

Additionally, the product category can be organized into a hierarchy (up to three levels), where a parent can be set to a category. Once a category is assigned to a parent, its visibility or ownership can no longer be changed; it will follow the definition of its parent. The Category listing shows the Parent of each category (if it exists), as well as the number of its children.

A public category can be set to **Featured** by providers to highlight and advertise the category and the associated products on the Marketplace home page. In this case, a category image is required and provides greater visibility. The maximum number of featured categories is **five**.

A public category can be Visible / Featured in one or multiple Marketplaces depending on the necessary Marketplace advertisement level.

When creating a category, select the team that owns the category. Select the team(s) the category can be shared with, you can choose either Edit or Read access "Rights". Each member of the shared team(s) selected will be able to access your category with the chosen "Rights". This allows you to share/enable access to a specific asset without granting access to all the assets owned by your current team.

### Viewing categories

1. Log into the platform.
2. Navigate to *Catalog > Product Foundry > Categories*. This page displays all global categories assigned only to products and product categories with the following information:

    * The category name
    * The parent category (if it exists)
    * The subcategories (i.e., the number of children of the category)
    * The number of products the category is assigned to
    * The category visibility (Product Foundry or Marketplace)
    * The number of times the category is featured in Marketplaces
    * The category description
    * The ellipsis menu for additional actions: Edit / Delete

* Click the category name or the category parent name to open the category details where you can [edit the category](#editing-a-category) or [convert to a featured category](#setting-a-product-category-as-featured-in-a-marketplace).
* The global category name is not clickable. Use the ellipsis menu to edit a global category and transform it into a product category.
* Click on the subcategory number to open the details of the children.

### Creating a global category

Only users that are assigned the **Engage Admin** role can create global categories when creating or editing a product. Categories are created at the Organization level and available to all teams to apply them to their products.

### Creating a product specific category

Only users that are assigned the **Engage Admin** role can create product categories. Categories are created at the Organization level and available to all teams to apply them to their products.

If the product is already published to a Marketplace, the change of category will be reflected immediately in the Marketplace.

1. Log into the platform.
2. Navigate to *Catalog > Product Foundry > Categories*. This page displays all global categories assigned only to products and product categories.
3. Click **+ Add Category** to start the category creation wizard:

    * Category Profile page: Enter the category definition (Name, Parent, Description, and an optional image). The category logical name will be computed based on the category name.
    * When associating a parent, the Access rights and Marketplace association are disabled because the children category automatically follows its parent rights and visibility.
    * Product Association page: Assign/unassign product to this category.
    * Access rights: Assign/unassign who manages/views the category.
    * Marketplace association page: Assign/unassign all Marketplaces, or specific Marketplaces, where this category will be visible and/or featured.

4. Save the category.

### Editing a category

Only users that are assigned the **Engage Admin** role can edit product categories.

#### Update a product category from the WebUI

Only product categories, not global categories, can be edited from the WebUI.

1. Log into the platform.
2. Navigate to *Catalog > Product Foundry > Categories*. This page displays all global categories assigned only to products and product categories.
3. Open the ellipsis menu on a category and select **Edit**. The category wizard opens in edit mode to enable changes to all information except the Category logical name.
4. Save the changes.

### Setting a product category as Featured in a Marketplace

Only users that are assigned the **Engage Admin** role can edit product categories.

1. Log into the platform.
2. Navigate to *Catalog > Product Foundry > Categories*. This page displays all global categories assigned only to products and product categories.
3. Click the star icon to open the category details screen and automatically expand the Marketplace visibility section where the Marketplace list is displayed and whether the category is featured in each Marketplace.
4. Click the star icon to feature the category in the corresponding Marketplace. If the maximum number (five) of featured categories is reached, you will be prompted to either discard the change or replace an existing featured category with the current one.
5. Save the changes.

#### Update any category using Axway Central CLI

Both product and global categories can be edited using Axway Central CLI.

If a global category was only assigned to a product, it can be converted to a product category by updating the category's spec definition:

```yaml
spec:
  ...
  restriction:
    type: product
# The following definition is deprecated and is replaced with the CategoryVisibility object below 
    marketplace:
      visible: true|false
      featured: true|false
```

Adding visibility/feature for a specific Marketplace with the following object:

```yaml
# this object helps to make the category visible and/or featured for specific marketplace.
# If you need the same category to be visible/featured in multiple marketplaces, you need to create as many objects as there are marketplaces where the category is exposed.
group: catalog
apiVersion: v1alpha1
kind: CategoryVisibility
name: {a-unique-name}
title: category X visible in Marketplace Y
metadata:
  scope:
      kind: Marketplace
# MARKETPLACE_ID can be found in the Marketplace settings: pick the ID displayed in the marketplace settings url.
      name: {MARKETPLACE_ID}
attributes: {}
finalizers: []
tags: []
spec:
# refer to the Category list column - Logical Name
  category: {CATEGORY_LOGICAL_NAME}
# featured: true => the category is featured for this marketplace and visible in marketplace home page
# featured: false => the category is not featured for this marketplace but is used to filter products
  featured: true|false
```

### Deleting a category

Only users that are assigned the **Engage Admin** role can delete product categories.

To delete a category:

1. Log into the platform.
2. Navigate to *Catalog > Product Foundry > Categories*. This page displays all global categories assigned only to products and product categories.
3. Open the ellipsis menu on a category and select **Delete**. A confirmation message is displayed. Once confirmed, the category is deleted from the system.

### Assigning a category while creating/editing a product

Only users that are assigned the **Engage Admin** role can create categories while editing/creating a product.
Catalog Manager users can only assign existing categories.

1. Select a product in the *Product Foundry* and open it.
2. Click on the Categories field in the details panel and select the category from the list. The list contains global categories and product specific categories.
3. Click the **X** next to the category name to remove a category.

### Multi-languages support

If you use Category to be seen on the Marketplace, it is possible to add their translation so that they can be viewed differently based on the Marketplace language settings.

By default four languages are available : English / French / German / Brazilian Portuguese

You will need 2 things:

* The category default language
* The category translation languages

The language can be accessed using either the List view ellipsis menu **Translate** or the Category edition wizard. This will open the *translation details* screen where you can set the Default Language as well as the other needed languages.
