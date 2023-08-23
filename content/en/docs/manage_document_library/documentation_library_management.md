---
title: Documents management
linkTitle: Document management
weight: 20
---

Manage your documents with the Document Library UI.

## Before you start

You must have Catalog Manager team role, assigned by your org administrator, to use the Product Foundry WebUI. For information, see [Managing users](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).

## Objectives

Learn how to use the Document Library WebUI to:

* Upload a document
* Make a document available for Product document or Marketplace settings
* Restrict the document access
* Edit a document (coming soon)
* Delete a document

## View documents

To view documents:

1. Navigate to *Document Library*.

View the following information for all documents:

* Document Name - the name of the document and current document version
* Description - the document description (may be truncated after 50 characters)
* Access - the document visibility (Public / Protected)
* Referenced - the number of times this document is referenced (product document / Marketplace settings)
* Type - the document type ((plain text format (TXT) / Portable Document Format (PDF) / Word documents (DOC, DOCX) / Markdown (MD) / PowerPoint (PPTX) / Excel (XLSX))
* Modified - the last time the document was updated

You can also filter the documents by types using the **Filter by:** controls. Search by document name with the search bar.

## View document details

To view details of a document:

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the Document Details:

    * Document name - the display name for the product in the WebUI
    * Document logical name - the internal name used to access the document
    * Document type - TXT / PDF / DOC / DOCX / MD / PPTX / XLSX
    * Updated On - the last update date
    * Created On - the creation date
    * Document thumbnail - Preview of the first page of the document (only available for PDF documents)
    * Document file name - the file name associated to the document
    * Document description - the document description helping identify the document content
    * Referenced Resources - the resources that are using this document (product and/or Marketplace) and the statuses of the resources (Available / Used)

### Preview a document

To open a preview of a PDF / Markdown document:

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the Document Details.
3. Click the view button located below the thumbnail to open the preview and view the entire document.

### Download a document

To download any document:

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the Document Details.
3. Click the download button located below the thumbnail to download the document locally.

## Create a document from existing files

Only PDF, MD, DOC, DOCX, XLSX and PPTX files are accepted. All files larger than 5MB will be rejected.

To create a document:

1. Navigate to *Document Library*.
2. Click **+ Add New Document** to open the documents wizard.
3. Select the method **Upload Document(s)**, and either use the **BROWSE FILES** button or drop file(s) in the drop area. The successfully uploaded file is displayed in the Manage Uploads area. If a file does not respect the limitations, it will appear in an error message area.
4. Check the box in front of the uploaded file to edit the file details: Document name, Description, Version. Once your document information is correct, click **Next**.
5. Add your document visibility: Product and/or Marketplace. This visibility will be applied to all documents. If you need specific visibility for a document, consider uploading only that document. Then click **Next**.
6. Add the team permissions: Restricted (only the Central Admin user can manage the document) / Shared (specific team permission: owner / read / edit / none). These permissions will be applied to all documents. If you need specific permissions for a document, consider uploading only that document. Then click **Next**
7. Review your uploaded files. You can return to any page using either the ellipsis menu next to the document tile or the **Prev** button. Once everything looks good click **Save**.

All documents will be displayed in the Document Library list view.

{{< alert title="Note" color="warning">}}
Cancelling the wizard will not remove the uploaded files. If you don't need the uploaded files, [removing them](#delete-a-document).
{{< /alert >}}

## Edit a document

Funtionality under development.

## Delete a document

Central Admins can delete any document regardless of whether they are used in product documentation or in Marketplace settings.

Catalog Manager / Marketplace Manager can delete a document they own only when it is not used in product documention or in Marketplace settings.

{{< alert title="Note" color="warning">}}
This action is irrevocable and cannot be undone.
{{< /alert >}}

To delete a document:

1. Navigate to *Document Library*.
2. Select the ellipsis menu associated with the document you want to delete and click **Delete**. To delete more than one documen at a time, select the checkboxes in front of the documents you want to delete and click  **Delete**. 
3. A popup displays the selected document name(s) as well as all affected references (product / Marketplace). Type **DELETE** in the confirmation field.
4. Click **Delete** to validate the action.
