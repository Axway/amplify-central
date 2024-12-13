---
title: Manage consumption units
linkTitle: Manage consumption units
weight: 75
---

Manage the consumption units you want to monetize.

## Objectives

Learn how to create consumption unit.

## Concepts

A **consumption unit** represents the billable unit of measurement used to define and track how resources or services are consumed. It is a fundamental concept for managing quotas and determining pricing in usage-based systems. Common consumption units include **Transactions**, **Seats**, **Messages**, or any custom unit defined for specific business needs.

Consumption units are used to:

* Define how many units a consumer is entitled to use (quotas).
* Establish the basis for billing consumers based on their usage.

By default, the product includes the **Transaction** consumption unit. This allows billing to be based on the number of requests the clients execute.

## View a consumption unit

Catalog Manager or Central Administrator can view consumption unit.

1. Navigate to *Catalog > Product Foundry* > **Consumption Units**. This open the **Consumption Units** page where you can view the list of all available consumption units.

On the Consumption Units page, you can view the following information for each consumption unit:

* Unit name - The display name of the consumption unit, shown to consumers in the plan quota definition.
* Logical Name - The technical identifier of the consumption unit.
* Description - A brief description explaining the purpose of the consumption unit.
* Plans - The number of product plans currently using this consumption unit.
* Modified date - The date when the consumption unit was last updated.

The ellipsis (⋮) menu next to each consumption unit offers additional management options:

* **Edit** - Allows you to update the details of a consumption unit. Refer to [Edit a Consumption Unit](#edit-a-consumption-unit) section for detailed instructions.
* **Translate** - nables you to translate the title and description of the consumption unit into multiple languages. For more information, see  [Consumption Unit multi-language](#consumption-unit-multi-language).
* **Delete** = To [deleting](#delete-a-consumption-unit) the consumption unit from the product.

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

To report a custom unit, you need to create a Custom Unit Service. This service will calculate the necessary information for the Traceability Agent to send back to the Amplify Platform.

### Flow

When a consumer requests access to an API via a Marketplace application, an event is generated. This event can be monitored so that systems can respond to it. For example, the Discovery Agent listens for this event to apply a quota on the Gateway when linking the application to the API.

When an API call is made, the Gateway logs the activity in **eventlog** or **openlog**. The Traceability Agent monitors these logs to generate transaction metrics and sends those metrics to the Amplify Platform.

For custom consumption units, the Custom Unit Service needs to:

1. **Monitor Quota Provisioning**:
   * Listen for quota provisioning events to track application and API link creation.
   * Optionally enforce quotas on the Gateway during this process.
2. **Calculate and Report Usage**:
   * Compute the number of custom units used for a specific API within the application.
   * Send this usage data to the Traceability Agent, which reports it to the Amplify Platform.
   * This process ensures that custom units are properly tracked and integrated with the Amplify Platform for reporting and enforcement.

### Service implementation

This service will be accessed by the Discovery Agent to inform when a quota having custom unit is provisioned.

This service will send information related to custom unit consumption to the Traceability Agent so that the Traceability Agent can report the metrics to the Amplify Platform.

Refer to [Reporting custom unit usage](/docs/connect_manage_environ/connected_agent_common_reference/custom-unit-metrics) for more information about its implementation.

## Visualize consumption unit in Business or Consumer Insights

An additional filter has been added to the Business/Consumer Insights Applications and Subscriptions screens to be able to filter using the consumption units.

The filter contains the list of all available consumption units. Once a consumption unit is selected, the corresponding data if any are displayed.