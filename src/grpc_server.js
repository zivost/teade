var _ = require('lodash');

var grpc = require('grpc');

function Server(options) {
	var server = new grpc.Server();

	this._server = server;
	this.started = false;

	this.start = function() {
		if (this.started) {
			throw new Error('Server is already running');
		}
		if (!this.port) {
			throw new Error('Server needs to be binded to a port');
		}
		this.started = true;
		server.start();
	}
}

Server.prototype.addService = function(PROTO_PATH, package, service, implementation) {
	var server = this._server;
	var proto = grpc.load(PROTO_PATH).helloworld;
	_.each(implementation, function(method, key) {
		server.addProtoService(proto.Greeter.service, {sayHello: sayHello});
		// app.post('/'+key, function (req, res) {
		// 	method(req.body, function(err, response) {
		// 		if (err) {
		// 			return res.status(400).send(err);
		// 		}
		// 		return res.send(response);
		// 	});
		// });
	});
}


Server.prototype.bind = function(port) {
	if (this.started) {
		throw new Error('Can\'t bind an already running server to a port');
	}
	this.port = port;
	server.bind('0.0.0.0:'+port, grpc.ServerCredentials.createInsecure());
};

exports.Server = Server;