import {createApolloServer} from 'meteor/apollo';
import {makeExecutableSchema} from 'graphql-tools';
import _merge from 'lodash/merge';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';
import ResolutionsResolvers from '../../api/resolutions/resolversResolutions';

import UsersSchema from '../../api/users/User.graphql';
import UsersResolvers from '../../api/users/resolversUsers';

import GoalSchema from '../../api/goals/Goal.graphql';
import GoalsResolvers from '../../api/goals/resolversGoals';


const typeDefs = [
    ResolutionsSchema,
    UsersSchema,
    GoalSchema
];

const resolvers = _merge(
    ResolutionsResolvers,
    UsersResolvers,
    GoalsResolvers
);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

createApolloServer({schema});