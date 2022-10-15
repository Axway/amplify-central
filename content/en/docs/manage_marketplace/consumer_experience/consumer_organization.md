---
title: Consumer organization management
linkTitle: Consumer organization management
---

## Before you start

You must have an Amplify entitlement.

## Objectives

As a consumer, learn how to create and manage a consumer organization from the Marketplace.

## Concepts

### Creating a consumer organization

The first time a user sign up to a marketplace, he has to enter the following information in the displayed form to create his account:

* First name - first name of the user
* Last name - last name of the user
* Email - email address that will be use later to login to the marketplace
* Password - the password associated to the email to enable the login process to be successful. A confirmation of the password is mandatory
* Organization - the name of the organization that will be created and reference as a consumer organization

To submit the information, press the **Sign up** button. A message to Check your email is displayed. The email contains the link to activate your account. Once the activation is done, you will be able to login with your email and password into the marketplace.

### Managing Users and Roles

A consumer organization allows you to defines users and teams. Each user can have one or more role. Each can be part of one or multiple teams.

The first user who creates the organization is the **Administrator** of the organization. This administrator can change the roles of the users, with the restriction that there always needs to be at least one user that has the Administrator role.

This Administrator has all the roles on the Default team.

We can distinguish the following types of roles:

* *Organization Roles* - a role that applies to all the capabilities of the organization and is mutually exclusive. There are two Organization roles:
    * **Administrator** - allow to create users and teams
    * **Consumer** - allow to consumer product in marketplace
* *Team Roles* - roles that are specific to a team the user belongs to. These roles are not mutually exclusive. A member can have multiple role in the the same team.  There are three team roles:
    * **Consumer** - allow to manage free plan subscription, product access and credentials and application
    * **Team Manager** - allow to organize the team: add/remove existing user
    * **Subscriber** - allows to manage the paid plan subscription

### Organizing the user within teams

A team is a logical grouping of users. The idea is to enable you to create teams so that certain groups of people can work together or have access to the same set of Marketplace product. The same user can belong to multiple teams and can also have a different role in each team. Each organization always has a default team.

Only Administrator and Team Manager can create/view/edit/delete any team. But, the default team cannot be deleted. There should always be a Default team in an organization.

## User Management

The user management is performed by an Administrator user.

### Inviting a user to an organization

For Adding a user to the current organization, Administrator has to invite the user.

1. Navigate to Organization > Users
2. click the **Add user** button
3. A new screen is displayed where Administrator has to enter the user email and provide him the appropriate roles (Organization role and Team roles).
4. Click Save when done and the user will receive the invite email.

### Viewing a user

1. Navigate to Organization > Users
2. click the **View** button
3. The user information is displayed

If you are viewing your own user, you can edit and change your first and last names.

### Editing a user

1. Navigate to Organization > Users
2. click the **Manage Org user** button
3. A new screen is displayed where Administrator can change the user roles
4. Click Save when done

When editing your own user, once you get to the user details screen, you can edit your account and change your first and last names.

### Deleting a user

1. Navigate to Organization > Users
2. click the **Remove** button
3. A confirmation popup is displayed for the user to validate the action
4. Once the action is validated, the user is removed from the system

Administrator user cannot be removed if no other Administrator is present in the system

## Team management

Adding, editing, set default team and removing a team is only available for Administrator user.

Team Administrator can only add/remove members from the team they are part of.

### Adding a team

1. Navigate to Organization > Teams
2. Click the **Add team** button
3. Enter the team name and description and associate exiting user to the team with their corresponding roles.
4. Click Save when done

### Editing a team

1. Navigate to Organization > Teams
2. Use the ellipsis menu **Edit**
3. Edit the team name and/or description. Modify any user assignment to the team
4. Click Save when done

### Changing the Default Team

1. Navigate to Organization > Teams
2. Use the ellipsis menu **Set as Default**
3. A confirmation popup is displayed for the user to validate the action to be sure he wants to replace the existing default team
4. Once the action is validated, the current team is now set a the Default team

### Deleting a team

1. Navigate to Organization > Teams
2. Use the ellipsis menu **Remove**
3. A confirmation popup is displayed for the user to validate the action
4. Once the action is validated, the team is removed from the system

## Managing the organization

Only Administrator user can perform these actions.

### Changing the Organization name

1. Navigate to Organization > Manage
2. Update the organization name
3. Click Save for the change to be effective

### Deleting the Organization

1. Navigate to Organization > Manage
2. Click Delete
3. A popup is displayed and ask you to enter the Organization name as well as to send you a code. Once the code is received in your inbox, enter it in the appropriate field
4. Validate your choice
5. The Organization and all the users and teams are permanently removed from the system
