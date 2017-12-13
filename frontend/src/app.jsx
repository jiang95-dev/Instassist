import React from 'react';
import ReactDom from 'react-dom';
import openSocket from 'socket.io-client';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Register from './components/Auth/Register.jsx';
import Login from './components/Auth/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Mainpage from './components/Mainpage/Mainpage.jsx';
import styles from './styles/main.scss';


ReactDom.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/mainpage" component={Mainpage}/>
        </Switch>
    </Router>,
    document.getElementById('react-app')
);
