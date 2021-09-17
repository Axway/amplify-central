---
title: Secure an API with JWT
linkTitle: Secure an API with JWT
weight: 30
date: 2019-07-30
description: Learn how to secure your API using a JWT token.
---

## Before you start

* You will need a basic understanding of JWT ([RFC 7523](https://tools.ietf.org/html/rfc7523))
* You will need a user account for Amplify Central
* Import your API as an API proxy in Amplify Central (see [Register an API](/docs/saas_api_gateway/quickstart/#register-an-api))

## Objectives

Learn how to secure your API using a JWT token.

## Add JWT authentication to an API proxy

Follow these steps to add JWT client authentication to your API proxy:

1. Select **API Proxies** in the left navigation bar, and click your API proxy in the list.
2. On the **Policies** tab change the client authentication policy to `JWT Token`.
3. On the **Deployments** tab deploy or update a runtime group with this revision of your API proxy.

Watch the animation to learn how to do this in Amplify Central UI.

![Add JWT authentication](/Images/central/JWTaddproxyauth_animation.gif)

## Manage access to an API proxy with JWT authentication

To be able to test your API, create an app to manage client access to your API:

1. Select **Apps** in the left navigation bar, and create a new app.
2. On the **Identity Profiles** tab, in the **JWT Keys** section, add a new JWT key.
3. Enter a name for the key.
4. Paste your JWT public key into the **JWT Key** field.
    * You must create your own JWT token to secure an API with JWT.
    * The JWT token must be signed using the `RS256` algorithm.
    * There are many services that allow you to create a JWT token. See [Create a JWT token](#create-a-jwt-token) for some examples, however, you can choose whichever service is best suited for your organization. These services provide you with both a public key and a private key. The public key is needed for this step.
5. On the **APIs** tab, add a new API.
6. Select your API proxy with JWT authentication, and select the runtime group you deployed it to.

## Test an API proxy with JWT authentication

To test your API proxy in Amplify Central:

{{< alert title="Tip" color="" >}}You need to create a JWT token to test the API proxy, which is explained in [Create a JWT token](#create-a-jwt-token).{{< /alert >}}

1. Select **API Proxies** in the left navigation bar, and click your API proxy with JWT authentication in the list.
2. Click the **Test Methods** tab.
3. Use the **Application ID** and **JWT Key ID** on this screen to create the JWT token as detailed in [Create a JWT token](#create-a-jwt-token).
4. Paste your JWT token in the **JWT Token** field.
5. Execute an API method. It should be successful and return a `200 OK` response.

Watch the animation to learn how to do this in Amplify Central UI.

![Test API with JWT](/Images/central/JWTtestapi_animation.gif)

## Create a JWT token

There are many libraries and methods for creating signed JWT tokens. The first step is to generate an RSA key pair. This section demonstrates generating the key pair and provides examples of the following signing methods:

* Bash script using openssl and jq
* Go binary
* jwt.io

### Generate a key pair

This script creates an RSA key pair. The private component must be kept secret and is used for signing authentication tokens. The public component is added to the application in Amplify Central. The public key is converted to a JWK and Amplify Central uses it to validate the authentication tokens.

```bash
#!/usr/bin/env bash

openssl genrsa -out sigjwt_private_no_passphrase.key 2048
openssl rsa -pubout -in sigjwt_private_no_passphrase.key -out public.key
export PUBLIC_KEY=`cat public.key | tr -d "\n"`
```

Copy the sample above to a script called `createKeys.sh` and execute it with:

```bash
source ./createKeys.sh
```

### Bash script with openssl and jq

This script uses openssl and jq to sign the private key created earlier.

```bash
#!/usr/bin/env bash
set -o pipefail

header_template='{
    "typ": "JWT"
}'

build_header() {
        jq -c \
                --arg alg "${1}" \
                --arg keyid "${2}" \
        '
        .alg = $alg | .kid = $keyid
        ' <<<"$header_template" | tr -d '\n'
}

build_body() {
    jq -c \
                --arg appid "${1}" \
                --arg iat_str "$(date +%s)" \
        '
        ($iat_str | tonumber) as $iat
        | .iat = $iat
        | .exp = ($iat + 1)
        | .sub = $appid
        | .aud = $appid
        | .iss = $appid
        ' <<<"{}" | tr -d '\n'
}

b64enc() { openssl enc -base64 -A | tr '+/' '-_' | tr -d '='; }
json() { jq -c . | tr -d '\n'; }
rs_sign() { openssl dgst -binary -sha256 -sign "$1"; }

sign() {
        local payload header sig signed_content secret=$1 appid=$2 jwtkeyid=$3
        header=$(build_header "RS256" "$jwtkeyid")
        payload=$(build_body $appid)
        signed_content="$(json <<<"$header" | b64enc).$(json <<<"$payload" | b64enc)"
        sig=$(printf %s "$signed_content" | rs_sign "$secret" | b64enc)
        printf '%s.%s\n' "${signed_content}" "${sig}"
}

export JWT=`sign "$@"`
```

Copy the sample above to a script called `signJWT.sh` and execute with:

```bash
 source ./signJWT.sh sigjwt_private_no_passphrase.key <paste_application_id_here> <paste_jwt_key_id_here>
```

Copy and paste the **Application ID** and **Key ID** from the API proxy in Amplify Central.

This sets the signed token in an environment variable called `$JWT`. The JWT will look something like this:

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkpyV1E1VF9rS3Zjdl9iYlMtcHkwa19fTWppYkE1VGNhT3NlYXNHMGk3MTAifQ.
eyJpYXQiOjE1NjMzNjI5NjAsImV4cCI6MTU2MzM2Mjk2MSwic3ViIjoiZTRlM2UxZDI2YmI3YWEwYjAxNmJiODcxMWUwNjAwNjMiLCJ
hdWQiOiJlNGUzZTFkMjZiYjdhYTBiMDE2YmI4NzExZTA2MDA2MyIsImlzcyI6ImU0ZTNlMWQyNmJiN2FhMGIwMTZiYjg3MTFlMDYwMDYzIn0.
0PrWrFdloOiCWUsGMRSwjmtn6z_HQpwIPRi2Y_XuqR5zvdvKInORNAXDDs4ZtQfbKPLcaybB-hWTqfWDn5i9dBIkcQ3Kf1Uhhku2ci10_eDo7_X4LTFZwMJvh4LEQG7I1OcX9APkCKw
u1hZXRag9IWTcdb3KCOdNGivIQ9JICNnTI4tzdscDwpH1jXfCWjWBN4l58O1C8G6vEpuF7p-AguP3WYYM-YGAHUiUU2LsP_c
diTEqhiOPQYhhcqn7nFQbUsKkA7Eqk7-iMGJ6suTYJRcDqFG4M1SDcoCTBgy4mVKGeXz74Zf1U-W_TUxQ77Ic0HA2oXuPK-nwsUumobVzxw
```

### Go binary

Install the binary from the [jwt-go library](https://github.com/dgrijalva/jwt-go/):

```bash
export GOPATH=$(go env GOPATH)

export PATH=$PATH:$(go env GOPATH)/bin:$(go env GOPATH)
go install github.com/dgrijalva/jwt-go/cmd/jwt
```

This script uses the Go binary to sign the private key created earlier.

```bash
#!/bin/bash

IAT=`date +%s`
EXP=$((IAT + 600))
#CLIENTID="${1:-2c91808569fca5ce0169fcc9c9a8005b}"
CLIENTID="${1:-e4e674d56b224770016b2264471f006d}"
AUD="apicentral"
KID="${2:-RBklhbLMWo_lc6fRpvL6J5sjUmWQn9uHuuZFDd_BfPg}"
PRIVKEY="${3:-./sigjwt_private_no_passphrase.key}"
BEARER_TOKEN=`echo {\"iss\":\"$CLIENTID\", \"sub\":\"$CLIENTID\", \"aud\": \"$CLIENTID\", \"exp\": $EXP, \"iat\": $IAT  } | jwt -header kid=$KID -key $PRIVKEY -alg RS256 -sign - `
echo $BEARER_TOKEN
```

Copy the sample above to a script called `signPrvtKey.sh` and execute it with:

```bash
 source ./signPrvtKey.sh
```

### Use jwt.io

This example uses [jwt.io](https://jwt.io/) to create a JWT token:

* Use the default public key from jwt.io as the **JWT Key** for your app in Amplify Central or create a public key as detailed in [Generate a key pair](#generate-a-key-pair).
* To create the JWT token, you need the **Application ID** and **JWT Key ID** from the API proxy in Amplify Central.
* Use the generated JWT token from jwt.io as the **JWT Token** to test your API in Amplify Central.

{{< alert title="Caution" color="warning" >}} This method is for testing only as it requires you to share your private key with a third party website.{{< /alert >}}

To create a JWT token on jwt.io:

1. On the jwt.io website, click **Debugger**.
2. Select `RS256` for the algorithm.
3. A default key pair is now available under the Verify Signature section. Copy the public key for use in [Manage access to an API proxy with JWT authentication](#manage-access-to-an-api-proxy-with-jwt-authentication).
4. Edit the Header section. Copy and paste the **JWT Key ID** from the **Test Methods** tab of the API proxy in Amplify Central as the `kid` field. For example:

    ```
    {
      "alg": "RS256",
      "kid": "paste_jwt_key_id_here",
      "typ": "JWT"
    }
    ```

5. Edit the Payload section.
    * Copy and paste the **Application ID** from the **Test Methods** tab of the API proxy in Amplify Central as the `sub`, `aud`, and `iss` fields.
    * For the `iat` and `exp` fields, enter epoch values for when the token was issued at and when it expires. For example:

        ```
        {
         "sub": "paste_app_id_here",
         "aud": "paste_app_id_here",
         "iss": "paste_app_id_here",
         "iat": 1516239022,
         "exp": 1564617600
        }
        ```

6. Do not edit the Signature section. This is automatically generated by jwt.io.
7. Copy the resulting Base64 encoded JWT token for use in [Test an API proxy with JWT authentication](#test-an-api-proxy-with-jwt-authentication). It should include three long strings separated by periods. For example:

    ```
    eyJhbGciOiJSUzI1NiIsImtpZCI6Ik44SXdtMndBRW5mQnNfVTAxSVNKc05YX214MkM4VVI3WnJiVG9LV2RpTEEiLCJ0eXAiOiJKV1QifQ.
    eyJzdWIiOiJlNGY2ZGM4YzZhZWI4NDcxMDE2YjAzNGM2MWYxMmI0YSIsImF1ZCI6ImU0ZjZkYzhjNmFlYjg0NzEwMTZiMDM0YzYxZjEyYjRh
    IiwiaXNzIjoiZTRmNmRjOGM2YWViODQ3MTAxNmIwMzRjNjFmMTJiNGEiLCJpYXQiOjE1NTkwNzQzODcsImV4cCI6MTY1OTE2MDg4N30.
    QwxqlkCKzUx7Qym5coj34GcecxkKg6uypmDv3e_EV2Qyk3eQ3j1DHVYHS9Qavj4Apv7B1UxVPzr6igk0R-BgPYqoTPA7d508
    _8gymOJwE7HbKBiD6eAOuTHydU8Iq_XUYl605QUnaR3hZ8wX1EcMkqxT7jQlQnJOJmX9DIAc8vNyoGH2xjo_6xUM4JbrnSze9nodkh5xZjpVyppZAY_
    4Fm5eJvbzYvwoA9ZUbLcupewoaNbcGK1QKJDrSP4ZZLik1oQ0y9rhhRjqPe9-xSILoqlpDvKLqxyRgi_BJUMdi1a00nhDNox1rW6SQzdRFnkHF_aQkjJeKFNdm8fw1UF6Jw
    ```

## Review

You have learned how to secure your API with a JWT token in Amplify Central.
