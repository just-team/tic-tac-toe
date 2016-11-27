function TicTacToe() {
    this.counter = -1;
    this.fields = new Array(9).fill(false);
    this.winCases = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ]
    this.turn = -1;
    this.sockets = [];
    this.finished = false;
};

TicTacToe.prototype.setListeners = function(socket) {
    var self = this;
    socket.on("move", function(data) {
        self.getMove(self, data, socket)
    });

    socket.on("disconnect", function() {
        self.disconnect(socket);    
    });
}

TicTacToe.prototype.init = function(io, sockets) {
    this.io = io;
    var self = this;
    sockets.forEach(function(socket) {
        self.setListeners(socket);
    });
}

TicTacToe.prototype.createRoom = function(sockets, io) {
    var self = this;
    return new Promise(function(resolve, reject) {
           self.room = [Date.now(), Math.random() * 12000].join("").toString(30);
           console.log("Creating room ", self.room);
           for(var i in sockets) {
            self.sockets.push(sockets[i]);
            sockets[i].room = self.room; 
            sockets[i].join(self.room);
           }
           resolve({room: self.room, names: [self.sockets[0].name, self.sockets[1].name]});
    });
}

TicTacToe.prototype.sendMove = function() {
    if(this.finished) return;
    this.turn += 1;
    console.log("This turn is", this.turn);
    console.log("Sending move to socket: ", this.sockets[this.turn % 2].id);
    this.sockets[this.turn % 2].emit("send move", {type: this.sockets[this.turn % 2].type});
}


TicTacToe.prototype.checkForWinner = function() { 
    for(var i in this.winCases) {
        if(this.checkCase(this.winCases[i])) {
            console.log("Game finished");
            return true;
        }
    }
}

TicTacToe.prototype.checkCase = function(_case) {
    if(this.fields[_case[0]] == this.fields[_case[1]] && this.fields[_case[1]] == this.fields[_case[2]] && 
        (this.fields[_case[0]] !== false && this.fields[_case[1]] !== false && this.fields[_case[2]] !== false) ) {
            return true;
        }
    return false;
}

TicTacToe.prototype.resetGame = function() {
    this.turn = -1;
    this.fields = new Array(9).fill(false);
    this.sockets = [];
    this.room = null;
    this.io = null;
    this.counter = -1;
    this.finished = false;
}

TicTacToe.prototype.getMove = function(self, data, socket) {
    console.log("Socket is", socket.id, "Type is: ", socket.type);
    console.log("Getting move ", data);
    console.log("Field is: ", data.move, "status is", self.fields[data.move]);
    if(self.fields[data.move] !== false || self.finished) return;
    console.log("Validatig turn", self.turn % 2, socket.type);
    if(self.turn % 2 !== socket.type) return;
    self.fields[data.move] = socket.type;
    self.io.to(self.room).emit("get move", {field: data.move, type: socket.type});
    if(self.checkForWinner()) {
        socket.emit("finish", {win: true});
        self.sockets[(socket.type + 1) % 2].emit("finish", {win: false});
        self.finished = true;
        return //self.resetGame();
    };
    
    self.sendMove();
}

TicTacToe.prototype.disconnect = function(socket) {
    console.log("Disonnected: ", socket.id);
    this.counter--;
    if(this.counter > -1) {
        // this.io.to(this.room).emit("game finish", {winner: this.turn % 2});
        this.sockets[Math.abs(socket.type - 1) % 2].emit("win");
        this.finished = true;
       // this.resetGame();
    }
}

TicTacToe.prototype.gameStarted = function() {
    var self = this;
    this.sockets.forEach(function(socket, index) {
        var opponentIndex = Math.abs(index - 1);
        console.log("Looping through socket: ", socket.id);
       socket.emit("game started", {type: socket.type, opponent: self.sockets[opponentIndex].name}); 
    });
    this.sendMove();
}
module.exports = TicTacToe;