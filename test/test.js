var expect = require('chai').expect;

require('./server');
var client = require('./client');

function testServerClientRPC(payload, cb){
    client.testClient(payload, function(err, response){
        cb(err, response);
    });
}

describe('testServerClientRPC()', function () {
    it('should return pong in response to ping', function (done) {
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





