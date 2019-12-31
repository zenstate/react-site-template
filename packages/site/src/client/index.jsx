import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './scss/index.scss';

ReactDOM.render(
    <App />,
    document.querySelector('#root'),
);
