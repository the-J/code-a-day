import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {withApollo} from 'react-apollo';

import ResolutionForm from './ResolutionForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import GoalForm from './GoalForm';

import Goal from './resolutions/Goal';

const App = ({loading, resolutions, client, user}) => {
    if (loading) return <h1>Loading...</h1>;

    return (
        <div>
            {user._id ? (
                <button onClick={() => {
                    Meteor.logout();
                    client.resetStore();
                }}
                >
                    Logout
                </button>
            ) : (
                <div>
                    <RegisterForm client={client}/>
                    <LoginForm client={client}/>
                </div>
            )}

            <ResolutionForm/>

            <ul>
                {resolutions.map(resolution => (
                    <li key={resolution._id}>
                        {resolution.name}

                        <ul>
                            {resolution.goals.map(goal => (
                                <Goal
                                    key={goal._id}
                                    goal={goal}
                                />
                            ))}
                        </ul>

                        <GoalForm resolutionId={resolution._id}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const resolutionsQuery = gql`
    query Resolutions {
        resolutions {
            _id
            name
            goals {
                _id
                name
                completed
            }
        }
        user {
            _id
        }
    }
`;

export default graphql(resolutionsQuery, {
    props: ({data}) => ({...data})
})(withApollo(App));