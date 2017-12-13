import openSocket from 'socket.io-client';

var socket_url = 'http://localhost:8000'
const socket = openSocket(socket_url);



function connectSocket(token){
	// console.log("connect to socket");
	// const socket = openSocket(socket_url);
	// localStorage.setItem("socket", socket);
	socket.emit("user token", token);
	socket.on('refresh messages', ()=>{
		console.log("I'm asked to refresh!");
	})
}

function messageSent(conversationId, to) {
    // socket.emit('new message', conversationId, "5a2f69e2e7e1148d6b19fa7c");
    socket.emit('new message', conversationId, to);
}


// conversation id: 5a30bb611fa77333474a309a

function disconnetSocket(){
	socket.emit('disconnet');
}

/*no use*/
function subscribeToId() {
	socket.on('my user id', (id) => {
		console.log("my id is: " + id)
	});
}
export { 
	messageSent, 
	sentUserToken, 
	subscribeToRefresh, 
	disconnetSocket,
	connectSocket,
	

	subscribeToId,
 };