---
title: Search and filter Marketplace content
linkTitle: Search and filter Marketplace content
weight: 5
---

Learn how you can find content in the Marketplace.

## What is indexed and available for searching

Search the Marketplace for four types of objects by using their attributes:

* **Category**: title, description
* **Product**: title, description, documentation (markdown only), category title assigned to the product, product resource specification
* **Application**: title
* **Subscription**: product title, product description

## Where to search from

The search is based on a match pattern. This mean that the results will have the portion of entered text anywhere in the fields mentioned in previous section.

Each main page (Product / Applications / Subscriptions / Categories / Home page) has a search bar to refine the page content. The search is refined as characters are entered in the search bar. The search bar indicates the number of found result: "Found **X** result for ***WhatYouEnterInTheSearchField***". Click **X** on the search bar to reset the search.

## Filter a result

In addition to the search bar, filters that refine results are available on various pages.

Filters are located on the left of main pages (Products / Applications / Subscriptions), as well as on some detail pages (Product resources / Category details). Each filter is a collapsible panel.

Filter input controls:

* Radio button: single filter criteria
* Checkbox: multiple filter criteria
* Checkbox and search: multiple filter criteria and search capability to find the correct filter name

{{< alert title="Note" color="primary" >}}
When the screen is too small to display the filter and the page content at the same time, the filter displays as an icon on the left of the search bar.
Click the icon to expand the filter over the page content. Click it again to hide the filter.
{{< /alert >}}

The filter allows search values to reduce the number of items. Once selected, the page content is displayed according to the filter restriction.

### Home page search

Search is available when the home page is activated from the Marketplace settings.

* Search bar from Hero Content (if activated): search with any words matching a product title / description / specification content / Documentation (markdown only) / category title assigned to a product.
* Browse product: filter the recently published list of products based on product title / description / title assigned to a product.
  
### Product search

By default, the product search bar uses what is entered to find a match in product title / description / specification content / Documentation (markdown only) / category title assigned to a product.

#### Advanced search

When viewing the product list, refine your search with an Advanced search.

1. Click the Advanced search menu to replace the search bar with the Advanced search component.

    * Enter multiple words and then select the appropriate matching parameter via a dropdown: **EQUALS**, **NOT EQUALS**.
    * When entering multiple words, you can decide the operator between those words: **OR** or **AND**. The drop-down on the matching parameter and on the operator allows you to adjust your criteria.
    * Click the **-** to remove the criteria. Click **Clear all** To reset the component.

2. Once you are satisfied with your criteria, click **Search**. The corresponding matching products are displayed.

Click **Basic search** to return to the search bar at any time.

#### Refine your findings with filters

Two filters are available:

* Category filter: view products that match one or more categories. If a category contains children categories, expand the category to view the children.
* Stages filter: view products that have specific resources and match a specific stage. The visible stages have been deployed to the Marketplace and the user belongs to teams that have visibility.

#### Product resources filter

When the provider assigns multiple assets to a single product, the resources can be grouped per asset when publishing the product to a Marketplace. The product resources search bar is then enriched with the filter component, enabling the consumer to filter the Resource Group.

### Categories search

* When viewing the categories list, use the category title or description in the search bar to refine the category findings.
* When browsing a specific category, use the product title or description in the search bar to refine the associated product findings.

#### Refine your findings with children category filters

Use the filters located at the left of the category detail page to filter the children categories of the currently displayed category.

* **Show sub-category products**: (selected by default) view all products linked to a children category of the current category. When not selected, all products associated to a children category are removed from the result list and only the products associated to the displayed category are listed.
* search bar: refine the children category list. When the filter matches several categories, the filter is highlighted in bold on the category names.

If a children category has children, expand the category to view of the children.

Once categories are selected, products matching the selected categories are displayed.

### Applications search

Find an application by entering the application title in the search bar.

#### Refine your findings with application state filter

Use the filter located at the left of the application page to filter by application state. Once a state is selected, applications matching the selected state are displayed.

### Subscriptions search

Find a subscription by entering the product title and/or description.

#### Refine your findings with category filter

Use the filter located at the left of the subscription page to filter by category. If a category contains children, expand the category to view the children.

### Consumer Insights filters

 Uses the drop-down filters located at the top of each Consumer insights page.

Filter functionality:

* **All kind** (default) select all
* 10 first items loaded + infinite loading (i.e., it loads 10 more items when reaching the end of the list)
* Refine the list capability

Filter definition:

* Product: show all products my team(s) has access to
* Subscriptions: show all subscriptions assigned to a product my team(s) has access to
* Applications: show all applications that have a subscription assigned to a product my team(s) has access to
* Methods: list the known methods (GET, POST etc.)
* Status code: All successes , All failures, All exceptions, All specific http codes

See [Consumer insights](/docs/get_actionable_insights/consumer_insights) for more information.
