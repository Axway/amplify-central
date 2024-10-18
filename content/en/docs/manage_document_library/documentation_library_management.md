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

## View documents

To view documents, navigate to *Document Library*.

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

## View document details

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

### Preview a document

To open a preview of a PDF / MD document:

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the document details.
3. Click **View**, located below the thumbnail, to open the preview of the entire document.

### Download a document

To download a document:

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the document details.
3. Click **Download**, located below the thumbnail, to download the document locally.

## Create a document

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

## Edit a document

You can only edit documents your team owns. Only Central Admin users can edit any document.

To Edit a document:

1. Navigate to *Document Library*.
2. Select the ellipsis menu associated with the document you want to edit and click **Edit**. This will open the document wizard. You cannot change the document type but you can edit any field.
3. When you are satisfied with the changes, click **Save & Exit**.

{{< alert title="Note" color="primary" >}}
When a document is used in a product or in a Marketplace menu, you are not allowed to change its visibility. To change the visibility, you must first remove the Document from any product / Marketplace and then you can change the document visibility.
{{< /alert >}}

## Delete a document

Central Admins can delete any document regardless of whether it is used in product documentation or in Marketplace settings.

Catalog Manager / Marketplace Manager can delete a document they own only when it is not used in product documentation or in Marketplace settings.

{{< alert title="Note" color="primary" >}}This action is irrevocable and cannot be undone.{{< /alert >}}

To delete a document:

1. Navigate to *Document Library*.
2. Select the ellipsis menu associated with the document you want to delete and click **Delete**. To delete multiple documents, select the checkboxes in front of the documents and click **Delete**.
3. A popup displays the selected document name(s) as well as all affected references (product / Marketplace). Type **DELETE** in the confirmation field.
4. Click **Delete** to validate the action.

## Multi-languages support

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
