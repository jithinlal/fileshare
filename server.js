
var fs =  require('fs');
require('dotenv').config()

var options = {
    key:    fs.readFileSync(process.env.SSL_CERT_KEY),
    cert:   fs.readFileSync(process.env.SSL_CERT)
};
var PeerServer = require('peer').PeerServer;

var server = PeerServer({
  port: 9000,
  ssl: options
});
server.on('connection', function(id) {
  console.log('New connection: '+id);
});
