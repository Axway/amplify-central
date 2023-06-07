---
title: Manage your compliance with Axway Central CLI
linkTitle: Manage your compliance with Axway Central CLI
weight: 30
---
Mange your API Compliance with the Axway Central CLI.

## Before you start

* You will need to have the Axway Central CLI installed and with a Central Administrator role.  Refer to https://docs.axway.com/bundle/amplify-central/page/docs/integrate_with_central/cli_central/index.html

## Objectives

* Using the Axway Central Central CLI:

    * Learn how to enable/disable compliance validation.
    * Learn how to manually initiate a compliance lint job.
    * Learn how to view the results of the compliance validation.

### Step 1

Enable Design and Security compliance validation for an environment.  When this is enabled, compliance validation will be initiated for all API services in the selected environment. 

Example of viewing the environment resource for an envivronment named, test, with the get command:
~~~
axway centrea get environment test -o yaml
~~~

Example of the output of the envivronment resouec in yaml format:
~~~
Add environment resource example showing design and security compliance disabled
~~~

Example of changing the environment resource for an envivronment named, test, with the apply command:
~~~
axway central apply -f test.yaml
~~~

Example of the environment resource, test.yaml, which enables the design and securiy compliance:
~~~
Add environment resource example to enable design and security compliance here
~~~

### Step 2

Once compliance validation is enabled, a single API service can be compliance validated using the following Central CLI command: 

~~~
Add linting job resource example to enable design and security compliance here
~~~

### Step 3

To view the status and results of compliance validation, use the following Central CLI command:

~~~
Add an example of a completed linting job resource 
~~~
