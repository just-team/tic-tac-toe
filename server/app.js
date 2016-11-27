var http = require("http");
var config = require("./config");
console.log("Running on port ", config.port);
var server = http.createServer();
server.listen(config.port)

const io = require("socket.io")(server);
var socketHandler = require("./handlers/socket.handler")(io);