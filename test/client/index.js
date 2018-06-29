const teade = require('../../index');
let hostPortSet = [
    "http://localhost:8080"
];
const client = new teade.Client('http://localhost', 8080);
const clientWithSets = new teade.Client(null, null, hostPortSet);

// payload should always be a valid JSON

function testClient(payload, callback){
    client.request('pingRPC', payload, function(err, response) {
        if(err){
            return callback(err,err)
        }
        return  callback(err,response)
    })
}
function testClientWithSets(payload, callback){
    clientWithSets.request('pingRPC', payload, function(err, response) {
        if(err){
            return callback(err,err)
        }
        return  callback(err,response)
    })
}


exports.testClient = testClient;
exports.testClientWithSets = testClientWithSets;
