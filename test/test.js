const expect = require('chai').expect;

// start the server
require('./server');

// get the client
const client = require('./client');

// call the client
function testServerClientRPC(payload, cb){
    client.testClient(payload, function(err, response){
        cb(err, response);
    });
}

// test the right and wrong response
describe('testServerClientRPC()', function () {
    it('should return pong in response to ping else should return not ping', function (done) {
        var correctPayload = {
            data: "ping"
        };
        var wrongPayload = {
            data: "anythingelse"
        };


        testServerClientRPC(correctPayload, function(err, correctResponse){
            expect(correctResponse).to.be.equal("pong");
            testServerClientRPC(wrongPayload, function(err, wrongResponse){
                expect(wrongResponse).to.be.equal("not ping");
                done();
            });

        });

    });
});





