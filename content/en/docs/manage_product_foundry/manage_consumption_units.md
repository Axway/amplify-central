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

* Define how many units a consumer is entitled to use (quotas)
* Establish the basis for billing consumers based on their usage

By default, the product includes the **Transaction** consumption unit. This allows billing to be based on the number of requests the clients execute.

## View a consumption unit

Catalog Manager or Engage Administrator can view consumption unit.

1. Navigate to *Catalog > Product Foundry* > *Consumption Units*. The *Consumption Units* page is displayed where you can view the list of all available consumption units,including:

* Unit name - The display name of the consumption unit, shown to consumers in the plan quota definition.
* Logical Name - The technical identifier of the consumption unit.
* Description - A brief description explaining the purpose of the consumption unit.
* Plans - The number of product plans currently using this consumption unit.
* Modified date - The date when the consumption unit was last updated.

Click the ellipsis (⋮) menu next to each consumption unit to:

* **Edit** - Allows you to update the details of a consumption unit. See [Edit a Consumption Unit](#edit-a-consumption-unit) for detailed instructions.
* **Translate** - Enables you to translate the title and description of the consumption unit into multiple languages. See [Consumption Unit multi-language](#consumption-unit-multi-language).
* **Delete** - To delete the consumption unit from the product. See [Delete a consumption unit](#delete-a-consumption-unit).

## Create a consumption unit

Catalog Manager or Engage Administrator can create consumption unit.

1. Navigate to *Catalog > Product Foundry* > *Consumption Units*. The *Consumption Units* page is displayed.
2. Click **+ Add New Unit** to open the consumption unit creation panel.
3. Enter the required information:
   * Display name (mandatory), Logical name (mandatory), and description (optional)
4. Click **Save**.

Logical name must start with `x-`, must be unique and cannot be updated later.

## Edit a consumption unit

Catalog Manager or Engage Administrator can create consumption unit.

1. Navigate to the *Catalog > Product Foundry* > *Consumption Units*. The *Consumption Units* page is displayed.
2. Click the ellipsis menu to open the consumption unit edit panel.
3. Only the Display name and the description can be edited.
4. Click **Save**.

## Delete a consumption unit

Catalog Manager or Engage Administrator can delete consumption unit.

Delete is only allowed if the consumption unit is not used in any plan quota.

1. Navigate to the *Catalog > Product Foundry* > *Consumption Units*. The *Consumption Units* page is displayed.
2. Click the Delete ellipsis menu to open the consumption unit delete confirmation.
3. Confirm your choice by typing **Delete**.

You can also select multiple consumption units from the list and click **Delete** to delete multiple units at a time.

## Consumption unit multi-language

Catalog Manager or Engage Administrator can translate consumption unit.

Consumption units are visible on the Marketplace. Translation can be added so that they can be viewed differently based on the Marketplace language settings.

By default four languages are available: English / French / German / Brazilian Portuguese

Before adding translation, you must know:

* The consumption unit default language
* The consumption unit translation languages

1. Click the List view ellipsis menu **Translate** to access the language. The *translation details* page is displayed.
2. Select a Default Language.

Once a default language is selection, you can add the other needed languages by using the translation icon. This will display the translation panel where you can add the translated name and description.

## Report a consumption unit

To report a custom unit, you must create a Custom Unit Service. This service will calculate the necessary information for the Traceability Agent to send back to the Amplify Platform.

### Flow

When a consumer requests access to an API via a Marketplace application, an event is generated. This event can be monitored so that systems can respond to it. For example, the Discovery Agent listens for this event to apply a quota on the Gateway when linking the application to the API.

When an API call is made, the Gateway logs the activity in either the **eventlog** or the **openlog**. The Traceability Agent monitors these logs to generate transaction metrics and then sends those metrics to the Amplify platform.

For custom consumption units, the Custom Unit Service must:

1. **Monitor quota provisioning**:
   * Listen for quota provisioning events to track application and API link creation.
   * Optionally enforce quotas on the Gateway during this process.
2. **Calculate and report usage**:
   * Compute the number of custom units used for a specific API within the application.
   * Send this usage data to the Traceability Agent, which reports it to the Amplify platform.

This process ensures that custom units are properly tracked and integrated with the Amplify Platform for reporting and enforcement.

### Service implementation

This service is accessed by the Discovery Agent to inform when a quota having custom unit is provisioned.

This service sends information related to custom unit consumption to the Traceability Agent so that the Traceability Agent can report the metrics to the Amplify Platform.

Refer to [Reporting custom unit usage](/docs/connect_manage_environ/connected_agent_common_reference/custom-unit-metrics) for more information about its implementation.

## Visualize consumption unit in Business or Consumer Insights

A filter in the Business/Consumer Insights *Applications and Subscriptions* screen enables filtering by all available consumption units.

Once a consumption unit is selected, the corresponding data (if any) is displayed.
