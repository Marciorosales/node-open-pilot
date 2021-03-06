var api = require('socket.io')
var PORT = 5000;
var SOCKETS = [];

function createAPIServer(port) {
	api = io(port || PORT);
	api.on("connection", onNewConnection);
	api.on("disconnection", onDisconnection);
};

function onNewConnection(socket) {
	var found = false;
	for (var i=0; i<SOCKETS.length; i++) {
		if (socket.id == SOCKETS[i].id) {
			found = true;
			break;
		}
	}	
	if (!found) {
		SOCKETS.push(socket);
	}
};

function onDisconnection(socket) {
	for (var i=0; i<SOCKETS.length; i++) {
		if (socket.id == SOCKETS[i].id) {
			SOCKETS.splice(i, 1);
		}
	}	
};

var me = {
	createAPIServer: createAPIServer
};

exports.API = me;