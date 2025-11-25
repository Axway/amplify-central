---
title: Add an API service
linkTitle: Add an API service
weight: 20
date: 2021-02-09
---
Create an API service asset on your environment.

## Add an API service

Follow these steps to create an API service in your environment:

1. From the details page of your environment, click the plus (+) button located at the top right of the **Activity Dashboard** section.
2. Click **Upload a file** or **Fetch from URL** to define the API specification.
3. Confirm the information about your API service:
    * **Title**: Enter a descriptive name. The title is searchable, but it does not need to be unique.
    * **Logical Name**: Enter an ID for the service. The ID must be unique within the scope of the environment. The logical name is referenced in any dependencies of the API service.
    * **Description**: Limited to 1000 characters.
    * **Tags**: Used to group assets, making it easier and faster to find them.
    * **Attributes**: Key and value pairs used for extending functionality and integrations with third-party systems.
    * **API Service Image**: A visual aid when looking through the list of API services.
    * **Server Overview**: To be displayed on the Marketplace resources tab as the Overview.
    * **Classification**: Specify the classification level of the server.
    * **Source Code Repository**: Define the location of the source code.
4. Click **Save**.

To learn how to add an API service using the Axway Central CLI, see [Register APIs using the CLI](/docs/integrate_with_central/cli_central/cli_register_api/).

### Import an API service specification

You can define the API service specification by uploading a file or by fetching the specification from a URL.

The following table shows the accepted file extensions listed by accepted file type versus service specification type:

|           |   OAS2   |           |   OAS3   |           | Protobuf |           |   WSDL   |           |  GraphQL  |           |  ASync API  |           |
| --------- | :------: | :-------: | :------: | :-------: | :------: | :-------: | :------: | :-------: | :-------: | :-------: | :---------: | :-------: |
| File Type | Expected | Supported | Expected | Supported | Expected | Supported | Expected | Supported | Expected  | Supported | Expected    | Supported |
| .json     |   YES    |    YES    |   YES    |    YES    |    NO    |    NO     |    NO    |    NO     |    NO     |    NO     |    YES      |    YES    |
| .yml/yaml |   YES    |    NO     |   YES    |    NO     |    NO    |    NO     |    NO    |    NO     |    NO     |    NO     |    YES      |    YES    |
| .wsdl     |    NO    |    NO     |    NO    |    NO     |    NO    |    NO     |   YES    |    YES    |    NO     |    NO     |    NO       |    NO     |
| .proto    |    NO    |    NO     |    NO    |    NO     |   YES    |    YES    |    NO    |    NO     |    NO     |    NO     |    NO       |    NO     |
| .xml      |    NO    |    NO     |    NO    |    NO     |    NO    |    NO     |    NO    |    YES    |    NO     |    NO     |    NO       |    NO     |
| .graphql  |    NO    |    NO     |    NO    |    NO     |    NO    |    NO     |    NO    |    NO     |    YES    |    YES    |    NO       |    NO     |

You can assign any uploaded specification file as an unstructured specification type. This is useful if your specification type is not officially supported.

On upload, the file is automatically parsed and the recommended **Specification Type** is set. Optionally, if the recommended specification type is incorrect, you can override the selection by choosing a different specification type.

{{< alert title="Note" color="primary" >}}
Supported version:

* OAS2 API: 2.x
* OAS3 API: 3.0.x, 3.1.0
* ASync API: 2.x, 3.0.0
{{< /alert >}}

### Errors and debugging

In the event of an error while saving the API service, the form page will show an error box explaining what caused the error. The error may contain references to objects only found when using the CLI or API directly. In this case, please refer to the [Axway CLI](/docs/integrate_with_central/cli_central/cli_register_api) documentation.
