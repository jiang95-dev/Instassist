import React from 'react';
import ReactDom from 'react-dom';
import openSocket from 'socket.io-client';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Mainpage from './components/Mainpage/Mainpage.jsx';
import styles from './styles/main.scss';

var socket_url = 'http://10.180.131.152:8000'
const socket = openSocket(socket_url);
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMzBkZTkwNmEzZDUyMDAyMTE2ZTUzOCIsImlhdCI6MTUxMzE1MjE1MywiZXhwIjoxNTEzMjM4NTUzfQ.VnQkGp94oIepvZFFovYh7AQC3xHs3pHi91cuzHCdxBo';
function sentUserToken(token) {
    console.log("sending token!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    socket.emit("user token", localStorage.getItem("jwtToken"));
}

function subscribeToRefresh() {
 console.log("subscribing to !!!!!!!!!!!!!!!!!!!!!!!!!!!!");
 socket.on('refresh messages', ()=>{
  console.log("I'm asked to refresh!");
 });
}

sentUserToken();
subscribeToRefresh();


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
