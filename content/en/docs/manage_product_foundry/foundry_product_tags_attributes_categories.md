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

Searching through an unordered, unorganized list of products can be a daunting task. However, Central Admin users can create categories to group products in the Product Foundry to make searching for products more effective and more organized. Examples of categories are `Finance` and `Medicine`.

Categories allow for a broader grouping of products into different topics or themes. Categories are created once, and multiple products can be assigned to them. One product can be in multiple categories.

The category types are:

* **Global**: These are either legacy categories that were created using the Unified Catalog category management system, or are categories created while creating products. They can be used with either Asset or Products.
* **Product specific**:  These categories can only be assigned to a product.

The product specific categories have two types of visibility:

* Private: This category is used for filtering the Product Foundry catalog only.
* Public: This category is used to filter the Product Foundry catalog, as well as the Marketplace product.

A public category can be set as a **Featured** by providers to highlight and advertise this category and the associated products on the Marketplace home page. In this case, a category image is required and provides greater visibility. The maximum number of Featured categories is set to five.

### Creating a global category

Only users that are assigned the **Central Admin** role can create global categories when creating or editing a product. Categories are created at the Organization level and available to all teams to apply them to their products.

### Creating a product specific category

Only users that are assigned the **Central Admin** role can create product categories. Categories are created at the Organization level and available to all teams to apply them to their products.

If the product is already published to a Marketplace, the change of category will be reflected immediately in the Marketplace.

To create a category:

1. Log into the platform.
2. Naviate to **Catalog > Product Foundry > Categories**. This page displays all global categories assigned only to products and product categories
3. Click **+ Add New Category** to start the category creation wizard:

    * Category Profile page: Enter the category definition (Name, Visibility, Description, and an optional image). The category logical name is optional and will be computed based on the category name.
    * Product Association page: Assign/unassign product to this category.
    
4. Save the category.

### Editing a category

Only users that are assigned the **Central Admin** role can edit product categories.

#### Update a product category from the WebUI

Only product categories, not global categories, can be edited from the WebUI.

1. Log into the platform.
2. Navigate to **Catalog > Product Foundry > Categories**. This page displays all global categories assigned only to products and product categories.
4. Open the elipsis menu on a category and select **Edit**. The category wizard opens in Edit mode to enable changes to all information except the Category logical name.
5. Save the changes.

#### Update any category using Axway Central CLI 

Both product and global categories can be edited using Axway Central CLI. 

If a global category was only assigned to a product, it can be converted to a product category by updating the category's spec definition:

```yaml
spec:
  ...
  restriction:
    type: product
    marketplace:
      visible: true|false
      featured: true|false
```

### Deleting a category

Only users that are assigned the **Central Admin** role can delete product categories.

To delete a category:

1. Log into the platform.
2. Navigate to **Catalog > Product Foundry > Categories**. This page displays all global categories assigned only to products and product categories.
4. Open the elipsis menu on a category and select **Delete**. A confirmation message is displayed. Once confirmed, the category is deleted from the system.

### Convert a product category into a Featured category

Only users that are assigned the **Central Admin** role can edit product categories.

To convert a category into a Featured category:

1. Log into the platform.
2. Navigate to **Catalog > Product Foundry > Categories**. This page displays all global categories assigned only to products and product categories.
4. Click the category name to open the category preview pane. Change the category visibility as well as the Featured category toggle. If five Featured categories are already present in the system, a warning message is displayed and a new one cannot be added.
5. Save the change.

### Assigning a category while creating/editing a product

Only users that are assigned the **Central Admin** role can create categories while editing/creating a product.
Catalog manager users can only assign existing categories.

1. Select a product in the *Product Foundry* and open it.
2. Click on the Categories field in the details pane and select the category from the list. The list contains global categories and product specific categories. 
3. Click the **X** next to the category name to remove a category.
