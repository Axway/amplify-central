---
title: Manage an MCP service
linkTitle: Manage an MCP service
weight: 305
date: 2025-11-06
---

Use the Topology WebUI to select an environment and then manage your MCP services, including create, view, update, and delete. You can either create the MCP service manually or fetch from a URL.

## Add an MCP service

Follow these steps to create a Model Context Protocol (MCP) service:

1. From the details page of your environment, click **Add New Service** (located at the top right of the page). Then select **Add New MCP Service**.
2. Click either **Fetch from URL** or **Manual Definition** to define the MCP server specification and then click **Next**. To learn how to add an MCP service using the Axway Central CLI, see [Register APIs using the CLI](/docs/integrate_with_central/cli_central/cli_register_api/).
    * **Fetch from URL**: Provide a publicly accessible URL pointing to the MCP server specification. The system will retrieve and load the spec automatically.
       * **Fetch MCP Server from URL**: Complete the following fields and then click **Import**. Once imported, a preview of the MCP server is available.
         * MCP Endpoint: Enter the URL endpoint to connect your MCP server.
         * Authentication Type: Can be *None*, *API Key*, or *Bearer Token*.
         * API Key Token: If *API Key* is selected, complete the following fields:
           * Key: The API key name.
           * Value: The API key value.
           * Add to: Select either *Header* or *Query* to specify where the key should be added.
         * Header Name & Bearer Token Value: These fields are required if *Bearer Token* is selected.
    * **Manual Definition**: Paste or type the MCP server specification directly into the editor. Ideal for testing, quick edits, and when a file is not available.
       * **Server Metadata**: Define core service details, such as compatibility and deployment info. Click **Next** once all required fields are complete.
          * Name: The name of your MCP server
          * Version: MCP server version.
          * MCP Protocol Versions Supported: Provide the MCP server's date-based versioning.
          * Transports Supported: Not required. Select either *Streamable HTTP* or *Server-Sent Events*.
          * Authorization Server: Not required. Enter the MCP server's Authorization Server.
       * **Tools**: Link APIs or backend services that power this MCP server asset. Tools can be added, edited, and deleted. Click **Next** once complete.
          * To add, click **Add Tool**, then fill out the Name, Description, Input Schema, and Output Schema.
          * To edit or delete, click the three ellipses of the tool and select the desired outcome.
3. Confirm your MCP service information and then click **Next**. Enter the following:
    * **Title**: Enter a descriptive name. The title is searchable, but it does not need to be unique.
    * **Logical Name**: Enter an ID for the MCP service. The ID must be unique within the scope of the environment. The logical name is referenced in any dependencies of the MCP service.
    * **Description**: Not required. Limited to **1000** characters.
    * **Icon**: Not required. A visual aid when looking through the list of API services.
    * **Classification**: Not required. Select Internal, Public, Restricted, or Sensitive.
    * **Source Code Repo**: Not required. Add the source code repo if needed.
4. Discover supported AI clients based on detected MCP protocol versions. Both MCP clients and Document resources that support MCP clients must be available to link them to this MCP service. If not available, the UI will prompt you to create them in another tab before you continue. Click **Next** once finished.
    * Click **Add Client** to add any needed MCP clients.
        a. Select the MCP client from the type dropdown.
        b. Select the document you wish to use for this MCP client.
        c. Click **Create**.
    * Click the three ellipses of the MCP client to edit, delete, or preview.
5. Enter the name of you endpoint and optionally the stage and state of the endpoint. If fetch from URL is used, this information is filled in automatically. Click **Next**.
    * Click **Create Endpoint** to add any endpoints needed. Complete in the required fields and click **Save**.
    * Click the three ellipses of the endpoint to edit, delete, or preview.
6. (Optional step) For Access Rights, select the team that owns the MCP service. Select the team(s) the MCP service can be shared with. By default, an MCP service is not shared and only the **Engage Admin** or the owning team will have access to it. To share your MCP service with specific teams, select a team owner and all teams you want to grant "Rights" to for the selected MCP service. For each of the teams selected, you can choose either **Edit** or **Read** access rights. Each member of the shared team(s) selected will be able to access your MCP service with the chosen rights. This allows you to share/enable access to a specific MCP service without granting access to all the MCP services owned by your current team. Click **Next**.
7. (Optional step) For Tags and Attributes, provide details for the MCP service.
8. Click **Save**.

### Errors and debugging

In the event of an error while saving the MCP service, the form page will display error details. If the error contains references to objects only found when using the CLI or API directly, see the [Axway CLI](/docs/integrate_with_central/cli_central/cli_register_api) documentation.
