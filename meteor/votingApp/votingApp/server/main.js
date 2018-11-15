import {Meteor} from 'meteor/meteor';

import '/imports/server/accounts';

Meteor.publish('currentUser', function() {
    return Meteor.users.find({_id: this.userId}, {
        fields: {
            roles: 1
        }
    });
});

Meteor.startup(() => {});
