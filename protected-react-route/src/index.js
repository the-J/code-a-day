import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './protectedRoute';

import LandingPage from './landingPage';
import AppLayout from './appLayout';

import './styles.css';

function App() {
    return (
        <div>
            <h1>Protected React Router</h1>

            <Switch>
                <Route exact path='/' component={LandingPage} />
                <ProtectedRoute exact path='/app' component={AppLayout} />
                <Route path="*" component={() => '404 NOT FOUND'} />
            </Switch>
        </div>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);