---
title: Manage an Axway SaaS Gateway API proxy
linkTitle: Manage an Axway SaaS Gateway API proxy
weight: 100
date: 2020-06-01T00:00:00.000Z
description: Learn how your DevOps service can use Axway Central CLI to manage your Axway SaaS Gateway API proxies.
---

## Before you start

* If you are applying security to your Axway SaaS Gateway API proxy, you will need a basic understanding of Basic Authentication ([RFC 7617](https://tools.ietf.org/html/rfc7617)).
* You must [authorize your DevOps service to use the DevOps API](/docs/central/cli_central/cli_install).

## Objectives

Learn how to use Axway Central CLI to manage your Amplify SaaS Gateway API proxies.

* Create a YAML configuration file representing your API proxy
* Create the API proxy using Axway Central CLI
* Promote the API proxy using Axway Central CLI
* Test the API proxy using Amplify Central UI or a REST client

## Create the API configuration file

Amplify Central DevOps APIs require a YAML configuration file describing your API (the service you are proxying through Amplify Central) in terms of the API name, base path, Swagger, client authentication, and so on. For example:

```
version: v1 # Version of the file format
apiVersion: v1 # This version ensures backward compatibility and would not mandate a frequent update from a client side
proxy:
    name: 'Musical Instruments secured' # name of the proxy
    basePath: /api/v1 # base path of the proxy
    swagger: 'https://ec062a054a2977120b7e721801edb38ca24dfbb3.cloudapp-enterprise.appcelerator.com/apidoc/swagger.json' # optional. Swagger url of the proxy
    policies:
        clientAuth:
            type: api-key # type of client authentication policy: can be pass-through, api-key, jwt-token, oauth
            app: 'Sample App' # optional if policy type is pass-through
        backendAuth: # backend authentication is optional. If not specified, then no backend authentication will be enabled
            type: auth-http-basic # type of backend authentication policy: only auth-http-basic is supported now
            username: Joe # required
            password: changeme # it's allowed to be empty
    tags: ['musical', 'instruments'] # optional
    team: # the team which the proxy will be assigned to.
        name: 'Default Team'
```

If you specify a client authentication policy other than `pass-through` (for example, `api-key`, `jwt-token`, or `oauth`), then you must also specify the client `app`. If the app does not already exist in Amplify Central, it is created.

The `oauth` type has additional OAuth specific properties that can also be added. These include flows, authorizationUrl, tokenUrl, and scopes. These additional properties map directly to the [Swagger 2.0 OAuth security scheme](https://swagger.io/docs/specification/2-0/authentication/).

When scopes are specified, they will be applied to the proxy at the base level. This means that any token used to call the proxy methods must contain every scope. There are no method level scopes at this time. The remaining properties are used to inform the swagger produced in the Unified Catalog and direct the consumer to where tokens can be requested.

`backendAuth` is an optional field. If it is not specified, then no back-end authentication is enabled. If you specify `auth-http-basic` as the back-end authentication policy, the password can be empty.

You can specify additional applications and their profiles in the `apps` section of the proxy. The `app` field under `clientAuth` can be omitted. If you specify `api-key` as the client authentication policy, the apps are created, if needed, and are allowed to consume the proxy. For example:

```
version: v1 # Version of the file format
apiVersion: v1 # This version ensures backward compatibility and would not mandate a frequent update from a client side
proxy:
    name: 'Musical Instruments secured' # name of the proxy
    basePath: /api/v1 # base path of the proxy
    swagger: 'https://ec062a054a2977120b7e721801edb38ca24dfbb3.cloudapp-enterprise.appcelerator.com/apidoc/swagger.json' # optional. Swagger url of the proxy
    policies:
        clientAuth:
            type: api-key # type of client authentication policy: can be pass-through, api-key, jwt-token, or oauth
            app: 'Sample App' # optional
        backendAuth: # backend authentication is optional. If not specified, then no backend authentication will be enabled
            type: auth-http-basic # type of backend authentication policy: only auth-http-basic is supported now
            username: Joe # required
            password: changeme # it's allowed to be empty
    tags: ['musical', 'instruments'] # optional
    apps:
     - name: 'Second Sample App' # this app will be allowed to consume the proxy
     - name: 'Third Sample App' # this app will be allowed to consume the proxy
    team: # the team which the proxy will be assigned to.
        name: 'Default Team'
```

If you set `oauth` as the client authentication policy, you must specify `clientId`, `issuer`, and `metadataPath` in the application profile to allow this application to consume your proxy. The type of client authentication policy specified under `clientApp` must match the type of application profile. If scopes are specified, any token request for the client must request all of the scopes. For example:

```
version: v1 # Version of the file format
apiVersion: v1 # This version ensures backward compatibility and would not mandate a frequent update from a client side
proxy:
    name: 'Musical Instruments secured' # name of the proxy
    basePath: /api/v1 # base path of the proxy
    swagger: 'https://ec062a054a2977120b7e721801edb38ca24dfbb3.cloudapp-enterprise.appcelerator.com/apidoc/swagger.json'
    policies:
        clientAuth:
            type: oauth
            app: 'Sample App'
            flows: # Used in Unified Catalog swagger
              - 'accessCode'
            authorizationUrl: 'https://dev-693892.okta.com/oauth2/aus1a4kh7lXPKhjFA357/v1/authorize' # Used in Unified Catalog swagger
            tokenUrl: 'https://dev-693892.okta.com/oauth2/aus1a4kh7lXPKhjFA357/v1/token' # Used in Unified Catalog swagger
            scopes: # the scopes required by this proxy
              - scope: 'read'
                description: 'The read scope'
              - scope: 'write'
                description: 'The write scope'
        backendAuth:
            type: auth-http-basic
            username: Joe
            password: changeme
    apps:
      - name: 'Sample App'
        profiles:
          - name: 'Sample profile'
            type: oauth
            clientId: 'client-id-123'
            issuer: 'https://sample.com/oauth2/default' # authorization server URL
            metadataPath: '/.well-known/oauth-authorization-server'
```

It is recommended to keep the YAML configuration file in the same source control repository as the source code of your service, so that you can update the configuration file when you make changes to the code for your service.

## Create an Amplify SaaS Gateway API proxy

The `create` command _creates_ an API proxy if none already exists for this API, or _updates_ the existing API proxy. It returns the name of the API proxy created.

To create an API proxy, run the following command. You must specify the full path to the YAML configuration file that describes your API:

```
axway central proxies create /myservices/my_service_config.yaml
```

This command also supports the following options:

| Option            | Description                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `--force` or `-f` | The default behavior is to create or update the API proxy. Use this option to force create a new API proxy. |

For details of the API, see [Create proxy API](https://d-api.docs.stoplight.io/api-reference/devops-api/create-proxy).

## Promote an Amplify SaaS Gateway API proxy

The `promote` command deploys the latest revision of the API proxy to a target runtime group. It returns the URL of the deployed API proxy and, if you have specified an API key client authentication, a set of API keys to access the API proxy.

To promote the latest revision of an API proxy to the `Prod Runtime`, run the following command. You must specify the full path to the YAML configuration file that describes your API and the target runtime group where the API proxy revision is to be deployed:

```
axway central proxies promote /myservices/my_service_config.yaml --target="Prod Runtime"
```

To promote a specific revision of an API proxy that is already deployed on a runtime group, you can optionally specify a source runtime group. To promote the API proxy revision deployed on `Test Runtime` to the `Prod Runtime`:

```
axway central proxies promote /myservices/my_service_config.yaml --source="Test Runtime" --target="Prod Runtime"
```

This command supports the following options:

| Option     | Description                  |
| ---------- | ---------------------------- |
| `--source` | The runtime to promote from. |
| `--target` | The runtime to promote to.   |

For details of the API, see [Promote proxy API](https://d-api.docs.stoplight.io/api-reference/devops-api/promote-proxy).

## Test the Amplify SaaS Gateway API proxy

The API proxy is now accessible on the URL returned from the `promote` command. You can test the methods and view the results in Amplify Central UI or using a REST client.

To test the API methods in Amplify Central UI, select **API Proxies** in the left navigation bar, click the appropriate API proxy from the list, and select the **Test Methods** tab.

## Review

You have learned how to use the Amplify Central DevOps APIs by way of Axway CLI to manage your API proxies.
