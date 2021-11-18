---
title: Install Axway Central CLI
linkTitle: Install Axway Central CLI
weight: 90
date: 2020-05-29T00:00:00.000Z
description: Learn how to install the Axway CLI core package and Axway Central
  CLI extension, and authorize them to use the Amplify Central APIs. This
  enables you to integrate the CLI into your DevOps pipeline.
---

{{< alert title="Note" color="primary" >}}This page details installation instructions for the 'Axway Central CLI' package, which replaced the deprecated 'Amplify Central CLI' package.{{< /alert >}}

If you are a current user of the deprecated 'Amplify Central CLI' package, you can uninstall that package by running:

```bash
# use this command if Amplify Central CLI is installed within Amplify CLI
  amplify pm uninstall @axway/amplify-central-cli

# use this command if Amplify Central CLI is installed within Axway CLI
  axway pm uninstall @axway/amplify-central-cli
```

## Before you start

* You will need an administrator account for Amplify Central ([Managing Accounts](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts)).
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

   ```bash
   [sudo] npm install -g axway
   ```

   Use `sudo` on Mac OS X or Linux if you do not own the directory where npm installs packages to. On Windows, you do not need to run as Administrator as npm installs packages into your AppData directory.

4. Run Axway package manager to install Axway Central CLI:

   ```bash
   axway pm install @axway/axway-central-cli
   ```

5. Run Axway package manager list command to view available packages:

   ```bash
   axway pm list
   ```

   Expected response:

   ```bash
   Axway CLI, version 3.0.0
   Copyright (c) 2018-2021, Axway, Inc. All Rights Reserved.

   Packages directory: <...>

   NAME                      VERSIONS
   @axway/axway-central-cli  2.0.0
   ```

All the development versions of Axway Central CLI can be found at [NPM install of Axway Central CLI](https://www.npmjs.com/package/@axway/axway-central-cli). To install a specific development version, run the following command:

```bash
axway pm install @axway/axway-central-cli@2.0.0
```

### Additional installation steps on Windows

After successfully installing Axway Central CLI, you must check if OpenSSL is installed. OpenSSL is needed to generate a public and private key pair for service account authentication, which is a pre-requisite for the creation of service accounts.

Install OpenSSL if not installed already:

1. [Download OpenSSL](https://slproweb.com/products/Win32OpenSSL.html).
2. Install OpenSSL, and ensure it is added to your path (`C:\Program Files\OpenSSL-Win64\bin`) in environment variables.

   ![Environment variables](/Images/central/cli_central/env_variables.png)

3. Verify that OpenSSL is installed and configured correctly.

   ```bash
   openssl version
   ```

## Authorize your CLI to use the Amplify Central APIs

Before using the Amplify Central APIs you must first authorize your CLI, so you can use it, for example, as part of your DevOps pipeline.

You can use the following two options to authorize your CLI:

### Option 1 - Log in with your Amplify Platform credentials

To use Axway CLI to launch the default web browser and log in with your Amplify Platform credentials, run the following command:

```bash
axway auth login
```

If you are a member of multiple Amplify organizations, you might have to choose an organization. After logging in, you may return to the terminal.

### Option 2 - Authenticate and authorize your service account

To use the Central CLI, your service account must authenticate with Amplify Platform and it must be authorized to use the Amplify Central APIs.

You can use the following options to create your service account:

1. [Create a service account using the CLI](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/authentication/service_accounts/index.html#create)
2. [Create a service account using the Platform UI](https://docs.axway.com/bundle/platform-management/page/docs/management_guide/organizations/managing_organizations/index.html#managing-service-accounts)

#### Authorize the service account with Amplify platform

After you create a service account you must authorize it with Amplify platform, and log into Axway CLI using the following command:

```bash
# if using a "pem" file
axway auth login --client-id service-account-id-xxxxxxxxxxxxxxxxxxxxxxxx --secret-file /path/to/private_key.pem
# or if account is using a client secret
axway auth login --client-id service-account-id-xxxxxxxxxxxxxxxxxxxxxxxx --client-secret xxxxxxxx
```

Expected response:

```bash
AXWAY CLI, version 3.0.1
Copyright (c) 2018-2021, Axway, Inc. All Rights Reserved.

You are logged in as service-account-id-xxxxxxxxxxxxxxxxxxxxxxxx.
```

After logging in, you are ready to use Axway Central CLI with a service account.

## Note on multi-account use

If you are using Axway Central CLI with multiple authenticated accounts **simultaneously** please be aware that by default, Axway Central CLI relies on the `auth.defaultAccount` configuration. You can check its value by running `axway config list` or `axway config get auth.defaultAccount`.

In this case, you have a few options on how to instruct the CLI to use a correct account:

* By providing the `--account=<desired account name>` param as part of Axway Central CLI command (you can obtain the list of authenticated accounts by running 'axway auth list'):

  ```bash
  axway central get environments --account=<desired account name>
  # for example:
  axway central get environments --account=amplify-cli:johndoe@axway.com
  ```

* By setting the desired account name in `auth.defaultAccount` config (so `--account` param will not be needed):

  ```bash
  axway config set auth.defaultAccount amplify-cli:johndoe@axway.com
  ```

## Review

You have learned how to install the Axway CLI core package, the Axway Central CLI extension, and how to register or link it to a service account, or to the Amplify Platform account. Now, you can integrate the Axway Central CLI into your DevOps pipeline to automate actions in Amplify Central.
