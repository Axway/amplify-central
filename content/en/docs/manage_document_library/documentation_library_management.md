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
    * Files format: Portable Document Format - PDF / Word documents - DOC, DOCX / Markdown - MD / PowerPoint - PPTX / Excel - XLSX 
    * URL
* Modified - the last time the document was updated
* Ellipsis menu: Edit / Delete

You can also filter the documents by types using the **Filter by:** controls. Search by document name with the search bar.

## View document details

To view a document's details:

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the Document Details:

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

The **Pencil** icon button of the top right corner allows to [Edit the document](#edit-a-document).

### Preview a document

To open a preview of a PDF / MD document:

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the Document Details.
3. Click the view button located below the thumbnail to open the preview and view the entire document.

### Download a document

To download a document:

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the Document Details.
3. Click the download button located below the thumbnail to download the document locally.

## Create a document

Document library supports multiple document types:

* Existing file (PDF, MD, DOC, DOCX, XLSX and PPTX no larger than 5MB) - these files are coming from an external source and cannot be modified from the Document Library. The use will only have the possibility to download them. Only PDF files will show a preview of its content,
* Markdown - a standard Markdown content that is editable from the Document Library.
* External link - a standard URL that will be displayed as a link wherever it is used.

To create a document:

1. Navigate to *Document Library*.
2. Click **+ Add New Document** to open the documents wizard.
3. Select the Document type you need: a choice between **Upload a document**, **Create Markdown** or **External link**. Based on your choice the next screen will present you the appropriate things to do:
   * **Upload a document**: use the **BROWSE FILES** button or drop file(s) in the drop area. The successfully uploaded file is displayed in the Manage Uploads area. If a file does not respect the limitations, it will appear in an error message area. Check the box in front of the uploaded file to edit the file details: Document name, Description, Version. Once your document information is correct, click **Next**.
   * **Create Markdown**: enter the document details (Name, description, Version) and click **Next** to display the Markdown editor. Once you markdown content is ready, click **Next**.
   * **External Link**: enter the document details (URL, Name, description, version) and click **Next**.dsad
4. Add your document visibility: Product and/or Marketplace. Product visibility allow any Catalog Manager that can access the document to use it in their product. Marketplace visibility can be refined by selecting on which Marketplace the document will be available. In case you upload multiple documents, this visibility will be applied to all document(s). If you need specific visibility for a document, consider uploading only that document. Then click **Next**.
5. Add the team permissions: Restricted (only the Central Admin user can manage the document) / Shared (specific team permission: owner / read / edit / none). These permissions will be applied to all documents. If you need specific permissions for a document, consider uploading only that document. Then click **Next**.
6. Review your uploaded files. Click **Prev** to return to any of the previous pages. Once everything looks good, click **Save**.

All documents are now displayed in the Document Library list view.

{{< alert title="Note" color="primary" >}}
Cancelling the wizard will not remove the uploaded files. If you don't need an uploaded file, [remove it](#delete-a-document).
{{< /alert >}}

{{< alert title="Concerning the document version" color="primary" >}}
The version is optional and there is no enforcement of the version format: you can use what you want.
{{< /alert >}}

## Edit a document

You can edit all documents your team own only. Central Admin user can edit any document.

To Edit a document:

1. Navigate to *Document Library*.
2. Select the ellipsis menu associated with the document you want to edit and click **Edit**. This will open the document wizard. You cannot change the document type but you can edit any field.
3. When you are satisfied with the changes, ckick **Save & Exit** button.

{{< alert title="Note about the Product / Marketplace visibility" color="primary" >}}
When a document is used in a product or in a Marketplace menu, you are not allowed to change its visibility. You have first to remove the Document from any product / Marketplace and then you can change the document visibility.
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
