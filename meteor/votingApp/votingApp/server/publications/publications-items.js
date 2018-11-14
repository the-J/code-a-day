import Items from  '/imports/api/items';

Meteor.publish('items', function() {
    return Items.find(selector = {}, options = {});
});