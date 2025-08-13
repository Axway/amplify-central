---
title: Apigee Edge Discovery Agent
linkTitle: Apigee Edge Discovery Agent
weight: 120
---

The Discovery Agent finds deployed API Proxies in Apigee Edge and then sends them to API Central.

## Discovery modes

Two discovery modes can be used: Proxy and Product.

### Proxy

This is the default operating mode that discoveries API Proxies and attempts to match them to Specs

#### Proxy discovery

* Find all specs (unless disabled, see options below)
    * Parse all specs to determine endpoints within
    * Save info to cache
* Find all deployed API Proxies
    * Find the spec
        * If local specs path set, see options below, check for the spec there using the Proxy Name as the file name and search using the extensions
        * Proxy Revision has spec set, use it
        * Proxy Revision has association.json resource file, get path
            * Using path check to see if it is in the specs that were found by agent, use it
        * Using deployed URL path check for specs for match, use it
    * Check proxy for Key or Oauth policy for authentication
    * Create API Service
        * If the spec was found, use it in revision
        * If the spec was not found, create as unstructured, given option to do so is set (see below)
        * Attach appropriate Credential Request Definition based on policy in proxy

#### Proxy provisioning

* Managed application
    * Creates a new app on Apigee under the configured developer
* Access Request
    * Creates a new product, or uses existing, based off the APIGEE-Proxy and Central Plan combination
    * Associates the new product to any existing credentials on the application
* Credential
    * Creates a new credential on the app and associates all Access Requests products to it

### Product

Set the `APIGEE_DISCOVERYMODE` environment variable to `product` to use this mode.

#### Product discovery

* Find all specs
    * Parsing within the specs job is not necessary in this mode
    * Save info to cache
    * If using a local specs path, set the spec_local attribute with a value of the spec file name in that path
* Find all products defined
    * Using the `APIGEE_FILTER`, determine if the product should be discovered
    * Determine spec
        * If a spec_local attribute is set on the product, look for the spec in the local specs path
        * Using the product's name or display name, match it to a spec (case insensitive)
    * If a spec is found, create an API Service (create as unstructured when no spec is found, if option set)
        * Use product definition, add attributes to service
        * Download and attach spec file

#### Product provisioning

* Managed application
    * Creates a new app on Apigee under the configured developer
* Access Request
    * Creates a new product, or uses existing, using the product associated with the API Service as a template
    * Associates the new product to any existing credentials on the application
* Credential
    * Creates a new credential on the app and associates all Access Requests products to it
  
## Quota enforcement

In both modes, the provisioning process will set quota values on the created product when handling Access Requests. In order for Apigee to enforce quota based on the values set in the product, a Quota Enforcement Policy must be set on the deployed proxy.

Sample quota policy that may be added to the desired Proxies:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Quota async="false" continueOnError="false" enabled="true" name="impose-quota">
    <DisplayName>Impose Quota</DisplayName>
    <Synchronous>true</Synchronous>
    <Distributed>true</Distributed>
    <Identifier ref="developer.app.name"/>
    <Allow countRef="verifyapikey.Verify-API-Key-1.apiproduct.developer.quota.limit"/>
    <Interval ref="verifyapikey.Verify-API-Key-1.apiproduct.developer.quota.interval "/>
    <TimeUnit ref="verifyapikey.Verify-API-Key-1.apiproduct.developer.quota.timeunit"/>
</Quota>
```

Where:

* DisplayName - the name of the policy.
* Distributed and Synchronous - set to true to ensure the counter is updated and enforced in a distributed and synchronous manner. Setting to false may allow extra calls.
* Identifier - how the proxy will count usage across multiple apps, so each get their own quota.
* Allow - in this case, using the API Key policy gets the quota limit from the product definition.
* Interval - in this case, using the API Key policy gets the quota interval from the product definition.
* TimeUnit - in this case, using the API Key policy gets the quota time unit from the product definition.

## Discovery Agent variables

| Environment Variable                  | Description                                                                                                    | Default (if applicable)           |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| APIGEE_URL                            | The base Apigee URL for this agent to connect to                                                               | `https://api.enterprise.apigee.com` |
| APIGEE_APIVERSION                     | The version of the API for the agent to use                                                                    | v1                                |
| APIGEE_DATAURL                        | The base Apigee Data API URL for this agent to connect to                                                      | `https://apigee.com/dapi/api`       |
| APIGEE_ORGANIZATION                   | The Apigee organization name                                                                                   |                                   |
| APIGEE_ENVIRONMENT                    | Set to discover proxies that are deployed only in a specific environment, if not set discover all environments |                                   |
| APIGEE_DEVELOPERID                    | The Apigee developer, email, that will own all apps                                                            |                                   |
| APIGEE_DISCOVERYMODE                  | The mode in which the agent operates, discover proxies (proxy) or products (product)                           | proxy                             |
| APIGEE_FILTER                         | The tag filter to use against an Apigee product's attributes, only in product mode                             |                                   |
| APIGEE_CLONEATTRIBUTES                | Set this to true if the tags on a product should also be cloned on provisioning                                | false                             |
| APIGEE_INTERVAL_PROXY                 | The polling interval checking for API Proxy changes, only in proxy mode                                        | 30s (30 seconds), >=30s, <=5m     |
| APIGEE_INTERVAL_PRODUCT               | The polling interval checking for Product changes, only in product mode                                        | 30s (30 seconds), >=30s, <=5m     |
| APIGEE_INTERVAL_SPEC                  | The polling interval for checking for new Specs                                                                | 30m (30 minute), >=1m             |
| APIGEE_WORKERS_PROXY                  | The number of workers processing API Proxies, only in proxy mode                                               | 10                                |
| APIGEE_WORKERS_PRODUCT                | The number of workers processing Products, only in product mode                                                | 10                                |
| APIGEE_WORKERS_SPEC                   | The number of workers processing API Specs                                                                     | 20                                |
| APIGEE_AUTH_USERNAME                  | The Apigee account username/email address                                                                      |                                   |
| APIGEE_AUTH_PASSWORD                  | The Apigee account password                                                                                    |                                   |
| APIGEE_AUTH_USEBASICAUTH              | Set this to true to have the Apigee API client use HTTP Basic Authentication                                   | false                             |
| APIGEE_AUTH_URL                       | The IDP URL                                                                                                    | `https://login.apigee.com`          |
| APIGEE_AUTH_SERVERUSERNAME            | The IDP username for requesting tokens                                                                         | edgecli                           |
| APIGEE_AUTH_SERVERPASSWORD            | The IDP password for requesting tokens                                                                         | edgeclisecret                     |
| APIGEE_SPECCONFIG_MATCHONURL          | Set to false to skip parsing specs for URLs and matching to computed proxy url for spec association            | true                              |
| APIGEE_SPECCONFIG_LOCALPATH           | Path to a local directory that contains the spec files                                                         |                                   |
| APIGEE_SPECCONFIG_EXTENSIONS          | Comma separated list of file extensions that the agent will look for spec in the local path for                | json,yaml,yml                     |
| APIGEE_SPECCONFIG_UNSTRUCTURED        | Set to true to enable discovering APIs that have no associated spec                                            | false                             |
| APIGEE_SPECCONFIG_DISABLEPOLLFORSPECS | Set to true to disable polling apigee for specs, rely on the local directory or spec URLs                      | false                             |
