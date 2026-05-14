---
title: Documents management
linkTitle: Document management
weight: 20
---

Manage your documents with the Document Library WebUI.

## Before you start

You must have Catalog Manager team role, assigned by your org administrator, to use the Product Foundry WebUI. For information, see [Managing users](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).

## Objectives

Learn how to use the Document Library WebUI to:

* Create a document
* Make a document available (product document / MCP clients / Marketplace settings)
* Restrict the document access
* Edit a document
* Delete a document
* Create a documentation template

## Library content

To view the library content, navigate to *Document Library*.

The page displays two tabs:

* [Documents](#documents) - lists available documents in the library
* [Templates](#templates) - lists templates that can be used to create product documentation

Catalog Manager and/or Engage Administrator can manage the document library content.

### Documents

A document in the document library can be either:

* An internal Markdown document created from the library
* An external documents uploaded into the library
* A URL document

#### View document list

Navigate to *Document Library*. The **Documents** tab is displayed by default.

View the following information for all documents:

* Document Name - the name of the document and the current document version
* Description - the document description (may be truncated after 50 characters)
* Access - the document visibility (Public / Protected)
* Referenced - the number of times the document is referenced (product document / Marketplace settings)
* Type - the document type:
    * File formats: Portable Document Format - PDF / Word documents - DOC, DOCX / Markdown - MD / PowerPoint - PPTX / Excel - XLSX
    * URL
* Modified - the last time the document was updated
* Ellipsis menu: Edit / Delete

You can also filter the documents by types using the **Filter by:** controls. Search by document name with the search bar.

#### View document details

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the *Document Details*:

    * Document name - the display name for the product in the WebUI
    * Document logical name - the internal name used to access the document
    * Document type - PDF / DOC / DOCX / MD / PPTX / XLSX / URL
    * URL link (URL only)
    * Updated On - the last update date
    * Created On - the creation date
    * Document thumbnail - preview of the document and download (only available for PDF, MD, PPTX, DOCX, XLSX documents)
    * Document file name (external document only) - the file name associated to the document
    * Document description - the document description that helps identify the document content
    * Referenced Resources - the resources that are using the document (product and/or Marketplace) and the statuses of the resources (Available / Used)

Click the **Pencil** icon at the top right to [Edit the document](#edit-a-document).

#### Preview a document

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the document details.
3. Click **View**, located below the thumbnail, to open the preview of the entire PDF or MD document.

#### Download a document

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the document details.
3. Click **Download**, located below the thumbnail, to download the document locally.

#### Create a document

The Document Library supports multiple document types:

* Existing file (PDF, MD, DOC, DOCX, XLSX and PPTX no larger than 5MB) - these files are coming from an external source and cannot be modified from the Document Library. The user will only be able to download them. Only PDF files will show a preview of its content.
* Markdown - a standard Markdown content that is editable from the Document Library.
* External link - a standard URL that will be displayed as a link wherever it is used.

To create a document:

1. Navigate to *Document Library*.
2. Click **+ Add Document** to open the documents wizard.
3. Select a Document type: **Upload a document**, **Create Markdown** or **External link**. Based on your choice, the next screen will present you with the appropriate actions:
   * **Upload a document**: click **BROWSE FILES** or drop file(s) into the drop area. The successfully uploaded file is displayed in the *Manage Uploads* area. If a file does not respect the limitations, it will appear in an *error message* area. Check the box in front of the uploaded file to edit the file details: Document name, Description, Version. Once your document information is correct, click **Next**.
   * **Create Markdown**: enter the document details (Name, Description, Version) and click **Next** to display the [Markdown editor](/docs/manage_product_foundry/markdown_editor). Once the markdown content is ready, click **Next**.
   * **External Link**: enter the document details (URL, Name, Description, Version) and click **Next**.
4. Add your document visibility: Product, MCP client and/or Marketplace.
   * Product visibility allows any Catalog Manager that can access the document to use it in their product.
   * MCP client visibility allows you to select the MCP client that this document will be associated with.
   * Marketplace visibility can be refined by selecting on which Marketplace the document will be available. If you upload multiple documents, this visibility will be applied to all document(s). If you need specific visibility for a document, consider uploading only that document. Then click **Next**.
5. Add the team permissions: Restricted (only the Engage Admin user can manage the document) / Shared (specific team permission: owner / read / edit / none). These permissions will be applied to all documents. If you need specific permissions for a document, consider uploading only that document. Then click **Next**.
6. Review your uploaded files. Click **Prev** to return to any of the previous pages. When finished, click **Save**.

All documents are now displayed in the *Document Library list view*.

{{< alert title="Note" color="primary" >}}
Cancelling the wizard will not remove the uploaded files. If you don't need an uploaded file, [remove it](#delete-a-document).
{{< /alert >}}

{{< alert title="Concerning the document version" color="primary" >}}
The version is optional. There is no enforcement of the version format, you can use what you want.
{{< /alert >}}

#### Edit a document

You can only edit documents your team owns. Only Engage Admin users can edit any document.

1. Navigate to *Document Library*.
2. Select the ellipsis menu associated with the document you want to edit and click **Edit**. This will open the document wizard. You cannot change the document type but you can edit any field.
3. When you are satisfied with the changes, click **Save & Exit**.

{{< alert title="Note" color="primary" >}}
When a document is used in a product or in a Marketplace menu, you are not allowed to change its visibility. To change the visibility, you must first remove the Document from any product / Marketplace and then you can change the document visibility.
{{< /alert >}}

#### Delete a document

Engage Admins can delete any document regardless of whether it is used in product documentation or in Marketplace settings.

Catalog Manager / Marketplace Manager can delete a document they own only when it is not used in product documentation or in Marketplace settings.

{{< alert title="Note" color="primary" >}}This action is irrevocable and cannot be undone.{{< /alert >}}

To delete a document:

1. Navigate to *Document Library*.
2. Select the ellipsis menu associated with the document you want to delete and click **Delete**. To delete multiple documents, select the checkboxes in front of the documents and click **Delete**.
3. A popup displays the selected document name(s) as well as all affected references (product / Marketplace). Type **DELETE** in the confirmation field.
4. Click **Delete** to validate the action.

#### Multi-languages support

If your document can be seen on the Marketplace (either because it is used in a menu or in product documentation), translation can be added so that it can be viewed differently based on the Marketplace language settings.

Adding the translation means you have your original copy of the document and as many additional copies in the languages you need. For instance, the original copy is in French, and English, German and Portuguese copies can be added as needed.

{{< alert title="Note" color="warning" >}}
The translation will follow the original document type. If the original document type is a file, all translations must be files as well. Same applies for Markdown and URL document types.
{{< /alert >}}

By default, four languages are available : English / French / German / Brazilian Portuguese

You will need 2 things:

* The Document default language
* The Document translation languages

This feature is not yet available from the UI, but you can use the CLI or API to add the Document available languages. Refer to [API Server multi languages support](/docs/integrate_with_central/api_server#multi-languages-support) and the [sample data](/docs/integrate_with_central/samples/sample_start_to_end#scenario-description) where there is an example of Document Library document using two languages.

### Templates

A documentation template is a complete or partial set of Topics/Sections and/or Articles that can be used as a basis to create the product documentation.

* A topic can have one or more sections.
* A section can have one or more articles (either Markdown or document linked from the document library).
* A template can be owned by a team and/or shared with other team(s).

#### View template list

Navigate to *Document Library* and select *Templates*

View the following information for all templates:

* Template Name - the name of the template and its current version
* Description - the template description (may be truncated after 50 characters)
* Access - the template visibility (Shared / Restricted)
* Modified - the last time the document was updated
* Ellipsis menu: Edit / View / Delete

#### View template details

1. Navigate to *Document Library* and select the **Templates** tab.
2. Click on a template name in the list view or use the Edit menu from ellipsis menu to open the *Template details* popup:

    * On the top, the template name and its owner is visible
    * The screen is then divided into 3 vertical sections:
      * Left - the documentation structure (Topic/Section/Article) and a search bar to search that structure
      * Middle - the article content (either Markdown, PDF viewer, download option if DOC,XLS,PPT document or URL)
      * Right - the Markdown article table of content if any

#### Create a template

1. **Open the template wizard**:

   * Navigate to *Document Library* and select the **Templates** tab.
   * Click **+ Add Template** to start the template wizard.
2. **Enter general information**:

   * Fill out the required fields:
      * **Template name** (mandatory)
      * **Description** (mandatory)
      * **Version** (mandatory)
   * Click **Next** to proceed.
3. **Build the documentation structure**:

   * Click **+ Add topic** to add a topic. This opens a side panel where you can provide the topic's details. Click **Save** when done.
   * Click **+ Add Section** to add a section within a topic. This opens a side panel for section details. Click **Save** when finished.
   * Click **+ Add Article** to add articles to a section. You can:
      * Create a **Markdown Article**: fill in the Markdown profile (name, description, version) before accessing the [markdown editor](/docs/manage_product_foundry/markdown_editor).
      * **Link a Document**: select one or more documents from the Document Library to attach.
4. **Finalize your template**:

   * Review your template structure. When satisfied, click **Next**.
   * Assign a template owner and decide if the template should be shared with other teams.
5. **Save & Exit**:

   * Click **Save & Exit** to save your work and close the wizard. You can use **Save & Exit** at any time to preserve your progress.
   * Use the **Edit** option from the ellipsis menu update an existing template.

{{< alert title="Note" color="information" >}}
**Additional notes** </br>
Selecting a topic, section, or article in the documentation structure displays its content at the right of the screen. Use the pencil icon to edit content directly.

Use the drag icon (double horizontal bar with arrows) to reorganize items:

* Topics can be reordered.
* Sections can be moved within the same topic or another topic.
* Articles can be moved within their section, to another section, or to another topic.

Delete topics, sections, or articles using their **Delete** option in the ellipsis menu . A confirmation popup will appear, as deletions cannot be undone.
{{< /alert >}}

#### Edit a template

1. Navigate to *Document Library* and select the **Templates** tab.
2. Select the ellipsis menu associated with the document you want to edit and click **Edit**. This will open the template wizard. You can change anything you want using the Pencil icon to edit a topic or a section, the **+ Add topic** to add new topic, the **+ Add section** to add new section and the **+ Add article** to add new articles. Topic, section and articles can be removed using their corresponding **Delete** ellipsis menu. A confirmation popup will be displayed for each deletion as this action is irreversible.
3. Click **Save & Exit**, when you are done.

#### Delete a template

A template can only be deleted by either a **Catalog Manager** from the team that owns the template or by the Engage Administrator.

1. Navigate to *Document Library* and select the **Templates** tab
2. Select **Delete** from the ellipsis menu. A confirmation popup will appear, as deletions cannot be undone.

#### Set a default template

To help create standardized, professional-looking product documentation, a Catalog Manager can recommend a template by using the **Set as default** ellipsis menu. Once a template is set as the default, a **Default** tag is attached to the template and displayed in the list of templates.

By default, templates are not enforced, just recommended. A default template can be set so that whenever product documentation is created, the template is automatically selected. Once the use of the template is validated, the product documentation can be created accordingly.

When setting the default template, the option to enforce it is available. This will ensure that the product documentation can only be created using the default template. When creating a new product release, the template will be automatically applied if the product does not already have documentation.

When manually releasing a product, a check ensures that the documentation matches the current enforced default template. If the enforced template was not applied, then a message is displayed; you must remove the existing documentation and then the default template can be applied. This check is disabled during the auto-release process.

At any time, the default template can be reset by using either the **Set as default** ellipsis menu of another template and validating the choice, or the **Unset default** ellipsis menu of the current template.

{{< alert title="Note" color="primary" >}}If a default template is created and enforced by a member of a team, then every member in any team will have access to the template.{{< /alert >}}

#### Use a template

The template can only be used when creating a new product or a new product version.
