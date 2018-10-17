import React from 'react';

import auth from './auth';

const LandingPage = (props) => {
    return (
        <div>
            <h3>Landing Page</h3>

            <button
                onClick={() => {
                    auth.login(() => {
                        props.history.push('/app')
                    });
                }}
            >
                login
            </button>


        </div>
    );
};

export default LandingPage;