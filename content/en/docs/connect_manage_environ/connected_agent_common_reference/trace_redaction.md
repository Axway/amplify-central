---
title: Trace redaction
linkTitle: Trace redaction
draft: false
weight: 10
description: Understand how the Traceability Agent will redact and sanitize
  information that is sent to Amplify Central.  Learn how you can control the
  information that is sent to Amplify Central by using the redaction
  configuration.
---
## Before you start

* Learn the Regular Expression syntax ([RE2 Syntax](https://github.com/google/re2/wiki/Syntax)) supported by the agent.

## Objectives

Learn how to set up redaction and sanitization rules used to ALLOW transaction path, query arguments, request headers, and response headers when sending data to Amplify Central. With the agent default configuration, this information will not be sent to Amplify.

## Path show rules

Parts of the URI path will be redacted before the information is sent to Amplify Central. When this is done, the Traceability Agent replaces the path value with "{*}" in the transaction details.

By default, everything is redacted and rules must be set to show the path elements. When using environment variables, the variable name is `TRACEABILITY_REDACTION_PATH_SHOW`.

### Example: Send all path values

```bash
TRACEABILITY_REDACTION_PATH_SHOW=[{keyMatch:".*"}]
```

If the agent finds a path of `https://somehost.com/pathof/my/api/uses/thispath` then `https://somehost.com/pathof/my/api/uses/thispath`will be sent to the platform.

### Example: Send only path values which start with 'ele' or end with 'point'

```bash
TRACEABILITY_REDACTION_PATH_SHOW=[{keyMatch:"^ele"},{keyMatch:"point$"}]
```

If the agent finds a path of `https://somehost.com/path/element/to/my/api/endpoint` then `https://somehost.com/{*}/element/{*}/{*}/{*}/endpoint` will be sent to the platform.

## Query argument and header show rules

Query argument and header show rules work like the path rules above, but only match the key portion and not the value. When a key does not match a show rule, that key and value is completely removed from the transaction details.

The environment variable names are `TRACEABILITY_REDACTION_QUERYARGUMENT_SHOW`, `TRACEABILITY_REDACTION_REQUESTHEADER_SHOW`, and `TRACEABILITY_REDACTION_RESPONSEHEADER_SHOW`.

### Example: Send query arguments with their key set to 'id'

```bash
TRACEABILITY_REDACTION_QUERYARGUMENT_SHOW=[{keyMatch:"^id$"}]
```

If the agent finds the following query arguments:

```bash
arg1=val1
id=myid
arg2=val2
```

then the the following will be sent to the platform:

```bash
id=myid
```

### Example: Send request headers that have 'authorization' anywhere in the key

```bash
TRACEABILITY_REDACTION_REQUESTHEADER_SHOW=[{keyMatch:"authorization"}]
```

If the agent finds the following request headers:

```bash
authorization: auth-value-1
x-authorization-header: auth-value-2
other-key3: value3
```

then the following will be sent to the platform:

```bash
authorization: auth-value-1
x-authorization-header: auth-value-2
```

### Example: Send all response headers

```bash
TRACEABILITY_REDACTION_RESPONSEHEADER_SHOW=[{keyMatch:".*"}]
```

If the agent finds the following response headers:

```bash
content-type: my-content-type
res-header: just-a-value
```

then the following will be sent to the platform:

```bash
content-type: my-content-type
res-header: just-a-value
```

## Query argument and header value sanitization rules

In addition to using the show rules for query arguments and headers, it is also possible to sanitize the values of certain keys.  Sanitization is only applied to values that match a show rule and then a sanitization rule.

The environment variable names are `TRACEABILITY_REDACTION_QUERYARGUMENT_SANITIZE`, `TRACEABILITY_REDACTION_REQUESTHEADER_SANITIZE`, and `TRACEABILITY_REDACTION_RESPONSEHEADER_SANITIZE`.

Much like the show rules, the sanitization rules have a keyMatch that is used to match the argument or header key. When a keyMatch is found, the additional valueMatch expression is applied to the value and any matching portions are replaced with the masking characters "{*}".

You can change the masking characters with the environment variable `TRACEABILITY_REDACTION_MASKING_CHARACTERS`. Acceptable characters are alphanumeric, between 1-5 characters, and can contain '-' (hyphen), '*' (star), '#' (sharp), '^' (caret), '~' (tilde), '.' (dot), '{' (open curly bracket), and '}' (closing curly bracket) only.

{{% alert title="Note" %}}
For Docker run agents, the environment variable must be in double-quotes to correctly parse the characters *only if* the character string begins with a bracket. For example, `TRACEABILITY_REDACTION_MASKING_CHARACTERS="{*^*}"`. For binary run agents, the environment variable must be in double double-quotes to correctly parse the characters *only if* the character string begins with a bracket. For example, `TRACEABILITY_REDACTION_MASKING_CHARACTERS=""{~}""`.
{{% /alert %}}

### Example: Sanitize the whole value of the 'id' query argument

```bash
TRACEABILITY_REDACTION_QUERYARGUMENT_SHOW=[{keyMatch:"^id$"}]
TRACEABILITY_REDACTION_QUERYARGUMENT_SANITIZE=[{keyMatch:"^id$",valueMatch:".*"}]
```

If the agent finds the following query arguments:

```bash
arg1=val1
id=myid
arg2=val2
```

then the the following will be sent to the platform:

```bash
id={*}
```

### Example: Sanitize the first five characters of any request header with a key that has 'header' in it

```bash
TRACEABILITY_REDACTION_REQUESTHEADER_SHOW=[{keyMatch:"authorization"}]
TRACEABILITY_REDACTION_REQUESTHEADER_SANITIZE=[{keyMatch:"authorization",valueMatch:"^.{0,5}"}]
```

If the agent finds the following request headers:

```bash
authorization: auth-value-1
x-authorization-header: auth-value-2
other-key3: value3
```

then the following will be sent to the platform:

```bash
authorization: auth-{*}
x-authorization-header: {*}value-2
```

### Example: Sanitize the response headers of the word 'data', wherever it is found, in any header that starts with 'content'

```bash
TRACEABILITY_REDACTION_RESPONSEHEADER_SHOW=[{keyMatch:".*"}]
TRACEABILITY_REDACTION_RESPONSEHEADER_SANITIZE=[{keyMatch:"^content",valueMatch:"data"}]
TRACEABILITY_REDACTION_MASKING_CHARACTERS=""{##}""
```

If the agent finds the following response headers:

```bash
content-type: return-data-type
res-header: just-a-value
```

then the following will be sent to the platform:

```bash
content-type: return-{##}-type
res-header: just-a-value
```

## JMS properties show rules

JMS properties show rules work like the argument and header show rules above, except that the `jmsStatus` and `jmsTimestamp` properties are always sent.

The environment variable name is `TRACEABILITY_REDACTION_JMSPROPERTIES_SHOW`.

### Example: Send JMS properties that have 'jmsDestination' and 'jmsReplyTo' in their keys

```bash
TRACEABILITY_REDACTION_JMSPROPERTIES_SHOW=[{keyMatch:"jmsDestination"},{keyMatch:"jmsReplyTo"}]
```

If the agent finds the following jmsProperties:

```bash
jmsStatus: Success
jmsTimestamp: 123456789
jmsDestination: queue://destination
jmsReplyTo: queue://replyTo
jmsMessageID: messageID123
jmsProviderURL: http://provider.com
```

then the following will be sent to the platform:

```bash
jmsStatus: Success
jmsTimestamp: 123456789
jmsDestination: queue://destination
jmsReplyTo: queue://replyTo
```

## JMS properties value sanitization rules

JMS properties value sanitization rules work like the argument and header value sanitization rules above, except that the `jmsStatus` and `jmsTimestamp` properties are never sanitized.

The environment variable names are `TRACEABILITY_REDACTION_JMSPROPERTIES_SANITIZE`.

### Example: Sanitize everything after and including the '//' in the jmsDestination and jmsReplyTo properties

```bash
TRACEABILITY_REDACTION_JMSPROPERTIES_SHOW=[{keyMatch:"jmsDestination"},{keyMatch:"jmsReplyTo"}]
TRACEABILITY_REDACTION_JMSPROPERTIES_SANITIZE=[{keyMatch:"jmsDestination",valueMatch:"//.*$"},{keyMatch:"jmsReplyTo",valueMatch:"//.*$"}]
```

If the agent finds the following request headers:

```bash
jmsStatus: Success
jmsTimestamp: 123456789
jmsDestination: queue://destination
jmsReplyTo: queue://replyTo
jmsMessageID: messageID123
jmsProviderURL: http://provider.com
```

then the following will be sent to the platform:

```bash
jmsStatus: Success
jmsTimestamp: 123456789
jmsDestination: queue:{*}
jmsReplyTo: queue:{*}
```

## Redaction configuration samples

### Send path, headers, query parameters, and JMS properties to Amplify platform without restriction

```bash
# path
TRACEABILITY_REDACTION_PATH_SHOW=[{keyMatch:".*"}]
# query parameters
TRACEABILITY_REDACTION_QUERYARGUMENT_SHOW=[{keyMatch:".*"}]
# request header
TRACEABILITY_REDACTION_REQUESTHEADER_SHOW=[{keyMatch:".*"}]
# response header
TRACEABILITY_REDACTION_RESPONSEHEADER_SHOW=[{keyMatch:".*"}]
# response header
TRACEABILITY_REDACTION_JMSPROPERTIES_SHOW=[{keyMatch:".*"}]
```

### Send path and query parameters only to Amplify platform without restriction

```bash
# path
TRACEABILITY_REDACTION_PATH_SHOW=[{keyMatch:".*"}]
# query parameters
TRACEABILITY_REDACTION_QUERYARGUMENT_SHOW=[{keyMatch:".*"}]
```

### Send path and sanitize headers to hide

```bash
# send all paths
TRACEABILITY_REDACTION_PATH_SHOW=[{keyMatch:".*"}]
# send all request headers
TRACEABILITY_REDACTION_REQUESTHEADER_SHOW=[{keyMatch:".*"}]
# send all response headers
TRACEABILITY_REDACTION_RESPONSEHEADER_SHOW=[{keyMatch:".*"}]
# send all JMS properties
TRACEABILITY_REDACTION_JMSPROPERTIES_SHOW=[{keyMatch:".*"}]
# sanitize Authorization request header to mask the ten first characters or less
TRACEABILITY_REDACTION_REQUESTHEADER_SANITIZE=[{keyMatch:"Authorization",valueMatch:"^.{0,10}"}]
# sanitize client response header to mask last ten characters or less
TRACEABILITY_REDACTION_RESPONSEHEADER_SANITIZE=[{keyMatch:"client",valueMatch:".{0,10}$"}]
# sanitize jmsDestination and jmsReplyto properties to show only characters before '//'
TRACEABILITY_REDACTION_JMSPROPERTIES_SANITIZE=[{keyMatch:"jmsDestination",valueMatch:"//.*$"},{keyMatch:"jmsReplyTo",valueMatch:"//.*$"}]
```
