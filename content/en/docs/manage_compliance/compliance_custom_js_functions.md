---
title: Custom JavaScript Functions
linkTitle: Custom JavaScript Functions
weight: 40
---
Manage custom linting JavaScript functions to be used for Web API compliance.

## Amplify compliance limitations

By default, Amplify’s *Compliance Profile* WebUI and CLI applies limitations on what kind of custom linting rulesets you can submit:

* Cannot submit JavaScript rulesets or functions.
    * Rulesets are limited to JSON and YAML files.
* Amplify custom ruleset cannot extend another Amplify custom ruleset.
* Amplify custom ruleset cannot reference another file via an unapproved URL.
    * For security reasons, Amplify blocks all URLs except for what is on its approved URL list.

## Bypass limitations with Amplify Extension repository

In order to bypass the above limitations, such as the ability to use custom JavaScript functions,
you'll need to request tech-support for an "Amplify Extension" GitLab repository. This repository is used
to host custom rulesets and JavaScript functions to be used by Amplfiy.

Please submit request to [support.axway.com](https://support.axway.com) and provide your Orgnaization ID
and a list of email contacts to be given access to this repository.

## Amplify Extension restrictions

The Amplify Extension GitLab repository will have the following restrictions applied to it.

* Ruleset files are not allowed to reference other rulesets via unapproved URLs.
    * A URL to the repository’s main branch is on Amplify’s approved list.
* JavaScript files are not allowed to access the network or filesystem.
* JavaScript files cannot be obfuscated.
* JavaScript can only import/require-in modules that are available to the Spectral CLI.

## Custom rulesets and functions

Your custom Spectral ruleset files must be placed in the repository's `./api-linting` folder. Rulesets can be
written in JSON, YAML, and JavaScript file formats. Your custom Spectral JavaScript linting functions must be
added to the repository's `./api-linting/functions` subdirectory.
See the [Spectral documentation](https://docs.stoplight.io/docs/spectral/a781e290eb9f9-custom-functions)
on how to write Custom Functions.

You can test your custom rulesets and files in the `./api-linting` folder via the Spectral CLI. For example:

```
spectral lint --ruleset example.yaml ./tests/openapi-v2.yaml
```

Your file changes to the Amplify Extension repository must be submitted via a GitLab merge request, which can only be merged by Axway after a review process.

{{< alert title="Note" color="primary" >}}Axway reserves the right to not approve a merge request if it does not comply with the above [Amplify Extension restrictions](#amplify-extension-restrictions).{{< /alert >}}

## Access custom ruleset in Amplify

To use a custom ruleset in the Amplify Extension repository, you must create a separate ruleset file that links to it,
as shown below. Replace `<your-repo-name>` with the name of your Amplify Extension repository and the `example.yaml` file
name with the one you want to use in Amplify.

{{< alert title="Tip" color="secondary" >}}In GitLab, click on a file
and then click **Open Raw** to get the raw file URL.{{< /alert >}}

```yaml
extends: ["https://git-ext.ecd.axway.com/amplify-extension/<your-repo-name>/-/raw/main/api-linting/example.yaml"]
```

Add the above ruleset file to Amplify:

1. Log in to <https://platform.axway.com> as an Administrator.
2. Go to *Central > Topology > Compliance Profiles*.
3. Click **Upload Ruleset**.
4. Drag and drop the above "link" ruleset file into the **Upload File** box.
5. Finish the configuration in the WebUI and click **Upload**.
6. Edit an Environment and select the ruleset you just set up.

Your new Amplify ruleset that links to the custom ruleset in the Amplify Extension repository
can now be used in Amplify. Since it links via a URL, you don’t have to update
Amplify when you make changes in the Amplify Extension repository.
