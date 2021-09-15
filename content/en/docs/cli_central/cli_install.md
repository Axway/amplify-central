---
title: Install Axway Central CLI
linkTitle: Install Axway Central CLI
weight: 90
date: 2020-05-29T00:00:00.000Z
description: Learn how to install the Axway CLI core package and Axway Central CLI extension, and authorize them to use the
  Amplify Central APIs. This enables you to integrate the CLI into your DevOps
  pipeline.
---

>Note: This page details installation instructions for the 'Axway Central CLI' package, which replaced the deprecated 'Amplify Central CLI' package.
>
> If you are a current user of the deprecated 'Amplify Central CLI' package, you can uninstall that package by running:
>
> ```
>   axway pm uninstall @axway/amplify-central-cli
>```

## Before you start

* You will need an administrator account for Amplify Central ([Managing Accounts](https://docs.axway.com/bundle/Amplify_Dashboard_allOS_en/page/managing_accounts.html)).
* You will need [Node.js](https://nodejs.org/en/download/) version 12.13.0 or later.

### Operating system supported configurations

The following table describes the operating system supported configurations that you can use with Axway Central CLI.

| OS                  | Node.js Version  | Terminal Shells Supported  | Terminal Shells Unsupported |
| ------------------- | ---------------- | -------------------------- | --------------------------- |
| Mac OSX or later    | 12.13.0 or later | bash , zsh                 |                             |
| Windows 10 or later | 12.13.0 or later | Command Prompt, PowerShell | Cygwin, Git Bash            |
| Linux               | 12.13.0 or later | bash                       |                             |

## Install Axway CLI and Axway Central CLI

1. Install `Node.js 12.13.0 LTS` or later.
2. Install `npm 6.12.0` or later.
3. Run the following command to install Axway CLI:

   ```
   [sudo] npm install -g axway
   ```

   Use `sudo` on Mac OS X or Linux if you do not own the directory where npm installs packages to. On Windows, you do not need to run as Administrator as npm installs packages into your AppData directory.

4. Run Axway package manager to install Axway Central CLI:

   ```
   axway pm install @axway/axway-central-cli
   ```

5. Run Axway package manager list command to view available packages:

   ```
   axway pm list
   ```

   Expected response:

   ```
   Axway CLI, version 3.0.0
   Copyright (c) 2018-2021, Axway, Inc. All Rights Reserved.

   Packages directory: <...>

   NAME                      VERSIONS
   @axway/axway-central-cli  2.0.0
   ```

All the development versions of Axway Central CLI can be found at [NPM install of Axway Central CLI](https://www.npmjs.com/package/@axway/axway-central-cli). To install a specific development version, run the following command:

```
axway pm install @axway/axway-central-cli@2.0.0
```

### Additional installation steps on Windows

After successfully installing Axway Central CLI, you must check if OpenSSL is installed. OpenSSL is needed to generate a public and private key pair for service account authentication, which is a pre-requisite for the creation of service accounts.

Install OpenSSL if not installed already:

1. [Download OpenSSL](https://slproweb.com/products/Win32OpenSSL.html).
2. Install OpenSSL, and ensure it is added to your path (`C:\Program Files\OpenSSL-Win64\bin`) in environment variables.

   ![Environment variables](/Images/central/cli_central/env_variables.png)

3. Verify that OpenSSL is installed and configured correctly.

   ```
   openssl version
   ```

## Authorize your CLI to use the Amplify Central APIs

Before using the Amplify Central APIs you must first authorize your CLI, so you can use it, for example, as part of your DevOps pipeline.

You can use the following options to authorize your CLI:

1. [Use your Amplify Platform login credentials](/docs/central/cli_central/cli_install/#option-1---log-in-with-your-amplify-platform-credentials).
2. [Use a service account](/docs/central/cli_central/cli_install/#option-2---authenticate-and-authorize-your-service-account).

### Option 1 - Log in with your Amplify Platform credentials

To use Axway CLI to launch the default web browser and log in with your Amplify Platform credentials, run the following command:

```bash
axway auth login
```

If you are a member of multiple Amplify organizations, you might have to choose an organization. After logging in, you may return to the terminal.

If you have used the `client-id` configuration to authorize with the CLI, you must remove it. To verify that you have used `client-id`, run:

```bash
axway central config list
```

Expected response:

```bash
{
   ...
   'client-id': 'apicentral',
   ...
}
# OR if used a "DOSA" account before
{
   ...
   'client-id': 'DOSA_105cf15d051c432c8cd2e1313f54c2da',
   ...
}
```

To remove `client-id`, you must manually edit the configuration file `~/.axway/central.json` and remove the `client-id` value from it.

### Option 2 - Authenticate and authorize your service account

To use the Central CLI, your service account must authenticate with Amplify Platform and it must be authorized to use the Amplify Central APIs.

You can use the following options to create your service account:

#### 2.1 Create a service account using the CLI

To create a service account from the CLI, run the following command (You must have OpenSSL installed to run this command):

```
axway central create service-account
```

You will be prompted to provide a name for the service account. A public and private key pair in RSA format will be generated for you.

#### 2.2 Create a service account using the Amplify Central UI

To create a service account from the UI, log in to Amplify Central UI as an administrator, and create a service account for your CLI. Add the public key that you created earlier. When the account is created, copy the client identifier from the **Client ID** field.

Watch the animation to learn how to do this in Amplify Central UI.

![Create service account in Amplify Central UI](/Images/central/service_account_animation.gif)

#### Authorize the service account with Amplify platform

After you create a service account your must authorize it with Amplify platform, and log in to Axway CLI using the following command:

```
axway auth login --client-id DOSA_105cf15d051c432c8cd2e1313f54c2da --secret-file ~/test/private_key.pem
```

Expected response:

```
AXWAY CLI, version 3.0.0
Copyright (c) 2018-2021, Axway, Inc. All Rights Reserved.

You are logged in as DOSA_5ed74d68defxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx604.
This account has been set as the default.
```

#### Set the active service account

To set the service account client identifier for future operations:

```
axway central config set --client-id DOSA_105cf15d051c432c8cd2e1313f54c2da
```

To view the saved configuration, run:

```
axway central config list
```

Expected response:

```
{ 'client-id': 'DOSA_105cf15d051c432c8cd2e1313f54c2da' }
```

## Review

You have learned how to install the Axway CLI core package, the Axway Central CLI extension, and how to register or link it to a service account, or to the Amplify Platform account. Now, you can integrate the Axway Central CLI into your DevOps pipeline to automate actions in Amplify Central.
