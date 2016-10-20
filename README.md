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
	'read': read,
	'write': write
});

function read(call, callback) {
	callback(null, 'Hi '+call.name+'!');
};

function read(call, callback) {
	myReadProceduralCall(call, function(err, response) {
		if (err){
			var error = new Error();
			error.message = err.message;
			error.code = err.status; //you can also use `error.status = err.status` here
			error.body = err;
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

var payload = {
  name: "John"
}

client.request('hello', payload, function(err, response) {
	if (err) {
		//handle error
	} else {
		//do something with the response
	}
})
```