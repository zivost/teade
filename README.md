# Teade
node.js IPC(Inter Process Communication) package using RPC over HTTP.

## Installation
Install using npm:
```sh
npm install --save teade
```

## Usage
Require library
```javascript
var teade = require('teade');
```
### Server
```javascript
var server = new teade.Server();

server.addService({
	'readRPC': read,
	'writeRPC': write
});

function read(call, callback) {
	myReadProceduralCall(call, function(err, response) {
		if (err){
			var error = new Error();
			// anything attached to error is sent as is
			callback(error);
		}else{
			callback(null, response);
		}
	});
};

server.bind(8080);
server.start();
```
### Client
```javascript
var client = new teade.Client('http://localhost', 8080);

// payload should always be a valid JSON
var payload = {
  name: "John"
}

client.request('readRPC', payload, function(err, response) {
	if (err) {
		// handle error
		// accessible data
			// err
	} else {
		//do something with the response
		// accessible data
			// response
	}
})
```