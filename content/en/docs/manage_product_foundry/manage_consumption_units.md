---
title: Manage consumption units
linkTitle: Manage consumption units
weight: 75
---

MAnage the consumption units you want to monetize.

## Objectives

Learn how to create consumption unit.

## Concepts

A consumption unit defines the billable units. For example: Transactions, Seats, Messages. Used with the quotas to describe the pricing and how many units a consumer is entitled to use.

By default the product comes with the **Transaction** consumption unit. This allow to bill consumer based on the number of request they are executing.

## View a consumption unit

Catalog Manager or Central Administrator can view consumption unit.

1. Navigate to *Catalog > Product Foundry* > **Consumption Units**. This open the consumption unit page.

View the following information for all consumption units:

* Unit name - The name displayed to consumer in the plan quota definition.
* Logical Name - The technical identifier of the consumption unit.
* Description - The consumption unit description to help understand its purpose.
* Plans - number of plan that are currently using that unit.
* Modified date - last know modification date

The ellipsis menu allows to:

* Edit - for [updating](#edit-a-consumption-unit) the consumption unit
* Translate - for [translating](#consumption-unit-multi-language) the title and description of the consumption unit
* Delete = for [deleting](#delete-a-consumption-unit) the consumption unit

## Create a consumption unit

Catalog Manager or Central Administrator can create consumption unit.

To create a consumption unit:

1. Navigate to *Catalog > Product Foundry* > **Consumption Units**. This open the consumption unit page.
2. Click **+ Add New Unit** to open the consumption unit creation panel.
3. Enter the required information:
   * Display name (mandatory) - Logical name (mandatory), and description (optional)
4. Click Save

Logical name must start with `x-`, must be unique and cannot be updated later.

## Edit a consumption unit

Catalog Manager or Central Administrator can create consumption unit.

1. Navigate to the *Catalog > Product Foundry* > **Consumption Units**. This open the consumption unit page.
2. Use the Edit ellipsis menu to open the consumption unit edit panel
3. Only Display name and description can be edited.
4. Click Save.

## Delete a consumption unit

Catalog Manager or Central Administrator can delete consumption unit.

Delete is only allowed if the consumption unit is not used in any plan quota.

1. Navigate to the *Catalog > Product Foundry* > **Consumption Units**. This open the consumption unit page.
2. Use the Delete ellipsis menu to open the consumption unit delete confirmation
3. Confirm your choice by typing Delete.

You can also select multiple consumption units from the list and click the Delete button to delete multiple units at a time.

## Consumption unit multi-language

Catalog Manager or Central Administrator can translate consumption unit.

Consumption units are visible on the Marketplace, it is possible to add their translation so that they can be viewed differently based on the Marketplace language settings.

By default four languages are available : English / French / German / Brazilian Portuguese

You will need 2 things:

* The consumption unit default language
* The consumption unit translation languages

The language can be accessed using the List view ellipsis menu **Translate**. This will open the *translation details* screen where you can set the Default Language.

Once a default language is selection, you can add the other needed languages by using the translation icon. This will open the translation panel where you can add the translated name and description.

## Report a consumption unit

To report custom unit, a service (Custom Unit Service) will have to be implemented in order to compute the information the Traceability Agent will send back to Amplify Platform.

### Flow

Once a consumer request an access to an API via a Marketplace application, an event is generated. This event can be listen so that anyone can react on it. Typically our Discovery Agent listen to that event to apply the quota on the Gateway when creating the application/api link.

When an API call is made, the Gateway logs the information in eventlog or openlog. Traceability agent is listening these logs to create the corresponding transaction metrics and send those metrics to Amplify Platform.

Regarding the custom consumption unit, the Custom Unit Service will have to:

* listen to the provisioning quota so that it can be aware of the application/api linking and possibly add some quota enforcement on the Gateway
* compute the number of unit used for a specific api under the application umbrella and transfer this information to the Traceability Agent to report it to the Amplify Platform.

### Service implementation

This service will be accessed by the Discovery Agent to inform when a quota having custom unit is provisioned.

This service will send information related to custom unit consumption to the Traceability Agent so that the Traceability Agent can report the metrics to the Amplify Platform.

Refer to [Reporting custom unit usage](/docs/connect_manage_environ/connected_agent_common_reference/custom-unit-metrics) for more information about its implementation.

## Visualize consumption unit in Business or Consumer Insights

An additional filter has been added to the Business/Consumer Insights Applications and Subscriptions screens to be able to filter using the consumption units.

The filter contains the list of all available consumption units. Once a consumption unit is selected, the corresponding data if any are displayed.