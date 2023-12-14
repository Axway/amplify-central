---
title: Searching and filtering content in Marketplace
linkTitle: Searching and filtering content in Marketplace
weight: 5
---

Learn how you can find content in the Marketplace.

## What is indexed and available for searching

There are 4 types of objects you can search for in the Marketplace using their specific attributes:

* **Category**: title, description
* **Product**: title, description, documentation (markdown only), category title assigned to the product, product resource specification
* **Application**: title
* **Subscription**: product title, product description

## Where to search from

The search is based on a match pattern. This mean the result will have the portion of entered text anywhere in the fields mentioned in previous section.

Each main page (Product / Applications / Subscriptions / Categories / Home page) have a search bar to refine the page content. The search result refine itself as you enter characters in the search bar. The search text can be reset using the X on the search bar. The search bar indicates the number of found result: "Found **X** result for ***WhatYouEnterInTheSearchField***".

## Filtering a result

Additionally to the search bar, filters are available on various page to refine the result.

Filter can be found on the left side of main pages (Products / Applications / Subscriptions) as well as on some detailed pages (Product resources / Category details) Each filter is a collapsible panel using the chevron icon.

They are of various shape:

* radio button: single filter criteria
* checkbox: multi filter criteria
* checkbox and search: multi filter criteria and search capability to find the correct filter name.

{{< alert title="Note" color="primary" >}}
When the screen is too small to display the filter and the page content at the same time, the filter becomes an icon on the left side of the search bar.
Clicking this icon will expand the filter over the page content. Clicking again the filter will hide it.
{{< /alert >}}

The filter allows to search value in the list to reduce the number of item and once selected, the page content will be displayed according to the filter restriction.

### Home page search

This is available when the home page is activated from the Marketplace settings.

* Search bar from Hero Content (if activated): any words matching a product title / description / specification content / Documentation (markdown only) or a category title assigned to a product.
* browse product: filter the recently publish list of product based on product title / description or a category title assigned to a product.
  
### Product search

By default, the product search bar will use what the user enter to find that word in product title / description / specification content / Documentation(markdown only) or a category title assigned to a product.

#### Advanced search

When viewing the product list, it is possible to refine your search with an Advanced search.

Click the Advanced search menu to replace the search bar by the Advanced search component. The component allows you to enter multiple words and then select the appropriate matching parameter via a dropdown: **EQUALS**, **NOT EQUALS**. When entering multiple words, you can decide the operator between those words: **OR** or **AND**. The dropdown on the matching parameter and on the operator allows to adjust your criteria. You can remove a criteria by clicking the - icon. You can completely reset the component using the **Clear all** button.

Once you are satisfied with your criteria, click **Search**. The corresponding matching product are displayed.

You can return anytime to the search bar using the **Basic search** button.

#### Refine your findings with filters

2 filters are available:

* Category filter: allow to select products that matches one or more categories. In case category contains children category, the chevron on the right side of the category allows to view the children.
* Stages filter: allow to view product having specific resources matching a specific stage. The visible stages are the one that have been deployed to the marketplace and where the teams the user belongs to has visibility.

#### Product resources filter

When the provider assign multiple assets to a single product, he has the possibility when publishing that product to a Marketplace to group the resources per asset. In this situation, the product resources search bar is enriched with the filter component on the search bar itself. It allows the consumer to filter the Resource Group.

### Categories search

When listing the categories, the search bar helps to refine the category finding using the category title or description.

When browsing a specific category, it displays the associated product. In that case, the search bar helps to refine the product using the product title or description.

#### Refine your findings with children category filters

Filter can be found on the left side of the category detail pages. It allows to filter using the children category of the current displayed category.

The **Show sub-category products** allows to see all product linked to a children category of the current category. It is selected by default. When unselecting it, all the product associated to a children category are removed from the result list and the product listed are the only one associated to the displayed category.

The search bar allows to refine the children category list. When the filter matches several category, the filter is highlighted in bold on the category names.

In case a children category has children too, a chevron is displayed to the right of the category and enable to view the children of the category.

As soon as one or more categories are selected, it automatically adjust the product list with the product matching the selected categories.

### Applications search

The application search bar allows to find application using the application title.

#### Refine your findings with application state filter

Filter can be found on the left side of the application page. It allows to filter using one or more application state. Once a state is selected, the application list is automatically refreshed to match the selected state.

### Subscriptions search

Since the subscription is depending on the product that have been subscribed to, the search is limited to the product title and description. When you search the system will find all subscriptions for product having a title or description matching the entered value.

#### Refine your findings with Category filters

Allow to select products that matches one or more categories. In case category contains children category, the chevron on the right side of the category allows to view the children.

### Consumer Insights filters

In the various Consumer Insights screen, only filters are used. They appeared at the top of each page in the form of a dropdown.

All the dropdown acts in the same way:

* Default **All kind** option to select all
* 10 first items loaded + infinite loading (ie. it loads 10 more items when reaching the end of the list)
* a search capability to refine the list

Filter definition:

* Product: show all product my team(s) has access to
* Subscriptions: show all subscriptions assigned to a product my team(s) has access to
* Applications: show all applications having a subscriptions assigned to a product my team(s) has access to
* Methods: list the known methods (GET, POST etc.)
* Status code: All successes , All failures, All exceptions, all specific http codes.

More information about the Consumer Insights screens can be found [here](/docs/get_actionable_insights/consumer_insights).