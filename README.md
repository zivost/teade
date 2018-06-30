# Teade
IPC(Inter Process Communication) package using RPC over HTTP.

**Note:**

If you use `node < 4.0` then stick to version `0.0.6`. 

To install run `npm i -s teade@0.0.6`. 

This version is completely stable but if you need some additional features from the latest version, raise an issue on github. 

## Why do you need it?
You probably need this for communicating with different microservices in a microservice architecture.

The most trusted and tested protocol is HTTP and this package uses HTTP to create a Client-Server connection so it can call remote procedures in a reliable manner.

#### Features

 - Reliability as it uses the HTTP protocol.
 - Few Dependencies.
 - Can be used over HTTPS if required.
 - Scalable - Use with an internal load balancer or let teade chose a random port.

#### TODO

Go Cross Platform, we are working on the `go` and `.netcore` versions of this package. Once done you can connect your servers and clients written in different languages.

If you need it in some other language or want us to speed up the process, then raise an issue on github and help us test.  

Other requests for features, please raise an issue on github. 

## Installation
Install using npm:
```sh
npm install --save teade
```

## Usage
Require library
```javascript
const teade = require('teade');
```
### Server
```javascript
let server = new teade.Server();

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
let client = new teade.Client('http://localhost', 8080);

// payload should always be a valid JSON
let payload = {
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

#### Client Parameters

| Name  | Description | Example |
| ------------- | ------------- | ------------- |
| Host  | hostname where the RPC server is running, prefix the protocol  | http://localhost |
| Port  | port at which the RPC server is running | 8080 |
| Host-Port Set  | an array of host:port strings, Teade will then chose a random entry.  | [ "http://localhost:8080", "http://localhost:8081" ] |


#### Example

see the test directory for now.