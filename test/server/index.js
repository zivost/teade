var teade = require('../../index');
var functions = require('./function');

var server = new teade.Server();

server.addService({
    'pingRPC': ping
});

function ping(call, callback) {
    functions.getPong(call, function(err, response) {
        if (err){
            callback(null, err.toString());
        }else{
            callback(null, response);
        }
    });
};
console.log("server starting at 8080")
server.bind(8080);
server.start();