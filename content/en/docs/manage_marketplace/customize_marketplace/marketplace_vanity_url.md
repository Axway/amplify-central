---
title: Customize Marketplace URL
linkTitle: Customize Marketplace URL
weight: 20
---

Provide your own custom domain for the Marketplace.

## Before you start

* You must have platform Administrator credentials to be able to update the Marketplace settings.
* You must have appropriate IT rights to update your company's Domain Name System (DNS) configuration.

## Objectives

Learn how to customize the Marketplace URL in three easy steps:

1. Add a custom URL in Marketplace Settings.
2. Generate a TLS certificate.
3. Configure your DNS.

## Add a custom URL in Marketplace Settings

To add a custom URL to the Marketplace:

1. Navigate to *platform.axway.com > Organization > Marketplace > Settings*.
2. Select **URL** in the Marketplace URL drop-down menu.
3. Enter the URL for the Marketplace.
4. Save your changes.

## Generate a TLS certificate

This certificate will be used to validate the TLS connection with the marketplace. It is recommended that you use a reputable certificate authority (Verisign, DigiCert, Entrust...) to sign your certificate to avoid the "Not secure" warning when navigating to the Marketplace.

Only a PEM format certificate is accepted. Be sure to include the intermediate CA and the private key in the certificate file. The private key should be in PKCS#8 format.

### Step 1 - Create your certificate

It is required that you use a certificate authority to sign your certificate. Self-signed certificate are also accepted, but they are not recommended for a production environment.

Self-signed certificate creation example:

```shell
openssl req -x509 -newkey rsa:4096 -keyout private-key.pem -out certificate.pem -sha256 -days 365 -nodes

# check your certificate content
openssl x509 -text -noout -in certificate.pem
```

### Step 2 - Merge the certificate and the private key into a single PEM file

```shell
# windows
copy *.pem full-chain.pem

# Linux
cat certificate.pem private-key.pem > full-chain.pem
```

### Step 3 - Upload the `certificate-key.pem` file into the Marketplace Settings

1. Navigate to *platform.axway.com > Organization > Marketplace > Settings*.
2. Click **Choose file** to select the `certificate-key.pem` file.
3. Click **Open**.

When saving the settings, the platform will validate that the certificate is correct and store it internally.

## Configure your DNS

You must add a canonical name (CNAME) record to your DNS entries to redirect the Marketplace traffic to the Marketplace URL hosted on the Axway server.

The info bubble on the URL field shows you which values must be added to your DNS (Hostname / Value). Hostname is deduced from the provided URL and Value is the current service URL hosted by Axway.

Once the DNS is updated, you can validate that the route is correctly set using nslookup:

```shell
nslookup your.marketplace.domain.com

#The answer may vary from the operating system used.
Server:  yourDNSserverName
Address:  XXX.XXX.XXX.XXX

Non-authoritative answer:
your.marletplace.domain.com    canonical name = {marketplaceID}.marketplace.{region}.axway.com
Name:    {marketplaceID}.marketplace.{region}.axway.com
Address: XXX.XXX.XXX.XXX
Name:    {marketplaceID}.marketplace.{region}.axway.com
Address: XXX.XXX.XXX.XXX
Name:    {marketplaceID}.marketplace.{region}.axway.com
Address: XXX.XXX.XXX.XXX
```

## Access the marketplace

Navigate your custom Marketplace URL to validate that the changes have been applied successfully.
