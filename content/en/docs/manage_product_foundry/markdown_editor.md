---
title: Markdown Editor
linkTitle: Markdown Editor
weight: 80
---

General help about the Markdown editor.

## Definition

The Markdown editor is a standard markdown content creator with additional features used to create Engage documentation.

The screen is divided in 2 parts:

* the **toolbar helper** allowing some pre-defined actions
    * most of the icons are the standard one that can be found in any text editor
    * the image icon opens a popup to help selecting an image (from an url or locally stored)
    * the eye icon allow to render the markdown content to visually see how the content will look like
    * the toggle side by side allow to see in real time how the content will look like
    * the full screen mode allow to see the editor in full screen, then the collapse icon allow to exit full screen mode
* the **editor** itself allowing to enter the Markdown text

The editor supports standard markdown tags. Refer to [Markdown basic syntax](https://www.markdownguide.org/basic-syntax/)

In addition, since it is not always easy to render correctly Markdown content, some HTML tags are also supported:

|HTML Tag name | Definition | Toolbar Helper available |
|--------------|------------|--------|
| h1 to h6 | Header tags from largest (h1) to smallest (h6) | Yes |
| hr | Inserts a horizontal line | Yes |
| br | Inserts a line break | No |
| wbr | Position within the text which is treated as a line break by the browser| |
| p | Defines a paragraph | No |
| mark | Highlight text in a paragraph | No |
| b | Makes text bold | Yes |
| i | Makes text italic | Yes |
| strong | Indicates strong importance (usually bold) | No |
| em | Emphasizes text | No |
| small | Displays smaller text | No |
| sub | Subscript text | No |
| sup | Superscript text | No |
| del | Strike through text | Yes |
| ins | Underlined text | No |
| code | Displays text in a monospace font | Yes |
| pre | Preserves spacing and formatting exactly as typed | No |
| abbr | Defines an acronym or abbreviation | No |
| bdo | Overrides the current text direction | No |
| blockquote | A section that is quoted from another source | Yes |
| cite | Defines the title of a work | No |
| dfn | Specifies a term that is going to be defined | No |
| kbd | Indicates keyboard input | No |
| q | Indicates short quotation | No |
| s | Defines incorrect text | No |
| time | Shows a specific time | No |
| var | Defines a variable | No |
| input | An input control | No |
| img | Embeds an image | Yes |
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
| span | inline container | No |
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

Regarding Javascript, their action will be ineffective

## Where is it used?

The markdown editor is used in 2 places:

* product documentation
* document library