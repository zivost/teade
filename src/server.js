const each = require('lodash/each');
const express = require('express');
const bodyParser = require('body-parser');

function Server(options) {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: false}));

    this._server = server;
    this.started = false;

    this.start = function () {
        if (this.started) {
            throw new Error('Server is already running');
        }
        if (!this.port) {
            throw new Error('Server needs to be binded to a port');
        }
        this.started = true;
        server.listen(this.port);
    }
}

Server.prototype.addService = function (implementation) {
    const app = this._server;
    each(implementation, function (method, key) {
        app.post('/' + key, function (req, res) {
            method(req.body, function (err, response) {
                if (err) {
                    return res.status(400).send(err);
                }
                return res.send(response);
            });
        });
    });
};


Server.prototype.bind = function (port) {
    if (this.started) {
        throw new Error('Can\'t bind an already running server to a port');
    }
    this.port = port;
};

exports.Server = Server;