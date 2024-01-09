---
title: Add your environment
linkTitle: Add your environment
weight: 8
date: 2023-04-27
---
Within topology, environments are used to represent a group of objects discovered from a gateway, a repository, or anything manually added to the environment. These grouped objects (API services, webhooks, secrets) are displayed in Amplify. Environments are at the highest hierarchical level, and all objects are scoped within.

Learn how to create an environment to represent your API services and other discovered objects.

## Add your environment

1. Navigate to *Topology > Environments*.
2. Click **+ Environment**.

    ![Environment List Page](/Images/central/EnvironmentListPage.png)

    *The Add an Environment wizard is displayed*.

3. Add the following environment profile information and then click **Next**:

    * **Environment Name** - enter a display name for the environment in the WebUI.
    * **Environment Type** - select the type of API Gateway (Amplify API Gateway, Apigee X Gateway, AWS API Gateway, Azure API Gateway, GitHub, Istio) which Axway provides Connected agent support. The Custom/SDK option is for community supported agents or agents developed with the Agent SDK. The Manual option is for a manual sync environment that does not use an agent.
    * **Production** - select **Yes** if this environment will perform production processing or connects to a non-Axway gateway. The usage will count against your entitled quota.
    * **Governance** - select **Axway Manage** if the environment is hosted in Axway Managed Cloud.
    * **Description** - enter a brief description of the environment.
    * **Image** - Add an icon or image to be associated with the environment.

### Embedded AWS environment

