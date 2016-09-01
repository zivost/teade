# Teade
node.js IPC(Inter Process Communication) package using RPC over HTTP. 

## Installation
Install using npm: (coming soon)
```sh
npm install teade
```

## Usage
Require library
```javascript
var communicator = require('communicator');
```
### Server
```javascript
var server = new communicator.Server();

server.addService({
	'hello': func1,
	'hey': func2
});

server.bind(8080);
server.start();
```
### Client
```javascript
var client = new communicator.Client('http://localhost', 8080);

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
## Examples
(Coming Soon)