# Teade
node.js IPC(Inter Process Communication) package using RPC over HTTP.

## Installation
Install using npm:
```sh
npm install teade
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
	'hello': func1,
	'hey': func2
});

function func1(call, callback) {
	callback(null, 'Hi '+call.name+'!');
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