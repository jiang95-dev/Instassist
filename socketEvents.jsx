import openSocket from 'socket.io-client';

var socket_url = 'http://localhost:8000'
const socket = openSocket(socket_url);

function subscribeToTimer(cb) {
    console.log("subscribing to timer!!!!!!!!!!!!!");
    socket.on('timer', timestamp => cb(null, timestamp));
}

function sentUserToken(token) {
    console.log("sending token!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    socket.emit("user token", token);
}

function messageSent(conversationId, to) {
    socket.emit('new message', conversationId, "5a2f69e2e7e1148d6b19fa7c");
}


// conversation id: 5a30bb611fa77333474a309a
function subscribeToRefresh(cb) {
	console.log("subscribing to refresh!");
	socket.on('refresh messages', ()=>{
		console.log("I'm asked to refresh!");
		cb();
	});
}

/*no use*/
function subscribeToId() {
	socket.on('my user id', (id) => {
		console.log("my id is: " + id)
	});
}
export { 
	subscribeToTimer, 
	messageSent, 
	sentUserToken, 
	subscribeToRefresh, 
	subscribeToId,
 };