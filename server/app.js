var http = require("http");
var config = require("./config");
console.log("Running on port 4040");
var server = http.createServer();
server.listen(4040)

const io = require("socket.io")(server);
var socketHandler = require("./handlers/socket.handler")(io);