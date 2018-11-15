import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Items = new Mongo.Collection('items');

const ItemsSchema = new SimpleSchema({

    itemOne: Object,
    'itemOne.text': String,
    'itemOne.value': SimpleSchema.Integer,

    itemTwo: Object,
    'itemTwo.text': String,
    'itemTwo.value': SimpleSchema.Integer
});

Items.attachSchema(ItemsSchema);

Meteor.methods({
    insertItem(itemOne, itemTwo) {

        check(itemOne, String);
        check(itemTwo, String);

        Items.insert({
            itemOne: {
                text: itemOne,
                value: 0
            },
            itemTwo: {
                text: itemTwo,
                value: 0
            }
        });

        Roles.addUsersToRoles(Meteor.userId(), 'submitter');
    },

    voteOnItem(item, position) {

        check(item, Object);

        if (Meteor.userId()) {
            if (position === 'itemOne') {
                Items.update(item._id, {
                    $inc: {
                        'itemOne.value': 1
                    }
                });
            }
            else if (position === 'itemTwo') {
                Items.update(item._id, {
                    $inc: {
                        'itemTwo.value': 1
                    },
                });
            }

            Roles.addUsersToRoles(Meteor.userId(), 'voter');
        }
    }
});

export default Items;