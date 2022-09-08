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

There are different types of category:

* **global**: these are legacy category that have been created using the Unified Catalog category management system or when creating category when creating a product. They can be used either with Asset or Product
* **product specific**:  these category can only be assigned to a product.

The product specific category has two types of visibility:

* private: the category is used for filtering the product foundry catalog only
* public: the category is used to filter the product foundry catalog as well as the marketplace product.

A public category can be set as **Featured** category to enable the provider to highlight and advertise this category and the associated products from the marketplace home page. In that case, the category image is also required for better visibility. The maximum number of Featured category is set to five.

### Creating global category

Only users that are assigned the **Central Admin** role can create global categories when creating or editing a product. Categories are created at the Organization level and available to all teams to apply them to their products.

### Creating product specific category

Only users that are assigned the **Central Admin** role can create product categories. Categories are created at the Organization level and available to all teams to apply them to their products.

If the product is already published to a marketplace, the change of category will be reflected almost immediately in the marketplace.

To create a category:

1. Log into the platform
2. Naviagte to the **Catalog > Product Foundry > Categories**
3. This page displays all global categories assigned only to product and the product categories
4. The **+ Add New Category** button start the category creation wizard:
   1. Category Profile page: enter the category definition (Name, Visibility, Description, and optionally an image). The category logical name is optional and will be computed based on the category name.
   2. Product Association page: assign/unassign product to this category
5. Save the category

### Editing a category

Only users that are assigned the **Central Admin** role can edit a product categories.

Only product category can be edited from the webUI.

Using the Axway central CLI, it is possible to edit any category. A global category can be converted to a product category if it was only assigned to product. For that the following should be added to the spec definition of the category. Then the category will become a product category.

```yaml
spec:
  ...
  restriction:
    type: product
    marketplace:
      visible: true|false
      featured: true|false
```

To update a category:

1. Log into the platform
2. Naviagte to the **Catalog > Product Foundry > Categories**
3. This page displays all global categories assigned only to product and the product categories
4. Open the elipsis menu on a category and select Edit. This will open the category wizard in Edit mode and enable to change any information except the Category logical name.
5. Save the change

### Deleting a category

Only users that are assigned the **Central Admin** role can delete a product categories.

To delete a category:

1. Log into the platform
2. Naviagte to the **Catalog > Product Foundry > Categories**
3. This page displays all global categories assigned only to product and the product categories
4. Open the elipsis menu on a category and select Delete. This will open a confirmation popup and once the confirmation is done, the category will be deleted from the system.

### Convert a product category into a Featured category

Only users that are assigned the **Central Admin** role can edit a product categories.

To convert a category into a Featured category:

1. Log into the platform
2. Naviagte to the **Catalog > Product Foundry > Categories**
3. This page displays all global categories assigned only to product and the product categories
4. Clicking the Category name will open the category preview side blade where user is allowed to change the category visibility as well as the Fetured category toggle. If five Featured category are already present in the system, a warning message will prevent the user to add a new one.
5. Save the change

### Assigning category while creating/editing product

Only users that are assigned the **Central Admin** role can create categories while editing/creating a product.
Catalog manager users can only assigned existing category.

1. Select a product in the *Product Foundry* and open it.
2. click on the Categories field in the details side panel and select the category from the list. The list contains the global categories and the product specific category. To remove a Category, click the **X** next to the Category name.
