---
title: Marketplace consumer organization
linkTitle: Marketplace consumer organization
weight: 50
---

Providers can configure one or more consumer organizations that are independently managed from their own provider organization.

## Before you start

You must have platform Administrator credentials.

## Objectives

Understand what a consumer organization is and learn how to enable/disable a Marketplace consumer organization.

## What is a consumer organization?

When you want to share your Marketplace with multiple external entities (partners, subsidiaries, etc.), it becomes complex to manage all the users and associated teams, especially when your Marketplace is connected to an IDP.

To facilitate user management, you can delegate to one or more consumer organizations. A consumer organization is a place where consumers can self-organize their users and teams independently from your provider organization. See [Consumer organization management](/docs/manage_marketplace/consumer_experience/consumer_organization).

## View the Marketplace consumer organization

1. Navigate to *platform.axway.com > Marketplace*.
2. Select **Consumer Orgs**. *The Consumer Orgs page is displayed*.

This page displays all the consumer organization available, along with their number of teams and users. A provider does not have the rights to add teams or users into a consumer organization. The only actions they are allowed to perform is enable/disable organizations.

Only an enabled organization allows users to connect to the Marketplace. Disable a consumer organization to stop users registered in that organization from connecting to the Marketplace.

## Enable and disable a consumer organization

To disable an organization:

1. Select an active organization you want to disable and click the ellipsis menu **Disable**. A confirmation popup is displayed.
2. Click **Disable** to trigger the action and disable the organization. In a disabled state, no users from this organization can connect to the Marketplace. Click **Cancel** to cancel the action and the organization continues to be in an enabled state.

To re-enable an organization:

1. Find the appropriate organization and select the corresponding ellipsis menu **Enable**. A confirmation popup is displayed.
2. Click **Enable** to trigger the action and the organization will be re-enable. Click **Cancel** to cancel the action and the organization continues to be in a disabled state.