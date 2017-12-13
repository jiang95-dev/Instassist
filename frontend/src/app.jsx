import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import CreatePost from './components/CreatePost/CreatePost.jsx';
import Mainpage from './components/Mainpage/Mainpage.jsx';

import MessageView from './components/MessageView/MessageView.jsx';

import styles from './styles/main.scss';


import openSocket from 'socket.io-client';

var socket_url = 'http://localhost:8000'
var conversation = 1
const  socket = openSocket(socket_url);
function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
    socket.emit("msg");
    socket.emit('new message', "hello");
}



export { subscribeToTimer };



ReactDom.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/createpost" component={CreatePost}/>
            <Route exact path="/mainpage" component={Mainpage}/>

            <Route exact path="/message" component={MessageView}/>
        </Switch>
    </Router>,
    document.getElementById('react-app')
);
