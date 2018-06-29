const teade = require('../../index');
const client = new teade.Client('http://localhost', 8080);

// payload should always be a valid JSON

function testClient(payload, callback){
    client.request('pingRPC', payload, function(err, response) {
        if(err){
            return callback(err,err)
        }
        return  callback(err,response)
    })
}

exports.testClient = testClient;
