var Game = require('./');

function Room() {
    this.stack = [];
    this.counter = -1;
}

Room.prototype.init = function(io) {
    this.io = io;
}

Room.prototype.putInStack = function(socket) {
    this.stack.push(socket);
}

Room.prototype.checkStack = function() {
    if(this.stack.length > 1) {
        var sockets = this.stack.splice(this.stack.length - 2, 2);
        var game = new Game();
        game.init(this.io, sockets);
        game.createRoom(areDifferentTypes(sockets))
            .then(function() {
                game.gameStarted();
            })
            .catch(function(err) {
                console.error("Error while creating room:", err);
            });
    }
}

function areDifferentTypes(sockets) {
    if(sockets[0].type == sockets[1].type) {
        sockets[0].type = (sockets[0].type + 1) % 2;
    }
    return sockets;
}

module.exports = new Room();