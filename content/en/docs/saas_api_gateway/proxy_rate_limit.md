---
title: Rate limit an API
linkTitle: Rate limit an API
weight: 70
date: 2019-09-19
description: Learn how to apply a rate limit configuration to your API.
---

## Before you start

* You will need an administrator account for Amplify Central
* Learn how to import your API as an API proxy in Amplify Central (see [Register an API](/docs/saas_api_gateway/quickstart/#register-an-api))
* Learn how to use the Axway CLI to manage an API proxy (see [Manage an API proxy using Axway Central CLI](/docs/integrate_with_central/cli_central/cli_proxy_flow))

## Objectives

Learn how to apply a rate limit configuration to your API:

* Understand what API rate limiting is and how it can be useful
* Configure and test rate limiting on your API using the Amplify Central UI
* Configure and test rate limiting on your API using the Axway Central CLI

## What is API rate limiting?

Rate limiting is a way to protect the backend service underlying (or implementing) your API. The use of resources underlying your API are protected from more aggressive consumer activity (or spikes in total API calls) which could overwhelm the backend service capacity.

API providers typically measure processing limits in transactions per time period (seconds, minutes, hours), for example, 100 transactions per 10 seconds. Rate limiting at the API level is a way to enforce a maximum limit for the total transactions per time period for all of your API consumers.

### Amplify Central API rate limiting

Amplify Central provides rate limiting around the API Proxy activity. You can set up the rate limiting from **1 second** to **1 day** interval.

Amplify Central allows for two levels of enforcement for rate limiting:

* At the proxy level, rate limiting affects all API transactions regardless of the consuming application.
* At the proxy and application level, rate limiting affects all API transactions originating with a specific application.

You can enforce one or both levels together.

## Use the Amplify Central UI to configure rate limiting

To begin, [register an api proxy](/docs/saas_api_gateway/quickstart/#register-an-api).

### Set a proxy rate limit on your API

1. On the **API Proxies** tab, click the API proxy name to open the API proxy details page.
2. On the **Policies** tab, edit the rate limit policy under the **Request to backend** section by clicking the gear icon.
3. Enter the number of transactions and use the dropdown duration list to select an interval.

    ![Enter the transactions per interval to apply a proxy rate limit on your API](/Images/central/proxy_rate_limit_modal.png)

4. Click **Save** to save the policy.

A new revision of the policy is created. You must deploy the new revision for the configuration to take effect.

### Remove a proxy rate limit from your API

1. On the **API Proxies** tab, click the API proxy name to open the API proxy details page.
2. On the **Policies** tab, edit the rate limit policy under the **Request to backend** section by clicking the gear icon.
3. Click **Delete**.  
4. Click **Delete rate limit policy** on the dialog box to confirm whether you want to delete the rate limit policy.

### Test the rate limit configuration

After deploying a new revision, you can test the rate limit configuration by clicking on the **Test Methods** tab, which will allow you to try out different methods for your proxy.

### Set an app rate limit on your API

1. On the **Apps** tab, click your app to open the app details page.
2. Click the **APIs** tab to view your APIs. If you haven't linked your API to your app yet, you can do so by clicking **+API**.

    * If your API has either a proxy or an app rate limiting policy applied, an **RL** (rate limit) button is shown next to your API. Hover over the button to view information about the rate limiting policy applied.
    * If your API does not have a rate limit policy applied, a **+** button is shown next to your API.

    ![Hover over the Rate Limit Balloon to see more information about rate limiting policies for your API](/Images/central/rate_limit_balloon.png)

3. To set an app rate limit on your API, click either the **RL** or the **+** button.
4. Enter the number of transactions and use the dropdown duration list to select an interval.

    ![Enter the desired transactions per interval to apply an app rate limit on your API](/Images/central/app_rate_limit_modal.png)

5. Click **Save** to save the policy.

{{< alert title="Note" color="primary" >}}This will only affect the app rate limit policy.{{< /alert >}}

### Remove an app rate limit from your API

To remove an app rate limit from your API, follow the steps on [Remove a proxy rate limit from your API](#remove-a-proxy-rate-limit-from-your-api).

#### Simple test with docker and curl

This sample test uses curl packaged in a docker container to start a few simultaneous API transactions and displays the return status for each attempt. Replace `<your_url_here>` with an endpoint of your proxy.

```
docker run curlimages/curl:7.66.0 -s -o /dev/null -w "%{url_effective}:%{http_code}\n" -Z "<your_url_here>#[1-5]"
```

Example run for the sample API with a rate limit of 2 TPS:

```
docker run curlimages/curl:7.66.0 -s -o /dev/null -w "%{url_effective}:%{http_code}\n" -Z "https://test-e4f77cd969cdaf3a0169ce16c8320000.apicentral.axwayamplify.com/music/v2/instruments#[1-5]"
https://test-e4f77cd969cdaf3a0169ce16c8320000.apicentral.axwayamplify.com/music/v2/instruments#1:429
https://test-e4f77cd969cdaf3a0169ce16c8320000.apicentral.axwayamplify.com/music/v2/instruments#3:429
https://test-e4f77cd969cdaf3a0169ce16c8320000.apicentral.axwayamplify.com/music/v2/instruments#2:429
https://test-e4f77cd969cdaf3a0169ce16c8320000.apicentral.axwayamplify.com/music/v2/instruments#4:200
https://test-e4f77cd969cdaf3a0169ce16c8320000.apicentral.axwayamplify.com/music/v2/instruments#5:200
```

#### Constant traffic test

[K6](https://docs.k6.io/docs/welcome) is a testing tool configured using the JavaScript language, that can help replicate a scenario closer to how your API will be used in the real world.

Save the following script as `rate-limit-test.js`.

```js
import http from 'k6/http';
import { sleep } from 'k6';
import { Counter } from 'k6/metrics';

var passes = new Counter('passed');
var ratelimited = new Counter('ratelimited');

export function setup() {
    // warm up DNS
    var res = http.get(`${__ENV.TEST_URL}`);
}

export default function() {
    var res = http.get(`${__ENV.TEST_URL}`);

    if (res.status === 429) {
        ratelimited.add(1);
    } else {
        passes.add(1);
    }
}
```

Using the dockerized version of K6, run a test mimicking 20 users sending 20 TPS to your API proxy for 30 seconds.

Replace `<your_url_here>` with an endpoint of your proxy.

```
docker run -i loadimpact/k6 run * -e TEST_URL="<your_url_here>" --rps 20 -u 20 -m 20 -d 30s < rate-limit-test.js
```

Sample run against a proxy with a 5 TPS rate limit:

```
docker run -i loadimpact/k6 run - -e TEST_URL="https://test-e4f77cd969cdaf3a0169ce16c8320000.apicentral.axwayamplify.com/music/v2/instruments" --rps 20 -u 20 -m 20 -d 30s < rate-limit-test.js
```

It produces the final report:

```
    data_received..............: 485 kB 16 kB/s
    data_sent..................: 117 kB 3.9 kB/s
    http_req_blocked...........: avg=10.96ms  min=1.91µs   med=7.57µs   max=588.86ms p(90)=10.22µs  p(95)=14.25µs
    http_req_connecting........: avg=3.22ms   min=0s       med=0s       max=108.06ms p(90)=0s       p(95)=0s
    http_req_duration..........: avg=183.91ms min=79.17ms  med=103.5ms  max=912.54ms p(90)=398.41ms p(95)=520.41ms
    http_req_receiving.........: avg=124.62µs min=26.2µs   med=120.93µs max=603.87µs p(90)=149.57µs p(95)=163.59µs
    http_req_sending...........: avg=38.13µs  min=8.34µs   med=34.32µs  max=267.79µs p(90)=47.21µs  p(95)=60.37µs
    http_req_tls_handshaking...: avg=7.33ms   min=0s       med=0s       max=281.46ms p(90)=0s       p(95)=0s
    http_req_waiting...........: avg=183.75ms min=79.02ms  med=103.38ms max=912.39ms p(90)=398.26ms p(95)=520.25ms
    http_reqs..................: 599    19.966543/s
    iteration_duration.........: avg=988.23ms min=473.27ms med=990.15ms max=1.69s    p(90)=1.12s    p(95)=1.25s
    iterations.................: 598    19.93321/s
    passed.....................: 150    4.999969/s
    ratelimited................: 448    14.933241/s
    vus........................: 20     min=20 max=20
    vus_max....................: 20     min=20 max=20
```

The passed rate closely matches the enforced rate limit.

### Remove a proxy rate limit

1. Navigate to the **API Proxies** tab.
2. Click the API proxy name to open the API proxy details page.
3. On the **Policies** tab, edit the rate limit policy under the **Request to backend** section.
4. Clear the text field and click the checkbox to save the configuration.

A new revision with no rate limit is created. You must deploy the new revision for the configuration to take effect.

## Use the Axway Central CLI to configure rate limiting on your API

Ensure that you are logged in to Axway Central CLI using the service account.

### Create the configuration file and promote your API

The Amplify Central DevOps CLI allows you to define the `rateLimit` configuration under the `policies` section of your API configuration file.

Create a rate limit of 5 TPS:

```
version: v1 # Version of the file format
apiVersion: v1 # This version ensures backward compatibility and would not mandate a frequent update from a client side
proxy:
    name: 'Musical Instruments Rate Limited' # name of the proxy
    basePath: /examples/ratelimit/api/v1 # base path of the proxy
    swagger: 'https://ec062a054a2977120b7e721801edb38ca24dfbb3.cloudapp-enterprise.appcelerator.com/apidoc/swagger.json' # Swagger url of the proxy
    policies:
        clientAuth:
            type: pass-through
        rateLimit:
            perProxy: 5
    tags: ['musical', 'instruments', 'ratelimit']
    team:
        name: 'Default Team'
```

The `perProxy` field specifies the desired Transactions Per Second (TPS) limit for your API.

Create the API proxy:

```
axway central proxies create /myservices/my_service_config.yaml
```

Promote the proxy to the test runtime group:

```
axway central proxies promote /myservices/my_service_config.yaml --target="Test Runtime"
```

To visualize the API proxy in Amplify Central UI, select **API Proxies** in the left navigation bar, and click the appropriate API proxy in the list. Verify the rate limit configuration in the **Policies** tab.

### Apply a rate limit for each application consuming your API

When your API is protected with an authentication method you can enforce a rate limit for each application consuming your API. In the sample configuration below the API is protected by API key authentication.

Under `rateLimit` you can specify two configurations:

* The `perProxy` value defines a rate limit at the API level, meaning all calls.
* The `perProxyAndApp` value defines a second level of rate limiting enforced for each application consuming the API.

In this example, the two applications under `apps` are limited to 3 TPS individually, as defined by the `perProxyAndApp` configuration, but traffic from both apps is also limited to 5 TPS, as defined by the `perProxy` configuration.

```
version: v1 # Version of the file format
apiVersion: v1 # This version ensures backward compatibility and would not mandate a frequent update from a client side
proxy:
    name: 'Musical Instruments Rate Limited' # name of the proxy
    basePath: /examples/ratelimit/api/v1 # base path of the proxy
    swagger: 'https://ec062a054a2977120b7e721801edb38ca24dfbb3.cloudapp-enterprise.appcelerator.com/apidoc/swagger.json' # Swagger url of the proxy
    policies:
        clientAuth:
            type: api-key
        rateLimit:
            perProxy: 5 # the desired TPS limit for your API
            perProxyAndApp: 3 # the default TPS limit for each application consuming the API
    tags: ['musical', 'instruments', 'ratelimit']
    apps:
    - name: Rate Limited App 1
    - name: Rate Limited App 2
    team:
        name: 'Default Team'
```

### Apply a specific rate limit for an application consuming your API

In some cases you might want to configure some applications to have a dedicated rate limit when consuming your API. The example below shows how to configure this scenario.

* The `overrides` section under `rateLimit` defines a specific rate limit of 3 TPS for the application `Rate Limited App 1`.
* The application `Rate Limited App 2` inherits the default rate limit of 1 TPS.

```
version: v1 # Version of the file format
apiVersion: v1 # This version ensures backward compatibility and would not mandate a frequent update from a client side
proxy:
    name: 'Musical Instruments Rate Limited' # name of the proxy
    basePath: /examples/ratelimit/api/v1 # base path of the proxy
    swagger: 'https://ec062a054a2977120b7e721801edb38ca24dfbb3.cloudapp-enterprise.appcelerator.com/apidoc/swagger.json' # Swagger url of the proxy
    policies:
        clientAuth:
            type: api-key
        rateLimit:
            perProxy: 5 # the desired TPS limit for your API
            perProxyAndApp: 1 # the default TPS limit for each application consuming the API
            overrides:
              - appName: Rate Limited App 1
                perProxyAndApp: 3 # this app can individually do 3 TPS
    tags: ['musical', 'instruments', 'ratelimit']
    apps:
    - name: Rate Limited App 1
    - name: Rate Limited App 2
    team:
        name: 'Default Team'
```

### Apply variable interval rate limit for an application consuming your API

You can rate limit the API calls at variable interval instead of fixed 1 second interval.

Under `perProxy` or `perProxyAndApp` you can specify two configurations:

* `limit` value defines number of API calls that needs to be rate limited.
* `interval` value defines at what interval, API calls needs to be rate limited at.

The field `interval` must follow the format `PT[n]H[n]M[n]S`, supported by the ISO_8601 standard.

**Some examples for interval:**

* `PT10S` # 10 seconds interval
* `PT1M45S` # 1 minute 45 seconds interval
* `PT15H20M30S` # 15 hours 20 minutes thirty seconds interval

On the following example, the two applications under `apps` are limited at 1 transaction per 10 seconds interval individually, as defined by the `perProxyAndApp` configuration, but traffic from both apps is also limited to 5 transactions per 10 seconds interval, as defined by the `perProxy` configuration.

```
version: v1 # Version of the file format
apiVersion: v1 # This version ensures backward compatibility and would not mandate a frequent update from a client side
proxy:
    name: 'Musical Instruments Rate Limited' # name of the proxy
    basePath: /examples/ratelimit/api/v1 # base path of the proxy
    swagger: 'https://ec062a054a2977120b7e721801edb38ca24dfbb3.cloudapp-enterprise.appcelerator.com/apidoc/swagger.json' # Swagger url of the proxy
    policies:
        clientAuth:
            type: api-key
        rateLimit:
            perProxy: # the desired rate limit for your API for 10 seconds interval
                limit: 5
                interval: PT10S
            perProxyAndApp: # the default Ratelimit for each app consuming the API at 1 transaction per 10 seconds interval
                limit: 1
                interval: PT10S
    tags: ['musical', 'instruments', 'ratelimit']
    apps:
    - name: Rate Limited App 1
    - name: Rate Limited App 2
    team:
        name: 'Default Team'
```

### Disable the rate limit for an application consuming your API

In some cases you might want to exempt an application from having an individual rate limit. In the example below the `overrides` section exempts `Rate Limited App 1` from the 1 TPS rate limit defined for all other applications.

```
version: v1 # Version of the file format
apiVersion: v1 # This version ensures backward compatibility and would not mandate a frequent update from a client side
proxy:
    name: 'Musical Instruments Rate Limited' # name of the proxy
    basePath: /examples/ratelimit/api/v1 # base path of the proxy
    swagger: 'https://ec062a054a2977120b7e721801edb38ca24dfbb3.cloudapp-enterprise.appcelerator.com/apidoc/swagger.json' # Swagger url of the proxy
    policies:
        clientAuth:
            type: api-key
        rateLimit:
            perProxy: 5 # the desired TPS limit for your API
            perProxyAndApp: 1 # the default TPS limit for each application consuming the API
            overrides:
              - appName: Rate Limited App 1
                disablePerProxyAndApp: true # this app is not limited individually
    tags: ['musical', 'instruments', 'ratelimit']
    apps:
    - name: Rate Limited App 1
    - name: Rate Limited App 2
    team:
        name: 'Default Team'
```

### Specify a rate limit for some applications consuming your API

The following example shows how to set a rate limit for each individual application. There is no rate limit on the API as a whole.

* The `overrides` section defines a 3 TPS individual rate limit for `Rate Limited App 1`, and a 5 TPS individual rate limit for `Rate Limited App 2`.
* `Rate Limited App 3` is not rate limited at all.

```
version: v1 # Version of the file format
apiVersion: v1 # This version ensures backward compatibility and would not mandate a frequent update from a client side
proxy:
    name: 'Musical Instruments Rate Limited' # name of the proxy
    basePath: /examples/ratelimit/api/v1 # base path of the proxy
    swagger: 'https://ec062a054a2977120b7e721801edb38ca24dfbb3.cloudapp-enterprise.appcelerator.com/apidoc/swagger.json' # Swagger url of the proxy
    policies:
        clientAuth:
            type: api-key
        rateLimit:
            overrides:
              - appName: Rate Limited App 1
                perProxyAndApp: 3 # this app is limited individually
              - appName: Rate Limited App 2
                perProxyAndApp: 5 # this app is limited individually
    tags: ['musical', 'instruments', 'ratelimit']
    apps:
    - name: Rate Limited App 1
    - name: Rate Limited App 2
    - name: Rate Limited App 3
    team:
        name: 'Default Team'
```

### Remove the rate limit configuration

Delete the `rateLimit` section from your API configuration file while keeping the same proxy name, as in the example:

```
version: v1 # Version of the file format
apiVersion: v1 # This version ensures backward compatibility and would not mandate a frequent update from a client side
proxy:
    name: 'Musical Instruments Rate Limited' # name of the proxy
    basePath: /examples/ratelimit/api/v1 # base path of the proxy
    swagger: 'https://ec062a054a2977120b7e721801edb38ca24dfbb3.cloudapp-enterprise.appcelerator.com/apidoc/swagger.json' # Swagger url of the proxy
    policies:
        clientAuth:
            type: pass-through
    tags: ['musical', 'instruments']
    team:
        name: 'Default Team'
```

Create a new revision of the API proxy:

```
axway central proxies create /myservices/my_service_config.yaml
```

Promote the new API version and verify that the API proxy is not rate limited anymore.

## Review

You have learned how rate limiting can help you provide a better API experience to consumers and how to configure a rate limit on your API using both the Amplify Central UI and the Axway Central CLI.
