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
* Make a document available (product document / Marketplace settings)
* Restrict the document access
* Edit a document
* Delete a document
* Create a documentation template

## Library content

To view the library content, navigate to *Document Library*.

The page displays two tabs:

* [Documents](#documents): list available documents in the library
* [Templates](#templates): list templates that can be used to create product documentation

Catalog Manager and/or Central Administrator can manage the document library content.

### Documents

A document in the document library can be either:

* an internal Markdown document created from the library
* an external documents uploaded into the library
* an URL document

#### View document list

Navigate to *Document Library* and the Documents tab is displayed by default.

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

To view a document's details:

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the *Document Details*:

    * Document name - the display name for the product in the WebUI
    * Document logical name - the internal name used to access the document
    * Document type - TXT / PDF / DOC / DOCX / MD / PPTX / XLSX / URL
    * URL link (URL only)
    * Updated On - the last update date
    * Created On - the creation date
    * Document thumbnail - preview of the document's first page (only available for PDF documents)
    * Document file name (external document only) - the file name associated to the document
    * Document description - the document description that helps identify the document content
    * Referenced Resources - the resources that are using the document (product and/or Marketplace) and the statuses of the resources (Available / Used)

Click the **Pencil** icon at the top right to [Edit the document](#edit-a-document).

#### Preview a document

To open a preview of a PDF / MD document:

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the document details.
3. Click **View**, located below the thumbnail, to open the preview of the entire document.

#### Download a document

To download a document:

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
2. Click **+ Add New Document** to open the documents wizard.
3. Select a Document type: **Upload a document**, **Create Markdown** or **External link**. Based on your choice, the next screen will present you with the appropriate actions:
   * **Upload a document**: click **BROWSE FILES** or drop file(s) into the drop area. The successfully uploaded file is displayed in the *Manage Uploads* area. If a file does not respect the limitations, it will appear in an *error message* area. Check the box in front of the uploaded file to edit the file details: Document name, Description, Version. Once your document information is correct, click **Next**.
   * **Create Markdown**: enter the document details (Name, Description, Version) and click **Next** to display the Markdown editor. Once the markdown content is ready, click **Next**.
   * **External Link**: enter the document details (URL, Name, Description, Version) and click **Next**.
4. Add your document visibility: Product and/or Marketplace. Product visibility allows any Catalog Manager that can access the document to use it in their product. Marketplace visibility can be refined by selecting on which Marketplace the document will be available. If you upload multiple documents, this visibility will be applied to all document(s). If you need specific visibility for a document, consider uploading only that document. Then click **Next**.
5. Add the team permissions: Restricted (only the Central Admin user can manage the document) / Shared (specific team permission: owner / read / edit / none). These permissions will be applied to all documents. If you need specific permissions for a document, consider uploading only that document. Then click **Next**.
6. Review your uploaded files. Click **Prev** to return to any of the previous pages. When finished, click **Save**.

All documents are now displayed in the *Document Library list view*.

{{< alert title="Note" color="primary" >}}
Cancelling the wizard will not remove the uploaded files. If you don't need an uploaded file, [remove it](#delete-a-document).
{{< /alert >}}

{{< alert title="Concerning the document version" color="primary" >}}
The version is optional. There is no enforcement of the version format, you can use what you want.
{{< /alert >}}

#### Edit a document

You can only edit documents your team owns. Only Central Admin users can edit any document.

To Edit a document:

1. Navigate to *Document Library*.
2. Select the ellipsis menu associated with the document you want to edit and click **Edit**. This will open the document wizard. You cannot change the document type but you can edit any field.
3. When you are satisfied with the changes, click **Save & Exit**.

{{< alert title="Note" color="primary" >}}
When a document is used in a product or in a Marketplace menu, you are not allowed to change its visibility. To change the visibility, you must first remove the Document from any product / Marketplace and then you can change the document visibility.
{{< /alert >}}

#### Delete a document

Central Admins can delete any document regardless of whether it is used in product documentation or in Marketplace settings.

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

* the Document default language
* the Document translation languages

This feature is not yet available from the UI, but you can use the CLI or API to add the Document available languages. Refer to [API Server multi languages support](/docs/integrate_with_central/api_server#multi-languages-support) and the [sample data](/docs/integrate_with_central/samples/sample_start_to_end#scenario-description) where there is an example of Document Library document using two languages.

### Templates

A documentation template is a complete or partial set of Topics/Sections and articles that can be use as a basis to create the product documentation.

A topic can have one or more section.

A section can have one or more articles (either Markdown or document linked from the document library).

A template can be own by a team and/or share with other team.

#### View template list

Navigate to *Document Library* and select the *Templates*

View the following information for all templates:

* Template Name - the name of the template and its current version
* Description - the template description (may be truncated after 50 characters)
* Access - the template visibility (Shared / Restricted)
* Modified - the last time the document was updated
* Ellipsis menu: Edit / View / Delete

#### View template details

1. Navigate to *Document Library* and select the *Templates* tab
2. Click on a template name in the list view or use the Edit menu from ellipsis menu to open the *Template details* popup:

    * On the top, the template name and its owner is visible
    * The screen is then divided into 3 vertical sections:
      * on the left: the documentation structure (Topic/Section/Article) and a search bar to search that structure
      * in the middle: the article content (either Markdown, PDF viewer, download option if DOC,XLS,PPT document or URL)
      * on the right: the MArkdown article table of content if any

#### Create a template

To create a template:

1. Navigate to *Document Library* and select the *Templates* tab
2. Click **+ Add New Template** to open the template wizard.
3. Enter the general information (template name - mandatory, description - optional and template version - mandatory)
4. click **Next**
5. Create the documentation structure using the **+ Add topic** button to open the topic side blade and add its information. Click **Save** when complete.
   1. you can add another Topic using the **+ Add topic** button or Add a section to a topic using the **+ Add section** button. This will open the section side panel to add the section information. Click **Save** when complete.
   2. From a section, you can use the **+ Add article** button to add an article to the selected section (either a Markdown or link a document from the library). When adding a Markdown, you have first to enter your Markdown profile (name, description, version) before viewing the Markdown editor. When linking a document from the library, you to select which document to link (one or multiple). Click **Next** from the Markdown editor screen or the link document screen to validate your choice and return to the documentation structure.
6. Once satisfied with your template, click **Next**
7. Select who should be the template owner and if the template needs to be share with other teams
8. click **Save & Exit**. Save & Exit can be used any time in the wizard and it will save the current state of the template. To update a template use the ellipsis Edit menu.

{{< alert title="Note" color="information" >}}
Each time you select a topic, section, article from the documentation structure, its content is visible on the right side of the screen. The pencil icon allows to edit the content from there.

Topic, Section and article can be moved around using the drag icon (double horizontal bar with arrow). A topic can be reorder. A section can be move inside a topic or to another topic. An article can be moved inside its section or to another section within the same topic or to another topic.

Topic, Section and article can be deleted using their corresponding **Delete** ellipsis menu. A confirmation popup will be displayed for each deletion as this action is irreversible.
{{< /alert >}}

#### Edit a template

To edit a template:

1. Navigate to *Document Library* and select the *Templates* tab
2. Select the ellipsis menu associated with the document you want to edit and click **Edit**. This will open the template wizard. You can change anything you want using the Pencil icon to edit a topic or a section, the **+ Add topic** to add new topic, the **+ Add section** to add new section and the **+ Add article** to add new articles. Topic, section and articles can be removed using their corresponding **Delete** ellipsis menu. A confirmation popup will be displayed for each deletion as this action is irreversible.
3. When you are satisfied with the changes, click **Save & Exit**.

#### Delete a template

Template can be deleted by a Catalog Manager from the owning team of the template or by Central Administrator.

To delete a template:

1. Navigate to *Document Library* and select the *Templates* tab
2. Select the ellipsis menu associated with the document you want to edit and click **Delete**. This will open a confirmation popup to validate your choice.