const admins = Meteor.settings.public.admins || [];

Accounts.onCreateUser((options, user) => {

    if (admins.indexOf(options.email) !== -1) {
        user.roles = ['admin'];
    }

    return user;
});