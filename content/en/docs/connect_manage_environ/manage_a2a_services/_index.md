---
title: Manage an A2A service
linkTitle: Manage an A2A service
weight: 305
date: 2025-11-06
---

Use the Topology WebUI to select an environment and then manage your A2A services, including create, view, update, and delete. You can either upload a file or fetch from a URL.

## Add an A2A service

Follow these steps to create a Model Context Protocol (A2A) service:

1. From the details page of your environment, click **Add Service** (located at the top right of the page). Then select **Add A2A Service**.
2. Click either **Fetch from URL** or **Upload File** to import the agent card and then click **Next**. To learn how to add an A2A service using the Axway Central CLI, see [Register APIs using the CLI](/docs/integrate_with_central/cli_central/cli_register_api/).
    * **Fetch from URL**: Provide a publicly accessible URL pointing to the agent card. The system will retrieve and load the spec automatically.
       * **Fetch A2A Server from URL**: Complete the following fields and then click **Import**. Once imported, a preview of the agent card is available.
         * Version: Can either enter manually or it will be automaticaly filled in once an agent card has been successfully fetched.
         * Agent Card URL: Enter a URL to fetch an agent card (requires: name, url, skills). Only version 1.0.0 is supported.
    * **Upload File**: Upload the agent card.
       * Version: Can either enter manually or it will be automaticaly filled in once an agent card has been successfully fetched.
       * Upload Agent Card: Upload a JSON file with an agent card (requires: name, url, and skills). Only version 1.0.0 is supported.
3. Confirm your agent card information and then click **Next**. Enter the following:
    * **Title**: Enter a descriptive name. The title is searchable, but it does not need to be unique.
    * **Logical Name**: Enter an ID for the A2A service. The ID must be unique within the scope of the environment. The logical name is referenced in any dependencies of the A2A service.
    * **Description**: Not required. Limited to **1000** characters.
    * **Environment**: Will only be viewable if the wizard has been accessed through the Service Registry. Required to choose and environment if so.
    * **Agent Card Overview**: Not required. Add overview content to help users understand your content when they view it in the marketplace. Supports markdown.
    * **Icon**: Not required. A visual aid when looking through the list of API services.
    * **Classification**: Not required. Select Internal, Public, Restricted, or Sensitive.
    * **Source Code Repo**: Not required. Add the source code repo if needed.
4. Add documentation: select a document template or start from a blank document:
    * From a template: a page displays the available template list that is visible to your team(s). Click **Preview template** to view information about the selected template. After choosing a template, click the corresponding radio button on the template card and then click **Next**. The documentation structure is immediately created based on the template structure and can be updated as needed.
    * From a blank document: you must create the documentation structure manually.
    * If you change methods  part way through creating the document, then a warning is displayed informing you that the documentation elements that have already been created could be lost. If you wish to keep the existing elements, click **Next**. Otherwise, select the new method (either template or a blank document).
    * Edit documentation elements (topics, sections, and articles).
        * Click **+ Add topic** to add a new topic.
        * Click **+ Add section** to add a new section in a topic.
        * Once a section is available, click **+ Add article** to link an article from a document library document that has Service Registry access.
        * Each time you select a topic, section, article from the documentation structure, its content is visible at the right of the screen, where you can use the pencil icon to edit the content.
        * Topic, section, and article can be moved around using the drag icon (double horizontal bar with arrow). A topic can be reordered. A section can be moved inside a topic or to another topic. An article can be moved inside its section or to another section within the same topic or to another topic.
        * Topic, section, and article can be deleted using their corresponding **Delete** ellipsis menu. A confirmation is required for each deletion, as this action is irreversible.
        * Once your documentation is ready, click **Next**.
5. Enter the name of your endpoint and optionally the stage and state of the endpoint. This information may be filled in automatically. Click **Next**.
    * Click **Create Endpoint** to add any endpoints needed. Complete in the required fields and click **Save**.
    * Click the three ellipses of the endpoint to edit, delete, or preview.
6. (Optional step) For Access Rights, select the team that owns the A2A service. Select the team(s) the A2A service can be shared with. By default, an A2A service is not shared and only the **Engage Admin** or the owning team will have access to it. To share your A2A service with specific teams, select a team owner and all teams you want to grant "Rights" to for the selected A2A service. For each of the teams selected, you can choose either **Edit** or **Read** access rights. Each member of the shared team(s) selected will be able to access your A2A service with the chosen rights. This allows you to share/enable access to a specific A2A service without granting access to all the A2A services owned by your current team. Click **Next**.
7. (Optional step) For Tags and Attributes, provide details for the A2A service.
8. Click **Save**.

### Errors and debugging

In the event of an error while saving the A2A service, the form page will display error details. If the error contains references to objects only found when using the CLI or API directly, see the [Axway CLI](/docs/integrate_with_central/cli_central/cli_register_api) documentation.
