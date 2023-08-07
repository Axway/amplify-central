---
title: Documents management
linkTitle: Document management
weight: 20
---

Manage your documents, including: create, edit, delete, with the Document Library UI.

## Before you start

You must have Catalog Manager team role, assigned by your org administrator, to use the Product Foundry WebUI. For information, see [Managing users](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-users).

## Objectives

Learn how to use the Document Library WebUI to create and manage documents, including:

* Upload a document
* Make a document available for Product document or Marketplace settings
* Restrict the document access
* Edit a document (coming soon)
* delete a document

## View documents

To view documents:

1. Navigate to *Document Library*.

View the following information for all documents:

* document name - The name of the document
* Document version - the current document version
* Document description - the document description (may be truncated after 50 characters)
* Referenced - the count where this document is referenced (product document / marketplace settings)
* Type - the document type (TEXT / PDF / DOCX ...)
* Modified - the last time the document was updated

You can also filter the documents by types using the **Filter By** controls. Search by document name with the search bar.

## View document details

To view document details:

1. Navigate to *Document Library*.
2. From the list view, select a document by clicking on its name

View the following detailed information for a specific document:

* Document Name - The display name for the product in the WebUI
* Document Logical name - the internal name to access the document
* Document type - MARKDOWN / PDF / TXT / ...
* Updated On - the last update date
* Created On - the creation date
* Document thumbnail - Preview of the first page of the document (only available for PDF documents)
* Document file name - the file name associated to the document
* Document description - the document description helping identify the document content
* Reference resources - the resources that are using this document (product and/or Marketplace)

### Preview a document

From the document details, it is possible for certain types of document (PDF / Markdown) to see its preview

1. Navigate to *Document Library*.
2. From the list view, select a document by clicking on its name
3. Click the eye icon beside the thumbnail to open the preview panel and view the entire document

### Download a document

From the document details, it is possible to download any document

1. Navigate to *Document Library*.
2. From the list view, select a document by clicking on its name
3. Click the download button beside the thumbnail to start downloading locally the document

## Create a document from existing files

Only pdf, md, doc, docx, xlsx and pptx files are accepted. All files bigger than 5MB will be rejected.

1. Navigate to *Document Library*.
2. Click **+ Add New Document** to add new documents and open the documents wizard
3. Select the method Upload files, the browse page is displayed:

    * either use the Browse files button or drop files in the drop area

4. Uploaded files are displayed at the bottom of the screen. If a file does not respect the limitations, it will appear in the error message area
5. The check box in front of the uploaded file allows to edit the file details (Document name / Document description / Document version). Once your document information is correct, click **Next**
6. Add your Document visibility (Product and/or Marketplace). This visibility will be applied to all documents. If you need specific visibility for a document, please consider uploading only that document. Then click **Next**
7. Add the team permission: Restricted (only Central Admin user will be abe to manage the document) / Shared (specific team permission: owner / read / edit / none). These permissions will be applied to all documents. If you need specific permissions for a document, please consider uploading only that document. Then click **Next**
8. Review your uploaded files. You can still return to any pages using the ellipsis menu on document tile. Once every thing looks good click **Save**

All documents should appear in the Document list view.

{{< alert title="Note" color="warning">}}
Cancelling the wizard will not remove the uploaded files. If you don't need the uploaded files anymore, consider [removing them](#delete-a-document).
{{< /alert >}}

## Edit a product (coming soon)

## Delete a document

This action is irrevocable and cannot be undone.

1. Navigate to *Document Library*
2. Select the checkbox in front of the document you want to delete then click  **Delete**.
3. A popup displays the selected document names as well as all affected references (Product / Marketplace). Type **DELETE** in the confirmation field.
4. click **Delete** to validate the action
