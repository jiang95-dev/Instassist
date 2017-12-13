import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Mainpage from './components/Mainpage/Mainpage.jsx';

import MessageView from './components/MessageView/MessageView.jsx';

import styles from './styles/main.scss';

import { subscribeToTimer, messageSent, sentUserToken, subscribeToRefresh, subscribeToId } from '../../socketEvents.jsx' ;


var fake_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMzBiOTU1NmEzZDUyMDAyMTE2ZTRmOCIsImlhdCI6MTUxMzE0MjYyMywiZXhwIjoxNTEzMjI5MDIzfQ.FtHsmA34xm0cft8lX6oAzGFSOL-603uLE2IGYQpN9is"

subscribeToTimer((err, timestamp) => {
    console.log("subscribed to timer");
});

sentUserToken(fake_token);

subscribeToRefresh();
subscribeToId();





ReactDom.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/mainpage" component={Mainpage}/>

            <Route exact path="/message" component={MessageView}/>
        </Switch>
    </Router>,
    document.getElementById('react-app')
);
