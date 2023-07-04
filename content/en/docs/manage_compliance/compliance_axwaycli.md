---
title: Manage your compliance with Axway Central CLI
linkTitle: Manage your compliance with Axway Central CLI
weight: 30
---
Mange your API Compliance with the Axway Central CLI.

## Before you Start

* You will need the "API Compliance" entitlement enabled for your organization.
* You will need "Central Administrator" role access rights.
* You will need to have the Axway Central CLI installed.  See: [Get started with Axway Central CLI](https://docs.axway.com/bundle/amplify-central/page/docs/integrate_with_central/cli_central/index.html)

## Enable Automatic Compliance Validation

An environment can be configured to automatically lint all of its pre-existing API services, as well as automatically lint newly discovered API service revisions. Linting will only be applied to API services that are supported by the selected linting rulesets. The default linting rulesets support API spec types `OAS2`, `OAS3`, and `AsyncAPI`.

First, you should fetch the Environment you want to apply API compliance validation to with the following command. Replace the `<my-env>` part with the name of the Environment you want to configure.

~~~
axway central get environment <my-env> -o yaml > my-env.yaml
~~~

Open the above created `my-env.yaml` file and insert the `compliance:` section shown below. This configures it to use the "default" linting rulesets built into the system. (You can also set this up to use your own custom rulesets as documented down below.)

~~~yaml
group: management
apiVersion: v1alpha1
kind: Environment
name: <my-env>
spec:
  # Add the following "compliance" section to enable design/securtiy linting.
  # Set these properties to an APISpecLintingRuleset name to be linted with.
  compliance:
    design: default-design-ruleset
    security: default-security-ruleset
~~~

Apply the changes you made to the above `my-env.yaml` file with the below command.

~~~
axway central apply -f my-env.yaml
~~~

Once you've entered the above, the system will automatically lint the newest `APIServiceRevision` belonging to every `APIService` for that environment. Also note that if you remove the above compliance properties, then that will disable automatic linting for that environment.

## Viewing API Compliance Details

Once compliance validation is enabled for an environment, each `APIService` will have a `compliance` section added to it which provides a summary of the linting results for the newest `APIServiceRevision` that was analyzed.

You can fetch all API services via the following command line. Replace the `<my-env>` part with the name of the environment you've configured for API compliance.

~~~
axway central get apis -s <my-env> -o yaml
~~~

Here is an example of compliance info that will be attached to an API service.

~~~yaml
group: management
apiVersion: v1alpha1
kind: APIService
name: <my-service>
metadata:
  scope:
    kind: Environment
    name: <my-env>
# The "compliance" section only exists if Environment is configured for API compliance.
compliance:
  design:
    # Current APISpecLintingJob state such as Pending, Succeeded, Failed, Canceled, or NotApplicable.
    state: Succeeded
    # This "result" section will only exist if above "state" has been set to "Succeeded".
    result:
      grade: A
      hintCount: 0
      infoCount: 0
      errorCount: 0
      warningCount: 0
    # The name of the APISpecLintingRuleset that defines the linting rules.
    ruleset: default-design-ruleset
    # The name of the APISpecLintingJob resource that the above summarized result was copied from.
    # This job provides the full "details" of every error/warning in the API spec file.
    apiSpecLintingJob: <my-design-linting-job>
    # The name of the APIServiceRevision whose API spec was linted.
    apiServiceRevision: <my-service-version-1>
  security:
    state: Succeeded
    result:
      grade: F
      hintCount: 0
      infoCount: 0
      errorCount: 1
      warningCount: 0
    ruleset: default-security-ruleset
    apiSpecLintingJob: <my-security-linting-job>
    apiServiceRevision: <my-service-version-1>
~~~

Note that the above only provides a "summary" of an API's compliance. To get the full details for every line in the API spec file where errors and warnings occur, you must fetch the `APISpecLintingJob` associated with that API service. You can fetch a linting job as shown below, replacing the `<my-linting-job>` with the above output's `apiSpecLintingJob` property value.

~~~
axway central get apispeclintingjob <my-linting-job> -s <my-env> -o yaml
~~~

Here is an example of an `APISpecLintingJob` resource that has succeeded in linting for "security". (Note that a linting job provides the results for either "design" or "security", not both. That means one linting job will exist for "design" and another linting job will exist for "security".)

~~~yaml
group: management
apiVersion: v1
kind: APISpecLintingJob
name: <my-linting-job>
metadata:
  scope:
    kind: Environment
    name: <my-env>
spec:
  # Name of the APIServcieRevision provding the API spec to be linted.
  apiServiceRevision: <my-service-version-1>
  # Name of the APISpecLintRuleset providing the linting rules.
  apiSpecLintingRuleset: default-security-ruleset
# State can be set to Pending, Succeeded, Failed, Canceled, or NotApplicable.
state:
  name: Succeeded
  timestamp: 2023-05-29T16:59:34.281+0000
# The "result" section will only exist if "state" is set to "Succeeded".
result:
  summary:
    grade: F
    hintCount: 0
    infoCount: 0
    errorCount: 1
    warningCount: 0
  # Details provides an array of every issue found in API spec file.
  details:
    - path: /pets
      rule: security-must-be-enforced-for-unsafe-endpoints
      message: Security must be applied to "write" endpoints
      location:
        line: 41
        character: 9
      severity: error
  apiSpecLintingRulesetRevision: 0
# Archived flag will be set "true" if APIServiceRevision has been re-linted,
# meaning a new APISpecLintingJob is replacing the old job's results.
archived: false
~~~

## Manual Compliance Validation

You can start a manual linting job by creating a new `APISpecLintingJob` resource via the CLI. Note that you do not have to enable compliance linting for an environment to do this, however the consequence of this is the summary of the results won't be copied to the `APIService` for easy access. You'll have to fetch the `APISpecLintingJob` resource that you just created to see the compliance results.

Create a YAML file with the below information. Replace the `<my-service-version>` part with the name of the `APIServiceRevision` to be linted and the `<my-env>` part with the environment that owns that API service.

~~~yaml
group: management
apiVersion: v1
kind: APISpecLintingJob
metadata:
  scope:
    kind: Environment
    name: <my-env>
spec:
  # Name of the APIServcieRevision whose API spec will be linted.
  apiServiceRevision: <my-service-version>
  # Name of the APISpecLintRuleset providing the linting rules.
  apiSpecLintingRuleset: default-security-ruleset
~~~

You can then create the above `APIServiceRevision` with the CLI as follows. Replace the `<PathToYamlFile>` with the name of the file storing the above YAML settings. Once created, the system will automatically set its "state" to "Pending" and queue the job to perform the linting service. The CLI will also return the auto-generated name for this new job so that you can fetch its status via the CLI.

~~~
axway central create -f <PathToYamlFile>
~~~

Next, you'll want to fetch the job created above to see if the job has been completed and to get the compliacne results. Replace the `<my-ling-job>` part with the name returned by the above command.

~~~
axway central get apispeclintingjob <my-linting-job> -s <my-env> -o yaml
~~~

## Custom Linting Ruleset

You can create your own custom Spectral linting rules by following the instructions at the below website.
<https://docs.stoplight.io/docs/spectral>

Here is an example of a Spectral "design" ruleset file that applies to `OAS2` and `OAS3` API specs only.

~~~yaml
rules:
  title-present:
    description: The title needs to be present
    given: $.info
    formats: ["oas2","oas3"]
    severity: error
    then:
      field: title
      function: truthy
  openapi-version:
    description: Open API 3 version must be of version 3.0.[3-9]
    message: "Open API v3 spec must be at least version 3.0.[3-9]"
    given: $.openapi
    severity: error
    formats: ["oas2","oas3"]
    then:
      function: pattern
      functionOptions:
        match: ^3.0.[3-9]?$
~~~

You can add your own custom rules to the system by creating a new `APISpecLintingRuleset` resource which contains the above file. You'll first need to base64 the above file, which you can do on Mac/Linux with the following command line.

~~~
base64 --input <PathToRulesetFile> -o <PathToBase64OutputFile>
~~~

You would then create a new YAML or JSON file as shown below. The base64 output of the Spectral rules file would be copied to the `value` property below.

~~~yaml
group: management
apiVersion: v1
kind: APISpecLintingRuleset
spec:
  definition:
    # Can be set to "design" or "security".
    lintingType: design
    # Array of API spec types supported by ruleset file such as "oas2", "oas3", and/or "asyncapi".
    apiTypes:
      - oas2
      - oas3
    # Mime-type of ruleset file. Set to "application/json" or "application/yaml".
    contentType: application/yaml
    # Name of the custom ruleset file. Displayed in the website UI for download purposes.
    fileName: my-design-ruleset.yaml
    # Base64 of the custom Spectral ruleset file.
    value: >-
      cnVsZXM6CiAgdGl0bGUtcHJlc2VudDoKICAgIGRlc2NyaXB0aW9uOiBUaGUgdGl0bGUgbmVlZHMgdG8gYmUgcHJlc2VudAogICAgZ2l2ZW46ICQuaW5mbwogICAgZm9ybWF0czogWyJvYXMyIiwib2FzMyJdCiAgICBzZXZlcml0eTogZXJyb3IKICAgIHRoZW46CiAgICAgIGZpZWxkOiB0aXRsZQogICAgICBmdW5jdGlvbjogdHJ1dGh5CiAgb3BlbmFwaS12ZXJzaW9uOgogICAgZGVzY3JpcHRpb246IE9wZW4gQVBJIDMgdmVyc2lvbiBtdXN0IGJlIG9mIHZlcnNpb24gMy4wLlszLTldCiAgICBtZXNzYWdlOiAiT3BlbiBBUEkgdjMgc3BlYyBtdXN0IGJlIGF0IGxlYXN0IHZlcnNpb24gMy4wLlszLTldIgogICAgZ2l2ZW46ICQub3BlbmFwaQogICAgc2V2ZXJpdHk6IGVycm9yCiAgICBmb3JtYXRzOiBbIm9hczIiLCJvYXMzIl0KICAgIHRoZW46CiAgICAgIGZ1bmN0aW9uOiBwYXR0ZXJuCiAgICAgIGZ1bmN0aW9uT3B0aW9uczoKICAgICAgICBtYXRjaDogXjMuMC5bMy05XT8k
~~~

You can create the above `APISpecLintingRuleset` via the CLI as follows.

~~~
axway central create -f <PathToAboveYamlFile>
~~~
