---
title: Edit your environment
linkTitle: Edit your environment
weight: 9
date: 2024-03-29
---

Learn how to edit an environment to represent your API services and other discovered objects.

## Edit your environment

1. Navigate to *Topology > Environments*.
2. From the list view, click on the environment to edit.
3. Click **Edit Environment**.

    ![Environment List Page](/Images/central/Environment_Details_Edit.png)

    *The Edit an Environment wizard is displayed*.

4. You can edit the Environment Name, Production setting, Governance setting, Description, Image, Configuration(AWS, Apigee X, Github), Compliance Profile, Credential Preferences, Stage Assignment, Access Rights, Tags, and Attributes.
5. Click **Save & Exit** at any time to save the changes that have been made.

### Embedded AWS environment

These configuration steps are displayed only if an Embedded AWS environment is selected.

1. Agent Configuration:

    * Click **Edit Agent Configuration**.
    * Edit the AWS Region, AWS Authentication, and Cloud Watch Settings.
        * If AssumeRole is selected you can edit the Role ARN and External ID.
        * If Access Key ID and Secret Access Key is selected you can edit the Access Key and Secret Key.
    * Click **Apply** to save changes or click **Cancel** to cancel changes.

2. Embedded Discovery Agent Settings:

    * Edit: Frequency, Team Ownership, API Discovery Filter, Additional tags, and Exclude Tags. Initiate Immediate Discovery can also be set.

3. Embedded Traceability Agent Settings:

    * If enabled, edit: Frequency, Sampling Percentage, URL Path Allowed Patterns, Query Arguments Allowed Patterns, Query Arguments Sanitization Patterns, Request Headers Allowed Patterns, Request Headers Sanitization Patterns, Response Headers Allowed Patterns, Response Headers Sanitization Patterns, and Masking Characters. Sample All Errors can also be set.

### Embedded Apigee X API Gateway environment

These configuration steps are displayed only if an Embedded Apigee X environment is selected.

1. Agent Configuration:

    * Click **Edit Agent Configuration**.
    * Edit Project ID, Developer Email Address, and Client Email Address. The Traceability Agent may be toggled on or off.
    * Click **Apply** to save changes or click **Cancel** to cancel changes.

2. Embedded Discovery Agent Settings:

    * Edit Frequency, Team Ownership, and Additional tags. Initiate Immediate Discovery can also be set.

3. Embedded Traceability Agent Settings:

    * If enabled, edit Frequency.

### Embedded GitHub environment

These configuration steps are displayed only if an Embedded Github environment is selected.

1. Agent Configuration:

    * Click **Edit Agent Configuration**.
    * Edit the Github Access Token.
    * Click **Apply** to save changes or click **Cancel** to cancel changes.

2. Embedded Discovery Agent Settings:

    * Edit: Frequency, Team Ownership, Paths, Filename Filters, Github Repository Name, Github Repository Owner, and Additional tags. Initiate Immediate Discovery can also be set.

### Optional configuration

{{< alert title="Note" color="primary" >}}The following items are optional but applicable to all environments.{{< /alert >}}

#### Compliance Profile

Enable API Compliance Design Rules or Security Rule for environment. For example, API Specification discovered on GitHub prior to deployment can be checked for Compliance to your organization's Center of Excellence. Once enabled, you can select a default design or security ruleset to be used for all the API services associated with the environment. Custom rulesets can be uploaded from *Compliance Profiles* within the *Topology* section of the WebUI.

#### Credential Preferences

Select the duration of time when all credentials to Marketplace subscriptions are set to expire.

#### Stage Assignment

Select one or more stages from the global list of stages to be associated with this environment. In addition to the selection of a stage, a stage can be assigned as the default for all newly discovered API services in the environment. Stages (e.g., Dev, Test, or Production) can be created from the *Stages* within the *Topology* section of the WebUI.

#### Access Rights

Select the team(s) the environment can be shared with. If you want your environment to be shared with a specific team, select a team owner, then select the teams you want to grant Read access rights. For each of the teams selected, each member of the shared team(s) selected will be able to access your environment with Read access rights. This allows you to share/enable access to a specific environment without granting access to all the environments owned by your current team.
