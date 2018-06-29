const client = require('./src/client.js');

const server = require('./src/server.js');

/**
 * @see module:src/server.Server
 */
exports.Server = server.Server;


/**
 * @see module:src/client.Client
 */
exports.Client = client.Client;