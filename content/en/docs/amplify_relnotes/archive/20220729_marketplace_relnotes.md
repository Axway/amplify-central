---
title: Marketplace July 2022 Release Notes
linkTitle: Marketplace July 2022
weight: 90
draft: true
date: 2022-07-11
---

The Marketplace is the storefront into all products exposed for discovery and consumption by internal and/or external consumers.

## New features and enhancements

The following new features and enhancements are available in this update:

* **Credential time to live**: the encrypted value of a credential is kept in the Marketplace system for only three days after its provisioning for security. If a consumer does not read the value before the expiration, the encrypted value is automatically erased (a job is run every night at midnight) from the Marketplace system; however, the value remains on the Gateway for the consumer to use it.
* **Owning team information**: applications and subscriptions display their owning teams.
* **Reusing credentials**: when a consumer asks for credentials, the system can detect if there are already existing credentials linked to the current application and present it to the consumer. Consumer can choose to use the existing one or create a new one.
* **WSDL support**: API resources of type WSDL can be viewed in the resource definition page.
* **Protobuf support**: API resources of type protobuf can be viewed in the resource definition page.

## Fixed issues

The following issue has been fixed in this update:

* **Images in markdown documentation are not displayed**: the images in markdown documentation are correctly displayed in Marketplace UI.

## Known limitations

The following limitation exists in this update:

None.