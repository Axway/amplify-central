---
title: Marketplace custom URL
linkTitle: Marketplace  custom URL
weight: 30
---

Expose your marketplace to a specific url on your domain to match your brand.

## Before you start

You must have platform Administrator credentials to be able to update the marketplace settings.

You must have some IT rights to update your company Domain Name System (DNS) configuration.

## Objectives

Learn how to customize the maketplace url, create your certificate and udpate your DNS configuration to connect to a custom marketplace url.

## Customize the marketplace url in settings

Naviagte to platform.axay.com > Organization > Marketplace > Settings.

Change *Marketplace URL* field value from Subdomain to URL

Enter the url for your marketplace.

## Generate your certificate

The certificate will be used to validate the SSL connection with the marketplace. It is highly recommended to use a certificate authority (Verisign, DigiCert, Entrust...) to sign the certificate to avoid getting the "Not secure" warning when navigating to the marketplace.

We accept only PEM format certificate. Be sure to include the key in the certificate to be able to correctly read the certificate information.

Step 1- Create you certificate

It is recommended to use a certificate authority to signed your certificate. We also accept self-signed certificate but they are not recommended for production environment.

Sample for self-signed certificate creation

```shell
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out certificate.pem -sha256 -days 365 -nodes

# check your certificate content
openssl x509 -text -noout -in certificate.pem
```

Step 2- Merge the certificate and the key into a single PEM file

```shell
# windows
copy *.pem certificate-key.pem

# Linux
cat certificate.pem key.pem > certificate-key.pem
```

Step 3- Updload the `certificate-key.pem` file into the marketplace settings.

Naviagte to platform.axay.com > Organization > Marketplace > Settings and click the Choose file button to select the `certificate-key.pem` file. Then click Open.

When saving the settings, the plaform will validate that the certificate is correct and store it internally.

## Add a CNAME to your DNS entries

This step will enable to redirect your marketplace url traffic to the actual marketplace url hosted on Axway server.

The info bubble on the url field shows you which values should be added to your DNS (Hostname / Value). Hostame is deduced from the provided URL and Value is the current service url hosted by Axway.

Once the DNS is updated, you can validate that the route is correctly set using nslookup:

```shell
nslookup yourMarketplaceURL

#The answer may vary from the operating system used.
Server:  yourDNSserverName
Address:  XXX.XXX.XXX.XXX

Non-authoritative answer:
Name:    providedAxwayMarketplateURL
Addresses:  XXX.XXX.XXX.XXX
          XXX.XXX.XXX.XXX
          XXX.XXX.XXX.XXX
Aliases:  yourMarketplaceURL
```

## Access the marketplace

Using your marketplace url, you should be able to access the marketplace homepage.