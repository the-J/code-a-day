import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

function App() {
    return (
        <div>
            <h1>Protected React Router</h1>
        </div>
    );
}

const roootElement = document.getElementById('root');
ReactDOM.render(<App />, roootElement);