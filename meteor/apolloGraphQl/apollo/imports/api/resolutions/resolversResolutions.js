import Resolutions from './resolutions';
import Goals from '../goals/goals';

if (!Resolutions.find().fetch().length) {
    Resolutions.insert({name: 'Resolution One'});
    Resolutions.insert({name: 'Resolution Two'});
    Resolutions.insert({name: 'Resolution Three'});
}

export default {
    Query: {
        resolutions(obj, args, {userId}) {
            return Resolutions.find({
                userId
            }).fetch();
        }
    },

    Resolution: {
        goals: resolution => Goals.find({resolutionId: resolution._id}).fetch()
    },

    Mutation: {
        createResolution(obj, {name}, {userId}) {
            const resolutionId = Resolutions.insert({
                name,
                userId
            });
            return Resolutions.findOne(resolutionId);
        }
    }
};