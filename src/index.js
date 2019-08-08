import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd-mobile/dist/antd-mobile.css'; // or 'antd-mobile/dist/antd-mobile.less'

import * as serviceWorker from './serviceWorker';
import Login from "./components/User/Login";
import Raven from 'raven-js';

Raven.config('https://e43d245b9d754e10b375a2cd1bf653d5@sentry.io/1476088').install();
// import Station from "./components/Main/Weather/Station";

// ReactDOM.render(<Login />, document.getElementById('root'));
ReactDOM.render(<Login />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
