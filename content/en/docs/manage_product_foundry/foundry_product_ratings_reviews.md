---
title: Manage product ratings
linkTitle: Manage product ratings
weight: 60
---

View and filter the product ratings.

## Before you start

* You must have a user account with Catalog Manager rights to view the product.
* **Ratings & Reviews** must be enable for the Marketplace. Refer to [Marketpalce settings](/docs/manage_marketplace/customize_marketplace/marketplace_ratings_reviews)

## Objectives

Learn how to view customer ratings, and approve / decline reviews for the product you own.

## What is product ratings and reviews

A rating is a ranking from 1 to 5 showing the product assessment (1 being a low degree of excellence and 5 being a high degree of excellence).

A review is an product evaluation that is directed at the provider and other consumers. The review is free text submitted to the provider of the product for approval.

## Review status

Possible review statuses:

| Status        | Description                                                                |
|---------------|----------------------------------------------------------------------------|
| **Approved**  | The product review is visible to anyone who has access to the Marketplace. |
| **Pending**   | The product review is pending provider approval. Users, other than the review owner, cannot see the review in that state. |
| **Declined**  | The product review does not comply with the provider guidance. Users, other than the review owner, cannot see the review. |

Status transitions:

| Initial status | Possible next status |
|----------------|----------------------|
| Pending        | Approved or Declined |
| Approved       | Declined or Pending  |
| Declined       | Approved or Pending  |

A review can be edited by the review owner regardless of the review state. Once edited and saved, the review status changes to **Pending** or **Approved**, depending on the moderation process. Refer to [Moderation process settings](/docs/manage_marketplace/customize_marketplace#enable-the-marketplace-ratings-and-reviews)

The review state does not impact the average ratings computation.

## View the Ratings and Reviews

1. Navigate to *Product Foundry > Product*.
2. Open the product details.
3. Select **Ratings & Reviews**. The page displays:
   * The Filter by section:
       * Rating - filter per rating
       * Status - filter per review status
       * Marketplaces - filter per Marketplace name where the product is published
   * The Average Rating and the number of Total Ratings
   * The review list (paginated table) displaying:
       * review title - title given by the reviewer
       * Status - Pending, Declined, Approved
       * Rating - the number of stars given by the reviewer
       * Reviewer Email - the name and email address (obscured by default) of the reviewer
       * Marketplace - name of the Marketplace where the review was submitted.

When filtering per Rating and/or per Status and/or per Marketplaces, the **Average Rating**, the number of **Total Ratings** and the **review list** are updated accordingly.

## View the Ratings and Review details

Any user having read access to a product can view the product reviews.

1. Navigate to *Product Foundry > Product*.
2. Open the product details.
3. Select **Ratings & Reviews**.
4. Click the review title or select **View** from from ellipsis menu to open the review details.

## Approve or Decline a review

Only the Catalog Manager owning the product can Approve / Decline a review.

1. Navigate to *Product Foundry > Product*.
2. Open the product details.
3. Select **Ratings & Reviews**.
4. Click the review title or select **View** from the ellipsis menu to open the review details.
5. Click either **Approve** or **Decline**.

## Delete a review

Only a Central Administrator user can delete reviews.

1. Navigate to *Product Foundry > Product*.
2. Open the product details.
3. Select **Ratings & Reviews**.
4. Select **Delete** from the ellipsis menu corresponding to the review. *A confirmation is displayed*.
5. Enter DELETE in the confirmation field and click **Delete** to validate your choice, or Cancel to abort the review deletion.
6. Once the confirmation is closed, the review is deleted and the review list is updated.
