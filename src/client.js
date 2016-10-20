"use strict"

var request = require('request');

function Client(host, port) {
	if (!host || !isNaN(host)) {
		throw new Error('No Host Defined in Client Initialisation');
	}
	if (!port || isNaN(port)) {
		throw new Error('No Port Defined in Client Initialisation');
	}
	this.host = host;
	this.port = port;
}

Client.prototype.request = function(method, payload, callback) {
	let host = this.host;
	let port = this.port;
	request({
	    url: host+':'+port+'/'+method,
	    method: "POST",
	    json: payload
	}, function (error, response, body) {
		if(error){
			// there is an error in sending RPC
			return callback(error);
		}else if(response.statusCode != 200){
			// there is an error sent from RPC function
			return callback(response);
		}
		// no error
		return callback(null, response);	
	});
}

exports.Client = Client;