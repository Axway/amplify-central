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

Learn how to view the customer rating and reviews for the product you own, approve or decline a review.

## What is product ratings and reviews

A rating is a ranking from 1 to 5 showing the product assessment (1 being a low degree of excellence and 5 being a high degree of excellence).

A review is a comment to convey a message to the provider or other consumer. The review is a free text submitted to approval by the Provider of the product.

## Review status

The review can have one of the 3 possible statuses:

| Status        | Description                                                                |
|---------------|----------------------------------------------------------------------------|
| **Approved**  | The product review is visible to anyone who has access to the Marketplace. |
| **Pending**   | The product review is pending an approval fron provider. Consumer other than the review owner are not able to see the review in that state. |
| **Declined**  | The product review does not comply with the Provider review instruction. Consumer other than the review owner are not able to see the review. |

Status transitions:

| Initial status | Possible next status |
|----------------|----------------------|
| Pending        | Approved or Declined |
| Approved       | Declined or Pending  |
| Declined       | Approved or Pending  |

Review can be edited by the review owner regardless the review state. Once edited and saved the review status is changed back to **Pending** or **Approved** depending on the Moderation process. Refer to [Moderation process settings](/docs/manage_marketplace/customize_marketplace#enable-the-marketplace-ratings-and-reviews)

The review state does not impact the average ratings computation.

## View the Ratings and Reviews

1. Navigate to *Product Foundry > Product*.
2. Open the product details.
3. Select **Ratings & Reviews**. The page displays:
   * The filters section on the left side:
       * Rating - allow to filter per rating
       * Status - allow to filter per review status
       * Marketplace - allow to filter per Marketplace name where the prodiuct is published
   * The Average Rating and the number of Total Ratings
   * The review list paginated table displaying:
       * review title - title given by the reviewer
       * Status - one of the review status (Pending / Declined / Approved)
       * Rating - the number of star given by the reviewer
       * Reviewer - the name and email address (obscured by default) of the reviewer
       * Marketplace - name of the Marketplace where the review was submitted from.

When filtering per Rating and/or per Status and/or per Marketplace, the **Average Rating**, the number of **Total Ratings** and the **review list** are updated accordingly.

## View the Ratings and Review details

Any user having read access to a product can view the product reviews.

1. Navigate to *Product Foundry > Product*.
2. Open the product details.
3. Select **Ratings & Reviews**.
4. A click on the review title or **View** from ellipsis menu opens the review details.

## Approve or Decline a review

Only Catalog Manager owning the product is able to Approve / Decline a review.

1. Navigate to *Product Foundry > Product*.
2. Open the product details.
3. Select **Ratings & Reviews**.
4. A click on the review title or **View** from ellipsis menu opens the review details.
5. From that panel, provider can **Approve** or **Decline** the review.

## Delete a review

Only a Central Administrator user is allowed to delete reviews.

1. Navigate to *Product Foundry > Product*.
2. Open the product details.
3. Select **Ratings & Reviews**.
4. Select **Delete** from the Ellipsis menu corresponding to the review to delete
5. A confirmation popup is displayed. Enter DELETE in the confirmation field and click Delete to validate your choice or Cancel to abort the review deletion.
6. Once the confirmation popup is closed, the review is deleted and user sees the updated review table.
