---
title: Manage a MCP service
linkTitle: Manage a MCP service
weight: 20
date: 2021-02-09
---
Use the Topology WebUI to select an environment and then manage your MCP services, including view, create, update, and delete.

## Add an MCP service

Follow these steps to create an API service in your environment:

1. From the details page of your environment, click the **Add New Service** button located on the top right of the page. Then select **Add New MCP Service**.
2. Click either **Manual Definition** or **Fetch from URL** to define the MCP server specification. To learn how to add an MCP service using the Axway Central CLI, see [Register APIs using the CLI](/docs/integrate_with_central/cli_central/cli_register_api/). Once ready, click **Next**.
    * **Fetch from URL**: Provide a publicly accessible URL pointing to the MCP server specification. The system will retrieve and load the spec automatically.
       * **Fetch MCP Server from URL**: Provide the following fields then click **Import**. Once imported a preview of the MCP server will become available.
         * MCP Endpoint: Enter the URL endpoint to connect your MCP server.
         * Authentication Type: Can be either *API Key* or *Bearer Token*.
         * API Key Token: This field is required if the *API Key* was selected.
         * Header Name & Bearer Token Value: These fields are required if *Bearer Token* was selected.
    * **Manual Definition**: Paste or type the MCP server specification directly into the editor. Ideal for testing, quick edits, and when a file is not available.
       * **Server Metadata**: Define core service details such as compatibility and deployment info. Click **Next** once all required fields are complete.
          * Name: The name of your MCP server
          * Version: MCP server version.
          * MCP Protocol Versions Supported: Provide the MCP server's date based versioning.
          * Transports Supported: Not required. Select either *Streamable HTTP* or *Server-Sent Events*.
          * Authorization Server: Not required. If wanted enter the MCP server's Authorization Server.
       * **Tools**: Link APIs or backend services that power this MCP server asset. Tools can be added, edited, and deleted. Click **Next** once complete.
          * To add click **Add Tool**, then fill out the Name, Description, Input Schema, and Output Schema.
          * To edit or delete click the 3 ellipsis of the tool and select the desired outcome.
3. Confirm the information about your MCP service then click **Next**.
    * **Title**: Enter a descriptive name. The title is searchable, but it does not need to be unique.
    * **Logical Name**: Enter an ID for the MCP service. The ID must be unique within the scope of the environment. The logical name is referenced in any dependencies of the MCP service.
    * **Description**: Not required. Limited to 1000 characters.
    * **Icon**: Not required. A visual aid when looking through the list of API services.
    * **Classification**: Not required. Select Internal, Public, Restricted, or Sensitive.
    * **Source Code Repo**: Not required. Add the source code repoif needed.
4. Discover supported AI clients based on detected MCP protocol versions. Click **Next** once finished. Both MCP clients and Document resources that support MCP clients must be available in order to link them to this MCP service. If either is not available the UI will prompt you to create them in another tab before you continue.
    * Add any MCP clients needed by clicking **Add Client**. Select the MCP client from the type dropdown. Then select the document you wish to use for this MCP client. Click **Create**.
    * To edit, delete, or preview click the 3 ellipsis of the MCP client and select the desired outcome.
6. Input the your endpoint's name and optionally the stage and state of the endpoint. If fetch from url was used this information will be filled in automatically.Click **Next**.
    * Add any endpoints needed by clicking **Create Endpoint** and fill in the required fields. Then click **Save**.
    * To edit or delete click the 3 ellipsis of the endpoint and select the desired outcome.
7. (Optional step) For Access Rights, select the team that owns the MCP service. Select the team(s) the MCP service can be shared with. By default, an MCP service is not shared and only the **Engage Admin** or the owning team will have access to it. To share your MCP service with specific teams, select a team owner and all teams you want to grant "Rights" to for the selected MCP service. For each of the teams selected, you can choose either **Edit** or **Read** access rights. Each member of the shared team(s) selected will be able to access your MCP service with the chosen rights. This allows you to share/enable access to a specific MCP service without granting access to all the MCP services owned by your current team. Click **Next**.
8. (Optional step) Provide the Tags and Attribute details for the MCP service.
9. Click **Save**.

### Errors and debugging

In the event of an error while saving the MCP service, the form page will show an error box explaining what caused the error. The error may contain references to objects only found when using the CLI or API directly. In this case, please refer to the [Axway CLI](/docs/integrate_with_central/cli_central/cli_register_api) documentation.
