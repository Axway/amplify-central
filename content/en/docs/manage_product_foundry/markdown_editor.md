---
title: Markdown Editor
linkTitle: Markdown Editor
weight: 80
---

General help about the Markdown editor.

## Definition

The Markdown editor is a standard markdown content creator with additional features used to create Engage documentation.

The screen includes:

* **Toolbar helper** - allows some pre-defined actions
    * Most of the icons are standard and can be found in any text editor
    * The image icon opens a popup to help select an image (from a URL or locally stored)
    * The eye icon renders the markdown content to visually see how the content will look
    * The toggle side by side displays the content in real time to see how it looks
    * The full screen mode displays the editor in full screen, then the collapse icon exits full screen mode
* **Editor** - allows you to enter the Markdown text

The editor supports standard Markdown tags. Refer to [Markdown basic syntax](https://www.markdownguide.org/basic-syntax/).

Since it is not always easy to render Markdown content correctly, these additional HTML tags are also supported:

|HTML Tag name | Definition | Toolbar Helper available |
|--------------|------------|--------|
| h1 to h6 | Header tags from largest (h1) to smallest (h6) | Yes |
| hr | Insert a horizontal line | Yes |
| br | Insert a line break | No |
| wbr | Position within the text which is treated as a line break by the browser| |
| p | Define a paragraph | No |
| mark | Highlight text in a paragraph | No |
| b | Bold text | Yes |
| i | Italicize text | Yes |
| strong | Indicate strong importance (usually bold) | No |
| em | Emphasize text | No |
| small | Display smaller text | No |
| sub | Subscript text | No |
| sup | Superscript text | No |
| del | Strike through text | Yes |
| ins | Underlined text | No |
| code | Display text in a monospace font | Yes |
| pre | Preserve spacing and formatting exactly as typed | No |
| abbr | Define an acronym or abbreviation | No |
| bdo | Override the current text direction | No |
| blockquote | A section that is quoted from another source | Yes |
| cite | Define the title of a work | No |
| dfn | Specify a term that is going to be defined | No |
| kbd | Indicate keyboard input | No |
| q | Indicate short quotation | No |
| s | Define incorrect text | No |
| time | Show a specific time | No |
| var | Define a variable | No |
| input | An input control | No |
| img | Embed an image | Yes |
| figure | Self-contained content | No |
| figcaption | Caption of figure element | No |
| a | A hyperlink | Yes |
| ul | Unordered list | Yes |
| ol | Ordered list | Yes |
| li | A list item | No |
| dl | A description list | No |
| dt | Description list element | No |
| dd | Description list element description | No |
| table | Table container | Yes |
| thead | Table head | No |
| tbody | Table body | No |
| tfoot | Table foot | No |
| tr | Table row | No |
| th | Table header cell | No |
| td | Table data cell | No|
| caption | Caption of the table | No |
| span | Inline container | No |
| strike | strike or line through Text | No |
| div | Division marker | No |
| ruby | Ruby annotation | No |
| rt | Explain the Ruby annotation | No |
| rp | Parenthesis around ruby text | No |
| details | Widget that can be open/close | No |
| samp | Define the sample output text from a computer program | No |
| summary | Summary of an element | No |

### Curation

Any other HTML tags not listed above will be blocked.

Regarding Javascript, their action will be ineffective.

## Where is it used?

The Markdown editor is used in:

* Product documentation
* Document library
