var request = require('request');

function Client(host, port) {
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
		if (!error && response.statusCode == 200) {
			callback(null, body);
		} else if (error) {
			callback(error);
		} else if (body) {
			callback(new Error(body));
		} else {
			callback(new Error('Unknown error'));
		}
	});
}

exports.Client = Client;