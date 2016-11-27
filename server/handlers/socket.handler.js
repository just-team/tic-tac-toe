var room = require('../game/roomHandler');

module.exports = function(io) {
    room.init(io);
    io.on("connection", function(socket) {
        console.log("Client connected id is", socket.id);
        socket.on('connect_to_game', function(name) {
            room.counter++;
            socket.name = name;
            socket.type = room.counter % 2;
            room.putInStack(socket);
            console.log("Client put in stack stack length is: ", room.stack.length);
        });
    });
}

setInterval(room.checkStack.bind(room), 5000);