import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route, Switch } from 'react-router-dom';

import LandingPage from './landingPage';
import AppLayout from './appLayout';

import './styles.css';

function App() {
    return (
        <div>
            <h1>Protected React Router</h1>

            <Route exact path='/' component={LandingPage} />
            <Route exact path='/app' component={AppLayout} />

        </div>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);