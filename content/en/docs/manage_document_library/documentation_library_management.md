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

* Upload a document
* Make a document available (product document / Marketplace settings)
* Restrict the document access
* Edit a document (coming soon)
* Delete a document

## View documents

To view documents, navigate to *Document Library*.

View the following information for all documents:

* Document Name - the name of the document and the current document version
* Description - the document description (may be truncated after 50 characters)
* Access - the document visibility (Public / Protected)
* Referenced - the number of times the document is referenced (product document / Marketplace settings)
* Type - the document type (plain text format - TXT / Portable Document Format - PDF / Word documents - DOC, DOCX / Markdown - MD / PowerPoint - PPTX / Excel - XLSX)
* Modified - the last time the document was updated

You can also filter the documents by types using the **Filter by:** controls. Search by document name with the search bar.

## View document details

To view a document's details:

1. Navigate to *Document Library*.
2. Click on a document name in the list view to open the Document Details:

    * Document name - the display name for the product in the WebUI
    * Document logical name - the internal name used to access the document
    * Document type - TXT / PDF / DOC / DOCX / MD / PPTX / XLSX
    * Updated On - the last update date
    * Created On - the creation date
    * Document thumbnail - preview of the document's first page (only available for PDF documents)
    * Document file name - the file name associated to the document
    * Document description - the document description that helps identify the document content
    * Referenced Resources - the resources that are using the document (product and/or Marketplace) and the statuses of the resources (Available / Used)

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

## Create a document from existing files

Only PDF, MD, DOC, DOCX, XLSX and PPTX files are accepted. All files larger than 5MB will be rejected.

To create a document:

1. Navigate to *Document Library*.
2. Click **+ Add New Document** to open the documents wizard.
3. Select the method **Upload Document(s)**, and either use the **BROWSE FILES** button or drop file(s) in the drop area. The successfully uploaded file is displayed in the Manage Uploads area. If a file does not respect the limitations, it will appear in an error message area.
4. Check the box in front of the uploaded file to edit the file details: Document name, Description, Version. Once your document information is correct, click **Next**.
5. Add your document visibility: Product and/or Marketplace. This visibility will be applied to all documents. If you need specific visibility for a document, consider uploading only that document. Then click **Next**.
6. Add the team permissions: Restricted (only the Central Admin user can manage the document) / Shared (specific team permission: owner / read / edit / none). These permissions will be applied to all documents. If you need specific permissions for a document, consider uploading only that document. Then click **Next**.
7. Review your uploaded files. Click **Prev** to return to any of the previous pages. Once everything looks good, click **Save**.

All documents are now displayed in the Document Library list view.

{{< alert title="Note" color="primary" >}}
Cancelling the wizard will not remove the uploaded files. If you don't need an uploaded file, [remove it](#delete-a-document).
{{< /alert >}}

## Edit a document

All document library document are editable.

To edit a document:

1. Navigate to *Document Library*.
2. Find the document you want to edit
3. Click the document name to open the document details
4. Click the Pencil icon to enter the document wizard where you can change things as you see fit. The only restriction is that you are not able to change the document type.
5. Click **Save & Exit** when you are done with your modification

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

If your Document can be seen on the Marketplace (either because used in a menu or in product documentation), it is possible to add their translation so that they can be viewed differently based on the Marketplace language settings.

Adding the translation means you have your original copy of the document and as many additional copies in the languages you need. For instance, my original copy is in French, I can link English copy, German copy and Portuguese copy as I see the need.

{{< alert title="Note" color="warning" >}}
The translation will follow the original document type. If my original document is a file, all translations need to be a file as well. Same goes for Markdown and URL document type.
{{< /alert >}}

By default 4 languages are available : English / French / German / Brazilian Portuguese

You will need 2 things:

* the Document default language
* the Document translation languages

The feature is not yet available from the UI, but you can use the CLI or API to add the Document available languages. Refer to [API Server multi languages support](/docs/integrate_with-central/api_server#multi-languages-support) and the [sample data](/docs/integrate_with_central/samples/sample_start_to_end#scenario-description) where there is an example of Document Library document using 2 languages.