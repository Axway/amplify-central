---
title: Consumer organization management
linkTitle: Consumer organization management
weight: 45
---

## Before you start

You must have an Amplify entitlement.

## Objectives

As a consumer, learn how to create and manage a consumer organization from the Marketplace.

## Concepts

### Create a consumer organization

The first time a user signs up to a Marketplace, they must complete the sign up form.

Enter the following information in the Marketplace sign up form:

* First name - first name of the user
* Last name - last name of the user
* Email - email address that will be used to log into the Marketplace
* Password - the password associated to the email to enable the login process to be successful. A confirmation of the password is mandatory
* Organization - the name of the organization that will be created and referenced as a consumer organization

To submit the information, click the **Sign up** button. A message to Check your email is displayed. The email contains the link to activate your account. Once the activation is done, you will be able to log into the Marketplace with your email and password.

### Manage users and roles

A consumer organization allows you to define users and teams. A user can have multiple roles assigned, and can be a member of multiple teams.

The user that registered with a consumer organization will become the **Administrator** of the organization. The administrator can manage the user roles, under the condition that there must always be a user that has the Administrator role assigned.

The Administrator has all the roles on the default team.

Types of roles:

* *Organization Roles* - a role that applies to all the capabilities of the organization and is mutually exclusive. There are two Organization roles:
    * **Administrator** - creates users and teams
    * **Consumer** - consumes products in Marketplace
* *Team Roles* - roles that are specific to a team the user belongs to. These roles are not mutually exclusive. A member can have multiple roles in the the same team.  There are three team roles:
    * **Consumer** - manages the free plan subscription, product access and credentials, and their applications
    * **Team Manager** - manages the team by adding or removing users
    * **Subscriber** - subscribes to paid plans and manages paid subscriptions

### Organize the user within teams

A team is a logical grouping of users that allows certain groups of members to collaborate on the consumption of a product and building an application, but accessing the same set of subscriptions, credentials and applications. A user can belong to multiple teams and have different roles assigned in each team.

Only the Administrator and Team Manager can create/view/edit/delete any team. Each organization must have a default team. The default team cannot be deleted.

## User management

The user management is performed by an Administrator user.

### Invite a user to an organization

A new user can be added to the organization by sending an invite.

1. Navigate to Organization > Users.
2. click **Add user**.
3. A new screen is displayed where Administrator must enter the user email and assign the appropriate organization and team roles.
4. Click **Save**. The user will receive the email invite.

### View a user

1. Navigate to Organization > Users.
2. click **View**.
3. The user information is displayed.

If you are viewing your own user, you can edit and change your first and last names.

### Edit a user

1. Navigate to Organization > Users.
2. click **Manage Org user**.
3. A new screen is displayed where the Administrator can change the user roles.
4. Click Save.

When editing your own user, you can edit your account and change your first and last names on the user details screen.

### Delete a user

1. Navigate to Organization > Users.
2. click **Remove**.
3. A confirmation popup is displayed for the user to validate the action.
4. Once the action is validated, the user is removed from the system.

Administrator user cannot be removed if no other Administrator is present in the system.

## Team management

Only the Administrator can add, edit, set default team, and remove a team.

A Team Administrator can only add or remove members in the team they belong to.

### Add a team

1. Navigate to Organization > Teams.
2. Click **Add team**.
3. Enter the team name and description, and associate exiting user to the team with their corresponding roles.
4. Click Save.

### Edit a team

1. Navigate to Organization > Teams.
2. Use the ellipsis menu **Edit**.
3. Edit the team name and/or description. Modify any user assignment to the team.
4. Click Save.

### Change the default Team

1. Navigate to Organization > Teams.
2. Use the ellipsis menu **Set as Default**.
3. A confirmation popup is displayed for the user to validate the action.
4. Once the action is validated, the current team is set as the default team.

### Delete a team

1. Navigate to Organization > Teams.
2. Use the ellipsis menu **Remove**.
3. A confirmation popup is displayed for the user to validate the action.
4. Once the action is validated, the team is removed from the system.

## Manage the organization

Only the Administrator user can perform these actions.

### Change the organization name

1. Navigate to Organization > Manage.
2. Update the organization name.
3. Click **Save**.

### Delete the organization

1. Navigate to Organization > Manage.
2. Click **Delete**.
3. A popup is displayed that asks for the organization name, and to send you a code. Once the code is received in your inbox, enter it in the appropriate field.
4. Validate your choice. The organization and all the users and teams are permanently removed from the system.
