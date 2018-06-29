"use strict";

const request = require('request');

function Client(host, port, hostPortSets) {
    let useHostPortSet = false;
    if(hostPortSets){
        if(hostPortSets.length > 0){
            useHostPortSet = true;
        }
    }
    if(useHostPortSet){
        let hostPortSet = getHostPortFromSet(hostPortSets);
        host = hostPortSet.host;
        port = hostPortSet.port;
    }else{
        let hostPortSet = getHostPort(host, port);
        host = hostPortSet.host;
        port = hostPortSet.port;
    }

    this.host = host;
    this.port = port;
}

Client.prototype.request = function (method, payload, callback) {
    let host = this.host;
    let port = this.port;
    request({
        url: host + ':' + port + '/' + method,
        method: "POST",
        json: payload
    }, function (error, response, body) {
        if (!body) {
            body = new Error('unknown error occured');
        }
        if (error) {
            // there is an error in sending RPC
            return callback(error);
        } else if (response.statusCode !== 200) {
            // there is an error sent from RPC function
            return callback(body);
        }
        // no error
        return callback(null, body);
    });
};

function getHostPort(host, port){
    let hostPort = {
        host: host,
        port: port
    };

    if(typeof port === "string"){
        try{
            port = parseInt(port);
        }catch(e){
            console.log("Port in not a number.");
        }
    }

    if (!host) {
        console.error("No Host Defined in Client Initialisation");
        console.error("Will try http://localhost");
        hostPort.host = "http://localhost";
    }


    if (!port || isNaN(port)) {
        console.error("No Port Defined in Client Initialisation");
        console.error("8080");
        hostPort.port = 8080;
    }

    return hostPort;
}

function getHostPortFromSet(hostPortSet){
    if(!hostPortSet){
        console.error("Host-Port Set cannot be blank in Client Initialisation");
        console.error("Will try http://localhost:8080");
        hostPortSet = ["http://localhost:8080"];
    }
    if(hostPortSet.length <= 0){
        console.error("Host-Port Set cannot be blank in Client Initialisation");
        console.error("Will try http://localhost:8080");
        hostPortSet = ["http://localhost:8080"];
    }
    let randomHostPort = hostPortSet[getRandomInt(hostPortSet.length - 1)];
    let hostPortSetSelected = extractHostPort(hostPortSet[getRandomInt(hostPortSet.length - 1)]);

    let host, port;


    if(hostPortSetSelected.host){
        host = hostPortSetSelected.host;
    }else{
        console.error("No Host Defined in Client Initialisation");
        console.error("Will try http://localhost");
        host = "http://localhost";
    }
    if(hostPortSetSelected.port){
        port = hostPortSetSelected.port;
    }else{
        console.error("No Port Defined in Client Initialisation");
        console.error("8080");
        port = 8080;
    }
    return getHostPort(host, port);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function extractHostPort(url) {
    url = url.match(/^(([a-z]+:)?(\/\/)?[^\/]+).*$/)[1] || url;
    let parts = url.split(':'),
        port = parseInt(parts[parts.length - 1], 10),
        host = parts[0] + ":" + parts[1];
    if(parts[0] === 'http' && (isNaN(port) || parts.length < 3)) {
        return 80;
    }
    if(parts[0] === 'https' && (isNaN(port) || parts.length < 3)) {
        return 443;
    }
    if(parts.length === 1 || isNaN(port)) return 80;

    return {
        host: host,
        port: port
    };
}
exports.Client = Client;