1. Configure (these configuration steps are displayed only if there is Embedded agent support for the  environment type selected above):

    * **Agent Type** - select the type of agent that will connect to this API Gateway.
        * **Embedded** - Axway to host the agent.
        * **Remotely Hosted** - the customer to host the agent.
    * **Agent Configuration** - currently, only AWS API Gateway, Apigee X API Gateway and GitHub are supported as an Embedded agent.
         * **Enable Traceability Agent** - to optionally configure the Traceability Agent, select to enable the Embedded Traceability Agent setup. This requires an Access Log ARN in the CloudWatch settings below.
         * **AWS Region** - select or enter the AWS region if not in the list where the AWS API Gateway is located.
         * **AWS Authentication** - select the method of AWS authentication to use, AssumeRole or Access Key/Secret Key. For additional information on how to create either the AssumeRole (AWS IAM role) or AWS IAM user, see [Set up AWS for Embedded agents](/docs/connect_manage_environ/connect_aws_gateway/#embedded-aws-agent-setup).
         * **CloudWatch Settings** - the Embedded Traceability Agent, as well as AWS API Gateway itself, use the AWS CloudWatch. To enable the agent to retrieve API usages, an Access Log ARN must entered.

2. Embedded Discovery Agent Settings (these configuration steps are displayed only if there is Embedded agent support for the environment type):

    * **Frequency** - set how often the Embedded agent should check for changes to your API resources. Preferred is no frequency and triggered via a CI/CD pipeline. 30 minutes is the minimum value that can be set. For example, 30m = 30 minutes, 5h5m = 5 hours and 5 mins, 2d = 2 days. See [Triggering the agent to run discovery](/docs/connect_manage_environ/connected_agent_common_reference/embedded-agent-triggers/#triggering-the-agent-to-run-discovery).
    * **Initiate Immediate Discovery** - select to enable the Embedded agent to discover AWS API Gateway resources after environment creation and Embedded agent configuration are complete.
    * **Team Ownership** - select a team to set the ownership of all the discovered API service(s). Select "No Owner" to make the API service(s) only accessible by the Central Admin role.
    * **API Discovery Filter** - filter conditions for discovery of API services based on tags. See [Discover APIs for conditional expression samples](/docs/connect_manage_environ/connect_aws_gateway/#filtering-apis-to-be-discovered-1).
    * **Additional Tags** - in addition to any tags found on the gateway, tags defined here will be added to all API services created from this Discovery Agent.
    * **Exclude Tags** - if a tag listed here is on an API in the gateway, then it will not be added as a tag in the API service (only available for AWS API Gateway).

3. Embedded Traceability Agent Settings (these configuration steps are displayed only if there is Embedded agent support for the environment type and "Enable Traceability Agent" is selected in the Configure step):

    * **Frequency** - set how often the Embedded agent should run traffic collection. 30 minutes is the minimum value that can be set. For example, 30m = 30 minutes, 5h5m = 5 hours and 5 mins, 2d = 2 days.
    * **Sampling** - enter the percentage of full transaction details sent to the platform for display in Business and Consumer insights. The default value is 10 and the acceptable values are between 0 and 50.
    * **Redaction and Sanitization** - the redaction and sanitization settings to use when reporting transactions from the data plane.
        * **URL Path** - all URL paths, or path regular expressions, which may be reported to Central. ".*" will send all the path values. For example, if the agent finds a path of `https://somehost.com/pathof/my/api/uses/thispath` then `https://somehost.com/pathof/my/api/uses/thispath` will be sent to the platform.
        * **Query Arguments** - regular expressions applied to the query argument name and query argument value in the transactional data.
            * **Allowed Patterns** - query argument names that match any of these expressions will be reported. For example, "^id$" value will find all the query arguments with their key set to "id" and send to platform.
            * **Sanitization Patterns**
                * **Key Match** - query argument names that match any of these expressions will have the valueMatch sanitized.
                * **Value Match** - when the query argument name matches the keyMatch expression, the valueMatch expression is applied and replaces the matches in the query argument value with the masking character value.
               For example, to sanitize the whole value of "id" query argument, keyMatch:"^id$",valueMatch:".*" will return the query arguments with their key set to "id" and value set to {*}.
        * **Request Headers** - regular expressions applied to the request headers in the transactional data.
            * **Allowed Patterns** - request headers keys that match any of these expressions will be reported. For example, "authorization" value will find all the request headers that have "authorization" anywhere in the key and send to platform.
            * **Sanitization Patterns**
                * **Key Match** - request headers keys that match any of these expressions will have the valueMatch sanitized.
                * **Value Match** - when the header name matches the keyMatch expression, the valueMatch expression is applied and replaces the matches in the header value with the masking character value.
               For example, to sanitize the first five characters of any request header with a key that has "authorization" in it, keyMatch:"authorization",valueMatch:"^.{0,5}" will return the request headers with their "key" set to "authorization" and "value" set to a value whose first five characters replaced by the masking character value.
        * **Response Headers** - regular expressions applied to the response headers in the transactional data.
            * **Allowed Patterns** - response headers keys that match any of these expressions will be reported. For example, ".*" value will find all the response headers and send to platform.
            * **Sanitization Patterns**
                * **Key Match** - response headers keys that match any of these expressions will have the valueMatch sanitized.
                * **Value Match** - when the header name matches the keyMatch expression, the valueMatch expression is applied and replaces the matches in the header value with the masking character value.
               For example, to sanitize the response headers of the word "data" wherever it is found, in any header that starts with ‘content', keyMatch:"^content",valueMatch:"data", and maskingCharacter: ""{##}"" will return the response headers with their "key" starting with "content" and "value" set to a value in which the "data" occurrences are replaced by "{##}" masking character.
    * **Masking Characters** - the set of character(s) that will replace any value matched while sanitizing.

### Embedded Apigee X API Gateway environment

1. Configure (these configuration steps are displayed only if there is Embedded agent support for the  environment type selected above):

    * **Agent Type** - select the type of agent that will connect to this API Gateway.
        * **Embedded** - Axway to host the agent.
        * **Remotely Hosted**  the customer to host the agent.
    * **Agent Configuration** - currently, only AWS API Gateway, Apigee X API Gateway and GitHub are supported as as Embedded agents.
        * Apigee X API Gateway settings:
            * **Enable Traceability Agent** - to optionally configure the Traceability Agent, select to enable the Embedded Traceability Agent setup. This requires a Client Email address in the Apigee X Authentication.
            * **Project ID**: the Project ID for your Google Cloud Platform (GCP) project.
            * **Developer Email**: the email address of a developer, defined in Apigee, that will be given ownership of all applications.
            * **Client Email**: the email address, principal name, for the service account in GCP that has the role to discover Apigee resources.

2. Embedded Discovery Agent Settings (these configuration steps are displayed only if there is Embedded agent support for the environment type):

    * **Frequency** - set how often the Embedded agent should check for changes in your Apigee X API Gateway. Preferred is no frequency and triggered via a CI/CD pipeline. 30 minutes is the minimum value that can be set. For example, 30m = 30 minutes, 5h5m = 5 hours and 5 mins, 2d = 2 days. See [Triggering the agent to run discovery](/docs/connect_manage_environ/connect_aws_gateway/deploy-embedded-agents/#triggering-the-agent-to-run-discovery).
    * **Initiate Immediate Discovery** - select to enable the Embedded agent to discover Apigee X API Gateway resources after environment creation and Embedded agent configuration are complete.
    * **Team Ownership** - select a team to set the ownership of all the discovered API service(s). Select "No Owner" to make the API service(s) only accessible by the Central Admin role.
    * **Additional Tags** - in addition to any tags found on the gateway, tags defined here will be added to all API services created from this Discovery Agent.

3. Embedded Traceability Agent Settings (these configuration steps are displayed only if there is Embedded agent support for the environment type and "Enable Traceability Agent" is selected in the Configure step):

    * **Frequency** - set how often the Embedded agent should run traffic collection. 30 minutes is the minimum value that can be set. For example, 30m = 30 minutes, 5h5m = 5 hours and 5 mins, 2d = 2 days.

### Embedded GitHub environment

1. Configure (these configuration steps are displayed only if there is Embedded agent support for the environment type selected above):

    * **Agent Type** - the type of the agent that will connect to this API Gateway (defaulted to Embedded).
        * **Embedded** - Axway to host the agent.
    * **Agent Configuration** - currently, only AWS API Gateway, Apigee X API Gateway and GitHub are supported as an Embedded agent.
        * GitHub settings:
            * **Access Token** - the Personal Access Token (classic) for GitHub authentication. This allows us to discover API service specifications in design prior to deployment (e.g., to determine API Compliance).

2. Embedded Discovery Agent Settings (these configuration steps are displayed only if there is Embedded agent support for the environment type):

    * **Frequency** - set how often the Embedded agent should check for changes in your GitHub Gateway. Preferred is no frequency and triggered via a CI/CD pipeline. 30 minutes is the minimum value that can be set. For example, 30m = 30 minutes, 5h5m = 5 hours and 5 mins, 2d = 2 days. See [Triggering the agent to run discovery](/docs/connect_manage_environ/connect_aws_gateway/deploy-embedded-agents/#triggering-the-agent-to-run-discovery).
    * **Initiate Immediate Discovery** - select to enable the Embedded agent to discover GitHub Gateway resources after environment creation and Embedded agent configuration are complete.
    * **Team Ownership** - select a team to set the ownership of the discovered API service(s). Select "No Owner" to make the API service(s) only accessible by the Central Admin role.
    * **Paths** - values defined here are used to look into those paths to discover the API service(s).
    * **Filename Filters** - values defined here are used to filter the discovered API service(s) using filenames.
    * **GitHub Repository Name** - name of the GitHub Repository used to discover the API service(s).
    * **GitHub Repository Owner** - owner of the GitHub Repository used to discover the API service(s).
    * **Additional Tags** - in addition to any tags found on the gateway, tags defined here will be added to all API services created from this Discovery Agent.

### Compliance Profile

(Optional) Enable API Compliance Design Rules or Security Rule for environment.   For example, API Specification discovered on GitHub prior to deployment can be checked for Compliance to your organization's Center of Excellence.  Once enabled, you can select a default design or security ruleset to be used for all the API services associated with the environment. Custom rulesets can be uploaded from *Compliance Profiles* within the *Topology* section of the WebUI.

### Credential Preferences

(Optional) Select the duration of time when all credentials to Marketplace subscriptions are set to expire. The default is for credential to never expire, but you can select from 7 days, 30 days, 60 days, 90 days, or a configurable number of days (range from 7 to 365 days) for expiration.

### Stage Assignment

(Optional) Select one or more stages from the global list of stages to be associated with this environment. The default is for no stage defined for the environment. In addition to the selection of a stage, a stage can be assigned as the default for all newly discovered API services in the environment. Stages (e.g., Dev, Test, or Production) can be created from the *Stages* within the *Topology* section of the WebUI.

### Access Rights

(Optional) Select the team(s) the environment can be shared with. By default, an environment is not shared and only the Central Admin will have access to it. If you want your environment to be shared with a specific team, select a team owner, then select the teams you want to grant Read access rights. For each of the teams selected, each member of the shared team(s) selected will be able to access your environment with Read access rights. This allows you to share/enable access to a specific environment without granting access to all the environments owned by your current team.

1. Click **Next**.
2. Provide the Tags and Attribute details for the environment.
3. Click **Save** to create the environment.
