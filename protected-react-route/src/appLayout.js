import React from 'react';

import auth from './auth';

const AppLayout = (props) => {
    return (
        <div>
            <h3>AppLayout</h3>

            <button
                onClick={() => {
                    auth.logout(() => {
                        props.history.push('/')
                    });
                }}
            >
                logout
            </button>
        </div>
    );
};

export default AppLayout;